# Review batch — classes-eight-2026-10-19T23-08-24

The checker ran first. The gate table covers every block in the run; every block of the run follows. Each block carries its checker row above and its engine trace below. Hand-derive against the row first; then read for what predicates can't see.

## Gate table — the whole run

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Openscale Adept | 5 | 2024 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 6/6 |
| Sable Rook | 5 | 2024 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 5/5 |
| Dame Oriel | 5 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |
| Sergeant Vael | 6 (2014) | 2014 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |
| Shame-Bitten Colossus | 8 | 2024 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 5/5 |
| Vareth Solmane | 6 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |
| Mace Warden | 4 | 2024 | defender-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 2/2 |
| Vacant Courtier | 6 | 2024 | caster-6 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/6 |
| Thurivald | 6 (2014) | 2014 | defender-5 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok | ok | soft (1) | 1/1 | 5/5 |
| Oathbind Templar | 8 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 5/5 |
| Shadow Shinobi | 5 | 2024 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/2 | 5/5 |
| Hollowmere Packwolf | 3 | 2024 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 2/2 |
| Gritpick Ledgerling | 4 | 2024 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 4/4 |
| Brutal Tormentor | 6 | 2024 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 2/3 |
| Ser Evander Loft | 7 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 4/4 |

**Dropped 5 of 18 user clauses** (coverage 72%); concept share 95% (61/64 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- none



---

## Hollowmere Packwolf — lowest CR

**Concept:** a dire wolf that hunts in a pack

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Hollowmere Packwolf | 3 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- **dropped clause:** "hunts in a pack"
- read: def 1 / off 3 → 2; sustained 24 (2 × Bite); nova none; dmg 24

```
Hollowmere Packwolf

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

Pack Tactics. The packwolf has Advantage on an attack roll against a creature if at least one of the packwolf's allies is within 5 feet of the creature and the ally doesn't have the Incapacitated condition.

Actions

Multiattack. The packwolf makes two Bite attacks.

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
[concept] resolve: archetype=skirmisher type=Beast themes=bestial/grasping mind=bestial style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: pack-flanking hunt in formation [behavior] | hamstring-and-harry bites to bring prey down [behavior] | thick shaggy dire-wolf hide and bone-crushing jaws [body]
[concept] identity: The dire wolf opens by circling in loose formation with its pack, one wolf darting at the flank to break the prey's guard while the others angle toward the hamstring. Every round after that it snaps in for a bite, gives ground before a counterblow, and resets the pack's noose — it never trades hits standing still. When bloodied it does not flee alone; the whole pack pulls back as a unit, harrying the pursuit until the hunters tire, then pours back in to finish what staggers.
[concept] lore: These oversize wolves run the old game trails at the edge of settled land, bred big by generations of feeding on shepherds' flocks and the shepherds who chased them, and the pack's hunger always aims at the strongest animal in the herd.
[reskin] print canon array: STR 17, DEX 16, CON 15, INT 3, WIS 12, CHA 7 — the Dire Wolf's, DEX fitted to +5
[reskin] donor: skirmisher-3 -> CR 3
[reskin] [path] decides: twist on the Dire Wolf (the matcher agrees)
[reskin] print canon: "a dire wolf that hunts in a pack" heads on the Dire Wolf — print's rows ride along; the seat stays
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline declared: "the packwolf" — the call's own answer (kind), built from the name
[reskin] inline form: "the packwolf" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a dire wolf" -> has (descriptive), head | "hunts in a pack" -> has (descriptive)
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The packwolf singles out one foe it can see and drives the pack's hunt onto that prey, calling the rest of its kind onto the same target. Until the target shakes the pack's pursuit or the wolf's attention breaks, every wolf in the pack fights savagely harder against that creature, biting deeper and hemming it from more sides at once. The packwolf can only mark one quarry at a time, and it must be " [action/always/damage] — menu: trample, leap, gaze-single, snare, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed (+ shelf: delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, riposte, affliction, contagion, charge-push, hook-rider, pounce, isolation, charge)
[reskin] signature bound to the concept's verb: action — focus (hunt)
[reskin] decline reason: action — the call answered none and names it "no_fit" after being shown focus, which the GM's words keyed
[reskin] key match declined: action — "focus" was ranked first on the call's own menu for hunt, and the call read it as no fit; the words keep their claim and nothing is forced
[reskin] signature miss: action — "The packwolf singles out one foe it can see and drives the pack's hunt onto that prey, calling the rest of its kind onto the same target. Until the target shakes the pack's pursuit or the wolf's attention breaks, every wolf in the pack fights savagely harder against that creature, biting deeper and hemming it from more sides at once. The packwolf can only mark one quarry at a time, and it must be " [action/always/damage] — the model found no template that holds it (offered: focus, trample, leap, gaze-single, snare, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, aggro-curse, isolation)
[reskin] fallback respects the call: focus left the shelf — the call declined it for this sheet
[reskin] fallback stands down: the twist path has no shelf — the Dire Wolf's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 15 already beats print's 13 at CR 3, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "Its shaggy hide and heavy frame absorb glancing blows, and its bone-crushing jaws latch on and shake when it lands a bite, worrying the wound and dragging the prey off its feet's surety. A creature bitten by the packwolf finds its footing stolen and its guard torn open for the rest of the pack." [trait/always/condition] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature bound to the concept's verb: trait — faultless-tracker (hunts, hunted)
[reskin] word match declined by the call: faultless-tracker, aberrant-ground, bloodied-fury, guarded-stance, absorption, bloodied-burst, relentless-pursuit — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "collision" after being shown faultless-tracker, which the GM's words keyed
[reskin] key match declined: trait — "faultless-tracker" was ranked first on the call's own menu for hunts+hunted, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: trait — "Its shaggy hide and heavy frame absorb glancing blows, and its bone-crushing jaws latch on and shake when it lands a bite, worrying the wound and dragging the prey off its feet's surety. A creature bitten by the packwolf finds its footing stolen and its guard torn open for the rest of the pack." [trait/always/condition] — the model found no template that holds it (offered: faultless-tracker, false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst, absorption, bloodied-burst)
[reskin] concept-first trait skipped: faultless-tracker — the call read its match as a collision (the word is a modifier, or the sheet already answers it)
[reskin] weapons answered: Bite = none
[reskin] languages held: None stands — INT 3 on a Beast speaks nothing, whatever the mind read said
[reskin] print canon trait: Pack Tactics — "a dire wolf that hunts in a pack" is the Dire Wolf (print's own row)
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the seat's, not the Dire Wolf's
[reskin] print canon: chassis row leaves — Traits/"Pack Circle" is the seat's, not the Dire Wolf's
```


---

## Oathbind Templar — highest CR

**Concept:** an oathsworn crusader who smites the unclean and mends her soldiers

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Oathbind Templar | 8 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 7 / off 8 → 7.5; sustained 54 (2 × Longsword); nova none; dmg 54

```
Oathbind Templar

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

Aura of Authority. While in a 10-foot Emanation originating from the oathbind templar, the oathbind templar and its allies have Advantage on attack rolls and saving throws, provided the oathbind templar doesn't have the Incapacitated condition.

Actions

Multiattack. The oathbind templar makes two Longsword attacks. It can replace one attack with a use of Shield Bash.

Longsword. Melee Attack Roll: +8, reach 5 ft. 27 (5d8 + 5) Slashing damage.

Shield Bash. Strength Saving Throw: DC 16, one creature within 5 feet that the oathbind templar can see. Failure: 27 (6d8) Bludgeoning damage. If the target is a Medium or smaller creature, it has the Prone condition. Success: Half damage only.

Bonus Actions

Lay on Hands (2/Day). The oathbind templar touches a creature within 5 feet of itself and restores 27 (6d8) Hit Points to it.

Divine Smite (2/Day). The oathbind templar charges its next strike: the first time it hits with an attack before the end of its next turn, the target takes an extra 14 (4d6) Radiant damage.

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
- Actions/Multiattack — the chassis
- Actions/Longsword — print's own row, renamed; weapon longsword
- Actions/Shield Bash — print's own row
- Bonus Actions/Lay on Hands — template lay-on-hands; paladin kit; the GM's clause "mends her soldiers"
- Bonus Actions/Divine Smite — template coating; paladin kit; the GM's clause "smites the unclean"; energy Radiant

**Engine trace**

```
[path] class_npc — class paladin — "crusader" (call)
[route] caster-warpriest (artillery) type=Humanoid mechanics=none — casts: implied by the kind — "smites the unclean and mends her soldier" | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | caster-warpriest: ✓ ("smites the unclean and mends her soldier") | caster-warpriest: key "smites" (class verb)
[concept] hints: warpriest→style ✓ ("armored battle-cleric who smites")
[concept] resolve: archetype=caster type=Humanoid themes=armed/celestial mind=sapient style=warpriest energy=Radiant mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: smiting the unclean with holy energy [behavior] | mending wounded soldiers mid-battle [behavior] | riveted iron plate and war-mace [object]
[concept] identity: A war-priest in riveted iron plate strides into the unclean line, calling down radiant judgment on each smite before turning her mace on the next; between hammer-blows she breathes a battlefield benediction over nearby soldiers, sealing their wounds in iron-hard faith. She never leaves a formation she has sworn to hold — she fights to the death, and the corpses she makes only carry her prayer further.
[concept] lore: Once a rank-and-file templar, she swore her oath over the grave of her slaughtered company, and now she sells her mace-arm and battlefield blessings to any crusade that will point her at the unclean.
[reskin] energy withheld: Radiant on a Humanoid with no Radiant in the concept's own words (fixed phrases read first)
[reskin] [path] class body: the paladin stands on the Gladiator — the class's own print block, nearest CR 8
[reskin] print canon route: the Gladiator is not a caster first and keys STR 18 over DEX 15 — it casts no spells — the caster family stands down for the plain defender line
[reskin] print canon array: STR 20, DEX 15, CON 16, INT 10, WIS 12, CHA 15 — the Gladiator's, STR fitted to +8
[reskin] donor: defender-5 -> CR 8
[reskin] style unserved: "warpriest" has no defender line — the plain line ships (resolve's style signal is noisy; not re-routed)
[reskin] row gated out: Guard Aura (aura) — the concept did not claim this mechanic
[reskin] [path] decides: class_npc on the Gladiator · class paladin (the matcher would have said homebrew)
[reskin] print canon: "an oathsworn crusader who smites the unclean and mends her soldiers" heads on the Gladiator — print's rows ride along; the seat stays
[reskin] name_element answered: Radiant Judgment = literal
[reskin] kit energy: "Divine Smite" deals Radiant, not Bludgeoning — the shape's own fiction
[reskin] class kit: paladin — "crusader": Aura of Authority (Hobgoblin Captain/Aura of Authority), Lay on Hands (2/Day) (lay-on-hands), Divine Smite (2/Day) (coating as Divine Smite)
[reskin] inline declared: "the oathbind templar" — the call's own answer (kind), built from the name
[reskin] inline form: "the oathbind templar" — the model's own reading of the name
[reskin] energy rider withheld: Radiant on a Humanoid with no Radiant in the concept's own words
[reskin] save dc derived: DC 15 -> 16 (8 + PB 3 + the sheet's best 5) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "an oathsworn crusader" -> has (descriptive), head | "smites the unclean" -> has (mechanical) [asked: on_hit/attack] | "mends her soldiers" -> has (mechanical) [asked: heal]
[reskin] menu pruned: action — snap-shot (the sheet cannot render them)
[reskin] signature idea (action): "When the templar strikes a foe and calls down her judgment, the prayer doesn't die with the target: if the blow kills or drops the unclean, the radiant sentence leaps to the nearest enemy still standing close by, and keeps leaping from corpse to corpse in a chain as long as each new victim falls. The chain stops the moment a struck foe survives, and no foe can be caught by the same prayer twice." [rider/on_hit/damage] — menu: stunning-strike, charge-push, hook-rider (+ shelf: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, patient-defense, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, riposte)
[reskin] signature bound to the concept's verb: action — rally (mend)
[reskin] word match declined by the call: stunning-strike, charge-push, hook-rider — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit" after being shown rally, which the GM's words keyed
[reskin] key match declined: action — "rally" was ranked first on the call's own menu for mend, and the call read it as no fit; the words keep their claim and nothing is forced
[reskin] signature miss: action — "When the templar strikes a foe and calls down her judgment, the prayer doesn't die with the target: if the blow kills or drops the unclean, the radiant sentence leaps to the nearest enemy still standing close by, and keeps leaping from corpse to corpse in a chain as long as each new victim falls. The chain stops the moment a struck foe survives, and no foe can be caught by the same prayer twice." [rider/on_hit/damage] — the model found no template that holds it (offered: rally, stunning-strike, charge-push, hook-rider, obstacle-pull, herd, curse-debt, patient-defense)
[reskin] fallback respects the call: coating (already on the sheet), rally left the shelf — the call declined them for this sheet
[reskin] fallback stands down: the class_npc path has no shelf — the Gladiator's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 20 already beats print's 16 at CR 8, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "She fights to the death for the formation she has sworn to hold: while she stands, any soldier who falls near her is not truly lost. When an ally drops within her reach, she plants her iron will and drags them back into the line, rising herself a little straighter as she does — but the oath only answers once per fallen comrade, and never for her own wounds." [trait/always/defense] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending, weapon-lodge)
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "She fights to the death for the formation she has sworn to hold: while she stands, any soldier who falls near her is not truly lost. When an ally drops within her reach, she plants her iron will and drags them back into the line, rising herself a little straighter as she does — but the oath only answers once per fallen comrade, and never for her own wounds." [trait/always/defense] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, bloodied-burst, resonant-body)
[reskin] weapons answered: Mace = mace; Dart = dart
[reskin] weapon table: "Dart" — thrown, range 20/60
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] print canon alignment: Lawful Neutral -> Neutral — the Gladiator's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon attack: "Spear" keeps print's hybrid frame — reach 5 ft. or range 20/60 ft. (the Gladiator's weapon is thrown)
[reskin] print canon attack: "Mace" -> "Spear" — the Gladiator's own row
[reskin] print canon rows: Dart leave — the Gladiator has one melee row (Spear), and Multiattack reads print's
[reskin] print canon row priced: Shield Bash — dice 9 → 27
[reskin] print canon row: Actions/Shield Bash — the Gladiator's own
[reskin] class weapon: Actions/"Spear" -> "Longsword" — a paladin fights with a longsword, not the Gladiator's
[reskin] multiattack replacement clause: It can replace one attack with a use of Shield Bash.
[reskin] ask vs row ok: "smites the unclean" -> "Divine Smite" — trigger on_hit
```


---

## Sergeant Vael — a 2014 sheet

**Concept:** a veteran soldier with a longsword who bashes with a buckler

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Sergeant Vael | 6 (2014) | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 4 / off 6 → 5; sustained 39 (3 × Longsword); nova none; dmg 39

```
Sergeant Vael
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

Second Wind (2/Day). As a bonus action, Vael regains 19 (3d12) hit points.
Riposte (Reaction). When a creature within 5 feet of Vael misses it with a melee attack, Vael makes one Longsword attack against that creature.

Actions
Multiattack: Vael makes three Longsword attacks. It can replace one attack with a use of Shield Bash.
Longsword: Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 13 (2d8 + 4) slashing damage, and the target has disadvantage on its next attack roll before the start of Vael's next turn.
Shield Bash: One creature within 5 feet of Vael that it can see must make a DC 15 Strength saving throw, taking 10 (3d6) bludgeoning damage on a failed save, and if the target is Medium or smaller, it is also knocked prone.
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
[route] defender type=Humanoid mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | defender: ✓ ("bashes with a buckler") | defender: no line key in the words — the model's read of its quote
[concept] resolve: archetype=defender type=Humanoid themes=armed mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: longsword and buckler drill [object] | holding the line and punishing passage [behavior]
[concept] identity: A drilled line-fighter who opens by stepping into reach behind a raised buckler, then grinds out a rhythm of longsword cuts alternating with shield-edge bashes to stagger and shove foes off balance. Every round it holds ground, punishing anyone who tries to slip past with an opportunistic bash, and it fights to the death rather than yield a position it was ordered to keep.
[concept] lore: A career soldier left behind by a broken company, it still mans a post no one relieved, treating every traveler as a deserter to be corrected.
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
[reskin] inline declared: "Vael" — the call's own answer (person), built from the name; the rules would have said "the sergeant"
[reskin] inline on kit rows: "the sergeant" -> "Vael"
[reskin] inline form: "Vael" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a veteran soldier with a longsword" -> has (descriptive), head | "bashes with a buckler" -> has (mechanical) [asked: attack]
[reskin] menu pruned: action — push-prone (the sheet cannot render them)
[reskin] signature idea (action): "When a foe Vael can see tries to move through or past his reach, he pivots the buckler into their path and drives them back with a shield-edge bash before they can complete the move, then resets his guard. It only works while he is still on his feet and still holding his ground, so it cannot answer a foe already behind him or one who closes without crossing his guard." [reaction/on_being_hit/movement] — menu: EMPTY (+ shelf: seal, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, herd, curse-debt, reveal, wind-up, exploiter, patient-defense, lay-on-hands, aggro-curse, own-turn-punisher, self-invisibility, rally, stunning-strike, charge-push, hook-rider)
[reskin] word match declined by the call: herd, own-turn-punisher, patient-defense, rally — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit"
[reskin] signature miss: action — "When a foe Vael can see tries to move through or past his reach, he pivots the buckler into their path and drives them back with a shield-edge bash before they can complete the move, then resets his guard. It only works while he is still on his feet and still holding his ground, so it cannot answer a foe already behind him or one who closes without crossing his guard." [reaction/on_being_hit/movement] — the model found no template that holds it (offered: own-turn-punisher, herd, patient-defense, rally)
[reskin] fallback respects the call: own-turn-punisher, herd left the shelf — the call declined them for this sheet
[reskin] fallback stands down: the class_npc path has no shelf — the Gladiator's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 16 already beats print's 15 at CR 6, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "Vael fights by an unbroken drill: every time he lands a sword cut he follows through with a shield-edge strike, and every time he lands a bash he chops a quick longsword cut into the opening. The two weapons feed each other, so a foe who braces against one is caught by the other." [trait/always/damage] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending, weapon-lodge)
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "Vael fights by an unbroken drill: every time he lands a sword cut he follows through with a shield-edge strike, and every time he lands a bash he chops a quick longsword cut into the opening. The two weapons feed each other, so a foe who braces against one is caught by the other." [trait/always/damage] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, absorption)
[reskin] weapons answered: Longsword = longsword; Buckler Bash = buckler
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] print canon alignment: Lawful Neutral -> Neutral — the Gladiator's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon multiattack: "Vael makes three Spear attacks. It can replace one attack with a use of Shield Bash." — the Gladiator's own
[reskin] print canon skills: "Athletics +7, Perception +4" -> "Athletics +10, Performance +5" — the Gladiator's own skills, each derived from this sheet's stat and PB
[reskin] final price: print's Multiattack: the round ran 66 against the card's 42 — the attack rows re-solve at 67% (3 attacks off one row after a supersede)
audit finding below confidence gate: Shield Bash Prone is fine (carries its own escape via standing up), but this is not a defect by calibration — however the save is a Strength saving throw, which is adjudicable. No counterplay defect exists here; the real defect is that the save stat is mismatched with the effect?
[reskin] multiattack re-read — "Longsword" joins the combination; "Vael makes three attacks, using Spear or Longsword in any combination. It can replace one "
[reskin] multiattack re-read: "Spear" is not on this sheet, so the combination now reads "Vael makes three Longsword attacks. It can replace one attack with a use of Shie"
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---

## Openscale Adept — a 2024 sheet

**Concept:** a lizardfolk monk who strikes pressure points with an open hand

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Openscale Adept | 5 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- **dropped clause:** "strikes pressure points with an open hand"
- read: def 5 / off 7 → 6; sustained 48 (2 × Unarmed Strike); nova none; dmg 48

```
Openscale Adept

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

Unarmed Strike. Melee Attack Roll: +6, reach 5 ft. 24 (4d6 + 3) Bludgeoning damage. Once on each of the adept's turns when it hits with this attack, the target is subjected to the following effect. Constitution Saving Throw: DC 13. Failure: The target has the Stunned condition until the end of the adept's next turn. If the target is a creature and doesn't already have a pressure-point wound, it is subjected to the following effect. Constitution Saving Throw: DC 13. Failure: The target receives a pressure-point wound. While wounded, the target loses 5 (1d10) Hit Points at the start of each of its turns. The wound closes after 1 minute, after a spell restores Hit Points to the target, or after the target or a creature within 5 feet of it takes an action to stanch the wound, succeeding on a DC 13 Wisdom (Medicine) check.

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
- Actions/Unarmed Strike — print's own row, renamed; a declared feature; the GM's clause "monk"; binds the GM's words: wound
- Actions/Dart — print's own row, renamed; weapon dart
- Bonus Actions/Patient Defense — template patient-defense; monk kit; the GM's clause "monk"
- Bonus Actions/Cunning Action — print's own row

**Engine trace**

```
[path] class_npc — class monk — species lizardfolk — "monk" (call)
[route] skirmisher type=Humanoid mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | skirmisher: ✓ ("a lizardfolk monk who strikes pressure p") | skirmisher: no line key in the words — the model's read of its quote
[concept] name: provided_name rejected — "a lizardfolk monk who strikes pressure p…" is the description, not a name
[concept] resolve: archetype=skirmisher type=Humanoid themes=bestial/armed mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: open-palm pressure-point strikes that numb and stagger [behavior] | pack flanking and dart-in dart-out skirmishing [behavior] | scaled lizardfolk hide and swift reptilian frame [body]
[concept] identity: A lizardfolk pressure-point assassin skirmishes in a loose pack, opening by feinting from a flank to draw a guard, then darting in with open-palm strikes aimed at joints, throat, and nerve clusters before slipping back out of reach. Each round it circles to strike the creature already holding another packmate's attention, chaining disorienting palm jabs that numb a limb or steal a breath so the next ally's hit lands true. When bloodied it does not break for the hills but goes quiet and surgical, spending its remaining strikes to cripple the strongest foe and let the pack finish the kill.
[concept] lore: Hatched in a swamp dojo where elders teach that every body has a door and an open hand is the only honest key, it wanders the drylands to test its readings of stranger anatomies and steal techniques worth carrying home.
[reskin] [path] class body: the monk stands on the Spy — the class's own print block, nearest CR 5
[reskin] print canon array: STR 10, DEX 16, CON 10, INT 12, WIS 14, CHA 16 — the Spy's, DEX fitted to +6
[reskin] donor: skirmisher-3 -> CR 5
[reskin] [path] decides: class_npc on the Spy · class monk (the matcher would have said homebrew)
[reskin] print canon: "a lizardfolk monk who strikes pressure points with an open hand" heads on the Spy — print's rows ride along; the seat stays
[reskin] row evicted for the cap: Traits/"Slipstep" (chassis filler) leaves so "Marsh Stride" fits — the cap evicts by priority, it does not refuse the newcomer
[reskin] species kit: lizardfolk — "monk": Hold Breath (Hydra/Hold Breath), Marsh Stride (terrain-walk, authored); Swim 30 ft.
[reskin] class kit: monk — "monk": Stunning Strike (stunning-strike, rides Palm Strike), Patient Defense (patient-defense)
[reskin] inline declared: "the adept" — the call's own answer (kind), built from the name
[reskin] inline form: "the adept" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] asked field dropped: the call answered limit "at_will" for "strikes pressure points with an open hand" but offered no quote
[reskin] clauses: "a lizardfolk monk" -> has (descriptive), head | "strikes pressure points with an open hand" -> has (mechanical) [asked: on_hit/condition]
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The adept reads the body of a foe already being harried by a packmate and strikes its pressure point in the same motion, so the wound it opens stays fresh and the target falters at the worst moment. Until the pack's next turn the struck creature has trouble mustering its guard, making blows that should have been turned aside land home, and the adept slips back out of reach after committing to the " [rider/on_hit/condition] — menu: affliction, contagion, charge-push, hook-rider, pounce, isolation, bolt-mark, charge (+ shelf: trample, leap, gaze-single, snare, condition-payoff, throw-retrieve, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, exploiter, rampage, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte)
[reskin] signature bound to the concept's verb: action — riposte (opening)
[reskin] signature rider: affliction -> Palm Strike (appended; the strike opens a wound at a pressure point that keeps the target faltering — a [verb: wound:idea])
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 16 already beats print's 15 at CR 5, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "Its hide and frame are built for sudden darting strikes: whenever the adept begins its turn adjacent to a foe and then moves away, its skin flexes and its tail counterbalances, so it slides through the gap before the enemy can react. The first time it slips out of reach like that each round, the foe it left behind is left momentarily off-balance, out of position to follow." [trait/start_of_turn/movement] — menu: warded-mending (+ shelf: false-appearance, absorption, bloodied-burst, resonant-body, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] word match declined by the call: faultless-tracker — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "Its hide and frame are built for sudden darting strikes: whenever the adept begins its turn adjacent to a foe and then moves away, its skin flexes and its tail counterbalances, so it slides through the gap before the enemy can react. The first time it slips out of reach like that each round, the foe it left behind is left momentarily off-balance, out of position to follow." [trait/start_of_turn/movement] — the model found no template that holds it (offered: warded-mending, faultless-tracker)
[reskin] weapons answered: Palm Strike = none; Spit Dart = none
[reskin] weapon declined: "Spit Dart" reads dart from its name, but the call answered none — the row carries no weapon
[reskin] weapon table: "Spit Dart" — thrown, range 20/60
[reskin] speed by body: a Humanoid walks 30 ft. (print's people; a hermit ran 50 — critic's audit 2026-10-02)
[reskin] speed by concept:  — the concept's movement set decides
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] languages by species: Draconic — the concept names the species; print's NPCs of it speak it
[reskin] print canon alignment: Lawful Neutral -> Neutral — the Spy's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common, Draconic" -> "Common plus one other language, Draconic" — the Spy's plus the concept's Draconic
[reskin] print canon attack: "Palm Strike" -> "Shortsword" — the Spy's own row
[reskin] print canon attack: "Spit Dart" -> "Hand Crossbow" — the Spy's own ranged row
[reskin] print canon row: Bonus Actions/Cunning Action — the Spy's own
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" yields to the Spy's Cunning Action
[reskin] class weapon: Actions/"Shortsword" -> "Unarmed Strike" — a monk fights with its hands, not the Spy's; the body's rider folds in (+7)
[reskin] class weapon: Actions/"Hand Crossbow" -> "Dart" — a monk fights with a dart, not the Spy's
[reskin] asked but unanswered: "strikes pressure points with an open hand" asked for on_hit and no row binds the clause
audit finding below confidence gate: Unarmed Strike A single attack entry nests two separate saving throws plus a persistent recurring-damage condition with its own multi-path resolution, requiring the GM to track Stunned timing and wound state mid-combat — beyond quick table resolution.
[reskin] species kit: Swim 30 ft. — the lizardfolk's
```


---

## Sable Rook — a print donor

**Concept:** a tiefling rogue who stalks the rooftops of the old quarter

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Sable Rook | 5 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 5 / off 5 → 5; sustained 34 (2 × Shortsword); nova none; dmg 34

```
Sable Rook

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

Assassinate. During the first round of each combat, Sable has Advantage on attack rolls against any creature that hasn't taken a turn. If Sable hits a creature during that round, the target takes an extra 9 (2d8) Piercing damage.

Evasion. If Sable is subjected to an effect that allows it to make a Dexterity saving throw to take only half damage, Sable instead takes no damage if it succeeds on the save and only half damage if it fails. It can't use this trait if it has the Incapacitated condition.

Actions

Multiattack. Sable makes two attacks, using Shortsword or Shortbow in any combination.

Shortsword. Melee Attack Roll: +6, reach 5 ft. 17 (4d6 + 3) Piercing damage.

Shortbow. Ranged Attack Roll: +6, range 80/320 ft. 16 (3d8 + 3) Piercing damage.

Bonus Actions

Cunning Action. Sable takes the Dash, Disengage, or Hide action.

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
[concept] resolve: archetype=skirmisher type=Humanoid themes=fiendish/terror mind=sapient style=skulker energy=Poison mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: rooftop stalking from cover to cover [behavior] | strike with advantage, vanish, re-hide [behavior] | tiefling infernal blood [body]
[concept] identity: A tiefling rogue who owns the old quarter's rooftops: she opens from above with a crossbow bolt or a dagger thrown from an unseen ledge, then works the fight as a vertical ambush—ducking behind chimneys and ridge caps to re-hide before the next strike lands with advantage. She never stands and trades; once bloodied, she walks away across the rooftops rather than duel, but she will bait a party for a whole night, picking off stragglers until the survivors are lured up onto a slate where she has the only exits.
[concept] lore: Exiled from a guild that learned what her blood was, she keeps the old quarter's roofscape as her own private kingdom and demands a toll paid in silver or secrets from anyone foolish enough to cross it after dark.
[reskin] energy withheld: Poison on a Humanoid with no Poison in the concept's own words (fixed phrases read first)
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
[reskin] inline declared: "Sable" — the call's own answer (person), built from the name
[reskin] inline form: "Sable" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a tiefling rogue" -> has (descriptive), head | "stalks the rooftops of the old quarter" -> has (descriptive)
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "When Sable strikes a target from hiding or from higher ground, she marks it as her prey for the rest of the night — the party always knows roughly which direction she last watched them from, but she can shadow that one victim across rooftops and alleys, sensing where they are whenever they are out of her sight. The mark spreads the fear: anyone near the prey feels watched, and Sable's next ambush " [rider/on_hit/condition] — menu: affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, isolation, bolt-mark (+ shelf: leap, gaze-single, snare, condition-payoff, throw-retrieve, shield-bash, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, exploiter, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte)
[reskin] signature bound to the concept's verb: action — focus (stalk)
[reskin] word match declined by the call: focus, bolt-mark, gaze-single, delayed-brand, aggro-curse, affliction — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit" after being shown focus, which the GM's words keyed
[reskin] key match declined: action — "focus" was ranked first on the call's own menu for stalk, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: action — "When Sable strikes a target from hiding or from higher ground, she marks it as her prey for the rest of the night — the party always knows roughly which direction she last watched them from, but she can shadow that one victim across rooftops and alleys, sensing where they are whenever they are out of her sight. The mark spreads the fear: anyone near the prey feels watched, and Sable's next ambush " [rider/on_hit/condition] — the model found no template that holds it (offered: focus, affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, isolation, bolt-mark, gaze-single, delayed-brand, aggro-curse)
[reskin] fallback respects the call: focus, gaze-single left the shelf — the call declined them for this sheet
[reskin] fallback stands down: the class_npc path has no shelf — the Bandit Captain's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 16 already beats print's 15 at CR 5, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "Sable treats the whole roofscape as her hunting ground: as long as she ends her move out of sight among chimneys, ridge caps, and eaves, she simply cannot be pinned down — pursuers climbing after her find only her dust, and anyone who tries to corner her up there is the one who gets cornered." [trait/always/movement] — menu: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] signature bound to the concept's verb: trait — faultless-tracker (stalks, stalk)
[reskin] word match declined by the call: faultless-tracker, spider-climb, bloodied-fury, bloodied-burst — the key word does not mean the mechanic here
[reskin] signature miss: trait — "Sable treats the whole roofscape as her hunting ground: as long as she ends her move out of sight among chimneys, ridge caps, and eaves, she simply cannot be pinned down — pursuers climbing after her find only her dust, and anyone who tries to corner her up there is the one who gets cornered." [trait/always/movement] — the model picked "terrain-walk" (no verb, and it quotes nothing the GM typed) over a concept-verb template (faultless-tracker)
[reskin] concept-first trait skipped: faultless-tracker — the call read its match as a collision (the word is a modifier, or the sheet already answers it)
[reskin] weapons answered: Dagger = dagger; Crossbow = light crossbow
[reskin] weapon declared: "Crossbow" is a light crossbow — the call's own answer (the name alone read crossbow)
[reskin] weapon table: "Crossbow" — a launcher, never thrown, range 80/320
[reskin] print canon modes: climb off — the Bandit Captain has no such mode and the words name none
[reskin] speed by body: a Humanoid walks 30 ft. (print's people; a hermit ran 50 — critic's audit 2026-10-02)
[reskin] speed by concept: dropped Climb 30 ft. — the concept's movement set decides
[reskin] print canon languages: "Common, Infernal" -> "Common, Thieves' cant, Infernal" — the Bandit Captain's plus the concept's Infernal
[reskin] print canon attack: "Dagger" -> "Scimitar" — the Bandit Captain's own row
[reskin] print canon attack: "Crossbow" -> "Pistol" — the Bandit Captain's own ranged row
[reskin] on-hit extra retyped: "Assassinate" adds Slashing, not Bludgeoning — the hit's own type (Scimitar)
[reskin] print canon: chassis row leaves — Traits/"Ridge Runner" is the seat's, not the Bandit Captain's
[reskin] on-hit extra retyped: "Assassinate" adds Piercing, not Slashing — the class weapon's own type (Shortsword)
[reskin] class weapon: Actions/"Scimitar" -> "Shortsword" — a rogue fights with a shortsword, not the Bandit Captain's
[reskin] class weapon: Actions/"Pistol" -> "Shortbow" — a rogue fights with a shortbow, not the Bandit Captain's
[reskin] species kit: resistance Fire — the tiefling's
[harness] re-rolled Traits/"Assassinate" -> "Rooftop Stalker" [catalog: faultless-tracker]
```

**Re-roll — one entry, replaced**

```
Traits / BEFORE  Assassinate: During the first round of each combat, Sable has Advantage on attack rolls against any creature that hasn't taken a turn. If Sable hits a creature during that round, the target takes an extra 9 (2d8) Piercing damage.
Traits / AFTER   Rooftop Stalker: Sable knows the direction and distance to any creature it has damaged within the last 24 hours, as long as the two of them are on the same plane of existence.
provenance: catalog template "faultless-tracker", binds stalks, stalk
```


---

## Thurivald — one marked soft

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

Guard Aura. While within 10 feet of Thurivald, Thurivald's allies have advantage on saving throws, provided Thurivald is not incapacitated.
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
[route] defender-leader type=Humanoid mechanics=aura — casts: implied by the kind — "a skald who sings his warband into a fur" | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | defender-leader: ✓ ("sings his warband into a fury") | defender-leader: no line key in the words — the model's read of its quote
[concept] name: "Thurivald" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] resolve: archetype=defender type=Humanoid themes=voice/armed mind=sapient style=leader energy=Thunder mix=both identity=✓ lore=✓
[concept] name: provided "Thurivald"
[concept] mechanics: aura
[concept] signature elements: the war-hymn that drives allies into a fury [behavior] | shield and axe fought beside the troops [object] | an aura of unshaken authority [aura]
[concept] identity: Thurivald opens a fight by raising his voice, a war-hymn that floods his warband with fury and steadies their nerve while he strides into the front line with shield and axe. Every round he keeps the song going, trading blows beside his troops and calling targets, his parry turning aside the strike meant for the man next to him. He does not break while the song holds — and if his voice is silenced he fights on grimly, snarling out the last verse, and does not flee.
[concept] lore: Thurivald was a war-band's skald who sang his companions past fear at a battle none were meant to survive, and the surviving verse kept the whole band alive in legend — now he gathers any who will march and teaches them the song.
[reskin] energy withheld: Thunder on a Humanoid with no Thunder in the concept's own words (fixed phrases read first)
[reskin] [path] class body: the bard stands on the Pirate Captain — the class's own print block, nearest CR 6
[reskin] print canon route: the Pirate Captain's body outranks the leader seat — no verb in the words names it; the plain defender line
[reskin] print canon defenses: HP 114 -> 84, AC 18 -> 17 — the Pirate Captain's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 10, DEX 18, CON 14, INT 10, WIS 14, CHA 17 — the Pirate Captain's at its own CR; attack +6 -> +7, DC 14 (print's)
[reskin] donor: defender-5 -> CR 6
[reskin] [path] decides: class_npc on the Pirate Captain · class bard (the matcher would have said homebrew)
[reskin] print canon: "Thurivald — a skald who sings his warband into a fury" heads on the Pirate Captain — print's rows ride along; the seat stays
[reskin] class kit: bard — "skald": Captain's Charm (Pirate Captain/Captain's Charm), Bolstering Cry (2/Day) (rally)
[reskin] proper noun: "Thurivald" — the Name field is a person, not a kind (no print match, no article in the words)
[reskin] inline declared: "Thurivald" — the call's own answer (person), built from the name
[reskin] inline form: "Thurivald" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Thurivald — a skald" -> has (descriptive), head | "sings his warband into a fury" -> has (descriptive)
[reskin] menu pruned: action — snap-shot (the sheet cannot render them)
[reskin] signature idea (action): "Thurivald lifts the war-hymn to its full verse while he keeps swinging, and every ally who hears it grows furious and fearless — their strikes drink deeper from the wounds they open. The song only sustains while he stays in the fight beside them, and it dies the moment his voice is cut off or the last verse is spent." [trait/start_of_turn/damage] — menu: warded-mending (+ shelf: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, exploiter, patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, riposte, stunning-strike, charge-push, hook-rider)
[reskin] decline reason: action — the call answered none and names it "no_fit"
[reskin] signature miss: action — "Thurivald lifts the war-hymn to its full verse while he keeps swinging, and every ally who hears it grows furious and fearless — their strikes drink deeper from the wounds they open. The song only sustains while he stays in the fight beside them, and it dies the moment his voice is cut off or the last verse is spent." [trait/start_of_turn/damage] — the model found no template that holds it (offered: warded-mending, herd, riposte)
[reskin] fallback stands down: the class_npc path has no shelf — the Pirate Captain's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 17 already beats print's 15 at CR 6, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "Thurivald is always watching the shields around him; when a blow falls on an ally close by, he throws his axe-arm across the line and takes the edge of it himself, roaring the verse louder. He does not flinch from wounds taken in his warband's stead." [trait/on_being_hit/defense] — menu: absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura)
[reskin] signature bound to the concept's verb: trait — bloodied-fury (fury)
[reskin] word match declined by the call: bloodied-fury, bloodied-burst, absorption, resonant-body, weapon-lodge — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit" after being shown bloodied-fury, which the GM's words keyed
[reskin] key match declined: trait — "bloodied-fury" was ranked first on the call's own menu for fury, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: trait — "Thurivald is always watching the shields around him; when a blow falls on an ally close by, he throws his axe-arm across the line and takes the edge of it himself, roaring the verse louder. He does not flinch from wounds taken in his warband's stead." [trait/on_being_hit/defense] — the model found no template that holds it (offered: bloodied-fury, absorption, bloodied-burst, resonant-body, weapon-lodge)
[reskin] weapons answered: Axe = battleaxe; Hurlaxe = handaxe; Sundering Shout = none
[reskin] weapon declared: "Axe" is a battleaxe — the call's own answer (the name alone read handaxe)
[reskin] weapon table: "Hurlaxe" — thrown, range 20/60
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] print canon alignment: Neutral Good -> Neutral — the Pirate Captain's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common" -> "Common plus one other language" — the Pirate Captain's
[reskin] print canon row: Actions/Pistol — the Pirate Captain's own ranged row, added (the chassis carried none to rename)
[reskin] print canon attack: "Axe" -> "Rapier" — the Pirate Captain's own row
[reskin] print canon multiattack: "The pirate makes three attacks, using Rapier or Pistol in any combination." — the Pirate Captain's own
[reskin] print canon skills: "Athletics +3, Perception +5" -> "Acrobatics +7, Perception +5" — the Pirate Captain's own skills, each derived from this sheet's stat and PB
[reskin] print canon: chassis row leaves — Actions/"Hurlaxe" — the Pirate Captain prints no row for it and no path stage claimed it
[reskin] class weapon: Actions/"Pistol" -> "Hand Crossbow" — a bard fights with a hand crossbow, not the Pirate Captain's
audit finding below confidence gate: Guard Aura The requirement that Thurivald not be Incapacitated is stated as a qualifier on the aura, but the Emanation's origin only moves if Thurivald moves; the clause creates an untracked state check mid-round rather than a clean trigger.
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---

## Dame Oriel — in the run

**Concept:** name: Dame Oriel | a knight who holds the line with a shield and a longsword

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Dame Oriel | 5 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 4 / off 6 → 5; sustained 39 (3 × Longsword); nova none; dmg 39

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

Shieldwall Stance. While Dame Oriel isn't Bloodied, melee attack rolls against it are made with Disadvantage.

Aura of Authority. While in a 10-foot Emanation originating from Dame Oriel, Dame Oriel and its allies have Advantage on attack rolls and saving throws, provided Dame Oriel doesn't have the Incapacitated condition.

Actions

Multiattack. Dame Oriel makes three Longsword attacks. It can replace one attack with a use of Shield Bash.

Longsword. Melee Attack Roll: +7, reach 5 ft. 13 (2d8 + 4) Slashing damage, and the target has Disadvantage on its next attack roll before the start of Dame Oriel's next turn.

Shield Bash. Strength Saving Throw: DC 15, one creature within 5 feet that Dame Oriel can see. Failure: 9 (2d4 + 4) Bludgeoning damage. If the target is a Medium or smaller creature, it has the Prone condition.

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

- Traits/Shieldwall Stance — template guarded-stance; library draw (seed unstamped); the GM's clause "keeps the line with a shield and a longsword"; binds the GM's words: keeps the line+blows glance+glance off
- Traits/Aura of Authority — paladin kit; the GM's clause "Dame"
- Actions/Multiattack — the chassis
- Actions/Longsword — authored for this sheet; a named part; a declared feature; the GM's clause "keeps the line with a shield and a longsword"; weapon longsword
- Actions/Shield Bash — print's own row

**Engine trace**

```
[path] class_npc — class paladin — "Dame" (call)
[route] defender type=Humanoid mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | defender: ✓ ("keeps the line with a shield and a longs") | defender: key "keeps the line" (class verb)
[concept] name: "Dame Oriel" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] resolve: archetype=defender type=Humanoid themes=armed/forged mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: provided "Dame Oriel"
[concept] mechanics: none claimed
[concept] signature elements: shield-and-longsword line holding [behavior] | punishing anyone who tries to move past her [behavior] | iron shield and plate [object]
[concept] identity: Dame Oriel plants herself in the doorway and dares the party to come through her, opening with a shield bash that shoves the front rank back into its own casters. Every round after, she fights as a patient blade-and-board duelist — shield up against the biggest threat, longsword punishing anyone who tries to slip past her reach, stepping to keep her body between the squishy and the door. She never chases; she is content to hold ground and bleed the fight out of anyone who tests her, and only breaks formation when the line is already lost.
[concept] lore: Dame Oriel is a sworn shield-knight of an old border order, holding a gate she was told to hold long after the kingdom that gave the order has forgotten her name.
[reskin] [path] class body: the paladin stands on the Gladiator — the class's own print block, nearest CR 5
[reskin] print canon defenses: HP 78 -> 112, AC 19 -> 16 — the Gladiator's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon armor: 16 (studded leather, shield) — print's Gear line; the 2014 sheet prints it (the Goblin Boss wore "splint", canaries 2026-10-12)
[reskin] print canon array: STR 18, DEX 15, CON 16, INT 10, WIS 12, CHA 15 — the Gladiator's at its own CR; attack +6 -> +7, DC 15 (print's)
[reskin] donor: defender-5 -> CR 5
[reskin] row gated out: Guard Aura (aura) — the concept did not claim this mechanic
[reskin] [path] decides: class_npc on the Gladiator · class paladin (the matcher would have said homebrew)
[reskin] print canon: "Dame Oriel — a knight who keeps the line with a shield and a longsword" heads on the Gladiator — print's rows ride along; the seat stays
[reskin] repair round 1: 1 defect(s) — rename for "Hybrid Attack" takes the shelf's own row name "Shield Bash" — that name belongs to a template this sheet may still receive; choose another
[reskin] named parts: Longsword (slot) — the user's words, the engine's numbers
[reskin] named parts landed: 1 attack row(s), 0 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] chassis row off: Actions/"Guarding Blade" leaves — the GM named a melee weapon (Longsword); one weapon, one rule set
[reskin] class kit: paladin — "Dame": Aura of Authority (Hobgoblin Captain/Aura of Authority)
[reskin] proper noun: "Dame Oriel" — the Name field is a person, not a kind (no print match, no article in the words)
[reskin] inline declared: "Dame Oriel" — the call's own answer (person), built from the name
[reskin] lacks asked: nothing taken away
[reskin] asked field dropped: the call answered limit "at_will" for "keeps the line with a shield and a longsword" but offered no quote
[reskin] clauses: "Dame Oriel — a knight" -> has (descriptive), head | "keeps the line with a shield and a longsword" -> has (mechanical) [asked: attack]
[reskin] signature idea (action): "When an enemy slips past her reach to get at whoever she is guarding, Dame Oriel answers with her shield instead of her sword: she slams the flat into them, sending them staggering back the way they came, planted firmly on the far side of her again and briefly off balance. It only answers those who turn their back on her to run at her allies, not anyone standing and fighting her toe to toe." [reaction/on_being_hit/movement] — menu: riposte (+ shelf: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, stunning-strike, charge-push, hook-rider)
[reskin] signature bound to the concept's verb: action — rally (shield)
[reskin] word match declined by the call: rally, push-prone, own-turn-punisher, riposte — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit" after being shown rally, which the GM's words keyed
[reskin] key match declined: action — "rally" was ranked first on the call's own menu for shield, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: action — "When an enemy slips past her reach to get at whoever she is guarding, Dame Oriel answers with her shield instead of her sword: she slams the flat into them, sending them staggering back the way they came, planted firmly on the far side of her again and briefly off balance. It only answers those who turn their back on her to run at her allies, not anyone standing and fighting her toe to toe." [reaction/on_being_hit/movement] — the model found no template that holds it (offered: rally, riposte, push-prone, own-turn-punisher)
[reskin] fallback respects the call: rally, push-prone, own-turn-punisher left the shelf — the call declined them for this sheet
[reskin] fallback stands down: the class_npc path has no shelf — the Gladiator's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 16 already beats print's 15 at CR 5, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "Dame Oriel's iron shield is never truly down: whenever she has had a moment to set her feet and raise it against the biggest threat in front of her, blows glance off the board and leave her untouched. It shelters only what stands behind the shield's face, so anyone who gets around her flank finds her as open as any other knight." [trait/always/defense] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending, weapon-lodge)
[reskin] word match declined by the call: resonant-body — the key word does not mean the mechanic here
[reskin] signature template (trait): guarded-stance -> Traits/"Shieldwall Stance" ("Blows glance off the raised shield and leave her untouched while she holds the l [verb: keeps the line:concept, blows glance:idea, glance off:idea]")
[reskin] weapons answered: Longsword = longsword; Shield Bash = shield
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] print canon alignment: Lawful Neutral -> Neutral — the Gladiator's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon multiattack: "Dame Oriel makes three Spear attacks. It can replace one attack with a use of Shield Bash." — the Gladiator's own
[reskin] print canon skills: "Athletics +7, Perception +4" -> "Athletics +10, Performance +5" — the Gladiator's own skills, each derived from this sheet's stat and PB
[reskin] print canon row: Actions/Shield Bash — the Gladiator's own
[reskin] final price: print's Multiattack: the round ran 66 against the card's 40 — the attack rows re-solve at 64% (3 attacks off one row after a supersede)
[reskin] row binds its clause: "Shieldwall Stance" answers "keeps the line with a shield and a longsword" — the keys it matched came from that clause, so the coverage credit has a receipt
[reskin] multiattack re-read — "Longsword" joins the combination; "Dame Oriel makes three attacks, using Spear or Longsword in any combination. It can replac"
[reskin] multiattack re-read: "Spear" is not on this sheet, so the combination now reads "Dame Oriel makes three Longsword attacks. It can replace one attack with a use o"
```


---

## Shame-Bitten Colossus — in the run

**Concept:** a goliath berserker who loses control when wounded

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Shame-Bitten Colossus | 8 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 6 / off 8 → 7; sustained 54 (2 × Greataxe); nova none; dmg 54

```
Shame-Bitten Colossus

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

Languages Common

CR 8 (XP 3,900; PB +3)

Traits

Berserk. Whenever the colossus starts its turn Bloodied, roll 1d6. On a 6, the colossus goes berserk. On each of its turns while berserk, the colossus attacks the nearest creature it can see. If no creature is near enough to move to and attack, the colossus attacks an object. Once the colossus goes berserk, it remains so until it is destroyed or it is no longer Bloodied.

Bloodied Frenzy. While Bloodied, the colossus has Advantage on attack rolls and saving throws.

Mountain Stride. Difficult Terrain composed of ice or snow doesn't cost the colossus extra movement, and the colossus can move across ice or snow without needing to make an ability check.

Actions

Multiattack. The colossus makes two Greataxe attacks.

Greataxe. Melee Attack Roll: +8, reach 5 ft. 27 (5d8 + 5) Slashing damage.

Bonus Actions

Rampage (1/Day). Immediately after dealing damage to a creature that is already Bloodied, the colossus moves up to half its Speed without provoking Opportunity Attacks, and it makes one Greataxe attack.

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
- Traits/Berserk — template berserk; barbarian kit; the GM's clause "loses control when wounded"
- Traits/Bloodied Frenzy — barbarian kit; the GM's clause "berserker"
- Traits/Mountain Stride — goliath kit; the GM's clause "berserker"
- Bonus Actions/Rampage — template rampage; barbarian kit; the GM's clause "berserker"

**Engine trace**

```
[path] class_npc — class barbarian — species goliath — "berserker" (call)
[route] brute type=Giant mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | brute: ✓ ("a goliath berserker who loses control wh") | brute: no line key in the words — the model's read of its quote
[concept] name: provided_name rejected — "Sketch this D&D monster concept's combat…" is the description, not a name
[concept] resolve: archetype=brute type=Giant themes=bestial/terror mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: loses control when wounded, turning pain into fury [behavior] | thick goliath hide scarred by battle [body] | oversized hide-wrapped cudgel [object]
[concept] identity: A towering goliath berserker wades into the fight with a massive hide-wrapped cudgel and trades blows without flinching, grinning through broken teeth as it tests the strongest foe present. Every round it leans harder into the swing, and the first time a blade draws blood it truly flies into a bestial rage — wounds no longer slow it but feed it, and it hammers down the nearest creature with relentless, screaming abandon. It never flees, never negotiates, and fights to the death once the blood is up, only briefly dazed if something can knock the fury out of its skull.
[concept] lore: Goliath war-bands leave their rage-touched champions behind on lost battlefields, and these scarred giants now wander the wilds looking for any fight big enough to drown their shame.
[reskin] [path] class body: the barbarian stands on the Gladiator — the class's own print block, nearest CR 8
[reskin] the concept outranks the alias: the Gladiator is a Humanoid and the concept reads Giant — the words RESEMBLE it, they do not name it, so the print body stands down
[reskin] print canon array: STR 20, DEX 15, CON 16, INT 10, WIS 12, CHA 15 — the Gladiator's, STR fitted to +8
[reskin] donor: brute-5 -> CR 8
[reskin] [path] decides: class_npc on the Gladiator · class barbarian (the matcher would have said homebrew)
[reskin] print canon: "a goliath berserker who loses control when wounded" heads on the Gladiator — print's rows ride along; the seat stays
[reskin] species kit: goliath — "berserker": Mountain Stride (terrain-walk, authored)
[reskin] class kit: barbarian — "berserker": Bloodied Frenzy (Berserker/Bloodied Frenzy), Rampage (1/Day) (rampage), Berserk (berserk)
[reskin] inline declared: "the colossus" — the call's own answer (kind), built from the name
[reskin] inline form: "the colossus" — the model's own reading of the name
[reskin] save dc derived: DC 15 -> 16 (8 + PB 3 + the sheet's best 5) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a goliath berserker" -> has (descriptive), head | "loses control when wounded" -> has (descriptive)
[reskin] signature idea (action): "When the colossus strikes a foe it has already hurt this fight, the old shame boils over: the wound it dealt fuels a fresh surge, and it can lash out with another cudgel swing at that same foe. This extra swing can only happen once each round." [rider/on_hit/damage] — menu: stunning-strike, charge-push, hook-rider, pounce, charge (+ shelf: trample, leap, thrown-burst, throw-retrieve, shield-bash, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating)
[reskin] decline reason: action — the call answered none and names it "no_fit"
[reskin] signature miss: action — "When the colossus strikes a foe it has already hurt this fight, the old shame boils over: the wound it dealt fuels a fresh surge, and it can lash out with another cudgel swing at that same foe. This extra swing can only happen once each round." [rider/on_hit/damage] — the model found no template that holds it (offered: stunning-strike, charge-push, hook-rider, pounce, charge, own-turn-punisher)
[reskin] fallback stands down: the class_npc path has no shelf — the Gladiator's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "Its hide is a map of every fight it has ever lost, and a cut that lands clean makes it roar with delight rather than pain, driving it to press harder against whoever drew that blood. Whenever a foe's attack actually wounds it, the colossus turns its full attention on that attacker until the fight's end or its own collapse." [trait/on_being_hit/resource] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] signature bound to the concept's verb: trait — bloodied-burst, bloodied-fury (wounded)
[reskin] word match declined by the call: bloodied-burst, bloodied-fury, uncanny-sense, heated-body, resonant-body, weapon-lodge, absorption — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit" after being shown bloodied-burst, bloodied-fury, which the GM's words keyed
[reskin] key match declined: trait — "bloodied-burst" was ranked first on the call's own menu for wounded, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: trait — "Its hide is a map of every fight it has ever lost, and a cut that lands clean makes it roar with delight rather than pain, driving it to press harder against whoever drew that blood. Whenever a foe's attack actually wounds it, the colossus turns its full attention on that attacker until the fight's end or its own collapse." [trait/on_being_hit/resource] — the model found no template that holds it (offered: bloodied-burst, bloodied-fury, heated-body, absorption, resonant-body, weapon-lodge, uncanny-sense)
[reskin] weapons answered: Cudgel = greatclub; Boulder = none
[reskin] weapon declared: "Cudgel" is a greatclub — the call's own answer (the name alone read club)
[reskin] speed by body: a Humanoid walks 30 ft. (print's people; a hermit ran 50 — critic's audit 2026-10-02)
[reskin] speed by concept:  — the concept's movement set decides
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] print canon type: Humanoid stays — the words say giant ("a dire wolf but undead", 2026-10-01)
[reskin] print canon attack: "Spear" keeps print's hybrid frame — reach 5 ft. or range 20/60 ft. (the Gladiator's weapon is thrown)
[reskin] print canon attack: "Cudgel" -> "Spear" — the Gladiator's own row
[reskin] ranged row off: "Boulder" leaves — the Gladiator carries no ranged row and the words name none
[reskin] multiattack re-read — "Boulder" left; "Multiattack" now reads "The colossus makes two Spear attacks."
[reskin] print canon row priced: Shield Bash — dice 9 → 27
[reskin] print canon row: Actions/Shield Bash — the Gladiator's own
[reskin] class weapon: Actions/"Shield Bash" leaves with the shield — a greataxe is two-handed and print pairs a shield with no heavy melee weapon (0 of 329 gear lines)
[reskin] class weapon: Actions/"Spear" -> "Greataxe" — a barbarian fights with a greataxe, not the Gladiator's
[reskin] darkvision withheld: a Humanoid with no species kit granting it, no word for it in the GM's own text, and no print body that has it — print gives darkvision to 1 of 26 Humanoids ("darkvision 60 ft.; Passive Perception 14" -> "Passive Perception 14")
[reskin] species kit: Huge -> Medium — a goliath is Medium (the words name no other size)
```


---

## Vareth Solmane — in the run

**Concept:** name: Vareth Solmane | a templar priest of the dawn who blesses her soldiers

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Vareth Solmane | 6 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
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

Actions

Multiattack. Vareth makes three Longsword attacks. It can replace one attack with a use of Shield Bash.

Longsword. Melee Attack Roll: +7, reach 5 ft. 11 (2d6 + 4) Slashing damage.

Shield Bash. Strength Saving Throw: DC 15, one creature within 5 feet that Vareth can see. Failure: 9 (2d4 + 4) Bludgeoning damage. If the target is a Medium or smaller creature, it has the Prone condition.

Bonus Actions

Dawnline Blessing (2/Day). Each ally within 30 feet of Vareth gains 11 (2d10) Temporary Hit Points.

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
- Actions/Longsword — print's own row, renamed; weapon longsword
- Actions/Shield Bash — print's own row
- Bonus Actions/Dawnline Blessing — template rally; library draw (seed unstamped); the GM's clause "blesses her soldiers"; binds the GM's words: blessing+bless

**Engine trace**

```
[path] class_npc — class paladin — "templar" (call)
[route] caster-warpriest (artillery) type=Humanoid mechanics=none — casts: implied by the kind — "blesses her soldiers" | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | caster-warpriest: ✓ ("a templar priest of the dawn who blesses") | caster-warpriest: key "blesses" (class verb)
[concept] name: "Vareth Solmane" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] resolve: archetype=caster type=Humanoid themes=celestial/armed mind=sapient style=warpriest energy=Radiant mix=both identity=✓ lore=✓
[concept] name: provided "Vareth Solmane"
[concept] mechanics: none claimed
[concept] signature elements: blessing her soldiers with dawn-lit benedictions [behavior] | the reliquary sun-disc raised before her line [object] | iron plate and shield held as a wall for the faithful [body]
[concept] identity: Vareth Solmane opens a fight by raising her sun-disc and calling down a dawn-blessing on her soldiers — a radiant aura that hardens their resolve and sears the eyes of the faithless who close in. Every round after, she fights as a shield-cleric anchored in her line: interposing her iron between her flock and the enemy while her prayers and her mace carry the same holy fire out to the front. When bloodied, she never withdraws — she plants her feet and spends her last breath turning her own wound into one more benediction for the soldiers standing beside her.
[concept] lore: Once the youngest templar of a now-fallen morning order, Vareth survived the order's fall by carrying its last reliquary sun-disc into exile, and she wanders the roads gathering lost soldiers to bless into a new faithful line.
[reskin] energy withheld: Radiant on a Humanoid with no Radiant in the concept's own words (fixed phrases read first)
[reskin] [path] class body: the paladin stands on the Gladiator — the class's own print block, nearest CR 6
[reskin] print canon route: the Gladiator is not a caster first and keys STR 18 over DEX 15 — it casts no spells — the caster family stands down for the plain defender line
[reskin] print canon defenses: HP 91 -> 112, AC 19 -> 16 — the Gladiator's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon armor: 16 (studded leather, shield) — print's Gear line; the 2014 sheet prints it (the Goblin Boss wore "splint", canaries 2026-10-12)
[reskin] print canon array: STR 18, DEX 15, CON 16, INT 10, WIS 12, CHA 15 — the Gladiator's at its own CR; attack +7 -> +7, DC 15 (print's)
[reskin] donor: defender-5 -> CR 6
[reskin] style unserved: "warpriest" has no defender line — the plain line ships (resolve's style signal is noisy; not re-routed)
[reskin] row gated out: Guard Aura (aura) — the concept did not claim this mechanic
[reskin] [path] decides: class_npc on the Gladiator · class paladin (the matcher would have said twist Priest)
[reskin] print canon: "Vareth Solmane — a templar priest of the dawn who blesses her soldiers" heads on the Gladiator — print's rows ride along; the seat stays
[reskin] name_element answered: Sun-Disc = imagery
[reskin] name element refused: "Sun-Disc" was called imagery, but its element word stands alone — a fused compound makes no claim, a bare one does
[reskin] repair round 1: 1 defect(s) — "Sun-Disc" deals Radiant on a Humanoid whose concept names no Radiant — a name is not a warrant; use a physical type
[reskin] class kit: paladin — "templar": Aura of Authority (Hobgoblin Captain/Aura of Authority)
[reskin] proper noun: "Vareth Solmane" — the Name field is a person, not a kind (no print match, no article in the words)
[reskin] inline declared: "Vareth" — the call's own answer (person), built from the name
[reskin] inline form: "Vareth" — the model's own reading of the name
[reskin] energy rider withheld: Radiant on a Humanoid with no Radiant in the concept's own words
[reskin] energy withheld on a base row: "Sun-Disc" Radiant -> Piercing (the body's physical type; a Humanoid deals no Radiant its concept never gave it)
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Vareth Solmane — a templar priest of the dawn" -> has (descriptive), head | "blesses her soldiers" -> has (mechanical) [asked: buff_ally]
[reskin] menu pruned: action — snap-shot (the sheet cannot render them)
[reskin] signature idea (action): "Vareth lifts the reliquary sun-disc high and calls a dawn-blessing down her line: every allied soldier who can see or hear her has their resolve hardened — their wounds close a little and their next strike carries a sliver of the dawn's light. The faithless pressed close to the disc are blinded by the flare and falter." [action/always/condition] — menu: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up (+ shelf: patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, riposte, stunning-strike, charge-push, hook-rider)
[reskin] signature bound to the concept's verb: action — rally (blessing, bless)
[reskin] signature template: rally -> Bonus Actions/"Dawnline Blessing (2/Day)" ("Vareth lifts the disc and blesses her soldiers along the line — allies' resolve  [verb: blessing:concept, bless:concept]")
[reskin] keys spent by the action: blessing, bless
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 16 already beats print's 15 at CR 6, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "As long as Vareth holds her sun-disc raised before the line, her soldiers fight harder for her sake — a wounded ally who fights beside her can call on her … to steady their failing legs and strike through their pain." [trait/always/defense] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending, weapon-lodge)
[reskin] word match declined by the call: bloodied-fury, bloodied-burst — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "As long as Vareth holds her sun-disc raised before the line, her soldiers fight harder for her sake — a wounded ally who fights beside her can call on her … to steady their failing legs and strike through their pain." [trait/always/defense] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, bloodied-burst)
[reskin] weapons answered: Mace = mace; Sun-Disc = none
[reskin] print canon alignment: Lawful Good -> Neutral — the Gladiator's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon attack: "Spear" keeps print's hybrid frame — reach 5 ft. or range 20/60 ft. (the Gladiator's weapon is thrown)
[reskin] print canon attack: "Mace" -> "Spear" — the Gladiator's own row
[reskin] print canon rows: Sun-Disc leave — the Gladiator has one melee row (Spear), and Multiattack reads print's
[reskin] print canon multiattack: "Vareth makes three Spear attacks. It can replace one attack with a use of Shield Bash." — the Gladiator's own
[reskin] print canon skills: "Athletics +7, Perception +4" -> "Athletics +10, Performance +5" — the Gladiator's own skills, each derived from this sheet's stat and PB
[reskin] print canon row: Actions/Shield Bash — the Gladiator's own
[reskin] class weapon: Actions/"Spear" -> "Longsword" — a paladin fights with a longsword, not the Gladiator's
[reskin] row binds its clause: "Dawnline Blessing" answers "blesses her soldiers" — the keys it matched came from that clause, so the coverage credit has a receipt
[harness] re-rolled Actions/"Longsword" -> "Longsword" [the call's own text]
```

**Re-roll — one entry, replaced**

```
Actions / BEFORE  Longsword: *Melee Attack Roll:* +7, reach 5 ft. 11 (2d6 + 4) Slashing damage.
Actions / AFTER   Longsword: *Melee Attack Roll:* +7, reach 5 ft. 11 (2d6 + 4) Radiant damage.
provenance: none — the call wrote the text itself
```


---

## Mace Warden — in the run

**Concept:** a templar priest with a mace and no magic at all

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Mace Warden | 4 | defender-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 3 / off 4 → 3.5; sustained 26 (2 × Mace); nova none; dmg 26

```
Mace Warden

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

Aura of Authority. While in a 10-foot Emanation originating from the warden, the warden and its allies have Advantage on attack rolls and saving throws, provided the warden doesn't have the Incapacitated condition.

Actions

Multiattack. The guard makes two Mace attacks.

Mace. Melee Attack Roll: +6, reach 5 ft. 13 (2d8 + 4) Bludgeoning damage, and the target has Disadvantage on its next attack roll before the start of the warden's next turn.

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

**Engine trace**

```
[path] class_npc — class paladin — "templar" (call)
[route] defender type=Humanoid mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | defender: ✓ ("a templar priest with a mace") | defender: no line key in the words — the model's read of its quote
[concept] resolve: archetype=defender type=Humanoid themes=armed/forged mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: mace and shield held in a line no one passes [object] | punishing strikes against anyone who breaks past [behavior] | iron-willed refusal to break [aura]
[concept] identity: Wades in with shield up and mace low, opening by pinning the nearest attacker against a wall and beating them down before stepping into the gap so no one slips past. Every round it holds ground and answers any withdrawal or flank with a short, brutal interception of the mace — plain iron, plain muscle, no blessing but the one it swings. It does not flee; bloodied, it plants its feet, lets the shield take the blows, and grinds the fight to whoever tries to move.
[concept] lore: An oathbound templar of a faith that lost its relics but not its orders, this priest was dispatched to hold the line at a shrine no god answers — and holds it anyway, swinging a mace for a congregation long since gone.
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
[reskin] inline declared: "the warden" — the call's own answer (kind), built from the name
[reskin] inline form: "the warden" — the model's own reading of the name
[reskin] lacks asked: "no magic at all"
[reskin] clauses: "a templar priest with a mace" -> has (mechanical) [asked: attack] | "no magic at all" -> LACKS (mechanical)
[reskin] signature idea (action): "When a foe it can see tries to slip around or past the warden, it swings the mace across their path — a short, brutal interception that stops them dead where they stand and puts them on their heels for the moment after. If they keep pressing, the next swing of that mace bites harder for the opening they gave it." [reaction/on_being_hit/condition] — menu: snap-shot, riposte (+ shelf: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, charge-push, hook-rider)
[reskin] word match declined by the call: riposte, snap-shot, own-turn-punisher — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit"
[reskin] signature miss: action — "When a foe it can see tries to slip around or past the warden, it swings the mace across their path — a short, brutal interception that stops them dead where they stand and puts them on their heels for the moment after. If they keep pressing, the next swing of that mace bites harder for the opening they gave it." [reaction/on_being_hit/condition] — the model found no template that holds it (offered: snap-shot, riposte, own-turn-punisher)
[reskin] fallback respects the call: own-turn-punisher left the shelf — the call declined it for this sheet
[reskin] fallback stands down: the class_npc path has no shelf — the Guard Captain's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 18 already beats print's 14 at CR 4, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "The warden's shield stays up and its mace stays low, and anyone who comes at it head-on finds the guard turning the blow and the answer already coming back at them. Whoever strikes the warden and misses eats a jab of the mace for the trouble, so the line holds by making attacking it a losing trade." [trait/on_being_hit/damage] — menu: absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura)
[reskin] word match declined by the call: absorption, bloodied-burst, resonant-body, weapon-lodge — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "The warden's shield stays up and its mace stays low, and anyone who comes at it head-on finds the guard turning the blow and the answer already coming back at them. Whoever strikes the warden and misses eats a jab of the mace for the trouble, so the line holds by making attacking it a losing trade." [trait/on_being_hit/damage] — the model found no template that holds it (offered: absorption, bloodied-burst, resonant-body, weapon-lodge)
[reskin] weapons answered: Mace = mace; Javelin = javelin
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] print canon alignment: Lawful Neutral -> Neutral — the Guard Captain's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon row: Actions/Longsword — the Guard Captain's second melee row, beside the chassis's
[reskin] print canon multiattack: "The guard makes two attacks, using Javelin or Longsword in any combination." — the Guard Captain's own
[reskin] ranged row off: "Javelin" leaves — the Guard Captain carries no ranged row and the words name none
[reskin] multiattack re-read — "Javelin" left; "Multiattack" now reads "The guard makes two Longsword attacks."
[reskin] class weapon: Actions/"Longsword" yields — the GM named a melee weapon, and the GM's weapon replaces print's rather than riding beside it
[reskin] multiattack re-read — "Longsword" left; "Multiattack" now reads "The guard makes two attacks."
[reskin] multiattack normalised: "The guard makes two Mace attacks."
```


---

## Vacant Courtier — in the run

**Concept:** a court wizard who is never where you struck and steps away

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Vacant Courtier | 6 | caster-6 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 3 / off 7 → 5; sustained 48 (3 × Arcane Burst); nova none; dmg 48

```
Vacant Courtier

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

Traits

Uncanny Evasion. If the courtier is subjected to an effect that allows it to make a Dexterity saving throw to take only half damage, the courtier instead takes no damage if it succeeds on the save and only half damage if it fails. It can't use this trait if it has the Incapacitated condition.

Actions

Multiattack. The courtier makes three Arcane Burst attacks.

Spellcasting. The courtier casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 14):

- At Will: Detect Magic, Light, Mage Armor, Mage Hand, Prestidigitation
- 2/Day Each: Fireball, Invisibility
- 1/Day Each: Cone of Cold, Fly

Arcane Burst. Melee or Ranged Attack Roll: +6, reach 5 ft. or range 120 ft. 16 (3d8 + 3) Force damage.

Bonus Actions

Misty Step (3/Day). The courtier casts Misty Step, using the same spellcasting ability as Spellcasting.

Shadow Slip (2/Day). The courtier teleports up to 30 feet to an unoccupied space it can see.

Reactions

Protective Magic (3/Day). Trigger: The courtier is hit by an attack roll. Response: The courtier casts Shield in response, gaining a +5 bonus to AC until the start of its next turn, including against the triggering attack.

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
- Actions/Spellcasting — print's own row
- Actions/Arcane Burst — print's own row
- Reactions/Protective Magic — mage kit; the GM's clause "wizard"
- Bonus Actions/Misty Step — mage kit; the GM's clause "is never where you struck and steps away"
- Bonus Actions/Shadow Slip — template phase-slip; library draw (seed unstamped); the GM's clause "is never where you struck and steps away"; binds the GM's words: step+shadow
- Traits/Uncanny Evasion — template evasion; library draw (seed unstamped); the GM's clause "is never where you struck and steps away"; binds the GM's words: never where

**Engine trace**

```
[path] class_npc — class mage — "wizard" (call)
[route] caster (artillery) type=Humanoid mechanics=teleport — casts: implied by the kind — "a court wizard" | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | caster: ✓ ("a court wizard") | caster: no line key in the words — the model's read of its quote
[concept] resolve: archetype=caster type=Humanoid themes=arcane/uncanny mind=sapient style=— energy=Force mix=energy identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: teleport
[concept] signature elements: never where the blow lands — steps away from each strike [behavior] | a body of clinging, half-present shadow [body] | precise arcane bolts cast from an angle you didn't guard [behavior]
[concept] identity: A court wizard wrapped in shadow-stuff, it opens by letting an attacker's first blow pass straight through a vacated afterimage while a force bolt cracks back from where it truly stands. Every round it steps sideways through space between strikes, trading ground for angles and punishing overextension with precise arcane bolts, never letting a blade find the same place twice. It is patient and theatrical under pressure, preferring to slip away and return on its own terms rather than ever stand and trade — but it fights to the last trick before it truly flees.
[concept] lore: A wizard who bargained their own substance for a court position that could never be revoked, they now haunt the palace corridors as a half-present shadow, wanting only to be indispensable and never again be caught.
[reskin] energy withheld: Force on a Humanoid with no Force in the concept's own words (fixed phrases read first)
[reskin] [path] class body: the mage stands on the Mage — the class's own print block, nearest CR 6
[reskin] print canon defenses: HP 89 -> 81, AC 15 -> 15 — the Mage's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 9, DEX 14, CON 11, INT 17, WIS 12, CHA 11 — the Mage's at its own CR; attack +7 -> +6, DC 14 (print's)
[reskin] donor: caster-6 -> CR 6
[reskin] [path] decides: class_npc on the Mage · class mage (the matcher would have said twist Mage)
[reskin] print canon: "a court wizard who is never where you struck and steps away" heads on the Mage — print's rows ride along; the seat stays
[reskin] repair round 1: 2 defect(s) — name "Force Bolt" is a launcher but the row swings in melee — a crossbow never has reach; use a thrown weapon or a blade | "Force Bolt" deals Force on a Humanoid whose concept names no Force — a name is not a warrant; use a physical type
[reskin] class kit: Protective Magic — the sheet already carries it, so the mage kit adopts that row: the cap may no longer read it as filler
[reskin] class kit: mage — "wizard": Misty Step (3/Day) (Mage/Misty Step)
[reskin] inline declared: "the courtier" — the call's own answer (kind), built from the name
[reskin] inline form: "the courtier" — the model's own reading of the name
[reskin] energy withheld on a base row: "Force Bolt" Force -> Piercing (the row's own noun; a Humanoid deals no Force its concept never gave it)
[reskin] lacks asked: nothing taken away
[reskin] lacks not claimed: "is never where you struck and steps away" reads like a lack to the words, and the call's list did not name it
[reskin] clauses: "a court wizard" -> has (descriptive), head | "is never where you struck and steps away" -> has (mechanical) [asked: on_being_hit/movement]
[reskin] menu pruned: action — snap-shot (the sheet cannot render them)
[reskin] signature idea (action): "The courtier lines up a bolt against a foe it can see clearly and, as it strikes, the shadow-stuff it sheds clings to that target for a moment, smothering the light around them so their own guard drops. While the clinging shadow lasts, the courtier's next strikes against that foe come from an angle they never thought to guard, and the courtier can drag itself a short distance through the shadow to" [rider/on_hit/condition] — menu: bolt-restrain, bolt-drag, bolt-mark (+ shelf: thrown-burst, gaze-single, snare, zone, execute, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, snare-bolt, slow-bolt, sensory-strike, herd, thrown-burst-seed, drain, delayed-brand, curse-debt, zone-seed, reveal, wind-up, blighted-ground, lay-on-hands, aggro-curse, self-invisibility, rally, phase-slip)
[reskin] signature bound to the concept's verb: action — phase-slip (step)
[reskin] word match declined by the call: bolt-drag, bolt-restrain, bolt-mark, lure, obstacle-pull, snare-bolt, sensory-strike, reveal — the key word does not mean the mechanic here
[reskin] signature template: phase-slip -> Bonus Actions/"Shadow Slip (2/Day)" ("The courtier is never where the blow lands and slips away through the shadow-stu [verb: step:concept, shadow:idea]")
[reskin] keys spent by the action: step
[reskin] signature idea (trait): "The courtier's body is a half-present smear of shadow that clings to whatever passes through it; anyone who strikes it in melee finds a strand of that shadow hooked onto their weapon or arm, tethering them a … behind its own movements until they tear free." [trait/on_being_hit/movement] — menu: absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst, evasion)
[reskin] signature bound to the concept's verb: trait — evasion (never where)
[reskin] word match declined by the call: faultless-tracker, web-walker — the key word does not mean the mechanic here
[reskin] signature template (trait): evasion -> Traits/"Absent Step" ("the courtier is never where the blow lands — blows that catch it slip off its ha [verb: never where:concept]")
[reskin] weapons answered: Force Bolt = none
[reskin] weapon declined: "Force Bolt" reads crossbow from its name, but the call answered none — the row carries no weapon
[reskin] weapon table: "Force Bolt" — a launcher, never thrown, range 80/320
[reskin] languages by mind: "Common, plus one other" -> "Common" (sapient)
[reskin] print canon languages: "Common" -> "Common and any three languages" — the Mage's
[reskin] print canon row: Actions/Arcane Burst — the Mage's own melee row, added (the chassis carried none to rename)
[reskin] print canon multiattack: "The courtier makes three Arcane Burst attacks." — the Mage's own
[reskin] ranged row off: "Force Bolt" leaves — the Mage carries no ranged row and the words name none
[reskin] print canon skills: "Arcana +6, Perception +4" -> "Arcana +6, History +6, Perception +4" — the Mage's own skills, each derived from this sheet's stat and PB
[reskin] print canon row: Actions/Spellcasting — print's own list replaces the chassis's
[reskin] darkvision withheld: a Humanoid with no species kit granting it, no word for it in the GM's own text, and no print body that has it — print gives darkvision to 1 of 26 Humanoids ("darkvision 60 ft.; Passive Perception 14" -> "Passive Perception 14")
[reskin] row binds its clause: "Shadow Slip" answers "is never where you struck and steps away" — the keys it matched came from that clause, so the coverage credit has a receipt
[reskin] row binds its clause: "Absent Step" answers "is never where you struck and steps away" — the keys it matched came from that clause, so the coverage credit has a receipt
[reskin] ask vs row MISMATCH: "is never where you struck and steps away" -> "Misty Step" — trigger: asked on_being_hit, row reads at_will
audit finding below confidence gate: Shadow Slip No timing trigger or action-cost statement ties the teleport to the bonus action beyond the header, and no origin restriction is given, leaving the destination-and-origin unresolved for adjudication.
[reskin] audit rename: "Absent Step" -> "Uncanny Evasion"
```


---

## Shadow Shinobi — in the run

**Concept:** a ninja who moves through the shadows and strikes unseen

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Shadow Shinobi | 5 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- **dropped clause:** "moves through the shadows"
- read: def 5 / off 5 → 5; sustained 34 (2 × Shortsword); nova none; dmg 34

```
Shadow Shinobi

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

Assassinate. During the first round of each combat, the shadow shinobi has Advantage on attack rolls against any creature that hasn't taken a turn. If the shadow shinobi hits a creature during that round, the target takes an extra 9 (2d8) Piercing damage.

Evasion. If the shadow shinobi is subjected to an effect that allows it to make a Dexterity saving throw to take only half damage, the shadow shinobi instead takes no damage if it succeeds on the save and only half damage if it fails. It can't use this trait if it has the Incapacitated condition.

Actions

Multiattack. The shadow shinobi makes two attacks, using Shortsword or Shortbow in any combination.

Shortsword. Melee Attack Roll: +6, reach 5 ft. 17 (4d6 + 3) Piercing damage. If the target is a creature and doesn't already have a sliver of living darkness, it is subjected to the following effect. Constitution Saving Throw: DC 13. Failure: The target receives a sliver of living darkness. While wounded, the target loses 5 (1d10) Hit Points at the start of each of its turns. The wound closes after 1 minute, after a spell restores Hit Points to the target, or after the target or a creature within 5 feet of it takes an action to stanch the wound, succeeding on a DC 13 Wisdom (Medicine) check.

Shortbow. Ranged Attack Roll: +6, range 80/320 ft. 16 (3d8 + 3) Piercing damage.

Bonus Actions

Cunning Action. The shadow shinobi takes the Dash, Disengage, or Hide action.

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
- Actions/Shortsword — print's own row, renamed; binds the GM's words: wound; weapon shortsword
- Actions/Shortbow — print's own row, renamed; weapon shortbow
- Bonus Actions/Cunning Action — rogue kit; the GM's clause "ninja"

**Engine trace**

```
[path] class_npc — class rogue — "ninja" (call)
[route] skirmisher-skulker type=Humanoid mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | skirmisher-skulker: ✓ ("strikes unseen") | skirmisher-skulker: key "unseen" (class verb)
[concept] resolve: archetype=skirmisher type=Humanoid themes=uncanny/armed mind=sapient style=skulker energy=Necrotic mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: strikes unseen from shadow and vanishes again [behavior] | a body made of living darkness [body] | blade-drawn hunts that toy with prey [behavior]
[concept] identity: This shadow-ninja opens combat from concealment, striking once from darkness for advantage and vanishing before the wound is noticed. Every round after it re-hides, repositions through shadow, and lands a single precise blow before slipping away again. Under pressure it dissolves into the dark and keeps stalking — it toys with prey across a long hunt rather than standing to trade blows, and flees only when light denies it every hiding place.
[concept] lore: A shinobi who gave their body to the shadow-realm to escape a death they could not win, it now walks half within the dark and rebuilds its name one silent kill at a time.
[reskin] energy withheld: Necrotic on a Humanoid with no Necrotic in the concept's own words (fixed phrases read first)
[reskin] [path] class body: the rogue stands on the Bandit Captain — the class's own print block, nearest CR 5
[reskin] print canon array: STR 15, DEX 16, CON 14, INT 14, WIS 11, CHA 14 — the Bandit Captain's, DEX fitted to +6
[reskin] donor: skirmisher-3-skulker -> CR 5
[reskin] row gated out: Ranged Save Effect (gaze) — the concept did not claim this mechanic
[reskin] row gated out: Teleport (teleport) — the concept did not claim this mechanic
[reskin] [path] decides: class_npc on the Bandit Captain · class rogue (the matcher would have said homebrew)
[reskin] print canon: "a ninja who moves through the shadows and strikes unseen" heads on the Bandit Captain — print's rows ride along; the seat stays
[reskin] class kit: Cunning Action — the sheet already carries it, so the rogue kit adopts that row: the cap may no longer read it as filler
[reskin] class kit: rogue — "ninja": Evasion (evasion), Assassinate (assassinate)
[reskin] inline by rule: "the shadow shinobi" — the call answered "the Shinobi" (kind), which the name does not support
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a ninja" -> has (descriptive), head | "moves through the shadows" -> has (descriptive) | "strikes unseen" -> has (mechanical)
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "When the shinobi strikes a foe that cannot see it, the wound opens onto the shadow-realm: a sliver of living darkness clings to the wound and begins eating the victim's own shadow, dragging them down and holding them fast while it keeps gnawing. The creeping dark only takes hold on a strike made from concealment, and it releases its grip once the victim tears free or the shinobi is destroyed." [rider/on_hit/condition] — menu: affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, isolation, bolt-mark (+ shelf: leap, gaze-single, snare, condition-payoff, throw-retrieve, shield-bash, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, exploiter, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte)
[reskin] signature bound to the concept's verb: action — self-invisibility (unseen)
[reskin] word match declined by the call: hook-rider, self-invisibility — the key word does not mean the mechanic here
[reskin] signature rider: affliction -> Blade (appended; A strike from concealment leaves living darkness clinging to the wound, gnawing  [verb: wound:idea])
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 16 already beats print's 15 at CR 5, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "The shinobi's body is not wholly here; standing in shadow or darkness it can pull itself almost entirely into the shadow-realm, fading from sight and slipping past anything that would pen it in. In true light — bright sun or a lantern's glare — the shadows it needs are stripped away and it cannot vanish at all." [trait/always/defense] — menu: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] word match declined by the call: terrain-walk, false-appearance — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "The shinobi's body is not wholly here; standing in shadow or darkness it can pull itself almost entirely into the shadow-realm, fading from sight and slipping past anything that would pen it in. In true light — bright sun or a lantern's glare — the shadows it needs are stripped away and it cannot vanish at all." [trait/always/defense] — the model found no template that holds it (offered: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst)
[reskin] weapons answered: Blade = dagger; Shuriken = shuriken
[reskin] weapon declared: "Blade" is a dagger — the call's own answer (the name alone read longsword)
[reskin] weapon table: "Shuriken" — range 30/90 ft. is not a print range; an unlisted thrown thing is 20/60, a hurled mass 60/240 (the critic's third species read)
[reskin] print canon modes: climb off — the Bandit Captain has no such mode and the words name none
[reskin] speed by body: a Humanoid walks 30 ft. (print's people; a hermit ran 50 — critic's audit 2026-10-02)
[reskin] speed by concept: dropped Climb 30 ft. — the concept's movement set decides
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] print canon alignment: Neutral Evil -> Neutral — the Bandit Captain's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common" -> "Common, Thieves' cant" — the Bandit Captain's
[reskin] print canon attack: "Blade" -> "Scimitar" — the Bandit Captain's own row
[reskin] print canon attack: "Shuriken" -> "Pistol" — the Bandit Captain's own ranged row
[reskin] on-hit extra retyped: "Assassinate" adds Slashing, not Bludgeoning — the hit's own type (Scimitar)
[reskin] print canon: chassis row leaves — Traits/"Shadow Step" is the seat's, not the Bandit Captain's
[reskin] on-hit extra retyped: "Assassinate" adds Piercing, not Slashing — the class weapon's own type (Shortsword)
[reskin] class weapon: Actions/"Scimitar" -> "Shortsword" — a rogue fights with a shortsword, not the Bandit Captain's
[reskin] class weapon: Actions/"Pistol" -> "Shortbow" — a rogue fights with a shortbow, not the Bandit Captain's
[reskin] vulnerability rejected — "Radiant" has no warrant in the concept's own text (print's default is none)
audit finding below confidence gate: Shortsword 2014-format save phrasing: the save is described as an effect the target is 'subjected to' with no timing statement indicating when the save is made relative to the hit.
```


---

## Gritpick Ledgerling — in the run

**Concept:** an imp rogue who picks locks for a devil

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Gritpick Ledgerling | 4 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- **dropped clause:** "picks locks for a devil"
- read: def 3 / off 4 → 3.5; sustained 30 (2 × Sting); nova none; dmg 30

```
Gritpick Ledgerling

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

Senses darkvision 60 ft.; Passive Perception 13

Languages Common, Infernal

CR 4 (XP 1,100; PB +2)

Traits

Magic Resistance. The ledgerling has Advantage on saving throws against spells and other magical effects.

Actions

Multiattack. The ledgerling makes two Sting attacks.

Sting. Melee Attack Roll: +6, reach 5 ft. 8 (1d8 + 4) Piercing damage plus 7 (2d6) Poison damage.

Shape-Shift. The ledgerling shape-shifts to resemble a rat (Speed 20 ft.), a raven (20 ft., Fly 60 ft.), or a spider (20 ft., Climb 20 ft.), or it returns to its true form. Its statistics are the same in each form, except for its Speed. Any equipment it is wearing or carrying isn't transformed.

Invisibility. The ledgerling casts Invisibility on itself, requiring no spell components and using Charisma as the spellcasting ability.

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
- Actions/Sting — print's own row, renamed
- Actions/Shape-Shift — print's own row
- Actions/Invisibility — print's own row

**Engine trace**

```
[path] twist — Imp (is) — class rogue — "imp" (call)
[route] skirmisher-skulker type=Fiend mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | skirmisher-skulker: ✓ ("picks locks") | skirmisher-skulker: no line key in the words — the model's read of its quote
[concept] resolve: archetype=skirmisher type=Fiend themes=fiendish/grasping mind=sapient style=skulker energy=Fire mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: picking locks and seals with a hooked pick [object] | striking from tiny gaps and vanishing again [behavior] | ember-hot ash drifting from its body [body]
[concept] identity: A lock-picking imp shadows its devil's mark from a crack in the wall, then darts in to bury a hooked pick in the back of the neck and vanishes down a keyhole-sized gap before the target can turn. Each round it flits from one bolt-hole to the next, sawing at straps and locks with a notched pick and flicking ember-hot filings into eyes to keep the fight blind, driven by a greedy little foreman who counts every severed clasp as coin owed. Cornered or bloodied, it shrieks its master's name and slips away to finish another day — never a fair fight, always a locked door between it and death.
[concept] lore: Forged from a hoarded ash-heap in a devil's counting-house, the imp serves as its keeper's lock-thief and debt-collector, trading every opened vault for a scrap of a promised promotion.
[reskin] print canon route: the Imp's body outranks the skulker seat — no verb in the words names it; the plain skirmisher line
[reskin] print canon array: STR 6, DEX 18, CON 13, INT 11, WIS 12, CHA 14 — the Imp's, DEX fitted to +6
[reskin] donor: skirmisher-3 -> CR 4
[reskin] [path] decides: twist on the Imp · class rogue (the matcher agrees)
[reskin] print canon: "an imp rogue who picks locks for a devil" heads on the Imp — print's rows ride along; the seat stays
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline declared: "the ledgerling" — the call's own answer (kind), built from the name
[reskin] inline form: "the ledgerling" — the model's own reading of the name
[reskin] save dc derived: DC 13 -> 14 (8 + PB 2 + the sheet's best 4) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "an imp rogue" -> has (descriptive), head | "picks locks for a devil" -> has (descriptive)
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The ledgerling's pick is notched to shear metal, and it drives it into whatever seals its target shut — buckles, clasps, straps, hinges, the hasp of a helm. When the blow lands, the target's own gear springs open and sloughs away, leaving armor gaping and carried things spilling at its feet." [rider/on_hit/condition] — menu: affliction, contagion, charge-push, hook-rider, pounce, isolation, charge (+ shelf: trample, leap, gaze-single, snare, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, riposte)
[reskin] decline reason: action — the call answered none and names it "no_fit"
[reskin] signature miss: action — "The ledgerling's pick is notched to shear metal, and it drives it into whatever seals its target shut — buckles, clasps, straps, hinges, the hasp of a helm. When the blow lands, the target's own gear springs open and sloughs away, leaving armor gaping and carried things spilling at its feet." [rider/on_hit/condition] — the model found no template that holds it (offered: affliction, contagion, charge-push, hook-rider, pounce, isolation, charge, self-invisibility, riposte)
[reskin] fallback stands down: the twist path has no shelf — the Imp's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 16 already beats print's 14 at CR 4, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "Its hooked pick finds the seam in any lock or seal it is set against, and it works that seam with greedy patience — every door, chest, manacle, or chained gate it touches gives way in time, however well it was meant to hold." [trait/always/resource] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst, sealed-body (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature bound to the concept's verb: trait — sealed-body (locked)
[reskin] word match declined by the call: sealed-body, adhesive — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit" after being shown sealed-body, which the GM's words keyed
[reskin] key match declined: trait — "sealed-body" was ranked first on the call's own menu for locked, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: trait — "Its hooked pick finds the seam in any lock or seal it is set against, and it works that seam with greedy patience — every door, chest, manacle, or chained gate it touches gives way in time, however well it was meant to hold." [trait/always/resource] — the model found no template that holds it (offered: sealed-body, false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst, heated-body)
[reskin] weapons answered: Pick = none
[reskin] speed by concept: dropped Climb 30 ft. — the concept's movement set decides
[reskin] languages by mind: "Infernal, understands Common but does not speak" -> "Infernal" (sapient)
[reskin] print canon alignment: Neutral -> Lawful Evil — the Imp's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Infernal" -> "Common, Infernal" — the Imp's
[reskin] print canon speed: 40 ft. -> 20 ft. — the Imp's walk; the concept's other modes stay
[reskin] print canon attack: "Pick" -> "Sting" — the Imp's own row
[reskin] immunities stamped for type: Fiend -> Poison; Poisoned
[reskin] print canon defenses: immunities Poison; Poisoned -> Fire, Poison; Poisoned; resistances none -> Cold — the Imp's own header lines
[reskin] resistances derived withheld: print's Imp owns the line (Cold)
[reskin] print canon trait: Magic Resistance — "an imp rogue who picks locks for a devil" is the Imp (print's own row)
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the seat's, not the Imp's
[reskin] print canon: chassis row leaves — Traits/"Bolt-Hole Flit" is the seat's, not the Imp's
[reskin] print canon row: Actions/Shape-Shift — the Imp's own
[reskin] print canon row: Actions/Invisibility — the Imp's own
```


---

## Brutal Tormentor — in the run

**Concept:** a minotaur reaver who herds prey into the maze

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Brutal Tormentor | 6 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 4 / off 6 → 5; sustained 44 (2 × Gore); nova none; dmg 44

```
Brutal Tormentor

Large Monstrosity, Chaotic Evil

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

Multiattack. The tormentor makes two Gore attacks.

Gore. Melee Attack Roll: +7, reach 10 ft. 22 (4d8 + 4) Piercing damage.

Bonus Actions

Charge. The tormentor moves up to half its Speed straight toward an enemy it can see.

Maze Herding (Recharge 5-6). Wisdom Saving Throw: DC 14, each creature of the tormentor's choice within 30 feet. Failure: The target immediately moves up to half its Speed in a direction of the tormentor's choice, using the safest available route.

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
- Actions/Gore — the chassis
- Bonus Actions/Charge — minotaur kit; the GM's clause "a minotaur reaver who herds prey into the maze"
- Bonus Actions/Maze Herding — template herd; library draw (seed unstamped); the GM's clause "herds prey into the maze"; binds the GM's words: herd

**Engine trace**

```
[path] refused: print_body "Minotaur" is not in the corpus
[path] homebrew — species minotaur — "a minotaur reaver who herds prey into the maze" (call)
[route] brute type=Monstrosity mechanics=grapple — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | brute-charger: ✓ ("herds prey into the maze") | brute-charger: no line key in the words — the model's read of its quote | brute-charger -> brute: a charger is a mechanic engine and needs a key in the words — the model's read of its quote cannot land it
[concept] name: provided_name rejected — "a minotaur reaver who herds prey into th…" is the description, not a name
[concept] resolve: archetype=brute type=Monstrosity themes=bestial/terror mind=sapient style=— energy=Poison mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: grapple
[concept] signature elements: herding prey into the maze [behavior] | thorned, maze-grown hide [body] | brutal horn and great weapon [object]
[concept] identity: The reaver opens by crashing through brush or cracking a wall to drive its quarry where it wants them, then stays between the prey and open ground — never striking to kill while a path remains. Every round it uses its bulk and horn-shoves to funnel fleeing creatures deeper into the tangle, breaking off only to gore the one that slips past, and it fights to the death once its prey reaches the labyrinth's heart. Under pressure it does not flee; it redoubles, herding itself and its enemies into the dead end it knows best.
[concept] lore: A bull-blooded monstrosity born from a warren it has never left, it regards every intruder as a sacrifice owed to the walls, driving them inward so the maze may feed.
[reskin] donor: brute-5 -> CR 6
[reskin] [path] decides: homebrew (the matcher agrees)
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] species kit: minotaur — "a minotaur reaver who herds prey into the maze": Charge (Troll/Charge); darkvision 60 ft.
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline declared: "the tormentor" — the call's own answer (kind), built from the name
[reskin] inline form: "the tormentor" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] asked field dropped: the call answered trigger "at_will" for "herds prey into the maze" but offered no quote
[reskin] asked field dropped: the call answered limit "at_will" for "herds prey into the maze" but offered no quote
[reskin] clauses: "a minotaur reaver" -> has (descriptive), head | "herds prey into the maze" -> has (mechanical) [asked: movement]
[reskin] signature idea (action): "The tormentor slams its horns through the ground and tears them sideways, ripping up a wall of thorned, maze-grown growth that seals off the space behind whoever it faces — brush and briars erupt in a line across open ground, cutting off the easy retreat and pinching the prey toward the deeper tangle. It can only do this where there is earth underfoot, and the wall withers away on its own after a " [action/save/movement] — menu: trample, thrown-burst, shield-bash, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up (+ shelf: leap, rampage, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, affliction, contagion, stunning-strike, charge-push, hook-rider, pounce)
[reskin] signature bound to the concept's verb: action — herd (herd)
[reskin] value check: "Maze Herding (2/Day)" EV 8.2 vs floor 35.5 (the whole Multiattack (2 attacks)) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature re-slotted: "Maze Herding" moves to a bonus action, Recharge-gated because it reaches an area (print: the Centaur Trooper's Trampling Charge) — EV 8.2 vs floor 3.4 there; the GM's verb keeps its row
[reskin] signature template: herd -> Bonus Actions/"Maze Herding (Recharge 5-6)" ("The tormentor forces creatures to move in a direction of its choosing, pinching  [verb: herd:concept]")
[reskin] keys spent by the action: herd
[reskin] signature idea (trait): "Its hide is a mat of maze thorns that bite anything that clings to it — blades and claws that land are answered by splinters that burrow in and slow the attacker's next step. The tormentor itself feels nothing from its own thorns, moving through the briar as though it were born to it." [trait/on_being_hit/damage] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] trait declined: "Maze Thorn Hide" — bound only on the idea's own words (thorns:idea, splinter:idea) with no key in the concept; a meat body earns its trait by the user's verb (the sniper's tracker, critic 2026-09-29)
[reskin] weapons answered: Gore = none
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] row binds its clause: "Maze Herding" answers "herds prey into the maze" — the keys it matched came from that clause, so the coverage credit has a receipt
audit finding below confidence gate: Maze Herding The save line omits the standard 'each ... makes a' connecting phrasing, leaving a fragment ('each creature of the tormentor's choice within 30 feet') without a verb, which is garbled statblock language.
[reskin] audit rename blocked — "Driving Shove" promises a push or a knockdown that "Maze Herding (Recharge 5-6)" does not deliver
```


---

## Ser Evander Loft — in the run

**Concept:** a knight-errant of the fallen order who shields the weak

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Ser Evander Loft | 7 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- **dropped clause:** "shields the weak"
- read: def 6 / off 8 → 7; sustained 52 (2 × Longsword); nova none; dmg 52

```
Ser Evander Loft

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

Aura of Authority. While in a 10-foot Emanation originating from the loft, the loft and its allies have Advantage on attack rolls and saving throws, provided the loft doesn't have the Incapacitated condition.

Actions

Multiattack. The loft makes two Longsword attacks.

Longsword. Melee Attack Roll: +7, reach 5 ft. 26 (5d8 + 4) Slashing damage.

Shield. Strength Saving Throw: DC 14, one creature within 5 feet that the loft can see. Failure: 13 (3d8) Bludgeoning damage, and if the target is Medium or smaller, it has the Prone condition.

Shield Bash. Strength Saving Throw: DC 14, one creature within 5 feet that the loft can see. Failure: 24 (7d6) Bludgeoning damage. If the target is a Medium or smaller creature, it has the Prone condition. Success: Half damage only.

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
- Actions/Shield — template shield-bash
- Actions/Shield Bash — print's own row

**Engine trace**

```
[path] class_npc — class paladin — "knight-errant" (call)
[route] defender type=Humanoid mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | defender: ✓ ("who shields the weak") | defender: key "knight" (class verb)
[concept] name: provided_name rejected — "a knight-errant of the fallen order who …" is the description, not a name
[concept] resolve: archetype=defender type=Humanoid themes=armed/forged mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: shield-wall defense of the weak [behavior] | rusted iron plate and shield [body] | tarnished vow of the fallen order [aura]
[concept] identity: A fallen knight-errant advances first, planting its shield between the weak and the threat — every round after, it holds that ground and punishes anyone who tries to slip past it with a brutal shield-bash and iron-shod retort. It does not flee when bloodied; it fights to the death, hoarding its last strength to keep the line unbroken.
[concept] lore: Cast out of a disgraced order, this knight wanders the broken roads swearing its tarnished vows anew to any traveler it can stand before, believing a single held line can redeem a fallen banner.
[reskin] [path] class body: the paladin stands on the Gladiator — the class's own print block, nearest CR 7
[reskin] print canon array: STR 18, DEX 15, CON 16, INT 10, WIS 12, CHA 15 — the Gladiator's, STR fitted to +7
[reskin] donor: defender-5 -> CR 7
[reskin] row gated out: Guard Aura (aura) — the concept did not claim this mechanic
[reskin] [path] decides: class_npc on the Gladiator · class paladin (the matcher would have said homebrew)
[reskin] print canon: "a knight-errant of the fallen order who shields the weak" heads on the Gladiator — print's rows ride along; the seat stays
[reskin] class kit: paladin — "knight-errant": Aura of Authority (Hobgoblin Captain/Aura of Authority)
[reskin] shield is not a weapon: "Shield" takes print's Shield Bash shape beside Longsword — it was "*Melee or Ranged Attack Roll:* +7, reach 5 ft. or range 30/1…"
[reskin] inline by rule: "the loft" — the call answered "Ser Evander" (person), which the name does not support
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a knight-errant of the fallen order" -> has (descriptive), head | "shields the weak" -> has (mechanical) [asked: buff_ally]
[reskin] menu pruned: action — push-prone (the sheet cannot render them)
[reskin] signature idea (action): "When a foe turns to flee or slink past the knight's planted shield toward the travelers behind it, the knight answers with an iron-shod retort — a hard shove of the shield edge that sends the coward sprawling and pins them in place for a breath, denying the retreat it just tried to steal. The knight can only bare this cold courtesy while its vow still holds; once the line is truly broken it has no" [reaction/on_being_hit/condition] — menu: riposte (+ shelf: throw-retrieve, seal, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, herd, curse-debt, reveal, wind-up, exploiter, condition-payoff, patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, stunning-strike, charge-push, hook-rider)
[reskin] signature bound to the concept's verb: action — rally (shield, orders)
[reskin] word match declined by the call: riposte, own-turn-punisher — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit" after being shown rally, which the GM's words keyed
[reskin] key match declined: action — "rally" was ranked first on the call's own menu for shield+orders, and the call read it as no fit; the words keep their claim and nothing is forced
[reskin] signature miss: action — "When a foe turns to flee or slink past the knight's planted shield toward the travelers behind it, the knight answers with an iron-shod retort — a hard shove of the shield edge that sends the coward sprawling and pins them in place for a breath, denying the retreat it just tried to steal. The knight can only bare this cold courtesy while its vow still holds; once the line is truly broken it has no" [reaction/on_being_hit/condition] — the model found no template that holds it (offered: rally, riposte, slow-bolt, disarm, patient-defense, own-turn-punisher)
[reskin] fallback respects the call: rally, own-turn-punisher left the shelf — the call declined them for this sheet
[reskin] fallback stands down: the class_npc path has no shelf — the Gladiator's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 19 already beats print's 15 at CR 7, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "The tarnished vow hardens the knight as its own blood spills: the closer it comes to falling, the more stubbornly it refuses to yield ground, standing and striking with the last of its strength long after a sensible man would have folded." [trait/always/defense] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending, weapon-lodge)
[reskin] word match declined by the call: bloodied-fury, uncanny-sense, bloodied-burst, berserk, guarded-stance — the key word does not mean the mechanic here
[reskin] trait declined: "Tarnished Vow" — a shape fit with no verb match on a Humanoid body; a meat body earns its trait by a verb
[reskin] weapons answered: Longsword = longsword; Shield = shield
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] print canon alignment: Lawful Neutral -> Neutral — the Gladiator's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon attack: "Spear" keeps print's hybrid frame — reach 5 ft. or range 20/60 ft. (the Gladiator's weapon is thrown)
[reskin] print canon attack: "Longsword" -> "Spear" — the Gladiator's own row
[reskin] print canon row priced: Shield Bash — dice 9 → 24
[reskin] print canon row: Actions/Shield Bash — the Gladiator's own
[reskin] class weapon: Actions/"Spear" -> "Longsword" — a paladin fights with a longsword, not the Gladiator's
[reskin] multiattack normalised: "The loft makes two Longsword attacks."
audit finding below confidence gate: Shield Bash The save type is written as a bare 'Strength Saving Throw' without the 'DC 14' phrasing used elsewhere, and the block later says 'Success: Half damage only' while omitting the usual 'Failure:' label structure, making the action's save resolution format inconsistent with the block's other entries.
```
