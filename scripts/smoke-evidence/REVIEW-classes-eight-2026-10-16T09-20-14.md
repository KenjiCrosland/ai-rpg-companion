# Review batch — classes-eight-2026-10-16T09-20-14

The checker ran first. The gate table covers every block in the run; every block of the run follows. Each block carries its checker row above and its engine trace below. Hand-derive against the row first; then read for what predicates can't see.

## Gate table — the whole run

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Marsh Nerve-Striker | 5 | 2024 | skirmisher-3 | ok | ok | ok | SOFT: ko-at-will | ok | ok | ok | ok | ok | soft (1) | 1/1 | 4/6 |
| Sylvara Emberthorn | 5 | 2024 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/5 |
| Dame Oriel | 5 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |
| Hundredth Line | 6 (2014) | 2014 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 5/5 |
| Oathbroken Korrath | 8 | 2024 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/6 |
| Vareth Solmane | 6 | 2024 | skirmisher-3 | FAIL: attack-stat | ok | ok | ok | ok | ok | ok | ok | ok | FAIL (1) | 1/1 | 5/5 |
| Templar of the Unmoved Stone | 4 | 2024 | defender-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 1/2 |
| Last Court Magician | 6 | 2024 | caster-6 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 5/5 |
| Thurivald | 6 (2014) | 2014 | defender-3-leader | ok | ok | FAIL: lint:duplicate-entry | ok | ok | ok | ok | ok | ok | FAIL (1) | 0/1 | 3/5 |
| Oathsworn Crusader | 8 | 2024 | defender-8-leader | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 5/6 |
| Unseen Blade | 5 | 2024 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 5/7 |
| Ravine Packstalker | 3 | 2024 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 2/3 |
| Skeinfang Imp | 4 | 2024 | skirmisher-3 | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 5/5 |
| Bone-Labyrinth Reaver | 6 | 2024 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/5 |
| Broken Wall Sentinel | 7 | 2024 | defender-5 | ok | ok | FAIL: lint:duplicate-entry | ok | ok | ok | ok | ok | ok | FAIL (1) | 1/1 | 1/4 |
| Bellcount Cutpurse | 3 | 2024 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 3/5 |

**Dropped 2 of 19 user clauses** (coverage 89%); concept share 76% (59/78 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- skirmisher-3 / derivation: 1
- defender-3-leader / structure: 1
- defender-5 / structure: 1



---

## Ravine Packstalker — lowest CR

**Concept:** a dire wolf that hunts in a pack

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Ravine Packstalker | 3 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1 / off 3 → 2; sustained 24 (2 × Bite); nova none; dmg 24

```
Ravine Packstalker

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

Pack Tactics. The packstalker has Advantage on an attack roll against a creature if at least one of the packstalker's allies is within 5 feet of the creature and the ally doesn't have the Incapacitated condition.

Actions

Multiattack. The packstalker makes two Bite attacks.

Bite. Melee Attack Roll: +5, reach 5 ft. 12 (2d8 + 3) Piercing damage. If the target is a Large or smaller creature, it has the Prone condition.

Bonus Actions

Ravine Ambush (2/Day). The packstalker has Advantage on the next attack roll it makes before the end of its turn.

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
- Actions/Bite — the chassis
- Bonus Actions/Ravine Ambush — library seed focus; binds the GM's words: hunt

**Engine trace**

```
[route] skirmisher type=Beast mechanics=none — skirmisher: ✓ ("hunts in a pack") | skirmisher: no line key in the words — the model's read of its quote
[concept] resolve: archetype=skirmisher type=Beast themes=bestial/terror mind=bestial style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: pack tactics [behavior] | thick, scarred hide [body]
[concept] identity: A dire wolf that circles the edges of a fight, probing for the weak or isolated member of the herd. Once it lunges, it bites and immediately withdraws behind the bulk of its packmates, forcing the wounded target to turn and face a fresh set of jaws. It is relentless while the pack holds the advantage and scatters into the brush only when half its number lies dead.
[concept] lore: Born in the deep, shadowed ravines where prey runs thick, this dire wolf has learned that a coordinated pack makes even the mightiest elk or armored knight a meal.
[reskin] print canon array: STR 17, DEX 16, CON 15, INT 3, WIS 12, CHA 7 — the Dire Wolf's, DEX fitted to +5
[reskin] donor: skirmisher-3 -> CR 3
[reskin] print canon: "a dire wolf that hunts in a pack" heads on the Dire Wolf — print's rows ride along; the seat stays
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] inline declared: "the packstalker" — the call's own answer (kind), built from the name
[reskin] inline form: "the packstalker" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] lacks refused: "no speech" quotes nothing the user typed
[reskin] lacks refused: "cannot climb" quotes nothing the user typed
[reskin] lacks refused: "no magic" quotes nothing the user typed
[reskin] clauses: "a dire wolf" -> has (descriptive), head | "hunts in a pack" -> has (descriptive)
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "When the packstalker bites a target, it twists and wrenches the wound before letting go, leaving a jagged gash that keeps bleeding and slows the victim down. Any ally of the packstalker that strikes the same wounded target next gains the opening it needs, tearing deeper into the fresh scar. The wound only seals if the target spends a moment pressing cloth or flame to it, giving the pack time to ci" [rider/on_hit/damage] — menu: affliction, contagion, charge-push, hook-rider, pounce, isolation, charge (+ shelf: trample, leap, gaze-single, snare, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, riposte)
[reskin] signature bound to the concept's verb: action — focus (hunt)
[reskin] fit declined: "Ravening Gash" — a print body takes only what the user's words ask; neither the call nor the key table finds the GM asking for it (the blacksmith's rally, critic-ten 2026-10-01)
[reskin] value check: "Predatory Focus (2/Day)" EV 2 vs floor 2 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: focus -> Bonus Actions/"Predatory Focus (2/Day)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The packstalker's hide is a roadmap of old hunt-wounds — thick, ropey scar tissue that turns aside claws and dull blades. When a foe lands a telling blow, the scarred flesh ripples and the wolf only snarls, already shifting to flank with its packmates." [trait/on_being_hit/defense] — menu: heated-body, absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, warded-mending, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] signature bound to the concept's verb: trait — faultless-tracker (hunts, hunted)
[reskin] word match declined by the call: heated-body, resonant-body, absorption, bloodied-burst, bloodied-fury, faultless-tracker — the key word does not mean the mechanic here
[reskin] trait declined: "Scarhide Stance" — bound only on the idea's own words (turns aside:idea) with no key in the concept; a meat body earns its trait by the user's verb (the sniper's tracker, critic 2026-09-29)
[reskin] concept-first trait skipped: faultless-tracker — the call read its match as a collision (the word is a modifier, or the sheet already answers it)
[reskin] weapons answered: Bite = none
[reskin] languages held: None stands — INT 3 on a Beast speaks nothing, whatever the mind read said
[reskin] print canon trait: Pack Tactics — "a dire wolf that hunts in a pack" is the Dire Wolf (print's own row)
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the seat's, not the Dire Wolf's
[reskin] print canon: chassis row leaves — Traits/"Pack Shadow" is the seat's, not the Dire Wolf's
[reskin] audit rename: "Predatory Focus (2/Day)" -> "Ravine Ambush (2/Day)"
```


---

## Oathsworn Crusader — highest CR

**Concept:** an oathsworn crusader who smites the unclean and mends her soldiers

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Oathsworn Crusader | 8 | defender-8-leader | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 6 / off 8 → 7; sustained 54 (3 × Radiant Smite); nova none; dmg 54

```
Oathsworn Crusader

Medium Humanoid, Lawful Good

AC 17
Initiative +2 (12)

HP 135 (18d8 + 54)

Speed 30 ft.

MOD
SAVE
STR
20
+5
+5
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
13
+1
+1
MOD
SAVE
CON
16
+3
+6
CHA
18
+4
+7

Skills Athletics +8, Persuasion +7

Senses darkvision 60 ft.; Passive Perception 11

Languages Common, Celestial

CR 8 (XP 3,900; PB +3)

Traits

Aura of Authority. While in a 10-foot Emanation originating from the oathsworn crusader, the oathsworn crusader and its allies have Advantage on attack rolls and saving throws, provided the oathsworn crusader doesn't have the Incapacitated condition.

Actions

Multiattack. The oathsworn crusader makes three attacks, using Blessed Blade or Radiant Smite in any combination.

Blessed Blade. Melee Attack Roll: +8, reach 5 ft. 9 (1d8 + 5) Slashing damage plus 7 (2d6) Radiant damage.

Radiant Smite. Melee Attack Roll: +8, reach 5 ft. 18 (3d8 + 5) Radiant damage.

Bonus Actions

Lay on Hands (2/Day). The oathsworn crusader touches a creature within 5 feet of itself and restores 18 (4d8) Hit Points to it.

Oathbound Strike (2/Day). The oathsworn crusader charges its next strike: the first time it hits with an attack before the end of its next turn, the target takes an extra 9 (2d8) Radiant damage.

Answering Sting. One creature within 5 feet that hit the oathsworn crusader with an attack roll since the end of the oathsworn crusader's last turn takes 7 (2d6) Bludgeoning damage.

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

- Traits/Aura of Authority — the chassis
- Actions/Multiattack — the chassis
- Actions/Blessed Blade — weapon longsword
- Actions/Radiant Smite — the chassis
- Bonus Actions/Lay on Hands — template lay-on-hands; paladin kit; the GM's clause "mends her soldiers"
- Bonus Actions/Oathbound Strike — template coating; paladin kit; the GM's clause "smites the unclean"; energy Radiant
- Bonus Actions/Answering Sting — library seed own-turn-punisher

**Engine trace**

```
[route] defender-leader type=Humanoid mechanics=none — caster-warpriest: a caster line needs a magic word in the words — none here | defender-leader: ✓ ("mends her soldiers") | defender-leader: no line key in the words — the model's read of its quote
[concept] hints: warpriest→style ✓ ("smites the unclean")
[concept] resolve: archetype=defender type=Humanoid themes=armed/celestial mind=sapient style=leader energy=Radiant mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: smites the unclean with radiant fire [behavior] | mends her soldiers with a word [behavior] | aura of command that steadies allies [aura]
[concept] identity: The Oathsworn Crusader opens by bellowing her oath and wading into the unclean, her blessed blade trailing radiant fire as she strikes down foes with smites that sear corruption. Each round she alternates between cutting down the wicked and calling out a mending word that knits her soldiers' wounds, her banner aura steadying their nerves. She never flees; if her troops fall, she fights on in grim silence, and if reduced below half her hit points she becomes a relentless avenger who ignores her own wounds to smite the enemy commander.
[concept] lore: Bound by an unbreakable oath to a now-fallen order, she wanders the land judging the unclean and gathering a ragged company of penitents who fight for her blessing.
[reskin] energy withheld: Radiant on a Humanoid with no Radiant in the concept's own words (fixed phrases read first)
[reskin] donor: defender-8-leader -> CR 8 (invented — no printed peer)
[reskin] name_element answered: Blessed Blade = imagery; Radiant Smite = literal
[reskin] name element refused: "Blessed Blade" was called imagery, but its element word stands alone — a fused compound makes no claim, a bare one does
[reskin] repair round 1: 1 defect(s) — "Radiant Smite" deals Radiant on a Humanoid whose concept names no Radiant — a name is not a warrant; use a physical type
[reskin] class kit: Aura of Authority — the sheet already carries a row of that name
[reskin] kit energy: "Divine Smite" deals Radiant, not Bludgeoning — the shape's own fiction
[reskin] class kit: paladin — "an oathsworn crusader": Lay on Hands (2/Day) (lay-on-hands), Divine Smite (2/Day) (coating as Divine Smite)
[reskin] inline by rule: "the oathsworn crusader" — the call answered "the crusader" (kind), which the name does not support
[reskin] inline on kit rows: "the crusader" -> "the oathsworn crusader"
[reskin] inline form: "the crusader" — the model's own reading of the name
[reskin] energy rider kept by the row's name: "Blessed Blade" promises Radiant, so the rider stands on a Humanoid the concept never called radiant
[reskin] energy rider kept by the row's name: "Radiant Smite" promises Radiant, so the rider stands on a Humanoid the concept never called radiant
[reskin] energy kept on a base row: "Radiant Smite" Radiant — the row's own noun pays for it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "an oathsworn crusader" -> has (descriptive), head | "smites the unclean" -> has (descriptive) | "mends her soldiers" -> has (descriptive)
[reskin] signature idea (action): "She calls out a mending word tied to her oath, and her banner's light darts to her wounded, closing some of their hurts and steadying them for what comes next. This is a quick utterance she can make every round instead of attacking, and it reaches only her allies within her banner's reach — she cannot mend herself with it, and it never touches her enemies or the unclean." [action/always/resource] — menu: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up (+ shelf: patient-defense, second-wind, volley-order, aggro-curse, own-turn-punisher, self-invisibility, rally, snap-shot, riposte, stunning-strike, charge-push, hook-rider)
[reskin] signature bound to the concept's verb: action — rally (mend)
[reskin] word match declined by the call: rally, herd, curse-debt, aggro-curse — the key word does not mean the mechanic here
[reskin] value check: "Banner's Mend (2/Day)" EV 2.9 vs floor 45.6 (the whole Multiattack (3 attacks)) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Banner's Mend (2/Day)" — the ladder could not lift it; the fallback stands in
[reskin] fallback respects the call: coating (already on the sheet), rally, herd left the shelf — the call declined them for this sheet
[reskin] value check: "Answering Sting" EV 3.9 vs floor 2.9 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: own-turn-punisher -> Bonus Actions/"Answering Sting" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "When she or an ally within her banner strikes a creature anointed as unclean — one branded by her oath or smitten by her radiant attacks — that foe's flesh refuses to knit, and it cannot regain hit points for a short while. The refusal lingers as long as the brand remains; truth-telling wounds do not heal over on their own." [trait/always/condition] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending, weapon-lodge)
[reskin] signature bound to the concept's verb: trait — warded-mending (mend, mends, mending)
[reskin] word match declined by the call: warded-mending, marking-light, faultless-tracker — the key word does not mean the mechanic here
[reskin] key match declined: trait — "warded-mending" was ranked first on the call's own menu for mend+mends+mending, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: trait — "When she or an ally within her banner strikes a creature anointed as unclean — one branded by her oath or smitten by her radiant attacks — that foe's flesh refuses to knit, and it cannot regain hit points for a short while. The refusal lingers as long as the brand remains; truth-telling wounds do not heal over on their own." [trait/always/condition] — the model found no template that holds it (offered: warded-mending, false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, bloodied-burst)
[reskin] concept-first trait skipped: warded-mending — the call read its match as a collision (the word is a modifier, or the sheet already answers it)
[reskin] weapons answered: Blessed Blade = longsword; Radiant Smite = none
audit finding below confidence gate: Divine Smite The effect imposes no condition or removal from play, but it also lacks a save or counterplay; any creature hit by the crusader's next attack takes unavoidable extra dice damage with no response.
audit finding below confidence gate: Answering Sting The trigger references a condition ('since the end of the oathsworn crusader's last turn') that the GM must track across rounds and cannot resolve in ~10 seconds; also the name is a generic engine stand-in.
[reskin] audit rename: "Divine Smite (2/Day)" -> "Oathbound Strike (2/Day)"
[reskin] row narrowed: "Radiant Smite" names nothing that can be thrown — the range leaves (print dresses only a thrown weapon in "Melee or Ranged")
```


---

## Hundredth Line — a 2014 sheet

**Concept:** a veteran soldier with a longsword who bashes with a buckler

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Hundredth Line | 6 (2014) | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 5 / off 6 → 5.5; sustained 42 (2 × Longsword); nova none; dmg 42

```
Hundredth Line
Medium humanoid, neutral
Armor Class

18 (plate)

Hit Points: 

112 (25d8)

Speed: 

30 ft.

STR	DEX	CON	INT	WIS	CHA


16 (+3)

	

11 (+0)

	

11 (+0)

	

8 (-1)

	

11 (+0)

	

8 (-1)

Skills: 

Athletics +6, Perception +3

Saving Throws: 

STR +6, CON +3

Senses: 

darkvision 60 ft., passive Perception 13

Languages: 

Common

Challenge

6 (2,300 XP)

Proficiency Bonus:

+3

Pack Tactics. The warrior has advantage on an attack roll against a creature if at least one of the warrior's allies is within 5 feet of the creature and the ally isn't incapacitated.
Second Wind (2/Day). As a bonus action, the hundredth line regains 19 (3d12) hit points.
Riposte (Reaction). When a creature within 5 feet of the hundredth line misses it with a melee attack roll, the hundredth line makes one Longsword attack against that creature.

Actions
Multiattack: The hundredth line makes two Longsword attacks. It can replace one attack with a use of Shield Bash.
Longsword: Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 21 (4d8 + 3) slashing damage, and the target has disadvantage on its next attack roll before the start of the hundredth line's next turn.
Shield Bash: One creature within 5 feet that the hundredth line can see must succeed on a DC 14 Strength saving throw or take 10 (3d6) bludgeoning damage, and if the target is Medium or smaller, it is knocked prone.
```

**Where each row came from**

- Traits/Pack Tactics — print's own row
- Actions/Multiattack — the chassis
- Actions/Longsword — authored for this sheet; a named part; a declared feature; the GM's clause "a veteran soldier with a longsword"; weapon longsword
- Actions/Shield Bash — template shield-bash; fighter kit; the GM's clause "bashes with a buckler"
- Reactions/Riposte — template riposte; fighter kit; the GM's clause "a veteran soldier with a longsword"
- Bonus Actions/Second Wind — template second-wind; fighter kit; the GM's clause "a veteran soldier with a longsword"

**Engine trace**

```
[route] defender type=Humanoid mechanics=none — defender: ✓ ("a veteran soldier with a longsword who b") | defender: no line key in the words — the model's read of its quote
[concept] name: provided_name rejected — "a veteran soldier with a longsword who b…" is the description, not a name
[concept] resolve: archetype=defender type=Humanoid themes=armed/forged mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: longsword and buckler duel [object] | holds the line [behavior] | shield bash stagger [behavior]
[concept] identity: A grizzled veteran opens by stepping into the enemy's reach, catching the first swing on a scarred buckler and answering with a low longsword cut to the knee. Every round after, it fights as a single fluid machine — parry, shield-bash to stagger, then a precise thrust at the exposed gap — always giving ground slowly, never breaking stride, using the terrain and its own armored bulk to funnel foes into kill-zones. It fights to the death, not from fanaticism but from a cold professional certainty that the line must hold.
[concept] lore: This soldier was forged from a hundred failed defenses and one last stand that bought a city a single day; now it wanders the old battlefields, looking for a line worth dying on and a commander worth following.
[reskin] print canon array: STR 16, DEX 11, CON 11, INT 8, WIS 11, CHA 8 — the Warrior Infantry's, STR fitted to +6
[reskin] donor: defender-5 -> CR 6
[reskin] row gated out: Guard Aura (aura) — the concept did not claim this mechanic
[reskin] print canon: "a veteran soldier with a longsword who bashes with a buckler" heads on the Warrior Infantry — print's rows ride along; the seat stays
[reskin] named parts: Longsword (slot) — the user's words, the engine's numbers
[reskin] named parts landed: 1 attack row(s), 0 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] chassis row off: Actions/"Buckler Bash" leaves — the GM named a melee weapon (Longsword); one weapon, one rule set
[reskin] class kit: fighter — "a veteran soldier with a longsword": Riposte (riposte), Shield Bash (shield-bash), Second Wind (2/Day) (second-wind)
[reskin] inline declared: "the hundredth line" — the call's own answer (kind), built from the name
[reskin] inline form: "the hundredth line" — the model's own reading of the name
[reskin] save dc derived: DC 15 -> 14 (8 + PB 3 + the sheet's best 3) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] lacks refused: "no magic at all" quotes nothing the user typed
[reskin] lacks refused: "no ranged weapon" quotes nothing the user typed
[reskin] clauses: "a veteran soldier with a longsword" -> has (descriptive), head | "bashes with a buckler" -> has (descriptive)
[reskin] menu pruned: action — push-prone (the sheet cannot render them)
[reskin] signature idea (action): "The Hundredth Line locks eyes with one foe and calls them out, challenging them to settle it blade to blade. So long as the soldier stands its ground and keeps trading blows with that single opponent, both of them are drawn into the duel — the challenge ends whenever either breaks away, or when the soldier turns its attention elsewhere. Foes who have seen the Hundredth Line do this before know it " [action/always/condition] — menu: seal, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, herd, curse-debt, reveal, wind-up, exploiter (+ shelf: patient-defense, lay-on-hands, aggro-curse, own-turn-punisher, self-invisibility, rally, stunning-strike, charge-push, hook-rider)
[reskin] fit declined: "Hundredth Challenge" — a print body takes only what the user's words ask; neither the call nor the key table finds the GM asking for it (the blacksmith's rally, critic-ten 2026-10-01)
[reskin] fallback stands down: "a veteran soldier with a longsword who bashes with a buckler" heads on the Warrior Infantry and asks for nothing — print's rows, nothing invented (the big ogre, critic-ten 2026-10-01)
[reskin] value check: "Horrid Display (2/Day)" EV 20.9 vs floor 32.1 (the whole Multiattack (2 attacks)) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Horrid Display (2/Day)" — a seed that cannot be lifted does not ship
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "Wounds do not make the Hundredth Line flinch; they make it read the fight. Every time an enemy's blow lands on it and does not bring it down, the Hundredth Line learns exactly where that weapon wants to be — and the next time the same foe swings, it is already moving to be somewhere else." [trait/on_being_hit/defense] — menu: absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura)
[reskin] word match declined by the call: bloodied-burst, bloodied-fury, absorption, resonant-body, weapon-lodge — the key word does not mean the mechanic here
[reskin] signature miss: trait — "Wounds do not make the Hundredth Line flinch; they make it read the fight. Every time an enemy's blow lands on it and does not bring it down, the Hundredth Line learns exactly where that weapon wants to be — and the next time the same foe swings, it is already moving to be somewhere else." [trait/on_being_hit/defense] — the model found no template that holds it (offered: absorption, bloodied-burst, resonant-body, weapon-lodge, bloodied-fury)
[reskin] weapons answered: Longsword = longsword; Buckler Bash = buckler
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] print canon alignment: Lawful Neutral -> Neutral — the Warrior Infantry's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon trait: Pack Tactics — "a veteran soldier with a longsword who bashes with a buckler" is the Warrior Infantry (print's own row)
[reskin] multiattack replacement clause: It can replace one attack with a use of Shield Bash.
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---

## Marsh Nerve-Striker — a 2024 sheet

**Concept:** a lizardfolk monk who strikes pressure points with an open hand

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Marsh Nerve-Striker | 5 | skirmisher-3 | ok | ok | ok | SOFT: ko-at-will | ok | ok | ok | ok | ok |

- gates · soft · ko-at-will: Actions/Palm Strike: Stunned at will, single target with a repeat save or a one-turn cap (the Ghoul's shape)
- read: def 3 / off 5 → 4; sustained 34 (2 × Palm Strike); nova none; dmg 34

```
Marsh Nerve-Striker

Medium Humanoid, Neutral

AC 16
Initiative +3 (13)

HP 91 (14d8 + 28)

Speed 30 ft., Climb 30 ft., Swim 40 ft.

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

Skills Perception +4, Stealth +6

Senses darkvision 60 ft.; Passive Perception 14

Languages Common, Draconic

CR 5 (XP 1,800; PB +3)

Traits

Hold Breath. The nerve-striker can hold its breath for 15 minutes.

Evasive. The nerve-striker ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Actions

Multiattack. The nerve-striker makes two attacks, using Palm Strike or Pressure Dart in any combination.

Palm Strike. Melee Attack Roll: +6, reach 5 ft. 17 (4d6 + 3) Bludgeoning damage. Once on each of the nerve-striker's turns when it hits with this attack, the target is subjected to the following effect. Constitution Saving Throw: DC 13. Failure: The target has the Stunned condition until the end of the nerve-striker's next turn.

Pressure Dart. Ranged Attack Roll: +6, range 20/60 ft. 16 (3d8 + 3) Piercing damage.

Bonus Actions

Fleet Agility. The nerve-striker takes the Dash or Disengage action.

Nerve-Searing Salve (2/Day). The nerve-striker charges its next strike: the first time it hits with an attack before the end of its next turn, the target takes an extra 9 (2d8) Bludgeoning damage.

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

- Traits/Hold Breath — lizardfolk kit; the GM's clause "a lizardfolk monk"
- Traits/Evasive — the chassis
- Actions/Multiattack — the chassis
- Actions/Palm Strike — a declared feature; the GM's clause "strikes pressure points with an open hand"
- Actions/Pressure Dart — weapon dart
- Bonus Actions/Fleet Agility — the chassis
- Bonus Actions/Nerve-Searing Salve — template coating; library draw (seed unstamped); binds the GM's words: venom+smear

**Engine trace**

```
[route] skirmisher type=Humanoid mechanics=none — skirmisher: ✓ ("a lizardfolk monk who strikes pressure p") | skirmisher: no line key in the words — the model's read of its quote
[concept] name: provided_name rejected — "a lizardfolk monk who strikes pressure p…" is the description, not a name
[concept] resolve: archetype=skirmisher type=Humanoid themes=venomous/uncanny mind=sapient style=— energy=Poison mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: open-palm pressure-point strikes [behavior] | venom-laced claw tips and spittle [body] | darting, untouchable skirmish rhythm [behavior]
[concept] identity: The lizardfolk monk opens with a darting, open-palm assault from the fringe of combat, using its pack to flank before withdrawing just out of reach. Each round it circles, probes with lightning-fast pressure-point strikes, and never stays in one spot long enough to be pinned down. Bloodied, it becomes more elusive rather than desperate, leading pursuers into its allies' killing ground.
[concept] lore: Born into a swamp-clutch that reveres the subtle flow of life-force, this monk left the marsh to test its nerve-strikes on the warm-blooded intruders who foul its ancestral waters.
[reskin] energy withheld: Poison on a Humanoid with no Poison in the concept's own words (fixed phrases read first)
[reskin] donor: skirmisher-3 -> CR 5
[reskin] species kit yields: Marsh Stride — the sheet is full (6 rows at CR 5, print's cap 4); the user's own rows stand
[reskin] species kit: lizardfolk — "a lizardfolk monk": Hold Breath (Hydra/Hold Breath); Swim 30 ft.
[reskin] class kit: monk — "strikes pressure points with an open hand": Stunning Strike (stunning-strike, rides Palm Strike); Patient Defense yielded to print's row cap 4
[reskin] inline declared: "the nerve-striker" — the call's own answer (kind), built from the name
[reskin] inline form: "the nerve-striker" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a lizardfolk monk" -> has (descriptive), head | "strikes pressure points with an open hand" -> has (mechanical)
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The nerve-striker rakes an open hand across a foe it just hit with a palm strike, smearing venom from its claw tips into the struck pressure point. The venom races to the nerves and locks the limb down: the victim's next movement or attack falters as the venom burns through the joint. The nerve-striker can apply this venom only so many times before its glands run dry, and never more than once on t" [rider/on_hit/condition] — menu: affliction, contagion, charge-push, hook-rider, pounce, isolation, bolt-mark, charge (+ shelf: trample, leap, gaze-single, snare, condition-payoff, throw-retrieve, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, exploiter, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte)
[reskin] signature bound to the concept's verb: action — riposte (opening)
[reskin] word match declined by the call: affliction, contagion — the key word does not mean the mechanic here
[reskin] value check: "Nerve-Searing Salve (2/Day)" EV 5 vs floor 2.9 (a bonus action (free)) — worth the trade
[reskin] signature template: coating -> Bonus Actions/"Nerve-Searing Salve (2/Day)" ("The venom is smeared from claw tips into the struck pressure point to charge the [verb: venom:idea, smear:idea]")
[reskin] signature idea (trait): "The nerve-striker's claws and spittle carry a marsh venom that deadens nerves. Anything that bites it, grapples it, or swallows it takes the venom into its own flesh and feels its limbs grow clumsy and slow, as if the swamp itself is pulling it down. The venom is harmless to the nerve-striker alone." [trait/on_being_hit/condition] — menu: absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, warded-mending, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] signature miss: trait — "The nerve-striker's claws and spittle carry a marsh venom that deadens nerves. Anything that bites it, grapples it, or swallows it takes the venom into its own flesh and feels its limbs grow clumsy and slow, as if the swamp itself is pulling it down. The venom is harmless to the nerve-striker alone." [trait/on_being_hit/condition] — the model found no template that holds it (offered: absorption, bloodied-burst, resonant-body, terrain-walk, false-appearance)
[reskin] weapons answered: Palm Strike = none; Pressure Dart = dart
[reskin] weapon table: "Pressure Dart" — thrown, range 20/60
[reskin] speed by body: a Humanoid walks 30 ft. (print's people; a hermit ran 50 — critic's audit 2026-10-02)
[reskin] speed by concept:  — the concept's movement set decides
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] languages by species: Draconic — the concept names the species; print's NPCs of it speak it
```


---

## Sylvara Emberthorn — a print donor

**Concept:** a tiefling rogue who stalks the rooftops of the old quarter

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Sylvara Emberthorn | 5 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 3 / off 7 → 5; sustained 48 (2 × Shortsword); nova none; dmg 48

```
Sylvara Emberthorn

Medium Humanoid, Neutral

AC 16
Initiative +3 (13)

HP 90 (20d8)

Speed 30 ft., Climb 30 ft.

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

Skills Perception +5, Stealth +9

Resistances Fire

Senses darkvision 60 ft.; Passive Perception 15

Languages Common plus one other language, Infernal

CR 5 (XP 1,800; PB +3)

Traits

Assassinate. During the first round of each combat, Sylvara has Advantage on attack rolls against any creature that hasn't taken a turn. If Sylvara hits a creature during that round, the target takes an extra 9 (2d8) Piercing damage.

Shadow Step. Sylvara ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Actions

Multiattack. Sylvara makes two attacks, using Shortsword or Hand Crossbow in any combination.

Shortsword. Melee Attack Roll: +6, reach 5 ft. 17 (4d6 + 3) Piercing damage plus 7 (2d6) Poison damage.

Hand Crossbow. Ranged Attack Roll: +6, range 30/120 ft. 16 (3d8 + 3) Piercing damage.

Bonus Actions

Cunning Action. Sylvara takes the Dash, Disengage, or Hide action.

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
- Traits/Shadow Step — the chassis
- Actions/Multiattack — the chassis
- Actions/Shortsword — print's row, renamed; weapon dagger
- Actions/Hand Crossbow — print's own row; weapon hand crossbow
- Bonus Actions/Cunning Action — the chassis

**Engine trace**

```
[route] skirmisher-skulker type=Humanoid mechanics=none — skirmisher-skulker: ✓ ("stalks the rooftops") | skirmisher-skulker: key "stalks" (class verb)
[concept] resolve: archetype=skirmisher type=Humanoid themes=terror/uncanny mind=sapient style=skulker energy=Necrotic mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: rooftop stalking [behavior] | shadow-infused strikes [body] | vanish and reappear [behavior]
[concept] identity: The Tiefling Rogue opens from an unseen perch, striking with advantage before melting back into the old quarter's shadows. Each round it repositions via alleys, eaves, and drops, picking off isolated targets before they can regroup. If bloodied, it slips away to vanish among the rooftops, returning only when the odds favor it once more.
[concept] lore: Born of infernal pacts in the old quarter, this tiefling rogue haunts the rooftops, trading in secrets and blood to settle a debt only it remembers.
[reskin] energy withheld: Necrotic on a Humanoid with no Necrotic in the concept's own words (fixed phrases read first)
[reskin] print canon array: STR 10, DEX 16, CON 10, INT 12, WIS 14, CHA 16 — the Spy's, DEX fitted to +6
[reskin] donor: skirmisher-3-skulker -> CR 5
[reskin] row gated out: Ranged Save Effect (gaze) — the concept did not claim this mechanic
[reskin] row gated out: Teleport (teleport) — the concept did not claim this mechanic
[reskin] print canon: "a tiefling rogue who stalks the rooftops of the old quarter" heads on the Spy — print's rows ride along; the seat stays
[reskin] species kit: tiefling — "a tiefling rogue": header lines only; darkvision 60 ft.; resistance Fire
[reskin] class kit: Cunning Action — the sheet already carries a row of that name
[reskin] class kit: rogue — "a tiefling rogue": Assassinate (assassinate); Evasion yielded to print's row cap 4
[reskin] inline declared: "Sylvara" — the call's own answer (person), built from the name
[reskin] inline form: "Sylvara" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a tiefling rogue" -> has (descriptive), head | "stalks the rooftops of the old quarter" -> has (descriptive)
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "Sylvara marks a victim it can see on the ground or across a gap, then stalks that target; while marked, she can drop from any rooftop or ledge onto the target's position and make one immediate Dagger strike as she lands. The mark lasts until she hits the target, the target leaves her line of sight, or she marks someone else, and she can only make the plunging strike if she has some height or rooft" [action/always/movement] — menu: leap, gaze-single, snare, throw-retrieve, shield-bash, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed (+ shelf: delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte, affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, isolation, bolt-mark)
[reskin] signature bound to the concept's verb: action — focus (stalk)
[reskin] word match declined by the call: focus, aggro-curse, bolt-mark — the key word does not mean the mechanic here
[reskin] fit declined: "Plunging Strike" — a print body takes only what the user's words ask; neither the call nor the key table finds the GM asking for it (the blacksmith's rally, critic-ten 2026-10-01)
[reskin] fallback respects the call: focus left the shelf — the call declined it for this sheet
[reskin] fallback stands down: "a tiefling rogue who stalks the rooftops of the old quarter" heads on the Spy and asks for nothing — print's rows, nothing invented (the big ogre, critic-ten 2026-10-01)
[reskin] value check: "Dazzling Burst" EV 2.5 vs floor 9.4 (one attack of 2) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Dazzling Burst" — a seed that cannot be lifted does not ship
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "Sylvara's strikes carry the old quarter's infernal shadow; whenever she hits a creature that cannot see her, that creature's vision dims and narrows around her, so it struggles to track her and hit her in return until the end of its next turn." [trait/always/condition] — menu: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] signature bound to the concept's verb: trait — faultless-tracker (stalks, stalk)
[reskin] word match declined by the call: faultless-tracker, relentless-pursuit, marking-light, blurred-form, false-appearance, bound — the key word does not mean the mechanic here
[reskin] key match declined: trait — "faultless-tracker" was ranked first on the call's own menu for stalks+stalk, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: trait — "Sylvara's strikes carry the old quarter's infernal shadow; whenever she hits a creature that cannot see her, that creature's vision dims and narrows around her, so it struggles to track her and hit her in return until the end of its next turn." [trait/always/condition] — the model found no template that holds it (offered: faultless-tracker, false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst)
[reskin] concept-first trait skipped: faultless-tracker — the call read its match as a collision (the word is a modifier, or the sheet already answers it)
[reskin] weapons answered: Dagger = dagger; Hand Crossbow = hand crossbow
[reskin] weapon table: "Hand Crossbow" — a launcher, never thrown, range 30/120
[reskin] speed by body: a Humanoid walks 30 ft. (print's people; a hermit ran 50 — critic's audit 2026-10-02)
[reskin] speed by concept:  — the concept's movement set decides
[reskin] print canon languages: "Common, Infernal" -> "Common plus one other language, Infernal" — the Spy's plus the concept's Infernal
[reskin] print canon attack: "Dagger" -> "Shortsword" — the Spy's own row
[reskin] on-hit extra retyped: "Assassinate" adds Piercing, not Bludgeoning — the hit's own type (Shortsword)
audit finding below confidence gate: Sylvara Emberthorn The name 'Sylvara Emberthorn' is serviceable but generic, and 'Emberthorn' implies a fire or plant nature while the creature's abilities deal only Piercing and Poison damage.
[reskin] audit rename blocked — "Ember Veil" claims an element "Shadow Step" does not pay (no damage)
[reskin] species kit: resistance Fire — the tiefling's
[harness] re-rolled Traits/"Assassinate" -> "Rooftop Prowler" [catalog: faultless-tracker]
```

**Re-roll — one entry, replaced**

```
Traits / BEFORE  Assassinate: During the first round of each combat, Sylvara has Advantage on attack rolls against any creature that hasn't taken a turn. If Sylvara hits a creature during that round, the target takes an extra 9 (2d8) Piercing damage.
Traits / AFTER   Rooftop Prowler: Sylvara knows the direction and distance to any creature it has damaged within the last 24 hours, as long as the two of them are on the same plane of existence.
provenance: catalog template "faultless-tracker", binds stalks, stalk
```


---

## Skeinfang Imp — one marked soft

**Concept:** an imp rogue who picks locks for a devil

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Skeinfang Imp | 4 | skirmisher-3 | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 2.5 (print at 4 reads 0.75–6, n=66)
- read: def 1 / off 4 → 2.5; sustained 30 (2 × Sting); nova none; dmg 30

```
Skeinfang Imp

Small Fiend, Lawful Evil

AC 16
Initiative +4 (14)

HP 67 (15d6 + 15)

Speed 20 ft., Fly 40 ft. (hover)

MOD
SAVE
STR
6
-2
-2
INT
11
+0
+0
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
13
+1
+1
CHA
14
+2
+2

Skills Perception +3, Stealth +6

Resistances Cold

Immunities Fire, Poison; Poisoned

Senses darkvision 120 ft.; Passive Perception 13

Languages Common, Infernal

CR 4 (XP 1,100; PB +2)

Traits

Magic Resistance. The imp has Advantage on saving throws against spells and other magical effects.

Actions

Multiattack. The imp makes two Sting attacks.

Sting. Melee Attack Roll: +6, reach 5 ft. 8 (1d8 + 4) Piercing damage plus 7 (2d6) Poison damage.

Shape-Shift. The imp shape-shifts to resemble a rat (Speed 20 ft.), a raven (20 ft., Fly 60 ft.), or a spider (20 ft., Climb 20 ft.), or it returns to its true form. Its statistics are the same in each form, except for its Speed. Any equipment it is wearing or carrying isn't transformed.

Invisibility. The imp casts Invisibility on itself, requiring no spell components and using Charisma as the spellcasting ability.

Bonus Actions

Nimble Escape. The imp takes the Disengage or Hide action.

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

- Traits/Magic Resistance — print's own row
- Actions/Multiattack — the chassis
- Actions/Sting — print's row, renamed
- Actions/Shape-Shift — print's own row
- Actions/Invisibility — print's own row
- Bonus Actions/Nimble Escape — rogue kit; the GM's clause "an imp rogue"

**Engine trace**

```
[route] skirmisher-skulker type=Fiend mechanics=none — skirmisher-skulker: ✓ ("an imp rogue who picks locks") | skirmisher-skulker: no line key in the words — the model's read of its quote
[concept] resolve: archetype=skirmisher type=Fiend themes=fiendish/grasping mind=sapient style=skulker energy=Necrotic mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: picking locks with shadow-forged tools [behavior] | a needle-thin shadow blade that bypasses wards [object] | vanishing through keyholes and cracks [behavior]
[concept] identity: The Lockpick Imp opens every fight by picking the lock on a target's guard — literally slipping its needle-thin claws into a seam in the victim's armor or confidence, then twisting. Every round after that it alternates between a shadowed strike and a sudden, mocking reappearance, using its rogue's cunning to isolate a single foe rather than brawl. When bloodied it flees through a keyhole or grate and vanishes into the dark, because a dead imp opens no more locks.
[concept] lore: Born in the hinge between the Nine Hells' foundries and the mortal locksmith's workshop, this imp serves a devil who pays in stolen souls for every door it opens.
[reskin] print canon route: the Imp's body outranks the skulker seat — no verb in the words names it; the plain skirmisher line
[reskin] print canon array: STR 6, DEX 18, CON 13, INT 11, WIS 12, CHA 14 — the Imp's, DEX fitted to +6
[reskin] donor: skirmisher-3 -> CR 4
[reskin] print canon: "an imp rogue who picks locks for a devil" heads on the Imp — print's rows ride along; the seat stays
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] class kit: rogue — "an imp rogue": Cunning Action (Assassin/Cunning Action); Evasion yielded to print's row cap 4
[reskin] inline declared: "the imp" — the call's own answer (kind), built from the name
[reskin] inline form: "the imp" — the model's own reading of the name
[reskin] save dc derived: DC 13 -> 14 (8 + PB 2 + the sheet's best 4) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "an imp rogue" -> has (descriptive), head | "picks locks for a devil" -> has (descriptive)
[reskin] extraction: 4 of 8 model clauses quote nothing the user typed and leave the record ("slipping its needle-thin claws into a seam in the victim's armor or confidence, then twisting", "alternates between a shadowed strike and a sudden, mocking reappearance", "When bloodied it flees through a keyhole or grate and vanishes into the dark", …)
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The imp drives a needle-thin claw of shadow into a seam in the target's armor, a lock, or a clenched fist, and twists — the wound itself is the picked lock. Until the imp's next turn, that victim's defenses hang open: anyone striking it finds the gap the imp already found. The imp can only have one such lock picked at a time, and the twist means nothing against something with no seam to exploit, l" [rider/on_hit/condition] — menu: affliction, contagion, charge-push, hook-rider, pounce, isolation, charge (+ shelf: trample, leap, gaze-single, snare, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, riposte)
[reskin] word match declined by the call: disarm, affliction, rampage, contagion, charge-push, hook-rider, pounce, isolation, charge — the key word does not mean the mechanic here
[reskin] fit declined: "Skeinlocked Seam" — a print body takes only what the user's words ask; neither the call nor the key table finds the GM asking for it (the blacksmith's rally, critic-ten 2026-10-01)
[reskin] fallback respects the call: disarm, rampage left the shelf — the call declined them for this sheet
[reskin] fallback stands down: "an imp rogue who picks locks for a devil" heads on the Imp and asks for nothing — print's rows, nothing invented (the big ogre, critic-ten 2026-10-01)
[reskin] value check: "Dazzling Burst" EV 1.9 vs floor 7.3 (one attack of 2) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Dazzling Burst" — a seed that cannot be lifted does not ship
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "The imp's claws are shadow-forged skeleton keys: they slide through seams, straps, and sockets that should stop them, so a target's armor or magical ward gives it no easier a time than bare skin. The only locks it cannot pick are the ones with nothing behind them — mindless things and the already-broken." [trait/always/defense] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst, sealed-body (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature bound to the concept's verb: trait — sealed-body (locked)
[reskin] word match declined by the call: sealed-body — the key word does not mean the mechanic here
[reskin] key match declined: trait — "sealed-body" was ranked first on the call's own menu for locked, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: trait — "The imp's claws are shadow-forged skeleton keys: they slide through seams, straps, and sockets that should stop them, so a target's armor or magical ward gives it no easier a time than bare skin. The only locks it cannot pick are the ones with nothing behind them — mindless things and the already-broken." [trait/always/defense] — the model found no template that holds it (offered: sealed-body, false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] weapons answered: Skein-Claw = none
[reskin] speed by concept: dropped Climb 30 ft. — the concept's movement set decides
[reskin] languages by mind: "Infernal, Telepathy 30 ft." -> "Infernal, telepathy 30 ft." (sapient)
[reskin] print canon size: Tiny -> Small — the Imp's
[reskin] print canon alignment: Neutral -> Lawful Evil — the Imp's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Infernal, telepathy 30 ft." -> "Common, Infernal" — the Imp's
[reskin] print canon speed: 40 ft. -> 20 ft. — the Imp's walk; the concept's other modes stay
[reskin] print canon attack: "Skein-Claw" -> "Sting" — the Imp's own row
[reskin] immunities stamped for type: Fiend -> Poison; Poisoned
[reskin] print canon defenses: immunities Poison; Poisoned -> Fire, Poison; Poisoned; resistances none -> Cold — the Imp's own header lines
[reskin] resistances derived: Cold
[reskin] print canon trait: Magic Resistance — "an imp rogue who picks locks for a devil" is the Imp (print's own row)
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the seat's, not the Imp's
[reskin] print canon: chassis row leaves — Traits/"Shadow Slip" is the seat's, not the Imp's
[reskin] print canon row: Actions/Shape-Shift — the Imp's own
[reskin] print canon row: Actions/Invisibility — the Imp's own
```


---

## Dame Oriel — in the run

**Concept:** name: Dame Oriel | a knight who holds the line with a shield and a longsword

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Dame Oriel | 5 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 4 / off 6 → 5; sustained 42 (2 × Longsword); nova none; dmg 42

```
Dame Oriel

Medium Humanoid, Lawful Neutral

AC 19
Initiative +1 (11)

HP 78 (12d8 + 24)

Speed 30 ft.

MOD
SAVE
STR
16
+3
+6
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
14
+2
+5
CHA
14
+2
+2

Skills Athletics +6, Perception +4

Senses darkvision 60 ft.; Passive Perception 14

Languages Common

CR 5 (XP 1,800; PB +3)

Traits

Unbroken Guard. While Dame Oriel isn't Bloodied, melee attack rolls against it are made with Disadvantage.

Actions

Multiattack. Dame Oriel makes two Longsword attacks.

Longsword. Melee Attack Roll: +6, reach 5 ft. 21 (4d8 + 3) Slashing damage, and the target has Disadvantage on its next attack roll before the start of Dame Oriel's next turn.

Bonus Actions

Gauntlet Backhand. One creature within 5 feet that hit Dame Oriel with an attack roll since the end of Dame Oriel's last turn takes 7 (2d6) Bludgeoning damage.

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

- Traits/Unbroken Guard — template guarded-stance; fighter kit; the GM's clause "keeps the line with a shield and a longsword"
- Actions/Multiattack — the chassis
- Actions/Longsword — authored for this sheet; a named part; a declared feature; the GM's clause "keeps the line with a shield and a longsword"; weapon longsword
- Reactions/Riposte — template riposte; fighter kit; the GM's clause "Dame Oriel — a knight"
- Bonus Actions/Gauntlet Backhand — library seed own-turn-punisher

**Engine trace**

```
[route] defender type=Humanoid mechanics=none — defender: ✓ ("keeps the line with a shield and a longs") | defender: key "keeps the line" (class verb)
[concept] resolve: archetype=defender type=Humanoid themes=armed/forged mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: provided "Dame Oriel"
[concept] mechanics: none claimed
[concept] signature elements: shield wall discipline [behavior] | iron-plated longsword and shield [object] | unyielding, joyless endurance [aura]
[concept] identity: Dame Oriel plants her shield and refuses to yield ground, forcing enemies to come to her or pay the price for trying to slip past. Every round she holds the line, punishing the first foe to move out of her reach with a shield-driven reprisal, and she fights to the death without ever breaking formation.
[concept] lore: Once a common soldier who held a collapsing gate for three days without relief, she was forged into a living bulwark by a war-god who rewards stubbornness, and now seeks a battle line that will finally test her unbreakable patience.
[reskin] donor: defender-5 -> CR 5
[reskin] row gated out: Guard Aura (aura) — the concept did not claim this mechanic
[reskin] repair round 1: 1 defect(s) — rename for "Hybrid Attack" takes the shelf's own row name "Shield Bash" — that name belongs to a template this sheet may still receive; choose another
[reskin] named parts: Longsword (slot) — the user's words, the engine's numbers
[reskin] named parts landed: 1 attack row(s), 0 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] chassis row off: Actions/"Measured Reprisal" leaves — the GM named a melee weapon (Longsword); one weapon, one rule set
[reskin] class kit: fighter — "Dame Oriel — a knight": Riposte (riposte), Guarded Stance (guarded-stance)
[reskin] proper noun: "Dame Oriel" — the Name field is a person, not a kind (no print match, no article in the words)
[reskin] inline declared: "Dame Oriel" — the call's own answer (person), built from the name
[reskin] lacks asked: nothing taken away
[reskin] lacks refused: "no magic at all" quotes nothing the user typed
[reskin] lacks refused: "carries no bow" quotes nothing the user typed
[reskin] lacks refused: "never yields ground" quotes nothing the user typed
[reskin] clauses: "Dame Oriel — a knight" -> has (descriptive), head | "keeps the line with a shield and a longsword" -> has (mechanical)
[reskin] signature idea (action): "She raises her shield and plants her feet, declaring a line across the ground that she will not cross. Until her next turn begins, that line is a wall to her enemies: any who try to pass her or slip around her are stopped short in front of it, and the first one to test the line takes a hard shield-bash to the chest that shoves them back behind it. She cannot move while she holds the line this way." [action/always/movement] — menu: seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up (+ shelf: patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, stunning-strike, charge-push, hook-rider)
[reskin] signature bound to the concept's verb: action — rally (shield)
[reskin] word match declined by the call: shield-bash, push-prone, obstacle-pull, slow-bolt — the key word does not mean the mechanic here
[reskin] key match declined: action — "rally" was ranked first on the call's own menu for shield, and the call read it as no fit; the words keep their claim and nothing is forced
[reskin] signature miss: action — "She raises her shield and plants her feet, declaring a line across the ground that she will not cross. Until her next turn begins, that line is a wall to her enemies: any who try to pass her or slip around her are stopped short in front of it, and the first one to test the line takes a hard shield-bash to the chest that shoves them back behind it. She cannot move while she holds the line this way." [action/always/movement] — the model found no template that holds it (offered: rally, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up)
[reskin] fallback respects the call: rally, push-prone left the shelf — the call declined them for this sheet
[reskin] fallback skipped by the floor: disarm (EV 0 vs 9.4)
[reskin] fallback skipped by the floor: herd (EV 7 vs 30.4)
[reskin] value check: "Answering Sting" EV 3.9 vs floor 2.9 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: own-turn-punisher -> Bonus Actions/"Answering Sting" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Her longsword and shield are fitted with heavy iron bands, and blows that glance off one weapon ring against the other. When she parries or turns aside a melee attack with her shield, the attacker is left jarred and off-balance by the iron clang, unable to swing true until they recover." [trait/on_being_hit/condition] — menu: absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura)
[reskin] word match declined by the call: resonant-body — the key word does not mean the mechanic here
[reskin] signature miss: trait — "Her longsword and shield are fitted with heavy iron bands, and blows that glance off one weapon ring against the other. When she parries or turns aside a melee attack with her shield, the attacker is left jarred and off-balance by the iron clang, unable to swing true until they recover." [trait/on_being_hit/condition] — the model found no template that holds it (offered: absorption, bloodied-burst, resonant-body, weapon-lodge)
[reskin] weapons answered: Longsword = longsword; Shield Bash = shield
[reskin] languages by mind: "None" -> "Common" (sapient)
audit finding below confidence gate: Longsword The Longsword attack applies a lingering debuff condition requiring the GM to track its expiration relative to the start of Dame Oriel's next turn, which is a state-tracking encumbrance.
[reskin] audit rename: "Guarded Stance" -> "Unbroken Guard"
[reskin] audit rename: "Answering Sting" -> "Gauntlet Backhand"
```


---

## Oathbroken Korrath — in the run

**Concept:** a goliath berserker who loses control when wounded

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Oathbroken Korrath | 8 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 6 / off 8 → 7; sustained 54 (2 × Greataxe); nova none; dmg 54

```
Oathbroken Korrath

Medium Humanoid, Chaotic Neutral

AC 15
Initiative -1 (9)

HP 150 (20d8 + 60)

Speed 30 ft.

MOD
SAVE
STR
20
+5
+8
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

Skills Athletics +8, Perception +3

Senses darkvision 60 ft.; Passive Perception 13

Languages Common, Giant

CR 8 (XP 3,900; PB +3)

Traits

Berserk. Whenever Korrath starts its turn Bloodied, roll 1d6. On a 6, Korrath goes berserk. On each of its turns while berserk, Korrath attacks the nearest creature it can see. If no creature is near enough to move to and attack, Korrath attacks an object. Once Korrath goes berserk, it remains so until it is destroyed or it is no longer Bloodied.

Bloodied Frenzy. While Bloodied, Korrath has Advantage on attack rolls and saving throws.

Mountain Stride. Difficult Terrain composed of ice or snow doesn't cost Korrath extra movement, and Korrath can move across ice or snow without needing to make an ability check.

Actions

Multiattack. Korrath makes two attacks, using Greataxe or Hurlaxe in any combination.

Greataxe. Melee Attack Roll: +8, reach 5 ft. 27 (5d8 + 5) Slashing damage.

Hurlaxe. Ranged Attack Roll: +8, range 20/60 ft. 23 (4d8 + 5) Slashing damage.

Bonus Actions

Oathbreaker's Clarity (1/Day). Immediately after dealing damage to a creature that is already Bloodied, Korrath moves up to half its Speed without provoking Opportunity Attacks, and it makes one Greataxe attack.

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
- Actions/Hurlaxe — weapon handaxe
- Traits/Berserk — template berserk; barbarian kit; the GM's clause "loses control when wounded"
- Traits/Bloodied Frenzy — barbarian kit; the GM's clause "a goliath berserker"
- Traits/Mountain Stride — goliath kit; the GM's clause "a goliath berserker"
- Bonus Actions/Oathbreaker's Clarity — library seed rampage; binds the GM's words: wound

**Engine trace**

```
[route] brute type=Giant mechanics=none — brute: ✓ ("a goliath berserker") | brute: no line key in the words — the model's read of its quote
[concept] resolve: archetype=brute type=Giant themes=bestial/terror mind=sapient style=— energy=Lightning mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: loss of control when wounded [behavior] | goliath berserker fury [behavior] | storm-touched flesh [body]
[concept] identity: A goliath berserker who opens by charging the nearest threat with a massive greataxe, trading blow for blow on the front line. Every round it stays in the thick of melee, but each wound it suffers pushes it closer to a blind fury—once bloodied, it can no longer distinguish friend from foe or retreat from a fight. It fights to the death, never fleeing, and its temperament under pressure is a terrifying, uncontrolled rage that turns its own allies into potential targets.
[concept] lore: Born of a storm-wracked mountain clan, this goliath berserker seeks only the next battle to drown the shame of a broken oath, and in its wounds it finds the only release it can still feel.
[reskin] donor: brute-5 -> CR 8
[reskin] species kit: goliath — "a goliath berserker": Mountain Stride (terrain-walk, authored)
[reskin] class kit: barbarian — "a goliath berserker": Bloodied Frenzy (Berserker/Bloodied Frenzy), Berserk (berserk); Rampage yielded to print's row cap 5
[reskin] inline declared: "Korrath" — the call's own answer (person), built from the name
[reskin] inline form: "Korrath" — the model's own reading of the name
[reskin] save dc derived: DC 15 -> 16 (8 + PB 3 + the sheet's best 5) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a goliath berserker" -> has (descriptive), head | "loses control when wounded" -> has (descriptive)
[reskin] extraction: 4 of 5 model clauses quote nothing the user typed and leave the record ("opens by charging the nearest threat with a massive greataxe, trading blow for blow on the front line", "once bloodied, it can no longer distinguish friend from foe or retreat from a fight", "fights to the death, never fleeing", …)
[reskin] signature idea (action): "Korrath slams his greataxe down in a mighty overhead blow that cracks the ground and sends a jagged bolt of lightning leaping from the impact to the nearest foe. The bolt then arcs to another creature near the first, and another, each arc weaker than the last, until it fizzles out. He can only call the storm like this once before he must pause to gather its fury again." [action/always/damage] — menu: trample, leap, thrown-burst, throw-retrieve, shield-bash, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up (+ shelf: rampage, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, charge)
[reskin] signature bound to the concept's verb: action — rampage, affliction (wound)
[reskin] nova declined: "Storm Gathering (Recharge 5-6)" — a whole-round ability the GM never asked for: neither the call nor the key table finds the GM asking for it (the idea's own words: gather:idea, gathering:idea, storm:idea); the fallback stands in (the cauldron's spill, 2026-09-29)
[reskin] value check: "Rampage (1/Day)" EV 22.8 vs floor 4.4 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: rampage -> Bonus Actions/"Rampage (1/Day)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Korrath's flesh still carries the storm of his mountain home, and when a foe lands a telling blow, that storm answers with a whipcrack of lightning that lashes back at the attacker. It happens every time he is struck, a reflexive snap of thunder that punishes those who would wound him." [trait/on_being_hit/damage] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] signature bound to the concept's verb: trait — bloodied-burst, bloodied-fury (wounded)
[reskin] word match declined by the call: bloodied-burst, bloodied-fury, heated-body, false-appearance, absorption, weapon-lodge — the key word does not mean the mechanic here
[reskin] signature miss: trait — "Korrath's flesh still carries the storm of his mountain home, and when a foe lands a telling blow, that storm answers with a whipcrack of lightning that lashes back at the attacker. It happens every time he is struck, a reflexive snap of thunder that punishes those who would wound him." [trait/on_being_hit/damage] — the model picked "resonant-body" (no verb, and it quotes nothing the GM typed) over a concept-verb template (bloodied-burst, bloodied-fury)
[reskin] weapons answered: Greataxe = greataxe; Hurlaxe = handaxe
[reskin] weapon table: "Hurlaxe" — thrown, range 20/60
[reskin] speed by body: a Humanoid walks 30 ft. (print's people; a hermit ran 50 — critic's audit 2026-10-02)
[reskin] speed by concept:  — the concept's movement set decides
[reskin] languages by mind: "Giant" -> "Common, Giant" (sapient)
[reskin] audit rename: "Rampage (1/Day)" -> "Oathbreaker's Clarity (1/Day)"
[reskin] species kit: Large -> Medium — a goliath is Medium (the words name no other size)
[reskin] species kit: "Greataxe" reach 10 -> 5 ft. — reach follows the goliath's size
```


---

## Vareth Solmane — in the run

**Concept:** name: Vareth Solmane | a templar priest of the dawn who blesses her soldiers

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Vareth Solmane | 6 | skirmisher-3 | FAIL: attack-stat | ok | ok | ok | ok | ok | ok | ok | ok |

- derivation · fail · attack-stat: Mace: +7 derives from DEX, but an attack row rolls STR
- read: def 4 / off 8 → 6; sustained 54 (2 × Mace); nova none; dmg 54

```
Vareth Solmane

Medium Humanoid, Neutral

AC 16
Initiative +4 (14)

HP 104 (19d8 + 19)

Speed 30 ft.

MOD
SAVE
STR
16
+3
+3
INT
13
+1
+1
MOD
SAVE
DEX
18
+4
+7
WIS
16
+3
+3
MOD
SAVE
CON
12
+1
+1
CHA
13
+1
+1

Skills Perception +6, Stealth +7

Senses darkvision 60 ft.; Passive Perception 16

Languages Common plus one other language, Celestial

CR 6 (XP 2,300; PB +3)

Actions

Multiattack. Vareth makes two attacks, using Mace or Radiant Flame in any combination.

Mace. Melee Attack Roll: +7, reach 5 ft. 22 (4d8 + 4) Bludgeoning damage plus 5 (2d4) Radiant damage.

Radiant Flame. Ranged Attack Roll: +7, range 60 ft. 17 (3d8 + 4) Radiant damage.

Spellcasting. Vareth casts one of the following spells, using Wisdom as the spellcasting ability (spell save DC 14):

- At Will: Light, Thaumaturgy
- 1/Day Each: Spirit Guardians

Bonus Actions

Silver Touch (2/Day). Vareth touches a creature within 5 feet of itself and restores 21 (6d6) Hit Points to it.

Divine Aid (3/Day). Vareth casts Bless, Dispel Magic, Healing Word, or Lesser Restoration, using the same spellcasting ability as Spellcasting.

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
- Actions/Mace — weapon mace
- Actions/Radiant Flame — print's own row, renamed
- Actions/Spellcasting — print's own row
- Bonus Actions/Silver Touch — library seed lay-on-hands; binds the GM's words: blessing
- Bonus Actions/Divine Aid — print's own row

**Engine trace**

```
[route] caster-warpriest (artillery) type=Humanoid mechanics=aura — defender-leader: ✓ ("blesses her soldiers") | defender-leader -> caster-warpriest: the concept's VERB outranks the noun (key "blesses", class verb) | caster-warpriest: key "blesses" (class verb)
[concept] resolve: archetype=caster type=Humanoid themes=celestial/armed mind=sapient style=warpriest energy=Radiant mix=both identity=✓ lore=✓
[concept] name: provided "Vareth Solmane"
[concept] mechanics: aura
[concept] signature elements: blessing her soldiers with dawnlight [behavior] | sun-emblazoned shield and iron mace [object] | aura of the Dawnlit Vow [aura]
[concept] identity: Vareth Solmane opens by raising her sun-emblazoned shield and casting a blessing that wreathes her nearby soldiers in Radiant light, then wades into melee to deliver a smite-charged strike with her mace. Each round she alternates between maintaining the blessing, healing a fallen ally, and punishing the enemy who wounded them with a second, brighter smite; when bloodied she does not flee but plants her feet, recites the Dawnlit Vow, and fights to the death so her troops can withdraw.
[concept] lore: Vareth Solmane was a temple orphan who took the Dawnvow after a sunrise vision; she now roams the border marches with a handpicked company, seeking to reclaim desecrated chapels and to prove that a single faithful officer can turn a rabble into an army.
[reskin] energy withheld: Radiant on a Humanoid with no Radiant in the concept's own words (fixed phrases read first)
[reskin] print canon route: the Priest is not a caster first (its own Spellcasting rides as print's row) — the caster family stands down for the plain skirmisher line
[reskin] print canon array: STR 16, DEX 18, CON 12, INT 13, WIS 16, CHA 13 — the Priest's, DEX fitted to +7
[reskin] donor: skirmisher-3 -> CR 6
[reskin] style unserved: "warpriest" has no skirmisher line — the plain line ships (resolve's style signal is noisy; not re-routed)
[reskin] print canon: "Vareth Solmane — a templar priest of the dawn who blesses her soldiers" heads on the Priest — print's rows ride along; the seat stays
[reskin] name_element answered: Sunbolt = literal
[reskin] repair round 1: 1 defect(s) — "Sunbolt" deals Radiant on a Humanoid whose concept names no Radiant — a name is not a warrant; use a physical type
[reskin] class kit: Divine Aid — the sheet carries no row it could refer to (/^Spellcasting$/)
[reskin] class kit: cleric — "Vareth Solmane — a templar priest of the dawn": nothing to add — the sheet already answers it
[reskin] proper noun: "Vareth Solmane" — the Name field is a person, not a kind (no print match, no article in the words)
[reskin] inline declared: "Vareth" — the call's own answer (person), built from the name
[reskin] inline form: "Vareth" — the model's own reading of the name
[reskin] energy rider withheld: Radiant on a Humanoid with no Radiant in the concept's own words
[reskin] energy withheld on a base row: "Sunbolt" Radiant -> Piercing (the body's physical type; a Humanoid deals no Radiant its concept never gave it)
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Vareth Solmane — a templar priest of the dawn" -> has (descriptive), head | "blesses her soldiers" -> has (descriptive)
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "Vareth raises her sun-emblazoned shield and speaks a blessing that wreaths nearby soldiers in dawnlight. While she holds it, she and each of those soldiers smite with extra radiant force on their first weapon hit each round, and she may deliver her own mace strike as part of the same prayer." [trait/start_of_turn/damage] — menu: warded-mending (+ shelf: trample, leap, thrown-burst, gaze-single, snare, throw-retrieve, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, lay-on-hands, rally, snap-shot, riposte, affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, isolation, bolt-mark, charge)
[reskin] signature bound to the concept's verb: action — rally (blessing, bless)
[reskin] word match declined by the call: rally, warded-mending, disarm — the key word does not mean the mechanic here
[reskin] fit declined: "Dawnlight Blessing (2/Day)" — a print body takes only what the user's words ask; neither the call nor the key table finds the GM asking for it (the blacksmith's rally, critic-ten 2026-10-01)
[reskin] fallback respects the call: rally, disarm left the shelf — the call declined them for this sheet
[reskin] value check: "Lay on Hands (2/Day)" EV 11.6 vs floor 3.4 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: lay-on-hands -> Bonus Actions/"Lay on Hands (2/Day)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The sun-emblazoned shield does not merely guard Vareth: it answers the first blow that bloodies her. When an enemy first lands a telling strike, her shield flares, marking that foe with coronal light until the end of her next turn, so her mace and her Sunbolt bite deeper against the one who wounded her." [trait/on_being_hit/damage] — menu: absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, warded-mending, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] word match declined by the call: bloodied-burst, bloodied-fury, faultless-tracker, guarded-stance, absorption, resonant-body — the key word does not mean the mechanic here
[reskin] signature miss: trait — "The sun-emblazoned shield does not merely guard Vareth: it answers the first blow that bloodies her. When an enemy first lands a telling strike, her shield flares, marking that foe with coronal light until the end of her next turn, so her mace and her Sunbolt bite deeper against the one who wounded her." [trait/on_being_hit/damage] — the model found no template that holds it (offered: absorption, bloodied-burst, resonant-body, bloodied-fury, faultless-tracker, guarded-stance)
[reskin] weapons answered: Mace = mace; Sunbolt = none
[reskin] weapon table: "Sunbolt" — range 30/90 ft. is not a print range; an unlisted thrown thing is 20/60, a hurled mass 60/240 (the critic's third species read)
[reskin] speed by body: a Humanoid walks 30 ft. (print's people; a hermit ran 50 — critic's audit 2026-10-02)
[reskin] speed by concept:  — the concept's movement set decides
[reskin] print canon alignment: Lawful Good -> Neutral — the Priest's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common, Celestial" -> "Common plus one other language, Celestial" — the Priest's plus the concept's Celestial
[reskin] print canon attack: "Sunbolt" -> "Radiant Flame" — the Priest's own ranged row
[reskin] print canon: chassis row leaves — Traits/"Dawnstride" is the seat's, not the Priest's
[reskin] print canon row: Actions/Spellcasting — the Priest's own
[reskin] print canon row: Bonus Actions/Divine Aid (3/Day) — the Priest's own
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" yields to the Priest's Divine Aid (3/Day)
[reskin] audit rename: "Lay on Hands (2/Day)" -> "Silver Touch (2/Day)"
[reskin] spellcasting dc: "Spellcasting" prints spell save DC 14 — 8 + PB + Wisdom (print carries it in 45 of 48 rows)
[harness] re-rolled Actions/"Mace" -> "Mace" [the call's own text]
```

**Re-roll — one entry, replaced**

```
Actions / BEFORE  Mace: *Melee Attack Roll:* +7, reach 5 ft. 22 (4d8 + 4) Bludgeoning damage plus 5 (2d4) Radiant damage.
Actions / AFTER   Mace: *Melee Attack Roll:* +7, reach 5 ft. 22 (4d8 + 4) Bludgeoning damage plus 4 (1d8) Radiant damage.
provenance: none — the call wrote the text itself
```


---

## Templar of the Unmoved Stone — in the run

**Concept:** a templar priest with a mace and no magic at all

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Templar of the Unmoved Stone | 4 | defender-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 3 / off 4 → 3.5; sustained 26 (2 × Mace); nova none; dmg 26

```
Templar of the Unmoved Stone

Medium Humanoid, Neutral

AC 19
Initiative +0 (10)

HP 66 (12d8 + 12)

Speed 30 ft.

MOD
SAVE
STR
18
+4
+4
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
+5
MOD
SAVE
CON
12
+1
+3
CHA
13
+1
+1

Skills Athletics +6, Perception +5

Senses darkvision 60 ft.; Passive Perception 15

Languages Common plus one other language

CR 4 (XP 1,100; PB +2)

Actions

Multiattack. The unmoved stone makes two Mace attacks. It can replace one attack with a use of Shield.

Mace. Melee Attack Roll: +6, reach 5 ft. 13 (2d8 + 4) Bludgeoning damage, and the target has Disadvantage on its next attack roll before the start of the unmoved stone's next turn.

Shield. Strength Saving Throw: DC 13, one creature within 5 feet that the unmoved stone can see. Failure: 7 (2d6) Bludgeoning damage, and if the target is Medium or smaller, it has the Prone condition.

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
- Actions/Mace — authored for this sheet; a named part; a declared feature; the GM's clause "a templar priest with a mace"; weapon mace
- Actions/Shield — template shield-bash

**Engine trace**

```
[route] defender type=Humanoid mechanics=thrown-weapon — defender: ✓ ("a templar priest with a mace and no magi") | caster-warpriest: "priest" is a noun (a title), not a verb — no override | defender: no line key in the words — the model's read of its quote
[concept] resolve: archetype=defender type=Humanoid themes=armed/terror mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: thrown-weapon
[concept] signature elements: punishing anyone who tries to move past [behavior] | mace and shield [object] | unbreakable hold-the-line stance [behavior]
[concept] identity: The Templar Priest opens by planting itself as a wall between danger and its flock, then makes every round a grinding test of whether enemies can get past its mace and shield. It never chases, never flees, and fights to the death with a martyr's calm, punishing any who try to slip by with a bone-shattering blow.
[concept] lore: Sworn to a militant order that forbids all miracles save the miracle of holding ground, the Templar Priest believes that faith is proven not by divine fire but by the strength of the arm that wields the mace.
[reskin] print canon array: STR 18, DEX 10, CON 12, INT 13, WIS 16, CHA 13 — the Priest's, STR fitted to +6
[reskin] donor: defender-3 -> CR 4
[reskin] row gated out: Guard Aura (aura) — the concept did not claim this mechanic
[reskin] print canon: "a templar priest with a mace and no magic at all" heads on the Priest — print's rows ride along; the seat stays
[reskin] named parts: Mace (slot) — the user's words, the engine's numbers
[reskin] named parts landed: 1 attack row(s), 0 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] class kit: Divine Aid — the sheet carries no row it could refer to (/^Spellcasting$/)
[reskin] class kit: cleric — "a templar priest with a mace": nothing to add — the sheet already answers it
[reskin] shield is not a weapon: "Shield" takes print's Shield Bash shape beside Mace — it was "*Ranged Attack Roll:* +6, range 30/120 ft. 13 (2d8 + 4) {dam…"
[reskin] inline by rule: "the unmoved stone" — the call answered "the unmoved stone" (kind), which the name does not support
[reskin] inline form: "the unmoved stone" — the model's own reading of the name
[reskin] lacks asked: "no magic at all"
[reskin] clauses: "a templar priest with a mace" -> has (mechanical) | "no magic at all" -> LACKS (mechanical)
[reskin] menu pruned: action — push-prone (the sheet cannot render them)
[reskin] signature idea (action): "The Templar Priest slams its mace into the ground, sending a shockwave that makes the earth itself grip at the feet of nearby foes. Enemies close by are violently drawn toward the templar, their footing stolen, and any who are pulled next to it are left staggering and unable to flee." [action/always/movement] — menu: seal, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, herd, curse-debt, reveal, wind-up, exploiter (+ shelf: patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, riposte, charge-push, hook-rider)
[reskin] fit declined: "Beckoning Pull" — a print body takes only what the user's words ask; neither the call nor the key table finds the GM asking for it (the blacksmith's rally, critic-ten 2026-10-01)
[reskin] fallback stands down: "a templar priest with a mace and no magic at all" heads on the Priest and asks for nothing — print's rows, nothing invented (the big ogre, critic-ten 2026-10-01)
[reskin] value check: "Driving Bellow (2/Day)" EV 5.5 vs floor 23.7 (the whole Multiattack (2 attacks)) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Driving Bellow (2/Day)" — a seed that cannot be lifted does not ship
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "Whenever the templar lands a blow with its mace, the target's limbs grow heavy with lingering numbness. Until the target tears itself free by force of will, every step it takes away from the templar is a struggle, and its attacks come slower and weaker." [trait/always/condition] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura (+ shelf: absorption, bloodied-burst, resonant-body, uncanny-sense, warded-mending, weapon-lodge)
[reskin] signature miss: trait — "Whenever the templar lands a blow with its mace, the target's limbs grow heavy with lingering numbness. Until the target tears itself free by force of will, every step it takes away from the templar is a struggle, and its attacks come slower and weaker." [trait/always/condition] — no template on the shelf shares a verb with the concept or the idea (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, absorption, bloodied-burst, resonant-body, uncanny-sense, warded-mending, weapon-lodge)
[reskin] weapons answered: Mace = mace; Shield = shield
[reskin] print canon alignment: Lawful Neutral -> Neutral — the Priest's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common" -> "Common plus one other language" — the Priest's
[reskin] print canon row: Actions/Spellcasting — the Priest's own
[reskin] print canon row: Bonus Actions/Divine Aid (3/Day) — the Priest's own
[reskin] multiattack replacement clause: It can replace one attack with a use of Shield.
[reskin] spellcasting dc: "Spellcasting" prints spell save DC 13 — 8 + PB + Wisdom (print carries it in 45 of 48 rows)
[reskin] lacks clause: Actions/"Spellcasting" leaves — "no magic at all"
[reskin] dead wildcard name swept — "Divine Aid (3/Day)" was only about "Spellcasting"; the row drops
```


---

## Last Court Magician — in the run

**Concept:** a court wizard who is never where you struck and steps away

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Last Court Magician | 6 | caster-6 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 2 / off 5 → 3.5; sustained 36 (3 × Arcane Burst); nova none; dmg 36

```
Last Court Magician

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

Multiattack. The court magician makes three Arcane Burst attacks.

Arcane Burst. Melee or Ranged Attack Roll: +6, reach 5 ft. or range 120 ft. 12 (2d8 + 3) Force damage.

Spellcasting. The court magician casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 14):

- At Will: Detect Magic, Light, Mage Armor, Mage Hand, Prestidigitation
- 2/Day Each: Fireball, Invisibility
- 1/Day Each: Cone of Cold, Fly

Bonus Actions

Misty Step (3/Day). The court magician casts Misty Step, using the same spellcasting ability as Spellcasting.

Phase Slip (2/Day). The court magician teleports up to 30 feet to an unoccupied space it can see.

Reactions

Protective Magic (3/Day). Trigger: The court magician is hit by an attack roll. Response: The court magician casts Shield in response, gaining a +5 bonus to AC until the start of its next turn, including against the triggering attack.

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
- Reactions/Protective Magic — the chassis
- Bonus Actions/Misty Step — mage kit; the GM's clause "is never where you struck and steps away"
- Bonus Actions/Phase Slip — library seed phase-slip; binds the GM's words: step

**Engine trace**

```
[route] lurker type=Humanoid mechanics=teleport — lurker: ✓ ("never where you struck") | lurker: no line key in the words — the model's read of its quote
[concept] resolve: archetype=lurker type=Humanoid themes=arcane/uncanny mind=sapient style=— energy=Force mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: teleport
[concept] signature elements: never where the strike lands [behavior] | a courtier's precise, punishing riposte [behavior] | a body of cold iron filings and bearing [body]
[concept] identity: The Court Wizard opens with a precise strike from an unexpected angle, then on every round after spends its action to slip free of the space it last occupied, forcing attackers to chase a target that is never where the blow landed. It treats combat as a duel of positioning: it toys with slower foes, never commits to a stand, and only flees when cornered and bloodied — which, for this creature, means stepping away one last time.
[concept] lore: A vanished court's last magician, its body worn down to iron filings and habit, still paces the ruin of its throne room, stepping out from behind pillars to punish anyone who mistakes stillness for presence.
[reskin] energy withheld: Force on a Humanoid with no Force in the concept's own words (fixed phrases read first)
[reskin] print canon route: the Mage casts and strikes only with magic (Force) — the caster family takes the line from lurker, so the attack bonus and the spell DC key to one stat
[reskin] print canon defenses: HP 84 -> 81, AC 15 -> 15 — the Mage's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 9, DEX 14, CON 11, INT 17, WIS 12, CHA 11 — the Mage's at its own CR; attack +7 -> +6, DC 14 (print's)
[reskin] donor: caster-6 -> CR 6
[reskin] print canon: "a court wizard who is never where you struck and steps away" heads on the Mage — print's rows ride along; the seat stays
[reskin] class kit: Protective Magic — the sheet already carries a row of that name
[reskin] class kit: mage — "a court wizard": Misty Step (3/Day) (Mage/Misty Step)
[reskin] inline declared: "the court magician" — the call's own answer (kind), built from the name
[reskin] inline form: "the court magician" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] lacks not claimed: "is never where you struck and steps away" reads like a lack to the words, and the call's list did not name it
[reskin] clauses: "a court wizard" -> has (descriptive), head | "is never where you struck and steps away" -> has (descriptive)
[reskin] signature idea (action): "The magician's filings scatter and hurl themselves in a whirling, grating storm around a space it can see — a punishing blind of cold iron grit that clings and stings. Anyone caught in the swarm is ground down by a thousand tiny cuts and blinded by filings in the eyes, and it can keep pouring itself into the whirlwind so long as it keeps moving, leaving the storm behind where the strike should hav" [action/always/condition] — menu: thrown-burst, snare, zone, execute, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, snare-bolt, slow-bolt, sensory-strike, herd, thrown-burst-seed, drain, curse-debt, zone-seed, reveal, wind-up, blighted-ground (+ shelf: gaze-single, delayed-brand, lay-on-hands, aggro-curse, self-invisibility, rally, phase-slip, snap-shot, bolt-restrain, bolt-drag, bolt-mark)
[reskin] signature bound to the concept's verb: action — phase-slip (step)
[reskin] fit declined: "Whirling Grit Storm (Recharge 5-6)" — a print body takes only what the user's words ask; neither the call nor the key table finds the GM asking for it (the blacksmith's rally, critic-ten 2026-10-01)
[reskin] value check: "Phase Slip (2/Day)" EV 2.7 vs floor 2.3 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: phase-slip -> Bonus Actions/"Phase Slip (2/Day)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Its body is a walking heap of cold iron filings and bearing, so every blow that lands scatters pieces of it into the attacker's face and gear — and it simply gathers itself back together in the space it steps into. Close strikes leave the striker with filings grinding in their wounds and joints, making each following swing feel rusted and stiff." [trait/on_being_hit/damage] — menu: absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst, evasion)
[reskin] signature bound to the concept's verb: trait — evasion (never where)
[reskin] word match declined by the call: evasion, bloodied-burst, faultless-tracker, bloodied-fury, absorption — the key word does not mean the mechanic here
[reskin] trait declined: "Shrapnel Filings" — bound only on the idea's own words (iron:idea) with no key in the concept; a meat body earns its trait by the user's verb (the sniper's tracker, critic 2026-09-29)
[reskin] concept-first trait skipped: evasion — the call read its match as a collision (the word is a modifier, or the sheet already answers it)
[reskin] weapons answered: Iron Filing = none
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] print canon languages: "Common" -> "Common and any three languages" — the Mage's
[reskin] print canon attack: "Iron Filing" -> "Arcane Burst" — the Mage's own row
[reskin] print canon row: Actions/Spellcasting — print's own list replaces the chassis's
```


---

## Thurivald — in the run

**Concept:** name: Thurivald | a skald who sings his warband into a fury

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Thurivald | 6 (2014) | defender-3-leader | ok | ok | FAIL: lint:duplicate-entry | ok | ok | ok | ok | ok | ok |

- structure · fail · lint:duplicate-entry: Actions/Booming Bellow: identical text to "Rune-Spear" — two names, one ability; rewrite this entry into something distinct
- **dropped clause:** "sings his warband into a fury"
- read: def 4 / off 6 → 5; sustained 42 (2 × Rune-Spear); nova none; dmg 42

```
Thurivald
Medium humanoid, neutral
Armor Class

15 (chain shirt)

Hit Points: 

117 (18d8 + 36)

Speed: 

30 ft.

STR	DEX	CON	INT	WIS	CHA


16 (+3)

	

14 (+2)

	

15 (+2)

	

12 (+1)

	

11 (+0)

	

15 (+2)

Skills: 

Athletics +6, Persuasion +5

Saving Throws: 

CON +5, CHA +5

Senses: 

darkvision 60 ft., passive Perception 10

Languages: 

Common

Challenge

6 (2,300 XP)

Proficiency Bonus:

+3

Aura of Authority. While in a 10-foot-radius sphere originating from Thurivald, Thurivald and its allies have advantage on attack rolls and saving throws, provided Thurivald isn't incapacitated.
Captain's Charm. As a bonus action, Thurivald targets one creature it can see within 30 feet of it. The target must succeed on a DC 14 Wisdom saving throw or be charmed by Thurivald until the start of Thurivald's next turn.
Iron-Verse Fury (2/Day). As a bonus action, Thurivald grants each ally within 30 feet of it 10 (3d6) temporary hit points.

Actions
Multiattack: Thurivald makes two attacks: one with Rune-Spear and one with Booming Bellow.
Rune-Spear: Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 21 (4d8 + 3) piercing damage.
Booming Bellow: Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 21 (4d8 + 3) piercing damage.
```

**Where each row came from**

- Traits/Aura of Authority — the chassis
- Actions/Multiattack — the chassis
- Actions/Rune-Spear — weapon spear
- Actions/Booming Bellow — the chassis
- Bonus Actions/Captain's Charm — bard kit; the GM's clause "Thurivald — a skald"
- Bonus Actions/Iron-Verse Fury — template rally; library draw (seed unstamped); binds the GM's words: bellows

**Engine trace**

```
[route] defender-leader type=Humanoid mechanics=aura — defender-leader: ✓ ("sings his warband into a fury") | defender-leader: no line key in the words — the model's read of its quote
[concept] resolve: archetype=defender type=Humanoid themes=voice/armed mind=sapient style=leader energy=Thunder mix=both identity=✓ lore=✓
[concept] name: provided "Thurivald"
[concept] mechanics: aura
[concept] signature elements: war-chant that quickens allies [behavior] | rune-scored iron spear [object] | aura of fierce authority [aura]
[concept] identity: Thurivald opens by planting his banner and unleashing a thunderous war-chant that quickens his warband's blood, then wades into melee beside them, striking with a rune-scored spear and bellowing fresh verses each round to keep their fury at a boil. He fights to the death if his song still holds his warriors, but if the warband breaks he will try to withdraw and rally them — a skald never flees alone while a chorus remains.
[concept] lore: Thurivald is a battle-poet of the frost-marched jarls, who sings the old iron-words that turn fear to fury and wants only to die with a verse on his lips and his warband still standing.
[reskin] energy withheld: Thunder on a Humanoid with no Thunder in the concept's own words (fixed phrases read first)
[reskin] donor: defender-3-leader -> CR 6
[reskin] repair round 1: 1 defect(s) — "Booming Bellow" deals Thunder on a Humanoid whose concept names no Thunder — a name is not a warrant; use a physical type
[reskin] class kit: bard — "Thurivald — a skald": Captain's Charm (Pirate Captain/Captain's Charm); Bolstering Cry yielded to print's row cap 5
[reskin] proper noun: "Thurivald" — the Name field is a person, not a kind (no print match, no article in the words)
[reskin] inline declared: "Thurivald" — the call's own answer (person), built from the name
[reskin] inline form: "Thurivald" — the model's own reading of the name
[reskin] energy withheld on a base row: "Booming Bellow" Thunder -> Piercing (the body's physical type; a Humanoid deals no Thunder its concept never gave it)
[reskin] save dc derived: DC 15 -> 14 (8 + PB 3 + the sheet's best 3) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Thurivald — a skald" -> has (descriptive), head | "sings his warband into a fury" -> has (descriptive)
[reskin] signature idea (action): "Thurivald bellows a verse from the old iron-words, and every ally who can hear him is driven into a killing fury: until the end of their next turn, their weapon strikes bite deeper, tearing flesh with a jagged echo of the chant. The verse costs him his voice for a breath — he cannot bellow again until he has drawn blood or taken a wound, and the fury dies if he stops fighting." [action/always/damage] — menu: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, exploiter (+ shelf: patient-defense, lay-on-hands, second-wind, volley-order, aggro-curse, own-turn-punisher, self-invisibility, rally, snap-shot, riposte, stunning-strike, charge-push, hook-rider)
[reskin] word match declined by the call: terror-pulse — the key word does not mean the mechanic here
[reskin] value check: "Iron-Verse Fury (2/Day)" EV 5.5 vs floor 3.1 (a bonus action (free)) — worth the trade
[reskin] signature template: rally -> Bonus Actions/"Iron-Verse Fury (2/Day)" ("The bellow drives every ally who can hear him into a killing fury, making their  [verb: bellows:idea]")
[reskin] signature idea (trait): "The runes carved down Thurivald's spear are a verse of their own, and they answer every blow they land: each time the spear strikes a foe, a fragment of the chant clings to the wound, leaving the next ally to strike that same foe fighting through a hymn of iron that makes their weapon feel lighter and truer." [trait/always/damage] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending, weapon-lodge)
[reskin] signature bound to the concept's verb: trait — bloodied-fury (fury)
[reskin] word match declined by the call: bloodied-fury, bloodied-burst, resonant-body, marking-light, faultless-tracker, relentless-pursuit, guarded-stance, berserk — the key word does not mean the mechanic here
[reskin] key match declined: trait — "bloodied-fury" was ranked first on the call's own menu for fury, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: trait — "The runes carved down Thurivald's spear are a verse of their own, and they answer every blow they land: each time the spear strikes a foe, a fragment of the chant clings to the wound, leaving the next ally to strike that same foe fighting through a hymn of iron that makes their weapon feel lighter and truer." [trait/always/damage] — the model found no template that holds it (offered: bloodied-fury, false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, bloodied-burst, resonant-body)
[reskin] weapons answered: Rune-Spear = spear; Booming Bellow = none; Rally the Warband = none
[reskin] languages by mind: "Common plus two languages" -> "Common" (sapient)
[reskin] row narrowed: "Booming Bellow" names nothing that can be thrown — the range leaves (print dresses only a thrown weapon in "Melee or Ranged")
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---

## Unseen Blade — in the run

**Concept:** a ninja who moves through the shadows and strikes unseen

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Unseen Blade | 5 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 3 / off 5 → 4; sustained 34 (2 × Garrote); nova none; dmg 34

```
Unseen Blade

Medium Humanoid, Lawful Neutral

AC 16
Initiative +3 (13)

HP 91 (14d8 + 28)

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

Skills Perception +4, Stealth +9

Senses darkvision 60 ft.; Passive Perception 14

Languages Common

CR 5 (XP 1,800; PB +3)

Traits

Evasion. If the unseen blade is subjected to an effect that allows it to make a Dexterity saving throw to take only half damage, the unseen blade instead takes no damage if it succeeds on the save and only half damage if it fails. It can't use this trait if it has the Incapacitated condition.

Assassinate. During the first round of each combat, the unseen blade has Advantage on attack rolls against any creature that hasn't taken a turn. If the unseen blade hits a creature during that round, the target takes an extra 9 (2d8) Slashing damage.

Shadowstep. The unseen blade ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Actions

Multiattack. The unseen blade makes two attacks, using Garrote or Shuriken in any combination.

Garrote. Melee Attack Roll: +6, reach 5 ft. 17 (4d6 + 3) Slashing damage.

Shuriken. Ranged Attack Roll: +6, range 20/60 ft. 16 (3d8 + 3) Piercing damage.

Bonus Actions

Cunning Action. The unseen blade takes the Dash, Disengage, or Hide action.

Silent Execution (1/Day). Immediately after dealing damage to a creature that is already Bloodied, the unseen blade moves up to half its Speed, and it makes one Garrote attack.

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

- Traits/Evasion — template evasion; library draw (seed unstamped)
- Traits/Assassinate — template assassinate; library draw (seed unstamped); binds the GM's words: unseen
- Traits/Shadowstep — the chassis
- Actions/Multiattack — the chassis
- Actions/Garrote — the chassis
- Actions/Shuriken — the chassis
- Bonus Actions/Cunning Action — the chassis
- Bonus Actions/Silent Execution — library seed rampage

**Engine trace**

```
[route] skirmisher-skulker type=Humanoid mechanics=none — skirmisher-skulker: ✓ ("moves through the shadows and strikes un") | skirmisher-skulker: key "unseen" (class verb)
[concept] resolve: archetype=skirmisher type=Humanoid themes=terror/uncanny mind=sapient style=skulker energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: strikes unseen from shadows [behavior] | vanishes into darkness [behavior] | ninja tools and weapons [object]
[concept] identity: The Shadowblade is a ninja who melts into darkness, strikes from concealment, and is gone before the wound registers. It opens with a thrown poisoned shuriken or a garrote from the shadows, then fades and repositions, using hit-and-run tactics to never be cornered. Under pressure, it becomes a ghost of the battlefield, fighting only when it must and vanishing into shadow the moment blood is drawn.
[concept] lore: Trained in a hidden mountain monastery where initiates are blindfolded in lightless caverns until they become one with the dark, the Shadowblade now sells its silent art to warlords and thieves' guilds, seeking the perfect kill that will erase its own name from memory.
[reskin] donor: skirmisher-3-skulker -> CR 5
[reskin] row gated out: Ranged Save Effect (gaze) — the concept did not claim this mechanic
[reskin] row gated out: Teleport (teleport) — the concept did not claim this mechanic
[reskin] repair round 1: 1 defect(s) — rename for "Signature Slot" copies the prompt's own example "Dreadful Glare" — the example shows the register, never the name
[reskin] inline declared: "the unseen blade" — the call's own answer (kind), built from the name; the rules would have said "Blade"
[reskin] inline on kit rows: "Blade" -> "the unseen blade"
[reskin] inline form: "the unseen blade" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] lacks refused: "no magic at all" quotes nothing the user typed
[reskin] lacks refused: "cannot be seen" quotes nothing the user typed
[reskin] clauses: "a ninja" -> has (descriptive), head | "moves through the shadows" -> has (descriptive) | "strikes unseen" -> has (mechanical)
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "When the unseen blade strikes a foe, it can instantly slide into any shadow within a short distance, using the target's own darkness as a doorway. This lets it vanish from the foe's guard and reappear in a patch of shadow it can see, keeping the fight always on its terms." [rider/on_hit/movement] — menu: affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, isolation, bolt-mark (+ shelf: leap, gaze-single, snare, throw-retrieve, shield-bash, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte)
[reskin] signature bound to the concept's verb: action — self-invisibility (unseen)
[reskin] key match declined: action — "self-invisibility" was ranked first on the call's own menu for unseen, and the call read it as no fit; the words keep their claim and nothing is forced
[reskin] signature miss: action — "When the unseen blade strikes a foe, it can instantly slide into any shadow within a short distance, using the target's own darkness as a doorway. This lets it vanish from the foe's guard and reappear in a patch of shadow it can see, keeping the fight always on its terms." [rider/on_hit/movement] — the model found no template that holds it (offered: self-invisibility, affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, isolation, bolt-mark)
[reskin] fallback respects the call: self-invisibility left the shelf — the call declined it for this sheet
[reskin] fallback skipped: phase-slip (the sheet cannot render it)
[reskin] fallback skipped by the floor: gaze-single (EV 2.5 vs 9.4)
[reskin] fallback skipped by the floor: sensory-strike (EV 2.5 vs 9.4)
[reskin] fallback skipped by the floor: disarm (EV 0 vs 9.4)
[reskin] value check: "Rampage (1/Day)" EV 15.2 vs floor 2.9 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: rampage -> Bonus Actions/"Rampage (1/Day)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The unseen blade can mark a victim with a hidden shuriken, binding that foe's shadow to its own. While the mark lasts, the unseen blade always knows the direction to the marked creature and can move through shadows toward it without being slowed." [trait/always/movement] — menu: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] signature bound to the concept's verb: trait — assassinate (unseen)
[reskin] word match declined by the call: relentless-pursuit — the key word does not mean the mechanic here
[reskin] seat default: skulker owes assassinate by print — it seats before the idea
[reskin] signature template (trait): assassinate -> Traits/"Assassinate" ("the seat owes it by print")
[reskin] seat default: skulker owes evasion by print — it seats before the idea
[reskin] signature template (trait): evasion -> Traits/"Evasion" ("the seat owes it by print")
[reskin] trait declined: "Shadowed Quarry" — bound only on the idea's own words (always knows:idea, direction to:idea, marked:idea) with no key in the concept; a meat body earns its trait by the user's verb (the sniper's tracker, critic 2026-09-29)
[reskin] weapons answered: Garrote = none; Shuriken = none
[reskin] weapon table: "Shuriken" — range 30/90 ft. is not a print range; an unlisted thrown thing is 20/60, a hurled mass 60/240 (the critic's third species read)
[reskin] speed by body: a Humanoid walks 30 ft. (print's people; a hermit ran 50 — critic's audit 2026-10-02)
[reskin] speed by concept:  — the concept's movement set decides
[reskin] languages by mind: "None" -> "Common" (sapient)
audit finding below confidence gate: Shadowstep Lowercase 'and' after the comma breaks sentence capitalization rules in statblock prose.
[reskin] audit rename: "Rampage (1/Day)" -> "Silent Execution (1/Day)"
```


---

## Bone-Labyrinth Reaver — in the run

**Concept:** a minotaur reaver who herds prey into the maze

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Bone-Labyrinth Reaver | 6 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 4 / off 6 → 5; sustained 40 (2 × Cudgel); nova none; dmg 40

```
Bone-Labyrinth Reaver

Large Monstrosity, Neutral

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

Senses darkvision 60 ft., tremorsense 30 ft.; Passive Perception 13

Languages Common

CR 6 (XP 2,300; PB +3)

Traits

Bloodied Frenzy. While Bloodied, the reaver has Advantage on attack rolls and saving throws.

Actions

Multiattack. The reaver makes two Cudgel attacks.

Cudgel. Melee Attack Roll: +7, reach 10 ft. 13 (2d8 + 4) Bludgeoning damage plus 7 (2d6) Psychic damage.

Bonus Actions

Charge. The reaver moves up to half its Speed straight toward an enemy it can see.

Rampage (1/Day). Immediately after dealing damage to a creature that is already Bloodied, the reaver moves up to half its Speed without provoking Opportunity Attacks, and it makes one Cudgel attack.

Labyrinth Thrum. Wisdom Saving Throw: DC 14, each creature of the reaver's choice within 30 feet. Failure: The target immediately moves up to half its Speed in a direction of the reaver's choice, using the safest available route.

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
- Actions/Cudgel — weapon greatclub
- Bonus Actions/Charge — minotaur kit; the GM's clause "a minotaur reaver"
- Bonus Actions/Rampage — template rampage; barbarian kit; the GM's clause "a minotaur reaver"
- Bonus Actions/Labyrinth Thrum — template herd; library draw (seed unstamped); binds the GM's words: herd
- Traits/Bloodied Frenzy — barbarian kit; the GM's clause "a minotaur reaver"

**Engine trace**

```
[route] brute type=Monstrosity mechanics=none — brute-charger: ✓ ("herds prey into the maze") | brute-charger: no line key in the words — the model's read of its quote | brute-charger -> brute: a charger is a mechanic engine and needs a key in the words — the model's read of its quote cannot land it
[concept] name: provided_name rejected — "minotaur reaver who herds prey into the …" is the description, not a name
[concept] resolve: archetype=brute type=Monstrosity themes=subterranean/terror mind=sapient style=— energy=Psychic mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: herding prey into the maze [behavior] | bone-plated hide [body] | psychic bellow [aura]
[concept] identity: The minotaur reaver opens by slamming its bone-cudgel into the ground, sending a psychic thrum through the tunnels that compels prey toward the deepest maze. Every round after, it advances with relentless horns and cudgel, never breaking stride, using its bulk to block escapes and its bellow to disorient. Under pressure it does not flee; it fights to the death, preferring to crush skulls against the walls of its own labyrinth.
[concept] lore: Born from the marrow of a forgotten minotaur king and the lingering anguish of his victims, this bone-clad reaver haunts the maze it built from their skeletons, eternally herding the living toward a heart of psychic torment.
[reskin] donor: brute-5 -> CR 6
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] species kit: minotaur — "a minotaur reaver": Charge (Troll/Charge); darkvision 60 ft.
[reskin] class kit: barbarian — "a minotaur reaver": Bloodied Frenzy (Berserker/Bloodied Frenzy), Rampage (1/Day) (rampage)
[reskin] inline declared: "the reaver" — the call's own answer (kind), built from the name
[reskin] inline form: "the reaver" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a minotaur reaver" -> has (descriptive), head | "herds prey into the maze" -> has (descriptive)
[reskin] extraction: 6 of 11 model clauses quote nothing the user typed and leave the record ("advances with relentless horns and cudgel", "never breaking stride", "using its bulk to block escapes", …)
[reskin] signature idea (action): "The reaver slams its cudgel into the ground, sending a deep psychic thrum through the tunnels. Creatures that can hear it feel a pull toward the reaver, drawing them closer and disorienting them so they cannot easily flee. This power works once per fight, and the reaver uses it to break up a group and force them into the maze's deeper passages." [rider/on_hit/movement] — menu: stunning-strike, charge-push, hook-rider, pounce (+ shelf: trample, leap, thrown-burst, throw-retrieve, shield-bash, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating)
[reskin] signature bound to the concept's verb: action — herd (herd)
[reskin] value check: "Labyrinth Thrum (2/Day)" EV 8.2 vs floor 35.5 (the whole Multiattack (2 attacks)) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature re-slotted: "Labyrinth Thrum" moves to a bonus action — EV 8.2 vs floor 3.4 there; the GM's verb keeps its row
[reskin] signature template: herd -> Bonus Actions/"Labyrinth Thrum" ("the deep psychic thrum physically draws creatures toward the reaver, moving them [verb: herd:concept]")
[reskin] keys spent by the action: herd
[reskin] signature idea (trait): "The reaver's body is a lattice of fused bone that traps psychic echoes. Whenever a creature strikes it in melee, splinters of bone fly back and the attacker's mind is jolted by the pain they inflicted, leaving them briefly unable to act. The reaver cannot be disarmed or grappled by conventional means, as its bone-plated hide shifts and locks." [trait/on_being_hit/condition] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] word match declined by the call: heated-body, sealed-body, weapon-lodge, shielded-mind — the key word does not mean the mechanic here
[reskin] trait declined: "Bone Echo Reversal" — a shape fit with no verb match on a Monstrosity body; a meat body earns its trait by a verb
[reskin] weapons answered: Cudgel = greatclub
[reskin] weapon declared: "Cudgel" is a greatclub — the call's own answer (the name alone read club)
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] vulnerability rejected — "Thunder" has no warrant in the concept's own text (print's default is none)
```


---

## Broken Wall Sentinel — in the run

**Concept:** a knight-errant of the fallen order who shields the weak

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Broken Wall Sentinel | 7 | defender-5 | ok | ok | FAIL: lint:duplicate-entry | ok | ok | ok | ok | ok | ok |

- structure · fail · lint:duplicate-entry: Actions/Sword Strike: identical text to "Longsword" — two names, one ability; rewrite this entry into something distinct
- read: def 6 / off 8 → 7; sustained 52 (2 × Longsword); nova none; dmg 52

```
Broken Wall Sentinel

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

Aura of Authority. While in a 10-foot Emanation originating from the sentinel, the sentinel and its allies have Advantage on attack rolls and saving throws, provided the sentinel doesn't have the Incapacitated condition.

Actions

Multiattack. The sentinel makes two attacks, using Longsword or Sword Strike in any combination. It can replace one attack with a use of Creeping Dread.

Longsword. Melee Attack Roll: +7, reach 5 ft. 26 (5d8 + 4) Slashing damage.

Sword Strike. Melee Attack Roll: +7, reach 5 ft. 26 (5d8 + 4) Slashing damage.

Creeping Dread. Wisdom Saving Throw: DC 15, one creature within 60 feet. Failure: The target has the Frightened condition until the end of the sentinel's next turn. If the target was already Frightened by this ability, it also takes 24 (7d6) Psychic damage.

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

- Traits/Aura of Authority — paladin kit; the GM's clause "a knight-errant of the fallen order"
- Actions/Multiattack — the chassis
- Actions/Longsword — weapon longsword
- Actions/Sword Strike — weapon longsword
- Actions/Creeping Dread — library seed escalating-dread

**Engine trace**

```
[route] defender type=Humanoid mechanics=none — defender: ✓ ("shields the weak") | defender: key "knight" (class verb)
[concept] resolve: archetype=defender type=Humanoid themes=armed/forged mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: shielding the weak with its own body [behavior] | iron-plated armor and shield [body] | punishing those who try to slip past [behavior]
[concept] identity: The Last Shield of the Fallen Order plants itself between danger and the helpless, its iron body a living barricade. Every round it weathers blows meant for others, then answers with a shield bash that hurls the attacker back and a longsword strike that punishes any who dare slip past. It fights to the death with grim patience, never fleeing while a single charge remains under its guard.
[concept] lore: When the Order of the Broken Wall fell, its last knight swore to stand sentinel over the ruins and any who seek refuge there, bound to iron and duty until the world remembers what it means to be shielded.
[reskin] donor: defender-5 -> CR 7
[reskin] row gated out: Guard Aura (aura) — the concept did not claim this mechanic
[reskin] repair round 1: 1 defect(s) — rename for "Hybrid Attack" takes the shelf's own row name "Shield Bash" — that name belongs to a template this sheet may still receive; choose another
[reskin] class kit: paladin — "a knight-errant of the fallen order": Aura of Authority (Hobgoblin Captain/Aura of Authority)
[reskin] inline declared: "the sentinel" — the call's own answer (kind), built from the name
[reskin] inline form: "the sentinel" — the model's own reading of the name
[reskin] save dc derived: DC 14 -> 15 (8 + PB 3 + the sheet's best 4) — no stat on the sheet reached it
[reskin] damage type by the row's own noun: "Sword Strike" Bludgeoning -> Slashing
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a knight-errant of the fallen order" -> has (descriptive), head | "shields the weak" -> has (descriptive)
[reskin] signature idea (action): "The sentinel slams its shield into an attacker and drives it backward, then steps into the space it leaves. This interposes the sentinel between the attacker and the sentinel's allies, forcing the attacker to deal with the sentinel to get past. It can only do this when an enemy is close enough to threaten its charges, so it is the answer to someone slipping through the line." [reaction/on_being_hit/movement] — menu: snap-shot, riposte (+ shelf: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, stunning-strike, charge-push, hook-rider)
[reskin] signature bound to the concept's verb: action — rally (shield, orders)
[reskin] word match declined by the call: shield-bash, push-prone, riposte, own-turn-punisher — the key word does not mean the mechanic here
[reskin] key match declined: action — "rally" was ranked first on the call's own menu for shield+orders, and the call read it as no fit; the words keep their claim and nothing is forced
[reskin] signature miss: action — "The sentinel slams its shield into an attacker and drives it backward, then steps into the space it leaves. This interposes the sentinel between the attacker and the sentinel's allies, forcing the attacker to deal with the sentinel to get past. It can only do this when an enemy is close enough to threaten its charges, so it is the answer to someone slipping through the line." [reaction/on_being_hit/movement] — the model found no template that holds it (offered: rally, snap-shot, riposte, herd, shield-bash, push-prone, own-turn-punisher)
[reskin] fallback respects the call: rally, push-prone, own-turn-punisher left the shelf — the call declined them for this sheet
[reskin] fallback skipped by the floor: herd (EV 9.8 vs 42.3)
[reskin] fallback skipped by the floor: disarm (EV 0 vs 13)
[reskin] fallback skipped by the floor: terror-pulse (EV 27.5 vs 42.3)
[reskin] value check: "Creeping Dread" EV 16.6 vs floor 13 (one attack of 2) — dice 13 → 24
[reskin] library seed drawn: escalating-dread -> Actions/"Creeping Dread" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The sentinel's iron-plated armor and shield turn aside blows meant for those under its guard. When an ally within its aura would be hit, the sentinel can take the hit itself instead, weathering the damage on its own body. It can only do this so many times before its armor buckles, but it never hesitates to spend its own protection for a charge." [trait/always/defense] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending, weapon-lodge)
[reskin] signature miss: trait — "The sentinel's iron-plated armor and shield turn aside blows meant for those under its guard. When an ally within its aura would be hit, the sentinel can take the hit itself instead, weathering the damage on its own body. It can only do this so many times before its armor buckles, but it never hesitates to spend its own protection for a charge." [trait/always/defense] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, resonant-body)
[reskin] weapons answered: Longsword = longsword; Shield Bash = shield
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] multiattack replacement clause: It can replace one attack with a use of Creeping Dread.
audit finding below confidence gate: Aura of Authority The trait grants the sentinel Advantage on saving throws without any qualifier excluding itself from the aura's center or clarifying whether 'its allies' includes the sentinel redundantly; combined with 'the sentinel and its allies', the sentinel is listed twice, making the sentence grammatically circular and the affected set unclear to a GM.
[reskin] row narrowed: "Sword Strike" is a melee weapon by name — the hybrid range leaves
```


---

## Bellcount Cutpurse — in the run

**Concept:** a tabaxi cutpurse who slips through the market crowd

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Bellcount Cutpurse | 3 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- **dropped clause:** "slips through the market crowd"
- read: def 1 / off 3 → 2; sustained 24 (2 × Bone-handled Blade); nova none; dmg 24

```
Bellcount Cutpurse

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

Languages Common

CR 3 (XP 700; PB +2)

Traits

Crowd Slipper. The cutpurse ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Actions

Multiattack. The cutpurse makes two attacks, using Bone-handled Blade or Dart in any combination.

Bone-handled Blade. Melee Attack Roll: +5, reach 5 ft. 12 (2d8 + 3) Slashing damage.

Dart. Ranged Attack Roll: +5, range 20/60 ft. 10 (2d6 + 3) Piercing damage.

Bonus Actions

Cunning Action. The cutpurse takes the Dash, Disengage, or Hide action.

Opportunistic Slash (1/Day). Immediately after dealing damage to a creature that is already Bloodied, the cutpurse moves up to half its Speed, and it makes one Bone-handled Blade attack.

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

- Traits/Crowd Slipper — the chassis
- Actions/Multiattack — the chassis
- Actions/Bone-handled Blade — weapon scimitar
- Actions/Dart — weapon dart
- Bonus Actions/Cunning Action — the chassis
- Bonus Actions/Opportunistic Slash — library seed rampage

**Engine trace**

```
[route] skirmisher-skulker type=Humanoid mechanics=none — skirmisher-skulker: ✓ ("slips through the market crowd") | skirmisher-skulker: no line key in the words — the model's read of its quote
[concept] resolve: archetype=skirmisher type=Humanoid themes=grasping/uncanny mind=sapient style=skulker energy=Poison mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: slipping through market crowds [behavior] | concealed bone-handled blade [object] | vanishing into cover after the strike [behavior]
[concept] identity: The tabaxi cutpurse shadows the flow of market-day traffic, drifting between carts and shoulders until it finds a purse worth slicing. When it strikes, it slips a bone-handled blade between ribs, snatches the loot, then melts back into the crowd — it never holds ground, using bodies as cover and alleys as escape routes. Wounded, it breaks contact and vanishes, preferring to bleed out of sight than fight a fair loser's brawl.
[concept] lore: Born into the teeming bazaars of a trade-city where a quick paw means a full belly, this tabaxi cutpurse has turned pickpocketing into a predatory art, seeing every crowd as a moving forest of prey.
[reskin] energy withheld: Poison on a Humanoid with no Poison in the concept's own words (fixed phrases read first)
[reskin] donor: skirmisher-3-skulker -> CR 3
[reskin] row gated out: Ranged Save Effect (gaze) — the concept did not claim this mechanic
[reskin] row gated out: Teleport (teleport) — the concept did not claim this mechanic
[reskin] species kit: Cat's Dash — "Cunning Action" already grants Dash; one mechanic, one row
[reskin] species kit: tabaxi — "a tabaxi cutpurse": header lines only; Climb 30 ft.; darkvision 60 ft.
[reskin] class kit: Cunning Action — the sheet already carries a row of that name
[reskin] class kit: rogue — "a tabaxi cutpurse": nothing landed; Evasion yielded to print's row cap 4
[reskin] inline declared: "the cutpurse" — the call's own answer (kind), built from the name
[reskin] inline form: "the cutpurse" — the model's own reading of the name
[reskin] save dc derived: DC 12 -> 13 (8 + PB 2 + the sheet's best 3) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a tabaxi cutpurse" -> has (descriptive), head | "slips through the market crowd" -> has (descriptive)
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "It ducks behind a cart, a fruit stand, or a broad-shouldered merchant and vanishes into the press of bodies. Everyone nearby loses track of exactly where it is until it wants to be seen again — and when it reappears, it does so right at someone's back, blade already moving. The crowd itself is its accomplice: shoppers, porters, and oxen keep ending up where the cutpurse needs them, and no one can " [action/always/movement] — menu: leap, gaze-single, snare, throw-retrieve, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed (+ shelf: delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte, affliction, contagion, charge-push, hook-rider, pounce, isolation, bolt-mark)
[reskin] signature bound to the concept's verb: action — feint-slip (slip)
[reskin] word match declined by the call: feint-slip — the key word does not mean the mechanic here
[reskin] value check: "Press Vanish (1/Day)" EV 0 vs floor 2 (a bonus action (free)) — a free row that does nothing (logged)
[reskin] signature dropped by the floor: "Press Vanish (1/Day)" — the ladder could not lift it; the fallback stands in
[reskin] fallback respects the call: feint-slip left the shelf — the call declined it for this sheet
[reskin] fallback skipped: phase-slip (the sheet cannot render it)
[reskin] fallback skipped by the floor: sensory-strike (EV 1.7 vs 6.2)
[reskin] fallback skipped by the floor: disarm (EV 0 vs 6.2)
[reskin] value check: "Rampage (1/Day)" EV 10.1 vs floor 2 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: rampage -> Bonus Actions/"Rampage (1/Day)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The blade isn't carried in a sheath. It's palmed, taped along the forearm, or hidden in a fold of cloth, so the cutpurse can be searched, jostled, or even disarmed of obvious weapons and still come up with the bone-handled knife. People who close in expecting an unarmed pickpocket find out otherwise." [trait/always/defense] — menu: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] word match declined by the call: assassinate, false-appearance — the key word does not mean the mechanic here
[reskin] signature miss: trait — "The blade isn't carried in a sheath. It's palmed, taped along the forearm, or hidden in a fold of cloth, so the cutpurse can be searched, jostled, or even disarmed of obvious weapons and still come up with the bone-handled knife. People who close in expecting an unarmed pickpocket find out otherwise." [trait/always/defense] — the model found no template that holds it (offered: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] seat owes nothing: the skulker line was the model's read of its quote, not a key in the words (a hermit was handed Assassinate, day-one 2026-09-30)
[reskin] weapons answered: Bone-handled blade = dagger; Dart = dart
[reskin] weapon refitted to the array: "Bone-handled Blade" read longsword, but the row's +5 is DEX 3 + PB 2 — a scimitar is the finesse slashing weapon
[reskin] weapon table: "Dart" — thrown, range 20/60
[reskin] speed by body: a Humanoid walks 30 ft. (print's people; a hermit ran 50 — critic's audit 2026-10-02)
[reskin] speed by concept:  — the concept's movement set decides
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] attack name by anatomy: "Bone-handled Blade" -> "Bone-handled Blade" — blade deals Slashing, not Piercing
[reskin] audit rename: "Rampage (1/Day)" -> "Opportunistic Slash (1/Day)"
```
