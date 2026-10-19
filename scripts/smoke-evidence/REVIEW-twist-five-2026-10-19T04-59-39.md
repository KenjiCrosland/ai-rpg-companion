# Review batch — twist-five-2026-10-19T04-59-39

The checker ran first. The gate table covers every block in the run; every block of the run follows. Each block carries its checker row above and its engine trace below. Hand-derive against the row first; then read for what predicates can't see.

## Gate table — the whole run

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Gravebound Conscript | 2 | 2024 | brute-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/3 |
| Arena Oathbones | 4 | 2024 | brute-2 | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 2/2 |
| Hillreach Ogre | 3 | 2024 | brute-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/3 |
| Warren Troll | 6 | 2024 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |
| Unlistened | 9 | 2024 | brute-9 | ok | SOFT: aim-atk | ok | ok | ok | ok | ok | ok | ok | ok | soft (1) | 2/2 | 2/2 |

**Dropped 0 of 6 user clauses** (coverage 100%); concept share 100% (14/14 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- none



---

## Gravebound Conscript — lowest CR

**Concept:** a skeleton with a greatsword

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Gravebound Conscript | 2 | brute-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1/2 / off 2 → 1.25; sustained 12 (1 × Greatsword); nova none; dmg 12

```
Gravebound Conscript

Medium Undead, Lawful Evil

AC 12
Initiative +3 (13)

HP 52 (8d8 + 16)

Speed 30 ft.

MOD
SAVE
STR
16
+3
+5
INT
6
-2
-2
MOD
SAVE
DEX
16
+3
+3
WIS
8
-1
-1
MOD
SAVE
CON
15
+2
+2
CHA
5
-3
-3

Skills Athletics +5, Perception +1

Vulnerabilities Bludgeoning

Immunities Poison; Exhaustion, Poisoned

Senses darkvision 60 ft.; Passive Perception 11

Languages Understands Common plus one other language but can't speak

CR 2 (XP 450; PB +2)

Traits

Great Weapon Master. When the conscript hits a creature with its Greatsword, the attack deals an extra 2 damage.

Actions

Greatsword. Melee Attack Roll: +5, reach 5 ft. 12 (2d8 + 3) Slashing damage.

Shortbow. Ranged Attack Roll: +5, range 80/320 ft. 6 (1d6 + 3) Piercing damage.

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

**Where each row came from**

- Actions/Greatsword — authored for this sheet; a named part; the GM's clause "a skeleton with a greatsword"; weapon greatsword
- Actions/Shortbow — print's own row; weapon shortbow
- Traits/Great Weapon Master — a declared feature; the GM's clause "a skeleton with a greatsword"

**Engine trace**

```
[path] twist — Skeleton (is) — "a skeleton" (call)
[route] brute type=Undead mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | brute: ✓ ("a skeleton with a greatsword") | brute: no line key in the words — the model's read of its quote
[concept] resolve: archetype=brute type=Undead themes=grave/armed mind=mindless style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: the oversized greatsword [object] | relentless forward assault [behavior] | unfeeling skeletal body [body]
[concept] identity: The greatsword skeleton lurches forward in a silent rustling charge, the oversized blade dragged low across the ground before it heaves up in a single committed swing meant to end things in one blow. After that it simply walks forward and swings again, an unfeeling grave-born brute that ignores wounds no living body could shrug off, never once pausing to reassess. It has no fear, no cunning, and no retreat — it fights until the bones are scattered, and even then the sword may still be swinging.
[concept] lore: Raised from a battlefield's mass grave by a necromancer who needed a soldier that would never tire or question, it remembers nothing but the weight of the blade and the order to advance.
[reskin] print canon array: STR 16, DEX 16, CON 15, INT 6, WIS 8, CHA 5 — the Skeleton's, STR fitted to +5
[reskin] donor: brute-2 -> CR 2
[reskin] [path] decides: twist on the Skeleton (the matcher agrees)
[reskin] print canon: "a skeleton with a greatsword" heads on the Skeleton — print's rows ride along; the seat stays
[reskin] claim gate: CR 2 but a Undead body — the trait seat stays open (print: a material body carries a trait at every tier)
[reskin] named parts: Greatsword (slot) — the user's words, the engine's numbers
[reskin] named parts landed: 1 attack row(s), 0 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline declared: "the conscript" — the call's own answer (kind), built from the name; the rules would have said "Conscript"
[reskin] inline on kit rows: "Conscript" -> "the conscript"
[reskin] inline form: "the conscript" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a skeleton with a greatsword" -> has (mechanical) [asked: attack]
[reskin] signature idea (action): "The conscript drags its greatsword low and then heaves it up in one committed swing. If that blow wounds a foe, the conscript immediately lurches forward up to its full speed toward another enemy without turning away or hesitating. This extra movement can happen only once each round." [rider/on_hit/movement] — menu: contagion, charge-push, hook-rider, pounce, charge (+ shelf: trample, shield-bash, active-toll, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, rampage, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating)
[reskin] word match declined by the call: hook-rider, contagion, charge-push, pounce, charge — the key word does not mean the mechanic here
[reskin] fit declined: "Gravebound Surge (1/Day)" — a print body takes only what the user's words ask; the call offered no quote, and the key table finds no verb either (the blacksmith's rally, critic-ten 2026-10-01)
[reskin] fallback stands down: the twist path has no shelf — the Skeleton's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "The conscript ignores wounds that would stagger a living soldier, never stopping to flinch or assess. When it is struck, the bone-grip on its blade never loosens, and it keeps pressing forward." [trait/on_being_hit/movement] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] word match declined by the call: adhesive, bloodied-burst, bloodied-fury — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "The conscript ignores wounds that would stagger a living soldier, never stopping to flinch or assess. When it is struck, the bone-grip on its blade never loosens, and it keeps pressing forward." [trait/on_being_hit/movement] — the model found no template that holds it (offered: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge, adhesive, bloodied-fury)
[reskin] weapons answered: Greatsword = Greatsword
[reskin] print canon alignment: Lawful Neutral -> Lawful Evil — the Skeleton's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "None" -> "Understands Common plus one other language but can't speak" — the Skeleton's
[reskin] print canon row: Actions/Shortbow — the Skeleton's own ranged row, added (the chassis carried none to rename) — far from print's CR 0.25: print's dice, the sheet's +5
[reskin] immunities stamped for type: Undead -> Poison; Exhaustion, Poisoned
[reskin] print canon defenses: vulnerabilities none -> Bludgeoning — the Skeleton's own header lines
[reskin] vulnerability rejected — "Bludgeoning" has no warrant in the concept's own text (print's default is none)
[reskin] audit rename blocked — "Great Weapon Master" is the user's own part name, a kit feature's real name, or print's own row
```


---

## Unlistened — highest CR

**Concept:** a stone giant exile who speaks only Giant and understands no Common

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Unlistened | 9 | brute-9 | ok | SOFT: aim-atk | ok | ok | ok | ok | ok | ok | ok | ok |

- bands · soft · aim-atk: attack +10 against the aim's +8
- read: def 7 / off 11 → 9; sustained 66 (2 × Stone Club); nova none; dmg 66

```
Unlistened

Huge Giant, Neutral

AC 15
Initiative +2 (12)

HP 161 (14d12 + 70)

Speed 40 ft.

MOD
SAVE
STR
23
+6
+10
INT
10
+0
+0
MOD
SAVE
DEX
15
+2
+2
WIS
12
+1
+1
MOD
SAVE
CON
20
+5
+9
CHA
9
-1
-1

Skills Athletics +10, Perception +5

Senses darkvision 60 ft.; Passive Perception 15

Languages Giant

CR 9 (XP 5,000; PB +4)

Actions

Multiattack. The unlistened makes two attacks, using Stone Club or Boulder in any combination.

Stone Club. Melee Attack Roll: +10, reach 15 ft. 33 (6d8 + 6) Bludgeoning damage.

Boulder. Ranged Attack Roll: +10, range 60/240 ft. 28 (5d8 + 6) Bludgeoning damage.

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

**Where each row came from**

- Actions/Multiattack — the chassis
- Actions/Stone Club — print's own row, renamed; weapon club
- Actions/Boulder — print's own row, renamed

**Engine trace**

```
[path] twist — Stone Giant (is) — "stone giant" (call)
[route] brute type=Giant mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | brute: ✓ ("a stone giant exile") | brute: no line key in the words — the model's read of its quote
[concept] resolve: archetype=brute type=Giant themes=elemental/armed mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: hurls stone and broken rock [behavior] | stone hide and knotted stone muscle [body] | a giant's hauling maul [object]
[concept] identity: A boulder of scarred stone muscle, the exile opens by hurling a chunk of its own broken hide or a torn-up slab of earth at range, then closes to trade swings with fists and a hauling maul until something breaks — usually whatever it hit. It never negotiates and never explains itself, bellowing orders and curses in Giant that no one present understands. Under pressure it does not flee; it plants its feet, digs in, and fights to the death, mistaking any parley for a challenge and any retreat for surrender.
[concept] lore: Cast out of its stone-giant hold for a crime it can no longer name aloud in any tongue but Giant, the exile wanders the lowlands hauling its old maul and waiting for someone who speaks its language — it has yet to meet one.
[reskin] print canon array: STR 23, DEX 15, CON 20, INT 10, WIS 12, CHA 9 — the Stone Giant's; STR 23 outranks the card's +8, so the sheet rolls +10 (raise-only)
[reskin] donor: brute-9 -> CR 9
[reskin] [path] decides: twist on the Stone Giant (the matcher would have said homebrew)
[reskin] print canon: "a stone giant exile who speaks only Giant and understands no Common" heads on the Stone Giant — print's rows ride along; the seat stays
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline by rule: "the unlistened" — the call answered "the unlistened" (person), which the name does not support
[reskin] inline form: "the unlistened" — the model's own reading of the name
[reskin] save dc derived: DC 15 -> 18 (8 + PB 4 + the sheet's best 6) — no stat on the sheet reached it
[reskin] lacks asked: "understands no Common"
[reskin] lacks refused: "speaks only Giant" names no absence — nothing in it takes anything away
[reskin] clauses: "a stone giant exile" -> has (descriptive), head | "speaks only Giant" -> has (header) | "understands no Common" -> LACKS (mechanical)
[reskin] signature idea (action): "The exile tears a slab of stone from the ground or its own scarred hide and hurls it with an order shouted in Giant — and every ally within earshot snaps toward the target, moving and striking as one. Anyone the slab lands near is left staggered and off balance, easy prey for the follow-up blows the exile and its fellows deliver." [rider/on_hit/movement] — menu: affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, charge (+ shelf: trample, leap, thrown-burst, throw-retrieve, shield-bash, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, rampage, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating)
[reskin] fit declined: "Staggering Slab (Recharge 5-6)" — a print body takes only what the user's words ask; the call offered no quote, and the key table finds no verb either (the blacksmith's rally, critic-ten 2026-10-01)
[reskin] fallback stands down: the twist path has no shelf — the Stone Giant's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "Whenever something wounds the exile, it answers by bellowing a challenge or curse in Giant and grinding its feet into the earth, digging in so that no shove or pull can move it from that spot. The wound only hardens the knot of its stone muscle." [trait/on_being_hit/defense] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] signature bound to the concept's verb: trait — false-appearance (stone)
[reskin] word match declined by the call: false-appearance, heated-body, resonant-body, absorption, bloodied-fury, bloodied-burst, weapon-lodge — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit" after being shown false-appearance, which the GM's words keyed
[reskin] key match declined: trait — "false-appearance" was ranked first on the call's own menu for stone, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: trait — "Whenever something wounds the exile, it answers by bellowing a challenge or curse in Giant and grinding its feet into the earth, digging in so that no shove or pull can move it from that spot. The wound only hardens the knot of its stone muscle." [trait/on_being_hit/defense] — the model found no template that holds it (offered: false-appearance, heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge, bloodied-fury)
[reskin] weapons answered: Maul = maul; Hide Shard = none; Crushing Bellow = none
[reskin] print canon alignment: Chaotic Neutral -> Neutral — the Stone Giant's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon attack: "Maul" -> "Stone Club" — the Stone Giant's own row
[reskin] print canon attack: "Hide Shard" -> "Boulder" — the Stone Giant's own ranged row
```


---

## Arena Oathbones — a 2024 sheet

**Concept:** a skeleton who was a gladiator in a former life

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Arena Oathbones | 4 | brute-2 | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 2.5 (print at 4 reads 1–6, n=66)
- read: def 1 / off 4 → 2.5; sustained 28 (1 × Shortsword); nova none; dmg 28

```
Arena Oathbones

Medium Undead, Lawful Evil

AC 13
Initiative +3 (13)

HP 84 (13d8 + 26)

Speed 30 ft.

MOD
SAVE
STR
18
+4
+6
INT
6
-2
-2
MOD
SAVE
DEX
16
+3
+3
WIS
8
-1
-1
MOD
SAVE
CON
15
+2
+2
CHA
5
-3
-3

Skills Athletics +6, Perception +1

Vulnerabilities Bludgeoning

Immunities Poison; Exhaustion, Poisoned

Senses darkvision 60 ft.; Passive Perception 11

Languages Understands Common plus one other language but can't speak

CR 4 (XP 1,100; PB +2)

Actions

Shortsword. Melee Attack Roll: +6, reach 5 ft. 28 (7d6 + 4) Piercing damage.

Shortbow. Ranged Attack Roll: +6, range 80/320 ft. 6 (1d6 + 3) Piercing damage.

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

**Where each row came from**

- Actions/Shortsword — print's own row, renamed; weapon shortsword
- Actions/Shortbow — print's own row; weapon shortbow

**Engine trace**

```
[path] twist — Skeleton (is) — "a skeleton" (call)
[route] brute type=Undead mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | brute: ✓ ("a skeleton who was a gladiator in a form") | brute: no line key in the words — the model's read of its quote
[concept] resolve: archetype=brute type=Undead themes=grave/armed mind=sapient style=— energy=Necrotic mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: dueling showmanship and taunts [behavior] | detachable thrown bones and shield [body] | arena war-blade and shield [object]
[concept] identity: The bone-gladiator strides into the arena and opens by hurling its own detachable skull or a spiked shield like a discus, then closes behind a heavy war-blade to trade blow for blow as a crowd-pleasing bruiser. Round after round it presses forward with unhurried, arrogant footwork, parrying with its shield arm and hammering with the blade, and it never flees — a bloodied gladiator salutes the empty stands and fights to the final splinter, mistaking any retreat for a forfeited match. It toys with hesitant opponents, bowing, taunting, and circling before committing to its heaviest swing.
[concept] lore: A champion of a long-collapsed arena, raised from its own grave-sand by an oath to keep performing, it seeks a worthy opponent to grant it the death it was denied.
[reskin] print canon array: STR 18, DEX 16, CON 15, INT 6, WIS 8, CHA 5 — the Skeleton's, STR fitted to +6
[reskin] donor: brute-2 -> CR 4
[reskin] [path] decides: twist on the Skeleton (the matcher agrees)
[reskin] print canon: "a skeleton who was a gladiator in a former life" heads on the Skeleton — print's rows ride along; the seat stays
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline declared: "the oathbones" — the call's own answer (kind), built from the name
[reskin] inline form: "the oathbones" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a skeleton" -> has (descriptive), head | "was a gladiator in a former life" -> has (descriptive)
[reskin] signature idea (action): "With a showman's flourish the gladiator hurls its own skull at a foe, and the bone lodges in the wound like a hook, trailing its body on a tether of grave-sand. Until the skull is pulled free or the target tears away, the gladiator can stride straight to that enemy no matter how it runs, closing the distance each time the foe tries to slip the snare, its taunts following the skull's rattle." [rider/on_hit/movement] — menu: affliction, contagion, charge-push, hook-rider, pounce, charge (+ shelf: trample, leap, shield-bash, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, rampage, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating)
[reskin] signature bound to the concept's verb: action — drain (life)
[reskin] word match declined by the call: hook-rider, affliction, aggro-curse, thrown-burst-seed — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit" after being shown drain, which the GM's words keyed
[reskin] key match declined: action — "drain" was ranked first on the call's own menu for life, and the call read it as no fit; the words keep their claim and nothing is forced
[reskin] signature miss: action — "With a showman's flourish the gladiator hurls its own skull at a foe, and the bone lodges in the wound like a hook, trailing its body on a tether of grave-sand. Until the skull is pulled free or the target tears away, the gladiator can stride straight to that enemy no matter how it runs, closing the distance each time the foe tries to slip the snare, its taunts following the skull's rattle." [rider/on_hit/movement] — the model found no template that holds it (offered: drain, affliction, contagion, charge-push, hook-rider, pounce, charge, aggro-curse, thrown-burst-seed, rampage)
[reskin] fallback respects the call: drain, aggro-curse left the shelf — the call declined them for this sheet
[reskin] fallback stands down: the twist path has no shelf — the Skeleton's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "Death is a forfeit it refuses to accept: an opponent who turns and walks from the duel is, to the gladiator, conceding the match. Each time a wounded foe tries to break away, the champ's shield-arm lashes out to hook them back into the ring, and on the final splinter of its own unlife it lets out one last roaring salute and swings harder than ever." [trait/always/damage] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending, weapon-lodge)
[reskin] word match declined by the call: death-burst, heated-body, bloodied-burst — the key word does not mean the mechanic here
[reskin] trait declined: "Last Stand Fury" — a print body takes only what the user's words ask; the call offered no quote, and the key table finds no verb either
[reskin] weapons answered: Warblade = greatsword
[reskin] weapon declared: "Warblade" is a greatsword — the call's own answer (the name alone read longsword)
[reskin] languages by mind: "None" -> "Common plus the languages it knew in life" (sapient)
[reskin] print canon alignment: Neutral -> Lawful Evil — the Skeleton's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common plus the languages it knew in life" -> "Understands Common plus one other language but can't speak" — the Skeleton's
[reskin] print canon row: Actions/Shortbow — the Skeleton's own ranged row, added (the chassis carried none to rename) — far from print's CR 0.25: print's dice, the sheet's +6
[reskin] rider folded: "Warblade" keeps its budget — the chassis's rider half (11) folds into the base; the Skeleton pays no damage rider of its own
[reskin] print canon attack: "Warblade" -> "Shortsword" — the Skeleton's own row
[reskin] immunities stamped for type: Undead -> Poison; Exhaustion, Poisoned
[reskin] print canon defenses: vulnerabilities none -> Bludgeoning — the Skeleton's own header lines
```


---

## Hillreach Ogre — a print donor

**Concept:** an ogre with a greataxe

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Hillreach Ogre | 3 | brute-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1/4 / off 4 → 2.125; sustained 22 (1 × Greataxe); nova none; dmg 22

```
Hillreach Ogre

Large Giant, Chaotic Evil

AC 11
Initiative -1 (9)

HP 68 (8d10 + 24)

Speed 40 ft.

MOD
SAVE
STR
19
+4
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
+3
CHA
7
-2
-2

Skills Athletics +6, Perception +0

Senses darkvision 60 ft.; Passive Perception 10

Languages Common, Giant

CR 3 (XP 700; PB +2)

Traits

Great Weapon Master. When the ogre hits a creature with its Greataxe, the attack deals an extra 2 damage.

Actions

Greataxe. Melee Attack Roll: +6, reach 5 ft. 22 (4d8 + 4) Slashing damage.

Javelin. Melee or Ranged Attack Roll: +6, reach 5 ft. or range 30/120 ft. 11 (2d6 + 4) Piercing damage.

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

**Where each row came from**

- Actions/Greataxe — authored for this sheet; a named part; the GM's clause "an ogre with a greataxe"; weapon greataxe
- Actions/Javelin — print's own row; authored for this sheet; a named part; the GM's clause "an ogre with a greataxe"; weapon javelin
- Traits/Great Weapon Master — a declared feature; the GM's clause "an ogre with a greataxe"

**Engine trace**

```
[path] twist — Ogre (is) — "ogre" (call)
[route] brute type=Giant mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | brute: ✓ ("an ogre with a greataxe") | brute: no line key in the words — the model's read of its quote
[concept] resolve: archetype=brute type=Giant themes=bestial/armed mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: crushing greataxe sweeps [behavior] | massive hide-bound body [body] | a claimed greataxe [object]
[concept] identity: The ogre lumbers forward with its greataxe already swinging, opening every fight with a full-bodied overhead cleave meant to split shields and spine in one stroke. Each round after, it stays planted and trades blow for blow, using its sheer bulk to shrug off hits while it drags the axe back for another wide arc. It fights to the death, too stubborn and too proud to flee, and grows sloppier and angrier as it bleeds.
[concept] lore: A hill-country ogre that claimed a dead raider's greataxe and now prizes it above all things, using it to bully and butcher anything that wanders too close to its territory.
[reskin] print canon defenses: HP 66 -> 68, AC 12 -> 11 — the Ogre's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 19, DEX 8, CON 16, INT 5, WIS 7, CHA 7 — the Ogre's at its own CR; attack +5 -> +6, DC 14 (print's)
[reskin] donor: brute-2 -> CR 3
[reskin] [path] decides: twist on the Ogre (the matcher agrees)
[reskin] print canon: "an ogre with a greataxe" heads on the Ogre — print's rows ride along; the seat stays
[reskin] named parts: Greataxe (slot) — the user's words, the engine's numbers
[reskin] named parts landed: 1 attack row(s), 0 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline declared: "the ogre" — the call's own answer (kind), built from the name
[reskin] inline form: "the ogre" — the model's own reading of the name
[reskin] save dc derived: DC 12 -> 14 (8 + PB 2 + the sheet's best 4) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "an ogre with a greataxe" -> has (descriptive), head
[reskin] signature idea (action): "The ogre plants its feet and hauls the greataxe around in a full, wide sweep aimed at everything in front of it. Everyone caught in that broad arc gets battered and shoved backward off their footing, so the ogre can't be crowded or flanked. It can't do this again right away — the axe's weight leaves it open for a moment before it winds up for the next swing." [action/save/damage] — menu: trample, leap, shield-bash, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up (+ shelf: rampage, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, affliction, contagion, charge-push, hook-rider, pounce, charge)
[reskin] word match declined by the call: wind-up — the key word does not mean the mechanic here
[reskin] fit declined: "Wide Sweep" — a print body takes only what the user's words ask; the call offered no quote, and the key table finds no verb either (the blacksmith's rally, critic-ten 2026-10-01)
[reskin] fallback stands down: the twist path has no shelf — the Ogre's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "Every wound just makes the ogre wilder: the more blood it has spilled and taken, the harder and more recklessly it swings. Foes can see it coming — its breathing turns to snorting and its arcs get wider and angrier the longer the fight drags on." [trait/always/damage] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending, weapon-lodge)
[reskin] word match declined by the call: bloodied-fury, uncanny-sense — the key word does not mean the mechanic here
[reskin] trait declined: "Bloodmad Rage" — a shape fit with no verb match on a Giant body; a meat body earns its trait by a verb
[reskin] weapons answered: Greataxe = greataxe
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] print canon alignment: Chaotic Neutral -> Chaotic Evil — the Ogre's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common" -> "Common, Giant" — the Ogre's
[reskin] print canon speed: 30 ft. -> 40 ft. — the Ogre's walk; the concept's other modes stay
[reskin] print canon row frame: "Javelin" keeps print's thrown frame — reach 5 ft. or range 30/120 ft.
[reskin] print canon row: Actions/Javelin — the Ogre's second melee row, beside the chassis's
```


---

## Warren Troll — in the run

**Concept:** a cave troll that speaks only Giant

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Warren Troll | 6 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 4 / off 5 → 4.5; sustained 33 (3 × Rend); nova none; dmg 33

```
Warren Troll

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

CR 6 (XP 2,300; PB +3)

Traits

Regeneration. The troll regains 15 Hit Points at the start of each of its turns. If the troll takes Acid or Fire damage, this trait doesn't function on the troll's next turn. The troll dies only if it starts its turn with 0 Hit Points and doesn't regenerate.

Loathsome Limbs. If the troll ends any turn Bloodied and took 15+ Slashing damage during that turn, one of the troll's limbs is severed, falls into the troll's space, and becomes a Troll Limb. The limb acts immediately after the troll's turn. The troll has 1 Exhaustion level for each missing limb, and it grows replacement limbs the next time it regains Hit Points.

Actions

Multiattack. The troll makes three Rend attacks.

Rend. Melee Attack Roll: +7, reach 10 ft. 11 (2d6 + 4) Slashing damage.

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

**Where each row came from**

- Actions/Multiattack — the chassis
- Actions/Rend — print's own row, renamed
- Traits/Regeneration — print's own row
- Traits/Loathsome Limbs — print's own row
- Bonus Actions/Charge — print's own row

**Engine trace**

```
[path] twist — Troll (is) — "a cave troll" (call)
[route] brute-regenerator type=Giant mechanics=regeneration — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | brute-regenerator: ✓ ("troll") | brute-regenerator: no line key in the words — the model's read of its quote
[concept] hints: troll→canon ✓ ("a cave troll that speaks only Giant")
[concept] resolve: archetype=brute type=Giant themes=bestial/subterranean mind=sapient style=regenerator energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: regeneration
[concept] signature elements: flesh that knits itself closed [body] | stone-knuckled fists [body] | a bellowing Giant voice in the dark [behavior]
[concept] identity: A mottled cave troll comes out of the dark behind a battering ram of hide and knobby stone-hard fist, roaring in Giant that the whole cave can hear, and simply won't stay hurt — the split lip closes while it hammers a second blow home. Every round after it wades in, trading hits to buy time for its flesh to knit, shrugging off the worst damage and refusing to fall. Bloodied, it does not flee — a cave troll fights to the death, and it will drag the fight into a dead-end tunnel where its reach and its regrowth are a wall of flesh.
[concept] lore: Cave trolls are born in the deep warrens where stone and dark press on their flesh, and a lone one wants nothing more than to drag its kill back to its nest and sleep in the quiet.
[reskin] print canon route: the Troll's body outranks the regenerator seat — no verb in the words names it; the plain brute line
[reskin] print canon defenses: HP 116 -> 94, AC 14 -> 15 — the Troll's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 18, DEX 13, CON 20, INT 7, WIS 9, CHA 7 — the Troll's at its own CR; attack +7 -> +7, DC 16 (print's)
[reskin] regeneration organ injected — 10/turn
[reskin] donor: brute-5 -> CR 6
[reskin] [path] decides: twist on the Troll (the matcher would have said homebrew)
[reskin] print canon: "a cave troll that speaks only Giant" heads on the Troll — print's rows ride along; the seat stays
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline declared: "the troll" — the call's own answer (kind), built from the name; the rules would have said "Troll"
[reskin] inline on kit rows: "Troll" -> "the troll"
[reskin] inline form: "the troll" — the model's own reading of the name
[reskin] save dc derived: DC 14 -> 16 (8 + PB 3 + the sheet's best 5) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a cave troll" -> has (descriptive), head | "speaks only Giant" -> has (header)
[reskin] signature idea (action): "The troll looses a cave-shaking bellow in Giant that rolls down the tunnels, and every creature that hears it is shaken to its marrow — foes clutch at their ears and their aim falters while the troll's own warren-bred kin and any troll in earshot take heart from it. It can call this roar out as it wades forward, and the sound carries far through stone and dark, so a fight begun with it is a fight " [bonus_action/once_per_fight/condition] — menu: rampage, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating (+ shelf: trample, leap, thrown-burst, shield-bash, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, stunning-strike, charge-push, hook-rider, pounce, charge)
[reskin] word match declined by the call: terror-pulse, herd — the key word does not mean the mechanic here
[reskin] fit declined: "Warren Bellow (2/Day)" — a print body takes only what the user's words ask; the call offered no quote, and the key table finds no verb either (the blacksmith's rally, critic-ten 2026-10-01)
[reskin] fallback respects the call: terror-pulse, herd left the shelf — the call declined them for this sheet
[reskin] fallback stands down: the twist path has no shelf — the Troll's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "The troll's hide drinks in the blood it spills — whenever its fists batter a living creature, the wounds on its own knuckles pull shut and its flesh tightens, so the longer it keeps hitting something that bleeds, the harder it becomes to put down." [trait/always/defense] — menu: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending, weapon-lodge)
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "The troll's hide drinks in the blood it spills — whenever its fists batter a living creature, the wounds on its own knuckles pull shut and its flesh tightens, so the longer it keeps hitting something that bleeds, the harder it becomes to put down." [trait/always/defense] — the model found no template that holds it (offered: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst, bloodied-burst, warded-mending, absorption)
[reskin] weapons answered: Fist = none
[reskin] print canon modes: climb off — the Troll has no such mode and the words name none
[reskin] print canon alignment: Chaotic Neutral -> Chaotic Evil — the Troll's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon speed: 40 ft. -> 30 ft. — the Troll's walk; the concept's other modes stay
[reskin] print canon attack: "Fist" -> "Rend" — the Troll's own row
[reskin] print canon multiattack: "The troll makes three Rend attacks." — the Troll's own
[reskin] print canon trait: Loathsome Limbs — "a cave troll that speaks only Giant" is the Troll (print's own row)
[reskin] print canon trait: Regeneration — print's text replaces the chassis's (the Troll regenerates 15, not the chassis's 10 — critic's audit 2026-10-02)
[reskin] print canon row: Bonus Actions/Charge — the Troll's own
[reskin] audit rewrite blocked — "Regeneration" is engine-authored chassis text
[reskin] audit rewrite blocked — "Loathsome Limbs" is engine-authored chassis text
```
