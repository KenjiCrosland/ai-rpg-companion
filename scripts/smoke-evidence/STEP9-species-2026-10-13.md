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

## The inline inversion (owner, 2026-10-13) — the call answers, the rules verify

The owner's read of the name rules: "if we had a call return 'inline epithet' with a prompt change we wouldn't need the deterministic cruft, or at least it's a light secondary layer." That is now how it works.

**The call answers two fields.** `inline_kind` is `person` or `kind`, and `inline` is the exact phrase the rows will use, with print's idiom and six worked examples in the prompt (a given name, an honorific plus its name, the name's own last one or two words lowercased). **The engine validates rather than guesses:** a person's form must be one capitalized word of the name or an honorific plus a word of the name; a kind's form must be "the" plus a contiguous tail of the name, lowercased. A phrase carrying a word the name never had is refused.

**Two rules outrank the call, both the owner's own:** print's idiom where the name is a print creature, and the GM's article — "a meshrin" makes a kind however the call answers, while a one-word Name field with no article is a person.

**What that replaces.** The rank list, the kinship-title list, the ninety-word role-noun list, the forty-word epithet-adjective list, the coined-surname rule, the weak-rank rule and the epithet-first rule all stay in the file, but only as the fallback when the call's answer fails validation. Every case we patched one at a time this week now comes from the call and passes: Brannor, the warden, the turtle elder, the knife ball, Sir Reginald, the headless horseman. And the case the rules got wrong last round — "the stalker" on Silent Rooststalker — is refused on sight, because "stalker" is not a word of that name.

**The same class, one row over.** Sir Reginald's Phobia shipped "while Sir Reginald can see **the thing it fears**" because the engine force-bound the phobia shape after the fit call declined it, and nobody filled its flavour slot. A template the engine binds itself now carries its fill, quoted from the GM's own words: "while Sir Reginald can see **chickens** within 30 feet". That is the deterministic half doing what it is good at — quoting the user — rather than guessing a noun.

Pins: `species.spec.js` ("the inline is the call's answer, validated", 4 tests), with the assertions on the *class* where the call legitimately has a choice and on the exact string only where one answer validates.

---

## Round six — the critic's fifth read, and the judgement moves to the call (2026-10-13)

The owner's direction with this read: ignore the epithet proposal (the inline is
already the call's answer, round five), and "engineer less deterministic gating
when the llm can make a lot of these judgements — consider reworking that
architecture where it fits the most, because I have a feeling it may solve some
of the recurring issues". No block run this landing; it rolls into the next.

### The rework: the engine finds the word, the call says what it means

The force-bind was the engine deciding a question of meaning. `rankByVerb` finds
a template's key word in the GM's text; two keys, or the creature's head noun,
and the engine bound the template **over the call's own "none"**. Every
word-collision defect in the critic's five reads came from that one place:

| the GM typed | the engine bound | why it was wrong |
| --- | --- | --- |
| a blood-priest | Uncanny Sense | "blood" is the modifier, not a sense |
| a stone-herder | False Appearance | a goliath is not indistinguishable from a rock |
| the knife ball | Assassinate | a ball of knives is not an assassin |
| guards the reef | Bound | "bound to its resting place" is undead language on a living triton |
| climbs the temple wall | Spider Climb | the species kit already gave it a climb Speed |

The fit call now answers two more fields, in the same call, at no extra cost:

- **`wrong`** — the ids whose word match does not mean the mechanic here. The
  prompt names the three classes above (modifier slot, already answered,
  another fiction). The engine's own force-bind reads it and stands down.
- **`fills`** — asked for whichever answer the call gives, because a
  concept-matched template may be used even on a "none". A fill must carry one
  significant word of the text the call was shown, so it is the GM's noun quoted
  back, not invented. The engine's regex stays behind it as the fallback.

Those answers are kept for the whole generation (`wrongT`, `fillsT`) and read by
the three paths that bind **without** asking: the force-bind, the concept-first
trait, and the seat's owed row. No new call, no new mechanism — the deterministic
layer is demoted from decider to proposer and validator, the shape the inline
inversion already took.

### Holds 1-6

**1. Chassis rows beside the named weapon** (six sheets). Two rules, both print's:
a named weapon takes the chassis's attack slots **in its mode** and the chassis
row of that mode leaves; and the hybrid frame dresses only something that can
fly — a row whose head noun is not a thrown weapon, and which deals a physical
type, loses its range. Print's other hybrid row is the Mage's Arcane Burst, so an
energy row keeps the frame; a launcher is the weapon table's to retable.
The evicted row's **swings** ride with the keeper: the Multiattack re-reads, and
where it is a list ("one Haft Swing attack and one Greataxe attack") the counts
merge ("two Greataxe attacks"), so sustained damage does not fall with the row.
Two new predicates: `hybrid-needs-thrown`, `attack-in-multiattack`.

Found by the new predicate, not by a reader: `sweepDeadName` erased a name that a
**surviving** row still carried (the model named both the hybrid and the ranged
chassis row "Hand Axe"; evicting one swept the other out of the Multiattack).
A shared name is not a dead name.

Also from `attack-in-multiattack`: a row the Multiattack never names now joins it
in print's own grammar — "makes two attacks, using Greataxe or Hand Axe in any
combination". The count does not change, only the choice.

**2. Fallback seeds bypass the gates.** Not a new gate: two shapes whose fiction
is anatomy or arcane tech now carry a `requires_claim`, checked in `templatesFor`
beside the engine-key gate. A shell needs a shell in the GM's words or on the
sheet; a teleport needs a teleport. Their *match* keys stay deliberately loose
("retreat", "armor", "shadow", "step") — the claim is narrower than the keys, by
design. An orc who "retreats behind iron armor" buys no shell; a troglodyte who
"lurks in shadow and steps away" does not blink 40 feet.

**3. Inline names.** Ignored per the owner. The call already answers it.

**4. Damage types.** Two layers, no new mechanism. The rename call is now told
the type is the engine's and will not move to suit a name ("a row dealing
Piercing is not a Stomp, a Glare or a Surge"), which is where the mismatch is
born. Behind it, the anatomy table gained type-only nouns (stomp, kick, crush,
blade, axe, hammer…) and reads a closed compound at either end, so "Fangblade"
dealing Bludgeoning is corrected to Slashing and "Curb Stomp" dealing Piercing to
Bludgeoning. Type-only nouns never move a row between melee and ranged, so a
hurled handaxe keeps its name.

**5. Sir Reginald's Phobia.** Fixed in round five and now fed by the call's own
`fills` as well as the engine's regex.

**6. The species carries its size.** `size` on the table — absent means Medium,
the grung is Small, the centaur and minotaur are Large. A size word in the GM's
own words outranks it; a swarm's size line is its own. The hit die follows the
size and so does the reach, as they do for a print body. A Huge Humanoid goliath
on 16d12 with reach 10 is now a Medium one on d8s at reach 5.

**Also:** the multiattack-integrity false positive the critic reported — a
Spellcasting row named as "Spellcasting to cast Hold Person" is the row plus the
spell it casts.

### Measures

Pins: ten new tests in `species.spec.js` under "the critic's fifth read, and the
judgements the call now owns". Reskin suites 22/22, 1,108 tests. Full suite 183
suites, 5,260 tests, 26 skipped. `npm run build` clean. No block run this
landing, per the owner.

---

## Round seven — landing one closed, and the repeat offenders (2026-10-13)

The owner: "lets keep going." This round closes the species table's last facts
and the three items the critic has now flagged three or four times. No block run;
it rolls into the next landing with rounds five and six.

### The species table's last two facts

**Languages.** The generator's species-language list was Humanoid-gated, so a
satyr, a centaur and a minotaur never got one, and a grung read "can't speak"
where grung speak. All nineteen entries now declare their tongues and the kit
owns the line: it replaces an empty, None or can't-speak line, and otherwise adds
only what is missing. The GM still outranks it — the header clause and the speech
clause both land after the kit. A GM who asks for a mute grung still gets one.

**Natural weapons.** The table's `naturalWeapons` was only ever a warrant for a
part the GM named, so a minotaur struck with a chassis Slam. Where no row names
one of the species' own weapons and the GM named no weapon, a **generic** chassis
strike (Slam, Fist, Strike, Blow, Punch) becomes the species' own, with its own
damage type and every citation following the rename: a minotaur Gores for
Piercing, a centaur strikes with Hooves, a satyr Rams. A weapon the GM typed, a
part, print's row and a name the model chose all stand untouched.

### The three the critic flagged three times

**The speed-discord lint on Shell Defense.** The rule looked 40 characters
forward for a duration, and Shell Defense states its duration first: "Until it
emerges, … its Speed is 0 and can't increase." The rule now reads the whole
sentence, and it is a named, exported predicate (`permanentSpeedZero`) rather
than an inline regex, so it is pinned on its own text. A genuinely permanent
Speed 0 beside a walking Speed still reports.

**The swallow interior on a cold wyrm.** The interior already honoured a declared
energy; it just never read the creature's own words. Where the form declares no
energy, the concept's own energy word now names the interior, and only a gullet
the words never colour falls back to Acid. A rime-scaled wyrm digests in Cold.

**The 2014 Multiattack forcing a crossbow shot.** `multiattack2014` wrote the
enumerated form — "one with its Greatsword and one with its Heavy Crossbow" —
whenever the name count matched the attack count, which commits the creature to
every name. That is only honest when one body can use them all in a turn. A
launcher beside a melee weapon now takes the choice form; print's own enumerated
idiom still stands for a Chimera's bite and horns.

### Three smaller items from the same read

- **Great Weapon Master on a Longbow.** The feat is now melee-heavy only, which
  is also the 2024 weapon list minus the two heavy ranged weapons. A longbow
  takes Slow and a heavy crossbow Push, their own mastery properties.
- **Othyn's Topple at DC 13.** A mastery save derives from the weapon's stat:
  8 + mod + PB, not the sheet's best save DC, which may belong to a mental stat.
  The derivation gate gained `mastery-dc` so the drift cannot return quietly —
  the general DC rule accepted DC 13 because WIS +2 derives it.
- **Cunning Action and Cat's Dash both granting Dash.** A kit row whose whole
  grant a row on the sheet already covers is a second name for one mechanic, and
  it is dropped with a trace. Pinned both ways: dropped beside the skulker
  chassis's Cunning Action, landing where the chassis grants only Hide.

### Measures

Pins: five more in `species.spec.js` (languages, the Fey case, the mute case, the
species' teeth, the GM's weapon outranking them), five more for the small items
and the mastery gate, two in `engine-2014.spec.js`, two in `generate.spec.js`.

```
full suite      184 suites, 5,284 passed, 26 skipped
npm run build   clean
```
