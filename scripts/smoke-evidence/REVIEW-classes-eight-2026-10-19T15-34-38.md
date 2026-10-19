# Review batch — classes-eight-2026-10-19T15-34-38

The checker ran first. The gate table covers every block in the run; every block of the run follows. Each block carries its checker row above and its engine trace below. Hand-derive against the row first; then read for what predicates can't see.

## Gate table — the whole run

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Open-Palmed Adept | 5 | 2024 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 6/6 |
| Vexia Emberhorn | 5 | 2024 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 5/5 |
| Dame Oriel | 5 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |
| Harrowic Vane | 6 (2014) | 2014 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |
| Rockscar Radrik | 8 | 2024 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 6/6 |
| Vareth Solmane | 6 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok | ok | soft (1) | 1/1 | 5/5 |
| Ser Aldous Wrack | 4 | 2024 | defender-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 3/3 |
| Halfstep Counselor | 6 | 2024 | caster-6 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |
| Thurivald | 6 (2014) | 2014 | defender-5 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok | ok | soft (1) | 1/1 | 5/5 |
| Oathbound Battlematron | 8 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok | ok | soft (1) | 2/2 | 5/6 |
| Kageyama | 5 | 2024 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 5/5 |
| Timberland Alpha | 3 | 2024 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 2/2 |
| Under-Maze Herder | 6 | 2024 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 2/3 |
| Ser Bramwell Rook | 7 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/3 |

**Dropped 2 of 17 user clauses** (coverage 88%); concept share 97% (59/61 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- none



---

## Timberland Alpha — lowest CR

**Concept:** a dire wolf that hunts in a pack

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Timberland Alpha | 3 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- **dropped clause:** "hunts in a pack"
- read: def 1 / off 3 → 2; sustained 24 (2 × Bite); nova none; dmg 24

```
Timberland Alpha

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

Pack Tactics. The alpha has Advantage on an attack roll against a creature if at least one of the alpha's allies is within 5 feet of the creature and the ally doesn't have the Incapacitated condition.

Actions

Multiattack. The alpha makes two Bite attacks.

Bite. Melee Attack Roll: +5, reach 5 ft. 12 (2d8 + 3) Piercing damage. If the target is a Large or smaller creature, it has the Prone condition.

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

- Traits/Pack Tactics — print's own row
- Actions/Multiattack — the chassis
- Actions/Bite — print's own row

**Engine trace**

```
[path] twist — Dire Wolf (is) — "dire wolf" (call)
[route] skirmisher type=Beast mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | skirmisher: ✓ ("hunts in a pack") | skirmisher: no line key in the words — the model's read of its quote
[concept] resolve: archetype=skirmisher type=Beast themes=bestial mind=bestial style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: pack tactics and coordinated encirclement [behavior] | hit-and-run lunges that peel away after each strike [behavior] | thick grey hunting hide and bone-crushing jaws [body]
[concept] identity: A dire wolf that opens by shadowing a lone target at the edge of the pack's spread, then closes in a coordinated rush — one wolf driving, the others cutting off the escape line — before peeling away again to reset the ring. Each round it circles, feints, and lunges for hamstring and throat in turn, using its packmates' bodies as moving cover, so prey can never face the whole pack at once. It does not fight to the death: bloodied, it breaks off and regroups with the pack just out of reach, harrying the wounded until they stumble.
[concept] lore: Dire wolves of the deep timber run in family packs that parcel out hunting ground like a lord parcels out land, and they regard any traveler crossing their range as trespass to be run down and shared.
[reskin] print canon array: STR 17, DEX 16, CON 15, INT 3, WIS 12, CHA 7 — the Dire Wolf's, DEX fitted to +5
[reskin] donor: skirmisher-3 -> CR 3
[reskin] [path] decides: twist on the Dire Wolf (the matcher agrees)
[reskin] print canon: "a dire wolf that hunts in a pack" heads on the Dire Wolf — print's rows ride along; the seat stays
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline declared: "the alpha" — the call's own answer (kind), built from the name
[reskin] inline form: "the alpha" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a dire wolf" -> has (descriptive), head | "hunts in a pack" -> has (descriptive)
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "When the alpha strikes a foe that any of its packmates are menacing from another side, it lunges for the hamstring and drags the prey down, leaving it sprawled and helpless while the pack closes the ring. The victim is pinned flat where it stands, unable to rise while the wolves work it over, and the alpha uses that moment to peel away and reset rather than commit." [rider/on_hit/condition] — menu: affliction, contagion, charge-push, hook-rider, pounce, isolation, charge (+ shelf: trample, leap, gaze-single, snare, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, riposte)
[reskin] signature bound to the concept's verb: action — focus (hunt)
[reskin] word match declined by the call: hook-rider, sensory-strike, charge-push, charge — the key word does not mean the mechanic here
[reskin] signature miss: action — "When the alpha strikes a foe that any of its packmates are menacing from another side, it lunges for the hamstring and drags the prey down, leaving it sprawled and helpless while the pack closes the ring. The victim is pinned flat where it stands, unable to rise while the wolves work it over, and the alpha uses that moment to peel away and reset rather than commit." [rider/on_hit/condition] — the model picked "pounce" (no verb, and it quotes nothing the GM typed) over a concept-verb template (focus)
[reskin] fallback respects the call: sensory-strike left the shelf — the call declined it for this sheet
[reskin] fallback stands down: the twist path has no shelf — the Dire Wolf's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 15 already beats print's AC 13 at CR 3, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "The alpha reads the pack's hunt as one body: whenever an ally is engaging prey nearby, its own rushes come faster and its bite finds the throat more readily. Alone and unsupported, its ferocity fades and it fights like any other wolf." [trait/always/damage] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature bound to the concept's verb: trait — faultless-tracker (hunts, hunted)
[reskin] word match declined by the call: faultless-tracker, relentless-pursuit — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit" after being shown faultless-tracker, which the GM's words keyed
[reskin] key match declined: trait — "faultless-tracker" was ranked first on the call's own menu for hunts+hunted, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: trait — "The alpha reads the pack's hunt as one body: whenever an ally is engaging prey nearby, its own rushes come faster and its bite finds the throat more readily. Alone and unsupported, its ferocity fades and it fights like any other wolf." [trait/always/damage] — the model found no template that holds it (offered: faultless-tracker, false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] concept-first trait skipped: faultless-tracker — the call read its match as a collision (the word is a modifier, or the sheet already answers it)
[reskin] weapons answered: Bite = none
[reskin] languages held: None stands — INT 3 on a Beast speaks nothing, whatever the mind read said
[reskin] print canon trait: Pack Tactics — "a dire wolf that hunts in a pack" is the Dire Wolf (print's own row)
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the seat's, not the Dire Wolf's
[reskin] print canon: chassis row leaves — Traits/"Pack Shadow" is the seat's, not the Dire Wolf's
```


---

## Oathbound Battlematron — highest CR

**Concept:** an oathsworn crusader who smites the unclean and mends her soldiers

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Oathbound Battlematron | 8 | defender-5 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok | ok |

- donor · soft · print-rows: rows outside print, the named seat and the keyed seeds: Traits/Guard Aura
- read: def 7 / off 8 → 7.5; sustained 54 (2 × Longsword); nova none; dmg 54

```
Oathbound Battlematron

Medium Humanoid, Neutral

AC 20
Initiative +2 (12)

HP 120 (16d8 + 48)

Speed 30 ft.

MOD
SAVE
STR
20
+5
+8
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
16
+3
+6
CHA
15
+2
+2

Skills Athletics +8, Perception +4

Senses Passive Perception 14

Languages Common

CR 8 (XP 3,900; PB +3)

Traits

Aura of Authority. While in a 10-foot Emanation originating from the battlematron, the battlematron and its allies have Advantage on attack rolls and saving throws, provided the battlematron doesn't have the Incapacitated condition.

Guard Aura. While in a 10-foot Emanation originating from the battlematron, the battlematron's allies have Advantage on saving throws, provided the battlematron doesn't have the Incapacitated condition.

Actions

Multiattack. The battlematron makes two Longsword attacks. It can replace one attack with a use of Shield Bash.

Longsword. Melee Attack Roll: +8, reach 5 ft. 27 (5d8 + 5) Slashing damage.

Shield Bash. Strength Saving Throw: DC 16, one creature within 5 feet that the battlematron can see. Failure: 27 (6d8) Bludgeoning damage. If the target is a Medium or smaller creature, it has the Prone condition. Success: Half damage only.

Bonus Actions

Lay on Hands (2/Day). The battlematron touches a creature within 5 feet of itself and restores 27 (6d8) Hit Points to it.

Divine Smite (2/Day). The battlematron charges its next strike: the first time it hits with an attack before the end of its next turn, the target takes an extra 14 (4d6) Radiant damage.

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

- Traits/Aura of Authority — paladin kit; the GM's clause "crusader"
- Traits/Guard Aura — the chassis
- Actions/Multiattack — the chassis
- Actions/Longsword — print's own row, renamed; weapon longsword
- Actions/Shield Bash — print's own row
- Bonus Actions/Lay on Hands — template lay-on-hands; paladin kit; the GM's clause "mends her soldiers"
- Bonus Actions/Divine Smite — template coating; paladin kit; the GM's clause "smites the unclean"; energy Radiant

**Engine trace**

```
[path] class_npc — class paladin — "crusader" (call)
[route] caster-warpriest (artillery) type=Humanoid mechanics=aura — casts: implied by the kind — "smites the unclean and mends her soldier" | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | caster-warpriest: ✓ ("smites the unclean and mends her soldier") | caster-warpriest: key "smites" (class verb)
[concept] hints: warpriest→style ✓ ("oathsworn crusader who smites")
[concept] resolve: archetype=caster type=Humanoid themes=celestial/armed mind=sapient style=warpriest energy=Radiant mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: aura
[concept] signature elements: smiting the unclean with holy-charged strikes [behavior] | mending her soldiers with battlefield prayers [behavior] | oath-forged iron armor and warhammer [object]
[concept] identity: An oathsworn crusader opens a fight by advancing into the thickest enemy knot, smiting the unclean with a holy-charged warhammer while calling out her oath as a battlefield prayer; every round after she alternates smite and mending, layering healing light onto her wounded soldiers and pressing the front line where her banner flies. She fights with unbroken discipline to the death, refuses to abandon a fallen comrade, and grows more zealous the bloodier the ground gets.
[concept] lore: She swore her oath at a battlefield shrine and took its banner into her own flesh, bound now to crusade against everything unholy until her last soldier falls or the unclean are scoured from the land.
[reskin] energy withheld: Radiant on a Humanoid with no Radiant in the concept's own words (fixed phrases read first)
[reskin] [path] class body: the paladin stands on the Gladiator — the class's own print block, nearest CR 8
[reskin] print canon route: the Gladiator is not a caster first and keys STR 18 over DEX 15 — it casts no spells — the caster family stands down for the plain defender line
[reskin] print canon array: STR 20, DEX 15, CON 16, INT 10, WIS 12, CHA 15 — the Gladiator's, STR fitted to +8
[reskin] donor: defender-5 -> CR 8
[reskin] style unserved: "warpriest" has no defender line — the plain line ships (resolve's style signal is noisy; not re-routed)
[reskin] [path] decides: class_npc on the Gladiator · class paladin (the matcher would have said homebrew)
[reskin] print canon: "an oathsworn crusader who smites the unclean and mends her soldiers" heads on the Gladiator — print's rows ride along; the seat stays
[reskin] repair round 1: 1 defect(s) — renames for "Melee Attack" and "Hybrid Attack" are both "Warhammer" — every row needs its own name (give the thrown twin its own word: Scythe / Hurled Scythe)
[reskin] repair round 2: 1 defect(s) — no damage type for "Hurled Scythe"
[reskin] kit energy: "Divine Smite" deals Radiant, not Bludgeoning — the shape's own fiction
[reskin] class kit: paladin — "crusader": Aura of Authority (Hobgoblin Captain/Aura of Authority), Lay on Hands (2/Day) (lay-on-hands), Divine Smite (2/Day) (coating as Divine Smite)
[reskin] inline declared: "the battlematron" — the call's own answer (kind), built from the name; the rules would have said "Battlematron"
[reskin] inline on kit rows: "Battlematron" -> "the battlematron"
[reskin] inline form: "the battlematron" — the model's own reading of the name
[reskin] energy rider withheld: Radiant on a Humanoid with no Radiant in the concept's own words
[reskin] energy withheld on a base row: "Hurled Scythe" Radiant -> Piercing (the body's physical type; a Humanoid deals no Radiant its concept never gave it)
[reskin] save dc derived: DC 15 -> 16 (8 + PB 3 + the sheet's best 5) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "an oathsworn crusader" -> has (descriptive), head | "smites the unclean" -> has (mechanical) [asked: attack] | "mends her soldiers" -> has (mechanical) [asked: heal]
[reskin] menu pruned: action — snap-shot (the sheet cannot render them)
[reskin] signature idea (action): "When she strikes a foe that has already drawn blood this fight, her oath flares through the warhammer and the blow itself becomes a battlefield prayer: every ally who can see her sees the unclean reel, and their courage hardens into a surge of forward movement toward that enemy. She can only call this out so often before her voice and her arm need stillness to recover." [rider/on_hit/movement] — menu: stunning-strike, charge-push, hook-rider (+ shelf: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, patient-defense, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, riposte)
[reskin] signature bound to the concept's verb: action — rally (mend)
[reskin] word match declined by the call: curse-debt, obstacle-pull, herd, rally, stunning-strike — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit" after being shown rally, which the GM's words keyed
[reskin] key match declined: action — "rally" was ranked first on the call's own menu for mend, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: action — "When she strikes a foe that has already drawn blood this fight, her oath flares through the warhammer and the blow itself becomes a battlefield prayer: every ally who can see her sees the unclean reel, and their courage hardens into a surge of forward movement toward that enemy. She can only call this out so often before her voice and her arm need stillness to recover." [rider/on_hit/movement] — the model found no template that holds it (offered: rally, stunning-strike, charge-push, hook-rider, throw-retrieve, obstacle-pull, herd, curse-debt, second-wind, aggro-curse)
[reskin] fallback respects the call: coating (already on the sheet), rally, herd left the shelf — the call declined them for this sheet
[reskin] fallback stands down: the class_npc path has no shelf — the Gladiator's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 20 already beats print's AC 16 at CR 8, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "The oath branded into her flesh keeps her standing where her banner flies: while she holds the front line and has taken wounds, she refuses to fall, and each time an enemy draws her blood the oath burns hotter, tilting her next strike toward the one who spilled it." [trait/on_being_hit/damage] — menu: absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura)
[reskin] word match declined by the call: bloodied-burst, bloodied-fury, faultless-tracker, uncanny-sense — the key word does not mean the mechanic here
[reskin] trait declined: "Oath Unbroken" — bound only on the idea's own words (keeps her standing:idea) with no key in the concept; a meat body earns its trait by the user's verb (the sniper's tracker, critic 2026-09-29)
[reskin] weapons answered: Warhammer = warhammer
[reskin] print canon alignment: Lawful Good -> Neutral — the Gladiator's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon attack: "Spear" keeps print's hybrid frame — reach 5 ft. or range 20/60 ft. (the Gladiator's weapon is thrown)
[reskin] print canon attack: "Oathsworn Warhammer" -> "Spear" — the Gladiator's own row
[reskin] print canon rows: Hurled Scythe leave — the Gladiator has one melee row (Spear), and Multiattack reads print's
[reskin] print canon row priced: Shield Bash — dice 9 → 27
[reskin] print canon row: Actions/Shield Bash — the Gladiator's own
[reskin] multiattack re-read — "Spear" left; "Multiattack" now reads "The battlematron makes two attacks."
[reskin] class weapon: Actions/"Spear" -> "Longsword" — a paladin fights with a longsword, not the Gladiator's
[reskin] multiattack replacement clause: It can replace one attack with a use of Shield Bash.
[reskin] multiattack normalised: "The battlematron makes two Longsword attacks. It can replace one attack with a use of Shield"
```


---

## Harrowic Vane — a 2014 sheet

**Concept:** a veteran soldier with a longsword who bashes with a buckler

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Harrowic Vane | 6 (2014) | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 4 / off 10 → 7; sustained 66 (3 × Longsword); nova none; dmg 66

```
Harrowic Vane
Medium humanoid, neutral
Armor Class

16 (studded leather, shield)

Hit Points: 

112 (15d8 + 45)

Speed: 

30 ft.

STR	DEX	CON	INT	WIS	CHA


18 (+4)

	

15 (+2)

	

16 (+3)

	

10 (+0)

	

12 (+1)

	

15 (+2)

Skills: 

Athletics +10, Performance +5

Saving Throws: 

STR +7, CON +6

Senses: 

passive Perception 11

Languages: 

Common

Challenge

6 (2,300 XP)

Proficiency Bonus:

+3

Second Wind (2/Day). As a bonus action, Harrowic regains 19 (3d12) hit points.
Riposte (Reaction). When a creature within 5 feet of Harrowic misses it with a melee attack roll, Harrowic makes one Longsword attack against that creature.

Actions
Multiattack: Harrowic makes three Longsword attacks. It can replace one attack with a use of Shield Bash.
Longsword: Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 22 (4d8 + 4) slashing damage, and the target has disadvantage on its next attack roll before the start of Harrowic's next turn.
Shield Bash: One creature within 5 feet that Harrowic can see must succeed on a DC 15 Strength saving throw or take 10 (3d6) bludgeoning damage, and if the target is Medium or smaller, it is knocked prone.
```

**Where each row came from**

- Actions/Multiattack — the chassis
- Actions/Longsword — authored for this sheet; a named part; a declared feature; the GM's clause "a veteran soldier with a longsword"; weapon longsword
- Actions/Shield Bash — template shield-bash; fighter kit; the GM's clause "bashes with a buckler"
- Reactions/Riposte — template riposte; fighter kit; the GM's clause "soldier"
- Bonus Actions/Second Wind — template second-wind; fighter kit; the GM's clause "soldier"

**Engine trace**

```
[path] class_npc — class fighter — "soldier" (call)
[route] defender type=Humanoid mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | defender: ✓ ("a veteran soldier") | defender: no line key in the words — the model's read of its quote
[concept] resolve: archetype=defender type=Humanoid themes=armed/forged mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: buckler bash to stagger and shove [behavior] | longsword thrust into the opening [object] | rooted line-holding guard that punishes anyone slipping past [behavior]
[concept] identity: A disciplined line-holder who opens by advancing shield-first, using the buckler to turn aside blows and shove attackers off balance before driving the longsword into the gap. Every round it fights as a patient duelist, bashing to stagger then thrusting to finish, and it anchors itself in place to punish anyone who tries to slip past its reach. Under pressure it does not flee — it tightens its guard, fights to the death, and stays rooted until the line breaks or it does.
[concept] lore: A career soldier who outlived every banner he swore to and now sells his unbroken guard to whoever holds the wall, wanting only a steady wage and a fight he can win on his feet.
[reskin] [path] class body: the fighter stands on the Gladiator — the class's own print block, nearest CR 6
[reskin] print canon defenses: HP 114 -> 112, AC 18 -> 16 — the Gladiator's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon armor: 16 (studded leather, shield) — print's Gear line; the 2014 sheet prints it (the Goblin Boss wore "splint", canaries 2026-10-12)
[reskin] print canon array: STR 18, DEX 15, CON 16, INT 10, WIS 12, CHA 15 — the Gladiator's at its own CR; attack +6 -> +7, DC 15 (print's)
[reskin] donor: defender-5 -> CR 6
[reskin] row gated out: Guard Aura (aura) — the concept did not claim this mechanic
[reskin] [path] decides: class_npc on the Gladiator · class fighter (the matcher would have said twist Warrior Infantry)
[reskin] print canon: "a veteran soldier with a longsword who bashes with a buckler" heads on the Gladiator — print's rows ride along; the seat stays
[reskin] named parts: Longsword (slot) — the user's words, the engine's numbers
[reskin] named parts landed: 1 attack row(s), 0 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] chassis row off: Actions/"Buckler Bash" leaves — the GM named a melee weapon (Longsword); one weapon, one rule set
[reskin] class kit: fighter — "soldier": Riposte (riposte), Shield Bash (shield-bash), Second Wind (2/Day) (second-wind)
[reskin] inline declared: "Harrowic" — the call's own answer (person), built from the name
[reskin] inline form: "Harrowic" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] asked field dropped: the call answered limit "at_will" for "bashes with a buckler" but offered no quote
[reskin] clauses: "a veteran soldier with a longsword" -> has (descriptive), head | "bashes with a buckler" -> has (mechanical) [asked: attack]
[reskin] menu pruned: action — push-prone (the sheet cannot render them)
[reskin] signature idea (action): "When Harrowic hits a creature he has already knocked off balance with his buckler, he drives the longsword into that opening and the wound bleeds freely, leaving the target unable to recover its footing for a short while. The strike only lands this brutal way against someone he has just staggered, so it rewards following a bash with an immediate thrust." [rider/on_hit/damage] — menu: stunning-strike, charge-push, hook-rider (+ shelf: seal, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, herd, curse-debt, reveal, wind-up, exploiter, patient-defense, lay-on-hands, aggro-curse, own-turn-punisher, self-invisibility, rally)
[reskin] decline reason: action — the call answered none and names it "no_fit"
[reskin] signature miss: action — "When Harrowic hits a creature he has already knocked off balance with his buckler, he drives the longsword into that opening and the wound bleeds freely, leaving the target unable to recover its footing for a short while. The strike only lands this brutal way against someone he has just staggered, so it rewards following a bash with an immediate thrust." [rider/on_hit/damage] — the model found no template that holds it (offered: stunning-strike, charge-push, hook-rider, herd, own-turn-punisher)
[reskin] fallback stands down: the class_npc path has no shelf — the Gladiator's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 16 already beats print's AC 15 at CR 6, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "Harrowic plants himself where he stands and dares the fight to move; anyone who turns their back on him to slip past his guard feels the longsword bite their flank as they go. He never chases — he simply makes leaving his reach cost blood." [trait/always/damage] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending, weapon-lodge)
[reskin] word match declined by the call: guarded-stance, relentless-pursuit, bound, faultless-tracker — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "Harrowic plants himself where he stands and dares the fight to move; anyone who turns their back on him to slip past his guard feels the longsword bite their flank as they go. He never chases — he simply makes leaving his reach cost blood." [trait/always/damage] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, bloodied-burst)
[reskin] weapons answered: Longsword = longsword; Buckler Bash = buckler (shield)
[reskin] print canon multiattack: "Harrowic makes three Spear attacks. It can replace one attack with a use of Shield Bash." — the Gladiator's own
[reskin] print canon skills: "Athletics +7, Perception +4" -> "Athletics +10, Performance +5" — the Gladiator's own skills, each derived from this sheet's stat and PB
[reskin] multiattack re-read — "Longsword" joins the combination; "Harrowic makes three attacks, using Spear or Longsword in any combination. It can replace "
[reskin] multiattack re-read: "Spear" is not on this sheet, so the combination now reads "Harrowic makes three Longsword attacks. It can replace one attack with a use of "
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---

## Open-Palmed Adept — a 2024 sheet

**Concept:** a lizardfolk monk who strikes pressure points with an open hand

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Open-Palmed Adept | 5 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- **dropped clause:** "strikes pressure points with an open hand"
- read: def 5 / off 7 → 6; sustained 48 (2 × Unarmed Strike); nova none; dmg 48

```
Open-Palmed Adept

Medium Humanoid, Neutral

AC 16
Initiative +3 (13)

HP 90 (20d8)

Speed 30 ft., Climb 30 ft., Swim 30 ft.

MOD
SAVE
STR
10
+0
+0
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
10
+0
+0
CHA
16
+3
+3

Skills Perception +5, Stealth +6

Senses Passive Perception 15

Languages Common plus one other language, Draconic

CR 5 (XP 1,800; PB +3)

Traits

Hold Breath. The adept can hold its breath for 15 minutes.

Marsh Stride. Difficult Terrain composed of mud doesn't cost the adept extra movement, and the adept can move across mud without needing to make an ability check.

Actions

Multiattack. The adept makes two attacks, using Unarmed Strike or Dart in any combination.

Unarmed Strike. Melee Attack Roll: +6, reach 5 ft. 24 (4d6 + 3) Bludgeoning damage. Once on each of the adept's turns when it hits with this attack, the target is subjected to the following effect. Constitution Saving Throw: DC 13. Failure: The target has the Stunned condition until the end of the adept's next turn.

Dart. Ranged Attack Roll: +6, range 20/60 ft. 16 (3d8 + 3) Piercing damage.

Bonus Actions

Patient Defense. The adept takes the Dodge action.

Cunning Action. The adept takes the Dash, Disengage, or Hide action.

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

- Traits/Hold Breath — lizardfolk kit; the GM's clause "monk"
- Traits/Marsh Stride — lizardfolk kit; the GM's clause "monk"
- Actions/Multiattack — the chassis
- Actions/Unarmed Strike — print's own row, renamed; a declared feature; the GM's clause "monk"
- Actions/Dart — print's own row, renamed; weapon dart
- Bonus Actions/Patient Defense — template patient-defense; monk kit; the GM's clause "monk"
- Bonus Actions/Cunning Action — print's own row

**Engine trace**

```
[path] refused: print_body "Lizardfolk" is not in the corpus
[path] class_npc — class monk — species lizardfolk — "monk" (call)
[route] skirmisher type=Humanoid mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | skirmisher: ✓ ("strikes pressure points with an open han") | skirmisher: no line key in the words — the model's read of its quote
[concept] name: provided_name rejected — "a lizardfolk monk who strikes pressure p…" is the description, not a name
[concept] resolve: archetype=skirmisher type=Humanoid themes=bestial/mind mind=sapient style=— energy=Poison mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: open-palm pressure-point strikes that numb and slow the body [behavior] | venomous claws and glands that steep its touch in toxin [body] | dart-in, dart-out circling at the edge of reach [behavior]
[concept] identity: A lizardfolk monk who reads an enemy's body like a map, opening with a whipping open-palm jab at a nerve cluster to numb the limbs before the real strikes land. Round after round it circles at the edge of reach, darting in for two or three precise pressure-point blows and slipping back out of retaliation range, patient and disciplined. Pressed and bloodied it withdraws cleanly rather than brawl, letting its foes' own deadened limbs and slowed reflexes buy the distance — but cornered with its back to stone it fights to the death, contemptuous of retreat.
[concept] lore: A student of a hidden lizardfolk pressure-point school, it hunts the swamp trails and temple steps it once trained on, disabling sentries and challengers alike to prove its open-hand form the equal of any blade.
[reskin] energy withheld: Poison on a Humanoid with no Poison in the concept's own words (fixed phrases read first)
[reskin] [path] class body: the monk stands on the Spy — the class's own print block, nearest CR 5
[reskin] print canon array: STR 10, DEX 16, CON 10, INT 12, WIS 14, CHA 16 — the Spy's, DEX fitted to +6
[reskin] donor: skirmisher-3 -> CR 5
[reskin] [path] decides: class_npc on the Spy · class monk (the matcher would have said homebrew)
[reskin] print canon: "a lizardfolk monk who strikes pressure points with an open hand" heads on the Spy — print's rows ride along; the seat stays
[reskin] row evicted for the cap: Traits/"Circling Step" (chassis filler) leaves so "Marsh Stride" fits — the cap evicts by priority, it does not refuse the newcomer
[reskin] species kit: lizardfolk — "monk": Hold Breath (Hydra/Hold Breath), Marsh Stride (terrain-walk, authored); Swim 30 ft.
[reskin] class kit: monk — "monk": Stunning Strike (stunning-strike, rides Open Palm), Patient Defense (patient-defense)
[reskin] inline declared: "the adept" — the call's own answer (kind), built from the name
[reskin] inline form: "the adept" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] asked field dropped: the call answered trigger "at_will" for "strikes pressure points with an open hand" but offered no quote
[reskin] asked field dropped: the call answered limit "at_will" for "strikes pressure points with an open hand" but offered no quote
[reskin] clauses: "a lizardfolk monk" -> has (descriptive), head | "strikes pressure points with an open hand" -> has (mechanical) [asked: attack]
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "When the adept strikes a foe it has already numbed, it seizes the opening and follows through — a single unbroken lightning exchange of precise open-hand blows — then is gone again, slipping back out to the edge of reach before the enemy can answer. It can only ride this opening once against any one opponent in a fight, and the window shuts the moment its target shakes off the numbness." [rider/on_hit/damage] — menu: charge-push, hook-rider, pounce, isolation, bolt-mark, charge (+ shelf: trample, leap, gaze-single, snare, condition-payoff, throw-retrieve, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, exploiter, rampage, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte)
[reskin] signature bound to the concept's verb: action — riposte (opening)
[reskin] fit declined: "Numbed Opening" — a print body takes only what the user's words ask; the call offered no quote, and the key table finds no verb either (the blacksmith's rally, critic-ten 2026-10-01)
[reskin] fallback stands down: the class_npc path has no shelf — the Spy's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 16 already beats print's AC 15 at CR 5, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "Its touch numbs as much as it wounds: the backs of its clawed hands carry a slow, spreading poison that deadens the limb it lands on, so anyone who takes a blow from those hands finds their own reflexes dragging for a while afterward — the adept's patient circling prey grows clumsier the longer the exchange runs." [trait/always/condition] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "Its touch numbs as much as it wounds: the backs of its clawed hands carry a slow, spreading poison that deadens the limb it lands on, so anyone who takes a blow from those hands finds their own reflexes dragging for a while afterward — the adept's patient circling prey grows clumsier the longer the exchange runs." [trait/always/condition] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst, bloodied-burst)
[reskin] weapons answered: Open Palm = none; Palm Wave = none
[reskin] weapon table: "Palm Wave" — range 30/90 ft. is not a print range; an unlisted thrown thing is 20/60, a hurled mass 60/240 (the critic's third species read)
[reskin] speed by body: a Humanoid walks 30 ft. (print's people; a hermit ran 50 — critic's audit 2026-10-02)
[reskin] speed by concept:  — the concept's movement set decides
[reskin] print canon alignment: Lawful Neutral -> Neutral — the Spy's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Draconic, Common" -> "Common plus one other language, Draconic" — the Spy's plus the concept's Draconic
[reskin] print canon attack: "Open Palm" -> "Shortsword" — the Spy's own row
[reskin] print canon attack: "Palm Wave" -> "Hand Crossbow" — the Spy's own ranged row
[reskin] print canon row: Bonus Actions/Cunning Action — the Spy's own
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" yields to the Spy's Cunning Action
[reskin] multiattack re-read — "Shortsword" left; "Multiattack" now reads "The adept makes two Hand Crossbow attacks."
[reskin] class weapon: Actions/"Shortsword" -> "Unarmed Strike" — a monk fights with its hands, not the Spy's; the body's rider folds in (+7)
[reskin] multiattack re-read — "Hand Crossbow" left; "Multiattack" now reads "The adept makes two attacks."
[reskin] class weapon: Actions/"Hand Crossbow" -> "Dart" — a monk fights with a dart, not the Spy's
[reskin] multiattack normalised: "The adept makes two attacks, using Unarmed Strike or Dart in any combination."
audit finding below confidence gate: Unarmed Strike Stunned is a hard condition imposed with a save, which is fine, but the block gives no escape or repeat save once applied; per calibration this is acceptable single-target, yet the 'until end of next turn' fixed duration does supply an exit, so this is noted only to confirm compliance and is NOT a defect — remove if you agree.
[reskin] species kit: Swim 30 ft. — the lizardfolk's
```


---

## Vexia Emberhorn — a print donor

**Concept:** a tiefling rogue who stalks the rooftops of the old quarter

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Vexia Emberhorn | 5 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 5 / off 5 → 5; sustained 34 (2 × Shortsword); nova none; dmg 34

```
Vexia Emberhorn

Medium Humanoid, Neutral

AC 16
Initiative +3 (13)

HP 91 (14d8 + 28)

Speed 30 ft.

MOD
SAVE
STR
15
+2
+2
INT
14
+2
+2
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
14
+2
+2

Skills Perception +3, Stealth +9

Resistances Fire

Senses darkvision 60 ft.; Passive Perception 13

Languages Common, Thieves' cant, Infernal

CR 5 (XP 1,800; PB +3)

Traits

Assassinate. During the first round of each combat, Vexia has Advantage on attack rolls against any creature that hasn't taken a turn. If Vexia hits a creature during that round, the target takes an extra 9 (2d8) Piercing damage.

Evasion. If Vexia is subjected to an effect that allows it to make a Dexterity saving throw to take only half damage, Vexia instead takes no damage if it succeeds on the save and only half damage if it fails. It can't use this trait if it has the Incapacitated condition.

Actions

Multiattack. Vexia makes two attacks, using Shortsword or Shortbow in any combination.

Shortsword. Melee Attack Roll: +6, reach 5 ft. 17 (4d6 + 3) Piercing damage.

Shortbow. Ranged Attack Roll: +6, range 80/320 ft. 16 (3d8 + 3) Piercing damage.

Bonus Actions

Cunning Action. Vexia takes the Dash, Disengage, or Hide action.

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

- Traits/Assassinate — template assassinate; rogue kit; the GM's clause "stalks the rooftops of the old quarter"
- Traits/Evasion — template evasion; rogue kit; the GM's clause "rogue"
- Actions/Multiattack — the chassis
- Actions/Shortsword — print's own row, renamed; weapon shortsword
- Actions/Shortbow — print's own row, renamed; weapon shortbow
- Bonus Actions/Cunning Action — rogue kit; the GM's clause "rogue"

**Engine trace**

```
[path] class_npc — class rogue — species tiefling — "rogue" (call)
[route] skirmisher-skulker type=Humanoid mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | skirmisher-skulker: ✓ ("stalks the rooftops of the old quarter") | skirmisher-skulker: key "stalks" (class verb)
[concept] resolve: archetype=skirmisher type=Humanoid themes=terror/armed mind=sapient style=skulker energy=Fire mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: striking from above and vanishing across rooftops [behavior] | a blade carried in the dark [object] | horns and dark tiefling bloodline [body]
[concept] identity: The rooftop stalker opens by dropping from a ledge above the old quarter's alleys, driving a blade into a mark's back before anyone thinks to look up. Every round after, it breaks line of sight across chimneys and eaves, re-emerging from an unseen angle to strike with advantage and then slipping away into the dark between rooftops. It is patient and playful, toying with a panicked quarry until bloodied — only then does it cut a full retreat over the close roofs, preferring to live and strike again over trading blows in the open.
[concept] lore: A tiefling who learned the old quarter's rooftops before its streets, it haunts the eaves above the merchants who once spat on its horns, exacting a quiet toll from those who never look up.
[reskin] energy withheld: Fire on a Humanoid with no Fire in the concept's own words (fixed phrases read first)
[reskin] [path] class body: the rogue stands on the Bandit Captain — the class's own print block, nearest CR 5
[reskin] print canon array: STR 15, DEX 16, CON 14, INT 14, WIS 11, CHA 14 — the Bandit Captain's, DEX fitted to +6
[reskin] donor: skirmisher-3-skulker -> CR 5
[reskin] row gated out: Ranged Save Effect (gaze) — the concept did not claim this mechanic
[reskin] row gated out: Teleport (teleport) — the concept did not claim this mechanic
[reskin] [path] decides: class_npc on the Bandit Captain · class rogue (the matcher would have said twist Spy)
[reskin] print canon: "a tiefling rogue who stalks the rooftops of the old quarter" heads on the Bandit Captain — print's rows ride along; the seat stays
[reskin] species kit: tiefling — "rogue": header lines only; darkvision 60 ft.; resistance Fire
[reskin] class kit: Cunning Action — the sheet already carries it, so the rogue kit adopts that row: the cap may no longer read it as filler
[reskin] class kit: rogue — "rogue": Evasion (evasion), Assassinate (assassinate)
[reskin] inline declared: "Vexia" — the call's own answer (person), built from the name
[reskin] inline form: "Vexia" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a tiefling rogue" -> has (descriptive), head | "stalks the rooftops of the old quarter" -> has (descriptive)
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "When Vexia strikes a target she cannot be seen by — from a ledge above, out of a dark chimney-shadow — the wound lands where the mark never braced for it, and the moment the blade bites she is already gone, clattering away across the eaves so that a second strike comes from a fresh and unseen angle. Foes who crane their necks and chase her shadow up the rooftops are left swinging at empty dark whi" [rider/on_hit/damage] — menu: affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, isolation, bolt-mark (+ shelf: leap, gaze-single, snare, condition-payoff, throw-retrieve, shield-bash, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, exploiter, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte)
[reskin] signature bound to the concept's verb: action — focus (stalk)
[reskin] word match declined by the call: focus, self-invisibility, bolt-mark, aggro-curse — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit" after being shown focus, which the GM's words keyed
[reskin] key match declined: action — "focus" was ranked first on the call's own menu for stalk, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: action — "When Vexia strikes a target she cannot be seen by — from a ledge above, out of a dark chimney-shadow — the wound lands where the mark never braced for it, and the moment the blade bites she is already gone, clattering away across the eaves so that a second strike comes from a fresh and unseen angle. Foes who crane their necks and chase her shadow up the rooftops are left swinging at empty dark whi" [rider/on_hit/damage] — the model found no template that holds it (offered: focus, affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, isolation, bolt-mark, self-invisibility, leap, delayed-brand, rampage, aggro-curse)
[reskin] fallback respects the call: focus, self-invisibility left the shelf — the call declined them for this sheet
[reskin] fallback stands down: the class_npc path has no shelf — the Bandit Captain's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 16 already beats print's AC 15 at CR 5, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "Vexia is at home in the dark between rooftops: as long as she stays above her prey, tucked into eaves or shadowed heights, she melts from notice even in plain view, and quarry who lose sight of her cannot find her again until she chooses to show herself." [trait/always/defense] — menu: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] signature bound to the concept's verb: trait — faultless-tracker (stalks, stalk)
[reskin] word match declined by the call: faultless-tracker, spider-climb — the key word does not mean the mechanic here
[reskin] signature miss: trait — "Vexia is at home in the dark between rooftops: as long as she stays above her prey, tucked into eaves or shadowed heights, she melts from notice even in plain view, and quarry who lose sight of her cannot find her again until she chooses to show herself." [trait/always/defense] — the model picked "false-appearance" (no verb, and it quotes nothing the GM typed) over a concept-verb template (faultless-tracker)
[reskin] concept-first trait skipped: faultless-tracker — the call read its match as a collision (the word is a modifier, or the sheet already answers it)
[reskin] weapons answered: Dagger = dagger; Hand Crossbow = hand crossbow
[reskin] weapon table: "Hand Crossbow" — a launcher, never thrown, range 30/120
[reskin] print canon modes: climb off — the Bandit Captain has no such mode and the words name none
[reskin] speed by body: a Humanoid walks 30 ft. (print's people; a hermit ran 50 — critic's audit 2026-10-02)
[reskin] speed by concept: dropped Climb 30 ft. — the concept's movement set decides
[reskin] print canon languages: "Common, Infernal" -> "Common, Thieves' cant, Infernal" — the Bandit Captain's plus the concept's Infernal
[reskin] print canon attack: "Dagger" -> "Scimitar" — the Bandit Captain's own row
[reskin] print canon attack: "Hand Crossbow" -> "Pistol" — the Bandit Captain's own ranged row
[reskin] on-hit extra retyped: "Assassinate" adds Slashing, not Bludgeoning — the hit's own type (Scimitar)
[reskin] print canon: chassis row leaves — Traits/"Eave Runner" is the seat's, not the Bandit Captain's
[reskin] on-hit extra retyped: "Assassinate" adds Piercing, not Slashing — the class weapon's own type (Shortsword)
[reskin] multiattack re-read — "Scimitar" left; "Multiattack" now reads "Vexia makes two Pistol attacks."
[reskin] class weapon: Actions/"Scimitar" -> "Shortsword" — a rogue fights with a shortsword, not the Bandit Captain's
[reskin] multiattack re-read — "Pistol" left; "Multiattack" now reads "Vexia makes two attacks."
[reskin] class weapon: Actions/"Pistol" -> "Shortbow" — a rogue fights with a shortbow, not the Bandit Captain's
[reskin] multiattack normalised: "Vexia makes two attacks, using Shortsword or Shortbow in any combination."
audit finding below confidence gate: Multiattack The sentence is missing a relative pronoun, producing an ungrammatical construction.
[reskin] species kit: resistance Fire — the tiefling's
[harness] re-rolled Traits/"Assassinate" -> "Rooftop Prowler" [catalog: terrain-walk]
```

**Re-roll — one entry, replaced**

```
Traits / BEFORE  Assassinate: During the first round of each combat, Vexia has Advantage on attack rolls against any creature that hasn't taken a turn. If Vexia hits a creature during that round, the target takes an extra 9 (2d8) Piercing damage.
Traits / AFTER   Rooftop Prowler: Difficult Terrain composed of rooftops, ledges, and uneven urban footing doesn't cost Vexia extra movement, and Vexia can move across rooftops, ledges, and uneven urban footing without needing to make an ability check.
provenance: catalog template "terrain-walk"
```


---

## Vareth Solmane — one marked soft

**Concept:** name: Vareth Solmane | a templar priest of the dawn who blesses her soldiers

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Vareth Solmane | 6 | defender-5 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok | ok |

- donor · soft · print-rows: rows outside print, the named seat and the keyed seeds: Traits/Guard Aura
- read: def 4 / off 5 → 4.5; sustained 33 (3 × Longsword); nova none; dmg 33

```
Vareth Solmane

Medium Humanoid, Neutral

AC 16
Initiative +2 (12)

HP 112 (15d8 + 45)

Speed 30 ft.

MOD
SAVE
STR
18
+4
+7
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
16
+3
+6
CHA
15
+2
+2

Skills Athletics +10, Performance +5

Senses Passive Perception 11

Languages Common

CR 6 (XP 2,300; PB +3)

Traits

Aura of Authority. While in a 10-foot Emanation originating from Vareth, Vareth and its allies have Advantage on attack rolls and saving throws, provided Vareth doesn't have the Incapacitated condition.

Guard Aura. While in a 10-foot Emanation originating from Vareth, Vareth's allies have Advantage on saving throws, provided Vareth doesn't have the Incapacitated condition.

Actions

Multiattack. Vareth makes three Longsword attacks. It can replace one attack with a use of Shield Bash.

Longsword. Melee Attack Roll: +7, reach 5 ft. 11 (2d6 + 4) Slashing damage.

Shield Bash. Strength Saving Throw: DC 15, one creature within 5 feet that Vareth can see. Failure: 9 (2d4 + 4) Bludgeoning damage. If the target is a Medium or smaller creature, it has the Prone condition.

Bonus Actions

Dawn Banner (2/Day). Each ally within 30 feet of Vareth gains 11 (2d10) Temporary Hit Points.

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

- Traits/Aura of Authority — paladin kit; the GM's clause "templar"
- Traits/Guard Aura — the chassis
- Actions/Multiattack — the chassis
- Actions/Longsword — print's own row, renamed; weapon longsword
- Actions/Shield Bash — print's own row
- Bonus Actions/Dawn Banner — template rally; library draw (seed unstamped); the GM's clause "blesses her soldiers"; binds the GM's words: blessing+bless+mend

**Engine trace**

```
[path] class_npc — class paladin — "templar" (call)
[route] caster-warpriest (artillery) type=Humanoid mechanics=aura — casts: implied by the kind — "a templar priest of the dawn who blesses" | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | caster-warpriest: ✓ ("a templar priest of the dawn who blesses") | caster-warpriest: key "blesses" (class verb)
[concept] name: "Vareth Solmane" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] resolve: archetype=caster type=Humanoid themes=armed/celestial mind=sapient style=warpriest energy=Radiant mix=both identity=✓ lore=✓
[concept] name: provided "Vareth Solmane"
[concept] mechanics: aura
[concept] signature elements: dawn-blessings cast over her soldiers [behavior] | holy blade strikes [object] | unbreakable formation faith [behavior]
[concept] identity: Vareth Solmane opens battle by planting her banner and casting a dawn-blessing over her soldiers, then wades in behind them with a blade that carries the light of morning. Every round she alternates holy strikes with prayers that steady, mend, or rally her allies, keeping the line unbroken while she burns the unholy. Under pressure she holds the formation and shields her flock rather than retreat, and she will not abandon a wounded soldier. Her faith — not her body — is what makes her relentless.
[concept] lore: Vareth Solmane is a templar priest who swore her oath to the Dawnmother after her garrison was spared by a sunrise no one could explain; she now leads her blessed soldiers across the war-torn marches, healing the faithful and delivering the dawn's judgment to those who shelter in darkness.
[reskin] energy withheld: Radiant on a Humanoid with no Radiant in the concept's own words (fixed phrases read first)
[reskin] [path] class body: the paladin stands on the Gladiator — the class's own print block, nearest CR 6
[reskin] print canon route: the Gladiator is not a caster first and keys STR 18 over DEX 15 — it casts no spells — the caster family stands down for the plain defender line
[reskin] print canon defenses: HP 91 -> 112, AC 19 -> 16 — the Gladiator's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon armor: 16 (studded leather, shield) — print's Gear line; the 2014 sheet prints it (the Goblin Boss wore "splint", canaries 2026-10-12)
[reskin] print canon array: STR 18, DEX 15, CON 16, INT 10, WIS 12, CHA 15 — the Gladiator's at its own CR; attack +7 -> +7, DC 15 (print's)
[reskin] donor: defender-5 -> CR 6
[reskin] style unserved: "warpriest" has no defender line — the plain line ships (resolve's style signal is noisy; not re-routed)
[reskin] [path] decides: class_npc on the Gladiator · class paladin (the matcher would have said twist Priest)
[reskin] print canon: "Vareth Solmane — a templar priest of the dawn who blesses her soldiers" heads on the Gladiator — print's rows ride along; the seat stays
[reskin] name_element answered: Dawnlight Bolt = literal
[reskin] repair round 1: 1 defect(s) — "Dawnlight Bolt" deals Radiant on a Humanoid whose concept names no Radiant — a name is not a warrant; use a physical type
[reskin] class kit: paladin — "templar": Aura of Authority (Hobgoblin Captain/Aura of Authority)
[reskin] proper noun: "Vareth Solmane" — the Name field is a person, not a kind (no print match, no article in the words)
[reskin] inline declared: "Vareth" — the call's own answer (person), built from the name
[reskin] inline form: "Vareth" — the model's own reading of the name
[reskin] energy rider withheld: Radiant on a Humanoid with no Radiant in the concept's own words
[reskin] energy withheld on a base row: "Dawnlight Bolt" Radiant -> Piercing (the row's own noun; a Humanoid deals no Radiant its concept never gave it)
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Vareth Solmane — a templar priest of the dawn" -> has (descriptive), head | "blesses her soldiers" -> has (mechanical) [asked: buff_ally]
[reskin] menu pruned: action — snap-shot (the sheet cannot render them)
[reskin] signature idea (action): "Vareth lifts her banner and calls down the dawn's blessing on her soldiers, mending their wounds and steadying their shaken hearts so the line holds even when it should break. Any soldier of hers who has fallen wounded or staggered hears the call and rises again into the fight, the light burning off them like morning mist." [action/once_per_fight/resource] — menu: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up (+ shelf: patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, riposte, stunning-strike, charge-push, hook-rider)
[reskin] signature bound to the concept's verb: action — rally (blessing, bless)
[reskin] word match declined by the call: lay-on-hands — the key word does not mean the mechanic here
[reskin] signature template: rally -> Bonus Actions/"Dawn Banner (2/Day)" ("the banner call blesses and mends her soldiers, granting them staying power to h [verb: blessing:concept, bless:concept, mend:idea]")
[reskin] keys spent by the action: blessing, bless
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 16 already beats print's AC 15 at CR 6, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "The light of morning clings to Vareth's blade, and when it bites into the unholy or the night-sworn, the dawn answers her faith with a searing flare that lingers on the wound, so her holy strikes burn longer than steel alone." [trait/always/damage] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending, weapon-lodge)
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "The light of morning clings to Vareth's blade, and when it bites into the unholy or the night-sworn, the dawn answers her faith with a searing flare that lingers on the wound, so her holy strikes burn longer than steel alone." [trait/always/damage] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, bloodied-burst)
[reskin] weapons answered: Longsword = longsword; Dawnlight Bolt = none; Sunveiled Sign = none
[reskin] weapon declined: "Dawnlight Bolt" reads crossbow from its name, but the call answered none — the row carries no weapon
[reskin] weapon table: "Dawnlight Bolt" rolls Dexterity — +7 → +5
[reskin] weapon table: "Dawnlight Bolt" damage off Dexterity — 22 (4d8 + 4) → 20 (4d8 + 2)
[reskin] weapon table: "Dawnlight Bolt" — a launcher, never thrown, range 80/320
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] print canon alignment: Lawful Good -> Neutral — the Gladiator's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon attack: "Spear" keeps print's hybrid frame — reach 5 ft. or range 20/60 ft. (the Gladiator's weapon is thrown)
[reskin] print canon attack: "Longsword" -> "Spear" — the Gladiator's own row
[reskin] print canon multiattack: "Vareth makes three Spear attacks. It can replace one attack with a use of Shield Bash." — the Gladiator's own
[reskin] ranged row off: "Dawnlight Bolt" leaves — the Gladiator carries no ranged row and the words name none
[reskin] print canon skills: "Athletics +7, Perception +4" -> "Athletics +10, Performance +5" — the Gladiator's own skills, each derived from this sheet's stat and PB
[reskin] print canon row: Actions/Shield Bash — the Gladiator's own
[reskin] multiattack re-read — "Spear" left; "Multiattack" now reads "Vareth makes three attacks. It can replace one attack with a use of Shield Bash."
[reskin] class weapon: Actions/"Spear" -> "Longsword" — a paladin fights with a longsword, not the Gladiator's
[reskin] multiattack normalised: "Vareth makes three Longsword attacks. It can replace one attack with a use of Shield Bash."
[reskin] row binds its clause: "Dawn Banner" answers "blesses her soldiers" — the keys it matched came from that clause, so the coverage credit has a receipt
[harness] re-rolled Actions/"Longsword" -> "Longsword" [the call's own text]
```

**Re-roll — one entry, replaced**

```
Actions / BEFORE  Longsword: *Melee Attack Roll:* +7, reach 5 ft. 11 (2d6 + 4) Slashing damage.
Actions / AFTER   Longsword: *Melee Attack Roll:* +7, reach 5 ft. 11 (2d6 + 4) Slashing damage plus 3 (1d6) Radiant damage. On a hit, Vareth can choose one ally within 10 feet of the target; that ally deals an extra 3 (1d6) Radiant damage on its next attack before the start of Vareth's next turn.
provenance: none — the call wrote the text itself
```


---

## Dame Oriel — in the run

**Concept:** name: Dame Oriel | a knight who holds the line with a shield and a longsword

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Dame Oriel | 5 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 4 / off 10 → 7; sustained 66 (3 × Longsword); nova none; dmg 66

```
Dame Oriel

Medium Humanoid, Neutral

AC 16
Initiative +2 (12)

HP 112 (15d8 + 45)

Speed 30 ft.

MOD
SAVE
STR
18
+4
+7
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
16
+3
+6
CHA
15
+2
+2

Skills Athletics +10, Performance +5

Senses Passive Perception 11

Languages Common

CR 5 (XP 1,800; PB +3)

Traits

Guarded Stance. While Dame Oriel isn't Bloodied, melee attack rolls against it are made with Disadvantage.

Actions

Multiattack. Dame Oriel makes three Longsword attacks. It can replace one attack with a use of Shield Bash.

Longsword. Melee Attack Roll: +7, reach 5 ft. 22 (4d8 + 4) Slashing damage, and the target has Disadvantage on its next attack roll before the start of Dame Oriel's next turn.

Shield Bash. Strength Saving Throw: DC 15, one creature within 5 feet that Dame Oriel can see. Failure: 9 (2d4 + 4) Bludgeoning damage. If the target is a Medium or smaller creature, it has the Prone condition.

Reactions

Riposte. Trigger: A creature within 5 feet of Dame Oriel misses it with a melee attack roll. Response: Dame Oriel makes one Longsword attack against that creature.

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

- Traits/Guarded Stance — template guarded-stance; fighter kit; the GM's clause "keeps the line with a shield and a longsword"
- Actions/Multiattack — the chassis
- Actions/Longsword — authored for this sheet; a named part; a declared feature; the GM's clause "keeps the line with a shield and a longsword"; weapon longsword
- Actions/Shield Bash — print's own row
- Reactions/Riposte — template riposte; fighter kit; the GM's clause "knight"

**Engine trace**

```
[path] class_npc — class fighter — "knight" (call)
[route] defender type=Humanoid mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | defender: ✓ ("keeps the line with a shield and a longs") | defender: key "keeps the line" (class verb)
[concept] name: "Dame Oriel" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] resolve: archetype=defender type=Humanoid themes=armed/forged mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: provided "Dame Oriel"
[concept] mechanics: none claimed
[concept] signature elements: holding the line with shield and sword [behavior] | shield-bash that staggers attackers back [body] | iron plate and shield [object]
[concept] identity: Dame Oriel plants herself in the tightest gap of the line, shield high and longsword low, and lets the enemy come to her — she opens by bracing for a charge and answering the first blow with a shield shove that staggers the attacker back, then holds her ground every round, cutting down anyone who tries to slip past her. She punishes overreach and never chases; if bloodied she does not flee but tightens her guard, spending the rest of the fight bleeding attackers on her shield edge and refusing to yield the corridor she defends.
[concept] lore: A veteran of a broken knightly order, Dame Oriel holds a ford, a stair, or a doorway that no one else will hold, and she will die at her post before she lets an enemy walk past her.
[reskin] [path] class body: the fighter stands on the Gladiator — the class's own print block, nearest CR 5
[reskin] print canon defenses: HP 78 -> 112, AC 19 -> 16 — the Gladiator's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon armor: 16 (studded leather, shield) — print's Gear line; the 2014 sheet prints it (the Goblin Boss wore "splint", canaries 2026-10-12)
[reskin] print canon array: STR 18, DEX 15, CON 16, INT 10, WIS 12, CHA 15 — the Gladiator's at its own CR; attack +6 -> +7, DC 15 (print's)
[reskin] donor: defender-5 -> CR 5
[reskin] row gated out: Guard Aura (aura) — the concept did not claim this mechanic
[reskin] [path] decides: class_npc on the Gladiator · class fighter (the matcher would have said homebrew)
[reskin] print canon: "Dame Oriel — a knight who keeps the line with a shield and a longsword" heads on the Gladiator — print's rows ride along; the seat stays
[reskin] repair round 1: 1 defect(s) — rename for "Hybrid Attack" takes the shelf's own row name "Shield Bash" — that name belongs to a template this sheet may still receive; choose another
[reskin] named parts: Longsword (slot) — the user's words, the engine's numbers
[reskin] named parts landed: 1 attack row(s), 0 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] chassis row off: Actions/"Held-Line Cut" leaves — the GM named a melee weapon (Longsword); one weapon, one rule set
[reskin] class kit: fighter — "knight": Riposte (riposte), Guarded Stance (guarded-stance)
[reskin] proper noun: "Dame Oriel" — the Name field is a person, not a kind (no print match, no article in the words)
[reskin] inline declared: "Dame Oriel" — the call's own answer (person), built from the name
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Dame Oriel — a knight" -> has (descriptive), head | "keeps the line with a shield and a longsword" -> has (mechanical) [asked: attack]
[reskin] signature idea (action): "When a foe tries to duck around Dame Oriel to reach the softer bodies behind her, she steps into the gap, catches the enemy on her shield, and shoves them back hard into the open — the one thing her post forbids is letting someone past. The shove stops them short and makes them think twice about trying the flank again before they've dealt with her." [reaction/on_being_hit/movement] — menu: EMPTY (+ shelf: seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, stunning-strike, charge-push, hook-rider)
[reskin] signature bound to the concept's verb: action — rally (shield)
[reskin] fit declined: "Shieldwall Shove" — a print body takes only what the user's words ask; the call offered no quote, and the key table finds no verb either (the blacksmith's rally, critic-ten 2026-10-01)
[reskin] fallback stands down: the class_npc path has no shelf — the Gladiator's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "Anyone who presses in close and misses her finds the shield edge waiting: the force of their own botched swing carries them onto the rim, leaving them bleeding and off balance for their trouble. Her guard punishes overreach without her having to swing." [trait/on_being_hit/damage] — menu: absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura)
[reskin] signature miss: trait — "Anyone who presses in close and misses her finds the shield edge waiting: the force of their own botched swing carries them onto the rim, leaving them bleeding and off balance for their trouble. Her guard punishes overreach without her having to swing." [trait/on_being_hit/damage] — no template on the shelf shares a verb with the concept or the idea (offered: absorption, bloodied-burst, resonant-body, weapon-lodge, false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura)
[reskin] weapons answered: Longsword = longsword; Shield Bash = shield
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] print canon alignment: Lawful Neutral -> Neutral — the Gladiator's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon multiattack: "Dame Oriel makes three Spear attacks. It can replace one attack with a use of Shield Bash." — the Gladiator's own
[reskin] print canon skills: "Athletics +7, Perception +4" -> "Athletics +10, Performance +5" — the Gladiator's own skills, each derived from this sheet's stat and PB
[reskin] print canon row: Actions/Shield Bash — the Gladiator's own
[reskin] multiattack re-read — "Longsword" joins the combination; "Dame Oriel makes three attacks, using Spear or Longsword in any combination. It can replac"
[reskin] multiattack re-read: "Spear" is not on this sheet, so the combination now reads "Dame Oriel makes three Longsword attacks. It can replace one attack with a use o"
```


---

## Rockscar Radrik — in the run

**Concept:** a goliath berserker who loses control when wounded

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Rockscar Radrik | 8 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 6 / off 8 → 7; sustained 52 (2 × Greataxe); nova none; dmg 52

```
Rockscar Radrik

Medium Humanoid, Neutral

AC 15
Initiative +2 (12)

HP 150 (20d8 + 60)

Speed 30 ft.

MOD
SAVE
STR
20
+5
+8
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
16
+3
+6
CHA
15
+2
+2

Skills Athletics +8, Perception +4

Senses Passive Perception 14

Languages Common, Giant

CR 8 (XP 3,900; PB +3)

Traits

Berserk. Whenever Radrik starts its turn Bloodied, roll 1d6. On a 6, Radrik goes berserk. On each of its turns while berserk, Radrik attacks the nearest creature it can see. If no creature is near enough to move to and attack, Radrik attacks an object. Once Radrik goes berserk, it remains so until it is destroyed or it is no longer Bloodied.

Bloodied Frenzy. While Bloodied, Radrik has Advantage on attack rolls and saving throws.

Mountain Stride. Difficult Terrain composed of ice or snow doesn't cost Radrik extra movement, and Radrik can move across ice or snow without needing to make an ability check.

Actions

Multiattack. Radrik makes two Greataxe attacks. It can replace one attack with a use of Shield Bash.

Greataxe. Melee Attack Roll: +8, reach 5 ft. 26 (6d6 + 5) Slashing damage.

Shield Bash. Strength Saving Throw: DC 16, one creature within 5 feet that Radrik can see. Failure: 27 (6d8) Bludgeoning damage. If the target is a Medium or smaller creature, it has the Prone condition. Success: Half damage only.

Bonus Actions

Rampage (1/Day). Immediately after dealing damage to a creature that is already Bloodied, Radrik moves up to half its Speed without provoking Opportunity Attacks, and it makes one Greataxe attack.

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
- Actions/Greataxe — print's own row, renamed; weapon greataxe
- Actions/Shield Bash — print's own row
- Traits/Berserk — template berserk; barbarian kit; the GM's clause "loses control when wounded"
- Traits/Bloodied Frenzy — barbarian kit; the GM's clause "berserker"
- Traits/Mountain Stride — goliath kit; the GM's clause "berserker"
- Bonus Actions/Rampage — template rampage; barbarian kit; the GM's clause "berserker"

**Engine trace**

```
[path] class_npc — class barbarian — species goliath — "berserker" (call)
[route] brute type=Giant mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | brute: ✓ ("a goliath berserker who loses control wh") | brute: no line key in the words — the model's read of its quote
[concept] name: provided_name rejected — "a goliath berserker who loses control wh…" is the description, not a name
[concept] resolve: archetype=brute type=Giant themes=bestial/elemental mind=sapient style=— energy=Thunder mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: losing control when wounded [behavior] | stone-fleshed hide that cracks and hardens under pain [body] | great stone-headed maul [object]
[concept] identity: A scarred goliath berserker wades into the front rank with a great stone-headed maul, trading blows as a mountain trades weather. The moment a wound opens on its hide, the pain flips a switch: it stops guarding, bellows, and hammers the nearest target without pause until the fit burns out or it falls. It never flees — bloodied, it simply gets worse, and it fights to the death because it no longer understands retreat.
[concept] lore: Born of a stone-fleshed highland clan, this goliath was shunned for the rage that turns its own hide to cracking granite, and now it wanders the passes picking fights it cannot lose gracefully.
[reskin] [path] class body: the barbarian stands on the Gladiator — the class's own print block, nearest CR 8
[reskin] the concept outranks the alias: the Gladiator is a Humanoid and the concept reads Giant — the words RESEMBLE it, they do not name it, so the print body stands down
[reskin] print canon array: STR 20, DEX 15, CON 16, INT 10, WIS 12, CHA 15 — the Gladiator's, STR fitted to +8
[reskin] donor: brute-5 -> CR 8
[reskin] [path] decides: class_npc on the Gladiator · class barbarian (the matcher would have said homebrew)
[reskin] print canon: "a goliath berserker who loses control when wounded" heads on the Gladiator — print's rows ride along; the seat stays
[reskin] species kit: goliath — "berserker": Mountain Stride (terrain-walk, authored)
[reskin] class kit: barbarian — "berserker": Bloodied Frenzy (Berserker/Bloodied Frenzy), Rampage (1/Day) (rampage), Berserk (berserk)
[reskin] inline declared: "Radrik" — the call's own answer (person), built from the name
[reskin] inline form: "Radrik" — the model's own reading of the name
[reskin] save dc derived: DC 15 -> 16 (8 + PB 3 + the sheet's best 5) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a goliath berserker" -> has (descriptive), head | "loses control when wounded" -> has (mechanical) [asked: when_bloodied/buff_self]
[reskin] signature idea (action): "When Radrik's maul lands a heavy blow, the Thunder in the stone head cracks outward through the target's body, and the shattering carries to anyone standing close enough to be splashed by the stone shards and sound. Those caught in it are deafened and rattled by the ringing, their ears and nerves full of broken rock. Radrik cannot aim it — the burst simply follows wherever his maul strikes, so all" [rider/on_hit/condition] — menu: stunning-strike, charge-push, hook-rider, pounce, charge (+ shelf: trample, leap, thrown-burst, throw-retrieve, shield-bash, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating)
[reskin] word match declined by the call: active-toll — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit"
[reskin] signature miss: action — "When Radrik's maul lands a heavy blow, the Thunder in the stone head cracks outward through the target's body, and the shattering carries to anyone standing close enough to be splashed by the stone shards and sound. Those caught in it are deafened and rattled by the ringing, their ears and nerves full of broken rock. Radrik cannot aim it — the burst simply follows wherever his maul strikes, so all" [rider/on_hit/condition] — the model found no template that holds it (offered: stunning-strike, charge-push, hook-rider, pounce, charge, active-toll, thrown-burst, thrown-burst-seed, trample, ground-burst, focus)
[reskin] fallback stands down: the class_npc path has no shelf — the Gladiator's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "Striking Radrik's cracked granite hide breaks the wound wider: whenever a blow lands on him, the crack spreads and the Thunder stored in his stone flesh leaks out with a low grinding boom. This costs him nothing but noise and fury — the leaking force lashes out at whoever hit him, so every attacker is reminded that hurting him only cracks the mountain open." [trait/on_being_hit/damage] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] signature bound to the concept's verb: trait — bloodied-burst, bloodied-fury (wounded)
[reskin] word match declined by the call: bloodied-burst, bloodied-fury, false-appearance, aberrant-ground, heated-body, absorption, weapon-lodge — the key word does not mean the mechanic here
[reskin] signature miss: trait — "Striking Radrik's cracked granite hide breaks the wound wider: whenever a blow lands on him, the crack spreads and the Thunder stored in his stone flesh leaks out with a low grinding boom. This costs him nothing but noise and fury — the leaking force lashes out at whoever hit him, so every attacker is reminded that hurting him only cracks the mountain open." [trait/on_being_hit/damage] — the model picked "resonant-body" (no verb, and it quotes nothing the GM typed) over a concept-verb template (bloodied-burst, bloodied-fury)
[reskin] weapons answered: Maul = maul; Boulder = none; Granite Rage = none
[reskin] speed by body: a Humanoid walks 30 ft. (print's people; a hermit ran 50 — critic's audit 2026-10-02)
[reskin] speed by concept:  — the concept's movement set decides
[reskin] languages by mind: "Giant" -> "Common, Giant" (sapient)
[reskin] print canon alignment: Chaotic Neutral -> Neutral — the Gladiator's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon type: Humanoid stays — the words say giant ("a dire wolf but undead", 2026-10-01)
[reskin] print canon languages: "Common, Giant" -> "Common, Giant" — the Gladiator's plus the concept's Giant
[reskin] print canon attack: "Spear" keeps print's hybrid frame — reach 5 ft. or range 20/60 ft. (the Gladiator's weapon is thrown)
[reskin] rider folded: "Maul" keeps its budget — the chassis's rider half (11) folds into the base; the Gladiator pays no damage rider of its own
[reskin] print canon attack: "Maul" -> "Spear" — the Gladiator's own row
[reskin] ranged row off: "Boulder" leaves — the Gladiator carries no ranged row and the words name none
[reskin] multiattack re-read — "Boulder" left; "Multiattack" now reads "Radrik makes two Spear attacks."
[reskin] print canon row priced: Shield Bash — dice 9 → 27
[reskin] print canon row: Actions/Shield Bash — the Gladiator's own
[reskin] multiattack re-read — "Spear" left; "Multiattack" now reads "Radrik makes two attacks."
[reskin] dead wildcard name swept — "Spear" cited in "Rampage (1/Day)" now reads "Greataxe" — the keeper owns the throw
[reskin] class weapon: Actions/"Spear" -> "Greataxe" — a barbarian fights with a greataxe, not the Gladiator's
[reskin] multiattack replacement clause: It can replace one attack with a use of Shield Bash.
[reskin] multiattack normalised: "Radrik makes two Greataxe attacks. It can replace one attack with a use of Shield Bash."
[reskin] darkvision withheld: a Humanoid with no species kit granting it, no word for it in the GM's own text, and no print body that has it — print gives darkvision to 1 of 26 Humanoids ("darkvision 60 ft.; Passive Perception 14" -> "Passive Perception 14")
[reskin] ask vs row MISMATCH: "loses control when wounded" -> "Berserk" — trigger: asked when_bloodied, row reads at_will
audit span not verbatim, dropped: Berserk Die 6, Radrik goes berserk. On each of its turns while berserk, Radrik attacks the nearest creature it can see.
[reskin] species kit: Large -> Medium — a goliath is Medium (the words name no other size)
```


---

## Ser Aldous Wrack — in the run

**Concept:** a templar priest with a mace and no magic at all

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Ser Aldous Wrack | 4 | defender-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 3 / off 4 → 3.5; sustained 30 (2 × Longsword); nova none; dmg 30

```
Ser Aldous Wrack

Medium Humanoid, Neutral

AC 18
Initiative +2 (12)

HP 75 (10d8 + 30)

Speed 30 ft.

MOD
SAVE
STR
18
+4
+4
INT
12
+1
+1
MOD
SAVE
DEX
14
+2
+2
WIS
14
+2
+4
MOD
SAVE
CON
16
+3
+5
CHA
14
+2
+2

Skills Athletics +6, Perception +4

Senses Passive Perception 14

Languages Common

CR 4 (XP 1,100; PB +2)

Traits

Aura of Authority. While in a 10-foot Emanation originating from Aldous, Aldous and its allies have Advantage on attack rolls and saving throws, provided Aldous doesn't have the Incapacitated condition.

Actions

Multiattack. The guard makes two attacks, using Longsword or Mace in any combination.

Mace. Melee Attack Roll: +6, reach 5 ft. 13 (2d8 + 4) Bludgeoning damage, and the target has Disadvantage on its next attack roll before the start of Aldous's next turn.

Longsword. Melee Attack Roll: +6, reach 5 ft. 15 (2d10 + 4) Slashing damage, and the target has Disadvantage on its next attack roll before the start of Aldous's next turn.

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

- Traits/Aura of Authority — paladin kit; the GM's clause "templar"
- Actions/Multiattack — the chassis
- Actions/Mace — authored for this sheet; a named part; a declared feature; the GM's clause "a templar priest with a mace"; weapon mace
- Actions/Longsword — print's own row; authored for this sheet; a named part; a declared feature; the GM's clause "a templar priest with a mace"; weapon longsword

**Engine trace**

```
[path] class_npc — class paladin — "templar" (call)
[route] defender type=Humanoid mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | defender: ✓ ("a templar priest with a mace") | defender: no line key in the words — the model's read of its quote
[concept] resolve: archetype=defender type=Humanoid themes=armed/forged mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: shield-wall defense [behavior] | iron-bound mace [object] | sworn defender who will not flee [behavior]
[concept] identity: A shield-bearing templar who has renounced every prayer and spell, closing to melee behind a battered shield and opening with a shove-and-mace combination that pins a foe against his own guard. Each round he holds the line, punishing anyone who turns their back or slips past with a mace blow to the spine and a shoulder to the ribs, and he only breaks formation when the shield arm hangs limp. Under pressure he fights to the last, standing over the wounded and trading space for time rather than fleeing.
[concept] lore: A disgraced templar stripped of his orders and his god's favor, he carries only dented iron and a mace, guarding the last threshold he was sworn to protect until someone finally puts him down.
[reskin] [path] class body: the paladin stands on the Guard Captain — the class's own print block, nearest CR 4
[reskin] print canon defenses: HP 65 -> 75, AC 19 -> 18 — the Guard Captain's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon armor: 18 (breastplate, shield) — print's Gear line; the 2014 sheet prints it (the Goblin Boss wore "splint", canaries 2026-10-12)
[reskin] print canon array: STR 18, DEX 14, CON 16, INT 12, WIS 14, CHA 13 — the Guard Captain's at its own CR; attack +6 -> +6, DC 14 (print's)
[reskin] donor: defender-3 -> CR 4
[reskin] row gated out: Guard Aura (aura) — the concept did not claim this mechanic
[reskin] class array: CHA 13 -> 14 — a paladin casts off it
[reskin] [path] decides: class_npc on the Guard Captain · class paladin (the matcher would have said twist Priest)
[reskin] print canon: "a templar priest with a mace and no magic at all" heads on the Guard Captain — print's rows ride along; the seat stays
[reskin] named parts: Mace (slot) — the user's words, the engine's numbers
[reskin] named parts landed: 1 attack row(s), 0 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] class kit: paladin — "templar": Aura of Authority (Hobgoblin Captain/Aura of Authority)
[reskin] inline declared: "Aldous" — the call's own answer (person), built from the name
[reskin] inline form: "Aldous" — the model's own reading of the name
[reskin] lacks asked: "no magic at all"
[reskin] asked field dropped: the call answered limit "at_will" for "a templar priest with a mace" but offered no quote
[reskin] clauses: "a templar priest with a mace" -> has (mechanical) [asked: attack] | "no magic at all" -> LACKS (mechanical)
[reskin] signature idea (action): "Aldous plants his shield and shoves a foe caught in reach, driving them stumbling back and leaving them open for a follow-up. If the shoved foe refuses to yield ground, he slams his mace into their guard as part of the same effort, using their resistance to keep them pinned at the edge of his reach." [rider/on_hit/movement] — menu: charge-push, hook-rider (+ shelf: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, snap-shot, riposte)
[reskin] decline reason: action — the call answered none and names it "no_fit"
[reskin] signature miss: action — "Aldous plants his shield and shoves a foe caught in reach, driving them stumbling back and leaving them open for a follow-up. If the shoved foe refuses to yield ground, he slams his mace into their guard as part of the same effort, using their resistance to keep them pinned at the edge of his reach." [rider/on_hit/movement] — the model found no template that holds it (offered: charge-push, hook-rider, push-prone, rally, riposte)
[reskin] fallback stands down: the class_npc path has no shelf — the Guard Captain's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 18 already beats print's AC 14 at CR 4, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "The battered iron of Aldous's mace rings and catches blows meant for him, and when he strikes a foe who just missed him, the mace carries the weight of that failed attack into the wound. So long as he still holds his shield, foes who turn away from him feel the iron bite harder." [trait/on_being_hit/damage] — menu: absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura)
[reskin] word match declined by the call: resonant-body — the key word does not mean the mechanic here
[reskin] trait declined: "Iron Lodgement" — a shape fit with no verb match on a Humanoid body; a meat body earns its trait by a verb
[reskin] weapons answered: Mace = mace; Sling = sling
[reskin] weapon table: "Sling" rolls Dexterity — +6 → +4
[reskin] weapon table: "Sling" damage off Dexterity — 13 (2d8 + 4) → 11 (2d8 + 2)
[reskin] weapon table: "Sling" — a launcher, never thrown, range 30/120
[reskin] print canon alignment: Lawful Neutral -> Neutral — the Guard Captain's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon row: Actions/Longsword — the Guard Captain's second melee row, beside the chassis's
[reskin] print canon multiattack: "The guard makes two attacks, using Javelin or Longsword in any combination." — the Guard Captain's own
[reskin] ranged row off: "Sling" leaves — the Guard Captain carries no ranged row and the words name none
[reskin] multiattack normalised: "The guard makes two attacks, using Longsword or Mace in any combination."
```


---

## Halfstep Counselor — in the run

**Concept:** a court wizard who is never where you struck and steps away

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Halfstep Counselor | 6 | caster-6 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 3 / off 7 → 5; sustained 48 (3 × Arcane Burst); nova none; dmg 48

```
Halfstep Counselor

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

Skills Arcana +6, History +6, Perception +4

Senses Passive Perception 14

Languages Common and any three languages

CR 6 (XP 2,300; PB +3)

Actions

Multiattack. The counselor makes three Arcane Burst attacks.

Arcane Burst. Melee or Ranged Attack Roll: +6, reach 5 ft. or range 120 ft. 16 (3d8 + 3) Force damage.

Spellcasting. The counselor casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 14):

- At Will: Detect Magic, Light, Mage Armor, Mage Hand, Prestidigitation
- 2/Day Each: Fireball, Invisibility
- 1/Day Each: Cone of Cold, Fly

Bonus Actions

Misty Step (3/Day). The counselor casts Misty Step, using the same spellcasting ability as Spellcasting.

Reactions

Protective Magic (3/Day). Trigger: The counselor is hit by an attack roll. Response: The counselor casts Shield in response, gaining a +5 bonus to AC until the start of its next turn, including against the triggering attack.

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
- Actions/Arcane Burst — print's own row, renamed
- Actions/Spellcasting — print's own row
- Reactions/Protective Magic — mage kit; the GM's clause "court wizard"
- Bonus Actions/Misty Step — mage kit; the GM's clause "is never where you struck and steps away"

**Engine trace**

```
[path] class_npc — class mage — "court wizard" (call)
[route] skirmisher-skulker type=Humanoid mechanics=teleport — casts: implied by the kind — "court wizard" | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | skirmisher-skulker: ✓ ("never where you struck and steps away") | skirmisher-skulker: no line key in the words — the model's read of its quote
[concept] resolve: archetype=skirmisher type=Humanoid themes=arcane/uncanny mind=sapient style=skulker energy=Force mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: teleport
[concept] signature elements: never where the strike lands, half a step off the axis [behavior] | court wizard's robes and iron-hard wit [object] | toying, dueling, baiting a strike it has already left [behavior]
[concept] identity: The court wizard never stands where the blow lands: it greets a fight by reading the room, then slips half a step into Elsewhere so the first strike passes through the space it just vacated. Each round after that it returns fire from an angle no one is covering, trading a cantrip of iron-hard wit for a thrown blade or a whispered word, so the only way to hurt it is to make the stepping cost it something. Under pressure it does not flee; it withdraws, repositions, and toys with the attacker, clearly enjoying a good duel too much to end it fast.
[concept] lore: A court wizard who bargained one too many times for 'a moment's safety' now lives in the half-step between positions, serving any throne that will suffer its counsel because no assassin has ever quite been where it stood.
[reskin] energy withheld: Force on a Humanoid with no Force in the concept's own words (fixed phrases read first)
[reskin] [path] class body: the mage stands on the Mage — the class's own print block, nearest CR 6
[reskin] print canon route: the Mage's body outranks the skulker seat — no verb in the words names it; the plain skirmisher line
[reskin] print canon route: the Mage casts and strikes only with magic (Force) — the caster family takes the line from skirmisher, so the attack bonus and the spell DC key to one stat
[reskin] print canon defenses: HP 89 -> 81, AC 15 -> 15 — the Mage's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 9, DEX 14, CON 11, INT 17, WIS 12, CHA 11 — the Mage's at its own CR; attack +7 -> +6, DC 14 (print's)
[reskin] donor: caster-6 -> CR 6
[reskin] [path] decides: class_npc on the Mage · class mage (the matcher would have said twist Mage)
[reskin] print canon: "a court wizard who is never where you struck and steps away" heads on the Mage — print's rows ride along; the seat stays
[reskin] class kit: Protective Magic — the sheet already carries it, so the mage kit adopts that row: the cap may no longer read it as filler
[reskin] class kit: mage — "court wizard": Misty Step (3/Day) (Mage/Misty Step)
[reskin] inline declared: "the counselor" — the call's own answer (kind), built from the name
[reskin] inline form: "the counselor" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] lacks not claimed: "is never where you struck and steps away" reads like a lack to the words, and the call's list did not name it
[reskin] clauses: "a court wizard" -> has (descriptive), head | "is never where you struck and steps away" -> has (descriptive)
[reskin] menu pruned: action — snap-shot (the sheet cannot render them)
[reskin] signature idea (action): "The counselor throws a blade at a foe, then offers a courtly feint: a barbed word about the enemy's stance that makes them lunge or flinch wide before the blade finishes its arc. If the barbed word lands home first, the thrown blade comes from the exact angle the foe just turned away from, and anyone who ignores the taunt to keep pressing the counselor finds the next blade already waiting for them" [rider/on_hit/condition] — menu: bolt-restrain, bolt-drag, bolt-mark (+ shelf: thrown-burst, gaze-single, snare, zone, execute, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, snare-bolt, slow-bolt, sensory-strike, herd, thrown-burst-seed, drain, delayed-brand, curse-debt, zone-seed, reveal, wind-up, blighted-ground, lay-on-hands, aggro-curse, self-invisibility, rally, phase-slip)
[reskin] signature bound to the concept's verb: action — phase-slip (step)
[reskin] word match declined by the call: phase-slip, aggro-curse, thrown-burst, execute, thrown-burst-seed, bolt-restrain, bolt-drag, bolt-mark — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit" after being shown phase-slip, which the GM's words keyed
[reskin] key match declined: action — "phase-slip" was ranked first on the call's own menu for step, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: action — "The counselor throws a blade at a foe, then offers a courtly feint: a barbed word about the enemy's stance that makes them lunge or flinch wide before the blade finishes its arc. If the barbed word lands home first, the thrown blade comes from the exact angle the foe just turned away from, and anyone who ignores the taunt to keep pressing the counselor finds the next blade already waiting for them" [rider/on_hit/condition] — the model found no template that holds it (offered: phase-slip, bolt-restrain, bolt-drag, bolt-mark, aggro-curse, thrown-burst, execute, thrown-burst-seed)
[reskin] fallback respects the call: phase-slip, aggro-curse, execute left the shelf — the call declined them for this sheet
[reskin] fallback stands down: the class_npc path has no shelf — the Mage's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "Its robes are tailored for the half-step: whenever something nearly touches it, the counselor shifts so the blow spends itself on the space it abandoned, and the attacker is left overextended and out of position for a heartbeat. Strikes that miss it leave the foe open and turned wrong for the counselor's next move." [trait/on_being_hit/movement] — menu: absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst, evasion)
[reskin] signature bound to the concept's verb: trait — evasion (never where)
[reskin] word match declined by the call: evasion — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit" after being shown evasion, which the GM's words keyed
[reskin] key match declined: trait — "evasion" was ranked first on the call's own menu for never where, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: trait — "Its robes are tailored for the half-step: whenever something nearly touches it, the counselor shifts so the blow spends itself on the space it abandoned, and the attacker is left overextended and out of position for a heartbeat. Strikes that miss it leave the foe open and turned wrong for the counselor's next move." [trait/on_being_hit/movement] — the model found no template that holds it (offered: evasion, absorption, bloodied-burst, resonant-body)
[reskin] concept-first trait skipped: evasion — the call read its match as a collision (the word is a modifier, or the sheet already answers it)
[reskin] weapons answered: Thrown Blade = dagger
[reskin] weapon declared: "Thrown Blade" is a dagger — the call's own answer (the name alone read longsword)
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] print canon languages: "Common" -> "Common and any three languages" — the Mage's
[reskin] print canon attack: "Thrown Blade" -> "Arcane Burst" — the Mage's own row
[reskin] print canon skills: "Arcana +6, Perception +4" -> "Arcana +6, History +6, Perception +4" — the Mage's own skills, each derived from this sheet's stat and PB
[reskin] print canon row: Actions/Spellcasting — print's own list replaces the chassis's
audit finding below confidence gate: Spellcasting The statblock provides no statblock-language definition of the referenced spells' effects, area, or duration; a GM must look up external spell text to adjudicate Cone of Cold and Fly.
audit finding below confidence gate: Spellcasting The entry gives no timing/range/area for in-block adjudication; without external spell text, Fireball's area and Invisibility's ending conditions are undefined in the block.
```


---

## Thurivald — in the run

**Concept:** name: Thurivald | a skald who sings his warband into a fury

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Thurivald | 6 (2014) | defender-5 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok | ok |

- donor · soft · print-rows: rows outside print, the named seat and the keyed seeds: Traits/Guard Aura
- read: def 3 / off 7 → 5; sustained 45 (3 × Hand Crossbow); nova none; dmg 45

```
Thurivald
Medium humanoid, neutral
Armor Class

17 (splint)

Hit Points: 

84 (13d8 + 26)

Speed: 

30 ft.

STR	DEX	CON	INT	WIS	CHA


10 (+0)

	

18 (+4)

	

14 (+2)

	

10 (+0)

	

14 (+2)

	

17 (+3)

Skills: 

Acrobatics +7, Perception +5

Saving Throws: 

STR +3, CON +5

Senses: 

passive Perception 15

Languages: 

Common plus one other language

Challenge

6 (2,300 XP)

Proficiency Bonus:

+3

Guard Aura. While in a 10-foot-radius sphere centered on Thurivald, Thurivald's allies have advantage on saving throws, provided Thurivald isn't incapacitated.
Captain's Charm. As a bonus action, Thurivald targets one creature it can see within 30 feet of it. The target must succeed on a DC 14 Wisdom saving throw or be charmed by Thurivald until the start of Thurivald's next turn.
Bolstering Cry (2/Day). As a bonus action, Thurivald grants each ally within 30 feet of it 10 (3d6) temporary hit points.

Actions
Multiattack: The thurivald makes three attacks, using Rapier or Hand Crossbow.
Rapier: Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 13 (2d8 + 4) piercing damage, and the thurivald has advantage on the next attack roll it makes before the end of this turn.
Hand Crossbow: Ranged Weapon Attack: +7 to hit, range 30/120 ft., one target. Hit: 15 (2d10 + 4) piercing damage.
```

**Where each row came from**

- Traits/Guard Aura — the chassis
- Actions/Multiattack — the chassis
- Actions/Rapier — print's own row, renamed; weapon rapier
- Actions/Hand Crossbow — print's own row; weapon hand crossbow
- Bonus Actions/Captain's Charm — bard kit; the GM's clause "skald"
- Bonus Actions/Bolstering Cry — template rally; bard kit; the GM's clause "skald"

**Engine trace**

```
[path] class_npc — class bard — "skald" (call)
[route] defender-leader type=Humanoid mechanics=aura — casts: on the GM's own words "sings his warband into a fury" | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | defender-leader: ✓ ("sings his warband into a fury") | defender-leader: no line key in the words — the model's read of its quote
[concept] name: "Thurivald" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] resolve: archetype=defender type=Humanoid themes=voice/armed mind=sapient style=leader energy=Thunder mix=both identity=✓ lore=✓
[concept] name: provided "Thurivald"
[concept] mechanics: aura
[concept] signature elements: a war-song that rallies and enrages the warband [behavior] | the iron-rimmed drum and skald's voice [object] | the commander at the center of his singers [aura]
[concept] identity: Thurivald opens by planting himself at the center of his warband and throwing his voice into a skald's war-song, and every round after that he paces the line, keeping allies within his song and striking down anyone who pushes past it. He fights to the last verse — retreating only to reform the choir around new ground — because he is the rhythm the warband marches to.
[concept] lore: Thurivald was a hired skald who learned that his verses could bind men past reason, and now he sells that fury to whatever warband buys his mead.
[reskin] energy withheld: Thunder on a Humanoid with no Thunder in the concept's own words (fixed phrases read first)
[reskin] [path] class body: the bard stands on the Pirate Captain — the class's own print block, nearest CR 6
[reskin] print canon route: the Pirate Captain's body outranks the leader seat — no verb in the words names it; the plain defender line
[reskin] print canon defenses: HP 114 -> 84, AC 18 -> 17 — the Pirate Captain's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 10, DEX 18, CON 14, INT 10, WIS 14, CHA 17 — the Pirate Captain's at its own CR; attack +6 -> +7, DC 14 (print's)
[reskin] donor: defender-5 -> CR 6
[reskin] [path] decides: class_npc on the Pirate Captain · class bard (the matcher would have said homebrew)
[reskin] print canon: "Thurivald — a skald who sings his warband into a fury" heads on the Pirate Captain — print's rows ride along; the seat stays
[reskin] repair round 1: 1 defect(s) — "Warpipe" deals Thunder on a Humanoid whose concept names no Thunder — a name is not a warrant; use a physical type
[reskin] class kit: bard — "skald": Captain's Charm (Pirate Captain/Captain's Charm), Bolstering Cry (2/Day) (rally)
[reskin] proper noun: "Thurivald" — the Name field is a person, not a kind (no print match, no article in the words)
[reskin] inline declared: "Thurivald" — the call's own answer (person), built from the name
[reskin] inline form: "Thurivald" — the model's own reading of the name
[reskin] energy rider withheld: Thunder on a Humanoid with no Thunder in the concept's own words
[reskin] energy withheld on a base row: "Warpipe" Thunder -> Piercing (the body's physical type; a Humanoid deals no Thunder its concept never gave it)
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Thurivald — a skald" -> has (descriptive), head | "sings his warband into a fury" -> has (descriptive)
[reskin] menu pruned: action — snap-shot (the sheet cannot render them)
[reskin] signature idea (action): "Thurivald looses a rising war-song that only his enemies can truly hear the sting of: every foe near him feels the verse turn their own blood hot until they lose their footing and stumble into the warband's line. Allies under the song are untouched, but those who came to fight him find their nerves frayed and their guard broken for as long as the verse carries." [action/save/condition] — menu: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, exploiter (+ shelf: patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, riposte, stunning-strike, charge-push, hook-rider)
[reskin] word match declined by the call: own-turn-punisher, stunning-strike — the key word does not mean the mechanic here
[reskin] fit declined: "Staggering Verse" — a print body takes only what the user's words ask; the call offered no quote, and the key table finds no verb either (the blacksmith's rally, critic-ten 2026-10-01)
[reskin] fallback respects the call: own-turn-punisher left the shelf — the call declined it for this sheet
[reskin] fallback stands down: the class_npc path has no shelf — the Pirate Captain's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 17 already beats print's AC 15 at CR 6, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "The iron-rimmed drum at Thurivald's belt answers any blow struck against him with a resonant thunder that stirs nearby allies into a fresh surge of fury, so that harming him only sharpens the warband around him." [trait/on_being_hit/condition] — menu: absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura)
[reskin] signature bound to the concept's verb: trait — bloodied-fury (fury)
[reskin] word match declined by the call: bloodied-fury — the key word does not mean the mechanic here
[reskin] trait declined: "Drumbeat Rebuke" — bound only on the idea's own words (iron:idea) with no key in the concept; a meat body earns its trait by the user's verb (the sniper's tracker, critic 2026-09-29)
[reskin] weapons answered: Handaxe = handaxe; Warpipe = none
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] print canon languages: "Common" -> "Common plus one other language" — the Pirate Captain's
[reskin] print canon row: Actions/Pistol — the Pirate Captain's own ranged row, added (the chassis carried none to rename)
[reskin] print canon attack: "Handaxe" -> "Rapier" — the Pirate Captain's own row
[reskin] print canon multiattack: "The pirate makes three attacks, using Rapier or Pistol in any combination." — the Pirate Captain's own
[reskin] print canon skills: "Athletics +3, Perception +5" -> "Acrobatics +7, Perception +5" — the Pirate Captain's own skills, each derived from this sheet's stat and PB
[reskin] print canon: chassis row leaves — Actions/"Warpipe" — the Pirate Captain prints no row for it and no path stage claimed it
[reskin] multiattack re-read — "Pistol" left; "Multiattack" now reads "The pirate makes three Rapier attacks."
[reskin] class weapon: Actions/"Pistol" -> "Hand Crossbow" — a bard fights with a hand crossbow, not the Pirate Captain's
[reskin] audit rename blocked — "Captain's Charm" is the user's own part name, a kit feature's real name, or print's own row
[reskin] multiattack re-read — "Hand Crossbow" joins the combination; "The pirate makes three attacks, using Rapier or Hand Crossbow in any combination."
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---

## Kageyama — in the run

**Concept:** a ninja who moves through the shadows and strikes unseen

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Kageyama | 5 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 5 / off 5 → 5; sustained 34 (2 × Shortsword); nova none; dmg 34

```
Kageyama

Medium Humanoid, Neutral

AC 16
Initiative +3 (13)

HP 91 (14d8 + 28)

Speed 30 ft.

MOD
SAVE
STR
15
+2
+2
INT
14
+2
+2
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
14
+2
+2

Skills Perception +3, Stealth +9

Senses Passive Perception 13

Languages Common, Thieves' cant

CR 5 (XP 1,800; PB +3)

Traits

Assassinate. During the first round of each combat, Kageyama has Advantage on attack rolls against any creature that hasn't taken a turn. If Kageyama hits a creature during that round, the target takes an extra 9 (2d8) Piercing damage.

Evasion. If Kageyama is subjected to an effect that allows it to make a Dexterity saving throw to take only half damage, Kageyama instead takes no damage if it succeeds on the save and only half damage if it fails. It can't use this trait if it has the Incapacitated condition.

Actions

Multiattack. Kageyama makes two attacks, using Shortsword or Shortbow in any combination.

Shortsword. Melee Attack Roll: +6, reach 5 ft. 17 (4d6 + 3) Piercing damage.

Shortbow. Ranged Attack Roll: +6, range 80/320 ft. 16 (3d8 + 3) Piercing damage.

Bonus Actions

Cunning Action. Kageyama takes the Dash, Disengage, or Hide action.

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

- Traits/Assassinate — template assassinate; rogue kit; the GM's clause "strikes unseen"
- Traits/Evasion — template evasion; rogue kit; the GM's clause "ninja"
- Actions/Multiattack — the chassis
- Actions/Shortsword — print's own row, renamed; weapon shortsword
- Actions/Shortbow — print's own row, renamed; weapon shortbow
- Bonus Actions/Cunning Action — rogue kit; the GM's clause "ninja"

**Engine trace**

```
[path] class_npc — class rogue — "ninja" (call)
[route] skirmisher-skulker type=Humanoid mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | skirmisher-skulker: ✓ ("strikes unseen") | skirmisher-skulker: key "unseen" (class verb)
[concept] resolve: archetype=skirmisher type=Humanoid themes=uncanny/armed mind=sapient style=skulker energy=Psychic mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: strikes from darkness and vanishes again before a counterblow lands [behavior] | body made of living shadow that swallows light [body] | shuriken and blade thrown from cover [object]
[concept] identity: A shadow-bound shinobi who opens combat by melting into darkness and reappearing behind a target for a single lethal strike, then flips back into cover before blows can land. Every round it bleeds the fight into shadowed ground, harrying with thrown steel and bleeding cuts while refusing to trade blows head-on, and it stays cool and methodical under pressure — slipping away when wounded to re-ambush rather than dying in the open.
[concept] lore: Sworn to a forgotten shadow-caste, this ninja haunts the ruined temple grounds it once guarded, testing every intruder as a worthy target and sparing none who see it clearly.
[reskin] energy withheld: Psychic on a Humanoid with no Psychic in the concept's own words (fixed phrases read first)
[reskin] [path] class body: the rogue stands on the Bandit Captain — the class's own print block, nearest CR 5
[reskin] print canon array: STR 15, DEX 16, CON 14, INT 14, WIS 11, CHA 14 — the Bandit Captain's, DEX fitted to +6
[reskin] donor: skirmisher-3-skulker -> CR 5
[reskin] row gated out: Ranged Save Effect (gaze) — the concept did not claim this mechanic
[reskin] row gated out: Teleport (teleport) — the concept did not claim this mechanic
[reskin] [path] decides: class_npc on the Bandit Captain · class rogue (the matcher would have said homebrew)
[reskin] print canon: "a ninja who moves through the shadows and strikes unseen" heads on the Bandit Captain — print's rows ride along; the seat stays
[reskin] class kit: Cunning Action — the sheet already carries it, so the rogue kit adopts that row: the cap may no longer read it as filler
[reskin] class kit: rogue — "ninja": Evasion (evasion), Assassinate (assassinate)
[reskin] inline declared: "Kageyama" — the call's own answer (person), built from the name
[reskin] inline form: "Kageyama" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a ninja" -> has (descriptive), head | "moves through the shadows" -> has (descriptive) | "strikes unseen" -> has (mechanical)
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "After Kageyama hits a creature with a Tanto or Shuriken attack, shadows boil up around the strike and cling to the victim, swallowing the light nearest to them. Until the end of Kageyama's next turn, that creature cannot see Kageyama and treats the ground around itself as darkness that only Kageyama can move through unseen, and on Kageyama's next turn it may slip through that swallowed patch to st" [rider/on_hit/condition] — menu: affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, isolation, bolt-mark (+ shelf: leap, gaze-single, snare, condition-payoff, throw-retrieve, shield-bash, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, exploiter, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte)
[reskin] signature bound to the concept's verb: action — self-invisibility (unseen)
[reskin] decline reason: action — the call answered none and names it "no_fit" after being shown self-invisibility, which the GM's words keyed
[reskin] key match declined: action — "self-invisibility" was ranked first on the call's own menu for unseen, and the call read it as no fit; the words keep their claim and nothing is forced
[reskin] signature miss: action — "After Kageyama hits a creature with a Tanto or Shuriken attack, shadows boil up around the strike and cling to the victim, swallowing the light nearest to them. Until the end of Kageyama's next turn, that creature cannot see Kageyama and treats the ground around itself as darkness that only Kageyama can move through unseen, and on Kageyama's next turn it may slip through that swallowed patch to st" [rider/on_hit/condition] — the model found no template that holds it (offered: self-invisibility, affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, isolation, bolt-mark, ground-burst, sensory-strike, feint-slip)
[reskin] fallback respects the call: self-invisibility left the shelf — the call declined it for this sheet
[reskin] fallback stands down: the class_npc path has no shelf — the Bandit Captain's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 16 already beats print's AC 15 at CR 5, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "Kageyama's body is made of living shadow, so light bends and dies in its wake: while Kageyama is in dim light or darkness, it leaves a spreading pool of unnatural darkness behind it wherever it moves, and any creature that steps into or starts its turn inside that pool cannot see Kageyama clearly and has no idea where it will strike from next. The pool fades quickly once Kageyama is gone or steps " [trait/always/condition] — menu: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] word match declined by the call: aberrant-ground, guarded-stance — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "Kageyama's body is made of living shadow, so light bends and dies in its wake: while Kageyama is in dim light or darkness, it leaves a spreading pool of unnatural darkness behind it wherever it moves, and any creature that steps into or starts its turn inside that pool cannot see Kageyama clearly and has no idea where it will strike from next. The pool fades quickly once Kageyama is gone or steps " [trait/always/condition] — the model found no template that holds it (offered: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst)
[reskin] weapons answered: Tanto = dagger; Shuriken = dart
[reskin] weapon declared: "Tanto" is a dagger — the call's own answer
[reskin] weapon declared: "Shuriken" is a dart — the call's own answer
[reskin] weapon table: "Shuriken" — thrown, range 20/60
[reskin] print canon modes: climb off — the Bandit Captain has no such mode and the words name none
[reskin] speed by body: a Humanoid walks 30 ft. (print's people; a hermit ran 50 — critic's audit 2026-10-02)
[reskin] speed by concept: dropped Climb 30 ft. — the concept's movement set decides
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] print canon alignment: Lawful Neutral -> Neutral — the Bandit Captain's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common" -> "Common, Thieves' cant" — the Bandit Captain's
[reskin] print canon attack: "Tanto" -> "Scimitar" — the Bandit Captain's own row
[reskin] print canon attack: "Shuriken" -> "Pistol" — the Bandit Captain's own ranged row
[reskin] on-hit extra retyped: "Assassinate" adds Slashing, not Bludgeoning — the hit's own type (Scimitar)
[reskin] print canon: chassis row leaves — Traits/"Shadowstep" is the seat's, not the Bandit Captain's
[reskin] on-hit extra retyped: "Assassinate" adds Piercing, not Slashing — the class weapon's own type (Shortsword)
[reskin] multiattack re-read — "Scimitar" left; "Multiattack" now reads "Kageyama makes two Pistol attacks."
[reskin] class weapon: Actions/"Scimitar" -> "Shortsword" — a rogue fights with a shortsword, not the Bandit Captain's
[reskin] multiattack re-read — "Pistol" left; "Multiattack" now reads "Kageyama makes two attacks."
[reskin] class weapon: Actions/"Pistol" -> "Shortbow" — a rogue fights with a shortbow, not the Bandit Captain's
[reskin] multiattack normalised: "Kageyama makes two attacks, using Shortsword or Shortbow in any combination."
[reskin] darkvision withheld: a Humanoid with no species kit granting it, no word for it in the GM's own text, and no print body that has it — print gives darkvision to 1 of 26 Humanoids ("darkvision 60 ft.; Passive Perception 13" -> "Passive Perception 13")
```


---

## Under-Maze Herder — in the run

**Concept:** a minotaur reaver who herds prey into the maze

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Under-Maze Herder | 6 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 4 / off 6 → 5; sustained 44 (2 × Greataxe); nova none; dmg 44

```
Under-Maze Herder

Large Monstrosity, Neutral Evil

AC 14
Initiative -1 (9)

HP 119 (14d10 + 42)

Speed 40 ft.

MOD
SAVE
STR
18
+4
+7
INT
6
-2
-2
MOD
SAVE
DEX
8
-1
-1
WIS
10
+0
+0
MOD
SAVE
CON
16
+3
+6
CHA
6
-2
-2

Skills Athletics +7, Perception +3

Senses darkvision 60 ft.; Passive Perception 13

Languages Common

CR 6 (XP 2,300; PB +3)

Actions

Multiattack. The under-maze herder makes two Greataxe attacks.

Greataxe. Melee Attack Roll: +7, reach 10 ft. 22 (4d8 + 4) Slashing damage.

Bonus Actions

Charge. The under-maze herder moves up to half its Speed straight toward an enemy it can see.

Herder's Lunge (1/Day). Immediately after dealing damage to a creature that is already Bloodied, the under-maze herder moves up to half its Speed without provoking Opportunity Attacks, and it makes one Greataxe attack.

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
- Actions/Greataxe — weapon greataxe
- Bonus Actions/Charge — minotaur kit; the GM's clause "a minotaur reaver who herds prey into the maze"
- Bonus Actions/Herder's Lunge — library seed rampage

**Engine trace**

```
[path] refused: print_body "Minotaur" is not in the corpus
[path] homebrew — species minotaur — "a minotaur reaver who herds prey into the maze" (call)
[route] brute type=Monstrosity mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | brute-charger: ✓ ("herds prey into the maze") | brute-charger: no line key in the words — the model's read of its quote | brute-charger -> brute: a charger is a mechanic engine and needs a key in the words — the model's read of its quote cannot land it
[concept] resolve: archetype=brute type=Monstrosity themes=bestial/subterranean mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: herding prey into the maze [behavior] | horn-and-axe trampling bulk [body] | the bone-strewn labyrinth it guards [aura]
[concept] identity: The minotaur reaver does not charge to kill — it lumbers forward on a wide arc, angling its horns and bulk to drive prey away from open ground and toward the throat of the maze, bellowing to spook them deeper. Once a quarry is penned in the corridors it switches to brutal, patient tradework: goring rushes to split the herd, then heavy greataxe sweeps against whatever is cornered, using the walls as a second weapon. It is a cunning herder that never flees and never finishes a fight early, funnelling and bleeding its victims until the maze itself does the killing.
[concept] lore: A bull-headed reaver grown lean and clever in the twisting under-maze, it keeps the labyrinth's passages glutted with the bones of travellers it drove there, because it feeds on whatever the walls finally corner.
[reskin] donor: brute-5 -> CR 6
[reskin] [path] decides: homebrew (the matcher agrees)
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] species kit: minotaur — "a minotaur reaver who herds prey into the maze": Charge (Troll/Charge); darkvision 60 ft.
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline by rule: "the under-maze herder" — the call answered "the maze herder" (kind), which the name does not support
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a minotaur reaver" -> has (descriptive), head | "herds prey into the maze" -> has (mechanical) [asked: movement]
[reskin] signature idea (action): "The herder lowers its horns and drives forward in a wide, sweeping arc, and every creature in that path is shoved bodily aside rather than simply struck — the bull's bulk and the walls do the work, so a foe caught between horn and stone is thrown off its feet and forced backward, and the herder chooses the direction it pushes them, always toward the deeper maze. It never stops to fight in the open" [rider/on_hit/movement] — menu: affliction, contagion, stunning-strike, charge-push, hook-rider, pounce (+ shelf: trample, leap, thrown-burst, shield-bash, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, rampage, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating)
[reskin] signature bound to the concept's verb: action — herd (herd)
[reskin] word match declined by the call: herd, charge-push — the key word does not mean the mechanic here
[reskin] value check: "Goring Sweep" EV 2.9 vs floor 10.9 (one attack of 2) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Goring Sweep" — the ladder could not lift it; the fallback stands in
[reskin] fallback respects the call: herd left the shelf — the call declined it for this sheet
[reskin] value check: "Rampage (1/Day)" EV 17.7 vs floor 3.4 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: rampage -> Bonus Actions/"Rampage (1/Day)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Walls are the herder's second axe: when a foe it can see is pinned against stone or trapped in a dead end, its greataxe and goring rushes land with crushing weight, splintering bone against the corridor itself and leaving the victim fenced in and bleeding where the maze can finish them." [trait/always/damage] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending, weapon-lodge)
[reskin] word match declined by the call: bound — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "Walls are the herder's second axe: when a foe it can see is pinned against stone or trapped in a dead end, its greataxe and goring rushes land with crushing weight, splintering bone against the corridor itself and leaving the victim fenced in and bleeding where the maze can finish them." [trait/always/damage] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst, heated-body)
[reskin] weapons answered: Greataxe = greataxe
[reskin] languages by mind: "None" -> "Common" (sapient)
audit finding below confidence gate: Rampage (1/Day) The trigger fires off any damage dealt by any means, so a GM must decide whether a Greataxe or another effect opens the clause; it reads as an event-triggered reaction but is labeled a bonus action, which is a contradictory action-economy timing.
[reskin] audit rename: "Rampage (1/Day)" -> "Herder's Lunge (1/Day)"
```


---

## Ser Bramwell Rook — in the run

**Concept:** a knight-errant of the fallen order who shields the weak

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Ser Bramwell Rook | 7 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 6 / off 8 → 7; sustained 52 (2 × Longsword); nova none; dmg 52

```
Ser Bramwell Rook

Medium Humanoid, Neutral

AC 19
Initiative +2 (12)

HP 105 (14d8 + 42)

Speed 30 ft.

MOD
SAVE
STR
18
+4
+7
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
16
+3
+6
CHA
15
+2
+2

Skills Athletics +7, Perception +4

Senses Passive Perception 14

Languages Common

CR 7 (XP 2,900; PB +3)

Traits

Aura of Authority. While in a 10-foot Emanation originating from the rook, the rook and its allies have Advantage on attack rolls and saving throws, provided the rook doesn't have the Incapacitated condition.

Actions

Multiattack. The rook makes two Longsword attacks. It can replace one attack with a use of Shield Bash.

Longsword. Melee Attack Roll: +7, reach 5 ft. 26 (5d8 + 4) Slashing damage.

Shield Bash. Strength Saving Throw: DC 14, one creature within 5 feet that the rook can see. Failure: 24 (7d6) Bludgeoning damage. If the target is a Medium or smaller creature, it has the Prone condition. Success: Half damage only.

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

- Traits/Aura of Authority — paladin kit; the GM's clause "knight-errant"
- Actions/Multiattack — the chassis
- Actions/Longsword — print's own row, renamed; weapon longsword
- Actions/Shield Bash — print's own row

**Engine trace**

```
[path] class_npc — class paladin — "knight-errant" (call)
[route] defender type=Humanoid mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | defender: ✓ ("shields the weak") | defender: key "knight" (class verb)
[concept] name: provided_name rejected — "knight-errant of the fallen order…" is the description, not a name
[concept] resolve: archetype=defender type=Humanoid themes=armed/forged mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: shouldering the blows meant for the weak [behavior] | battered shield and dented iron plate [object] | the broken order's surviving oath [aura]
[concept] identity: A scarred veteran of a broken chivalric order, the knight-errant plants itself before those smaller than itself and makes its armor a wall they live behind, wading in with a battered iron blade only to turn a blow aside with its shield when a charge or a fleeing attacker breaks past it. Every round after it commits to that wall, punishing anyone who turns their back on it or slides past its reach, and it takes the wounds meant for the helpless without flinching. It fights to the death for its charges and breaks only if the people it shields are already gone.
[concept] lore: When the Fallen Order's banners came down, a handful of its knights swore their oaths to the defenseless rather than to a lord, and they still walk the roads in dented iron, escorting the small and the lost to safety.
[reskin] [path] class body: the paladin stands on the Gladiator — the class's own print block, nearest CR 7
[reskin] print canon array: STR 18, DEX 15, CON 16, INT 10, WIS 12, CHA 15 — the Gladiator's, STR fitted to +7
[reskin] donor: defender-5 -> CR 7
[reskin] row gated out: Guard Aura (aura) — the concept did not claim this mechanic
[reskin] [path] decides: class_npc on the Gladiator · class paladin (the matcher would have said homebrew)
[reskin] print canon: "a knight-errant of the fallen order who shields the weak" heads on the Gladiator — print's rows ride along; the seat stays
[reskin] repair round 1: 1 defect(s) — rename for "Hybrid Attack" takes the shelf's own row name "Shield Bash" — that name belongs to a template this sheet may still receive; choose another
[reskin] class kit: paladin — "knight-errant": Aura of Authority (Hobgoblin Captain/Aura of Authority)
[reskin] inline by rule: "the rook" — the call answered "Ser Bramwell" (person), which the name does not support
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a knight-errant of the fallen order" -> has (descriptive), head | "shields the weak" -> has (descriptive)
[reskin] menu pruned: action — snap-shot (the sheet cannot render them)
[reskin] signature idea (action): "When a foe's charge or hurried retreat carries it past the knight's reach, the knight slams its battered shield into the passing body and stops it dead — the blow lands as the enemy leaves, pinning the attacker in place beside the wall it was trying to slip around. This only works against someone breaking away or rushing through the knight's line, never against a foe standing and trading blows." [reaction/on_being_hit/movement] — menu: riposte (+ shelf: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, stunning-strike, charge-push, hook-rider)
[reskin] signature bound to the concept's verb: action — rally (shield, orders)
[reskin] word match declined by the call: rally, push-prone — the key word does not mean the mechanic here
[reskin] signature miss: action — "When a foe's charge or hurried retreat carries it past the knight's reach, the knight slams its battered shield into the passing body and stops it dead — the blow lands as the enemy leaves, pinning the attacker in place beside the wall it was trying to slip around. This only works against someone breaking away or rushing through the knight's line, never against a foe standing and trading blows." [reaction/on_being_hit/movement] — the model picked "riposte" (no verb, and it quotes nothing the GM typed) over a concept-verb template (rally, herd)
[reskin] fallback respects the call: rally, push-prone left the shelf — the call declined them for this sheet
[reskin] fallback stands down: the class_npc path has no shelf — the Gladiator's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 19 already beats print's AC 15 at CR 7, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "The knight's oath makes the wounds aimed at the small land on the iron instead: whenever a nearby ally smaller than the knight is struck, the knight shoulders part of that harm itself, its dented plate drinking the blow so the charge walks away. It cannot do this for more than one charge at a time, and it never turns this protection on itself." [trait/always/defense] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending, weapon-lodge)
[reskin] word match declined by the call: absorption, resonant-body — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "The knight's oath makes the wounds aimed at the small land on the iron instead: whenever a nearby ally smaller than the knight is struck, the knight shoulders part of that harm itself, its dented plate drinking the blow so the charge walks away. It cannot do this for more than one charge at a time, and it never turns this protection on itself." [trait/always/defense] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, absorption, bloodied-burst, resonant-body)
[reskin] weapons answered: Longsword = longsword; Shield Bash = shield
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] print canon alignment: Lawful Good -> Neutral — the Gladiator's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon attack: "Spear" keeps print's hybrid frame — reach 5 ft. or range 20/60 ft. (the Gladiator's weapon is thrown)
[reskin] print canon attack: "Longsword" -> "Spear" — the Gladiator's own row
[reskin] print canon rows: Oath-Sworn Hurl leave — the Gladiator has one melee row (Spear), and Multiattack reads print's
[reskin] print canon row priced: Shield Bash — dice 9 → 24
[reskin] print canon row: Actions/Shield Bash — the Gladiator's own
[reskin] multiattack re-read — "Spear" left; "Multiattack" now reads "The rook makes two attacks."
[reskin] class weapon: Actions/"Spear" -> "Longsword" — a paladin fights with a longsword, not the Gladiator's
[reskin] multiattack replacement clause: It can replace one attack with a use of Shield Bash.
[reskin] multiattack normalised: "The rook makes two Longsword attacks. It can replace one attack with a use of Shield Bash."
```
