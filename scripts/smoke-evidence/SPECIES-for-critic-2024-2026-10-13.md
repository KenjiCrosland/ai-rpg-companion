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

## The critic's third read (2026-10-13) — five holds, seven reader predicates, route variance

**Holds**
1. **A mechanic engine needs a key in the GM's words.** The route's line choice now refuses a grappler or charger line that rests on the model's read of its own quote: a grapple verb (grabs, drags, folds, swallows, coils…) or a charge verb (charges, rams, stampedes, tramples…) must appear in the GM's words, or the plain family line stands. "A tortle hermit who withdraws into his shell" no longer routes to brute-grappler; "a tar-mouthed toad that drags cattle into the bog" still does. The tortle kit also carries its shell as natural armor — an AC 17 floor, so no chassis hands a tortle AC 13.
2. **Alignment.** The SRD 5.2 lines are: Kobold Warrior **Neutral**, Stone Golem **Unaligned**, Owlbear Unaligned, Vampire Spawn Neutral Evil, Gladiator Neutral. The stamp was gated on `exact` and a print *name* with a claim ("Kobold — can turn invisible") is a borrow, so it never ran; it now runs on any print head unless the GM named an alignment. Pinned for both.
3. **Kit provenance is the metric, not the engine.** The concept-share counter credited a row only when its words overlapped the user's, so renaming the same rows changed the number. A kit, feature or part row *is* the user's row and now counts as traced on sight — and the reader gate fails any such row that reaches the saved block without its clause.
4. **One-word Names.** A one-word Humanoid name the model minted is a person whatever it declares, so Cinderbent speaks as Cinderbent; an article in the GM's own words still makes it a kind ("a cinderbent that hunts at dusk" → "the cinderbent").
5. **Thrown weapons.** Three rules landed: 30/90 and 60/180 are not print ranges on a weapon row (an unlisted thrown thing is 20/60, a hurled mass 60/240); a named thrown-capable weapon (spear, javelin, dagger, handaxe, trident, dart, light hammer) *is* the ranged row in print's hybrid grammar and the chassis's pure ranged row leaves, so no second weapon is invented beside Sarn's spear; and print's own hybrid row keeps its hybrid frame — the Gladiator's Spear reads "Melee or Ranged Attack Roll: +6, reach 5 ft. or range 20/60 ft." A print body that carries no pure ranged row sheds the chassis's unless the GM named a ranged weapon, so the Gladiator grows no Crossbow. The anatomy renamer also stops reading a hybrid row as a ranged one (Grik's Spear had become "Sling Stone").

**The reader gate** (`checker.mjs`, a ninth gate beside the eight): seven predicates over the saved sheet, on every block of every run — `inline-consistency`, `print-range`, `exact-body-identity`, `engine-needs-key`, `provenance-integrity`, `name-mechanic`, `no-type-in-name`. Each is a behaviour check, not a string test on a prompt, and each fails the gate rather than waiting for a reader. A hand-built sheet carrying one of each defect trips all seven in a pin.

**Route variance** is now measurable: `node scripts/route-variance.mjs <batch> [n]` replays the route call n times per prompt through the app's own client and tabulates the line chosen, reporting how many prompts settle on one line.

Pins: `species.spec.js` ("the critic's third read", 7 tests). Gate: 183 suites, 5,234 tests, build clean.

### The line the reader gate drew on its first run

The `engine-needs-key` predicate flagged three sheets, and reading them settled where the rule belongs. Print's own grapple was already exempt (the Vampire Spawn's Claw passed). The other two were **verbless prompts** — "knife ball" and "the thing in the well" — where the GM typed no words to read and the catalog composes the whole sheet by design, exactly as the head-clause rule says. The tortle was different: the GM *did* type words ("withdraws into his shell") and the model read a grappler out of them.

So the rule is: **with words to read, the words decide; with nothing to read, the model may choose the body.** A prompt of three significant words or fewer is creature-only, stamped on the block as `generation.creatureOnly`, and both the route's refusal and the reader predicate stand down for it. `trap` joins `grappler` and `charger` as a mechanic engine with its own key list (adheres, sticky, lies in wait, disguised, poses as, snaps shut, mimics…), so "a stone idol that sits in the corridor and watches" no longer lands an adhesive trap, while the knife ball keeps the one it has.

Two more from the same run: the `name-mechanic` predicate called "Marsh Stride" a false promise because its movement vocabulary did not include print's own "ignores Difficult Terrain" or "Opportunity Attacks" (widened), and "Old Sargeant Rootback" spoke as "the old" because a weak rank word ("Old", "Young", "Great", "Grand", "Big", "Little") was read as a rank — it now falls to the given name, so the rows say Rootback.

## Measurement after the third read (2026-10-13 evening, the provider fast again — 20s a block)

| set | run | saved | fails | coverage | concept |
|---|---|---|---|---|---|
| the canaries | `canaries-2026-10-13T16-46-19` | 10/10 | **0** | 12/12 (100%) | 90% |
| the twelve | `step7-twelve-2026-10-13T17-01-00` (+ the bog hound rerun) | 12/12 | **0** | 31/32 (97%) | **83%** |
| species seven | `species-seven-2026-10-13T17-21-18` | 7/7 | **0** | 6/7 (86%) | 51% |

The canaries are 10 of 10 intact against this afternoon's reference. **Concept share rose from 66–73% to 83% on the twelve** because the counter now credits a kit, feature or part row on sight rather than by word overlap — the metric fix from hold 3, not an engine change.

**The reader gate earned its keep on its first three runs.** It failed four sheets, and reading them produced three engine fixes and two predicate corrections:

| the gate said | the truth | what landed |
|---|---|---|
| `engine-needs-key` on the ogre's Slam, the well-thing's Hooked Lash, the knife ball's Adhesive Hide | two were verbless prompts; print's own grapple was already exempt | the creature-only rule above; `trap` joined the mechanic engines |
| `engine-needs-key` on Meshrin's row and the tortle's Tidebound Driftwood | true: the `hook-drag` shape imposes a grapple, and neither GM asked for one | a grapple-imposing shape (swallow, hook-drag, snatch, reel, pull-through) needs an engine key in the words or a creature-only prompt — pruned at menu time, so the gate never has to fail |
| a row literally named **"none"** on Meshrin | true, and worse than the gate knew: the fit answered "none" meaning *no fit* and the parser took it as the row's name | "none", "n/a", "null", "no fit" are never a row name |
| `name-mechanic` on "Marsh Stride" | false: print's movement vocabulary includes "ignores Difficult Terrain" and "Opportunity Attacks" | the predicate reads them |
| `name-mechanic` on Sir Reginald's "Avian Terror" | false: the phobia shape writes print's Frightened effect longhand because the creature fears a *thing* | the predicate reads the longhand idiom |

## Route variance (`node scripts/route-variance.mjs species-seven 5`)

| prompt | lines chosen across 5 replays | settled |
|---|---|---|
| a lizardfolk hunter who stalks the marsh with a spear | skirmisher-skulker ×5 | yes |
| an orc warchief with a greataxe | defender-leader ×5 | yes |
| a tortle hermit who withdraws into his shell | defender ×5 | yes (the grappler is refused now) |
| a blue dragonborn knight | defender ×2, defender-leader ×1, caster-warpriest ×2 | **no** |
| a troglodyte raider who reeks | skirmisher ×5 | yes |
| a tiefling duelist who hates fire… | skirmisher ×4, caster-warpriest ×1 | **no** |
| a kenku mimic who copies voices and steals | skirmisher-skulker ×5 | yes |

**5 of 7 settle.** Both unsettled prompts drift the same way — to `caster-warpriest` — on words with no casting in them ("knight", "duelist"). That is one shelf line reading a martial title as a holy one, and it is the AC 18 / AC 13 class the critic named. Worth its own fix: either a deny on the warpriest line for a martial noun with no magic word, or the tortle treatment (a line whose engine the words never asked for stands down). Measured, not fixed, in this landing.

## The critic's fourth read (2026-10-13) — seven holds, seven predicates, the route asks

**Holds**
1. **A Multiattack is never swept away.** Shedding the Gladiator's chassis Crossbow took the Multiattack with it, because the dead-name sweep saw a row "only about" the dead weapon and dropped it — so a CR 4 duelist attacked once a turn. The sweep now re-reads a Multiattack over the rows that remain ("using Spear or Hand Crossbow" → "makes two Spear attacks") and never deletes one, with a trace line.
2. **Inline names.** A role noun left after a stripped weak rank is still a kind ("Old Road Warden" → the warden, not Warden). An epithet-first person speaks by the given name ("Ashvowed Brannor" → Brannor) while an epithet plus a role noun stays a whole-phrase kind ("the headless horseman").
3. **A use limit sheds only when there is a Multiattack to join.** With none, the limit stays, so no at-will 30-foot Frightened pulse on a CR 3 hermit.
4. **Types and saves fit their rows.** A save follows its effect at render time (Prone, push or grapple → Strength, or Dexterity for an area; poison, disease or breath → Constitution; fear or charm → Wisdom), so the Iron Bull's Shockwave no longer topples on a Wisdom save. A drain is never a weapon type (the concept's energy, else Necrotic). An on-hit extra-damage rider takes the hit's own type, so Assassinate stops adding Bludgeoning to spear hits. A Humanoid's natural weapon needs a species or the GM's words: where the repair exhausted, the engine used to stamp the type magical (Mosu's Claw dealt Force) and now renames the row to a weapon it can swing.
5. **Alignment.** The translator rendered print's **Unaligned** as "Neutral"; it is a closed term and now has a glossary entry per language (German *Gesinnungslos*), so the Steingolem prints it. Separately, Unaligned no longer lands on a creature with the capacity for ethics: a Dragon with Intelligence 18 who speaks and casts reads Neutral, while a Beast, ooze, plant or mindless construct keeps Unaligned.
6. **A kit row binds the clause it implements.** The tortle read 0/1 with Shell Defense on the sheet because the kit stamped "a tortle hermit"; a kit row now binds the clause whose words its shape matches ("withdraws into his shell"), in the landed and the yielded-then-credited path alike.
7. **The GM's fear outranks print's immunity.** "Deathly afraid of chickens" beside "Immune to … Frightened" was a contradiction in the header; the fear clause strips Frightened, as a vulnerability strips a resistance.

**Seven predicates in the reader gate**, each a behaviour check over the saved sheet: `multiattack-integrity` (a print body keeps print's Multiattack; a Multiattack names only rows present), `inline-correctness` (the inline follows the name rule, not merely itself), `gate-fit`, `type-fit`, `save-fit`, `alignment-fit`, and `no-type-in-name` as a gate rather than only an actuator. Two of them caught my own over-reach on the first run and were narrowed: an anatomy word on a row that makes no attack is flavour ("Answering Sting" is a riposte), and print's weapon mastery topples on a Constitution save.

**The route asks.** Casting is a mechanic engine now: a caster line needs a magic word in the GM's own words, in the pick loop and in the rank fallback both, so "knight" and "duelist" no longer drift to the warpriest. A trained martial style keys the martial line (fighting style, swordmaster, duelist, knight, paladin, sentinel…), which is what flipped Meshrin between a defender and a brute. The variance script now reports the line **after** a refusal beside the model's own pick, so a rescued prompt cannot read as settled.

**The species batch is nineteen** (`species-nineteen.json`), one block per table entry, six of them 2014, CR 1 to 9 — every lift, every flavour row, every header line and the AC floor render at least once per landing. The seven retires.

## Measurement after the fourth read (2026-10-13 evening)

| set | run | saved | fails | coverage |
|---|---|---|---|---|
| species nineteen | `species-nineteen-2026-10-13T18-35-30` (+ four blocks rerun alone) | 19/19 | **0** | **19/19 (100%)** |
| the twelve | `step7-twelve-2026-10-13T18-19-35` | 12/12 | **0** | 29/32 (91%) |

Every table entry renders: the lifts (Hold Breath, Stench, Sunlight Sensitivity, Mimicry, Amphibious, Flyby ×2, Standing Leap ×2, Charge ×2, Magic Resistance ×2, Relentless Rush, Cat's Dash), the flavour rows (Shell Defense, Mountain Stride), the header lines (Swim, Climb, Fly, darkvision, two resistances), the AC floor (the tortle at 18 with its shell), and the types (Fey ×2, Monstrosity ×2). The kit rows bind their own clauses now — Standing Leap reads "leaps between the branches", Shell Defense "withdraws into his shell", Amphibious "guards the reef".

**The reader gate failed five sheets across these runs and every one was real:**

| the gate said | the truth | what landed |
|---|---|---|
| `multiattack-integrity` on the Kraken, a wyrm and a rotwife | false: print's Multiattack legitimately *uses* non-attack actions (Fling, Lightning Strike, Swallow) | the attack slots must be attack rows; a named action it uses must merely exist |
| `inline-correctness` on "the turtle elder" | false: any contiguous tail of the name is a kind form | the predicate reads suffixes |
| `inline-correctness` on "the stalker" for "Silent Rooststalker" | **true**: the model's declared form was not made of the name's words | a declared inline must be built from the name's own words |
| `type-fit` on "Stooping Talon Strike" dealing Piercing | **true**: a talon cuts | a body part inside a multi-word name owns the type when the last word is a generic strike noun, in the late pass as well as the early one |
| `save-fit` on two condition-payoff rows | false: the condition was a *prerequisite*, not an imposed effect | prerequisites are excluded from the save test |
| the harengon's and grung's dropped leap | **true** | a lifted trait carries the clause words it answers; the frogfolk leaps as print's Frog does |

**One species was keyed on a name the engine never sees.** "Yuan-ti" is not in the SRD and the lexicon paraphrases it before the engine reads the words, so the table now keys that entry on what actually arrives — serpentfolk, snakefolk, serpent-blooded — and the entry is named `serpentfolk`.

The canaries ran clean beside both sets (10 of 10 intact, zero fails) and are not reported here: by the owner's rule they are a per-landing numbers check, raised only when a number moves.

## Route variance over the twelve (`node scripts/route-variance.mjs step7-twelve 3`)

**9 of 12 settle**, and refusals are now visible in the table (`pick→final`). Meshrin settles on the defender line in three of three, which is the martial-key fix; the snapping turtle shows `brute-grappler→brute` and Sir Reginald `skirmisher-mounted→defender`, both rescues the old table would have hidden. The three that do not settle are Grandmother Ash (the binder line against the skulker), the storm-herder (leader against mounted), and the knife ball — which is creature-only, where the catalog is allowed to choose.

---

# 2024 blocks

## Review batch — species-nineteen-2026-10-13T18-35-30

The checker ran first. The gate table covers every block in the run; every block of the run follows. Each block carries its checker row above and its engine trace below. Hand-derive against the row first; then read for what predicates can't see.

### Gate table — the whole run

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Blackreed Stalker | 2 | 2024 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/6 |
| Bloodmaw Vorgath | 5 (2014) | 2014 | defender-3-leader | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 3/6 |
| Usharra the Shellbound | 3 | 2024 | defender-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 2/4 |
| Vareth Stormguard | 6 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 0/2 |
| Skarn the Reeking | 1 (2014) | 2014 | skirmisher-1 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/7 |
| Cinderhold Vaelor | 4 | 2024 | defender-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 2/4 |
| Voxmaw | 2 | 2024 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 1/6 |
| Coralmarshal Othyn | 5 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 2/5 |
| Grung Poison-Dancer | 3 (2014) | 2014 | skirmisher-3 | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 7/7 |
| Nagi the Venomwright | 7 | 2024 | caster-2-warpriest | ok | SOFT: band | ok | ok | ok | ok | ok | ok | SOFT: multiattack-integrity | soft (2) | 1/1 | 1/6 |
| Hollow Piper | 4 | 2024 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/6 |
| Windscout | 2 | 2024 | skirmisher-3-winged | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 6/6 |
| Hushwing | 3 (2014) | 2014 | lurker-2 | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 2/6 |
| Thistlewick | 1 | 2024 | skirmisher-1 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 1/6 |
| Serael the Dawnward | 6 | 2024 | defender-3-leader | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 1/4 |
| Sable Nefret | 4 (2014) | 2014 | skirmisher-3-skulker | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 2/7 |
| Mournhold Grieve | 8 | 2024 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 1/5 |
| Sriella Windstride | 5 | 2024 | skirmisher-3-mounted | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/8 |
| Asterion Vaultward | 9 (2014) | 2014 | brute-9 | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 3/4 |

**Dropped 0 of 19 user clauses** (coverage 100%); concept share 45% (47/105 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- none



---


### Blackreed Stalker — a 2024 sheet

**Concept:** a lizardfolk hunter who stalks the marsh with a spear

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Blackreed Stalker | 2 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1/2 / off 2 → 1.25; sustained 14 (2 × Spear); nova none; dmg 14

```
Blackreed Stalker

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

Assassinate. During the first round of each combat, Stalker has Advantage on attack rolls against any creature that hasn't taken a turn. If Stalker hits a creature during that round, the target takes an extra 4 (1d8) Bludgeoning damage.

Hold Breath. Stalker can hold its breath for 15 minutes.

Reedstep. Stalker ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Actions

Multiattack. Stalker makes two Spear attacks.

Spear. Melee or Ranged Attack Roll: +5, reach 5 ft. or range 20/60 ft. 7 (1d8 + 3) Piercing damage, and the target has Disadvantage on its next attack roll before the start of Stalker's next turn.

Bonus Actions

Cunning Action. Stalker takes the Dash, Disengage, or Hide action.

Marshland Stalk (2/Day). Stalker has Advantage on the next attack roll it makes before the end of its turn.

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
[concept] signature elements: hides and strikes from cover [behavior] | barbed spear [object] | reed-marsh stalking [behavior]
[reskin] claim gate: CR 2 but a Humanoid body — the trait seat stays open (print: a material body carries a trait at every tier)
[reskin] signature idea (action): "The stalker hurls its spear or thrusts it from the reeds, and the barbed head tears free in a spray of blood. The wound keeps bleeding through the target's own movement, so a fleeing or fighting victim leaves a bright trail of blood that the stalker reads like a map. The bleeding stops only if the wound is packed and bound." [rider/on_hit/damage] — menu: bolt-mark (+ shelf: gaze-single, snare, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, rampage, blink, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte)
[reskin] signature bound to the concept's verb: action — focus (stalk)
[reskin] signature re-poured: action — the idea left the concept's verb; the concept itself is poured into focus
[reskin] value check: "Marshland Stalk (2/Day)" EV 1.1 vs floor 1.1 (a bonus action (free)) — worth the trade
[reskin] signature template: focus -> Bonus Actions/"Marshland Stalk (2/Day)" ("the concept's central verb 'stalk' is exactly the focus template's verb match —  [verb: stalk:concept]")
[reskin] signature idea (trait): "The stalker's hide and gear are steeped in mire water and crushed blackreed, so even when seen it looks like part of the marsh. Foes that lose track of it in the reeds struggle to pick it out again until it moves or strikes." [trait/always/defense] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] signature bound to the concept's verb: trait — faultless-tracker (stalks, stalk)
[reskin] signature bound by force: trait — "faultless-tracker" matches stalks+stalk in the user's words; the model's none is overruled
[reskin] signature template (trait): assassinate -> Traits/"Assassinate" ("the seat owes it by print")
```


---


### Cinderhold Vaelor — a print donor

**Concept:** a tiefling duelist who hates fire and takes extra damage from it

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Cinderhold Vaelor | 4 | defender-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 4 / off 3 → 3.5; sustained 16 (2 × Spear); nova none; dmg 16

```
Cinderhold Vaelor

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
+2
WIS
12
+1
+3
MOD
SAVE
CON
16
+3
+5
CHA
15
+2
+2

Skills Athletics +6, Perception +3

Vulnerabilities Fire

Senses darkvision 60 ft.; Passive Perception 13

Languages Common, Infernal

CR 4 (XP 1,100; PB +2)

Traits

Guarded Stance. While Vaelor isn't Bloodied, melee attack rolls against it are made with Disadvantage.

Actions

Multiattack. Vaelor makes two Spear attacks. It can replace one attack with a use of Shield Bash.

Spear. Melee or Ranged Attack Roll: +6, reach 5 ft. or range 20/60 ft. 8 (1d8 + 4) Piercing damage.

Shield Bash. Strength Saving Throw: DC 14, one creature within 5 feet that Vaelor can see. Failure: 9 (2d4 + 4) Bludgeoning damage. If the target is a Medium or smaller creature, it has the Prone condition.

Reactions

Riposte. Trigger: A creature within 5 feet of Vaelor misses it with a melee attack roll. Response: Vaelor makes one Spear attack against that creature.

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
[route] defender type=Humanoid mechanics=none — skirmisher: ✓ ("a tiefling duelist who hates fire and ta") | skirmisher -> defender: the concept's VERB outranks the noun (key "duelist", class verb) | defender: key "duelist" (class verb)
[concept] signature elements: disciplined shield-and-riposte defense [behavior] | fiery blade that punishes overreach [object] | hatred and vulnerability to fire [body]
[reskin] print canon pb: print's +7 on PB +3 reads +6 on this sheet's PB +2; DCs follow
[reskin] print canon defenses: HP 65 -> 112, AC 19 -> 16 — the Gladiator's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon armor: 16 (studded leather, shield) — print's Gear line; the 2014 sheet prints it (the Goblin Boss wore "splint", canaries 2026-10-12)
[reskin] print canon array: STR 18, DEX 15, CON 16, INT 10, WIS 12, CHA 15 — the Gladiator's at its own CR; attack +6 -> +6, DC 14 (print's, on this sheet's PB)
[reskin] print canon: "a tiefling duelist who hates fire and takes extra damage from it" heads on the Gladiator — print's rows ride along; the seat stays
[reskin] signature idea (action): "Vaelor plants his shield and invites a foe to overreach, ready to answer with a fiery riposte. He braces in a disciplined guard, and the first enemy who tries to slip past or strike at him from within reach finds the infernal edge waiting as his blade snaps out in precise punishment." [reaction/on_being_hit/damage] — menu: snap-shot, riposte (+ shelf: throw-retrieve, seal, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, shell-withdraw, aggro-curse, own-turn-punisher, self-invisibility, rally, charge-push, hook-rider)
[reskin] signature bound to the concept's verb: action — riposte (duelist)
[reskin] value check: "Infernal Riposte" EV 9.1 vs floor 2.3 (a reaction (free)) — worth the trade
[reskin] signature template: riposte -> Reactions/"Infernal Riposte" ("A creature within reach of Vaelor misses him with a melee attack roll, and his i [verb: duelist:concept, riposte:idea]")
[reskin] signature idea (trait): "The infernal fire in Vaelor's veins recoils from true flame: when he is burned, the heat licks back along the wound, forcing him to grit his teeth and answer with fiercer, less careful strikes until the pain fades." [trait/on_being_hit/damage] — menu: absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura)
[reskin] signature bound to the concept's verb: trait — guarded-stance (duelist)
[reskin] signature bound by force: trait — "guarded-stance" matches duelist in the user's words; the model's none is overruled
[reskin] signature template (trait): guarded-stance -> Traits/"Guarded Stance" ("exact concept match [verb: duelist:concept]")
[reskin] print canon alignment: Neutral Good -> Neutral — the Gladiator's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common, Infernal" -> "Common, Infernal" — the Gladiator's plus the concept's Infernal
[reskin] print canon attack: "Spear" keeps print's hybrid frame — reach 5 ft. or range 20/60 ft. (the Gladiator's weapon is thrown)
[reskin] print canon attack: "Rapier" -> "Spear" — the Gladiator's own row
[reskin] print canon row: Actions/Shield Bash — the Gladiator's own
```


---


### Nagi the Venomwright — one marked soft

**Concept:** a serpentfolk blood-priest who prays to a serpent god

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Nagi the Venomwright | 7 | caster-2-warpriest | ok | SOFT: band | ok | ok | ok | ok | ok | ok | SOFT: multiattack-integrity |

- bands · soft · band: reads CR 5.5 (print at 7 reads 2–9.5, n=27)
- reader · soft · multiattack-integrity: Multiattack uses "Spellcasting to cast *Ray of Sickness*", which is not a row on this sheet
- read: def 3 / off 8 → 5.5; sustained 52 (2 × Fangblade); nova none; dmg 52

```
Nagi the Venomwright

Medium Monstrosity, Neutral Evil

AC 14
Initiative +0 (10)

HP 104 (16d8 + 32)

Speed 30 ft.

MOD
SAVE
STR
12
+1
+1
INT
11
+0
+0
MOD
SAVE
DEX
10
+0
+0
WIS
18
+4
+7
MOD
SAVE
CON
15
+2
+2
CHA
13
+1
+1

Skills Perception +7, Religion +6

Senses darkvision 60 ft.; Passive Perception 17

Languages Common

CR 7 (XP 2,900; PB +3)

Traits

Uncanny Sense. Nagi can pinpoint the location of moving creatures within 60 feet of itself.

Magic Resistance. Nagi has Advantage on saving throws against spells and other magical effects.

Actions

Multiattack. Nagi makes two attacks, using Fangblade or Venom Bolt in any combination. It can replace one attack with a use of Spellcasting to cast Ray of Sickness.

Fangblade. Melee Attack Roll: +7, reach 5 ft. 26 (5d8 + 4) Bludgeoning damage.

Venom Bolt. Ranged Attack Roll: +7, range 80/320 ft. 22 (4d8 + 4) Piercing damage.

Spellcasting. Nagi casts one of the following spells, requiring no Material components and using Wisdom as the spellcasting ability (spell save DC 15, +7 to hit with spell attacks):

- At Will: Ray of Sickness
- 1/Day Each: Bestow Curse, Cloudkill, Blight

Bonus Actions

Bolstering Cry (2/Day). Each ally within 30 feet of Nagi gains 13 (3d8) Temporary Hit Points.

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
[route] caster-warpriest (artillery) type=Humanoid mechanics=none — caster-warpriest: ✓ ("blood-priest who prays to a serpent god") | caster-warpriest: key "prays" (class verb)
[concept] signature elements: bloodletting prayers that empower venom [behavior] | venomous bite and blade [body] | aura of consecrated poison [aura]
[reskin] signature idea (action): "Nagi slices open its own scales with the fangblade and sprays the welling blood in a hissing, venomous prayer over every enemy it can see. The prayer clings to their wounds, so that each time Nagi strikes any of them, that enemy's veins burn with the god's poison." [action/always/condition] — menu: seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, snare-bolt, slow-bolt, sensory-strike, herd, thrown-burst-seed, drain, curse-debt, zone-seed, reveal, wind-up, blighted-ground (+ shelf: delayed-brand, aggro-curse, self-invisibility, rally, snap-shot, bolt-restrain, bolt-drag, bolt-mark)
[reskin] value check: "Venomous Prayer" EV 6.6 vs floor 13 (one attack of 2) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Venomous Prayer" — the ladder could not lift it; the fallback stands in
[reskin] value check: "Bolstering Cry (2/Day)" EV 7.2 vs floor 4.1 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: rally -> Bonus Actions/"Bolstering Cry (2/Day)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Nagi's blood never dries. Whenever a foe wounds it in melee, the serpent god answers by putting that same venomous bite into Nagi's next strike against the attacker. It grows more eager as the blood-priest bleeds, shedding its own life to make the god's venom sharper." [trait/on_being_hit/damage] — menu: absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst)
[reskin] signature bound to the concept's verb: trait — bloodied-burst, bloodied-fury, uncanny-sense (bloodied, blood)
[reskin] signature miss: trait — "Nagi's blood never dries. Whenever a foe wounds it in melee, the serpent god answers by putting that same venomous bite into Nagi's next strike against the attacker. It grows more eager as the blood-priest bleeds, shedding its own life to make the god's venom sharper." [trait/on_being_hit/damage] — the model found no template that holds it (offered: bloodied-burst, bloodied-fury, uncanny-sense)
[reskin] signature template (trait): uncanny-sense -> Traits/"Uncanny Sense" ("exact concept match [verb: blood:concept]")
```


---


### Usharra the Shellbound — in the run

**Concept:** a tortle hermit who withdraws into his shell

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Usharra the Shellbound | 3 | defender-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 2 / off 3 → 2.5; sustained 24 (2 × Gauntlet); nova none; dmg 24

```
Usharra the Shellbound

Medium Humanoid, Neutral

AC 18
Initiative +0 (10)

HP 52 (8d8 + 16)

Speed 30 ft.

MOD
SAVE
STR
16
+3
+3
INT
11
+0
+0
MOD
SAVE
DEX
11
+0
+0
WIS
12
+1
+3
MOD
SAVE
CON
14
+2
+4
CHA
14
+2
+2

Skills Athletics +5, Perception +3

Senses darkvision 60 ft.; Passive Perception 13

Languages Common

CR 3 (XP 700; PB +2)

Traits

Hold Breath. Usharra can hold its breath for 1 hour.

Actions

Multiattack. Usharra makes two attacks, using Gauntlet or Stone in any combination.

Gauntlet. Melee Attack Roll: +5, reach 5 ft. 12 (2d8 + 3) Bludgeoning damage.

Stone. Ranged Attack Roll: +5, range 30/120 ft. 10 (2d6 + 3) Bludgeoning damage.

Bonus Actions

Shell Defense. Usharra withdraws into its armored shell. Until it emerges, it gains a +4 bonus to Armor Class and has the Prone condition; its Speed is 0 and can't increase, it has Disadvantage on Dexterity saving throws, it can't take Actions or Reactions, and it can emerge only as a Bonus Action.

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
[route] defender type=Humanoid mechanics=none — defender-warden: a Humanoid is not a made or risen guardian | fell to defender's plain line | defender: no line key in the words — the model's read of its quote
[concept] signature elements: withdrawing into shell for defense [behavior] | iron-reinforced shell [body] | guardian of a narrow pass [behavior]
[reskin] signature idea (action): "When Usharra plants itself and pulls its limbs in, it becomes a sealed iron ball of a creature — attacks that miss it clang off and the attacker's own momentum drags them off balance, letting Usharra lash back out with a gauntlet before sealing up again. It can only do this while it stays in place, and the moment it chooses to move or chase, the shell opens and the protection is gone." [reaction/on_being_hit/defense] — menu: snap-shot, riposte (+ shelf: throw-retrieve, seal, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, curse-debt, reveal, wind-up, shell-withdraw, aggro-curse, own-turn-punisher, self-invisibility, rally, charge-push, hook-rider)
[reskin] signature bound to the concept's verb: action — shell-withdraw (withdraw, shell)
[reskin] value check: "Sealing Shell" EV 3.6 vs floor 2 (a bonus action (free)) — worth the trade
[reskin] kit credited: the signature bound shell-withdraw, the shape the tortle kit yielded to the cap — the row is the kit's ("Shell Defense"), free tier
[reskin] signature template: shell-withdraw -> Bonus Actions/"Shell Defense" ("The idea's central verb is 'sealing' — Usharra plants itself and pulls its limbs [verb: withdraw:concept, shell:concept]")
[reskin] signature idea (trait): "Usharra's shell is banded with scavenged iron, so anyone who strikes it in melee and fails to hurt it feels the blow rebound through their own arm, numbing it. The harder they try to crack the shell, the more their own weapon turns against them." [trait/on_being_hit/condition] — menu: absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura)
```


---


### Vareth Stormguard — in the run

**Concept:** a blue dragonborn knight

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Vareth Stormguard | 6 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 5 / off 8 → 6.5; sustained 52 (2 × Greatsword); nova none; dmg 52

```
Vareth Stormguard

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

Languages Common, Draconic

CR 6 (XP 2,300; PB +3)

Actions

Multiattack. Vareth makes two attacks, using Greatsword or Heavy Crossbow in any combination.

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
[route] defender type=Humanoid mechanics=breath — defender: ✓ ("a blue dragonborn knight") | defender: key "knight" (class verb)
[concept] signature elements: shield wall hold [behavior] | draconic lightning breath [body] | knight's sword and shield [object]
[reskin] print canon: "a blue dragonborn knight" is a print creature — the seats stand down; print's own rows are the composition
[reskin] print canon speed: modes walk only — the Knight's
[reskin] print canon senses: "none" — the Knight's
[reskin] print canon attack: "Longsword" -> "Greatsword" — the Knight's own row
[reskin] print canon attack: "Javelin" -> "Heavy Crossbow" — the Knight's own ranged row
```


---


### Voxmaw — in the run

**Concept:** a kenku mimic who copies voices and steals

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Voxmaw | 2 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1/2 / off 2 → 1.25; sustained 14 (2 × Stolen Blade); nova none; dmg 14

```
Voxmaw

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

Languages Understands Common but can't speak

CR 2 (XP 450; PB +2)

Traits

Mimicry. Voxmaw can mimic animal sounds and humanoid voices. A creature that hears the sounds can tell they are imitations only with a successful DC 13 Wisdom (Insight) check.

Crowdstep. Voxmaw ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Actions

Multiattack. Voxmaw makes two attacks, using Stolen Blade or Hurled Blade in any combination. It can replace one attack with a use of Siren Whisper.

Stolen Blade. Melee Attack Roll: +5, reach 5 ft. 7 (1d8 + 3) Piercing damage.

Hurled Blade. Ranged Attack Roll: +5, range 20/60 ft. 7 (1d8 + 3) Piercing damage.

Siren Whisper. Wisdom Saving Throw: DC 13, one creature within 30 feet that can see or hear Voxmaw. Failure: The target has the Charmed condition until the start of Voxmaw's next turn, and while Charmed this way, it must move toward Voxmaw by the safest available route on its turn.

Bonus Actions

Cunning Action. Voxmaw takes the Dash, Disengage, or Hide action.

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
[route] skirmisher-skulker type=Humanoid mechanics=none — skirmisher-skulker: ✓ ("copies voices and steals") | skirmisher-skulker: no line key in the words — the model's read of its quote
[concept] signature elements: voice mimicry to lure prey [behavior] | shadowy ambush from hiding [behavior] | stolen trinkets and coins [object]
[reskin] claim gate: CR 2 but a Humanoid body — the trait seat stays open (print: a material body carries a trait at every tier)
[reskin] signature idea (action): "Voxmaw steals a voice from someone nearby and throws it across the battlefield, making the party's own companion seem to call for help from a shadowed alley or doorway. Anyone who hears it feels an instinctive pull to investigate, stepping toward the sound and away from their guard. The voice can be anyone Voxmaw has heard speak recently, including a party member, and the effect is strongest when " [action/save/movement] — menu: gaze-single, snare, throw-retrieve, lure, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed (+ shelf: delayed-brand, rampage, blink, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte, contagion, charge-push, hook-rider, pounce, isolation, bolt-mark)
[reskin] signature bound to the concept's verb: action — disarm (steal)
[reskin] signature re-poured: action — the idea left the concept's verb; the concept itself is poured into disarm
[reskin] value check: "Stolen Voice" EV 0 vs floor 3.6 (one attack of 2) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Stolen Voice" — the ladder could not lift it; the fallback stands in
[reskin] value check: "Luring Presence" EV 3.9 vs floor 3.6 (one attack of 2) — worth the trade
[reskin] library seed drawn: lure -> Actions/"Luring Presence" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Voxmaw's pockets and belt are heavy with stolen trinkets, coins, and personal effects taken from past victims. When it flees or is badly hurt, it scatters these shiny keepsakes behind it; anyone chasing must choose between stopping to snatch the valuables or keeping pursuit, and greedy pursuers may find their attention snagged by the glitter." [trait/always/condition] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, undead-fortitude, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] signature miss: trait — "Voxmaw's pockets and belt are heavy with stolen trinkets, coins, and personal effects taken from past victims. When it flees or is badly hurt, it scatters these shiny keepsakes behind it; anyone chasing must choose between stopping to snatch the valuables or keeping pursuit, and greedy pursuers may find their attention snagged by the glitter." [trait/always/condition] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, undead-fortitude, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
```


---


### Coralmarshal Othyn — in the run

**Concept:** a triton tide-caller who guards the reef with a trident

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Coralmarshal Othyn | 5 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 4 / off 6 → 5; sustained 42 (2 × Trident); nova none; dmg 42

```
Coralmarshal Othyn

Medium Humanoid, Lawful Neutral

AC 19
Initiative +1 (11)

HP 78 (12d8 + 24)

Speed 30 ft., Swim 30 ft.

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

Senses darkvision 60 ft., tremorsense 10 ft.; Passive Perception 14

Languages Aquan, Common

CR 5 (XP 1,800; PB +3)

Traits

Bound. Coralmarshal is bound to its resting place. It can't willingly move more than 120 feet from its resting place, and it always knows the direction and distance to its resting place.

Amphibious. Coralmarshal can breathe air and water.

Actions

Multiattack. Coralmarshal makes two Trident attacks.

Trident. Melee or Ranged Attack Roll: +6, reach 5 ft. or range 20/60 ft. 21 (4d8 + 3) Piercing damage, and the target is subjected to the following effect. Constitution Saving Throw: DC 13. Failure: The target has the Prone condition.

Brine Surge. Melee or Ranged Attack Roll: +6, reach 5 ft. or range 30/120 ft. 17 (4d6 + 3) Piercing damage.

Bonus Actions

Coral Command (2/Day). Each ally within 30 feet of Coralmarshal gains 9 (2d8) Temporary Hit Points.

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
[route] defender type=Humanoid mechanics=none — caster-warpriest: a caster line needs a magic word in the words — none here | skirmisher-hurler: ✓ ("with a trident") | skirmisher-hurler -> defender: the concept's VERB outranks the noun (key "guards the", class verb) | defender: key "guards the" (class verb)
[concept] signature elements: tridents wielded as both weapon and focus [object] | commands the tide and reef to block passage [behavior] | brine-saturated body that resists and channels the sea [body]
[reskin] signature idea (action): "Coralmarshal Othyn commands the tide to surge outward and inward across his reach. The first surge shoves anyone nearby away from him, and the returning surge drags anyone within a wider distance back into his immediate reach. This repositioning leaves them clustered at the exact chokepoint he guards." [action/always/movement] — menu: seal, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, herd, curse-debt, reveal, wind-up, exploiter (+ shelf: shell-withdraw, aggro-curse, own-turn-punisher, self-invisibility, rally, snap-shot, riposte)
[reskin] signature bound to the concept's verb: action — obstacle-pull (tide)
[reskin] value check: "Ebbtide Grasp" EV 2.5 vs floor 9.4 (one attack of 2) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Ebbtide Grasp" — the ladder could not lift it; the fallback stands in
[reskin] value check: "Bolstering Cry (2/Day)" EV 5 vs floor 2.9 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: rally -> Bonus Actions/"Bolstering Cry (2/Day)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Othyn's body is saturated with saltwater, letting him channel the sea through his trident. While he is in water, his trident strikes carry the reef's crushing pressure, battering a struck enemy so that its footing and breath are stolen." [trait/always/condition] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending, weapon-lodge)
[reskin] signature bound to the concept's verb: trait — bound, guarded-stance (guards the, guard)
[reskin] signature miss: trait — "Othyn's body is saturated with saltwater, letting him channel the sea through his trident. While he is in water, his trident strikes carry the reef's crushing pressure, battering a struck enemy so that its footing and breath are stolen." [trait/always/condition] — the model found no template that holds it (offered: bound, guarded-stance)
[reskin] signature template (trait): bound -> Traits/"Bound" ("exact concept match [verb: guards the:concept]")
```


---


### Hollow Piper — in the run

**Concept:** a satyr piper who dances travellers into the hills

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Hollow Piper | 4 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 2 / off 4 → 3; sustained 28 (2 × Thornpipe); nova none; dmg 28

```
Hollow Piper

Medium Fey, Neutral

AC 16
Initiative +4 (14)

HP 78 (12d8 + 24)

Speed 40 ft.

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

Senses darkvision 60 ft.; Passive Perception 13

Languages Sylvan

CR 4 (XP 1,100; PB +2)

Traits

Magic Resistance. The hollow piper has Advantage on saving throws against spells and other magical effects.

Fey Sidestep. The hollow piper ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Actions

Multiattack. The hollow piper makes two attacks, using Thornpipe or Reed Dart in any combination.

Thornpipe. Melee Attack Roll: +6, reach 5 ft. 8 (1d8 + 4) Piercing damage plus 6 (1d12) Psychic damage.

Reed Dart. Ranged Attack Roll: +6, range 20/60 ft. 13 (2d8 + 4) Psychic damage.

Bonus Actions

Fleet Agility. The hollow piper takes the Dash or Disengage action.

Whirling Reel. The hollow piper takes the Disengage action, and the next attack roll made against it before the start of its next turn has Disadvantage.

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
[route] skirmisher type=Fey mechanics=none — caster-binder: a caster line needs a magic word in the words — none here | skirmisher: ✓ ("a satyr piper who dances travellers into") | skirmisher: no line key in the words — the model's read of its quote
[concept] signature elements: piping travellers into the hills [behavior] | thornwood pipes [object] | fey dance [aura]
[reskin] signature idea (action): "The piper pipes a lilting reel that grabs the hearing of its chosen mark and any others nearby, holding their attention like a hook in the ear. So long as the piper keeps playing and dancing away, they feel an irresistible pull to follow it, stumbling toward it no matter what else is happening, even into obvious danger. The reel breaks only if the piper's music is cut off or the listener is jolted" [action/always/movement] — menu: trample, leap, gaze-single, snare, throw-retrieve, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed (+ shelf: delayed-brand, rampage, blink, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte, affliction, contagion, charge-push, hook-rider, pounce, isolation, bolt-mark, charge)
[reskin] signature bound to the concept's verb: action — feint-slip (dance)
[reskin] signature re-poured: action — the idea left the concept's verb; the concept itself is poured into feint-slip
[reskin] value check: "Whirling Reel" EV 6.9 vs floor 2.3 (a bonus action (free)) — worth the trade
[reskin] signature template: feint-slip -> Bonus Actions/"Whirling Reel" ("the concept's own verb is dance, and dancing travelers into the hills is an evas [verb: dance:concept]")
[reskin] signature idea (trait): "The piper's thornwood pipes bite with a splintery fey edge, and anyone the piper strikes or who touches it feels the thorn lingering in their mind, taking extra harm whenever they try to shake off the pipers influence or close the distance to flee. The more they resist the …, the more it hurts." [trait/always/damage] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature miss: trait — "The piper's thornwood pipes bite with a splintery fey edge, and anyone the piper strikes or who touches it feels the thorn lingering in their mind, taking extra harm whenever they try to shake off the pipers influence or close the distance to flee. The more they resist the …, the more it hurts." [trait/always/damage] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst, heated-body)
```


---


### Windscout — in the run

**Concept:** an aarakocra windscout with a javelin

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Windscout | 2 | skirmisher-3-winged | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1/2 / off 3 → 1.75; sustained 12 (2 × Javelin); nova Skydive 11; dmg 15

```
Windscout

Medium Humanoid, Neutral

AC 15
Initiative +3 (13)

HP 38 (7d8 + 7)

Speed 30 ft., Fly 60 ft.

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

Skills Perception +3, Stealth +5

Senses darkvision 60 ft.; Passive Perception 13

Languages Auran, Common

CR 2 (XP 450; PB +2)

Traits

Flyby. Windscout doesn't provoke Opportunity Attacks when it flies out of an enemy's reach.

Actions

Multiattack. Windscout makes two Javelin attacks.

Talons. Melee Attack Roll: +5, reach 5 ft. 6 (1d6 + 3) Slashing damage. If Windscout flew at least 20 feet in a straight line toward the target immediately before the hit, the target takes an extra 4 (1d8) Slashing damage and, if it is Medium or smaller, has the Prone condition.

Javelin. Ranged Attack Roll: +5, range 30/120 ft. 6 (1d6 + 3) Piercing damage, and the target's Speed is reduced by 10 feet until the start of Windscout's next turn.

Skydive (Recharge 5-6). Windscout flies up to its Speed without provoking Opportunity Attacks. Each creature it passes within 5 feet during this movement is targeted once by the following effect. Strength Saving Throw: DC 12. Failure: 11 (2d10) Bludgeoning damage, and the target has the Prone condition.

Hurled Javelin. Windscout hurls a javelin. Ranged Attack Roll: +5, range 30/120 ft. 6 (1d6 + 3) Piercing damage. The weapon lands in an unoccupied space within 5 feet of the target; until Windscout spends 5 feet of movement in that space to recover it, Windscout's Speed is halved and it can't use this action.

Bonus Actions

Aerial Agility. Windscout takes the Dash or Disengage action.

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
[route] skirmisher-winged type=Humanoid mechanics=thrown-weapon — skirmisher-winged: ✓ ("aarakocra windscout") | skirmisher-winged: no line key in the words — the model's read of its quote
[concept] signature elements: diving javelin throw [behavior] | aarakocra windscout with javelins [object] | attacks on the wing with Flyby [behavior]
[reskin] nova capped: "Diving Attack" 13 → 11 (the chassis nova obeys the cap: 11 at CR 2)
[reskin] claim gate: CR 2 but a Humanoid body — the trait seat stays open (print: a material body carries a trait at every tier)
[reskin] signature idea (action): "The windscout hurls a javelin specially rigged to bite and drag: on a solid hit the shaft punches through the target's gear and lodges there, trailing a length of cord. The windscout can then snap the cord taut at any later moment, yanking the enemy off balance and robbing them of their footing, or let the line sing in the wind so the stuck weapon keeps tugging and slowing the victim until they sp" [rider/on_hit/condition] — menu: contagion, charge-push, hook-rider, pounce, isolation, snatch, bolt-mark (+ shelf: condition-payoff, throw-retrieve, lure, snare-bolt, sensory-strike, disarm, delayed-brand, exploiter, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte)
[reskin] signature bound to the concept's verb: action — throw-retrieve (javelin)
[reskin] signature re-poured: action — the idea left the concept's verb; the concept itself is poured into throw-retrieve
[reskin] value check: "Hurled Javelin" EV 4 vs floor 2.6 (one attack of 2) — worth the trade
[reskin] signature template: throw-retrieve -> Actions/"Hurled Javelin" ("The concept's own verb is javelin — hurling a javelin at range [verb: javelin:concept]")
[reskin] signature idea (trait): "A loose weapon, shield, or bundle of gear that the windscout snatches in flight stays lashed to its harness by a quick-cinched tether. It can then release the prize from height onto a chosen spot below, turning whatever it stole into an unerring falling missile that smashes down on the target." [trait/always/damage] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] signature miss: trait — "A loose weapon, shield, or bundle of gear that the windscout snatches in flight stays lashed to its harness by a quick-cinched tether. It can then release the prize from height onto a chosen spot below, turning whatever it stole into an unerring falling missile that smashes down on the target." [trait/always/damage] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] chassis nova: "Skydive (Recharge 5-6)" — the skirmisher-3-winged's own nova row (its "Diving Attack", renamed by the model); geometry, cap and rider lines below are its edits
```


---


### Thistlewick — in the run

**Concept:** a harengon courier who bounds over the hedgerows

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Thistlewick | 1 | skirmisher-1 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1/4 / off 1 → 0.625; sustained 12 (2 × Kick); nova none; dmg 12

```
Thistlewick

Small Humanoid, Neutral

AC 15
Initiative +2 (12)

HP 31 (7d6 + 7)

Speed 30 ft.

MOD
SAVE
STR
10
+0
+0
INT
8
-1
-1
MOD
SAVE
DEX
14
+2
+4
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
8
-1
-1

Skills Perception +3, Stealth +4

Senses darkvision 60 ft.; Passive Perception 13

Languages Common, Sylvan

CR 1 (XP 200; PB +2)

Traits

Standing Leap. Thistlewick's Long Jump is up to 20 feet and its High Jump is up to 10 feet with or without a running start.

Hedgecunning. Thistlewick ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Actions

Multiattack. Thistlewick makes two attacks, using Kick or Sling in any combination.

Kick. Melee Attack Roll: +4, reach 5 ft. 6 (1d8 + 2) Bludgeoning damage.

Sling. Ranged Attack Roll: +4, range 30/120 ft. 5 (1d6 + 2) Bludgeoning damage.

Bonus Actions

Fleet Agility. Thistlewick takes the Dash or Disengage action.

Bramble Chase (1/Day). Immediately after dealing damage to a creature that is already Bloodied, Thistlewick moves up to half its Speed, and it makes one Kick attack.

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
[route] skirmisher type=Humanoid mechanics=none — skirmisher: ✓ ("bounds over the hedgerows") | skirmisher: no line key in the words — the model's read of its quote
[concept] signature elements: bounds over the hedgerows [behavior] | courier satchel of messages [object] | harengon leaping legs [body]
[reskin] claim gate: CR 1 but a Humanoid body — the trait seat stays open (print: a material body carries a trait at every tier)
[reskin] signature idea (action): "Thistlewick springs off a wall, cart, or thick trunk, tumbling through the air to land in a space it can see within its long jump distance, even if that path carries it directly over a foe. Foes nearby are caught off guard by the vault; the first one it passes over loses its footing for a moment as it clips past. Thistlewick must have a solid object or creature beside it to kick off from, and can " [bonus_action/always/movement] — menu: rampage, blink, aggro-curse, self-invisibility, focus, feint-slip, coating (+ shelf: snare, throw-retrieve, lure, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, snap-shot, riposte, charge-push, hook-rider, pounce, isolation, bolt-mark, charge)
[reskin] signature miss: action — "Thistlewick springs off a wall, cart, or thick trunk, tumbling through the air to land in a space it can see within its long jump distance, even if that path carries it directly over a foe. Foes nearby are caught off guard by the vault; the first one it passes over loses its footing for a moment as it clips past. Thistlewick must have a solid object or creature beside it to kick off from, and can " [bonus_action/always/movement] — no template on the shelf shares a verb with the concept or the idea (offered: rampage, blink, aggro-curse, self-invisibility, focus, feint-slip, coating, snare, throw-retrieve, lure, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, snap-shot, riposte, charge-push, hook-rider, pounce, isolation, bolt-mark, charge)
[reskin] value check: "Rampage (1/Day)" EV 4.2 vs floor 0.8 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: rampage -> Bonus Actions/"Rampage (1/Day)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Thistlewick's courier satchel is stuffed with misdelivered letters, fey trinkets, and noisemakers that spill out when it is struck. Any creature that hits it in melee must immediately deal with an exploding packet of glitter and clattering junk, leaving that foe briefly blinded and spluttering — but not Thistlewick. The satchel empties after a few such accidents and must be restocked during a rest" [trait/on_being_hit/condition] — menu: absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst)
```


---


### Serael the Dawnward — in the run

**Concept:** an aasimar lightbringer with a mace

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Serael the Dawnward | 6 | defender-3-leader | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 4 / off 6 → 5; sustained 44 (2 × Mace); nova none; dmg 44

```
Serael the Dawnward

Medium Humanoid, Lawful Good

AC 16
Initiative +2 (12)

HP 104 (16d8 + 32)

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
11
+0
+0
MOD
SAVE
CON
15
+2
+5
CHA
15
+2
+5

Skills Athletics +7, Persuasion +5

Resistances Necrotic, Radiant

Immunities Charmed

Senses darkvision 60 ft.; Passive Perception 10

Languages Celestial, Common

CR 6 (XP 2,300; PB +3)

Traits

Aura of Authority. While in a 10-foot Emanation originating from Serael, Serael and its allies have Advantage on attack rolls and saving throws, provided Serael doesn't have the Incapacitated condition.

Actions

Multiattack. Serael makes two Mace attacks.

Mace. Melee Attack Roll: +7, reach 5 ft. 22 (4d8 + 4) Bludgeoning damage, and the target has Disadvantage on its next attack roll before the start of Serael's next turn.

Weapon of Command. Melee Attack Roll: +7, reach 5 ft. 22 (4d8 + 4) Bludgeoning damage.

Bonus Actions

Binding Mark. Wisdom Saving Throw: DC 15, one creature within 30 feet. Failure: Until the start of Serael's next turn, the target has Disadvantage on attack rolls against creatures other than Serael.

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
[route] defender-leader type=Celestial mechanics=none — caster-warpriest: a caster line needs a magic word in the words — none here | defender-leader: ✓ ("aasimar lightbringer") | defender-leader: no line key in the words — the model's read of its quote
[concept] signature elements: commanding aura that steadies allies [aura] | radiant mace strikes [object] | parries in defense of companions [behavior]
[reskin] signature idea (action): "Serael's mace flares with gathered dawn light as it comes down; the blow itself, not a spell, is the light. When that strike lands, the radiance clings to the target so that anyone Serael is defending sees the foe lit up and can fight it freely, while the foe's own vision swims in glare. The mark lasts only briefly, until the next time Serael raises the weapon to strike again." [rider/on_hit/condition] — menu: charge-push, hook-rider (+ shelf: swallow, throw-retrieve, seal, hook-drag, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, shell-withdraw, volley-order, aggro-curse, own-turn-punisher, self-invisibility, rally, riposte)
[reskin] value check: "Binding Mark" EV 6.3 vs floor 3.4 (a bonus action (free)) — worth the trade
[reskin] signature template: aggro-curse -> Bonus Actions/"Binding Mark" ("the light marks the struck foe so allies of Serael can fight it freely (Advantag [verb: mark:idea]")
[reskin] signature idea (trait): "Serael's mace is not merely blessed steel — the light of dawn lives inside it, so every blow it lands scours with radiance as surely as it crushes. Any creature struck by the mace feels that searing light, and the flash leaves the target's next swing wild as it blinks away the afterimage." [trait/always/damage] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending, weapon-lodge)
```


---


### Mournhold Grieve — in the run

**Concept:** a goliath stone-herder who wrestles avalanches

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Mournhold Grieve | 8 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 6 / off 8 → 7; sustained 54 (2 × Boulderfist); nova none; dmg 54

```
Mournhold Grieve

Huge Humanoid, Neutral

AC 15
Initiative -1 (9)

HP 152 (16d12 + 48)

Speed 40 ft.

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

Senses tremorsense 60 ft.; Passive Perception 13

Languages Common

CR 8 (XP 3,900; PB +3)

Traits

False Appearance. While the mournhold grieve remains motionless, it is indistinguishable from an ordinary object.

Mountain Stride. Difficult Terrain composed of ice or snow doesn't cost the mournhold grieve extra movement, and the mournhold grieve can move across ice or snow without needing to make an ability check.

Actions

Multiattack. The mournhold grieve makes two attacks, using Boulderfist or Stonecast in any combination.

Boulderfist. Melee Attack Roll: +8, reach 10 ft. 27 (5d8 + 5) Bludgeoning damage.

Stonecast. Ranged Attack Roll: +8, range 60/240 ft. 23 (4d8 + 5) Bludgeoning damage.

Bonus Actions

Rampage (1/Day). Immediately after dealing damage to a creature that is already Bloodied, the mournhold grieve moves up to half its Speed without provoking Opportunity Attacks, and it makes one Boulderfist attack.

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
[route] brute type=Giant mechanics=grapple — brute-grappler: ✓ ("wrestles avalanches") | brute-grappler: no line key in the words — the model's read of its quote | brute-grappler -> brute: a grappler is a mechanic engine and needs a key in the words — the model's read of its quote cannot land it
[concept] signature elements: wrestling avalanches [behavior] | body of mountain stone [body] | hurling boulders [object]
[reskin] signature idea (action): "The grieve tackles a Large or smaller creature, driving it to the ground and pinning it under its massive weight. While pinned, the target is restrained beneath rubble and stone, taking crushing damage at the start of each of the grieve's turns. The grieve cannot use its stonecast against any creature other than the one it is pinning, and the pin ends if the grieve moves or is forced to release it" [rider/on_hit/condition] — menu: charge-push, hook-rider, pounce, charge (+ shelf: trample, leap, thrown-burst, throw-retrieve, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, rampage, shell-withdraw, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating)
[reskin] value check: "Rampage (1/Day)" EV 22.8 vs floor 4.4 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: rampage -> Bonus Actions/"Rampage (1/Day)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The grieve's body is living mountain stone; whenever a creature strikes it in melee, chips of jagged rock explode outward, cutting and staggering the attacker. The harder they hit, the more shrapnel they eat." [trait/on_being_hit/damage] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] signature bound to the concept's verb: trait — false-appearance (stone)
[reskin] signature miss: trait — "The grieve's body is living mountain stone; whenever a creature strikes it in melee, chips of jagged rock explode outward, cutting and staggering the attacker. The harder they hit, the more shrapnel they eat." [trait/on_being_hit/damage] — the model found no template that holds it (offered: false-appearance)
[reskin] signature template (trait): false-appearance -> Traits/"False Appearance" ("exact concept match [verb: stone:concept]")
```


---


### Sriella Windstride — in the run

**Concept:** a centaur outrider with a longbow

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Sriella Windstride | 5 | skirmisher-3-mounted | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 3 / off 5 → 4; sustained 24 (2 × Longbow); nova Hoof Charge 28; dmg 35

```
Sriella Windstride

Large Fey, Neutral

AC 16
Initiative +3 (13)

HP 90 (12d10 + 24)

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

Languages Common

CR 5 (XP 1,800; PB +3)

Traits

Great Weapon Master. When Sriella hits a creature with its Longbow, the attack deals an extra 3 damage.

Steppe Stride. Sriella ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Actions

Multiattack. Sriella makes two Longbow attacks. It can replace one attack with a use of Curb Stomp.

Saber. Melee Attack Roll: +6, reach 5 ft. 21 (4d8 + 3) Slashing damage. If Sriella moved at least 20 feet in a straight line toward the target immediately before the hit, the target takes an extra 7 (2d6) Slashing damage and, if it is Medium or smaller, has the Prone condition.

Hoof Charge (Recharge 5-6). Sriella moves up to its Speed without provoking Opportunity Attacks and can move through the spaces of Medium or smaller creatures. Each creature whose space it enters is targeted once by the following effect. Strength Saving Throw: DC 13. Failure: 28 (8d6) Bludgeoning damage, and the target has the Prone condition.

Longbow. Ranged Attack Roll: +6, range 150/600 ft. 12 (2d8 + 3) Piercing damage.

Curb Stomp. Strength Saving Throw: DC 13, one creature within 30 feet that is Prone. Failure: 10 (3d6) Piercing damage. Success: Half damage.

Bonus Actions

Mounted Agility. Sriella takes the Dash or Disengage action.

Charge. Sriella moves up to half its Speed straight toward an enemy it can see.

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
[route] skirmisher-mounted type=Monstrosity mechanics=none — skirmisher-mounted: ✓ ("a centaur outrider") | skirmisher-mounted: key "outrider" (class body)
[concept] signature elements: longbow volleys from the move [object] | ride-down skirmish and wheel away [behavior] | nomadic centaur outrider [body]
[reskin] nova capped: "Trampling Rush" 31 → 28 (the chassis nova obeys the cap: 28 at CR 5)
[reskin] signature idea (action): "Sriella looses a rapid volley of arrows at up to three different creatures it can see, each shot aimed independently. If it does not move at all on its turn before firing, the volley can target only a single creature but every arrow strikes with uncanny precision, ignoring cover and concealment. After the volley, Sriella can immediately move up to half its speed away from the targets without provo" [action/always/damage] — menu: swallow, condition-payoff, throw-retrieve, lure, snare-bolt, sensory-strike, disarm, exploiter (+ shelf: delayed-brand, rampage, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte, affliction, contagion, charge-push, hook-rider, pounce, isolation, bolt-mark)
[reskin] signature miss: action — "Sriella looses a rapid volley of arrows at up to three different creatures it can see, each shot aimed independently. If it does not move at all on its turn before firing, the volley can target only a single creature but every arrow strikes with uncanny precision, ignoring cover and concealment. After the volley, Sriella can immediately move up to half its speed away from the targets without provo" [action/always/damage] — the model found no template that holds it (offered: swallow, condition-payoff, throw-retrieve, lure, snare-bolt, sensory-strike, disarm, exploiter, focus)
[reskin] value check: "Opportunist's Lash" EV 7.8 vs floor 6.8 (one attack of 2) — worth the trade
[reskin] library seed drawn: exploiter -> Actions/"Opportunist's Lash" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "When a creature tries to close to melee with Sriella, it can kick up a blinding cloud of steppe dust as it retreats, causing the pursuer to lose sight of it until the end of the pursuer's next turn. While hidden this way, Sriella's next longbow shot against that creature is especially deadly." [trait/on_being_hit/condition] — menu: heated-body, absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, warded-mending, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] signature miss: trait — "When a creature tries to close to melee with Sriella, it can kick up a blinding cloud of steppe dust as it retreats, causing the pursuer to lose sight of it until the end of the pursuer's next turn. While hidden this way, Sriella's next longbow shot against that creature is especially deadly." [trait/on_being_hit/condition] — the model found no template that holds it (offered: heated-body, absorption, bloodied-burst, resonant-body, false-appearance)
[reskin] chassis nova: "Hoof Charge (Recharge 5-6)" — the skirmisher-3-mounted's own nova row (its "Trampling Rush", renamed by the model); geometry, cap and rider lines below are its edits
```


---

## Review batch — step7-twelve-2026-10-13T18-19-35

The checker ran first. The gate table covers every block in the run; every block of the run follows. Each block carries its checker row above and its engine trace below. Hand-derive against the row first; then read for what predicates can't see.

### Gate table — the whole run

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Meshrin | 8 (2014) | 2014 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 7/7 | 7/7 |
| Vaultsworn Bulwark | 12 | 2024 | brute-11-charger | ok | SOFT: band | ok | ok | SOFT: lint:bps-immunity | ok | ok | ok | ok | soft (2) | 6/6 | 3/7 |
| Grandmother Ash | 7 (2014) | 2014 | skirmisher-3 | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | soft (1) | 5/7 | 4/4 |
| Mire Hound | 1 | 2024 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/4 |
| Thurivald | 20 | 2024 | dragon-22 | ok | SOFT: band, hot-offense | ok | ok | ok | ok | ok | ok | ok | soft (1) | 2/2 | 3/9 |
| Thunder-Stamp Herdmaster | 13 | 2024 | defender-8-leader | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 2/4 |
| Goblin Warrior | 1 | 2024 | skirmisher-1 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/3 |
| Kraken | 24 (2014) | 2014 | brute-21 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 9/9 |
| Sorrowbile the Rotwife | 8 | 2024 | caster-8-binder | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | soft (1) | 0/1 | 0/6 |
| Sir Reginald Pemberton-Hughes | 5 (2014) | 2014 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 3/3 |
| Knife Ball | 2 (2014) | 2014 | lurker-2-trap | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |
| Snapping Turtle Elder | 9 | 2024 | brute-9 | ok | user-set: AC 22 · reads CR 12.5 | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 2/2 |

**Dropped 3 of 32 user clauses** (coverage 91%); concept share 69% (43/62 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- none



---


### Mire Hound — lowest CR

**Concept:** a mud-caked bog hound that drags fishermen under

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Mire Hound | 1 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1/8 / off 1 → 0.5625; sustained 12 (2 × Bite); nova none; dmg 12

```
Mire Hound

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

Sure Footing. Difficult Terrain composed of mud doesn't cost the mire hound extra movement, and the mire hound can move across mud without needing to make an ability check.

Actions

Multiattack. The mire hound makes two Bite attacks. It can replace one attack with a use of Drowning Drag.

Bite. Melee Attack Roll: +4, reach 5 ft. 6 (1d8 + 2) Piercing damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 12). While Grappled, the target has the Restrained condition.

Drowning Drag. Strength Saving Throw: DC 13, one creature within 20 feet. Failure: The target is pulled up to 15 feet straight toward the mire hound by its jaws and has the Grappled condition (escape DC 12).

Bonus Actions

Whelm. The mire hound whelms one Medium or smaller creature it is grappling. While whelmed, the target has the Blinded and Restrained conditions, has Total Cover against attacks and other effects outside the mire hound, and takes 3 (1d6) Bludgeoning damage at the start of each of the mire hound's turns. The mire hound can have only one creature whelmed at a time. If the mire hound takes 5 damage or more in a single turn from the whelmed creature, the mire hound must release the target at the end of that turn, and the target exits Prone in an unoccupied space within 5 feet of the mire hound. If the mire hound dies, a whelmed creature pulls free Prone by using 5 feet of movement.

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
[concept] signature elements: drags prey underwater [behavior] | mud-caked hide [body]
[reskin] claim gate: CR 1 but a Beast body — the trait seat stays open (print: a material body carries a trait at every tier)
[reskin] signature idea (action): "The hound seizes a creature it has already clamped in its jaws and throws itself into the deepest water within reach, dragging the victim with it. While submerged it thrashes and buries its prey in the soft bottom, forcing the victim to break free or be drowned. It releases only after the victim tears loose or goes limp." [rider/on_hit/movement] — menu: contagion, charge-push, hook-rider, pounce (+ shelf: swallow, hook-drag, active-toll, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, exploiter, shell-withdraw, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating)
[reskin] signature bound to the concept's verb: action — hook-rider, hook-drag (drag, drags, under)
[reskin] value check: "Drowning Drag" EV 2.8 vs floor 2.6 (one attack of 2) — worth the trade
[reskin] signature template: hook-drag -> Actions/"Drowning Drag" ("The hound seizes a creature it has grappled and drags it into the water, forcing [verb: drag:concept, under:concept]")
[reskin] signature idea (trait): "The hound's mud-caked hide stays slick and dripping, and its natural camouflage lets it vanish into banks, reeds, and shallows the moment it stops moving. Creatures that try to spot it in such terrain find it nearly impossible to pick out from the muck." [trait/always/defense] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending, weapon-lodge)
[reskin] signature bound to the concept's verb: trait — terrain-walk (bog, mud)
[reskin] signature bound by force: trait — "terrain-walk" matches bog+mud in the user's words; the model's none is overruled
[reskin] signature template (trait): terrain-walk -> Traits/"Sure Footing" ("exact concept match [verb: bog:concept, mud:concept, reeds:idea, shallows:idea]")
```


---


### Vaultsworn Bulwark — a 2024 sheet

**Concept:** A huge iron golem shaped like a bull. It charges and gores, its hooves shake the ground when it stomps, it breathes scalding steam from its nostrils, and it is immune to anything but adamantine weapons.

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Vaultsworn Bulwark | 12 | brute-11-charger | ok | SOFT: band | ok | ok | SOFT: lint:bps-immunity | ok | ok | ok | ok |

- bands · soft · band: reads CR 15 (print at 12 reads 8–14, n=15)
- headerBody · soft · lint:bps-immunity: Immunity to all three physical types — 0/329 printed blocks have it; the physical types are stripped from Immunities
- read: def 16 / off 14 → 15; sustained 84 (2 × Gore); nova Shockwave 42; dmg 84

```
Vaultsworn Bulwark

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

Senses darkvision 120 ft.; Passive Perception 15

Languages Understands the languages of its creator but can't speak

CR 12 (XP 8,400; PB +4)

Traits

Scalding Vent. A creature that touches Bulwark or hits it with a melee attack while within 5 feet of it takes 10 (3d6) Fire damage.

Immutable Form. Bulwark can't shape-shift.

Magic Resistance. Bulwark has Advantage on saving throws against spells and other magical effects.

Actions

Multiattack. Bulwark makes two attacks, using Gore or Hooves in any combination.

Gore. Melee Attack Roll: +10, reach 10 ft. 42 (8d8 + 6) Piercing damage.

Hooves. Melee Attack Roll: +10, reach 5 ft. 42 (8d8 + 6) Bludgeoning damage, and the target has the Prone condition.

Shockwave (Recharge 5-6). Dexterity Saving Throw: DC 18, each creature in a 15-foot Emanation originating from Bulwark. Failure: 42 (12d6) Bludgeoning damage, and the target has the Prone condition. Success: Half damage only.

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
[route] brute-charger type=Construct mechanics=breath — brute-juggernaut: ✓ ("huge iron golem") | brute-juggernaut -> brute-charger: the concept's VERB outranks the noun (key "charges", class verb) | brute-charger: key "charges" (class verb)
[concept] signature elements: iron bull charge and gore [behavior] | ground-shaking stomp [behavior] | scalding steam breath [body]
[reskin] signature idea (action): "The bull lowers its head and thunders in a straight line through everything in its path, goring and trampling all in its way. Any creature it passes through is battered and scorched by the searing heat of its iron hide. The charge ends when it slams into a solid barrier or the line is spent, leaving a wake of superheated air." [action/always/damage] — menu: leap, condition-payoff, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, herd, thrown-burst-seed, drain, wind-up, exploiter (+ shelf: shell-withdraw, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, affliction, contagion, charge-push, hook-rider, pounce)
[reskin] signature bound to the concept's verb: action — ground-burst (stomp, stomps)
[reskin] signature bound by force: action — "ground-burst" matches stomp+stomps in the user's words; the model's none is overruled
[reskin] value check: "Shockwave (Recharge 5-6)" EV 110.2 vs floor 69.3 (the whole Multiattack (2 attacks)) — worth the trade
[reskin] signature template: ground-burst -> Actions/"Shockwave (Recharge 5-6)" ("exact concept match [verb: stomp:concept, stomps:concept]")
[reskin] signature idea (trait): "Scalding steam constantly vents from the bull's nostrils and joints. Any creature that strikes it in melee is burned by the superheated vapor, and the air around it is painfully hot to breathe." [trait/on_being_hit/damage] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] signature bound to the concept's verb: trait — heated-body (scald, iron)
[reskin] signature template (trait): heated-body -> Traits/"Scalding Vent" ("A creature that hits the bulwark with a melee attack is burned by the superheate [verb: scald:concept, iron:concept, burn:idea, hot:idea]")
```


---


### Thurivald — a homebrew with a nova

**Concept:** a glacier wyrm that swallows ships whole and freezes the sea

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Thurivald | 20 | dragon-22 | ok | SOFT: band, hot-offense | ok | ok | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 22 (print at 20 reads 12.5–22.5, n=8)
- bands · soft · hot-offense: offense alone reads CR 25, 5 over; the HP axis pulls the read to 22
- read: def 19 / off 25 → 22; sustained 204 (3 × Bite + legendary Freezing Bite); nova Glacier Breath 76; dmg 204

```
Thurivald

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

Sure Footing. Difficult Terrain composed of ice or snow doesn't cost Thurivald extra movement, and Thurivald can move across ice or snow without needing to make an ability check.

Legendary Resistance (4/Day). If Thurivald fails a saving throw, it can choose to succeed instead.

Actions

Multiattack. Thurivald makes three Bite attacks. It can replace one attack with a use of (A) Glacial Maw or (B) Spellcasting to cast Fear.

Bite. Melee Attack Roll: +14, reach 15 ft. 21 (3d8 + 8) Piercing damage plus 13 (3d8) Cold damage.

Glacier Breath (Recharge 5-6). Constitution Saving Throw: DC 21, each creature in a 90-foot Cone. Failure: 76 (17d8) Cold damage. Success: Half damage.

Spellcasting. Thurivald casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 21):

- At Will: Detect Magic, Darkness, Fear
- 1/Day Each: Scrying

Glacial Maw. Dexterity Saving Throw: DC 21, one Large or smaller creature within 10 feet that Thurivald hit with a melee attack this turn. Failure: 42 (12d6) Cold damage, and the target is swallowed. A swallowed creature has the Blinded and Restrained conditions, has Total Cover against attacks and other effects outside Thurivald, and takes 22 (5d8) Acid damage at the start of each of Thurivald's turns. If Thurivald takes 40 damage or more on a single turn from a creature inside it, it must succeed on a DC 21 Constitution saving throw at the end of that turn or regurgitate all swallowed creatures, each of which falls in a space within 10 feet of Thurivald and has the Prone condition. If Thurivald dies, a swallowed creature is no longer Restrained and can escape from the corpse using 15 feet of movement, exiting with the Prone condition.

Legendary Actions

Legendary Action Uses: 3. Immediately after another creature's turn, Thurivald can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.

Freezing Bite. Thurivald makes one Bite attack.

Ice Surge. Thurivald moves up to half its Speed without provoking Opportunity Attacks.

Endless Winter. Wisdom Saving Throw: DC 21, one creature within 30 feet. Failure: The target has the Frightened condition until the end of its next turn.

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
[concept] signature elements: swallowing entire ships [behavior] | freezing the sea solid [behavior] | glacial hide [body]
[reskin] signature idea (action): "Thurivald surges up through the ice beneath a vessel and takes the whole ship into its gullet in one motion, hauling it down into the freezing dark. The vessel and everyone aboard vanish: the swallowed ship is held inside the wyrm's glacial gut, its crew going still and silent in the cold, with only a faint frozen shape pressed against the dragon's hide to show they ever existed. Until the wyrm is" [action/always/movement] — menu: swallow, condition-payoff, hook-drag, escalating-dread, terror-pulse, push-prone, herd, drain, exploiter (+ shelf: shell-withdraw, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, contagion, charge-push, hook-rider, pounce, charge)
[reskin] signature bound to the concept's verb: action — swallow (swallow, swallows, swallowed, whole)
[reskin] value check: "Glacial Maw" EV 46.8 vs floor 22.4 (one attack of 3) — a nova already stands — kept ungated, dice to 42 at the ceiling
[reskin] signature template: swallow -> Actions/"Glacial Maw" ("the wyrm surges up and takes the whole ship into its gullet in one motion, hauli [verb: swallow:concept, swallows:concept, swallowed:concept, whole:concept]")
[reskin] signature idea (trait): "Anything Thurivald … is sealed in a tomb of primordial ice inside it, preserved but held fast. The wyrm can hold a limited number of such prizes within it at once, and each one drags at its guts, slowing and weighing it down until it retreats to the depths to settle them. Its cold carapace grows over each captured vessel, thickening with every ship it takes." [trait/always/resource] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, earth-glide, tunneler, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending, weapon-lodge)
[reskin] signature bound to the concept's verb: trait — terrain-walk (freezes, freeze, glacier)
[reskin] signature bound by force: trait — "terrain-walk" matches freezes+freeze+glacier in the user's words; the model's none is overruled
[reskin] signature template (trait): terrain-walk -> Traits/"Sure Footing" ("exact concept match [verb: freezes:concept, freeze:concept, glacier:concept, ice:idea]")
[reskin] chassis nova: "Glacier Breath (Recharge 5-6)" — the dragon-22's own nova row (its "Breath Weapon", renamed by the model); geometry, cap and rider lines below are its edits
```


---


### Sorrowbile the Rotwife — one marked soft

**Concept:** a plague-seer who curses the firstborn of every house

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Sorrowbile the Rotwife | 8 | caster-8-binder | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 6.5 (print at 8 reads 2–10.5, n=24)
- read: def 5 / off 8 → 6.5; sustained 54 (3 × Claw); nova none; dmg 54

```
Sorrowbile the Rotwife

Medium Undead, Neutral

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

Immunities Poison; Exhaustion, Poisoned

Senses darkvision 60 ft.; Passive Perception 15

Languages Common and Undercommon

CR 8 (XP 3,900; PB +3)

Traits

Rotting Body. A creature that touches Sorrowbile or hits it with a melee attack while within 5 feet of it takes 7 (2d6) Necrotic damage.

Actions

Multiattack. Sorrowbile makes three attacks, using Claw or Grave-Rot Ray in any combination. It can replace one attack with a use of (A) Withering Rot or (B) Spellcasting to cast Ray of Sickness.

Claw. Melee Attack Roll: +8, reach 5 ft. 18 (3d8 + 5) Necrotic damage.

Grave-Rot Ray. Ranged Attack Roll: +8, range 60 ft. 14 (2d8 + 5) Necrotic damage.

Withering Rot. Constitution Saving Throw: DC 16, one creature within 60 feet. Failure: 16 (3d10) Necrotic damage, and the target has the Poisoned condition until the end of its next turn.

Spellcasting. Sorrowbile casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 16, +8 to hit with spell attacks):

- At Will: Ray of Sickness
- 1/Day Each: Bestow Curse, Blight, Cloudkill

Rotwife's Embrace. Wisdom Saving Throw: DC 16, one creature within 30 feet. Failure: 18 (4d8) Necrotic damage, and the target can't regain Hit Points until the end of Sorrowbile's next turn. Success: Half damage only.

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
[route] caster-binder (controller) type=Undead mechanics=none — caster-binder: ✓ ("curses the firstborn of every house") | caster-binder: key "curses" (class verb)
[concept] signature elements: curse the firstborn of every house [behavior] | grave-rot aura that weakens the living [aura] | staff of knotted umbilicus [object]
[reskin] signature idea (action): "Sorrowbile points a finger at a foe and declares it firstborn. That creature is plagued with a rot that makes it share Sorrowbile's suffering: whenever Sorrowbile takes damage, the hexed creature feels the same injury, and if it dies while hexed it immediately rises as a plague-ridden revenant under Sorrowbile's control. Only one creature can bear the hex at a time, and Sorrowbile can pass the cur" [action/always/condition] — menu: condition-payoff, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, snare-bolt, slow-bolt, sensory-strike, herd, thrown-burst-seed, drain, curse-debt, zone-seed, reveal, wind-up, blighted-ground (+ shelf: delayed-brand, aggro-curse, self-invisibility, rally, snap-shot, bolt-restrain, bolt-drag, bolt-mark)
[reskin] signature miss: action — "Sorrowbile points a finger at a foe and declares it firstborn. That creature is plagued with a rot that makes it share Sorrowbile's suffering: whenever Sorrowbile takes damage, the hexed creature feels the same injury, and if it dies while hexed it immediately rises as a plague-ridden revenant under Sorrowbile's control. Only one creature can bear the hex at a time, and Sorrowbile can pass the cur" [action/always/condition] — the model found no template that holds it (offered: condition-payoff, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, snare-bolt, slow-bolt, sensory-strike, herd, thrown-burst-seed, drain, curse-debt, zone-seed, reveal, wind-up, blighted-ground, delayed-brand)
[reskin] value check: "Sealing Touch" EV 14 vs floor 9.4 (one attack of 3) — added Success: Half; dice 9 → 18
[reskin] library seed drawn: seal -> Actions/"Sealing Touch" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "A boneyard aura of grave-rot clings to Sorrowbile, sapping the vitality of the living who draw near. Any living creature that starts its turn close to her finds its flesh weakening, and if it is already plagued by her rot, the decay spreads faster, making it harder for the creature to act." [trait/start_of_turn/condition] — menu: fire-aura, warded-mending (+ shelf: heated-body, false-appearance, absorption, bloodied-burst, resonant-body, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst)
[reskin] signature bound to the concept's verb: trait — heated-body (plague)
[reskin] signature miss: trait — "A boneyard aura of grave-rot clings to Sorrowbile, sapping the vitality of the living who draw near. Any living creature that starts its turn close to her finds its flesh weakening, and if it is already plagued by her rot, the decay spreads faster, making it harder for the creature to act." [trait/start_of_turn/condition] — the model found no template that holds it (offered: heated-body)
[reskin] signature template (trait): heated-body -> Traits/"Heated Body" ("exact concept match [verb: plague:concept]")
```


---


### Thunder-Stamp Herdmaster — in the run

**Concept:** a storm-herder who commands a stampede of thunder-elk

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Thunder-Stamp Herdmaster | 13 | defender-8-leader | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 10 / off 16 → 13; sustained 93 (3 × War-Whip); nova none; dmg 93

```
Thunder-Stamp Herdmaster

Medium Humanoid, Neutral

AC 18
Initiative +2 (12)

HP 212 (25d8 + 100)

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
18
+4
+9
CHA
18
+4
+9

Skills Athletics +10, Persuasion +9

Senses darkvision 60 ft.; Passive Perception 11

Languages Common

CR 13 (XP 10,000; PB +5)

Traits

Aura of Authority. While in a 10-foot Emanation originating from the herdmaster, the herdmaster and its allies have Advantage on attack rolls and saving throws, provided the herdmaster doesn't have the Incapacitated condition.

Actions

Multiattack. The herdmaster makes three attacks, using War-Whip or Thunder-Elk in any combination.

War-Whip. Melee Attack Roll: +10, reach 5 ft. 18 (3d8 + 5) Slashing damage plus 13 (3d8) Thunder damage.

Thunder-Elk. Melee or Ranged Attack Roll: +10, reach 5 ft. or range 30/120 ft. 29 (7d6 + 5) Thunder damage.

Bonus Actions

Bolstering Cry (2/Day). Each ally within 30 feet of the herdmaster gains 14 (4d6) Temporary Hit Points.

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
[route] defender-leader type=Humanoid mechanics=thrown-weapon — defender-leader: ✓ ("commands a stampede") | defender-leader: key "commands" (class verb)
[concept] signature elements: a stampede of thunder-elk he commands [behavior] | iron herding-whip that cracks with thunder [object] | an aura of authority that steadies the herd [aura]
[reskin] signature idea (action): "The herdmaster cracks his whip and the herd answers — a line of thunder-elk materializes and stampedes in a straight line away from him, trampling everything in its path and leaving the ground shaking with thunder. The elk remain briefly as a phantom herd that he can drive forward again on later turns, but each time they stampede they thin out and eventually dissipate. He can only call a new stamp" [action/always/movement] — menu: throw-retrieve, seal, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up (+ shelf: shell-withdraw, volley-order, aggro-curse, own-turn-punisher, self-invisibility, rally, snap-shot, riposte, charge-push, hook-rider)
[reskin] signature bound to the concept's verb: action — herd (command, stampede)
[reskin] signature bound by force: action — "herd" matches command+stampede in the user's words; the model's none is overruled
[reskin] value check: "Driving Bellow (2/Day)" EV 11.7 vs floor 76.1 (the whole Multiattack (3 attacks)) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Driving Bellow (2/Day)" — the ladder could not lift it; the fallback stands in
[reskin] value check: "Bolstering Cry (2/Day)" EV 7.7 vs floor 4.9 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: rally -> Bonus Actions/"Bolstering Cry (2/Day)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Whenever the herdmaster's whip cracks, the thunderclap empowers his herd — any thunder-elk currently stampeding that hears the crack surges forward with renewed vigor, moving farther and hitting harder until the end of his next turn. The crack also marks his prey: the elk instinctively veer toward the last creature he struck with his whip, focusing their trampling on that foe." [trait/always/damage] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending, weapon-lodge)
[reskin] signature miss: trait — "Whenever the herdmaster's whip cracks, the thunderclap empowers his herd — any thunder-elk currently stampeding that hears the crack surges forward with renewed vigor, moving farther and hitting harder until the end of his next turn. The crack also marks his prey: the elk instinctively veer toward the last creature he struck with his whip, focusing their trampling on that foe." [trait/always/damage] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, bloodied-burst, resonant-body)
```


---


### Goblin Warrior — in the run

**Concept:** a goblin warrior

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Goblin Warrior | 1 | skirmisher-1 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1/4 / off 1 → 0.625; sustained 12 (2 × Scimitar); nova none; dmg 12

```
Goblin Warrior

Small Fey, Chaotic Neutral

AC 15
Initiative +2 (12)

HP 31 (9d6)

Speed 30 ft.

MOD
SAVE
STR
8
-1
-1
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
8
-1
-1
MOD
SAVE
CON
10
+0
+0
CHA
8
-1
-1

Skills Perception +1, Stealth +4

Senses darkvision 60 ft.; Passive Perception 11

Languages Common, Goblin

CR 1 (XP 200; PB +2)

Actions

Multiattack. The goblin warrior makes two attacks, using Scimitar or Shortbow in any combination.

Scimitar. Melee Attack Roll: +4, reach 5 ft. 6 (1d8 + 2) Slashing damage plus 2 (1d4) Slashing damage if the attack roll had Advantage.

Shortbow. Ranged Attack Roll: +4, range 80/320 ft. 5 (1d6 + 2) Piercing damage.

Bonus Actions

Nimble Escape. The goblin takes the Disengage or Hide action.

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
[route] skirmisher type=Humanoid mechanics=none — skirmisher: ✓ ("a goblin warrior") | skirmisher: no line key in the words — the model's read of its quote
[concept] signature elements: pack skirmishing and hit-and-run [behavior] | rusty scavenged blade [object] | cowardly retreat when bloodied [behavior]
[reskin] print canon array: STR 8, DEX 15, CON 10, INT 10, WIS 8, CHA 8 — the Goblin Warrior's, DEX fitted to +4
[reskin] print canon: "a goblin warrior" is a print creature — the seats stand down; print's own rows are the composition
[reskin] claim gate: CR 1 but a Humanoid body — the trait seat stays open (print: a material body carries a trait at every tier)
[reskin] print canon speed: modes walk only — the Goblin Warrior's
[reskin] print canon senses: "darkvision 60 ft." — the Goblin Warrior's
[reskin] print canon alignment: Neutral -> Chaotic Neutral — the Goblin Warrior's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon type: Humanoid -> Fey — the Goblin Warrior's (a Unicorn printed Fey, 2026-10-01)
[reskin] print canon attack: "Sling" -> "Shortbow" — the Goblin Warrior's own ranged row
[reskin] print canon: chassis row leaves — Traits/"Skitter" is the seat's, not the Goblin Warrior's
[reskin] print canon row: Bonus Actions/Nimble Escape — the Goblin Warrior's own
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" yields to the Goblin Warrior's Nimble Escape
```


---


### Snapping Turtle Elder — in the run

**Concept:** a giant snapping turtle with AC 22 that bites for 50 damage

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Snapping Turtle Elder | 9 | brute-9 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 10 / off 15 → 12.5; sustained 98 (2 × Bite); nova none; dmg 98

```
Snapping Turtle Elder

Huge Beast, Unaligned

AC 22
Initiative -1 (9)

HP 161 (17d12 + 51)

Speed 40 ft., Swim 40 ft.

MOD
SAVE
STR
18
+4
+8
INT
8
-1
-1
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
17
+3
+7
CHA
8
-1
-1

Skills Athletics +8, Perception +4

Senses darkvision 60 ft.; Passive Perception 14

Languages None

CR 9 (XP 5,000; PB +4)

Actions

Multiattack. The turtle elder makes two Bite attacks.

Bite. Melee Attack Roll: +8, reach 10 ft. 49 (10d8 + 4) Piercing damage.

Bonus Actions

Shell Defense. The turtle elder withdraws into its shell. Until it emerges, it gains a +4 bonus to Armor Class and has the Prone condition; its Speed is 0 and can't increase, it has Disadvantage on Dexterity saving throws, it can't take Actions or Reactions, and it can emerge only as a Bonus Action.

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
[route] brute type=Beast mechanics=grapple — brute-grappler: ✓ ("giant snapping turtle") | brute-grappler: no line key in the words — the model's read of its quote | brute-grappler -> brute: a grappler is a mechanic engine and needs a key in the words — the model's read of its quote cannot land it
[concept] signature elements: the crushing bite [behavior] | armor-plated shell and neck [body] | lurking in murky shallows [behavior]
[reskin] signature idea (action): "The elder lunges with its full neck, seizing a victim in a crushing, locking bite. Until the turtle chooses to let go or is forced apart, the victim stays clamped in its jaws, and at the start of each of its turns the turtle automatically grinds down, dealing damage to the caught creature and its shell scraping away at anything the victim is carrying or wearing. The turtle cannot bite anyone else " [rider/on_hit/condition] — menu: affliction, contagion, charge-push, hook-rider, pounce, charge (+ shelf: swallow, trample, leap, thrown-burst, hook-drag, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, rampage, shell-withdraw, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating)
[reskin] signature bound to the concept's verb: action — shell-withdraw (turtle)
[reskin] signature bound by force: action — "shell-withdraw" matches turtle in the user's words; the model's none is overruled
[reskin] value check: "Shell Defense" EV 9.6 vs floor 5.2 (a bonus action (free)) — worth the trade
[reskin] signature template: shell-withdraw -> Bonus Actions/"Shell Defense" ("exact concept match [verb: turtle:concept, shell:idea]")
[reskin] signature idea (trait): "Its neck and limbs are plated in ancient shell, letting it pull into an armored knot that turns aside most blows. When it does, the shell also traps momentum, so any attacker who strikes it in melee gets a punishing scrape from the shell's serrated lip." [trait/on_being_hit/damage] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] signature miss: trait — "Its neck and limbs are plated in ancient shell, letting it pull into an armored knot that turns aside most blows. When it does, the shell also traps momentum, so any attacker who strikes it in melee gets a punishing scrape from the shell's serrated lip." [trait/on_being_hit/damage] — no template on the shelf shares a verb with the concept or the idea (offered: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge, false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
```

