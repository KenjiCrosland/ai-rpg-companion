# Case: one decision, five pipelines — the dispatcher and what it fixed (2026-10-19)

Four packages in one file, oldest first. The case opened on the lurker's pricing (2026-10-18) and
became the path work: the engine used to infer what it was building at six places with six word
rules, and now decides once. Each package below is the critic's read and the answer to it.

- **Package one** — the lurker's trade, print fidelity, the forty redesigned (2026-10-18).
- **Package two** — the critic's A1–A9 on that forty (2026-10-18 night).
- **Package three** — the dispatcher: the path call, print-with-a-twist, class NPC (2026-10-19).
- **Package four** — the critic's read of the dispatcher forty, answered (2026-10-19). **0 FAIL of 40.**

## Package one — the lurker is underpowered: price the trade, not the gate (2026-10-18)

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

## Fourth package — the critic's read of the dispatcher forty, answered (2026-10-19)

Response plan: `plans/critic-response-2026-10-19.md`. The critic's verdict on the third package was
"the dispatcher works, zero wrong-creature sheets at the body", with two faults: the twist pipeline
refused most twists, and three class bodies carried the wrong weapons. Both were mine; both are fixed.

### A — the twist seat tries every clause the GM typed
My step-4 receipt gate accepted only a clause the identity call had tagged *mechanical*, and most
twists are tagged descriptive, so "carries stolen voices" and "with a frost-rimed hide" were refused
and print shipped under a new name. The gate now refuses exactly three things: the head's own BODY
(the path holds it), a header directive, and the negative half of a lack. Three mechanisms behind it:
the clause record carries the lack's own quote, so a clause that holds a lack AND a positive half
keeps the positive one ("stumps smoke instead of regrowing"); the HEAD clause — which is often the
whole prompt — gives up the body and keeps its remainder; and "answered by a part row" blocks only a
receipt that names the weapon itself, so "keeps the line" survives beside a shield bash.

### B — the class fights with its own weapon
`classes.mjs` carries each class's weapon as a closed fact (owner confirmed): monk unarmed and dart,
rogue shortsword and shortbow, fighter longsword and longbow, paladin longsword, cleric mace, mage
quarterstaff, bard rapier and hand crossbow, barbarian greataxe and handaxe. The monk's bodies are
the Scout and the Spy, never the Assassin. A re-arm pass renames the body's weapon rows to the
class's unless the GM named one, keeps print's numbers, folds the body's weapon rider into the base
(print's Assassin pays 5d6 Poison for its shortsword; a monk does not), and never touches a magic
strike. A hybrid row yields too. The kit no longer loses to the row cap on a class body.

### C — three systematic items
A save row's stat follows its own effect, so a damage nova keys Dexterity or Constitution and a
condition it hands out alongside never picks the stat. Print's SKILLS land on a print body by name
and proficiency tier, each bonus derived from the sheet's stat and PB, with the Passive Perception
following. The reskin now applies the lint's own deterministic text fixes, which it had been linting
and tracing but never running — that was the forty's last FAIL.

One item I planned and reverted: withholding a chassis Absorption organ whose energy the concept
never gave. Print GIVES its golems that organ matched to their material, a pin encodes the
juggernaut's Acid deliberately, and the withholding broke nineteen pins. The variance the critic saw
across runs is donor variance — the sameness axis, measured at stage 5. On record.

### Numbers
| run | generated | checker |
|---|---|---|
| **the forty (`sweep-2026-10-19T18-35-07`)** | **40/40** | **26 clean / 14 soft / 0 FAIL** (the package the critic read: 21 / 15 / 4) |
| classes-eight | 14 | 0 FAIL |
| twist-ten | 10/10 | 0 FAIL |
| twist-five | 5/5 | 0 FAIL |

Three runs of the forty stand behind that number: 27/12/1 on the A+B+C engine, then 22/15/3 after
the incidentals landed (two of those three FAILs were an hour-old mistake of mine — the lint
pre-pass read a 2024-shaped sheet as 2014 — and the third was Spider Climb without the Climb speed
print always pairs with it), then **0 FAIL of 40** with both fixed. Twist rows land on 11 of 13
twist blocks, one to five each.

Twist rows land on **12 of 13** twist blocks, one to three each; the critic counted 4 of ~20. Paths
on the forty: 13 twist, 7 class NPC, 3 exact, 1 blank, 16 homebrew. Gate 109 suites / 3562 passed,
build green.

### Still open
Great Weapon Master and the Name-field question are closed by the owner's rulings (ship it; Wellmouth
is fine). The payoff escalation is parked. Three incidentals remain unfixed and are named in the
response plan: all three incidentals are now
done: the checker reads the weapon table for reach (a halberd is its own tether), print's name never
lands on a template's body, and an object pronoun before a weapon noun makes it a verb (no "Watching
Them Flail"). **The live stall was the dev server**: twenty days up, the engine finishing and the app
stalling after it; the owner restarted it and the next forty ran 40/40 with no stalls. One stall
returned on a later blank roll, so restart before a long batch and treat a lone stall as noise.
