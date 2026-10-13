# Sprint feature batch — the features this sprint landed, frozen at close-out — 2026-10-12

Owner's structure (2026-10-12): four sets. The canaries (ten, every landing) hold numbers; the twelve (every landing during a sprint) measures a feature in flight; the forty (close-out, fixed forever) spans CR scaling and common GM use cases; and a **per-sprint feature batch** (this one, close-out) covers every feature the sprint landed, across both editions and the CR range, then freezes and runs at every later close-out beside the forty. The twelve's six feature blocks seed it; they are not the whole of it.

## The batch (`scripts/smoke-batches/features-2026-10.json`): 32 blocks, 5 groups, 18 × 2024 / 14 × 2014, 4 exact

| # | group | prompt | CR | ed | mode | what it protects |
|---|---|---|---|---|---|---|
| 1 | parts | Name "Meshrin" — "Large lizard folk, 30 feet of movement,  Wields a greatsword, long tail for swipe attack…" | 8 | 2014 | band | parts + feature table: the pin (GWM, Trip, Riposte, four part rows, Meshrin on every row) |
| 2 | parts | "A huge iron golem shaped like a bull. It charges and gores, its hooves shake the ground …" | 12 | 2024 | band | parts + the adamantine header idiom |
| 3 | parts | Name "Thornback Marauder" — "A hobgoblin raider who fights with a shield and a mace, throws javelins before closing, …" | 3 | 2024 | band | shield-and-mace pair, a thrown weapon, Trip on the mace |
| 4 | parts | Name "Okhra the Hewer" — "A Large ogre champion wielding a huge two-handed greataxe with crushing force; she has a…" | 13 | 2014 | band | a heavy weapon (Great Weapon Master), a bite part, a person's name with an epithet |
| 5 | parts | "a six-armed stone giant duelist trained in the dueling style, with two longswords, a cru…" | 18 | 2024 | band | a style word → Riposte reaction; paired weapons; a headbutt part |
| 6 | parts | Name "Vell" — "A halfling assassin with a dagger and a hand crossbow who stabs exposed foes for a sneak…" | 5 | 2014 | band | Sneak Attack, a ranged part, a one-word person name |
| 7 | parts | "a bugbear brute with a flail that batters shields apart, a kick that sends foes sprawlin…" | 8 | 2024 | band | a flail (mastery), a kick part with Prone, a print alias head (Bugbear Warrior) with parts |
| 8 | parts | Name "Grik" — "A kobold with a spear and a sling, a nasty bite, and a knack for tripping bigger creatur…" | 1 | 2024 | band | a print alias body with parts at CR 1; Trip without a style word |
| 9 | header | "a giant snapping turtle with AC 22 that bites for 50 damage" | 9 | 2024 | band | declared AC and damage (user-set fields) |
| 10 | header | "a Tiny clockwork hummingbird with a flying speed of 90 feet that stabs with its beak" | 4 | 2014 | band | size and speed directives, 2014 |
| 11 | header | "a bog mummy wrapped in oiled linen; it is vulnerable to fire and the fire spreads to any…" | 6 | 2024 | band | a vulnerability directive; the grapple |
| 12 | header | "an iron sentinel immune to anything but adamantine weapons that guards a vault door and …" | 11 | 2014 | band | the adamantine idiom on a 2014 sheet; bound |
| 13 | header | "a hill giant archer who has no melee attack at all and shoots from the ridge" | 7 | 2024 | band | a lack (no melee row) on a print alias body |
| 14 | header | "a cave troll that speaks only Giant and understands nothing else, with a rockslide of a …" | 3 | 2014 | band | speaks only → Languages; a club part on a print borrow |
| 15 | print | "a kraken" | 24 | 2024 | exact | exact print body at print's CR, 2024, legendary |
| 16 | print | "a pit fiend" | 20 | 2024 | exact | exact print body, 2024, the Hellfire Spellcasting row |
| 17 | print | "a hydra" | 8 | 2014 | exact | exact print body, 2014, print's attack count |
| 18 | print | "a vampire" | 13 | 2014 | exact | exact print body, 2014, print's numbers and legendary rows |
| 19 | print | "a dire wolf" | 6 | 2024 | band | a print head above its CR (the Dire Wolf at 1): the chassis's dice, print's type and rider |
| 20 | print | "an ogre" | 7 | 2014 | band | a print borrow above its CR: raise-only array (STR 19 stands) |
| 21 | print | "a sea hag who drowns sailors with a kiss" | 3 | 2024 | band | the hag by context → Sea Hag |
| 22 | print | "a night hag who rides her victims' dreams" | 7 | 2014 | band | the hag by context → Night Hag, 2014 |
| 23 | print | Name "Grandmother Ash" — "An old hag who lives in the burned forest. She can turn into a cloud of ash and choke an…" | 7 | 2014 | band | the pin: a hag borrow with parts and a vulnerability (Green Hag; crows the named gap) |
| 24 | print | Name "Hobgoblin Warrior" — "commanding a shield wall" | 3 | 2024 | band | a print name with a seat verb (leader) above its CR |
| 25 | template | "a gargantuan purple worm-thing that swallows horses whole and burrows under caravans" | 16 | 2024 | band | the swallow template on a Gargantuan body |
| 26 | template | "a scarecrow that fears fire above all and flinches from any torch, strangling with straw…" | 4 | 2014 | band | the phobia trait; a strangle part |
| 27 | template | "a mind-lashing fey knight who charms a foe with a glance and then cuts down the charmed …" | 9 | 2024 | band | a condition payoff with its producer on the sheet |
| 28 | template | "a lighthouse keeper's ghost whose lantern beam blinds, who rings a bell that calls drown…" | 10 | 2014 | band | the repair path: three claims, one of them for the repair call; bound |
| 29 | name | Name "Faceless Pilgrim" | 6 | 2024 | band | an epithet name alone → "the pilgrim" |
| 30 | name | Name "Dame Oriel Vance" — "a vampire hunter with a silvered rapier and a crossbow" | 7 | 2014 | band | an honorific → "Dame Oriel"; silvered weapon parts |
| 31 | name | Name "Thessaly Brambleworth" — "a hedge-witch who curses thieves with boils" | 4 | 2024 | band | a person's name → "Thessaly"; a curse claim |
| 32 | name | Name "Kobold" — "throws oil flasks that burn" | 1/2 | 2024 | band | a print name with a claim: the seed carries the words (provenance) |

## The check

`node --import ./scripts/alias-loader.mjs scripts/check-run.mjs <run-dir>` for the gate table, coverage by provenance and concept share; `node scripts/canaries.mjs <run-dir> --batch scripts/smoke-batches/features-2026-10.json --reference scripts/smoke-evidence/features-2026-10-reference.json` for the numbers against the frozen reference (exact to the digit on the four print bodies, bands elsewhere). Hard bars: Meshrin 7/7 with Great Weapon Master, Trip Attack and Riposte; Grandmother Ash 6/7 on the Green Hag; zero fails; the four exact bodies print-identical.

## First run (`features-2026-10-2026-10-12T17-07-33`): 32 of 32 saved, no stalls — 4 fails, coverage 66/78 (85%), concept 80%

Both pins hold: Meshrin 7/7 (Greatsword, Tail Swipe, Razor Sharp Claws, Vicious Bite; Great Weapon Master, Trip Attack, Riposte; "Meshrin" on every row), Grandmother Ash 6/7 on the Green Hag with the crows the one gap. The reference is **not** written from this run: the batch freezes after the fix round below.

**By group**

- **Header directives and lacks (6): five of six honored exactly.** AC 22 and a 49-point bite on the snapper (user-set); Tiny with Fly 90 on the hummingbird (2014); Fire vulnerability on the bog mummy; the 2014 adamantine line on the vault warden ("poison, bludgeoning, piercing, and slashing from nonmagical attacks that aren't adamantine"); "Speaks only Giant" on the cave troll. The miss: "has no melee attack at all" — the hill giant archer keeps a Bowstave melee row. The lacks pass removes *named* rows and spell rows; a lack of a whole attack mode is not read.
- **Print bodies (10): clean.** The Kraken, Pit Fiend, Hydra and Vampire are 1/1 with every row print's (concept 9/9, 11/11, 4/4, 8/8). The Dire Wolf at CR 6 bites on the chassis's dice with print's rider; the Ogre at CR 7 keeps Strength 19 and rolls +7. The sea hag is a Fey on the Sea Hag's rows (Death Glare, Illusory Appearance), the night hag a Fiend on the Night Hag's (Nightmare Haunting, Soul Bag) — the hag-by-context rule holds in both editions. The Hobgoblin Warrior with a seat verb lands on a defender with Bolstering Cry.
- **Parts and the feature table (8): the group with the defects.** Three named weapons never became rows — Okhra's **greataxe** (the clause carries "Large", so the extraction typed it a header clause and the part reader skips header clauses; no Great Weapon Master either), Dame Oriel's **silvered rapier** (one clause names two weapons; the reader takes one noun per clause and took the crossbow), Gorum's **flail** (the model typed "a bugbear brute with a flail" descriptive). Two body parts are not in the noun table: a **kick** and a **headbutt**; "two longswords" (a plural) is not read. Two ranged parts **doubled the chassis row** (Dame Oriel's Crossbow, Gorum's Shortbow: the part took the ranged slot and the model had renamed another chassis row to the same name — the dedupe keeps both because their riders differ), and on Dame Oriel the melee row then left the sheet and the Riposte reaction references a "Slam" that is no row: three of the four fails. Salute of Stone's "a riposte for anyone who misses her" landed Dueling but no Riposte reaction on the legendary brute chassis.
- **Templates (4).** The swallow lands on the Gullet-Wyrm (print's idiom, in Bonus Actions) and the phobia on the scarecrow (Terror of Flame plus a Frightened save). The fourth fail is the Gullet-Wyrm's Erupting Gullet: "*Dexterity Saving Throw*: DC 20, that creature" after naming a point — the adjudicable-target predicate wants a count or an area and does not read "that creature" as one creature; that is the checker's miss, not the row's. Sir Lorn's charm-then-cut-down shape did not land a producer-payoff pair, and his inline reads **"the sir"**: the honorific rule landed only on the Name-field branch, and the model minted this name itself.
- **Name field and provenance (4): the names are right** — "the pilgrim", "Dame Oriel", "Thessaly" — and so is "Thornback" wrong: "Thornback Marauder" should speak as "the marauder" (the epithet rule knows adjectives, not role nouns). The Kobold's "throws oil flasks that burn" split "burn" off as its own clause.

**Coverage is 85% mostly for one reason: rows that landed without carrying the clause they answer.** Vell's Sneak Attack (a feature row) does not bind "stabs exposed foes for a sneak attack"; the night hag's Dream Ride does not bind "rides her victims' dreams"; Thessaly's Boil Curse does not bind "curses thieves with boils"; the Gullet-Wyrm's Swallow does not bind "swallows horses whole"; the scarecrow's Burnfear Flinch does not bind "flinches from any torch". Each is on the sheet; the provenance stamp (`clause` / `boundKeys`) is missing on the feature-table path and on template rows the idea call placed.

One checker false positive besides the target rule: Vell's Evasion (print's own idiom, "half as much damage if it fails") trips half-no-referent because the row carries no damage expression.

**Fix round, in order of what it protects**

1. Part reader: every part noun in a clause (two weapons in one breath), plural nouns, and a wielded weapon inside a header/head clause; kick and headbutt as Bludgeoning body parts.
2. A part that takes a slot evicts a chassis row the model renamed to the same name (one Crossbow, one Shortbow), and a part never removes the other mode's row.
3. A lack of a whole mode ("no melee attack", "no ranged attack") drops that mode's row and re-reads Multiattack.
4. Honorifics in `personalName` on every path ("Sir Lorn", "Dame Oriel"); an epithet name with a role noun heads on the noun ("the marauder").
5. Provenance on feature-table rows and idea-placed template rows.
6. Riposte for a style clause on a legendary chassis.
7. Checker: Evasion's idiom exempt from half-no-referent; "that creature" after a named point is one target.

## The fix round, three more runs, and the frozen reference (`features-2026-10-2026-10-12T18-06-23`)

Every item on the fix list landed, each pinned in `reskin/__tests__/canaries.spec.js` ("the sprint run's fix round"): the part reader reads a wielded weapon inside a header clause, two weapons in one clause, a descriptive clause past a wield cue, plurals ("two longswords" → Longsword), kick, headbutt and fingers, and no longer reads "crushing force" as Force damage; a part takes a slot of its own mode (a crossbow never lands on the melee slot; a melee part may still take a leftover ranged slot, as Meshrin's tail does); a part evicts a chassis row the model named the same and stays beside print's one melee row (Grik's bite); "has no melee attack" drops that mode's rows and the Multiattack re-reads; honorifics hold on every path ("Sir Lorn", never "the sir") and a role-noun epithet heads on its noun ("the marauder"), including in the feature table's own text ("Dame Oriel has Advantage", not "Dame has"); template rows and the engine's own Swallow row carry the user's words as provenance; a riposte asked for by name lands beside a named style; Sneak Attack binds the clause that says sneak attack; a one-word relative ("flasks that burn") stays with its noun; an exact body at print's CR deals print's dice on its added rows too (the Pit Fiend's Devilish Claw is 26 (4d8 + 8) and its Fiery Mace 22 (4d6 + 8) plus 21 (6d6) Fire, whatever the donor rolls); the checker reads print's Evasion idiom and "that creature" after a named point.

| run | saved | fails | coverage | what it found |
|---|---|---|---|---|
| 17-07-33 (first) | 32/32 | 4 | 66/78 | the read above |
| 17-35-14 | 32/32 | 0 | 70/75 | Grik's bite left the Kobold Warrior (the one-print-melee-row rule); the Swallow row carried no provenance |
| 17-52-25 | 32/32 | 0 | 72/78 | the Pit Fiend's added rows varied with the donor's roll (21 vs 26); the Swallow stamp sat in a branch that didn't run |
| **18-06-23** | 31/32 + the stalled block rerun | **0** | 66/75 (88%) | the reference run |

The reference is written from the 18-06-23 run (Dame Oriel stalled twice at 180 s and saved on a 300 s retry; her sheet is the one in the run dir): 32 of 32 intact against itself, the four exact bodies to the digit. One engine change landed after that run — the working copy of a rules row now carries its provenance keys, so "swallows horses whole" reads as covered — and it touches no number; the reference stands.

**The nine drops in the reference run, by kind.** Flavor the sheet has no row for and should not invent: "batters shields apart" (the flail's Sap rider is that), "a knack for tripping bigger creatures", "shoots from the ridge", "understands nothing else" (the Languages line says it). Rows that answer the clause without a provenance stamp because the model renamed a chassis row for it: the night hag's "rides her victims' dreams" (Dream Ride), Thessaly's "curses thieves with boils" (Boil Hex), the scarecrow's "flinches from any torch" (its flinch row). The named gap: Grandmother Ash's crows. "Swallows horses whole" is fixed after the run. Coverage on this batch will sit near 90% by construction: the batch names flavor on purpose, to see that the engine does not invent rows for it.

**Gate at freeze:** 182 suites, 5,200 tests, build clean. Both pins hold on every run (Meshrin 7/7; Grandmother Ash 6/7). The canaries ran once in the middle of the round (`canaries-2026-10-12T17-48-40`): 10 of 10 intact, 0 fails — that pair is the one for the critic.

## After the critic's green light (2026-10-12): the trip clause, and the reference refrozen

The critic's one hold before the reference is read as the standard: Grik's "a knack for tripping bigger creatures" was filed among the flavor drops, and it is not flavor — "tripping" is the Trip rider's own verb, and block 8 exists to protect Trip without a style word. The feature table now keys on a trip clause (trip, trips, tripping; not tripwire): Trip Attack lands on the Prone-rider melee part or the first melee part, with the clause as provenance, pinned beside the Grik bite pin. Grik alone was rerun on that engine (`grik-2026-10-12T20-49-53`, 3/3: Sap on Spear, Slow on Sling, Trip Attack on Spear; the fallback also drew a Knee-Knocker prone save — two trips on one kobold, a redundancy to look at, not a numbers matter) and folded into the reference run as block 8; the run reads 0 fails of 32, coverage 67/75 (89%). The reference was refrozen from the completed run: 32 of 32 intact, Grik's numbers unchanged (the Trip save shares the sheet's DC 12).

The three provenance-less renamed rows (Dream Ride, Boil Hex, the scarecrow's flinch) stay on the close-out list as the critic placed them; the batch's coverage is an undercount in that direction.

Alongside the forty: `FEATURES-sheets-for-critic-2026-10-12.md` — Okhra, Dame Oriel, the Gullet-Wyrm and the hill giant archer from the reference run, each with its checker row, sheet and trace.
