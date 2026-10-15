# Review batch — canaries-2026-10-15T20-42-51

The checker ran first. The gate table covers every block in the run; every block of the run follows. Each block carries its checker row above and its engine trace below. Hand-derive against the row first; then read for what predicates can't see.

## Gate table — the whole run

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Owlbear | 3 | 2024 | brute-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 1/1 |
| Headless Horseman | 4 | 2024 | skirmisher-3-mounted | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 5/6 |
| Wolf | 5 | 2024 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 2/2 |
| Stone Golem | 10 | 2024 | brute-9 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 5/5 |
| Kobold | 0.25 | 2024 | skirmisher-1 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |
| Goblin Boss | 1 (2014) | 2014 | skirmisher-3-mounted | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 5/6 |
| Bridge Toll Troll | 5 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 4/4 |
| Ridgebreaker Ogre | 5 | 2024 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 2/2 |
| Vampire Spawn | 5 (2014) | 2014 | lurker-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 5/5 |
| Well Shade | 5 | 2024 | lurker-5-trap | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 0/3 |

**Dropped 1 of 12 user clauses** (coverage 92%); concept share 87% (33/38 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- none



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

Coward's Escape (1/Day). The kobold casts Invisibility on itself, requiring no spell components and using Charisma as the spellcasting ability.

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
[concept] signature elements: one daily vanishing act [behavior] | venom-slick dagger [object] | skulking sniper's sling [object]
[reskin] print canon route: the Kobold Warrior's body outranks the skulker seat — no verb in the words names it; the plain skirmisher line
[reskin] print canon defenses: HP 15 -> 7, AC 14 -> 14 — the Kobold Warrior's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 7, DEX 15, CON 9, INT 8, WIS 7, CHA 8 — the Kobold Warrior's at its own CR; attack +4 -> +4, DC 12 (print's)
[reskin] print canon: "Kobold — Can turn invisible once per day" heads on the Kobold Warrior — print's rows ride along; the seat stays
[reskin] claim gate: CR 0.25 but the words claim a capability ("Can") — the wildcard stays open
[reskin] claim gate: CR 0.25 but a Humanoid body — the trait seat stays open (print: a material body carries a trait at every tier)
[reskin] signature idea (action): "The kobold vanishes from sight, becoming invisible for a short time. While invisible, its dagger drips with a venomous slick, and the next time it strikes a creature that has not noticed it, the wound festers with poison." [action/once_per_fight/condition] — menu: lure, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed (+ shelf: delayed-brand, patient-defense, aggro-curse, self-invisibility, focus, feint-slip, coating, contagion, pounce)
[reskin] signature bound to the concept's verb: action — self-invisibility (invisible, turn invisible)
[reskin] value check: "Venom Vanish (1/Day)" EV 0 vs floor 1 (a bonus action (free)) — a free row that does nothing (logged)
[reskin] signature dropped by the floor: "Venom Vanish (1/Day)" — the ladder could not lift it; the fallback stands in
[reskin] value check: "Vanish (1/Day)" EV 0 vs floor 1 (a bonus action (free)) — a free row that does nothing (logged)
[reskin] library seed drawn: self-invisibility -> Bonus Actions/"Vanish (1/Day)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The kobold's dagger is always coated in a thin, venomous slick. When it hits a creature that is unaware of it or that it has just struck from hiding, the venom seeps into the wound, poisoning the target." [trait/always/damage] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, bound, undead-fortitude, mimicry
[reskin] signature miss: trait — "The kobold's dagger is always coated in a thin, venomous slick. When it hits a creature that is unaware of it or that it has just struck from hiding, the venom seeps into the wound, poisoning the target." [trait/always/damage] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, bound, undead-fortitude, mimicry)
[reskin] print canon type: Humanoid -> Dragon — the Kobold Warrior's (a Unicorn printed Fey, 2026-10-01)
[reskin] print canon attack: "Dagger" keeps print's hybrid frame — reach 5 ft. or range 20/60 ft. (the Kobold Warrior's weapon is thrown)
[reskin] print canon trait: Pack Tactics — "Kobold — Can turn invisible once per day" is the Kobold Warrior (print's own row)
[reskin] print canon trait: Sunlight Sensitivity — "Kobold — Can turn invisible once per day" is the Kobold Warrior (print's own row)
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the seat's, not the Kobold Warrior's
[reskin] print canon: chassis row leaves — Traits/"Skitter" is the seat's, not the Kobold Warrior's
```


---

## Stone Golem — highest CR

**Concept:** name: Stone Golem | Output statblock in German

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Stone Golem | 10 | brute-9 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 10 / off 9 → 9.5; sustained 48 (2 × Slam); nova none; dmg 48

```
Steingolem

Groß Konstrukt, Gesinnungslos

RK 18
Initiative -1 (9)

TP 220 (21d10 + 105)

Bewegungsrate 30 ft.

MOD
RW
STÄ
22
+6
+10
INT
3
-4
-4
MOD
RW
GES
9
-1
-1
WEI
11
+0
+0
MOD
RW
KON
20
+5
+9
CHA
1
-5
-5

Fertigkeiten Athletik +10, Wahrnehmung +4

Immunitäten Gift, Psychisch; Bezaubert, Erschöpft, Verängstigt, Gelähmt, Versteinert, Vergiftet

Sinne Dunkelsicht 120 ft.; Passive Wahrnehmung 14

Sprachen Versteht Gemeinsprache plus zwei andere Sprachen, kann aber nicht sprechen

HG 10 (EP 5,900; ÜB +4)

Eigenschaften

Unveränderliche Gestalt. Der Golem kann seine Gestalt nicht ändern.

Magieresistenz. Der Golem hat Vorteil auf Rettungswürfe gegen Zauber und andere magische Effekte.

Aktionen

Multiangriff. Der Golem führt zwei Angriffe aus und verwendet dabei Schlag oder Kraftstrahl in beliebiger Kombination.

Schlag. Nahkampfangriffswurf: +10, Reichweite 5 ft. 15 (2d8 + 6) Wuchtschaden plus 9 (2d8) Kraftschaden.

Kraftstrahl. Fernkampfangriffswurf: +9, Reichweite 120 ft. 22 (4d10) Kraftschaden.

Bonusaktionen

Verlangsamen (Wiederaufladen 5-6). Der Golem wirkt den Zauber Verlangsamen, wobei er keine Zauberkomponenten benötigt und Konstitution als Zauberfertigkeit verwendet (Zauberrettungswurf-SG 17).

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
[route] brute-juggernaut type=Construct mechanics=none — brute-juggernaut: ✓ ("Stone Golem") | brute-juggernaut: no line key in the words — the model's read of its quote
[concept] cr from print: 10 — a print creature heads the words and the user set none
[concept] signature elements: Immutable Form [body] | Magic Resistance [body] | Slow pulse [aura]
[reskin] print canon route: "Stone Golem — " is the Stone Golem — the juggernaut seat stands down for the plain line
[reskin] print canon defenses: HP 182 -> 220, AC 15 -> 18 — the Stone Golem's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 22, DEX 9, CON 20, INT 3, WIS 11, CHA 1 — the Stone Golem's at its own CR; attack +9 -> +10, DC 17 (print's)
[reskin] print canon: "Stone Golem — " is a print creature — the seats stand down; print's own rows are the composition
[reskin] print canon speed: modes walk only — the Stone Golem's
[reskin] print canon senses: "darkvision 120 ft." — the Stone Golem's
[reskin] print canon size: Huge -> Large — the Stone Golem's
[reskin] print canon languages: "Common" -> "Understands Common plus two other languages but can't speak" — the Stone Golem's
[reskin] print canon speed: 40 ft. -> 30 ft. — the Stone Golem's walk; the concept's other modes stay
[reskin] print canon multiattack: "The golem makes two attacks, using Slam or Force Bolt in any combination." — the Stone Golem's own
[reskin] print canon attack: "Force Bolt" is print's own row — +9, 22 (4d10), range 120 ft. (an exact body at print's CR)
[reskin] print canon attack: "Boulder" -> "Force Bolt" — the Stone Golem's own ranged row
[reskin] print canon defenses: immunities Poison; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned -> Poison, Psychic; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned — the Stone Golem's own header lines
[reskin] print canon trait: Immutable Form — print's text replaces the chassis's (the Troll regenerates 15, not the chassis's 10 — critic's audit 2026-10-02)
[reskin] print canon trait: Magic Resistance — print's text replaces the chassis's (the Troll regenerates 15, not the chassis's 10 — critic's audit 2026-10-02)
[reskin] print canon row: Bonus Actions/Slow (Recharge 5-6) — the Stone Golem's own
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

Saddle Skirmisher. The boss ignores difficult terrain, and opportunity attacks against it are made with disadvantage.
Nimble Escape. As a bonus action, the boss takes the Disengage or Hide action.

Actions
Multiattack: The boss makes two attacks, using Scimitar or Shortbow. It can replace one attack with a use of Mounted Trample Lash.
Scimitar: Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 6 (1d8 + 2) slashing damage plus 2 (1d4) slashing damage if the attack roll had advantage. If the boss moved at least 20 feet in a straight line toward the target immediately before the hit, the target takes an extra 4 (1d8) slashing damage and, if it is Medium or smaller, is knocked prone.
Shortbow: Ranged Weapon Attack: +4 to hit, range 80/320 ft., one target. Hit: 6 (1d8 + 2) piercing damage.
Worg Stampede (Recharge 5-6): The boss moves up to its speed without provoking opportunity attacks and can move through the spaces of Medium or smaller creatures. Each creature whose space it enters is targeted once by the following effect. Each target must make a DC 12 Strength saving throw, taking 6 (1d12) bludgeoning damage on a failed save, or half as much damage on a successful one. On a failed save, the target is also knocked prone.
Mounted Trample Lash: One creature within 30 feet that is prone must make a DC 12 Strength saving throw, taking 5 (1d10) piercing damage on a failed save, or half as much damage on a successful one.
```

**Engine trace**

```
[route] skirmisher-mounted type=Humanoid mechanics=none — skirmisher-mounted: ✓ ("riding a worg") | skirmisher-mounted: key "riding" (class verb)
[concept] cr from print: 1 — a print creature heads the words and the user set none
[concept] signature elements: mounted ride-down attacks [behavior] | worg mount [object] | goblinoid hide and cunning [body]
[reskin] print canon defenses: HP 26 -> 21, AC 13 -> 17 — the Goblin Boss's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon armor: 17 (chain shirt, shield) — print's Gear line; the 2014 sheet prints it (the Goblin Boss wore "splint", canaries 2026-10-12)
[reskin] print canon array: STR 10, DEX 15, CON 10, INT 10, WIS 8, CHA 10 — the Goblin Boss's at its own CR; attack +3 -> +4, DC 12 (print's)
[reskin] print canon: "Goblin Boss — riding a worg" heads on the Goblin Boss — print's rows ride along; the seat stays
[reskin] claim gate: CR 1 but a Humanoid body — the trait seat stays open (print: a material body carries a trait at every tier)
[reskin] signature idea (action): "The boss cracks its whip and screeches a command, forcing lesser goblins within earshot to snap into a frenzied advance. Each goblin that hears and obeys immediately scrambles a short distance toward the nearest enemy and makes a single attack with whatever it is holding." [action/always/movement] — menu: throw-retrieve, shield-bash, lure, snare-bolt, sensory-strike, disarm, exploiter (+ shelf: delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte, contagion, charge-push, hook-rider, pounce, isolation, bolt-mark, charge)
[reskin] signature miss: action — "The boss cracks its whip and screeches a command, forcing lesser goblins within earshot to snap into a frenzied advance. Each goblin that hears and obeys immediately scrambles a short distance toward the nearest enemy and makes a single attack with whatever it is holding." [action/always/movement] — no template on the shelf shares a verb with the concept or the idea (offered: throw-retrieve, shield-bash, lure, snare-bolt, sensory-strike, disarm, exploiter, delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte, contagion, charge-push, hook-rider, pounce, isolation, bolt-mark, charge)
[reskin] value check: "Opportunist's Lash" EV 3.9 vs floor 3.1 (one attack of 2) — worth the trade
[reskin] library seed drawn: exploiter -> Actions/"Opportunist's Lash" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The boss rides as if fused to its worg, reading every buckle and snarl of the beast. It is never caught off guard while mounted on the worg that answers to it." [trait/always/defense] — menu: adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst (+ shelf: false-appearance, absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] signature miss: trait — "The boss rides as if fused to its worg, reading every buckle and snarl of the beast. It is never caught off guard while mounted on the worg that answers to it." [trait/always/defense] — no template on the shelf shares a verb with the concept or the idea (offered: adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst, false-appearance, absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] chassis nova: "Worg Stampede (Recharge 5-6)" — the skirmisher-3-mounted's own nova row (its "Trampling Rush", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] print canon type: Humanoid stays — the Goblin Boss is Fey in 2024 only; this is a 2014 sheet (form-ten 2026-10-01)
[reskin] print canon alignment: Chaotic Evil -> Chaotic Neutral — the Goblin Boss's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon speed: the mount carries the Goblin Boss — its 30 ft. walk yields to the mount's (critic form-ten 2026-10-01)
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
[route] brute-grappler type=Monstrosity mechanics=grapple, engulf — brute-grappler: ✓ ("Owlbear") | brute-grappler: no line key in the words — the model's read of its quote
[concept] signature elements: crushing bear-hug grapple [behavior] | hooked beak and shredding claws [body]
[reskin] print canon route: "Owlbear" is the Owlbear — the grappler seat stands down for the plain line
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

## Bridge Toll Troll — a print donor

**Concept:** a troll that guards the bridge and collects a toll

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Bridge Toll Troll | 5 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 3 / off 5 → 4; sustained 36 (2 × Rend); nova none; dmg 36

```
Bridge Toll Troll

Large Giant, Chaotic Evil

AC 15
Initiative +1 (11)

HP 94 (9d10 + 45)

Speed 30 ft.

MOD
SAVE
STR
18
+4
+7
INT
7
-2
-2
MOD
SAVE
DEX
13
+1
+1
WIS
9
-1
-1
MOD
SAVE
CON
20
+5
+8
CHA
7
-2
-2

Skills Athletics +7, Perception +2

Senses darkvision 60 ft.; Passive Perception 12

Languages Giant

CR 5 (XP 1,800; PB +3)

Traits

Regeneration. The toll troll regains 15 Hit Points at the start of each of its turns. If the toll troll takes Acid or Fire damage, this trait doesn't function on the toll troll's next turn. The toll troll dies only if it starts its turn with 0 Hit Points and doesn't regenerate.

Loathsome Limbs. If the toll troll ends any turn Bloodied and took 15+ Slashing damage during that turn, one of the toll troll's limbs is severed, falls into the toll troll's space, and becomes a Troll Limb. The limb acts immediately after the toll troll's turn. The toll troll has 1 Exhaustion level for each missing limb, and it grows replacement limbs the next time it regains Hit Points.

Actions

Multiattack. The toll troll makes two Rend attacks.

Rend. Melee Attack Roll: +7, reach 10 ft. 18 (4d6 + 4) Slashing damage.

Bonus Actions

Charge. The toll troll moves up to half its Speed straight toward an enemy it can see.

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
[route] defender type=Giant mechanics=none — defender: ✓ ("guards the bridge and collects a fee") | defender: key "guards the" (class verb)
[concept] signature elements: bridge-guarding toll collection [behavior] | stone-mortared hide and shield [body] | unyielding line-holder [behavior]
[reskin] print canon defenses: HP 78 -> 94, AC 19 -> 15 — the Troll's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 18, DEX 13, CON 20, INT 7, WIS 9, CHA 7 — the Troll's at its own CR; attack +6 -> +7, DC 16 (print's)
[reskin] print canon: "a troll that guards the bridge and collects a fee" heads on the Troll — print's rows ride along; the seat stays
[reskin] signature idea (action): "The troll plants its shield flat across the bridge span and bellows for payment, and every creature standing on the bridge in front of it that has not paid is driven back toward the far edge. Those who stumble off the side take the long fall instead of the fight. It can only demand once before the toll is either paid or refused." [action/once_per_fight/movement] — menu: seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up (+ shelf: patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, riposte, stunning-strike, charge-push, hook-rider)
[reskin] value check: "Sundering Shove" EV 2.5 vs floor 9.4 (one attack of 2) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Sundering Shove" — a seed that cannot be lifted does not ship
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "The bridge's mortar runs in veins through the troll's hide, so whenever a blow lands on it, chips of stone spray back at whoever struck it, and the wound scabs over with fresh gravel. Its hide is the bridge, and the bridge remembers every hand raised against it." [trait/on_being_hit/damage] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura)
[reskin] signature bound to the concept's verb: trait — bound, guarded-stance (guards the, guard)
[reskin] signature miss: trait — "The bridge's mortar runs in veins through the troll's hide, so whenever a blow lands on it, chips of stone spray back at whoever struck it, and the wound scabs over with fresh gravel. Its hide is the bridge, and the bridge remembers every hand raised against it." [trait/on_being_hit/damage] — the model found no template that holds it (offered: bound, guarded-stance)
[reskin] print canon alignment: Neutral -> Chaotic Evil — the Troll's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common" -> "Giant" — the Troll's
[reskin] print canon attack: "Stonehide Slam" -> "Rend" — the Troll's own row
[reskin] print canon rows: Shield Arm Sweep leave — the Troll has one melee row (Rend), and Multiattack reads print's
[reskin] print canon trait: Loathsome Limbs — "a troll that guards the bridge and collects a fee" is the Troll (print's own row)
[reskin] print canon trait: Regeneration — print's text replaces the chassis's (the Troll regenerates 15, not the chassis's 10 — critic's audit 2026-10-02)
[reskin] print canon row: Bonus Actions/Charge — the Troll's own
```


---

## Headless Horseman — a homebrew with a nova

**Concept:** name: Headless Horseman | 

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Headless Horseman | 4 | skirmisher-3-mounted | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- **dropped clause:** "Headless Horseman"
- read: def 2 / off 4 → 3; sustained 22 (2 × Saber); nova Hooves of the Dead 22; dmg 29

```
Headless Horseman

Medium Undead, Neutral

AC 16
Initiative +4 (14)

HP 78 (12d8 + 24)

Speed 50 ft.

MOD
SAVE
STR
14
+2
+2
INT
8
-1
-1
MOD
SAVE
DEX
18
+4
+6
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

Skills Perception +3, Stealth +6

Immunities Poison; Exhaustion, Poisoned

Senses darkvision 60 ft.; Passive Perception 13

Languages Common plus the languages it knew in life

CR 4 (XP 1,100; PB +2)

Traits

Dreadful Gaze. Wisdom Saving Throw: DC 14, any creature that starts its turn within 30 feet of the headless horseman and can see it. Failure: The target has the Frightened condition until the start of its next turn. Success: The target is immune to this creature's gaze for 24 hours.

Grave-Wind. The headless horseman ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Actions

Multiattack. The headless horseman makes two Saber attacks. It can replace one attack with a use of Specter's Retribution.

Saber. Melee Attack Roll: +6, reach 5 ft. 7 (1d6 + 4) Slashing damage plus 4 (1d8) Necrotic damage. If the headless horseman moved at least 20 feet in a straight line toward the target immediately before the hit, the target takes an extra 4 (1d8) Slashing damage and, if it is Medium or smaller, has the Prone condition.

Hooves of the Dead (Recharge 5-6). The headless horseman moves up to its Speed without provoking Opportunity Attacks and can move through the spaces of Medium or smaller creatures. Each creature whose space it enters is targeted once by the following effect. Strength Saving Throw: DC 14. Failure: 22 (5d8) Necrotic damage, and the target has the Prone condition.

Specter's Retribution. Wisdom Saving Throw: DC 14, one creature within 30 feet that has the Prone condition. Failure: 10 (3d6) Necrotic damage. Success: Half damage.

Bonus Actions

Mounted Agility. The headless horseman takes the Dash or Disengage action.

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
[route] skirmisher-mounted type=Undead mechanics=gaze — skirmisher-mounted: ✓ ("Headless Horseman") | skirmisher-mounted: key "horseman" (class body)
[concept] cr from the words: 4 — the user set none and no print name heads the words; a fixed ladder, never the model's read (critic form-ten 2026-10-01)
[concept] signature elements: headless rider mounted on a black steed [body] | ride-down charges that carry past the target [behavior] | saber and trampling hooves [object]
[reskin] nova capped: "Trampling Rush" 24 → 22 (the chassis nova obeys the cap: 22 at CR 4)
[reskin] signature idea (action): "The horseman spurs into a thunderous ride. A line of trampled ground opens behind him, and enemies caught in his path are knocked down and ridden over, taking crushing necrotic blows from the hooves." [action/always/movement] — menu: swallow, condition-payoff, shield-bash, lure, snare-bolt, sensory-strike, disarm, exploiter (+ shelf: delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, riposte, affliction, contagion, charge-push, hook-rider, pounce, isolation, charge)
[reskin] signature miss: action — "The horseman spurs into a thunderous ride. A line of trampled ground opens behind him, and enemies caught in his path are knocked down and ridden over, taking crushing necrotic blows from the hooves." [action/always/movement] — the model found no template that holds it (offered: swallow, condition-payoff, shield-bash, lure, snare-bolt, sensory-strike, disarm, exploiter, riposte, charge)
[reskin] value check: "Merciless Strike" EV 7.8 vs floor 5.2 (one attack of 2) — dice 21 → 10 (scaled down to the ceiling)
[reskin] library seed drawn: condition-payoff -> Actions/"Merciless Strike" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The horseman's severed neck leaks a supernatural bleakness that saps the will of those who meet his eyeless gaze. Foes who stand too close feel their limbs grow heavy with dread." [trait/always/condition] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, assassinate, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending, gaze-aura)
[reskin] signature template (trait): gaze-aura -> Traits/"Dreadful Gaze" ("The horseman's eyeless gaze saps the will of those who meet it, and foes close t [verb: gaze:idea]")
[reskin] chassis nova: "Hooves of the Dead (Recharge 5-6)" — the skirmisher-3-mounted's own nova row (its "Trampling Rush", renamed by the model); geometry, cap and rider lines below are its edits
```


---

## Wolf — in the run

**Concept:** a wolf

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Wolf | 5 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 3 / off 5 → 4; sustained 34 (2 × Bite); nova none; dmg 34

```
Wolf

Medium Beast, Unaligned

AC 16
Initiative +3 (13)

HP 88 (16d8 + 16)

Speed 40 ft.

MOD
SAVE
STR
14
+2
+2
INT
3
-4
-4
MOD
SAVE
DEX
16
+3
+6
WIS
12
+1
+1
MOD
SAVE
CON
12
+1
+1
CHA
6
-2
-2

Skills Perception +4, Stealth +6

Senses darkvision 60 ft.; Passive Perception 14

Languages None

CR 5 (XP 1,800; PB +3)

Traits

Pack Tactics. The wolf has Advantage on attack rolls against a creature if at least one of the wolf's allies is within 5 feet of the creature and the ally doesn't have the Incapacitated condition.

Actions

Multiattack. The wolf makes two Bite attacks.

Bite. Melee Attack Roll: +6, reach 5 ft. 17 (4d6 + 3) Piercing damage. If the target is a Medium or smaller creature, it has the Prone condition.

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
[route] skirmisher type=Beast mechanics=none — skirmisher: ✓ ("a wolf") | skirmisher: no line key in the words — the model's read of its quote
[concept] signature elements: pack tactics [behavior] | shaggy grey hide [body] | hamstringing bite [behavior]
[reskin] print canon array: STR 14, DEX 16, CON 12, INT 3, WIS 12, CHA 6 — the Wolf's, DEX fitted to +6
[reskin] print canon: "a wolf" is a print creature — the seats stand down; print's own rows are the composition
[reskin] print canon speed: modes walk only — the Wolf's
[reskin] print canon senses: "darkvision 60 ft." — the Wolf's
[reskin] print canon size: Large -> Medium — the Wolf's
[reskin] print canon name: "Dire Wolf" -> "Wolf" — a whole print name is the creature's name (the Goblin Boss shipped as Krag the Iron Standard, 2026-10-01)
[reskin] print canon speed: 50 ft. -> 40 ft. — the Wolf's walk; the concept's other modes stay
[reskin] print canon trait: Pack Tactics — print's text replaces the chassis's (the Troll regenerates 15, not the chassis's 10 — critic's audit 2026-10-02)
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the seat's, not the Wolf's
```


---

## Ridgebreaker Ogre — in the run

**Concept:** big ogre with a club, cr 5

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Ridgebreaker Ogre | 5 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 3 / off 6 → 4.5; sustained 44 (2 × Club); nova none; dmg 44

```
Ridgebreaker Ogre

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

Multiattack. The ogre makes two attacks, using Club or Slam in any combination.

Club. Melee Attack Roll: +7, reach 10 ft. 22 (4d8 + 4) Bludgeoning damage, and the target's Speed is reduced by 10 feet until the start of the ogre's next turn.

Slam. Melee Attack Roll: +7, reach 5 ft. 22 (4d8 + 4) Bludgeoning damage, and the target's Speed is reduced by 10 feet until the start of the ogre's next turn.

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
[concept] signature elements: tree-trunk club [object] | brutish club-swinging assault [behavior] | thick scarred ogre hide [body]
[reskin] print canon array: STR 19, DEX 8, CON 16, INT 5, WIS 7, CHA 7 — the Ogre's; STR 19 outranks the card's +6, so the sheet rolls +7 (raise-only)
[reskin] print canon: "big ogre with a club, cr 5" heads on the Ogre — print's rows ride along; the seat stays
[reskin] signature idea (action): "The ogre slams its tree-trunk club down into the ground at its feet, and the whole ridge bucks and cracks. Everyone standing near it is knocked off balance and staggered, so the creatures that were pressing in on it are suddenly stumbling and easy to hit." [action/save/condition] — menu: swallow, trample, leap, throw-retrieve, shield-bash, hook-drag, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up (+ shelf: rampage, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, stunning-strike, charge-push, hook-rider, pounce, charge)
[reskin] value check: "Disarming Twist" EV 0 vs floor 9.4 (one attack of 2) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Disarming Twist" — a seed that cannot be lifted does not ship
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "Every blow that lands on the ogre just makes it angrier. Wounds it shrugs off fuel a fresh roar, and its next club swing comes down harder than the last, so the more it bleeds the more dangerous it becomes." [trait/on_being_hit/damage] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] signature miss: trait — "Every blow that lands on the ogre just makes it angrier. Wounds it shrugs off fuel a fresh roar, and its next club swing comes down harder than the last, so the more it bleeds the more dangerous it becomes." [trait/on_being_hit/damage] — the model found no template that holds it (offered: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge, bloodied-fury)
[reskin] print canon size: Huge -> Large — the Ogre's
[reskin] print canon alignment: Chaotic Neutral -> Chaotic Evil — the Ogre's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common" -> "Common, Giant" — the Ogre's
[reskin] print canon row: Actions/Javelin — the Ogre's second melee row, beside the chassis's
```


---

## Vampire Spawn — in the run

**Concept:** a vampire spawn

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Vampire Spawn | 5 (2014) | lurker-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 3 / off 3 → 3; sustained 16 (2 × Claw); nova none; dmg 16

```
Vampire Spawn
Medium undead, neutral evil
Armor Class

16 (natural armor)

Hit Points: 

90 (12d8 + 36)

Speed: 

30 ft.

STR	DEX	CON	INT	WIS	CHA


16 (+3)

	

16 (+3)

	

16 (+3)

	

11 (+0)

	

10 (+0)

	

12 (+1)

Skills: 

Perception +3, Stealth +9

Saving Throws: 

DEX +6

Damage Resistances: 

necrotic

Damage Immunities: 

poison

Condition Immunities: 

exhaustion, poisoned

Senses: 

darkvision 60 ft., passive Perception 13

Languages: 

Common plus one other language

Challenge

5 (1,800 XP)

Proficiency Bonus:

+3

Spider Climb. The vampire can climb difficult surfaces, including along ceilings, without needing to make an ability check.
Vampire Weakness. The vampire has these weaknesses: Forbiddance: The vampire can't enter a residence without an invitation from an occupant.
Running Water: The vampire takes 20 acid damage if it ends its turn in running water.
Stake to the Heart: The vampire is destroyed if a weapon that deals piercing damage is driven into the vampire's heart while the vampire is incapacitated.
Sunlight: The vampire takes 20 radiant damage if it starts its turn in sunlight. While in sunlight, it has disadvantage on attack rolls and ability checks.
Deathless Agility. As a bonus action, the vampire takes the Dash or Disengage action.

Actions
Multiattack: The vampire makes two Claw attacks and uses Bite.
Claw: Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 8 (2d4 + 3) slashing damage. If the target is a Medium or smaller creature, it is grappled (escape DC 14) by one of the vampire's two claws.
Bite: One creature within 5 feet that is willing or that is grappled, incapacitated, or restrained must succeed on a DC 14 Constitution saving throw or take 5 (1d4 + 3) piercing damage plus 10 (3d6) necrotic damage. The target's hit point maximum decreases by an amount equal to the necrotic damage taken, and the vampire regains hit points equal to that amount.
```

**Engine trace**

```
[route] lurker-phantom type=Undead mechanics=none — lurker-phantom: ✓ ("vampire spawn") | lurker-phantom: no line key in the words — the model's read of its quote
[concept] signature elements: spectral blood-draining touch [behavior] | shapechanging into bat or mist [behavior] | incorporeal undead form [body]
[reskin] print canon route: "a vampire spawn" is the Vampire Spawn — the phantom seat stands down for the plain line
[reskin] print canon defenses: HP 95 -> 90, AC 14 -> 16 — the Vampire Spawn's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 16, DEX 16, CON 16, INT 11, WIS 10, CHA 12 — the Vampire Spawn's at its own CR; attack +6 -> +6, DC 14 (print's)
[reskin] print canon: "a vampire spawn" is a print creature — the seats stand down; print's own rows are the composition
[reskin] print canon modes: fly off — the Vampire Spawn has no such mode and the words name none
[reskin] print canon speed: modes walk only — the Vampire Spawn's
[reskin] print canon senses: "darkvision 60 ft." — the Vampire Spawn's
[reskin] print canon alignment: Neutral -> Neutral Evil — the Vampire Spawn's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon name: "Buried Bride" -> "Vampire Spawn" — a whole print name is the creature's name (the Goblin Boss shipped as Krag the Iron Standard, 2026-10-01)
[reskin] print canon languages: "Common plus the languages it knew in life" -> "Common plus one other language" — the Vampire Spawn's
[reskin] print canon attack: "Draining Touch" -> "Claw" — the Vampire Spawn's own row
[reskin] print canon multiattack: "The vampire makes two Claw attacks and uses Bite." — the Vampire Spawn's own
[reskin] print canon defenses: resistances none -> Necrotic — the Vampire Spawn's own header lines
[reskin] print canon trait: Spider Climb — "a vampire spawn" is the Vampire Spawn (print's own row)
[reskin] print canon trait: Vampire Weakness — "a vampire spawn" is the Vampire Spawn (print's own row)
[reskin] print canon row: Actions/Bite — the Vampire Spawn's own
[reskin] print canon row: Bonus Actions/Deathless Agility — the Vampire Spawn's own
[reskin] print canon: chassis row leaves — Bonus Actions/"Umbral Step" yields to the Vampire Spawn's Deathless Agility
```


---

## Well Shade — in the run

**Concept:** name: the thing in the well | 

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Well Shade | 5 | lurker-5-trap | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 5 / off 5 → 5; sustained 34 (2 × Claw); nova none; dmg 34

```
Well Shade

Medium Aberration, Neutral

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

Senses darkvision 60 ft.; Passive Perception 16

Languages None

CR 5 (XP 1,800; PB +3)

Actions

Multiattack. The shade makes two Claw attacks. It can replace one attack with a use of Vitality Leech.

Claw. Melee Attack Roll: +6 (with Advantage if the target is Grappled by the shade), reach 5 ft. 17 (4d6 + 3) Slashing damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 14).

Vitality Leech. Constitution Saving Throw: DC 14, one creature within 30 feet. Failure: 18 (4d8) Necrotic damage, and the shade regains Hit Points equal to half the damage dealt. Success: Half damage only.

Bonus Actions

False Form. The shade shape-shifts to resemble an ordinary object or fixture of the place it waits in while retaining its game statistics, or it returns to its true form. While it is motionless in its false form, it is indistinguishable from that feature.

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
[route] lurker-trap type=Aberration mechanics=none — lurker-trap: ✓ ("the thing in the well") | lurker-trap: no line key in the words — the model's read of its quote
[concept] signature elements: ambush from within a well shaft [behavior] | stone-encrusted chitinous body [body] | drag victim down into black water [behavior]
[reskin] signature idea (action): "With a heave that cracks the stone around it, the shade launches itself up the shaft, carrying it bodily to the rim or the nearest ledge in a single bound. Anyone who was leaning over or climbing down is left exposed mid-grab as the thing slams into place beside them." [action/once_per_fight/movement] — menu: swallow, condition-payoff, seal, wail, lure, hook-drag, active-toll, pull-through, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, terror-pulse, snare-bolt, slow-bolt, sensory-strike, drain, zone-seed, exploiter, blighted-ground (+ shelf: leap, delayed-brand, patient-defense, self-invisibility, focus, feint-slip, coating, riposte, affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, isolation)
[reskin] signature miss: action — "With a heave that cracks the stone around it, the shade launches itself up the shaft, carrying it bodily to the rim or the nearest ledge in a single bound. Anyone who was leaning over or climbing down is left exposed mid-grab as the thing slams into place beside them." [action/once_per_fight/movement] — the model found no template that holds it (offered: swallow, condition-payoff, seal, wail, lure, hook-drag, active-toll, pull-through, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, terror-pulse, snare-bolt, slow-bolt, sensory-strike, drain, zone-seed, exploiter, blighted-ground, leap, pounce)
[reskin] value check: "Vitality Leech" EV 14 vs floor 9.4 (one attack of 2) — added Success: Half; dice 11 → 18
[reskin] library seed drawn: drain -> Actions/"Vitality Leech" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Its hide is crusted with loose well-stones and masonry chips, so every time it wrenches itself free of a grip or pushes off from a surface, a spray of jagged debris scatters at whoever is closest." [trait/always/damage] — menu: adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, evasion, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature miss: trait — "Its hide is crusted with loose well-stones and masonry chips, so every time it wrenches itself free of a grip or pushes off from a surface, a spray of jagged debris scatters at whoever is closest." [trait/always/damage] — the model found no template that holds it (offered: adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, evasion, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst, heated-body)
```
