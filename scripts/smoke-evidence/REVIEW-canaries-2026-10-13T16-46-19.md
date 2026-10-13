# Review batch — canaries-2026-10-13T16-46-19

The checker ran first. The gate table covers every block in the run; the blocks below span it (lowest CR, highest CR, a 2014 sheet, a 2024 sheet, a print donor, a homebrew with a nova). Each block carries its checker row above and its engine trace below. Hand-derive against the row first; then read for what predicates can't see.

## Gate table — the whole run

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Owlbear | 3 | 2024 | brute-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 1/1 |
| Headless Horseman | 4 | 2024 | skirmisher-3-mounted | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 5/6 |
| Wolf | 5 | 2024 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 2/2 |
| Stone Golem | 10 | 2024 | brute-9 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 5/5 |
| Kobold | 0.25 | 2024 | skirmisher-1 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |
| Goblin Boss | 1 (2014) | 2014 | skirmisher-3-mounted | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 6/6 |
| Bridge Toll Troll | 5 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 5/5 |
| Ridgeline Ogre | 5 | 2024 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 2/2 |
| Vampire Spawn | 5 (2014) | 2014 | lurker-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 5/5 |
| Drowned Grudge | 5 | 2024 | lurker-5-trap | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 0/3 |

**Dropped 0 of 12 user clauses** (coverage 100%); concept share 90% (35/39 rows). A run with zero fails and 60% coverage is a failing run.
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
[concept] signature elements: once-per-day invisibility for a single ambush [behavior] | venom-dripping fangs and crude blades [object] | draconic bloodline warren-scavenger [body]
[reskin] print canon route: the Kobold Warrior's body outranks the skulker seat — no verb in the words names it; the plain skirmisher line
[reskin] print canon defenses: HP 15 -> 7, AC 14 -> 14 — the Kobold Warrior's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 7, DEX 15, CON 9, INT 8, WIS 7, CHA 8 — the Kobold Warrior's at its own CR; attack +4 -> +4, DC 12 (print's)
[reskin] print canon: "Kobold — Can turn invisible once per day" heads on the Kobold Warrior — print's rows ride along; the seat stays
[reskin] claim gate: CR 0.25 but the words claim a capability ("Can") — the wildcard stays open
[reskin] claim gate: CR 0.25 but a Humanoid body — the trait seat stays open (print: a material body carries a trait at every tier)
[reskin] signature idea (action): "Once per day, the kobold can fade from sight entirely for the span of a single hunt, lingering unseen until it makes its next strike or the hunt ends. The instant it attacks invisibly, a shimmer of draconic venom clings to the wound, making the target easier for the whole warren to hit." [bonus_action/once_per_fight/condition] — menu: blink, aggro-curse, self-invisibility, focus, feint-slip, coating (+ shelf: lure, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, contagion, pounce)
[reskin] signature bound to the concept's verb: action — self-invisibility (invisible, turn invisible)
[reskin] value check: "Venom Shroud (1/Day)" EV 0 vs floor 1 (a bonus action (free)) — a free row that does nothing (logged)
[reskin] signature dropped by the floor: "Venom Shroud (1/Day)" — the ladder could not lift it; the fallback stands in
[reskin] value check: "Vanish (1/Day)" EV 0 vs floor 1 (a bonus action (free)) — a free row that does nothing (logged)
[reskin] library seed drawn: self-invisibility -> Bonus Actions/"Vanish (1/Day)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The kobold's veins carry a diluted draconic taint, and whenever it lands a melee strike, its venom-slick blade or fangs leave a lingering smear that makes the victim clumsier and easier for the entire pack to drag down." [trait/always/condition] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, bound, undead-fortitude, mimicry
[reskin] signature miss: trait — "The kobold's veins carry a diluted draconic taint, and whenever it lands a melee strike, its venom-slick blade or fangs leave a lingering smear that makes the victim clumsier and easier for the entire pack to drag down." [trait/always/condition] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, bound, undead-fortitude, mimicry)
[reskin] print canon alignment: Neutral Evil -> Neutral — the Kobold Warrior's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon type: Humanoid -> Dragon — the Kobold Warrior's (a Unicorn printed Fey, 2026-10-01)
[reskin] print canon languages: "Draconic, Common" -> "Common, Draconic" — the Kobold Warrior's
[reskin] print canon attack: "Dagger" keeps print's hybrid frame — reach 5 ft. or range 20/60 ft. (the Kobold Warrior's weapon is thrown)
[reskin] print canon attack: "Venom Dagger" -> "Dagger" — the Kobold Warrior's own row
[reskin] print canon trait: Pack Tactics — "Kobold — Can turn invisible once per day" is the Kobold Warrior (print's own row)
[reskin] print canon trait: Sunlight Sensitivity — "Kobold — Can turn invisible once per day" is the Kobold Warrior (print's own row)
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the seat's, not the Kobold Warrior's
[reskin] print canon: chassis row leaves — Traits/"Nimble" is the seat's, not the Kobold Warrior's
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

Groß Konstrukt, Neutral

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

Sprachen Versteht Gemeinsprache plus zwei weitere Sprachen, kann aber nicht sprechen

HG 10 (EP 5,900; ÜB +4)

Eigenschaften

Unveränderliche Form. Der Steingolem kann seine Gestalt nicht ändern.

Magieresistenz. Der Steingolem hat Vorteil auf Rettungswürfe gegen Zauber und andere magische Effekte.

Aktionen

Multiangriff. Der Steingolem führt zwei Angriffe aus und verwendet dabei Schlag oder Kraftstrahl in beliebiger Kombination.

Schlag. Nahkampfangriffswurf: +10, Reichweite 5 ft. 15 (2d8 + 6) Wucht­schaden plus 9 (2d8) Kraftschaden.

Kraftstrahl. Fernkampfangriffswurf: +9, Reichweite 120 ft. 22 (4d10) Kraftschaden.

Bonusaktionen

Verlangsamen (Aufladen 5-6). Der Steingolem wirkt den Zauber Verlangsamen, benötigt keine Zauberkomponenten und verwendet Konstitution als Zauberfähigkeit (Zauberrettungswurf-SG 17).

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
[concept] signature elements: immutable stone form that shatters obstacles [body] | implacable straight-line advance [behavior] | crushing slam with stony fists [object]
[reskin] print canon route: "Stone Golem — " is the Stone Golem — the juggernaut seat stands down for the plain line
[reskin] print canon defenses: HP 182 -> 220, AC 15 -> 18 — the Stone Golem's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 22, DEX 9, CON 20, INT 3, WIS 11, CHA 1 — the Stone Golem's at its own CR; attack +9 -> +10, DC 17 (print's)
[reskin] print canon: "Stone Golem — " is a print creature — the seats stand down; print's own rows are the composition
[reskin] print canon speed: modes walk only — the Stone Golem's
[reskin] print canon senses: "darkvision 120 ft." — the Stone Golem's
[reskin] print canon languages: "Understands the languages of its creator but can't speak" -> "Understands Common plus two other languages but can't speak" — the Stone Golem's
[reskin] print canon speed: 40 ft. -> 30 ft. — the Stone Golem's walk; the concept's other modes stay
[reskin] print canon attack: "Stone Fist" -> "Slam" — the Stone Golem's own row
[reskin] print canon multiattack: "The stone golem makes two attacks, using Slam or Force Bolt in any combination." — the Stone Golem's own
[reskin] print canon attack: "Force Bolt" is print's own row — +9, 22 (4d10), range 120 ft. (an exact body at print's CR)
[reskin] print canon attack: "Shattered Stone" -> "Force Bolt" — the Stone Golem's own ranged row
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
- read: def 1/2 / off 1 → 0.75; sustained 12 (2 × Scimitar); nova Worg Ride-Down 6; dmg 12

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

Skittering Mount. The goblin boss ignores difficult terrain, and opportunity attacks against it are made with disadvantage.
Nimble Escape. As a bonus action, the goblin takes the Disengage or Hide action.

Actions
Multiattack: The goblin boss makes two attacks: one with its Scimitar and one with its Shortbow. It can replace one attack with a use of Goblin's Follow-Through.
Scimitar: Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 6 (1d8 + 2) slashing damage plus 2 (1d4) slashing damage if the attack roll had advantage. If the goblin boss moved at least 20 feet in a straight line toward the target immediately before the hit, the target takes an extra 4 (1d8) slashing damage and, if it is Medium or smaller, is prone.
Shortbow: Ranged Weapon Attack: +4 to hit, range 80/320 ft., one target. Hit: 6 (1d8 + 2) piercing damage.
Worg Ride-Down (Recharge 5-6): The goblin boss moves up to its speed without provoking opportunity attacks and can move through the spaces of Medium or smaller creatures. Each creature whose space it enters must make a DC 12 Strength saving throw, taking 6 (1d12) piercing damage on a failed save and is prone.
Goblin's Follow-Through: One prone creature within 30 feet must make a DC 12 Strength saving throw, taking 5 (1d10) piercing damage on a failed save, or half as much damage on a successful one.
```

**Engine trace**

```
[route] skirmisher-mounted type=Humanoid mechanics=none — skirmisher-mounted: ✓ ("riding a worg") | skirmisher-mounted: key "riding" (class verb)
[concept] cr from print: 1 — a print creature heads the words and the user set none
[concept] signature elements: mounted charge that rides down a target and continues past [behavior] | a goblin's cruel, cowardly cunning [behavior] | a bonded worg mount [object]
[reskin] print canon defenses: HP 26 -> 21, AC 13 -> 17 — the Goblin Boss's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon armor: 17 (chain shirt, shield) — print's Gear line; the 2014 sheet prints it (the Goblin Boss wore "splint", canaries 2026-10-12)
[reskin] print canon array: STR 10, DEX 15, CON 10, INT 10, WIS 8, CHA 10 — the Goblin Boss's at its own CR; attack +3 -> +4, DC 12 (print's)
[reskin] print canon: "Goblin Boss — riding a worg" heads on the Goblin Boss — print's rows ride along; the seat stays
[reskin] claim gate: CR 1 but a Humanoid body — the trait seat stays open (print: a material body carries a trait at every tier)
[reskin] signature idea (action): "The goblin boss designates a visible ally as bait, cutting it down or shoving it into danger to create a distraction; any enemy who sees this must resist the urge to chase the boss, or it is drawn toward the bait and away from the worg's escape route." [action/save/condition] — menu: throw-retrieve, lure, snare-bolt, sensory-strike, disarm, exploiter (+ shelf: delayed-brand, rampage, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte, contagion, charge-push, hook-rider, pounce, isolation, bolt-mark, charge)
[reskin] value check: "Opportunist's Lash" EV 3.9 vs floor 3.1 (one attack of 2) — worth the trade
[reskin] library seed drawn: exploiter -> Actions/"Opportunist's Lash" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The goblin boss's cruelty is so predictable that its worg feeds on the panic it causes; whenever the boss hits a creature that is already frightened or fleeing, the worg becomes faster and more vicious until the end of the boss's next turn." [trait/always/movement] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] signature miss: trait — "The goblin boss's cruelty is so predictable that its worg feeds on the panic it causes; whenever the boss hits a creature that is already frightened or fleeing, the worg becomes faster and more vicious until the end of the boss's next turn." [trait/always/movement] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst, absorption)
[reskin] chassis nova: "Worg Ride-Down (Recharge 5-6)" — the skirmisher-3-mounted's own nova row (its "Trampling Rush", renamed by the model); geometry, cap and rider lines below are its edits
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
[route] brute type=Monstrosity mechanics=none — brute: ✓ ("Owlbear") | brute: no line key in the words — the model's read of its quote
[concept] signature elements: relentless charging assault [behavior] | bear's crushing strength and owl's rending beak [body] | that haunting roar [aura]
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

Hardening Hide. While the troll isn't Bloodied, melee attack rolls against it are made with Disadvantage.

Regeneration. The troll regains 15 Hit Points at the start of each of its turns. If the troll takes Acid or Fire damage, this trait doesn't function on the troll's next turn. The troll dies only if it starts its turn with 0 Hit Points and doesn't regenerate.

Loathsome Limbs. If the troll ends any turn Bloodied and took 15+ Slashing damage during that turn, one of the troll's limbs is severed, falls into the troll's space, and becomes a Troll Limb. The limb acts immediately after the troll's turn. The troll has 1 Exhaustion level for each missing limb, and it grows replacement limbs the next time it regains Hit Points.

Actions

Multiattack. The troll makes two Rend attacks.

Rend. Melee Attack Roll: +7, reach 10 ft. 18 (4d6 + 4) Slashing damage.

Bonus Actions

Charge. The troll moves up to half its Speed straight toward an enemy it can see.

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
[route] defender type=Giant mechanics=none — defender: ✓ ("guards the bridge") | defender: key "guards the" (class verb)
[concept] signature elements: bridge-guarding toll collection [behavior] | stone-shod hide and shield [body] | thunderous club that knocks back [object]
[reskin] print canon defenses: HP 78 -> 94, AC 19 -> 15 — the Troll's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 18, DEX 13, CON 20, INT 7, WIS 9, CHA 7 — the Troll's at its own CR; attack +6 -> +7, DC 16 (print's)
[reskin] print canon: "a troll that guards the bridge and collects a fee" heads on the Troll — print's rows ride along; the seat stays
[reskin] signature idea (action): "The troll slams its club down on the bridge stones, and the span itself booms like a struck gong. Everyone standing on the bridge who has not paid the toll is knocked off their feet and shoved back hard across the line the troll has drawn, landing in a heap where the crossing begins. The troll does not move an inch; the bridge does the work for it." [action/always/movement] — menu: swallow, seal, hook-drag, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up (+ shelf: shell-withdraw, aggro-curse, own-turn-punisher, self-invisibility, rally, riposte, charge-push, hook-rider)
[reskin] value check: "Sundering Shove" EV 2.5 vs floor 9.4 (one attack of 2) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Sundering Shove" — a seed that cannot be lifted does not ship
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "The troll's hide has set into layered stone and mortar, and every wound it takes hardens into a newer, denser seam. Each hit that lands on it leaves it tougher than it was, until its granite skin has drunk up all the punishment the party can pour out." [trait/on_being_hit/defense] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura)
[reskin] signature bound to the concept's verb: trait — bound, guarded-stance (guards the, guard)
[reskin] signature template (trait): guarded-stance -> Traits/"Hardening Hide" ("the troll's hide hardens into layered stone and mortar as it takes hits, making  [verb: guard:concept]")
[reskin] print canon alignment: Neutral -> Chaotic Evil — the Troll's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common" -> "Giant" — the Troll's
[reskin] print canon attack: "Club" -> "Rend" — the Troll's own row
[reskin] print canon rows: Shield Bash leave — the Troll has one melee row (Rend), and Multiattack reads print's
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
- read: def 2 / off 4 → 3; sustained 22 (2 × Lance); nova Hellride Charge 22; dmg 29

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

Grave Recompense. A creature that touches the headless horseman or hits it with a melee attack while within 5 feet of it takes 5 (1d10) Necrotic damage.

Ride-By. The headless horseman ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Actions

Multiattack. The headless horseman makes two Lance attacks. It can replace one attack with a use of Reaper's Snare.

Lance. Melee Attack Roll: +6, reach 5 ft. 7 (1d6 + 4) Piercing damage plus 4 (1d8) Necrotic damage. If the headless horseman moved at least 20 feet in a straight line toward the target immediately before the hit, the target takes an extra 4 (1d8) Piercing damage and, if it is Medium or smaller, has the Prone condition.

Hellride Charge (Recharge 5-6). The headless horseman moves up to its Speed without provoking Opportunity Attacks and can move through the spaces of Medium or smaller creatures. Each creature whose space it enters is targeted once by the following effect. Strength Saving Throw: DC 14. Failure: 22 (5d8) Bludgeoning damage, and the target has the Prone condition.

Reaper's Snare. Strength Saving Throw: DC 14, one creature within 30 feet that is Prone. Failure: 7 (2d6) Necrotic damage. Success: Half damage.

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
[route] skirmisher-mounted type=Undead mechanics=none — skirmisher-mounted: ✓ ("Headless Horseman") | skirmisher-mounted: key "horseman" (class body)
[concept] cr from the words: 4 — the user set none and no print name heads the words; a fixed ladder, never the model's read (critic form-ten 2026-10-01)
[concept] signature elements: the headless rider and his skeletal steed [body] | a skull-seeking midnight charge down the old road [behavior] | a lance of splintered bone [object]
[reskin] nova capped: "Trampling Rush" 24 → 22 (the chassis nova obeys the cap: 22 at CR 4)
[reskin] signature idea (action): "The horseman levels the splintered thigh-bone lance and spurs down the road, and every living creature whose path falls along that line must scatter or be run through. Those who cannot get clear are skewered on the bone and carried along with the rider until they slide free, broken and bleeding." [rider/on_hit/movement] — menu: affliction, contagion, charge-push, hook-rider, pounce, isolation, charge (+ shelf: swallow, condition-payoff, lure, snare-bolt, sensory-strike, disarm, delayed-brand, exploiter, rampage, aggro-curse, self-invisibility, focus, feint-slip, coating, riposte)
[reskin] value check: "Opportunist's Lash" EV 5.4 vs floor 5.2 (one attack of 2) — worth the trade
[reskin] library seed drawn: exploiter -> Actions/"Opportunist's Lash" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The horseman's severed neck is a cold, empty socket that hungers for a living skull. Anyone who strikes the horseman in melee feels that hunger turn on them—a grave-cold pull at their own head that leaves them reeling and sick with necrotic chill." [trait/on_being_hit/condition] — menu: heated-body, absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, warded-mending, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] signature template (trait): heated-body -> Traits/"Grave-Cold Hunger" ("The idea is a reactive punishment for hitting the horseman in melee: 'Anyone who [shape fit, no verb match]")
[reskin] chassis nova: "Graveiron Gallop (Recharge 5-6)" — the skirmisher-3-mounted's own nova row (its "Trampling Rush", renamed by the model); geometry, cap and rider lines below are its edits
```
