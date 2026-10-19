# Case: the lurker is underpowered — price the trade, not the gate (2026-10-18)

**Owner's ask.** "Reference print and determine just what multipliers are needed for
incorporeality or big novas/ambushes, go online for suggestions, adapt the CR formula.
These adaptations apply to any creature with lurker-like abilities. Do we dampen
attack rolls or HP if an ability is overpowered? Lurker is actually underpowered and
we need to make it in band."

## What print does (SRD 5.2, 329 blocks; by the reader's own DMG method)

| feature on the sheet | n | defensive read vs printed CR, before | after pricing | how print pays |
|---|---|---|---|---|
| no defensive trait (baseline) | 159 | −0.60 | — | — |
| Nimble Escape / hide bonus action | 3 (CR≥1) | −0.96 | **+0.17** at +4 AC | thin HP, higher AC, stealth |
| Invisibility (incl. at-will spell) | 14 | −1.27 | **−0.32** at +2 AC | thin HP, the invisibility |
| Magic Resistance (already priced) | 33 | +0.16 | — | — |
| Incorporeal Movement | 4 | −1.19 | −1.19 (no price) | **resistances** — Wraith 67 raw / 100 effective, Ghost 45 / 90 |

The DMG 2014 Monster Features table (p.280–281; *from memory — not retrievable online
in three attempts, the owner should check the book*): Nimble Escape +4 effective AC
(and +4 attack, assuming a hide every round), Shadow Stealth +4 AC, Invisibility and
Superior Invisibility +2 AC, Magic Resistance +2 AC, Incorporeal Movement no adjustment,
Ambusher +1 attack, Avoidance +1 AC, Legendary Resistance +10/20/30 HP per use by CR.
Print agrees on the defensive side: the +4/+2 prices move print's own stealth creatures
from a step under their CR to within the reader's baseline. The Nimble Escape attack
half is NOT applied — print's Nimble Escape creatures already read +1.00 over on
offense without it. Incorporeal takes nothing — its payment (resistances) is already
priced by `effectiveHp`.

**How print pays for a trade.** 223 print blocks at CR 1+ with attacks: **211 (95%) sit
under the DMG table's HP; 2 (1%) sit under its attack bonus, none by 2+.** Print buys
every ability with Hit Points, never with the attack roll.

## What landed

1. **Reader (`checker.mjs` `dmgRead`)** — one stealth rung (+2 steps ≈ +4 AC) for
   Nimble Escape / Shadow Stealth / a Bonus Action that takes the Hide action; one
   invisibility rung (+1 ≈ +2 AC) read from row TEXT (print's at-will invisibility is
   a spell-list entry), recharge rows excluded (a nova, priced on offense). One rung
   per creature, not per phrasing — 2024's Nimble Escape *is* the hide bonus action;
   two rungs read print +2.00 over. Applies to any sheet: a non-lurker with a hide
   bonus action is priced the same way.
2. **lurker-5 donor** — `hp_scale 0.75 → 0.90`, sheet HP 65 → 78 (12d8 + 24). At 0.75
   the sheet shipped under print's effective CR 5 floor (75, n=52) and under every
   print CR 5 creature (thinnest unmitigated: Xorn 84 / Giant Crocodile 85). The
   donor carried the lurker's thin HP with none of the lurker's payment.
   lurker-5-phantom stays at 0.75: its `defense_suite` resistances read 102 effective.
3. **No gate change.** The `under` gate already judges on the DMG read (one axis under
   is a fail only when the read sits more than one under the CR); the reader was
   blind to stealth, so lurkers read a step low and fell through to fail.

## Proof

- Print before/after: mean read gap −0.32 → −0.28; |gap| ≥ 2 unchanged at 27; 25
  creatures moved, each by ≤ 1 step, none crossed a band.
- 74 pinned runs, 594 blocks: fails 157 → 135. Every change: 22 lurker-5 `under`
  fail → soft; 5 `band` softs cleared; 7 new `band` softs (imp rogues with at-will
  Invisibility now read +1.5, as print's Imp/Quasit move +0.2–0.6). No new fails.
- Gate run (`gate-2026-10-17T21-32-35`): Meltmoor `under` FAIL → soft; 3 FAILs → 2
  (attack-stat ×1, Shove Through name-mechanic — both pre-existing, unrelated).
- Lurker donors by the live read at their own CR: lurker-5 reads 4.5 (was 3);
  lurker-2 1.25 at CR 2, lurker-8 7 at CR 8, lurker-17 17 at CR 17.

## The owner's question: dampen attack rolls or HP?

**HP.** The DMG method averages a defensive CR and an offensive CR; an overpowered
ability raises the offensive half, and print restores the average by pulling effective
HP down (or AC, which is the same axis) — 95% of print sits under the table's HP, 1%
under its attack bonus. An attack bonus below band makes a creature miss, which feels
broken at the table; thin HP makes it die fast, which feels like a glass cannon. Print
chooses the glass cannon every time. The engine's existing levers agree: `hp_scale` on
the donor and the AC rungs in the read; the attack bonus is the card's and never moves.
The corollary for an UNDERpowered ability (this case): raise HP toward print's floor,
never the attack.

## Ruling taken (owner, 2026-10-18: yes)

`donors.spec.js` "lurker shape" asserted `hp_scale <= 0.8` for non-trap lurkers; now `< 1`. The pin's stated law is "defenses UNDER the card"; 0.8 was the
corpus-sweep number. At CR 5 the number is incompatible with print's floor (0.8 × 90 →
11d8 + 22 = 71 < 75). Changed to `< 1` — the law, as this file already did once for the
phantom deep-scale pin, 2026-10-15. Suite green. Also noted, not changed: `donor-hp-floor.spec.js`
measures RAW HP against print's raw minimum (Wraith 67), while the checker's `under`
measures EFFECTIVE HP against print's effective minimum (75) — two floors; the pin
passed lurker-5 at 68 while the checker failed every sheet. Aligning the pin on the
checker's `corpusAt(cr).hp[0]` would make it catch this class of defect.

## Left as found

- lurker-17 / lurker-17-phantom / defender-17 at 184 HP under a n=9 floor of 199 (the
  Sphinx of Valor alone); the `under` gate reads them soft (17 at CR 17). Not touched —
  nine blocks is under the pin's own 10-block threshold.
- Spell DC keyed to `striker_stat` rather than the body's casting stat (hold 3 stat half).

## Smoke — `lurker` (12 blocks, `smoke-out/lurker-2026-10-18T13-24-55`)

11 clean/soft, 1 FAIL: `alignment-fit` on a drake the model wrote Unaligned at INT 12
speaking Draconic — a content catch by the reader, unrelated to this work. Softs:
lurker-17-phantom `under` (180 eff vs the n=9 floor 199; read 16.5 at CR 17) and
`hot-offense`; lurker-5-phantom `aim-hp` at CR 6. Gate: 3456/3483 (the one red is the
pin above), build clean.

**Routing, not pricing, decided which donor each prompt met.** Five of the twelve
lurker-shaped prompts landed on `skirmisher-3-skulker`, so lurker-5 itself was not
exercised by this smoke. Probed the route call 5× each:

| prompt | the call's pick | the engine's line |
|---|---|---|
| eyeless hunter that tracks by scent (CR 5) | lurker ×4, skirmisher ×1 | as the call — the smoke drew the 1-in-5 |
| ninja … strikes unseen (CR 5) | skirmisher-skulker ×5 | as the call (the Assassin is its exemplar) |
| shadow-stalking assassin (CR 8) | skirmisher-skulker ×5 | as the call |
| unseen stalker of living wind, invisible (CR 6) | **lurker ×5** | **skirmisher-skulker ×4** — "the concept's VERB outranks the noun (key \"unseen\", class verb)" |

The last row is the inventoried word rule (`plans/stage4b-inventory.md` §A row 27,
`route.mjs` "the VERB outranks the noun"): the call names the line AND confirms the
cue, and the table resolves the two in favour of the key. Reported, not patched —
the owner's standing rule is that this is a mechanism swap for a ruling, and the
engine is not to be built around one creature (owner, 2026-10-18).

## Follow-on, same day: the gate's last two FAILs and the floor pin

- **`attack-stat` (Dusk Lamplighter, "Snuffer-Pole")** — the weapons call answered
  `none` for the coined row, exactly as the prompt asks for a thing no shop sells;
  the engine read `none` as *no answer* and fell back to the name, stamping a
  quarterstaff off "pole", and the checker then demanded Strength of a DEX row.
  Now `none` resolves the row to no weapon (`e.weapon = null`), unless the GM's own
  words name the weapon the name reads (then the weapon is the ask). The checker
  reads a null stamp as the call's answer and re-reads the name only for a row that
  was never resolved. Smoke: both widow draws ship `weapon: null`, no fail; the
  sellsword control still stamps shortsword and handaxe.
- **`name-mechanic` (Walking Range, "Shove Through")** — the movement claim in
  `NAME_CLAIMS_MECHANIC` had no `HONEST_NOUN` counterpart, so the rename pass found
  no noun to offer and shipped the lie. Added Stride/Rush/Surge for a row that moves.
  The smoke then exposed the two halves of that file disagreeing: Prone earns "Shove"
  in the honest-noun table while the claims table said "Shove" promises a push.
  2024's Shove does either; the claim now accepts `pushed` or `Prone`. Re-check: 0.
- **`donor-hp-floor.spec.js`** — now reads the checker's own floor (`corpusAt(cr).hp[0]`,
  effective HP, the gate's ×0.95), so the pin and the gate are one definition. It
  caught nothing new once lurker-5 moved (caster-12 at 166 and lurker-8-trap at 90
  sit inside the margin).

## Not done, scoped

- **Verb override vs the call** (`route.mjs` "the VERB outranks the noun"): 513 of
  5,509 saved blocks (9.3%). Stage 4b step 3 tried "a verified quote on the call's
  pick refuses the override" and broke six pins; cue verdicts were the landing. The
  invisible-stalker case shows the gap that remains — the call picks the line AND
  confirms the cue, and the table still moves it. Owner's call, not an exception
  to code around.
- **Verb override** — owner's ruling (2026-10-18): "the price we pay for using the AI
  over regex, but the regex is a larger price of unknown unknowns … 1 in 10 is not a
  problem for this kind of product. It needs to be consistently good, not perfect."
  Sleeps unless a run turns up a real problem.

## Spell DC vs body stat — landed (owner: "seems like an easy fix")

Root cause was order, not the stat table: `scaleDonor` seats the caster's striker
by the one striker rule (unarmed caster → highest mental stat) on the DONOR's array
(caster-6 is INT 17 → INT); the print-canon pass then swaps in the body's array
(Druid INT 12 / WIS 16) and the fit raised the stale INT to 18 while print's
Spellcasting row still said Wisdom. Now `printCanonFor` reads the casting ability
off print's own Spellcasting row (`castStat`, a closed fact), and the print-canon
fit reseats an UNARMED caster's striker on it before raising anything. An armed
caster keeps its weapon stat — "a wizard who cannot cast, he just hits people with
his staff" still rolls STR/DEX (the canaries pin caught the first cut, which ignored
`armed`). Smoke: Druid CR 2 ships INT 12 WIS 16, casts Wisdom DC 13, attack +5 —
print's own numbers; Mage stays INT.

### The druid smoke's three other FAILs (pre-existing seams, fixed the same hour)

- `exact-body-identity` size on the print Druid: the engine never copies a print
  HUMANOID's size (the corpus clips "Small or Medium" to "Small"), but the checker
  demanded it. The gate now exempts Humanoid print bodies — one rule, both sides.
- `under` on a CR 5 caster: caster-6 (`hp_scale` 0.8) scaled down from CR 6 landed
  at 71, under print's 75 floor — the lurker-5 defect one donor over. 0.85 → 77 at
  CR 5, 89 at CR 6 (print's Mage is 81 there). Donor pins green.
- `duplicate-row`: the print-canon pass renamed the Priest's second ranged row onto
  the name its first already carried. The rename now yields when the target name is
  already a row on the sheet; print's numbers still ride.
- `inline-form` on a bare print name (third druid draw): the call named the creature
  "Gorsam" (person); print's name then replaced it and the engine re-spoke every row
  as "the druid" — print's own form — but the honest-override stamp had been decided
  on "Gorsam". The print-name rewrite now stamps `inline_overridden = 'kind'` itself
  (a normalisation runs after everything that can change its input). Verified on the
  stored block: fails `["reader"]` → `[]` with the stamp the engine now writes.

Final druid smoke (`druid-2026-10-18T14-12-30`): Druid CR 2 = print's own numbers
(INT 12, WIS 16, Wisdom DC 13, +5); CR 5 druid 77 HP, no `under`; Priest one Radiant
Flame; the uncasting wizard's staff rolls STR +5; the court wizard stays INT.

## User feedback, same day: a wight is not a phantom

The route call picks `lurker-phantom` for "a barrow wight who drifts between the
standing stones" about 1 draw in 5 — "drifts" is fair English for a walking corpse —
and the borrow rule yielded to the verb. Not a keyword: print's own block already
says which Undead are incorporeal. `printCanonFor` now carries `incorporeal` (print's
Incorporeal Movement trait: Ghost, Specter, Will-o'-Wisp, Wraith have it; Wight,
Ghoul, Mummy, Zombie, Vampire, Lich do not), and the phantom seat stands down for a
corporeal print body whatever the words around it do. Smoke (`wight` ×5): all five
route calls picked phantom; the engine stood it down for three Wights and a Mummy
(walk speed, no Incorporeal Movement, no B/P/S package); the Ghost control kept it.
Pinned in `stage34-pins.spec.js`.

Two print-fidelity gaps the controls exposed, closed the same hour:
- a borrowed print body at print's CR took print's HP but a size-derived refit then
  re-rolled the dice (the Mummy's 9d8 + 18 became 11d6 + 22 = 60) — print's own
  formula now rides with print's HP;
- print's Multiattack stood only on an EXACT body, while print's rows, HP and array
  ride on a borrow at print's CR and the checker demanded the Multiattack there too —
  engine and gate now read one condition (exact, or a borrow near print's CR).

## Owner's spot check: "established creature that does something extra than the print version"

"skeleton with a greatsword" shipped print's Skeleton with a Shortsword; "a skeleton
who was a gladiator" lost the gladiator. Audit batch `printplus` (8 shapes: print
name + weapon / class / former life / mechanic / role word / body addition).

**Root cause — `exact` was overzealous.** `printCanonFor` reads the words BEFORE a
split on with/wearing/carrying/holding/riding, so "skeleton with a greatsword" was
`["skeleton"]` → `exact: true`, and an exact body closes the row set: no feature
rows, no species/class kit, no author/repair call, no GM attack keys (9 sites).
Now any word of the concept beyond the print name is a *remainder* and makes the
read a **borrow** (print's body + the GM's additions). A but/except/only tail is not
a remainder — it is the lacks/type edit the exact path already makes ("a dire wolf
but undead" stays exact, pinned). A bare name stays verbatim ("Skeleton" is the
Skeleton; the owner: "how useful is a verbatim owlbear anyway — we can look it up";
bare-name verbatim kept pending a policy call).

**Four seams the audit then exposed, closed in the same pass:**
- the melee print-rename overwrote a weapon the GM typed (the ranged rows had the
  `gmArmed` guard, the melee rows did not): "Greatsword" → "Shortsword", "Greataxe"
  → "Greatclub"; guarded now, `gmWeapons` read once for both;
- a chassis Multiattack never named print's own attack rows riding onto a borrow —
  the last pass skipped `e.print` rows outright; now it skips them only outside
  PRINT'S OWN Multiattack ("a scout with a javelin" keeps the javelin and names the
  Scout's Longbow; the species pin that caught it is green);
- the combination normalisation only filtered listed names; it now names every
  Action attack row, listed first (print's grammar);
- a print rename left the row's weapon stamp stale ("Rusted Blade"[longsword] →
  Shortsword still [longsword] → attack-stat demanded STR of a finesse row; a
  hurled-greataxe row renamed Javelin still [greataxe]); the stamp follows the
  rename.

Smoke after: Greatsword 2d8 + 3 Slashing on the Skeleton; Greataxe + Javelin on the
Ogre; the two-headed wolf is a borrow (Twinmaw: Fang, Multiattack, Circling); the
gladiator skeleton is Medium with Shield/Riposte. Pinned (`stage34-pins.spec.js`):
additions → borrow; bare names and but-tails → exact.

## Close-out: the smoke redesigned, and what it caught

The owner asked whether we were ready for a critic forty and whether the smoke
needed redesigning for fuller coverage. Inspecting `sweep.json` answered the second
question: all 40 entries were `{cr, concept, rules}`, and the runner's own comment
says the concept-only shape types into `#monsterName` — the last sweep run proves it
(`monsterDescription: ""`, the whole concept in `monsterName`). **The forty measured
one input shape out of four.** The owner's own 2026-10-12 note already said to
rebuild it at close-out; this is that rebuild (old file kept as
`sweep-OLD-concept-only.json.bak`).

**The new forty** (fixed prompts from here; 20/20 editions; every entry states its
expected behaviour): 20 CR spine — ten tiers (1, 3, 5, 8, 10, 13, 15, 17, 20, 24;
18 has no print block in either corpus) × print head + homebrew one-liner — and 20
use-case shapes covering all four input shapes (bare Name ×3, Name + description,
description-only, nothing at all), parts paragraph, header directives, CR in the
words, negation, named spellcaster, swarm/ooze/dragon bodies, language addition,
creature-only two-worder, seat verb, never-fail, archetype-only, the dense Meshrin
shape, the weapon table. One deviation from the 10-12 outline: the spine's print half
is print head + a small addition rather than bare verbatim — the owner's "how useful
is a verbatim owlbear anyway" taken seriously, and the shape that had just broken.

**Plus `features-2026-10-18.json`** — 30 blocks, frozen, to run beside the forty at
every future close-out.

### First run: 20 clean, 14 soft, 6 blocks / 10 FAILs — all on shapes the old forty never typed

| class | cause | fix |
|---|---|---|
| dangling Multiattack (3 blocks, 6 FAILs) | the live-row filter ran ~450 lines BEFORE the audit rename, and that rename's citation sweep had no word boundary (`\bCoils\b` rewrote "Judgment Coils") | the filter is one named pass called after every rename and addition; the sweep uses the print-canon rename's guarded regex |
| 2014 Goblin Boss type | engine keeps Humanoid on a 2014 sheet (goblins went Fey in 2024 only); the gate read the 2024 corpus | mirrored in the checker |
| "Arcane Slam" type-fit | **the gate, not the engine**: print puts a non-anatomical type on an anatomy name 16 times, every energy case carrying a qualifier (Air Elemental "Thunderous Slam" = Thunder, Pit Fiend "Devilish Claw" = Necrotic, Unicorn "Radiant Horn" = Radiant) | a qualified name may carry Force; a bare noun still answers |
| "Tail Whip" print-range | ANATOMY is eight nouns and has no tail or whip, and `whip` is a TYPE-ONLY noun whose mode guard let it through | the namer consults the weapon table — the checker's own — for a melee-only reading on a ranged row (owner's ruling: rename) |
| "Drowned Grasp" name-mechanic | a bare damage row earned no honest noun, so a lying claim shipped | a bare attack row earns Strike/Blow/Lash, last in the table |
| "Tail Spines" type-fit (found by the verify run) | the gate read the FIRST anatomy word; print writes the Manticore's "Tail Spike" and the Purple Worm's "Tail Stinger" as Piercing | the gate reads the HEAD word, as `honestAttackNames` already does — one definition. Print's 171 anatomy rows: first-match flags 11, head-word 9 |
| feature batch: Unaligned at INT 12 | a bestial mind was an unconditional exemption from the Unaligned → Neutral conversion | it holds only inside print's norm (INT ≤ 8, where 120 of 128 are Unaligned) and takes Neutral above it (owner's ruling: "neutral") |
| feature batch: swarm's unexplained +2 | the late Bloodied re-derive checked only the average, and ±2 of tolerance let a "+2" stand beside a "+3" main | print writes both halves with the same flat bonus or none (Crawling Claws 4d8+2 / 2d8+2, Insects 2d4+1 / 1d4+1, Snakes 1d8+4 / 1d4+4) — the form answers too |

**Second run: 19 clean, 19 soft, 2 blocks / 2 FAILs**, both then fixed as above.

### Pinned, not left to the dice
Four of these are pinned in `stage34-pins.spec.js` ("the forty's findings, pinned"),
because a smoke draw does not present the same shape twice: the bestial-mind
alignment law (both branches, by donor INT), the qualified-vs-bare anatomy type, the
melee-weapon-name-on-a-ranged-row rename with five controls, and the bare-attack-row
noun with its precedence checks. Two verification mistakes made that necessary: a
draw came out a Beast (where Unaligned is correct) and looked like a failed fix, and
a draw named its own row "Dart" so the rename never fired though I had claimed it did.

### Open, by the owner's ruling or by judgment
- **Parked (owner):** a caster's mundane staff keys the casting stat (Magda, +7 from
  CHA where a staff rolls STR). Touches attack derivation for every caster and the
  wizard-staff canary constrains it; wants its own measured landing.
- **One sighting, unfixed:** `save-fit` — a choking effect asking for a Wisdom save
  where it calls for Constitution (focused batch, Breathstalker).
- **Left as found:** 9 of print's 171 anatomy-named rows still contradict type-fit
  (the Camel's Bludgeoning bite, the Ankheg's Slashing one) — print's own oddities.

## Second package — the critic's A1–A9 landed, the forty re-run (2026-10-18 night)

### Corrections to the first package (the critic's E list)
- **Brine-Witch's attack-stat** is the parked item (a caster's mundane weapon keying the
  casting stat), not a new class. The forty's Mire Hagsight is the same class; a narrow fix
  was built, then reverted to honour the parking — see `critic-response-2026-10-18.md`.
- **Chorus two-novas is NOT fixed.** On a print body at print's CR print's breath is now the
  one breath; a HOMEBREW borrow whose addition earns a differently-named nova (Chorus, and
  tonight's Air Elemental Shriek beside Whirlwind) still carries two and waits on the owner's
  ruling: print's nova yields, or the addition's does.
- **Concept share is empty on a print body.** Print's rows are print's; the share counts
  only the rows the GM's words earned. The first package's share figures on print bodies
  are withdrawn.
- **Provenance credits only the GM's words.** A row bound on the idea's own words is not
  coverage; the seats decline it now (A1), and the reader's receipt reads the same way.
- **Enrichment errors log into the NEXT block's trace** in the smoke; a "Failed to enrich"
  line at the top of a block belongs to the one before it.
- **The 2014 printing is 2024 content in 2014 prose** — parked, on record. Tonight's one
  2014 engine fix (the conversion validator demanded empty sections back) is about the
  prose landing at all, not about 2014 content.

### What the forty found this time (`smoke-out/sweep-2026-10-18T23-43-43`)
39/40 in one pass; one harness miss (no trace, re-rolled clean). Checker 18 clean / 16
soft / 5 FAIL. Hand score: zero wrong-creature headers; every Huge/Gargantuan corporeal
body at or above print's floor; no incorporeal body above Medium; print's rows intact on
every exact body and every borrow at print's CR.

| FAIL | what it was | state |
|---|---|---|
| Quarried Exile — Boulder +7 off the old STR | the floor re-stamped melee rows only; a giant's rock is a STR-keyed ranged row | fixed, pinned |
| Quarried Exile — "understands no Common" | my keyed `speech` test asked for no voice at all beside Languages: Giant | fixed, pinned |
| Ossein Heliarch — Paralyzing Touch `ko-ungated` | print's Lich does this at CR 21; the melee rename never set `print: true` so the gate read it as ours | fixed (one flag, every reader), pinned |
| Adult Red Dragon — "blind in one eye" keyed `sight` | the call's key; a partial loss is `part` — the lacks prompt now says so | prompt fixed, pinned |
| Mire Hagsight — Rusted Blade +7 off CHA | the parked class | open, by the owner |
| Air Elemental — Whirlwind + Shriek | two novas on a homebrew borrow | open, by the owner |

### Two defects the forty's "timeouts" were hiding
- Six live "timeouts" across two runs were one ReferenceError: the A1c trait-seat gate read
  `gmAsked` from a block that had closed. Every print body whose signature call returned a
  trait idea threw, nothing saved, and the smoke waited out its clock. Hoisted and pinned
  with a live fit on a print body; the smoke now fails a block the moment the page logs a
  thrown generation.
- Every failed 2014 conversion carried an empty section: the prompt filtered them out and
  the validator demanded them back. Five of five failures matched, none of fifteen
  successes. Fixed and pinned; the five re-ran clean.

### For the owner
- Two novas on a homebrew borrow (Chorus, Air Elemental): print's yields or the addition's?
- The parked caster-weapon class recurred (Hagsight); the fix is written up and reverted.
- "Swarm of Knell of the Dyings": the swarm stamp pluralises the last word of the model's
  name. Proposed as a call field (`swarm_of`, the plural noun phrase), the pluraliser as
  fallback. Needs a go.

### Feature thirty, re-run (2026-10-19)
30/30 generated across two runs (one live stall mid-run; the block re-ran clean). Checker 18
clean / 12 soft / 0 FAIL after one checker correction: a damage-type word that is part of the
creature's own name ("Shroud of the Cold Lamp" on the Cold Lamp Widow) is its name, not a
claim. Across all 70 blocks tonight: zero wrong-creature headers.

## Third package — the dispatcher and the two decided pipelines (2026-10-19)

The Five Pipelines brief, steps 1–5, on the critic's own order. Full executor's log in
`plans/paths-step1-2026-10-19.md`; this is the case.

### The count (step 1, confirmed by the owner)
Three paths in the code as it stood (exact · borrow · homebrew; blank and body chassis as
parameters), four as the target — class NPC split from borrow. The canon matcher alone misfiled
7 of 30 probe prompts: five print bodies missed outright (stone giant, frost giant, cave troll,
"a vampire who…", "a …ghost that…"), two borrowed with the wrong relation (a golem of lashed
timber as the Clay Golem; a berserker who flies into a rage as the Berserker).

### The path call and the dispatcher (steps 2–3)
`reskin/path.mjs`. Code decides the closed cases with no call (an exact print name; a Name-field
print name beside a description; a blank form); the call reads only free text and answers
assembly, print body, relation, species, class and title with receipts; validators refuse what
is not in the corpus, the eight, the kit list, or the GM's own words, and name the refusal; the
dispatcher picks once, with the brief's precedence (a class word outranks a people, a monster
named as itself outranks a title or a class word). The trace opens with `[path] …`; the block
carries `generation.pipeline`; the checker reads it instead of its own matcher.
Probe (40 prompts × 5, alone on the box): assembly 7/169 misread (4 %), print body 0 real
misses, class 0; two title words flipped ("a tyrant of burning brass", "pumpkin king") and are
now a `title` field by the owner's ruling (a title is a leadership signal, not a class). Shadow
forty: the path and the matcher disagreed on 13 of 40; the path was right on 10.
Owner's rulings: no vote; a title marks a leader; the Berserker label is lenient.

### Print with a twist (step 4)
Print's body, header and rows at any CR — print's numbers near its CR, the sheet's bonus far from
it; the GM's weapon in its own row; one seat whose receipt must point at a mechanical twist clause
no weapon row already answers; lacks sweep after repair; no class kit, no fallback shelf, no value
floor, no chassis nova, no chassis filler. Nine leaks found on live blocks and pinned: the Shortbow
lost at a far CR; a trait carried by quoting the creature itself; the barbarian kit on a troll; a
second row for an answered clause; print's Multiattack with a form suffix; a chassis parenthetical
on the Ghost's touch; the Hydra's dangling regrowth sentence; a duplicate Bite clause; the checker
failing print's own Vampire as under its band. twist-five 5/5 and twist-ten 10/10, 0 FAIL, the
four matcher-missed bodies (Vampire, Ghost, Wolf, Hobgoblin Warrior) standing by the path alone.

### Class NPC (step 5)
A class with no body named stands on its class's print NPC block nearest its CR (closed table in
`classes.mjs`); the class kit and the species kit are the path's fields; the class shapes the array
(primary and casting stats at 14 or better); the shelf, floor and chassis nova are off; the checker
gained a `class` gate (kit lands, class stats, species header). classes-eight 16/16: 13 clean /
2 soft / 1 FAIL on the second run, the FAIL being a chassis hybrid row that took print's Pistol
numbers before its rename was refused — fixed (the duplicate check runs before any stamping; a
row beyond print's count takes no print row) and pinned. Owner's rulings: fix the axe now; probe
and tune the imp (now 5/5 twist on the Imp); templar either way.

### The cross-path forty on the dispatcher (`sweep-2026-10-19T14-03-35`)
40/40 in one pass; paths 13 twist · 6 class NPC · 3 exact · 1 blank · 17 homebrew; checker
21 clean / 15 soft / 4 FAIL; zero wrong-creature headers by hand. The four FAILs: a repair row
named like the seat's row and a chassis hybrid row riding beside print's two attacks (Vashka);
the kit gate blind to print's own kit rows (Brother Halric); an archlich read homebrew where the
Lich was meant (Ossuar); the far-CR dice ceiling (Reedjaw, A8-iv, deferred). The first three are
fixed and pinned after the run — the repair call is told the names on the sheet, a closed path's
Actions are closed to unclaimed chassis rows, the kit gate counts print's rows the kit table names,
and "a greater or lesser variant of a published creature is that creature" is a prompt example
(archlich 5/5 twist on the Lich in the probe). The feature-branch set beside the forty: twist-five
5/5, twist-ten 10/10, classes-eight 13/13 generated, all at zero FAIL by the latest runs.

### What the critic should read
The `[path]` line against the prompt on every block; print's rows on every twist and class body;
the two decided pipelines' lists against the matrix. Homebrew (steps 6–7) is unchanged and is
where sameness is still measured. Open for the owner: Great Weapon Master (C6); the dice ceiling
on far-CR renames (A8-iv); "a goblin who was a wizard's apprentice" (the one probe residual).

---

# 2024 blocks

## Review batch — sweep-2026-10-19T14-03-35

The checker ran first. The gate table covers every block in the run; every block of the run follows. Each block carries its checker row above and its engine trace below. Hand-derive against the row first; then read for what predicates can't see.

### Gate table — the whole run

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Dire Wolf | 1 | 2024 | skirmisher-1 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 2/2 |
| Silt Maw Hound | 1 (2014) | 2014 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 3/4 |
| Owlbear | 3 (2014) | 2014 | brute-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 2/2 |
| Toll-Keeper | 3 | 2024 | lurker-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 7/7 |
| Air Elemental | 5 | 2024 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/3 |
| Spoilheap Animist | 5 (2014) | 2014 | brute-5-grappler | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 1/4 |
| Hydra | 8 (2014) | 2014 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |
| Musterfall Golem | 8 | 2024 | brute-5-juggernaut | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 4/5 |
| Stone Golem | 10 | 2024 | brute-9 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 5/5 |
| Swarm of Drowned Nave Choirs | 10 (2014) | 2014 | swarm-9 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 0/2 |
| Vampire | 13 (2014) | 2014 | lurker-8 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 8/8 |
| Plague Choir | 13 | 2024 | defender-8-leader | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/5 |
| Purple Worm | 15 | 2024 | brute-13 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |
| Glacier Heart | 15 (2014) | 2014 | brute-9-juggernaut | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | ok | soft (1) | 0/1 | 6/6 |
| Adult Red Dragon | 17 (2014) | 2014 | dragon-15 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 7/7 |
| Brass Tyrant | 17 | 2024 | brute-17-juggernaut | ok | SOFT: hot-offense | ok | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 7/9 |
| Pit Fiend | 20 | 2024 | defender-17 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 8/8 |
| Ossuar Sun-Throne | 20 (2014) | 2014 | caster-21 | ok | ok | ok | SOFT: rider-no-save, control-aoe-ungated | ok | ok | ok | ok | FAIL: name-mechanic | ok | FAIL (1) | 1/1 | 9/11 |
| Ancient Gold Dragon | 24 (2014) | 2014 | dragon-22 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 9/9 |
| Trench Hymn | 24 | 2024 | brute-21 | ok | SOFT: aim-dpr, band | ok | ok | ok | ok | ok | ok | ok | ok | soft (1) | 0/1 | 1/6 |
| Owlbear | 3 | 2024 | brute-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 1/1 |
| Goblin Boss | 1 (2014) | 2014 | skirmisher-1 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/3 |
| Vashka the Red | 6 | 2024 | defender-5 | ok | ok | FAIL: duplicate-row | ok | ok | ok | FAIL: print-rows | ok | ok | ok | FAIL (2) | 2/2 | 6/7 |
| Sump-Molt Reaper | 9 | 2024 | brute-8-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 3/5 | 5/5 |
| Black Iron Sentinel | 11 (2014) | 2014 | defender-5 | ok | user-set: AC 20 · reads CR 9 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 3/3 | 3/4 |
| Mireth Thornwater | 7 | 2024 | caster-8-binder | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok | ok | soft (1) | 2/2 | 4/6 |
| Brother Aldric | 6 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | SOFT: kit-lands | soft (1) | 2/2 | 1/1 |
| Ilvareth Dusksong | 12 (2014) | 2014 | caster-12 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok | ok | soft (1) | 1/1 | 4/5 |
| Swarm of Vesper Chimes | 13 | 2024 | swarm-9 | ok | SOFT: hot-offense | ok | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 3/3 |
| Nave Vault Ooze | 9 (2014) | 2014 | ooze-9 | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 3/4 |
| Stormcrag Tyrant | 7 | 2024 | dragon-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 2/2 |
| Skarra Hurlstone | 9 (2014) | 2014 | brute-9 | ok | SOFT: aim-atk | ok | ok | ok | ok | ok | ok | ok | ok | soft (1) | 2/2 | 2/2 |
| Reedjaw Adept | 5 (2014) | 2014 | skirmisher-3 | ok | FAIL: per-attack-ceiling | ok | ok | ok | ok | ok | ok | ok | ok | FAIL (1) | 1/1 | 7/7 |
| Krennik Skullstandard | 4 (2014) | 2014 | skirmisher-3-mounted | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 5/6 |
| Wellmouth | 5 | 2024 | lurker-5-trap | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 0/4 |
| Kkresh | 4 | 2024 | brute-5-grappler | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | ok | soft (1) | 13/14 | 4/4 |
| Meshrin | 8 (2014) | 2014 | skirmisher-8-hurler | ok | user-set: AC 16, HP 120 · reads CR 6.5 | SOFT: lint:hp-formula | ok | ok | ok | ok | ok | ok | ok | soft (1) | 8/8 | 8/8 |
| Gravebound Greatsword | 6 | 2024 | brute-5 | ok | ok | SOFT: reach | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 3/3 |
| Wagebound Sellsword | 5 (2014) | 2014 | skirmisher-8-hurler | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok | ok | soft (1) | 2/2 | 4/4 |
| Brother Halric | 3 (2014) | 2014 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | FAIL: kit-lands | FAIL (1) | 1/1 | 4/4 |

**Dropped 9 of 71 user clauses** (coverage 87%); concept share 85% (165/194 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- caster-21 / reader: 1
- defender-5 / structure: 1
- defender-5 / donor: 1
- skirmisher-3 / bands: 1
- skirmisher-3 / class: 1



---


### Dire Wolf — lowest CR

**Concept:** name: Dire Wolf | with a frost-rimed hide

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Dire Wolf | 1 | skirmisher-1 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1/8 / off 3 → 1.5625; sustained 16 (2 × Bite); nova none; dmg 16

```
Dire Wolf

Large Beast, Unaligned

AC 14
Initiative +2 (12)

HP 22 (3d10 + 6)

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
15
+2
+2
CHA
7
-2
-2

Skills Perception +3, Stealth +4

Senses darkvision 60 ft.; Passive Perception 13

Languages None

CR 1 (XP 200; PB +2)

Traits

Pack Tactics. The dire wolf has Advantage on an attack roll against a creature if at least one of the dire wolf's allies is within 5 feet of the creature and the ally doesn't have the Incapacitated condition.

Actions

Multiattack. The dire wolf makes two Bite attacks.

Bite. Melee Attack Roll: +5, reach 5 ft. 8 (1d10 + 3) Piercing damage. If the target is a Large or smaller creature, it has the Prone condition.

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

**Engine trace**

```
[path] twist — Dire Wolf (is) — "Name field: Dire Wolf" (code)
[route] skirmisher type=Beast mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | skirmisher: ✓ ("Dire Wolf") | skirmisher-skulker: the call read "hide" as not meaning that mechanic here — no override | skirmisher stands: every key that would override it was read as a figure of speech | skirmisher: no line key in the words — the model's read of its quote | bane refused: the words carry no weakness clause, so "fire" answers a question nobody asked
[concept] name: "Dire Wolf" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] resolve: archetype=skirmisher type=Beast themes=bestial/elemental mind=bestial style=— energy=Cold mix=both identity=✓ lore=✓
[concept] name: provided "Dire Wolf"
[concept] mechanics: none claimed
[concept] signature elements: frost-rimed hide and freezing bite [body] | pack harrying and flanking [behavior] | chilling cold that clings to the wound [aura]
[concept] identity: The frost-rimed dire wolf stalks the edges of the pack's encirclement, harrying prey with snapping feints before darting in to tear at a hamstring and wheeling away into the snow. Every round it circles, lets a packmate pin the quarry's attention, then lunges for the flank with jaws sheathed in killing cold; bloodied, it does not break but redoubles the harrying, dragging the fight out until the pack can close in.
[concept] lore: Packs of these wolves den in the high passes where the rime never melts, and they drive travelers down from the cols not to eat at once but to run them to exhaustion in the snow.
[reskin] print canon defenses: HP 30 -> 22, AC 15 -> 14 — the Dire Wolf's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 17, DEX 15, CON 15, INT 3, WIS 12, CHA 7 — the Dire Wolf's at its own CR; attack +4 -> +5, DC 13 (print's)
[reskin] donor: skirmisher-1 -> CR 1
[reskin] [path] decides: twist on the Dire Wolf (the matcher agrees)
[reskin] print canon: "Dire Wolf — with a frost-rimed hide" heads on the Dire Wolf — print's rows ride along; the seat stays
[reskin] claim gate: CR 1 but a Beast body — the trait seat stays open (print: a material body carries a trait at every tier)
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline by rule: "the dire wolf" — the call answered "the dire wolf" (kind), which the name does not support
[reskin] inline form: "the dire wolf" — the model's own reading of the name
[reskin] final price: the round ran 14 against the card's 10 — the attack rows re-solve at 75% (2 attacks off one row after a supersede)
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Dire Wolf — with a frost-rimed hide" -> has (descriptive), head
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "As it circles, the wolf feints and snaps at the quarry's hamstring — a bite that lands anywhere makes the flesh go numb and stiff with rime, slowing the prey and leaving it exposed to the rest of the pack. The wound keeps the quarry limping until the cold works its way out." [rider/on_hit/condition] — menu: contagion, charge-push, hook-rider, pounce, isolation, charge (+ shelf: snare, shield-bash, lure, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, slow-bolt, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, riposte)
[reskin] signature bound to the concept's verb: action — slow-bolt (frost)
[reskin] signature miss: action — "As it circles, the wolf feints and snaps at the quarry's hamstring — a bite that lands anywhere makes the flesh go numb and stiff with rime, slowing the prey and leaving it exposed to the rest of the pack. The wound keeps the quarry limping until the cold works its way out." [rider/on_hit/condition] — the model picked "contagion" (no verb, and it quotes nothing the GM typed) over a concept-verb template (slow-bolt)
[reskin] fallback stands down: the twist path has no shelf — the Dire Wolf's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "The rime on its hide carries into every bite: when its jaws open, a whisper of killing cold clings to the wound, so each of the wolf's bites bites deeper the more of the pack's harrying the quarry has already taken. Frost gathers around it as it circles, and prey already slowed by the pack's harrying feel the cold sink in worst of all." [trait/always/damage] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature bound to the concept's verb: trait — heated-body (frost)
[reskin] trait declined: "Rimebound Hide" — a print body takes only what the user's words ask; the call quotes "with a frost rimed hide", which is no unanswered twist clause — a head, a header, a lack, or a clause the GM's own weapon already answers
[reskin] weapons answered: Bite = none
[reskin] print canon speed: 30 ft. -> 50 ft. — the Dire Wolf's walk; the concept's other modes stay
[reskin] languages held: None stands — INT 3 on a Beast speaks nothing, whatever the mind read said
[reskin] print canon trait: Pack Tactics — "Dire Wolf — with a frost-rimed hide" is the Dire Wolf (print's own row)
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the seat's, not the Dire Wolf's
[reskin] print canon: chassis row leaves — Traits/"Snow Stalker" is the seat's, not the Dire Wolf's
```


---


### Trench Hymn — highest CR

**Concept:** a leviathan of the trench whose song drowns fleets

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Trench Hymn | 24 | brute-21 | ok | SOFT: aim-dpr, band | ok | ok | ok | ok | ok | ok | ok | ok |

- bands · soft · aim-dpr: damage 180 a round is 28% under the card's 250
- bands · soft · band: reads CR 25.5 (print at 24 reads 17.5–25.5, n=5)
- **dropped clause:** "a leviathan of the trench whose song drowns fleets"
- read: def 26 / off 25 → 25.5; sustained 180 (2 × Bite + legendary Surge and Slam); nova Drowning Hymn 78; dmg 180

```
Trench Hymn

Gargantuan Monstrosity, Neutral

AC 21
Initiative +0 (10)

HP 542 (31d20 + 217)

Speed 40 ft., Swim 40 ft.

MOD
SAVE
STR
28
+9
+16
INT
10
+0
+0
MOD
SAVE
DEX
10
+0
+0
WIS
14
+2
+9
MOD
SAVE
CON
24
+7
+14
CHA
14
+2
+2

Skills Athletics +16, Perception +9

Senses darkvision 120 ft.; Passive Perception 19

Languages None

CR 24 (XP 62,000; PB +7)

Traits

Amphibious. The hymn can breathe air and water.

Legendary Resistance (3/Day). If the hymn fails a saving throw, it can choose to succeed instead.

Actions

Multiattack. The hymn makes two Bite attacks.

Bite. Melee Attack Roll: +16, reach 10 ft. 22 (3d8 + 9) Piercing damage plus 14 (4d6) Thunder damage.

Drowning Hymn (Recharge 5-6). Constitution Saving Throw: DC 24, each creature in a 60-foot Cone. Failure: 78 (12d12) Thunder damage, and the target has the Deafened condition until the end of its next turn. Success: Half damage only.

Legendary Actions

Legendary Action Uses: 3. Immediately after another creature's turn, the hymn can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.

Surge and Slam. The hymn moves up to half its Speed without provoking Opportunity Attacks, and it makes one Bite attack.

Fluke Slam. Strength Saving Throw: DC 24, each creature within 10 feet of the hymn. Failure: The target has the Prone condition.

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

- Traits/Amphibious — print's own row
- Traits/Legendary Resistance — the chassis
- Actions/Multiattack — the chassis
- Actions/Bite — the chassis
- Actions/Drowning Hymn — the chassis
- Legendary Actions/Legendary Action Uses: 3 — the chassis
- Legendary Actions/Surge and Slam — the chassis
- Legendary Actions/Fluke Slam — the chassis

**Engine trace**

```
[path] homebrew — "a leviathan of the trench whose song drowns fleets" (call)
[route] brute type=Beast mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | brute: ✓ ("a leviathan of the trench") | brute: no line key in the words — the model's read of its quote
[concept] resolve: archetype=brute type=Beast themes=aquatic/voice mind=bestial style=— energy=Thunder mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: a song that drowns fleets [behavior] | trench-born leviathan bulk of hide and blood [body] | the crushing pressure of its wake [aura]
[concept] identity: The leviathan opens by singing — a subsonic trench-hymn that rolls out ahead of it and staggers whole hulls before it ever surfaces, forcing crews to fight the water itself. Each round it surges into reach in a boil of blood-warm wake, slamming with jaw and fluke while the song keeps grinding at every mind and timber around it. It never flees; wounded, it only deepens its song into something that drowns courage first and sailors second, and it will circle a crippled fleet for hours, patient as the trench.
[concept] lore: It is the trench's own voice given a body of cold black blood and hide, and it surfaces only to drown the noise of ships that dare to sing above it.
[reskin] donor: brute-21 -> CR 24 (invented — no printed peer)
[reskin] [path] decides: homebrew (the matcher agrees)
[reskin] ranged row off: "Legendary Ranged Attack" leaves with it (it made a Ranged Attack attack)
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] repair round 1: 2 defect(s) — name "Drowning Hymn" repeats the creature's own name — the sheet already says who acts; give the row its own word | name "Surge and Slam" promises a slam but the row makes a Bite attack — name the delegation honestly, or without anatomy
[reskin] type honesty: Beast above CR 10 -> Monstrosity (print ceiling: CR 8)
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline declared: "the hymn" — the call's own answer (kind), built from the name
[reskin] inline form: "the hymn" — the model's own reading of the name
[reskin] save dc derived: DC 23 -> 24 (8 + PB 7 + the sheet's best 9) — no stat on the sheet reached it
[reskin] alignment by mind: Unaligned -> Neutral — a Monstrosity with INT 10 can hold an ethic (print: 0 of 329 Unaligned blocks speak)
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a leviathan of the trench whose song drowns fleets" -> has (mechanical)
[reskin] menu pruned: action — push-prone, thrown-burst-seed (the sheet cannot render them)
[reskin] signature idea (action): "The hymn drives its song straight down into the seabed, and the trench answers: a rolling pressure wave of sound lifts every swimmer and sailor near it off their footing and drags them a long way back through the churned water before dumping them, gasping and scattered. It gains ground as the ring of thrown bodies widens, so the fleet's line breaks whether or not anyone is hurt." [action/always/movement] — menu: shield-bash, escalating-dread, terror-pulse, herd, drain, exploiter (+ shelf: second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, stunning-strike, charge-push, hook-rider, pounce, charge)
[reskin] word match declined by the call: herd, hook-rider, terror-pulse, exploiter, own-turn-punisher, rally, shield-bash, escalating-dread, drain — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit"
[reskin] signature miss: action — "The hymn drives its song straight down into the seabed, and the trench answers: a rolling pressure wave of sound lifts every swimmer and sailor near it off their footing and drags them a long way back through the churned water before dumping them, gasping and scattered. It gains ground as the ring of thrown bodies widens, so the fleet's line breaks whether or not anyone is hurt." [action/always/movement] — the model found no template that holds it (offered: shield-bash, escalating-dread, terror-pulse, herd, drain, exploiter, hook-rider, own-turn-punisher, rally)
[reskin] fallback respects the call: escalating-dread, terror-pulse, herd, exploiter, own-turn-punisher left the shelf — the call declined them for this sheet
[reskin] fallback skipped: push-prone (the sheet cannot render it)
[reskin] value check: "Dazzling Burst" EV 5.2 vs floor 19.8 (one attack of 2) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Dazzling Burst" — a seed that cannot be lifted does not ship
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "Every wound it suffers only feeds the song — whenever it is hurt, the melody around it thickens and every creature near it feels their courage and breath thin until the hymn's next turn." [trait/on_being_hit/condition] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura)
[reskin] word match declined by the call: noxious-aura, resonant-body, bloodied-burst, bloodied-fury — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "Every wound it suffers only feeds the song — whenever it is hurt, the melody around it thickens and every creature near it feels their courage and breath thin until the hymn's next turn." [trait/on_being_hit/condition] — the model found no template that holds it (offered: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge, bloodied-fury, noxious-aura, uncanny-sense)
[reskin] weapons answered: Bite = none; Drowning Hymn = none; Sink Courage = none; Surge and Slam = none; Fluke Slam = none
[reskin] chassis nova: "Drowning Hymn (Recharge 5-6)" — the brute-21's own nova row (its "Area Nova", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] amphibious by concept: a creature of the deep breathes both (print: the Sea Hag's)
audit finding below confidence gate: Fluke Slam Prone is self-escaping (stand up) and carries its own exit, so this is not a defect — listed only to note no counterplay issue exists; no change needed.
[reskin] audit rename blocked — "Thunderous Slam" claims an element "Fluke Slam" does not pay (no damage)
```


---


### Toll-Keeper — a 2024 sheet

**Concept:** a chapel bell-ringer's ghost that tolls for the dying

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Toll-Keeper | 3 | lurker-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1 / off 5 → 3; sustained 38 (2 × Withering Touch); nova none; dmg 38

```
Toll-Keeper

Medium Undead, Neutral

AC 11
Initiative +1 (11)

HP 45 (10d8)

Speed 5 ft., Fly 40 ft. (hover)

MOD
SAVE
STR
7
-2
-2
INT
10
+0
+0
MOD
SAVE
DEX
13
+1
+3
WIS
12
+1
+1
MOD
SAVE
CON
10
+0
+0
CHA
17
+3
+3

Skills Perception +3, Stealth +5

Resistances Acid, Bludgeoning, Cold, Fire, Lightning, Piercing, Slashing, Thunder

Immunities Necrotic, Poison; Charmed, Exhaustion, Frightened, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained

Senses darkvision 60 ft.; Passive Perception 13

Languages Common plus one other language

CR 3 (XP 700; PB +2)

Traits

Resonant Body. A creature that hits the toll-keeper with a melee attack while within 5 feet of it takes 5 (1d10) Thunder damage and has the Deafened condition until the end of its next turn.

Ethereal Sight. The toll-keeper can see 60 feet into the Ethereal Plane when it is on the Material Plane.

Incorporeal Movement. The toll-keeper can move through other creatures and objects as if they were Difficult Terrain. It takes 5 (1d10) Force damage if it ends its turn inside an object.

Actions

Multiattack. The toll-keeper makes two Withering Touch attacks. It can replace one attack with a use of Horrific Visage.

Withering Touch. Melee Attack Roll: +5, reach 5 ft. 19 (3d10 + 3) Necrotic damage.

Horrific Visage. Wisdom Saving Throw: DC 13, each creature in a 60-foot Cone that can see the toll-keeper and isn't an Undead. Failure: 10 (2d6 + 3) Psychic damage, and the target has the Frightened condition until the start of the toll-keeper's next turn. Success: The target is immune to this ghost's Horrific Visage for 24 hours.

Possession (Recharge 6). Charisma Saving Throw: DC 13, one Humanoid the toll-keeper can see within 5 feet. Failure: The target is possessed by the toll-keeper; the toll-keeper disappears, and the target has the Incapacitated condition and loses control of its body. The toll-keeper now controls the body, but the target retains awareness. The toll-keeper can't be targeted by any attack, spell, or other effect, except ones that specifically target Undead. The toll-keeper's game statistics are the same, except it uses the possessed target's Speed, as well as the target's Strength, Dexterity, and Constitution modifiers.
The possession lasts until the body drops to 0 Hit Points or the toll-keeper leaves as a Bonus Action. When the possession ends, the toll-keeper appears in an unoccupied space within 5 feet of the target, and the target is immune to this ghost's Possession for 24 hours. Success: The target is immune to this ghost's Possession for 24 hours.

Etherealness. The toll-keeper casts the Etherealness spell, requiring no spell components and using Charisma as the spellcasting ability. The toll-keeper is visible on the Material Plane while on the Border Ethereal and vice versa, but it can't affect or be affected by anything on the other plane.

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
- Actions/Withering Touch — print's own row, renamed
- Actions/Horrific Visage — print's own row
- Actions/Possession — print's own row
- Actions/Etherealness — print's own row
- Traits/Resonant Body — template resonant-body; library draw (seed unstamped); the GM's clause "tolls for the dying"; binds the GM's words: toll+bell
- Traits/Ethereal Sight — print's own row
- Traits/Incorporeal Movement — print's own row

**Engine trace**

```
[path] twist — Ghost (is) — "ghost" (call)
[route] lurker-phantom type=Undead mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | lurker-phantom: ✓ ("a chapel bell-ringer's ghost") | lurker-phantom: key "ghost" (class body)
[concept] hints: phantom→style ✓ ("a chapel bell-ringer's ghost")
[concept] resolve: archetype=lurker type=Undead themes=grave/voice mind=sapient style=phantom energy=Necrotic mix=energy identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: the death-toll bell that calls the dying [behavior] | a ringing touch that drains the living [behavior] | a bodiless shadow drifting through stone [body]
[concept] identity: The wraith waits unseen in the belfry, its hand closing on the rope as a life gutters out below — that bell stroke is its opening, a toll that chills the dying and draws the phantom down through stone to the bedside. Every round it circles its mark in silent, drifting passes, and its touch carries the very ringing it makes, a numbing knell that saps warmth and strength. It fights until its bell is silenced, and a living soul near death makes it bold, greedy, and loath to leave a toll half-paid.
[concept] lore: A bell-ringer who died alone in the tower, still owing one final peal, its spirit now rings only for the dying — and pulls the summons in, unwilling to ring in an empty room.
[reskin] print canon route: the Ghost's body outranks the phantom seat — no verb in the words names it; the plain lurker line
[reskin] print canon defenses: HP 39 -> 45, AC 14 -> 11 — the Ghost's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 7, DEX 13, CON 10, INT 10, WIS 12, CHA 17 — the Ghost's at its own CR; attack +5 -> +5, DC 13 (print's)
[reskin] donor: lurker-2 -> CR 3
[reskin] row gated out: Teleport (teleport) — the concept did not claim this mechanic
[reskin] [path] decides: twist on the Ghost (the matcher would have said homebrew)
[reskin] print canon: "a chapel bell-ringer's ghost that tolls for the dying" heads on the Ghost — print's rows ride along; the seat stays
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline declared: "the toll-keeper" — the call's own answer (kind), built from the name
[reskin] inline form: "the toll-keeper" — the model's own reading of the name
[reskin] save dc derived: DC 12 -> 13 (8 + PB 2 + the sheet's best 3) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a chapel bell-ringer's ghost" -> has (descriptive), head | "tolls for the dying" -> has (descriptive)
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "When someone within earshot is badly wounded or near death, the toll-keeper's bell answers with a single low peal that marks them as the next to be rung for. Until that peal has been answered by its touch, the keeper can find that person wherever they flee, even across the dark of the belfry stones, and its drifting passes narrow only on them. The debt can be settled only by ringing that one soul," [action/save/condition] — menu: leap, gaze-single, execute, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, terror-pulse, snare-bolt, slow-bolt, sensory-strike, drain, zone-seed, blighted-ground (+ shelf: delayed-brand, patient-defense, self-invisibility, focus, feint-slip, coating, riposte, charge-push, hook-rider, pounce, isolation)
[reskin] signature bound to the concept's verb: action — active-toll, sensory-strike (toll, bell)
[reskin] word match declined by the call: active-toll, sensory-strike, execute — the key word does not mean the mechanic here
[reskin] fit declined: "Debt Peal" — a print body takes only what the user's words ask; the call quotes "a chapel bell ringer's ghost that tolls for the dying", which is no unanswered twist clause — a head, a header, a lack, or a clause the GM's own weapon already answers (the blacksmith's rally, critic-ten 2026-10-01)
[reskin] fallback respects the call: sensory-strike, execute left the shelf — the call declined them for this sheet
[reskin] fallback stands down: the twist path has no shelf — the Ghost's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "The toll-keeper has no body that stone can stop, so walls, floors, and chapel floors are no obstacle to its hovering drift — only blessed or consecrated ground forces it to stay outside. The rope and the bell are what it really is, and harming either of those things harms the keeper itself." [trait/always/defense] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, evasion, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature bound to the concept's verb: trait — bloodied-burst (toll, bell, dying, the dying)
[reskin] word match declined by the call: bloodied-burst, death-burst, warded-mending — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit" after being shown bloodied-burst, which the GM's words keyed
[reskin] key match declined: trait — "bloodied-burst" was ranked first on the call's own menu for toll+bell+dying+the dying, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: trait — "The toll-keeper has no body that stone can stop, so walls, floors, and chapel floors are no obstacle to its hovering drift — only blessed or consecrated ground forces it to stay outside. The rope and the bell are what it really is, and harming either of those things harms the keeper itself." [trait/always/defense] — the model found no template that holds it (offered: bloodied-burst, false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, evasion, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst, warded-mending)
[reskin] concept-first trait skipped: bloodied-burst — the call read its match as a collision (the word is a modifier, or the sheet already answers it)
[reskin] trait bound to the concept's verb (concept-first): resonant-body — toll+bell in the user's words; the idea path had nothing
[reskin] signature template (trait): resonant-body -> Traits/"Resonant Body" ("exact concept match [verb: toll:concept, bell:concept]")
[reskin] weapons answered: Numbing Bell-Touch = none
[reskin] languages by mind: "None" -> "Common plus the languages it knew in life" (sapient)
[reskin] print canon languages: "Common plus the languages it knew in life" -> "Common plus one other language" — the Ghost's
[reskin] print canon speed: 30 ft. -> 5 ft. — the Ghost's walk; the concept's other modes stay
[reskin] print canon speed: Fly -> 40 ft. — the Ghost's own
[reskin] print canon attack: "Numbing Bell-Touch" -> "Withering Touch" — the Ghost's own row
[reskin] immunities stamped for type: Undead -> Poison; Exhaustion, Poisoned
[reskin] print canon defenses: immunities Poison; Exhaustion, Poisoned -> Necrotic, Poison; Charmed, Exhaustion, Frightened, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained; resistances none -> Acid, Bludgeoning, Cold, Fire, Lightning, Piercing, Slashing, Thunder — the Ghost's own header lines
[reskin] print canon trait: Ethereal Sight — "a chapel bell-ringer's ghost that tolls for the dying" is the Ghost (print's own row)
[reskin] print canon trait: Incorporeal Movement — "a chapel bell-ringer's ghost that tolls for the dying" is the Ghost (print's own row)
[reskin] print canon: chassis row leaves — Bonus Actions/"Umbral Step" is the seat's, not the Ghost's
[reskin] print canon row: Actions/Horrific Visage — the Ghost's own
[reskin] print canon row: Actions/Possession (Recharge 6) — the Ghost's own
[reskin] print canon row: Actions/Etherealness — the Ghost's own
[reskin] multiattack replacement clause: It can replace one attack with a use of Horrific Visage.
[reskin] row binds its clause: "Resonant Body" answers "tolls for the dying" — the keys it matched came from that clause, so the coverage credit has a receipt
[reskin] audit rewrite blocked — "Possession (Recharge 6)" is engine-authored chassis text
[reskin] audit rewrite blocked — "Etherealness" is engine-authored chassis text
```


---


### Musterfall Golem — a homebrew with a nova

**Concept:** a siege-engine golem of lashed timber that shoulders through walls

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Musterfall Golem | 8 | brute-5-juggernaut | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- **dropped clause:** "shoulders through walls"
- read: def 7 / off 9 → 8; sustained 54 (2 × Slam); nova Splintering Thrust 32; dmg 57

```
Musterfall Golem

Huge Construct, Neutral

AC 15
Initiative -1 (9)

HP 152 (16d12 + 48)

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
4
-3
-3

Skills Athletics +8, Perception +3

Immunities Lightning, Poison; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned

Senses darkvision 60 ft.; Passive Perception 13

Languages Understands the languages of its creator but can't speak

CR 8 (XP 3,900; PB +3)

Traits

Lightning Absorption. Whenever the golem is subjected to Lightning damage, it takes no damage and instead regains a number of Hit Points equal to the Lightning damage dealt.

Immutable Form. The golem can't shape-shift.

Magic Resistance. The golem has Advantage on saving throws against spells and other magical effects.

Actions

Multiattack. The golem makes two Slam attacks.

Slam. Melee Attack Roll: +8, reach 5 ft. 27 (5d8 + 5) Bludgeoning damage.

Splintering Thrust (Recharge 5-6). The golem begins gathering destructive power, its whole frame tensing until the start of its next turn — when the power erupts. Dexterity Saving Throw: DC 16, each creature within 15 feet of the golem at that moment. Failure: 32 (5d12) Piercing damage. Success: Half damage.

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

- Traits/Lightning Absorption — the chassis
- Traits/Immutable Form — the chassis
- Traits/Magic Resistance — the chassis
- Actions/Multiattack — the chassis
- Actions/Slam — the chassis
- Actions/Splintering Thrust — template wind-up; library draw (seed unstamped); binds the GM's words: build

**Engine trace**

```
[path] homebrew — "a siege-engine golem of lashed timber that shoulders through walls" (call)
[route] brute-juggernaut type=Construct mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | brute-juggernaut: ✓ ("siege-engine golem of lashed timber that") | brute-juggernaut: no line key in the words — the model's read of its quote
[concept] name: provided_name rejected — "a siege-engine golem of lashed timber th…" is the description, not a name
[concept] hints: golem→canon ✓ ("a siege-engine golem of lashed timber")
[concept] resolve: archetype=brute type=Construct themes=forged/terror mind=mindless style=juggernaut energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: lashed timber body [body] | shoulders through walls on a battering-ram charge [behavior] | siege-engine made to break fortifications [object]
[concept] identity: A ramshackle colossus of lashed and pegged timber, the siege golem opens a fight by simply walking forward — through the door, through the wall, through whatever stands between it and the breach. Every round after that is a battering-ram charge: it lowers its log-built shoulder and slams, splintering stone and bone alike, then pivots and does it again. Under pressure it does not flee or slow; it fights to the death with the indifferent stubbornness of a machine that has never once been told to stop.
[concept] lore: Built by a forgotten army from felled forest and iron pegs to break fortress walls, this siege-golem still grinds toward a muster ground that fell centuries ago, battering down any wall that dares stand on its road.
[reskin] donor: brute-5-juggernaut -> CR 8
[reskin] [path] decides: homebrew (the matcher would have said twist Clay Golem)
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline declared: "the golem" — the call's own answer (kind), built from the name
[reskin] inline form: "the golem" — the model's own reading of the name
[reskin] save dc derived: DC 15 -> 16 (8 + PB 3 + the sheet's best 5) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] asked field dropped: the call answered limit "at_will" for "shoulders through walls" but offered no quote
[reskin] clauses: "a siege-engine golem of lashed timber" -> has (descriptive), head | "shoulders through walls" -> has (mechanical) [asked: attack]
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The golem lowers its log shoulder and charges in a straight line toward a point it can see, splintering through everything on the way. Creatures and even walls caught in its path are battered aside as it plows past, and the charge ends in a grinding impact that shoves the nearest thing in front of it out of the way. It can only build up this head of steam once its target is far enough ahead to be " [action/always/movement] — menu: leap, throw-retrieve, shield-bash, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up (+ shelf: second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, stunning-strike, charge-push, hook-rider, pounce)
[reskin] signature bound to the concept's verb: action — own-turn-punisher (lash)
[reskin] value check: "Splintering Charge (Recharge 5-6)" EV 49.6 vs floor 45.6 (the whole Multiattack (2 attacks)) — worth the trade
[reskin] signature template: wind-up -> Actions/"Splintering Charge (Recharge 5-6)" ("the golem lowers its shoulder and builds a head of steam charging in a straight  [verb: build:idea]")
[reskin] signature idea (trait): "Its body is a cage of pegged timbers, so blows that crack a beam only wedge the whole frame tighter. Whenever a hit would stagger it, the golem locks up and grinds forward a step instead, refusing to give ground until the timber is finally torn apart." [trait/on_being_hit/movement] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] word match declined by the call: bloodied-burst, aberrant-ground — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "Its body is a cage of pegged timbers, so blows that crack a beam only wedge the whole frame tighter. Whenever a hit would stagger it, the golem locks up and grinds forward a step instead, refusing to give ground until the timber is finally torn apart." [trait/on_being_hit/movement] — the model found no template that holds it (offered: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge, aberrant-ground)
[reskin] weapons answered: Slam = none
[reskin] languages by body: a trap-line Construct with no voice in the concept
[reskin] immunities stamped for type: Construct -> Lightning, Poison; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned
[reskin] name follows content: Actions/"Splintering Charge" promises movement the row never delivers — "Splintering Thrust" (the call's modifier kept, the claim word swapped for a noun the row earns)
audit finding below confidence gate: Lightning Absorption The golem's Speed is 30 ft. with no trait granting it a movement mode beyond walking, yet the absorbed Lightning could arguably justify flight — no, this is a fabricated finding; strike it.
```


---


### Brass Tyrant — bands soft

**Concept:** a tyrant of burning brass who rules a city of forges

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Brass Tyrant | 17 | brute-17-juggernaut | ok | SOFT: hot-offense | ok | ok | ok | ok | ok | ok | ok | ok |

- bands · soft · hot-offense: offense alone reads CR 22, 5 over; the HP axis pulls the read to 17.5
- read: def 13 / off 22 → 17.5; sustained 170 (2 × Slab Hand + legendary Tyrant's Stride); nova Furnace Blast 72; dmg 170

```
Brass Tyrant

Huge Construct, Neutral Evil

AC 19
Initiative -1 (9)

HP 230 (20d12 + 100)

Speed 30 ft.

MOD
SAVE
STR
22
+6
+12
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
20
+5
+11
CHA
4
-3
-3

Skills Athletics +12, Perception +6

Resistances Fire

Immunities Poison; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned

Senses darkvision 60 ft.; Passive Perception 16

Languages Common

CR 17 (XP 18,000; PB +6)

Traits

Molten Retort. A creature that touches the tyrant or hits it with a melee attack while within 5 feet of it takes 10 (3d6) Fire damage.

Legendary Resistance (3/Day). If the tyrant fails a saving throw, it can choose to succeed instead.

Immutable Form. The tyrant can't shape-shift.

Siege Monster. The tyrant deals double damage to objects and structures.

Actions

Multiattack. The tyrant makes two Slab Hand attacks.

Slab Hand. Melee Attack Roll: +12, reach 10 ft. 20 (4d6 + 6) Bludgeoning damage plus 14 (4d6) Fire damage.

Furnace Blast (Recharge 5-6). Wisdom Saving Throw: DC 19, each creature in a 30-foot Cone. Failure: 72 (16d8) Fire damage, and the target has the Frightened condition until the end of its next turn. Success: Half damage only.

Legendary Actions

Legendary Action Uses: 3. Immediately after another creature's turn, the tyrant can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.

Tyrant's Stride. The tyrant moves up to half its Speed without provoking Opportunity Attacks, and it makes one Slab Hand attack.

Bulldoze Advance. The tyrant moves up to half its Speed without provoking Opportunity Attacks. During this movement, it can move through Large or smaller objects and structures, destroying them.

Molten Heel. Strength Saving Throw: DC 19, each creature within 10 feet of the tyrant. Failure: The target has the Prone condition.

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

- Traits/Molten Retort — template heated-body; library draw (seed unstamped); binds the GM's words: burn+brass+molten+touch+furnace+fire
- Traits/Legendary Resistance — the chassis
- Traits/Immutable Form — the chassis
- Traits/Siege Monster — the chassis
- Actions/Multiattack — the chassis
- Actions/Slab Hand — the chassis
- Actions/Furnace Blast — the chassis
- Legendary Actions/Legendary Action Uses: 3 — the chassis
- Legendary Actions/Tyrant's Stride — the chassis
- Legendary Actions/Bulldoze Advance — the chassis
- Legendary Actions/Molten Heel — the chassis

**Engine trace**

```
[path] homebrew — title tyrant — "a tyrant of burning brass who rules a city of forges" (call)
[route] brute-juggernaut type=Construct mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | brute-juggernaut: ✓ ("a tyrant of burning brass") | brute-juggernaut: no line key in the words — the model's read of its quote
[concept] name: provided_name rejected — "a tyrant of burning brass who rules a ci…" is the description, not a name
[concept] resolve: archetype=brute type=Construct themes=forged/fiendish mind=sapient style=juggernaut energy=Fire mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: burning brass body that swallows victims in a furnace grip [body] | tyrant of a forge-city, demanding tribute and obedience [behavior] | striding through its own gates at the head of a forge host [behavior]
[concept] identity: The Brass Tyrant opens by striding through the forge-gate at the head of its smoke-choked host, each footfall caving the flagstones as it grinds lesser foes beneath molten heel. Every round thereafter it wades into the thickest press, swinging slab hands and clamping victims in white-hot grip to press them against its glowing furnace chest until the brass runs. When bloodied it does not retreat but locks down into a bulldozing advance, refusing to yield an inch of its forge-city and dragging whatever remains of the fight down with it.
[concept] lore: Poured in the first crucible of the forge-city and crowned by the smiths who feared their own fires, it rules now as a tyrant of burning brass, demanding tribute in iron and swallowing rebels into its furnace body so the city may never cool.
[reskin] donor: brute-17-juggernaut -> CR 17
[reskin] [path] decides: homebrew (the matcher agrees)
[reskin] name_element answered: Furnace Blast = literal; White-Hot Grip = literal; Molten Heel = literal
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline declared: "the tyrant" — the call's own answer (kind), built from the name
[reskin] inline form: "the tyrant" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a tyrant of burning brass" -> has (descriptive), head | "rules a city of forges" -> has (descriptive)
[reskin] menu pruned: action — push-prone, thrown-burst-seed (the sheet cannot render them)
[reskin] signature idea (action): "The tyrant wrenches open a seam in its furnace chest and roars its inner heat outward as a standing wall of brass-fire that hangs in the air before it, searing anyone who tries to push through or stand near it. The wall answers the tyrant's command, parting for its own servants and its own advance, so foes cannot use it as cover and the tyrant can march the blaze forward like a moving barricade." [action/always/damage] — menu: condition-payoff, shield-bash, escalating-dread, terror-pulse, herd, drain, exploiter (+ shelf: second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, stunning-strike, charge-push, hook-rider, pounce)
[reskin] word match declined by the call: terror-pulse, herd, own-turn-punisher, rally, condition-payoff, shield-bash, escalating-dread, drain, exploiter — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit"
[reskin] signature miss: action — "The tyrant wrenches open a seam in its furnace chest and roars its inner heat outward as a standing wall of brass-fire that hangs in the air before it, searing anyone who tries to push through or stand near it. The wall answers the tyrant's command, parting for its own servants and its own advance, so foes cannot use it as cover and the tyrant can march the blaze forward like a moving barricade." [action/always/damage] — the model found no template that holds it (offered: condition-payoff, shield-bash, escalating-dread, terror-pulse, herd, drain, exploiter, own-turn-punisher, rally)
[reskin] fallback respects the call: condition-payoff, escalating-dread, terror-pulse, herd, exploiter, own-turn-punisher left the shelf — the call declined them for this sheet
[reskin] fallback skipped: push-prone (the sheet cannot render it)
[reskin] value check: "Disarming Twist" EV 0 vs floor 18.2 (one attack of 2) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Disarming Twist" — a seed that cannot be lifted does not ship
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "Brass remembers every blow. Each time a weapon or body strikes the tyrant, a thin film of molten brass clings to the attacker, and that film hardens wherever the tyrant's fire next touches them — so those who trade blows with it are slowly welded into place for the furnace to claim." [trait/on_being_hit/condition] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] signature bound to the concept's verb: trait — heated-body (burn, brass)
[reskin] signature template (trait): heated-body -> Traits/"Molten Retort" ("Each time a weapon or body strikes the tyrant, molten brass clings to the attack [verb: burn:concept, brass:concept, molten:idea, touch:idea, furnace:idea, fire:idea]")
[reskin] weapons answered: Slab Hand = none; Furnace Blast = none
[reskin] chassis nova: "Furnace Blast (Recharge 5-6)" — the brute-17-juggernaut's own nova row (its "Area Nova", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] immunities stamped for type: Construct -> Poison; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned
[reskin] resistances derived: Fire
[reskin] vulnerability rejected — "Cold" has no warrant in the concept's own text (print's default is none)
[reskin] save re-derived after a retype: Actions/Furnace Blast — a Constitution save for an effect that calls for Wisdom or Charisma; the save follows the condition
audit finding below confidence gate: Molten Heel Not a defect; Prone carries its own exit (standing up) per calibration.
```


---


### Swarm of Vesper Chimes — bands soft

**Concept:** a swarm of funeral bells that ring themselves over the dying

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Swarm of Vesper Chimes | 13 | swarm-9 | ok | SOFT: hot-offense | ok | ok | ok | ok | ok | ok | ok | ok |

- bands · soft · hot-offense: offense alone reads CR 17, 4 over; the HP axis pulls the read to 13.5
- read: def 10 / off 17 → 13.5; sustained 90 (1 × Tolling Clapper); nova Funeral Peal 67; dmg 105

```
Swarm of Vesper Chimes

Medium Swarm of Tiny Undead, Neutral

AC 15
Initiative +5 (15)

HP 178 (21d8 + 84)

Speed 40 ft., Fly 30 ft. (hover)

MOD
SAVE
STR
8
-1
-1
INT
4
-3
-3
MOD
SAVE
DEX
20
+5
+5
WIS
10
+0
+0
MOD
SAVE
CON
18
+4
+4
CHA
2
-4
-4

Resistances Bludgeoning, Piercing, Slashing

Immunities Poison; Charmed, Exhaustion, Frightened, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained, Stunned

Senses blindsight 60 ft. (blind beyond this radius); Passive Perception 10

Languages Common plus the languages it knew in life

CR 13 (XP 10,000; PB +5)

Traits

Funeral Peal. The swarm explodes when it dies. Dexterity Saving Throw: DC 17, each creature in a 30-foot Emanation originating from the swarm. Failure: 67 (15d8) Necrotic damage. Success: Half damage. The explosion destroys the swarm's body.

Swarm. The swarm can occupy another creature's space and vice versa, and the swarm can move through any opening large enough for a Tiny creature. The swarm can't regain Hit Points or gain Temporary Hit Points.

Actions

Tolling Clapper. Melee Attack Roll: +10, reach 5 ft. 54 (11d8 + 5) Bludgeoning damage plus 36 (8d8) Necrotic damage, or 27 (6d8) Bludgeoning damage plus 18 (4d8) Necrotic damage if the swarm is Bloodied.

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

- Traits/Funeral Peal — template death-burst; library draw (seed unstamped); the GM's clause "ring themselves over the dying"; binds the GM's words: dying+death
- Traits/Swarm — the chassis
- Actions/Tolling Clapper — the chassis

**Engine trace**

```
[path] homebrew — "a swarm of funeral bells that ring themselves over the dying" (call)
[route] swarm type=Undead mechanics=aura — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: on the GM's own words "a swarm of funeral bells" | holds: the call reads none in these words | swarm: ✓ ("a swarm of funeral bells") | swarm: no line key in the words — the model's read of its quote
[concept] name: provided_name rejected — "a swarm of funeral bells that ring thems…" is the description, not a name
[concept] hints: swarm→body ✓ ("a swarm of funeral bells")
[concept] resolve: archetype=swarm type=Undead themes=grave/uncanny mind=sapient style=— energy=Necrotic mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: aura
[concept] signature elements: self-ringing funeral bells [body] | crowding over the dying [behavior] | the death-knell aura that drains the failing [aura]
[concept] identity: A drifting murder of tarnished funeral bells gathers in a slow, chiming cloud above the dying, ignoring the living until a creature's heart begins to fail. Every round it settles lower and rings in answer to the failing pulse beneath it, its peel dragging the victim's breath and warmth away as the bells press close, and once it is bloodied it scatters into two smaller rings that harry the fallen from either side until the last heartbeat is spent. It does not flee; it has no interest in the healthy, only in finishing whatever is already dying.
[concept] lore: These bells are the discarded clappers and castings of a hundred plague-time funerals, bound together by the grief of those buried without rites, and they gather over the dying to ring them a service no one else would give.
[reskin] body type: swarm — the body outranks the role (recorded: swarm)
[reskin] donor: swarm-9 -> CR 13 (invented — no printed peer)
[reskin] [path] decides: homebrew (the matcher agrees)
[reskin] swarm name stamped: "Vesper Chime" -> "Swarm of Vesper Chimes" — print names all seven of its swarms "Swarm of X", and the rules text says "the swarm"
[reskin] swarm type stamped: Undead -> Swarm of Tiny Undead
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline by rule: "the swarm" — the call answered "the chime" (kind), which the name does not support
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a swarm of funeral bells" -> has (descriptive), head | "ring themselves over the dying" -> has (descriptive)
[reskin] menu pruned: action — obstacle-pull, pacify, escalating-dread, terror-pulse, snare-bolt, slow-bolt, sensory-strike, disarm, thrown-burst-seed, drain, zone-seed, blighted-ground, delayed-brand, aggro-curse, self-invisibility, focus, feint-slip, coating, phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The swarm picks out one creature whose life is visibly slipping away and rings for it alone, settling over it in a slow crowding spiral. That creature's wounds won't close while the bells hang above it and its breath keeps thinning; the ringing follows it even as it tries to pull away from the cloud, and the swarm drifts after it in preference to any healthy thing nearby. The attention ends the mo" [action/always/condition] — menu: trample, thrown-burst, gaze-single, snare, execute, seal, shield-bash, wail, lure, active-toll, random-ray, ground-burst, spew (+ shelf: patient-defense, second-wind, riposte, stunning-strike, charge-push, hook-rider, pounce, isolation, charge)
[reskin] signature bound to the concept's verb: action — active-toll (ring, bell)
[reskin] word match declined by the call: active-toll, execute, wail — the key word does not mean the mechanic here
[reskin] signature miss: action — "The swarm picks out one creature whose life is visibly slipping away and rings for it alone, settling over it in a slow crowding spiral. That creature's wounds won't close while the bells hang above it and its breath keeps thinning; the ringing follows it even as it tries to pull away from the cloud, and the swarm drifts after it in preference to any healthy thing nearby. The attention ends the mo" [action/always/condition] — the model picked "seal" (no verb, and it quotes nothing the GM typed) over a concept-verb template (active-toll)
[reskin] signature idea (trait): "The bells ring themselves in answer to a failing heartbeat — any creature near death within earshot is drawn into their peal, and the swarm always lowers itself toward that creature, drifting over the dying even when a healthy foe stands between. It simply has no interest in anything whose heart still beats strongly." [trait/always/movement] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature bound to the concept's verb: trait — bloodied-burst (ring, bell, dying, the dying)
[reskin] word match declined by the call: bloodied-burst, resonant-body, false-appearance — the key word does not mean the mechanic here
[reskin] signature template (trait): death-burst -> Traits/"Funeral Peal" ("The bells are funeral bells that come into their own at dying and death — the mo [verb: dying:concept, death:idea]")
[reskin] weapons answered: Tolling Clapper = none
[reskin] languages by mind: "None" -> "Common plus the languages it knew in life" (sapient)
[reskin] immunities stamped for type: Swarm of Tiny Undead + donor suite -> Poison; Charmed, Exhaustion, Frightened, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained, Stunned
[reskin] resistances derived: Bludgeoning, Piercing, Slashing
[reskin] nova capped: Traits/Funeral Peal — 91 over the CR 13 ceiling 67, dice to 67 (15d8)
[reskin] row binds its clause: "Funeral Peal" answers "ring themselves over the dying" — the keys it matched came from that clause, so the coverage credit has a receipt
[reskin] audit rewrite blocked — "Funeral Peal" is engine-authored chassis text
```


---


### Kkresh — bands soft

**Concept:**  | role: brute

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Kkresh | 4 | brute-5-grappler | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 2.5 (print at 4 reads 1–6, n=66)
- **dropped clause:** "It is possessed of alien genius (INT 17-20)"
- read: def 1 / off 4 → 2.5; sustained 26 (2 × Jaw); nova Brine Burst 22; dmg 32

```
Kkresh

Medium Monstrosity, Chaotic Evil

AC 14
Initiative -1 (9)

HP 82 (11d8 + 33)

Speed 30 ft., Swim 30 ft.

MOD
SAVE
STR
18
+4
+6
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

Skills Athletics +6, Perception +2

Senses darkvision 60 ft.; Passive Perception 12

Languages None

CR 4 (XP 1,100; PB +2)

Actions

Multiattack. The kkresh makes two attacks, using Jaw or Watching Them Flail in any combination.

Jaw. Melee Attack Roll: +6, reach 5 ft. 13 (2d8 + 4) Acid damage. If the target is a Medium or smaller creature, it has the Grappled condition (escape DC 14).

Watching Them Flail. Melee Attack Roll: +6, reach 5 ft. 13 (2d8 + 4) Bludgeoning damage, and the target has Disadvantage on its next attack roll before the start of the kkresh's next turn.

Brine Burst (Recharge 5-6). Dexterity Saving Throw: DC 13, each creature in a 10-foot Emanation originating from the kkresh. Failure: 22 (5d8) Acid damage. Success: Half damage.

Bonus Actions

Swallow. The kkresh swallows one Medium or smaller creature it is grappling. While swallowed, the target has the Blinded and Restrained conditions, has Total Cover against attacks and other effects outside the kkresh, and takes 6 (1d12) Acid damage at the start of each of the kkresh's turns. The kkresh can have only one creature swallowed at a time. If the kkresh takes 12 damage or more in a single turn from the swallowed creature, the kkresh must regurgitate the target at the end of that turn, and the target exits Prone in an unoccupied space within 5 feet of the kkresh. If the kkresh dies, a swallowed creature exits the body Prone by using 5 feet of movement.

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
- Actions/Jaw — authored for this sheet; a named part; the GM's clause "whips forth to sting flesh with a needle-jaw that weeps black acid"
- Actions/Watching Them Flail — authored for this sheet; a named part; a declared feature; the GM's clause "rudders with sneaky clever knots to drag victims under for the sport of watching them flail"; weapon flail
- Actions/Brine Burst — template ground-burst; library draw (seed unstamped); binds the GM's words: burst
- Bonus Actions/Swallow — the GM's clause "rather than devour it hooks lines"; binds the GM's words: swallow+swallows+engulf+engulfs+devour+devours+gulp+smother+entomb+cocoon+whelm

**Engine trace**

```
[path] blank — "role: brute" (code)
[route] brute-grappler type=Monstrosity mechanics=grapple, engulf, breath, snare — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | brute-grappler: ✓ ("hooks lines and rudders with sneaky clev") | brute-grappler: no line key in the words — the model's read of its quote
[concept] synthesis (blank roll): archetype=brute type=Monstrosity themes=aquatic/fiendish mind=sapient style=grappler lore=✓
[concept] synthesis text: A knife-thin eel of black abyssal blood, its rope-like body braided from writhing vascular fibers that root it to the seafloor even as its sinew-wrapped head coils and puzzles at every shine and shadow, this is a thinking hunter that carries its own acid wellspring in the cold brine of its veins. It opens by circling a boat or swimmer just beneath the surface, then whips forth to sting flesh with a needle-jaw that weeps black acid, and rather than devour it hooks lines and rudders with sneaky clever knots to drag victims under for the sport of watching them flail. When truly bloodied it vents a cloud of acid into the water and retreats laughing in clicks and whistles, scheming to return — it will toy with prey and rarely commit to a kill it cannot make a game of. It is possessed of alien genius (INT 17-20), and it is a curious trickster, more mischief than malice.
[concept] signature elements: acid-veined black blood [body] | acid stinger bite [behavior] | sneaky knotted traps [behavior]
[concept] name proposal: Acid Vessel Eel
[concept] lore: Spun from the black fiber-veins that grow in the deepest ocean-floor vents of the lower planes, it seeks out cunning new cages and contraptions to steal, knot, and turn against the clever land-things it despises.
[reskin] donor: brute-5-grappler -> CR 4
[reskin] [path] decides: blank (the matcher would have said homebrew)
[reskin] engine interior scaled — CR 4 sits below the brute-5-grappler seat
[reskin] named parts: Jaw (slot, Grappled), Watching Them Flail (clone) — the user's words, the engine's numbers
[reskin] named parts landed: 2 attack row(s), 0 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] class kit: none — the blank path takes no class kit
[reskin] inline declared: "the kkresh" — the call's own answer (kind), built from the name
[reskin] inline form: "the kkresh" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] lacks not claimed: "rarely commit to a kill it cannot make a game of" reads like a lack to the words, and the call's list did not name it
[reskin] clauses: "A knife-thin eel of black abyssal blood" -> has (descriptive), head | "its rope-like body braided from writhing vascular fibers that root it to the seafloor even as its sinew-wrapped head coi" -> has (descriptive) | "puzzles at every shine and shadow" -> has (descriptive) | "this is a thinking hunter that carries its own acid wellspring in the cold brine of its veins" -> has (descriptive) | "It opens by circling a boat or swimmer just beneath the surface" -> has (descriptive) | "whips forth to sting flesh with a needle-jaw that weeps black acid" -> has (mechanical) [asked: attack] | "rather than devour it hooks lines" -> has (mechanical) [asked: condition] | "rudders with sneaky clever knots to drag victims under for the sport of watching them flail" -> has (mechanical) [asked: condition] | "When truly bloodied it vents a cloud of acid into the water" -> has (mechanical) [asked: when_bloodied/save_area] | "retreats laughing in clicks and whistles" -> has (descriptive) | "scheming to return — it will toy with prey" -> has (descriptive) | "rarely commit to a kill it cannot make a game of" -> has (descriptive) | "It is possessed of alien genius (INT 17-20)" -> has (mechanical) | "it is a curious trickster" -> has (descriptive) | "more mischief than malice" -> has (mechanical) [asked: condition]
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "When the kkresh strikes a creature with its acid jaw, it doesn't let go of the wound quietly: a hissing cloud of black brine-acid bursts from the punctured flesh, scalding everything pressed close around the victim. This only happens when it lands a bite on someone it is not already swallowing; the kkresh hangs on for a moment as the cloud blooms, so the acid burns the victim and anything crowded " [rider/on_hit/damage] — menu: charge-push, hook-rider, pounce (+ shelf: leap, condition-payoff, shield-bash, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, exploiter, slow-bolt, zone-seed, reveal, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, riposte)
[reskin] signature bound to the concept's verb: action — hook-rider (hook, hooks, drag, drags)
[reskin] word match declined by the call: hook-rider — the key word does not mean the mechanic here
[reskin] value check: "Brine Burst (Recharge 5-6)" EV 34.1 vs floor 23.7 (the whole Multiattack (2 attacks)) — dice 14 → 22 (nova budget)
[reskin] signature template: ground-burst -> Actions/"Brine Burst (Recharge 5-6)" ("the acid cloud bursts from the punctured flesh and scalds everything pressed clo [verb: burst:idea]")
[reskin] signature idea (trait): "The thing's veins are knotted cords of cold abyssal brine, and any weapon that cuts it snags and drags free a spray of acid-black blood that clings and burns the attacker. It cannot help this; every wound it takes spits back at whoever dealt it." [trait/on_being_hit/damage] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst, assassinate)
[reskin] signature bound to the concept's verb: trait — aberrant-ground (brine, roots, writhing)
[reskin] word match declined by the call: heated-body — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit" after being shown aberrant-ground, which the GM's words keyed
[reskin] key match declined: trait — "aberrant-ground" was ranked first on the call's own menu for brine+roots+writhing, and the call read it as no fit; the words keep their claim and nothing is forced
[reskin] signature miss: trait — "The thing's veins are knotted cords of cold abyssal brine, and any weapon that cuts it snags and drags free a spray of acid-black blood that clings and burns the attacker. It cannot help this; every wound it takes spits back at whoever dealt it." [trait/on_being_hit/damage] — the model found no template that holds it (offered: aberrant-ground, heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge, bloodied-fury)
[reskin] concept-first trait skipped: aberrant-ground — the GM's words key it, but the call was offered it against those words and declined
[reskin] repair: 2 clause(s) with no row — "It is possessed of alien genius (INT 17-20)", "more mischief than malice"; one targeted call with the sheet as context
[reskin] repair: the answer held no rows — the clauses stay unplaced
[reskin] weapons answered: Needle Jaw = none
[reskin] languages held: None stands — INT 4 on a Monstrosity speaks nothing, whatever the mind read said
[reskin] row binds its clause: "Swallow" answers "rather than devour it hooks lines" — the keys it matched came from that clause, so the coverage credit has a receipt
[reskin] asked but unanswered: "When truly bloodied it vents a cloud of acid into the water" asked for when_bloodied and no row binds the clause
audit finding below confidence gate: Multiattack Multiattack refers to an entry named 'Watching Them Flail', but no such entry exists; the action in the block is named 'Watching Them Flail.' It does exist... actually it's named 'Watching Them Flail.' The entry name is 'Watching Them Flail.' Reading the block: '***Watching Them Flail.***' — that is the name. So no mismatch. Discard.
```


---


### Air Elemental — in the run

**Concept:** name: Air Elemental | that carries stolen voices

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Air Elemental | 5 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 5 / off 5 → 5; sustained 28 (2 × Thunderous Slam); nova Whirlwind 24; dmg 28

```
Air Elemental

Large Elemental, Neutral

AC 15
Initiative +5 (15)

HP 90 (12d10 + 24)

Speed 10 ft., Fly 90 ft. (hover)

MOD
SAVE
STR
14
+2
+5
INT
6
-2
-2
MOD
SAVE
DEX
20
+5
+5
WIS
10
+0
+0
MOD
SAVE
CON
14
+2
+5
CHA
6
-2
-2

Skills Athletics +5, Perception +3

Resistances Bludgeoning, Lightning, Piercing, Slashing

Immunities Poison, Thunder; Exhaustion, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained, Unconscious

Senses darkvision 60 ft.; Passive Perception 13

Languages Primordial (Auran)

CR 5 (XP 1,800; PB +3)

Traits

Air Form. The air elemental can enter a creature's space and stop there. It can move through a space as narrow as 1 inch without expending extra movement to do so.

Actions

Multiattack. The air elemental makes two Thunderous Slam attacks.

Thunderous Slam. Melee Attack Roll: +8, reach 10 ft. 14 (2d8 + 5) Thunder damage.

Whirlwind (Recharge 4-6). Strength Saving Throw: DC 13, one Medium or smaller creature in the air elemental's space. Failure: 24 (4d10 + 2) Thunder damage, and the target is pushed up to 20 feet straight away from the air elemental and has the Prone condition. Success: Half damage only.

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
- Actions/Thunderous Slam — print's own row, renamed
- Actions/Whirlwind — print's own row
- Traits/Air Form — print's own row

**Engine trace**

```
[path] twist — Air Elemental (is) — "Name field: Air Elemental" (code)
[route] brute-juggernaut type=Elemental mechanics=aura — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | brute-juggernaut: ✓ ("Air Elemental") | brute-juggernaut: no line key in the words — the model's read of its quote
[concept] name: "Air Elemental" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] resolve: archetype=brute type=Elemental themes=elemental/voice mind=sapient style=juggernaut energy=Thunder mix=both identity=✓ lore=✓
[concept] name: provided "Air Elemental"
[concept] mechanics: aura
[concept] signature elements: stolen voices as psychic wails [behavior] | howling column of wind [body] | engulfing foes to steal their voice [behavior]
[concept] identity: It opens a fight as a howling column of shrieking wind, striking with fists of compressed air that carry the stolen voices of the dead as a psychic wail. Every round it lashes out with thunderous gusts and tries to engulf a foe in its body to steal their voice, adding it to its cacophony. Under pressure it fights to the death, never fleeing, because it has no concept of self-preservation—only the endless hunger to collect more voices.
[concept] lore: An air elemental born from the last breaths of a battlefield, it drifts across the wastes gathering the dying words of the fallen, longing to hear a voice that answers back.
[reskin] print canon route: the Air Elemental's body outranks the juggernaut seat — no verb in the words names it; the plain brute line
[reskin] print canon defenses: HP 89 -> 90, AC 14 -> 15 — the Air Elemental's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 14, DEX 20, CON 14, INT 6, WIS 10, CHA 6 — the Air Elemental's at its own CR; attack +6 -> +8, DC 13 (print's)
[reskin] donor: brute-5 -> CR 5
[reskin] [path] decides: twist on the Air Elemental (the matcher agrees)
[reskin] print canon: "Air Elemental — that carries stolen voices" heads on the Air Elemental — print's rows ride along; the seat stays
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline by rule: "the air elemental" — the call answered "the air elemental" (kind), which the name does not support
[reskin] inline form: "the air elemental" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Air Elemental —" -> has (descriptive), head | "carries stolen voices" -> has (descriptive)
[reskin] signature idea (action): "The elemental lunges to wrap a foe inside its howling body, wind clawing at their throat. A creature caught this way has its voice torn away and added to the elemental's chorus — it cannot speak or cry out, and each voice it has stolen feeds the elemental's psychic wail, so the more voices it holds, the harder its fists shriek when they land. The stolen voice returns only when the elemental is des" [action/save/condition] — menu: trample, leap, shield-bash, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up (+ shelf: rampage, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, stunning-strike, charge-push, hook-rider, pounce, charge)
[reskin] word match declined by the call: drain, wind-up, terror-pulse — the key word does not mean the mechanic here
[reskin] pick kept on the GM's own words: action — "active-toll" has no key-table verb, but the call quotes "that carries stolen voices" from the description
[reskin] fit declined: "Stolen Chorus (Recharge 5-6)" — a print body takes only what the user's words ask; the call quotes "that carries stolen voices", which is no unanswered twist clause — a head, a header, a lack, or a clause the GM's own weapon already answers (the blacksmith's rally, critic-ten 2026-10-01)
[reskin] fallback respects the call: terror-pulse left the shelf — the call declined it for this sheet
[reskin] fallback stands down: the twist path has no shelf — the Air Elemental's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "The elemental is a howling column of wind rather than a solid body, so its form screams with every stolen voice at once. Any creature that starts its turn within the swirling wind around the elemental hears that chorus and is shaken by it, and the wailing grows louder and more disorienting as the elemental collects more voices." [trait/start_of_turn/condition] — menu: fire-aura, warded-mending (+ shelf: heated-body, false-appearance, absorption, bloodied-burst, resonant-body, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, weapon-lodge, death-burst)
[reskin] signature bound to the concept's verb: trait — mimicry (stolen voice, stolen voices, voices)
[reskin] word match declined by the call: mimicry — the key word does not mean the mechanic here
[reskin] trait declined: "Noxious Aura" — a print body takes only what the user's words ask; the call quotes "carries stolen voices", which is no unanswered twist clause — a head, a header, a lack, or a clause the GM's own weapon already answers
[reskin] weapons answered: Gale Fist = none
[reskin] languages by mind: "None" -> "Primordial" (sapient)
[reskin] print canon size: Medium -> Large — the Air Elemental's
[reskin] print canon languages: "Primordial" -> "Primordial (Auran)" — the Air Elemental's
[reskin] print canon speed: 40 ft. -> 10 ft. — the Air Elemental's walk; the concept's other modes stay
[reskin] print canon speed: Fly -> 90 ft. — the Air Elemental's own
[reskin] print canon attack: "Gale Fist" -> "Thunderous Slam" — the Air Elemental's own row
[reskin] immunities stamped for type: Elemental -> Poison; Exhaustion, Poisoned
[reskin] print canon defenses: immunities Poison; Exhaustion, Poisoned -> Poison, Thunder; Exhaustion, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained, Unconscious; resistances none -> Bludgeoning, Lightning, Piercing, Slashing — the Air Elemental's own header lines
[reskin] print canon trait: Air Form — "Air Elemental — that carries stolen voices" is the Air Elemental (print's own row)
[reskin] print canon row: Actions/Whirlwind (Recharge 4-6) — the Air Elemental's own
[reskin] audit rename blocked — "Air Form" is the user's own part name, a kit feature's real name, or print's own row
```


---


### Stone Golem — in the run

**Concept:** name: Stone Golem | carved as a weeping saint

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Stone Golem | 10 | brute-9 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 11 / off 9 → 10; sustained 48 (2 × Slam); nova none; dmg 48

```
Stone Golem

Large Construct, Unaligned

AC 18
Initiative -1 (9)

HP 220 (21d10 + 105)

Speed 30 ft.

MOD
SAVE
STR
22
+6
+10
INT
3
-4
-4
MOD
SAVE
DEX
9
-1
-1
WIS
11
+0
+0
MOD
SAVE
CON
20
+5
+9
CHA
1
-5
-5

Skills Athletics +10, Perception +4

Immunities Poison, Psychic; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned

Senses darkvision 120 ft.; Passive Perception 14

Languages Understands Common plus two other languages but can't speak

CR 10 (XP 5,900; PB +4)

Traits

Immutable Form. The stone golem can't shape-shift.

Magic Resistance. The stone golem has Advantage on saving throws against spells and other magical effects.

Actions

Multiattack. The stone golem makes two attacks, using Slam or Force Bolt in any combination.

Slam. Melee Attack Roll: +10, reach 5 ft. 15 (2d8 + 6) Bludgeoning damage plus 9 (2d8) Force damage.

Force Bolt. Ranged Attack Roll: +9, range 120 ft. 22 (4d10) Force damage.

Bonus Actions

Slow (Recharge 5-6). The stone golem casts the Slow spell, requiring no spell components and using Constitution as the spellcasting ability (spell save DC 17).

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
- Actions/Slam — print's own row, renamed
- Actions/Force Bolt — print's own row, renamed; weapon crossbow
- Traits/Immutable Form — print's own row
- Traits/Magic Resistance — print's own row
- Bonus Actions/Slow — print's own row

**Engine trace**

```
[path] twist — Stone Golem (is) — "Name field: Stone Golem" (code)
[route] brute-juggernaut type=Construct mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | brute-juggernaut: ✓ ("carved as a weeping saint") | brute-juggernaut: no line key in the words — the model's read of its quote
[concept] name: "Stone Golem" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] hints: golem→canon ✓ ("carved as a weeping saint")
[concept] resolve: archetype=brute type=Construct themes=grave/forged mind=sapient style=juggernaut energy=Cold mix=both identity=✓ lore=✓
[concept] name: provided "Stone Golem"
[concept] mechanics: none claimed
[concept] signature elements: weeping tears of cold grief [body] | carved saint's sorrowful visage [body] | relentless shrine-guarding judgement [behavior]
[concept] identity: The Weeping Saint opens by advancing without pause, stone fists and dragging, blessing-soaked robes crushing whatever stands in its path, tears of cold grief streaming from its carved sorrow. Each round it grinds forward through walls and ranks alike, striking with heavy fists and letting its frozen tears fall on nearby foes, unmovable by anything short of shattering it. Immune to reshaping and deaf to reason, it fights to the death in silent, sorrowful duty until reduced to rubble.
[concept] lore: Carved by a grief-mad sculptor to guard a shrine to a forgotten martyr, the Weeping Saint animates only when its consecrated ground is profaned, walking the old stone road to crush the impious with stone hands and freezing tears.
[reskin] print canon route: the Stone Golem's body outranks the juggernaut seat — no verb in the words names it; the plain brute line
[reskin] print canon defenses: HP 182 -> 220, AC 15 -> 18 — the Stone Golem's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 22, DEX 9, CON 20, INT 3, WIS 11, CHA 1 — the Stone Golem's at its own CR; attack +9 -> +10, DC 17 (print's)
[reskin] donor: brute-9 -> CR 10
[reskin] [path] decides: twist on the Stone Golem (the matcher agrees)
[reskin] print canon: "Stone Golem — carved as a weeping saint" heads on the Stone Golem — print's rows ride along; the seat stays
[reskin] alignment by body: Neutral -> Unaligned — a Construct at INT 3 (print: Oozes 4/4 Unaligned; every Construct at INT 3 or less, 7/7; the first aligned one is the Flesh Golem at INT 6)
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline by rule: "the stone golem" — the call answered "the stone golem" (kind), which the name does not support
[reskin] inline form: "the stone golem" — the model's own reading of the name
[reskin] save dc derived: DC 16 -> 18 (8 + PB 4 + the sheet's best 6) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Stone Golem — carved as a weeping saint" -> has (descriptive), head
[reskin] signature idea (action): "The Weeping Saint laments aloud, and its grief pours from its carved eyes as a freezing flood that spreads across the ground around it, clinging to anyone caught in the spreading sorrow and dragging them down into the cold. Those it has already struck with its fists or tears feel the grief sink deeper, rooting them where they stand as the flood closes over their feet." [action/save/movement] — menu: trample, thrown-burst, throw-retrieve, shield-bash, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up (+ shelf: leap, rampage, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, stunning-strike, charge-push, hook-rider, pounce, charge)
[reskin] word match declined by the call: hook-rider — the key word does not mean the mechanic here
[reskin] fit declined: "Flood of Sorrow (Recharge 5-6)" — a print body takes only what the user's words ask; the call offered no quote, and the key table finds no verb either (the blacksmith's rally, critic-ten 2026-10-01)
[reskin] fallback stands down: the twist path has no shelf — the Stone Golem's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "Its tears never stop falling; anyone who strikes the stone saint in close combat is splashed by the freezing grief streaming down its face, and the cold clings to them, slowing their limbs and dulling their next blow against it." [trait/on_being_hit/condition] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] signature bound to the concept's verb: trait — false-appearance (stone)
[reskin] word match declined by the call: false-appearance — the key word does not mean the mechanic here
[reskin] signature miss: trait — "Its tears never stop falling; anyone who strikes the stone saint in close combat is splashed by the freezing grief streaming down its face, and the cold clings to them, slowing their limbs and dulling their next blow against it." [trait/on_being_hit/condition] — the model picked "heated-body" (no verb, and it quotes nothing the GM typed) over a concept-verb template (false-appearance)
[reskin] weapons answered: Fist = none; Frozen Tears = none; Grief's Burden = none
[reskin] languages by mind: "None" -> "Understands the languages of its creator but can't speak" (sapient)
[reskin] print canon languages: "Understands the languages of its creator but can't speak" -> "Understands Common plus two other languages but can't speak" — the Stone Golem's
[reskin] print canon speed: 40 ft. -> 30 ft. — the Stone Golem's walk; the concept's other modes stay
[reskin] print canon attack: "Fist" -> "Slam" — the Stone Golem's own row
[reskin] print canon multiattack: "The stone golem makes two attacks, using Slam or Force Bolt in any combination." — the Stone Golem's own
[reskin] print canon attack: "Force Bolt" is print's own row — +9, 22 (4d10), range 120 ft. (an exact body at print's CR)
[reskin] print canon attack: "Frozen Tears" -> "Force Bolt" — the Stone Golem's own ranged row
[reskin] immunities stamped for type: Construct -> Poison; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned
[reskin] print canon defenses: immunities Poison; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned -> Poison, Psychic; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned — the Stone Golem's own header lines
[reskin] name-canon trait stamped: Immutable Form (the name says so; print says what it does)
[reskin] name-canon trait stamped: Magic Resistance (the name says so; print says what it does)
[reskin] print canon trait: Immutable Form — print's text replaces the chassis's (the Troll regenerates 15, not the chassis's 10 — critic's audit 2026-10-02)
[reskin] print canon trait: Magic Resistance — print's text replaces the chassis's (the Troll regenerates 15, not the chassis's 10 — critic's audit 2026-10-02)
[reskin] print canon row: Bonus Actions/Slow (Recharge 5-6) — the Stone Golem's own
```


---


### Plague Choir — in the run

**Concept:** a plague-bearing archon of flies that commands lesser swarms

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Plague Choir | 13 | defender-8-leader | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 9 / off 16 → 12.5; sustained 93 (3 × Claw); nova none; dmg 93

```
Plague Choir

Medium Fiend, Neutral Evil

AC 18
Initiative +2 (12)

HP 187 (22d8 + 88)

Speed 30 ft., Fly 30 ft. (hover)

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

Resistances Cold

Immunities Poison; Poisoned

Senses darkvision 120 ft.; Passive Perception 11

Languages Common

CR 13 (XP 10,000; PB +5)

Traits

Hive-Frame Retort. A creature that touches the plague choir or hits it with a melee attack while within 5 feet of it takes 10 (3d6) Poison damage.

Aura of Authority. While in a 10-foot Emanation originating from the plague choir, the plague choir and its allies have Advantage on attack rolls and saving throws, provided the plague choir doesn't have the Incapacitated condition.

Actions

Multiattack. The plague choir makes three attacks, using Claw or Flesh Bite in any combination.

Claw. Melee Attack Roll: +10, reach 5 ft. 18 (3d8 + 5) Slashing damage plus 13 (3d8) Poison damage.

Flesh Bite. Melee Attack Roll: +10, reach 5 ft. 29 (7d6 + 5) Poison damage.

Bonus Actions

Conductor's Refrain (2/Day). Each ally within 30 feet of the plague choir gains 14 (4d6) Temporary Hit Points.

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

- Traits/Hive-Frame Retort — template heated-body; library draw (seed unstamped); binds the GM's words: plague
- Traits/Aura of Authority — the chassis
- Actions/Multiattack — the chassis
- Actions/Claw — the chassis
- Actions/Flesh Bite — the chassis
- Bonus Actions/Conductor's Refrain — library seed rally; the GM's clause "commands lesser swarms"; binds the GM's words: command

**Engine trace**

```
[path] homebrew — "a plague-bearing archon of flies that commands lesser swarms" (call)
[route] defender-leader type=Fiend mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | defender-leader: ✓ ("commands lesser swarms") | defender-leader: key "commands" (class verb)
[concept] hints: swarm→body ✓ ("commands lesser swarms") | winged→style ✓ ("archon of flies")
[concept] resolve: archetype=defender type=Fiend themes=fiendish/venomous mind=sapient style=leader energy=Poison mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: command of lesser fly swarms [behavior] | a body of writhing chitin and biting flies [body] | a droning aura of contagion [aura]
[concept] identity: The Plague Choir opens combat by unfurling its body into a rising column of biting flies, its voice a droning sermon that galvanizes the lesser swarms clinging to its chitinous frame. Every round it fights as a captain among its own flesh — directing swarms to clog and blind a target while it lunges with ragged, filth-crusted claws to spread rot through the wound. It is patient and utterly convinced of its own contagion, never breaking posture and only retreating to reconvene its brood when its form is torn apart.
[concept] lore: Spun from the last breath of a dying plague-god and given wings in the lowest pits, the Plague Choir drifts between worlds seeking souls it can gestate into a new swarm.
[reskin] donor: defender-8-leader -> CR 13 (invented — no printed peer)
[reskin] [path] decides: homebrew (the matcher agrees)
[reskin] ranged row off: "Hybrid Attack" keeps its melee half only
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline declared: "the plague choir" — the call's own answer (kind), built from the name
[reskin] inline form: "the plague choir" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a plague-bearing archon of flies" -> has (descriptive), head | "commands lesser swarms" -> has (mechanical) [asked: save_single]
[reskin] signature idea (action): "With a droning command, the choir splits off a knot of its own flies and sends them crawling down a wounded foe's throat and into the lungs, working through the rot its claws already seeded. Anyone whose flesh the choir has freshly bitten is the preferred host; the swarm tunnels after that wound and does not care who stands nearby. It is the choir's sermon made flesh — cursing a soul it has alread" [rider/on_hit/condition] — menu: stunning-strike, charge-push, hook-rider, contagion (+ shelf: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, patient-defense, lay-on-hands, second-wind, volley-order, aggro-curse, own-turn-punisher, self-invisibility, rally, riposte)
[reskin] signature bound to the concept's verb: action — contagion (plague, plagued)
[reskin] word match declined by the call: contagion, herd, seal, stunning-strike, charge-push, hook-rider — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit" after being shown contagion, which the GM's words keyed
[reskin] key match declined: action — "contagion" was ranked first on the call's own menu for plague+plagued, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: action — "With a droning command, the choir splits off a knot of its own flies and sends them crawling down a wounded foe's throat and into the lungs, working through the rot its claws already seeded. Anyone whose flesh the choir has freshly bitten is the preferred host; the swarm tunnels after that wound and does not care who stands nearby. It is the choir's sermon made flesh — cursing a soul it has alread" [rider/on_hit/condition] — the model found no template that holds it (offered: contagion, stunning-strike, charge-push, hook-rider, herd, seal)
[reskin] fallback respects the call: herd left the shelf — the call declined it for this sheet
[reskin] value check: "Bolstering Cry (2/Day)" EV 7.7 vs floor 4.9 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: rally -> Bonus Actions/"Bolstering Cry (2/Day)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The choir's frame is never still — flies pour out of every seam and chink of its chitin, biting and crawling over foes that press close and fouling the air they must breathe. Striking it means plunging a hand into a living hive, and the swarm answers every wound with a fresh wave of its own." [trait/on_being_hit/damage] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura)
[reskin] signature bound to the concept's verb: trait — heated-body (plague)
[reskin] signature template (trait): heated-body -> Traits/"Hive-Frame Retort" ("flies pouring from every seam bite and crawl over foes that press close, punishi [verb: plague:concept]")
[reskin] weapons answered: Claw = none; Flesh Bite = none; Blinding Swarm = none
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] immunities stamped for type: Fiend -> Poison; Poisoned
[reskin] resistances derived: Cold
[reskin] row binds its clause: "Bolstering Cry" answers "commands lesser swarms" — the keys it matched came from that clause, so the coverage credit has a receipt
[reskin] audit rename: "Bolstering Cry (2/Day)" -> "Conductor's Refrain (2/Day)"
```


---


### Purple Worm — in the run

**Concept:** name: Purple Worm | that swallowed a war-band's armoury

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Purple Worm | 15 | brute-13 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 12 / off 11 → 11.5; sustained 51 (1 × Tail Stinger); nova none; dmg 51

```
Purple Worm

Gargantuan Monstrosity, Unaligned

AC 18
Initiative -2 (8)

HP 247 (15d20 + 90)

Speed 50 ft., Burrow 50 ft.

MOD
SAVE
STR
28
+9
+14
INT
1
-5
-5
MOD
SAVE
DEX
7
-2
-2
WIS
8
-1
-1
MOD
SAVE
CON
22
+6
+11
CHA
4
-3
-3

Skills Athletics +14, Perception +4

Senses tremorsense 60 ft.; Passive Perception 14

Languages None

CR 15 (XP 13,000; PB +5)

Traits

Tunneler. The purple worm can burrow through solid rock at half its Burrow Speed and leaves a 10-foot-diameter tunnel in its wake.

Actions

Multiattack. The purple worm makes one Bite attack and one Tail Stinger attack.

Bite. Melee Attack Roll: +14, reach 10 ft. 22 (3d8 + 9) Piercing damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 22), and it has the Restrained condition until the grapple ends.

Tail Stinger. Melee Attack Roll: +14, reach 10 ft. 16 (2d6 + 9) Piercing damage plus 35 (10d6) Poison damage.

Bonus Actions

Swallow. Strength Saving Throw: DC 21, one Large or smaller creature Grappled by the purple worm (it can have up to three creatures swallowed at a time). Failure: The target is swallowed by the purple worm, and the Grappled condition ends. A swallowed creature has the Blinded and Restrained conditions, has Total Cover against attacks and other effects outside the purple worm, and takes 17 (5d6) Acid damage at the start of each of the purple worm's turns.
If the purple worm takes 30 damage or more on a single turn from a creature inside it, the purple worm must succeed on a DC 21 Constitution saving throw at the end of that turn or regurgitate all swallowed creatures, each of which falls in a space within 5 feet of the purple worm and has the Prone condition. If the purple worm dies, any swallowed creature no longer has the Restrained condition and can escape from the corpse using 20 feet of movement, exiting Prone.

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
- Actions/Bite — the chassis
- Actions/Tail Stinger — print's own row
- Traits/Tunneler — print's own row; template tunneler; library draw (seed unstamped); binds the GM's words: worm
- Bonus Actions/Swallow — print's own row

**Engine trace**

```
[path] twist — Purple Worm (is) — "Name field: Purple Worm" (code)
[route] brute-grappler type=Monstrosity mechanics=grapple, engulf — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: on the GM's own words "Purple Worm — that swallowed a war-band'" | brute-grappler: ✓ ("that swallowed a war-band's armoury") | brute-grappler: no line key in the words — the model's read of its quote
[concept] name: "Purple Worm" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] resolve: archetype=brute type=Monstrosity themes=subterranean/devouring mind=bestial style=grappler energy=Thunder mix=both identity=✓ lore=✓
[concept] name: provided "Purple Worm"
[concept] mechanics: grapple, engulf
[concept] signature elements: swallowing prey whole into a grinding gut [behavior] | shrapnel spray of swallowed blades and mail [behavior] | armour-encrusted chitin hide [body]
[concept] identity: The Purple Worm breaches to gorge on the assembled armoury of a swallowed war-band, its gut a churning foundry of blades, mail, and half-melted steel that it heaves up and sprays in a shrapnel cone before lunging to swallow another soldier whole. Every round it alternates between grinding its armoured hide forward to seize and engulf prey and convulsing to eject a hot hail of swallowed metal, so foes must choose between closing to be eaten and standing back to be flayed. When bloodied it does not retreat but coils tighter, dragging the wounded under its segments to feed the armoury still grinding inside it.
[concept] lore: A purple worm that consumed a mercenary company's baggage train and has since grown an iron-studded gut, it roams the old war-road hoarding steel in its belly and seeking fresh armouries to swallow.
[reskin] print canon route: the Purple Worm's body outranks the grappler seat — no verb in the words names it; the plain brute line
[reskin] print canon defenses: HP 264 -> 247, AC 17 -> 18 — the Purple Worm's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 28, DEX 7, CON 22, INT 1, WIS 8, CHA 4 — the Purple Worm's at its own CR; attack +11 -> +14, DC 21 (print's)
[reskin] donor: brute-13 -> CR 15 (invented — no printed peer)
[reskin] [path] decides: twist on the Purple Worm (the matcher agrees)
[reskin] print canon: "Purple Worm — that swallowed a war-band's armoury" heads on the Purple Worm — print's rows ride along; the seat stays
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline by rule: "the purple worm" — the call answered "the purple worm" (kind), which the name does not support
[reskin] inline form: "the purple worm" — the model's own reading of the name
[reskin] save dc derived: DC 18 -> 22 (8 + PB 5 + the sheet's best 9) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Purple Worm —" -> has (descriptive), head | "swallowed a war-band's armoury" -> has (descriptive)
[reskin] menu pruned: action — thrown-burst-seed (the sheet cannot render them)
[reskin] signature idea (action): "When the worm swallows a foe, it grinds them up inside its gut and heaves the pieces back out at the rest of the fight. Meant as the follow-through after a successful engulf: prey taken into the belly is crushed, and the worm then spits the chewed remains outward at another nearby creature, dragging the swallowed victim's suffering into the open." [rider/on_hit/damage] — menu: contagion, stunning-strike, charge-push, hook-rider, pounce, charge (+ shelf: swallow, condition-payoff, shield-bash, hook-drag, burrow-ambush, escalating-dread, terror-pulse, push-prone, herd, drain, exploiter, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating)
[reskin] signature bound to the concept's verb: action — swallow (swallow, swallows, swallowed)
[reskin] word match declined by the call: swallow, condition-payoff — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit" after being shown swallow, which the GM's words keyed
[reskin] key match declined: action — "swallow" was ranked first on the call's own menu for swallow+swallows+swallowed, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: action — "When the worm swallows a foe, it grinds them up inside its gut and heaves the pieces back out at the rest of the fight. Meant as the follow-through after a successful engulf: prey taken into the belly is crushed, and the worm then spits the chewed remains outward at another nearby creature, dragging the swallowed victim's suffering into the open." [rider/on_hit/damage] — the model found no template that holds it (offered: swallow, contagion, stunning-strike, charge-push, hook-rider, pounce, charge, condition-payoff, hook-drag, exploiter)
[reskin] fallback respects the call: swallow, condition-payoff left the shelf — the call declined them for this sheet
[reskin] fallback stands down: the twist path has no shelf — the Purple Worm's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "The worm's hide bristles with swallowed steel that it grinds and shifts as it moves. Whenever a creature lands a blow on it, a hot shard of the armoury snaps loose at that attacker, so striking the worm means sharing its meal." [trait/on_being_hit/damage] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, earth-glide, tunneler, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] signature bound to the concept's verb: trait — tunneler (worm)
[reskin] trait declined: "Shrapnel Hide" — bound only on the idea's own words (hot:idea, shard:idea) with no key in the concept; a meat body earns its trait by the user's verb (the sniper's tracker, critic 2026-09-29)
[reskin] trait bound to the concept's verb (concept-first): tunneler — worm in the user's words; the idea path had nothing
[reskin] signature template (trait): tunneler -> Traits/"Tunneler" ("exact concept match [verb: worm:concept]")
[reskin] weapons answered: Bite = none; Shrapnel Spray = none; Armoury Grind = none
[reskin] chassis nova: "Shrapnel Spray (Recharge 5-6)" — the brute-13's own nova row (its "Area Nova", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] print canon speed: 40 ft. -> 50 ft. — the Purple Worm's walk; the concept's other modes stay
[reskin] print canon speed: Burrow -> 50 ft. — the Purple Worm's own
[reskin] print canon row: Actions/Tail Stinger — the Purple Worm's second melee row, beside the chassis's
[reskin] print canon multiattack: "The purple worm makes one Bite attack and one Tail Stinger attack." — the Purple Worm's own
[reskin] languages held: None stands — INT 1 on a Monstrosity speaks nothing, whatever the mind read said
[reskin] print canon trait: Tunneler — print's text replaces the chassis's (the Troll regenerates 15, not the chassis's 10 — critic's audit 2026-10-02)
[reskin] print canon: chassis row leaves — Actions/"Shrapnel Spray (Recharge 5-6)" is the seat's nova, not the Purple Worm's
[reskin] print canon row: Bonus Actions/Swallow — the Purple Worm's own
[reskin] escape dc: Bite → DC 22 (8 + PB + STR; a late row wore another number)
```


---


### Pit Fiend — in the run

**Concept:** name: Pit Fiend | who collects the oaths of dying knights

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Pit Fiend | 20 | defender-17 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 21 / off 10 → 15.5; sustained 43 (1 × Fiery Mace); nova none; dmg 43

```
Pit Fiend

Large Fiend, Lawful Evil

AC 21
Initiative +2 (12)

HP 337 (27d10 + 189)

Speed 30 ft., Fly 60 ft.

MOD
SAVE
STR
26
+8
+14
INT
22
+6
+6
MOD
SAVE
DEX
14
+2
+2
WIS
18
+4
+10
MOD
SAVE
CON
24
+7
+13
CHA
24
+7
+7

Skills Athletics +14, Perception +10

Resistances Cold

Immunities Fire, Poison; Poisoned

Senses darkvision 120 ft.; Passive Perception 20

Languages Infernal; telepathy 120 ft.

CR 20 (XP 25,000; PB +6)

Traits

Legendary Resistance (3/Day). If the pit fiend fails a saving throw, it can choose to succeed instead.

Diabolical Restoration. If the pit fiend dies outside the Nine Hells, its body disappears in sulfurous smoke, and it gains a new body instantly, reviving with all its Hit Points somewhere in the Nine Hells.

Fear Aura. The pit fiend emanates an aura in a 20-foot Emanation while it doesn't have the Incapacitated condition. Wisdom Saving Throw: DC 21, any enemy that starts its turn in the aura. Failure: The target has the Frightened condition until the start of its next turn. Success: The target is immune to this pit fiend's aura for 24 hours.

Magic Resistance. The pit fiend has Advantage on saving throws against spells and other magical effects.

Actions

Multiattack. The pit fiend makes one Bite attack, two Devilish Claw attacks, and one Fiery Mace attack.

Bite. Melee Attack Roll: +14, reach 10 ft. 18 (3d6 + 8) Piercing damage. If the target is a creature, it must make the following saving throw. Constitution Saving Throw: DC 21. Failure: The target has the Poisoned condition. While Poisoned, the target can't regain Hit Points and takes 21 (6d6) Poison damage at the start of each of its turns, and it repeats the save at the end of each of its turns, ending the effect on itself on a success. After 1 minute, it succeeds automatically.

Fiery Mace. Melee Attack Roll: +14, reach 10 ft. 22 (4d6 + 8) Force damage plus 21 (6d6) Fire damage.

Devilish Claw. Melee Attack Roll: +14, reach 10 ft. 26 (4d8 + 8) Necrotic damage.

Hellfire Spellcasting (Recharge 4-6). The pit fiend casts Fireball (level 5 version) twice, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 21). It can replace one Fireball with Hold Monster (level 7 version) or Wall of Fire.

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

- Traits/Legendary Resistance — the chassis
- Traits/Diabolical Restoration — print's own row
- Traits/Fear Aura — print's own row
- Traits/Magic Resistance — print's own row
- Actions/Multiattack — the chassis
- Actions/Bite — print's own row, renamed
- Actions/Fiery Mace — print's own row; weapon mace
- Actions/Devilish Claw — print's own row
- Actions/Hellfire Spellcasting — print's own row

**Engine trace**

```
[path] twist — Pit Fiend (is) — "Name field: Pit Fiend" (code)
[route] defender type=Fiend mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | defender-leader: ✓ ("collects the oaths of dying knights") | defender-leader -> defender: the concept's VERB outranks the noun (key "knights", class verb) | defender: key "knights" (class verb)
[concept] name: "Pit Fiend" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] resolve: archetype=defender type=Fiend themes=fiendish/armed mind=sapient style=— energy=Necrotic mix=both identity=✓ lore=✓
[concept] name: provided "Pit Fiend"
[concept] mechanics: none claimed
[concept] signature elements: collecting the oaths of dying knights [behavior] | iron plate forged from broken blades [body] | spectral oath-chains that bind prey [aura]
[concept] identity: A towering fiend of blackened iron plate that bears a knight's shield and sword it did not earn, the Pit Fiend holds a chokepoint like a fortress wall and dares the living to break its line. Each round it wades forward with shield raised, slamming trespassers back and cutting down any who try to slip past it, while it quietly intones the oaths it has harvested from the dying — oaths that rise as spectral chains to snare the faltering. It fights to the death with cold, patient certainty, treating every duel as a contract to be signed in blood and every retreat as a breach it will remember.
[concept] lore: Forged in the lower courts of Hell from the iron of broken swords and the oaths of knights who died swearing them, the Pit Fiend collects those vows as currency, forever seeking the one promise that will release it from the shield it was made to bear.
[reskin] print canon defenses: HP 281 -> 337, AC 22 -> 21 — the Pit Fiend's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 26, DEX 14, CON 24, INT 22, WIS 18, CHA 24 — the Pit Fiend's at its own CR; attack +14 -> +14, DC 21 (print's)
[reskin] donor: defender-17 -> CR 20 (invented — no printed peer)
[reskin] row gated out: Guard Aura (aura) — the concept did not claim this mechanic
[reskin] [path] decides: twist on the Pit Fiend (the matcher agrees)
[reskin] print canon: "Pit Fiend — who collects the oaths of dying knights" heads on the Pit Fiend — print's rows ride along; the seat stays
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] repair round 1: 1 defect(s) — rename for "Legendary Rebuke" takes the shelf's own row name "Shield Bash" — that name belongs to a template this sheet may still receive; choose another
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline by rule: "the pit fiend" — the call answered "the pit fiend" (kind), which the name does not support
[reskin] inline form: "the pit fiend" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Pit Fiend —" -> has (descriptive), head | "collects the oaths of dying knights" -> has (descriptive)
[reskin] menu pruned: action — push-prone (the sheet cannot render them)
[reskin] signature idea (action): "The fiend speaks a harvested vow aloud and brands it onto a nearby creature that is already hurt, sinking spectral chain-links of iron into the wound. The mark binds it to the fiend's contract: whenever that marked creature lets a blow land on the fiend or turns to flee, the chains bite deeper and drag it back, and if the creature falls while marked, its oath joins the collection and mends the fie" [action/always/condition] — menu: seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, herd, curse-debt, reveal, wind-up, exploiter (+ shelf: patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, riposte, stunning-strike, charge-push, hook-rider)
[reskin] signature bound to the concept's verb: action — aggro-curse, curse-debt (oath)
[reskin] word match declined by the call: curse-debt, obstacle-pull, hook-rider — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit" after being shown aggro-curse, curse-debt, which the GM's words keyed
[reskin] key match declined: action — "aggro-curse" was ranked first on the call's own menu for oath, and the call read it as no fit; the words keep their claim and nothing is forced
[reskin] signature miss: action — "The fiend speaks a harvested vow aloud and brands it onto a nearby creature that is already hurt, sinking spectral chain-links of iron into the wound. The mark binds it to the fiend's contract: whenever that marked creature lets a blow land on the fiend or turns to flee, the chains bite deeper and drag it back, and if the creature falls while marked, its oath joins the collection and mends the fie" [action/always/condition] — the model found no template that holds it (offered: aggro-curse, curse-debt, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, herd, reveal, wind-up, exploiter, hook-rider, lay-on-hands, rally)
[reskin] fallback respects the call: curse-debt, aggro-curse left the shelf — the call declined them for this sheet
[reskin] fallback stands down: the twist path has no shelf — the Pit Fiend's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 21 already beats print's AC 19 at CR 20, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "Iron reclaimed from broken knight-blades sheathes the fiend's body, so the blows of those who break their word against it ring off the plate and shards of oathbound steel drive back into the attacker. Every swing it survives from an enemy that failed to follow through leaves the fiend's iron ringing louder." [trait/on_being_hit/damage] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] signature bound to the concept's verb: trait — bloodied-burst, death-burst (dying)
[reskin] word match declined by the call: bloodied-burst, death-burst, resonant-body — the key word does not mean the mechanic here
[reskin] trait declined: "Oathforged Sheath" — bound only on the idea's own words (iron:idea, shard:idea) with no key in the concept; a meat body earns its trait by the user's verb (the sniper's tracker, critic 2026-09-29)
[reskin] weapons answered: Greatsword = greatsword
[reskin] speed by concept: added Fly 30 ft. — the concept's movement set decides
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] print canon alignment: Lawful Neutral -> Lawful Evil — the Pit Fiend's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common" -> "Infernal; telepathy 120 ft." — the Pit Fiend's
[reskin] print canon speed: Fly -> 60 ft. — the Pit Fiend's own
[reskin] print canon row: Actions/Devilish Claw — the Pit Fiend's second melee row, beside the chassis's
[reskin] print canon row: Actions/Fiery Mace — the Pit Fiend's second melee row, beside the chassis's
[reskin] print canon attack: "Greatsword" -> "Bite" — the Pit Fiend's own row
[reskin] print canon multiattack: "The pit fiend makes one Bite attack, two Devilish Claw attacks, and one Fiery Mace attack." — the Pit Fiend's own
[reskin] immunities stamped for type: Fiend -> Poison; Poisoned
[reskin] print canon defenses: immunities Poison; Poisoned -> Fire, Poison; Poisoned; resistances none -> Cold — the Pit Fiend's own header lines
[reskin] resistances derived withheld: print's Pit Fiend owns the line (Cold)
[reskin] print canon trait: Diabolical Restoration — "Pit Fiend — who collects the oaths of dying knights" is the Pit Fiend (print's own row)
[reskin] print canon trait: Fear Aura — "Pit Fiend — who collects the oaths of dying knights" is the Pit Fiend (print's own row)
[reskin] print canon trait: Magic Resistance — "Pit Fiend — who collects the oaths of dying knights" is the Pit Fiend (print's own row)
[reskin] print canon legendary: the chassis's Legendary Actions leave — the Pit Fiend has none of its own at its CR
[reskin] print canon row: Actions/Hellfire Spellcasting (Recharge 4-6) — the Pit Fiend's own
```


---


### Owlbear — in the run

**Concept:** name: Owlbear | 

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Owlbear | 3 | brute-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1/2 / off 5 → 2.75; sustained 28 (2 × Rend); nova none; dmg 28

```
(not the page capture — the card showed the other edition; drawn from the saved JSON)
Owlbear
Large Monstrosity, Unaligned
AC 13
HP 59 (7d10 + 21)
Speed 40 ft., Climb 40 ft.
STR 20 DEX 12 CON 17 INT 3 WIS 12 CHA 7
Skills Athletics +7, Perception +3
Senses darkvision 60 ft.; Passive Perception 13
Languages None
CR 3

Actions
Multiattack. The owlbear makes two Rend attacks.
Rend. *Melee Attack Roll:* +7, reach 5 ft. 14 (2d8 + 5) Slashing damage.
```

**Where each row came from**

- Actions/Multiattack — print's own row
- Actions/Rend — print's own row, renamed

**Engine trace**

```
[path] exact — Owlbear (is) — "Owlbear" (code)
[route] brute type=Monstrosity mechanics=grapple — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds refused: the call answered yes but offered no quote — the word table decides | brute: ✓ ("Owlbear") | brute: no line key in the words — the model's read of its quote
[concept] resolve: archetype=brute type=Monstrosity themes=bestial/terror mind=bestial style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: provided "Owlbear"
[concept] mechanics: grapple
[concept] signature elements: the crashing, shrieking charge [behavior] | beak-and-claw flurry that hooks prey close [behavior] | bear-muscled body under shaggy owl-plumage [body]
[concept] identity: The owlbear crashes out of cover in a shrieking charge, opening with a beak-and-claw flurry meant to drop the nearest thing in one exchange. After that it wades in and trades, hooking prey against its beaked face with each claw rake and ignoring its own wounds until something dies. It does not retreat when bloodied — it redoubles, driven by a rage that outlasts sense.
[concept] lore: Mages bred bear and owl into a single furious body as a guardian beast, and it escaped the keep long ago to raise broods in the deep woods, where every intruder is either prey or a rival for its territory.
[reskin] print canon defenses: HP 66 -> 59, AC 12 -> 13 — the Owlbear's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 20, DEX 12, CON 17, INT 3, WIS 12, CHA 7 — the Owlbear's at its own CR; attack +5 -> +7, DC 15 (print's)
[reskin] donor: brute-2 -> CR 3
[reskin] [path] decides: exact on the Owlbear (the matcher agrees)
[reskin] print canon: "Owlbear" is a print creature — the seats stand down; print's own rows are the composition
[reskin] class kit: none — the exact path takes no class kit
[reskin] inline by rule: "the owlbear" — the call answered "the owlbear" (kind), which the name does not support
[reskin] inline form: "the owlbear" — the model's own reading of the name
[reskin] save dc derived: DC 12 -> 15 (8 + PB 2 + the sheet's best 5) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Owlbear" -> has (descriptive), head
[reskin] weapons answered: Rending Flurry = none
[reskin] print canon speed: modes climb — the Owlbear's
[reskin] print canon senses: "darkvision 60 ft." — the Owlbear's
[reskin] speed by concept: added Climb 30 ft. — the concept's movement set decides
[reskin] print canon speed: 30 ft. -> 40 ft. — the Owlbear's walk; the concept's other modes stay
[reskin] print canon speed: Climb -> 40 ft. — the Owlbear's own
[reskin] print canon attack: "Rending Flurry" -> "Rend" — the Owlbear's own row
[reskin] print canon multiattack: "The owlbear makes two Rend attacks." — the Owlbear's own, added (the chassis carried none; the Owlbear makes two Rend attacks — canaries 2026-10-12)
[reskin] languages held: None stands — INT 3 on a Monstrosity speaks nothing, whatever the mind read said
```


---


### Vashka the Red — in the run

**Concept:** name: Vashka the Red | A hobgoblin warlord in lacquered plate who fights from a shield wall and never breaks ranks.

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Vashka the Red | 6 | defender-5 | ok | ok | FAIL: duplicate-row | ok | ok | ok | FAIL: print-rows | ok | ok | ok |

- structure · fail · duplicate-row: two rows named "Unbroken Wall"
- structure · soft · lint:duplicate-name: Traits/Unbroken Wall: two entries in this section share a name — identical copies are dropped; a genuinely different second ability must be renamed
- donor · fail · print-rows: rows outside print, the named seat and the keyed seeds: Traits/Unbroken Wall, Traits/Steadfast Aura, Actions/Javelin
- read: def 5 / off 6 → 5.5; sustained 44 (2 × Longsword); nova none; dmg 44

```
Vashka the Red

Medium Humanoid, Lawful Evil

AC 19
Initiative +1 (11)

HP 93 (17d8 + 17)

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
12
+1
+1
WIS
10
+0
+0
MOD
SAVE
CON
12
+1
+4
CHA
9
-1
-1

Skills Athletics +7, Perception +3

Senses Passive Perception 13

Languages Common, Goblin

CR 6 (XP 2,300; PB +3)

Traits

Unbroken Wall. While Vashka isn't Bloodied, Melee attack rolls against Vashka are made with Disadvantage.

Unbroken Wall. While Vashka isn't Bloodied, melee attack rolls against it are made with Disadvantage.

Steadfast Aura. While in a 10-foot Emanation originating from Vashka, Vashka's allies have Advantage on saving throws, provided Vashka doesn't have the Incapacitated condition.

Pack Tactics. The hobgoblin has Advantage on an attack roll against a creature if at least one of the hobgoblin's allies is within 5 feet of the creature and the ally doesn't have the Incapacitated condition.

Actions

Multiattack. Vashka makes two attacks, using Longsword, Javelin, or Longbow in any combination.

Longsword. Melee Attack Roll: +7, reach 5 ft. 22 (4d8 + 4) Slashing damage.

Javelin. Melee or Ranged Attack Roll: +7, reach 5 ft. or range 30/120 ft. 22 (4d8 + 4) Piercing damage.

Longbow. Ranged Attack Roll: +7, range 150/600 ft. 5 (1d8 + 1) Piercing damage.

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

- Traits/Unbroken Wall — authored for this sheet; the GM's clause "never breaks ranks"
- Traits/Unbroken Wall — template guarded-stance; library draw (seed unstamped); the GM's clause "fights from a shield wall"; binds the GM's words: shield wall
- Traits/Steadfast Aura — the chassis
- Traits/Pack Tactics — print's own row
- Actions/Multiattack — the chassis
- Actions/Longsword — weapon longsword
- Actions/Javelin — weapon javelin
- Actions/Longbow — print's own row; weapon longbow

**Engine trace**

```
[path] refused: species "hobgoblin" has no kit
[path] twist — Hobgoblin Warrior (is) — "A hobgoblin warlord in lacquered plate" (call)
[route] defender type=Humanoid mechanics=aura — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | defender-leader: ✓ ("hobgoblin warlord") | defender-leader -> defender: the concept's VERB outranks the noun (key "shield wall", class verb) | defender: key "shield wall" (class verb)
[concept] name: "Vashka the Red" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] resolve: archetype=defender type=Humanoid themes=armed/forged mind=sapient style=— energy=Fire mix=both identity=✓ lore=✓
[concept] name: provided "Vashka the Red"
[concept] mechanics: aura
[concept] signature elements: the lacquered plate and locked shield wall [object] | refusal to break ranks or give ground [behavior] | punishing anyone who moves past her [behavior]
[concept] identity: Vashka the Red opens by locking her lacquered shield wall and grinding forward one measured step at a time, letting the enemy break first against a hedge of shields and spears. Every round she holds the line, punishing anyone who tries to slip past her reach and shifting her shield to shelter the soldiers beside her. She never breaks ranks — bloodied or not she fights to the last, retreating only in disciplined order and daring foes to follow.
[concept] lore: Vashka the Red rose from the rank and file of a hobgoblin legion, and now she drills her shield-wall company to hold any road, ford, or gate for coin, conquest, and the honor of never once being the first to give ground.
[reskin] energy withheld: Fire on a Humanoid with no Fire in the concept's own words (fixed phrases read first)
[reskin] the concept outranks the alias: the Hobgoblin Warrior is a Fey and the concept reads Humanoid — the words RESEMBLE it, they do not name it, so the print body stands down
[reskin] print canon array: STR 18, DEX 12, CON 12, INT 10, WIS 10, CHA 9 — the Hobgoblin Warrior's, STR fitted to +7
[reskin] donor: defender-5 -> CR 6
[reskin] [path] decides: twist on the Hobgoblin Warrior (the matcher would have said homebrew)
[reskin] print canon: "Vashka the Red — A hobgoblin warlord in lacquered plate who fights from a shield wall and never breaks ranks." heads on the Hobgoblin Warrior — print's rows ride along; the seat stays
[reskin] class kit: none — the twist path takes no class kit
[reskin] proper noun: "Vashka the Red" — the Name field is a person, not a kind (no print match, no article in the words)
[reskin] inline declared: "Vashka" — the call's own answer (person), built from the name
[reskin] inline form: "Vashka" — the model's own reading of the name
[reskin] save dc derived: DC 14 -> 15 (8 + PB 3 + the sheet's best 4) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] lacks not claimed: "never breaks ranks" reads like a lack to the words, and the call's list did not name it
[reskin] clauses: "Vashka the Red — A hobgoblin warlord in lacquered plate" -> has (descriptive), head | "fights from a shield wall" -> has (mechanical) | "never breaks ranks" -> has (mechanical)
[reskin] menu pruned: action — snap-shot (the sheet cannot render them)
[reskin] signature idea (action): "When a foe strikes at one of Vashka's allies within the shelter of her shield wall, she shoulders her lacquered shield across and slams the attacker back, then plants herself so the line cannot be walked past — anyone trying to slip through her reach draws a spearpoint in the ribs for the attempt. The wall holds because she makes standing in it hurt." [reaction/on_being_hit/movement] — menu: riposte (+ shelf: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, stunning-strike, charge-push, hook-rider)
[reskin] signature bound to the concept's verb: action — rally (shield)
[reskin] word match declined by the call: riposte, push-prone, obstacle-pull, rally — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit" after being shown rally, which the GM's words keyed
[reskin] key match declined: action — "rally" was ranked first on the call's own menu for shield, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: action — "When a foe strikes at one of Vashka's allies within the shelter of her shield wall, she shoulders her lacquered shield across and slams the attacker back, then plants herself so the line cannot be walked past — anyone trying to slip through her reach draws a spearpoint in the ribs for the attempt. The wall holds because she makes standing in it hurt." [reaction/on_being_hit/movement] — the model found no template that holds it (offered: rally, riposte, obstacle-pull, push-prone)
[reskin] fallback respects the call: rally, push-prone left the shelf — the call declined them for this sheet
[reskin] fallback stands down: the twist path has no shelf — the Hobgoblin Warrior's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 19 already beats print's AC 15 at CR 6, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "Vashka fights to the last and never yields the ground she stands on; even bloodied, she simply keeps stepping forward into the gap where a soldier beside her falls, and the shield wall closes over the hole she fills rather than opening." [trait/always/defense] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending, weapon-lodge)
[reskin] word match declined by the call: bloodied-fury, uncanny-sense, bloodied-burst — the key word does not mean the mechanic here
[reskin] signature template (trait): guarded-stance -> Traits/"Unbroken Wall" ("Vashka fights from a shield wall and never breaks ranks; while she still holds,  [verb: shield wall:concept]")
[reskin] repair: 1 clause(s) with no row — "never breaks ranks"; one targeted call with the sheet as context
[reskin] repaired sheet: 2 attack row(s), 0 save, 1 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] weapons answered: Longsword = longsword; Javelin = javelin; Locked Wall = none
[reskin] print canon alignment: Lawful Neutral -> Lawful Evil — the Hobgoblin Warrior's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon type: Humanoid stays — the words say humanoid ("a dire wolf but undead", 2026-10-01)
[reskin] print canon row: Actions/Longbow — the Hobgoblin Warrior's own ranged row, added (the chassis carried none to rename) — far from print's CR 0.5: print's dice, the sheet's +7
[reskin] print canon trait: Pack Tactics — "Vashka the Red — A hobgoblin warlord in lacquered plate who fights from a shield wall and never breaks ranks." is the Hobgoblin Warrior (print's own row)
[reskin] multiattack normalised: "Vashka makes two attacks, using Longsword, Javelin, or Longbow in any combination."
[reskin] row binds its clause: "Unbroken Wall" answers "fights from a shield wall" — the keys it matched came from that clause, so the coverage credit has a receipt
audit span not verbatim, dropped: Unbroken Wall ***Unbroken Wall.*** While Vashka isn't Bloodied, Melee attack rolls against Vashka are made with Disadvantage.

***Unbroken Wall.*** While Vashka isn't Bloodied, melee attack rolls against it are made with Disadvantage.
[reskin] audit rename: "Guard Aura" -> "Steadfast Aura"
```


---


### Sump-Molt Reaper — in the run

**Concept:** A Large insectile horror. It has four scythe-arms, a spitting maw, and a shell that sheds acid. It fights by pinning prey with two arms and carving with the others.

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Sump-Molt Reaper | 9 | brute-8-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- **dropped clause:** "It has four scythe-arms"
- **dropped clause:** "It fights by pinning prey with two arms"
- read: def 7 / off 10 → 8.5; sustained 62 (2 × Scythe-Arm); nova Molt-Slurry Spray 32; dmg 63

```
Sump-Molt Reaper

Large Monstrosity, Unaligned

AC 15
Initiative -1 (9)

HP 161 (19d10 + 57)

Speed 40 ft., Climb 40 ft.

MOD
SAVE
STR
18
+4
+8
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
12
+1
+1
MOD
SAVE
CON
17
+3
+7
CHA
6
-2
-2

Skills Athletics +8, Perception +5

Senses darkvision 60 ft.; Passive Perception 15

Languages None

CR 9 (XP 5,000; PB +4)

Traits

Caustic Carapace. A creature that touches the reaper or hits it with a melee attack while within 5 feet of it takes 7 (2d6) Acid damage.

Actions

Multiattack. The reaper makes two attacks, using Scythe-Arm or Carving Scythe-Arm in any combination.

Scythe-Arm. Melee Attack Roll: +8, reach 10 ft. 18 (4d6 + 4) Slashing damage plus 13 (3d8) Acid damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 16). While Grappled, the target has the Restrained condition.

Molt-Slurry Spray (Recharge 5-6). Constitution Saving Throw: DC 15, each creature in a 30-foot Cone. Failure: 32 (5d12) Acid damage, and the target has the Poisoned condition until the end of its next turn. Success: Half damage only.

Carving Scythe-Arm. Melee Attack Roll: +8, reach 5 ft. 18 (4d6 + 4) Slashing damage.

Bonus Actions

Smother. The reaper smothers one Medium or smaller creature it is grappling. While smothered, the target has the Blinded and Restrained conditions, has Total Cover against attacks and other effects outside the reaper, and takes 10 (3d6) Acid damage at the start of each of the reaper's turns. The reaper can have only one creature smothered at a time. If the reaper takes 25 damage or more on a single turn from the smothered creature, the reaper must release the target at the end of that turn, and the target exits Prone in an unoccupied space within 10 feet of the reaper. If the reaper dies, a smothered creature pulls free Prone by using 10 feet of movement.

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
- Actions/Scythe-Arm — the chassis
- Actions/Molt-Slurry Spray — template spew; library draw (seed unstamped); binds the GM's words: spits
- Actions/Carving Scythe-Arm — authored for this sheet; the GM's clause "carving with the others"
- Bonus Actions/Smother — binds the GM's words: smother+swallow+swallows+engulf+engulfs+devour+devours+gulp+entomb+cocoon+whelm
- Traits/Caustic Carapace — template heated-body; library draw (seed unstamped); the GM's clause "a shell that sheds acid"; binds the GM's words: acid

**Engine trace**

```
[path] homebrew — "A Large insectile horror." (call)
[route] brute-grappler type=Monstrosity mechanics=grapple, engulf, thrown-weapon — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: on the GM's own words "pinning prey with two arms" | brute-grappler: ✓ ("pinning prey with two arms and carving w") | brute-grappler: no line key in the words — the model's read of its quote
[concept] resolve: archetype=brute type=Monstrosity themes=bestial/venomous mind=bestial style=grappler energy=Acid mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: grapple, engulf, thrown-weapon
[concept] signature elements: pinning prey with two scythe-arms while carving with the others [behavior] | acid-shedding shell [body] | four scythe-arms [body]
[concept] identity: The acid-shedding scythe-brute opens by lunging to pin a target beneath two of its four scythe-arms, then carves with the free pair while corrosive runoff from its shell eats at anything pressed against it. Every round it anchors one victim and reaps the rest, shrugging off hits as its shell splits and spits; under real pressure it does not flee — it tightens its grip, dragging the pinned prey in front of itself as a shield, and fights to the death.
[concept] lore: Hatched in the caustic sump-molts beneath a ruined hive, it sheds its shell in acid each season and hunts whatever wanders into the reek, wanting only the next thing it can pin and split open.
[reskin] donor: brute-8-grappler -> CR 9
[reskin] [path] decides: homebrew (the matcher agrees)
[reskin] engulf engine: Smother — the body's own verb
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline declared: "the reaper" — the call's own answer (kind), built from the name
[reskin] inline form: "the reaper" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] clauses: "A Large insectile horror" -> has (header) | "It has four scythe-arms" -> has (mechanical) [asked: attack] | "a spitting maw" -> has (descriptive) | "a shell that sheds acid" -> has (mechanical) [asked: on_being_hit/attack] | "It fights by pinning prey with two arms" -> has (mechanical) [asked: on_hit/condition] | "carving with the others" -> has (mechanical) [asked: attack]
[reskin] signature idea (action): "The reaper's shell splits along its seams and spits a fan of caustic molt-slurry at everything in front of it. The acid clings to whatever it splashes, and any creature already held in its arms sloughs faster, so the reaper opens by dousing the ground and pinned prey alike before wading in to grab and carve." [action/save/damage] — menu: swallow, leap, condition-payoff, shield-bash, hook-drag, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, exploiter (+ shelf: shell-withdraw, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, affliction, contagion, stunning-strike, charge-push, hook-rider, pounce)
[reskin] signature bound to the concept's verb: action — exploiter, spew, escalating-dread, shell-withdraw (pinned, spits, horror, shell)
[reskin] value check: "Molt-Slurry Spray (Recharge 5-6)" EV 84.8 vs floor 54.1 (the whole Multiattack (2 attacks)) — worth the trade
[reskin] signature template: spew -> Actions/"Molt-Slurry Spray (Recharge 5-6)" ("the shell splits along its seams and spits a fan of caustic molt-slurry at every [verb: spits:concept]")
[reskin] keys spent by the action: spits
[reskin] signature idea (trait): "Its shell is always weeping acid: whenever a creature strikes it in close combat, runoff spatters back onto the attacker, and anyone pinned or smothered against its body gets the same caustic seep eating at them each moment they stay in contact." [trait/on_being_hit/damage] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] signature bound to the concept's verb: trait — heated-body (acid)
[reskin] word match declined by the call: absorption — the key word does not mean the mechanic here
[reskin] signature template (trait): heated-body -> Traits/"Caustic Carapace" ("a shell that sheds acid spatters runoff back onto any creature that strikes it i [verb: acid:concept]")
[reskin] repair: 1 clause(s) with no row — "carving with the others"; one targeted call with the sheet as context
[reskin] repaired sheet: 2 attack row(s), 0 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] weapons answered: Scythe-Arm = none; Pinning Lunge = none
[reskin] speed by concept: added Climb 40 ft. — the concept's movement set decides
[reskin] languages held: None stands — INT 4 on a Monstrosity speaks nothing, whatever the mind read said
[reskin] row binds its clause: "Caustic Carapace" answers "a shell that sheds acid" — the keys it matched came from that clause, so the coverage credit has a receipt
[reskin] ask vs row MISMATCH: "a shell that sheds acid" -> "Caustic Carapace" — trigger: asked on_being_hit, row reads at_will
[reskin] asked but unanswered: "It fights by pinning prey with two arms" asked for on_hit and no row binds the clause
audit finding below confidence gate: Carving Scythe-Arm The reaper's Scythe-Arm has reach 10 ft. but Carving Scythe-Arm only 5 ft., an inconsistent reach for two arms of one body that are combined freely in Multiattack.
```


---


### Mireth Thornwater — in the run

**Concept:** a marsh witch who curses trespassers, cr 7

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Mireth Thornwater | 7 | caster-8-binder | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok | ok |

- donor · soft · print-rows: rows outside print, the named seat and the keyed seeds: Actions/Bog Rot, Actions/Warding Glamour
- read: def 3 / off 7 → 5; sustained 48 (3 × Arcane Burst); nova none; dmg 48

```
Mireth Thornwater

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
+3
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
+3

Skills Perception +4, Deception +3

Senses Passive Perception 14

Languages Common and any three languages, Sylvan

CR 7 (XP 2,900; PB +3)

Actions

Multiattack. Mireth makes three Arcane Burst attacks. It can replace one attack with a use of Bog Rot.

Arcane Burst. Melee or Ranged Attack Roll: +6, reach 5 ft. or range 120 ft. 16 (3d8 + 3) Force damage.

Bog Rot. Constitution Saving Throw: DC 14, one creature within 60 feet. Failure: 14 (4d6) Bludgeoning damage, and the target has the Poisoned condition until the end of its next turn.

Spellcasting. Mireth casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 14):

- At Will: Detect Magic, Light, Mage Armor, Mage Hand, Prestidigitation
- 2/Day Each: Fireball, Invisibility
- 1/Day Each: Cone of Cold, Fly

Warding Glamour. Charisma Saving Throw: DC 14, one creature within 60 feet. Failure: The target has the Charmed condition until the end of its next turn.

Bonus Actions

Misty Step (3/Day). Mireth casts Misty Step, using the same spellcasting ability as Spellcasting.

Reactions

Protective Magic (3/Day). Mireth casts Counterspell or Shield in response to the spell's trigger, using the same spellcasting ability as Spellcasting.

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
- Actions/Bog Rot — the chassis
- Actions/Spellcasting — print's own row
- Actions/Warding Glamour — authored for this sheet; the GM's clause "curses trespassers"
- Reactions/Protective Magic — mage kit; the GM's clause "witch"
- Bonus Actions/Misty Step — print's own row

**Engine trace**

```
[path] class_npc — class mage — "witch" (call)
[route] caster-binder (controller) type=Humanoid mechanics=none — casts: implied by the kind — "a marsh witch who curses trespassers" | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | caster-binder: ✓ ("curses trespassers") | caster-binder: key "curses" (class verb)
[concept] hints: binder→style ✓ ("a marsh witch who curses trespassers")
[concept] resolve: archetype=caster type=Humanoid themes=beguiling/grave mind=sapient style=binder energy=Poison mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: curses that take enemy actions away [behavior] | black marsh water and reeds [body] | the fen she guards [aura]
[concept] identity: A marsh witch opens combat from cover, laying a hex on the nearest trespasser before they even see her — a curse of thorns and bad water that fouls their aim and drags at their limbs. Each round she keeps her distance behind reeds and mist, spending her actions to bind another enemy rather than to deal damage, sowing conditions across the whole party until they can barely move or strike. Under pressure she is patient and mean, retreating deeper into the fen to keep her distance and only turning to melee when cornered; she does not die for a stranger's boots in her mud.
[concept] lore: She was a woman who drowned in the marsh's black water and would not let go, and now she hexes every trespasser who muddies her fen, wanting only to add their boots to the mud she guards.
[reskin] energy withheld: Poison on a Humanoid with no Poison in the concept's own words (fixed phrases read first)
[reskin] [path] class body: the mage stands on the Mage — the class's own print block, nearest CR 7
[reskin] print canon defenses: HP 108 -> 81, AC 15 -> 15 — the Mage's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 9, DEX 14, CON 11, INT 17, WIS 12, CHA 11 — the Mage's at its own CR; attack +7 -> +6, DC 14 (print's)
[reskin] donor: caster-8-binder -> CR 7
[reskin] [path] decides: class_npc on the Mage · class mage (the matcher would have said homebrew)
[reskin] print canon: "a marsh witch who curses trespassers, cr 7" heads on the Mage — print's rows ride along; the seat stays
[reskin] repair round 1: 4 defect(s) — name "Thorn Claw" is a natural weapon on a Humanoid whose concept gives it none — a Humanoid swings a weapon (Scimitar, Club, Spear) | "Thorn Claw" is an anatomical name dealing Slashing on a mind-driven attacker (the attack bonus keys to CHA) — print pays physical damage on mental strikes with implement names (the Dryad's Vine Lash, the Rakshasa's Cursed Touch) or carries a magical type (the Mage's Arcane Burst deals Force); rename to a conjured implement or pick a magical type | "Brackish Bolt" deals Poison on a Humanoid whose concept names no Poison — a name is not a warrant; use a physical type | "Bog Rot" deals Poison on a Humanoid whose concept names no Poison — a name is not a warrant; use a physical type
[reskin] anatomy on a humanoid: "Thorn Claw" -> "Staff" (Bludgeoning) — a Humanoid with no species claw swings a weapon; the magical stamp is for a body that has the part
[reskin] class kit: mage — "witch": Protective Magic (3/Day) (Mage/Protective Magic)
[reskin] inline declared: "Mireth" — the call's own answer (person), built from the name
[reskin] inline form: "Mireth" — the model's own reading of the name
[reskin] energy withheld on a base row: "Brackish Bolt" Poison -> Piercing (the row's own noun; a Humanoid deals no Poison its concept never gave it)
[reskin] energy withheld on a base row: "Bog Rot" Poison -> Bludgeoning (the body's physical type; a Humanoid deals no Poison its concept never gave it)
[reskin] control spell gated to daily — Bestow Curse (level 3 control at will is print's CR 13+ shape; at CR 7 it is 1/Day)
[reskin] daily spell dropped — Blight (36 avg vs 17 per-hit; print's only daily damage spell is the Adult Red's Fireball at ~1.1x)
[reskin] spell DC coherence: DC 14 -> 11 off Charisma 11 (print's array stays)
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a marsh witch" -> has (descriptive), head | "curses trespassers" -> has (mechanical) [asked: condition] | "cr 7" -> has (header)
[reskin] extraction: 1 of 3 model clauses quote nothing the user typed and leave the record ("cr 7")
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "Mireth wades close and drives her staff into the muck at a trespasser's feet, and the black water answers by climbing them — clinging to ankles and knees so each step costs them, holding them fast in the fen until they rip themselves free. While caught this way, the cursed ground saps the strength from their blows, so a party that ignores the mud fights at half-cock." [action/save/condition] — menu: condition-payoff, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, snare-bolt, slow-bolt, sensory-strike, herd, thrown-burst-seed, drain, curse-debt, zone-seed, reveal, wind-up, blighted-ground (+ shelf: delayed-brand, lay-on-hands, aggro-curse, self-invisibility, rally, snap-shot, bolt-restrain, bolt-drag, bolt-mark)
[reskin] fit declined: "Fen Snare" — a print body takes only what the user's words ask; the call offered no quote, and the key table finds no verb either (the blacksmith's rally, critic-ten 2026-10-01)
[reskin] fallback stands down: the class_npc path has no shelf — the Mage's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "Where marsh water touches Mireth, reeds and black roots grow up around her, and anyone who comes at her through the fen finds the ground snatching at their feet, slowing their approach before they ever reach her." [trait/always/movement] — menu: false-appearance, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] signature bound to the concept's verb: trait — terrain-walk (marsh)
[reskin] word match declined by the call: terrain-walk — the key word does not mean the mechanic here
[reskin] trait declined: "Snaring Fen" — bound only on the idea's own words (roots:idea) with no key in the concept; a meat body earns its trait by the user's verb (the sniper's tracker, critic 2026-09-29)
[reskin] repair: 1 clause(s) with no row — "curses trespassers"; one targeted call with the sheet as context
[reskin] repaired sheet: 2 attack row(s), 1 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] weapons answered: Thorn Claw = none; Brackish Bolt = none; Debuff Ray = none; Signature Slot = none
[reskin] weapon declined: "Brackish Bolt" reads crossbow from its name, but the call answered none — the row carries no weapon
[reskin] weapon table: "Brackish Bolt" — a launcher, never thrown, range 80/320
[reskin] print canon languages: "Common, Sylvan" -> "Common and any three languages, Sylvan" — the Mage's plus the concept's Sylvan
[reskin] print canon attack: "Arcane Burst" keeps print's hybrid frame — reach 5 ft. or range 120 ft. (the Mage's weapon is thrown)
[reskin] print canon attack: "Staff" -> "Arcane Burst" — the Mage's own row
[reskin] print canon multiattack: "Mireth makes three Arcane Burst attacks." — the Mage's own
[reskin] ranged row off: "Brackish Bolt" leaves — the Mage carries no ranged row and the words name none
[reskin] print canon row: Actions/Spellcasting — print's own list replaces the chassis's
[reskin] print canon row: Bonus Actions/Misty Step (3/Day) — the Mage's own
[reskin] multiattack replacement clause: It can replace one attack with a use of Bog Rot.
[reskin] audit rename: "Curse of the Trespass" -> "Warding Glamour"
```


---


### Brother Aldric — in the run

**Concept:** a templar priest with a mace and no magic at all

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Brother Aldric | 6 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | SOFT: kit-lands |

- class · soft · kit-lands: the cleric kit landed no row on a class-NPC sheet — its rows are magic and the GM took magic away
- read: def 5 / off 6 → 5.5; sustained 44 (2 × Mace); nova none; dmg 44

```
Brother Aldric

Medium Humanoid, Neutral

AC 19
Initiative +0 (10)

HP 93 (17d8 + 17)

Speed 30 ft.

MOD
SAVE
STR
18
+4
+7
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
+3
MOD
SAVE
CON
12
+1
+4
CHA
13
+1
+1

Skills Athletics +7, Perception +6

Senses Passive Perception 16

Languages Common plus one other language

CR 6 (XP 2,300; PB +3)

Actions

Multiattack. Brother Aldric makes two Mace attacks.

Mace. Melee Attack Roll: +7, reach 5 ft. 22 (4d8 + 4) Bludgeoning damage, and the target has Disadvantage on its next attack roll before the start of Brother Aldric's next turn.

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

**Engine trace**

```
[path] class_npc — class cleric — "templar priest" (call)
[route] defender type=Humanoid mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | defender: ✓ ("with a mace") | defender: no line key in the words — the model's read of its quote
[concept] name: provided_name rejected — "a templar priest with a mace and no magi…" is the description, not a name
[concept] resolve: archetype=defender type=Humanoid themes=armed/grave mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: shield-and-mace defensive line-holding [behavior] | mundane iron armor and mace [object] | a priest stripped of magic, hardened by oath [aura]
[concept] identity: A shield-and-mace templar who closes to arm's length and never yields ground, planting his shield to blunt the first exchange and driving the mace into anyone who tries to slip around him. Every round he holds the line, stepping into the swing and punishing overreach with short, brutal counters aimed at knees, wrists, and jaws, so that breaking past him costs more than fighting him. He does not flee when bloodied; he plants tighter, and the worse he is hurt the more stubbornly he works the shield edge and mace haft as weapons.
[concept] lore: Sworn to a temple that stripped its priests of magic and gave them iron instead, the templar guards the threshold of holy ground with mace and shield, believing a wall of faith should need no miracle to keep its post.
[reskin] [path] class body: the cleric stands on the Priest — the class's own print block, nearest CR 6
[reskin] print canon array: STR 18, DEX 10, CON 12, INT 13, WIS 16, CHA 13 — the Priest's, STR fitted to +7
[reskin] donor: defender-5 -> CR 6
[reskin] row gated out: Guard Aura (aura) — the concept did not claim this mechanic
[reskin] [path] decides: class_npc on the Priest · class cleric (the matcher would have said twist Priest)
[reskin] print canon: "a templar priest with a mace and no magic at all" heads on the Priest — print's rows ride along; the seat stays
[reskin] repair round 1: 1 defect(s) — rename for "Hybrid Attack" takes the shelf's own row name "Shield Bash" — that name belongs to a template this sheet may still receive; choose another
[reskin] named parts: Mace (slot) — the user's words, the engine's numbers
[reskin] named parts landed: 1 attack row(s), 0 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] chassis row off: Actions/"Mace and Buckler Toss" leaves — the GM named a melee weapon (Mace); one weapon, one rule set
[reskin] class kit: Divine Aid — the sheet carries no row it could refer to (/^Spellcasting$/)
[reskin] class kit: cleric — "templar priest": nothing to add — the sheet already answers it
[reskin] inline declared: "Brother Aldric" — the call's own answer (person), built from the name; the rules would have said "the brother"
[reskin] inline on kit rows: "the brother" -> "Brother Aldric"
[reskin] lacks asked: "no magic at all"
[reskin] clauses: "a templar priest with a mace" -> has (mechanical) [asked: attack] | "no magic at all" -> LACKS (mechanical)
[reskin] signature idea (action): "When a foe swings and misses him at arm's length, Aldric answers instantly by stepping in and slamming his shield edge into the offender's weapon arm and jaw, staggering them so they cannot step around him and their next swing comes wild. The counterpunish is what makes breaking past him cost more than fighting him: every whiff invites the iron punishment." [reaction/on_being_hit/damage] — menu: riposte (+ shelf: seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, stunning-strike, charge-push, hook-rider)
[reskin] fit declined: "Iron Retaliation" — a print body takes only what the user's words ask; the call offered no quote, and the key table finds no verb either (the blacksmith's rally, critic-ten 2026-10-01)
[reskin] fallback stands down: the class_npc path has no shelf — the Priest's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 19 already beats print's AC 15 at CR 6, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "Aldric's faith is in iron: his armor and mace work even where magic is stripped away, so effects that suppress or dispel magic never dull his shield, slow his step, or silence his blows. The wall of faith needs no miracle to keep its post." [trait/always/defense] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending, weapon-lodge)
[reskin] word match declined by the call: uncanny-sense, bound, resonant-body — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "Aldric's faith is in iron: his armor and mace work even where magic is stripped away, so effects that suppress or dispel magic never dull his shield, slow his step, or silence his blows. The wall of faith needs no miracle to keep its post." [trait/always/defense] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, resonant-body)
[reskin] weapons answered: Mace = mace; Shield Bash = shield
[reskin] print canon alignment: Lawful Neutral -> Neutral — the Priest's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common" -> "Common plus one other language" — the Priest's
[reskin] print canon row: Actions/Spellcasting — the Priest's own
[reskin] print canon row: Bonus Actions/Divine Aid (3/Day) — the Priest's own
[reskin] spellcasting dc: "Spellcasting" prints spell save DC 14 — 8 + PB + Wisdom (print carries it in 45 of 48 rows)
[reskin] lacks clause: Actions/"Spellcasting" leaves — "no magic at all"
[reskin] dead wildcard name swept — "Divine Aid (3/Day)" was only about "Spellcasting"; the row drops
```


---


### Stormcrag Tyrant — in the run

**Concept:** a young storm drake whose breath is a rolling wall of thunder

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Stormcrag Tyrant | 7 | dragon-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- **dropped clause:** "a young storm drake whose breath is a rolling wall of thunder"
- read: def 5 / off 7 → 6; sustained 35 (1 × Bite); nova Thunder Wall 39; dmg 49

```
Stormcrag Tyrant

Large Dragon, Neutral

AC 18
Initiative +1 (11)

HP 105 (14d10 + 28)

Speed 30 ft., Fly 60 ft.

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
12
+1
+4
WIS
12
+1
+4
MOD
SAVE
CON
15
+2
+2
CHA
14
+2
+2

Skills Perception +4, Stealth +4

Immunities Thunder

Senses darkvision 120 ft., blindsight 30 ft.; Passive Perception 14

Languages Common, Draconic

CR 7 (XP 2,900; PB +3)

Actions

Bite. Melee Attack Roll: +7, reach 5 ft. 22 (4d8 + 4) Piercing damage plus 13 (3d8) Thunder damage.

Thunder Wall (Recharge 5-6). Constitution Saving Throw: DC 15, each creature in a 15-foot Cone. Failure: 39 (6d12) Thunder damage. Success: Half damage.

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

- Actions/Bite — the chassis
- Actions/Thunder Wall — the chassis

**Engine trace**

```
[path] homebrew — "a young storm drake whose breath is a rolling wall of thunder" (call)
[route] dragon type=Dragon mechanics=breath — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | dragon: ✓ ("young storm drake") | dragon: key "drake" (class body)
[concept] hints: dragon→body ✓ ("young storm drake") | breath→mechanics ✓ ("breath is a rolling wall of thunder")
[concept] resolve: archetype=dragon type=Dragon themes=draconic/breath mind=sapient style=— energy=Thunder mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: breath
[concept] signature elements: rolling wall of thunder breath [behavior] | storm-forged draconic body [body] | the squall-cloud it rides [aura]
[concept] identity: The young storm drake opens with its rolling thunder-breath, a wall of concussive sound that flattens foliage and shatters ear-drums before it closes to claw and bite. Every round after, it strafes low over prey, exhaling another thunder-wall to herd and deafen, then dives to pin and savage anything that scatters. Under pressure it climbs and circles rather than flee, hurling thunder from the clouds to wear foes down—a fledgling tyrant that fights like weather, not like an animal.
[concept] lore: Born in the eye of a perpetual squall that drift-anchors over the high crags, the young storm drake claims the whole thunderhead as its hoard and deafens any who cross beneath it.
[reskin] body type: dragon — the body outranks the role (recorded: dragon)
[reskin] nova capped: "Breath Weapon" 42 → 39 (the chassis nova obeys the cap: 39 at CR 7)
[reskin] donor: dragon-2 -> CR 7
[reskin] [path] decides: homebrew (the matcher agrees)
[reskin] name_element answered: Thunder Wall = literal; Deafening Peal = imagery
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline by rule: "the stormcrag tyrant" — the call answered "the crag tyrant" (kind), which the name does not support
[reskin] save dc derived: DC 14 -> 15 (8 + PB 3 + the sheet's best 4) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a young storm drake whose breath is a rolling wall of thunder" -> has (mechanical) [asked: at_will/save_area]
[reskin] menu pruned: action — escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating (the sheet cannot render them)
[reskin] signature idea (action): "The drake beats its wings and the thunderhead answers, rolling a peal of thunder down from the clouds to strike the ground below. It picks a spot it can see beneath it within its overhead reach; everyone clustered under that spot and anyone also touching the drake itself is slammed by the descending sound. Fires whenever it wants, but only while it is airborne above the chosen spot." [action/always/damage] — menu: gaze-single, snare, zone, execute, seal, shield-bash, lure (+ shelf: rampage, lay-on-hands, second-wind, affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, charge)
[reskin] decline reason: action — the call answered none and names it "no_fit"
[reskin] signature miss: action — "The drake beats its wings and the thunderhead answers, rolling a peal of thunder down from the clouds to strike the ground below. It picks a spot it can see beneath it within its overhead reach; everyone clustered under that spot and anyone also touching the drake itself is slammed by the descending sound. Fires whenever it wants, but only while it is airborne above the chosen spot." [action/always/damage] — the model found no template that holds it (offered: gaze-single, snare, zone, execute, seal, shield-bash, lure)
[reskin] signature idea (trait): "The drake's body is storm-forged: each time it is struck or grabbed, leftover thunder crackles off its hide into whoever touched it, so crowding it is punished. Its own thunder and its clinging charge leave foes ringing and unsteady in the air." [trait/on_being_hit/damage] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst)
[reskin] signature bound to the concept's verb: trait — heated-body (storm)
[reskin] word match declined by the call: heated-body, adhesive, fire-aura — the key word does not mean the mechanic here
[reskin] trait declined: "Crackling Hide" — bound only on the idea's own words (ring:idea) with no key in the concept; a meat body earns its trait by the user's verb (the sniper's tracker, critic 2026-09-29)
[reskin] weapons answered: Bite = none; Thunder Wall = none; Deafening Peal = none
[reskin] chassis nova: "Thunder Wall (Recharge 5-6)" — the dragon-2's own nova row (its "Breath Weapon", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] element immunity: Thunder (merged into the header write)
[reskin] dragon senses raised to tier: darkvision 120 added
[reskin] dragon languages: Draconic added (42/42 print dragons speak it)
[reskin] immunities stamped for type: Dragon -> Thunder
[reskin] asked but unanswered: "a young storm drake whose breath is a rolling wall of thunder" asked for at_will and no row binds the clause
```


---


### Wellmouth — in the run

**Concept:** name: the thing in the well | 

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Wellmouth | 5 | lurker-5-trap | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 5 / off 5 → 5; sustained 34 (2 × Bite); nova none; dmg 34

```
Wellmouth

Large Monstrosity, Unaligned

AC 20
Initiative -1 (9)

HP 93 (11d10 + 33)

Speed 10 ft., Climb 20 ft., Swim 10 ft.

MOD
SAVE
STR
16
+3
+6
INT
7
-2
-2
MOD
SAVE
DEX
8
-1
-1
WIS
16
+3
+3
MOD
SAVE
CON
17
+3
+3
CHA
6
-2
-2

Skills Perception +6, Stealth +5

Resistances Cold

Senses blindsight 30 ft. (blind beyond this radius); Passive Perception 16

Languages None

CR 5 (XP 1,800; PB +3)

Traits

Cold Brine Recoil. A creature that touches the wellmouth or hits it with a melee attack while within 5 feet of it takes 5 (1d10) Cold damage.

Actions

Multiattack. The wellmouth makes two Bite attacks. It can replace one attack with a use of Brine Siphon.

Bite. Melee Attack Roll: +6 (with Advantage if the target is Grappled by the wellmouth), reach 5 ft. 17 (4d6 + 3) Piercing damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 14).

Brine Siphon. Constitution Saving Throw: DC 14, one creature within 30 feet. Failure: 18 (4d8) Cold damage, and the wellmouth regains Hit Points equal to half the damage dealt. Success: Half damage only.

Bonus Actions

False Form. The wellmouth shape-shifts to resemble an ordinary object or fixture of the place it waits in while retaining its game statistics, or it returns to its true form. While it is motionless in its false form, it is indistinguishable from that feature.

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
- Actions/Bite — the chassis
- Actions/Brine Siphon — library seed drain
- Bonus Actions/False Form — the chassis
- Traits/Cold Brine Recoil — template heated-body; library draw (seed unstamped)

**Engine trace**

```
[path] homebrew — "the thing in the well" (call)
[route] lurker-trap type=Monstrosity mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | lurker-trap: ✓ ("the thing in the well") | lurker-trap: no line key in the words — the model's read of its quote
[concept] resolve: archetype=lurker type=Monstrosity themes=aquatic/subterranean mind=bestial style=trap energy=Cold mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: ambush from still water in a shaft [behavior] | a pool-skin of brine and hide disguised as the well's surface [body] | drowning, numbing grasp that drags prey under [behavior]
[concept] identity: The thing in the well lies at the bottom of its shaft in a loose, sloshing skin of brine and rotting hide, looking exactly like a stagnant pool until something leans over the rim; then it surges up the walls and swamps its prey. Every round after the first it fights half in and half out of the water — a drowning grasp on the ankle, a flex of cold brine that numbs before it drags the victim under. It has no patience and no cruelty — it is a stomach with a hiding place, but it will not abandon the well it has grown into, fighting to the death at the bottom of its shaft.
[concept] lore: A well left unopened for a generation sometimes remembers the thirst it swallowed, and something in the dark water grows a hide and a hunger to fill the hollow with a body.
[reskin] donor: lurker-5-trap -> CR 5
[reskin] row gated out: Swallow (engulf) — the concept did not claim this mechanic
[reskin] [path] decides: homebrew (the matcher agrees)
[reskin] reach folded: "Grasping Limb" (reach 50) and Reel leave — no tether in the concept; the grapple rides "Melee Attack" (the Giant Crab's shape)
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline declared: "the wellmouth" — the call's own answer (kind), built from the name
[reskin] inline form: "the wellmouth" — the model's own reading of the name
[reskin] save dc derived: DC 13 -> 14 (8 + PB 3 + the sheet's best 3) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "the thing in the well" -> has (descriptive), head
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "When prey leans or steps over the rim of the well, the wellmouth surges up the shaft walls in one convulsive heave, hurling its whole wet bulk out of the water to crash down on the ledge where the victim stands. The strike drives the target backward off-balance and drags them a step toward the opening, and anything caught dead still over the water can be gulped straight off the edge into the shaft" [rider/on_hit/movement] — menu: affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, isolation (+ shelf: leap, condition-payoff, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, terror-pulse, snare-bolt, slow-bolt, sensory-strike, drain, delayed-brand, zone-seed, exploiter, blighted-ground, patient-defense, self-invisibility, focus, feint-slip, coating, riposte)
[reskin] word match declined by the call: hook-rider, charge-push, leap, obstacle-pull, pounce — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit"
[reskin] signature miss: action — "When prey leans or steps over the rim of the well, the wellmouth surges up the shaft walls in one convulsive heave, hurling its whole wet bulk out of the water to crash down on the ledge where the victim stands. The strike drives the target backward off-balance and drags them a step toward the opening, and anything caught dead still over the water can be gulped straight off the edge into the shaft" [rider/on_hit/movement] — the model found no template that holds it (offered: affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, isolation, leap, exploiter, condition-payoff, obstacle-pull, patient-defense, riposte)
[reskin] fallback skipped by the floor: patient-defense (EV 0 vs 2.9)
[reskin] fallback skipped by the floor: sensory-strike (EV 2.5 vs 9.4)
[reskin] value check: "Vitality Leech" EV 14 vs floor 9.4 (one attack of 2) — added Success: Half; dice 11 → 18
[reskin] library seed drawn: drain -> Actions/"Vitality Leech" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The creature's hide weeps cold brine that clings to whatever strikes or grapples it, seeping into flesh and numbing it slow and heavy until the victim can barely pull away. The longer a body stays in contact with that wet skin, the more of its warmth the brine drinks, leaving it sluggish and easy to drag under." [trait/on_being_hit/condition] — menu: heated-body, absorption, bloodied-burst, resonant-body (+ shelf: adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, evasion, relentless-pursuit, bound, marking-light, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] word match declined by the call: absorption, spider-climb, aberrant-ground — the key word does not mean the mechanic here
[reskin] pick kept on the GM's own words: trait — "heated-body" has no key-table verb, but the call quotes "the thing in the well" from the description
[reskin] seat owes nothing: the trap line was the model's read of its quote, not a key in the words (a hermit was handed Assassinate, day-one 2026-09-30)
[reskin] signature template (trait): heated-body -> Traits/"Cold Brine Weep" ("The brine clings to whatever strikes or grapples it, seeping in — a creature tha [shape fit, no verb match]")
[reskin] weapons answered: Bite = none
[reskin] resistances derived: Cold
[reskin] multiattack replacement clause: It can replace one attack with a use of Vitality Leech.
[reskin] audit rename: "Cold Brine Weep" -> "Cold Brine Recoil"
[reskin] audit rename: "Vitality Leech" -> "Brine Siphon"
```


---


### Gravebound Greatsword — in the run

**Concept:** a skeleton with a greatsword

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Gravebound Greatsword | 6 | brute-5 | ok | ok | SOFT: reach | ok | ok | ok | ok | ok | ok | ok |

- structure · soft · reach: Actions/Greatsword: reach 10 on a Medium body with no tether word
- read: def 4 / off 6 → 5; sustained 44 (2 × Greatsword); nova none; dmg 44

```
Gravebound Greatsword

Medium Undead, Lawful Evil

AC 14
Initiative +3 (13)

HP 117 (18d8 + 36)

Speed 30 ft.

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
16
+3
+3
WIS
8
-1
-1
MOD
SAVE
CON
15
+2
+5
CHA
5
-3
-3

Skills Athletics +7, Perception +2

Vulnerabilities Bludgeoning

Immunities Poison; Exhaustion, Poisoned

Senses darkvision 60 ft.; Passive Perception 12

Languages Understands Common plus one other language but can't speak

CR 6 (XP 2,300; PB +3)

Traits

Great Weapon Master. When the greatsword hits a creature with its the greatsword, the attack deals an extra 3 damage.

Actions

Multiattack. The greatsword makes two attacks, using Greatsword or Shortbow in any combination.

Greatsword. Melee Attack Roll: +7, reach 10 ft. 22 (4d8 + 4) Slashing damage.

Shortbow. Ranged Attack Roll: +7, range 80/320 ft. 17 (3d8 + 4) Piercing damage.

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
- Actions/Greatsword — authored for this sheet; a named part; the GM's clause "a skeleton with a greatsword"; weapon greatsword
- Actions/Shortbow — print's own row, renamed; weapon shortbow
- Traits/Great Weapon Master — a declared feature; the GM's clause "a skeleton with a greatsword"

**Engine trace**

```
[path] twist — Skeleton (is) — "skeleton" (call)
[route] brute type=Undead mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | brute: ✓ ("a skeleton with a greatsword") | brute: no line key in the words — the model's read of its quote
[concept] name: provided_name rejected — "a skeleton with a greatsword…" is the description, not a name
[concept] resolve: archetype=brute type=Undead themes=grave/armed mind=mindless style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: massive two-handed greatsword [object] | relentless, tireless forward assault [behavior] | bone that outlasts its wielder [body]
[concept] identity: The skeleton wades in with a two-handed greatsword held in both bony hands, opening with a long, unhurried overhead swing that clears its reach. Every round after that it keeps the blade moving in wide cleaving arcs, stepping forward into anything that retreats rather than letting a foe reset. It has no fear and no cunning — it fights until shattered, conserving nothing and never yielding ground.
[concept] lore: Raised from a battlefield grave by a necromancer who needed a weapon that would never tire, it still remembers only the sword and the next swing.
[reskin] print canon array: STR 18, DEX 16, CON 15, INT 6, WIS 8, CHA 5 — the Skeleton's, STR fitted to +7
[reskin] donor: brute-5 -> CR 6
[reskin] [path] decides: twist on the Skeleton (the matcher agrees)
[reskin] print canon: "a skeleton with a greatsword" heads on the Skeleton — print's rows ride along; the seat stays
[reskin] repair round 1: 1 defect(s) — name "Greatsword" repeats the creature's own name — the sheet already says who acts; give the row its own word
[reskin] named parts: Greatsword (slot) — the user's words, the engine's numbers
[reskin] named parts landed: 1 attack row(s), 0 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline declared: "the greatsword" — the call's own answer (kind), built from the name; the rules would have said "Greatsword"
[reskin] inline on kit rows: "Greatsword" -> "the greatsword"
[reskin] inline form: "the greatsword" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a skeleton with a greatsword" -> has (mechanical) [asked: attack]
[reskin] signature idea (action): "It drives forward in an unbroken advance, blade already swinging, and the first thing in its path takes the full weight of the swing. If that swing lands, the sword keeps its momentum and can be swung again at a different nearby foe in the same breath — the greatsword never pauses to reset. This can only happen once between its turns; the momentum is spent and cannot be re-gathered that round." [rider/on_hit/damage] — menu: affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, charge (+ shelf: trample, leap, thrown-burst, throw-retrieve, shield-bash, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, rampage, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating)
[reskin] fit declined: "Unbroken Advance" — a print body takes only what the user's words ask; the call offered no quote, and the key table finds no verb either (the blacksmith's rally, critic-ten 2026-10-01)
[reskin] fallback stands down: the twist path has no shelf — the Skeleton's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "The skeleton was raised for the swing and nothing else, and it will not yield the ground it has taken. When it strikes a foe and that foe gives ground, the skeleton steps after it in the same motion, staying inside its own reach and keeping the blade between them." [trait/always/movement] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending, weapon-lodge)
[reskin] signature miss: trait — "The skeleton was raised for the swing and nothing else, and it will not yield the ground it has taken. When it strikes a foe and that foe gives ground, the skeleton steps after it in the same motion, staying inside its own reach and keeping the blade between them." [trait/always/movement] — no template on the shelf shares a verb with the concept or the idea (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst, heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending, weapon-lodge)
[reskin] weapons answered: Greatsword = greatsword; Hurlblade = none
[reskin] weapon declined: "Hurlblade" reads longsword from its name, but the call answered none — the row carries no weapon
[reskin] print canon alignment: Neutral -> Lawful Evil — the Skeleton's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "None" -> "Understands Common plus one other language but can't speak" — the Skeleton's
[reskin] print canon speed: 40 ft. -> 30 ft. — the Skeleton's walk; the concept's other modes stay
[reskin] print canon attack: "Hurlblade" -> "Shortbow" — the Skeleton's own ranged row
[reskin] immunities stamped for type: Undead -> Poison; Exhaustion, Poisoned
[reskin] print canon defenses: vulnerabilities none -> Bludgeoning — the Skeleton's own header lines
[reskin] vulnerability rejected — "Bludgeoning" has no warrant in the concept's own text (print's default is none)
[reskin] audit rewrite blocked — "Great Weapon Master" is engine-authored chassis text
[reskin] multiattack re-read — "Shortbow" joins the combination; "The greatsword makes two attacks, using Greatsword or Shortbow in any combination."
```


---


---

## Review batch — classes-eight-2026-10-19T13-28-29

The checker ran first. The gate table covers every block in the run; every block of the run follows. Each block carries its checker row above and its engine trace below. Hand-derive against the row first; then read for what predicates can't see.

### Gate table — the whole run

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Sessrak the Nerve-Taker | 5 | 2024 | skirmisher-3 | ok | SOFT: band, hot-offense | ok | ok | ok | ok | ok | ok | ok | ok | soft (1) | 0/1 | 7/7 |
| Vaelith Emberstep | 5 | 2024 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 5/5 |
| Dame Oriel | 5 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |
| Ser Aldric Vane | 6 (2014) | 2014 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |
| Gormak the Scarhide | 8 | 2024 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 5/5 |
| Ser Warden Aubrec | 4 | 2024 | defender-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 3/3 |
| Unmet Hour | 6 | 2024 | caster-6 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok | ok | soft (1) | 1/1 | 3/4 |
| Thurivald | 6 (2014) | 2014 | defender-5 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok | ok | soft (1) | 1/1 | 5/5 |
| Seraphine Oathbrand | 8 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 5/6 |
| Long-Chase | 3 | 2024 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 2/2 |
| Kessil the Lockpick | 4 | 2024 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |
| Ser Halric Vow | 7 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/3 |
| Whisker Shade | 3 | 2024 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |

**Dropped 2 of 15 user clauses** (coverage 87%); concept share 96% (54/56 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- none



---


### Long-Chase — lowest CR

**Concept:** a dire wolf that hunts in a pack

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Long-Chase | 3 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- **dropped clause:** "hunts in a pack"
- read: def 1 / off 3 → 2; sustained 24 (2 × Bite); nova none; dmg 24

```
Long-Chase

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

Pack Tactics. The long-chase has Advantage on an attack roll against a creature if at least one of the long-chase's allies is within 5 feet of the creature and the ally doesn't have the Incapacitated condition.

Actions

Multiattack. The long-chase makes two Bite attacks.

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
- Actions/Bite — the chassis

**Engine trace**

```
!! Error generating response: TypeError: Failed to fetch
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs?t=1792202639880:246:26)
    at http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1792416438352:1146:31
    at callLLM (http://localhost:5173/src/tools/statblock-generator/reskin/generate.mjs?t=1792416438352:1319:24)
    at fitSeat (http://localhost:5173/src/tools/statblock-generator/reskin/generate.mjs?t=1792416438352:3652:30)
    at generateReskin (http://localhost:5173/src/tools/statblock-generator/reskin/generate.mjs?t=1792416438352:3967:64)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1792416438352:1105:22)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1792416438352:657:5)
[reskin] network retry: Failed to fetch — retrying the call once
[path] twist — Dire Wolf (is) — "dire wolf" (call)
[route] skirmisher type=Beast mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | skirmisher: ✓ ("hunts in a pack") | skirmisher: no line key in the words — the model's read of its quote
[concept] resolve: archetype=skirmisher type=Beast themes=bestial/devouring mind=bestial style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: pack tactics [behavior] | harrying hit-and-run [behavior] | bone-crushing jaws [body]
[concept] identity: A dire wolf of the deep hunting runs, it circles in a loose crescent with its pack, letting a flanker draw the prey's eye while it darts across the blind side to hamstring and withdraw before the return swing. Every round it trades ground for angle, snapping at heels and calves to bleed the quarry's speed, then peeling away to let the next wolf take the bite. Bloodied, it does not break alone — it drops back into the pack's cover and keeps harrying until the prey falls or the pack loses its nerve.
[concept] lore: These overgrown wolves den in the old hunting wood and are bred to the chase, valuing a long and exhausting run over a quick kill.
[reskin] print canon array: STR 17, DEX 16, CON 15, INT 3, WIS 12, CHA 7 — the Dire Wolf's, DEX fitted to +5
[reskin] donor: skirmisher-3 -> CR 3
[reskin] [path] decides: twist on the Dire Wolf (the matcher agrees)
[reskin] print canon: "a dire wolf that hunts in a pack" heads on the Dire Wolf — print's rows ride along; the seat stays
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline declared: "the long-chase" — the call's own answer (kind), built from the name
[reskin] inline form: "the long-chase" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] lacks refused: "hunts in a pack" names no absence — nothing in it takes anything away
[reskin] clauses: "a dire wolf" -> has (descriptive), head | "hunts in a pack" -> has (descriptive)
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "When the long-chase snaps at a quarry that is already bleeding or worn down from the chase, it lunges to seize a leg in its jaws and wrenches, dragging the prey off balance and slowing it for a moment so the rest of the pack can close. The bitten creature has to fight free of the grip instead of simply moving away." [rider/on_hit/movement] — menu: affliction, contagion, charge-push, hook-rider, pounce, isolation, charge (+ shelf: trample, leap, gaze-single, snare, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, riposte)
[reskin] signature bound to the concept's verb: action — focus (hunt)
[reskin] word match declined by the call: hook-rider, affliction, disarm, contagion, charge-push, pounce, isolation, charge, focus — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit" after being shown focus, which the GM's words keyed
[reskin] key match declined: action — "focus" was ranked first on the call's own menu for hunt, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: action — "When the long-chase snaps at a quarry that is already bleeding or worn down from the chase, it lunges to seize a leg in its jaws and wrenches, dragging the prey off balance and slowing it for a moment so the rest of the pack can close. The bitten creature has to fight free of the grip instead of simply moving away." [rider/on_hit/movement] — the model found no template that holds it (offered: focus, affliction, contagion, charge-push, hook-rider, pounce, isolation, charge, disarm)
[reskin] fallback respects the call: focus, disarm left the shelf — the call declined them for this sheet
[reskin] fallback stands down: the twist path has no shelf — the Dire Wolf's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 15 already beats print's AC 13 at CR 3, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "Its jaws are built to break things held inside them: a creature the long-chase has bitten and not yet shaken loose takes savage crushing damage each moment it stays in the wolf's grip. The harder the prey struggles, the worse the bone-crushing bite bleeds it." [trait/always/damage] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature bound to the concept's verb: trait — faultless-tracker (hunts, hunted)
[reskin] word match declined by the call: faultless-tracker, bloodied-fury, adhesive — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit" after being shown faultless-tracker, which the GM's words keyed
[reskin] key match declined: trait — "faultless-tracker" was ranked first on the call's own menu for hunts+hunted, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: trait — "Its jaws are built to break things held inside them: a creature the long-chase has bitten and not yet shaken loose takes savage crushing damage each moment it stays in the wolf's grip. The harder the prey struggles, the worse the bone-crushing bite bleeds it." [trait/always/damage] — the model found no template that holds it (offered: faultless-tracker, false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] concept-first trait skipped: faultless-tracker — the call read its match as a collision (the word is a modifier, or the sheet already answers it)
[reskin] weapons answered: Bite = none
[reskin] languages held: None stands — INT 3 on a Beast speaks nothing, whatever the mind read said
[reskin] print canon trait: Pack Tactics — "a dire wolf that hunts in a pack" is the Dire Wolf (print's own row)
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the seat's, not the Dire Wolf's
[reskin] print canon: chassis row leaves — Traits/"Pack Circle" is the seat's, not the Dire Wolf's
```


---


### Seraphine Oathbrand — highest CR

**Concept:** an oathsworn crusader who smites the unclean and mends her soldiers

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Seraphine Oathbrand | 8 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 7 / off 8 → 7.5; sustained 54 (2 × Spear); nova none; dmg 54

```
Seraphine Oathbrand

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

Languages Common, Celestial

CR 8 (XP 3,900; PB +3)

Traits

Aura of Authority. While in a 10-foot Emanation originating from Seraphine, Seraphine and its allies have Advantage on attack rolls and saving throws, provided Seraphine doesn't have the Incapacitated condition.

Actions

Multiattack. Seraphine makes two Spear attacks. It can replace one attack with a use of Brand of Vengeance.

Spear. Melee or Ranged Attack Roll: +8, reach 5 ft. or range 20/60 ft. 27 (5d8 + 5) Piercing damage.

Brand of Vengeance. Dexterity Saving Throw: DC 16, one creature within 60 feet. Failure: Until the end of Seraphine's next turn, the target sheds dim light in a 10-foot radius, it can't benefit from the Invisible condition, and attack rolls against it have Advantage.

Shield Bash. Strength Saving Throw: DC 16, one creature within 5 feet that Seraphine can see. Failure: 27 (6d8) Bludgeoning damage. If the target is a Medium or smaller creature, it has the Prone condition. Success: Half damage only.

Bonus Actions

Lay on Hands (2/Day). Seraphine touches a creature within 5 feet of itself and restores 27 (6d8) Hit Points to it.

Divine Smite (2/Day). Seraphine charges its next strike: the first time it hits with an attack before the end of its next turn, the target takes an extra 14 (4d6) Radiant damage.

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
- Actions/Spear — print's own row, renamed; weapon spear
- Actions/Brand of Vengeance — template reveal; library draw (seed unstamped); binds the GM's words: light
- Actions/Shield Bash — print's own row
- Bonus Actions/Lay on Hands — template lay-on-hands; paladin kit; the GM's clause "mends her soldiers"
- Bonus Actions/Divine Smite — template coating; paladin kit; the GM's clause "smites the unclean"; energy Radiant

**Engine trace**

```
[path] class_npc — class paladin — "crusader" (call)
[route] caster-warpriest (artillery) type=Humanoid mechanics=none — casts: implied by the kind — "smites the unclean and mends her soldier" | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | caster-warpriest: ✓ ("smites the unclean and mends her soldier") | caster-warpriest: key "smites" (class verb)
[concept] hints: warpriest→style ✓ (""an oathsworn crusader who smites"")
[concept] resolve: archetype=caster type=Humanoid themes=armed/celestial mind=sapient style=warpriest energy=Radiant mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: smiting the unclean with holy-energized weapon strikes [behavior] | spoken prayers that mend her soldiers as war-gear [behavior] | iron-plated oathsworn armor and shield [object]
[concept] identity: Opens by calling down a radiant smite on the most visibly corrupt foe in reach, then settles into a rhythm of shield-wall strikes and spoken prayers that stitch her wounded soldiers back together mid-fight. She holds the line rather than chasing — blade and benediction alternating with every unit in her sight, so the longer the melee runs the harder her side is to break. Under pressure she plants like iron and refuses to yield an inch, fighting to the last of her strength because retreat is an oath she has already sworn never to take.
[concept] lore: A sworn sword of a militant holy order, she took a vow to cleanse the unclean from the battlefield and to spend her own life before she abandons a single soldier to die beside her.
[reskin] energy withheld: Radiant on a Humanoid with no Radiant in the concept's own words (fixed phrases read first)
[reskin] [path] class body: the paladin stands on the Gladiator — the class's own print block, nearest CR 8
[reskin] print canon route: the Gladiator is not a caster first and keys STR 18 over DEX 15 — it casts no spells — the caster family stands down for the plain defender line
[reskin] print canon array: STR 20, DEX 15, CON 16, INT 10, WIS 12, CHA 15 — the Gladiator's, STR fitted to +8
[reskin] donor: defender-5 -> CR 8
[reskin] style unserved: "warpriest" has no defender line — the plain line ships (resolve's style signal is noisy; not re-routed)
[reskin] row gated out: Guard Aura (aura) — the concept did not claim this mechanic
[reskin] [path] decides: class_npc on the Gladiator · class paladin (the matcher would have said homebrew)
[reskin] print canon: "an oathsworn crusader who smites the unclean and mends her soldiers" heads on the Gladiator — print's rows ride along; the seat stays
[reskin] repair round 1: 1 defect(s) — "Radiant Smite" deals Radiant on a Humanoid whose concept names no Radiant — a name is not a warrant; use a physical type
[reskin] kit energy: "Divine Smite" deals Radiant, not Bludgeoning — the shape's own fiction
[reskin] class kit: paladin — "crusader": Aura of Authority (Hobgoblin Captain/Aura of Authority), Lay on Hands (2/Day) (lay-on-hands), Divine Smite (2/Day) (coating as Divine Smite)
[reskin] inline declared: "Seraphine" — the call's own answer (person), built from the name
[reskin] inline form: "Seraphine" — the model's own reading of the name
[reskin] energy kept on a base row: "Radiant Smite" Radiant — the row's own noun pays for it
[reskin] save dc derived: DC 15 -> 16 (8 + PB 3 + the sheet's best 5) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "an oathsworn crusader" -> has (descriptive), head | "smites the unclean" -> has (mechanical) [asked: attack] | "mends her soldiers" -> has (mechanical) [asked: heal]
[reskin] menu pruned: action — snap-shot (the sheet cannot render them)
[reskin] signature idea (action): "When Seraphine strikes an unclean or corrupt foe with her holy-charged weapon, the blow brands the target and lights up every enemy near it, and the soldiers fighting beside her surge forward to exploit the opening. Her allies who can see the branded foe find their next strikes against it truer and their footing steadier, as if her oath has briefly made the unclean the only thing in the world wort" [rider/on_hit/condition] — menu: stunning-strike, charge-push, hook-rider (+ shelf: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, patient-defense, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, riposte)
[reskin] signature bound to the concept's verb: action — rally (mend)
[reskin] word match declined by the call: rally, aggro-curse — the key word does not mean the mechanic here
[reskin] signature template: reveal -> Actions/"Brand of Vengeance (2/Day)" ("the holy-charged blow brands the unclean foe and lights it up, making it the onl [verb: light:idea]")
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 20 already beats print's AC 16 at CR 8, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "Seraphine's oathbound plate and shield grow heavier and more unyielding the longer she holds her ground, and every wound her soldiers take in her sight steels her instead of slowing her; the longer the line holds, the harder she becomes to break." [trait/always/defense] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending, weapon-lodge)
[reskin] word match declined by the call: bloodied-fury, bloodied-burst, guarded-stance, undead-fortitude, adhesive, berserk, relentless-pursuit, bound — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "Seraphine's oathbound plate and shield grow heavier and more unyielding the longer she holds her ground, and every wound her soldiers take in her sight steels her instead of slowing her; the longer the line holds, the harder she becomes to break." [trait/always/defense] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, bloodied-burst, resonant-body)
[reskin] weapons answered: Longsword = longsword; Radiant Smite = none
[reskin] print canon alignment: Lawful Good -> Neutral — the Gladiator's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common, Celestial" -> "Common, Celestial" — the Gladiator's plus the concept's Celestial
[reskin] print canon attack: "Spear" keeps print's hybrid frame — reach 5 ft. or range 20/60 ft. (the Gladiator's weapon is thrown)
[reskin] print canon attack: "Longsword" -> "Spear" — the Gladiator's own row
[reskin] print canon rows: Radiant Smite leave — the Gladiator has one melee row (Spear), and Multiattack reads print's
[reskin] print canon row priced: Shield Bash — dice 9 → 27
[reskin] print canon row: Actions/Shield Bash — the Gladiator's own
[reskin] dead control row: "Brand of Vengeance" sheds its gate — no damage, no KO condition; it joins the Multiattack menu instead
[reskin] multiattack replacement clause: It can replace one attack with a use of Brand of Vengeance.
[reskin] audit rewrite blocked — "Shield Bash" is engine-authored chassis text
[reskin] audit rewrite blocked — "Shield Bash" is engine-authored chassis text
[reskin] audit rename blocked — "Searing Mark" claims an element "Brand of Vengeance" does not pay (no damage)
```


---


### Sessrak the Nerve-Taker — a 2024 sheet

**Concept:** a lizardfolk monk who strikes pressure points with an open hand

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Sessrak the Nerve-Taker | 5 | skirmisher-3 | ok | SOFT: band, hot-offense | ok | ok | ok | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 8 (print at 5 reads 2–8.5, n=52)
- bands · soft · hot-offense: offense alone reads CR 11, 6 over; the HP axis pulls the read to 8
- **dropped clause:** "strikes pressure points with an open hand"
- read: def 5 / off 11 → 8; sustained 70 (2 × Shortsword); nova none; dmg 70

```
Sessrak the Nerve-Taker

Medium Humanoid, Neutral

AC 16
Initiative +4 (14)

HP 91 (14d8 + 28)

Speed 30 ft., Swim 30 ft.

MOD
SAVE
STR
11
+0
+0
INT
16
+3
+3
MOD
SAVE
DEX
18
+4
+7
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
10
+0
+0

Skills Perception +3, Stealth +7

Resistances Poison

Senses Passive Perception 13

Languages Common, Thieves' cant, Draconic

CR 5 (XP 1,800; PB +3)

Traits

Hold Breath. Sessrak can hold its breath for 15 minutes.

Marsh Stride. Difficult Terrain composed of mud doesn't cost Sessrak extra movement, and Sessrak can move across mud without needing to make an ability check.

Evasion. If Sessrak is subjected to an effect that allows it to make a Dexterity saving throw to take only half damage, Sessrak instead takes no damage if it succeeds on the save and only half damage if it fails. It can't use this trait if it has the Incapacitated condition.

Actions

Multiattack. Sessrak makes two attacks, using Shortsword or Light Crossbow in any combination.

Shortsword. Melee Attack Roll: +7, reach 5 ft. 18 (4d6 + 4) Piercing damage plus 17 (5d6) Poison damage, and the target has the Poisoned condition until the start of the assassin's next turn. Once on each of Sessrak's turns when it hits with this attack, the target is subjected to the following effect. Constitution Saving Throw: DC 13. Failure: The target has the Stunned condition until the end of Sessrak's next turn.

Light Crossbow. Ranged Attack Roll: +7, range 80/320 ft. 17 (3d8 + 4) Piercing damage.

Bonus Actions

Patient Defense. Sessrak takes the Dodge action.

Cunning Action. Sessrak takes the Dash, Disengage, or Hide action.

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
- Traits/Evasion — print's own row
- Actions/Multiattack — the chassis
- Actions/Shortsword — print's own row, renamed; a declared feature; the GM's clause "monk"; weapon shortsword
- Actions/Light Crossbow — print's own row, renamed; weapon light crossbow
- Bonus Actions/Patient Defense — template patient-defense; monk kit; the GM's clause "monk"
- Bonus Actions/Cunning Action — print's own row

**Engine trace**

```
[path] class_npc — class monk — species lizardfolk — "monk" (call)
[route] skirmisher type=Humanoid mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | skirmisher: ✓ ("a lizardfolk monk who strikes pressure p") | skirmisher: no line key in the words — the model's read of its quote
[concept] name: provided_name rejected — "a lizardfolk monk who strikes pressure p…" is the description, not a name
[concept] resolve: archetype=skirmisher type=Humanoid themes=venomous/mind mind=sapient style=— energy=Poison mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: open-palm pressure-point strikes [behavior] | cold-blooded reptilian body [body] | dart in, dart out skirmishing [behavior]
[concept] identity: The Pressure-Point Adept opens a fight by circling at the edge of reach, then darts in to land an open-palm strike on a nerve cluster before slipping back out before the target can answer. Every round after, it keeps moving through the scrum—using allies or terrain to break pursuit—looking for the one clean tap that will deaden an arm or drop a foe's knees. It is patient and disciplined rather than savage, fighting to submission but withdrawing into its warren-blooded kin if the exchanges go badly.
[concept] lore: Raised among lizardfolk who learned that the swamp's most feared predators are not the ones with the biggest teeth, it seeks challengers whose bodies it can study and unmake one pressure point at a time.
[reskin] energy withheld: Poison on a Humanoid with no Poison in the concept's own words (fixed phrases read first)
[reskin] [path] class body: the monk stands on the Assassin — the class's own print block, nearest CR 5
[reskin] print canon array: STR 11, DEX 18, CON 14, INT 16, WIS 11, CHA 10 — the Assassin's; DEX 18 outranks the card's +6, so the sheet rolls +7 (raise-only)
[reskin] donor: skirmisher-3 -> CR 5
[reskin] [path] decides: class_npc on the Assassin · class monk (the matcher would have said homebrew)
[reskin] print canon: "a lizardfolk monk who strikes pressure points with an open hand" heads on the Assassin — print's rows ride along; the seat stays
[reskin] row evicted for the cap: Traits/"Slip Step" (chassis filler) leaves so "Marsh Stride" fits — the cap evicts by priority, it does not refuse the newcomer
[reskin] species kit: lizardfolk — "monk": Hold Breath (Hydra/Hold Breath), Marsh Stride (terrain-walk, authored); Swim 30 ft.
[reskin] row evicted for the cap: Bonus Actions/"Fleet Agility" (chassis filler) leaves so "Patient Defense" fits — the cap evicts by priority, it does not refuse the newcomer
[reskin] class kit: monk — "monk": Stunning Strike (stunning-strike, rides Palm Strike), Patient Defense (patient-defense)
[reskin] inline declared: "Sessrak" — the call's own answer (person), built from the name
[reskin] inline form: "Sessrak" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a lizardfolk monk" -> has (descriptive), head | "strikes pressure points with an open hand" -> has (mechanical) [asked: on_hit/attack]
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "Sessrak takes a breath and reads the nearest foe's body, then darts in and taps one cold nerve cluster with an open palm. The struck foe's limbs go dead and clumsy — its weapon arm sags, or its legs buckle — so it can barely strike or flee, and Sessrak slips back out through the mud before it can answer. This can only be attempted once the target has already been stunned by Sessrak's palm, while t" [rider/on_hit/condition] — menu: charge-push, hook-rider, pounce, isolation, bolt-mark, charge (+ shelf: trample, leap, gaze-single, snare, condition-payoff, throw-retrieve, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, exploiter, rampage, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte)
[reskin] signature bound to the concept's verb: action — riposte (opening)
[reskin] word match declined by the call: disarm, feint-slip, throw-retrieve, spew, riposte, charge-push, hook-rider, pounce, isolation, bolt-mark, charge — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit" after being shown riposte, which the GM's words keyed
[reskin] key match declined: action — "riposte" was ranked first on the call's own menu for opening, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: action — "Sessrak takes a breath and reads the nearest foe's body, then darts in and taps one cold nerve cluster with an open palm. The struck foe's limbs go dead and clumsy — its weapon arm sags, or its legs buckle — so it can barely strike or flee, and Sessrak slips back out through the mud before it can answer. This can only be attempted once the target has already been stunned by Sessrak's palm, while t" [rider/on_hit/condition] — the model found no template that holds it (offered: riposte, charge-push, hook-rider, pounce, isolation, bolt-mark, charge, disarm, feint-slip, throw-retrieve, spew)
[reskin] fallback respects the call: feint-slip, disarm left the shelf — the call declined them for this sheet
[reskin] fallback stands down: the class_npc path has no shelf — the Assassin's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 16 already beats print's AC 15 at CR 5, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "Sessrak's cold reptile blood lets it stay perfectly still for as long as it likes — it can hold a crouch at the swamp's edge or pressed to a tree for hours without twitching, waiting for a foe to expose a pressure point. Only sudden heat breaks the stillness, forcing it to abandon the ambush and move." [trait/always/movement] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] word match declined by the call: false-appearance, terrain-walk, assassinate, uncanny-sense — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "Sessrak's cold reptile blood lets it stay perfectly still for as long as it likes — it can hold a crouch at the swamp's edge or pressed to a tree for hours without twitching, waiting for a foe to expose a pressure point. Only sudden heat breaks the stillness, forcing it to abandon the ambush and move." [trait/always/movement] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst, bloodied-burst)
[reskin] weapons answered: Palm Strike = none; Stone Sling = sling
[reskin] weapon table: "Stone Sling" — a launcher, never thrown, range 30/120
[reskin] speed by body: a Humanoid walks 30 ft. (print's people; a hermit ran 50 — critic's audit 2026-10-02)
[reskin] speed by concept: dropped Climb 30 ft. — the concept's movement set decides
[reskin] languages by mind: "Draconic" -> "Common, Draconic" (sapient)
[reskin] print canon alignment: Lawful Neutral -> Neutral — the Assassin's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common, Draconic" -> "Common, Thieves' cant, Draconic" — the Assassin's plus the concept's Draconic
[reskin] print canon attack: "Palm Strike" -> "Shortsword" — the Assassin's own row
[reskin] print canon attack: "Stone Sling" -> "Light Crossbow" — the Assassin's own ranged row
[reskin] print canon defenses: resistances none -> Poison — the Assassin's own header lines
[reskin] print canon trait: Evasion — "a lizardfolk monk who strikes pressure points with an open hand" is the Assassin (print's own row)
[reskin] print canon row: Bonus Actions/Cunning Action — the Assassin's own
[reskin] asked but unanswered: "strikes pressure points with an open hand" asked for on_hit and no row binds the clause
audit finding below confidence gate: Shortsword 2014-format condition phrasing ('has the [condition] condition') rather than 2024-format 'is Poisoned until'.
[reskin] species kit: Swim 30 ft. — the lizardfolk's
```


---


### Vaelith Emberstep — a print donor

**Concept:** a tiefling rogue who stalks the rooftops of the old quarter

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Vaelith Emberstep | 5 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 5 / off 5 → 5; sustained 34 (2 × Scimitar); nova none; dmg 34

```
Vaelith Emberstep

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

Assassinate. During the first round of each combat, Vaelith has Advantage on attack rolls against any creature that hasn't taken a turn. If Vaelith hits a creature during that round, the target takes an extra 9 (2d8) Slashing damage.

Evasion. If Vaelith is subjected to an effect that allows it to make a Dexterity saving throw to take only half damage, Vaelith instead takes no damage if it succeeds on the save and only half damage if it fails. It can't use this trait if it has the Incapacitated condition.

Actions

Multiattack. Vaelith makes two attacks, using Scimitar or Pistol in any combination.

Scimitar. Melee Attack Roll: +6, reach 5 ft. 17 (4d6 + 3) Slashing damage.

Pistol. Ranged Attack Roll: +6, range 30/90 ft. 16 (3d8 + 3) Piercing damage.

Bonus Actions

Cunning Action. Vaelith takes the Dash, Disengage, or Hide action.

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
- Actions/Scimitar — print's own row, renamed; weapon scimitar
- Actions/Pistol — print's own row, renamed; weapon pistol
- Bonus Actions/Cunning Action — rogue kit; the GM's clause "rogue"

**Engine trace**

```
[path] class_npc — class rogue — species tiefling — "rogue" (call)
[route] skirmisher-skulker type=Humanoid mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | skirmisher-skulker: ✓ ("stalks the rooftops of the old quarter") | skirmisher-skulker: key "stalks" (class verb)
[concept] resolve: archetype=skirmisher type=Humanoid themes=fiendish/armed mind=sapient style=skulker energy=Fire mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: stalking the rooftops unseen [behavior] | strike from hiding with advantage [behavior] | infernal tiefling bloodline [body]
[concept] identity: This tiefling rogue shadows the old quarter's rooftops, opening each fight with a crossbow bolt or a dagger from the dark before her quarry ever hears a footfall. Every round after that she repositions along eaves and gables to strike again with advantage, using the heights to hide and vanish between blows. When bloodied, she retreats across the rooftops rather than press a losing fight, favoring her own skin over the kill.
[concept] lore: Born under a cursed sign in the crowded tenements of the old quarter, she learned the rooftops as a child and now sells her silent work to whoever will pay, guarding her territory from any who would claim it.
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
[reskin] row evicted for the cap: Traits/"Eave Runner" (chassis filler) leaves so "Evasion" fits — the cap evicts by priority, it does not refuse the newcomer
[reskin] class kit: rogue — "rogue": Evasion (evasion), Assassinate (assassinate)
[reskin] inline declared: "Vaelith" — the call's own answer (person), built from the name
[reskin] inline form: "Vaelith" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a tiefling rogue" -> has (descriptive), head | "stalks the rooftops of the old quarter" -> has (mechanical) [asked: at_will/movement]
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "When Vaelith strikes a creature from hiding, the wound stays quiet and bleeding—the target doesn't notice the blood until the next moment its guard slips, and the pain flares when it tries to act against her. Until it shakes the wound off, every attempt it makes to close on her or call for help staggers short as the cut bites deeper." [rider/on_hit/condition] — menu: affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, isolation, bolt-mark (+ shelf: leap, gaze-single, snare, condition-payoff, throw-retrieve, shield-bash, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, exploiter, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte)
[reskin] signature bound to the concept's verb: action — focus (stalk)
[reskin] word match declined by the call: rampage, focus, feint-slip — the key word does not mean the mechanic here
[reskin] fit declined: "Quiet Bleed" — a print body takes only what the user's words ask; the call offered no quote, and the key table finds no verb either (the blacksmith's rally, critic-ten 2026-10-01)
[reskin] fallback respects the call: focus, rampage left the shelf — the call declined them for this sheet
[reskin] fallback stands down: the class_npc path has no shelf — the Bandit Captain's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 16 already beats print's AC 15 at CR 5, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "Vaelith reads the old quarter's rooftops like a map of her own veins, and any height she reaches becomes her hunting blind—she melts into gables, chimneys, and eaves as easily as open shadow, so quarry who scan the skyline for her find only the city's silhouette." [trait/always/defense] — menu: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending, gaze-aura)
[reskin] signature bound to the concept's verb: trait — faultless-tracker (stalks, stalk)
[reskin] word match declined by the call: spider-climb, faultless-tracker — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit" after being shown faultless-tracker, which the GM's words keyed
[reskin] key match declined: trait — "faultless-tracker" was ranked first on the call's own menu for stalks+stalk, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: trait — "Vaelith reads the old quarter's rooftops like a map of her own veins, and any height she reaches becomes her hunting blind—she melts into gables, chimneys, and eaves as easily as open shadow, so quarry who scan the skyline for her find only the city's silhouette." [trait/always/defense] — the model found no template that holds it (offered: faultless-tracker, false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, blurred-form, death-burst)
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
[reskin] ask vs row MISMATCH: "stalks the rooftops of the old quarter" -> "Assassinate" — trigger: asked at_will, row reads on_hit
audit finding below confidence gate: Assassinate The trigger condition depends on whether the target has taken a turn, so Vaelith's own initiative position relative to targets must be tracked; the block gives no way to resolve 'first round' ordering and an ability usable on its own turn before any target has acted is fine but ambiguous for targets that have not yet had their slot.
[reskin] species kit: resistance Fire — the tiefling's
[harness] re-rolled Traits/"Assassinate" -> "Rooftop Stalker" [catalog: faultless-tracker]
```

**Re-roll — one entry, replaced**

```
Traits / BEFORE  Assassinate: During the first round of each combat, Vaelith has Advantage on attack rolls against any creature that hasn't taken a turn. If Vaelith hits a creature during that round, the target takes an extra 9 (2d8) Slashing damage.
Traits / AFTER   Rooftop Stalker: Vaelith knows the direction and distance to any creature it has damaged within the last 24 hours, as long as the two of them are on the same plane of existence.
provenance: catalog template "faultless-tracker", binds stalks, stalk
```


---


### Unmet Hour — one marked soft

**Concept:** a court wizard who is never where you struck and steps away

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Unmet Hour | 6 | caster-6 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok | ok |

- donor · soft · print-rows: rows outside print, the named seat and the keyed seeds: Actions/Slam
- read: def 3 / off 5 → 4; sustained 36 (3 × Slam); nova none; dmg 36

```
Unmet Hour

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

Senses Passive Perception 14

Languages Common and any three languages

CR 6 (XP 2,300; PB +3)

Actions

Multiattack. The unmet hour makes three Slam attacks.

Slam. Melee Attack Roll: +6 reach 5 ft. 12 (2d8 + 3) Bludgeoning damage.

Spellcasting. The unmet hour casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 14):

- At Will: Detect Magic, Light, Mage Armor, Mage Hand, Prestidigitation
- 2/Day Each: Fireball, Invisibility
- 1/Day Each: Cone of Cold, Fly

Bonus Actions

Misty Step (3/Day). The unmet hour casts Misty Step, using the same spellcasting ability as Spellcasting.

Reactions

Protective Magic (3/Day). Trigger: The unmet hour is hit by an attack roll. Response: The unmet hour casts Shield in response, gaining a +5 bonus to AC until the start of its next turn, including against the triggering attack.

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
- Actions/Slam — the chassis
- Actions/Spellcasting — print's own row
- Reactions/Protective Magic — mage kit; the GM's clause "wizard"
- Bonus Actions/Misty Step — mage kit; the GM's clause "is never where you struck and steps away"

**Engine trace**

```
[path] class_npc — class mage — "wizard" (call)
[route] caster (artillery) type=Humanoid mechanics=teleport — casts: implied by the kind — "a court wizard" | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | caster: ✓ ("a court wizard") | caster: no line key in the words — the model's read of its quote
[concept] resolve: archetype=caster type=Humanoid themes=arcane/uncanny mind=sapient style=— energy=Force mix=energy identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: teleport
[concept] signature elements: never where the blow lands; steps aside a half-step ahead of the strike [behavior] | arcane bolts and blasts delivered between displacements [behavior] | a body that is thinning into its own shadow [body]
[concept] identity: The court wizard opens by stepping half a pace out of the world, letting the first blow pass through the empty air where it stood, then answers with a precise arcane bolt before drifting further back. Every round it trades ground for distance, never in the spot its foes committed to, until it has bled the fight into a corridor of misses. It is patient and contemptuous, treating the duel as choreography it has already rehearsed, and slips away rather than die.
[concept] lore: A palace mage who learned to keep the one appointment no assassin can plan for, it now serves no court but its own reflection — stepping out of every blow a former patron pays to land.
[reskin] energy withheld: Force on a Humanoid with no Force in the concept's own words (fixed phrases read first)
[reskin] [path] class body: the mage stands on the Mage — the class's own print block, nearest CR 6
[reskin] print canon defenses: HP 89 -> 81, AC 15 -> 15 — the Mage's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 9, DEX 14, CON 11, INT 17, WIS 12, CHA 11 — the Mage's at its own CR; attack +7 -> +6, DC 14 (print's)
[reskin] donor: caster-6 -> CR 6
[reskin] [path] decides: class_npc on the Mage · class mage (the matcher would have said twist Mage)
[reskin] print canon: "a court wizard who is never where you struck and steps away" heads on the Mage — print's rows ride along; the seat stays
[reskin] repair round 1: 2 defect(s) — name "Arcane Bolt" is a launcher but the row swings in melee — a crossbow never has reach; use a thrown weapon or a blade | "Arcane Bolt" deals Force on a Humanoid whose concept names no Force — a name is not a warrant; use a physical type
[reskin] class kit: Protective Magic — the sheet already carries it, so the mage kit adopts that row: the cap may no longer read it as filler
[reskin] class kit: mage — "wizard": Misty Step (3/Day) (Mage/Misty Step)
[reskin] inline declared: "the unmet hour" — the call's own answer (kind), built from the name
[reskin] inline form: "the unmet hour" — the model's own reading of the name
[reskin] energy withheld on a base row: "Arcane Bolt" Force -> Piercing (the row's own noun; a Humanoid deals no Force its concept never gave it)
[reskin] lacks asked: nothing taken away
[reskin] lacks not claimed: "is never where you struck and steps away" reads like a lack to the words, and the call's list did not name it
[reskin] clauses: "a court wizard" -> has (descriptive), head | "is never where you struck and steps away" -> has (mechanical) [asked: on_being_hit/movement]
[reskin] menu pruned: action — snap-shot (the sheet cannot render them)
[reskin] signature idea (action): "The unmet hour fires a bolt that marks where the target stood, and thereafter that spot is where it will not be struck — it flinches one half-step sideways through its own afterimage, leaving the bolt's scar as a decoy. Until the hour's next turn, the first attacker who swings at it mistakes the afterimage for the wizard and their blow lands on empty air." [rider/on_hit/defense] — menu: bolt-restrain, bolt-drag, bolt-mark (+ shelf: thrown-burst, gaze-single, snare, zone, execute, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, snare-bolt, slow-bolt, sensory-strike, herd, thrown-burst-seed, drain, delayed-brand, curse-debt, zone-seed, reveal, wind-up, blighted-ground, lay-on-hands, aggro-curse, self-invisibility, rally, phase-slip)
[reskin] signature bound to the concept's verb: action — phase-slip (step)
[reskin] word match declined by the call: phase-slip, bolt-mark, bolt-restrain, bolt-drag, snare-bolt, delayed-brand, reveal, aggro-curse — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit" after being shown phase-slip, which the GM's words keyed
[reskin] key match declined: action — "phase-slip" was ranked first on the call's own menu for step, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: action — "The unmet hour fires a bolt that marks where the target stood, and thereafter that spot is where it will not be struck — it flinches one half-step sideways through its own afterimage, leaving the bolt's scar as a decoy. Until the hour's next turn, the first attacker who swings at it mistakes the afterimage for the wizard and their blow lands on empty air." [rider/on_hit/defense] — the model found no template that holds it (offered: phase-slip, bolt-restrain, bolt-drag, bolt-mark, snare-bolt, delayed-brand, reveal, aggro-curse)
[reskin] fallback respects the call: phase-slip, snare-bolt, delayed-brand, aggro-curse left the shelf — the call declined them for this sheet
[reskin] fallback stands down: the class_npc path has no shelf — the Mage's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "Its body is a shadow the palace forgot to dismiss: whenever it is struck by something it can see, the blow passes into the thinning outline and leaves it sliding a pace toward its own shadow, so the same attack never finds it twice from the same angle. It is always better off against a foe it has already shown its back to." [trait/on_being_hit/movement] — menu: absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst, evasion)
[reskin] signature bound to the concept's verb: trait — evasion (never where)
[reskin] word match declined by the call: evasion — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit" after being shown evasion, which the GM's words keyed
[reskin] key match declined: trait — "evasion" was ranked first on the call's own menu for never where, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: trait — "Its body is a shadow the palace forgot to dismiss: whenever it is struck by something it can see, the blow passes into the thinning outline and leaves it sliding a pace toward its own shadow, so the same attack never finds it twice from the same angle. It is always better off against a foe it has already shown its back to." [trait/on_being_hit/movement] — the model found no template that holds it (offered: evasion, absorption, bloodied-burst, resonant-body, marking-light)
[reskin] concept-first trait skipped: evasion — the call read its match as a collision (the word is a modifier, or the sheet already answers it)
[reskin] weapons answered: Arcane Bolt = none
[reskin] weapon declined: "Arcane Bolt" reads crossbow from its name, but the call answered none — the row carries no weapon
[reskin] weapon table: "Arcane Bolt" — a launcher, never thrown, range 80/320
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] print canon languages: "Common" -> "Common and any three languages" — the Mage's
[reskin] print canon multiattack: "The unmet hour makes three Arcane Burst attacks." — the Mage's own
[reskin] ranged row narrowed, not removed: "Arcane Bolt" is the only attack on the sheet — the Mage carries no ranged row, so the row becomes melee at reach 5 rather than leaving a sheet with nothing to attack with
[reskin] attack name by anatomy: "Arcane Bolt" -> "Slam" — bolt is a ranged noun on a melee row
[reskin] attack name by anatomy: "Slam" -> "Slam" — a slam deals Bludgeoning, not Piercing
[reskin] print canon row: Actions/Spellcasting — print's own list replaces the chassis's
[reskin] ask vs row MISMATCH: "is never where you struck and steps away" -> "Misty Step" — trigger: asked on_being_hit, row reads at_will
audit finding below confidence gate: Protective Magic (3/Day) *Shield* has a casting time of 1 reaction, so the 3/Day reaction expenditure and the flat printed +5 bonus double-count the same mechanics and force the GM to reconcile the statblock's limiter with the spell's own rules (plus an escalation question if it upcasts); the entry re-states the spell's effect instead of just enabling the cast.
[reskin] multiattack re-read — "Slam" joins the combination; "The unmet hour makes three attacks, using Arcane Burst or Slam in any combination."
[reskin] multiattack re-read: "Arcane Burst" is not on this sheet, so the combination now reads "The unmet hour makes three Slam attacks."
```


---


### Dame Oriel — in the run

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

Skills Athletics +7, Perception +4

Senses Passive Perception 14

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
[route] defender type=Humanoid mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | defender: ✓ ("keeps the line") | defender: key "keeps the line" (class verb)
[concept] name: "Dame Oriel" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] resolve: archetype=defender type=Humanoid themes=armed/forged mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: provided "Dame Oriel"
[concept] mechanics: none claimed
[concept] signature elements: shield planted to hold a line [object] | punishing strikes against anyone who moves past her [behavior] | unbroken drill and battlefield discipline [behavior]
[concept] identity: Dame Oriel plants herself at the choke point and does not move: she opens by advancing shield-first to lock an enemy into her reach, then spends every round cutting at whoever tries to slip past her or strike at her allies, her longsword answering each opening with a measured counter. She is disciplined rather than cruel — she will hold a doorway against a dozen until bloodied, but once the line is truly broken she withdraws in good order, dragging the wounded with her and swearing to return.
[concept] lore: A veteran of a dozen border sieges, Dame Oriel swore an oath over her shield to never again let a charge break behind her, and something in that oath took hold — she now walks the old roads looking for the line that needs holding.
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
[reskin] chassis row off: Actions/"Measured Sword Thrust" leaves — the GM named a melee weapon (Longsword); one weapon, one rule set
[reskin] class kit: fighter — "knight": Riposte (riposte), Guarded Stance (guarded-stance)
[reskin] proper noun: "Dame Oriel" — the Name field is a person, not a kind (no print match, no article in the words)
[reskin] inline declared: "Dame Oriel" — the call's own answer (person), built from the name
[reskin] lacks asked: nothing taken away
[reskin] asked field dropped: the call answered limit "at_will" for "keeps the line with a shield and a longsword" but offered no quote
[reskin] clauses: "Dame Oriel — a knight" -> has (descriptive), head | "keeps the line with a shield and a longsword" -> has (mechanical) [asked: condition]
[reskin] signature idea (action): "When a foe within her reach tries to disengage and slip away, or darts past her toward her allies, Oriel answers instantly with a hard shield-first shove, slamming the shield's rim into them to knock them off balance and halt their escape. Anyone she catches this way is thrown back a step and left staggered, their flight broken before it starts." [reaction/on_being_hit/movement] — menu: EMPTY (+ shelf: seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, stunning-strike, charge-push, hook-rider)
[reskin] signature bound to the concept's verb: action — rally (shield)
[reskin] fit declined: "Shieldwall Shove" — a print body takes only what the user's words ask; the call quotes "keeps the line with a shield", which is no unanswered twist clause — a head, a header, a lack, or a clause the GM's own weapon already answers (the blacksmith's rally, critic-ten 2026-10-01)
[reskin] fallback stands down: the class_npc path has no shelf — the Gladiator's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "Oriel keeps her shield planted and her shoulders set; so long as she stays in one place and her guard is whole, anyone who tries to walk past her through her reach finds the shield interposed and their movement snagged to a crawl, as though the air itself had become a wall. If she is ever bloodied, that planted wall falters until she finds her feet again." [trait/always/movement] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending, weapon-lodge)
[reskin] word match declined by the call: bloodied-fury, uncanny-sense, bloodied-burst, false-appearance, adhesive, terrain-walk, aberrant-ground, berserk — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "Oriel keeps her shield planted and her shoulders set; so long as she stays in one place and her guard is whole, anyone who tries to walk past her through her reach finds the shield interposed and their movement snagged to a crawl, as though the air itself had become a wall. If she is ever bloodied, that planted wall falters until she finds her feet again." [trait/always/movement] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, bloodied-burst)
[reskin] weapons answered: Longsword = longsword; Shield Bash = shield
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] print canon alignment: Lawful Neutral -> Neutral — the Gladiator's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon multiattack: "Dame Oriel makes three Spear attacks. It can replace one attack with a use of Shield Bash." — the Gladiator's own
[reskin] print canon row: Actions/Shield Bash — the Gladiator's own
[reskin] multiattack re-read — "Longsword" joins the combination; "Dame Oriel makes three attacks, using Spear or Longsword in any combination. It can replac"
[reskin] multiattack re-read: "Spear" is not on this sheet, so the combination now reads "Dame Oriel makes three Longsword attacks. It can replace one attack with a use o"
```


---


### Gormak the Scarhide — in the run

**Concept:** a goliath berserker who loses control when wounded

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Gormak the Scarhide | 8 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 6 / off 8 → 7; sustained 54 (2 × Spear); nova none; dmg 54

```
Gormak the Scarhide

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

Berserk. Whenever Gormak starts its turn Bloodied, roll 1d6. On a 6, Gormak goes berserk. On each of its turns while berserk, Gormak attacks the nearest creature it can see. If no creature is near enough to move to and attack, Gormak attacks an object. Once Gormak goes berserk, it remains so until it is destroyed or it is no longer Bloodied.

Bloodied Frenzy. While Bloodied, Gormak has Advantage on attack rolls and saving throws.

Mountain Stride. Difficult Terrain composed of ice or snow doesn't cost Gormak extra movement, and Gormak can move across ice or snow without needing to make an ability check.

Actions

Multiattack. Gormak makes two Spear attacks. It can replace one attack with a use of Shield Bash.

Spear. Melee or Ranged Attack Roll: +8, reach 5 ft. or range 20/60 ft. 27 (5d8 + 5) Piercing damage.

Shield Bash. Strength Saving Throw: DC 16, one creature within 5 feet that Gormak can see. Failure: 27 (6d8) Bludgeoning damage. If the target is a Medium or smaller creature, it has the Prone condition. Success: Half damage only.

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
- Actions/Spear — print's own row, renamed; weapon spear
- Actions/Shield Bash — print's own row
- Traits/Berserk — template berserk; barbarian kit; the GM's clause "loses control when wounded"
- Traits/Bloodied Frenzy — barbarian kit; the GM's clause "berserker"
- Traits/Mountain Stride — goliath kit; the GM's clause "berserker"

**Engine trace**

```
[path] class_npc — class barbarian — species goliath — "berserker" (call)
[route] brute type=Giant mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | brute: ✓ ("a goliath berserker") | brute: no line key in the words — the model's read of its quote
[concept] name: provided_name rejected — "a goliath berserker who loses control wh…" is the description, not a name
[concept] resolve: archetype=brute type=Giant themes=bestial/terror mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: rage that takes hold once wounded [behavior] | scarred hide-and-trophy wrappings [body] | chipped greatsword swung two-handed in wild arcs [object]
[concept] identity: A hide-wrapped goliath berserker wades in with a chipped greatsword, swinging wide and trading blows shoulder-to-shoulder until a wound lands — then the rage takes the wheel, and it stops guarding entirely, driving forward with windmilling, screaming fury. Wounded, it never retreats and never toys; it fights to the death, redoubling each round until either it or everything in reach is down.
[concept] lore: Mountain-born goliath outcasts bind their shame in scarred hide and wander the low roads picking fights they cannot walk away from, because losing control is the only absolution they know.
[reskin] [path] class body: the barbarian stands on the Gladiator — the class's own print block, nearest CR 8
[reskin] the concept outranks the alias: the Gladiator is a Humanoid and the concept reads Giant — the words RESEMBLE it, they do not name it, so the print body stands down
[reskin] print canon array: STR 20, DEX 15, CON 16, INT 10, WIS 12, CHA 15 — the Gladiator's, STR fitted to +8
[reskin] donor: brute-5 -> CR 8
[reskin] [path] decides: class_npc on the Gladiator · class barbarian (the matcher would have said homebrew)
[reskin] print canon: "a goliath berserker who loses control when wounded" heads on the Gladiator — print's rows ride along; the seat stays
[reskin] species kit: goliath — "berserker": Mountain Stride (terrain-walk, authored)
[reskin] class kit: barbarian — "berserker": Bloodied Frenzy (Berserker/Bloodied Frenzy), Berserk (berserk); Rampage yielded to print's row cap 5
[reskin] inline declared: "Gormak" — the call's own answer (person), built from the name
[reskin] inline form: "Gormak" — the model's own reading of the name
[reskin] save dc derived: DC 15 -> 16 (8 + PB 3 + the sheet's best 5) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] asked field dropped: the call answered limit "at_will" for "loses control when wounded" but offered no quote
[reskin] clauses: "a goliath berserker" -> has (descriptive), head | "loses control when wounded" -> has (mechanical) [asked: when_bloodied/buff_self]
[reskin] signature idea (action): "When a wound lands on Gormak, the rage roars up and it answers immediately by lunging at whoever drew its blood, driving the greatsword home before the enemy can step away. This is a reflex it cannot refuse — every fresh gash just hands it another swing at the one who caused it." [reaction/on_being_hit/damage] — menu: EMPTY (+ shelf: trample, leap, thrown-burst, throw-retrieve, shield-bash, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, rampage, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, charge)
[reskin] signature bound to the concept's verb: action — rampage, affliction (wound)
[reskin] word match declined by the call: rampage, affliction, terror-pulse, own-turn-punisher — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit" after being shown rampage, affliction, which the GM's words keyed
[reskin] key match declined: action — "rampage" was ranked first on the call's own menu for wound, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: action — "When a wound lands on Gormak, the rage roars up and it answers immediately by lunging at whoever drew its blood, driving the greatsword home before the enemy can step away. This is a reflex it cannot refuse — every fresh gash just hands it another swing at the one who caused it." [reaction/on_being_hit/damage] — the model found no template that holds it (offered: rampage, affliction, terror-pulse, own-turn-punisher)
[reskin] fallback respects the call: rampage, terror-pulse, own-turn-punisher left the shelf — the call declined them for this sheet
[reskin] fallback stands down: the class_npc path has no shelf — the Gladiator's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "Gormak's hide wraps are sewn thick with the scars and trophies of every fight it has walked away from, and when the rage ignites, those seams pull tight — the wrappings bind its flesh and keep it swinging past the point where a sane fighter would drop." [trait/always/defense] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending, weapon-lodge)
[reskin] signature bound to the concept's verb: trait — bloodied-fury, bloodied-burst (wounded)
[reskin] trait ceiling: "Scar-Bound Fury" does not ship — 3 traits already, and print's ceiling for a meat body is 3
[reskin] weapons answered: Greatsword = greatsword; Handaxe = handaxe
[reskin] weapon table: "Handaxe" — thrown, range 20/60
[reskin] speed by body: a Humanoid walks 30 ft. (print's people; a hermit ran 50 — critic's audit 2026-10-02)
[reskin] speed by concept:  — the concept's movement set decides
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] print canon alignment: Chaotic Neutral -> Neutral — the Gladiator's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon type: Humanoid stays — the words say giant ("a dire wolf but undead", 2026-10-01)
[reskin] print canon attack: "Spear" keeps print's hybrid frame — reach 5 ft. or range 20/60 ft. (the Gladiator's weapon is thrown)
[reskin] print canon attack: "Greatsword" -> "Spear" — the Gladiator's own row
[reskin] ranged row off: "Handaxe" leaves — the Gladiator carries no ranged row and the words name none
[reskin] multiattack re-read — "Handaxe" left; "Multiattack" now reads "Gormak makes two Spear attacks."
[reskin] print canon row priced: Shield Bash — dice 9 → 27
[reskin] print canon row: Actions/Shield Bash — the Gladiator's own
[reskin] multiattack replacement clause: It can replace one attack with a use of Shield Bash.
[reskin] darkvision withheld: a Humanoid with no species kit granting it, no word for it in the GM's own text, and no print body that has it — print gives darkvision to 1 of 26 Humanoids ("darkvision 60 ft.; Passive Perception 14" -> "Passive Perception 14")
[reskin] ask vs row MISMATCH: "loses control when wounded" -> "Berserk" — trigger: asked when_bloodied, row reads at_will
[reskin] audit rewrite blocked — "Shield Bash" is engine-authored chassis text
```


---


### Ser Warden Aubrec — in the run

**Concept:** a templar priest with a mace and no magic at all

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Ser Warden Aubrec | 4 | defender-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 3 / off 4 → 3.5; sustained 30 (2 × Longsword); nova none; dmg 30

```
Ser Warden Aubrec

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

Aura of Authority. While in a 10-foot Emanation originating from the aubrec, the aubrec and its allies have Advantage on attack rolls and saving throws, provided the aubrec doesn't have the Incapacitated condition.

Actions

Multiattack. The guard makes two attacks, using Longsword or Mace in any combination.

Mace. Melee Attack Roll: +6, reach 5 ft. 13 (2d8 + 4) Bludgeoning damage, and the target has Disadvantage on its next attack roll before the start of the aubrec's next turn.

Longsword. Melee Attack Roll: +6, reach 5 ft. 15 (2d10 + 4) Slashing damage, and the target has Disadvantage on its next attack roll before the start of the aubrec's next turn.

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
!! Error generating response: TypeError: Failed to fetch
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs?t=1792202639880:246:26)
    at http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1792416438352:1146:31
    at callLLM (http://localhost:5173/src/tools/statblock-generator/reskin/generate.mjs?t=1792416438352:1319:24)
    at generateReskin (http://localhost:5173/src/tools/statblock-generator/reskin/generate.mjs?t=1792416438352:1937:21)
    at generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1792416438352:1105:28)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1792416438352:657:5)
[reskin] network retry: Failed to fetch — retrying the call once
[path] class_npc — class paladin — "templar" (call)
[route] defender type=Humanoid mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | defender: ✓ ("a templar priest with a mace") | defender: no line key in the words — the model's read of its quote
[concept] resolve: archetype=defender type=Humanoid themes=armed/forged mind=sapient style=— energy=Radiant mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: mace and shield, faith without magic [object] | holds the line and punishes anyone who slips past [behavior] | an unbroken vow that steadies those beside him [aura]
[concept] identity: A templar priest who opens by planting his shield and offering truce — then wades in with a mace for any who refuse it, using the shield to shove foes back and keep his line unbroken. Every round he stays shoulder-to-shoulder with his allies, punishing anyone who tries to slip past him with a crushing counterblow. He neither flees nor gloats: he fights to the death as an act of faith, meeting every blow with the same patient, unshakable resolve.
[concept] lore: Stripped of his order's rites and relics, this priest carries his vows in his armor and his mace, guarding the last sanctified ground he remembers until someone worthier releases him from duty.
[reskin] energy withheld: Radiant on a Humanoid with no Radiant in the concept's own words (fixed phrases read first)
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
[reskin] inline by rule: "the aubrec" — the call answered "Ser Warden" (person), which the name does not support
[reskin] lacks asked: "no magic at all"
[reskin] clauses: "a templar priest with a mace" -> has (mechanical) [asked: attack] | "no magic at all" -> LACKS (mechanical)
[reskin] signature idea (action): "When a foe tries to move past or away from him while he still stands, he lashes out with the flat of his shield and a follow-up swing of the mace, catching the fleeing enemy mid-stride. Anyone struck this way is staggered and stopped cold, their retreat spoiled, and he simply steps back into his place in the line." [reaction/on_being_hit/damage] — menu: snap-shot, riposte (+ shelf: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, charge-push, hook-rider)
[reskin] decline reason: action — the call answered none and names it "no_fit"
[reskin] signature miss: action — "When a foe tries to move past or away from him while he still stands, he lashes out with the flat of his shield and a follow-up swing of the mace, catching the fleeing enemy mid-stride. Anyone struck this way is staggered and stopped cold, their retreat spoiled, and he simply steps back into his place in the line." [reaction/on_being_hit/damage] — the model found no template that holds it (offered: snap-shot, riposte, own-turn-punisher, slow-bolt, patient-defense, rally)
[reskin] fallback stands down: the class_npc path has no shelf — the Guard Captain's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 18 already beats print's AC 14 at CR 4, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "He plants his shield and offers a truce before the first blow, and those who accept his terms find their weapons strangely heavy against him and his companions standing beside him. The moment anyone in his line is struck, his patience hardens and he answers the attacker with a crushing counterblow on the spot." [trait/always/defense] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending, weapon-lodge)
[reskin] trait declined: "Offered Truce" — a shape fit with no verb match on a Humanoid body; a meat body earns its trait by a verb
[reskin] weapons answered: Mace = mace; Javelin = javelin
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] print canon alignment: Lawful Neutral -> Neutral — the Guard Captain's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon row: Actions/Longsword — the Guard Captain's second melee row, beside the chassis's
[reskin] print canon multiattack: "The guard makes two attacks, using Javelin or Longsword in any combination." — the Guard Captain's own
[reskin] ranged row off: "Javelin" leaves — the Guard Captain carries no ranged row and the words name none
[reskin] multiattack re-read — "Javelin" left; "Multiattack" now reads "The guard makes two Longsword attacks."
[reskin] multiattack re-read — "Mace" joins the combination; "The guard makes two attacks, using Longsword or Mace in any combination."
```


---


### Kessil the Lockpick — in the run

**Concept:** an imp rogue who picks locks for a devil

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Kessil the Lockpick | 4 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 3 / off 4 → 3.5; sustained 30 (2 × Sting); nova none; dmg 30

```
Kessil the Lockpick

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

Magic Resistance. Kessil has Advantage on saving throws against spells and other magical effects.

Actions

Multiattack. Kessil makes two Sting attacks.

Sting. Melee Attack Roll: +6, reach 5 ft. 8 (1d8 + 4) Piercing damage plus 7 (2d6) Poison damage.

Shape-Shift. Kessil shape-shifts to resemble a rat (Speed 20 ft.), a raven (20 ft., Fly 60 ft.), or a spider (20 ft., Climb 20 ft.), or it returns to its true form. Its statistics are the same in each form, except for its Speed. Any equipment it is wearing or carrying isn't transformed.

Invisibility. Kessil casts Invisibility on itself, requiring no spell components and using Charisma as the spellcasting ability.

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
[route] skirmisher-skulker type=Fiend mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | skirmisher-skulker: ✓ ("an imp rogue") | skirmisher-skulker: no line key in the words — the model's read of its quote | bane refused: the words carry no weakness clause, so "silvered or holy wea" answers a question nobody asked
[concept] resolve: archetype=skirmisher type=Fiend themes=fiendish/grasping mind=sapient style=skulker energy=Necrotic mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: picking locks with deft hands [behavior] | striking from hiding and shadow-stepping away [behavior] | a lockpicks-and-dagger kit of shadow-stuff [object]
[concept] identity: A soot-blackened imp skulks the shadows of a devil's vault, blade-first from hiding — it opens by sneak-attacking its way through a lock-guarded victim or an exposed flank, then shadow-steps away to rehide and re-strike each round. Its fingers are lockpicks and daggers both, and it treats any fight as just another latch to pick, toying with prey while it still has the exits and bolting for the dark the instant it's bloodied.
[concept] lore: Spawned in the shadow-stuff of a greater devil's keep, this imp was set to work beneath the vaults picking every lock its master could not simply burn, and it wants nothing more than an unguarded door — out of the dungeon or into something worth stealing.
[reskin] print canon route: the Imp's body outranks the skulker seat — no verb in the words names it; the plain skirmisher line
[reskin] print canon array: STR 6, DEX 18, CON 13, INT 11, WIS 12, CHA 14 — the Imp's, DEX fitted to +6
[reskin] donor: skirmisher-3 -> CR 4
[reskin] [path] decides: twist on the Imp · class rogue (the matcher agrees)
[reskin] print canon: "an imp rogue who picks locks for a devil" heads on the Imp — print's rows ride along; the seat stays
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] repair round 1: 1 defect(s) — name "Lockpick" repeats the creature's own name — the sheet already says who acts; give the row its own word
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline declared: "Kessil" — the call's own answer (person), built from the name
[reskin] inline form: "Kessil" — the model's own reading of the name
[reskin] save dc derived: DC 13 -> 14 (8 + PB 2 + the sheet's best 4) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "an imp rogue" -> has (descriptive), head | "picks locks for a devil" -> has (descriptive)
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "Kessil drives its blade into a lock, latch, or the seam of a foe's gear and twists until the shadow-stuff inside springs loose, spilling a slick coating of living darkness over the target. The target is smeared in that clinging soot-light, which sticks to it and makes it easier for the imp's daggers to find home and harder for it to slip away, until it burns itself clean with a moment's hard effor" [rider/on_hit/condition] — menu: affliction, contagion, charge-push, hook-rider, pounce, isolation, charge (+ shelf: trample, leap, gaze-single, snare, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, riposte)
[reskin] word match declined by the call: coating, disarm, feint-slip — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit"
[reskin] signature miss: action — "Kessil drives its blade into a lock, latch, or the seam of a foe's gear and twists until the shadow-stuff inside springs loose, spilling a slick coating of living darkness over the target. The target is smeared in that clinging soot-light, which sticks to it and makes it easier for the imp's daggers to find home and harder for it to slip away, until it burns itself clean with a moment's hard effor" [rider/on_hit/condition] — the model found no template that holds it (offered: affliction, contagion, charge-push, hook-rider, pounce, isolation, charge, coating, lure, sensory-strike, disarm, feint-slip, riposte)
[reskin] fallback respects the call: disarm left the shelf — the call declined it for this sheet
[reskin] fallback stands down: the twist path has no shelf — the Imp's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 16 already beats print's AC 14 at CR 4, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "Kessil's fingers and blades are forged of shadow-stuff, and any latch, hinge, or lock it touches remembers being opened; the imp can spring a mundane lock or bar with a moment's fiddling even in the thick of a fight. Each time it does, a wisp of that shadow stays in the mechanism, so the next time it tries the same lock the thing practically falls open for it." [trait/always/resource] — menu: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst, sealed-body (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature bound to the concept's verb: trait — sealed-body (locked)
[reskin] decline reason: trait — the call answered none and names it "no_fit" after being shown sealed-body, which the GM's words keyed
[reskin] key match declined: trait — "sealed-body" was ranked first on the call's own menu for locked, and the call read it as no fit; the words keep their claim and nothing is forced
[reskin] signature miss: trait — "Kessil's fingers and blades are forged of shadow-stuff, and any latch, hinge, or lock it touches remembers being opened; the imp can spring a mundane lock or bar with a moment's fiddling even in the thick of a fight. Each time it does, a wisp of that shadow stays in the mechanism, so the next time it tries the same lock the thing practically falls open for it." [trait/always/resource] — the model found no template that holds it (offered: sealed-body, false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst, heated-body)
[reskin] weapons answered: Lockpick = none
[reskin] print canon modes: climb off — the Imp has no such mode and the words name none
[reskin] speed by concept: dropped Climb 30 ft. — the concept's movement set decides
[reskin] languages by mind: "Infernal, Telepathy 30 ft." -> "Infernal, telepathy 30 ft." (sapient)
[reskin] print canon alignment: Neutral Evil -> Lawful Evil — the Imp's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Infernal, telepathy 30 ft." -> "Common, Infernal" — the Imp's
[reskin] print canon speed: 40 ft. -> 20 ft. — the Imp's walk; the concept's other modes stay
[reskin] print canon attack: "Lockpick" -> "Sting" — the Imp's own row
[reskin] immunities stamped for type: Fiend -> Poison; Poisoned
[reskin] print canon defenses: immunities Poison; Poisoned -> Fire, Poison; Poisoned; resistances none -> Cold — the Imp's own header lines
[reskin] resistances derived withheld: print's Imp owns the line (Cold)
[reskin] print canon trait: Magic Resistance — "an imp rogue who picks locks for a devil" is the Imp (print's own row)
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the seat's, not the Imp's
[reskin] print canon: chassis row leaves — Traits/"Sootstep" is the seat's, not the Imp's
[reskin] print canon row: Actions/Shape-Shift — the Imp's own
[reskin] print canon row: Actions/Invisibility — the Imp's own
```


---


### Ser Halric Vow — in the run

**Concept:** a knight-errant of the fallen order who shields the weak

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Ser Halric Vow | 7 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 6 / off 8 → 7; sustained 52 (2 × Spear); nova none; dmg 52

```
Ser Halric Vow

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

Aura of Authority. While in a 10-foot Emanation originating from the vow, the vow and its allies have Advantage on attack rolls and saving throws, provided the vow doesn't have the Incapacitated condition.

Actions

Multiattack. The vow makes two Spear attacks. It can replace one attack with a use of Shield Bash.

Spear. Melee or Ranged Attack Roll: +7, reach 5 ft. or range 20/60 ft. 26 (5d8 + 4) Piercing damage.

Shield Bash. Strength Saving Throw: DC 14, one creature within 5 feet that the vow can see. Failure: 24 (7d6) Bludgeoning damage. If the target is a Medium or smaller creature, it has the Prone condition. Success: Half damage only.

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
- Actions/Spear — print's own row, renamed; weapon spear
- Actions/Shield Bash — print's own row

**Engine trace**

```
!! Error generating response: TypeError: Failed to fetch
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs?t=1792202639880:246:26)
    at http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1792416438352:1146:31
    at callLLM (http://localhost:5173/src/tools/statblock-generator/reskin/generate.mjs?t=1792416438352:1319:24)
    at generateReskin (http://localhost:5173/src/tools/statblock-generator/reskin/generate.mjs?t=1792416438352:3459:29)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1792416438352:1105:22)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1792416438352:657:5)
[reskin] network retry: Failed to fetch — retrying the call once
[path] class_npc — class paladin — "knight-errant" (call)
[route] defender type=Humanoid mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | defender: ✓ ("who shields the weak") | defender: key "knight" (class verb)
[concept] resolve: archetype=defender type=Humanoid themes=armed/grave mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: shield-wall protection of the weak [behavior] | corroded iron plate and shield [object] | oathbound refusal to yield ground [behavior]
[concept] identity: A fallen knight-errant wades into the fight shield-first, planting itself between the weak and whatever comes for them, then punishing any enemy that tries to slip past with a brutal iron riposte. It grinds down attackers round after round with disciplined shieldwork and heavy blows, refusing to yield ground even as its own blood runs. Only when the last of the people it swore to shelter are clear does it consider retreat — and even then it withdraws facing the foe, shield raised.
[concept] lore: When the Order of the Broken Vow was dissolved and its banners burned, one knight kept the oath the order abandoned: to stand between the helpless and the blade, even with no lord left to pay for it.
[reskin] [path] class body: the paladin stands on the Gladiator — the class's own print block, nearest CR 7
[reskin] print canon array: STR 18, DEX 15, CON 16, INT 10, WIS 12, CHA 15 — the Gladiator's, STR fitted to +7
[reskin] donor: defender-5 -> CR 7
[reskin] row gated out: Guard Aura (aura) — the concept did not claim this mechanic
[reskin] [path] decides: class_npc on the Gladiator · class paladin (the matcher would have said homebrew)
[reskin] print canon: "a knight-errant of the fallen order who shields the weak" heads on the Gladiator — print's rows ride along; the seat stays
[reskin] class kit: paladin — "knight-errant": Aura of Authority (Hobgoblin Captain/Aura of Authority)
[reskin] inline by rule: "the vow" — the call answered "Sir Halric" (person), which the name does not support
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a knight-errant of the fallen order" -> has (descriptive), head | "shields the weak" -> has (descriptive)
[reskin] menu pruned: action — snap-shot (the sheet cannot render them)
[reskin] signature idea (action): "When a foe moves to slip past the vow toward the people behind it, the vow lashes out with a brutal shield-first riposte — a punishing blow that sends the attacker staggering back and interrupts the advance. This fires at the moment an enemy tries to pass, so the shield itself becomes a wall with teeth, punishing anyone who treats the vow as scenery." [reaction/on_being_hit/damage] — menu: riposte (+ shelf: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, stunning-strike, charge-push, hook-rider)
[reskin] signature bound to the concept's verb: action — rally (shield, orders)
[reskin] word match declined by the call: riposte — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit" after being shown rally, which the GM's words keyed
[reskin] key match declined: action — "rally" was ranked first on the call's own menu for shield+orders, and the call read it as no fit; the words keep their claim and nothing is forced
[reskin] signature miss: action — "When a foe moves to slip past the vow toward the people behind it, the vow lashes out with a brutal shield-first riposte — a punishing blow that sends the attacker staggering back and interrupts the advance. This fires at the moment an enemy tries to pass, so the shield itself becomes a wall with teeth, punishing anyone who treats the vow as scenery." [reaction/on_being_hit/damage] — the model found no template that holds it (offered: rally, riposte, own-turn-punisher)
[reskin] fallback respects the call: rally left the shelf — the call declined it for this sheet
[reskin] fallback stands down: the class_npc path has no shelf — the Gladiator's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 19 already beats print's AC 15 at CR 7, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "The vow's iron plate and shield are corroded and battered, but the vow has learned to turn that ruin into discipline: whenever the vow is struck in melee, the attacker's weapon snags on cracked iron and splintered shield-rim, leaving the foe exposed for a heartbeat. The vow fights better the longer it is hit, its damaged armor teaching it the rhythm of every blow." [trait/on_being_hit/defense] — menu: absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura)
[reskin] word match declined by the call: bloodied-burst, resonant-body, aberrant-ground — the key word does not mean the mechanic here
[reskin] trait declined: "Snaring Plate" — a shape fit with no verb match on a Humanoid body; a meat body earns its trait by a verb
[reskin] weapons answered: Broadsword = longsword; Hurlshield = shield
[reskin] print canon alignment: Lawful Good -> Neutral — the Gladiator's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon attack: "Spear" keeps print's hybrid frame — reach 5 ft. or range 20/60 ft. (the Gladiator's weapon is thrown)
[reskin] print canon attack: "Broadsword" -> "Spear" — the Gladiator's own row
[reskin] print canon rows: Hurlshield leave — the Gladiator has one melee row (Spear), and Multiattack reads print's
[reskin] print canon row priced: Shield Bash — dice 9 → 24
[reskin] print canon row: Actions/Shield Bash — the Gladiator's own
[reskin] multiattack replacement clause: It can replace one attack with a use of Shield Bash.
```


---


### Whisker Shade — in the run

**Concept:** a tabaxi cutpurse who slips through the market crowd

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Whisker Shade | 3 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 3 / off 3 → 3; sustained 16 (2 × Pistol); nova none; dmg 16

```
Whisker Shade

Medium Humanoid, Neutral

AC 15
Initiative +3 (13)

HP 52 (8d8 + 16)

Speed 30 ft., Climb 30 ft.

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
+5
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

Skills Perception +2, Stealth +5

Senses darkvision 60 ft.; Passive Perception 12

Languages Common, Thieves' cant

CR 3 (XP 700; PB +2)

Traits

Evasion. If the shade is subjected to an effect that allows it to make a Dexterity saving throw to take only half damage, the shade instead takes no damage if it succeeds on the save and only half damage if it fails. It can't use this trait if it has the Incapacitated condition.

Actions

Multiattack. The bandit makes two attacks, using Scimitar or Pistol in any combination.

Scimitar. Melee Attack Roll: +5, reach 5 ft. 6 (1d6 + 3) Slashing damage.

Pistol. Ranged Attack Roll: +5, range 30/90 ft. 8 (1d10 + 3) Piercing damage.

Bonus Actions

Cunning Action. The shade takes the Dash, Disengage, or Hide action.

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

- Traits/Evasion — template evasion; rogue kit; the GM's clause "cutpurse"
- Actions/Multiattack — the chassis
- Actions/Scimitar — print's own row, renamed; weapon scimitar
- Actions/Pistol — print's own row, renamed; weapon pistol
- Bonus Actions/Cunning Action — rogue kit; the GM's clause "cutpurse"

**Engine trace**

```
[path] class_npc — class rogue — species tabaxi — "cutpurse" (call)
[route] skirmisher-skulker type=Humanoid mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | skirmisher-skulker: ✓ ("slips through the market crowd") | skirmisher-skulker: no line key in the words — the model's read of its quote
[concept] resolve: archetype=skirmisher type=Humanoid themes=grasping/uncanny mind=sapient style=skulker energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: a hidden blade in a crowded market [behavior] | slipping through the crowd unseen [behavior] | tabaxi claws and quick footing [body]
[concept] identity: The cutpurse works the market as cover, brushing past marks to lift purses and open a fight with a dagger driven into an unarmored back from hiding in the throng. Once blood is up it stays inside the crowd, weaving between bodies and stalls to deny a clean stand, and it never sticks around once the takings are grabbed or the odds sour — it's a predator of opportunity, not a soldier. A tabaxi of this trade is quick, clever, and utterly without honor: it taunts a flailing opponent, then slips away laughing before the guard arrives.
[concept] lore: This tabaxi was raised in the city's thieves' guilds, and it works the busiest market squares at midday because a hundred jostling bodies make the perfect hiding place for a quick blade and a quicker hand.
[reskin] [path] class body: the rogue stands on the Bandit Captain — the class's own print block, nearest CR 3
[reskin] print canon route: the Bandit Captain's body outranks the skulker seat — no verb in the words names it; the plain skirmisher line
[reskin] print canon defenses: HP 60 -> 52, AC 15 -> 15 — the Bandit Captain's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon armor: 15 (studded leather) — print's Gear line; the 2014 sheet prints it (the Goblin Boss wore "splint", canaries 2026-10-12)
[reskin] print canon array: STR 15, DEX 16, CON 14, INT 14, WIS 11, CHA 14 — the Bandit Captain's at its own CR; attack +5 -> +5, DC 13 (print's)
[reskin] donor: skirmisher-3 -> CR 3
[reskin] [path] decides: class_npc on the Bandit Captain · class rogue (the matcher would have said homebrew)
[reskin] print canon: "a tabaxi cutpurse who slips through the market crowd" heads on the Bandit Captain — print's rows ride along; the seat stays
[reskin] species kit: Cat's Dash — "Fleet Agility" already grants Dash; one mechanic, one row
[reskin] species kit: tabaxi — "cutpurse": header lines only; Climb 30 ft.; darkvision 60 ft.
[reskin] row evicted for the cap: Traits/"Crowd Slip" (chassis filler) leaves so "Evasion" fits — the cap evicts by priority, it does not refuse the newcomer
[reskin] class kit: rogue — "cutpurse": Cunning Action (Assassin/Cunning Action), Evasion (evasion)
[reskin] inline declared: "the shade" — the call's own answer (kind), built from the name
[reskin] inline form: "the shade" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a tabaxi cutpurse" -> has (descriptive), head | "slips through the market crowd" -> has (descriptive)
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "When the shade strikes a foe that has not yet acted in the fight, or one it caught off guard from hiding, its blade finds the gap between ribs and the wound bleeds badly, sapping the victim's strength and slowing them as they stagger. The cut is meant to make a mark look hurt and clumsy, easy to rob and easier to lose in the crowd." [rider/on_hit/condition] — menu: affliction, contagion, charge-push, hook-rider, pounce, isolation, bolt-mark, charge (+ shelf: trample, leap, gaze-single, snare, condition-payoff, throw-retrieve, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, exploiter, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte)
[reskin] signature bound to the concept's verb: action — feint-slip (slip)
[reskin] word match declined by the call: feint-slip — the key word does not mean the mechanic here
[reskin] fit declined: "Rib-Gap Cut" — a print body takes only what the user's words ask; the call offered no quote, and the key table finds no verb either (the blacksmith's rally, critic-ten 2026-10-01)
[reskin] fallback respects the call: feint-slip left the shelf — the call declined it for this sheet
[reskin] fallback stands down: the class_npc path has no shelf — the Bandit Captain's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 15 already beats print's AC 13 at CR 3, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "The shade never fights from still feet: whenever a foe crowds it or a blade swings close, it twists away through the bodies around it, gaining ground that frustrates pursuit and keeps a mark between itself and danger." [trait/on_being_hit/movement] — menu: absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] word match declined by the call: false-appearance, faultless-tracker — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "The shade never fights from still feet: whenever a foe crowds it or a blade swings close, it twists away through the bodies around it, gaining ground that frustrates pursuit and keeps a mark between itself and danger." [trait/on_being_hit/movement] — the model found no template that holds it (offered: absorption, bloodied-burst, resonant-body, faultless-tracker, false-appearance, aberrant-ground)
[reskin] weapons answered: Dagger = dagger; Hand Crossbow = hand crossbow
[reskin] weapon table: "Hand Crossbow" — a launcher, never thrown, range 30/120
[reskin] print canon modes: climb off — the Bandit Captain has no such mode and the words name none
[reskin] speed by body: a Humanoid walks 30 ft. (print's people; a hermit ran 50 — critic's audit 2026-10-02)
[reskin] speed by concept: dropped Climb 30 ft. — the concept's movement set decides
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] print canon alignment: Neutral Evil -> Neutral — the Bandit Captain's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common" -> "Common, Thieves' cant" — the Bandit Captain's
[reskin] print canon attack: "Dagger" -> "Scimitar" — the Bandit Captain's own row
[reskin] print canon multiattack: "The bandit makes two attacks, using Scimitar and Pistol in any combination." — the Bandit Captain's own
[reskin] print canon attack: "Pistol" is print's own row — +5, 8 (1d10 + 3), range 30/90 ft. (an exact body at print's CR)
[reskin] print canon attack: "Hand Crossbow" -> "Pistol" — the Bandit Captain's own ranged row
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the seat's, not the Bandit Captain's
[reskin] multiattack normalised: "The bandit makes two attacks, using Scimitar or Pistol in any combination."
[reskin] species kit: Climb 30 ft. — the tabaxi's
[reskin] species kit: darkvision 60 ft. — the tabaxi's
```


---

## Review batch — twist-ten-2026-10-19T04-56-15

The checker ran first. The gate table covers every block in the run; every block of the run follows. Each block carries its checker row above and its engine trace below. Hand-derive against the row first; then read for what predicates can't see.

### Gate table — the whole run

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Suture Troll | 6 | 2024 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 4/4 |
| Cinder-Choked Hydra | 8 | 2024 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |
| Legion Halberdier | 2 | 2024 | skirmisher-1 | ok | ok | SOFT: reach | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 4/4 |
| Purple Worm | 15 | 2024 | brute-13 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |
| Dire Wolf | 1 | 2024 | skirmisher-1 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 2/2 |
| Glacier-Jarl Hoarfrost | 9 | 2024 | skirmisher-8 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/2 | 3/3 |
| Gravewatch Archer | 1 | 2024 | skirmisher-1 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 2/2 |
| Twin-Head Wolf | 2 | 2024 | skirmisher-1 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 2/2 |
| Scaldwell Keeper | 13 | 2024 | lurker-8 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 8/8 |
| Tolling Chapel Wraith | 3 | 2024 | lurker-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 7/7 |

**Dropped 3 of 11 user clauses** (coverage 73%); concept share 100% (40/40 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- none



---


### Dire Wolf — lowest CR

**Concept:** name: Dire Wolf | with a frost-rimed hide

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Dire Wolf | 1 | skirmisher-1 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1/8 / off 3 → 1.5625; sustained 16 (2 × Bite); nova none; dmg 16

```
Dire Wolf

Large Beast, Unaligned

AC 14
Initiative +2 (12)

HP 22 (3d10 + 6)

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
15
+2
+2
CHA
7
-2
-2

Skills Perception +3, Stealth +4

Senses darkvision 60 ft.; Passive Perception 13

Languages None

CR 1 (XP 200; PB +2)

Traits

Pack Tactics. The dire wolf has Advantage on an attack roll against a creature if at least one of the dire wolf's allies is within 5 feet of the creature and the ally doesn't have the Incapacitated condition.

Actions

Multiattack. The dire wolf makes two Bite attacks.

Bite. Melee Attack Roll: +5, reach 5 ft. 8 (1d10 + 3) Piercing damage. If the target is a Large or smaller creature, it has the Prone condition.

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

**Engine trace**

```
[path] twist — Dire Wolf (is) — "Name field: Dire Wolf" (code)
[route] skirmisher type=Beast mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | skirmisher: ✓ ("Dire Wolf — with a frost-rimed hide") | skirmisher-skulker: the call read "hide" as not meaning that mechanic here — no override | skirmisher stands: every key that would override it was read as a figure of speech | skirmisher: no line key in the words — the model's read of its quote
[concept] name: "Dire Wolf" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] resolve: archetype=skirmisher type=Beast themes=bestial/elemental mind=bestial style=— energy=Cold mix=both identity=✓ lore=✓
[concept] name: provided "Dire Wolf"
[concept] mechanics: none claimed
[concept] signature elements: pack tactics — encircling and cutting away [behavior] | frost-rimed hide that numbs the air around it [body] | the harrying pursuit across snow [behavior]
[concept] identity: A frost-rimed dire wolf opens by shadowing its quarry at the edge of the snowfield, then commits — one wolf is a feint, the pack closes from two sides and each cuts away before the prey can turn. It fights the way winter does: harry, withdraw, let the cold and the bleeding do the work, and never once stand still long enough to trade blows. Only when the pack has it cornered and the whole pack is bloodied does it commit to tearing out a throat — a wounded dire wolf runs, and it runs toward its fellows, not away.
[concept] lore: Frost-rimed dire wolves are packs that wandered too long above the treeline and took the rime into their coats, growing leaner and colder each winter until the hoarfrost became hide; they want the warmth of a living body, and they hunt in wide-flung circles to drive it toward the open ice.
[reskin] print canon defenses: HP 30 -> 22, AC 15 -> 14 — the Dire Wolf's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 17, DEX 15, CON 15, INT 3, WIS 12, CHA 7 — the Dire Wolf's at its own CR; attack +4 -> +5, DC 13 (print's)
[reskin] donor: skirmisher-1 -> CR 1
[reskin] [path] decides: twist on the Dire Wolf (the matcher agrees)
[reskin] print canon: "Dire Wolf — with a frost-rimed hide" heads on the Dire Wolf — print's rows ride along; the seat stays
[reskin] claim gate: CR 1 but a Beast body — the trait seat stays open (print: a material body carries a trait at every tier)
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline by rule: "the dire wolf" — the call answered "the dire wolf" (kind), which the name does not support
[reskin] inline form: "the dire wolf" — the model's own reading of the name
[reskin] final price: the round ran 14 against the card's 10 — the attack rows re-solve at 75% (2 attacks off one row after a supersede)
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Dire Wolf — with a frost-rimed hide" -> has (descriptive), head
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The dire wolf circles a foe and bites at its legs to drive it off balance, numbing the wound so the prey staggers and falters in its footing. A target already reeling from the cold is easier to drag down, so the pack's bites grow crueler the more the frost has seeped in." [rider/on_hit/condition] — menu: contagion, charge-push, hook-rider, pounce, isolation, charge (+ shelf: snare, shield-bash, lure, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, slow-bolt, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, riposte)
[reskin] signature bound to the concept's verb: action — slow-bolt (frost)
[reskin] word match declined by the call: slow-bolt, hook-rider, rampage — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit" after being shown slow-bolt, which the GM's words keyed
[reskin] key match declined: action — "slow-bolt" was ranked first on the call's own menu for frost, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: action — "The dire wolf circles a foe and bites at its legs to drive it off balance, numbing the wound so the prey staggers and falters in its footing. A target already reeling from the cold is easier to drag down, so the pack's bites grow crueler the more the frost has seeped in." [rider/on_hit/condition] — the model found no template that holds it (offered: slow-bolt, contagion, charge-push, hook-rider, pounce, isolation, charge, rampage)
[reskin] fallback respects the call: slow-bolt, rampage left the shelf — the call declined them for this sheet
[reskin] fallback stands down: the twist path has no shelf — the Dire Wolf's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "The hoarfrost in its hide drinks the warmth from any blade or fist that strikes it, leaving the attacker's fingers stiff and clumsy for a moment. Those who trade blows with it soon find their grip and their speed stolen by the cold." [trait/on_being_hit/condition] — menu: heated-body, absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst)
[reskin] signature bound to the concept's verb: trait — heated-body (frost)
[reskin] word match declined by the call: absorption — the key word does not mean the mechanic here
[reskin] trait declined: "Rime Hide" — a print body takes only what the user's words ask; the call offered no quote, and the key table finds no verb either
[reskin] weapons answered: Bite = none
[reskin] print canon size: Medium -> Large — the Dire Wolf's
[reskin] print canon speed: 30 ft. -> 50 ft. — the Dire Wolf's walk; the concept's other modes stay
[reskin] languages held: None stands — INT 3 on a Beast speaks nothing, whatever the mind read said
[reskin] print canon trait: Pack Tactics — "Dire Wolf — with a frost-rimed hide" is the Dire Wolf (print's own row)
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the seat's, not the Dire Wolf's
[reskin] print canon: chassis row leaves — Traits/"Unbroken Lope" is the seat's, not the Dire Wolf's
[reskin] vulnerability rejected — "Fire" has no warrant in the concept's own text (print's default is none)
```


---


### Purple Worm — highest CR

**Concept:** name: Purple Worm | that swallowed a war-band's armoury

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Purple Worm | 15 | brute-13 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 12 / off 11 → 11.5; sustained 51 (1 × Tail Stinger); nova none; dmg 51

```
Purple Worm

Gargantuan Monstrosity, Unaligned

AC 18
Initiative -2 (8)

HP 247 (15d20 + 90)

Speed 50 ft., Burrow 50 ft.

MOD
SAVE
STR
28
+9
+14
INT
1
-5
-5
MOD
SAVE
DEX
7
-2
-2
WIS
8
-1
-1
MOD
SAVE
CON
22
+6
+11
CHA
4
-3
-3

Skills Athletics +14, Perception +4

Senses tremorsense 60 ft.; Passive Perception 14

Languages None

CR 15 (XP 13,000; PB +5)

Traits

Tunneler. The purple worm can burrow through solid rock at half its Burrow Speed and leaves a 10-foot-diameter tunnel in its wake.

Actions

Multiattack. The purple worm makes one Bite attack and one Tail Stinger attack.

Bite. Melee Attack Roll: +14, reach 10 ft. 22 (3d8 + 9) Piercing damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 22), and it has the Restrained condition until the grapple ends.

Tail Stinger. Melee Attack Roll: +14, reach 10 ft. 16 (2d6 + 9) Piercing damage plus 35 (10d6) Poison damage.

Bonus Actions

Swallow. Strength Saving Throw: DC 21, one Large or smaller creature Grappled by the purple worm (it can have up to three creatures swallowed at a time). Failure: The target is swallowed by the purple worm, and the Grappled condition ends. A swallowed creature has the Blinded and Restrained conditions, has Total Cover against attacks and other effects outside the purple worm, and takes 17 (5d6) Acid damage at the start of each of the purple worm's turns.
If the purple worm takes 30 damage or more on a single turn from a creature inside it, the purple worm must succeed on a DC 21 Constitution saving throw at the end of that turn or regurgitate all swallowed creatures, each of which falls in a space within 5 feet of the purple worm and has the Prone condition. If the purple worm dies, any swallowed creature no longer has the Restrained condition and can escape from the corpse using 20 feet of movement, exiting Prone.

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
- Actions/Bite — the chassis
- Actions/Tail Stinger — print's own row
- Traits/Tunneler — print's own row
- Bonus Actions/Swallow — print's own row

**Engine trace**

```
[path] twist — Purple Worm (is) — "Name field: Purple Worm" (code)
[route] brute-grappler type=Monstrosity mechanics=grapple, engulf — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: on the GM's own words "swallowed a war-band's armoury" | brute-grappler: ✓ ("swallowed a war-band's armoury") | brute-grappler: no line key in the words — the model's read of its quote
[concept] name: "Purple Worm" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] resolve: archetype=brute type=Monstrosity themes=devouring/subterranean mind=bestial style=grappler energy=— mix=physical identity=✓ lore=✓
[concept] name: provided "Purple Worm"
[concept] mechanics: grapple, engulf
[concept] signature elements: swallowing prey whole [behavior] | a gut full of stolen armoury [object] | erupts from the earth to strike [behavior]
[concept] identity: A purple worm that devoured an entire war-band and now fights with their armoury clattering in its gut — it surges up from the ground to swallow a foe whole, while stolen blades, pikes, and mail shred whatever it grinds inside its gullet. Every round it swallows or coils a new victim, and when bloodied it does not flee but thrashes harder, driving swallowed steel through its own hide in a spray of gore and iron. It is a bestial engine, all appetite and grating metal, tempering savagery with the terrible luck of a beast that has nothing to lose.
[concept] lore: Deep beneath an old battlefield it ate a routed war-band's baggage train whole — armour, pikes, and all — and now it hunts the surface hoping to fill the hollow clangour inside itself with more iron and more flesh.
[reskin] print canon route: the Purple Worm's body outranks the grappler seat — no verb in the words names it; the plain brute line
[reskin] print canon defenses: HP 264 -> 247, AC 17 -> 18 — the Purple Worm's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 28, DEX 7, CON 22, INT 1, WIS 8, CHA 4 — the Purple Worm's at its own CR; attack +11 -> +14, DC 21 (print's)
[reskin] donor: brute-13 -> CR 15 (invented — no printed peer)
[reskin] [path] decides: twist on the Purple Worm (the matcher agrees)
[reskin] print canon: "Purple Worm — that swallowed a war-band's armoury" heads on the Purple Worm — print's rows ride along; the seat stays
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline by rule: "the purple worm" — the call answered "the purple worm" (kind), which the name does not support
[reskin] inline form: "the purple worm" — the model's own reading of the name
[reskin] save dc derived: DC 18 -> 22 (8 + PB 5 + the sheet's best 9) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Purple Worm —" -> has (descriptive), head | "swallowed a war-band's armoury" -> has (descriptive)
[reskin] menu pruned: action — push-prone, thrown-burst-seed (the sheet cannot render them)
[reskin] signature idea (action): "The worm heaves its whole body and thrashes in a grinding, circular frenzy, churning the stolen steel inside itself into a screeching storm that spills out through its own wounds. Everything caught close around it is battered and slashed by pikes, mail links, and snapped blades as it convulses, and any weapon or shield it gave way inside is flung outward to clatter across the ground. It uses this " [action/once_per_fight/damage] — menu: swallow, condition-payoff, shield-bash, hook-drag, burrow-ambush, escalating-dread, terror-pulse, herd, drain, exploiter (+ shelf: second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, contagion, stunning-strike, charge-push, hook-rider, pounce, charge)
[reskin] signature bound to the concept's verb: action — swallow (swallow, swallows, swallowed)
[reskin] decline reason: action — the call answered none and names it "no_fit" after being shown swallow, which the GM's words keyed
[reskin] key match declined: action — "swallow" was ranked first on the call's own menu for swallow+swallows+swallowed, and the call read it as no fit; the words keep their claim and nothing is forced
[reskin] signature miss: action — "The worm heaves its whole body and thrashes in a grinding, circular frenzy, churning the stolen steel inside itself into a screeching storm that spills out through its own wounds. Everything caught close around it is battered and slashed by pikes, mail links, and snapped blades as it convulses, and any weapon or shield it gave way inside is flung outward to clatter across the ground. It uses this " [action/once_per_fight/damage] — the model found no template that holds it (offered: swallow, condition-payoff, shield-bash, hook-drag, burrow-ambush, escalating-dread, terror-pulse, herd, drain, exploiter, rally)
[reskin] fallback respects the call: swallow left the shelf — the call declined it for this sheet
[reskin] fallback stands down: the twist path has no shelf — the Purple Worm's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "Whenever the worm takes a grievous wound, the stolen armoury shifts and skewers it from within, and it answers by driving that jagged iron outward — anyone standing close is spattered and cut by shrapnel of blade and mail. The more hurt it becomes, the more violently its gut rattles and the more it thrashes." [trait/on_being_hit/damage] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, earth-glide, tunneler, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] signature bound to the concept's verb: trait — tunneler (worm)
[reskin] word match declined by the call: tunneler, heated-body, resonant-body, bloodied-fury, absorption, weapon-lodge — the key word does not mean the mechanic here
[reskin] trait declined: "Scrapmetal Eruption" — bound only on the idea's own words (wounded:idea) with no key in the concept; a meat body earns its trait by the user's verb (the sniper's tracker, critic 2026-09-29)
[reskin] concept-first trait skipped: tunneler — the call read its match as a collision (the word is a modifier, or the sheet already answers it)
[reskin] weapons answered: Bite = none; Iron Gullet = none; Swallow Whole = none
[reskin] chassis nova: "Iron Gullet (Recharge 5-6)" — the brute-13's own nova row (its "Area Nova", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] print canon speed: 40 ft. -> 50 ft. — the Purple Worm's walk; the concept's other modes stay
[reskin] print canon speed: Burrow -> 50 ft. — the Purple Worm's own
[reskin] print canon row: Actions/Tail Stinger — the Purple Worm's second melee row, beside the chassis's
[reskin] print canon multiattack: "The purple worm makes one Bite attack and one Tail Stinger attack." — the Purple Worm's own
[reskin] languages held: None stands — INT 1 on a Monstrosity speaks nothing, whatever the mind read said
[reskin] print canon trait: Tunneler — "Purple Worm — that swallowed a war-band's armoury" is the Purple Worm (print's own row)
[reskin] print canon: chassis row leaves — Actions/"Iron Gullet (Recharge 5-6)" is the seat's nova, not the Purple Worm's
[reskin] print canon row: Bonus Actions/Swallow — the Purple Worm's own
[reskin] escape dc: Bite → DC 22 (8 + PB + STR; a late row wore another number)
```


---


### Suture Troll — a 2024 sheet

**Concept:** a troll that grows back unless the blade was silvered

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Suture Troll | 6 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- **dropped clause:** "grows back unless the blade was silvered"
- read: def 4 / off 5 → 4.5; sustained 33 (3 × Rend); nova none; dmg 33

```
Suture Troll

Large Giant, Chaotic Evil

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

CR 6 (XP 2,300; PB +3)

Traits

Regeneration. The suture troll regains 15 Hit Points at the start of each of its turns. If the suture troll takes damage from a silvered weapon, this trait doesn't function on the suture troll's next turn. The suture troll dies only if it starts its turn with 0 Hit Points and doesn't regenerate.

Loathsome Limbs. If the suture troll ends any turn Bloodied and took 15+ Slashing damage during that turn, one of the suture troll's limbs is severed, falls into the suture troll's space, and becomes a Troll Limb. The limb acts immediately after the suture troll's turn. The suture troll has 1 Exhaustion level for each missing limb, and it grows replacement limbs the next time it regains Hit Points.

Actions

Multiattack. The suture troll makes three Rend attacks.

Rend. Melee Attack Roll: +7, reach 10 ft. 11 (2d6 + 4) Slashing damage.

Bonus Actions

Charge. The suture troll moves up to half its Speed straight toward an enemy it can see.

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
- Actions/Rend — print's own row, renamed
- Traits/Regeneration — print's own row
- Traits/Loathsome Limbs — print's own row
- Bonus Actions/Charge — print's own row

**Engine trace**

```
[path] twist — Troll (is) — "a troll" (call)
[route] brute-regenerator type=Monstrosity mechanics=regeneration — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | brute-regenerator: ✓ ("grows back") | brute-regenerator: no line key in the words — the model's read of its quote | bane: "silver" on the GM's own words "unless the blade was silvered"
[concept] hints: troll→canon ✓ ("a troll that grows back")
[concept] resolve: archetype=brute type=Monstrosity themes=bestial/terror mind=bestial style=regenerator energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: regeneration
[concept] signature elements: flesh that knits back together [body] | only silvered blades stop the regrowth [behavior] | bone spurs and knotted muscle [body]
[concept] identity: A hulking monstrosity of ropey, knotted muscle and bone-spurred hide wades into the fight and simply refuses to die, its flesh knitting shut around every wound that is not silvered. Each round it presses the attack, letting lesser blows close behind it as it hammers at the nearest steel that is not silver, trying to break the one weapon that can keep it down. It fights to the death only while unmarked; once silver is drawn and bites, it turns cornered and vicious, slamming its bulk into the silver-bearer rather than retreating.
[concept] lore: Spun from the marrow of a dozen butchered trolls into a single seamless body, it wakes with one hunger: to find the smith whose silver can actually make it stay dead.
[reskin] the concept outranks the alias: the Troll is a Giant and the concept reads Monstrosity — the words RESEMBLE it, they do not name it, so the print body stands down
[reskin] print canon route: the Troll's body outranks the regenerator seat — no verb in the words names it; the plain brute line
[reskin] print canon defenses: HP 116 -> 94, AC 14 -> 15 — the Troll's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 18, DEX 13, CON 20, INT 7, WIS 9, CHA 7 — the Troll's at its own CR; attack +7 -> +7, DC 16 (print's)
[reskin] regeneration organ injected — 10/turn
[reskin] regeneration off-switch: silver (the call read the GM's weakness clause as silver ("unless the blade was silvered"))
[reskin] donor: brute-5 -> CR 6
[reskin] [path] decides: twist on the Troll (the matcher would have said homebrew)
[reskin] print canon: "a troll that grows back unless the blade was silvered" heads on the Troll — print's rows ride along; the seat stays
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline declared: "the suture troll" — the call's own answer (kind), built from the name
[reskin] inline form: "the suture troll" — the model's own reading of the name
[reskin] save dc derived: DC 14 -> 16 (8 + PB 3 + the sheet's best 5) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] lacks refused: "unless the blade was silvered" names no absence — nothing in it takes anything away
[reskin] clauses: "a troll" -> has (mechanical), head [asked: heal] | "grows back unless the blade was silvered" -> has (mechanical) [asked: heal]
[reskin] signature idea (action): "When the troll lands a claw on someone, it tears the wound wide and packs its own raw, knitting flesh into the gash, fusing shreds of itself into the victim. That flesh keeps squirming inside them, slowing them and dragging at every step until it is dug out or burned away. Any wound the troll takes reknits a little faster while a piece of it is still crawling under someone else's skin." [rider/on_hit/condition] — menu: affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, charge (+ shelf: trample, leap, thrown-burst, shield-bash, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, rampage, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating)
[reskin] fit declined: "Sutured Graft" — a print body takes only what the user's words ask; the call offered no quote, and the key table finds no verb either (the blacksmith's rally, critic-ten 2026-10-01)
[reskin] fallback stands down: the twist path has no shelf — the Troll's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "Whenever the troll is struck by anything that is not silver, the skin around the blow knits shut around the weapon and pulls its wielder in, so blades bite and then stick fast for a moment, dragging the attacker close enough for the troll's claws. Silvered steel is the one edge it cannot close over." [trait/on_being_hit/condition] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] word match declined by the call: adhesive, weapon-lodge — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "Whenever the troll is struck by anything that is not silver, the skin around the blow knits shut around the weapon and pulls its wielder in, so blades bite and then stick fast for a moment, dragging the attacker close enough for the troll's claws. Silvered steel is the one edge it cannot close over." [trait/on_being_hit/condition] — the model found no template that holds it (offered: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge, adhesive, warded-mending)
[reskin] repair: 1 clause(s) with no row — "grows back unless the blade was silvered"; one targeted call with the sheet as context
[reskin] repair: the answer held no rows — the clauses stay unplaced
[reskin] weapons answered: Claw = none
[reskin] print canon alignment: Neutral -> Chaotic Evil — the Troll's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon type: Monstrosity -> Giant — the Troll's (a Unicorn printed Fey, 2026-10-01)
[reskin] print canon languages: "None" -> "Giant" — the Troll's
[reskin] print canon speed: 40 ft. -> 30 ft. — the Troll's walk; the concept's other modes stay
[reskin] print canon attack: "Claw" -> "Rend" — the Troll's own row
[reskin] print canon multiattack: "The suture troll makes three Rend attacks." — the Troll's own
[reskin] print canon trait: Loathsome Limbs — "a troll that grows back unless the blade was silvered" is the Troll (print's own row)
[reskin] print canon trait: Regeneration — print's text replaces the chassis's (the Troll regenerates 15, not the chassis's 10 — critic's audit 2026-10-02)
[reskin] print canon row: Bonus Actions/Charge — the Troll's own
[reskin] vulnerability rejected — "no field" is dealt, defended, or not a damage type
[reskin] regeneration keyed to the GM's own bane: "Regeneration" keyed "Acid or Fire damage" and the GM named silver ("unless the blade was silvered") — print's row keeps everything else
[reskin] audit rewrite blocked — "Regeneration" is engine-authored chassis text
[reskin] audit rewrite blocked — "Loathsome Limbs" is engine-authored chassis text
```


---


### Cinder-Choked Hydra — a print donor

**Concept:** Hydra whose stumps smoke instead of regrowing

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Cinder-Choked Hydra | 8 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 8 / off 3 → 5.5; sustained 10 (1 × Bite); nova none; dmg 10

```
Cinder-Choked Hydra

Huge Monstrosity, Unaligned

AC 15
Initiative +1 (11)

HP 184 (16d12 + 80)

Speed 40 ft., Swim 40 ft.

MOD
SAVE
STR
20
+5
+8
INT
2
-4
-4
MOD
SAVE
DEX
12
+1
+1
WIS
10
+0
+0
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

Skills Athletics +8, Perception +3

Immunities Blinded, Charmed, Deafened, Frightened, Stunned, Unconscious

Senses darkvision 60 ft.; Passive Perception 13

Languages None

CR 8 (XP 3,900; PB +3)

Traits

Hold Breath. The hydra can hold its breath for 1 hour.

Multiple Heads. The hydra has five heads. Whenever the hydra takes 25 damage or more on a single turn, one of its heads dies. The hydra dies if all its heads are dead.

Reactive Heads. For each head the hydra has beyond one, it gets an extra Reaction that can be used only for Opportunity Attacks.

Actions

Multiattack. The hydra makes as many Bite attacks as it has heads.

Bite. Melee Attack Roll: +8, reach 10 ft. 10 (1d10 + 5) Piercing damage.

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
- Actions/Bite — the chassis
- Traits/Hold Breath — print's own row
- Traits/Multiple Heads — print's own row
- Traits/Reactive Heads — print's own row

**Engine trace**

```
[path] twist — Hydra (is) — "Hydra" (call)
[route] brute-regenerator type=Monstrosity mechanics=regeneration — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | brute-regenerator: ✓ ("stumps smoke instead of regrowing") | brute-regenerator: no line key in the words — the model's read of its quote | bane refused: the words carry no weakness clause, so "fire" answers a question nobody asked
[concept] resolve: archetype=brute type=Monstrosity themes=venomous/bestial mind=bestial style=regenerator energy=Poison mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: regeneration
[concept] signature elements: severed necks that erupt into smoke [behavior] | caustic smoke clouds from its stumps [aura] | five lashing heads that bite and constrict [body]
[concept] identity: The smoking hydra lures victims in with false confidence, then punishes them for every wound they deal — each severed neck bursts into a blinding, strangling plume of caustic smoke rather than regrowing, rewarding the creature's attackers with a lungful of ruin. It fights as a lunging brute of a body, using its many heads to grab, constrict, and maim while the wounds it suffers keep bleeding out smoke until the battlefield is a choking cloud. Cornered and bleeding, it fights to the death rather than retreat, spending its own severed flesh as a weapon.
[concept] lore: A hydra that spawned in the choked vents of a volcanic mire, its blood curdled into a smoking venom that replaces the regrowth its kin rely on; it seeks nothing now but to be left alone in the fogs it makes, though its smoke always draws the curious.
[reskin] print canon route: the Hydra's body outranks the regenerator seat — no verb in the words names it; the plain brute line
[reskin] print canon route: the regenerator seat's organ leaves too — the Hydra has no Regeneration of its own
[reskin] print canon defenses: HP 149 -> 184, AC 15 -> 15 — the Hydra's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 20, DEX 12, CON 20, INT 2, WIS 10, CHA 7 — the Hydra's at its own CR; attack +8 -> +8, DC 16 (print's)
[reskin] donor: brute-5 -> CR 8
[reskin] [path] decides: twist on the Hydra (the matcher agrees)
[reskin] print canon: "Hydra whose stumps smoke instead of regrowing" heads on the Hydra — print's rows ride along; the seat stays
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline declared: "the hydra" — the call's own answer (kind), built from the name
[reskin] inline form: "the hydra" — the model's own reading of the name
[reskin] save dc derived: DC 15 -> 16 (8 + PB 3 + the sheet's best 5) — no stat on the sheet reached it
[reskin] lacks asked: "instead of regrowing"
[reskin] asked field dropped: the call answered trigger "on_being_hit" for "Hydra whose stumps smoke instead of regrowing" but offered no quote
[reskin] clauses: "Hydra whose stumps smoke instead of regrowing" -> LACKS (mechanical) [asked: save_area]
[reskin] signature idea (action): "The hydra whips its neck stump forward and hacks a wet gout of burning blood-venom at a nearby foe, splattering them in the same caustic filth its wounds already spill. Anyone caught in the spatter keeps coughing and blinking through the clinging smoke for a short while, their eyes stinging and lungs raw." [rider/on_hit/damage] — menu: affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, charge (+ shelf: trample, leap, thrown-burst, shield-bash, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, zone, zone-seed, rampage, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating)
[reskin] signature bound to the concept's verb: action — zone, zone-seed (smoke)
[reskin] word match declined by the call: rampage, zone-seed, affliction, own-turn-punisher, coating — the key word does not mean the mechanic here
[reskin] fit declined: "Smoke-Choked Stumps (1/Day)" — a print body takes only what the user's words ask; the call quoted "smoke", which is not in the GM's own words (every significant word must be), and the key table finds no verb either (the blacksmith's rally, critic-ten 2026-10-01)
[reskin] fallback respects the call: zone-seed, rampage, own-turn-punisher left the shelf — the call declined them for this sheet
[reskin] fallback stands down: the twist path has no shelf — the Hydra's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "Whenever a neck is severed or a wound is torn open, the stump erupts in a roiling plume of caustic smoke that lingers around the body instead of healing shut. The cloud hangs in the hydra's space and drifts outward, blinding and strangling anyone who stays near or wades through it, so the longer the fight drags on the worse the air becomes." [trait/on_being_hit/condition] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] signature bound to the concept's verb: trait — warded-mending (regrows)
[reskin] trait declined: "Caustic Stump Burst" — bound only on the idea's own words (wounded:idea, erupt:idea) with no key in the concept; a meat body earns its trait by the user's verb (the sniper's tracker, critic 2026-09-29)
[reskin] weapons answered: Bite = none
[reskin] speed by concept: added Swim 40 ft. — the concept's movement set decides
[reskin] print canon multiattack: "The hydra makes as many Bite attacks as it has heads." — the Hydra's own
[reskin] languages held: None stands — INT 2 on a Monstrosity speaks nothing, whatever the mind read said
[reskin] print canon defenses: immunities none -> Blinded, Charmed, Deafened, Frightened, Stunned, Unconscious — the Hydra's own header lines
[reskin] print canon trait: Hold Breath — "Hydra whose stumps smoke instead of regrowing" is the Hydra (print's own row)
[reskin] print canon trait: Multiple Heads — "Hydra whose stumps smoke instead of regrowing" is the Hydra (print's own row)
[reskin] print canon trait: Reactive Heads — "Hydra whose stumps smoke instead of regrowing" is the Hydra (print's own row)
audit finding below confidence gate: Multiple Heads Initiative is computed at +1 (11), matching DEX +1 with no additional bonus, yet Reactive Heads grants extra Reactions per head beyond one — a GM cannot adjudicate how these reaction slots relate to the normal single reaction granted by the core rules, and the block never states whether the hydra's reaction economy replaces or supplements the standard one.
[reskin] audit rewrite blocked — "Multiple Heads" is engine-authored chassis text
[reskin] audit rewrite blocked — "Multiple Heads" is engine-authored chassis text
[reskin] lacks clause: Traits/"Multiple Heads" keeps its blow, loses the regeneration — "Hydra whose stumps smoke instead of regrowing"
```


---


### Legion Halberdier — one marked soft

**Concept:** a hobgoblin with a halberd

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Legion Halberdier | 2 | skirmisher-1 | ok | ok | SOFT: reach | ok | ok | ok | ok | ok | ok | ok |

- structure · soft · reach: Actions/Halberd: reach 10 on a Medium body with no tether word
- read: def 1/2 / off 2 → 1.25; sustained 14 (2 × Halberd); nova none; dmg 14

```
Legion Halberdier

Medium Humanoid, Lawful Evil

AC 15
Initiative +1 (11)

HP 44 (8d8 + 8)

Speed 30 ft.

MOD
SAVE
STR
16
+3
+3
INT
10
+0
+0
MOD
SAVE
DEX
12
+1
+3
WIS
10
+0
+0
MOD
SAVE
CON
12
+1
+1
CHA
9
-1
-1

Skills Perception +2, Stealth +3

Senses darkvision 60 ft.; Passive Perception 12

Languages Common, Goblin

CR 2 (XP 450; PB +2)

Traits

Great Weapon Master. When the halberdier hits a creature with its Halberd, the attack deals an extra 2 damage.

Pack Tactics. The hobgoblin has Advantage on an attack roll against a creature if at least one of the hobgoblin's allies is within 5 feet of the creature and the ally doesn't have the Incapacitated condition.

Actions

Multiattack. The halberdier makes two attacks, using Halberd or Longbow in any combination.

Halberd. Melee Attack Roll: +5, reach 10 ft. 7 (1d8 + 3) Slashing damage.

Longbow. Ranged Attack Roll: +5, range 150/600 ft. 7 (1d8 + 3) Piercing damage.

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

- Traits/Great Weapon Master — a declared feature; the GM's clause "a hobgoblin with a halberd"
- Traits/Pack Tactics — print's own row
- Actions/Multiattack — the chassis
- Actions/Halberd — authored for this sheet; a named part; the GM's clause "a hobgoblin with a halberd"; weapon halberd
- Actions/Longbow — print's own row, renamed; weapon longbow

**Engine trace**

```
[path] twist — Hobgoblin Warrior (is) — "a hobgoblin" (call)
[route] skirmisher type=Humanoid mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | skirmisher: ✓ ("a hobgoblin with a halberd") | skirmisher: no line key in the words — the model's read of its quote
[concept] resolve: archetype=skirmisher type=Humanoid themes=armed/bestial mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: the halberd's reach and hooking blade [object] | hobgoblin rank discipline and pack coordination [behavior]
[concept] identity: The hobgoblin opens by probing with the halberd's reach from just outside the enemy's own measure, testing which side of the line is soft before committing. Every round after, it works the seam of the fight — dart in behind an ally's press to land a hooking cut, then back out of reach — and it spends its own footwork to buy allies the flank rather than to save itself. It does not break; hobgoblin discipline holds it in line while the rank is whole, and it gives ground only to re-form, not to flee.
[concept] lore: Drilled in the war-camps of a hobgoblin legion, this soldier carries a halberd taller than itself and a place in the line it will not abandon while the standard flies.
[reskin] the concept outranks the alias: the Hobgoblin Warrior is a Fey and the concept reads Humanoid — the words RESEMBLE it, they do not name it, so the print body stands down
[reskin] print canon array: STR 16, DEX 12, CON 12, INT 10, WIS 10, CHA 9 — the Hobgoblin Warrior's, STR fitted to +5
[reskin] donor: skirmisher-1 -> CR 2
[reskin] [path] decides: twist on the Hobgoblin Warrior (the matcher would have said homebrew)
[reskin] print canon: "a hobgoblin with a halberd" heads on the Hobgoblin Warrior — print's rows ride along; the seat stays
[reskin] claim gate: CR 2 but a Humanoid body — the trait seat stays open (print: a material body carries a trait at every tier)
[reskin] repair round 1: 1 defect(s) — renames for "Melee Attack" and "Ranged Attack" are both "Halberd" — every row needs its own name (give the thrown twin its own word: Scythe / Hurled Scythe)
[reskin] repair round 2: 1 defect(s) — no damage type for "Hurled Scythe"
[reskin] named parts: Halberd (slot) — the user's words, the engine's numbers
[reskin] named parts landed: 1 attack row(s), 0 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline declared: "the halberdier" — the call's own answer (kind), built from the name
[reskin] inline form: "the halberdier" — the model's own reading of the name
[reskin] save dc derived: DC 12 -> 13 (8 + PB 2 + the sheet's best 3) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a hobgoblin with a halberd" -> has (descriptive), head
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "When the halberdier hits a creature with its halberd, it can hook the target and haul it along as the halberdier gives ground, dragging the enemy a short distance with it — into the reach of the halberdier's allies, or out of the soft spot it just found. It is a repositioning tool, not extra damage: the halberdier trades its own ground to put the hooked enemy somewhere worse." [rider/on_hit/movement] — menu: contagion, charge-push, hook-rider, pounce, isolation, bolt-mark, charge (+ shelf: trample, gaze-single, snare, throw-retrieve, shield-bash, lure, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte)
[reskin] fit declined: "Hooking Retreat" — a print body takes only what the user's words ask; the call offered no quote, and the key table finds no verb either (the blacksmith's rally, critic-ten 2026-10-01)
[reskin] fallback stands down: the twist path has no shelf — the Hobgoblin Warrior's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "The halberdier's reach reads the enemy's guard before a blow ever lands: the halberdier can test a foe at the edge of its reach, learning where that foe is soft, and the rest of its line shares the opening. The halberd's hooking blade also snaps an enemy's guard aside so that the halberdier's next stroke finds the seam." [trait/always/condition] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] signature miss: trait — "The halberdier's reach reads the enemy's guard before a blow ever lands: the halberdier can test a foe at the edge of its reach, learning where that foe is soft, and the rest of its line shares the opening. The halberd's hooking blade also snaps an enemy's guard aside so that the halberdier's next stroke finds the seam." [trait/always/condition] — no template on the shelf shares a verb with the concept or the idea (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst, absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] weapons answered: Halberd = halberd
[reskin] weapon table: "Hurled Scythe" — range 30/90 ft. is not a print range; an unlisted thrown thing is 20/60, a hurled mass 60/240 (the critic's third species read)
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] languages by species: Goblin — the concept names the species; print's NPCs of it speak it
[reskin] print canon alignment: Lawful Neutral -> Lawful Evil — the Hobgoblin Warrior's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon type: Humanoid stays — the words say humanoid ("a dire wolf but undead", 2026-10-01)
[reskin] print canon attack: "Hurled Scythe" -> "Longbow" — the Hobgoblin Warrior's own ranged row
[reskin] print canon trait: Pack Tactics — "a hobgoblin with a halberd" is the Hobgoblin Warrior (print's own row)
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the seat's, not the Hobgoblin Warrior's
[reskin] print canon: chassis row leaves — Traits/"Drilled Footwork" is the seat's, not the Hobgoblin Warrior's
audit finding below confidence gate: Longbow The block grants a longbow attack but the creature's only listed physical equipment is a halberd and no ammunition or ranged weapon is established in the statblock.
[reskin] weapon reach: "Halberd" reaches 10 ft. — print's halberd has Reach
[reskin] multiattack re-read — "Longbow" joins the combination; "The halberdier makes two attacks, using Halberd or Longbow in any combination."
```


---


### Glacier-Jarl Hoarfrost — in the run

**Concept:** a Huge frost giant jarl who throws boulders

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Glacier-Jarl Hoarfrost | 9 | skirmisher-8 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- **dropped clause:** "throws boulders"
- read: def 6 / off 9 → 7.5; sustained 56 (2 × Frost Axe); nova none; dmg 56

```
Glacier-Jarl Hoarfrost

Huge Giant, Neutral Evil

AC 15
Initiative -1 (9)

HP 149 (13d12 + 65)

Speed 40 ft.

MOD
SAVE
STR
23
+6
+6
INT
9
-1
-1
MOD
SAVE
DEX
9
-1
+3
WIS
10
+0
+4
MOD
SAVE
CON
21
+5
+5
CHA
12
+1
+1

Skills Perception +4, Stealth +3

Immunities Cold

Senses darkvision 60 ft.; Passive Perception 14

Languages Giant

CR 9 (XP 5,000; PB +4)

Actions

Multiattack. Hoarfrost makes two attacks, using Frost Axe or Great Bow in any combination.

Frost Axe. Melee Attack Roll: +10, reach 10 ft. 19 (2d12 + 6) Slashing damage plus 9 (2d8) Cold damage.

Great Bow. Hoarfrost hurls a glacier boulder. Ranged Attack Roll: +10, range 150/600 ft. 17 (2d10 + 6) Piercing damage. The weapon lands in an unoccupied space within 5 feet of the target; until Hoarfrost spends 5 feet of movement in that space to recover it, Hoarfrost's Speed is halved and it can't use this action.

Bonus Actions

War Cry (Recharge 5-6). Hoarfrost or one creature of its choice that can see or hear it gains 16 (2d10 + 5) Temporary Hit Points and has Advantage on attack rolls until the start of Hoarfrost's next turn.

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
- Actions/Frost Axe — print's own row, renamed; weapon handaxe
- Actions/Great Bow — print's own row, renamed; template throw-retrieve; library draw (seed unstamped); weapon bow
- Bonus Actions/War Cry — print's own row

**Engine trace**

```
[path] twist — Frost Giant (is) — "frost giant" (call)
[route] skirmisher-hurler type=Giant mechanics=thrown-weapon — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | skirmisher-hurler: ✓ ("throws boulders") | skirmisher-hurler: key "throws" (class verb)
[concept] hints: hurler→style ✓ ("throws boulders")
[concept] resolve: archetype=skirmisher type=Giant themes=elemental/terror mind=sapient style=hurler energy=Cold mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: thrown-weapon
[concept] signature elements: boulder hurling from the glacier [behavior] | ice-sheathed body of a jarl [body] | rune-carved axe [object]
[concept] identity: A frost giant jarl opens by heaving a boulder torn from the glacier itself, cratering the ground to scatter a formation before closing with a rune-carved axe. Every round after that it circles at the edge of reach, throwing ice-sheathed rocks and spears to pin foes in place, then wading in to finish whoever is left standing. It is a proud warlord with no fear of death, fighting to the last breath while roaring orders to its kin and refusing to retreat even bloodied.
[concept] lore: A jarl of the high ice halls, he claims tribute from any who cross his glacier and buries those who refuse beneath the boulders he tears from his own frozen domain.
[reskin] print canon route: "a Huge frost giant jarl who throws boulders" is the Frost Giant, a bow-user — the hurler seat stands down for the plain line
[reskin] nova capped: "Sweeping Area Attack" 54 → 49 (the chassis nova obeys the cap: 50 at CR 9)
[reskin] print canon pb: print's +9 on PB +3 reads +10 on this sheet's PB +4; DCs follow
[reskin] print canon defenses: HP 150 -> 149, AC 17 -> 15 — the Frost Giant's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 23, DEX 9, CON 21, INT 9, WIS 10, CHA 12 — the Frost Giant's at its own CR; attack +8 -> +10, DC 18 (print's, on this sheet's PB)
[reskin] donor: skirmisher-8 -> CR 9
[reskin] style unserved: "hurler" has no skirmisher line — the plain line ships (resolve's style signal is noisy; not re-routed)
[reskin] [path] decides: twist on the Frost Giant (the matcher would have said homebrew)
[reskin] print canon: "a Huge frost giant jarl who throws boulders" heads on the Frost Giant — print's rows ride along; the seat stays
[reskin] name_element answered: Glacier-Jarl Hoarfrost = literal
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline declared: "Hoarfrost" — the call's own answer (person), built from the name
[reskin] inline form: "Hoarfrost" — the model's own reading of the name
[reskin] save dc derived: DC 15 -> 18 (8 + PB 4 + the sheet's best 6) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a Huge frost giant jarl" -> has (header) | "throws boulders" -> has (mechanical) [asked: at_will/attack]
[reskin] menu pruned: action — thrown-burst-seed, phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "Hoarfrost rips a boulder from the glacier and hurls it with a warlord's roar, and the ground where it lands erupts in a fan of jagged frost shards. Everyone caught in the blast is left stumbling over slick, splintered ice, their footing ruined so the jarl and his kin can close in on them. The ice lingers where it settles, making the broken ground treacherous to cross." [action/save/movement] — menu: gaze-single, snare, condition-payoff, throw-retrieve, shield-bash, lure, snare-bolt, sensory-strike, disarm, exploiter, slow-bolt (+ shelf: delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte, affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, isolation, bolt-mark, charge)
[reskin] signature bound to the concept's verb: action — slow-bolt (frost)
[reskin] word match declined by the call: slow-bolt, condition-payoff, exploiter, affliction, gaze-single, snare, shield-bash, lure, snare-bolt, sensory-strike, disarm — the key word does not mean the mechanic here
[reskin] pick kept on the GM's own words: action — "throw-retrieve" has no key-table verb, but the call quotes "throws boulders" from the description
[reskin] slot yields: ranged — the chassis's "Boulder" leaves; "Glacier Hurl" holds the slot
[reskin] multiattack re-read — "Boulder" left; "Multiattack" now reads "Hoarfrost makes three Greataxe attacks."
[reskin] signature template: throw-retrieve -> Actions/"Glacier Hurl" ("Hoarfrost rips a boulder from the glacier and hurls it — a ranged boulder throw  [shape fit, no verb match]")
[reskin] signature idea (trait): "The ice sheathing Hoarfrost's body bites back at anyone who lands a blow on him up close, frost crawling up their weapon and arms. Those who strike him feel the cold seep in and their limbs stiffen, slowing them just enough for the jarl to answer with his axe." [trait/on_being_hit/condition] — menu: heated-body, absorption, bloodied-burst, resonant-body (+ shelf: adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, warded-mending, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] signature bound to the concept's verb: trait — heated-body (frost)
[reskin] trait declined: "Rime Sheathing" — a print body takes only what the user's words ask; the call offered no quote, and the key table finds no verb either
[reskin] weapons answered: Greataxe = greataxe; Boulder = none; Avalanche Sweep = none
[reskin] chassis nova: "Avalanche Sweep (Recharge 5-6)" — the skirmisher-8's own nova row (its "Sweeping Area Attack", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] speed by concept: dropped Climb 40 ft. — the concept's movement set decides
[reskin] print canon alignment: Neutral -> Neutral Evil — the Frost Giant's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon attack: "Greataxe" -> "Frost Axe" — the Frost Giant's own row
[reskin] print canon multiattack: "Hoarfrost makes two attacks, using Frost Axe or Great Bow in any combination." — the Frost Giant's own
[reskin] print canon attack: "Great Bow" is print's own row — +9, 17 (2d10 + 6), range 150/600 ft. (an exact body at print's CR)
[reskin] print canon attack: "Glacier Hurl" -> "Great Bow" — the Frost Giant's own ranged row
[reskin] defenses by material: a ice body is vulnerable to Fire and never resists, absorbs, or ignores it — the resistance is withheld; the vulnerability is the GM's to type (the Frostmaw carried a Fire vulnerability nobody typed — the critic's second species read)
[reskin] print canon defenses: immunities none -> Cold — the Frost Giant's own header lines
[reskin] print canon: chassis row leaves — Actions/"Avalanche Sweep (Recharge 5-6)" is the seat's nova, not the Frost Giant's
[reskin] print canon: chassis row leaves — Traits/"Ice Stride" is the seat's, not the Frost Giant's
[reskin] print canon row: Bonus Actions/War Cry (Recharge 5-6) — the Frost Giant's own
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" yields to the Frost Giant's War Cry (Recharge 5-6)
[reskin] asked but unanswered: "throws boulders" asked for at_will and no row binds the clause
[reskin] audit rename blocked — "Great Bow" is the user's own part name, a kit feature's real name, or print's own row
```


---


### Gravewatch Archer — in the run

**Concept:** a skeleton archer

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Gravewatch Archer | 1 | skirmisher-1 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1/4 / off 2 → 1.125; sustained 12 (2 × Shortsword); nova none; dmg 12

```
Gravewatch Archer

Medium Undead, Lawful Evil

AC 15
Initiative +3 (13)

HP 32 (5d8 + 10)

Speed 30 ft.

MOD
SAVE
STR
10
+0
+0
INT
6
-2
-2
MOD
SAVE
DEX
16
+3
+5
WIS
8
-1
-1
MOD
SAVE
CON
15
+2
+2
CHA
5
-3
-3

Skills Perception +1, Stealth +5

Vulnerabilities Bludgeoning

Immunities Poison; Exhaustion, Poisoned

Senses darkvision 60 ft.; Passive Perception 11

Languages Understands Common plus one other language but can't speak

CR 1 (XP 200; PB +2)

Actions

Multiattack. The archer makes two attacks, using Shortsword or Shortbow in any combination.

Shortsword. Melee Attack Roll: +5, reach 5 ft. 6 (1d6 + 3) Piercing damage.

Shortbow. Ranged Attack Roll: +5, range 80/320 ft. 6 (1d6 + 3) Piercing damage.

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
- Actions/Shortsword — print's own row, renamed; weapon shortsword
- Actions/Shortbow — print's own row, renamed; weapon shortbow

**Engine trace**

```
[path] twist — Skeleton (is) — "skeleton" (call)
[route] skirmisher-archer type=Undead mechanics=none — casts: the call reads no worked magic here | shoots: on the GM's own words "a skeleton archer" | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | skirmisher-archer: ✓ ("a skeleton archer") | skirmisher-archer: key "archer" (class noun)
[concept] resolve: archetype=skirmisher type=Undead themes=grave/armed mind=mindless style=archer energy=Necrotic mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: loosing arrows from a bone bow [behavior] | skeletal frame of bare bone [body] | a grave-worn bow and quiver [object]
[concept] identity: A skeleton archer opens fights by loosing a bone-tipped arrow from the edge of its bow's reach, then repositions behind cover or undead allies, firing steady shots each round at whatever is closest to reaching it. Corpse-calm and relentless, it will not close to melee unless cornered and, being already dead, never flees the field. Its archery is a habit of old muscle and the bow is a companion of the grave, keeping it coldly distant rather than berserk.
[concept] lore: Some ruined archer's remains rose from a battlefield grave, still keeping the watch its company abandoned, loosing arrows at any warm thing that walks the field.
[reskin] print canon route: the Skeleton's body outranks the archer seat — no verb in the words names it; the plain skirmisher line
[reskin] print canon array: STR 10, DEX 16, CON 15, INT 6, WIS 8, CHA 5 — the Skeleton's; DEX 16 outranks the card's +4, so the sheet rolls +5 (raise-only)
[reskin] donor: skirmisher-1 -> CR 1
[reskin] [path] decides: twist on the Skeleton (the matcher agrees)
[reskin] print canon: "a skeleton archer" heads on the Skeleton — print's rows ride along; the seat stays
[reskin] claim gate: CR 1 but a Undead body — the trait seat stays open (print: a material body carries a trait at every tier)
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline declared: "the archer" — the call's own answer (kind), built from the name
[reskin] inline form: "the archer" — the model's own reading of the name
[reskin] save dc derived: DC 11 -> 13 (8 + PB 2 + the sheet's best 3) — no stat on the sheet reached it
[reskin] final price: the round ran 14 against the card's 10 — the attack rows re-solve at 75% (2 attacks off one row after a supersede)
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a skeleton archer" -> has (descriptive), head
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The archer looses a bone-tipped arrow steeped in grave rot. The wound it leaves does not close cleanly: for the rest of the fight that target's flesh keeps withering, so every later hit from any gravewatch archer bites deeper and the victim's own body betrays it with a creeping chill that slows its steps. Only one such mark can cling to a creature at a time, and only a moment of stillness far from" [rider/on_hit/condition] — menu: contagion, charge-push, hook-rider, pounce, isolation, bolt-mark, charge (+ shelf: snare, throw-retrieve, shield-bash, lure, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte)
[reskin] word match declined by the call: bolt-mark, contagion, delayed-brand, aggro-curse — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit"
[reskin] signature miss: action — "The archer looses a bone-tipped arrow steeped in grave rot. The wound it leaves does not close cleanly: for the rest of the fight that target's flesh keeps withering, so every later hit from any gravewatch archer bites deeper and the victim's own body betrays it with a creeping chill that slows its steps. Only one such mark can cling to a creature at a time, and only a moment of stillness far from" [rider/on_hit/condition] — the model found no template that holds it (offered: contagion, charge-push, hook-rider, pounce, isolation, bolt-mark, charge, delayed-brand, rampage, aggro-curse)
[reskin] fallback stands down: the twist path has no shelf — the Skeleton's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "Where the archer's arrows strike the living, the grave clings: a creature wounded by its bow finds the chill of the battlefield settling into it, its reflexes growing dull and its limbs stiff until it has taken a breath away from the fight." [trait/always/condition] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "Where the archer's arrows strike the living, the grave clings: a creature wounded by its bow finds the chill of the battlefield settling into it, its reflexes growing dull and its limbs stiff until it has taken a breath away from the fight." [trait/always/condition] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst, bloodied-burst)
[reskin] weapons answered: Bowstave = club; Arrow = bow
[reskin] weapon declared: "Bowstave" is a club — the call's own answer (the name alone read bow)
[reskin] weapon declared: "Arrow" is a bow — the call's own answer (the name alone read longbow)
[reskin] weapon table: "Arrow" — a launcher, never thrown, range 150/600
[reskin] print canon alignment: Neutral -> Lawful Evil — the Skeleton's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "None" -> "Understands Common plus one other language but can't speak" — the Skeleton's
[reskin] print canon attack: "Bowstave" -> "Shortsword" — the Skeleton's own row
[reskin] print canon attack: "Arrow" -> "Shortbow" — the Skeleton's own ranged row
[reskin] immunities stamped for type: Undead -> Poison; Exhaustion, Poisoned
[reskin] print canon defenses: vulnerabilities none -> Bludgeoning — the Skeleton's own header lines
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the seat's, not the Skeleton's
[reskin] print canon: chassis row leaves — Traits/"Grave Step" is the seat's, not the Skeleton's
[reskin] vulnerability rejected — "Bludgeoning" has no warrant in the concept's own text (print's default is none)
```


---


### Twin-Head Wolf — in the run

**Concept:** a wolf with two heads

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Twin-Head Wolf | 2 | skirmisher-1 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1/2 / off 2 → 1.25; sustained 14 (2 × Bite); nova none; dmg 14

```
Twin-Head Wolf

Medium Monstrosity, Unaligned

AC 15
Initiative +3 (13)

HP 44 (8d8 + 8)

Speed 40 ft.

MOD
SAVE
STR
14
+2
+2
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
12
+1
+1
CHA
6
-2
-2

Skills Perception +3, Stealth +5

Senses darkvision 60 ft.; Passive Perception 13

Languages None

CR 2 (XP 450; PB +2)

Traits

Pack Tactics. The twin-head wolf has Advantage on attack rolls against a creature if at least one of the twin-head wolf's allies is within 5 feet of the creature and the ally doesn't have the Incapacitated condition.

Actions

Multiattack. The twin-head wolf makes two Bite attacks.

Bite. Melee Attack Roll: +5, reach 5 ft. 7 (1d8 + 3) Piercing damage. If the target is a Medium or smaller creature, it has the Prone condition.

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

**Engine trace**

```
[path] twist — Wolf (is) — "a wolf" (call)
[route] skirmisher type=Monstrosity mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | skirmisher: ✓ ("a wolf with two heads") | skirmisher: no line key in the words — the model's read of its quote
[concept] resolve: archetype=skirmisher type=Monstrosity themes=bestial/terror mind=bestial style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: two heads hunting as one [body] | pack-tactics feint and flank [behavior] | lupine hide and jaws [body]
[concept] identity: The two-headed wolf circles a fight in a wide, loping arc, one head watching the prey while the other watches the pack, then darts in with a snapping lunge and pulls back before a counter can land. Each round it repeats the feint-and-retreat from a different flank, trading ground for openings and never committing both heads to the same bite. When wounded it does not break — it grows more reckless, driving in behind a packmate to hamstring whatever has hurt it.
[concept] lore: Twin-headed wolves are whelped where monstrous blood runs into ordinary packs, and the two skulls share one hunger between them — the surviving whelps are the ones whose heads learned to hunt together, and their packs are feared for it.
[reskin] the concept outranks the alias: the Wolf is a Beast and the concept reads Monstrosity — the words RESEMBLE it, they do not name it, so the print body stands down
[reskin] print canon array: STR 14, DEX 16, CON 12, INT 3, WIS 12, CHA 6 — the Wolf's, DEX fitted to +5
[reskin] donor: skirmisher-1 -> CR 2
[reskin] [path] decides: twist on the Wolf (the matcher would have said homebrew)
[reskin] print canon: "a wolf with two heads" heads on the Wolf — print's rows ride along; the seat stays
[reskin] claim gate: CR 2 but a Monstrosity body — the trait seat stays open (print: a material body carries a trait at every tier)
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline declared: "the twin-head wolf" — the call's own answer (kind), built from the name
[reskin] inline form: "the twin-head wolf" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a wolf with two heads" -> has (descriptive), head
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "When it lunges at a foe, the second head is not idle — it snaps at a different creature nearby, splitting the pack's attention in two. Both victims are thrown off guard by the double threat, and the wolf's allies close in while the prey is divided." [rider/on_hit/condition] — menu: contagion, charge-push, hook-rider, pounce, isolation, charge (+ shelf: trample, gaze-single, snare, shield-bash, lure, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, riposte)
[reskin] decline reason: action — the call answered none and names it "no_fit"
[reskin] signature miss: action — "When it lunges at a foe, the second head is not idle — it snaps at a different creature nearby, splitting the pack's attention in two. Both victims are thrown off guard by the double threat, and the wolf's allies close in while the prey is divided." [rider/on_hit/condition] — the model found no template that holds it (offered: contagion, charge-push, hook-rider, pounce, isolation, charge, feint-slip)
[reskin] fallback stands down: the twist path has no shelf — the Wolf's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "One head never stops watching the fight while the other fights; whenever the wolf is wounded, the unhurt head marks the attacker, and the wolf's next strike against that foe comes from an angle the prey cannot cover." [trait/on_being_hit/condition] — menu: heated-body, absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] word match declined by the call: bloodied-burst, bloodied-fury, faultless-tracker, relentless-pursuit — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "One head never stops watching the fight while the other fights; whenever the wolf is wounded, the unhurt head marks the attacker, and the wolf's next strike against that foe comes from an angle the prey cannot cover." [trait/on_being_hit/condition] — the model found no template that holds it (offered: heated-body, absorption, bloodied-burst, resonant-body, faultless-tracker, bloodied-fury, relentless-pursuit)
[reskin] weapons answered: Bite = none
[reskin] print canon type: Monstrosity stays — the words say monstrosity ("a dire wolf but undead", 2026-10-01)
[reskin] print canon speed: 30 ft. -> 40 ft. — the Wolf's walk; the concept's other modes stay
[reskin] languages held: None stands — INT 3 on a Monstrosity speaks nothing, whatever the mind read said
[reskin] print canon trait: Pack Tactics — "a wolf with two heads" is the Wolf (print's own row)
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the seat's, not the Wolf's
[reskin] print canon: chassis row leaves — Traits/"Feinting Arc" is the seat's, not the Wolf's
```


---


### Scaldwell Keeper — in the run

**Concept:** a vampire who runs a bathhouse

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Scaldwell Keeper | 13 | lurker-8 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 10 / off 6 → 8; sustained 30 (2 × Grave Strike); nova none; dmg 30

```
Scaldwell Keeper

Medium Undead, Lawful Evil

AC 16
Initiative +4 (14)

HP 195 (23d8 + 92)

Speed 40 ft., Climb 40 ft.

MOD
SAVE
STR
18
+4
+4
INT
17
+3
+8
MOD
SAVE
DEX
18
+4
+9
WIS
15
+2
+2
MOD
SAVE
CON
18
+4
+4
CHA
18
+4
+4

Skills Perception +7, Stealth +14

Resistances Necrotic

Immunities Poison; Exhaustion, Poisoned

Senses darkvision 60 ft.; Passive Perception 17

Languages Common plus two other languages

CR 13 (XP 10,000; PB +5)

Traits

Legendary Resistance. If the keeper fails a saving throw, it can choose to succeed instead.

Misty Escape. If the keeper drops to 0 Hit Points outside its resting place, the keeper uses Shape-Shift to become mist (no action required). If it can't use Shape-Shift, it is destroyed.
While it has 0 Hit Points in mist form, it can't return to its vampire form, and it must reach its resting place within 2 hours or be destroyed. Once in its resting place, it returns to its vampire form and has the Paralyzed condition until it regains any Hit Points, and it regains 1 Hit Point after spending 1 hour there.

Spider Climb. The keeper can climb difficult surfaces, including along ceilings, without needing to make an ability check.

Vampire Weakness. The keeper has these weaknesses:


- Forbiddance: the keeper can't enter a residence without an invitation from an occupant.
- Running Water: the keeper takes 20 Acid damage if it ends its turn in running water.
- Stake to the Heart: If a weapon that deals Piercing damage is driven into the keeper's heart while the keeper has the Incapacitated condition in its resting place, the keeper has the Paralyzed condition until the weapon is removed.
- Sunlight: the keeper takes 20 Radiant damage if it starts its turn in sunlight. While in sunlight, it has Disadvantage on attack rolls and ability checks.

Actions

Multiattack. The keeper makes two Grave Strike attacks and uses Bite.

Grave Strike. Melee Attack Roll: +9, reach 5 ft. 8 (1d8 + 4) Bludgeoning damage plus 7 (2d6) Necrotic damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 17) from one of two hands.

Bite (Bat or Vampire Form Only). Constitution Saving Throw: DC 17, one creature within 5 feet that is willing or that has the Grappled, Incapacitated, or Restrained condition. Failure: 6 (1d4 + 4) Piercing damage plus 13 (3d8) Necrotic damage. The target's Hit Point maximum decreases by an amount equal to the Necrotic damage taken, and the keeper regains Hit Points equal to that amount. A Humanoid reduced to 0 Hit Points by this damage and then buried rises the following sunset as a Vampire Spawn under the keeper's control.

Bonus Actions

Shape-Shift. If the keeper isn't in sunlight or running water, it shape-shifts into a Tiny bat (Speed 5 ft., Fly Speed 30 ft.) or a Medium cloud of mist (Speed 5 ft., Fly Speed 20 ft. [hover]), or it returns to its vampire form. Anything it is wearing transforms with it.
While in bat form, the keeper can't speak. Its game statistics, other than its size and Speed, are unchanged.
While in mist form, the keeper can't take any actions, speak, or manipulate objects. It is weightless and can enter an enemy's space and stop there. If air can pass through a space, the mist can do so, but it can't pass through liquid. It has Resistance to all damage, except the damage it takes from sunlight.

Charm (Recharge 5-6). The keeper casts Charm Person, requiring no spell components and using Charisma as the spellcasting ability (spell save DC 17), and the duration is 24 hours. The Charmed target is a willing recipient of the keeper's Bite, the damage of which doesn't end the spell. When the spell ends, the target is unaware it was Charmed by the keeper.

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
- Actions/Grave Strike — print's own row, renamed
- Actions/Bite — print's own row
- Bonus Actions/Shape-Shift — print's own row
- Bonus Actions/Charm — print's own row
- Traits/Legendary Resistance — print's own row
- Traits/Misty Escape — print's own row
- Traits/Spider Climb — print's own row
- Traits/Vampire Weakness — print's own row

**Engine trace**

```
[path] twist — Vampire (is) — "vampire" (call)
[route] lurker type=Undead mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | skirmisher-shifter: a shifter is named by its words (shape-shifts, turns into, a were-) — none here | lurker: ✓ ("a vampire who runs a bathhouse") | lurker: no line key in the words — the model's read of its quote | bane refused: the words carry no weakness clause, so "running water" answers a question nobody asked
[concept] resolve: archetype=lurker type=Undead themes=grave/beguiling mind=sapient style=— energy=Necrotic mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: luring bathers into scalding steam [behavior] | hiding in and striking from the billowing vapor [behavior] | the boiling-blood bath [aura]
[concept] identity: The Bathhouse Keeper lures bathers into the scalding steam of its tiled sanctum, then opens with one perfect strike from the fog — a bite through the neck of whoever wandered away from the group. Each round after, it vanishes into the billowing vapor it commands, sliding through steam to re-emerge behind the next unwary bather, Toying with guests it finds amusing and dragging the rest under the water to bleed. It fights to the death in its own house, retreating only to its coffin-hearth when genuinely bloodied, and never so far that it abandons the bath.
[concept] lore: A noble who was scalded to death in the bathing halls of a conquered estate, this vampire rose again bound to the water and steam, and now keeps the bathhouse open for the living it needs to drink.
[reskin] print canon defenses: HP 179 -> 195, AC 17 -> 16 — the Vampire's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 18, DEX 18, CON 18, INT 17, WIS 15, CHA 18 — the Vampire's at its own CR; attack +10 -> +9, DC 17 (print's)
[reskin] donor: lurker-8 -> CR 13
[reskin] row gated out: Teleport (teleport) — the concept did not claim this mechanic
[reskin] [path] decides: twist on the Vampire (the matcher would have said homebrew)
[reskin] print canon: "a vampire who runs a bathhouse" heads on the Vampire — print's rows ride along; the seat stays
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline declared: "the keeper" — the call's own answer (kind), built from the name
[reskin] inline form: "the keeper" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a vampire" -> has (descriptive), head | "runs a bathhouse" -> has (descriptive)
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The keeper drags a wounded or grappled bather into the bath itself, plunging them beneath the scalding water. Anyone held under is scoured by the boiling heat and the dead keeper's blood-taint in it, and the wound it has already opened there will not close." [rider/on_hit/damage] — menu: contagion, stunning-strike, charge-push, hook-rider, pounce, isolation (+ shelf: gaze-single, execute, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, terror-pulse, snare-bolt, slow-bolt, sensory-strike, drain, delayed-brand, zone-seed, blighted-ground, patient-defense, self-invisibility, focus, feint-slip, coating, riposte)
[reskin] signature bound to the concept's verb: action — drain (vampire)
[reskin] fit declined: "Scalding Draught" — a print body takes only what the user's words ask; the call offered no quote, and the key table finds no verb either (the blacksmith's rally, critic-ten 2026-10-01)
[reskin] fallback stands down: the twist path has no shelf — the Vampire's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "The bathhouse steam itself is hungry. Anyone the keeper has bitten leaks their life into the air around them as reddish vapor, which clings to the keeper and mends it, so every wound it opens among the bathers feeds it a little back." [trait/always/resource] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, evasion, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] word match declined by the call: absorption, bloodied-fury, bloodied-burst — the key word does not mean the mechanic here
[reskin] trait declined: "Feeding Wounds" — a print body takes only what the user's words ask; the call offered no quote, and the key table finds no verb either
[reskin] weapons answered: Fangs = none
[reskin] speed by concept: added Climb 30 ft. — the concept's movement set decides
[reskin] print canon alignment: Neutral Evil -> Lawful Evil — the Vampire's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common" -> "Common plus two other languages" — the Vampire's
[reskin] print canon speed: 30 ft. -> 40 ft. — the Vampire's walk; the concept's other modes stay
[reskin] print canon speed: Climb -> 40 ft. — the Vampire's own
[reskin] print canon attack: "Fangs" -> "Grave Strike" — the Vampire's own row
[reskin] print canon multiattack: "The keeper makes two Grave Strike attacks and uses Bite." — the Vampire's own
[reskin] immunities stamped for type: Undead -> Poison; Exhaustion, Poisoned
[reskin] print canon defenses: resistances none -> Necrotic — the Vampire's own header lines
[reskin] print canon trait: Legendary Resistance — "a vampire who runs a bathhouse" is the Vampire (print's own row)
[reskin] print canon trait: Misty Escape — "a vampire who runs a bathhouse" is the Vampire (print's own row)
[reskin] print canon trait: Spider Climb — "a vampire who runs a bathhouse" is the Vampire (print's own row)
[reskin] print canon trait: Vampire Weakness — "a vampire who runs a bathhouse" is the Vampire (print's own row)
[reskin] print canon row: Actions/Bite (Bat or Vampire Form Only) — the Vampire's own
[reskin] print canon row: Bonus Actions/Shape-Shift — the Vampire's own
[reskin] print canon: chassis row leaves — Bonus Actions/"Umbral Step" yields to the Vampire's Shape-Shift
[reskin] print canon row: Bonus Actions/Charm (Recharge 5-6) — the Vampire's own
[reskin] vulnerability rejected — "Cold" has no warrant in the concept's own text (print's default is none)
[reskin] multiattack replacement clause withheld: the Multiattack already uses it — "The keeper makes two Grave Strike attacks and uses Bite." (the Vampire's print line names Bite; a second clause named it again, twist-ten 2026-10-19)
audit finding below confidence gate: Misty Escape Shape-Shift is a Bonus Action whose form is chosen among bat, mist, or return-to-vampire; the trait forces a specific choice but does not state whether the chosen form is mist exclusively or whether the keeper may instead choose bat, leaving resolution ambiguous.
audit finding below confidence gate: Charm Charm Person in its standard form targets a Humanoid only and has a 1-hour duration; the entry asserts the keeper can use it despite being an Undead and extends duration to 24 hours, but never states how it targets or what happens when the Charmed condition ends early, making the spell's targeting clause unresolvable as written.
[reskin] escape dc: Grave Strike → DC 17 (8 + PB + STR; a late row wore another number)
```


---


### Tolling Chapel Wraith — in the run

**Concept:** a chapel bell-ringer's ghost that tolls for the dying

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Tolling Chapel Wraith | 3 | lurker-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- **dropped clause:** "tolls for the dying"
- read: def 1 / off 5 → 3; sustained 38 (2 × Withering Touch); nova Wail 6; dmg 38

```
Tolling Chapel Wraith

Medium Undead, Neutral

AC 11
Initiative +1 (11)

HP 45 (10d8)

Speed 5 ft., Fly 40 ft. (hover)

MOD
SAVE
STR
7
-2
-2
INT
10
+0
+0
MOD
SAVE
DEX
13
+1
+3
WIS
12
+1
+1
MOD
SAVE
CON
10
+0
+0
CHA
17
+3
+3

Skills Perception +3, Stealth +5

Resistances Acid, Bludgeoning, Cold, Fire, Lightning, Piercing, Slashing, Thunder

Immunities Necrotic, Poison; Charmed, Exhaustion, Frightened, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained

Senses darkvision 60 ft.; Passive Perception 13

Languages Common plus one other language

CR 3 (XP 700; PB +2)

Traits

Ethereal Sight. The chapel wraith can see 60 feet into the Ethereal Plane when it is on the Material Plane.

Incorporeal Movement. The chapel wraith can move through other creatures and objects as if they were Difficult Terrain. It takes 5 (1d10) Force damage if it ends its turn inside an object.

Actions

Multiattack. The chapel wraith makes two Withering Touch attacks. It can replace one attack with a use of Horrific Visage.

Withering Touch. Melee Attack Roll: +5, reach 5 ft. 19 (3d10 + 3) Necrotic damage.

Wail (1/Day). Constitution Saving Throw: DC 13, each creature within 30 feet of the chapel wraith that can hear it. Failure: 6 (1d12) Necrotic damage, and if the target has 6 Hit Points or fewer after taking this damage, it drops to 0 Hit Points. Success: Half damage only.

Horrific Visage. Wisdom Saving Throw: DC 13, each creature in a 60-foot Cone that can see the chapel wraith and isn't an Undead. Failure: 10 (2d6 + 3) Psychic damage, and the target has the Frightened condition until the start of the chapel wraith's next turn. Success: The target is immune to this ghost's Horrific Visage for 24 hours.

Possession (Recharge 6). Charisma Saving Throw: DC 13, one Humanoid the chapel wraith can see within 5 feet. Failure: The target is possessed by the chapel wraith; the chapel wraith disappears, and the target has the Incapacitated condition and loses control of its body. The chapel wraith now controls the body, but the target retains awareness. The chapel wraith can't be targeted by any attack, spell, or other effect, except ones that specifically target Undead. The chapel wraith's game statistics are the same, except it uses the possessed target's Speed, as well as the target's Strength, Dexterity, and Constitution modifiers.
The possession lasts until the body drops to 0 Hit Points or the chapel wraith leaves as a Bonus Action. When the possession ends, the chapel wraith appears in an unoccupied space within 5 feet of the target, and the target is immune to this ghost's Possession for 24 hours. Success: The target is immune to this ghost's Possession for 24 hours.

Etherealness. The chapel wraith casts the Etherealness spell, requiring no spell components and using Charisma as the spellcasting ability. The chapel wraith is visible on the Material Plane while on the Border Ethereal and vice versa, but it can't affect or be affected by anything on the other plane.

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
- Actions/Withering Touch — print's own row, renamed
- Actions/Wail — template wail; library draw (seed unstamped)
- Actions/Horrific Visage — print's own row
- Actions/Possession — print's own row
- Actions/Etherealness — print's own row
- Traits/Ethereal Sight — print's own row
- Traits/Incorporeal Movement — print's own row

**Engine trace**

```
[path] twist — Ghost (is) — class bard — "ghost" (call)
[route] lurker-phantom type=Undead mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | lurker-phantom: ✓ ("bell-ringer's ghost") | lurker-phantom: key "ghost" (class body)
[concept] hints: phantom→style ✓ ("a chapel bell-ringer's ghost")
[concept] resolve: archetype=lurker type=Undead themes=grave/voice mind=sapient style=phantom energy=Necrotic mix=energy identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: the death-knell tolled for the dying [behavior] | a spectral bell and rope it rings [object] | grave-cold shadow it drifts as [body]
[concept] identity: A chapel bell-ringer's ghost hangs silent above the nave until it hears the death-rattle of the dying, then strikes its spectral bell-rope to toll a knell that hooks the victim's fading life and drags it loose. Each round it circles the wounded, tolling again to peel away more life, drifting through pews and walls to stay by whoever is nearest to death. It does not flee and cannot be reasoned with — it has a death to announce, and it will finish the toll before anything else.
[concept] lore: The bell-ringer who never left the tower after his final, unfinished death-knell walks the chapel still, tolling for each soul before it goes and growing restless when a death is delayed.
[reskin] print canon route: the Ghost's body outranks the phantom seat — no verb in the words names it; the plain lurker line
[reskin] print canon defenses: HP 39 -> 45, AC 14 -> 11 — the Ghost's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 7, DEX 13, CON 10, INT 10, WIS 12, CHA 17 — the Ghost's at its own CR; attack +5 -> +5, DC 13 (print's)
[reskin] donor: lurker-2 -> CR 3
[reskin] row gated out: Teleport (teleport) — the concept did not claim this mechanic
[reskin] [path] decides: twist on the Ghost · class bard (the matcher would have said homebrew)
[reskin] print canon: "a chapel bell-ringer's ghost that tolls for the dying" heads on the Ghost — print's rows ride along; the seat stays
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline declared: "the chapel wraith" — the call's own answer (kind), built from the name
[reskin] inline form: "the chapel wraith" — the model's own reading of the name
[reskin] save dc derived: DC 12 -> 13 (8 + PB 2 + the sheet's best 3) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a chapel bell-ringer's ghost" -> has (descriptive), head | "tolls for the dying" -> has (mechanical)
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The wraith seizes its spectral bell-rope and tolls a slow, dragging knell that only the seriously wounded hear as a pull on their own fading life. Every foe already badly hurt feels the toll hook into them and drag them toward death's door, lurching them closer to the edge of dying; a foe at full health hears nothing but echoes. It grows steadier and more eager the more of the fight has already be" [action/save/damage] — menu: leap, gaze-single, execute, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, terror-pulse, snare-bolt, slow-bolt, sensory-strike, drain, zone-seed, blighted-ground (+ shelf: delayed-brand, patient-defense, self-invisibility, focus, feint-slip, coating, riposte, charge-push, hook-rider, pounce, isolation)
[reskin] signature bound to the concept's verb: action — active-toll, sensory-strike (toll, bell)
[reskin] word match declined by the call: active-toll, sensory-strike, hook-rider, obstacle-pull, execute, drain — the key word does not mean the mechanic here
[reskin] pick kept on the GM's own words: action — "wail" has no key-table verb, but the call quotes "tolls for the dying" from the description
[reskin] signature template: wail -> Actions/"Wail (1/Day)" ("The toll hooks only the badly hurt and drags them toward death's door; a foe at  [shape fit, no verb match]")
[reskin] signature idea (trait): "A phantom bell hangs above the wraith and a rope of pale light trails from it, swinging and sounding in answer to suffering nearby: whenever a creature close to it nears death, the bell tolls on its own, and the whole chapel answers — shadows deepen and the sound follows the dying wherever they crawl. The toll cannot be silenced; it simply finds the nearest fading soul." [trait/always/condition] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, evasion, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature bound to the concept's verb: trait — bloodied-burst (toll, bell, dying, the dying)
[reskin] word match declined by the call: bloodied-burst, death-burst — the key word does not mean the mechanic here
[reskin] pick kept on the GM's own words: trait — "noxious-aura" has no key-table verb, but the call quotes "a chapel bell ringer's ghost that tolls for the dying" from the description
[reskin] trait declined: "Tolling Dirge" — a print body takes only what the user's words ask; the call quotes "a chapel bell ringer's ghost that tolls for the dying", which is no unanswered twist clause — a head, a header, a lack, or a clause the GM's own weapon already answers
[reskin] repair: 1 clause(s) with no row — "tolls for the dying"; one targeted call with the sheet as context
[reskin] repair: the answer held no rows — the clauses stay unplaced
[reskin] weapons answered: Bell-Hook = none
[reskin] languages by mind: "None" -> "Common plus the languages it knew in life" (sapient)
[reskin] print canon languages: "Common plus the languages it knew in life" -> "Common plus one other language" — the Ghost's
[reskin] print canon speed: 30 ft. -> 5 ft. — the Ghost's walk; the concept's other modes stay
[reskin] print canon speed: Fly -> 40 ft. — the Ghost's own
[reskin] print canon attack: "Bell-Hook" -> "Withering Touch" — the Ghost's own row
[reskin] immunities stamped for type: Undead -> Poison; Exhaustion, Poisoned
[reskin] print canon defenses: immunities Poison; Exhaustion, Poisoned -> Necrotic, Poison; Charmed, Exhaustion, Frightened, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained; resistances none -> Acid, Bludgeoning, Cold, Fire, Lightning, Piercing, Slashing, Thunder — the Ghost's own header lines
[reskin] print canon trait: Ethereal Sight — "a chapel bell-ringer's ghost that tolls for the dying" is the Ghost (print's own row)
[reskin] print canon trait: Incorporeal Movement — "a chapel bell-ringer's ghost that tolls for the dying" is the Ghost (print's own row)
[reskin] print canon: chassis row leaves — Bonus Actions/"Umbral Step" is the seat's, not the Ghost's
[reskin] print canon row: Actions/Horrific Visage — the Ghost's own
[reskin] print canon row: Actions/Possession (Recharge 6) — the Ghost's own
[reskin] print canon row: Actions/Etherealness — the Ghost's own
[reskin] multiattack replacement clause: It can replace one attack with a use of Horrific Visage.
[reskin] threshold re-derived after the cap: Actions/Wail (1/Day) — 20 over the row's own 6 damage, so the kill branch beat the damage branch; threshold to 6
[reskin] audit rewrite blocked — "Possession (Recharge 6)" is engine-authored chassis text
[reskin] audit rewrite blocked — "Possession (Recharge 6)" is engine-authored chassis text
[reskin] audit rewrite blocked — "Etherealness" is engine-authored chassis text
```


---

## Review batch — twist-five-2026-10-19T04-59-39

The checker ran first. The gate table covers every block in the run; every block of the run follows. Each block carries its checker row above and its engine trace below. Hand-derive against the row first; then read for what predicates can't see.

### Gate table — the whole run

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Gravebound Conscript | 2 | 2024 | brute-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/3 |
| Arena Oathbones | 4 | 2024 | brute-2 | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 2/2 |
| Hillreach Ogre | 3 | 2024 | brute-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/3 |
| Warren Troll | 6 | 2024 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |
| Unlistened | 9 | 2024 | brute-9 | ok | SOFT: aim-atk | ok | ok | ok | ok | ok | ok | ok | ok | soft (1) | 2/2 | 2/2 |

**Dropped 0 of 6 user clauses** (coverage 100%); concept share 100% (14/14 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- none



---


### Gravebound Conscript — lowest CR

**Concept:** a skeleton with a greatsword

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Gravebound Conscript | 2 | brute-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1/2 / off 2 → 1.25; sustained 12 (1 × Greatsword); nova none; dmg 12

```
Gravebound Conscript

Medium Undead, Lawful Evil

AC 12
Initiative +3 (13)

HP 52 (8d8 + 16)

Speed 30 ft.

MOD
SAVE
STR
16
+3
+5
INT
6
-2
-2
MOD
SAVE
DEX
16
+3
+3
WIS
8
-1
-1
MOD
SAVE
CON
15
+2
+2
CHA
5
-3
-3

Skills Athletics +5, Perception +1

Vulnerabilities Bludgeoning

Immunities Poison; Exhaustion, Poisoned

Senses darkvision 60 ft.; Passive Perception 11

Languages Understands Common plus one other language but can't speak

CR 2 (XP 450; PB +2)

Traits

Great Weapon Master. When the conscript hits a creature with its Greatsword, the attack deals an extra 2 damage.

Actions

Greatsword. Melee Attack Roll: +5, reach 5 ft. 12 (2d8 + 3) Slashing damage.

Shortbow. Ranged Attack Roll: +5, range 80/320 ft. 6 (1d6 + 3) Piercing damage.

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

- Actions/Greatsword — authored for this sheet; a named part; the GM's clause "a skeleton with a greatsword"; weapon greatsword
- Actions/Shortbow — print's own row; weapon shortbow
- Traits/Great Weapon Master — a declared feature; the GM's clause "a skeleton with a greatsword"

**Engine trace**

```
[path] twist — Skeleton (is) — "a skeleton" (call)
[route] brute type=Undead mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | brute: ✓ ("a skeleton with a greatsword") | brute: no line key in the words — the model's read of its quote
[concept] resolve: archetype=brute type=Undead themes=grave/armed mind=mindless style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: the oversized greatsword [object] | relentless forward assault [behavior] | unfeeling skeletal body [body]
[concept] identity: The greatsword skeleton lurches forward in a silent rustling charge, the oversized blade dragged low across the ground before it heaves up in a single committed swing meant to end things in one blow. After that it simply walks forward and swings again, an unfeeling grave-born brute that ignores wounds no living body could shrug off, never once pausing to reassess. It has no fear, no cunning, and no retreat — it fights until the bones are scattered, and even then the sword may still be swinging.
[concept] lore: Raised from a battlefield's mass grave by a necromancer who needed a soldier that would never tire or question, it remembers nothing but the weight of the blade and the order to advance.
[reskin] print canon array: STR 16, DEX 16, CON 15, INT 6, WIS 8, CHA 5 — the Skeleton's, STR fitted to +5
[reskin] donor: brute-2 -> CR 2
[reskin] [path] decides: twist on the Skeleton (the matcher agrees)
[reskin] print canon: "a skeleton with a greatsword" heads on the Skeleton — print's rows ride along; the seat stays
[reskin] claim gate: CR 2 but a Undead body — the trait seat stays open (print: a material body carries a trait at every tier)
[reskin] named parts: Greatsword (slot) — the user's words, the engine's numbers
[reskin] named parts landed: 1 attack row(s), 0 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline declared: "the conscript" — the call's own answer (kind), built from the name; the rules would have said "Conscript"
[reskin] inline on kit rows: "Conscript" -> "the conscript"
[reskin] inline form: "the conscript" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a skeleton with a greatsword" -> has (mechanical) [asked: attack]
[reskin] signature idea (action): "The conscript drags its greatsword low and then heaves it up in one committed swing. If that blow wounds a foe, the conscript immediately lurches forward up to its full speed toward another enemy without turning away or hesitating. This extra movement can happen only once each round." [rider/on_hit/movement] — menu: contagion, charge-push, hook-rider, pounce, charge (+ shelf: trample, shield-bash, active-toll, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, rampage, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating)
[reskin] word match declined by the call: hook-rider, contagion, charge-push, pounce, charge — the key word does not mean the mechanic here
[reskin] fit declined: "Gravebound Surge (1/Day)" — a print body takes only what the user's words ask; the call offered no quote, and the key table finds no verb either (the blacksmith's rally, critic-ten 2026-10-01)
[reskin] fallback stands down: the twist path has no shelf — the Skeleton's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "The conscript ignores wounds that would stagger a living soldier, never stopping to flinch or assess. When it is struck, the bone-grip on its blade never loosens, and it keeps pressing forward." [trait/on_being_hit/movement] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] word match declined by the call: adhesive, bloodied-burst, bloodied-fury — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "The conscript ignores wounds that would stagger a living soldier, never stopping to flinch or assess. When it is struck, the bone-grip on its blade never loosens, and it keeps pressing forward." [trait/on_being_hit/movement] — the model found no template that holds it (offered: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge, adhesive, bloodied-fury)
[reskin] weapons answered: Greatsword = Greatsword
[reskin] print canon alignment: Lawful Neutral -> Lawful Evil — the Skeleton's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "None" -> "Understands Common plus one other language but can't speak" — the Skeleton's
[reskin] print canon row: Actions/Shortbow — the Skeleton's own ranged row, added (the chassis carried none to rename) — far from print's CR 0.25: print's dice, the sheet's +5
[reskin] immunities stamped for type: Undead -> Poison; Exhaustion, Poisoned
[reskin] print canon defenses: vulnerabilities none -> Bludgeoning — the Skeleton's own header lines
[reskin] vulnerability rejected — "Bludgeoning" has no warrant in the concept's own text (print's default is none)
[reskin] audit rename blocked — "Great Weapon Master" is the user's own part name, a kit feature's real name, or print's own row
```


---


### Unlistened — highest CR

**Concept:** a stone giant exile who speaks only Giant and understands no Common

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Unlistened | 9 | brute-9 | ok | SOFT: aim-atk | ok | ok | ok | ok | ok | ok | ok | ok |

- bands · soft · aim-atk: attack +10 against the aim's +8
- read: def 7 / off 11 → 9; sustained 66 (2 × Stone Club); nova none; dmg 66

```
Unlistened

Huge Giant, Neutral

AC 15
Initiative +2 (12)

HP 161 (14d12 + 70)

Speed 40 ft.

MOD
SAVE
STR
23
+6
+10
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
20
+5
+9
CHA
9
-1
-1

Skills Athletics +10, Perception +5

Senses darkvision 60 ft.; Passive Perception 15

Languages Giant

CR 9 (XP 5,000; PB +4)

Actions

Multiattack. The unlistened makes two attacks, using Stone Club or Boulder in any combination.

Stone Club. Melee Attack Roll: +10, reach 15 ft. 33 (6d8 + 6) Bludgeoning damage.

Boulder. Ranged Attack Roll: +10, range 60/240 ft. 28 (5d8 + 6) Bludgeoning damage.

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
- Actions/Stone Club — print's own row, renamed; weapon club
- Actions/Boulder — print's own row, renamed

**Engine trace**

```
[path] twist — Stone Giant (is) — "stone giant" (call)
[route] brute type=Giant mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | brute: ✓ ("a stone giant exile") | brute: no line key in the words — the model's read of its quote
[concept] resolve: archetype=brute type=Giant themes=elemental/armed mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: hurls stone and broken rock [behavior] | stone hide and knotted stone muscle [body] | a giant's hauling maul [object]
[concept] identity: A boulder of scarred stone muscle, the exile opens by hurling a chunk of its own broken hide or a torn-up slab of earth at range, then closes to trade swings with fists and a hauling maul until something breaks — usually whatever it hit. It never negotiates and never explains itself, bellowing orders and curses in Giant that no one present understands. Under pressure it does not flee; it plants its feet, digs in, and fights to the death, mistaking any parley for a challenge and any retreat for surrender.
[concept] lore: Cast out of its stone-giant hold for a crime it can no longer name aloud in any tongue but Giant, the exile wanders the lowlands hauling its old maul and waiting for someone who speaks its language — it has yet to meet one.
[reskin] print canon array: STR 23, DEX 15, CON 20, INT 10, WIS 12, CHA 9 — the Stone Giant's; STR 23 outranks the card's +8, so the sheet rolls +10 (raise-only)
[reskin] donor: brute-9 -> CR 9
[reskin] [path] decides: twist on the Stone Giant (the matcher would have said homebrew)
[reskin] print canon: "a stone giant exile who speaks only Giant and understands no Common" heads on the Stone Giant — print's rows ride along; the seat stays
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline by rule: "the unlistened" — the call answered "the unlistened" (person), which the name does not support
[reskin] inline form: "the unlistened" — the model's own reading of the name
[reskin] save dc derived: DC 15 -> 18 (8 + PB 4 + the sheet's best 6) — no stat on the sheet reached it
[reskin] lacks asked: "understands no Common"
[reskin] lacks refused: "speaks only Giant" names no absence — nothing in it takes anything away
[reskin] clauses: "a stone giant exile" -> has (descriptive), head | "speaks only Giant" -> has (header) | "understands no Common" -> LACKS (mechanical)
[reskin] signature idea (action): "The exile tears a slab of stone from the ground or its own scarred hide and hurls it with an order shouted in Giant — and every ally within earshot snaps toward the target, moving and striking as one. Anyone the slab lands near is left staggered and off balance, easy prey for the follow-up blows the exile and its fellows deliver." [rider/on_hit/movement] — menu: affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, charge (+ shelf: trample, leap, thrown-burst, throw-retrieve, shield-bash, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, rampage, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating)
[reskin] fit declined: "Staggering Slab (Recharge 5-6)" — a print body takes only what the user's words ask; the call offered no quote, and the key table finds no verb either (the blacksmith's rally, critic-ten 2026-10-01)
[reskin] fallback stands down: the twist path has no shelf — the Stone Giant's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "Whenever something wounds the exile, it answers by bellowing a challenge or curse in Giant and grinding its feet into the earth, digging in so that no shove or pull can move it from that spot. The wound only hardens the knot of its stone muscle." [trait/on_being_hit/defense] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] signature bound to the concept's verb: trait — false-appearance (stone)
[reskin] word match declined by the call: false-appearance, heated-body, resonant-body, absorption, bloodied-fury, bloodied-burst, weapon-lodge — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit" after being shown false-appearance, which the GM's words keyed
[reskin] key match declined: trait — "false-appearance" was ranked first on the call's own menu for stone, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: trait — "Whenever something wounds the exile, it answers by bellowing a challenge or curse in Giant and grinding its feet into the earth, digging in so that no shove or pull can move it from that spot. The wound only hardens the knot of its stone muscle." [trait/on_being_hit/defense] — the model found no template that holds it (offered: false-appearance, heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge, bloodied-fury)
[reskin] weapons answered: Maul = maul; Hide Shard = none; Crushing Bellow = none
[reskin] print canon alignment: Chaotic Neutral -> Neutral — the Stone Giant's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon attack: "Maul" -> "Stone Club" — the Stone Giant's own row
[reskin] print canon attack: "Hide Shard" -> "Boulder" — the Stone Giant's own ranged row
```


---


### Arena Oathbones — a 2024 sheet

**Concept:** a skeleton who was a gladiator in a former life

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Arena Oathbones | 4 | brute-2 | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 2.5 (print at 4 reads 1–6, n=66)
- read: def 1 / off 4 → 2.5; sustained 28 (1 × Shortsword); nova none; dmg 28

```
Arena Oathbones

Medium Undead, Lawful Evil

AC 13
Initiative +3 (13)

HP 84 (13d8 + 26)

Speed 30 ft.

MOD
SAVE
STR
18
+4
+6
INT
6
-2
-2
MOD
SAVE
DEX
16
+3
+3
WIS
8
-1
-1
MOD
SAVE
CON
15
+2
+2
CHA
5
-3
-3

Skills Athletics +6, Perception +1

Vulnerabilities Bludgeoning

Immunities Poison; Exhaustion, Poisoned

Senses darkvision 60 ft.; Passive Perception 11

Languages Understands Common plus one other language but can't speak

CR 4 (XP 1,100; PB +2)

Actions

Shortsword. Melee Attack Roll: +6, reach 5 ft. 28 (7d6 + 4) Piercing damage.

Shortbow. Ranged Attack Roll: +6, range 80/320 ft. 6 (1d6 + 3) Piercing damage.

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

- Actions/Shortsword — print's own row, renamed; weapon shortsword
- Actions/Shortbow — print's own row; weapon shortbow

**Engine trace**

```
[path] twist — Skeleton (is) — "a skeleton" (call)
[route] brute type=Undead mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | brute: ✓ ("a skeleton who was a gladiator in a form") | brute: no line key in the words — the model's read of its quote
[concept] resolve: archetype=brute type=Undead themes=grave/armed mind=sapient style=— energy=Necrotic mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: dueling showmanship and taunts [behavior] | detachable thrown bones and shield [body] | arena war-blade and shield [object]
[concept] identity: The bone-gladiator strides into the arena and opens by hurling its own detachable skull or a spiked shield like a discus, then closes behind a heavy war-blade to trade blow for blow as a crowd-pleasing bruiser. Round after round it presses forward with unhurried, arrogant footwork, parrying with its shield arm and hammering with the blade, and it never flees — a bloodied gladiator salutes the empty stands and fights to the final splinter, mistaking any retreat for a forfeited match. It toys with hesitant opponents, bowing, taunting, and circling before committing to its heaviest swing.
[concept] lore: A champion of a long-collapsed arena, raised from its own grave-sand by an oath to keep performing, it seeks a worthy opponent to grant it the death it was denied.
[reskin] print canon array: STR 18, DEX 16, CON 15, INT 6, WIS 8, CHA 5 — the Skeleton's, STR fitted to +6
[reskin] donor: brute-2 -> CR 4
[reskin] [path] decides: twist on the Skeleton (the matcher agrees)
[reskin] print canon: "a skeleton who was a gladiator in a former life" heads on the Skeleton — print's rows ride along; the seat stays
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline declared: "the oathbones" — the call's own answer (kind), built from the name
[reskin] inline form: "the oathbones" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a skeleton" -> has (descriptive), head | "was a gladiator in a former life" -> has (descriptive)
[reskin] signature idea (action): "With a showman's flourish the gladiator hurls its own skull at a foe, and the bone lodges in the wound like a hook, trailing its body on a tether of grave-sand. Until the skull is pulled free or the target tears away, the gladiator can stride straight to that enemy no matter how it runs, closing the distance each time the foe tries to slip the snare, its taunts following the skull's rattle." [rider/on_hit/movement] — menu: affliction, contagion, charge-push, hook-rider, pounce, charge (+ shelf: trample, leap, shield-bash, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, rampage, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating)
[reskin] signature bound to the concept's verb: action — drain (life)
[reskin] word match declined by the call: hook-rider, affliction, aggro-curse, thrown-burst-seed — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit" after being shown drain, which the GM's words keyed
[reskin] key match declined: action — "drain" was ranked first on the call's own menu for life, and the call read it as no fit; the words keep their claim and nothing is forced
[reskin] signature miss: action — "With a showman's flourish the gladiator hurls its own skull at a foe, and the bone lodges in the wound like a hook, trailing its body on a tether of grave-sand. Until the skull is pulled free or the target tears away, the gladiator can stride straight to that enemy no matter how it runs, closing the distance each time the foe tries to slip the snare, its taunts following the skull's rattle." [rider/on_hit/movement] — the model found no template that holds it (offered: drain, affliction, contagion, charge-push, hook-rider, pounce, charge, aggro-curse, thrown-burst-seed, rampage)
[reskin] fallback respects the call: drain, aggro-curse left the shelf — the call declined them for this sheet
[reskin] fallback stands down: the twist path has no shelf — the Skeleton's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "Death is a forfeit it refuses to accept: an opponent who turns and walks from the duel is, to the gladiator, conceding the match. Each time a wounded foe tries to break away, the champ's shield-arm lashes out to hook them back into the ring, and on the final splinter of its own unlife it lets out one last roaring salute and swings harder than ever." [trait/always/damage] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending, weapon-lodge)
[reskin] word match declined by the call: death-burst, heated-body, bloodied-burst — the key word does not mean the mechanic here
[reskin] trait declined: "Last Stand Fury" — a print body takes only what the user's words ask; the call offered no quote, and the key table finds no verb either
[reskin] weapons answered: Warblade = greatsword
[reskin] weapon declared: "Warblade" is a greatsword — the call's own answer (the name alone read longsword)
[reskin] languages by mind: "None" -> "Common plus the languages it knew in life" (sapient)
[reskin] print canon alignment: Neutral -> Lawful Evil — the Skeleton's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common plus the languages it knew in life" -> "Understands Common plus one other language but can't speak" — the Skeleton's
[reskin] print canon row: Actions/Shortbow — the Skeleton's own ranged row, added (the chassis carried none to rename) — far from print's CR 0.25: print's dice, the sheet's +6
[reskin] rider folded: "Warblade" keeps its budget — the chassis's rider half (11) folds into the base; the Skeleton pays no damage rider of its own
[reskin] print canon attack: "Warblade" -> "Shortsword" — the Skeleton's own row
[reskin] immunities stamped for type: Undead -> Poison; Exhaustion, Poisoned
[reskin] print canon defenses: vulnerabilities none -> Bludgeoning — the Skeleton's own header lines
```


---


### Hillreach Ogre — a print donor

**Concept:** an ogre with a greataxe

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Hillreach Ogre | 3 | brute-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1/4 / off 4 → 2.125; sustained 22 (1 × Greataxe); nova none; dmg 22

```
Hillreach Ogre

Large Giant, Chaotic Evil

AC 11
Initiative -1 (9)

HP 68 (8d10 + 24)

Speed 40 ft.

MOD
SAVE
STR
19
+4
+6
INT
5
-3
-3
MOD
SAVE
DEX
8
-1
-1
WIS
7
-2
-2
MOD
SAVE
CON
16
+3
+3
CHA
7
-2
-2

Skills Athletics +6, Perception +0

Senses darkvision 60 ft.; Passive Perception 10

Languages Common, Giant

CR 3 (XP 700; PB +2)

Traits

Great Weapon Master. When the ogre hits a creature with its Greataxe, the attack deals an extra 2 damage.

Actions

Greataxe. Melee Attack Roll: +6, reach 5 ft. 22 (4d8 + 4) Slashing damage.

Javelin. Melee or Ranged Attack Roll: +6, reach 5 ft. or range 30/120 ft. 11 (2d6 + 4) Piercing damage.

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

- Actions/Greataxe — authored for this sheet; a named part; the GM's clause "an ogre with a greataxe"; weapon greataxe
- Actions/Javelin — print's own row; authored for this sheet; a named part; the GM's clause "an ogre with a greataxe"; weapon javelin
- Traits/Great Weapon Master — a declared feature; the GM's clause "an ogre with a greataxe"

**Engine trace**

```
[path] twist — Ogre (is) — "ogre" (call)
[route] brute type=Giant mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | brute: ✓ ("an ogre with a greataxe") | brute: no line key in the words — the model's read of its quote
[concept] resolve: archetype=brute type=Giant themes=bestial/armed mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: crushing greataxe sweeps [behavior] | massive hide-bound body [body] | a claimed greataxe [object]
[concept] identity: The ogre lumbers forward with its greataxe already swinging, opening every fight with a full-bodied overhead cleave meant to split shields and spine in one stroke. Each round after, it stays planted and trades blow for blow, using its sheer bulk to shrug off hits while it drags the axe back for another wide arc. It fights to the death, too stubborn and too proud to flee, and grows sloppier and angrier as it bleeds.
[concept] lore: A hill-country ogre that claimed a dead raider's greataxe and now prizes it above all things, using it to bully and butcher anything that wanders too close to its territory.
[reskin] print canon defenses: HP 66 -> 68, AC 12 -> 11 — the Ogre's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 19, DEX 8, CON 16, INT 5, WIS 7, CHA 7 — the Ogre's at its own CR; attack +5 -> +6, DC 14 (print's)
[reskin] donor: brute-2 -> CR 3
[reskin] [path] decides: twist on the Ogre (the matcher agrees)
[reskin] print canon: "an ogre with a greataxe" heads on the Ogre — print's rows ride along; the seat stays
[reskin] named parts: Greataxe (slot) — the user's words, the engine's numbers
[reskin] named parts landed: 1 attack row(s), 0 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline declared: "the ogre" — the call's own answer (kind), built from the name
[reskin] inline form: "the ogre" — the model's own reading of the name
[reskin] save dc derived: DC 12 -> 14 (8 + PB 2 + the sheet's best 4) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "an ogre with a greataxe" -> has (descriptive), head
[reskin] signature idea (action): "The ogre plants its feet and hauls the greataxe around in a full, wide sweep aimed at everything in front of it. Everyone caught in that broad arc gets battered and shoved backward off their footing, so the ogre can't be crowded or flanked. It can't do this again right away — the axe's weight leaves it open for a moment before it winds up for the next swing." [action/save/damage] — menu: trample, leap, shield-bash, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up (+ shelf: rampage, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, affliction, contagion, charge-push, hook-rider, pounce, charge)
[reskin] word match declined by the call: wind-up — the key word does not mean the mechanic here
[reskin] fit declined: "Wide Sweep" — a print body takes only what the user's words ask; the call offered no quote, and the key table finds no verb either (the blacksmith's rally, critic-ten 2026-10-01)
[reskin] fallback stands down: the twist path has no shelf — the Ogre's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "Every wound just makes the ogre wilder: the more blood it has spilled and taken, the harder and more recklessly it swings. Foes can see it coming — its breathing turns to snorting and its arcs get wider and angrier the longer the fight drags on." [trait/always/damage] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending, weapon-lodge)
[reskin] word match declined by the call: bloodied-fury, uncanny-sense — the key word does not mean the mechanic here
[reskin] trait declined: "Bloodmad Rage" — a shape fit with no verb match on a Giant body; a meat body earns its trait by a verb
[reskin] weapons answered: Greataxe = greataxe
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] print canon alignment: Chaotic Neutral -> Chaotic Evil — the Ogre's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common" -> "Common, Giant" — the Ogre's
[reskin] print canon speed: 30 ft. -> 40 ft. — the Ogre's walk; the concept's other modes stay
[reskin] print canon row frame: "Javelin" keeps print's thrown frame — reach 5 ft. or range 30/120 ft.
[reskin] print canon row: Actions/Javelin — the Ogre's second melee row, beside the chassis's
```


---


### Warren Troll — in the run

**Concept:** a cave troll that speaks only Giant

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Warren Troll | 6 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 4 / off 5 → 4.5; sustained 33 (3 × Rend); nova none; dmg 33

```
Warren Troll

Large Giant, Chaotic Evil

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

CR 6 (XP 2,300; PB +3)

Traits

Regeneration. The troll regains 15 Hit Points at the start of each of its turns. If the troll takes Acid or Fire damage, this trait doesn't function on the troll's next turn. The troll dies only if it starts its turn with 0 Hit Points and doesn't regenerate.

Loathsome Limbs. If the troll ends any turn Bloodied and took 15+ Slashing damage during that turn, one of the troll's limbs is severed, falls into the troll's space, and becomes a Troll Limb. The limb acts immediately after the troll's turn. The troll has 1 Exhaustion level for each missing limb, and it grows replacement limbs the next time it regains Hit Points.

Actions

Multiattack. The troll makes three Rend attacks.

Rend. Melee Attack Roll: +7, reach 10 ft. 11 (2d6 + 4) Slashing damage.

Bonus Actions

Charge. The troll moves up to half its Speed straight toward an enemy it can see.

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
- Actions/Rend — print's own row, renamed
- Traits/Regeneration — print's own row
- Traits/Loathsome Limbs — print's own row
- Bonus Actions/Charge — print's own row

**Engine trace**

```
[path] twist — Troll (is) — "a cave troll" (call)
[route] brute-regenerator type=Giant mechanics=regeneration — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | brute-regenerator: ✓ ("troll") | brute-regenerator: no line key in the words — the model's read of its quote
[concept] hints: troll→canon ✓ ("a cave troll that speaks only Giant")
[concept] resolve: archetype=brute type=Giant themes=bestial/subterranean mind=sapient style=regenerator energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: regeneration
[concept] signature elements: flesh that knits itself closed [body] | stone-knuckled fists [body] | a bellowing Giant voice in the dark [behavior]
[concept] identity: A mottled cave troll comes out of the dark behind a battering ram of hide and knobby stone-hard fist, roaring in Giant that the whole cave can hear, and simply won't stay hurt — the split lip closes while it hammers a second blow home. Every round after it wades in, trading hits to buy time for its flesh to knit, shrugging off the worst damage and refusing to fall. Bloodied, it does not flee — a cave troll fights to the death, and it will drag the fight into a dead-end tunnel where its reach and its regrowth are a wall of flesh.
[concept] lore: Cave trolls are born in the deep warrens where stone and dark press on their flesh, and a lone one wants nothing more than to drag its kill back to its nest and sleep in the quiet.
[reskin] print canon route: the Troll's body outranks the regenerator seat — no verb in the words names it; the plain brute line
[reskin] print canon defenses: HP 116 -> 94, AC 14 -> 15 — the Troll's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 18, DEX 13, CON 20, INT 7, WIS 9, CHA 7 — the Troll's at its own CR; attack +7 -> +7, DC 16 (print's)
[reskin] regeneration organ injected — 10/turn
[reskin] donor: brute-5 -> CR 6
[reskin] [path] decides: twist on the Troll (the matcher would have said homebrew)
[reskin] print canon: "a cave troll that speaks only Giant" heads on the Troll — print's rows ride along; the seat stays
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline declared: "the troll" — the call's own answer (kind), built from the name; the rules would have said "Troll"
[reskin] inline on kit rows: "Troll" -> "the troll"
[reskin] inline form: "the troll" — the model's own reading of the name
[reskin] save dc derived: DC 14 -> 16 (8 + PB 3 + the sheet's best 5) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a cave troll" -> has (descriptive), head | "speaks only Giant" -> has (header)
[reskin] signature idea (action): "The troll looses a cave-shaking bellow in Giant that rolls down the tunnels, and every creature that hears it is shaken to its marrow — foes clutch at their ears and their aim falters while the troll's own warren-bred kin and any troll in earshot take heart from it. It can call this roar out as it wades forward, and the sound carries far through stone and dark, so a fight begun with it is a fight " [bonus_action/once_per_fight/condition] — menu: rampage, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating (+ shelf: trample, leap, thrown-burst, shield-bash, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, stunning-strike, charge-push, hook-rider, pounce, charge)
[reskin] word match declined by the call: terror-pulse, herd — the key word does not mean the mechanic here
[reskin] fit declined: "Warren Bellow (2/Day)" — a print body takes only what the user's words ask; the call offered no quote, and the key table finds no verb either (the blacksmith's rally, critic-ten 2026-10-01)
[reskin] fallback respects the call: terror-pulse, herd left the shelf — the call declined them for this sheet
[reskin] fallback stands down: the twist path has no shelf — the Troll's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "The troll's hide drinks in the blood it spills — whenever its fists batter a living creature, the wounds on its own knuckles pull shut and its flesh tightens, so the longer it keeps hitting something that bleeds, the harder it becomes to put down." [trait/always/defense] — menu: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending, weapon-lodge)
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "The troll's hide drinks in the blood it spills — whenever its fists batter a living creature, the wounds on its own knuckles pull shut and its flesh tightens, so the longer it keeps hitting something that bleeds, the harder it becomes to put down." [trait/always/defense] — the model found no template that holds it (offered: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst, bloodied-burst, warded-mending, absorption)
[reskin] weapons answered: Fist = none
[reskin] print canon modes: climb off — the Troll has no such mode and the words name none
[reskin] print canon alignment: Chaotic Neutral -> Chaotic Evil — the Troll's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon speed: 40 ft. -> 30 ft. — the Troll's walk; the concept's other modes stay
[reskin] print canon attack: "Fist" -> "Rend" — the Troll's own row
[reskin] print canon multiattack: "The troll makes three Rend attacks." — the Troll's own
[reskin] print canon trait: Loathsome Limbs — "a cave troll that speaks only Giant" is the Troll (print's own row)
[reskin] print canon trait: Regeneration — print's text replaces the chassis's (the Troll regenerates 15, not the chassis's 10 — critic's audit 2026-10-02)
[reskin] print canon row: Bonus Actions/Charge — the Troll's own
[reskin] audit rewrite blocked — "Regeneration" is engine-authored chassis text
[reskin] audit rewrite blocked — "Loathsome Limbs" is engine-authored chassis text
```

