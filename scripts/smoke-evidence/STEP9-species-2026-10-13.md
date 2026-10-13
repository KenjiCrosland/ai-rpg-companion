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
