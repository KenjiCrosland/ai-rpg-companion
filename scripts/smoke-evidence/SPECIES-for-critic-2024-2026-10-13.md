# Step 9a — the species kit, landing one — 2026-10-13

Brief: `STEP9-brief-2026-10-13.md` §2–3. Owner's rules in force: the SRD 5.2 corpus is the only verbatim source; a species the SRD lacks is composed from SRD pieces and authored flavor in the SRD's idiom; words trigger, mind gates, type never decides; explicit beats implied, free beats priced, print beats everything.

## What landed (`reskin/species.mjs`, the landing in `generate.mjs`, one word in the checker)

- **The table.** Nineteen species the SRD does not carry as bodies: lizardfolk, tortle, triton, grung, kenku, yuan-ti, satyr, troglodyte, aarakocra, owlin, harengon, tiefling, aasimar, dragonborn, orc, tabaxi, goliath, centaur, minotaur. Each is header lines (speed modes, senses, resistances — dragonborn's by its color word) plus rows of exactly two kinds: an SRD row **lifted** from the corpus and renamed to the creature (the Hydra's Hold Breath → "Meshrin can hold its breath for 15 minutes."; the Ghast's Stench at the sheet's DC; the Goblin Boss's Nimble Escape edited to a Dash for the orc's Relentless Rush), or a catalog shape with fixed fills (a marsh stride as the terrain-walk frame, Shell Defense as shell-withdraw). The SRD body species (kobold, goblin, hobgoblin, bugbear, gnoll, merfolk, sahuagin) are print aliases and are not here: print wins.
- **The lift.** Print's self-reference ("the hydra", "this ghast's") becomes the creature's inline; a DC becomes the sheet's; an edit list adjusts a number or a verb. The lifted row keeps its section (Nimble Escape is a Bonus Action).
- **The matcher.** Whole words or phrases over the grounded clause record and the Name field ("lizard folk" and "lizardfolk" both; "lizard" alone, "orca", a print alias match nothing).
- **The ladder, in code.** Header lines and lifted traits are the free tier and always land (dedupe by name). Flavor rows are the implied tier and land only under `rowCap(cr)` — print's own density, the median row count of SRD blocks in the CR band plus one (3 at CR 1, 4 at CR 4, 5 at CR 8, 6 at CR 12, 8 at CR 16, 10 at CR 24). The GM's own rows never yield; the trace names what did.
- **Header lines land after the directives and print's speed**, so a user-set walk and print's modes stand; a user's vulnerability or immunity outranks the species' resistance (a tiefling who "hates fire and takes extra damage from it" is vulnerable, not resistant).
- **Provenance.** Every kit row carries `kit` and `clause`; the checker counts it as covered and exempts it from the print-rows gate like a part or feature.
- **Found on the way, fixed, pinned:** within one step of print's CR the sheet took print's attack bonus but kept its own proficiency bonus ("a duelist" at CR 4 is the Gladiator: +7 on a PB +2 sheet failed derivation). The exact-body branch now takes print's PB with print's numbers.

Pins: `reskin/__tests__/species.spec.js` (the table resolves, the lift, the matcher, the cap, Meshrin, the tiefling both ways, the kobold) and the duelist in `canaries.spec.js`.

## Measurement: the species seven, the twelve, the canaries (2026-10-13, a provider stalling for up to 19 minutes a block)

| set | run | saved | fails | coverage | note |
|---|---|---|---|---|---|
| species seven (`species-seven.json`) | `species-seven-2026-10-13T02-42-06` (+ reruns folded in) | 7/7 | **0** | 7/7 (100%) | concept 42% — print bodies and one-liners; the kit rows count as the user's |
| the twelve | `step7-twelve-2026-10-13T03-08-29` (+ the knife ball rerun) | 12/12 | **0** | 29/31 (94%) | Meshrin 7/7 with Hold Breath and Swim 30 ft. beside every one of her rows; Grandmother Ash 6/7 |
| the canaries | `canaries-2026-10-13T03-50-05` (+ the well-thing rerun) | 10/10 | **0** | — | 9 of 10 intact; the tenth moved with the signature draw (below) |

**The species, block by block.** Lizardfolk hunter: Hold Breath, Swim (the model's 40 stands over the kit's 30: a mode present is never overwritten), the marsh stride yielding to the cap at CR 2. Orc warchief: Relentless Rush (a bonus-action Dash in the Nimble Escape idiom), darkvision 120, the greataxe part and Great Weapon Master. Tortle hermit: Hold Breath for 1 hour; Shell Defense yielding to the cap. Blue dragonborn knight: the Knight's own rows, Lightning resistance by the color word, darkvision 60. Troglodyte raider: Stench at the sheet's DC and Sunlight Sensitivity on a 2014 sheet. Tiefling duelist: darkvision, and the Fire vulnerability the GM typed with no Fire resistance beside it; the body is the Gladiator by the duelist alias. Kenku mimic: a Humanoid skulker with Mimicry, Dagger, Dart, Cunning Action — not the Mimic.

**Four defects the seven surfaced, all fixed and pinned before the run was read as clean:**
1. **Slot yield evicted kit rows.** A library seed landing in the bonus-action slot called the orc's Relentless Rush "the chassis's" and removed it. Kit and feature rows are the GM's, like parts; the slot-yield predicate now exempts them.
2. **"Dragonborn" routed to the dragon body.** The route's dragon body nouns listed it; a CR 6 knight was built on a dragon chassis with a breath weapon and Fly 60, and the Knight exact body then stripped everything but the sword. Removed from the body nouns; "half-dragon" denied; pinned in the route.
3. **A species word now outranks a monster alias.** "A kenku mimic" headed on the Mimic (Monstrosity): Adhesive, Pseudopod, Shape-Shift on a bird-person. Every print-canon read in the engine goes through one species-aware lookup; a print pick whose type differs from the species' type stands down. The checker applies the same rule, and its donor gate no longer re-looks the print up on its own.
4. **The species carries its type.** The model typed the kenku a Monstrosity; the kit's type lands unless the GM's words name a type (centaurs and satyrs Fey, minotaurs and yuan-ti Monstrosities, the player species Humanoid; the aarakocra's left to the words).

And one found by the tiefling before any of these: the exact-body branch within one step of print's CR now takes print's proficiency bonus with print's attack bonus (the CR 4 duelist-as-Gladiator).

**The canary that moved.** The thing in the well, same donor, Spur 12 → Tendril 17. The reference sheet drew a condition-payoff seed (22 damage beside a 12 Spur); this roll drew a shell-withdraw bonus action, and the shared budget priced the lone attack up to 17 — 34 a round against a CR 5 card of 40. The signature draw's variance on a band block, reported honestly as a move; not a regression, and the reference stands.

**Gate at close:** 183 suites, 5,213 tests, build clean. Pins: `species.spec.js` (11 tests) plus the duelist in `canaries.spec.js`. Not committed.

**Open for landing two (classes):** the species flavor tier almost never lands at low CR because print's own density there is three or four rows — expected under the ladder, but worth watching when class rows join; dragonborn breath as the body's nova; a species' own natural weapon (the lizardfolk's bite) as a default part when the GM names none.

## The critic's read of landing one (2026-10-13) — eight holds, three notes, pinned

1. **The sheet keeps its own PB.** Within one step of print's CR the exact-body branch no longer carries print's proficiency bonus; print's attack bonus and DCs re-derive off the sheet's PB (the CR 4 duelist is the Gladiator at +6 on PB +2, 2d6 + 4, DC 14). The ranged callback's print bonuses follow the same shift. The CR line and the PB line agree again.
2. **Kit and feature rows take the rows' short form.** The guess the kit and feature table stamp with now runs the same chain as the rows (the model's declared form included), and when the settled inline differs they are re-stamped to it. "Grestle Vane" declared "Grestle" speaks as Grestle on its Stench and Sunlight Sensitivity.
3. **Print's ranged row is ranged-only.** The chassis's hybrid frame had dressed the Knight's Heavy Crossbow with "reach 5 ft. or"; a print ranged row now reads `*Ranged Attack Roll:* +N, range X ft.` A hurled axe or hammer takes a thrown weapon's 20/60, not a greataxe at 120 feet.
4. **A denied clause never keys a template.** The matcher scrubs vulnerability clauses (damage taken, weakness, hatred of a damage type or material) and lacks of an ability ("cannot cast") before matching — narrowly, so "cannot leave the tower" still keys bound, "thoughts can't be read" still keys shielded-mind, and "hates being looked at" still keys the gaze aura. Heated body and fire aura are denied outright on a fire-vulnerable creature whatever word matched ("the burned forest"). "Mimic" in a voice-copying context is not a false-appearance word.
5. **Print's own rows stand on an exact body at print's CR.** The print-row pass no longer re-prices them or re-derives their DC: the Kraken's Lightning Strike is DC 23 for 33 (6d10) as print has it (shifted only by a PB step, which at print's CR is none).
6. **Languages.** A line that says the creature can't speak never gets "Common" prepended; a borrow keeps the concept's named tongues beside print's (the tiefling-as-Gladiator keeps Infernal); print's "None" on a beast body stays None.
7. **A spewed cloud is never a weapon type.** The spew frame takes the concept's energy, or Poison when the sheet has none; a cloud of ash deals Poison, not Piercing.
8. **The tortle.** Rerun with the fix round (below), the real sheet attached.

Notes taken: no shield beside a two-handed weapon in the 2014 armor guess (Meshrin's greatsword); on any print body, borrowed or exact, print's modes govern and the concept adds a mode only by naming it (the hag's untyped Swim); the corpus's five "And Primordial" languages lines read "and" (a data fix). Left for later as the critic placed it: the Reed Stalker's Assassinate from "stalks". Species languages (a tiefling's Infernal when the model names none) join the table in landing two.

Pins: `species.spec.js` ("the critic's read", 7 tests) and the corrected duelist pin in `canaries.spec.js`.

## Measurement after the fix round (2026-10-13, the provider still stalling — four blocks rerun alone at a 15-minute timeout)

| set | run | saved | fails | coverage | read |
|---|---|---|---|---|---|
| species seven | `species-seven-2026-10-13T06-00-51` (+ the orc rerun) | 7/7 | **0** | 7/7 (100%) | every hold visible on the sheets: "Orukk can hold its breath", "Skarn has Disadvantage", "Sablevox can mimic"; the tortle's Hold Breath for 1 hour with Shell Defense yielding to the cap at CR 3; the Knight's Heavy Crossbow `*Ranged Attack Roll:* +7, range 100/400 ft.`; the tiefling keeps Infernal beside the Gladiator's Common; the kenku's Languages line is single; the orc's Relentless Rush beside Great Weapon Master and a Handaxe |
| the canaries | `canaries-2026-10-13T06-21-00` | 10/10 | **0** | — | 10 of 10 intact (the well-thing moved with a donor flip, the route's roll); the Steingolem's Force Bolt +9, 22 (4d10) |
| the twelve | `step7-twelve-2026-10-13T06-24-11` (+ the Ash rerun) | 12/12 | **0** | 28/32 (88%) | Meshrin 7/7 with Hold Breath and Swim 30; the Kraken's Lightning Strike **DC 23 for 33 (6d10)** and "and Primordial"; Grandmother Ash 6/7 |

**The twelve's concept share is not read.** Two route calls and seven idea calls hit HTTP 500 ("the library stands in") in this run as in the last; the 66% is the provider's, not the kit's, as the critic directed. No bar moves on it.

**One note answered with a receipt.** The critic read the hag's Swim 30 as "neither the Green Hag's nor the words'". The SRD 5.2 Green Hag's speed line is `30 ft., Swim 30 ft.` (the Sea Hag's is Swim 40; the Night Hag has none), and the trace says so: "print canon speed: Swim -> 30 ft. — the Green Hag's own." The swim stands as print's. The modes rule still landed (on any print body, borrowed or exact, print's modes govern), which is what the note asked for in principle.

**One more defect under the spew, found by the rerun.** Ash's Noxious Spew still dealt Piercing after the Poison default: the solid-breath reader tested the whole concept and "Her nails are long and black" made a cloud of ash pierce. The solid read now stays in the breath's own clause (a drake that "breathes a cone of razor shards" still cuts). Pinned; Ash rerun and folded into the twelve.

## The critic's second read (2026-10-13) — six holds, seven notes, one metric, landed

**Holds**
1. **The German block was an echo.** The translation call returned the English rows under a translated header and the validator accepted it, so the Steingolem shipped print's English with German labels. The validator now rejects a response in which more than half the rows equal the English (the client retries, then the block ships in English and *says so*). The canaries carry the predicate the critic asked for: a translated block whose rows equal the twin's reads "untranslated (echo)" and moves — the old run now reads 9 of 10 by the check, as it should have.
2. **A name is never a type field.** The lint's name-type actuator wrote the dealt type into names ("Bludgeoning-Elk Stampede", "Bludgeoning Touch", "Reaper Bludgeon"). It now strips the wrong word and never inserts one; a word inside a hyphenated compound ("Thunder-Elk") is a name, not a type claim; when nothing honest is left to rename to, the mismatch stands unrenamed.
3. **Provenance.** An appended rider stamps its keys on the host row (the Bog Hound's drag on its Bite), and a duplicate size guard merges into the host's as print writes it. A bare print name the model typed mechanical ("a goblin warrior") is the head clause — the sheet is the creature — while "an owlbear with razor sharp claws" keeps its claws mechanical.
4. **Thrown named weapons carry their own type and range.** A hurled spear is Piercing at 20/60, a javelin at 30/120, a dagger at 20/60, an axe Slashing at 20/60 — not the frame's Bludgeoning at 30/120.
5. **A listed spell never shares a name with an attack row.** When a row and the Spellcasting list carry the same name, the spell leaves the list and the Multiattack's double mention collapses.
6. **A vulnerability is the GM's to type.** The ice-body rule now withholds the Fire resistance only; the vulnerability line appears only when the words say so. An INT 4 non-Humanoid speaks nothing unless the GM says it does.

**Notes taken:** the model's declared inline holds at most two words (no more "the warden shell-of-stone"); when the signature binds the shape the species kit yielded to the cap, the row is credited to the kit — its name, free tier, its clause; the scrub removes the denied *phrase*, not the clause it sits in ("a tiefling duelist who hates fire" keeps the duelist); print's alignment lands on an exact body (the Kobold is Neutral); a weak-armed grappler's escape DC keys off the sheet's save DC, and the checker reads it so; a species' own natural weapons (a kenku's talons, a lizardfolk's bite) are not a defect on its Humanoid sheet.

**Answered with receipts:** the SRD 5.2 Knight carries Multiattack, Greatsword and Heavy Crossbow only — there is no Parry in the corpus, so the trace landing two attack rows from print is correct.

**Left as the critic placed them (close-out):** "breathes scalding steam" landing as a contact aura rather than a spew; the Vault Tender's charge-named stomp; a seat label ("Skulker") leaking into a row name; a model-minted non-word ("Coin Peel").

Pins: `species.spec.js` ("the critic's second read", 6 tests) and the echo validator.

## Measurement after the second read (2026-10-13 afternoon; the provider stalling again — two blocks rerun alone)

| set | run | saved | fails | coverage | read |
|---|---|---|---|---|---|
| the canaries | `canaries-2026-10-13T14-14-20` (+ the Headless Horseman rerun) | 10/10 | **0** | — | **the Steingolem is in German** — Mehrfachangriff, Schlag, Kraftstrahl — and the echo predicate reads 0 rows untranslated; the Kobold is Neutral; 9 of 10 intact against the old reference |
| the twelve | `step7-twelve-2026-10-13T14-35-03` | 12/12 | **0** | 29/32 (91%) | no damage-type word in any row name; the Glacier Wyrm carries no vulnerability nobody typed; the Firstborn Hexer's spell list no longer names its Withering Ray; Meshrin 7/7; Kraken 9/9; concept 73% (the provider steadier; still not a bar) |
| species seven | `species-seven-2026-10-13T14-32-35` (+ the orc rerun, below) | 7/7 | see below | 7/7 (100%) | "Sarn can hold its breath", the tortle's Shell Defense **credited to the kit**, Draconic on the lizardfolk and dragonborn, Orc on the orc, Infernal on the tiefling |

**The canary that kept moving, settled.** The thing in the well read 17 on its one attack in five consecutive runs of the current engine (12 in the reference from October 12, which drew a condition-payoff seed beside it — a seed the imposed-condition guard has since gated). The number is the engine's, not the roll's; the reference is rewritten from this run. Every other block holds to the digit or inside its band.

**One more defect the rerun found under the orc.** The hybrid chassis row the model named "Hand Axe" was narrowed to melee (the narrowing rule saw "axe"), became a word-for-word twin of the Greataxe, and the identical-text dedupe dropped the Greataxe — the GM's own part. Two rules fixed and pinned: a thrown weapon by name (hand axe, dagger, spear, javelin, trident, dart, light hammer, net) keeps its range, and print's rows and the GM's own — parts, species rows, features — never leave in a dedupe; the chassis copy does. The orc was rerun alone.

---

# 2024 blocks

## Review batch — species-seven-2026-10-13T14-32-35

The checker ran first. The gate table covers every block in the run; the blocks below span it (lowest CR, highest CR, a 2014 sheet, a 2024 sheet, a print donor, one marked soft). Each block carries its checker row above and its engine trace below. Hand-derive against the row first; then read for what predicates can't see.

### Gate table — the whole run

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Sarn of the Shallows | 2 | 2024 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 2/7 |
| Gormak Ironjaw | 5 (2014) | 2014 | defender-3-leader | ok | SOFT: band | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 2/6 |
| Uthlok the Unmoving | 3 | 2024 | brute-5-grappler | ok | SOFT: band | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 1/4 |
| Ordan Stormhollow | 6 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 0/2 |
| Vhaug Rottenbreath | 1 (2014) | 2014 | skirmisher-1 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 0/7 |
| Cinderbent | 4 | 2024 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/5 |
| Echo of No Name | 2 | 2024 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 1/6 |

**Dropped 0 of 7 user clauses** (coverage 100%); concept share 24% (9/37 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- none



---


### Ordan Stormhollow — highest CR

**Concept:** a blue dragonborn knight

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability |
|---|---|---|---|---|---|---|---|---|---|---|
| Ordan Stormhollow | 6 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 5 / off 8 → 6.5; sustained 52 (2 × Greatsword); nova none; dmg 52

```
Ordan Stormhollow

Medium Humanoid, Lawful Neutral

AC 19
Initiative +1 (11)

HP 91 (14d8 + 28)

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

Resistances Lightning

Senses darkvision 60 ft.; Passive Perception 14

Languages Draconic, Common

CR 6 (XP 2,300; PB +3)

Actions

Multiattack. Ordan makes two attacks, using Greatsword or Heavy Crossbow in any combination.

Greatsword. Melee Attack Roll: +7, reach 5 ft. 22 (4d8 + 4) Slashing damage plus 4 (1d8) Radiant damage.

Heavy Crossbow. Ranged Attack Roll: +7, range 100/400 ft. 22 (4d8 + 4) Piercing damage.

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
[route] defender type=Humanoid mechanics=none — defender: ✓ ("knight") | defender: no line key in the words — the model's read of its quote
[concept] signature elements: holds the line with shield and armor [behavior] | lightning-charged riposte against anyone who moves past [behavior] | blue dragonborn scale and storm-blooded heritage [body]
[reskin] print canon: "a blue dragonborn knight" is a print creature — the seats stand down; print's own rows are the composition
[reskin] print canon speed: modes walk only — the Knight's
[reskin] print canon senses: "none" — the Knight's
[reskin] print canon attack: "Longsword" -> "Greatsword" — the Knight's own row
[reskin] print canon attack: "Shield Bash" -> "Heavy Crossbow" — the Knight's own ranged row
```


---


### Sarn of the Shallows — a 2024 sheet

**Concept:** a lizardfolk hunter who stalks the marsh with a spear

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability |
|---|---|---|---|---|---|---|---|---|---|---|
| Sarn of the Shallows | 2 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1/2 / off 2 → 1.25; sustained 14 (2 × Spear); nova none; dmg 14

```
Sarn of the Shallows

Medium Humanoid, Neutral

AC 15
Initiative +3 (13)

HP 44 (8d8 + 8)

Speed 30 ft., Swim 40 ft.

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

Languages Common, Draconic

CR 2 (XP 450; PB +2)

Traits

Assassinate. During the first round of each combat, Sarn has Advantage on attack rolls against any creature that hasn't taken a turn. If Sarn hits a creature during that round, the target takes an extra 4 (1d8) Bludgeoning damage.

Hold Breath. Sarn can hold its breath for 15 minutes.

Marsh Stalker. Sarn ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Actions

Multiattack. Sarn makes two Spear attacks.

Spear. Melee Attack Roll: +5, reach 5 ft. 7 (1d8 + 3) Piercing damage, and the target has Disadvantage on its next attack roll before the start of Sarn's next turn.

Hurled Scythe. Ranged Attack Roll: +5, range 30/90 ft. 7 (1d8 + 3) Piercing damage.

Bonus Actions

Cunning Action. Sarn takes the Dash, Disengage, or Hide action.

Predatory Focus (2/Day). Sarn has Advantage on the next attack roll it makes before the end of its turn.

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
[route] skirmisher-skulker type=Humanoid mechanics=thrown-weapon — skirmisher: ✓ ("stalks the marsh with a spear") | skirmisher -> skirmisher-skulker: the concept's VERB outranks the noun (key "stalks", class verb) | skirmisher-skulker: key "stalks" (class verb)
[concept] signature elements: hurled spear from cover [object] | stalking the marsh [behavior] | brine-slicked hide [body]
[reskin] claim gate: CR 2 but a Humanoid body — the trait seat stays open (print: a material body carries a trait at every tier)
[reskin] signature idea (action): "Sarn lashes its spear low through the shallows, flinging a sheet of brine and silt into the eyes of everyone directly ahead of it in a short cone. Anyone caught in the splash is half-blind, struggling to track Sarn or land a clean strike until they can wipe their face. It is the marsh itself fighting alongside the hunter." [action/save/condition] — menu: snare, reel, throw-retrieve, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed (+ shelf: gaze-single, delayed-brand, rampage, blink, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte, contagion, charge-push, hook-rider, pounce, isolation, bolt-mark)
[reskin] signature bound to the concept's verb: action — focus, throw-retrieve (stalk, spear)
[reskin] signature re-poured: action — the idea left the concept's verb; the concept itself is poured into focus, throw-retrieve
[reskin] value check: "Marsh Stalker (2/Day)" EV 1.1 vs floor 1.1 (a bonus action (free)) — worth the trade
[reskin] signature template: focus -> Bonus Actions/"Predatory Focus (2/Day)" ("The idea's central verb 'stalk' matches the focus template's (concept) verb matc [verb: stalk:concept, track:idea]")
[reskin] signature idea (trait): "Sarn's hide stays permanently slick with marsh brine and algae; it leaves no trail and clings to nothing. While in or beside water, reeds, or mud, it can slip through the tightest cover without a sound, and creatures that try to grab or cling to it slide off." [trait/always/movement] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] signature bound to the concept's verb: trait — faultless-tracker (stalks, stalk)
[reskin] signature bound by force: trait — "faultless-tracker" matches stalks+stalk in the user's words; the model's none is overruled
[reskin] signature template (trait): assassinate -> Traits/"Assassinate" ("the seat owes it by print")
```


---


### Cinderbent — a print donor

**Concept:** a tiefling duelist who hates fire and takes extra damage from it

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability |
|---|---|---|---|---|---|---|---|---|---|---|
| Cinderbent | 4 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 4 / off 4 → 4; sustained 26 (2 × Spear); nova none; dmg 26

```
Cinderbent

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
+4
INT
10
+0
+0
MOD
SAVE
DEX
15
+2
+4
WIS
12
+1
+1
MOD
SAVE
CON
16
+3
+3
CHA
15
+2
+2

Skills Perception +3, Stealth +4

Vulnerabilities Fire

Senses darkvision 60 ft.; Passive Perception 13

Languages Common, Infernal

CR 4 (XP 1,100; PB +2)

Traits

Flame-Fear Fugue. While the cinderbent isn't Bloodied, melee attack rolls against it are made with Disadvantage.

Actions

Multiattack. The cinderbent makes two attacks, using Spear or Crossbow in any combination. It can replace one attack with a use of Shield Bash.

Spear. Melee Attack Roll: +6, reach 5 ft. 13 (2d8 + 4) Piercing damage.

Crossbow. Ranged Attack Roll: +4, range 80/320 ft. 11 (2d8 + 2) Piercing damage.

Shield Bash. Strength Saving Throw: DC 14, one creature within 5 feet that the cinderbent can see. Failure: 9 (2d4 + 4) Bludgeoning damage. If the target is a Medium or smaller creature, it has the Prone condition.

Reactions

Riposte. Trigger: A creature within 5 feet of the cinderbent misses it with a melee attack roll. Response: The cinderbent makes one Spear attack against that creature.

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
[route] skirmisher type=Humanoid mechanics=none — skirmisher: ✓ ("a tiefling duelist") | skirmisher: no line key in the words — the model's read of its quote
[concept] signature elements: darting duelist footwork [behavior] | rapier precision [object] | flammable ashen body [body]
[reskin] print canon pb: print's +7 on PB +3 reads +6 on this sheet's PB +2; DCs follow
[reskin] print canon defenses: HP 75 -> 112, AC 16 -> 16 — the Gladiator's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon armor: 16 (studded leather, shield) — print's Gear line; the 2014 sheet prints it (the Goblin Boss wore "splint", canaries 2026-10-12)
[reskin] print canon array: STR 18, DEX 15, CON 16, INT 10, WIS 12, CHA 15 — the Gladiator's at its own CR; attack +6 -> +6, DC 14 (print's, on this sheet's PB)
[reskin] print canon: "a tiefling duelist who hates fire and takes extra damage from it" heads on the Gladiator — print's rows ride along; the seat stays
[reskin] signature idea (action): "When the cinderbent hits a creature with its rapier, it can twist the blade and pin the wound shut around the steel, then pivot to hurl the impaled prey away from itself. The thrown creature is sent stumbling and cannot immediately rush back into the fight, which buys the duelist its signature retreating step." [rider/on_hit/movement] — menu: affliction, contagion, charge-push, hook-rider, pounce, isolation, bolt-mark, charge (+ shelf: trample, leap, gaze-single, snare, reel, throw-retrieve, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, rampage, blink, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte)
[reskin] signature bound to the concept's verb: action — riposte (duelist)
[reskin] signature bound by force: action — "riposte" matches duelist in the user's words; the model's none is overruled
[reskin] value check: "Riposte" EV 9.1 vs floor 2.3 (a reaction (free)) — worth the trade
[reskin] signature template: riposte -> Reactions/"Riposte" ("exact concept match [verb: duelist:concept, rapier:idea]")
[reskin] signature idea (trait): "The cinderbent's infernal blood carries an old terror of flame: whenever it takes fire damage, it must immediately abandon its weapons and flee as fast as it can, shrieking, for several seconds before its composure returns. It will not willingly enter or remain in any open flame while this terror lasts." [trait/on_being_hit/movement] — menu: absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, warded-mending, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] signature bound to the concept's verb: trait — guarded-stance (duelist)
[reskin] signature template (trait): guarded-stance -> Traits/"Flame-Fear Fugue" ("The idea is a fear-driven combat state the creature is in — while not yet 'broke [verb: duelist:concept]")
[reskin] print canon languages: "Common, Infernal" -> "Common, Infernal" — the Gladiator's plus the concept's Infernal
[reskin] print canon attack: "Rapier" -> "Spear" — the Gladiator's own row
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the seat's, not the Gladiator's
[reskin] print canon: chassis row leaves — Traits/"Ash Step" is the seat's, not the Gladiator's
[reskin] print canon row: Actions/Shield Bash — the Gladiator's own
```


---


### Uthlok the Unmoving — one marked soft

**Concept:** a tortle hermit who withdraws into his shell

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability |
|---|---|---|---|---|---|---|---|---|---|---|
| Uthlok the Unmoving | 3 | brute-5-grappler | ok | SOFT: band | ok | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 1.75 (print at 3 reads 0.375–5, n=83)
- read: def 1/2 / off 3 → 1.75; sustained 24 (2 × Claw); nova none; dmg 24

```
Uthlok the Unmoving

Medium Humanoid, Neutral

AC 13
Initiative -1 (9)

HP 67 (9d8 + 27)

Speed 30 ft.

MOD
SAVE
STR
16
+3
+5
INT
4
-3
-3
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
+3
CHA
4
-3
-3

Skills Athletics +5, Perception +2

Senses darkvision 30 ft.; Passive Perception 12

Languages Common

CR 3 (XP 700; PB +2)

Traits

Hold Breath. Uthlok can hold its breath for 1 hour.

Actions

Multiattack. Uthlok makes two Claw attacks.

Claw. Melee Attack Roll: +5, reach 5 ft. 12 (2d8 + 3) Slashing damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 13). While Grappled, the target has the Restrained condition.

Bonus Actions

Engulf. Uthlok engulfs one Medium or smaller creature it is grappling. While engulfed, the target has the Blinded and Restrained conditions, has Total Cover against attacks and other effects outside Uthlok, and takes 4 (1d8) Acid damage at the start of each of Uthlok's turns. Uthlok can have only one creature engulfed at a time. If Uthlok takes 9 damage or more in a single turn from the engulfed creature, Uthlok must expel the target at the end of that turn, and the target exits Prone in an unoccupied space within 5 feet of Uthlok. If Uthlok dies, an engulfed creature pulls free of the mass Prone by using 5 feet of movement.

Shell Defense. Uthlok withdraws into a boulder-like shell of fused, mineral-crusted plates. Until it emerges, it gains a +4 bonus to Armor Class and has the Prone condition; its Speed is 0 and can't increase, it has Disadvantage on Dexterity saving throws, it can't take Actions or Reactions, and it can emerge only as a Bonus Action.

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
[route] brute-grappler type=Humanoid mechanics=grapple, engulf — brute-grappler: ✓ ("withdraws into his shell") | brute-grappler: no line key in the words — the model's read of its quote
[concept] signature elements: withdrawing into its shell [behavior] | shell that engulfs and crushes [body] | hermit's hermetic isolation [aura]
[reskin] signature idea (action): "Uthlok pulls his head and limbs in, seals himself against the world, and becomes a boulder of fused shell. Until he chooses to emerge, his shell blunts almost all harm that comes at him and he cannot be forced to move or let go of what he holds, but he also cannot attack or pursue anyone. Anyone who stands within reach of the withdrawn shell finds the grinding mineral edge punishing them if they l" [trait/start_of_turn/defense] — menu: warded-mending (+ shelf: leap, condition-payoff, hook-drag, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, thrown-burst-seed, drain, wind-up, exploiter, shell-withdraw, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, affliction, contagion, charge-push, hook-rider, pounce)
[reskin] signature bound to the concept's verb: action — shell-withdraw (withdraw, shell)
[reskin] value check: "Sealed Bulwark" EV 3.6 vs floor 2 (a bonus action (free)) — worth the trade
[reskin] kit credited: the signature bound shell-withdraw, the shape the tortle kit yielded to the cap — the row is the kit's ("Shell Defense"), free tier
[reskin] signature template: shell-withdraw -> Bonus Actions/"Shell Defense" ("Uthlok pulls his head and limbs in, seals himself against the world, and becomes [verb: withdraw:concept, shell:concept]")
[reskin] signature idea (trait): "Uthlok's isolation is total: if no creature is grappling him, engulfed by him, or within reach of his claws at the start of his turn, he simply stops responding to the world, becoming unaware of anything beyond his shell until someone comes close enough to disturb his meditation." [trait/always/condition] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending, weapon-lodge)
[reskin] signature miss: trait — "Uthlok's isolation is total: if no creature is grappling him, engulfed by him, or within reach of his claws at the start of his turn, he simply stops responding to the world, becoming unaware of anything beyond his shell until someone comes close enough to disturb his meditation." [trait/always/condition] — no template on the shelf shares a verb with the concept or the idea (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst, absorption, bloodied-burst, resonant-body, warded-mending, weapon-lodge)
```


---

## Review batch — step7-twelve-2026-10-13T14-35-03

The checker ran first. The gate table covers every block in the run; the blocks below span it (lowest CR, highest CR, a 2014 sheet, a 2024 sheet, a print donor, a homebrew with a nova, one marked soft). Each block carries its checker row above and its engine trace below. Hand-derive against the row first; then read for what predicates can't see.

### Gate table — the whole run

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Meshrin | 8 (2014) | 2014 | brute-5 | ok | SOFT: band | ok | ok | ok | ok | ok | ok | soft (1) | 7/7 | 7/7 |
| Forgeborn Bull | 12 | 2024 | brute-11-charger | ok | SOFT: band | ok | ok | SOFT: lint:bps-immunity | ok | ok | ok | soft (2) | 6/6 | 6/7 |
| Grandmother Ash | 7 (2014) | 2014 | skirmisher-3 | ok | SOFT: band | ok | ok | ok | ok | ok | ok | soft (1) | 5/7 | 4/4 |
| Drowned Angler | 1 | 2024 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 1/4 |
| Glacier Wyrm | 20 | 2024 | dragon-22 | ok | SOFT: band, hot-offense | ok | ok | ok | ok | ok | ok | soft (1) | 2/2 | 7/9 |
| Storm-Herder | 13 | 2024 | defender-8-leader | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/5 |
| Goblin Warrior | 1 | 2024 | skirmisher-1 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/3 |
| Kraken | 24 (2014) | 2014 | brute-21 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 9/9 |
| Firstborn Hexer | 8 | 2024 | caster-8-binder | ok | SOFT: band | ok | ok | ok | ok | ok | ok | soft (1) | 0/1 | 1/5 |
| Sir Reginald Pemberton-Hughes | 5 (2014) | 2014 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 3/3 |
| Blade Drift | 2 (2014) | 2014 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 0/4 |
| Oxbow Snapper | 9 | 2024 | brute-8-grappler | ok | user-set: AC 22 · reads CR 12.5 | ok | ok | ok | ok | ok | ok | clean | 2/2 | 1/3 |

**Dropped 3 of 32 user clauses** (coverage 91%); concept share 73% (46/63 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- none



---


### Drowned Angler — lowest CR

**Concept:** a mud-caked bog hound that drags fishermen under

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability |
|---|---|---|---|---|---|---|---|---|---|---|
| Drowned Angler | 1 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1/8 / off 1 → 0.5625; sustained 12 (2 × Bite); nova none; dmg 12

```
Drowned Angler

Medium Beast, Unaligned

AC 13
Initiative -1 (9)

HP 30 (4d8 + 12)

Speed 30 ft., Swim 30 ft.

MOD
SAVE
STR
14
+2
+4
INT
4
-3
-3
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
+3
CHA
4
-3
-3

Skills Athletics +4, Perception +2

Senses darkvision 60 ft.; Passive Perception 12

Languages None

CR 1 (XP 200; PB +2)

Traits

Sure Footing. Difficult Terrain composed of mud doesn't cost the drowned angler extra movement, and the drowned angler can move across mud without needing to make an ability check.

Actions

Multiattack. The drowned angler makes two Bite attacks. It can replace one attack with a use of Retreating Haul.

Bite. Melee Attack Roll: +4, reach 5 ft. 6 (1d8 + 2) Piercing damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 12). While Grappled, the target has the Restrained condition.

Retreating Haul. Strength Saving Throw: DC 13, one creature within 20 feet. Failure: The target is pulled up to 15 feet straight toward the drowned angler by its jaws and has the Grappled condition (escape DC 12).

Bonus Actions

Whelm. The drowned angler whelms one Medium or smaller creature it is grappling. While whelmed, the target has the Blinded and Restrained conditions, has Total Cover against attacks and other effects outside the drowned angler, and takes 3 (1d6) Bludgeoning damage at the start of each of the drowned angler's turns. The drowned angler can have only one creature whelmed at a time. If the drowned angler takes 5 damage or more in a single turn from the whelmed creature, the drowned angler must release the target at the end of that turn, and the target exits Prone in an unoccupied space within 5 feet of the drowned angler. If the drowned angler dies, a whelmed creature pulls free Prone by using 5 feet of movement.

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
[route] brute-grappler type=Beast mechanics=grapple, engulf — brute-grappler: ✓ ("drags fishermen under") | brute-grappler: no line key in the words — the model's read of its quote
[concept] signature elements: mud-caked ambushing hide [body] | drags seized prey underwater [behavior] | locks its jaw and does not let go [behavior]
[reskin] claim gate: CR 1 but a Beast body — the trait seat stays open (print: a material body carries a trait at every tier)
[reskin] signature idea (action): "When the hound is gripping a creature in its jaw, it plants its feet and hauls backward, dragging the seized prey along with it toward deeper water or denser mud. The hound does not choose a safer path; it simply retreats in a straight line, and the grappled victim is forced to come along or be pulled off its feet." [bonus_action/always/movement] — menu: shell-withdraw, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating (+ shelf: swallow, hook-drag, active-toll, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, exploiter, contagion, charge-push, hook-rider, pounce)
[reskin] signature bound to the concept's verb: action — hook-drag, hook-rider (drag, under, drags)
[reskin] value check: "Retreating Haul" EV 2.8 vs floor 2.6 (one attack of 2) — worth the trade
[reskin] signature template: hook-drag -> Actions/"Retreating Haul" ("the hound hauls backward dragging the seized prey along with it; the grappled vi [verb: drag:concept, under:concept, grapple:idea, pull:idea, haul:idea]")
[reskin] signature idea (trait): "The hound's mud-caked hide blends perfectly with the bank or shallows it lies in. As long as it stays motionless, creatures approaching it can mistake it for a lump of mud or a half-sunk log until it lunges." [trait/always/defense] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending, weapon-lodge)
[reskin] signature bound to the concept's verb: trait — terrain-walk (bog, mud)
[reskin] signature bound by force: trait — "terrain-walk" matches bog+mud in the user's words; the model's none is overruled
[reskin] signature template (trait): terrain-walk -> Traits/"Sure Footing" ("exact concept match [verb: bog:concept, mud:concept, shallows:idea]")
```


---


### Forgeborn Bull — a 2024 sheet

**Concept:** A huge iron golem shaped like a bull. It charges and gores, its hooves shake the ground when it stomps, it breathes scalding steam from its nostrils, and it is immune to anything but adamantine weapons.

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability |
|---|---|---|---|---|---|---|---|---|---|---|
| Forgeborn Bull | 12 | brute-11-charger | ok | SOFT: band | ok | ok | SOFT: lint:bps-immunity | ok | ok | ok |

- bands · soft · band: reads CR 15 (print at 12 reads 8–14, n=15)
- headerBody · soft · lint:bps-immunity: Immunity to all three physical types — 0/329 printed blocks have it; the physical types are stripped from Immunities
- read: def 16 / off 14 → 15; sustained 84 (2 × Gore); nova Thunderhoof Stride 42; dmg 84

```
Forgeborn Bull

Huge Construct, Unaligned

AC 16
Initiative +0 (10)

HP 210 (20d12 + 80)

Speed 50 ft.

MOD
SAVE
STR
22
+6
+10
INT
5
-3
-3
MOD
SAVE
DEX
10
+0
+0
WIS
12
+1
+1
MOD
SAVE
CON
18
+4
+8
CHA
6
-2
-2

Skills Athletics +10, Perception +5

Resistances Fire

Immunities Poison, Bludgeoning, Piercing, and Slashing from nonmagical attacks that aren't adamantine; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned

Senses darkvision 60 ft.; Passive Perception 15

Languages Understands the languages of its creator but can't speak

CR 12 (XP 8,400; PB +4)

Traits

Heated Body. A creature that touches the iron bull or hits it with a melee attack while within 5 feet of it takes 10 (3d6) Fire damage.

Immutable Form. The iron bull can't shape-shift.

Magic Resistance. The iron bull has Advantage on saving throws against spells and other magical effects.

Actions

Multiattack. The iron bull makes two attacks, using Gore or Hooves in any combination.

Gore. Melee Attack Roll: +10, reach 10 ft. 42 (8d8 + 6) Piercing damage.

Hooves. Melee Attack Roll: +10, reach 5 ft. 42 (8d8 + 6) Bludgeoning damage, and the target has the Prone condition.

Thunderhoof Stride (Recharge 5-6). Dexterity Saving Throw: DC 18, each creature in a 15-foot Emanation originating from the iron bull. Failure: 42 (12d6) Bludgeoning damage, and the target has the Prone condition. Success: Half damage only.

Bonus Actions

Trample. Dexterity Saving Throw: DC 18, one creature within 5 feet that has the Prone condition. Failure: 18 (4d8) Bludgeoning damage. Success: Half damage.

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
[route] brute-charger type=Construct mechanics=breath — brute-charger: ✓ ("It charges and gores") | brute-charger: key "charges" (class verb)
[concept] signature elements: iron bull golem [body] | charging gore [behavior] | steam breath [behavior]
[reskin] signature idea (action): "The bull lowers its head and charges in a straight line, plowing through everything in its path with adamantine-hard horns. Anything it passes through is gored and hurled aside, and the ground itself splits under its thunderous stride, staggering those caught near the charge lane." [action/save/damage] — menu: swallow, leap, condition-payoff, hook-drag, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, herd, thrown-burst-seed, drain, wind-up, exploiter (+ shelf: shell-withdraw, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, affliction, contagion, charge-push, hook-rider, pounce)
[reskin] signature bound to the concept's verb: action — ground-burst (stomp, stomps)
[reskin] value check: "Thunderhoof Stride (Recharge 5-6)" EV 110.2 vs floor 69.3 (the whole Multiattack (2 attacks)) — worth the trade
[reskin] signature template: ground-burst -> Actions/"Thunderhoof Stride (Recharge 5-6)" ("the ground itself splits under its thunderous stride, staggering those caught ne [verb: stomp:concept, stomps:concept]")
[reskin] signature idea (trait): "The bull breathes scalding steam from its nostrils at the start of every round, filling the air around it with blistering vapor. Creatures that crowd close are punished for bunching up, their flesh seared and their formation broken." [trait/start_of_turn/damage] — menu: fire-aura, warded-mending (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, weapon-lodge, death-burst)
[reskin] signature bound to the concept's verb: trait — heated-body (scald, iron)
[reskin] signature bound by force: trait — "heated-body" matches scald+iron in the user's words; the model's none is overruled
[reskin] signature template (trait): heated-body -> Traits/"Heated Body" ("exact concept match [verb: scald:concept, iron:concept, sear:idea]")
```


---


### Glacier Wyrm — a homebrew with a nova

**Concept:** a glacier wyrm that swallows ships whole and freezes the sea

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability |
|---|---|---|---|---|---|---|---|---|---|---|
| Glacier Wyrm | 20 | dragon-22 | ok | SOFT: band, hot-offense | ok | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 22 (print at 20 reads 12.5–22.5, n=8)
- bands · soft · hot-offense: offense alone reads CR 25, 5 over; the HP axis pulls the read to 22
- read: def 19 / off 25 → 22; sustained 204 (3 × Bite + legendary Cold Snap); nova Freezing Breath 76; dmg 204

```
Glacier Wyrm

Gargantuan Dragon, Neutral

AC 21
Initiative +1 (11)

HP 333 (18d20 + 144)

Speed 40 ft., Fly 80 ft., Burrow 30 ft., Swim 40 ft.

MOD
SAVE
STR
26
+8
+8
INT
18
+4
+4
MOD
SAVE
DEX
12
+1
+7
WIS
16
+3
+9
MOD
SAVE
CON
26
+8
+8
CHA
24
+7
+7

Skills Perception +9, Stealth +7

Immunities Cold

Senses blindsight 60 ft., darkvision 120 ft., tremorsense 60 ft.; Passive Perception 19

Languages Common, Draconic

CR 20 (XP 25,000; PB +6)

Traits

Sure Footing. Difficult Terrain composed of ice or snow doesn't cost the glacier wyrm extra movement, and the glacier wyrm can move across ice or snow without needing to make an ability check.

Legendary Resistance (4/Day). If the glacier wyrm fails a saving throw, it can choose to succeed instead.

Actions

Multiattack. The glacier wyrm makes three Bite attacks. It can replace one attack with a use of Swallow.

Bite. Melee Attack Roll: +14, reach 15 ft. 21 (3d8 + 8) Piercing damage plus 13 (3d8) Cold damage.

Freezing Breath (Recharge 5-6). Constitution Saving Throw: DC 21, each creature in a 90-foot Cone. Failure: 76 (17d8) Cold damage. Success: Half damage.

Spellcasting. The glacier wyrm casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 21):

- At Will: Detect Magic, Command, Dispel Magic, Telekinesis

Swallow. Dexterity Saving Throw: DC 21, one Large or smaller creature within 10 feet that the glacier wyrm hit with a melee attack this turn. Failure: 42 (12d6) Cold damage, and the target is swallowed. A swallowed creature has the Blinded and Restrained conditions, has Total Cover against attacks and other effects outside the glacier wyrm, and takes 22 (5d8) Acid damage at the start of each of the glacier wyrm's turns. If the glacier wyrm takes 40 damage or more on a single turn from a creature inside it, it must succeed on a DC 21 Constitution saving throw at the end of that turn or regurgitate all swallowed creatures, each of which falls in a space within 10 feet of the glacier wyrm and has the Prone condition. If the glacier wyrm dies, a swallowed creature is no longer Restrained and can escape from the corpse using 15 feet of movement, exiting with the Prone condition.

Legendary Actions

Legendary Action Uses: 3. Immediately after another creature's turn, the glacier wyrm can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.

Cold Snap. The glacier wyrm makes one Bite attack.

Ice Slide. The glacier wyrm moves up to half its Speed without provoking Opportunity Attacks.

Frozen Dread. Wisdom Saving Throw: DC 21, one creature within 30 feet. Failure: The target has the Frightened condition until the end of its next turn.

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
[route] brute-grappler type=Dragon mechanics=grapple, engulf, breath — brute-grappler: ✓ ("swallows ships whole") | brute-grappler: key "swallows" (class verb)
[concept] signature elements: swallows ships whole [behavior] | hull-crushing constriction [behavior] | freezing the sea around it [aura]
[reskin] signature idea (action): "The glacier wyrm slams its tail or body down and a pulse of supernatural cold rolls outward, freezing the water and air in a broad ring around it. The sea surface turns to solid ice and the air fills with stinging frost, making the whole area treacherous and bitterly cold for anyone caught in it. The ice remains until the wyrm leaves or the area is broken, hindering movement and punishing those ex" [action/always/movement] — menu: swallow, condition-payoff, hook-drag, escalating-dread, terror-pulse, push-prone, herd, drain, exploiter (+ shelf: shell-withdraw, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, contagion, charge-push, hook-rider, pounce, charge)
[reskin] signature bound to the concept's verb: action — swallow (swallow, swallows, swallowed, whole)
[reskin] signature bound by force: action — "swallow" matches swallow+swallows+swallowed+whole in the user's words; the model's none is overruled
[reskin] value check: "Swallow" EV 46.8 vs floor 22.4 (one attack of 3) — a nova already stands — kept ungated, dice to 42 at the ceiling
[reskin] signature template: swallow -> Actions/"Swallow" ("exact concept match [verb: swallow:concept, swallows:concept, swallowed:concept, whole:concept]")
[reskin] signature idea (trait): "The glacier wyrm's presence chills everything near it, and its breath leaves a lingering frost that clings to creatures it hits. A creature struck by the wyrm's bite becomes rimed with ice, its movements slowing and its body stiffening until it can shake off the cold. This makes it harder for prey to escape the wyrm's reach once it has drawn blood." [trait/always/condition] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, earth-glide, tunneler, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending, weapon-lodge)
[reskin] signature bound to the concept's verb: trait — terrain-walk (freezes, freeze, glacier)
[reskin] signature bound by force: trait — "terrain-walk" matches freezes+freeze+glacier in the user's words; the model's none is overruled
[reskin] signature template (trait): terrain-walk -> Traits/"Sure Footing" ("exact concept match [verb: freezes:concept, freeze:concept, glacier:concept, ice:idea]")
[reskin] chassis nova: "Freezing Breath (Recharge 5-6)" — the dragon-22's own nova row (its "Breath Weapon", renamed by the model); geometry, cap and rider lines below are its edits
```


---


### Firstborn Hexer — one marked soft

**Concept:** a plague-seer who curses the firstborn of every house

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability |
|---|---|---|---|---|---|---|---|---|---|---|
| Firstborn Hexer | 8 | caster-8-binder | ok | SOFT: band | ok | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 6.5 (print at 8 reads 2–10.5, n=24)
- read: def 5 / off 8 → 6.5; sustained 54 (3 × Stiletto); nova none; dmg 54

```
Firstborn Hexer

Medium Humanoid, Neutral Evil

AC 16
Initiative +2 (12)

HP 120 (16d8 + 48)

Speed 30 ft.

MOD
SAVE
STR
14
+2
+2
INT
14
+2
+2
MOD
SAVE
DEX
15
+2
+2
WIS
15
+2
+5
MOD
SAVE
CON
16
+3
+3
CHA
20
+5
+8

Skills Perception +5, Deception +8

Senses darkvision 60 ft.; Passive Perception 15

Languages Common, Infernal

CR 8 (XP 3,900; PB +3)

Actions

Multiattack. The hexer makes three attacks, using Stiletto or Withering Ray in any combination. It can replace one attack with a use of (A) Hobbling Curse or (B) Spellcasting to cast Ray of Sickness.

Stiletto. Melee Attack Roll: +8, reach 5 ft. 18 (3d8 + 5) Piercing damage.

Withering Ray. Ranged Attack Roll: +8, range 60 ft. 14 (2d8 + 5) Necrotic damage.

Hobbling Curse. Constitution Saving Throw: DC 16, one creature within 60 feet. Failure: 16 (3d10) Necrotic damage, and the target has the Poisoned condition until the end of its next turn.

Spellcasting. The hexer casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 16, +8 to hit with spell attacks):

- At Will: Ray of Sickness
- 1/Day Each: Bestow Curse, Blight, Cloudkill

Plague Tithe. Charisma Saving Throw: DC 16, one creature within 60 feet. Failure: The target is cursed until the end of the hexer's next turn. The first time the cursed target deals damage to any creature before then, it takes 18 (4d8) Piercing damage. Success: Half damage only.

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
[route] caster-binder (controller) type=Humanoid mechanics=none — caster-binder: ✓ ("curses") | caster-binder: key "curses" (class verb)
[concept] signature elements: Firstborn Curse [behavior] | venomous hexes [body] | plague-seer's gaze [aura]
[reskin] signature idea (action): "The hexer spits a living mote of plague into a foe already suffering from one of its curses. The mote doesn't burst; it burrows, and the affliction already inside the victim turns on them, flaring with fresh pain and stealing the breath from their next attempt to act. A victim untouched by the hexer's other magic simply feels a cold itch and nothing more." [rider/on_hit/damage] — menu: bolt-restrain, bolt-drag, bolt-mark (+ shelf: condition-payoff, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, snare-bolt, slow-bolt, sensory-strike, herd, thrown-burst-seed, drain, delayed-brand, curse-debt, zone-seed, reveal, wind-up, blighted-ground, aggro-curse, self-invisibility, rally, snap-shot)
[reskin] value check: "Plague Tithe" EV 14 vs floor 9.4 (one attack of 3) — added Success: Half; dice 11 → 18
[reskin] signature template: curse-debt -> Actions/"Plague Tithe" ("The mote turns a pre-existing affliction against the victim, flaring with fresh  [shape fit, no verb match]")
[reskin] signature idea (trait): "Any creature that strikes the hexer in melee finds its own vitality feeding the plague rather than the seer—its wounds knit slightly shut even as the attacker's flesh begins to fester with a creeping, wracking ache that lingers until the seer is slain." [trait/on_being_hit/condition] — menu: absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst)
[reskin] signature miss: trait — "Any creature that strikes the hexer in melee finds its own vitality feeding the plague rather than the seer—its wounds knit slightly shut even as the attacker's flesh begins to fester with a creeping, wracking ache that lingers until the seer is slain." [trait/on_being_hit/condition] — the model found no template that holds it (offered: absorption, bloodied-burst, resonant-body, bloodied-fury, warded-mending)
```


---

## Review batch — canaries-2026-10-13T14-14-20

The checker ran first. The gate table covers every block in the run; the blocks below span it (lowest CR, highest CR, a 2014 sheet, a 2024 sheet, a print donor, a homebrew with a nova). Each block carries its checker row above and its engine trace below. Hand-derive against the row first; then read for what predicates can't see.

### Gate table — the whole run

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Owlbear | 3 | 2024 | brute-2 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 1/1 |
| Headless Horseman | 4 | 2024 | skirmisher-3-mounted | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/5 |
| Wolf | 5 | 2024 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 2/2 |
| Stone Golem | 10 | 2024 | brute-9 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 5/5 |
| Kobold | 0.25 | 2024 | skirmisher-1 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 5/5 |
| Goblin Boss | 1 (2014) | 2014 | skirmisher-3-mounted | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 5/6 |
| Bridge Toll Troll | 5 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 5/5 |
| Old Hammerfist | 5 | 2024 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 3/3 |
| Vampire Spawn | 5 (2014) | 2014 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 5/5 |
| Well Drowned | 5 | 2024 | lurker-5-trap | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/3 |

**Dropped 0 of 12 user clauses** (coverage 100%); concept share 95% (38/40 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- none



---


### Kobold — lowest CR

**Concept:** name: Kobold | Can turn invisible once per day

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability |
|---|---|---|---|---|---|---|---|---|---|---|
| Kobold | 0.25 | skirmisher-1 | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1/8 / off 1/2 → 0.3125; sustained 6 (1 × Dagger); nova none; dmg 6

```
Kobold

Small Dragon, Neutral Evil

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
[concept] signature elements: once-daily invisibility [behavior] | skirmishing ambusher from hidden tunnels [behavior] | shadow-ash paste [object]
[reskin] print canon route: the Kobold Warrior's body outranks the skulker seat — no verb in the words names it; the plain skirmisher line
[reskin] print canon defenses: HP 15 -> 7, AC 14 -> 14 — the Kobold Warrior's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 7, DEX 15, CON 9, INT 8, WIS 7, CHA 8 — the Kobold Warrior's at its own CR; attack +4 -> +4, DC 12 (print's)
[reskin] print canon: "Kobold — Can turn invisible once per day" heads on the Kobold Warrior — print's rows ride along; the seat stays
[reskin] claim gate: CR 0.25 but the words claim a capability ("Can") — the wildcard stays open
[reskin] claim gate: CR 0.25 but a Humanoid body — the trait seat stays open (print: a material body carries a trait at every tier)
[reskin] signature idea (action): "The kobold drinks its dawn-brewed shadow-ash paste and smears the last of it across its eyes and throat, and for a short while afterward it is simply not there to be seen — attacks pass through the space it occupies, eyes slide past it, and it moves wherever it likes while it lasts. The trick is fragile: the moment it swings a weapon or hurls a stone, the ash-peel flakes off and it snaps back into" [rider/on_hit/condition] — menu: contagion, pounce (+ shelf: lure, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, blink, aggro-curse, self-invisibility, focus, feint-slip, coating)
[reskin] signature bound to the concept's verb: action — self-invisibility (invisible, turn invisible)
[reskin] value check: "Shadow-Ash Veil (1/Day)" EV 0 vs floor 1 (a bonus action (free)) — a free row that does nothing (logged)
[reskin] signature dropped by the floor: "Shadow-Ash Veil (1/Day)" — the ladder could not lift it; the fallback stands in
[reskin] value check: "Vanish (1/Day)" EV 0 vs floor 1 (a bonus action (free)) — a free row that does nothing (logged)
[reskin] library seed drawn: self-invisibility -> Bonus Actions/"Vanish (1/Day)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The kobold's scales are dusted with the same shadow-ash it brews, so whenever it is standing still at the edge of torchlight or in darkness it reads as just another lump of rock to anyone not deliberately searching. Enemies who are surprised by it are slower to react — their first swung blade or loosed shot at the kobold goes wide as if it were still an empty patch of shadow." [trait/always/defense] — menu: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, bound, undead-fortitude, mimicry
[reskin] print canon modes: climb off — the Kobold Warrior has no such mode and the words name none
[reskin] print canon type: Humanoid -> Dragon — the Kobold Warrior's (a Unicorn printed Fey, 2026-10-01)
[reskin] print canon trait: Pack Tactics — "Kobold — Can turn invisible once per day" is the Kobold Warrior (print's own row)
[reskin] print canon trait: Sunlight Sensitivity — "Kobold — Can turn invisible once per day" is the Kobold Warrior (print's own row)
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the seat's, not the Kobold Warrior's
[reskin] print canon: chassis row leaves — Traits/"Skittering" is the seat's, not the Kobold Warrior's
```


---


### Stone Golem — highest CR

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

Sprachen Versteht Gemeinsprache plus zwei andere Sprachen, kann aber nicht sprechen

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
[concept] signature elements: pulverizing stone fists [body] | magic immunity and immutable form [body] | relentless siege traversal [behavior]
[reskin] print canon route: "Stone Golem — " is the Stone Golem — the juggernaut seat stands down for the plain line
[reskin] print canon defenses: HP 182 -> 220, AC 15 -> 18 — the Stone Golem's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 22, DEX 9, CON 20, INT 3, WIS 11, CHA 1 — the Stone Golem's at its own CR; attack +9 -> +10, DC 17 (print's)
[reskin] print canon: "Stone Golem — " is a print creature — the seats stand down; print's own rows are the composition
[reskin] print canon speed: modes walk only — the Stone Golem's
[reskin] print canon senses: "darkvision 120 ft." — the Stone Golem's
[reskin] print canon size: Huge -> Large — the Stone Golem's
[reskin] print canon languages: "Understands the languages of its creator but can't speak" -> "Understands Common plus two other languages but can't speak" — the Stone Golem's
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


### Owlbear — a 2024 sheet

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
[route] brute type=Monstrosity mechanics=none — brute: ✓ ("Owlbear") | brute: no line key in the words — the model's read of its quote
[concept] signature elements: relentless bear-hug grapple [behavior] | owl-bear hybrid body [body] | savage territorial roar [behavior]
[reskin] print canon defenses: HP 66 -> 59, AC 12 -> 13 — the Owlbear's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 20, DEX 12, CON 17, INT 3, WIS 12, CHA 7 — the Owlbear's at its own CR; attack +5 -> +7, DC 15 (print's)
[reskin] print canon: "Owlbear" is a print creature — the seats stand down; print's own rows are the composition
[reskin] print canon speed: modes climb — the Owlbear's
[reskin] print canon senses: "darkvision 60 ft." — the Owlbear's
[reskin] print canon speed: 30 ft. -> 40 ft. — the Owlbear's walk; the concept's other modes stay
[reskin] print canon speed: Climb -> 40 ft. — the Owlbear's own
[reskin] print canon attack: "Claws" -> "Rend" — the Owlbear's own row
[reskin] print canon multiattack: "The owlbear makes two Rend attacks." — the Owlbear's own, added (the chassis carried none; the Owlbear makes two Rend attacks — canaries 2026-10-12)
```


---


### Bridge Toll Troll — a print donor

**Concept:** a troll that guards the bridge and collects a toll

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability |
|---|---|---|---|---|---|---|---|---|---|---|
| Bridge Toll Troll | 5 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 3 / off 5 → 4; sustained 36 (2 × Rend); nova none; dmg 36

```
Bridge Toll Troll

Large Giant, Neutral

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

Stonebridge Claim. The toll troll is bound to its resting place. It can't willingly move more than 120 feet from its resting place, and it always knows the direction and distance to its resting place.

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
[route] defender type=Giant mechanics=none — brute-regenerator: ✓ ("a troll that guards the bridge") | brute-regenerator -> defender: the concept's VERB outranks the noun (key "guards the", class verb) | defender: key "guards the" (class verb)
[concept] signature elements: bridge-guarding toll collection [behavior] | stone-plated hide [body] | shield and hooked toll-bill [object]
[reskin] print canon defenses: HP 78 -> 94, AC 19 -> 15 — the Troll's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 18, DEX 13, CON 20, INT 7, WIS 9, CHA 7 — the Troll's at its own CR; attack +6 -> +7, DC 16 (print's)
[reskin] print canon: "a troll that guards the bridge and collects a fee" heads on the Troll — print's rows ride along; the seat stays
[reskin] signature idea (action): "The troll bellows a toll demand at one creature it can see. That creature must pay passage or be rooted to the spot by a sudden, crushing weight of obligation; the troll's own attacks against it hit harder until it either pays or breaks free by force of will." [action/save/condition] — menu: swallow, seal, hook-drag, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up (+ shelf: shell-withdraw, aggro-curse, own-turn-punisher, self-invisibility, rally, riposte, charge-push, hook-rider)
[reskin] value check: "Sundering Shove" EV 2.5 vs floor 9.4 (one attack of 2) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Sundering Shove" — a seed that cannot be lifted does not ship
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "The bridge itself answers the troll's claim: while it stands on a stone span it treats the ground as part of its hide, and anyone who strikes it in melee is rocked by a sudden counterblow of loose masonry kicked up from the bridge." [trait/on_being_hit/damage] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura)
[reskin] signature bound to the concept's verb: trait — bound, guarded-stance (guards the, guard)
[reskin] signature template (trait): bound -> Traits/"Stonebridge Claim" ("The troll is bound to the stone span it claims as its toll bridge — the bridge a [verb: guards the:concept]")
[reskin] print canon languages: "Common" -> "Giant" — the Troll's
[reskin] print canon attack: "Hooked Bill" -> "Rend" — the Troll's own row
[reskin] print canon rows: Shield Bash leave — the Troll has one melee row (Rend), and Multiattack reads print's
[reskin] print canon trait: Loathsome Limbs — "a troll that guards the bridge and collects a fee" is the Troll (print's own row)
[reskin] print canon trait: Regeneration — print's text replaces the chassis's (the Troll regenerates 15, not the chassis's 10 — critic's audit 2026-10-02)
[reskin] print canon row: Bonus Actions/Charge — the Troll's own
```


---


### Headless Horseman — a homebrew with a nova

**Concept:** name: Headless Horseman | 

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability |
|---|---|---|---|---|---|---|---|---|---|---|
| Headless Horseman | 4 | skirmisher-3-mounted | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 2 / off 4 → 3; sustained 22 (2 × Saber); nova Trampling Charge 22; dmg 29

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

Grave Speed. The headless horseman ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Actions

Multiattack. The headless horseman makes two Saber attacks. It can replace one attack with a use of Gravewhip.

Saber. Melee Attack Roll: +6, reach 5 ft. 7 (1d6 + 4) Slashing damage plus 4 (1d8) Necrotic damage. If the headless horseman moved at least 20 feet in a straight line toward the target immediately before the hit, the target takes an extra 4 (1d8) Slashing damage and, if it is Medium or smaller, has the Prone condition.

Trampling Charge (Recharge 5-6). The headless horseman moves up to its Speed without provoking Opportunity Attacks and can move through the spaces of Medium or smaller creatures. Each creature whose space it enters is targeted once by the following effect. Strength Saving Throw: DC 14. Failure: 22 (5d8) Bludgeoning damage, and the target has the Prone condition.

Gravewhip. Strength Saving Throw: DC 14, one creature within 30 feet that is Prone. Failure: 7 (2d6) Necrotic damage. Success: Half damage.

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
[concept] signature elements: being headless [body] | riding down prey on a skeletal horse [behavior] | harvesting heads it takes as its own [behavior]
[reskin] nova capped: "Trampling Rush" 24 → 22 (the chassis nova obeys the cap: 22 at CR 4)
[reskin] signature idea (action): "The horseman raises its neck-stump and lets out a hollow hunting cry that carries the grave's chill. Living creatures that hear it feel their wounds deepen and their limbs stiffen with tomb-cold, making it harder for them to escape the rider's next pass. The cry can only be loosed once per battle, as the horseman's stolen breath is spent." [action/once_per_fight/condition] — menu: swallow, condition-payoff, lure, snare-bolt, sensory-strike, disarm, exploiter (+ shelf: delayed-brand, rampage, aggro-curse, self-invisibility, focus, feint-slip, coating, riposte, affliction, contagion, charge-push, hook-rider, pounce, isolation, charge)
[reskin] value check: "Opportunist's Lash" EV 5.4 vs floor 5.2 (one attack of 2) — worth the trade
[reskin] library seed drawn: exploiter -> Actions/"Opportunist's Lash" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The horseman has no head to strike, so critical hits against it do not deal extra damage, and any effect that would require it to see or be seen simply fails. Its senses come from the grave, not from eyes." [trait/always/defense] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature miss: trait — "The horseman has no head to strike, so critical hits against it do not deal extra damage, and any effect that would require it to see or be seen simply fails. Its senses come from the grave, not from eyes." [trait/always/defense] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] chassis nova: "Hooves (Recharge 5-6)" — the skirmisher-3-mounted's own nova row (its "Trampling Rush", renamed by the model); geometry, cap and rider lines below are its edits
```



---

# Attached: the orc (the rerun — Greataxe beside a Hand Axe at 20/60, Relentless Rush), the tortle (Shell Defense credited to the kit), the kenku, and the German Steingolem

## Gormak Ironjaw

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Gormak Ironjaw | 5 (2014) | 2014 | defender-3-leader | ok | SOFT: band | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 2/6 |


**Input:** `an orc warchief with a greataxe`
**Donor:** defender-3-leader -> CR 5
**Signature:** library · **elapsed** 23s

### Block
```
Gormak Ironjaw
Medium humanoid, neutral
Armor Class

15 (chain shirt)

Hit Points: 

97 (15d8 + 30)

Speed: 

30 ft.

STR	DEX	CON	INT	WIS	CHA


16 (+3)

	

14 (+2)

	

14 (+2)

	

12 (+1)

	

11 (+0)

	

15 (+2)

Skills: 

Athletics +6, Persuasion +5

Saving Throws: 

CON +5, CHA +5

Senses: 

darkvision 120 ft., passive Perception 10

Languages: 

Common, Orc

Challenge

5 (1,800 XP)

Proficiency Bonus:

+3

Great Weapon Master. When Gormak hits a creature with its greataxe, the attack deals an extra 3 damage.
Aura of Authority. While in a 10-foot-radius sphere originating from Gormak, Gormak and its allies have advantage on attack rolls and saving throws, provided Gormak is not incapacitated.
Relentless Rush. As a bonus action, Gormak takes the Dash action.
Bolstering Cry (2/Day). As a bonus action, each ally within 30 feet of Gormak gains 9 (2d8) temporary hit points.

Actions
Multiattack: Gormak makes two Greataxe attacks.
Greataxe: Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 16 (3d8 + 3) slashing damage.
Hand Axe: Melee or Ranged Weapon Attack: +6 to hit, reach 5 ft. or range 20/60 ft., one target. Hit: 16 (3d8 + 3) slashing damage.
```

### Trace
```
[route] defender-leader type=Humanoid mechanics=none — defender-leader: ✓ ("an orc warchief") | defender-leader: no line key in the words — the model's read of its quote
[concept] name: provided_name rejected — "an orc warchief with a greataxe…" is the description, not a name
[concept] resolve: archetype=defender type=Humanoid themes=armed/terror mind=sapient style=leader energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: commanding battlefield aura [aura] | the greataxe [object] | fights beside its troops [behavior]
[concept] identity: The warchief opens by bellowing a command that surges through its warriors, then wades into melee with its greataxe, using a brutal parry to shield the ally beside it from reprisal. It fights beside its troops until bloodied, then becomes a whirlwind of iron and fury, never retreating while an orc still stands.
[concept] lore: Forged in the iron camps of the Broken Fang, this warchief seeks to carve a kingdom from the borderlands, one skull at a time.
[reskin] donor: defender-3-leader -> CR 5
[reskin] seats: action <- "fights beside its troops" | trait <- "commanding battlefield aura"
[reskin] named parts: Greataxe (slot) — the user's words, the engine's numbers
[reskin] named parts landed: 1 attack row(s), 0 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] features: Great Weapon Master (trait) — the feature table, no call
[reskin] species kit: orc — "an orc warchief with a greataxe": Relentless Rush (Goblin Boss/Nimble Escape); darkvision 120 ft.
[reskin] inline form: "Gormak" — the model's own reading of the name
[reskin] save dc derived: DC 15 -> 14 (8 + PB 3 + the sheet's best 3) — no stat on the sheet reached it
[reskin] signature idea (action): "Gormak roars a command to charge, and the nearest ally on the battlefield instantly surges toward a target Gormak can see within the normal speed of that ally. The ally must be able to move and must be within reach of Gormak's voice—his aura's presence—though the call is heard even beyond the aura's edge. Gormak may issue this command only once on each of his turns, and only if he is not silenced " [trait/start_of_turn/movement] — menu: warded-mending (+ shelf: throw-retrieve, seal, hook-drag, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, shell-withdraw, volley-order, aggro-curse, own-turn-punisher, self-invisibility, rally, snap-shot, riposte, charge-push, hook-rider)
[reskin] value check: "Driving Bellow (2/Day)" EV 6.6 vs floor 28.7 (the whole Multiattack (2 attacks)) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Driving Bellow (2/Day)" — the ladder could not lift it; the fallback stands in
[reskin] value check: "Bolstering Cry (2/Day)" EV 5 vs floor 2.8 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: rally -> Bonus Actions/"Bolstering Cry (2/Day)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "When Gormak strikes a creature with his greataxe, the brutal impact forces the target to stagger back a step, opening a gap that an ally can immediately exploit. The creature hit must be within reach of Gormak's melee attack, and the forced step counts as the target's movement on its next turn." [trait/always/movement] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending, weapon-lodge)
[reskin] signature miss: trait — "When Gormak strikes a creature with his greataxe, the brutal impact forces the target to stagger back a step, opening a gap that an ally can immediately exploit. The creature hit must be within reach of Gormak's melee attack, and the forced step counts as the target's movement on its next turn." [trait/always/movement] — no template on the shelf shares a verb with the concept or the idea (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, absorption, bloodied-burst, resonant-body, warded-mending, weapon-lodge)
[reskin] weapon table: "Hand Axe" — thrown, range 20/60
[reskin] lint: 0 findings
audit finding below confidence gate: Bolstering Cry (2/Day) This generic name does not reflect Gormak's iron-jawed, orcish leadership concept.
[reskin] audit: [Great Weapon Master: This trait duplicates the cha…s Greataxe, the attack deals an extra 3 damage."), Aura of Authority: The name and fiction suggest a …ave Advantage on attack rolls and saving throws")]
[reskin] species kit: darkvision 60 -> 120 ft. — the orc's
[reskin] done: "Gormak Ironjaw" — donor defender-3-leader, CR 5
[reskin] 2014 conversion: one lint-gated call — both printings saved
```

## Uthlok the Unmoving

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Uthlok the Unmoving | 3 | 2024 | brute-5-grappler | ok | SOFT: band | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 1/4 |


**Input:** `a tortle hermit who withdraws into his shell`
**Donor:** brute-5-grappler -> CR 3
**Signature:** library · **elapsed** 21s

### Block
```
Uthlok the Unmoving

Medium Humanoid, Neutral

AC 13
Initiative -1 (9)

HP 67 (9d8 + 27)

Speed 30 ft.

MOD
SAVE
STR
16
+3
+5
INT
4
-3
-3
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
+3
CHA
4
-3
-3

Skills Athletics +5, Perception +2

Senses darkvision 30 ft.; Passive Perception 12

Languages Common

CR 3 (XP 700; PB +2)

Traits

Hold Breath. Uthlok can hold its breath for 1 hour.

Actions

Multiattack. Uthlok makes two Claw attacks.

Claw. Melee Attack Roll: +5, reach 5 ft. 12 (2d8 + 3) Slashing damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 13). While Grappled, the target has the Restrained condition.

Bonus Actions

Engulf. Uthlok engulfs one Medium or smaller creature it is grappling. While engulfed, the target has the Blinded and Restrained conditions, has Total Cover against attacks and other effects outside Uthlok, and takes 4 (1d8) Acid damage at the start of each of Uthlok's turns. Uthlok can have only one creature engulfed at a time. If Uthlok takes 9 damage or more in a single turn from the engulfed creature, Uthlok must expel the target at the end of that turn, and the target exits Prone in an unoccupied space within 5 feet of Uthlok. If Uthlok dies, an engulfed creature pulls free of the mass Prone by using 5 feet of movement.

Shell Defense. Uthlok withdraws into a boulder-like shell of fused, mineral-crusted plates. Until it emerges, it gains a +4 bonus to Armor Class and has the Prone condition; its Speed is 0 and can't increase, it has Disadvantage on Dexterity saving throws, it can't take Actions or Reactions, and it can emerge only as a Bonus Action.

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

### Trace
```
[route] brute-grappler type=Humanoid mechanics=grapple, engulf — brute-grappler: ✓ ("withdraws into his shell") | brute-grappler: no line key in the words — the model's read of its quote
[concept] resolve: archetype=brute type=Humanoid themes=grasping/grave mind=sapient style=grappler energy=Necrotic mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: grapple, engulf
[concept] signature elements: withdrawing into its shell [behavior] | shell that engulfs and crushes [body] | hermit's hermetic isolation [aura]
[concept] identity: The tortle hermit shuffles forward with eyes downcast, then lunges with a bone-deep grip and hauls prey into its shell. Once you're inside, its blood-hot interior and crushing weight grind you down each round — it doesn't bite, it simply holds you under until you stop moving. If bloodied, it snaps shut and refuses to come out, tanking the party's damage until they break the shell or give up.
[concept] lore: A tortle who withdrew from the world for a century of meditation, its shell now fused with the mineral deposits of its cave — it wants only to be left alone, but mistakes all intruders for the distractions that once shattered its peace.
[reskin] energy withheld: Necrotic on a Humanoid with no Necrotic in the concept's own words (fixed phrases read first)
[reskin] donor: brute-5-grappler -> CR 3
[reskin] seats: action <- "withdrawing into its shell" | trait <- "hermit's hermetic isolation"
[reskin] repair round 1: 1 defect(s) — name "Claw" is a natural weapon on a Humanoid whose concept gives it none — a Humanoid swings a weapon (Scimitar, Club, Spear)
[reskin] repair round 2: 1 defect(s) — name "Claw" is a natural weapon on a Humanoid whose concept gives it none — a Humanoid swings a weapon (Scimitar, Club, Spear)
[reskin] engulf engine: Engulf — the body's own verb
[reskin] engine interior scaled — CR 3 sits below the brute-5-grappler seat
[reskin] species kit yields: Shell Defense — the sheet is full (4 rows at CR 3, print's cap 4); the user's own rows stand
[reskin] species kit: tortle — "a tortle hermit": Hold Breath (Hydra/Hold Breath)
[reskin] inline form: "Uthlok" — the model's own reading of the name
[reskin] save dc derived: DC 12 -> 13 (8 + PB 2 + the sheet's best 3) — no stat on the sheet reached it
[reskin] extraction: 6 of 10 model clauses quote nothing the user typed and leave the record ("shuffles forward with eyes downcast", "blood-hot interior and crushing weight grind you down each round", "doesn't bite, it simply holds you under until you stop moving", …)
[reskin] signature idea (action): "Uthlok pulls his head and limbs in, seals himself against the world, and becomes a boulder of fused shell. Until he chooses to emerge, his shell blunts almost all harm that comes at him and he cannot be forced to move or let go of what he holds, but he also cannot attack or pursue anyone. Anyone who stands within reach of the withdrawn shell finds the grinding mineral edge punishing them if they l" [trait/start_of_turn/defense] — menu: warded-mending (+ shelf: leap, condition-payoff, hook-drag, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, thrown-burst-seed, drain, wind-up, exploiter, shell-withdraw, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, affliction, contagion, charge-push, hook-rider, pounce)
[reskin] signature bound to the concept's verb: action — shell-withdraw (withdraw, shell)
[reskin] value check: "Sealed Bulwark" EV 3.6 vs floor 2 (a bonus action (free)) — worth the trade
[reskin] kit credited: the signature bound shell-withdraw, the shape the tortle kit yielded to the cap — the row is the kit's ("Shell Defense"), free tier
[reskin] signature template: shell-withdraw -> Bonus Actions/"Shell Defense" ("Uthlok pulls his head and limbs in, seals himself against the world, and becomes [verb: withdraw:concept, shell:concept]")
[reskin] keys spent by the action: withdraw
[reskin] signature idea (trait): "Uthlok's isolation is total: if no creature is grappling him, engulfed by him, or within reach of his claws at the start of his turn, he simply stops responding to the world, becoming unaware of anything beyond his shell until someone comes close enough to disturb his meditation." [trait/always/condition] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending, weapon-lodge)
[reskin] signature miss: trait — "Uthlok's isolation is total: if no creature is grappling him, engulfed by him, or within reach of his claws at the start of his turn, he simply stops responding to the world, becoming unaware of anything beyond his shell until someone comes close enough to disturb his meditation." [trait/always/condition] — no template on the shelf shares a verb with the concept or the idea (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst, absorption, bloodied-burst, resonant-body, warded-mending, weapon-lodge)
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] vulnerability rejected — "Thunder" has no warrant in the concept's own text (print's default is none)
[reskin] lint: speed-discord: a trait sets Speed 0 permanently while the header says "30 ft." — print puts immobility in the header (Speed 0 ft. or 5 ft.) and deletes the trait clause
[reskin] audit: [Engulf: The escape clause 'pulls free of the mass'… of the mass Prone by using 5 feet of movement.")]
[reskin] done: "Uthlok the Unmoving" — donor brute-5-grappler, CR 3
```

## Echo of No Name

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Echo of No Name | 2 | 2024 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 1/6 |


**Input:** `a kenku mimic who copies voices and steals`
**Donor:** skirmisher-3-skulker -> CR 2
**Signature:** library · **elapsed** 21s

### Block
```
Echo of No Name

Medium Humanoid, Neutral

AC 15
Initiative +3 (13)

HP 44 (8d8 + 8)

Speed 30 ft.

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

CR 2 (XP 450; PB +2)

Traits

Mimicry. The echo can mimic animal sounds and humanoid voices. A creature that hears the sounds can tell they are imitations only with a successful DC 13 Wisdom (Insight) check.

Slip Away. The echo ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Actions

Multiattack. The echo makes two attacks, using Stolen Blade or Thrown Knife in any combination.

Stolen Blade. Melee Attack Roll: +5, reach 5 ft. 7 (1d8 + 3) Slashing damage.

Thrown Knife. Ranged Attack Roll: +5, range 30/90 ft. 7 (1d8 + 3) Piercing damage.

Bonus Actions

Cunning Action. The echo takes the Dash, Disengage, or Hide action.

Echoed Lunge (1/Day). Immediately after dealing damage to a creature that is already Bloodied, the echo moves up to half its Speed, and it makes one Stolen Blade attack.

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

### Trace
```
[route] skirmisher-skulker type=Humanoid mechanics=none — skirmisher-skulker: ✓ ("copies voices and steals") | skirmisher-skulker: no line key in the words — the model's read of its quote
[concept] hints: trap→style ✗ ("kenku mimic who copies voices—not a trap")
[concept] resolve: archetype=skirmisher type=Humanoid themes=voice/uncanny mind=sapient style=skulker energy=Psychic mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: perfect voice mimicry [behavior] | stolen identities and voices [behavior] | cowardly hit-and-run [behavior]
[concept] identity: A kenku mimic that shadows its target for days, learning their voice before it strikes—then speaks in stolen tones to lure its mark into isolation, repeating the words of loved ones until the victim comes willingly. In combat it fights like the voice it stole: hit and run, a mimicry of the victim's own fighting style, striking from cover with a blade it also stole, then melting back into the crowd or the dark. It is a coward wearing courage it borrowed, and when bloodied it discards its stolen voice entirely and flees in silence—a creature that only ever fights people it has already learned how to hurt.
[concept] lore: Kenku mimics are born from kenku who committed the cardinal sin of their kind: speaking in a voice that was truly their own—and for this they were stripped of identity and exiled to the edges of civilization, where they now survive by becoming perfect echoes of those they envy, stealing not just words but lives.
[reskin] energy withheld: Psychic on a Humanoid with no Psychic in the concept's own words (fixed phrases read first)
[reskin] species outranks the alias: the Mimic (Monstrosity) stands down — the words name a kenku, a Humanoid
[reskin] donor: skirmisher-3-skulker -> CR 2
[reskin] row gated out: Ranged Save Effect (gaze) — the concept did not claim this mechanic
[reskin] row gated out: Teleport (teleport) — the concept did not claim this mechanic
[reskin] seats: package <- "perfect voice mimicry"
[reskin] claim gate: CR 2 but a Humanoid body — the trait seat stays open (print: a material body carries a trait at every tier)
[reskin] species kit: kenku — "a kenku mimic": Mimicry (Green Hag/Mimicry)
[reskin] inline form: "the echo" — the model's own reading of the name
[reskin] save dc derived: DC 12 -> 13 (8 + PB 2 + the sheet's best 3) — no stat on the sheet reached it
[reskin] extraction: 7 of 11 model clauses quote nothing the user typed and leave the record ("speaks in stolen tones to lure its mark into isolation", "repeating the words of loved ones until the victim comes willingly", "a mimicry of the victim's own fighting style", …)
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The echo throws its stolen voice to a spot it can see, speaking in the exact tones of someone the target trusts—a friend, a parent, a lover—calling out from that place. Every enemy who can hear it is pulled toward the voice, certain that help or danger waits where it points, and the echo's allies slip through the opening unseen. It can only keep the voice alive for a short while before it fades in" [action/always/movement] — menu: gaze-single, snare, reel, throw-retrieve, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed (+ shelf: lure, delayed-brand, rampage, blink, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte, contagion, charge-push, hook-rider, pounce, isolation, bolt-mark)
[reskin] signature bound to the concept's verb: action — disarm (steal)
[reskin] signature re-poured: action — the idea left the concept's verb; the concept itself is poured into disarm
[reskin] value check: "Stolen Voice" EV 0 vs floor 3.6 (one attack of 2) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Stolen Voice" — the ladder could not lift it; the fallback stands in
[reskin] fallback skipped by the floor: disarm (EV 0 vs 3.6)
[reskin] value check: "Rampage (1/Day)" EV 5.9 vs floor 1.1 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: rampage -> Bonus Actions/"Rampage (1/Day)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The echo learns a victim's voice by hearing it for a few moments of quiet observation; once learned, it can imitate that person perfectly until it adopts a new voice. While wearing a stolen voice, the echo's words carry unnatural conviction—those who hear it and don't know the speaker is dead can be lured into believing it is really them." [trait/always/condition] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, undead-fortitude, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] signature miss: trait — "The echo learns a victim's voice by hearing it for a few moments of quiet observation; once learned, it can imitate that person perfectly until it adopts a new voice. While wearing a stolen voice, the echo's words carry unnatural conviction—those who hear it and don't know the speaker is dead can be lured into believing it is really them." [trait/always/condition] — no template on the shelf shares a verb with the concept or the idea (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, undead-fortitude, truth-aura, gaze-aura, assassinate, blurred-form, death-burst, absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] seat owes nothing: the skulker line was the model's read of its quote, not a key in the words (a hermit was handed Assassinate, day-one 2026-09-30)
[reskin] speed by body: a Humanoid walks 30 ft. (print's people; a hermit ran 50 — critic's audit 2026-10-02)
[reskin] speed by concept: dropped Climb 30 ft. — the concept's movement set decides
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] lint: 0 findings
[reskin] audit: [Rampage (1/Day): The name 'Rampage' is a generic e…text unchanged. (about: "***Rampage (1/Day).***")]
[reskin] audit rename: "Rampage (1/Day)" -> "Echoed Lunge (1/Day)"
[reskin] done: "Echo of No Name" — donor skirmisher-3-skulker, CR 2
```

## Steingolem

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|


**Input:** `name: Stone Golem | Output statblock in German`
**Donor:** brute-9 -> CR 10
**Signature:** dropped · **elapsed** 20s

### Block
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

### Trace
```
[concept] output-language directive: German — the block is built and checked in English, then translated in one extra call
[route] brute-juggernaut type=Construct mechanics=none — brute-juggernaut: ✓ ("Stone Golem") | brute-juggernaut: no line key in the words — the model's read of its quote
[concept] cr from print: 10 — a print creature heads the words and the user set none
[concept] hints: golem→canon ✓ ("Golem")
[concept] resolve: archetype=brute type=Construct themes=forged/uncanny mind=mindless style=juggernaut energy=— mix=physical identity=✓ lore=✓
[concept] name: provided "Stone Golem"
[concept] mechanics: none claimed
[concept] signature elements: pulverizing stone fists [body] | magic immunity and immutable form [body] | relentless siege traversal [behavior]
[concept] identity: The Stone Golem is a silent juggernaut that opens combat by simply walking forward, shattering walls and cover with its passage, then slams its massive fists into the first foe in reach. Each round it relentlessly pursues the nearest target, using its Siege Monster trait to ignore obstacles and its Slow trait to punish those who try to flee. It fights to destruction without fear or mercy, never retreating even when damaged.
[concept] lore: Forged in ancient quarries by forgotten artificers, the Stone Golem guards tombs and treasures with unyielding patience, awakening only when its charge is threatened.
[reskin] print canon route: "Stone Golem — " is the Stone Golem — the juggernaut seat stands down for the plain line
[reskin] print canon defenses: HP 182 -> 220, AC 15 -> 18 — the Stone Golem's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 22, DEX 9, CON 20, INT 3, WIS 11, CHA 1 — the Stone Golem's at its own CR; attack +9 -> +10, DC 17 (print's)
[reskin] donor: brute-9 -> CR 10
[reskin] seats: action <- "relentless siege traversal" | trait <- "pulverizing stone fists"
[reskin] print canon: "Stone Golem — " is a print creature — the seats stand down; print's own rows are the composition
[reskin] inline form: "the stone golem" — the model's own reading of the name
[reskin] save dc derived: DC 16 -> 18 (8 + PB 4 + the sheet's best 6) — no stat on the sheet reached it
[reskin] print canon speed: modes walk only — the Stone Golem's
[reskin] print canon senses: "darkvision 120 ft." — the Stone Golem's
[reskin] languages by body: a trap-line Construct with no voice in the concept
[reskin] print canon size: Huge -> Large — the Stone Golem's
[reskin] print canon languages: "Understands the languages of its creator but can't speak" -> "Understands Common plus two other languages but can't speak" — the Stone Golem's
[reskin] print canon speed: 40 ft. -> 30 ft. — the Stone Golem's walk; the concept's other modes stay
[reskin] print canon multiattack: "The stone golem makes two attacks, using Slam or Force Bolt in any combination." — the Stone Golem's own
[reskin] print canon attack: "Force Bolt" is print's own row — +9, 22 (4d10), range 120 ft. (an exact body at print's CR)
[reskin] print canon attack: "Boulder" -> "Force Bolt" — the Stone Golem's own ranged row
[reskin] immunities stamped for type: Construct -> Poison; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned
[reskin] print canon defenses: immunities Poison; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned -> Poison, Psychic; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned — the Stone Golem's own header lines
[reskin] name-canon trait stamped: Immutable Form (the name says so; print says what it does)
[reskin] name-canon trait stamped: Magic Resistance (the name says so; print says what it does)
[reskin] print canon trait: Immutable Form — print's text replaces the chassis's (the Troll regenerates 15, not the chassis's 10 — critic's audit 2026-10-02)
[reskin] print canon trait: Magic Resistance — print's text replaces the chassis's (the Troll regenerates 15, not the chassis's 10 — critic's audit 2026-10-02)
[reskin] print canon row: Bonus Actions/Slow (Recharge 5-6) — the Stone Golem's own
[reskin] lint: 0 findings
[reskin] audit: [Slam: Force damage on a stone golem's physical sla…e component. (about: "plus 9 (2d8) Force damage")]
[reskin] done: "Stone Golem" — donor brute-9, CR 10
[concept] translated: German — one extra call; the engine built and checked the block in English
```

