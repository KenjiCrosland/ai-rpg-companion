# Review batch — canaries-2026-10-12T17-48-40

The checker ran first. The gate table covers every block in the run; the blocks below span it (lowest CR, highest CR, a 2014 sheet, a 2024 sheet, a print donor, a homebrew with a nova). Each block carries its checker row above and its engine trace below. Hand-derive against the row first; then read for what predicates can't see.

## Gate table — the whole run

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Owlbear | 3 | 2024 | brute-2 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 1/1 |
| Headless Horseman | 4 | 2024 | skirmisher-3-mounted | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/5 |
| Wolf | 5 | 2024 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 2/2 |
| Stone Golem | 10 | 2024 | brute-9 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 5/5 |
| Kobold | 0.25 | 2024 | skirmisher-1 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 5/5 |
| Goblin Boss | 1 (2014) | 2014 | skirmisher-3-mounted | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 5/6 |
| Span-Warden | 5 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/2 | 4/5 |
| Gorehide | 5 | 2024 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 3/3 |
| Vampire Spawn | 5 (2014) | 2014 | lurker-5 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 5/5 |
| Well Drowned Brood | 5 | 2024 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 2/3 |

**Dropped 1 of 12 user clauses** (coverage 92%); concept share 90% (36/40 rows). A run with zero fails and 60% coverage is a failing run.
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

Slippery Skulk (1/Day). The kobold casts Invisibility on itself, requiring no spell components and using Charisma as the spellcasting ability.

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
[concept] signature elements: one daily vanishing [behavior] | small reptilian hide [body] | sling and spear [object]
[reskin] print canon route: the Kobold Warrior's body outranks the skulker seat — no verb in the words names it; the plain skirmisher line
[reskin] print canon defenses: HP 15 -> 7, AC 14 -> 14 — the Kobold Warrior's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 7, DEX 15, CON 9, INT 8, WIS 7, CHA 8 — the Kobold Warrior's at its own CR; attack +4 -> +4, DC 12 (print's)
[reskin] print canon: "Kobold — Can turn invisible once per day" heads on the Kobold Warrior — print's rows ride along; the seat stays
[reskin] claim gate: CR 0.25 but the words claim a capability ("Can") — the wildcard stays open
[reskin] claim gate: CR 0.25 but a Humanoid body — the trait seat stays open (print: a material body carries a trait at every tier)
[reskin] signature idea (action): "The kobold clutches its holy relic-shard and blinks out of sight, leaving only a shimmer where it stood. It stays unseen until it attacks, until it takes a hit, or until the warren's blessing fades a short while later — enough for one ambush, one escape, or one last sling stone from nowhere. Once the gift is spent, the shard goes dull and the kobold must survive on its wits alone until the next da" [action/once_per_fight/condition] — menu: spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed (+ shelf: lure, delayed-brand, blink, aggro-curse, self-invisibility, focus, feint-slip, coating, contagion, pounce)
[reskin] signature bound to the concept's verb: action — self-invisibility (invisible, turn invisible)
[reskin] value check: "Shard Veil (1/Day)" EV 0 vs floor 1 (a bonus action (free)) — a free row that does nothing (logged)
[reskin] signature dropped by the floor: "Shard Veil (1/Day)" — the ladder could not lift it; the fallback stands in
[reskin] value check: "Vanish (1/Day)" EV 0 vs floor 1 (a bonus action (free)) — a free row that does nothing (logged)
[reskin] library seed drawn: self-invisibility -> Bonus Actions/"Vanish (1/Day)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Its hide is a patchwork of small, drab scales that drinks the shadows of narrow tunnels and loose stone. When it presses itself into cover — rubble, masonry, a crack in the warren wall — it simply reads as another piece of the dark to anything larger than itself, and sneaking past a bigger creature is as natural to it as breathing." [trait/always/defense] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, bound, undead-fortitude, mimicry
[reskin] print canon type: Humanoid -> Dragon — the Kobold Warrior's (a Unicorn printed Fey, 2026-10-01)
[reskin] print canon attack: "Spear" -> "Dagger" — the Kobold Warrior's own row
[reskin] print canon trait: Pack Tactics — "Kobold — Can turn invisible once per day" is the Kobold Warrior (print's own row)
[reskin] print canon trait: Sunlight Sensitivity — "Kobold — Can turn invisible once per day" is the Kobold Warrior (print's own row)
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the seat's, not the Kobold Warrior's
[reskin] print canon: chassis row leaves — Traits/"Clinging" is the seat's, not the Kobold Warrior's
```


---

## Stone Golem — highest CR

**Concept:** name: Stone Golem | Output statblock in German

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability |
|---|---|---|---|---|---|---|---|---|---|---|
| Stone Golem | 10 | brute-9 | ok | ok | ok | ok | ok | ok | ok | ok |

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

Immunitäten Gift, Psychisch; Bezaubert, Erschöpfung, Verängstigt, Gelähmt, Versteinert, Vergiftet

Sinne Dunkelsicht 120 ft.; Passive Wahrnehmung 14

Sprachen Versteht Gemeinsprache plus zwei weitere Sprachen, kann aber nicht sprechen

HG 10 (EP 5,900; ÜB +4)

Eigenschaften

Unveränderliche Gestalt. Der Steingolem kann seine Gestalt nicht ändern.

Magieresistenz. Der Steingolem hat Vorteil auf Rettungswürfe gegen Zauber und andere magische Effekte.

Aktionen

Mehrfachangriff. Der Steingolem führt zwei Angriffe aus und verwendet dabei Schlag oder Kraftstrahl in beliebiger Kombination.

Schlag. Nahkampfangriffswurf: +10, Reichweite 5 ft. 15 (2d8 + 6) Wuchtschaden plus 9 (2d8) Kraftschaden.

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
[concept] signature elements: walking through walls and crushing buildings [behavior] | immune to being reshaped or slowed by mortal magic [aura] | pulses of measured elemental force [body]
[reskin] print canon route: "Stone Golem — " is the Stone Golem — the juggernaut seat stands down for the plain line
[reskin] print canon defenses: HP 182 -> 220, AC 15 -> 18 — the Stone Golem's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 22, DEX 9, CON 20, INT 3, WIS 11, CHA 1 — the Stone Golem's at its own CR; attack +9 -> +10, DC 17 (print's)
[reskin] print canon: "Stone Golem — " is a print creature — the seats stand down; print's own rows are the composition
[reskin] print canon speed: modes walk only — the Stone Golem's
[reskin] print canon senses: "darkvision 120 ft." — the Stone Golem's
[reskin] print canon languages: "Common" -> "Understands Common plus two other languages but can't speak" — the Stone Golem's
[reskin] print canon speed: 40 ft. -> 30 ft. — the Stone Golem's walk; the concept's other modes stay
[reskin] print canon multiattack: "The stone golem makes two attacks, using Slam or Force Bolt in any combination." — the Stone Golem's own
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

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability |
|---|---|---|---|---|---|---|---|---|---|---|
| Goblin Boss | 1 (2014) | skirmisher-3-mounted | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1/2 / off 1 → 0.75; sustained 12 (2 × Scimitar); nova Mounted Trample 6; dmg 12

```
Goblin Boss
Small humanoid, neutral evil
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

Worg-Bred. The goblin boss ignores difficult terrain, and opportunity attacks against it are made with disadvantage.
Nimble Escape. As a bonus action, the goblin takes the Disengage or Hide action.

Actions
Multiattack: The goblin boss makes two attacks: one with its Scimitar and one with its Shortbow. It can replace one attack with a use of Opportunist's Lash.
Scimitar: Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 6 (1d8 + 2) slashing damage plus 2 (1d4) slashing damage if the attack roll had advantage. If the goblin boss moved at least 20 feet in a straight line toward the target immediately before the hit, the target takes an extra 4 (1d8) slashing damage and, if it is Medium or smaller, is knocked prone.
Shortbow: Ranged Weapon Attack: +4 to hit, range 80/320 ft., one target. Hit: 6 (1d8 + 2) piercing damage.
Mounted Trample (Recharge 5-6): The goblin boss moves up to its speed without provoking opportunity attacks and can move through the spaces of Medium or smaller creatures. Each creature whose space it enters must succeed on a DC 12 Strength saving throw or take 6 (1d12) piercing damage and be knocked prone.
Opportunist's Lash: One creature within 30 feet of the goblin boss that is prone must make a DC 12 Strength saving throw, taking 5 (1d10) piercing damage on a failed save, or half as much damage on a successful one.
```

**Engine trace**

```
[route] skirmisher-mounted type=Humanoid mechanics=none — skirmisher-mounted: ✓ ("riding a worg") | skirmisher-mounted: key "riding" (class verb)
[concept] cr from print: 1 — a print creature heads the words and the user set none
[concept] signature elements: mounted ride-down charge [behavior] | goblin boss rider [object] | worg mount [body]
[reskin] print canon defenses: HP 26 -> 21, AC 13 -> 17 — the Goblin Boss's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon armor: 17 (chain shirt, shield) — print's Gear line; the 2014 sheet prints it (the Goblin Boss wore "splint", canaries 2026-10-12)
[reskin] print canon array: STR 10, DEX 15, CON 10, INT 10, WIS 8, CHA 10 — the Goblin Boss's at its own CR; attack +3 -> +4, DC 12 (print's)
[reskin] print canon: "Goblin Boss — riding a worg" heads on the Goblin Boss — print's rows ride along; the seat stays
[reskin] claim gate: CR 1 but a Humanoid body — the trait seat stays open (print: a material body carries a trait at every tier)
[reskin] signature idea (action): "The goblin boss barks a jagged command, and its worg lunges at a foe the boss just knocked sprawling. The beast savages that prone enemy while the boss cackles and wheels away, leaving the victim pinned. It can only rally the mount this way when an enemy has already been brought low nearby." [rider/on_hit/damage] — menu: contagion, charge-push, hook-rider, pounce, isolation, bolt-mark, charge (+ shelf: throw-retrieve, lure, snare-bolt, sensory-strike, disarm, delayed-brand, exploiter, rampage, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte)
[reskin] value check: "Opportunist's Lash" EV 3.9 vs floor 3.1 (one attack of 2) — worth the trade
[reskin] library seed drawn: exploiter -> Actions/"Opportunist's Lash" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The goblin boss fights as one with its worg, and the two cover each other's retreats. Whenever the boss spurs the worg past an enemy, the mount snaps and harries, making it harder for that foe to strike back effectively." [trait/always/defense] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] signature miss: trait — "The goblin boss fights as one with its worg, and the two cover each other's retreats. Whenever the boss spurs the worg past an enemy, the mount snaps and harries, making it harder for that foe to strike back effectively." [trait/always/defense] — no template on the shelf shares a verb with the concept or the idea (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst, absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] chassis nova: "Worg Charge (Recharge 5-6)" — the skirmisher-3-mounted's own nova row (its "Trampling Rush", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] print canon type: Humanoid stays — the Goblin Boss is Fey in 2024 only; this is a 2014 sheet (form-ten 2026-10-01)
[reskin] print canon speed: the mount carries the Goblin Boss — its 30 ft. walk yields to the mount's (critic form-ten 2026-10-01)
[reskin] print canon attack: "Shortbow" rolls print's +4 with +2 damage — a print row stands outside the weapon table
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
[concept] signature elements: crushing bear-hug grapple [behavior] | beak that shears into pinned prey [body] | shaggy hide and feathers [body]
[reskin] print canon route: "Owlbear" is the Owlbear — the grappler seat stands down for the plain line
[reskin] print canon defenses: HP 66 -> 59, AC 12 -> 13 — the Owlbear's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 20, DEX 12, CON 17, INT 3, WIS 12, CHA 7 — the Owlbear's at its own CR; attack +5 -> +7, DC 15 (print's)
[reskin] print canon: "Owlbear" is a print creature — the seats stand down; print's own rows are the composition
[reskin] print canon speed: modes climb — the Owlbear's
[reskin] print canon senses: "darkvision 60 ft." — the Owlbear's
[reskin] print canon speed: 30 ft. -> 40 ft. — the Owlbear's walk; the concept's other modes stay
[reskin] print canon speed: Climb -> 40 ft. — the Owlbear's own
[reskin] print canon attack: "Bite" -> "Rend" — the Owlbear's own row
[reskin] print canon multiattack: "The owlbear makes two Rend attacks." — the Owlbear's own, added (the chassis carried none; the Owlbear makes two Rend attacks — canaries 2026-10-12)
```


---

## Span-Warden — a print donor

**Concept:** a troll that guards the bridge and collects a toll

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability |
|---|---|---|---|---|---|---|---|---|---|---|
| Span-Warden | 5 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 3 / off 5 → 4; sustained 36 (2 × Rend); nova none; dmg 36

```
Span-Warden

Large Giant, Lawful Neutral

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

Warding Vigil. While the span-warden isn't Bloodied, melee attack rolls against it are made with Disadvantage.

Regeneration. The span-warden regains 15 Hit Points at the start of each of its turns. If the span-warden takes Acid or Fire damage, this trait doesn't function on the span-warden's next turn. The span-warden dies only if it starts its turn with 0 Hit Points and doesn't regenerate.

Loathsome Limbs. If the span-warden ends any turn Bloodied and took 15+ Slashing damage during that turn, one of the span-warden's limbs is severed, falls into the span-warden's space, and becomes a Troll Limb. The limb acts immediately after the span-warden's turn. The span-warden has 1 Exhaustion level for each missing limb, and it grows replacement limbs the next time it regains Hit Points.

Actions

Multiattack. The span-warden makes two Rend attacks.

Rend. Melee Attack Roll: +7, reach 10 ft. 18 (4d6 + 4) Slashing damage.

Bonus Actions

Charge. The span-warden moves up to half its Speed straight toward an enemy it can see.

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
[concept] signature elements: bridge-guard duty and toll collection [behavior] | stone-shrugging hide and regeneration [body] | poleaxe and shield used as a barrier [object]
[reskin] print canon defenses: HP 78 -> 94, AC 19 -> 15 — the Troll's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 18, DEX 13, CON 20, INT 7, WIS 9, CHA 7 — the Troll's at its own CR; attack +6 -> +7, DC 16 (print's)
[reskin] print canon: "a troll that guards the bridge and collects a fee" heads on the Troll — print's rows ride along; the seat stays
[reskin] signature idea (action): "The span-warden slams its shield down and declares the bridge closed, demanding a toll from everyone on the span. Anyone who wants to cross must pay in coin, livestock, or plunder dropped at its feet and step back while it counts; intruders who refuse are simply beaten off the edge and forced back to the near side. The warden only makes this demand once, and it keeps its word — whoever pays is wav" [action/always/condition] — menu: swallow, seal, hook-drag, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up (+ shelf: shell-withdraw, aggro-curse, own-turn-punisher, self-invisibility, rally, riposte, charge-push, hook-rider)
[reskin] signature miss: action — "The span-warden slams its shield down and declares the bridge closed, demanding a toll from everyone on the span. Anyone who wants to cross must pay in coin, livestock, or plunder dropped at its feet and step back while it counts; intruders who refuse are simply beaten off the edge and forced back to the near side. The warden only makes this demand once, and it keeps its word — whoever pays is wav" [action/always/condition] — the model found no template that holds it (offered: swallow, seal, hook-drag, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, rally, charge-push)
[reskin] value check: "Horrid Display (2/Day)" EV 19.8 vs floor 30.4 (the whole Multiattack (2 attacks)) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Horrid Display (2/Day)" — a seed that cannot be lifted does not ship
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "The warden's hide is bridge-stone cured by toll-silver, so the wounds it takes on the span knit closed faster the longer it stands its post, while any who strike it are drenched in the same stony, settling weight and grow briefly too heavy to slip past it." [trait/on_being_hit/defense] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura)
[reskin] signature bound to the concept's verb: trait — bound, guarded-stance (guards the, guard)
[reskin] signature template (trait): guarded-stance -> Traits/"Toll-Stone Vigil" ("the warden's wounds knit closed while it stands its post — a defensive stance ro [verb: guard:concept]")
[reskin] print canon languages: "Common, Giant" -> "Giant" — the Troll's
[reskin] print canon attack: "Poleaxe" -> "Rend" — the Troll's own row
[reskin] print canon rows: Shield leave — the Troll has one melee row (Rend), and Multiattack reads print's
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
- read: def 2 / off 4 → 3; sustained 22 (2 × Saber); nova Hell Ride 22; dmg 29

```
Headless Horseman

Medium Undead, Neutral Evil

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

Headlong Gallop. The horseman ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Actions

Multiattack. The horseman makes two Saber attacks. It can replace one attack with a use of Opportunist's Lash.

Saber. Melee Attack Roll: +6, reach 5 ft. 7 (1d6 + 4) Slashing damage plus 4 (1d8) Necrotic damage. If the horseman moved at least 20 feet in a straight line toward the target immediately before the hit, the target takes an extra 4 (1d8) Slashing damage and, if it is Medium or smaller, has the Prone condition.

Hell Ride (Recharge 5-6). The horseman moves up to its Speed without provoking Opportunity Attacks and can move through the spaces of Medium or smaller creatures. Each creature whose space it enters is targeted once by the following effect. Strength Saving Throw: DC 14. Failure: 22 (5d8) Bludgeoning damage, and the target has the Prone condition.

Opportunist's Lash. Strength Saving Throw: DC 14, one creature within 30 feet that is Prone. Failure: 7 (2d6) Necrotic damage. Success: Half damage.

Bonus Actions

Mounted Agility. The horseman takes the Dash or Disengage action.

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
[concept] signature elements: headless charge that rides down prey [behavior] | separated head and neck stump that spouts grave-dust [body] | cursed midnight road [aura]
[reskin] nova capped: "Trampling Rush" 24 → 22 (the chassis nova obeys the cap: 22 at CR 4)
[reskin] signature idea (action): "The horseman tears its own head free and hurls it at a creature it can see — the severed head shrieks through the air and buries itself in the victim, gnawing and riding them from within while the headless body keeps fighting. While the head is lodged, grave-dust streams from the neck stump, and the buried head can be wrenched free by the victim's allies, which only sends it flying back to its nec" [rider/on_hit/damage] — menu: affliction, contagion, charge-push, hook-rider, pounce, isolation, charge (+ shelf: swallow, condition-payoff, lure, snare-bolt, sensory-strike, disarm, delayed-brand, exploiter, rampage, aggro-curse, self-invisibility, focus, feint-slip, coating, riposte)
[reskin] value check: "Opportunist's Lash" EV 5.4 vs floor 5.2 (one attack of 2) — worth the trade
[reskin] library seed drawn: exploiter -> Actions/"Opportunist's Lash" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Whenever the horseman is struck in melee, its neck stump erupts with a choking spout of grave-dust that clings to the attacker, blinding them and marking them for the horseman's next pass. This dust also settles on any creature the horseman leaves Prone, letting it sense exactly where they are as it circles back." [trait/on_being_hit/condition] — menu: heated-body, absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, warded-mending, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] signature miss: trait — "Whenever the horseman is struck in melee, its neck stump erupts with a choking spout of grave-dust that clings to the attacker, blinding them and marking them for the horseman's next pass. This dust also settles on any creature the horseman leaves Prone, letting it sense exactly where they are as it circles back." [trait/on_being_hit/condition] — the model found no template that holds it (offered: heated-body, absorption, bloodied-burst, resonant-body, faultless-tracker)
[reskin] chassis nova: "Hell Ride (Recharge 5-6)" — the skirmisher-3-mounted's own nova row (its "Trampling Rush", renamed by the model); geometry, cap and rider lines below are its edits
```
