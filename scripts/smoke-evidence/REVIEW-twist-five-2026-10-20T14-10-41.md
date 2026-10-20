# Review batch — twist-five-2026-10-20T14-10-41

The checker ran first. The gate table covers every block in the run; every block of the run follows. Each block carries its checker row above and its engine trace below. Hand-derive against the row first; then read for what predicates can't see.

## Gate table — the whole run

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Oathbound Skeleton | 2 | 2024 | brute-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/3 |
| Bone Gladiator | 4 | 2024 | brute-2 | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 2/2 |
| Hill-Hoard Ogre | 3 | 2024 | brute-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/3 |
| Cave Troll | 6 | 2024 | brute-5 | ok | ok | ok | SOFT: control-aoe-ungated | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 5/5 |
| Wandering Stone Exile | 9 | 2024 | brute-9 | ok | SOFT: aim-atk | ok | ok | ok | ok | ok | ok | ok | ok | soft (1) | 2/2 | 3/3 |

**Dropped 0 of 6 user clauses** (coverage 100%); concept share 100% (16/16 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- none



---

## Oathbound Skeleton — lowest CR

**Concept:** a skeleton with a greatsword

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Oathbound Skeleton | 2 | brute-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1/2 / off 2 → 1.25; sustained 12 (1 × Greatsword); nova none; dmg 12

```
Oathbound Skeleton

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

Great Weapon Master. When the skeleton hits a creature with its Greatsword, the attack deals an extra 2 damage.

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
[path] twist — Skeleton (is) — "skeleton" (call)
[route] brute type=Undead mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | brute: ✓ ("a skeleton with a greatsword") | brute: no line key in the words — the model's read of its quote
[concept] name: provided_name rejected — "a skeleton with a greatsword…" is the description, not a name
[concept] resolve: archetype=brute type=Undead themes=grave/armed mind=mindless style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: greatsword swings [object] | relentless advance [behavior] | bare bones [body]
[concept] identity: A reanimated soldier's skeleton lurches forward with its greatsword held in a two-handed grip, opening every fight with a heavy overhead chop meant to end things early. Each round it rears back and brings the blade down again, stepping through the swing with no regard for its own crumbling frame, and it will grind forward through blows that would fell a living warrior. It fights without fear or fatigue until its bones are dust, never retreating, never hesitating — a dead thing that only knows the charge.
[concept] lore: Raised from a forgotten battlefield by a necromancer's careless ritual, this skeleton still grips the greatsword it died holding and repeats its last charge against anything that enters its ground.
[reskin] print canon array: STR 16, DEX 16, CON 15, INT 6, WIS 8, CHA 5 — the Skeleton's, STR fitted to +5
[reskin] donor: brute-2 -> CR 2
[reskin] [path] decides: twist on the Skeleton (the matcher agrees)
[reskin] print canon: "a skeleton with a greatsword" heads on the Skeleton — print's rows ride along; the seat stays
[reskin] claim gate: CR 2 but a Undead body — the trait seat stays open (print: a material body carries a trait at every tier)
[reskin] named parts: Greatsword (slot) — the user's words, the engine's numbers
[reskin] named parts landed: 1 attack row(s), 0 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline declared: "the skeleton" — the call's own answer (kind), built from the name; the rules would have said "Skeleton"
[reskin] inline on kit rows: "Skeleton" -> "the skeleton"
[reskin] inline form: "the skeleton" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a skeleton with a greatsword" -> has (mechanical) [asked: attack]
[reskin] signature idea (action): "When its greatsword comes down on a foe, the skeleton does not stop at the blow — it leans its whole crumbling frame into the swing and staggers forward through the space the blade carved out. Anyone standing in that path gets shoved aside by the shoulder-first charge, and the skeleton simply ends up further into the fight than it began, blade already rising for the next chop." [rider/on_hit/movement] — menu: contagion, charge-push, hook-rider, pounce, charge (+ shelf: trample, shield-bash, active-toll, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, rampage, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating)
[reskin] word match declined by the call: charge, charge-push, pounce, hook-rider, contagion — the key word does not mean the mechanic here
[reskin] fit declined: "Crumbling Advance (Recharge 5-6)" — a print body takes only what the user's words ask; the call offered no quote, and the key table finds no verb either (the blacksmith's rally, critic-ten 2026-10-01)
[reskin] fallback stands down: the twist path has no shelf — the Skeleton's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "The skeleton never braces or flinches; it only leans further into each swing. Every time it presses its attack against a foe, its advance accelerates until it is almost pitching forward through the enemy's guard, and blows that would stagger a living soldier only feed its momentum." [trait/always/movement] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending, weapon-lodge)
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "The skeleton never braces or flinches; it only leans further into each swing. Every time it presses its attack against a foe, its advance accelerates until it is almost pitching forward through the enemy's guard, and blows that would stagger a living soldier only feed its momentum." [trait/always/movement] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst, absorption)
[reskin] weapons answered: Greatsword = greatsword
[reskin] print canon alignment: Neutral -> Lawful Evil — the Skeleton's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "None" -> "Understands Common plus one other language but can't speak" — the Skeleton's
[reskin] print canon row: Actions/Shortbow — the Skeleton's own ranged row, added (the chassis carried none to rename) — far from print's CR 0.25: print's dice, the sheet's +5
[reskin] immunities stamped for type: Undead -> Poison; Exhaustion, Poisoned
[reskin] print canon defenses: vulnerabilities none -> Bludgeoning — the Skeleton's own header lines
[reskin] audit rename blocked — "Great Weapon Master" is the user's own part name, a kit feature's real name, or print's own row
```


---

## Wandering Stone Exile — highest CR

**Concept:** a stone giant exile who speaks only Giant and understands no Common

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Wandering Stone Exile | 9 | brute-9 | ok | SOFT: aim-atk | ok | ok | ok | ok | ok | ok | ok | ok |

- bands · soft · aim-atk: attack +10 against the aim's +8
- read: def 7 / off 11 → 9; sustained 66 (2 × Stone Club); nova Shattering Hurl 32; dmg 66

```
Wandering Stone Exile

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

Multiattack. The stone exile makes two attacks, using Stone Club or Boulder in any combination.

Stone Club. Melee Attack Roll: +10, reach 15 ft. 33 (6d8 + 6) Bludgeoning damage.

Boulder. Ranged Attack Roll: +10, range 60/240 ft. 28 (5d8 + 6) Bludgeoning damage.

Shattering Hurl (Recharge 5-6). The stone exile hurls boulder at a point it can see within 90 feet. Dexterity Saving Throw: DC 18, each creature in a 5-foot-radius Sphere centered on that point. Failure: 32 (5d12) Thunder damage. If the target is Large or smaller, it has the Prone condition. Success: Half damage.

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
- Actions/Boulder — print's own row
- Actions/Shattering Hurl — template thrown-burst; library draw (seed unstamped); binds the GM's words: hurl+burst+boulder

**Engine trace**

```
[path] twist — Stone Giant (is) — "stone giant" (call)
[route] brute type=Giant mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | brute: ✓ ("a stone giant exile") | brute: no line key in the words — the model's read of its quote
[concept] resolve: archetype=brute type=Giant themes=elemental/bestial mind=sapient style=— energy=Thunder mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: heaving boulders at range [behavior] | a body of living stone [body] | speaks only Giant, understands no Common [behavior]
[concept] identity: The exile opens by hurling a boulder big as a door to cave in the line, then wades in swinging a stone-hardened club in wide, language-barrier-blind arcs that hit friend and stranger alike. It never parleys and never breaks — it fights until it understands what the noise is, which is usually after nothing is left standing. It reads every gesture as a threat and every retreat as invitation.
[concept] lore: A stone giant driven from its clan for a crime no one will name aloud, it has wandered the lowlands alone for decades, bellowing in Giant at travelers who only hear rock-fall and staring at their answering screams as if parsing a dialect.
[reskin] print canon array: STR 23, DEX 15, CON 20, INT 10, WIS 12, CHA 9 — the Stone Giant's; STR 23 outranks the card's +8, so the sheet rolls +10 (raise-only)
[reskin] donor: brute-9 -> CR 9
[reskin] [path] decides: twist on the Stone Giant (the matcher would have said homebrew)
[reskin] print canon: "a stone giant exile who speaks only Giant and understands no Common" heads on the Stone Giant — print's rows ride along; the seat stays
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline declared: "the stone exile" — the call's own answer (kind), built from the name
[reskin] inline form: "the stone exile" — the model's own reading of the name
[reskin] save dc derived: DC 15 -> 18 (8 + PB 4 + the sheet's best 6) — no stat on the sheet reached it
[reskin] lacks asked: "understands no Common"
[reskin] clauses: "a stone giant exile" -> has (descriptive), head | "speaks only Giant" -> has (header) | "understands no Common" -> LACKS (mechanical)
[reskin] signature idea (action): "The exile rips a boulder from the ground and hurls it low and flat, so it smashes into the line and bursts apart in a roaring spray of stone shards. Everyone standing near where it lands is battered and knocked off balance by the blast, not just whoever it struck, and the ground there is left a mess of rubble that slows anyone trying to cross it." [rider/on_hit/damage] — menu: stunning-strike, charge-push, hook-rider, pounce, charge (+ shelf: trample, leap, thrown-burst, throw-retrieve, shield-bash, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, rampage, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating)
[reskin] seat takes its clause: "Shattering Hurl (Recharge 5-6)" answers "a exile" — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature template: thrown-burst -> Actions/"Shattering Hurl (Recharge 5-6)" ("The exile hurling a boulder that bursts in a spray of stone shards, battering ev [verb: hurl:idea, burst:idea, boulder:idea]")
[reskin] signature idea (trait): "Its body is living stone, so when it slams its club down or drives a blow home, the impact cracks the ground beneath the target and rolls out in a shockwave. Nearby enemies are shaken and staggered by the tremor even when the swing misses them, and the reverberation is what makes its wordless bellowing feel like the mountain itself is shouting." [trait/always/damage] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, uncanny-sense, warded-mending, weapon-lodge)
[reskin] signature bound to the concept's verb: trait — false-appearance (stone)
[reskin] decline reason: trait — the call answered none and names it "no_fit" after being shown false-appearance, which the GM's words keyed
[reskin] key match declined: trait — "false-appearance" was ranked first on the call's own menu for stone, and the call read it as no fit; the words keep their claim and nothing is forced
[reskin] signature miss: trait — "Its body is living stone, so when it slams its club down or drives a blow home, the impact cracks the ground beneath the target and rolls out in a shockwave. Nearby enemies are shaken and staggered by the tremor even when the swing misses them, and the reverberation is what makes its wordless bellowing feel like the mountain itself is shouting." [trait/always/damage] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst, bloodied-burst)
[reskin] weapons answered: Club = Greatclub; Boulder = none
[reskin] weapon declared: "Club" is a greatclub — the call's own answer (the name alone read club)
[reskin] print canon attack: "Club" -> "Stone Club" — the Stone Giant's own row
```


---

## Bone Gladiator — a 2024 sheet

**Concept:** a skeleton who was a gladiator in a former life

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Bone Gladiator | 4 | brute-2 | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 2.5 (print at 4 reads 1–6, n=66)
- read: def 1 / off 4 → 2.5; sustained 26 (1 × Shortsword); nova none; dmg 26

```
Bone Gladiator

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

Shortsword. Melee Attack Roll: +6, reach 5 ft. 26 (5d8 + 4) Piercing damage.

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
[concept] signature elements: relentless arena aggression [behavior] | a notched gladiator's blade [object] | bone grown into weathered armor plates [body]
[concept] identity: Bone Gladiator opens the fight the way it always did — striding forward with its notched blade held high and a silent, rattling challenge. Every round it presses the attack with heavy, practiced swings, using a shield of fused rib-bone to stay standing and trade blows it has already learned it can survive. Under pressure it grows more reckless rather than timid, driving toward the kill with the crowd-pleasing fury of a fighter who never once surrendered.
[concept] lore: A champion of the old arena, it rose from its unmarked grave when a necromancer's ritual echoed the roar of a vanished crowd, and now it seeks the one opponent worth a final match.
[reskin] print canon array: STR 18, DEX 16, CON 15, INT 6, WIS 8, CHA 5 — the Skeleton's, STR fitted to +6
[reskin] donor: brute-2 -> CR 4
[reskin] [path] decides: twist on the Skeleton (the matcher agrees)
[reskin] print canon: "a skeleton who was a gladiator in a former life" heads on the Skeleton — print's rows ride along; the seat stays
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline declared: "the bone gladiator" — the call's own answer (kind), built from the name
[reskin] inline form: "the bone gladiator" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a skeleton" -> has (descriptive), head | "was a gladiator in a former life" -> has (descriptive)
[reskin] signature idea (action): "When the Bone Gladiator charges straight at a foe and swings, the old arena instinct takes over: it follows the blade through in a wide, crowd-pleasing cut that carries into anyone standing beside its target. The driving momentum leaves it wide open until its next turn, inviting the counterblow it means to trade." [rider/on_hit/damage] — menu: affliction, contagion, charge-push, hook-rider, pounce, charge (+ shelf: trample, leap, shield-bash, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, rampage, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating)
[reskin] signature bound to the concept's verb: action — drain (life)
[reskin] word match declined by the call: charge, charge-push, trample, pounce — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit" after being shown drain, which the GM's words keyed
[reskin] key match declined: action — "drain" was ranked first on the call's own menu for life, and the call read it as no fit; the words keep their claim and nothing is forced
[reskin] signature miss: action — "When the Bone Gladiator charges straight at a foe and swings, the old arena instinct takes over: it follows the blade through in a wide, crowd-pleasing cut that carries into anyone standing beside its target. The driving momentum leaves it wide open until its next turn, inviting the counterblow it means to trade." [rider/on_hit/damage] — the model found no template that holds it (offered: drain, affliction, contagion, charge-push, hook-rider, pounce, charge, trample)
[reskin] fallback respects the call: drain left the shelf — the call declined it for this sheet
[reskin] fallback stands down: the twist path has no shelf — the Skeleton's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "The notched blade drinks the shock of every blow it lands, and each fresh wound it opens on a living foe knits a bit of its own cracked frame back together. But this only answers violence it has already survived — a hit that hurt it this fight, or a foe it has already cut, is what the bone remembers." [trait/always/resource] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending, weapon-lodge)
[reskin] word match declined by the call: false-appearance — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "The notched blade drinks the shock of every blow it lands, and each fresh wound it opens on a living foe knits a bit of its own cracked frame back together. But this only answers violence it has already survived — a hit that hurt it this fight, or a foe it has already cut, is what the bone remembers." [trait/always/resource] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst, bloodied-burst, heated-body, absorption, warded-mending)
[reskin] weapons answered: Scimitar = scimitar
[reskin] languages by mind: "None" -> "Common plus the languages it knew in life" (sapient)
[reskin] print canon alignment: Neutral -> Lawful Evil — the Skeleton's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common plus the languages it knew in life" -> "Understands Common plus one other language but can't speak" — the Skeleton's
[reskin] print canon row: Actions/Shortbow — the Skeleton's own ranged row, added (the chassis carried none to rename) — far from print's CR 0.25: print's dice, the sheet's +6
[reskin] print canon attack: "Scimitar" -> "Shortsword" — the Skeleton's own row
[reskin] immunities stamped for type: Undead -> Poison; Exhaustion, Poisoned
[reskin] print canon defenses: vulnerabilities none -> Bludgeoning — the Skeleton's own header lines
```


---

## Hill-Hoard Ogre — a print donor

**Concept:** an ogre with a greataxe

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Hill-Hoard Ogre | 3 | brute-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1/4 / off 4 → 2.125; sustained 22 (1 × Greataxe); nova none; dmg 22

```
Hill-Hoard Ogre

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

Great Weapon Master. When the hill-hoard ogre hits a creature with its Greataxe, the attack deals an extra 2 damage.

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
[path] twist — Ogre (is) — "an ogre with a greataxe" (call)
[route] brute type=Giant mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | brute: ✓ ("an ogre with a greataxe") | brute: no line key in the words — the model's read of its quote
[concept] name: provided_name rejected — "an ogre with a greataxe…" is the description, not a name
[concept] resolve: archetype=brute type=Giant themes=bestial/armed mind=bestial style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: overhead greataxe cleave [object] | thick hides shrugging off blows [body] | hurls its axe when prey flees [behavior]
[concept] identity: A hidebound hill ogre that hauls its greataxe overhead with two hands and swings it in wide, shoulder-driven arcs, closing to trade blows and betting its thick hide against the first counter. After opening with one huge cleaving swing, it keeps stepping in and chopping down at whatever is nearest, shrugging off hits rather than defending against them. It fights to the death once blood is drawn, too dull-witted and stubborn to consider flight.
[concept] lore: These ogres squat in the scrub hills at the edge of settled land, keeping the axe they took off some dead knight as a trophy and a tool, and they want only to be left alone with their kills and their hoard of dented steel.
[reskin] print canon defenses: HP 66 -> 68, AC 12 -> 11 — the Ogre's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 19, DEX 8, CON 16, INT 5, WIS 7, CHA 7 — the Ogre's at its own CR; attack +5 -> +6, DC 14 (print's)
[reskin] donor: brute-2 -> CR 3
[reskin] [path] decides: twist on the Ogre (the matcher agrees)
[reskin] print canon: "an ogre with a greataxe" heads on the Ogre — print's rows ride along; the seat stays
[reskin] named parts: Greataxe (slot) — the user's words, the engine's numbers
[reskin] named parts landed: 1 attack row(s), 0 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline by rule: "the hill-hoard ogre" — the call answered "the hoard ogre" (kind), which the name does not support
[reskin] save dc derived: DC 12 -> 14 (8 + PB 2 + the sheet's best 4) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "an ogre with a greataxe" -> has (descriptive), head
[reskin] signature idea (action): "When an enemy turns and runs from it, the ogre hauls its greataxe overhead and hurls it end-over-end at the fleeing creature, an ungainly but punishing throw. The axe buries itself where the target stood, and the ogre lumbers over to wrench it free, leaving itself briefly open while it does." [rider/on_hit/damage] — menu: affliction, contagion, charge-push, hook-rider, pounce, charge (+ shelf: trample, leap, shield-bash, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, rampage, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating)
[reskin] fit declined: "Hoarded Axe Hurl (Recharge 5-6)" — a print body takes only what the user's words ask; the call offered no quote, and the key table finds no verb either (the blacksmith's rally, critic-ten 2026-10-01)
[reskin] fallback stands down: the twist path has no shelf — the Ogre's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "The ogre's thick hide and stubborn bulk soak the first blow that lands on it each fight; anyone who strikes it and sees it barely flinch ends up hesitating, their next swing coming slower and less certain." [trait/on_being_hit/condition] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "The ogre's thick hide and stubborn bulk soak the first blow that lands on it each fight; anyone who strikes it and sees it barely flinch ends up hesitating, their next swing coming slower and less certain." [trait/on_being_hit/condition] — the model found no template that holds it (offered: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge)
[reskin] weapons answered: Greataxe = greataxe
[reskin] print canon alignment: Chaotic Neutral -> Chaotic Evil — the Ogre's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "None" -> "Common, Giant" — the Ogre's
[reskin] print canon speed: 30 ft. -> 40 ft. — the Ogre's walk; the concept's other modes stay
[reskin] print canon row frame: "Javelin" keeps print's thrown frame — reach 5 ft. or range 30/120 ft.
[reskin] print canon row: Actions/Javelin — the Ogre's second melee row, beside the chassis's
```


---

## Cave Troll — one marked soft

**Concept:** a cave troll that speaks only Giant

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Cave Troll | 6 | brute-5 | ok | ok | ok | SOFT: control-aoe-ungated | ok | ok | ok | ok | ok | ok |

- gates · soft · control-aoe-ungated: Actions/Bellowing Roar: at-will multi-target control with no damage and no gate (traded for an attack in Multiattack, print's shape)
- read: def 4 / off 5 → 4.5; sustained 33 (3 × Rend); nova none; dmg 33

```
Cave Troll

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

Skills Perception +5

Senses darkvision 60 ft.; Passive Perception 15

Languages Giant

CR 6 (XP 2,300; PB +3)

Traits

Regeneration. The cave troll regains 15 Hit Points at the start of each of its turns. If the cave troll takes Acid or Fire damage, this trait doesn't function on the cave troll's next turn. The cave troll dies only if it starts its turn with 0 Hit Points and doesn't regenerate.

Loathsome Limbs (4/Day). If the cave troll ends any turn Bloodied and took 15+ Slashing damage during that turn, one of the cave troll's limbs is severed, falls into the cave troll's space, and becomes a Troll Limb. The limb acts immediately after the cave troll's turn. The cave troll has 1 Exhaustion level for each missing limb, and it grows replacement limbs the next time it regains Hit Points.

Actions

Multiattack. The cave troll makes three Rend attacks. It can replace one attack with a use of Bellowing Roar.

Rend. Melee Attack Roll: +7, reach 10 ft. 11 (2d6 + 4) Slashing damage.

Bellowing Roar. Wisdom Saving Throw: DC 16, each creature of the cave troll's choice within 30 feet that can see or hear it. Failure: The target has the Frightened condition until the end of its next turn.

Bonus Actions

Charge. The cave troll moves up to half its Speed straight toward an enemy it can see.

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
- Actions/Bellowing Roar — template terror-pulse; library draw (seed unstamped); binds the GM's words: roar+bellow
- Traits/Regeneration — print's own row
- Traits/Loathsome Limbs — print's own row
- Bonus Actions/Charge — print's own row

**Engine trace**

```
[path] twist — Troll (is) — "troll" (call)
[route] brute-regenerator type=Giant mechanics=regeneration — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | brute-regenerator: ✓ ("troll") | brute-regenerator: no line key in the words — the model's read of its quote
[concept] hints: troll→canon ✓ ("a cave troll that speaks")
[concept] resolve: archetype=brute type=Giant themes=subterranean/bestial mind=sapient style=regenerator energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: regeneration
[concept] signature elements: wounds that close as fast as they open [body] | roaring Giant war-cries and curses [behavior] | lurking in cave dark to ambush prey [aura]
[concept] identity: A hulking cave troll lumbers out of the dark bellowing war-cries in Giant, then simply refuses to die — clubs and claws rake flesh that knits shut before the next swing lands. It fights like weather: relentless, patient in its own dim way, shrugging off wounds that should fell it and grinding prey down until something finally stops its regeneration. Bloodied, it doesn't retreat — it roars louder and presses harder, because pain is the one thing it has never had to respect.
[concept] lore: Cave trolls are the deep places' answer to hunger — drawn up from the under-dark to feed and to test their endless healing against whatever wanders within reach of their clubs.
[reskin] print canon route: the Troll's body outranks the regenerator seat — no verb in the words names it; the plain brute line
[reskin] print canon defenses: HP 116 -> 94, AC 14 -> 15 — the Troll's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 18, DEX 13, CON 20, INT 7, WIS 9, CHA 7 — the Troll's at its own CR; attack +7 -> +7, DC 16 (print's)
[reskin] regeneration organ injected — 10/turn
[reskin] donor: brute-5 -> CR 6
[reskin] [path] decides: twist on the Troll (the matcher would have said homebrew)
[reskin] print canon: "a cave troll that speaks only Giant" heads on the Troll — print's rows ride along; the seat stays
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline by rule: "the cave troll" — the call answered "the cave troll" (kind), which the name does not support
[reskin] inline form: "the cave troll" — the model's own reading of the name
[reskin] save dc derived: DC 14 -> 16 (8 + PB 3 + the sheet's best 5) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a cave troll" -> has (descriptive), head | "speaks only Giant" -> has (header)
[reskin] signature idea (action): "The troll lets out a full-throated war-cry in Giant, a bellowing curse that rolls out across the dark and shakes the nerve of everything that can hear it. Enemies caught in the roar falter and flinch, their guard dropping for a moment, while the troll itself swells with grim momentum and steps in to exploit the opening. It bellows loudest when it is already wounded, so the worse it bleeds the more" [action/save/condition] — menu: trample, leap, thrown-burst, shield-bash, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up (+ shelf: rampage, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, charge)
[reskin] seat takes its clause: "Bellowing Curse (2/Day)" answers "a cave" — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature template: terror-pulse -> Actions/"Bellowing Curse (2/Day)" ("The troll lets out a full-throated war-cry in Giant that shakes the nerve of eve [verb: roar:idea, bellow:idea]")
[reskin] signature idea (trait): "Wounds on the troll knit visibly shut even as they are dealt, and the fresher the wound the faster it closes, so the creature grows steadily harder to put down the longer a fight drags on. The only thing that truly halts this mending is its old bane, and until that is brought to bear every claw-mark it takes begins sealing over almost at once." [trait/always/defense] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending, weapon-lodge)
[reskin] word match declined by the call: warded-mending — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "Wounds on the troll knit visibly shut even as they are dealt, and the fresher the wound the faster it closes, so the creature grows steadily harder to put down the longer a fight drags on. The only thing that truly halts this mending is its old bane, and until that is brought to bear every claw-mark it takes begins sealing over almost at once." [trait/always/defense] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst, bloodied-burst, warded-mending)
[reskin] weapons answered: Claw = none
[reskin] print canon alignment: Chaotic Neutral -> Chaotic Evil — the Troll's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon speed: 40 ft. -> 30 ft. — the Troll's walk; the concept's other modes stay
[reskin] print canon attack: "Claw" -> "Rend" — the Troll's own row
[reskin] print canon multiattack: "The cave troll makes three Rend attacks." — the Troll's own
[reskin] print canon skills: "Athletics +7, Perception +2" -> "Perception +5" — the Troll's own skills, each derived from this sheet's stat and PB
[reskin] print canon trait: Loathsome Limbs (4/Day) — "a cave troll that speaks only Giant" is the Troll (print's own row)
[reskin] print canon trait: Regeneration — print's text replaces the chassis's (the Troll regenerates 15, not the chassis's 10 — critic's audit 2026-10-02)
[reskin] print canon row: Bonus Actions/Charge — the Troll's own
[reskin] dead control row: "Bellowing Curse" sheds its gate — no damage, no KO condition; it joins the Multiattack menu instead
[reskin] multiattack replacement clause: It can replace one attack with a use of Bellowing Curse.
[reskin] audit rewrite blocked — "Regeneration" is engine-authored chassis text
[reskin] audit rewrite blocked — "Loathsome Limbs (4/Day)" is engine-authored chassis text
[reskin] audit rename: "Bellowing Curse" -> "Bellowing Roar"
```
