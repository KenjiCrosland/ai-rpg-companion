# Plan: answer the critic's consolidated read (sweep forty + features thirty, 2026-10-18)

**Trigger.** The critic's read of `RELEASE-for-critic-{2024,2014}-2026-10-18-lurker.md`.
**Executor.** Opus, on this plan. Fable wrote it; the owner commits. Do not reopen the
owner's rulings: verb override (1-in-10 accepted), caster's mundane staff (parked),
bestial alignment above INT 8 (Neutral), 2014 scope (parked).

## Laws that bind every item (learned this sprint; each was missed at least twice)
1. **Meaning is a call field, never a word list** (CLAUDE.md). Code validates, keeps closed
   facts (print, weapon table, CR math), falls back only when the call fails.
2. **A field asked under a condition is accepted only under it** — receipts (`vetQuote`).
3. **One definition, every reader.** Count the readers before claiming a fix (`grep -n` the
   field/function; the checker is a reader too).
4. **A normalisation runs after everything that can change its input** (the dangling
   Multiattack, the Bloodied half, the inline stamp were all this).
5. **A gate may shape what the GM asked for, never remove it.**
6. **Verify the branch fires** (trace line present on the generated block), not that the
   edit parses. Two dead edits shipped three batches this sprint.
7. 2014 blocks: `actions`/`abilities`/`legendary_actions` keys, not `sections`.
8. Never edit `src/` while a smoke is live. Targeted batch per item; the forty only at the end.

## Cadence per item
land → `npx jest src/tools/statblock-generator src/util --maxWorkers=2 --silent` + `npm run build`
→ targeted batch (`SMOKE_TIMEOUT_MS=200000 node scripts/smoke-statblock.mjs <batch>`, background)
→ `node --import ./scripts/alias-loader.mjs scripts/check-run.mjs <run-dir>` → read the traces.
Every item lands with its **trio**: the fix, a control on the same path that must NOT move,
a regression pin (`reskin/__tests__/stage34-pins.spec.js`, "the forty's findings, pinned"
block; stub harness: `stub(cr, style, archetype)` + `answer.renames.<gated slot>` for
lurker/brute donors). A pin that fails goes to the owner, not under the rug.

## A. Before the critic forty, in this order

### A1. Borrow = print's body + the GM's additions, in EVERY seat
**Defect.** The action seat obeys "a print body takes only what the words ask"
(`generate.mjs` ~3770 `fallback stands down`, `fit declined`), the trait seat and the
fallback library do not; "stands down … nothing invented" is followed by a seed on four
sheets (Skeleton CR 6 Grinding Arc; Skeleton CR 2 Grave Retort + Bone Shard Burst; Ogre
barbarian kit + Backhand Retort; Champion Shattered Gristle; Vampire Binding Lash;
Gale-Wrack two invisibilities beside print's).
**Also.** The receipt validator accepted the *entire concept* as a quote (Ogre, Krennik
"riding a worg", Halric) while refusing Gromm's. One rule: a receipt is a span strictly
shorter than the concept, or the whole concept only when the concept is ≤ `soloLen` words.
**Where.** `generate.mjs`: the `printBody`/`pcPlain` branch; `evictForCap` tiers (filler
→ 0 on a print body); the trait-seat and library-fallback entry points; `vetQuote` /
`askOf` receipt check; the class kit adoption (`implied_class` validated against a class
word the GM typed — "an ogre with a greataxe" has none → no kit).
**Done when.** `skeleton with a greatsword` (CR 2, CR 6) and `an ogre with a greataxe`
ship print's rows + the GM's weapon and nothing else; trace shows the seed/trait/kit
declined with the receipt reason. Controls: `a skeleton who was a gladiator` keeps its
fighter kit (class word present); `Goblin Boss — riding a worg` keeps the seat.
Pins: the two skeletons, the ogre (row set == print ∪ {weapon}); the receipt rule.

### A2. Identity check on the finished sheet + STR floor by size
**Defect.** Three wrong-creature sheets, three mechanisms, all clean/soft: Trenchsong
Leviathan (phantom pick on a leviathan), Lashed Siege-Golem (canon matcher overrode the
hint's ✗ and installed Clay Golem), Thurivald (frost giant → skirmisher-8-hurler DEX 18).
Plus STR 14–18 on Huge/Gargantuan corporeal bodies (Gromm, Stone That Walks, Tunnel Troll).
**Mechanism.** (a) A closed fact: minimum STR by size from the corpus (`srd52-monsters.json`:
every corporeal Huge/Gargantuan is STR ≥ 20; measure it, store the floor per size, apply
in the array fit for non-incorporeal bodies). (b) One identity call on the FINISHED header
(type, size, STR, speed/movement, immunities, element, chassis family) asking "does this
header describe the GM's creature? quote any mismatch"; code validates quotes with
`vetQuote`; a confirmed mismatch re-routes (type/element guards already exist for the
EARLY call — owner: "fundamental facts are established early"; this is the late audit,
report-and-fix, not a tiebreaker). (c) Canon matcher: honour the hint call's explicit ✗
(`generate.mjs` printCanonHere / the hint_verdicts path) — see C1.
**Done when.** Trenchsong is a corporeal Gargantuan brute/lurker with STR ≥ 20 and no
hover/incorporeal; Siege-Golem has no Clay Golem rows/immunities; Thurivald is Huge,
STR ≥ 20, boulder 60/240 on a brute/defender. Controls: `a ghost of the drowned chapel`
stays phantom; `Stone Golem` exact keeps print's STR. Pins: the three sheets + the floor table.

### A3. The Name field is a closed fact
**Defect.** `provided` read by the call ("Dire Wolf", "Stone Golem", "Pit Fiend") but `not
provided` for "Purple Worm", "Air Elemental" (shipped as Gutforge, Chorus of the Drowned);
"the thing in the well" shipped as Well Drowned.
**Where.** The prompt field that asks whether a name was given (`format-2024/generate.mjs`
identity prompt / `StatblockGenerator.vue` option plumbing). Code already knows
`options.fixedName`; stop asking the call. A typed Name ships verbatim (`fixedName` law).
**Done when.** `Purple Worm — that swallowed a war-band's armoury` and `Air Elemental —
that carries stolen voices` ship named Purple Worm / Air Elemental; `the thing in the well`
ships with that name. Control: a blank Name still lets the call mint one. Pins: both.

### A4. Lacks: polarity, sweep order, never delete the answering row
**Defects.** Hydra "stumps smoke *instead of* regrowing" → regeneration organ injected
anyway ("lacks asked: nothing"). Vice-Rock Griever "never holds" → repair-authored Squeeze
grapples (sweep ran before repair). Champion "in a former life" read as a lack; the sweep
deleted Gladiator's Answer — the row bound to that clause.
**Mechanism.** (a) Polarity is a call field on the clauses prompt: `polarity: on|off|lack`
with the receipt (`instead of X` = lack, `unless X` = off-switch, `only under X` =
on-condition) — extend the existing `when/how_often/shape` schema, validated under its
condition (law 2). (b) The lacks sweep moves to run after EVERY row source including the
repair call and the print-canon organs (law 4) — one named pass, like
`dropDeadMultiattackCites`. (c) A lack never deletes a row whose `clause`/`bound` is the
lack's own clause; it shapes it (law 5).
**Done when.** Hydra ships no Regeneration and no head regrowth; Griever's Squeeze has no
grapple; Champion keeps Gladiator's Answer. Controls: `a troll that grows back unless the
blade was silvered` keeps Regeneration with the silver bane; `no magic at all` still removes
casting. Pins: the three + the polarity receipt.

### A5. Print's rows ride intact on a print body at print's CR
**Defects.** Dice re-priced (Vampire Bite 6→26, Wight Life Drain 6→14, Dire Wolf Bite
cut to 75%); chassis nova replaced print's breath (Adult Red 72 16d8, Ancient Gold 78
12d12); a print attack row dropped + Multiattack normalised (Goblin Boss Shortbow, Wight
bow, Druid Vine Staff); Ghost resistances overwritten by `resistances derived: B/P/S`
(`generate.mjs` ~4771) after print's list landed — ordering; Pit Fiend ships 3 legendary
actions + "Legendary Resistance (the chassis)" on a print body.
**Mechanism.** `nearPrintCr(cr, pc.cr) && (pc.exact || pc.borrowOnly)` ⇒ print's rows are
`print: true` and the final-price pass, the nova cap/replacement, the ranged-off rule, the
header-derive pass and the legendary swap all skip `e.print` rows and print's header lines
(law 3: enumerate every writer of `hp/ac/resistances/immunities/Legendary Actions/Multiattack`
and gate each on `print`). Resistances: the derive pass runs BEFORE print's stamp, or
yields to it (law 4).
**Done when.** Vampire/Wight/Dire Wolf keep print's dice; Red/Gold dragons keep print's
breath; Goblin Boss/Wight/Druid keep their ranged row and Multiattack; Drowned Keeper /
Sexton keep the Ghost's full resistance list; Pit Fiend has print's legendary kit. Controls:
`a skeleton with a greatsword` at CR 6 (NOT near print's CR) still re-scales. Pins: one per
writer.

### A6. Hold 3's stat half: DC coherence reads the casting stat
**Defect.** Ember Almoner: striker reseats on WIS (today's fix), then `spell DC coherence`
(`generate.mjs` ~3084) raises INT 13→18 "so DC 14 derives"; ships INT 18, Arcana +6, casting
Wisdom DC 13.
**Mechanism.** The coherence pass keys on `pcRoute.castStat ?? the Spellcasting row's own
ability` (one definition with the reseat), never the highest mental stat.
**Done when.** `a priest who heals the faithful…` ships WIS-keyed DC with INT at print's.
Control: Mage stays INT. Pin: the Priest.

### A7. The reader
NaN sustained (Hydra: `sustainedOf` must not emit NaN; a NaN read is a `fail`, never
`ok`); a two-row print Multiattack read as 1× (Gutforge); def ¼ at CR 5 with no note
(Drowned Keeper — surface it as `under` soft). Pins on `dmgRead` with crafted blocks.

### A8. Repair-authored rows
Unquantified heals (number + action + limit required: Heal the Faithful, Harbour-Mud
Rising, Gleeful Growth, Waxen Reknitting) → the repair prompt asks for the three and the
validator refuses a heal without them. Ilyn's at-will no-save stun in the Multiattack →
`ko-at-will`/`ko-ungated` is a FAIL (stage 1 ruling), not soft. Widow Alderkin's automatic
13 (3d8) Cold aura → priced by the reader (a passive damage aura is sustained damage).
Single-attack dice ceiling per weapon row (print adds attacks, never 7d6 on one sword): a
closed fact from the corpus (max dice per weapon row at CR) in `card-budgets`; over it →
split into a Multiattack. "Holy" as a row name after the element strip → the actuator
keeps a noun.

### A9. The edition gate reads the prose
Nine of 32 conversion calls failed (fetch/500); only attack rows converted; "edition: ok".
`gateEdition` (`checker.mjs` ~994) must FAIL on 2024 vocabulary in a 2014 block
(`Trigger:/Response:`, `Advantage`, `Stunned condition`, `At Will:`), and a failed
conversion call must mark the block (`generation.conversion: 'failed'`) so the gate reads it.
Then: retry the call once before shipping half-converted prose. Pins: a crafted 2014
block with 2024 prose → fail.

## B. Fidelity seams (fix after A; not blocking)
Dead preconditions (Prone with no Prone-maker; rows outside the Multiattack); duplicates
by mechanic not text (Gutforge Gullet Foundry vs Swallow; three invisibilities; two stuns)
and RESOLVE them; coverage misreports (7) — hand-check two blocks before the number gates;
Ilvareth (archmage with no ranged row: the "bolt"=launcher narrowing killed print's Arcane
Burst; "AC 17 (splint)" with no Gear; immunity line garbage); species senses (elf/dwarf
darkvision from the species kit); Mummy size parse ("Medium or Small" → keep Medium die);
Vashka's "lacquered plate" vs Guarded Stance AC; Sethra's Fist→Bite; Marrow Quill archer
seat stood down; Glacier Heart WIS-keyed cone; Meshrin 120 vs 119; Lich print rows softed
(**owner's call**); Vault-Ooze engulf vs grapple.

## C. For the 4b inventory (word rules to retire → call fields)
C1 canon matcher must honour the hint's ✗ and carry a receipt separating *is print's X*
from *resembles it* (misses stone/frost giant, cave troll; matches bog troll).
C2 "drowned/drowns" → phantom on homebrew bodies (verb table).
C3 nouns in the verb table ("knights", "sentinel") — data entries.
C4 "a weapon by name" narrowing ("bolt").
C5 lack reader: "instead of" missed, "former life" false positive (→ A4 polarity field).
C6 **Owner decides:** Great Weapon Master trait on heavy weapons, provenance "the GM's
clause", GM typed nothing (four sheets). Print gives no monster a PC feat.

## D. Sameness (stage 5 input)
heated-body ×11, Rampage ×7, exploiter ×6, own-turn-punisher ×6, rally ×5,
escalating-dread ×4 across 70. Assassinate "owed by print" still seats on lurkers (stage 5
item 6 open). Targets: no seed > 10%, seed share < 15%. Measure on `sweep` + `features`,
not classes-eight.

## E. Corrections to the case doc (make before the next package)
Brine-Witch's attack-stat = the parked item; Chorus two-novas is NOT fixed (needs the
owner's nova ruling: print's yields or the addition's). Concept share is empty on print
bodies (don't count print rows). Provenance must not credit idea words the GM didn't type.
Enrichment errors log into the next block's trace. 2014 printing is 2024 content in 2014
prose — parked, on record.

## Stop points
S1 after A1–A2 (identity + borrow): run `printplus` + `fourfix` + a new `identity.json`
(Trenchsong, Siege-Golem, Thurivald, Gromm, Stone That Walks + 3 controls). Zero wrong
creatures or stop.
S2 after A3–A6: `printfidelity` + `druid` + a `lacks.json` (Hydra, Griever, Champion, troll
bane, templar). Report the trio table.
S3 after A7–A9: 74-run checker A/B (`$S/runlist.txt`, `__checker_pre.mjs` method) — the
NaN/edition changes are gate changes.
S4 the critic forty (`sweep` + `features-2026-10-18`), **scored by hand** on identity (zero
wrong-creature) and print fidelity (print's rows intact at print's CR); the gate table is
the floor, not the readout. Then `review-batch` → `check-run` → `critic-files` with the
corrected case doc.

## Status — 2026-10-18, executor's log (Opus)

Landed and pinned (stage34-pins / route.spec / statblock-2024-flow), every item measured on a
targeted batch with a control before the pin:
- **A1** one stand-down for both fallback paths (the last-resort hash ignored the emptied shelf);
  a class receipt must point at a span (`vetQuote … pointAt`); the trait seat declines an
  idea-matched fit the way the action seat does. Skeleton/ogre ship print + the weapon only.
- **A2** STR floor by size from print (Huge ≥ 18, Gargantuan ≥ 25; Large supports none — the
  Tunnel Troll's 14 was never the defect); the attack re-derives with it (49/49 print big
  bodies derive attack from STR). The audit's `type_correction` (already asked) is now read
  by the reskin path. The route call answers `size`; phantom is vetoed above Medium (print
  has no incorporeal above Medium). `rejectedCanon` ✗ reaches the body matcher (4 readers).
  Owner's follow-up: the `gmType` regex I added was replaced by the identity call's
  `type_source: user|inferred`, threaded through the Vue; the pre-existing `userType` regex
  at the print-canon type site retired with it.
- **A3** Name box + description → the Name is the fact; the call's `provided_name` serves the
  one-box shape only. OPEN RULING: Name box alone with an article-led phrase ("the thing in
  the well") — a name, or a concept? The owner's own canary treats it as near-blank.
- **A4** a lack is vetted by `vetQuote` like every asked field (one shared word was passing);
  the borrow branch strips the regenerator organ as the exact branch does; the repair call
  is told the lacks; lacks are keyed `{quote, takes}` to a closed mechanic list and the sweep
  removes/shapes by mechanic (grapple, regeneration); "instead of" joined the lack grammar.
- **A5** print's dice, breath (incl. a same-named chassis nova), ranged row (added when the
  chassis has none), resistance line and absent legendary kit all stand on a print body at
  print's CR, exact or borrowed; the lint actuator never renames a print row.
- **A6** the Spellcasting organ names `pcRoute.castStat` (one definition with the reseat).
- **A7** no NaN count; two parse sites. **A8** KO idiom in both editions, and a NO-SAVE KO rider on an attack row the Multiattack repeats is ungated (a one-turn cap caps nothing twice a round); unquantified heals
  refused by the author validator; passive damage auras priced as sustained; an element strip
  that leaves one word takes an honest noun. **A9** a failed 2014 conversion is marked and the
  edition gate fails it; leaked 2024 vocabulary (Trigger:/Response:/Advantage/At Will:/"has the
  X condition") fails.
- NOT done: A8-iv single-row dice ceiling (print: ≤3 dice/weapon row CR 1-4, ≤4 CR 5-10 —
  the fix is to split into a Multiattack in the final-price pass; deferred as the riskiest).

Residuals batch (a-residuals, 10): the Adult Red breathes print's 59 (17d6); the Wight keeps its Necrotic Bow; the Hydra's Multiple Heads loses only its regrowth; the Priest casts Wisdom on WIS 18; Ilyn's at-will stun now FAILS ko-ungated in 2014 prose (the gate the critic asked for); the Griever's dependent "While Grappled" fragment is stripped with the grapple (a5d); the coil horror keeps the grapple it asked for.

Findings for the owner: (1) FOUR generations timed out at 200 s on print-body-plus-addition
prompts (Air Elemental ×2, Vampire ×1, troll bane ×1) — reproducible on the Air Elemental; unexplained, not touched.
(2) C6 Great Weapon Master still ships on heavy weapons (owner's call). (3) Two novas on a
HOMEBREW borrow where the addition earns a differently-named nova (Chorus) still needs the
owner's ruling; on a print body at print's CR print's breath is now the one breath.

### S4 (critic forty + feature thirty), first run, 2026-10-18 evening
Forty: 34/40 generated (6 timed out at 200 s — Dire Wolf, Air Elemental, Siege-Golem, Stone
Golem, Archlich, skeleton CR 6; the engine itself returns in ≤120 ms on each in the stub
harness, so the timeouts are the live calls). Checker on the 34: 15 clean / 14 soft / 5 FAIL
blocks. Hand score: ZERO wrong-creature headers (Trench Leviathan is a corporeal Gargantuan,
STR 25). FAILs: 2024 vocabulary left by the CONVERSION call in three 2014 blocks (the A9 gate
catching it); the STR floor not re-deriving the STR save/Athletics (fixed: a2a5e); two borrows
at print's CR whose melee dice re-priced (the melee/ranged print-dice writers keyed on
`exact` — fixed: a2a5e). Feature thirty: 27/30 generated, 14 clean / 8 soft / 5 FAIL blocks;
print's MELEE row does not land when the chassis has none to rename (the Druid's Vine Staff —
the ranged half of this landed in A5, the melee half is next); a duplicate-entry and a gate-fit
(existing classes); "eyeless" not honoured once (under investigation).

### Melee half of A5 landed, 2026-10-18 late
Print's MELEE row now lands when the chassis has none to rename (the ranged half's mirror):
`rowOf` carries print's text and parsed bonus; at print's CR on an exact or borrow body, when the
rename pass's own melee-row reading (`meleeRows`) is empty and print has a non-hybrid melee row,
print's row ships verbatim with the bonus and DCs shifted by the PB difference. The first cut
counted the caster's hybrid row as a melee row and never fired — the pin caught it; the add now
uses the rename pass's reading (one definition). Pins: Druid exact CR 2 ships Vine Staff with
print's dice; a Huge body's STR save and Athletics follow the floored score. Reskin suites
28/28, 1390 passed. Targeted batch `meleeadd` (Druid, Purple Worm, Pit Fiend, Huge ogre brute,
Gargantuan 2014 fell, 2014 cleric conversion) — results below when the run completes.

### Two findings from the `meleeadd` batch, 2026-10-18 late
Batch 6/6 generated, gate 107 suites + build green. Verified by hand: the Druid's Vine Staff
lands verbatim and the Multiattack cites it; the Purple Worm (Bite 22 (3d8 + 9), Tail Stinger
+ 35 (10d6)) and the Pit Fiend (Bite 18 (3d6 + 8), Claw 26 (4d8 + 8), Mace 22 (4d6 + 8) + 21
(6d6)) keep print's dice at print's CR; the Huge ogre (STR 20, save +8, Athletics +8) and the
Gargantuan 2014 fell (STR 25, save +12, Athletics +12) carry the floor through saves and skills.
1. **Every failed 2014 conversion had an empty section.** The conversion prompt filters empty
   sections out of its payload; the validator then demanded the key back anyway, so a block
   with `Reactions: []` or `Traits: []` failed all three tries and shipped 2024 phrasing — the
   A9 gate caught it, but the cause was ours. Five of five failures in the forty + this batch
   carried an empty section; none of fifteen successes did. Fixed: the validator skips empty
   sections (the translation validator already did). Pinned in `engine-2014.spec.js`; the
   five re-run as batch `convfix`.
2. **`lack-honored` on "an eyeless hunter"** is a word match: the checker looked for the
   clause's words on the sheet, found "eyeless" in its own trait and "hunter" in its name, and
   called the lack broken though senses read "blind beyond this radius". The engine's lacks call
   already returns `takes: sight`; the checker now judges a keyed lack by its mechanic on the
   sheet (staged, applied after the live batch).
   Result: batch `convfix` (the four forty failures + the cleric; the Owlbear timed out under
   a concurrent build and re-rolls in the forty) — 4/4 conversions landed, zero 2024 vocabulary
   in the 2014 sheets. The keyed-lack checker patch is applied and pinned (eyeless + blindsight
   honoured; darkvision breaks it; grapple reads the imposed condition in either idiom);
   reskin suites 28/28, 1393 passed. Next: gate + build, then the S4 forty alone on the box.

### The "timeouts" were a throw, 2026-10-18 late
The Owlbear's convfix trace ended `!! Statblock generation failed: gmAsked is not defined`.
A1c's trait-seat gate read `gmAsked`/`askWhy` from inside the wildcard block where the action
seat defines them; the trait seat sits below that block, so every PRINT BODY whose signature
call returned a TRAIT idea threw a ReferenceError — the generation never saved, and the smoke
waited out its clock. That is the forty's Dire Wolf, Air Elemental, Stone Golem, Archlich and
skeleton-6, and the convfix Owlbear: six "live-call timeouts" that were one scoping bug. The
pins never reached the line because none put a surviving trait fit on a print body (`&&`
short-circuits before the call). Fixed: both helpers hoisted to the seats' shared scope.
Pinned: an Owlbear that tracks its quarry by scent, trait idea → faultless-tracker fit,
ships the trait and throws nothing. The smoke now fails a block the instant the page logs
`Statblock generation failed` instead of waiting out the timeout (`GENERATION THREW — …`).
Gate + build + the S4 forty are chained in one background job; the forty runs alone.

### S4 forty, second run (sweep-2026-10-18T23-43-43), 2026-10-18 night
39/40 generated in one pass (every former "timeout" lands in ~20 s); the one miss logged
nothing at all (the page never started — a harness miss, re-rolled clean in 24 s; the smoke now
re-queues such a block once and records the page state at timeout). Checker: 18 clean / 16
soft / 5 FAIL. Hand score: ZERO wrong-creature headers; every Huge/Gargantuan corporeal body
at or above print's floor; no incorporeal above Medium; print rows intact on every exact body
and every borrow at print's CR (the two MISSING rows — Templar/Priest at CR 6 vs 2, Sellsword/
Veteran at 5 vs 3 — are borrows away from print's CR, where print's rows are not owed).
The five FAILs, and what each was:
1. **Quarried Exile (2014, Huge)** — Boulder +7 off the pre-floor STR 16: the floor re-stamped
   MELEE rows only; a giant's thrown rock is a STR-keyed RANGED row. Fixed (a DEX row whose mod
   equals the old STR mod is left alone). Also "understands no Common" beside Languages: Giant
   read as broken — my keyed `speech` test asked for no voice at all. Fixed: speech/hearing
   fall through to the word rule. Both pinned.
2. **Mire Hagsight** — "Rusted Blade", declared a shortsword by the call, rolled +7 off CHA.
   This is the PARKED class (owner: Magda's staff; "wants its own measured landing") and the
   B-list's Brine-Witch. I built a narrow re-key before recognising it, then REVERTED it to
   honour the parking — the fix is on record here (a declared shop weapon on a caster's melee
   row whose bonus matches a mental stat and no physical one re-keys to the better of STR/DEX,
   flat damage following; print's Priest Mace beside its Radiant Flame is the precedent) and
   lands when the owner calls it. Not pinned; the FAIL class stays open.
3. **Ossein Heliarch (Lich borrow, 2014)** — print's own Paralyzing Touch failed `ko-ungated`
   as a Multiattack-repeated no-save KO. Print does exactly this at CR 21, so print overrules
   the critic's A8 rule for print's composition: the melee rename now sets `print: true` as the
   ranged rename already did, and the gates skip it (one flag, every reader). Homebrew rows
   keep the A8 rule. Pinned (Lich exact, CR 21: Paralyzing Touch flagged, no ko-ungated).
4. **Adult Red Dragon (2014)** — "blind in one eye" keyed `takes: sight` by the lacks call;
   the checker then (rightly, for a sight key) saw darkvision and called it broken. The key
   was wrong: a partial loss is `part`. Prompt tweak, not a word rule: the lacks prompt now
   says a partial loss keeps the sense. Pinned on the prompt text.
5. **Air Elemental** — two Recharge novas (print's Whirlwind + the addition's Shriek). The open
   owner ruling (two novas on a homebrew borrow); untouched.
Also for the owner: **"Swarm of Knell of the Dyings"** — the swarm stamp pluralises the last
word of the model's name. Proposed (a call field, not a rule): the identity call returns
`swarm_of: "<plural noun phrase>"` ("Funeral Bells") when the type is a swarm, and the stamp
reads it; the pluraliser stays as the fallback. Not built — needs the owner's go.
   **fortyfix re-run (6 blocks, 2026-10-19 00:43): 0 FAILs of 6.** Exile's Boulder +8 / 6d6 + 4
   on STR 18; the archlich's Paralyzing Touch (print's) passes the gates on the 2014 sheet; the
   dragon's "blind in one eye" now keys `part`; the swarm this time named a countable noun
   ("Swarm of Foundry Grave Peals") — the garble case stays a proposal. The marsh witch drew a
   "Curse-Peg" (no shop weapon declared), so the parked class did not recur in this draw. Gate 107 suites / 3503,
   build green. Feature thirty re-running now.

### S4 final numbers, 2026-10-19 ~01:20
- **Forty** (`sweep-2026-10-18T23-43-43`): 39/40 + 1 harness re-roll clean. Checker on the 39:
  19 clean / 15 soft / 5 FAIL at generation time; the five are itemised above — three engine
  fixes verified on the `fortyfix` re-run (0/6 FAIL), one prompt fix verified there, one open
  (two novas), one the parked class. Re-checked with tonight's checker fixes applied, the
  checker-side readings (speech lack) clear; the engine-side ones need the regeneration, which
  fortyfix is.
- **Feature thirty** (`features-2026-10-18-2026-10-19T00-46-58` 25 blocks + `features-tail-
  2026-10-19T01-10-38` 5): 30/30 generated (one 411 s live stall mid-run, re-run clean; the
  smoke itself died on the entry after it — "#monsterName not visible" — and now retries the
  page once). Checker: 18 clean / 12 soft / 0 FAIL after the one checker fix (a type word
  inside the creature's own name — "Shroud of the Cold Lamp" on the Cold Lamp Widow — is its
  name, not a damage claim; pinned both ways).
- Hand score across all 70: zero wrong-creature headers; every Huge/Gargantuan corporeal body
  at or above print's floor; no incorporeal body above Medium; print's rows intact on every
  exact body and every borrow at print's CR.
- Critic package: `scripts/smoke-evidence/RELEASE-for-critic-2024-2026-10-19-lurker.md` and
  `RELEASE-for-critic-2014-2026-10-19-lurker.md`, built from the corrected case doc and the
  three REVIEW files.
- The owner commits. Open for the owner: two novas on a homebrew borrow; the parked caster-
  weapon class (fix written up, reverted); the swarm-name call field (proposal).
