# Review batch — canaries-2026-10-12T16-10-32

The checker ran first. The gate table covers every block in the run; the blocks below span it (lowest CR, highest CR, a 2014 sheet, a 2024 sheet, a print donor, a homebrew with a nova, one marked soft, bands soft). Each block carries its checker row above and its engine trace below. Hand-derive against the row first; then read for what predicates can't see.

## Gate table — the whole run

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Owlbear | 3 | 2024 | brute-2 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 1/1 |
| Headless Horseman | 4 | 2024 | skirmisher-3-mounted | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/5 |
| Wolf | 5 | 2024 | skirmisher-3 | ok | SOFT: aim-dpr, band | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 2/2 |
| Steingolem | 10 | 2024 | brute-9 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | soft (1) | 1/1 | 4/6 |
| Kobold | 0.25 | 2024 | skirmisher-1 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 5/5 |
| Goblin Boss | 1 (2014) | 2014 | skirmisher-3-mounted | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 5/6 |
| Tollbridge Troll | 5 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 5/5 |
| Clubtooth Marrowbelly | 5 | 2024 | brute-5 | ok | SOFT: aim-dpr, band | ok | ok | ok | ok | ok | ok | soft (1) | 1/2 | 3/3 |
| Vampire Spawn | 5 (2014) | 2014 | lurker-5 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 5/5 |
| Wellshade | 5 | 2024 | lurker-5-trap | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 0/4 |

**Dropped 2 of 12 user clauses** (coverage 83%); concept share 81% (34/42 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- none



---

## Kobold — lowest CR

**Concept:** name: Kobold | Can turn invisible once per day

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability |
|---|---|---|---|---|---|---|---|---|---|---|
| Kobold | 0.25 | skirmisher-1 | ok | ok | ok | ok | ok | ok | ok | ok |

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

Dagger. Melee Attack Roll: +4, reach 5 ft. 6 (1d8 + 2) Piercing damage.

Sling. Ranged Attack Roll: +4, range 30/120 ft. 6 (1d8 + 2) Bludgeoning damage.

Bonus Actions

Kobold's Disappearance (1/Day). The kobold casts Invisibility on itself, requiring no spell components and using Charisma as the spellcasting ability.

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
[concept] signature elements: once-per-day invisibility used to ambush or escape [behavior] | small scaly hide and jagged blade [body] | skulking, trap-laying pack cowardice [behavior]
[reskin] print canon route: the Kobold Warrior's body outranks the skulker seat — no verb in the words names it; the plain skirmisher line
[reskin] print canon defenses: HP 15 -> 7, AC 14 -> 14 — the Kobold Warrior's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 7, DEX 15, CON 9, INT 8, WIS 7, CHA 8 — the Kobold Warrior's at its own CR; attack +4 -> +4, DC 12 (print's)
[reskin] print canon: "Kobold — Can turn invisible once per day" heads on the Kobold Warrior — print's rows ride along; the seat stays
[reskin] claim gate: CR 0.25 but the words claim a capability ("Can") — the wildcard stays open
[reskin] claim gate: CR 0.25 but a Humanoid body — the trait seat stays open (print: a material body carries a trait at every tier)
[reskin] signature idea (action): "The kobold vanishes from sight until it attacks or a short time passes, reappearing only when it strikes. It can do this once, and saves the vanish for ambushing a distracted foe or slipping away when the fight turns against it. While unseen, its first strike from hiding is especially vicious." [action/once_per_fight/condition] — menu: spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed (+ shelf: lure, delayed-brand, blink, aggro-curse, self-invisibility, focus, feint-slip, coating, contagion, pounce)
[reskin] signature bound to the concept's verb: action — self-invisibility (invisible, turn invisible)
[reskin] value check: "Cowering Veil (1/Day)" EV 0 vs floor 1 (a bonus action (free)) — a free row that does nothing (logged)
[reskin] signature dropped by the floor: "Cowering Veil (1/Day)" — the ladder could not lift it; the fallback stands in
[reskin] value check: "Vanish (1/Day)" EV 0 vs floor 1 (a bonus action (free)) — a free row that does nothing (logged)
[reskin] library seed drawn: self-invisibility -> Bonus Actions/"Vanish (1/Day)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "When the kobold hits a creature that hasn't acted yet in the fight, or that is distracted by another enemy, its jagged blade tears at a vulnerable spot, leaving the wound bleeding and hard to close." [trait/always/damage] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, bound, undead-fortitude, mimicry
[reskin] signature miss: trait — "When the kobold hits a creature that hasn't acted yet in the fight, or that is distracted by another enemy, its jagged blade tears at a vulnerable spot, leaving the wound bleeding and hard to close." [trait/always/damage] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, bound, undead-fortitude, mimicry)
[reskin] print canon type: Humanoid -> Dragon — the Kobold Warrior's (a Unicorn printed Fey, 2026-10-01)
[reskin] print canon attack: "Shiv" -> "Dagger" — the Kobold Warrior's own row
[reskin] print canon trait: Pack Tactics — "Kobold — Can turn invisible once per day" is the Kobold Warrior (print's own row)
[reskin] print canon trait: Sunlight Sensitivity — "Kobold — Can turn invisible once per day" is the Kobold Warrior (print's own row)
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the seat's, not the Kobold Warrior's
[reskin] print canon: chassis row leaves — Traits/"Skitter" is the seat's, not the Kobold Warrior's
```


---

## Steingolem — highest CR

**Concept:** name: Stone Golem | Output statblock in German

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability |
|---|---|---|---|---|---|---|---|---|---|---|
| Steingolem | 10 | brute-9 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok |

- donor · soft · print-rows: rows outside print, the named seat and the keyed seeds: Actions/Multiangriff, Actions/Schlag
- read: def 10 / off 0 → 5; sustained 0 (1 × ?); nova none; dmg 0

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

Immunitäten Gift, Psychisch; Bezaubert, Erschöpfung, Verängstigt, Gelähmt, Versteinert, Vergiftet

Sinne Dunkelsicht 120 ft.; Passive Wahrnehmung 14

Sprachen Versteht Gemeinsprache plus zwei andere Sprachen, kann aber nicht sprechen

HG 10 (EP 5,900; ÜB +4)

Eigenschaften

Unveränderliche Gestalt. Der Steingolem kann seine Gestalt nicht ändern.

Magieresistenz. Der Steingolem hat Vorteil auf Rettungswürfe gegen Zauber und andere magische Effekte.

Aktionen

Multiangriff. Der Steingolem führt zwei Angriffe aus und verwendet dabei Schlag oder Kraftstrahl in beliebiger Kombination.

Schlag. Nahkampfangriffswurf: +10, Reichweite 5 ft. 15 (2d8 + 6) Wuchtschaden plus 9 (2d8) Kraftschaden.

Kraftstrahl. Fernkampfangriffswurf: +10, Reichweite 60/240 ft. 30 (7d6 + 6) Kraftschaden.

Bonusaktionen

Verlangsamen (Aufladen 5-6). Der Steingolem wirkt den Zauber Verlangsamen, benötigt keine Zauberkomponenten und verwendet Konstitution als Zauberfertigkeit (Zauberrettungswurf-SG 17).

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
[concept] signature elements: pulverizing stone fists [body] | relentless unstoppable advance [behavior] | constructed guardian bound to a lost covenant [aura]
[reskin] print canon route: "Stone Golem — " is the Stone Golem — the juggernaut seat stands down for the plain line
[reskin] print canon defenses: HP 182 -> 220, AC 15 -> 18 — the Stone Golem's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 22, DEX 9, CON 20, INT 3, WIS 11, CHA 1 — the Stone Golem's at its own CR; attack +9 -> +10, DC 17 (print's)
[reskin] print canon: "Stone Golem — " is a print creature — the seats stand down; print's own rows are the composition
[reskin] print canon speed: modes walk only — the Stone Golem's
[reskin] print canon senses: "darkvision 120 ft." — the Stone Golem's
[reskin] print canon languages: "Understands the languages of its creator but can't speak" -> "Understands Common plus two other languages but can't speak" — the Stone Golem's
[reskin] print canon speed: 40 ft. -> 30 ft. — the Stone Golem's walk; the concept's other modes stay
[reskin] print canon multiattack: "The stone golem makes two attacks, using Slam or Force Bolt in any combination." — the Stone Golem's own
[reskin] print canon attack: "Force Bolt" rolls print's +10 with +6 damage — a print row stands outside the weapon table
[reskin] print canon attack: "Stone Hurl" -> "Force Bolt" — the Stone Golem's own ranged row
[reskin] print canon defenses: immunities Poison; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned -> Poison, Psychic; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned — the Stone Golem's own header lines
[reskin] print canon trait: Immutable Form — print's text replaces the chassis's (the Troll regenerates 15, not the chassis's 10 — critic's audit 2026-10-02)
[reskin] print canon trait: Magic Resistance — print's text replaces the chassis's (the Troll regenerates 15, not the chassis's 10 — critic's audit 2026-10-02)
[reskin] print canon row: Bonus Actions/Slow (Recharge 5-6) — the Stone Golem's own
```


---

## Goblin Boss — a 2014 sheet

**Concept:** name: Goblin Boss | riding a worg

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability |
|---|---|---|---|---|---|---|---|---|---|---|
| Goblin Boss | 1 (2014) | skirmisher-3-mounted | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1/2 / off 1 → 0.75; sustained 12 (2 × Scimitar); nova Ride-Down 6; dmg 12

```
Goblin Boss
Small humanoid, neutral evil
Armor Class

17 (splint)

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

Worg Agility. The goblin boss ignores difficult terrain, and opportunity attacks against it are made with disadvantage.
Nimble Escape. As a bonus action, the goblin takes the Disengage or Hide action.

Actions
Multiattack: The goblin boss makes two attacks: one with its Scimitar and one with its Shortbow. It can replace one attack with a use of Brutal Lash.
Scimitar: Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 6 (1d8 + 2) slashing damage plus 2 (1d4) slashing damage if the attack roll had advantage. If the goblin boss moved at least 20 feet in a straight line toward the target immediately before the hit, the target takes an extra 4 (1d8) slashing damage and, if it is Medium or smaller, is prone.
Shortbow: Ranged Weapon Attack: +4 to hit, range 80/320 ft., one target. Hit: 6 (1d8 + 2) piercing damage.
Ride-Down (Recharge 5-6): The goblin boss moves up to its speed without provoking opportunity attacks and can move through the spaces of Medium or smaller creatures. Each creature whose space it enters must make a DC 12 Strength saving throw, taking 6 (1d12) bludgeoning damage and being knocked prone on a failed save.
Brutal Lash: One creature within 30 feet that is prone must make a DC 12 Strength saving throw, taking 5 (1d10) piercing damage on a failed save, or half as much damage on a successful one.
```

**Engine trace**

```
[route] skirmisher-mounted type=Humanoid mechanics=none — skirmisher-mounted: ✓ ("riding a worg") | skirmisher-mounted: key "riding" (class verb)
[concept] cr from print: 1 — a print creature heads the words and the user set none
[concept] signature elements: mounted charge that carries past the target [behavior] | iron-hardened goblin flesh [body] | a goblin boss astride a worg [body]
[reskin] print canon defenses: HP 26 -> 21, AC 13 -> 17 — the Goblin Boss's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 10, DEX 15, CON 10, INT 10, WIS 8, CHA 10 — the Goblin Boss's at its own CR; attack +3 -> +4, DC 12 (print's)
[reskin] print canon: "Goblin Boss — riding a worg" heads on the Goblin Boss — print's rows ride along; the seat stays
[reskin] claim gate: CR 1 but a Humanoid body — the trait seat stays open (print: a material body carries a trait at every tier)
[reskin] signature idea (action): "The goblin boss hurls a javelin with such iron-hardened force that it punches clean through the first creature it strikes and keeps flying, threatening a second foe lined up behind. The throw happens as part of his normal ranged attack, but the terrible momentum can skewer two enemies in a single cast." [rider/on_hit/damage] — menu: contagion, charge-push, hook-rider, pounce, isolation, bolt-mark, charge (+ shelf: throw-retrieve, lure, snare-bolt, sensory-strike, disarm, delayed-brand, exploiter, rampage, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte)
[reskin] signature miss: action — "The goblin boss hurls a javelin with such iron-hardened force that it punches clean through the first creature it strikes and keeps flying, threatening a second foe lined up behind. The throw happens as part of his normal ranged attack, but the terrible momentum can skewer two enemies in a single cast." [rider/on_hit/damage] — the model found no template that holds it (offered: contagion, charge-push, hook-rider, pounce, isolation, bolt-mark, charge, throw-retrieve)
[reskin] value check: "Opportunist's Lash" EV 3.9 vs floor 3.1 (one attack of 2) — worth the trade
[reskin] library seed drawn: exploiter -> Actions/"Opportunist's Lash" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "His body is raw living iron: whenever a foe's weapon bites into him, the jarring impact numbs the attacker's arm and makes their next swing clumsy and slow." [trait/on_being_hit/condition] — menu: absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst)
[reskin] chassis nova: "Ride-Down (Recharge 5-6)" — the skirmisher-3-mounted's own nova row (its "Trampling Rush", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] print canon type: Humanoid stays — the Goblin Boss is Fey in 2024 only; this is a 2014 sheet (form-ten 2026-10-01)
[reskin] print canon speed: the mount carries the Goblin Boss — its 30 ft. walk yields to the mount's (critic form-ten 2026-10-01)
[reskin] print canon attack: "Iron Scimitar" -> "Scimitar" — the Goblin Boss's own row
[reskin] print canon attack: "Shortbow" rolls print's +4 with +2 damage — a print row stands outside the weapon table
[reskin] print canon attack: "Javelin" -> "Shortbow" — the Goblin Boss's own ranged row
[reskin] print canon row: Bonus Actions/Nimble Escape — the Goblin Boss's own
[reskin] print canon: chassis row leaves — Bonus Actions/"Mounted Agility" yields to the Goblin Boss's Nimble Escape
```


---

## Owlbear — a 2024 sheet

**Concept:** name: Owlbear | 

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability |
|---|---|---|---|---|---|---|---|---|---|---|
| Owlbear | 3 | brute-2 | ok | ok | ok | ok | ok | ok | ok | ok |

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
[concept] signature elements: bone-crushing hug [behavior] | feathered bear-hide [body] | hooked beak and talons [body]
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

## Tollbridge Troll — a print donor

**Concept:** a troll that guards the bridge and collects a toll

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability |
|---|---|---|---|---|---|---|---|---|---|---|
| Tollbridge Troll | 5 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 3 / off 5 → 4; sustained 36 (2 × Rend); nova none; dmg 36

```
Tollbridge Troll

Large Giant, Neutral Evil

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

Bound. The tollbridge troll is bound to its resting place. It can't willingly move more than 120 feet from its resting place, and it always knows the direction and distance to its resting place.

Regeneration. The tollbridge troll regains 15 Hit Points at the start of each of its turns. If the tollbridge troll takes Acid or Fire damage, this trait doesn't function on the tollbridge troll's next turn. The tollbridge troll dies only if it starts its turn with 0 Hit Points and doesn't regenerate.

Loathsome Limbs. If the tollbridge troll ends any turn Bloodied and took 15+ Slashing damage during that turn, one of the tollbridge troll's limbs is severed, falls into the tollbridge troll's space, and becomes a Troll Limb. The limb acts immediately after the tollbridge troll's turn. The tollbridge troll has 1 Exhaustion level for each missing limb, and it grows replacement limbs the next time it regains Hit Points.

Actions

Multiattack. The tollbridge troll makes two Rend attacks.

Rend. Melee Attack Roll: +7, reach 10 ft. 18 (4d6 + 4) Slashing damage.

Bonus Actions

Charge. The tollbridge troll moves up to half its Speed straight toward an enemy it can see.

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
[route] defender type=Giant mechanics=none — brute-regenerator: ✓ ("a troll that guards the bridge") | brute-regenerator -> defender: the concept's VERB outranks the noun (key "guards the", class verb) | defender: key "guards the" (class verb)
[concept] signature elements: demanding a toll from every traveler [behavior] | a stone bridge held as its territory [object] | thick hide and a shield used to block passage [body]
[reskin] print canon defenses: HP 78 -> 94, AC 19 -> 15 — the Troll's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 18, DEX 13, CON 20, INT 7, WIS 9, CHA 7 — the Troll's at its own CR; attack +6 -> +7, DC 16 (print's)
[reskin] print canon: "a troll that guards the bridge and collects a fee" heads on the Troll — print's rows ride along; the seat stays
[reskin] signature idea (action): "With a roar of 'TOLL UNPAID!' the troll slams its hammer's butt against the bridge stone, and the hollow boom rolls out along the span. Every creature standing on the bridge who hasn't paid the toll hears the crack of a dropped flagstone underfoot and must scramble or stumble as the troll announces them marked for punishment. Anyone who has paid, or who never set foot on the span, hears only noise" [action/save/condition] — menu: swallow, seal, hook-drag, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up (+ shelf: shell-withdraw, aggro-curse, own-turn-punisher, self-invisibility, rally, riposte, charge-push, hook-rider)
[reskin] value check: "Sundering Shove" EV 2.5 vs floor 9.4 (one attack of 2) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Sundering Shove" — a seed that cannot be lifted does not ship
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "The troll's will saturates the old stone it claimed; as long as it stands anywhere on its bridge, the span itself answers to it. Whoever tries to slip past it along the span without paying the toll finds the stones twisting their footing and slowing them, as though the bridge leans against the toll-jumper." [trait/always/movement] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending, weapon-lodge)
[reskin] signature bound to the concept's verb: trait — bound, guarded-stance (guards the, guard)
[reskin] signature miss: trait — "The troll's will saturates the old stone it claimed; as long as it stands anywhere on its bridge, the span itself answers to it. Whoever tries to slip past it along the span without paying the toll finds the stones twisting their footing and slowing them, as though the bridge leans against the toll-jumper." [trait/always/movement] — the model found no template that holds it (offered: bound, guarded-stance)
[reskin] signature template (trait): bound -> Traits/"Bound" ("exact concept match [verb: guards the:concept]")
[reskin] print canon languages: "Giant, Common" -> "Giant" — the Troll's
[reskin] print canon attack: "Hammer" -> "Rend" — the Troll's own row
[reskin] print canon rows: Shoulder leave — the Troll has one melee row (Rend), and Multiattack reads print's
[reskin] print canon trait: Loathsome Limbs — "a troll that guards the bridge and collects a fee" is the Troll (print's own row)
[reskin] print canon trait: Regeneration — print's text replaces the chassis's (the Troll regenerates 15, not the chassis's 10 — critic's audit 2026-10-02)
[reskin] print canon row: Bonus Actions/Charge — the Troll's own
```


---

## Headless Horseman — a homebrew with a nova

**Concept:** name: Headless Horseman | 

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability |
|---|---|---|---|---|---|---|---|---|---|---|
| Headless Horseman | 4 | skirmisher-3-mounted | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 2 / off 4 → 3; sustained 22 (2 × Saber); nova Ride-Down 22; dmg 29

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

Unhallowed Charge. Headless ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Actions

Multiattack. Headless makes two Saber attacks. It can replace one attack with a use of Trampling Dread.

Saber. Melee Attack Roll: +6, reach 5 ft. 7 (1d6 + 4) Slashing damage plus 4 (1d8) Necrotic damage. If Headless moved at least 20 feet in a straight line toward the target immediately before the hit, the target takes an extra 4 (1d8) Slashing damage and, if it is Medium or smaller, has the Prone condition.

Ride-Down (Recharge 5-6). Headless moves up to its Speed without provoking Opportunity Attacks and can move through the spaces of Medium or smaller creatures. Each creature whose space it enters is targeted once by the following effect. Strength Saving Throw: DC 14. Failure: 22 (5d8) Necrotic damage, and the target has the Prone condition.

Trampling Dread. Wisdom Saving Throw: DC 14, one creature within 30 feet that has the Prone condition. Failure: 10 (3d6) Necrotic damage. Success: Half damage.

Bonus Actions

Mounted Agility. Headless takes the Dash or Disengage action.

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
[concept] signature elements: headless body [body] | mounted charge [behavior] | spectral steed [object]
[reskin] nova capped: "Trampling Rush" 24 → 22 (the chassis nova obeys the cap: 22 at CR 4)
[reskin] signature idea (action): "The horseman makes a sweep with his saber that passes through all enemies in a wide arc in front of him, leaving a trail of black frost. Those caught in the sweep are chilled to the bone and move sluggishly, their steps faltering for a short time." [rider/on_hit/condition] — menu: affliction, contagion, charge-push, hook-rider, pounce, isolation, charge (+ shelf: swallow, condition-payoff, lure, snare-bolt, sensory-strike, disarm, delayed-brand, exploiter, rampage, aggro-curse, self-invisibility, focus, feint-slip, coating, riposte)
[reskin] signature miss: action — "The horseman makes a sweep with his saber that passes through all enemies in a wide arc in front of him, leaving a trail of black frost. Those caught in the sweep are chilled to the bone and move sluggishly, their steps faltering for a short time." [rider/on_hit/condition] — the model found no template that holds it (offered: affliction, contagion, charge-push, hook-rider, pounce, isolation, charge, condition-payoff, exploiter, riposte)
[reskin] value check: "Merciless Strike" EV 7.8 vs floor 5.2 (one attack of 2) — dice 21 → 10 (scaled down to the ceiling)
[reskin] library seed drawn: condition-payoff -> Actions/"Merciless Strike" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The horseman draws strength from the headless dead. Whenever a living creature dies nearby, he gains a surge of speed and his saber crackles with deeper necrotic energy until the end of his next turn." [trait/always/movement] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature miss: trait — "The horseman draws strength from the headless dead. Whenever a living creature dies nearby, he gains a surge of speed and his saber crackles with deeper necrotic energy until the end of his next turn." [trait/always/movement] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst, fire-aura)
[reskin] chassis nova: "Ride-Down (Recharge 5-6)" — the skirmisher-3-mounted's own nova row (its "Trampling Rush", renamed by the model); geometry, cap and rider lines below are its edits
```


---

## Wolf — one marked soft

**Concept:** a wolf

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability |
|---|---|---|---|---|---|---|---|---|---|---|
| Wolf | 5 | skirmisher-3 | ok | SOFT: aim-dpr, band | ok | ok | ok | ok | ok | ok |

- bands · soft · aim-dpr: damage 12 a round is 70% under the card's 40
- bands · soft · band: reads CR 2.5 (print at 5 reads 2–8, n=52)
- read: def 3 / off 2 → 2.5; sustained 12 (2 × Bite); nova none; dmg 12

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

Bite. Melee Attack Roll: +6, reach 5 ft. 6 (1d6 + 3) Piercing damage. If the target is a Medium or smaller creature, it has the Prone condition.

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
[concept] signature elements: dart-in hamstring and retreat [behavior] | pack tactics and flanking [behavior] | hide shaggy and scarred [body]
[reskin] print canon array: STR 14, DEX 16, CON 12, INT 3, WIS 12, CHA 6 — the Wolf's, DEX fitted to +6
[reskin] print canon: "a wolf" is a print creature — the seats stand down; print's own rows are the composition
[reskin] print canon speed: modes walk only — the Wolf's
[reskin] print canon senses: "darkvision 60 ft." — the Wolf's
[reskin] print canon size: Large -> Medium — the Wolf's
[reskin] print canon name: "Timber Wolf" -> "Wolf" — a whole print name is the creature's name (the Goblin Boss shipped as Krag the Iron Standard, 2026-10-01)
[reskin] print canon speed: 50 ft. -> 40 ft. — the Wolf's walk; the concept's other modes stay
[reskin] print canon trait: Pack Tactics — "a wolf" is the Wolf (print's own row)
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the seat's, not the Wolf's
[reskin] print canon: chassis row leaves — Traits/"Woodland Stride" is the seat's, not the Wolf's
```


---

## Clubtooth Marrowbelly — bands soft

**Concept:** big ogre with a club, cr 5

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability |
|---|---|---|---|---|---|---|---|---|---|---|
| Clubtooth Marrowbelly | 5 | brute-5 | ok | SOFT: aim-dpr, band | ok | ok | ok | ok | ok | ok |

- bands · soft · aim-dpr: damage 24 a round is 40% under the card's 40
- bands · soft · band: reads CR 3.5 (print at 5 reads 2–8, n=52)
- read: def 3 / off 4 → 3.5; sustained 24 (2 × Club); nova none; dmg 24

```
Clubtooth Marrowbelly

Large Giant, Chaotic Neutral

AC 14
Initiative -1 (9)

HP 102 (12d10 + 36)

Speed 40 ft.

MOD
SAVE
STR
16
+3
+6
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

Skills Athletics +6, Perception +1

Senses darkvision 60 ft.; Passive Perception 11

Languages Common, Giant

CR 5 (XP 1,800; PB +3)

Actions

Multiattack. The ogre makes two attacks, using Club or Slam in any combination.

Club. Melee Attack Roll: +6, reach 10 ft. 12 (2d8 + 3) Bludgeoning damage, and the target's Speed is reduced by 10 feet until the start of the clubtooth marrowbelly's next turn.

Slam. Melee Attack Roll: +6, reach 5 ft. 12 (2d8 + 3) Piercing damage, and the target's Speed is reduced by 10 feet until the start of the clubtooth marrowbelly's next turn.

Boulder. Ranged Attack Roll: +6, range 60/240 ft. 16 (3d8 + 3) Bludgeoning damage.

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
[concept] signature elements: oversized club sweeps that scatter a formation [object] | thick hide that shrugs off light blows [body] | toys with and chases down bloodied prey [behavior]
[reskin] print canon array: STR 16, DEX 8, CON 16, INT 5, WIS 7, CHA 7 — the Ogre's, STR fitted to +6
[reskin] print canon: "big ogre with a club, cr 5" heads on the Ogre — print's rows ride along; the seat stays
[reskin] signature idea (action): "It swings its club in a wide, ground-hugging arc at everyone in front of it. Creatures caught in the sweep are thrown off balance and no longer work together, and any that are already wounded get their legs cut out from under them." [action/save/condition] — menu: swallow, trample, leap, throw-retrieve, hook-drag, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up (+ shelf: rampage, shell-withdraw, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, charge-push, hook-rider, pounce, charge)
[reskin] value check: "Driving Bellow (2/Day)" EV 7 vs floor 30.4 (the whole Multiattack (2 attacks)) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Driving Bellow (2/Day)" — a seed that cannot be lifted does not ship
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "The smell of its own blood drives it wild. Whenever something wounds it, it can immediately lurch toward the one that hurt it or take a clumsy swing at whoever is nearest, never backing away." [trait/on_being_hit/movement] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] signature miss: trait — "The smell of its own blood drives it wild. Whenever something wounds it, it can immediately lurch toward the one that hurt it or take a clumsy swing at whoever is nearest, never backing away." [trait/on_being_hit/movement] — the model found no template that holds it (offered: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge, uncanny-sense, bloodied-fury)
[reskin] print canon languages: "Common" -> "Common, Giant" — the Ogre's
[reskin] print canon row: Actions/Javelin — the Ogre's second melee row, beside the chassis's
```
