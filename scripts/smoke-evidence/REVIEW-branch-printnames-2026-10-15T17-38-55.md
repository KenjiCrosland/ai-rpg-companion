# Review batch — branch-printnames-2026-10-15T17-38-55

The checker ran first. The gate table covers every block in the run; every block of the run follows. Each block carries its checker row above and its engine trace below. Hand-derive against the row first; then read for what predicates can't see.

## Gate table — the whole run

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Last Gate Warden | 7 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 3/4 |
| Sunken Reef Sniper | 4 | 2024 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/4 |
| Pine Barrens Dire Wolf | 3 | 2024 | skirmisher-3 | ok | SOFT: aim-dpr, band | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 3/3 |
| Border War Veteran | 3 | 2024 | defender-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 2/2 |

**Dropped 0 of 5 user clauses** (coverage 100%); concept share 85% (11/13 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- none



---

## Pine Barrens Dire Wolf — lowest CR

**Concept:** a dire wolf that hunts in a pack

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Pine Barrens Dire Wolf | 3 | skirmisher-3 | ok | SOFT: aim-dpr, band | ok | ok | ok | ok | ok | ok | ok |

- bands · soft · aim-dpr: damage 14 a round is 44% under the card's 25
- bands · soft · band: reads CR 1.5 (print at 3 reads 0.375–5, n=83)
- read: def 1 / off 2 → 1.5; sustained 14 (2 × Bite); nova none; dmg 14

```
Pine Barrens Dire Wolf

Large Beast, Unaligned

AC 15
Initiative +3 (13)

HP 60 (8d10 + 16)

Speed 50 ft.

MOD
SAVE
STR
17
+3
+3
INT
3
-4
-4
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
15
+2
+2
CHA
7
-2
-2

Skills Perception +3, Stealth +5

Senses darkvision 60 ft.; Passive Perception 13

Languages None

CR 3 (XP 700; PB +2)

Traits

Pack Tactics. The dire wolf has Advantage on an attack roll against a creature if at least one of the dire wolf's allies is within 5 feet of the creature and the ally doesn't have the Incapacitated condition.

Actions

Multiattack. The dire wolf makes two Bite attacks.

Bite. Melee Attack Roll: +5, reach 5 ft. 7 (1d8 + 3) Piercing damage. If the target is a Large or smaller creature, it has the Prone condition.

Bonus Actions

Pack Hunt (2/Day). The dire wolf has Advantage on the next attack roll it makes before the end of its turn.

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
[route] skirmisher type=Beast mechanics=none — skirmisher: ✓ ("hunts in a pack") | skirmisher: no line key in the words — the model's read of its quote
[concept] signature elements: pack tactics that flank and harry [behavior] | bone-white winter pelt and ribs like ice-slick stone [body] | frozen barrens and killing cold of the pack's breath [aura]
[reskin] print canon array: STR 17, DEX 16, CON 15, INT 3, WIS 12, CHA 7 — the Dire Wolf's, DEX fitted to +5
[reskin] print canon: "a dire wolf that hunts in a pack" heads on the Dire Wolf — print's rows ride along; the seat stays
[reskin] signature idea (action): "The whole pack learns the wound. Once this dire wolf draws blood, every other wolf that can see the victim smells it and hits the same spot hard. Until the victim escapes or the wolves lose it, the pack's teeth find that bitten place and keep tearing the same hurt wider." [rider/on_hit/damage] — menu: affliction, contagion, charge-push, hook-rider, pounce, isolation, charge (+ shelf: trample, leap, gaze-single, snare, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, riposte)
[reskin] signature bound to the concept's verb: action — focus (hunt)
[reskin] signature re-poured: action — the idea left the concept's verb; the concept itself is poured into focus
[reskin] value check: "Pack Hunt (2/Day)" EV 2 vs floor 2 (a bonus action (free)) — worth the trade
[reskin] signature template: focus -> Bonus Actions/"Pack Hunt (2/Day)" ("The wolf's pack-hunting verb is hunt, and the ability grants Advantage on the ne [verb: hunt:concept]")
[reskin] signature idea (trait): "Its winter coat is frozen stiff as river ice and slick as glazed stone. Blades skid and stick in the frost instead of cutting clean, so anyone who strikes it in close quarters fumbles the follow-through and loses their footing." [trait/on_being_hit/condition] — menu: heated-body, absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, warded-mending, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] signature bound to the concept's verb: trait — faultless-tracker (hunts, hunted)
[reskin] signature miss: trait — "Its winter coat is frozen stiff as river ice and slick as glazed stone. Blades skid and stick in the frost instead of cutting clean, so anyone who strikes it in close quarters fumbles the follow-through and loses their footing." [trait/on_being_hit/condition] — the model found no template that holds it (offered: faultless-tracker)
[reskin] print canon speed: 40 ft. -> 50 ft. — the Dire Wolf's walk; the concept's other modes stay
[reskin] print canon trait: Pack Tactics — "a dire wolf that hunts in a pack" is the Dire Wolf (print's own row)
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the seat's, not the Dire Wolf's
[reskin] print canon: chassis row leaves — Traits/"Loping Stride" is the seat's, not the Dire Wolf's
```


---

## Last Gate Warden — highest CR

**Concept:** a bulwark-sworn sentinel with a broken greatsword and a battered shield

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Last Gate Warden | 7 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 6 / off 6 → 6; sustained 44 (2 × Broken Greatsword); nova none; dmg 44

```
Last Gate Warden

Medium Humanoid, Lawful Neutral

AC 19
Initiative +1 (11)

HP 104 (16d8 + 32)

Speed 30 ft.

MOD
SAVE
STR
18
+4
+7
INT
11
+0
+0
MOD
SAVE
DEX
12
+1
+1
WIS
13
+1
+1
MOD
SAVE
CON
15
+2
+5
CHA
14
+2
+2

Skills Athletics +7, Perception +4

Senses darkvision 60 ft.; Passive Perception 14

Languages Common

CR 7 (XP 2,900; PB +3)

Traits

Great Weapon Master. When the gate warden hits a creature with its Broken Greatsword, the attack deals an extra 3 damage.

Actions

Multiattack. The gate warden makes two attacks, using Broken Greatsword or Battered Shield in any combination.

Broken Greatsword. Melee Attack Roll: +7, reach 5 ft. 22 (4d8 + 4) Slashing damage.

Battered Shield. Melee Attack Roll: +7, reach 5 ft. 22 (4d8 + 4) Bludgeoning damage.

Bonus Actions

Warden's Edict. Wisdom Saving Throw: DC 15, one creature within 30 feet. Failure: Until the start of the gate warden's next turn, the target has Disadvantage on attack rolls against creatures other than the gate warden.

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
[route] defender type=Humanoid mechanics=none — defender: ✓ ("bulwark-sworn sentinel") | defender: key "sentinel" (class verb)
[concept] signature elements: broken greatsword [object] | battered shield [object] | holding the line [behavior]
[reskin] signature idea (action): "The warden drives its battered shield forward at one creature in front of it, shoving them back bodily and forcing them to stumble a short distance away while leaving them briefly off balance and unable to simply step back past its reach. The same motion sets its own feet: after the shove, it braces behind the shield, holding its patch of ground so that anything trying to close with it must conten" [rider/on_hit/movement] — menu: stunning-strike, charge-push, hook-rider (+ shelf: seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, riposte)
[reskin] signature bound to the concept's verb: action — push-prone, aggro-curse, rally (batter, sworn, shield)
[reskin] value check: "Shield Shove" EV 3.4 vs floor 13 (one attack of 2) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Shield Shove" — the ladder could not lift it; the fallback stands in
[reskin] value check: "Binding Mark" EV 7.5 vs floor 4.1 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: aggro-curse -> Bonus Actions/"Binding Mark" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Its greatsword is a ruined stub of its former blade, so every time the warden swings it it is really bludgeoning with a broken shard of steel and its own strength, hammering through parries and crushing the space a shield or guard would occupy. When it strikes a creature that is guarding itself or holding a defensive posture, the broken edge bites deeper and leaves that creature's own defenses rat" [trait/always/damage] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending, weapon-lodge)
```


---

## Sunken Reef Sniper — a 2024 sheet

**Concept:** a reef-born skirmisher who harries the shallows with a barbed spear

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Sunken Reef Sniper | 4 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 2 / off 4 → 3; sustained 26 (2 × Barbed Spear); nova none; dmg 26

```
Sunken Reef Sniper

Medium Humanoid, Neutral

AC 16
Initiative +3 (13)

HP 78 (12d8 + 24)

Speed 30 ft., Swim 40 ft.

MOD
SAVE
STR
18
+4
+4
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
14
+2
+2
CHA
8
-1
-1

Skills Perception +3, Stealth +5

Senses darkvision 60 ft.; Passive Perception 13

Languages Common

CR 4 (XP 1,100; PB +2)

Traits

Reef Dart. The sniper ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Actions

Multiattack. The sniper makes two Barbed Spear attacks.

Barbed Spear. Melee or Ranged Attack Roll: +6, reach 5 ft. or range 20/60 ft. 13 (2d8 + 4) Piercing damage, and the target has Disadvantage on its next attack roll before the start of the sniper's next turn.

Bonus Actions

Fleet Agility. The sniper takes the Dash or Disengage action.

Tide Surge (1/Day). Immediately after dealing damage to a creature that is already Bloodied, the sniper moves up to half its Speed, and it makes one Barbed Spear attack.

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
[route] skirmisher type=Humanoid mechanics=thrown-weapon — skirmisher-hurler: ✓ ("harries the shallows with a barbed spear") | skirmisher-hurler -> skirmisher: the concept's VERB outranks the noun (key "harries", class verb) | skirmisher: key "harries" (class verb)
[concept] signature elements: barbed spear throw [object] | reef ambush and retreat [behavior] | brine-veined body [body]
[reskin] signature idea (action): "The sniper wrenches its barbed spear free from a foe it has already hit, and the twisted barbs tear a ragged, bleeding wound that keeps weeping brine into the cut. For a short while after, the wounded creature leaves a thin crimson-and-salt trail in the air and water, which the sniper and its packmates can follow unerringly even through coral maze and murk, and the sniper's throws against that mar" [rider/on_hit/damage] — menu: bolt-mark (+ shelf: trample, leap, gaze-single, snare, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte)
[reskin] signature miss: action — "The sniper wrenches its barbed spear free from a foe it has already hit, and the twisted barbs tear a ragged, bleeding wound that keeps weeping brine into the cut. For a short while after, the wounded creature leaves a thin crimson-and-salt trail in the air and water, which the sniper and its packmates can follow unerringly even through coral maze and murk, and the sniper's throws against that mar" [rider/on_hit/damage] — the model found no template that holds it (offered: bolt-mark, disarm, thrown-burst-seed, rampage)
[reskin] value check: "Rampage (1/Day)" EV 11.8 vs floor 2.3 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: rampage -> Bonus Actions/"Rampage (1/Day)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Brine courses through its veins and it breathes the shallows as easily as air, so while it is standing in or touching water it moves with uncanny quiet and speed, its body half-submerged and near-impossible to pick out from the reef's glitter; when it slips back into open water after striking, foes lose track of exactly where it went." [trait/always/movement] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] signature bound to the concept's verb: trait — terrain-walk (shallows)
[reskin] signature miss: trait — "Brine courses through its veins and it breathes the shallows as easily as air, so while it is standing in or touching water it moves with uncanny quiet and speed, its body half-submerged and near-impossible to pick out from the reef's glitter; when it slips back into open water after striking, foes lose track of exactly where it went." [trait/always/movement] — the model found no template that holds it (offered: terrain-walk)
```


---

## Border War Veteran — a print donor

**Concept:** a hardened veteran of the border wars

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Border War Veteran | 3 | defender-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 2 / off 3 → 2.5; sustained 24 (2 × Greatsword); nova none; dmg 24

```
Border War Veteran

Medium Humanoid, Neutral

AC 17
Initiative +1 (11)

HP 65 (10d8 + 20)

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
13
+1
+1
WIS
11
+0
+2
MOD
SAVE
CON
14
+2
+4
CHA
10
+0
+0

Skills Athletics +5, Perception +2

Senses darkvision 60 ft.; Passive Perception 12

Languages Common plus one other language

CR 3 (XP 700; PB +2)

Actions

Multiattack. The veteran makes two attacks, using Greatsword or Heavy Crossbow in any combination.

Greatsword. Melee Attack Roll: +5, reach 5 ft. 12 (2d8 + 3) Slashing damage.

Heavy Crossbow. Ranged Attack Roll: +5, range 100/400 ft. 10 (2d6 + 3) Piercing damage.

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
[route] defender type=Humanoid mechanics=none — defender: ✓ ("hardened veteran of the border wars") | defender: no line key in the words — the model's read of its quote
[concept] signature elements: holding the line with shield and spear [behavior] | iron-hardened plate and scars [body] | a well-worn shield and spear [object]
[reskin] print canon defenses: HP 52 -> 65, AC 18 -> 17 — the Warrior Veteran's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon armor: 17 (splint) — print's Gear line; the 2014 sheet prints it (the Goblin Boss wore "splint", canaries 2026-10-12)
[reskin] print canon array: STR 16, DEX 13, CON 14, INT 10, WIS 11, CHA 10 — the Warrior Veteran's at its own CR; attack +5 -> +5, DC 13 (print's)
[reskin] print canon: "a hardened veteran of the border wars" heads on the Warrior Veteran — print's rows ride along; the seat stays
[reskin] signature idea (action): "The veteran slams their spear butt into the ground and braces behind their shield, marking a lane they will not yield. Until the veteran moves or is knocked down, enemies trying to cross that line have to get past the shield first, and anyone who pushes through eats a brutal counterthrust as they come. The stance breaks the moment the veteran chooses to advance or is forced back." [action/always/condition] — menu: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up (+ shelf: patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, snap-shot, riposte, charge-push, hook-rider)
[reskin] signature miss: action — "The veteran slams their spear butt into the ground and braces behind their shield, marking a lane they will not yield. Until the veteran moves or is knocked down, enemies trying to cross that line have to get past the shield first, and anyone who pushes through eats a brutal counterthrust as they come. The stance breaks the moment the veteran chooses to advance or is forced back." [action/always/condition] — the model found no template that holds it (offered: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, aggro-curse, rally)
[reskin] value check: "Dazzling Burst" EV 1.7 vs floor 6.2 (one attack of 2) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Dazzling Burst" — a seed that cannot be lifted does not ship
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "The veteran's iron plate and old scars are one continuous surface — every blow that fails to truly hurt them only sets their feet harder. When something strikes the veteran and fails to wound them meaningfully, they shrug it off and steady their stance rather than flinching." [trait/on_being_hit/defense] — menu: absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura)
[reskin] print canon languages: "Common" -> "Common plus one other language" — the Warrior Veteran's
[reskin] print canon attack: "Spear" -> "Greatsword" — the Warrior Veteran's own row
[reskin] print canon attack: "Heavy Crossbow" rolls print's +5 with +3 damage — a print row stands outside the weapon table
[reskin] print canon attack: "Javelin" -> "Heavy Crossbow" — the Warrior Veteran's own ranged row
```
