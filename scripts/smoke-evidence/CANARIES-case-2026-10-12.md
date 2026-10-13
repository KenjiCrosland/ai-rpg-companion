# Regression canaries — ten fixed blocks that run with every feature-branch landing — 2026-10-12

Owner's rule (2026-10-12): the forty waits for the critic's green light on a feature; in the meantime a few regression canaries run with every landing so the numbers stay intact. These are the ten, drawn from the old form-ten, critic-ten and day-one smoke batches, one roll each, with a numbers reference the script compares against.

## The batch (`scripts/smoke-batches/canaries.json`)

| # | shape | prompt | mode |
|---|---|---|---|
| 1 | single Name, print, 2024 | Name "Owlbear", CR 3 | exact |
| 2 | single Name, not print, CR from the words | Name "Headless Horseman", CR auto | band |
| 3 | description only, print head above its CR | "a wolf", CR 5 | band |
| 4 | print Name + a language addition | Name "Stone Golem" — "Output statblock in German", CR auto | exact |
| 5 | print Name + a claim | Name "Kobold" — "Can turn invisible once per day", CR 1/4 | band (a borrow: the chassis prices it) |
| 6 | print Name + a seat verb, 2014 | Name "Goblin Boss" — "riding a worg", 2014 | band (a borrow) |
| 7 | print head in a one-liner | "a troll that guards the bridge and collects a toll", CR 5 | band (a borrow) |
| 8 | description with a CR in the words | "big ogre with a club, cr 5" | band |
| 9 | print, 2014 | "a vampire spawn", CR 5, 2014 | exact |
| 10 | single Name, lowercase, not print | Name "the thing in the well", CR 5 | band |

## The check (`node scripts/canaries.mjs <run-dir>`)

Per block: AC, HP, every attack's bonus and average, every DC, the Multiattack count, against `scripts/smoke-evidence/canaries-reference.json`. **Exact** blocks (print bodies) must match to the digit. **Band** blocks hold AC ±1, HP ±15%, bonuses ±1, damage ±25%, DCs ±1; a band that moves together with a donor flip is reported as the route's roll, not a regression. The reference is re-baselined with `--write-reference` only at a release, in the same commit as the change that moved a number.

## What the first run caught (both fixed and gated before the reference was written)

- Print's Owlbear shipped with no Multiattack: the chassis at CR 3 carried no Multiattack row and the print rule only replaced an existing one. On an exact body print's Multiattack is now added when the chassis has none ("The owlbear makes two Rend attacks").
- The checker failed print's own Vampire Spawn: Spider Climb with no Climb speed. That is print's text at print's speed; a print-flagged Spider Climb is exempt from the predicate.

## The reference run (`canaries-2026-10-12T16-10-32`): 10 of 10 saved, 0 fails, 10 of 10 intact

| # | canary | mode | AC | HP | attacks (bonus/avg) | DCs | Multiattack | verdict |
|---|---|---|---|---|---|---|---|---|
| 1 | single Name, print, 2024 | exact | 13 | 59 | Rend +7/14 |  | 2 | intact |
| 2 | single Name, not print, CR from the words | band | 16 | 78 | Saber +6/7 | 14 | 2 | intact |
| 3 | description only, print head scaled above its CR | band | 16 | 88 | Bite +6/6 |  | 2 | intact |
| 4 | print Name + a language addition | exact | 18 | 220 |  |  | 0 | intact |
| 5 | print Name + a claim (the Vanish seed) (a borrow: the chassis prices it) | band | 14 | 7 | Dagger +4/6, Sling +4/6 |  | 0 | intact |
| 6 | print Name + a seat verb, 2014 (a borrow: the chassis prices it) | band | 17 | 21 | Scimitar +4/6, Shortbow +4/6 | 12 | 2 | intact |
| 7 | print head in a one-liner (a borrow: the chassis prices it) | band | 15 | 94 | Rend +7/18 |  | 2 | intact |
| 8 | description with a CR in the words | band | 14 | 102 | Club +6/12, Slam +6/12, Boulder +6/16 |  | 2 | intact |
| 9 | print, 2014 | exact | 16 | 90 | Claw +6/8 | 14 | 2 | intact |
| 10 | single Name, lowercase, not print | band | 20 | 90 | Slam +6/12 | 14 | 2 | intact |

**Canaries:** 10 of 10 intact against the reference from `canaries-2026-10-12T16-10-32`.

Gate: 181 suites, 5,184 tests, build clean. The blocks follow, each with its checker row and trace.

## The critic's read of the reference (2026-10-12), and the fix round before it is trusted

The critic held the reference for two things and named five smaller ones. All landed in the engine, each with a pin in `reskin/__tests__/canaries.spec.js`:

1. **Print borrows above print's CR now re-solve.** An exact print body copies print's dice only *at* print's CR (`nearPrintCr`); above it the chassis's solved dice stand with print's type and rider. The CR 5 wolf bites for the skirmisher's dice, not the Wolf's 1d6. Print's array is **raise-only** above its CR: the Ogre keeps STR 19 over the card's +6 and the sheet rolls +7 with every flat following; a user's part row now keeps the slot's *whole* damage (the brute's energy clause folds into the weapon's dice instead of leaving 7 a hit on the floor).
2. **Exact canaries check every attack.** An exact body at print's CR carries print's own ranged row verbatim — bonus, dice, range — so the Stone Golem's Force Bolt is +9, 22 (4d10) at 120 ft., not the chassis's 7d6 + 6 at 60/240. For the German golem the checker and the canary read the **English twin** the translation call already stores on the block (`english`): the engine builds and checks in English, the translation holds the numbers, and no parser learns German (owner: "doing extra work for other languages is not worth it — unless we check before a translation call"). "Groß Konstrukt" stays as the translation wrote it, by the same rule.
3. **The Name field's short form:** a person speaks by the given name ("Gormak Skullsunder" → Gormak, "Meshrin" → Meshrin), an honorific keeps its name ("Sir Reginald Pemberton-Hughes" → Sir Reginald), an epithet heads on its noun ("Headless Horseman" → the horseman). No more "Headless makes two Saber attacks", no more "Sir".
4. **A seed the user's words drew carries them as provenance** (`boundKeys` = the keys the words matched): the Kobold's Vanish covers "Can turn invisible once per day".
5. **A row renamed Slam deals Bludgeoning** (print's Javelin on the Ogre).
6. **Print's Gear line names the 2014 armor**: the Goblin Boss prints "17 (chain shirt, shield)", not the kit table's "splint". The 2024 card shows AC alone, as print does.

Not fixed, by the owner's call: German grammar in the translated block.

## The reference, rewritten (`canaries-2026-10-12T16-43-57`): 10 of 10 saved, 0 fails, coverage 12/12 (100%), concept 88%

(The first read of this run said 11/12: the ogre's "cr 5" was the dropped clause — two letters and a digit, nothing a row could carry. The checker now reads a CR directive as honored when the sheet's CR matches; pinned.)

Against the *old* reference the fix round moved exactly the three blocks it meant to, and nothing else:

| # | canary | mode | AC | HP | attacks (bonus/avg) | DCs | Multiattack | verdict against the old reference |
|---|---|---|---|---|---|---|---|---|
| 1 | single Name, print, 2024 | exact | 13 | 59 | Rend +7/14 |  | 2 | intact |
| 2 | single Name, not print, CR from the words | band | 16 | 78 | Saber +6/8 | 14 | 2 | intact ("The horseman makes two Saber attacks") |
| 3 | description only, print head scaled above its CR | band | 16 | 88 | Bite +6/17 |  | 2 | **moved**: Bite 6→17 — two Bites, 34 a round against a CR 5 card of 40 |
| 4 | print Name + a language addition | exact | 18 | 220 | Slam +10/15, Force Bolt +9/22 | 17 | 2 | **moved**: the row was blank; it now reads every attack off the English twin, and the Force Bolt is print's +9, 22 (4d10) at 120 ft. |
| 5 | print Name + a claim (the Vanish seed) | band | 14 | 7 | Dagger +4/6, Sling +4/6 |  | 0 | intact; coverage 1/1 (the seed carries "invisible") |
| 6 | print Name + a seat verb, 2014 | band | 17 | 21 | Scimitar +4/6, Shortbow +4/6 | 12 | 2 | intact; the 2014 sheet prints "17 (chain shirt, shield)" |
| 7 | print head in a one-liner | band | 15 | 94 | Rend +7/18 |  | 2 | intact |
| 8 | description with a CR in the words | band | 14 | 102 | Club +7/22, Slam +7/22, Hurlstone +7/17 |  | 2 | **moved**: STR 19 stands, +7; Club 12→22, Slam 12→22 (Bludgeoning), 44 a round against 40 |
| 9 | print, 2014 | exact | 16 | 90 | Claw +6/8 | 14 | 2 | intact |
| 10 | single Name, lowercase, not print | band | 20 | 93 | Spur +6/12 | 14 | 2 | intact |

The reference is written from this run; 10 of 10 intact against itself. One soft in the run: the well-thing's "Mirrored Riposte" pays off Charmed with no producer on the sheet (a library seed past the imposed guard — not a numbers matter; on the close-out list). Gate: 182 suites, 5,199 tests (8 new pins in `canaries.spec.js`; the form-ten Stone Golem pin now asserts print's verbatim Force Bolt), build clean.

## The sprint batch's fix round, and the canaries after it (`canaries-2026-10-12T17-48-40`): 10 of 10 intact, 0 fails

Between the reference run and this one, the sprint feature batch (`FEATURES-case-2026-10.md`, 32 blocks) ran twice and its first read drove a second engine round, all pinned in `canaries.spec.js`: the part reader learned weapons inside a header clause, two weapons in one clause, a descriptive clause past a wield cue, plurals, and kick/headbutt/fingers; a part takes a slot of its own mode (a crossbow on the melee slot had turned the only melee row ranged); a part evicts a chassis row the model named the same; a lack of a whole attack mode drops that mode's rows; honorifics hold on every path ("Sir Lorn", never "the sir") and a role-noun epithet heads on its noun ("the marauder"); template rows carry the user's words as provenance; a riposte asked for by name lands beside a named style; the checker reads print's Evasion idiom and "that creature" after a named point. Gate: 182 suites, 5,199 tests, build clean.

**The canaries held through all of it.** Against the reference written at 16:43: every exact block to the digit (Owlbear, Steingolem with its English twin, Vampire Spawn), every band block inside its band, every Multiattack count the same, every DC the same. The one movement is block 10, the thing in the well, whose route rolled a different donor (lurker-5-trap → brute-5-grappler): AC 20 → 14 and its one attack 12 → 17 — reported by the script as the route's roll, not a regression, which is exactly the case the band mode exists for. Checker: 0 fails of 10, coverage 11/12 (the troll's "collects a fee" — the model paraphrased "toll" and the extraction's word-overlap kept it; a wording item, not a sheet item), concept share 90%.

| # | canary | mode | AC | HP | attacks (bonus/avg) | DCs | Multiattack | verdict |
|---|---|---|---|---|---|---|---|---|
| 1 | single Name, print, 2024 | exact | 13 | 59 | Rend +7/14 |  | 2 | intact |
| 2 | single Name, not print, CR from the words | band | 16 | 78 | Saber +6/7 | 14 | 2 | intact ("The horseman makes two Saber attacks") |
| 3 | description only, print head above its CR | band | 16 | 88 | Bite +6/17 |  | 2 | intact |
| 4 | print Name + a language addition | exact | 18 | 220 | Slam +10/15, Force Bolt +9/22 | 17 | 2 | intact |
| 5 | print Name + a claim (the Vanish seed) | band | 14 | 7 | Dagger +4/6, Sling +4/6 |  | 0 | intact |
| 6 | print Name + a seat verb, 2014 | band | 17 | 21 | Scimitar +4/6, Shortbow +4/6 | 12 | 2 | intact |
| 7 | print head in a one-liner | band | 15 | 94 | Rend +7/18 |  | 2 | intact |
| 8 | description with a CR in the words | band | 14 | 102 | Club +7/22, Slam +7/22, Boulder +7/17 |  | 2 | intact |
| 9 | print, 2014 | exact | 16 | 90 | Claw +6/8 | 14 | 2 | intact |
| 10 | single Name, lowercase, not print | band | 14 | 102 | Hooklimb +6/17 | 14 | 2 | band moved with the donor (lurker-5-trap → brute-5-grappler, the route's roll) |

**Canaries:** 10 of 10 intact against the reference from `canaries-2026-10-12T16-43-57`. The reference stands.
