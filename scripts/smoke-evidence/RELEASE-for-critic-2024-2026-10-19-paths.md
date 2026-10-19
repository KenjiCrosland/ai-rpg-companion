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

---

# 2024 blocks

## Review batch — sweep-2026-10-19T18-35-07

The checker ran first. The gate table covers every block in the run; every block of the run follows. Each block carries its checker row above and its engine trace below. Hand-derive against the row first; then read for what predicates can't see.

### Gate table — the whole run

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Dire Wolf | 1 | 2024 | skirmisher-1 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/3 |
| Silt Hound | 1 (2014) | 2014 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/3 |
| Owlbear | 3 (2014) | 2014 | lurker-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 2/2 |
| Tollwright | 3 | 2024 | lurker-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 7/8 |
| Air Elemental | 5 | 2024 | lurker-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/3 |
| Scree Slide | 5 (2014) | 2014 | brute-5-grappler | ok | SOFT: band | ok | SOFT: rider-no-save | ok | ok | ok | ok | ok | ok | soft (2) | 1/1 | 3/4 |
| Hydra | 8 (2014) | 2014 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |
| Lashram Siegewright | 8 | 2024 | brute-5-juggernaut | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 0/5 |
| Stone Golem | 10 | 2024 | brute-9 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 5/5 |
| Drowned Choir | 10 (2014) | 2014 | lurker-5-phantom | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/4 |
| Vampire | 13 (2014) | 2014 | lurker-8 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 8/8 |
| Vespid Archon | 13 | 2024 | defender-8-leader | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/4 |
| Purple Worm | 15 | 2024 | brute-13 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |
| Rimewake Colossus | 15 (2014) | 2014 | brute-9-juggernaut | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 5/6 |
| Adult Red Dragon | 17 (2014) | 2014 | dragon-15 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 7/7 |
| Brass Tyrant | 17 | 2024 | defender-17-leader | ok | SOFT: aim-dpr, hot-offense | ok | ok | ok | ok | ok | ok | ok | ok | soft (1) | 0/1 | 7/8 |
| Pit Fiend | 20 | 2024 | defender-17 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 9/9 |
| Ossuar Sunthrone | 20 (2014) | 2014 | caster-21 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 9/9 |
| Ancient Gold Dragon | 24 (2014) | 2014 | dragon-22 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 9/9 |
| Trench Choir Leviathan | 24 | 2024 | caster-17-binder | ok | ok | ok | SOFT: damage-spell-at-will | ok | ok | ok | ok | ok | ok | soft (1) | 0/1 | 7/10 |
| Owlbear | 3 | 2024 | brute-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 1/1 |
| Goblin Boss | 1 (2014) | 2014 | skirmisher-1 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/3 |
| Vashka the Red | 6 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/2 | 5/5 |
| Sump Scytheclaw | 9 | 2024 | brute-8-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/4 | 4/4 |
| Black Iron Sentinel | 11 (2014) | 2014 | defender-5 | ok | user-set: AC 20 · reads CR 9 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 3/3 | 2/2 |
| Bogwidow Sedge | 7 | 2024 | caster-8-binder | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok | ok | soft (1) | 2/2 | 6/6 |
| Iron Vow Warden | 6 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | SOFT: kit-lands | soft (1) | 2/2 | 1/1 |
| Ilvareth Dusksong | 12 (2014) | 2014 | caster-12 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 5/5 |
| Requiem Swarm | 13 | 2024 | swarm-9 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 2/2 |
| Vaultrot | 9 (2014) | 2014 | ooze-9 | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 0/4 |
| Squallwing Drake | 7 | 2024 | dragon-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 2/2 |
| Korrun Fellbrow | 9 (2014) | 2014 | skirmisher-8 | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | ok | soft (1) | 2/2 | 2/2 |
| Reedstep Contemplative | 5 (2014) | 2014 | skirmisher-3 | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 2/6 |
| Krennik Skullstandard | 4 (2014) | 2014 | skirmisher-3-mounted | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 5/6 |
| Wellbottom | 5 | 2024 | lurker-5-trap | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 0/4 |
| Ozghar | 4 | 2024 | brute-2 | ok | SOFT: band | ok | ok | ok | ok | ok | ok | SOFT: multiattack-integrity | ok | soft (2) | 12/14 | 4/4 |
| Meshrin | 8 (2014) | 2014 | skirmisher-8-hurler | ok | user-set: AC 16, HP 120 · reads CR 7.5 | SOFT: lint:hp-formula | ok | ok | ok | ok | ok | ok | ok | soft (1) | 8/8 | 8/8 |
| Unresting Boneblade | 6 | 2024 | brute-5 | ok | ok | SOFT: reach | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 3/3 |
| Bellard the Unsworn | 5 (2014) | 2014 | skirmisher-8-hurler | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 3/3 |
| Brother Halric | 3 (2014) | 2014 | skirmisher-3 | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 2/4 |

**Dropped 10 of 70 user clauses** (coverage 86%); concept share 85% (161/190 rows). A run with zero fails and 60% coverage is a failing run.
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

Skills Perception +5, Stealth +4

Resistances Cold

Senses darkvision 60 ft.; Passive Perception 15

Languages None

CR 1 (XP 200; PB +2)

Traits

Rime-Frost Hide. A creature that touches the dire wolf or hits it with a melee attack while within 5 feet of it takes 3 (1d6) Cold damage.

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

- Traits/Rime-Frost Hide — template heated-body; library draw (seed unstamped); binds the GM's words: frost+burn+rime
- Traits/Pack Tactics — print's own row
- Actions/Multiattack — the chassis
- Actions/Bite — print's own row

**Engine trace**

```
[path] twist — Dire Wolf (is) — "Name field: Dire Wolf" (code)
[route] skirmisher type=Beast mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | skirmisher: ✓ ("Dire Wolf") | skirmisher-skulker: the call read "hide" as not meaning that mechanic here — no override | skirmisher stands: every key that would override it was read as a figure of speech | skirmisher: no line key in the words — the model's read of its quote
[concept] name: "Dire Wolf" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] resolve: archetype=skirmisher type=Beast themes=bestial/elemental mind=bestial style=— energy=Cold mix=both identity=✓ lore=✓
[concept] name: provided "Dire Wolf"
[concept] mechanics: none claimed
[concept] signature elements: pack tactics of the winter hunt [behavior] | frost-rimed hide [body] | snapping dart-and-retreat lunge [behavior]
[concept] identity: The frost-rimed dire wolf opens by circling with its pack, snow hissing off its hide, then darts in with a snapping lunge at the flank before wheeling back out of reach. Every round it repeats this dart-and-retreat harrying, keeping the pack spread so prey must choose a throat to face, and it uses its frozen pelt to brush off glancing blows. Bloodied, it does not flee alone — it breaks into a loping run that draws pursuers across the ice after the rest of the pack, then wheels for a second pass.
[concept] lore: A dire wolf whelped in a blizzard's heart, its hide rimed with the storm it carries so its pack can hunt the deep winter when other prey starves.
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
[reskin] signature idea (action): "The wolf lunges low and clamps its jaws on a foe's leg, then throws its weight sideways and down, dragging the prey off balance and leaving it sprawling in the snow. It only works on a creature already wounded or staggered, so the pack's harrying sets up the takedown rather than the wolf opening with it." [rider/on_hit/condition] — menu: contagion, charge-push, hook-rider, pounce, isolation, charge (+ shelf: snare, shield-bash, lure, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, slow-bolt, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, riposte)
[reskin] signature bound to the concept's verb: action — slow-bolt (frost)
[reskin] fit declined: "Drag Down" — a print body takes only what the user's words ask; the call offered no quote, and the key table finds no verb either (the blacksmith's rally, critic-ten 2026-10-01)
[reskin] fallback stands down: the twist path has no shelf — the Dire Wolf's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "Its frost-rimed hide and the snow-hiss of its passage snuff out sound and scent; creatures that try to track it or catch it unawares across snow and ice find their senses sliding off it. The rime also makes its bite burn with deep cold that lingers in the wound." [trait/always/defense] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature bound to the concept's verb: trait — heated-body (frost)
[reskin] word match declined by the call: terrain-walk — the key word does not mean the mechanic here
[reskin] signature template (trait): heated-body -> Traits/"Rimeburn Hide" ("the frost-rimed hide makes its bite burn with deep cold that lingers in the woun [verb: frost:concept, burn:idea, rime:idea]")
[reskin] weapons answered: Bite = none
[reskin] print canon speed: 30 ft. -> 50 ft. — the Dire Wolf's walk; the concept's other modes stay
[reskin] languages held: None stands — INT 3 on a Beast speaks nothing, whatever the mind read said
[reskin] print canon skills: "Perception +3, Stealth +4" -> "Perception +5, Stealth +4" — the Dire Wolf's own skills, each derived from this sheet's stat and PB
[reskin] resistances derived: Cold
[reskin] print canon trait: Pack Tactics — "Dire Wolf — with a frost-rimed hide" is the Dire Wolf (print's own row)
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the seat's, not the Dire Wolf's
[reskin] print canon: chassis row leaves — Traits/"Snowdrift Stride" is the seat's, not the Dire Wolf's
[reskin] audit rewrite blocked — "Bite" is engine-authored chassis text
[reskin] audit rename: "Rimeburn Hide" -> "Rime-Frost Hide"
```


---


### Trench Choir Leviathan — highest CR

**Concept:** a leviathan of the trench whose song drowns fleets

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Trench Choir Leviathan | 24 | caster-17-binder | ok | ok | ok | SOFT: damage-spell-at-will | ok | ok | ok | ok | ok | ok |

- gates · soft · damage-spell-at-will: Shatter at will outside a Multiattack replacement clause
- **dropped clause:** "a leviathan of the trench whose song drowns fleets"
- read: def 23 / off 27 → 25; sustained 216 (3 × Coil + legendary Slam Down); nova Trench Song 78; dmg 216

```
Trench Choir Leviathan

Gargantuan Monstrosity, Neutral Evil

AC 20
Initiative +2 (12)

HP 472 (27d20 + 189)

Speed 40 ft., Swim 40 ft.

MOD
SAVE
STR
25
+7
+7
INT
18
+4
+11
MOD
SAVE
DEX
15
+2
+2
WIS
28
+9
+16
MOD
SAVE
CON
24
+7
+14
CHA
18
+4
+4

Skills Perception +16, Arcana +11

Senses blindsight 120 ft.; Passive Perception 26

Languages Common

CR 24 (XP 62,000; PB +7)

Traits

Amphibious. The leviathan can breathe air and water.

Legendary Resistance (3/Day). If the leviathan fails a saving throw, it can choose to succeed instead.

Actions

Multiattack. The leviathan makes three attacks, using Coil or Thunder Hymn in any combination. It can replace one attack with a use of (A) Drowning Hymn or (B) Spellcasting to cast Thunderwave.

Coil. Melee Attack Roll: +16, reach 5 ft. 22 (3d8 + 9) Bludgeoning damage plus 14 (4d6) Thunder damage.

Thunder Hymn. Ranged Attack Roll: +16, range 60 ft. 31 (5d8 + 9) Thunder damage.

Trench Song (Recharge 5-6). Wisdom Saving Throw: DC 24, each enemy in a 30-foot Emanation originating from the leviathan. Failure: 78 (12d12) Thunder damage, and the target has the Deafened condition until the end of its next turn. Success: Half damage only.

Spellcasting. The leviathan casts one of the following spells, requiring no Material components and using Wisdom as the spellcasting ability (spell save DC 24):

- At Will: Thunderwave, Shatter, Fog Cloud, Bestow Curse

Drowning Hymn. Wisdom Saving Throw: DC 24, one creature within 60 feet. Failure: The target has the Frightened condition until the end of the leviathan's next turn. If the target was already Frightened by this ability, it also takes 38 (11d6) Thunder damage.

Legendary Actions

Legendary Action Uses: 3. Immediately after another creature's turn, the leviathan can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.

Slam Down. The leviathan makes one Coil attack.

Trench Circle. The leviathan moves up to half its Speed without provoking Opportunity Attacks.

Compel Crew. Wisdom Saving Throw: DC 24, one creature within 30 feet. Failure: The target has the Frightened condition until the end of its next turn.

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
- Actions/Coil — the chassis
- Actions/Thunder Hymn — the chassis
- Actions/Trench Song — the chassis
- Actions/Spellcasting — the chassis
- Actions/Drowning Hymn — library seed escalating-dread
- Legendary Actions/Legendary Action Uses: 3 — the chassis
- Legendary Actions/Slam Down — the chassis
- Legendary Actions/Trench Circle — the chassis
- Legendary Actions/Compel Crew — the chassis

**Engine trace**

```
[path] homebrew — "a leviathan of the trench whose song drowns fleets" (call)
[route] caster-binder (controller) type=Monstrosity mechanics=aura — casts: on the GM's own words "whose song drowns fleets" | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | caster-binder: ✓ ("whose song drowns fleets") | caster-binder: no line key in the words — the model's read of its quote
[concept] name: provided_name rejected — "a leviathan of the trench whose song dro…" is the description, not a name
[concept] resolve: archetype=caster type=Monstrosity themes=aquatic/voice mind=sapient style=binder energy=Thunder mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: aura
[concept] signature elements: the trench-song that drowns fleets [behavior] | segmented plate of abyssal chitin [body] | a crushing aura of drowned sound [aura]
[concept] identity: The leviathan opens a naval battle by sounding its trench-song: a pressure-wave of brine-laced sound that compels crews to leap from their decks and sailors to steer their own ships onto rocks, cursing whole vessels rather than trading blows. Each round after it circles beneath the fleet, layering deafening refrains and hull-shattering curses that strip away the crew's actions one voice at a time, all while its chitin-plated coil keeps it out of reach. It is patient and possessive of its trench, withdrawing into the deep once truly bloodied, but it toys with crippled ships for hours, singing them apart like a cat with flotsam.
[concept] lore: Hatred of the surface world sank an ancient leviathan into the lightless trench, where it learned to sing the pressure of the abyss into any fleet foolish enough to sail above its home.
[reskin] donor: caster-17-binder -> CR 24
[reskin] [path] decides: homebrew (the matcher agrees)
[reskin] repair round 1: 1 defect(s) — name "Slam Down" promises a slam but the row makes a Coil attack — name the delegation honestly, or without anatomy
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline declared: "the leviathan" — the call's own answer (kind), built from the name
[reskin] inline form: "the leviathan" — the model's own reading of the name
[reskin] spell DC coherence: DC 23 -> 24 off Wisdom 28 (the stat makes the attack rolls)
[reskin] save dc derived: DC 23 -> 24 (8 + PB 7 + Wisdom's 9) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a leviathan of the trench whose song drowns fleets" -> has (mechanical)
[reskin] menu pruned: action — thrown-burst-seed, phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The leviathan aligns its chitin plates into a ringing bell and sounds a single sustained note that sinks into every cursed or deafened foe present, crawling into the ones already reeling from its song. Those it grips this way drag the note with them, so a struck ally standing near them hears it echo and is shaken too, letting the leviathan's first refrains spread through a crew like rot through a " [action/always/condition] — menu: seal, lure, obstacle-pull, pacify, escalating-dread, snare-bolt, slow-bolt, sensory-strike, herd, drain, curse-debt, zone-seed, reveal (+ shelf: delayed-brand, lay-on-hands, aggro-curse, self-invisibility, rally, snap-shot, bolt-restrain, bolt-drag, bolt-mark)
[reskin] signature bound to the concept's verb: action — lure (song)
[reskin] word match declined by the call: lure — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit" after being shown lure, which the GM's words keyed
[reskin] key match declined: action — "lure" was ranked first on the call's own menu for song, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: action — "The leviathan aligns its chitin plates into a ringing bell and sounds a single sustained note that sinks into every cursed or deafened foe present, crawling into the ones already reeling from its song. Those it grips this way drag the note with them, so a struck ally standing near them hears it echo and is shaken too, letting the leviathan's first refrains spread through a crew like rot through a " [action/always/condition] — the model found no template that holds it (offered: lure, seal, obstacle-pull, pacify, escalating-dread, snare-bolt, slow-bolt, sensory-strike, herd, drain, curse-debt, zone-seed, reveal, bolt-drag, delayed-brand)
[reskin] fallback respects the call: lure left the shelf — the call declined it for this sheet
[reskin] value check: "Creeping Dread" EV 26.1 vs floor 19.8 (one attack of 3) — dice 19 → 38
[reskin] library seed drawn: escalating-dread -> Actions/"Creeping Dread" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Its segmented plate of abyssal chitin rings like a struck gong whenever something lands a telling blow, and the ringing clings to the attacker's ears until the leviathan's next note finds them. Each fresh hit adds its voice to the chord, so the more a crew wounds it, the louder their own doom becomes." [trait/on_being_hit/condition] — menu: heated-body, absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form)
[reskin] trait declined: "Ringing Carapace" — bound only on the idea's own words (ring:idea, gong:idea) with no key in the concept; a meat body earns its trait by the user's verb (the sniper's tracker, critic 2026-09-29)
[reskin] weapons answered: Coil = none; Thunder Hymn = none; Trench Song = none; Drowning Refrain = none; Slam Down = none; Trench Circle = none; Compel Crew = none
[reskin] chassis nova: "Trench Song (Recharge 5-6)" — the caster-17-binder's own nova row (its "Area Nova", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] amphibious by concept: a creature of the deep breathes both (print: the Sea Hag's)
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] multiattack replacement clause: It can replace one attack with a use of (A) Creeping Dread or (B) Spellcasting to cast *Thunderwave*.
[reskin] audit rename: "Creeping Dread" -> "Drowning Hymn"
[reskin] size floor: STR 18 -> 25 — print prints no corporeal Gargantuan body under 25 (the Dragon Turtle); the attack follows it, as print's own 49 do
```


---


### Tollwright — a 2024 sheet

**Concept:** a chapel bell-ringer's ghost that tolls for the dying

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Tollwright | 3 | lurker-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1 / off 5 → 3; sustained 38 (2 × Withering Touch); nova Sonic Toll 13; dmg 38

```
Tollwright

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

Resonant Body. A creature that hits the tollwright with a melee attack while within 5 feet of it takes 5 (1d10) Thunder damage and has the Deafened condition until the end of its next turn.

Ethereal Sight. The tollwright can see 60 feet into the Ethereal Plane when it is on the Material Plane.

Incorporeal Movement. The tollwright can move through other creatures and objects as if they were Difficult Terrain. It takes 5 (1d10) Force damage if it ends its turn inside an object.

Actions

Multiattack. The tollwright makes two Withering Touch attacks. It can replace one attack with a use of Horrific Visage.

Withering Touch. Melee Attack Roll: +5, reach 5 ft. 19 (3d10 + 3) Necrotic damage.

Sonic Toll (Recharge 5-6). Constitution Saving Throw: DC 13, each creature in a 15-foot Emanation originating from the tollwright. Failure: 13 (3d8) Thunder damage, and the target has the Deafened condition until the end of its next turn. Success: Half damage only.

Horrific Visage. Wisdom Saving Throw: DC 13, each creature in a 60-foot Cone that can see the tollwright and isn't an Undead. Failure: 10 (2d6 + 3) Psychic damage, and the target has the Frightened condition until the start of the tollwright's next turn. Success: The target is immune to this ghost's Horrific Visage for 24 hours.

Possession (Recharge 6). Charisma Saving Throw: DC 13, one Humanoid the tollwright can see within 5 feet. Failure: The target is possessed by the tollwright; the tollwright disappears, and the target has the Incapacitated condition and loses control of its body. The tollwright now controls the body, but the target retains awareness. The tollwright can't be targeted by any attack, spell, or other effect, except ones that specifically target Undead. The tollwright's game statistics are the same, except it uses the possessed target's Speed, as well as the target's Strength, Dexterity, and Constitution modifiers.
The possession lasts until the body drops to 0 Hit Points or the tollwright leaves as a Bonus Action. When the possession ends, the tollwright appears in an unoccupied space within 5 feet of the target, and the target is immune to this ghost's Possession for 24 hours. Success: The target is immune to this ghost's Possession for 24 hours.

Etherealness. The tollwright casts the Etherealness spell, requiring no spell components and using Charisma as the spellcasting ability. The tollwright is visible on the Material Plane while on the Border Ethereal and vice versa, but it can't affect or be affected by anything on the other plane.

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
- Actions/Sonic Toll — template active-toll; library draw (seed unstamped); the GM's clause "tolls for the dying"; binds the GM's words: toll+bell+knell
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
[concept] signature elements: the death-knell that marks the dying [behavior] | a drifting shadow of the bell-ringer [body] | the tolling bell's echo [aura]
[concept] identity: The bell-ringer's ghost begins by tolling its spectral bell, and every soul that hears the knell feels the death-ward settle over it — the ring marks the dying. Each round it drifts through chapel stone toward the marked, its cold passing hand draining warmth and years from the living while the bell's echo keeps the doomed from fleeing far. It does not rage or toy; it performs its office with grim patience, withdrawing into the walls before the light but always returning to finish the toll.
[concept] lore: A chapel bell-ringer who died mid-knell, still swinging the bell that summoned the living to their graves, now tolls only for those already marked to die — and will not stop until the ringing is answered.
[reskin] print canon route: the Ghost's body outranks the phantom seat — no verb in the words names it; the plain lurker line
[reskin] print canon defenses: HP 39 -> 45, AC 14 -> 11 — the Ghost's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 7, DEX 13, CON 10, INT 10, WIS 12, CHA 17 — the Ghost's at its own CR; attack +5 -> +5, DC 13 (print's)
[reskin] donor: lurker-2 -> CR 3
[reskin] row gated out: Teleport (teleport) — the concept did not claim this mechanic
[reskin] [path] decides: twist on the Ghost (the matcher would have said homebrew)
[reskin] print canon: "a chapel bell-ringer's ghost that tolls for the dying" heads on the Ghost — print's rows ride along; the seat stays
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline declared: "the tollwright" — the call's own answer (kind), built from the name
[reskin] inline form: "the tollwright" — the model's own reading of the name
[reskin] save dc derived: DC 12 -> 13 (8 + PB 2 + the sheet's best 3) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] asked field dropped: the call answered limit "at_will" for "tolls for the dying" but offered no quote
[reskin] clauses: "a chapel bell-ringer's ghost" -> has (descriptive), head | "tolls for the dying" -> has (mechanical) [asked: start_of_turn/save_single]
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The tollwright swings its spectral bell across the battlefield so that every living soul present hears the knell, and each hears it as their own name. From then on they carry the mark of the dying: the bell's echo hangs on them, dogging their steps and dragging at them whenever they try to break away, growing louder the farther they run from the ringer. Only a creature taken by the knell can be fi" [action/save/condition] — menu: leap, gaze-single, execute, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, terror-pulse, snare-bolt, slow-bolt, sensory-strike, drain, zone-seed, blighted-ground (+ shelf: delayed-brand, patient-defense, self-invisibility, focus, feint-slip, coating, riposte, charge-push, hook-rider, pounce, isolation)
[reskin] signature bound to the concept's verb: action — active-toll, sensory-strike (toll, bell)
[reskin] word match declined by the call: hook-rider, obstacle-pull — the key word does not mean the mechanic here
[reskin] signature template: active-toll -> Actions/"Knell of Names (Recharge 5-6)" ("The bell's knell tolls over every living soul present, a save-or-suffer burst ce [verb: toll:concept, bell:concept, knell:idea]")
[reskin] keys spent by the action: toll
[reskin] signature idea (trait): "Wounds it deals are not simply cold flesh — its passing hand pulls the years out of the living, and anyone whose warmth it has drained begins to hear the bell tolling for them alone, a death-ward settling deeper with every brush of its grip. Those it has touched feel the knell feeding back through them, and the mark the bell set on them tightens each time the ringer comes close." [trait/always/condition] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, evasion, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature bound to the concept's verb: trait — bloodied-burst (toll, bell, dying, the dying)
[reskin] word match declined by the call: bloodied-burst, death-burst — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit" after being shown bloodied-burst, which the GM's words keyed
[reskin] key match declined: trait — "bloodied-burst" was ranked first on the call's own menu for toll+bell+dying+the dying, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: trait — "Wounds it deals are not simply cold flesh — its passing hand pulls the years out of the living, and anyone whose warmth it has drained begins to hear the bell tolling for them alone, a death-ward settling deeper with every brush of its grip. Those it has touched feel the knell feeding back through them, and the mark the bell set on them tightens each time the ringer comes close." [trait/always/condition] — the model found no template that holds it (offered: bloodied-burst, false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, evasion, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst, heated-body, absorption)
[reskin] concept-first trait skipped: bloodied-burst — the call read its match as a collision (the word is a modifier, or the sheet already answers it)
[reskin] trait bound to the concept's verb (concept-first): resonant-body — toll+bell in the user's words; the idea path had nothing
[reskin] signature template (trait): resonant-body -> Traits/"Resonant Body" ("exact concept match [verb: toll:concept, bell:concept]")
[reskin] weapons answered: Claw = none
[reskin] languages by mind: "None" -> "Common plus the languages it knew in life" (sapient)
[reskin] print canon languages: "Common plus the languages it knew in life" -> "Common plus one other language" — the Ghost's
[reskin] print canon speed: 30 ft. -> 5 ft. — the Ghost's walk; the concept's other modes stay
[reskin] print canon speed: Fly -> 40 ft. — the Ghost's own
[reskin] print canon attack: "Claw" -> "Withering Touch" — the Ghost's own row
[reskin] immunities stamped for type: Undead -> Poison; Exhaustion, Poisoned
[reskin] print canon defenses: immunities Poison; Exhaustion, Poisoned -> Necrotic, Poison; Charmed, Exhaustion, Frightened, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained; resistances none -> Acid, Bludgeoning, Cold, Fire, Lightning, Piercing, Slashing, Thunder — the Ghost's own header lines
[reskin] print canon trait: Ethereal Sight — "a chapel bell-ringer's ghost that tolls for the dying" is the Ghost (print's own row)
[reskin] print canon trait: Incorporeal Movement — "a chapel bell-ringer's ghost that tolls for the dying" is the Ghost (print's own row)
[reskin] print canon: chassis row leaves — Bonus Actions/"Umbral Step" is the seat's, not the Ghost's
[reskin] print canon row: Actions/Horrific Visage — the Ghost's own
[reskin] print canon row: Actions/Possession (Recharge 6) — the Ghost's own
[reskin] print canon row: Actions/Etherealness — the Ghost's own
[reskin] multiattack replacement clause: It can replace one attack with a use of Horrific Visage.
[reskin] row binds its clause: "Knell of Names" answers "tolls for the dying" — the keys it matched came from that clause, so the coverage credit has a receipt
[reskin] row binds its clause: "Resonant Body" answers "tolls for the dying" — the keys it matched came from that clause, so the coverage credit has a receipt
[reskin] ask vs row MISMATCH: "tolls for the dying" -> "Knell of Names" — trigger: asked start_of_turn, row reads at_will
[reskin] audit rewrite blocked — "Possession (Recharge 6)" is engine-authored chassis text
[reskin] audit rewrite blocked — "Etherealness" is engine-authored chassis text
[reskin] audit rename: "Knell of Names (Recharge 5-6)" -> "Sonic Toll (Recharge 5-6)"
```


---


### Brass Tyrant — bands soft

**Concept:** a tyrant of burning brass who rules a city of forges

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Brass Tyrant | 17 | defender-17-leader | ok | SOFT: aim-dpr, hot-offense | ok | ok | ok | ok | ok | ok | ok | ok |

- bands · soft · aim-dpr: damage 140 a round is 26% under the card's 190
- bands · soft · hot-offense: offense alone reads CR 21, 4 over; the HP axis pulls the read to 17.5
- **dropped clause:** "rules a city of forges"
- read: def 14 / off 21 → 17.5; sustained 140 (2 × Glaive + legendary Anvil Advance); nova none; dmg 140

```
Brass Tyrant

Huge Construct, Lawful Neutral

AC 20
Initiative +2 (12)

HP 241 (21d12 + 105)

Speed 30 ft.

MOD
SAVE
STR
22
+6
+6
INT
14
+2
+2
MOD
SAVE
DEX
14
+2
+2
WIS
16
+3
+3
MOD
SAVE
CON
20
+5
+11
CHA
20
+5
+11

Skills Athletics +12, Persuasion +11

Resistances Fire

Immunities Poison; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned

Senses darkvision 120 ft.; Passive Perception 13

Languages Common

CR 17 (XP 18,000; PB +6)

Traits

Molten Runoff. A creature that touches the brass tyrant or hits it with a melee attack while within 5 feet of it takes 10 (3d6) Fire damage.

Legendary Resistance (3/Day). If the brass tyrant fails a saving throw, it can choose to succeed instead.

Aura of Authority. While in a 10-foot Emanation originating from the brass tyrant, the brass tyrant and its allies have Advantage on attack rolls and saving throws, provided the brass tyrant doesn't have the Incapacitated condition.

Actions

Multiattack. The brass tyrant makes two Glaive attacks.

Glaive. Melee Attack Roll: +12, reach 10 ft. 15 (2d8 + 6) Slashing damage plus 13 (3d8) Fire damage.

Reactions

Riposte. Trigger: A creature within 5 feet of the brass tyrant misses it with a melee attack roll. Response: The brass tyrant makes one Glaive attack against that creature.

Legendary Actions

Legendary Action Uses: 3. Immediately after another creature's turn, the brass tyrant can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.

Anvil Advance. The brass tyrant moves up to half its Speed without provoking Opportunity Attacks, and it makes one Glaive attack.

Forge Orders. One ally of the brass tyrant that can see or hear it can immediately use its Reaction to move up to half its Speed or to make one attack.

Quench Resolve. The brass tyrant and each of its allies within 10 feet of it that can see or hear it end the Charmed and Frightened conditions on themselves.

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

- Traits/Molten Runoff — template heated-body; library draw (seed unstamped); binds the GM's words: burn+brass+heat+sear+molten+glow
- Traits/Legendary Resistance — the chassis
- Traits/Aura of Authority — the chassis
- Actions/Multiattack — the chassis
- Actions/Glaive — weapon glaive
- Legendary Actions/Legendary Action Uses: 3 — the chassis
- Legendary Actions/Anvil Advance — the chassis
- Legendary Actions/Forge Orders — the chassis
- Legendary Actions/Quench Resolve — the chassis
- Reactions/Riposte — template riposte; library draw (seed unstamped); binds the GM's words: parry+opening

**Engine trace**

```
[path] homebrew — title tyrant — "a tyrant of burning brass who rules a city of forges" (call)
[route] defender-leader type=Construct mechanics=aura — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | defender-leader: ✓ ("rules a city of forges") | defender-leader: no line key in the words — the model's read of its quote
[concept] resolve: archetype=defender type=Construct themes=forged/armed mind=sapient style=leader energy=Fire mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: aura
[concept] signature elements: commanding aura of authority over forge-guard allies [aura] | parrying with a searing brass glaive [object] | body of burning brass [body]
[concept] identity: The Brass Tyrant opens combat by planting itself amid its forge-guard and raising an aura of molten command that hardens its allies' strikes even as it unnerves its foes. Every round after, it parries with a heated brass glaive and hurls searing slag at those who would flank it, fighting shoulder-to-shoulder with its troops as a living bulwark. It is a patient, calculating despot that only yields ground when its court has fallen, preferring to die on the anvil of battle rather than abandon its throne.
[concept] lore: Forged from the molten runoff of a thousand slave-worked foundries, this brass colossus seized the forge-city it was built to serve and now rules it as a tyrant, demanding that every new blade be quenched in its own searing presence.
[reskin] donor: defender-17-leader -> CR 17 (invented — no printed peer)
[reskin] [path] decides: homebrew (the matcher agrees)
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline declared: "the brass tyrant" — the call's own answer (kind), built from the name
[reskin] inline form: "the brass tyrant" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a tyrant of burning brass" -> has (descriptive), head | "rules a city of forges" -> has (descriptive)
[reskin] signature idea (action): "The Brass Tyrant sets its glaive crosswise and catches a blow on the searing brass haft, then wrenches the weapon down and drives the superheated edge back along the attacker's guard. The creature that just struck it is wreathed in clinging forge-heat, and any ally of the tyrant standing close enough to see the parry can seize the opening to strike at the reeling foe." [reaction/on_being_hit/damage] — menu: riposte (+ shelf: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, patient-defense, lay-on-hands, second-wind, volley-order, aggro-curse, own-turn-punisher, self-invisibility, rally, stunning-strike, charge-push, hook-rider)
[reskin] word match declined by the call: disarm, obstacle-pull, herd — the key word does not mean the mechanic here
[reskin] value check: "Forgebrand Parry" EV 18.9 vs floor 4.7 (a reaction (free)) — worth the trade
[reskin] signature template: riposte -> Reactions/"Forgebrand Parry" ("catches the blow and answers it on the trigger creature with a counterattack, wh [verb: parry:idea, opening:idea]")
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 20 already beats print's AC 19 at CR 17, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "Whatever strikes the tyrant's glowing brass body is splashed by molten runoff: melee attackers and anyone grappling or shoving against it come away seared and stumbling, their flesh and gear reluctant to close again. The heat lingers a moment, so a foe who keeps pressing the tyrant keeps paying for it." [trait/on_being_hit/damage] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura)
[reskin] signature bound to the concept's verb: trait — heated-body (burn, brass)
[reskin] signature template (trait): heated-body -> Traits/"Molten Runoff" ("the molten runoff of the glowing brass body sears anyone who touches or strikes  [verb: burn:concept, brass:concept, heat:idea, sear:idea, molten:idea, glow:idea]")
[reskin] feature name: "Forgebrand Parry" -> "Riposte"
[reskin] weapons answered: Glaive = glaive
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] immunities stamped for type: Construct -> Poison; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned
[reskin] resistances derived: Fire
audit finding below confidence gate: Quench Resolve Forge Orders shares the same ally-targeting and out-of-turn structure as Quench Resolve, and the block gives no ally-token or ally-list, so the GM must track unspecified allies across two entries.
```


---


### Ozghar — bands soft

**Concept:**  | role: brute

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Ozghar | 4 | brute-2 | ok | SOFT: band | ok | ok | ok | ok | ok | ok | SOFT: multiattack-integrity | ok |

- bands · soft · band: reads CR 2.5 (print at 4 reads 1–6, n=66)
- reader · soft · multiattack-integrity: 2 attack rows and no Multiattack
- **dropped clause:** "re-lancing the same creeping arc through its own limbs until the target stops moving"
- **dropped clause:** "it will stalk a wounded quarry for days"
- read: def 1 / off 4 → 2.5; sustained 28 (1 × Barbed Foreleg); nova none; dmg 28

```
Ozghar

Medium Undead, Neutral Evil

AC 13
Initiative -1 (9)

HP 84 (13d8 + 26)

Speed 30 ft., Climb 30 ft.

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
8
-1
-1
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
6
-2
-2

Skills Athletics +6, Perception +1

Resistances Lightning

Immunities Poison; Exhaustion, Poisoned

Senses darkvision 120 ft.; Passive Perception 11

Languages Common plus the languages it knew in life

CR 4 (XP 1,100; PB +2)

Traits

Resonant Quarry. Ozghar knows the direction and distance to any creature it has damaged within the last 24 hours, as long as the two of them are on the same plane of existence.

Actions

Barbed Foreleg. Melee Attack Roll: +6, reach 5 ft. 17 (3d8 + 4) Piercing damage plus 11 (2d10) Lightning damage.

Skittering Frame. Melee Attack Roll: +6, reach 5 ft. 17 (3d8 + 4) Bludgeoning damage, and the target has the Prone condition.

Bonus Actions

Rampage (1/Day). Immediately after dealing damage to a creature that is already Bloodied, Ozghar moves up to half its Speed, and it makes one Barbed Foreleg attack.

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

- Actions/Barbed Foreleg — the chassis
- Actions/Skittering Frame — authored for this sheet; the GM's clause "letting it drag its hollow frame sideways"
- Bonus Actions/Rampage — library seed rampage; the GM's clause "it retreats into some vertical crevice only when badly bloodied —"; binds the GM's words: bloodied+blood+wound
- Traits/Resonant Quarry — template faultless-tracker; library draw (seed unstamped); the GM's clause "up any surface while its blank skull-joints track prey it will not strike for hours"; binds the GM's words: track+tracks+tracking+quarry+stalks+stalk+follows+marked

**Engine trace**

```
[path] blank — "role: brute" (code)
[route] brute type=Undead mechanics=snare — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | brute: ✓ ("a single gaunt skeletal horror") | brute: no line key in the words — the model's read of its quote
[concept] synthesis (blank roll): archetype=brute type=Undead themes=subterranean/uncanny mind=sapient style=— lore=✓
[concept] synthesis text: Ozghessa is a single gaunt skeletal horror whose ribcage bristles with a fan of jointed, chitin-sheathed legs charged with rift-lightning, letting it drag its hollow frame sideways and up any surface while its blank skull-joints track prey it will not strike for hours. It opens by burying a barbed lightning-conducting foreleg into stone or flesh from hundreds of feet away, then holds position, re-lancing the same creeping arc through its own limbs until the target stops moving. Patient, calculating, and contemptuous, it retreats into some vertical crevice only when badly bloodied — but it never forgets, and it will stalk a wounded quarry for days. It is scheming (INT 14-16), and it is a patient killer that strikes from extreme range.
[concept] signature elements: barbed lightning-conducting foreleg lance [object] | ribcage fan of chitinous skittering legs [body] | hours-long patient stalking of a chosen target [behavior]
[concept] name proposal: Ozghessa
[concept] lore: Ozghessa crawled out of a lightning-scoured elemental rift into a flooded barrow and learned that warm things die slowly, so it perches in high dark places and electrocutes travelers to study what their spasms reveal.
[reskin] donor: brute-2 -> CR 4
[reskin] [path] decides: blank (the matcher would have said homebrew)
[reskin] class kit: none — the blank path takes no class kit
[reskin] inline declared: "Ozghar" — the call's own answer (person), built from the name
[reskin] inline form: "Ozghar" — the model's own reading of the name
[reskin] save dc derived: DC 13 -> 14 (8 + PB 2 + the sheet's best 4) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] lacks refused: "it retreats into some vertical crevice" names no absence — nothing in it takes anything away
[reskin] asked field dropped: the call answered limit "at_will" for "letting it drag its hollow frame sideways" but offered no quote
[reskin] lacks not claimed: "up any surface while its blank skull-joints track prey it will not strike for hours" reads like a lack to the words, and the call's list did not name it
[reskin] asked field dropped: the call answered limit "at_will" for "up any surface while its blank skull-joints track prey it will not strike for hours" but offered no quote
[reskin] asked field dropped: the call answered limit "at_will" for "re-lancing the same creeping arc through its own limbs until the target stops moving" but offered no quote
[reskin] asked field dropped: the call answered limit "at_will" for "it retreats into some vertical crevice only when badly bloodied —" but offered no quote
[reskin] lacks not claimed: "it never forgets" reads like a lack to the words, and the call's list did not name it
[reskin] clauses: "Ozghessa is a single gaunt skeletal horror whose ribcage bristles with a fan of jointed" -> has (descriptive), head | "chitin-sheathed legs charged with rift-lightning" -> has (descriptive) | "letting it drag its hollow frame sideways" -> has (mechanical) [asked: movement] | "up any surface while its blank skull-joints track prey it will not strike for hours" -> has (mechanical) [asked: movement] | "It opens by burying a barbed lightning-conducting foreleg into stone or flesh from hundreds of feet away" -> has (descriptive) | "keeps position" -> has (descriptive) | "re-lancing the same creeping arc through its own limbs until the target stops moving" -> has (mechanical) [asked: save_single] | "Patient" -> has (descriptive) | "calculating" -> has (descriptive) | "contemptuous" -> has (descriptive) | "it retreats into some vertical crevice only when badly bloodied —" -> has (mechanical) [asked: when_bloodied/movement] | "it never forgets" -> has (descriptive) | "it will stalk a wounded quarry for days" -> has (descriptive) | "It is scheming (INT 14-16)" -> has (mechanical) | "it is a patient killer that strikes from extreme range" -> has (mechanical)
[reskin] signature idea (action): "It threads its lightning down the barbed foreleg it has already buried in a creature and discharges it again and again, lancing the same crawling arc through the victim's own limbs so long as the barb stays sunk in flesh. Each re-lance makes the struck thing stiffen and slow, its muscles locked to the current, so a quarry that flees rather than tears the barb free grows ever easier to run down. It" [rider/on_hit/condition] — menu: affliction, contagion, charge-push, hook-rider, pounce, charge (+ shelf: trample, leap, shield-bash, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, rampage, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, patient-defense, riposte)
[reskin] signature bound to the concept's verb: action — hook-rider (barb, barbed, barbs, drag, drags)
[reskin] word match declined by the call: hook-rider, charge, trample, charge-push — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit" after being shown hook-rider, which the GM's words keyed
[reskin] key match declined: action — "hook-rider" was ranked first on the call's own menu for barb+barbed+barbs+drag+drags, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: action — "It threads its lightning down the barbed foreleg it has already buried in a creature and discharges it again and again, lancing the same crawling arc through the victim's own limbs so long as the barb stays sunk in flesh. Each re-lance makes the struck thing stiffen and slow, its muscles locked to the current, so a quarry that flees rather than tears the barb free grows ever easier to run down. It" [rider/on_hit/condition] — the model found no template that holds it (offered: hook-rider, affliction, contagion, charge-push, pounce, charge, trample, aggro-curse)
[reskin] value check: "Rampage (1/Day)" EV 22.8 vs floor 4.4 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: rampage -> Bonus Actions/"Rampage (1/Day)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Once it has buried a barb in a foe and watched that foe long enough, the quarry is marked for it: Ozghessa feels the barb's resonance through stone and air and can follow the marked creature's direction across great distances without fail, knowing when it sleeps, runs, or bleeds. It will not deign to ambush anything but a marked quarry, but it never loses one it has marked." [trait/always/movement] — menu: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst, assassinate (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending, weapon-lodge)
[reskin] signature bound to the concept's verb: trait — faultless-tracker (track, tracks, tracking, quarry, stalks, stalk)
[reskin] word match declined by the call: bloodied-fury, assassinate, false-appearance — the key word does not mean the mechanic here
[reskin] signature template (trait): faultless-tracker -> Traits/"Resonant Quarry" ("it marks a quarry with a buried barb and never loses a tracked creature, followi [verb: track:concept, tracks:concept, tracking:concept, quarry:concept, stalks:concept, stalk:concept, follows:idea, marked:idea]")
[reskin] repair: 2 clause(s) with no row — "letting it drag its hollow frame sideways", "It is scheming (INT 14-16)"; one targeted call with the sheet as context
[reskin] repaired sheet: 1 attack row(s), 0 save, 0 trait(s), 0 reaction(s); 1 clause(s) unplaced
[reskin] weapons answered: Barbed Foreleg = none
[reskin] speed by concept: added Climb 30 ft. — the concept's movement set decides
[reskin] languages by mind: "None" -> "Common plus the languages it knew in life" (sapient)
[reskin] immunities stamped for type: Undead -> Poison; Exhaustion, Poisoned
[reskin] resistances derived: Lightning
[reskin] row binds its clause: "Rampage" answers "it retreats into some vertical crevice only when badly bloodied —" — the keys it matched came from that clause, so the coverage credit has a receipt
[reskin] row binds its clause: "Resonant Quarry" answers "up any surface while its blank skull-joints track prey it will not strike for hours" — the keys it matched came from that clause, so the coverage credit has a receipt
[reskin] ask vs row MISMATCH: "it retreats into some vertical crevice only when badly bloodied —" -> "Rampage" — trigger: asked when_bloodied, row reads at_will
!! Failed to load resource: the server responded with a status of 500 (OK)
!! Error generating response: Error: HTTP 500: 
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:266:25)
    at async callLLM (http://localhost:5173/src/tools/statblock-generator/reskin/generate.mjs?t=1792434810733:1327:18)
    at async generateReskin (http://localhost:5173/src/tools/statblock-generator/reskin/generate.mjs?t=1792434810733:5972:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1792434810733:1105:22)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1792434810733:657:5)
[reskin] audit skipped — HTTP 500: 
[harness] at timeout: {"ready":"complete","generating":false,"url":"http://localhost:5173/"}
```


---


### Air Elemental — in the run

**Concept:** name: Air Elemental | that carries stolen voices

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Air Elemental | 5 | lurker-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

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
+2
INT
6
-2
-2
MOD
SAVE
DEX
20
+5
+8
WIS
10
+0
+0
MOD
SAVE
CON
14
+2
+2
CHA
6
-2
-2

Skills Perception +3, Stealth +11

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
[route] lurker type=Elemental mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | lurker: ✓ ("stolen voices") | lurker: no line key in the words — the model's read of its quote
[concept] name: "Air Elemental" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] resolve: archetype=lurker type=Elemental themes=aerial/voice mind=sapient style=— energy=Thunder mix=both identity=✓ lore=✓
[concept] name: provided "Air Elemental"
[concept] mechanics: none claimed
[concept] signature elements: stealing voices [behavior] | swirling storm-body of borrowed breath [body] | eerie chorus of stolen cries [aura]
[concept] identity: An air elemental that opens combat as an invisible breath of moving air, then strikes in one sudden engulfing rush to swallow a victim's voice into itself — the target can only gasp or mouth words while its stolen speech howls inside the creature. After that opening, it flits and reforms at the edge of sight, evading retaliation while venting stolen shrieks and warnings that confuse and dishearten foes, and it toys with prey rather than fleeing, feeding on more voices until bloodied and then hiding in the air to plan its next theft.
[concept] lore: Born in the howling gaps between worlds where lost words gather, this elemental collects voices the way a magpie collects silver, driven to fill its hollow body with every cry, oath, and scream it can steal.
[reskin] print canon defenses: HP 73 -> 90, AC 15 -> 15 — the Air Elemental's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 14, DEX 20, CON 14, INT 6, WIS 10, CHA 6 — the Air Elemental's at its own CR; attack +6 -> +8, DC 13 (print's)
[reskin] donor: lurker-5 -> CR 5
[reskin] row gated out: Teleport (teleport) — the concept did not claim this mechanic
[reskin] [path] decides: twist on the Air Elemental (the matcher agrees)
[reskin] print canon: "Air Elemental — that carries stolen voices" heads on the Air Elemental — print's rows ride along; the seat stays
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline by rule: "the air elemental" — the call answered "the air elemental" (kind), which the name does not support
[reskin] inline form: "the air elemental" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Air Elemental —" -> has (descriptive), head | "carries stolen voices" -> has (descriptive)
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The elemental opens its hollow body and inhales, dragging every loose sound and half-spoken word off the battlefield into itself — the voices it swallows claw at the air as they go, so anyone close by takes Thunder damage, and one nearby speaker loses their voice entirely for a while as it is drawn in. It only reaches those near it, and it cannot gulp again until it has settled its stolen catch." [action/save/condition] — menu: leap, gaze-single, execute, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, terror-pulse, snare-bolt, slow-bolt, sensory-strike, drain, zone-seed, blighted-ground (+ shelf: delayed-brand, patient-defense, self-invisibility, focus, feint-slip, coating, riposte, stunning-strike, charge-push, hook-rider, pounce, isolation)
[reskin] fit declined: "Voice-Thief's Toll (Recharge 5-6)" — a print body takes only what the user's words ask; the call offered no quote, and the key table finds no verb either (the blacksmith's rally, critic-ten 2026-10-01)
[reskin] fallback stands down: the twist path has no shelf — the Air Elemental's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "The voices it has stolen never stay quiet: at the start of each of its turns, the air around the elemental shrieks with the half-swallowed warnings and cries of everyone it has taken, unsettling nearby foes who can hear them and leaving them slower to act on their own instincts." [trait/start_of_turn/condition] — menu: fire-aura, warded-mending (+ shelf: heated-body, false-appearance, absorption, bloodied-burst, resonant-body, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, evasion, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] signature bound to the concept's verb: trait — mimicry (stolen voice, stolen voices, voices)
[reskin] word match declined by the call: mimicry — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit" after being shown mimicry, which the GM's words keyed
[reskin] key match declined: trait — "mimicry" was ranked first on the call's own menu for stolen voice+stolen voices+voices, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: trait — "The voices it has stolen never stay quiet: at the start of each of its turns, the air around the elemental shrieks with the half-swallowed warnings and cries of everyone it has taken, unsettling nearby foes who can hear them and leaving them slower to act on their own instincts." [trait/start_of_turn/condition] — the model found no template that holds it (offered: mimicry, fire-aura, warded-mending, heated-body)
[reskin] concept-first trait skipped: mimicry — the call read its match as a collision (the word is a modifier, or the sheet already answers it)
[reskin] weapons answered: Gale Strike = none
[reskin] speed by concept: dropped Climb 30 ft. — the concept's movement set decides
[reskin] languages by mind: "None" -> "Primordial" (sapient)
[reskin] print canon size: Medium -> Large — the Air Elemental's
[reskin] print canon languages: "Primordial" -> "Primordial (Auran)" — the Air Elemental's
[reskin] print canon speed: 30 ft. -> 10 ft. — the Air Elemental's walk; the concept's other modes stay
[reskin] print canon speed: Fly -> 90 ft. — the Air Elemental's own
[reskin] print canon attack: "Gale Strike" -> "Thunderous Slam" — the Air Elemental's own row
[reskin] immunities stamped for type: Elemental -> Poison; Exhaustion, Poisoned
[reskin] print canon defenses: immunities Poison; Exhaustion, Poisoned -> Poison, Thunder; Exhaustion, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained, Unconscious; resistances none -> Bludgeoning, Lightning, Piercing, Slashing — the Air Elemental's own header lines
[reskin] print canon trait: Air Form — "Air Elemental — that carries stolen voices" is the Air Elemental (print's own row)
[reskin] print canon: chassis row leaves — Bonus Actions/"Umbral Step" is the seat's, not the Air Elemental's
[reskin] print canon row: Actions/Whirlwind (Recharge 4-6) — the Air Elemental's own
[reskin] vulnerability rejected — "Thunder" has no warrant in the concept's own text (print's default is none)
```


---


### Lashram Siegewright — in the run

**Concept:** a siege-engine golem of lashed timber that shoulders through walls

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Lashram Siegewright | 8 | brute-5-juggernaut | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 7 / off 8 → 7.5; sustained 54 (2 × Beam Fist); nova none; dmg 54

```
Lashram Siegewright

Large Construct, Neutral

AC 15
Initiative -1 (9)

HP 153 (18d10 + 54)

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

Lightning Absorption. Whenever the siegewright is subjected to Lightning damage, it takes no damage and instead regains a number of Hit Points equal to the Lightning damage dealt.

Immutable Form. The siegewright can't shape-shift.

Magic Resistance. The siegewright has Advantage on saving throws against spells and other magical effects.

Actions

Multiattack. The siegewright makes two Beam Fist attacks.

Beam Fist. Melee Attack Roll: +8, reach 5 ft. 27 (5d8 + 5) Bludgeoning damage.

Bonus Actions

Rebuking Slam. One creature within 5 feet that hit the siegewright with an attack roll since the end of the siegewright's last turn takes 11 (2d10) Bludgeoning damage.

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
- Actions/Beam Fist — the chassis
- Bonus Actions/Rebuking Slam — library seed own-turn-punisher; binds the GM's words: lash

**Engine trace**

```
[path] homebrew — "a siege-engine golem of lashed timber that shoulders through walls" (call)
[route] brute-juggernaut type=Construct mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | brute-juggernaut: ✓ ("siege-engine golem of lashed timber") | brute-juggernaut: no line key in the words — the model's read of its quote
[concept] hints: golem→canon ✓ ("creature IS a golem of lashed timber")
[concept] resolve: archetype=brute type=Construct themes=forged/terror mind=mindless style=juggernaut energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: lashed timber frame that shoulders through walls [body] | hurls beams and rubble as ammunition [behavior] | relentless drive into the thickest press [behavior]
[concept] identity: The siege-golem opens by charging the nearest fortification — wall, gate, or shield line — and shouldering through it, timber splintering outward in a spray of lash-cuts and crushing mass. Every round after it wades deeper, seizing beams, rubble, or bodies in its lashed-timber limbs and hurling them at whatever it cannot simply walk down. It does not retreat and does not toy; wounded, it only drives harder into the thickest press, spending its own frame like fuel until the structure or the enemy fails first.
[concept] lore: Raised by siege-sorcerers who bound a ram's hunger into woven trunks and iron lashings, it exists only to reach the walls it was made against — and once bloodied past its purpose, it turns that appetite on the army that woke it.
[reskin] donor: brute-5-juggernaut -> CR 8
[reskin] [path] decides: homebrew (the matcher would have said twist Clay Golem)
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline declared: "the siegewright" — the call's own answer (kind), built from the name; the rules would have said "Lashram"
[reskin] inline on kit rows: "Lashram" -> "the siegewright"
[reskin] inline form: "the siegewright" — the model's own reading of the name
[reskin] save dc derived: DC 15 -> 16 (8 + PB 3 + the sheet's best 5) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a siege-engine golem of lashed timber" -> has (descriptive), head | "shoulders through walls" -> has (descriptive)
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "Lashram rips loose a length of beam, a chunk of rubble, or anything it just shouldered through and hurls it in a flat arc at a line of foes, the mass tearing through everyone in its path and splintering outward on impact so the shards keep catching whoever stood behind the first. It can only do this with debris it can actually reach, and once the ammunition is spent it must wade forward and pry mo" [action/always/damage] — menu: leap, throw-retrieve, shield-bash, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up (+ shelf: second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, stunning-strike, charge-push, hook-rider, pounce)
[reskin] signature bound to the concept's verb: action — own-turn-punisher (lash)
[reskin] signature miss: action — "Lashram rips loose a length of beam, a chunk of rubble, or anything it just shouldered through and hurls it in a flat arc at a line of foes, the mass tearing through everyone in its path and splintering outward on impact so the shards keep catching whoever stood behind the first. It can only do this with debris it can actually reach, and once the ammunition is spent it must wade forward and pry mo" [action/always/damage] — the model picked "throw-retrieve" (no verb, and it quotes nothing the GM typed) over a concept-verb template (own-turn-punisher)
[reskin] value check: "Answering Sting" EV 6.1 vs floor 4.4 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: own-turn-punisher -> Bonus Actions/"Answering Sting" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The siegewright's lashed-timber frame is built to bear through barriers: when it moves into a wall, gate, barricade, or a tight formation of enemies, its bulk shoulders straight through, and anything it breaks apart this way clatters loose around it for it to seize as ammunition. The frame gives back as it drives on, so the more it splinters and shoves aside, the more debris it can keep hurling." [trait/always/movement] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending, weapon-lodge)
[reskin] word match declined by the call: terrain-walk — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "The siegewright's lashed-timber frame is built to bear through barriers: when it moves into a wall, gate, barricade, or a tight formation of enemies, its bulk shoulders straight through, and anything it breaks apart this way clatters loose around it for it to seize as ammunition. The frame gives back as it drives on, so the more it splinters and shoves aside, the more debris it can keep hurling." [trait/always/movement] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst, heated-body)
[reskin] weapons answered: Beam Fist = none
[reskin] languages by body: a trap-line Construct with no voice in the concept
[reskin] immunities stamped for type: Construct -> Lightning, Poison; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned
[reskin] audit rename: "Answering Sting" -> "Rebuking Slam"
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

Senses darkvision 60 ft.; Passive Perception 14

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
[route] brute-juggernaut type=Construct mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | brute-juggernaut: ✓ ("Stone Golem") | brute-juggernaut: no line key in the words — the model's read of its quote
[concept] name: "Stone Golem" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] hints: golem→canon ✓ ("carved as a weeping saint")
[concept] resolve: archetype=brute type=Construct themes=grave/forged mind=mindless style=juggernaut energy=— mix=physical identity=✓ lore=✓
[concept] name: provided "Stone Golem"
[concept] mechanics: none claimed
[concept] signature elements: weeping stone visage [body] | petrifying embrace of the mourned [behavior] | breaches walls and structures as it advances [behavior]
[concept] identity: The Weeping Saint closes by walking straight through walls, pews, and pillars, stone fists already swinging before the dust settles — its opening is a breach, not a charge. Every round after, it advances indifferently under fire to lay hands on the nearest living thing, and when its hands close it does not strike again but folds the victim into a stone embrace and weeps: a slow petrifying sorrow that stills them where they stand. Under pressure it never retreats and never hurries — a carved thing cannot be bloodied into caution, and it fights until it or everything around it is rubble.
[concept] lore: A cathedral raised a saint of stone to mourn its dead, and a grieving congregation's prayers poured into the block until the statue rose to gather the living into its grief — it walks now with hollow eyes weeping tears of grit, embracing mourners until they become stone like itself.
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
[reskin] signature idea (action): "The golem folds the nearest living creature into its arms and holds it there, weeping. The victim does not take damage; instead stone sorrow seeps into them where the embrace lands, and each turn they spend held they stiffen further — first slowed, then rooted where they stand, until they are a statue wearing a saint's face. Breaking free demands strength, not stealth, and a creature already stiff" [rider/on_hit/condition] — menu: stunning-strike, charge-push, hook-rider, pounce, charge (+ shelf: trample, leap, thrown-burst, throw-retrieve, shield-bash, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, rampage, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating)
[reskin] signature re-seated: action — no rider shares the verb; the idea "The golem folds the nearest living creature into its arms an…" is tried as an action
[reskin] signature idea (action): "The golem folds the nearest living creature into its arms and holds it there, weeping. The victim does not take damage; instead stone sorrow seeps into them where the embrace lands, and each turn they spend held they stiffen further — first slowed, then rooted where they stand, until they are a statue wearing a saint's face. Breaking free demands strength, not stealth, and a creature already stiff" [action/save/condition] — menu: trample, leap, thrown-burst, throw-retrieve, shield-bash, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up (+ shelf: rampage, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, stunning-strike, charge-push, hook-rider, pounce, charge)
[reskin] signature miss: action — "The golem folds the nearest living creature into its arms and holds it there, weeping. The victim does not take damage; instead stone sorrow seeps into them where the embrace lands, and each turn they spend held they stiffen further — first slowed, then rooted where they stand, until they are a statue wearing a saint's face. Breaking free demands strength, not stealth, and a creature already stiff" [action/save/condition] — no template on the shelf shares a verb with the concept or the idea (offered: trample, leap, thrown-burst, throw-retrieve, shield-bash, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, rampage, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, stunning-strike, charge-push, hook-rider, pounce, charge)
[reskin] fallback stands down: the twist path has no shelf — the Stone Golem's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "At the start of each of its turns, the golem's hollow eyes weep a fine rain of grit over everything close to it — those nearby feel the ache of mourning and find their limbs heavy and reluctant, while any creature it currently holds can barely struggle at all. The weeping only ceases for a moment when the golem is shattered badly enough, then resumes." [trait/start_of_turn/condition] — menu: fire-aura, warded-mending (+ shelf: heated-body, false-appearance, absorption, bloodied-burst, resonant-body, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, weapon-lodge, death-burst)
[reskin] signature bound to the concept's verb: trait — false-appearance (stone)
[reskin] word match declined by the call: false-appearance, bloodied-burst, resonant-body, death-burst — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit" after being shown false-appearance, which the GM's words keyed
[reskin] key match declined: trait — "false-appearance" was ranked first on the call's own menu for stone, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: trait — "At the start of each of its turns, the golem's hollow eyes weep a fine rain of grit over everything close to it — those nearby feel the ache of mourning and find their limbs heavy and reluctant, while any creature it currently holds can barely struggle at all. The weeping only ceases for a moment when the golem is shattered badly enough, then resumes." [trait/start_of_turn/condition] — the model found no template that holds it (offered: false-appearance, fire-aura, warded-mending, bloodied-burst, resonant-body, gaze-aura, death-burst)
[reskin] weapons answered: Stone Fist = none; Fistful of Grit = none
[reskin] languages by body: a trap-line Construct with no voice in the concept
[reskin] print canon languages: "Understands the languages of its creator but can't speak" -> "Understands Common plus two other languages but can't speak" — the Stone Golem's
[reskin] print canon speed: 40 ft. -> 30 ft. — the Stone Golem's walk; the concept's other modes stay
[reskin] print canon attack: "Stone Fist" -> "Slam" — the Stone Golem's own row
[reskin] print canon multiattack: "The stone golem makes two attacks, using Slam or Force Bolt in any combination." — the Stone Golem's own
[reskin] print canon attack: "Force Bolt" is print's own row — +9, 22 (4d10), range 120 ft. (an exact body at print's CR)
[reskin] print canon attack: "Fistful of Grit" -> "Force Bolt" — the Stone Golem's own ranged row
[reskin] immunities stamped for type: Construct -> Poison; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned
[reskin] print canon defenses: immunities Poison; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned -> Poison, Psychic; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned — the Stone Golem's own header lines
[reskin] name-canon trait stamped: Immutable Form (the name says so; print says what it does)
[reskin] name-canon trait stamped: Magic Resistance (the name says so; print says what it does)
[reskin] print canon trait: Immutable Form — print's text replaces the chassis's (the Troll regenerates 15, not the chassis's 10 — critic's audit 2026-10-02)
[reskin] print canon trait: Magic Resistance — print's text replaces the chassis's (the Troll regenerates 15, not the chassis's 10 — critic's audit 2026-10-02)
[reskin] print canon row: Bonus Actions/Slow (Recharge 5-6) — the Stone Golem's own
[reskin] vulnerability rejected — "Thunder" has no warrant in the concept's own text (print's default is none)
```


---


### Vespid Archon — in the run

**Concept:** a plague-bearing archon of flies that commands lesser swarms

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Vespid Archon | 13 | defender-8-leader | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 9 / off 16 → 12.5; sustained 93 (3 × Stinger); nova none; dmg 93

```
Vespid Archon

Large Celestial, Lawful Neutral

AC 18
Initiative +2 (12)

HP 190 (20d10 + 80)

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

Resistances Radiant

Immunities Charmed

Senses darkvision 120 ft.; Passive Perception 11

Languages understands Celestial but can't speak

CR 13 (XP 10,000; PB +5)

Traits

Aura of Authority. While in a 10-foot Emanation originating from the archon, the archon and its allies have Advantage on attack rolls and saving throws, provided the archon doesn't have the Incapacitated condition.

Actions

Multiattack. The archon makes three attacks, using Stinger or Plague Claw in any combination.

Stinger. Melee Attack Roll: +10, reach 5 ft. 18 (3d8 + 5) Piercing damage plus 13 (3d8) Poison damage.

Plague Claw. Melee Attack Roll: +10, reach 5 ft. 29 (7d6 + 5) Slashing damage.

Bonus Actions

Drone Command (Recharge 5-6). Wisdom Saving Throw: DC 17, each creature of the archon's choice within 30 feet. Failure: The target immediately moves up to half its Speed in a direction of the archon's choice, using the safest available route.

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

- Traits/Aura of Authority — the chassis
- Actions/Multiattack — the chassis
- Actions/Stinger — the chassis
- Actions/Plague Claw — the chassis
- Bonus Actions/Drone Command — template herd; library draw (seed unstamped); the GM's clause "commands lesser swarms"; binds the GM's words: command+call

**Engine trace**

```
[path] homebrew — "a plague-bearing archon of flies that commands lesser swarms" (call)
[route] defender-leader type=Celestial mechanics=aura — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | defender-leader: ✓ ("commands lesser swarms") | defender-leader: key "commands" (class verb)
[concept] hints: swarm→body ✓ ("commands lesser swarms") | winged→style ✓ ("archon of flies")
[concept] resolve: archetype=defender type=Celestial themes=celestial/uncanny mind=sapient style=leader energy=Poison mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: aura
[concept] signature elements: commands lesser swarms [behavior] | plague-bearing body of flies [body] | aura of authority [aura]
[concept] identity: A plague-bearing celestial that descends onto the battlefield as a dense, buzzing column of consecrated flies, opening by releasing a miasma of radiant decay that marks foes and surges its own swarm with borrowed vitality. Each round it hovers above lesser swarms and directs them like a field marshal, its heavenly voice threading through the drone as it darts forward to put a single plague-touched claw through the most defiant enemy. If witnessed bloodied, it does not flee — it condenses into a tight cloud and redoubles its aura of authority, fighting with the implacable patience of a being that has already judged the field.
[concept] lore: The archon was once a warden of celestial plagues, sent to cleanse mortal realms of corruption, but ages of wielding rot as a tool have left it more faithful to the method than the cause, so it now seeks to perfect its swarm and prove that decay is the truest hymn.
[reskin] donor: defender-8-leader -> CR 13 (invented — no printed peer)
[reskin] [path] decides: homebrew (the matcher agrees)
[reskin] ranged row off: "Hybrid Attack" keeps its melee half only
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline declared: "the archon" — the call's own answer (kind), built from the name
[reskin] inline form: "the archon" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a plague-bearing archon of flies" -> has (descriptive), head | "commands lesser swarms" -> has (mechanical)
[reskin] signature idea (action): "The archon calls out through the swarm's drone, and the lesser swarms near it break formation to strike as one body. Every plague-touched creature nearby — those carrying its plague, not the archon's own — feels the command and lashes out at a foe the archon designates, each hit injecting fresh corruption that spreads the plague to one more creature standing beside the victim." [action/save/damage] — menu: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up (+ shelf: patient-defense, lay-on-hands, second-wind, volley-order, aggro-curse, own-turn-punisher, self-invisibility, rally, riposte, stunning-strike, charge-push, hook-rider, contagion)
[reskin] signature bound to the concept's verb: action — contagion (plague, plagued)
[reskin] value check: "Drone Command (2/Day)" EV 11.7 vs floor 76.1 (the whole Multiattack (3 attacks)) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature re-slotted: "Drone Command" moves to a bonus action, Recharge-gated because it reaches an area (print: the Centaur Trooper's Trampling Charge) — EV 11.7 vs floor 4.9 there; the GM's verb keeps its row
[reskin] signature template: herd -> Bonus Actions/"Drone Command (Recharge 5-6)" ("The archon calls out and lesser swarm creatures are commanded to move/strike as  [verb: command:concept, call:idea]")
[reskin] keys spent by the action: command
[reskin] signature idea (trait): "The archon is not one body but a column of consecrated flies that readmits its own strays: whenever a creature carrying its plague swarms around it or dies within reach, the lingering flies stream back into the column and mend the archon's wounds and its swarm alike." [trait/always/resource] — menu: adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending, weapon-lodge)
[reskin] signature bound to the concept's verb: trait — heated-body (plague)
[reskin] word match declined by the call: warded-mending, heated-body — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit" after being shown heated-body, which the GM's words keyed
[reskin] key match declined: trait — "heated-body" was ranked first on the call's own menu for plague, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: trait — "The archon is not one body but a column of consecrated flies that readmits its own strays: whenever a creature carrying its plague swarms around it or dies within reach, the lingering flies stream back into the column and mend the archon's wounds and its swarm alike." [trait/always/resource] — the model found no template that holds it (offered: heated-body, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, bloodied-burst, warded-mending)
[reskin] weapons answered: Stinger = none; Plague Claw = none
[reskin] immunities stamped for type: Celestial -> Charmed
[reskin] resistances derived: Radiant
[reskin] row binds its clause: "Drone Command" answers "commands lesser swarms" — the keys it matched came from that clause, so the coverage credit has a receipt
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
- Actions/Bite — print's own row
- Actions/Tail Stinger — print's own row
- Traits/Tunneler — print's own row; template tunneler; library draw (seed unstamped); binds the GM's words: worm
- Bonus Actions/Swallow — print's own row

**Engine trace**

```
[path] twist — Purple Worm (is) — "Name field: Purple Worm" (code)
[route] brute-grappler type=Monstrosity mechanics=grapple, engulf — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: on the GM's own words "that swallowed a war-band's armoury" | brute-grappler: ✓ ("Purple Worm — that swallowed a war-band'") | brute-grappler: no line key in the words — the model's read of its quote
[concept] name: "Purple Worm" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] resolve: archetype=brute type=Monstrosity themes=devouring/subterranean mind=bestial style=grappler energy=Acid mix=both identity=✓ lore=✓
[concept] name: provided "Purple Worm"
[concept] mechanics: grapple, engulf
[concept] signature elements: swallowing prey whole [behavior] | acid-churned gullet full of blades and mail [body] | shrapnel spray of digested armoury [behavior]
[concept] identity: A Purple Worm that devoured an entire war-band's armoury, its gullet now a churning foundry of half-melted blades, mail, and spearheads that it partially digests and partially hurls back out. It erupts from below to swallow formations whole, then sprays a shrapnel-storm of acid-etched iron from its maw on the rounds it cannot reach a body to engulf. Bloodied, it does not flee — it burrows down, circles, and breaches again beneath the largest cluster of survivors, fighting until its hoard-body is spent.
[concept] lore: Somewhere beneath a battlefield a purple worm wallowed through a legion's supply trench, and now it carries the war-band's entire armoury in its gut, craving steel the way other worms crave flesh and stone.
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
[reskin] signature idea (action): "The worm gorges on the battlefield itself, gulping a great scoop of earth, shattered mail, and any bodies in its path down into the churning foundry of its gut. Anything it drags under is scoured by the acid and blades within, and the worm heals from the metal it grinds into itself. It cannot simply keep doing this; after gorging, it must let its gullet cool and empty before it can swallow another" [action/always/damage] — menu: swallow, condition-payoff, shield-bash, hook-drag, burrow-ambush, escalating-dread, terror-pulse, push-prone, herd, drain, exploiter (+ shelf: second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, contagion, stunning-strike, charge-push, hook-rider, pounce, charge)
[reskin] signature bound to the concept's verb: action — swallow (swallow, swallows, swallowed)
[reskin] word match declined by the call: hook-drag, hook-rider, condition-payoff, burrow-ambush, exploiter, rally, drain — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit" after being shown swallow, which the GM's words keyed
[reskin] key match declined: action — "swallow" was ranked first on the call's own menu for swallow+swallows+swallowed, and the call read it as no fit; the words keep their claim and nothing is forced
[reskin] signature miss: action — "The worm gorges on the battlefield itself, gulping a great scoop of earth, shattered mail, and any bodies in its path down into the churning foundry of its gut. Anything it drags under is scoured by the acid and blades within, and the worm heals from the metal it grinds into itself. It cannot simply keep doing this; after gorging, it must let its gullet cool and empty before it can swallow another" [action/always/damage] — the model found no template that holds it (offered: swallow, condition-payoff, shield-bash, hook-drag, burrow-ambush, escalating-dread, terror-pulse, push-prone, herd, drain, exploiter, hook-rider, rally)
[reskin] fallback respects the call: swallow, condition-payoff, burrow-ambush, exploiter left the shelf — the call declined them for this sheet
[reskin] fallback stands down: the twist path has no shelf — the Purple Worm's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "Whenever the worm is wounded, the hot acid churning through its blade-filled gullet surges up and out through the wound, splattering the attacker with searing, iron-shard-laden filth. The harder it is struck, the more of its hoard-body it spits back in answer." [trait/on_being_hit/damage] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, earth-glide, tunneler, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] signature bound to the concept's verb: trait — tunneler (worm)
[reskin] word match declined by the call: resonant-body, aberrant-ground — the key word does not mean the mechanic here
[reskin] trait declined: "Armoury Reflux" — bound only on the idea's own words (sear:idea, iron:idea, hot:idea, shard:idea, acid:idea) with no key in the concept; a meat body earns its trait by the user's verb (the sniper's tracker, critic 2026-09-29)
[reskin] trait bound to the concept's verb (concept-first): tunneler — worm in the user's words; the idea path had nothing
[reskin] signature template (trait): tunneler -> Traits/"Tunneler" ("exact concept match [verb: worm:concept]")
[reskin] weapons answered: Bite = none; Shrapnel Spray = none; Steel-Sick Gullet = none
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

Skills Perception +10, Persuasion +19

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

Multiattack. The pit fiend makes one Bite attack, two Devilish Claw attacks, and one Fiery Mace attack. It can replace one attack with a use of Oathfire Collection.

Bite. Melee Attack Roll: +14, reach 10 ft. 18 (3d6 + 8) Piercing damage. If the target is a creature, it must make the following saving throw. Constitution Saving Throw: DC 21. Failure: The target has the Poisoned condition. While Poisoned, the target can't regain Hit Points and takes 21 (6d6) Poison damage at the start of each of its turns, and it repeats the save at the end of each of its turns, ending the effect on itself on a success. After 1 minute, it succeeds automatically.

Fiery Mace. Melee Attack Roll: +14, reach 10 ft. 22 (4d6 + 8) Force damage plus 21 (6d6) Fire damage.

Devilish Claw. Melee Attack Roll: +14, reach 10 ft. 26 (4d8 + 8) Necrotic damage.

Oathfire Collection. Dexterity Saving Throw: DC 21, one creature within 60 feet. Failure: The target is cursed until the end of the pit fiend's next turn. The first time the cursed target deals damage to any creature before then, it takes 17 (5d6) Fire damage.

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
- Actions/Oathfire Collection — template curse-debt; library draw (seed unstamped); the GM's clause "collects the oaths of dying knights"; binds the GM's words: oath+bargain
- Actions/Hellfire Spellcasting — print's own row

**Engine trace**

```
[path] twist — Pit Fiend (is) — "Name field: Pit Fiend" (code)
[route] defender-leader type=Fiend mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | defender-leader: ✓ ("who collects the oaths of dying knights") | defender: the call read "knights" as not meaning that mechanic here — no override | defender-leader stands: every key that would override it was read as a figure of speech | defender-leader: no line key in the words — the model's read of its quote
[concept] name: "Pit Fiend" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] resolve: archetype=defender type=Fiend themes=fiendish/forged mind=sapient style=leader energy=Fire mix=both identity=✓ lore=✓
[concept] name: provided "Pit Fiend"
[concept] mechanics: none claimed
[concept] signature elements: collecting the oaths of the dying [behavior] | a body of hellfire [body] | an aura of command over the sworn [aura]
[concept] identity: A pit fiend whose office is the taking of oaths — it strides into the line wreathed in fire and commands the dying to swear, and the swearing is what damns them; each knight who binds his last breath to it rises again as a burning oathsworn soldier at its heel, so it fights beside a growing retinue of the pledged. Every round it presses the same bargain across the field, roaring the terms of surrender and parrying aside the blades of those who refuse, and it will not break and run — it answers blood with contempt and renews the offer until all its foes are sworn or ash. It is a tempter first and a tyrant second, patient only while there is someone left to bind.
[concept] lore: Once a lord of the lower hells charged with harvesting the valor of the slain, this fiend has made its own the final promises of dying knights, and it walks the field of battle collecting oaths the way a miser collects coins — each one a soul-soldier it can spend and spend again.
[reskin] print canon route: the Pit Fiend's body outranks the leader seat — no verb in the words names it; the plain defender line
[reskin] print canon defenses: HP 281 -> 337, AC 22 -> 21 — the Pit Fiend's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 26, DEX 14, CON 24, INT 22, WIS 18, CHA 24 — the Pit Fiend's at its own CR; attack +14 -> +14, DC 21 (print's)
[reskin] donor: defender-17 -> CR 20 (invented — no printed peer)
[reskin] row gated out: Guard Aura (aura) — the concept did not claim this mechanic
[reskin] [path] decides: twist on the Pit Fiend (the matcher agrees)
[reskin] print canon: "Pit Fiend — who collects the oaths of dying knights" heads on the Pit Fiend — print's rows ride along; the seat stays
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline by rule: "the pit fiend" — the call answered "the pit fiend" (kind), which the name does not support
[reskin] inline form: "the pit fiend" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Pit Fiend —" -> has (descriptive), head | "collects the oaths of dying knights" -> has (descriptive)
[reskin] menu pruned: action — push-prone (the sheet cannot render them)
[reskin] signature idea (action): "The pit fiend roars the terms of the bargain across the field, and the offer is hardest to hear from the dying. Every foe near it that is already bloodied and wavering feels the pull of the oath as a real temptation pressing on their will, and those who have been knocked down and not yet gotten up feel it worst of all. Whoever gives in and swears rises with hellfire in their chest, standing back u" [action/save/condition] — menu: seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, herd, curse-debt, reveal, wind-up, exploiter (+ shelf: patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, riposte, stunning-strike, charge-push, hook-rider)
[reskin] signature bound to the concept's verb: action — curse-debt, aggro-curse (oath)
[reskin] signature template: curse-debt -> Actions/"Oathfire Collection" ("The roar presses the oath as a temptation on will, and swearing it turns the oat [verb: oath:concept, bargain:idea]")
[reskin] keys spent by the action: oath
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 21 already beats print's AC 19 at CR 20, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "Every … already sworn burns inside the fiend as a body of hellfire, so the more soldiers it has bound to itself, the hotter and more terrible it burns, and the fiercer the fire that rides on every blow of its blade. When one of those sworn soldiers is struck down, the …-fire it was carrying pours back into the fiend rather than gutter out, and the fiend spends that heat on the next swing." [trait/always/damage] — menu: adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst (+ shelf: heated-body, false-appearance, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending, weapon-lodge)
[reskin] signature bound to the concept's verb: trait — death-burst, bloodied-burst (dying)
[reskin] word match declined by the call: death-burst, bloodied-burst, bound — the key word does not mean the mechanic here
[reskin] trait declined: "Oathfire Shroud" — bound only on the idea's own words (heat:idea, burn:idea, fire:idea) with no key in the concept; a meat body earns its trait by the user's verb (the sniper's tracker, critic 2026-09-29)
[reskin] weapons answered: Oathbrand = longsword; Swear or Burn = none
[reskin] weapon declared: "Oathbrand" is a longsword — the call's own answer
[reskin] speed by concept: added Fly 30 ft. — the concept's movement set decides
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] print canon languages: "Common" -> "Infernal; telepathy 120 ft." — the Pit Fiend's
[reskin] print canon speed: Fly -> 60 ft. — the Pit Fiend's own
[reskin] print canon row: Actions/Devilish Claw — the Pit Fiend's second melee row, beside the chassis's
[reskin] print canon row: Actions/Fiery Mace — the Pit Fiend's second melee row, beside the chassis's
[reskin] print canon attack: "Oathbrand" -> "Bite" — the Pit Fiend's own row
[reskin] print canon multiattack: "The pit fiend makes one Bite attack, two Devilish Claw attacks, and one Fiery Mace attack." — the Pit Fiend's own
[reskin] save follows the effect: Actions/"Oathfire Collection" Charisma -> Dexterity — the row's point is its damage; a condition it hands out alongside does not pick the stat
[reskin] immunities stamped for type: Fiend -> Poison; Poisoned
[reskin] print canon skills: "Athletics +14, Perception +10" -> "Perception +10, Persuasion +19" — the Pit Fiend's own skills, each derived from this sheet's stat and PB
[reskin] print canon defenses: immunities Poison; Poisoned -> Fire, Poison; Poisoned; resistances none -> Cold — the Pit Fiend's own header lines
[reskin] resistances derived withheld: print's Pit Fiend owns the line (Cold)
[reskin] print canon trait: Diabolical Restoration — "Pit Fiend — who collects the oaths of dying knights" is the Pit Fiend (print's own row)
[reskin] print canon trait: Fear Aura — "Pit Fiend — who collects the oaths of dying knights" is the Pit Fiend (print's own row)
[reskin] print canon trait: Magic Resistance — "Pit Fiend — who collects the oaths of dying knights" is the Pit Fiend (print's own row)
[reskin] print canon legendary: the chassis's Legendary Actions leave — the Pit Fiend has none of its own at its CR
[reskin] print canon row: Actions/Hellfire Spellcasting (Recharge 4-6) — the Pit Fiend's own
[reskin] multiattack replacement clause: It can replace one attack with a use of Oathfire Collection.
[reskin] row binds its clause: "Oathfire Collection" answers "collects the oaths of dying knights" — the keys it matched came from that clause, so the coverage credit has a receipt
[reskin] audit rename blocked — "Hellfire Spellcasting (Recharge 4-6)" is the user's own part name, a kit feature's real name, or print's own row
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
Skills Perception +5
Senses darkvision 60 ft.; Passive Perception 15
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
[route] brute type=Monstrosity mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | brute: ✓ ("Owlbear") | brute: no line key in the words — the model's read of its quote
[concept] resolve: archetype=brute type=Monstrosity themes=bestial/terror mind=bestial style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: provided "Owlbear"
[concept] mechanics: none claimed
[concept] signature elements: beak-and-claw charge that knocks prey prone [behavior] | bear-hugging grapple with hooked forelimbs [behavior] | bear-owl hybrid body of shaggy hide and feathers [body]
[concept] identity: The owlbear crashes out of cover in a screaming, beaked charge, raking with hooked forelimbs to knock its prey flat before it can react. Once blood is drawn it settles into a grinding rhythm — hooked beak, crushing bear-hug forelimbs, shoving and trampling — trading blows to stay nose-to-nose rather than circle. It is a brute with no tactic but pressure: it does not flee when bloodied, but hammers harder, and hunts opportunistically with feral cunning rather than true malice.
[concept] lore: Born of a wizard's crossbreeding of bear and hunting owl, the owlbear ranges dense woodland at night, driven by a hungry predator's instinct to claim and defend territory and to tear apart anything that moves within it.
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
[reskin] weapons answered: Beak = none
[reskin] print canon speed: modes climb — the Owlbear's
[reskin] print canon senses: "darkvision 60 ft." — the Owlbear's
[reskin] speed by concept: added Climb 30 ft. — the concept's movement set decides
[reskin] print canon speed: 30 ft. -> 40 ft. — the Owlbear's walk; the concept's other modes stay
[reskin] print canon speed: Climb -> 40 ft. — the Owlbear's own
[reskin] print canon attack: "Beak" -> "Rend" — the Owlbear's own row
[reskin] print canon multiattack: "The owlbear makes two Rend attacks." — the Owlbear's own, added (the chassis carried none; the Owlbear makes two Rend attacks — canaries 2026-10-12)
[reskin] languages held: None stands — INT 3 on a Monstrosity speaks nothing, whatever the mind read said
[reskin] print canon skills: "Athletics +7, Perception +3" -> "Perception +5" — the Owlbear's own skills, each derived from this sheet's stat and PB
```


---


### Vashka the Red — in the run

**Concept:** name: Vashka the Red | A hobgoblin warlord in lacquered plate who fights from a shield wall and never breaks ranks.

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Vashka the Red | 6 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- **dropped clause:** "never breaks ranks"
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

Senses darkvision 60 ft.; Passive Perception 13

Languages Common, Goblin

CR 6 (XP 2,300; PB +3)

Traits

Guarded Stance. While Vashka isn't Bloodied, melee attack rolls against it are made with Disadvantage.

Pack Tactics. The hobgoblin has Advantage on an attack roll against a creature if at least one of the hobgoblin's allies is within 5 feet of the creature and the ally doesn't have the Incapacitated condition.

Actions

Multiattack. Vashka makes two attacks, using Longsword or Longbow in any combination.

Longsword. Melee Attack Roll: +7, reach 5 ft. 22 (4d8 + 4) Slashing damage.

Longbow. Ranged Attack Roll: +7, range 150/600 ft. 22 (4d8 + 4) Piercing damage.

Reactions

Riposte. Trigger: A creature within 5 feet of Vashka misses it with a melee attack roll. Response: Vashka makes one Longsword attack against that creature.

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

- Traits/Guarded Stance — template guarded-stance; fighter kit; the GM's clause "fights from a shield wall"
- Traits/Pack Tactics — print's own row
- Actions/Multiattack — the chassis
- Actions/Longsword — print's own row, renamed; weapon longsword
- Actions/Longbow — print's own row, renamed; weapon longbow
- Reactions/Riposte — template riposte; fighter kit; the GM's clause "warlord"

**Engine trace**

```
[path] class_npc — Hobgoblin Warrior (is) — class fighter — "warlord" (call)
[route] defender type=Humanoid mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | defender-leader: ✓ ("A hobgoblin warlord") | defender-leader -> defender: the concept's VERB outranks the noun (key "shield wall", class verb) | defender: key "shield wall" (class verb)
[concept] name: "Vashka the Red" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] resolve: archetype=defender type=Humanoid themes=armed/forged mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: provided "Vashka the Red"
[concept] mechanics: none claimed
[concept] signature elements: lacquered iron shield wall that never breaks [object] | one measured step forward, never more [behavior] | punishes anyone who slips past the line [behavior]
[concept] identity: Vashka opens by planting his tower shield and letting the first wave break on lacquered iron, punishing every foe that tries to slip around him with a short, brutal sword thrust into the gap. Each round he advances one measured step, never more, keeping the wall unbroken and using his hobgoblin discipline to call the line forward or lock it down as the fight demands. Under pressure he does not flee — he digs in harder, spending his soldiers like planks in a barricade and fighting to the last rank.
[concept] lore: Vashka the Red rose through the hobgoblin legions by never losing ground, and now he sells his unbreakable shield wall to the highest warlord who can pay in land and slaves.
[reskin] the concept outranks the alias: the Hobgoblin Warrior is a Fey and the concept reads Humanoid — the words RESEMBLE it, they do not name it, so the print body stands down
[reskin] print canon array: STR 18, DEX 12, CON 12, INT 10, WIS 10, CHA 9 — the Hobgoblin Warrior's, STR fitted to +7
[reskin] donor: defender-5 -> CR 6
[reskin] row gated out: Guard Aura (aura) — the concept did not claim this mechanic
[reskin] [path] decides: class_npc on the Hobgoblin Warrior · class fighter (the matcher would have said homebrew)
[reskin] print canon: "Vashka the Red — A hobgoblin warlord in lacquered plate who fights from a shield wall and never breaks ranks." heads on the Hobgoblin Warrior — print's rows ride along; the seat stays
[reskin] class kit: fighter — "warlord": Riposte (riposte), Guarded Stance (guarded-stance)
[reskin] proper noun: "Vashka the Red" — the Name field is a person, not a kind (no print match, no article in the words)
[reskin] inline declared: "Vashka" — the call's own answer (person), built from the name
[reskin] inline form: "Vashka" — the model's own reading of the name
[reskin] save dc derived: DC 14 -> 15 (8 + PB 3 + the sheet's best 4) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] lacks not claimed: "never breaks ranks" reads like a lack to the words, and the call's list did not name it
[reskin] clauses: "Vashka the Red — A hobgoblin warlord in lacquered plate" -> has (descriptive), head | "fights from a shield wall" -> has (mechanical) [asked: at_will/buff_self] | "never breaks ranks" -> has (mechanical) [asked: at_will/buff_self]
[reskin] menu pruned: action — snap-shot (the sheet cannot render them)
[reskin] signature idea (action): "Vashka does not lunge or charge — he takes exactly one measured step forward, planting his tower shield and driving it into whoever stands in his path, which shoves that foe back out of the gap while every ally of Vashka's beside him shifts forward with him in the same instant, keeping the wall in a single unbroken line. The line only moves as far as he does, and it never scatters — it stays tight" [action/always/movement] — menu: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up (+ shelf: patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, stunning-strike, charge-push, hook-rider)
[reskin] signature bound to the concept's verb: action — rally (shield)
[reskin] fit declined: "Shield Wall Advance" — a print body takes only what the user's words ask; the call offered no quote, and the key table finds no verb either (the blacksmith's rally, critic-ten 2026-10-01)
[reskin] fallback stands down: the class_npc path has no shelf — the Hobgoblin Warrior's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "As long as Vashka holds his shield wall in place, the lacquered iron turns aside the first blow each round that would land on him, and any foe who presses an attack home gets the rim of the shield slammed into them in the same breath — the wall answers every strike against it." [trait/on_being_hit/defense] — menu: absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura)
[reskin] word match declined by the call: resonant-body, absorption, bloodied-burst, weapon-lodge — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "As long as Vashka holds his shield wall in place, the lacquered iron turns aside the first blow each round that would land on him, and any foe who presses an attack home gets the rim of the shield slammed into them in the same breath — the wall answers every strike against it." [trait/on_being_hit/defense] — the model found no template that holds it (offered: absorption, bloodied-burst, resonant-body, weapon-lodge)
[reskin] repair: 1 clause(s) with no row — "never breaks ranks"; one targeted call with the sheet as context
[reskin] repair: the answer held no rows — the clauses stay unplaced
[reskin] weapons answered: Broadsword = broadsword; Pilum = javelin
[reskin] weapon declared: "Pilum" is a javelin — the call's own answer
[reskin] print canon alignment: Lawful Neutral -> Lawful Evil — the Hobgoblin Warrior's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon type: Humanoid stays — the words say humanoid ("a dire wolf but undead", 2026-10-01)
[reskin] print canon attack: "Broadsword" -> "Longsword" — the Hobgoblin Warrior's own row
[reskin] print canon attack: "Pilum" -> "Longbow" — the Hobgoblin Warrior's own ranged row
[reskin] print canon trait: Pack Tactics — "Vashka the Red — A hobgoblin warlord in lacquered plate who fights from a shield wall and never breaks ranks." is the Hobgoblin Warrior (print's own row)
[reskin] ask vs row ok: "fights from a shield wall" -> "Guarded Stance" — limit at_will
[reskin] asked but unanswered: "never breaks ranks" asked for at_will and no row binds the clause
```


---


### Sump Scytheclaw — in the run

**Concept:** A Large insectile horror. It has four scythe-arms, a spitting maw, and a shell that sheds acid. It fights by pinning prey with two arms and carving with the others.

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Sump Scytheclaw | 9 | brute-8-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- **dropped clause:** "It has four scythe-arms"
- **dropped clause:** "a shell that sheds acid"
- read: def 7 / off 10 → 8.5; sustained 62 (2 × Scythe-Arm); nova Caustic Spit 32; dmg 63

```
Sump Scytheclaw

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

Actions

Multiattack. The scytheclaw makes two attacks, using Scythe-Arm or Carving Slash in any combination.

Scythe-Arm. Melee Attack Roll: +8, reach 10 ft. 18 (4d6 + 4) Slashing damage plus 13 (3d8) Acid damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 16). While Grappled, the target has the Restrained condition.

Caustic Spit (Recharge 5-6). Constitution Saving Throw: DC 15, each creature in a 30-foot Cone. Failure: 32 (5d12) Acid damage, and the target has the Poisoned condition until the end of its next turn. Success: Half damage only.

Carving Slash. Melee Attack Roll: +8, reach 5 ft. 18 (4d6 + 4) Slashing damage.

Bonus Actions

Cage. The scytheclaw cages one Medium or smaller creature it is grappling. While caged, the target has the Blinded and Restrained conditions, has Total Cover against attacks and other effects outside the scytheclaw, and takes 10 (3d6) Acid damage at the start of each of the scytheclaw's turns. The scytheclaw can have only one creature caged at a time. If the scytheclaw takes 25 damage or more on a single turn from the caged creature, the scytheclaw must release the target at the end of that turn, and the target exits Prone in an unoccupied space within 10 feet of the scytheclaw. If the scytheclaw dies, a caged creature pulls free Prone by using 10 feet of movement.

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
- Actions/Caustic Spit — template spew; library draw (seed unstamped); binds the GM's words: spits
- Actions/Carving Slash — authored for this sheet; the GM's clause "carving with the others"
- Bonus Actions/Cage — binds the GM's words: cage+swallow+swallows+engulf+engulfs+devour+devours+gulp+smother+entomb+cocoon+whelm

**Engine trace**

```
[path] homebrew — "A Large insectile horror." (call)
[route] brute-grappler type=Monstrosity mechanics=grapple, engulf — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: on the GM's own words "pinning prey with two arms" | brute-grappler: ✓ ("pinning prey with two arms") | brute-grappler: no line key in the words — the model's read of its quote
[concept] resolve: archetype=brute type=Monstrosity themes=venomous/bestial mind=bestial style=grappler energy=Acid mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: grapple, engulf
[concept] signature elements: pinning prey with two scythe-arms while carving with the others [behavior] | a shell that sheds acid [body] | an acid-spitting maw [body]
[concept] identity: The scythe-shell opens by spitting a searing glob of acid to stagger a target, then rushes in to clamp two scythe-arms around it and pin it helpless. Every round thereafter it carves the pinned prey with the freed pair of blades while its shedding shell spatters acid on anything that presses close or tries to pry it off. It is a patient, methodical butcher that does not flee, dragging its kill toward whatever hollow it nests in and lashing out at rescuers rather than releasing its meal.
[concept] lore: Hatched in the acidic sumps beneath a ruined hive, this four-armed horror hunts to stockpile paralyzed prey in its shell-worn nest, which it feeds to its brooding clutch.
[reskin] donor: brute-8-grappler -> CR 9
[reskin] [path] decides: homebrew (the matcher agrees)
[reskin] engulf engine: Cage — the body's own verb
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline declared: "the scytheclaw" — the call's own answer (kind), built from the name
[reskin] inline form: "the scytheclaw" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] clauses: "A Large insectile horror" -> has (header) | "It has four scythe-arms" -> has (mechanical) [asked: on_hit/condition] | "a spitting maw" -> has (descriptive) | "a shell that sheds acid" -> has (mechanical) | "It fights by pinning prey with two arms" -> has (descriptive) | "carving with the others" -> has (mechanical) [asked: attack]
[reskin] signature idea (action): "The scytheclaw rears back and spits a searing glob of acid at one prey it can see, then scuttles in behind the burn: the struck creature reels, staggered and unable to strike back cleanly, until it steadies itself or the scytheclaw reaches it. The opening shot is meant to soften prey just long enough for the arms to clamp." [rider/on_hit/condition] — menu: affliction, contagion, stunning-strike, charge-push, hook-rider, pounce (+ shelf: swallow, leap, condition-payoff, shield-bash, hook-drag, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, exploiter, shell-withdraw, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating)
[reskin] signature bound to the concept's verb: action — spew, escalating-dread, exploiter, shell-withdraw (spits, horror, pinned, shell)
[reskin] word match declined by the call: shell-withdraw, exploiter — the key word does not mean the mechanic here
[reskin] value check: "Searing Spit (Recharge 5-6)" EV 84.8 vs floor 54.1 (the whole Multiattack (2 attacks)) — worth the trade
[reskin] signature template: spew -> Actions/"Searing Spit (Recharge 5-6)" ("spits acid glob at one prey it can see that staggers them and softens them befor [verb: spits:concept]")
[reskin] keys spent by the action: spits
[reskin] signature idea (trait): "Its shell constantly sheds acid, so every step the scytheclaw takes leaves a slick, biting trail behind it; anything that wades through or reaches into that trail is burned, and the trail lingers a short while before the sump eats it away. Prey that tries to slip behind it or pry it off its meal pays for the privilege." [trait/always/damage] — menu: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, uncanny-sense, warded-mending, weapon-lodge)
[reskin] signature bound to the concept's verb: trait — heated-body (acid)
[reskin] word match declined by the call: heated-body, terrain-walk, faultless-tracker, absorption — the key word does not mean the mechanic here
[reskin] trait declined: "Shedding Sump" — bound only on the idea's own words (slick:idea) with no key in the concept; a meat body earns its trait by the user's verb (the sniper's tracker, critic 2026-09-29)
[reskin] repair: 1 clause(s) with no row — "carving with the others"; one targeted call with the sheet as context
[reskin] repaired sheet: 2 attack row(s), 0 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] weapons answered: Scythe-Arm = none
[reskin] speed by concept: added Climb 40 ft. — the concept's movement set decides
[reskin] languages held: None stands — INT 4 on a Monstrosity speaks nothing, whatever the mind read said
[reskin] asked but unanswered: "It has four scythe-arms" asked for on_hit and no row binds the clause
[reskin] audit rename: "Searing Spit (Recharge 5-6)" -> "Caustic Spit (Recharge 5-6)"
[reskin] audit rename: "Carving Flurry" -> "Carving Slash"
```


---


### Bogwidow Sedge — in the run

**Concept:** a marsh witch who curses trespassers, cr 7

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Bogwidow Sedge | 7 | caster-8-binder | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok | ok |

- donor · soft · print-rows: rows outside print, the named seat and the keyed seeds: Actions/Trespasser's Hex
- read: def 3 / off 7 → 5; sustained 48 (3 × Arcane Burst); nova none; dmg 48

```
Bogwidow Sedge

Medium Humanoid, Neutral

AC 15
Initiative +2 (12)

HP 81 (18d8)

Speed 30 ft., Swim 30 ft.

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

Skills Arcana +6, History +6, Perception +4

Senses Passive Perception 14

Languages Common and any three languages

CR 7 (XP 2,900; PB +3)

Traits

Bogstride. Difficult Terrain composed of marsh doesn't cost Sedge extra movement, and Sedge can move across marsh without needing to make an ability check.

Actions

Multiattack. Sedge makes three Arcane Burst attacks. It can replace one attack with a use of Trespasser's Hex.

Arcane Burst. Melee or Ranged Attack Roll: +6, reach 5 ft. or range 120 ft. 16 (3d8 + 3) Force damage.

Spellcasting. Sedge casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 14):

- At Will: Detect Magic, Light, Mage Armor, Mage Hand, Prestidigitation
- 2/Day Each: Fireball, Invisibility
- 1/Day Each: Cone of Cold, Fly

Trespasser's Hex. Wisdom Saving Throw: DC 14, one creature within 60 feet. Failure: The target has the Charmed condition until the end of its next turn.

Bonus Actions

Misty Step (3/Day). Sedge casts Misty Step, using the same spellcasting ability as Spellcasting.

Reactions

Protective Magic (3/Day). Sedge casts Counterspell or Shield in response to the spell's trigger, using the same spellcasting ability as Spellcasting.

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
- Actions/Spellcasting — print's own row
- Actions/Trespasser's Hex — authored for this sheet; the GM's clause "curses trespassers"
- Reactions/Protective Magic — mage kit; the GM's clause "witch"
- Traits/Bogstride — template terrain-walk; library draw (seed unstamped); binds the GM's words: marsh+bog+fen
- Bonus Actions/Misty Step — print's own row

**Engine trace**

```
[path] class_npc — class mage — "witch" (call)
[route] caster-binder (controller) type=Humanoid mechanics=none — casts: implied by the kind — "a marsh witch who curses trespassers" | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | caster-binder: ✓ ("a marsh witch who curses trespassers") | caster-binder: key "curses" (class verb)
[concept] hints: binder→style ✓ ("a marsh witch who curses trespassers")
[concept] resolve: archetype=caster type=Humanoid themes=grasping/fey mind=sapient style=binder energy=Necrotic mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: curses that bind trespassers in place [behavior] | a body soaked in black bog-brine [body] | the claiming of fen borders as her own [aura]
[concept] identity: The marsh witch opens with a binding curse hurled across the fen — a hex that roots a trespasser's feet in sucking black mud — then spends every round stacking conditions: a blight-ray to sap strength, a marshy choking that steals breath, a whispered confining name that freezes a limb before it can swing. She keeps her distance and lets the fen fight for her, toying with intruders until they are bound and bleeding, and only flees bloodied when the swamp itself has been turned against her.
[concept] lore: A woman who drowned in the black bog-water and bargained with its old powers to keep her memory, she still walks the marsh claiming its borders, cursing every trespasser so the fen can swallow them into her same clutching, root-thick eternity.
[reskin] energy withheld: Necrotic on a Humanoid with no Necrotic in the concept's own words (fixed phrases read first)
[reskin] [path] class body: the mage stands on the Mage — the class's own print block, nearest CR 7
[reskin] print canon defenses: HP 108 -> 81, AC 15 -> 15 — the Mage's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 9, DEX 14, CON 11, INT 17, WIS 12, CHA 11 — the Mage's at its own CR; attack +7 -> +6, DC 14 (print's)
[reskin] donor: caster-8-binder -> CR 7
[reskin] [path] decides: class_npc on the Mage · class mage (the matcher would have said homebrew)
[reskin] print canon: "a marsh witch who curses trespassers, cr 7" heads on the Mage — print's rows ride along; the seat stays
[reskin] repair round 1: 5 defect(s) — name "Claw" is a natural weapon on a Humanoid whose concept gives it none — a Humanoid swings a weapon (Scimitar, Club, Spear) | "Claw" is an anatomical name dealing Slashing on a mind-driven attacker (the attack bonus keys to CHA) — print pays physical damage on mental strikes with implement names (the Dryad's Vine Lash, the Rakshasa's Cursed Touch) or carries a magical type (the Mage's Arcane Burst deals Force); rename to a conjured implement or pick a magical type | "Blight Bolt" deals Necrotic on a Humanoid whose concept names no Necrotic — a name is not a warrant; use a physical type | "Fen Rot" deals Poison on a Humanoid whose concept names no Poison — a name is not a warrant; use a physical type | condition for {condition_minor} not from its menu
[reskin] repair round 2: 4 defect(s) — name "Claw" is a natural weapon on a Humanoid whose concept gives it none — a Humanoid swings a weapon (Scimitar, Club, Spear) | "Claw" is an anatomical name dealing Slashing on a mind-driven attacker (the attack bonus keys to CHA) — print pays physical damage on mental strikes with implement names (the Dryad's Vine Lash, the Rakshasa's Cursed Touch) or carries a magical type (the Mage's Arcane Burst deals Force); rename to a conjured implement or pick a magical type | "Blight Bolt" deals Necrotic on a Humanoid whose concept names no Necrotic — a name is not a warrant; use a physical type | "Fen Rot" deals Poison on a Humanoid whose concept names no Poison — a name is not a warrant; use a physical type
[reskin] anatomy on a humanoid: "Claw" -> "Staff" (Bludgeoning) — a Humanoid with no species claw swings a weapon; the magical stamp is for a body that has the part
[reskin] class kit: mage — "witch": Protective Magic (3/Day) (Mage/Protective Magic)
[reskin] inline declared: "Sedge" — the call's own answer (person), built from the name
[reskin] inline form: "Sedge" — the model's own reading of the name
[reskin] energy withheld on a base row: "Blight Bolt" Necrotic -> Piercing (the row's own noun; a Humanoid deals no Necrotic its concept never gave it)
[reskin] control spell gated to daily — Bestow Curse (level 3 control at will is print's CR 13+ shape; at CR 7 it is 1/Day)
[reskin] daily spell dropped — Blight (36 avg vs 17 per-hit; print's only daily damage spell is the Adult Red's Fireball at ~1.1x)
[reskin] spell DC coherence: DC 14 -> 11 off Charisma 11 (print's array stays)
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a marsh witch" -> has (descriptive), head | "curses trespassers" -> has (mechanical) [asked: condition] | "cr 7" -> has (header)
[reskin] extraction: 1 of 3 model clauses quote nothing the user typed and leave the record ("cr 7")
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "Sedge names a trespasser aloud and her voice sinks into their bones, so that every wound they take from the fen carries a shiver of the cold bog she drowned in. While the naming holds, anyone who strikes that trespasser passes a measure of the marsh's bitterness back to them, so the fen seems to punish the whole party for standing beside the marked one." [bonus_action/save/condition] — menu: lay-on-hands, aggro-curse, self-invisibility, rally (+ shelf: condition-payoff, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, snare-bolt, slow-bolt, sensory-strike, herd, thrown-burst-seed, drain, delayed-brand, curse-debt, zone-seed, reveal, wind-up, blighted-ground, snap-shot, bolt-restrain, bolt-drag, bolt-mark)
[reskin] word match declined by the call: aggro-curse, delayed-brand, reveal, bolt-mark, bolt-restrain, snare-bolt, slow-bolt, pacify, condition-payoff — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit"
[reskin] signature miss: action — "Sedge names a trespasser aloud and her voice sinks into their bones, so that every wound they take from the fen carries a shiver of the cold bog she drowned in. While the naming holds, anyone who strikes that trespasser passes a measure of the marsh's bitterness back to them, so the fen seems to punish the whole party for standing beside the marked one." [bonus_action/save/condition] — the model found no template that holds it (offered: lay-on-hands, aggro-curse, self-invisibility, rally, slow-bolt, condition-payoff, pacify, snare-bolt, delayed-brand, reveal, bolt-restrain, bolt-mark)
[reskin] fallback respects the call: snare-bolt, condition-payoff, pacify, slow-bolt, delayed-brand, aggro-curse left the shelf — the call declined them for this sheet
[reskin] fallback stands down: the class_npc path has no shelf — the Mage's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "Sedge's flesh is sodden with black bog-brine, and it clings to whatever touches her: a weapon that lands on her comes away heavy and slick with fen-muck, and the wielder's grip and balance suffer for it until they take a moment to shake the brine free." [trait/on_being_hit/condition] — menu: absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst)
[reskin] signature bound to the concept's verb: trait — terrain-walk (marsh)
[reskin] word match declined by the call: aberrant-ground — the key word does not mean the mechanic here
[reskin] signature template (trait): terrain-walk -> Traits/"Bogstride" ("the creature is a marsh witch whose fen-muck terrain is her natural footing, so  [verb: marsh:concept, bog:idea, fen:idea]")
[reskin] repair: 1 clause(s) with no row — "curses trespassers"; one targeted call with the sheet as context
[reskin] repaired sheet: 2 attack row(s), 1 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] weapons answered: Claw = none; Blight Bolt = none; Fen Rot = none; Binding Hex = none
[reskin] weapon declined: "Blight Bolt" reads crossbow from its name, but the call answered none — the row carries no weapon
[reskin] weapon table: "Blight Bolt" — a launcher, never thrown, range 80/320
[reskin] print canon alignment: Neutral Evil -> Neutral — the Mage's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common" -> "Common and any three languages" — the Mage's
[reskin] print canon attack: "Arcane Burst" keeps print's hybrid frame — reach 5 ft. or range 120 ft. (the Mage's weapon is thrown)
[reskin] print canon attack: "Staff" -> "Arcane Burst" — the Mage's own row
[reskin] print canon multiattack: "Sedge makes three Arcane Burst attacks." — the Mage's own
[reskin] ranged row off: "Blight Bolt" leaves — the Mage carries no ranged row and the words name none
[reskin] print canon skills: "Perception +4, Deception +3" -> "Arcana +6, History +6, Perception +4" — the Mage's own skills, each derived from this sheet's stat and PB
[reskin] print canon: chassis row leaves — Actions/"Fen Rot" — the Mage prints no row for it and no path stage claimed it
[reskin] print canon row: Actions/Spellcasting — print's own list replaces the chassis's
[reskin] print canon row: Bonus Actions/Misty Step (3/Day) — the Mage's own
[reskin] multiattack replacement clause: It can replace one attack with a use of Trespasser's Hex.
audit finding below confidence gate: Trespasser's Hex Trespasser's Hex is a one-round Charmed effect while the creature's core action economy (Multiattack replacement) keys off it, yet nothing in the block benefits from, punishes, or otherwise interacts with a Charmed target — the entry references a state no other entry meaningfully uses.
```


---


### Iron Vow Warden — in the run

**Concept:** a templar priest with a mace and no magic at all

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Iron Vow Warden | 6 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | SOFT: kit-lands |

- class · soft · kit-lands: the cleric kit landed no row on a class-NPC sheet — its rows are magic and the GM took magic away
- read: def 5 / off 6 → 5.5; sustained 44 (2 × Mace); nova none; dmg 44

```
Iron Vow Warden

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

Multiattack. The vow warden makes two Mace attacks.

Mace. Melee Attack Roll: +7, reach 5 ft. 22 (4d8 + 4) Bludgeoning damage, and the target has Disadvantage on its next attack roll before the start of the vow warden's next turn.

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
[path] class_npc — class cleric — "templar" (call)
[route] defender type=Humanoid mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | defender: ✓ ("templar priest with a mace") | defender: no line key in the words — the model's read of its quote
[concept] resolve: archetype=defender type=Humanoid themes=armed/forged mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: mace and shield combat [object] | punishing anyone who moves past the line [behavior] | fights to the death rather than retreat [behavior]
[concept] identity: A battle-hardened templar priest in unyielding iron plate, this zealous defender plants its shield and uses its heavy mace to punish any foe that tries to slip past it to reach the flock behind. Each round it closes on the nearest threat, herding and hammering with disciplined, practiced blows, and it never flinches from a wound — it has staked its body between danger and the faithful. Under pressure it fights to the death, taunting the foe to strike its shielded flank rather than let them advance, because retreating would betray the line it swore to hold.
[concept] lore: Once a mere parish guardian of the iron order, this priest took an oath of the shield instead of the word and now patrols the stronghold's thresholds, believing that a well-kept armor line is prayer enough to hold back the unworthy.
[reskin] [path] class body: the cleric stands on the Priest — the class's own print block, nearest CR 6
[reskin] print canon array: STR 18, DEX 10, CON 12, INT 13, WIS 16, CHA 13 — the Priest's, STR fitted to +7
[reskin] donor: defender-5 -> CR 6
[reskin] row gated out: Guard Aura (aura) — the concept did not claim this mechanic
[reskin] [path] decides: class_npc on the Priest · class cleric (the matcher would have said twist Priest)
[reskin] print canon: "a templar priest with a mace and no magic at all" heads on the Priest — print's rows ride along; the seat stays
[reskin] repair round 1: 1 defect(s) — rename for "Hybrid Attack" takes the shelf's own row name "Shield Bash" — that name belongs to a template this sheet may still receive; choose another
[reskin] named parts: Mace (slot) — the user's words, the engine's numbers
[reskin] named parts landed: 1 attack row(s), 0 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] chassis row off: Actions/"Hammer and Hurl" leaves — the GM named a melee weapon (Mace); one weapon, one rule set
[reskin] class kit: Divine Aid — the sheet carries no row it could refer to (/^Spellcasting$/)
[reskin] class kit: cleric — "templar": nothing to add — the sheet already answers it
[reskin] inline declared: "the vow warden" — the call's own answer (kind), built from the name
[reskin] inline form: "the vow warden" — the model's own reading of the name
[reskin] lacks asked: "no magic at all"
[reskin] clauses: "a templar priest with a mace" -> has (mechanical) [asked: attack] | "no magic at all" -> LACKS (mechanical)
[reskin] signature idea (action): "When a foe tries to slip past the warden toward anyone behind it, the warden swings its mace into the opening and plants the blow — the would-be runner is stopped dead in its tracks and shoved back to where it started, its stride broken. The warden can do this only so many times before the openings in its guard run dry, so it saves the punishment for whoever is closest to breaking the line." [reaction/on_being_hit/movement] — menu: riposte (+ shelf: seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, stunning-strike, charge-push, hook-rider)
[reskin] decline reason: action — the call answered none and names it "no_fit"
[reskin] signature miss: action — "When a foe tries to slip past the warden toward anyone behind it, the warden swings its mace into the opening and plants the blow — the would-be runner is stopped dead in its tracks and shoved back to where it started, its stride broken. The warden can do this only so many times before the openings in its guard run dry, so it saves the punishment for whoever is closest to breaking the line." [reaction/on_being_hit/movement] — the model found no template that holds it (offered: riposte, own-turn-punisher)
[reskin] fallback stands down: the class_npc path has no shelf — the Priest's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 19 already beats print's AC 15 at CR 6, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "The warden fights from behind its shield, and anyone who strikes it draws a bruising answer from the mace in the same breath — the shield takes the blow, and the mace repays it. It never yields ground; it only trades." [trait/on_being_hit/damage] — menu: absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura)
[reskin] signature miss: trait — "The warden fights from behind its shield, and anyone who strikes it draws a bruising answer from the mace in the same breath — the shield takes the blow, and the mace repays it. It never yields ground; it only trades." [trait/on_being_hit/damage] — no template on the shelf shares a verb with the concept or the idea (offered: absorption, bloodied-burst, resonant-body, weapon-lodge, false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura)
[reskin] weapons answered: Mace = mace; Shield Bash = shield
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] print canon alignment: Lawful Neutral -> Neutral — the Priest's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common" -> "Common plus one other language" — the Priest's
[reskin] print canon row: Actions/Spellcasting — the Priest's own
[reskin] print canon row: Bonus Actions/Divine Aid (3/Day) — the Priest's own
audit finding below confidence gate: Divine Aid Dispel Magic is a 3rd-level spell with no listed level in a feature that otherwise names cantrips and 1st-level spells; whether it is cast at 3rd level or a higher slot is not specified, and the ability text does not state the spell level, leaving the GM unable to adjudicate an upcast.
[reskin] spellcasting dc: "Spellcasting" prints spell save DC 14 — 8 + PB + Wisdom (print carries it in 45 of 48 rows)
[reskin] lacks clause: Actions/"Spellcasting" leaves — "no magic at all"
[reskin] dead wildcard name swept — "Divine Aid (3/Day)" was only about "Spellcasting"; the row drops
```


---


### Requiem Swarm — in the run

**Concept:** a swarm of funeral bells that ring themselves over the dying

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Requiem Swarm | 13 | swarm-9 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- **dropped clause:** "ring themselves over the dying"
- read: def 10 / off 15 → 12.5; sustained 90 (1 × Bell Swarm); nova none; dmg 90

```
Requiem Swarm

Medium Swarm of Tiny Constructs, Unaligned

AC 15
Initiative +5 (15)

HP 178 (21d8 + 84)

Speed 30 ft., Fly 30 ft. (hover)

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

Senses blindsight 30 ft.; Passive Perception 10

Languages Understands the languages of its creator but can't speak

CR 13 (XP 10,000; PB +5)

Traits

Swarm. The swarm can occupy another creature's space and vice versa, and the swarm can move through any opening large enough for a Tiny creature. The swarm can't regain Hit Points or gain Temporary Hit Points.

Actions

Bell Swarm. Melee Attack Roll: +10, reach 5 ft. 54 (11d8 + 5) Slashing damage plus 36 (8d8) Thunder damage, or 27 (6d8) Slashing damage plus 18 (4d8) Thunder damage if the swarm is Bloodied.

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

- Traits/Swarm — the chassis
- Actions/Bell Swarm — the chassis

**Engine trace**

```
[path] homebrew — "a swarm of funeral bells that ring themselves over the dying" (call)
[route] swarm type=Construct mechanics=aura — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: on the GM's own words "a swarm of funeral bells" | holds: the call reads none in these words | swarm: ✓ ("a swarm of funeral bells") | swarm: no line key in the words — the model's read of its quote
[concept] name: provided_name rejected — "a swarm of funeral bells that ring thems…" is the description, not a name
[concept] hints: swarm→body ✓ ("a swarm of funeral bells")
[concept] resolve: archetype=swarm type=Construct themes=grave/forged mind=mindless style=— energy=Thunder mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: aura
[concept] signature elements: bells that ring themselves over the dying [behavior] | a swarm of iron handbells [body] | the tolling funeral dirge [aura]
[concept] identity: A churning clot of iron handbells and clappers, the swarm descends on anyone at the edge of death and rings them a funeral knell, drowning them in a wall of clamor while its bronze edges flay at flesh. Each round it presses closer, hammering the dying with concussive chimes and bloody peals until it is struck down to half its bells — then it scatters into two lesser choirs, both continuing the dirge. It never flees a death it can attend; it fights until the last bell is shattered.
[concept] lore: Forged in the belfry of a plague-sacked monastery and fed on last rites left unsung, the bells seek out the dying so that every soul may have the funeral it was denied.
[reskin] body type: swarm — the body outranks the role (recorded: swarm)
[reskin] donor: swarm-9 -> CR 13 (invented — no printed peer)
[reskin] [path] decides: homebrew (the matcher agrees)
[reskin] repair round 1: 1 defect(s) — name "Bell Swarm" repeats the creature's own name — the sheet already says who acts; give the row its own word
[reskin] swarm type stamped: Construct -> Swarm of Tiny Constructs
[reskin] alignment by body: Neutral -> Unaligned — a Constructs at INT 4 (print: Oozes 4/4 Unaligned; every Construct at INT 3 or less, 7/7; the first aligned one is the Flesh Golem at INT 6)
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline declared: "the requiem swarm" — the call's own answer (kind), built from the name; the rules would have said "the swarm"
[reskin] inline on kit rows: "the requiem swarm" -> "the swarm"
[reskin] inline form: "the requiem swarm" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a swarm of funeral bells" -> has (descriptive), head | "ring themselves over the dying" -> has (mechanical)
[reskin] menu pruned: action — obstacle-pull, pacify, escalating-dread, terror-pulse, snare-bolt, slow-bolt, sensory-strike, disarm, thrown-burst-seed, drain, zone-seed, blighted-ground, delayed-brand, aggro-curse, self-invisibility, focus, feint-slip, coating, phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The swarm picks out every creature near death within earshot and rings them a private funeral knell, a chime that follows them no matter where they run across the battlefield. The closer a body is to its last breath, the harder the bells hammer it, and the knell keeps sounding each round until the creature is beyond dying's reach or the bells are silenced." [action/save/damage] — menu: trample, thrown-burst, gaze-single, snare, execute, seal, shield-bash, wail, lure, active-toll, random-ray, ground-burst, spew (+ shelf: patient-defense, second-wind, riposte, contagion, stunning-strike, charge-push, hook-rider, pounce, isolation, charge)
[reskin] signature bound to the concept's verb: action — active-toll (ring, bell)
[reskin] decline reason: action — the call answered none and names it "no_fit" after being shown active-toll, which the GM's words keyed
[reskin] key match declined: action — "active-toll" was ranked first on the call's own menu for ring+bell, and the call read it as no fit; the words keep their claim and nothing is forced
[reskin] signature miss: action — "The swarm picks out every creature near death within earshot and rings them a private funeral knell, a chime that follows them no matter where they run across the battlefield. The closer a body is to its last breath, the harder the bells hammer it, and the knell keeps sounding each round until the creature is beyond dying's reach or the bells are silenced." [action/save/damage] — the model found no template that holds it (offered: active-toll, trample, thrown-burst, gaze-single, snare, execute, seal, shield-bash, wail, lure, random-ray, ground-burst, spew)
[reskin] signature idea (trait): "The swarm's bells are bound to the act of dying: whenever a creature within earshot drops to its last breath, the nearest bells break away from the swarm to attend that death, splitting a lesser choir off to follow the dying one. If the dying creature is healed beyond its last breath, that choir abandons it and rings its way back into the greater swarm." [trait/always/resource] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature bound to the concept's verb: trait — bloodied-burst (ring, bell, dying, the dying)
[reskin] word match declined by the call: bloodied-burst, death-burst, resonant-body, bound, relentless-pursuit — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit" after being shown bloodied-burst, which the GM's words keyed
[reskin] key match declined: trait — "bloodied-burst" was ranked first on the call's own menu for ring+bell+dying+the dying, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: trait — "The swarm's bells are bound to the act of dying: whenever a creature within earshot drops to its last breath, the nearest bells break away from the swarm to attend that death, splitting a lesser choir off to follow the dying one. If the dying creature is healed beyond its last breath, that choir abandons it and rings its way back into the greater swarm." [trait/always/resource] — the model found no template that holds it (offered: bloodied-burst, false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst, resonant-body)
[reskin] concept-first trait skipped: bloodied-burst — the call read its match as a collision (the word is a modifier, or the sheet already answers it)
[reskin] concept-first trait skipped: resonant-body — the call read its match as a collision (the word is a modifier, or the sheet already answers it)
[reskin] repair: 1 clause(s) with no row — "ring themselves over the dying"; one targeted call with the sheet as context
[reskin] repair: the answer held no rows — the clauses stay unplaced
[reskin] weapons answered: Bell Swarm = none
[reskin] speed by concept: dropped Climb 30 ft. — the concept's movement set decides
[reskin] languages by mind: "None" -> "Understands the languages of its creator but can't speak" (mindless)
[reskin] immunities stamped for type: Swarm of Tiny Constructs + donor suite -> Poison; Charmed, Exhaustion, Frightened, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained, Stunned
[reskin] resistances derived: Bludgeoning, Piercing, Slashing
[reskin] audit rename blocked — "Ringing Rush" promises movement that "Bell Swarm" does not deliver
```


---


### Squallwing Drake — in the run

**Concept:** a young storm drake whose breath is a rolling wall of thunder

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Squallwing Drake | 7 | dragon-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- **dropped clause:** "a young storm drake whose breath is a rolling wall of thunder"
- read: def 5 / off 7 → 6; sustained 35 (1 × Claw); nova Thunder Wall 39; dmg 49

```
Squallwing Drake

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

Senses blindsight 30 ft., darkvision 120 ft.; Passive Perception 14

Languages Common, Draconic

CR 7 (XP 2,900; PB +3)

Actions

Claw. Melee Attack Roll: +7, reach 5 ft. 22 (4d8 + 4) Slashing damage plus 13 (3d8) Thunder damage.

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

- Actions/Claw — the chassis
- Actions/Thunder Wall — the chassis

**Engine trace**

```
[path] homebrew — "a young storm drake whose breath is a rolling wall of thunder" (call)
[route] dragon type=Dragon mechanics=breath — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | dragon: ✓ ("young storm drake") | dragon: key "drake" (class body)
[concept] hints: dragon→body ✓ ("a young storm drake") | breath→mechanics ✓ ("breath is a rolling wall of thunder")
[concept] resolve: archetype=dragon type=Dragon themes=draconic/breath mind=sapient style=— energy=Thunder mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: breath
[concept] signature elements: rolling wall of thunder breath [behavior] | storm-scaled, lightning-quick body with thunderous wings [body] | shell of rolling pressure and noise it makes and hides in [aura]
[concept] identity: The young storm drake opens a fight by gliding low and exhaling a hissing wall of thunder that rolls forward unbroken, forcing everything in its path to scatter or be bowled over. Every round after, it stoops through the rolling pressure it made, using the shell of noise to hide its approach before raking with claws and a whip-crack tail, and it is a vain, lightning-quick bully that toys with grounded prey from above. Bloodied, it climbs the sky and circles in storm-driven fury rather than flee, hurling itself back into the cloud-wall it made.
[concept] lore: Hatched in the churning squall-lines above broken peaks, a young storm drake claims a stretch of mountain sky as its storm-kingdom and rolls its thunder-wall across the valleys to remind every ground-dweller who owns the weather.
[reskin] body type: dragon — the body outranks the role (recorded: dragon)
[reskin] nova capped: "Breath Weapon" 42 → 39 (the chassis nova obeys the cap: 39 at CR 7)
[reskin] donor: dragon-2 -> CR 7
[reskin] [path] decides: homebrew (the matcher agrees)
[reskin] name_element answered: Squallwing Drake = imagery
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline declared: "the squallwing drake" — the call's own answer (kind), built from the name
[reskin] inline form: "the squallwing drake" — the model's own reading of the name
[reskin] save dc derived: DC 14 -> 15 (8 + PB 3 + the sheet's best 4) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a young storm drake whose breath is a rolling wall of thunder" -> has (mechanical) [asked: save_area]
[reskin] menu pruned: action — aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain (the sheet cannot render them)
[reskin] signature idea (action): "The drake folds its wings and stoops through its own rolling wall of thunder, vanishing inside the noise until it bursts out low and close. While it rides the shell this way, the booming pressure smothers the air around it, so anyone who tries to track or intercept it has their senses swamped by the roar until it strikes." [bonus_action/always/movement] — menu: rampage, lay-on-hands, second-wind (+ shelf: gaze-single, snare, zone, execute, seal, shield-bash, lure, affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, charge)
[reskin] signature miss: action — "The drake folds its wings and stoops through its own rolling wall of thunder, vanishing inside the noise until it bursts out low and close. While it rides the shell this way, the booming pressure smothers the air around it, so anyone who tries to track or intercept it has their senses swamped by the roar until it strikes." [bonus_action/always/movement] — no template on the shelf shares a verb with the concept or the idea (offered: rampage, lay-on-hands, second-wind, gaze-single, snare, zone, execute, seal, shield-bash, lure, affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, charge)
[reskin] signature idea (trait): "Its body throws off the storm it carries. Whenever it is struck in close combat, a whip-crack of thunder lashes back along the attacker's arm, staggering them and leaving their ears ringing; the harder they hit, the louder the crack answers." [trait/on_being_hit/damage] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst)
[reskin] signature bound to the concept's verb: trait — heated-body (storm)
[reskin] word match declined by the call: heated-body, bloodied-burst, aberrant-ground — the key word does not mean the mechanic here
[reskin] trait declined: "Thunder Retort" — bound only on the idea's own words (ring:idea) with no key in the concept; a meat body earns its trait by the user's verb (the sniper's tracker, critic 2026-09-29)
[reskin] weapons answered: Claw = none; Thunder Wall = none; Pressure Bowls-Over = none
[reskin] chassis nova: "Thunder Wall (Recharge 5-6)" — the dragon-2's own nova row (its "Breath Weapon", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] element immunity: Thunder (merged into the header write)
[reskin] dragon senses raised to tier: blindsight 30 added
[reskin] dragon senses raised to tier: darkvision 60 -> 120
[reskin] dragon languages: Draconic added (42/42 print dragons speak it)
[reskin] immunities stamped for type: Dragon -> Thunder
audit finding below confidence gate: Thunder Wall Constitution save or half on a Cone is fully adjudicable; no defect — but the entry has no range/placement beyond the cone origin, which is fine for a self-originating cone. (No finding.)
```


---


### Wellbottom — in the run

**Concept:** name: the thing in the well | 

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Wellbottom | 5 | lurker-5-trap | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 5 / off 5 → 5; sustained 38 (2 × Brine Surge); nova none; dmg 38

```
Wellbottom

Large Aberration, Neutral

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

Senses darkvision 60 ft.; Passive Perception 16

Languages None

CR 5 (XP 1,800; PB +3)

Traits

Acrid Exudation. A creature that touches the wellbottom or hits it with a melee attack while within 5 feet of it takes 5 (1d10) Acid damage.

Actions

Multiattack. The wellbottom makes two Brine Surge attacks. It can replace one attack with a use of Convulsing Basin.

Brine Surge. Melee Attack Roll: +6 (with Advantage if the target is Grappled by the wellbottom), reach 5 ft. 12 (2d8 + 3) Bludgeoning damage plus 7 (2d6) Acid damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 14).

Convulsing Basin. Strength Saving Throw: DC 14, one creature within 30 feet that has the Grappled condition. Failure: 36 (8d8) Acid damage. Success: Half damage.

Bonus Actions

False Form. The wellbottom shape-shifts to resemble an ordinary object or fixture of the place it waits in while retaining its game statistics, or it returns to its true form. While it is motionless in its false form, it is indistinguishable from that feature.

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
- Actions/Brine Surge — the chassis
- Actions/Convulsing Basin — template condition-payoff; library draw (seed unstamped)
- Bonus Actions/False Form — the chassis
- Traits/Acrid Exudation — template heated-body; library draw (seed unstamped); binds the GM's words: burn+touch

**Engine trace**

```
[path] homebrew — "the thing in the well" (call)
[route] lurker-trap type=Aberration mechanics=grapple — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | lurker-trap: ✓ ("the thing in the well") | lurker-trap: no line key in the words — the model's read of its quote
[concept] name: provided_name rejected — "the thing in the well" is written in lowercase inside a description; the generator names it
[concept] resolve: archetype=lurker type=Aberration themes=aquatic/devouring mind=mindless style=trap energy=Acid mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: grapple
[concept] signature elements: disguised as the well's still, clean water [aura] | sudden engulfing surge of brine and torsion [behavior] | dissolving, crushing salt-drowned digestion [body]
[concept] identity: The thing in the well does not lurk in the well — it is the well's bottom, a slick brine-wet mass of false masonry and folded flesh that reads as cold black water and settled stones until a bucket or a reaching hand breaks its surface. It erupts in a single violent surge of brine and torsion, hauling prey down into its basin to crush and dissolve, then sinks back into perfect stillness among the stones to wait, patient and utterly unmoved by a struggle. It is a patient ambusher that never pursues, never negotiates, and holds its shape until the water runs red, treating every thrashing victim as simply more of the tide it swallows.
[concept] lore: A thing that seeped up from the lightless drowned depths beneath an old well and settled into its basin, dooming every village that thinks the water clean and the shaft merely deep.
[reskin] donor: lurker-5-trap -> CR 5
[reskin] row gated out: Swallow (engulf) — the concept did not claim this mechanic
[reskin] [path] decides: homebrew (the matcher agrees)
[reskin] reach folded: "Grasping Limb" (reach 50) and Reel leave — no tether in the concept; the grapple rides "Melee Attack" (the Giant Crab's shape)
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline declared: "the wellbottom" — the call's own answer (kind), built from the name
[reskin] inline form: "the wellbottom" — the model's own reading of the name
[reskin] save dc derived: DC 13 -> 14 (8 + PB 3 + the sheet's best 3) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "the thing in the well" -> has (descriptive), head
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "When the wellbottom strikes a creature it already has hold of, it doesn't just grip harder — its whole basin convulses, churning the brine inside it. The victim is dragged down against its will and slammed against the false stone and folded flesh that makes up the creature's interior, its body wracked and its breath soaked in stinging brine. The creature then settles once more, only the ripples sh" [action/save/movement] — menu: leap, condition-payoff, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, terror-pulse, snare-bolt, slow-bolt, sensory-strike, drain, zone-seed, exploiter, blighted-ground (+ shelf: delayed-brand, patient-defense, self-invisibility, focus, feint-slip, coating, riposte, stunning-strike, charge-push, hook-rider, pounce, isolation)
[reskin] word match declined by the call: spew, slow-bolt — the key word does not mean the mechanic here
[reskin] value check: "Convulsing Basin" EV 27.9 vs floor 23.4 (one attack of 2) — worth the trade
[reskin] signature template: condition-payoff -> Actions/"Convulsing Basin" ("the wellbottom strikes a creature it already has hold of, its basin convulsing t [shape fit, no verb match]")
[reskin] signature idea (trait): "Anything that touches or strikes the wellbottom's brine-wet mass comes away soaked in the filth it has been steeping in. The clinging brine keeps burning after the blow lands, and the shape holding its disguise is briefly betrayed by the spreading stain." [trait/on_being_hit/damage] — menu: heated-body, absorption, bloodied-burst, resonant-body (+ shelf: adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, evasion, relentless-pursuit, bound, marking-light, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] word match declined by the call: absorption, adhesive, spider-climb, aberrant-ground — the key word does not mean the mechanic here
[reskin] seat owes nothing: the trap line was the model's read of its quote, not a key in the words (a hermit was handed Assassinate, day-one 2026-09-30)
[reskin] signature template (trait): heated-body -> Traits/"Clinging Brine" ("The brine-wet mass burns any creature that touches it or strikes it in melee, de [verb: burn:idea, touch:idea]")
[reskin] weapons answered: Brine Surge = none
[reskin] multiattack replacement clause: It can replace one attack with a use of Convulsing Basin.
audit finding below confidence gate: Brine Surge The Grapple has an escape DC, which is fine, but note the trigger only restricts Size; however the real issue is that the grapple is applied unconditionally on a hit with no rider stating the condition ends if the wellbottom is incapacitated or moves.
audit finding below confidence gate: Convulsing Basin Convulsing Basin requires a grappled target, but the only grapple source is Brine Surge (melee, reach 5 ft.); this is internally consistent, though nothing prevents the GM from wondering whether it can target a creature grappled by anything else — the entry should specify 'Grappled by the wellbottom'.
[reskin] audit rename: "Clinging Brine" -> "Acrid Exudation"
```


---


### Unresting Boneblade — in the run

**Concept:** a skeleton with a greatsword

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Unresting Boneblade | 6 | brute-5 | ok | ok | SOFT: reach | ok | ok | ok | ok | ok | ok | ok |

- structure · soft · reach: Actions/Greatsword: reach 10 on a Medium body with no tether word
- read: def 4 / off 6 → 5; sustained 44 (2 × Greatsword); nova none; dmg 44

```
Unresting Boneblade

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

Great Weapon Master. When the boneblade hits a creature with its Greatsword, the attack deals an extra 3 damage.

Actions

Multiattack. The boneblade makes two attacks, using Greatsword or Shortbow in any combination.

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
[path] twist — Skeleton (is) — "a skeleton" (call)
[route] brute type=Undead mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | brute: ✓ ("a skeleton with a greatsword") | brute: no line key in the words — the model's read of its quote
[concept] resolve: archetype=brute type=Undead themes=grave/armed mind=mindless style=— energy=Necrotic mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: greatsword sweeps under skeletal strength [object] | relentless, fearless advance of the reanimated dead [behavior] | bone frame stripped of flesh [body]
[concept] identity: It strides into reach with its greatsword held high and opens with a sweeping cleave meant to catch two foes in one arc, then settles into a steady rhythm of heavy overhead chops that trade blows rather than evade. Driven only by the will bound into its frame, it never routs and never toys — it closes on the nearest living thing and keeps swinging until it or its target is broken, shambling forward even as its bones crack.
[concept] lore: Raised from a battlefield's unburied dead by a necromancer who needed a blade arm that would never tire, it still guards a battle long ended, seeking the foe whose death would let it finally rest.
[reskin] print canon array: STR 18, DEX 16, CON 15, INT 6, WIS 8, CHA 5 — the Skeleton's, STR fitted to +7
[reskin] donor: brute-5 -> CR 6
[reskin] [path] decides: twist on the Skeleton (the matcher agrees)
[reskin] print canon: "a skeleton with a greatsword" heads on the Skeleton — print's rows ride along; the seat stays
[reskin] named parts: Greatsword (slot) — the user's words, the engine's numbers
[reskin] named parts landed: 1 attack row(s), 0 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline declared: "the boneblade" — the call's own answer (kind), built from the name
[reskin] inline form: "the boneblade" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a skeleton with a greatsword" -> has (mechanical) [asked: attack]
[reskin] signature idea (action): "The boneblade lunges into the next stretch of ground with its greatsword low, then wrenches the blade upward in a wide rising arc. Every living foe caught in the arc is flung off its feet and thrown back a few paces, clearing the boneblade's path to keep pressing forward. It can do this only so often before its frame must reset its stance." [action/save/movement] — menu: trample, leap, thrown-burst, throw-retrieve, shield-bash, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up (+ shelf: rampage, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, charge)
[reskin] signature miss: action — "The boneblade lunges into the next stretch of ground with its greatsword low, then wrenches the blade upward in a wide rising arc. Every living foe caught in the arc is flung off its feet and thrown back a few paces, clearing the boneblade's path to keep pressing forward. It can do this only so often before its frame must reset its stance." [action/save/movement] — no template on the shelf shares a verb with the concept or the idea (offered: trample, leap, thrown-burst, throw-retrieve, shield-bash, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, rampage, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, charge)
[reskin] fallback stands down: the twist path has no shelf — the Skeleton's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "Whenever the boneblade lands a heavy blow, splinters of its own shattered bone spray out with the strike, lodging in the wound and gnawing briefly at the victim's flesh with lingering necrotic rot. Foes it wounds are left bleeding and slowed in their retreat from it." [trait/always/damage] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending, weapon-lodge)
[reskin] word match declined by the call: bloodied-burst, noxious-aura, bloodied-fury, death-burst, heated-body, weapon-lodge — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "Whenever the boneblade lands a heavy blow, splinters of its own shattered bone spray out with the strike, lodging in the wound and gnawing briefly at the victim's flesh with lingering necrotic rot. Foes it wounds are left bleeding and slowed in their retreat from it." [trait/always/damage] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst, bloodied-burst, heated-body, weapon-lodge)
[reskin] weapons answered: Greatsword = greatsword; Hurlblade = none
[reskin] weapon declined: "Hurlblade" reads longsword from its name, but the call answered none — the row carries no weapon
[reskin] print canon alignment: Neutral -> Lawful Evil — the Skeleton's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "None" -> "Understands Common plus one other language but can't speak" — the Skeleton's
[reskin] print canon speed: 40 ft. -> 30 ft. — the Skeleton's walk; the concept's other modes stay
[reskin] print canon attack: "Hurlblade" -> "Shortbow" — the Skeleton's own ranged row
[reskin] immunities stamped for type: Undead -> Poison; Exhaustion, Poisoned
[reskin] print canon defenses: vulnerabilities none -> Bludgeoning — the Skeleton's own header lines
[reskin] vulnerability rejected — "Bludgeoning" has no warrant in the concept's own text (print's default is none)
audit finding below confidence gate: Great Weapon Master The trigger is fuzzily worded (is the 3 damage dealt per hit or once whenever it hits?) and ties to a feat whose actual mechanic has no counterpart here, so a GM can't quickly tell if this is once-per-turn or on every Greatsword hit.
[reskin] multiattack re-read — "Shortbow" joins the combination; "The boneblade makes two attacks, using Greatsword or Shortbow in any combination."
```


---


---

## Review batch — classes-eight-2026-10-19T15-34-38

The checker ran first. The gate table covers every block in the run; every block of the run follows. Each block carries its checker row above and its engine trace below. Hand-derive against the row first; then read for what predicates can't see.

### Gate table — the whole run

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Open-Palmed Adept | 5 | 2024 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 6/6 |
| Vexia Emberhorn | 5 | 2024 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 5/5 |
| Dame Oriel | 5 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |
| Harrowic Vane | 6 (2014) | 2014 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |
| Rockscar Radrik | 8 | 2024 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 6/6 |
| Vareth Solmane | 6 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok | ok | soft (1) | 1/1 | 5/5 |
| Ser Aldous Wrack | 4 | 2024 | defender-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 3/3 |
| Halfstep Counselor | 6 | 2024 | caster-6 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |
| Thurivald | 6 (2014) | 2014 | defender-5 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok | ok | soft (1) | 1/1 | 5/5 |
| Oathbound Battlematron | 8 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok | ok | soft (1) | 2/2 | 5/6 |
| Kageyama | 5 | 2024 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 5/5 |
| Timberland Alpha | 3 | 2024 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 2/2 |
| Under-Maze Herder | 6 | 2024 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 2/3 |
| Ser Bramwell Rook | 7 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/3 |

**Dropped 2 of 17 user clauses** (coverage 88%); concept share 97% (59/61 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- none



---


### Timberland Alpha — lowest CR

**Concept:** a dire wolf that hunts in a pack

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Timberland Alpha | 3 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- **dropped clause:** "hunts in a pack"
- read: def 1 / off 3 → 2; sustained 24 (2 × Bite); nova none; dmg 24

```
Timberland Alpha

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

Pack Tactics. The alpha has Advantage on an attack roll against a creature if at least one of the alpha's allies is within 5 feet of the creature and the ally doesn't have the Incapacitated condition.

Actions

Multiattack. The alpha makes two Bite attacks.

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
[concept] resolve: archetype=skirmisher type=Beast themes=bestial mind=bestial style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: pack tactics and coordinated encirclement [behavior] | hit-and-run lunges that peel away after each strike [behavior] | thick grey hunting hide and bone-crushing jaws [body]
[concept] identity: A dire wolf that opens by shadowing a lone target at the edge of the pack's spread, then closes in a coordinated rush — one wolf driving, the others cutting off the escape line — before peeling away again to reset the ring. Each round it circles, feints, and lunges for hamstring and throat in turn, using its packmates' bodies as moving cover, so prey can never face the whole pack at once. It does not fight to the death: bloodied, it breaks off and regroups with the pack just out of reach, harrying the wounded until they stumble.
[concept] lore: Dire wolves of the deep timber run in family packs that parcel out hunting ground like a lord parcels out land, and they regard any traveler crossing their range as trespass to be run down and shared.
[reskin] print canon array: STR 17, DEX 16, CON 15, INT 3, WIS 12, CHA 7 — the Dire Wolf's, DEX fitted to +5
[reskin] donor: skirmisher-3 -> CR 3
[reskin] [path] decides: twist on the Dire Wolf (the matcher agrees)
[reskin] print canon: "a dire wolf that hunts in a pack" heads on the Dire Wolf — print's rows ride along; the seat stays
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline declared: "the alpha" — the call's own answer (kind), built from the name
[reskin] inline form: "the alpha" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a dire wolf" -> has (descriptive), head | "hunts in a pack" -> has (descriptive)
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "When the alpha strikes a foe that any of its packmates are menacing from another side, it lunges for the hamstring and drags the prey down, leaving it sprawled and helpless while the pack closes the ring. The victim is pinned flat where it stands, unable to rise while the wolves work it over, and the alpha uses that moment to peel away and reset rather than commit." [rider/on_hit/condition] — menu: affliction, contagion, charge-push, hook-rider, pounce, isolation, charge (+ shelf: trample, leap, gaze-single, snare, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, riposte)
[reskin] signature bound to the concept's verb: action — focus (hunt)
[reskin] word match declined by the call: hook-rider, sensory-strike, charge-push, charge — the key word does not mean the mechanic here
[reskin] signature miss: action — "When the alpha strikes a foe that any of its packmates are menacing from another side, it lunges for the hamstring and drags the prey down, leaving it sprawled and helpless while the pack closes the ring. The victim is pinned flat where it stands, unable to rise while the wolves work it over, and the alpha uses that moment to peel away and reset rather than commit." [rider/on_hit/condition] — the model picked "pounce" (no verb, and it quotes nothing the GM typed) over a concept-verb template (focus)
[reskin] fallback respects the call: sensory-strike left the shelf — the call declined it for this sheet
[reskin] fallback stands down: the twist path has no shelf — the Dire Wolf's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 15 already beats print's AC 13 at CR 3, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "The alpha reads the pack's hunt as one body: whenever an ally is engaging prey nearby, its own rushes come faster and its bite finds the throat more readily. Alone and unsupported, its ferocity fades and it fights like any other wolf." [trait/always/damage] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature bound to the concept's verb: trait — faultless-tracker (hunts, hunted)
[reskin] word match declined by the call: faultless-tracker, relentless-pursuit — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit" after being shown faultless-tracker, which the GM's words keyed
[reskin] key match declined: trait — "faultless-tracker" was ranked first on the call's own menu for hunts+hunted, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: trait — "The alpha reads the pack's hunt as one body: whenever an ally is engaging prey nearby, its own rushes come faster and its bite finds the throat more readily. Alone and unsupported, its ferocity fades and it fights like any other wolf." [trait/always/damage] — the model found no template that holds it (offered: faultless-tracker, false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] concept-first trait skipped: faultless-tracker — the call read its match as a collision (the word is a modifier, or the sheet already answers it)
[reskin] weapons answered: Bite = none
[reskin] languages held: None stands — INT 3 on a Beast speaks nothing, whatever the mind read said
[reskin] print canon trait: Pack Tactics — "a dire wolf that hunts in a pack" is the Dire Wolf (print's own row)
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the seat's, not the Dire Wolf's
[reskin] print canon: chassis row leaves — Traits/"Pack Shadow" is the seat's, not the Dire Wolf's
```


---


### Oathbound Battlematron — highest CR

**Concept:** an oathsworn crusader who smites the unclean and mends her soldiers

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Oathbound Battlematron | 8 | defender-5 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok | ok |

- donor · soft · print-rows: rows outside print, the named seat and the keyed seeds: Traits/Guard Aura
- read: def 7 / off 8 → 7.5; sustained 54 (2 × Longsword); nova none; dmg 54

```
Oathbound Battlematron

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

Aura of Authority. While in a 10-foot Emanation originating from the battlematron, the battlematron and its allies have Advantage on attack rolls and saving throws, provided the battlematron doesn't have the Incapacitated condition.

Guard Aura. While in a 10-foot Emanation originating from the battlematron, the battlematron's allies have Advantage on saving throws, provided the battlematron doesn't have the Incapacitated condition.

Actions

Multiattack. The battlematron makes two Longsword attacks. It can replace one attack with a use of Shield Bash.

Longsword. Melee Attack Roll: +8, reach 5 ft. 27 (5d8 + 5) Slashing damage.

Shield Bash. Strength Saving Throw: DC 16, one creature within 5 feet that the battlematron can see. Failure: 27 (6d8) Bludgeoning damage. If the target is a Medium or smaller creature, it has the Prone condition. Success: Half damage only.

Bonus Actions

Lay on Hands (2/Day). The battlematron touches a creature within 5 feet of itself and restores 27 (6d8) Hit Points to it.

Divine Smite (2/Day). The battlematron charges its next strike: the first time it hits with an attack before the end of its next turn, the target takes an extra 14 (4d6) Radiant damage.

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
- Traits/Guard Aura — the chassis
- Actions/Multiattack — the chassis
- Actions/Longsword — print's own row, renamed; weapon longsword
- Actions/Shield Bash — print's own row
- Bonus Actions/Lay on Hands — template lay-on-hands; paladin kit; the GM's clause "mends her soldiers"
- Bonus Actions/Divine Smite — template coating; paladin kit; the GM's clause "smites the unclean"; energy Radiant

**Engine trace**

```
[path] class_npc — class paladin — "crusader" (call)
[route] caster-warpriest (artillery) type=Humanoid mechanics=aura — casts: implied by the kind — "smites the unclean and mends her soldier" | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | caster-warpriest: ✓ ("smites the unclean and mends her soldier") | caster-warpriest: key "smites" (class verb)
[concept] hints: warpriest→style ✓ ("oathsworn crusader who smites")
[concept] resolve: archetype=caster type=Humanoid themes=celestial/armed mind=sapient style=warpriest energy=Radiant mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: aura
[concept] signature elements: smiting the unclean with holy-charged strikes [behavior] | mending her soldiers with battlefield prayers [behavior] | oath-forged iron armor and warhammer [object]
[concept] identity: An oathsworn crusader opens a fight by advancing into the thickest enemy knot, smiting the unclean with a holy-charged warhammer while calling out her oath as a battlefield prayer; every round after she alternates smite and mending, layering healing light onto her wounded soldiers and pressing the front line where her banner flies. She fights with unbroken discipline to the death, refuses to abandon a fallen comrade, and grows more zealous the bloodier the ground gets.
[concept] lore: She swore her oath at a battlefield shrine and took its banner into her own flesh, bound now to crusade against everything unholy until her last soldier falls or the unclean are scoured from the land.
[reskin] energy withheld: Radiant on a Humanoid with no Radiant in the concept's own words (fixed phrases read first)
[reskin] [path] class body: the paladin stands on the Gladiator — the class's own print block, nearest CR 8
[reskin] print canon route: the Gladiator is not a caster first and keys STR 18 over DEX 15 — it casts no spells — the caster family stands down for the plain defender line
[reskin] print canon array: STR 20, DEX 15, CON 16, INT 10, WIS 12, CHA 15 — the Gladiator's, STR fitted to +8
[reskin] donor: defender-5 -> CR 8
[reskin] style unserved: "warpriest" has no defender line — the plain line ships (resolve's style signal is noisy; not re-routed)
[reskin] [path] decides: class_npc on the Gladiator · class paladin (the matcher would have said homebrew)
[reskin] print canon: "an oathsworn crusader who smites the unclean and mends her soldiers" heads on the Gladiator — print's rows ride along; the seat stays
[reskin] repair round 1: 1 defect(s) — renames for "Melee Attack" and "Hybrid Attack" are both "Warhammer" — every row needs its own name (give the thrown twin its own word: Scythe / Hurled Scythe)
[reskin] repair round 2: 1 defect(s) — no damage type for "Hurled Scythe"
[reskin] kit energy: "Divine Smite" deals Radiant, not Bludgeoning — the shape's own fiction
[reskin] class kit: paladin — "crusader": Aura of Authority (Hobgoblin Captain/Aura of Authority), Lay on Hands (2/Day) (lay-on-hands), Divine Smite (2/Day) (coating as Divine Smite)
[reskin] inline declared: "the battlematron" — the call's own answer (kind), built from the name; the rules would have said "Battlematron"
[reskin] inline on kit rows: "Battlematron" -> "the battlematron"
[reskin] inline form: "the battlematron" — the model's own reading of the name
[reskin] energy rider withheld: Radiant on a Humanoid with no Radiant in the concept's own words
[reskin] energy withheld on a base row: "Hurled Scythe" Radiant -> Piercing (the body's physical type; a Humanoid deals no Radiant its concept never gave it)
[reskin] save dc derived: DC 15 -> 16 (8 + PB 3 + the sheet's best 5) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "an oathsworn crusader" -> has (descriptive), head | "smites the unclean" -> has (mechanical) [asked: attack] | "mends her soldiers" -> has (mechanical) [asked: heal]
[reskin] menu pruned: action — snap-shot (the sheet cannot render them)
[reskin] signature idea (action): "When she strikes a foe that has already drawn blood this fight, her oath flares through the warhammer and the blow itself becomes a battlefield prayer: every ally who can see her sees the unclean reel, and their courage hardens into a surge of forward movement toward that enemy. She can only call this out so often before her voice and her arm need stillness to recover." [rider/on_hit/movement] — menu: stunning-strike, charge-push, hook-rider (+ shelf: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, patient-defense, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, riposte)
[reskin] signature bound to the concept's verb: action — rally (mend)
[reskin] word match declined by the call: curse-debt, obstacle-pull, herd, rally, stunning-strike — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit" after being shown rally, which the GM's words keyed
[reskin] key match declined: action — "rally" was ranked first on the call's own menu for mend, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: action — "When she strikes a foe that has already drawn blood this fight, her oath flares through the warhammer and the blow itself becomes a battlefield prayer: every ally who can see her sees the unclean reel, and their courage hardens into a surge of forward movement toward that enemy. She can only call this out so often before her voice and her arm need stillness to recover." [rider/on_hit/movement] — the model found no template that holds it (offered: rally, stunning-strike, charge-push, hook-rider, throw-retrieve, obstacle-pull, herd, curse-debt, second-wind, aggro-curse)
[reskin] fallback respects the call: coating (already on the sheet), rally, herd left the shelf — the call declined them for this sheet
[reskin] fallback stands down: the class_npc path has no shelf — the Gladiator's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 20 already beats print's AC 16 at CR 8, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "The oath branded into her flesh keeps her standing where her banner flies: while she holds the front line and has taken wounds, she refuses to fall, and each time an enemy draws her blood the oath burns hotter, tilting her next strike toward the one who spilled it." [trait/on_being_hit/damage] — menu: absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura)
[reskin] word match declined by the call: bloodied-burst, bloodied-fury, faultless-tracker, uncanny-sense — the key word does not mean the mechanic here
[reskin] trait declined: "Oath Unbroken" — bound only on the idea's own words (keeps her standing:idea) with no key in the concept; a meat body earns its trait by the user's verb (the sniper's tracker, critic 2026-09-29)
[reskin] weapons answered: Warhammer = warhammer
[reskin] print canon alignment: Lawful Good -> Neutral — the Gladiator's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon attack: "Spear" keeps print's hybrid frame — reach 5 ft. or range 20/60 ft. (the Gladiator's weapon is thrown)
[reskin] print canon attack: "Oathsworn Warhammer" -> "Spear" — the Gladiator's own row
[reskin] print canon rows: Hurled Scythe leave — the Gladiator has one melee row (Spear), and Multiattack reads print's
[reskin] print canon row priced: Shield Bash — dice 9 → 27
[reskin] print canon row: Actions/Shield Bash — the Gladiator's own
[reskin] multiattack re-read — "Spear" left; "Multiattack" now reads "The battlematron makes two attacks."
[reskin] class weapon: Actions/"Spear" -> "Longsword" — a paladin fights with a longsword, not the Gladiator's
[reskin] multiattack replacement clause: It can replace one attack with a use of Shield Bash.
[reskin] multiattack normalised: "The battlematron makes two Longsword attacks. It can replace one attack with a use of Shield"
```


---


### Open-Palmed Adept — a 2024 sheet

**Concept:** a lizardfolk monk who strikes pressure points with an open hand

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Open-Palmed Adept | 5 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- **dropped clause:** "strikes pressure points with an open hand"
- read: def 5 / off 7 → 6; sustained 48 (2 × Unarmed Strike); nova none; dmg 48

```
Open-Palmed Adept

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

Unarmed Strike. Melee Attack Roll: +6, reach 5 ft. 24 (4d6 + 3) Bludgeoning damage. Once on each of the adept's turns when it hits with this attack, the target is subjected to the following effect. Constitution Saving Throw: DC 13. Failure: The target has the Stunned condition until the end of the adept's next turn.

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
- Actions/Unarmed Strike — print's own row, renamed; a declared feature; the GM's clause "monk"
- Actions/Dart — print's own row, renamed; weapon dart
- Bonus Actions/Patient Defense — template patient-defense; monk kit; the GM's clause "monk"
- Bonus Actions/Cunning Action — print's own row

**Engine trace**

```
[path] refused: print_body "Lizardfolk" is not in the corpus
[path] class_npc — class monk — species lizardfolk — "monk" (call)
[route] skirmisher type=Humanoid mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | skirmisher: ✓ ("strikes pressure points with an open han") | skirmisher: no line key in the words — the model's read of its quote
[concept] name: provided_name rejected — "a lizardfolk monk who strikes pressure p…" is the description, not a name
[concept] resolve: archetype=skirmisher type=Humanoid themes=bestial/mind mind=sapient style=— energy=Poison mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: open-palm pressure-point strikes that numb and slow the body [behavior] | venomous claws and glands that steep its touch in toxin [body] | dart-in, dart-out circling at the edge of reach [behavior]
[concept] identity: A lizardfolk monk who reads an enemy's body like a map, opening with a whipping open-palm jab at a nerve cluster to numb the limbs before the real strikes land. Round after round it circles at the edge of reach, darting in for two or three precise pressure-point blows and slipping back out of retaliation range, patient and disciplined. Pressed and bloodied it withdraws cleanly rather than brawl, letting its foes' own deadened limbs and slowed reflexes buy the distance — but cornered with its back to stone it fights to the death, contemptuous of retreat.
[concept] lore: A student of a hidden lizardfolk pressure-point school, it hunts the swamp trails and temple steps it once trained on, disabling sentries and challengers alike to prove its open-hand form the equal of any blade.
[reskin] energy withheld: Poison on a Humanoid with no Poison in the concept's own words (fixed phrases read first)
[reskin] [path] class body: the monk stands on the Spy — the class's own print block, nearest CR 5
[reskin] print canon array: STR 10, DEX 16, CON 10, INT 12, WIS 14, CHA 16 — the Spy's, DEX fitted to +6
[reskin] donor: skirmisher-3 -> CR 5
[reskin] [path] decides: class_npc on the Spy · class monk (the matcher would have said homebrew)
[reskin] print canon: "a lizardfolk monk who strikes pressure points with an open hand" heads on the Spy — print's rows ride along; the seat stays
[reskin] row evicted for the cap: Traits/"Circling Step" (chassis filler) leaves so "Marsh Stride" fits — the cap evicts by priority, it does not refuse the newcomer
[reskin] species kit: lizardfolk — "monk": Hold Breath (Hydra/Hold Breath), Marsh Stride (terrain-walk, authored); Swim 30 ft.
[reskin] class kit: monk — "monk": Stunning Strike (stunning-strike, rides Open Palm), Patient Defense (patient-defense)
[reskin] inline declared: "the adept" — the call's own answer (kind), built from the name
[reskin] inline form: "the adept" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] asked field dropped: the call answered trigger "at_will" for "strikes pressure points with an open hand" but offered no quote
[reskin] asked field dropped: the call answered limit "at_will" for "strikes pressure points with an open hand" but offered no quote
[reskin] clauses: "a lizardfolk monk" -> has (descriptive), head | "strikes pressure points with an open hand" -> has (mechanical) [asked: attack]
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "When the adept strikes a foe it has already numbed, it seizes the opening and follows through — a single unbroken lightning exchange of precise open-hand blows — then is gone again, slipping back out to the edge of reach before the enemy can answer. It can only ride this opening once against any one opponent in a fight, and the window shuts the moment its target shakes off the numbness." [rider/on_hit/damage] — menu: charge-push, hook-rider, pounce, isolation, bolt-mark, charge (+ shelf: trample, leap, gaze-single, snare, condition-payoff, throw-retrieve, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, exploiter, rampage, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte)
[reskin] signature bound to the concept's verb: action — riposte (opening)
[reskin] fit declined: "Numbed Opening" — a print body takes only what the user's words ask; the call offered no quote, and the key table finds no verb either (the blacksmith's rally, critic-ten 2026-10-01)
[reskin] fallback stands down: the class_npc path has no shelf — the Spy's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 16 already beats print's AC 15 at CR 5, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "Its touch numbs as much as it wounds: the backs of its clawed hands carry a slow, spreading poison that deadens the limb it lands on, so anyone who takes a blow from those hands finds their own reflexes dragging for a while afterward — the adept's patient circling prey grows clumsier the longer the exchange runs." [trait/always/condition] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "Its touch numbs as much as it wounds: the backs of its clawed hands carry a slow, spreading poison that deadens the limb it lands on, so anyone who takes a blow from those hands finds their own reflexes dragging for a while afterward — the adept's patient circling prey grows clumsier the longer the exchange runs." [trait/always/condition] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst, bloodied-burst)
[reskin] weapons answered: Open Palm = none; Palm Wave = none
[reskin] weapon table: "Palm Wave" — range 30/90 ft. is not a print range; an unlisted thrown thing is 20/60, a hurled mass 60/240 (the critic's third species read)
[reskin] speed by body: a Humanoid walks 30 ft. (print's people; a hermit ran 50 — critic's audit 2026-10-02)
[reskin] speed by concept:  — the concept's movement set decides
[reskin] print canon alignment: Lawful Neutral -> Neutral — the Spy's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Draconic, Common" -> "Common plus one other language, Draconic" — the Spy's plus the concept's Draconic
[reskin] print canon attack: "Open Palm" -> "Shortsword" — the Spy's own row
[reskin] print canon attack: "Palm Wave" -> "Hand Crossbow" — the Spy's own ranged row
[reskin] print canon row: Bonus Actions/Cunning Action — the Spy's own
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" yields to the Spy's Cunning Action
[reskin] multiattack re-read — "Shortsword" left; "Multiattack" now reads "The adept makes two Hand Crossbow attacks."
[reskin] class weapon: Actions/"Shortsword" -> "Unarmed Strike" — a monk fights with its hands, not the Spy's; the body's rider folds in (+7)
[reskin] multiattack re-read — "Hand Crossbow" left; "Multiattack" now reads "The adept makes two attacks."
[reskin] class weapon: Actions/"Hand Crossbow" -> "Dart" — a monk fights with a dart, not the Spy's
[reskin] multiattack normalised: "The adept makes two attacks, using Unarmed Strike or Dart in any combination."
audit finding below confidence gate: Unarmed Strike Stunned is a hard condition imposed with a save, which is fine, but the block gives no escape or repeat save once applied; per calibration this is acceptable single-target, yet the 'until end of next turn' fixed duration does supply an exit, so this is noted only to confirm compliance and is NOT a defect — remove if you agree.
[reskin] species kit: Swim 30 ft. — the lizardfolk's
```


---


### Vexia Emberhorn — a print donor

**Concept:** a tiefling rogue who stalks the rooftops of the old quarter

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Vexia Emberhorn | 5 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 5 / off 5 → 5; sustained 34 (2 × Shortsword); nova none; dmg 34

```
Vexia Emberhorn

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

Assassinate. During the first round of each combat, Vexia has Advantage on attack rolls against any creature that hasn't taken a turn. If Vexia hits a creature during that round, the target takes an extra 9 (2d8) Piercing damage.

Evasion. If Vexia is subjected to an effect that allows it to make a Dexterity saving throw to take only half damage, Vexia instead takes no damage if it succeeds on the save and only half damage if it fails. It can't use this trait if it has the Incapacitated condition.

Actions

Multiattack. Vexia makes two attacks, using Shortsword or Shortbow in any combination.

Shortsword. Melee Attack Roll: +6, reach 5 ft. 17 (4d6 + 3) Piercing damage.

Shortbow. Ranged Attack Roll: +6, range 80/320 ft. 16 (3d8 + 3) Piercing damage.

Bonus Actions

Cunning Action. Vexia takes the Dash, Disengage, or Hide action.

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
[concept] resolve: archetype=skirmisher type=Humanoid themes=terror/armed mind=sapient style=skulker energy=Fire mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: striking from above and vanishing across rooftops [behavior] | a blade carried in the dark [object] | horns and dark tiefling bloodline [body]
[concept] identity: The rooftop stalker opens by dropping from a ledge above the old quarter's alleys, driving a blade into a mark's back before anyone thinks to look up. Every round after, it breaks line of sight across chimneys and eaves, re-emerging from an unseen angle to strike with advantage and then slipping away into the dark between rooftops. It is patient and playful, toying with a panicked quarry until bloodied — only then does it cut a full retreat over the close roofs, preferring to live and strike again over trading blows in the open.
[concept] lore: A tiefling who learned the old quarter's rooftops before its streets, it haunts the eaves above the merchants who once spat on its horns, exacting a quiet toll from those who never look up.
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
[reskin] class kit: rogue — "rogue": Evasion (evasion), Assassinate (assassinate)
[reskin] inline declared: "Vexia" — the call's own answer (person), built from the name
[reskin] inline form: "Vexia" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a tiefling rogue" -> has (descriptive), head | "stalks the rooftops of the old quarter" -> has (descriptive)
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "When Vexia strikes a target she cannot be seen by — from a ledge above, out of a dark chimney-shadow — the wound lands where the mark never braced for it, and the moment the blade bites she is already gone, clattering away across the eaves so that a second strike comes from a fresh and unseen angle. Foes who crane their necks and chase her shadow up the rooftops are left swinging at empty dark whi" [rider/on_hit/damage] — menu: affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, isolation, bolt-mark (+ shelf: leap, gaze-single, snare, condition-payoff, throw-retrieve, shield-bash, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, exploiter, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte)
[reskin] signature bound to the concept's verb: action — focus (stalk)
[reskin] word match declined by the call: focus, self-invisibility, bolt-mark, aggro-curse — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit" after being shown focus, which the GM's words keyed
[reskin] key match declined: action — "focus" was ranked first on the call's own menu for stalk, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: action — "When Vexia strikes a target she cannot be seen by — from a ledge above, out of a dark chimney-shadow — the wound lands where the mark never braced for it, and the moment the blade bites she is already gone, clattering away across the eaves so that a second strike comes from a fresh and unseen angle. Foes who crane their necks and chase her shadow up the rooftops are left swinging at empty dark whi" [rider/on_hit/damage] — the model found no template that holds it (offered: focus, affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, isolation, bolt-mark, self-invisibility, leap, delayed-brand, rampage, aggro-curse)
[reskin] fallback respects the call: focus, self-invisibility left the shelf — the call declined them for this sheet
[reskin] fallback stands down: the class_npc path has no shelf — the Bandit Captain's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 16 already beats print's AC 15 at CR 5, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "Vexia is at home in the dark between rooftops: as long as she stays above her prey, tucked into eaves or shadowed heights, she melts from notice even in plain view, and quarry who lose sight of her cannot find her again until she chooses to show herself." [trait/always/defense] — menu: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] signature bound to the concept's verb: trait — faultless-tracker (stalks, stalk)
[reskin] word match declined by the call: faultless-tracker, spider-climb — the key word does not mean the mechanic here
[reskin] signature miss: trait — "Vexia is at home in the dark between rooftops: as long as she stays above her prey, tucked into eaves or shadowed heights, she melts from notice even in plain view, and quarry who lose sight of her cannot find her again until she chooses to show herself." [trait/always/defense] — the model picked "false-appearance" (no verb, and it quotes nothing the GM typed) over a concept-verb template (faultless-tracker)
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
[reskin] print canon: chassis row leaves — Traits/"Eave Runner" is the seat's, not the Bandit Captain's
[reskin] on-hit extra retyped: "Assassinate" adds Piercing, not Slashing — the class weapon's own type (Shortsword)
[reskin] multiattack re-read — "Scimitar" left; "Multiattack" now reads "Vexia makes two Pistol attacks."
[reskin] class weapon: Actions/"Scimitar" -> "Shortsword" — a rogue fights with a shortsword, not the Bandit Captain's
[reskin] multiattack re-read — "Pistol" left; "Multiattack" now reads "Vexia makes two attacks."
[reskin] class weapon: Actions/"Pistol" -> "Shortbow" — a rogue fights with a shortbow, not the Bandit Captain's
[reskin] multiattack normalised: "Vexia makes two attacks, using Shortsword or Shortbow in any combination."
audit finding below confidence gate: Multiattack The sentence is missing a relative pronoun, producing an ungrammatical construction.
[reskin] species kit: resistance Fire — the tiefling's
[harness] re-rolled Traits/"Assassinate" -> "Rooftop Prowler" [catalog: terrain-walk]
```

**Re-roll — one entry, replaced**

```
Traits / BEFORE  Assassinate: During the first round of each combat, Vexia has Advantage on attack rolls against any creature that hasn't taken a turn. If Vexia hits a creature during that round, the target takes an extra 9 (2d8) Piercing damage.
Traits / AFTER   Rooftop Prowler: Difficult Terrain composed of rooftops, ledges, and uneven urban footing doesn't cost Vexia extra movement, and Vexia can move across rooftops, ledges, and uneven urban footing without needing to make an ability check.
provenance: catalog template "terrain-walk"
```


---


### Vareth Solmane — one marked soft

**Concept:** name: Vareth Solmane | a templar priest of the dawn who blesses her soldiers

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Vareth Solmane | 6 | defender-5 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok | ok |

- donor · soft · print-rows: rows outside print, the named seat and the keyed seeds: Traits/Guard Aura
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

Guard Aura. While in a 10-foot Emanation originating from Vareth, Vareth's allies have Advantage on saving throws, provided Vareth doesn't have the Incapacitated condition.

Actions

Multiattack. Vareth makes three Longsword attacks. It can replace one attack with a use of Shield Bash.

Longsword. Melee Attack Roll: +7, reach 5 ft. 11 (2d6 + 4) Slashing damage.

Shield Bash. Strength Saving Throw: DC 15, one creature within 5 feet that Vareth can see. Failure: 9 (2d4 + 4) Bludgeoning damage. If the target is a Medium or smaller creature, it has the Prone condition.

Bonus Actions

Dawn Banner (2/Day). Each ally within 30 feet of Vareth gains 11 (2d10) Temporary Hit Points.

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
- Traits/Guard Aura — the chassis
- Actions/Multiattack — the chassis
- Actions/Longsword — print's own row, renamed; weapon longsword
- Actions/Shield Bash — print's own row
- Bonus Actions/Dawn Banner — template rally; library draw (seed unstamped); the GM's clause "blesses her soldiers"; binds the GM's words: blessing+bless+mend

**Engine trace**

```
[path] class_npc — class paladin — "templar" (call)
[route] caster-warpriest (artillery) type=Humanoid mechanics=aura — casts: implied by the kind — "a templar priest of the dawn who blesses" | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | caster-warpriest: ✓ ("a templar priest of the dawn who blesses") | caster-warpriest: key "blesses" (class verb)
[concept] name: "Vareth Solmane" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] resolve: archetype=caster type=Humanoid themes=armed/celestial mind=sapient style=warpriest energy=Radiant mix=both identity=✓ lore=✓
[concept] name: provided "Vareth Solmane"
[concept] mechanics: aura
[concept] signature elements: dawn-blessings cast over her soldiers [behavior] | holy blade strikes [object] | unbreakable formation faith [behavior]
[concept] identity: Vareth Solmane opens battle by planting her banner and casting a dawn-blessing over her soldiers, then wades in behind them with a blade that carries the light of morning. Every round she alternates holy strikes with prayers that steady, mend, or rally her allies, keeping the line unbroken while she burns the unholy. Under pressure she holds the formation and shields her flock rather than retreat, and she will not abandon a wounded soldier. Her faith — not her body — is what makes her relentless.
[concept] lore: Vareth Solmane is a templar priest who swore her oath to the Dawnmother after her garrison was spared by a sunrise no one could explain; she now leads her blessed soldiers across the war-torn marches, healing the faithful and delivering the dawn's judgment to those who shelter in darkness.
[reskin] energy withheld: Radiant on a Humanoid with no Radiant in the concept's own words (fixed phrases read first)
[reskin] [path] class body: the paladin stands on the Gladiator — the class's own print block, nearest CR 6
[reskin] print canon route: the Gladiator is not a caster first and keys STR 18 over DEX 15 — it casts no spells — the caster family stands down for the plain defender line
[reskin] print canon defenses: HP 91 -> 112, AC 19 -> 16 — the Gladiator's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon armor: 16 (studded leather, shield) — print's Gear line; the 2014 sheet prints it (the Goblin Boss wore "splint", canaries 2026-10-12)
[reskin] print canon array: STR 18, DEX 15, CON 16, INT 10, WIS 12, CHA 15 — the Gladiator's at its own CR; attack +7 -> +7, DC 15 (print's)
[reskin] donor: defender-5 -> CR 6
[reskin] style unserved: "warpriest" has no defender line — the plain line ships (resolve's style signal is noisy; not re-routed)
[reskin] [path] decides: class_npc on the Gladiator · class paladin (the matcher would have said twist Priest)
[reskin] print canon: "Vareth Solmane — a templar priest of the dawn who blesses her soldiers" heads on the Gladiator — print's rows ride along; the seat stays
[reskin] name_element answered: Dawnlight Bolt = literal
[reskin] repair round 1: 1 defect(s) — "Dawnlight Bolt" deals Radiant on a Humanoid whose concept names no Radiant — a name is not a warrant; use a physical type
[reskin] class kit: paladin — "templar": Aura of Authority (Hobgoblin Captain/Aura of Authority)
[reskin] proper noun: "Vareth Solmane" — the Name field is a person, not a kind (no print match, no article in the words)
[reskin] inline declared: "Vareth" — the call's own answer (person), built from the name
[reskin] inline form: "Vareth" — the model's own reading of the name
[reskin] energy rider withheld: Radiant on a Humanoid with no Radiant in the concept's own words
[reskin] energy withheld on a base row: "Dawnlight Bolt" Radiant -> Piercing (the row's own noun; a Humanoid deals no Radiant its concept never gave it)
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Vareth Solmane — a templar priest of the dawn" -> has (descriptive), head | "blesses her soldiers" -> has (mechanical) [asked: buff_ally]
[reskin] menu pruned: action — snap-shot (the sheet cannot render them)
[reskin] signature idea (action): "Vareth lifts her banner and calls down the dawn's blessing on her soldiers, mending their wounds and steadying their shaken hearts so the line holds even when it should break. Any soldier of hers who has fallen wounded or staggered hears the call and rises again into the fight, the light burning off them like morning mist." [action/once_per_fight/resource] — menu: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up (+ shelf: patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, riposte, stunning-strike, charge-push, hook-rider)
[reskin] signature bound to the concept's verb: action — rally (blessing, bless)
[reskin] word match declined by the call: lay-on-hands — the key word does not mean the mechanic here
[reskin] signature template: rally -> Bonus Actions/"Dawn Banner (2/Day)" ("the banner call blesses and mends her soldiers, granting them staying power to h [verb: blessing:concept, bless:concept, mend:idea]")
[reskin] keys spent by the action: blessing, bless
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 16 already beats print's AC 15 at CR 6, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "The light of morning clings to Vareth's blade, and when it bites into the unholy or the night-sworn, the dawn answers her faith with a searing flare that lingers on the wound, so her holy strikes burn longer than steel alone." [trait/always/damage] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending, weapon-lodge)
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "The light of morning clings to Vareth's blade, and when it bites into the unholy or the night-sworn, the dawn answers her faith with a searing flare that lingers on the wound, so her holy strikes burn longer than steel alone." [trait/always/damage] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, bloodied-burst)
[reskin] weapons answered: Longsword = longsword; Dawnlight Bolt = none; Sunveiled Sign = none
[reskin] weapon declined: "Dawnlight Bolt" reads crossbow from its name, but the call answered none — the row carries no weapon
[reskin] weapon table: "Dawnlight Bolt" rolls Dexterity — +7 → +5
[reskin] weapon table: "Dawnlight Bolt" damage off Dexterity — 22 (4d8 + 4) → 20 (4d8 + 2)
[reskin] weapon table: "Dawnlight Bolt" — a launcher, never thrown, range 80/320
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] print canon alignment: Lawful Good -> Neutral — the Gladiator's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon attack: "Spear" keeps print's hybrid frame — reach 5 ft. or range 20/60 ft. (the Gladiator's weapon is thrown)
[reskin] print canon attack: "Longsword" -> "Spear" — the Gladiator's own row
[reskin] print canon multiattack: "Vareth makes three Spear attacks. It can replace one attack with a use of Shield Bash." — the Gladiator's own
[reskin] ranged row off: "Dawnlight Bolt" leaves — the Gladiator carries no ranged row and the words name none
[reskin] print canon skills: "Athletics +7, Perception +4" -> "Athletics +10, Performance +5" — the Gladiator's own skills, each derived from this sheet's stat and PB
[reskin] print canon row: Actions/Shield Bash — the Gladiator's own
[reskin] multiattack re-read — "Spear" left; "Multiattack" now reads "Vareth makes three attacks. It can replace one attack with a use of Shield Bash."
[reskin] class weapon: Actions/"Spear" -> "Longsword" — a paladin fights with a longsword, not the Gladiator's
[reskin] multiattack normalised: "Vareth makes three Longsword attacks. It can replace one attack with a use of Shield Bash."
[reskin] row binds its clause: "Dawn Banner" answers "blesses her soldiers" — the keys it matched came from that clause, so the coverage credit has a receipt
[harness] re-rolled Actions/"Longsword" -> "Longsword" [the call's own text]
```

**Re-roll — one entry, replaced**

```
Actions / BEFORE  Longsword: *Melee Attack Roll:* +7, reach 5 ft. 11 (2d6 + 4) Slashing damage.
Actions / AFTER   Longsword: *Melee Attack Roll:* +7, reach 5 ft. 11 (2d6 + 4) Slashing damage plus 3 (1d6) Radiant damage. On a hit, Vareth can choose one ally within 10 feet of the target; that ally deals an extra 3 (1d6) Radiant damage on its next attack before the start of Vareth's next turn.
provenance: none — the call wrote the text itself
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

Skills Athletics +10, Performance +5

Senses Passive Perception 11

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
[route] defender type=Humanoid mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | defender: ✓ ("keeps the line with a shield and a longs") | defender: key "keeps the line" (class verb)
[concept] name: "Dame Oriel" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] resolve: archetype=defender type=Humanoid themes=armed/forged mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: provided "Dame Oriel"
[concept] mechanics: none claimed
[concept] signature elements: holding the line with shield and sword [behavior] | shield-bash that staggers attackers back [body] | iron plate and shield [object]
[concept] identity: Dame Oriel plants herself in the tightest gap of the line, shield high and longsword low, and lets the enemy come to her — she opens by bracing for a charge and answering the first blow with a shield shove that staggers the attacker back, then holds her ground every round, cutting down anyone who tries to slip past her. She punishes overreach and never chases; if bloodied she does not flee but tightens her guard, spending the rest of the fight bleeding attackers on her shield edge and refusing to yield the corridor she defends.
[concept] lore: A veteran of a broken knightly order, Dame Oriel holds a ford, a stair, or a doorway that no one else will hold, and she will die at her post before she lets an enemy walk past her.
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
[reskin] chassis row off: Actions/"Held-Line Cut" leaves — the GM named a melee weapon (Longsword); one weapon, one rule set
[reskin] class kit: fighter — "knight": Riposte (riposte), Guarded Stance (guarded-stance)
[reskin] proper noun: "Dame Oriel" — the Name field is a person, not a kind (no print match, no article in the words)
[reskin] inline declared: "Dame Oriel" — the call's own answer (person), built from the name
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Dame Oriel — a knight" -> has (descriptive), head | "keeps the line with a shield and a longsword" -> has (mechanical) [asked: attack]
[reskin] signature idea (action): "When a foe tries to duck around Dame Oriel to reach the softer bodies behind her, she steps into the gap, catches the enemy on her shield, and shoves them back hard into the open — the one thing her post forbids is letting someone past. The shove stops them short and makes them think twice about trying the flank again before they've dealt with her." [reaction/on_being_hit/movement] — menu: EMPTY (+ shelf: seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, stunning-strike, charge-push, hook-rider)
[reskin] signature bound to the concept's verb: action — rally (shield)
[reskin] fit declined: "Shieldwall Shove" — a print body takes only what the user's words ask; the call offered no quote, and the key table finds no verb either (the blacksmith's rally, critic-ten 2026-10-01)
[reskin] fallback stands down: the class_npc path has no shelf — the Gladiator's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "Anyone who presses in close and misses her finds the shield edge waiting: the force of their own botched swing carries them onto the rim, leaving them bleeding and off balance for their trouble. Her guard punishes overreach without her having to swing." [trait/on_being_hit/damage] — menu: absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura)
[reskin] signature miss: trait — "Anyone who presses in close and misses her finds the shield edge waiting: the force of their own botched swing carries them onto the rim, leaving them bleeding and off balance for their trouble. Her guard punishes overreach without her having to swing." [trait/on_being_hit/damage] — no template on the shelf shares a verb with the concept or the idea (offered: absorption, bloodied-burst, resonant-body, weapon-lodge, false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura)
[reskin] weapons answered: Longsword = longsword; Shield Bash = shield
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] print canon alignment: Lawful Neutral -> Neutral — the Gladiator's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon multiattack: "Dame Oriel makes three Spear attacks. It can replace one attack with a use of Shield Bash." — the Gladiator's own
[reskin] print canon skills: "Athletics +7, Perception +4" -> "Athletics +10, Performance +5" — the Gladiator's own skills, each derived from this sheet's stat and PB
[reskin] print canon row: Actions/Shield Bash — the Gladiator's own
[reskin] multiattack re-read — "Longsword" joins the combination; "Dame Oriel makes three attacks, using Spear or Longsword in any combination. It can replac"
[reskin] multiattack re-read: "Spear" is not on this sheet, so the combination now reads "Dame Oriel makes three Longsword attacks. It can replace one attack with a use o"
```


---


### Rockscar Radrik — in the run

**Concept:** a goliath berserker who loses control when wounded

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Rockscar Radrik | 8 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 6 / off 8 → 7; sustained 52 (2 × Greataxe); nova none; dmg 52

```
Rockscar Radrik

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

Languages Common, Giant

CR 8 (XP 3,900; PB +3)

Traits

Berserk. Whenever Radrik starts its turn Bloodied, roll 1d6. On a 6, Radrik goes berserk. On each of its turns while berserk, Radrik attacks the nearest creature it can see. If no creature is near enough to move to and attack, Radrik attacks an object. Once Radrik goes berserk, it remains so until it is destroyed or it is no longer Bloodied.

Bloodied Frenzy. While Bloodied, Radrik has Advantage on attack rolls and saving throws.

Mountain Stride. Difficult Terrain composed of ice or snow doesn't cost Radrik extra movement, and Radrik can move across ice or snow without needing to make an ability check.

Actions

Multiattack. Radrik makes two Greataxe attacks. It can replace one attack with a use of Shield Bash.

Greataxe. Melee Attack Roll: +8, reach 5 ft. 26 (6d6 + 5) Slashing damage.

Shield Bash. Strength Saving Throw: DC 16, one creature within 5 feet that Radrik can see. Failure: 27 (6d8) Bludgeoning damage. If the target is a Medium or smaller creature, it has the Prone condition. Success: Half damage only.

Bonus Actions

Rampage (1/Day). Immediately after dealing damage to a creature that is already Bloodied, Radrik moves up to half its Speed without provoking Opportunity Attacks, and it makes one Greataxe attack.

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
- Actions/Shield Bash — print's own row
- Traits/Berserk — template berserk; barbarian kit; the GM's clause "loses control when wounded"
- Traits/Bloodied Frenzy — barbarian kit; the GM's clause "berserker"
- Traits/Mountain Stride — goliath kit; the GM's clause "berserker"
- Bonus Actions/Rampage — template rampage; barbarian kit; the GM's clause "berserker"

**Engine trace**

```
[path] class_npc — class barbarian — species goliath — "berserker" (call)
[route] brute type=Giant mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | brute: ✓ ("a goliath berserker who loses control wh") | brute: no line key in the words — the model's read of its quote
[concept] name: provided_name rejected — "a goliath berserker who loses control wh…" is the description, not a name
[concept] resolve: archetype=brute type=Giant themes=bestial/elemental mind=sapient style=— energy=Thunder mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: losing control when wounded [behavior] | stone-fleshed hide that cracks and hardens under pain [body] | great stone-headed maul [object]
[concept] identity: A scarred goliath berserker wades into the front rank with a great stone-headed maul, trading blows as a mountain trades weather. The moment a wound opens on its hide, the pain flips a switch: it stops guarding, bellows, and hammers the nearest target without pause until the fit burns out or it falls. It never flees — bloodied, it simply gets worse, and it fights to the death because it no longer understands retreat.
[concept] lore: Born of a stone-fleshed highland clan, this goliath was shunned for the rage that turns its own hide to cracking granite, and now it wanders the passes picking fights it cannot lose gracefully.
[reskin] [path] class body: the barbarian stands on the Gladiator — the class's own print block, nearest CR 8
[reskin] the concept outranks the alias: the Gladiator is a Humanoid and the concept reads Giant — the words RESEMBLE it, they do not name it, so the print body stands down
[reskin] print canon array: STR 20, DEX 15, CON 16, INT 10, WIS 12, CHA 15 — the Gladiator's, STR fitted to +8
[reskin] donor: brute-5 -> CR 8
[reskin] [path] decides: class_npc on the Gladiator · class barbarian (the matcher would have said homebrew)
[reskin] print canon: "a goliath berserker who loses control when wounded" heads on the Gladiator — print's rows ride along; the seat stays
[reskin] species kit: goliath — "berserker": Mountain Stride (terrain-walk, authored)
[reskin] class kit: barbarian — "berserker": Bloodied Frenzy (Berserker/Bloodied Frenzy), Rampage (1/Day) (rampage), Berserk (berserk)
[reskin] inline declared: "Radrik" — the call's own answer (person), built from the name
[reskin] inline form: "Radrik" — the model's own reading of the name
[reskin] save dc derived: DC 15 -> 16 (8 + PB 3 + the sheet's best 5) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a goliath berserker" -> has (descriptive), head | "loses control when wounded" -> has (mechanical) [asked: when_bloodied/buff_self]
[reskin] signature idea (action): "When Radrik's maul lands a heavy blow, the Thunder in the stone head cracks outward through the target's body, and the shattering carries to anyone standing close enough to be splashed by the stone shards and sound. Those caught in it are deafened and rattled by the ringing, their ears and nerves full of broken rock. Radrik cannot aim it — the burst simply follows wherever his maul strikes, so all" [rider/on_hit/condition] — menu: stunning-strike, charge-push, hook-rider, pounce, charge (+ shelf: trample, leap, thrown-burst, throw-retrieve, shield-bash, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating)
[reskin] word match declined by the call: active-toll — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit"
[reskin] signature miss: action — "When Radrik's maul lands a heavy blow, the Thunder in the stone head cracks outward through the target's body, and the shattering carries to anyone standing close enough to be splashed by the stone shards and sound. Those caught in it are deafened and rattled by the ringing, their ears and nerves full of broken rock. Radrik cannot aim it — the burst simply follows wherever his maul strikes, so all" [rider/on_hit/condition] — the model found no template that holds it (offered: stunning-strike, charge-push, hook-rider, pounce, charge, active-toll, thrown-burst, thrown-burst-seed, trample, ground-burst, focus)
[reskin] fallback stands down: the class_npc path has no shelf — the Gladiator's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "Striking Radrik's cracked granite hide breaks the wound wider: whenever a blow lands on him, the crack spreads and the Thunder stored in his stone flesh leaks out with a low grinding boom. This costs him nothing but noise and fury — the leaking force lashes out at whoever hit him, so every attacker is reminded that hurting him only cracks the mountain open." [trait/on_being_hit/damage] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] signature bound to the concept's verb: trait — bloodied-burst, bloodied-fury (wounded)
[reskin] word match declined by the call: bloodied-burst, bloodied-fury, false-appearance, aberrant-ground, heated-body, absorption, weapon-lodge — the key word does not mean the mechanic here
[reskin] signature miss: trait — "Striking Radrik's cracked granite hide breaks the wound wider: whenever a blow lands on him, the crack spreads and the Thunder stored in his stone flesh leaks out with a low grinding boom. This costs him nothing but noise and fury — the leaking force lashes out at whoever hit him, so every attacker is reminded that hurting him only cracks the mountain open." [trait/on_being_hit/damage] — the model picked "resonant-body" (no verb, and it quotes nothing the GM typed) over a concept-verb template (bloodied-burst, bloodied-fury)
[reskin] weapons answered: Maul = maul; Boulder = none; Granite Rage = none
[reskin] speed by body: a Humanoid walks 30 ft. (print's people; a hermit ran 50 — critic's audit 2026-10-02)
[reskin] speed by concept:  — the concept's movement set decides
[reskin] languages by mind: "Giant" -> "Common, Giant" (sapient)
[reskin] print canon alignment: Chaotic Neutral -> Neutral — the Gladiator's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon type: Humanoid stays — the words say giant ("a dire wolf but undead", 2026-10-01)
[reskin] print canon languages: "Common, Giant" -> "Common, Giant" — the Gladiator's plus the concept's Giant
[reskin] print canon attack: "Spear" keeps print's hybrid frame — reach 5 ft. or range 20/60 ft. (the Gladiator's weapon is thrown)
[reskin] rider folded: "Maul" keeps its budget — the chassis's rider half (11) folds into the base; the Gladiator pays no damage rider of its own
[reskin] print canon attack: "Maul" -> "Spear" — the Gladiator's own row
[reskin] ranged row off: "Boulder" leaves — the Gladiator carries no ranged row and the words name none
[reskin] multiattack re-read — "Boulder" left; "Multiattack" now reads "Radrik makes two Spear attacks."
[reskin] print canon row priced: Shield Bash — dice 9 → 27
[reskin] print canon row: Actions/Shield Bash — the Gladiator's own
[reskin] multiattack re-read — "Spear" left; "Multiattack" now reads "Radrik makes two attacks."
[reskin] dead wildcard name swept — "Spear" cited in "Rampage (1/Day)" now reads "Greataxe" — the keeper owns the throw
[reskin] class weapon: Actions/"Spear" -> "Greataxe" — a barbarian fights with a greataxe, not the Gladiator's
[reskin] multiattack replacement clause: It can replace one attack with a use of Shield Bash.
[reskin] multiattack normalised: "Radrik makes two Greataxe attacks. It can replace one attack with a use of Shield Bash."
[reskin] darkvision withheld: a Humanoid with no species kit granting it, no word for it in the GM's own text, and no print body that has it — print gives darkvision to 1 of 26 Humanoids ("darkvision 60 ft.; Passive Perception 14" -> "Passive Perception 14")
[reskin] ask vs row MISMATCH: "loses control when wounded" -> "Berserk" — trigger: asked when_bloodied, row reads at_will
audit span not verbatim, dropped: Berserk Die 6, Radrik goes berserk. On each of its turns while berserk, Radrik attacks the nearest creature it can see.
[reskin] species kit: Large -> Medium — a goliath is Medium (the words name no other size)
```


---


### Ser Aldous Wrack — in the run

**Concept:** a templar priest with a mace and no magic at all

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Ser Aldous Wrack | 4 | defender-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 3 / off 4 → 3.5; sustained 30 (2 × Longsword); nova none; dmg 30

```
Ser Aldous Wrack

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

Aura of Authority. While in a 10-foot Emanation originating from Aldous, Aldous and its allies have Advantage on attack rolls and saving throws, provided Aldous doesn't have the Incapacitated condition.

Actions

Multiattack. The guard makes two attacks, using Longsword or Mace in any combination.

Mace. Melee Attack Roll: +6, reach 5 ft. 13 (2d8 + 4) Bludgeoning damage, and the target has Disadvantage on its next attack roll before the start of Aldous's next turn.

Longsword. Melee Attack Roll: +6, reach 5 ft. 15 (2d10 + 4) Slashing damage, and the target has Disadvantage on its next attack roll before the start of Aldous's next turn.

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
[path] class_npc — class paladin — "templar" (call)
[route] defender type=Humanoid mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | defender: ✓ ("a templar priest with a mace") | defender: no line key in the words — the model's read of its quote
[concept] resolve: archetype=defender type=Humanoid themes=armed/forged mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: shield-wall defense [behavior] | iron-bound mace [object] | sworn defender who will not flee [behavior]
[concept] identity: A shield-bearing templar who has renounced every prayer and spell, closing to melee behind a battered shield and opening with a shove-and-mace combination that pins a foe against his own guard. Each round he holds the line, punishing anyone who turns their back or slips past with a mace blow to the spine and a shoulder to the ribs, and he only breaks formation when the shield arm hangs limp. Under pressure he fights to the last, standing over the wounded and trading space for time rather than fleeing.
[concept] lore: A disgraced templar stripped of his orders and his god's favor, he carries only dented iron and a mace, guarding the last threshold he was sworn to protect until someone finally puts him down.
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
[reskin] inline declared: "Aldous" — the call's own answer (person), built from the name
[reskin] inline form: "Aldous" — the model's own reading of the name
[reskin] lacks asked: "no magic at all"
[reskin] asked field dropped: the call answered limit "at_will" for "a templar priest with a mace" but offered no quote
[reskin] clauses: "a templar priest with a mace" -> has (mechanical) [asked: attack] | "no magic at all" -> LACKS (mechanical)
[reskin] signature idea (action): "Aldous plants his shield and shoves a foe caught in reach, driving them stumbling back and leaving them open for a follow-up. If the shoved foe refuses to yield ground, he slams his mace into their guard as part of the same effort, using their resistance to keep them pinned at the edge of his reach." [rider/on_hit/movement] — menu: charge-push, hook-rider (+ shelf: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, snap-shot, riposte)
[reskin] decline reason: action — the call answered none and names it "no_fit"
[reskin] signature miss: action — "Aldous plants his shield and shoves a foe caught in reach, driving them stumbling back and leaving them open for a follow-up. If the shoved foe refuses to yield ground, he slams his mace into their guard as part of the same effort, using their resistance to keep them pinned at the edge of his reach." [rider/on_hit/movement] — the model found no template that holds it (offered: charge-push, hook-rider, push-prone, rally, riposte)
[reskin] fallback stands down: the class_npc path has no shelf — the Guard Captain's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 18 already beats print's AC 14 at CR 4, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "The battered iron of Aldous's mace rings and catches blows meant for him, and when he strikes a foe who just missed him, the mace carries the weight of that failed attack into the wound. So long as he still holds his shield, foes who turn away from him feel the iron bite harder." [trait/on_being_hit/damage] — menu: absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura)
[reskin] word match declined by the call: resonant-body — the key word does not mean the mechanic here
[reskin] trait declined: "Iron Lodgement" — a shape fit with no verb match on a Humanoid body; a meat body earns its trait by a verb
[reskin] weapons answered: Mace = mace; Sling = sling
[reskin] weapon table: "Sling" rolls Dexterity — +6 → +4
[reskin] weapon table: "Sling" damage off Dexterity — 13 (2d8 + 4) → 11 (2d8 + 2)
[reskin] weapon table: "Sling" — a launcher, never thrown, range 30/120
[reskin] print canon alignment: Lawful Neutral -> Neutral — the Guard Captain's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon row: Actions/Longsword — the Guard Captain's second melee row, beside the chassis's
[reskin] print canon multiattack: "The guard makes two attacks, using Javelin or Longsword in any combination." — the Guard Captain's own
[reskin] ranged row off: "Sling" leaves — the Guard Captain carries no ranged row and the words name none
[reskin] multiattack normalised: "The guard makes two attacks, using Longsword or Mace in any combination."
```


---


### Halfstep Counselor — in the run

**Concept:** a court wizard who is never where you struck and steps away

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Halfstep Counselor | 6 | caster-6 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 3 / off 7 → 5; sustained 48 (3 × Arcane Burst); nova none; dmg 48

```
Halfstep Counselor

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

Actions

Multiattack. The counselor makes three Arcane Burst attacks.

Arcane Burst. Melee or Ranged Attack Roll: +6, reach 5 ft. or range 120 ft. 16 (3d8 + 3) Force damage.

Spellcasting. The counselor casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 14):

- At Will: Detect Magic, Light, Mage Armor, Mage Hand, Prestidigitation
- 2/Day Each: Fireball, Invisibility
- 1/Day Each: Cone of Cold, Fly

Bonus Actions

Misty Step (3/Day). The counselor casts Misty Step, using the same spellcasting ability as Spellcasting.

Reactions

Protective Magic (3/Day). Trigger: The counselor is hit by an attack roll. Response: The counselor casts Shield in response, gaining a +5 bonus to AC until the start of its next turn, including against the triggering attack.

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
- Actions/Spellcasting — print's own row
- Reactions/Protective Magic — mage kit; the GM's clause "court wizard"
- Bonus Actions/Misty Step — mage kit; the GM's clause "is never where you struck and steps away"

**Engine trace**

```
[path] class_npc — class mage — "court wizard" (call)
[route] skirmisher-skulker type=Humanoid mechanics=teleport — casts: implied by the kind — "court wizard" | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | skirmisher-skulker: ✓ ("never where you struck and steps away") | skirmisher-skulker: no line key in the words — the model's read of its quote
[concept] resolve: archetype=skirmisher type=Humanoid themes=arcane/uncanny mind=sapient style=skulker energy=Force mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: teleport
[concept] signature elements: never where the strike lands, half a step off the axis [behavior] | court wizard's robes and iron-hard wit [object] | toying, dueling, baiting a strike it has already left [behavior]
[concept] identity: The court wizard never stands where the blow lands: it greets a fight by reading the room, then slips half a step into Elsewhere so the first strike passes through the space it just vacated. Each round after that it returns fire from an angle no one is covering, trading a cantrip of iron-hard wit for a thrown blade or a whispered word, so the only way to hurt it is to make the stepping cost it something. Under pressure it does not flee; it withdraws, repositions, and toys with the attacker, clearly enjoying a good duel too much to end it fast.
[concept] lore: A court wizard who bargained one too many times for 'a moment's safety' now lives in the half-step between positions, serving any throne that will suffer its counsel because no assassin has ever quite been where it stood.
[reskin] energy withheld: Force on a Humanoid with no Force in the concept's own words (fixed phrases read first)
[reskin] [path] class body: the mage stands on the Mage — the class's own print block, nearest CR 6
[reskin] print canon route: the Mage's body outranks the skulker seat — no verb in the words names it; the plain skirmisher line
[reskin] print canon route: the Mage casts and strikes only with magic (Force) — the caster family takes the line from skirmisher, so the attack bonus and the spell DC key to one stat
[reskin] print canon defenses: HP 89 -> 81, AC 15 -> 15 — the Mage's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 9, DEX 14, CON 11, INT 17, WIS 12, CHA 11 — the Mage's at its own CR; attack +7 -> +6, DC 14 (print's)
[reskin] donor: caster-6 -> CR 6
[reskin] [path] decides: class_npc on the Mage · class mage (the matcher would have said twist Mage)
[reskin] print canon: "a court wizard who is never where you struck and steps away" heads on the Mage — print's rows ride along; the seat stays
[reskin] class kit: Protective Magic — the sheet already carries it, so the mage kit adopts that row: the cap may no longer read it as filler
[reskin] class kit: mage — "court wizard": Misty Step (3/Day) (Mage/Misty Step)
[reskin] inline declared: "the counselor" — the call's own answer (kind), built from the name
[reskin] inline form: "the counselor" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] lacks not claimed: "is never where you struck and steps away" reads like a lack to the words, and the call's list did not name it
[reskin] clauses: "a court wizard" -> has (descriptive), head | "is never where you struck and steps away" -> has (descriptive)
[reskin] menu pruned: action — snap-shot (the sheet cannot render them)
[reskin] signature idea (action): "The counselor throws a blade at a foe, then offers a courtly feint: a barbed word about the enemy's stance that makes them lunge or flinch wide before the blade finishes its arc. If the barbed word lands home first, the thrown blade comes from the exact angle the foe just turned away from, and anyone who ignores the taunt to keep pressing the counselor finds the next blade already waiting for them" [rider/on_hit/condition] — menu: bolt-restrain, bolt-drag, bolt-mark (+ shelf: thrown-burst, gaze-single, snare, zone, execute, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, snare-bolt, slow-bolt, sensory-strike, herd, thrown-burst-seed, drain, delayed-brand, curse-debt, zone-seed, reveal, wind-up, blighted-ground, lay-on-hands, aggro-curse, self-invisibility, rally, phase-slip)
[reskin] signature bound to the concept's verb: action — phase-slip (step)
[reskin] word match declined by the call: phase-slip, aggro-curse, thrown-burst, execute, thrown-burst-seed, bolt-restrain, bolt-drag, bolt-mark — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit" after being shown phase-slip, which the GM's words keyed
[reskin] key match declined: action — "phase-slip" was ranked first on the call's own menu for step, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: action — "The counselor throws a blade at a foe, then offers a courtly feint: a barbed word about the enemy's stance that makes them lunge or flinch wide before the blade finishes its arc. If the barbed word lands home first, the thrown blade comes from the exact angle the foe just turned away from, and anyone who ignores the taunt to keep pressing the counselor finds the next blade already waiting for them" [rider/on_hit/condition] — the model found no template that holds it (offered: phase-slip, bolt-restrain, bolt-drag, bolt-mark, aggro-curse, thrown-burst, execute, thrown-burst-seed)
[reskin] fallback respects the call: phase-slip, aggro-curse, execute left the shelf — the call declined them for this sheet
[reskin] fallback stands down: the class_npc path has no shelf — the Mage's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "Its robes are tailored for the half-step: whenever something nearly touches it, the counselor shifts so the blow spends itself on the space it abandoned, and the attacker is left overextended and out of position for a heartbeat. Strikes that miss it leave the foe open and turned wrong for the counselor's next move." [trait/on_being_hit/movement] — menu: absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst, evasion)
[reskin] signature bound to the concept's verb: trait — evasion (never where)
[reskin] word match declined by the call: evasion — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit" after being shown evasion, which the GM's words keyed
[reskin] key match declined: trait — "evasion" was ranked first on the call's own menu for never where, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: trait — "Its robes are tailored for the half-step: whenever something nearly touches it, the counselor shifts so the blow spends itself on the space it abandoned, and the attacker is left overextended and out of position for a heartbeat. Strikes that miss it leave the foe open and turned wrong for the counselor's next move." [trait/on_being_hit/movement] — the model found no template that holds it (offered: evasion, absorption, bloodied-burst, resonant-body)
[reskin] concept-first trait skipped: evasion — the call read its match as a collision (the word is a modifier, or the sheet already answers it)
[reskin] weapons answered: Thrown Blade = dagger
[reskin] weapon declared: "Thrown Blade" is a dagger — the call's own answer (the name alone read longsword)
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] print canon languages: "Common" -> "Common and any three languages" — the Mage's
[reskin] print canon attack: "Thrown Blade" -> "Arcane Burst" — the Mage's own row
[reskin] print canon skills: "Arcana +6, Perception +4" -> "Arcana +6, History +6, Perception +4" — the Mage's own skills, each derived from this sheet's stat and PB
[reskin] print canon row: Actions/Spellcasting — print's own list replaces the chassis's
audit finding below confidence gate: Spellcasting The statblock provides no statblock-language definition of the referenced spells' effects, area, or duration; a GM must look up external spell text to adjudicate Cone of Cold and Fly.
audit finding below confidence gate: Spellcasting The entry gives no timing/range/area for in-block adjudication; without external spell text, Fireball's area and Invisibility's ending conditions are undefined in the block.
```


---


### Kageyama — in the run

**Concept:** a ninja who moves through the shadows and strikes unseen

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Kageyama | 5 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 5 / off 5 → 5; sustained 34 (2 × Shortsword); nova none; dmg 34

```
Kageyama

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

Assassinate. During the first round of each combat, Kageyama has Advantage on attack rolls against any creature that hasn't taken a turn. If Kageyama hits a creature during that round, the target takes an extra 9 (2d8) Piercing damage.

Evasion. If Kageyama is subjected to an effect that allows it to make a Dexterity saving throw to take only half damage, Kageyama instead takes no damage if it succeeds on the save and only half damage if it fails. It can't use this trait if it has the Incapacitated condition.

Actions

Multiattack. Kageyama makes two attacks, using Shortsword or Shortbow in any combination.

Shortsword. Melee Attack Roll: +6, reach 5 ft. 17 (4d6 + 3) Piercing damage.

Shortbow. Ranged Attack Roll: +6, range 80/320 ft. 16 (3d8 + 3) Piercing damage.

Bonus Actions

Cunning Action. Kageyama takes the Dash, Disengage, or Hide action.

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
- Actions/Shortsword — print's own row, renamed; weapon shortsword
- Actions/Shortbow — print's own row, renamed; weapon shortbow
- Bonus Actions/Cunning Action — rogue kit; the GM's clause "ninja"

**Engine trace**

```
[path] class_npc — class rogue — "ninja" (call)
[route] skirmisher-skulker type=Humanoid mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | skirmisher-skulker: ✓ ("strikes unseen") | skirmisher-skulker: key "unseen" (class verb)
[concept] resolve: archetype=skirmisher type=Humanoid themes=uncanny/armed mind=sapient style=skulker energy=Psychic mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: strikes from darkness and vanishes again before a counterblow lands [behavior] | body made of living shadow that swallows light [body] | shuriken and blade thrown from cover [object]
[concept] identity: A shadow-bound shinobi who opens combat by melting into darkness and reappearing behind a target for a single lethal strike, then flips back into cover before blows can land. Every round it bleeds the fight into shadowed ground, harrying with thrown steel and bleeding cuts while refusing to trade blows head-on, and it stays cool and methodical under pressure — slipping away when wounded to re-ambush rather than dying in the open.
[concept] lore: Sworn to a forgotten shadow-caste, this ninja haunts the ruined temple grounds it once guarded, testing every intruder as a worthy target and sparing none who see it clearly.
[reskin] energy withheld: Psychic on a Humanoid with no Psychic in the concept's own words (fixed phrases read first)
[reskin] [path] class body: the rogue stands on the Bandit Captain — the class's own print block, nearest CR 5
[reskin] print canon array: STR 15, DEX 16, CON 14, INT 14, WIS 11, CHA 14 — the Bandit Captain's, DEX fitted to +6
[reskin] donor: skirmisher-3-skulker -> CR 5
[reskin] row gated out: Ranged Save Effect (gaze) — the concept did not claim this mechanic
[reskin] row gated out: Teleport (teleport) — the concept did not claim this mechanic
[reskin] [path] decides: class_npc on the Bandit Captain · class rogue (the matcher would have said homebrew)
[reskin] print canon: "a ninja who moves through the shadows and strikes unseen" heads on the Bandit Captain — print's rows ride along; the seat stays
[reskin] class kit: Cunning Action — the sheet already carries it, so the rogue kit adopts that row: the cap may no longer read it as filler
[reskin] class kit: rogue — "ninja": Evasion (evasion), Assassinate (assassinate)
[reskin] inline declared: "Kageyama" — the call's own answer (person), built from the name
[reskin] inline form: "Kageyama" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a ninja" -> has (descriptive), head | "moves through the shadows" -> has (descriptive) | "strikes unseen" -> has (mechanical)
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "After Kageyama hits a creature with a Tanto or Shuriken attack, shadows boil up around the strike and cling to the victim, swallowing the light nearest to them. Until the end of Kageyama's next turn, that creature cannot see Kageyama and treats the ground around itself as darkness that only Kageyama can move through unseen, and on Kageyama's next turn it may slip through that swallowed patch to st" [rider/on_hit/condition] — menu: affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, isolation, bolt-mark (+ shelf: leap, gaze-single, snare, condition-payoff, throw-retrieve, shield-bash, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, exploiter, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte)
[reskin] signature bound to the concept's verb: action — self-invisibility (unseen)
[reskin] decline reason: action — the call answered none and names it "no_fit" after being shown self-invisibility, which the GM's words keyed
[reskin] key match declined: action — "self-invisibility" was ranked first on the call's own menu for unseen, and the call read it as no fit; the words keep their claim and nothing is forced
[reskin] signature miss: action — "After Kageyama hits a creature with a Tanto or Shuriken attack, shadows boil up around the strike and cling to the victim, swallowing the light nearest to them. Until the end of Kageyama's next turn, that creature cannot see Kageyama and treats the ground around itself as darkness that only Kageyama can move through unseen, and on Kageyama's next turn it may slip through that swallowed patch to st" [rider/on_hit/condition] — the model found no template that holds it (offered: self-invisibility, affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, isolation, bolt-mark, ground-burst, sensory-strike, feint-slip)
[reskin] fallback respects the call: self-invisibility left the shelf — the call declined it for this sheet
[reskin] fallback stands down: the class_npc path has no shelf — the Bandit Captain's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 16 already beats print's AC 15 at CR 5, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "Kageyama's body is made of living shadow, so light bends and dies in its wake: while Kageyama is in dim light or darkness, it leaves a spreading pool of unnatural darkness behind it wherever it moves, and any creature that steps into or starts its turn inside that pool cannot see Kageyama clearly and has no idea where it will strike from next. The pool fades quickly once Kageyama is gone or steps " [trait/always/condition] — menu: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] word match declined by the call: aberrant-ground, guarded-stance — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "Kageyama's body is made of living shadow, so light bends and dies in its wake: while Kageyama is in dim light or darkness, it leaves a spreading pool of unnatural darkness behind it wherever it moves, and any creature that steps into or starts its turn inside that pool cannot see Kageyama clearly and has no idea where it will strike from next. The pool fades quickly once Kageyama is gone or steps " [trait/always/condition] — the model found no template that holds it (offered: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst)
[reskin] weapons answered: Tanto = dagger; Shuriken = dart
[reskin] weapon declared: "Tanto" is a dagger — the call's own answer
[reskin] weapon declared: "Shuriken" is a dart — the call's own answer
[reskin] weapon table: "Shuriken" — thrown, range 20/60
[reskin] print canon modes: climb off — the Bandit Captain has no such mode and the words name none
[reskin] speed by body: a Humanoid walks 30 ft. (print's people; a hermit ran 50 — critic's audit 2026-10-02)
[reskin] speed by concept: dropped Climb 30 ft. — the concept's movement set decides
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] print canon alignment: Lawful Neutral -> Neutral — the Bandit Captain's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common" -> "Common, Thieves' cant" — the Bandit Captain's
[reskin] print canon attack: "Tanto" -> "Scimitar" — the Bandit Captain's own row
[reskin] print canon attack: "Shuriken" -> "Pistol" — the Bandit Captain's own ranged row
[reskin] on-hit extra retyped: "Assassinate" adds Slashing, not Bludgeoning — the hit's own type (Scimitar)
[reskin] print canon: chassis row leaves — Traits/"Shadowstep" is the seat's, not the Bandit Captain's
[reskin] on-hit extra retyped: "Assassinate" adds Piercing, not Slashing — the class weapon's own type (Shortsword)
[reskin] multiattack re-read — "Scimitar" left; "Multiattack" now reads "Kageyama makes two Pistol attacks."
[reskin] class weapon: Actions/"Scimitar" -> "Shortsword" — a rogue fights with a shortsword, not the Bandit Captain's
[reskin] multiattack re-read — "Pistol" left; "Multiattack" now reads "Kageyama makes two attacks."
[reskin] class weapon: Actions/"Pistol" -> "Shortbow" — a rogue fights with a shortbow, not the Bandit Captain's
[reskin] multiattack normalised: "Kageyama makes two attacks, using Shortsword or Shortbow in any combination."
[reskin] darkvision withheld: a Humanoid with no species kit granting it, no word for it in the GM's own text, and no print body that has it — print gives darkvision to 1 of 26 Humanoids ("darkvision 60 ft.; Passive Perception 13" -> "Passive Perception 13")
```


---


### Under-Maze Herder — in the run

**Concept:** a minotaur reaver who herds prey into the maze

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Under-Maze Herder | 6 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 4 / off 6 → 5; sustained 44 (2 × Greataxe); nova none; dmg 44

```
Under-Maze Herder

Large Monstrosity, Neutral Evil

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

Multiattack. The under-maze herder makes two Greataxe attacks.

Greataxe. Melee Attack Roll: +7, reach 10 ft. 22 (4d8 + 4) Slashing damage.

Bonus Actions

Charge. The under-maze herder moves up to half its Speed straight toward an enemy it can see.

Herder's Lunge (1/Day). Immediately after dealing damage to a creature that is already Bloodied, the under-maze herder moves up to half its Speed without provoking Opportunity Attacks, and it makes one Greataxe attack.

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
- Actions/Greataxe — weapon greataxe
- Bonus Actions/Charge — minotaur kit; the GM's clause "a minotaur reaver who herds prey into the maze"
- Bonus Actions/Herder's Lunge — library seed rampage

**Engine trace**

```
[path] refused: print_body "Minotaur" is not in the corpus
[path] homebrew — species minotaur — "a minotaur reaver who herds prey into the maze" (call)
[route] brute type=Monstrosity mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | brute-charger: ✓ ("herds prey into the maze") | brute-charger: no line key in the words — the model's read of its quote | brute-charger -> brute: a charger is a mechanic engine and needs a key in the words — the model's read of its quote cannot land it
[concept] resolve: archetype=brute type=Monstrosity themes=bestial/subterranean mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: herding prey into the maze [behavior] | horn-and-axe trampling bulk [body] | the bone-strewn labyrinth it guards [aura]
[concept] identity: The minotaur reaver does not charge to kill — it lumbers forward on a wide arc, angling its horns and bulk to drive prey away from open ground and toward the throat of the maze, bellowing to spook them deeper. Once a quarry is penned in the corridors it switches to brutal, patient tradework: goring rushes to split the herd, then heavy greataxe sweeps against whatever is cornered, using the walls as a second weapon. It is a cunning herder that never flees and never finishes a fight early, funnelling and bleeding its victims until the maze itself does the killing.
[concept] lore: A bull-headed reaver grown lean and clever in the twisting under-maze, it keeps the labyrinth's passages glutted with the bones of travellers it drove there, because it feeds on whatever the walls finally corner.
[reskin] donor: brute-5 -> CR 6
[reskin] [path] decides: homebrew (the matcher agrees)
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] species kit: minotaur — "a minotaur reaver who herds prey into the maze": Charge (Troll/Charge); darkvision 60 ft.
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline by rule: "the under-maze herder" — the call answered "the maze herder" (kind), which the name does not support
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a minotaur reaver" -> has (descriptive), head | "herds prey into the maze" -> has (mechanical) [asked: movement]
[reskin] signature idea (action): "The herder lowers its horns and drives forward in a wide, sweeping arc, and every creature in that path is shoved bodily aside rather than simply struck — the bull's bulk and the walls do the work, so a foe caught between horn and stone is thrown off its feet and forced backward, and the herder chooses the direction it pushes them, always toward the deeper maze. It never stops to fight in the open" [rider/on_hit/movement] — menu: affliction, contagion, stunning-strike, charge-push, hook-rider, pounce (+ shelf: trample, leap, thrown-burst, shield-bash, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, rampage, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating)
[reskin] signature bound to the concept's verb: action — herd (herd)
[reskin] word match declined by the call: herd, charge-push — the key word does not mean the mechanic here
[reskin] value check: "Goring Sweep" EV 2.9 vs floor 10.9 (one attack of 2) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Goring Sweep" — the ladder could not lift it; the fallback stands in
[reskin] fallback respects the call: herd left the shelf — the call declined it for this sheet
[reskin] value check: "Rampage (1/Day)" EV 17.7 vs floor 3.4 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: rampage -> Bonus Actions/"Rampage (1/Day)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Walls are the herder's second axe: when a foe it can see is pinned against stone or trapped in a dead end, its greataxe and goring rushes land with crushing weight, splintering bone against the corridor itself and leaving the victim fenced in and bleeding where the maze can finish them." [trait/always/damage] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending, weapon-lodge)
[reskin] word match declined by the call: bound — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "Walls are the herder's second axe: when a foe it can see is pinned against stone or trapped in a dead end, its greataxe and goring rushes land with crushing weight, splintering bone against the corridor itself and leaving the victim fenced in and bleeding where the maze can finish them." [trait/always/damage] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst, heated-body)
[reskin] weapons answered: Greataxe = greataxe
[reskin] languages by mind: "None" -> "Common" (sapient)
audit finding below confidence gate: Rampage (1/Day) The trigger fires off any damage dealt by any means, so a GM must decide whether a Greataxe or another effect opens the clause; it reads as an event-triggered reaction but is labeled a bonus action, which is a contradictory action-economy timing.
[reskin] audit rename: "Rampage (1/Day)" -> "Herder's Lunge (1/Day)"
```


---


### Ser Bramwell Rook — in the run

**Concept:** a knight-errant of the fallen order who shields the weak

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Ser Bramwell Rook | 7 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 6 / off 8 → 7; sustained 52 (2 × Longsword); nova none; dmg 52

```
Ser Bramwell Rook

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

Aura of Authority. While in a 10-foot Emanation originating from the rook, the rook and its allies have Advantage on attack rolls and saving throws, provided the rook doesn't have the Incapacitated condition.

Actions

Multiattack. The rook makes two Longsword attacks. It can replace one attack with a use of Shield Bash.

Longsword. Melee Attack Roll: +7, reach 5 ft. 26 (5d8 + 4) Slashing damage.

Shield Bash. Strength Saving Throw: DC 14, one creature within 5 feet that the rook can see. Failure: 24 (7d6) Bludgeoning damage. If the target is a Medium or smaller creature, it has the Prone condition. Success: Half damage only.

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
- Actions/Shield Bash — print's own row

**Engine trace**

```
[path] class_npc — class paladin — "knight-errant" (call)
[route] defender type=Humanoid mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | defender: ✓ ("shields the weak") | defender: key "knight" (class verb)
[concept] name: provided_name rejected — "knight-errant of the fallen order…" is the description, not a name
[concept] resolve: archetype=defender type=Humanoid themes=armed/forged mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: shouldering the blows meant for the weak [behavior] | battered shield and dented iron plate [object] | the broken order's surviving oath [aura]
[concept] identity: A scarred veteran of a broken chivalric order, the knight-errant plants itself before those smaller than itself and makes its armor a wall they live behind, wading in with a battered iron blade only to turn a blow aside with its shield when a charge or a fleeing attacker breaks past it. Every round after it commits to that wall, punishing anyone who turns their back on it or slides past its reach, and it takes the wounds meant for the helpless without flinching. It fights to the death for its charges and breaks only if the people it shields are already gone.
[concept] lore: When the Fallen Order's banners came down, a handful of its knights swore their oaths to the defenseless rather than to a lord, and they still walk the roads in dented iron, escorting the small and the lost to safety.
[reskin] [path] class body: the paladin stands on the Gladiator — the class's own print block, nearest CR 7
[reskin] print canon array: STR 18, DEX 15, CON 16, INT 10, WIS 12, CHA 15 — the Gladiator's, STR fitted to +7
[reskin] donor: defender-5 -> CR 7
[reskin] row gated out: Guard Aura (aura) — the concept did not claim this mechanic
[reskin] [path] decides: class_npc on the Gladiator · class paladin (the matcher would have said homebrew)
[reskin] print canon: "a knight-errant of the fallen order who shields the weak" heads on the Gladiator — print's rows ride along; the seat stays
[reskin] repair round 1: 1 defect(s) — rename for "Hybrid Attack" takes the shelf's own row name "Shield Bash" — that name belongs to a template this sheet may still receive; choose another
[reskin] class kit: paladin — "knight-errant": Aura of Authority (Hobgoblin Captain/Aura of Authority)
[reskin] inline by rule: "the rook" — the call answered "Ser Bramwell" (person), which the name does not support
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a knight-errant of the fallen order" -> has (descriptive), head | "shields the weak" -> has (descriptive)
[reskin] menu pruned: action — snap-shot (the sheet cannot render them)
[reskin] signature idea (action): "When a foe's charge or hurried retreat carries it past the knight's reach, the knight slams its battered shield into the passing body and stops it dead — the blow lands as the enemy leaves, pinning the attacker in place beside the wall it was trying to slip around. This only works against someone breaking away or rushing through the knight's line, never against a foe standing and trading blows." [reaction/on_being_hit/movement] — menu: riposte (+ shelf: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, stunning-strike, charge-push, hook-rider)
[reskin] signature bound to the concept's verb: action — rally (shield, orders)
[reskin] word match declined by the call: rally, push-prone — the key word does not mean the mechanic here
[reskin] signature miss: action — "When a foe's charge or hurried retreat carries it past the knight's reach, the knight slams its battered shield into the passing body and stops it dead — the blow lands as the enemy leaves, pinning the attacker in place beside the wall it was trying to slip around. This only works against someone breaking away or rushing through the knight's line, never against a foe standing and trading blows." [reaction/on_being_hit/movement] — the model picked "riposte" (no verb, and it quotes nothing the GM typed) over a concept-verb template (rally, herd)
[reskin] fallback respects the call: rally, push-prone left the shelf — the call declined them for this sheet
[reskin] fallback stands down: the class_npc path has no shelf — the Gladiator's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 19 already beats print's AC 15 at CR 7, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "The knight's oath makes the wounds aimed at the small land on the iron instead: whenever a nearby ally smaller than the knight is struck, the knight shoulders part of that harm itself, its dented plate drinking the blow so the charge walks away. It cannot do this for more than one charge at a time, and it never turns this protection on itself." [trait/always/defense] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending, weapon-lodge)
[reskin] word match declined by the call: absorption, resonant-body — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "The knight's oath makes the wounds aimed at the small land on the iron instead: whenever a nearby ally smaller than the knight is struck, the knight shoulders part of that harm itself, its dented plate drinking the blow so the charge walks away. It cannot do this for more than one charge at a time, and it never turns this protection on itself." [trait/always/defense] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, absorption, bloodied-burst, resonant-body)
[reskin] weapons answered: Longsword = longsword; Shield Bash = shield
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] print canon alignment: Lawful Good -> Neutral — the Gladiator's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon attack: "Spear" keeps print's hybrid frame — reach 5 ft. or range 20/60 ft. (the Gladiator's weapon is thrown)
[reskin] print canon attack: "Longsword" -> "Spear" — the Gladiator's own row
[reskin] print canon rows: Oath-Sworn Hurl leave — the Gladiator has one melee row (Spear), and Multiattack reads print's
[reskin] print canon row priced: Shield Bash — dice 9 → 24
[reskin] print canon row: Actions/Shield Bash — the Gladiator's own
[reskin] multiattack re-read — "Spear" left; "Multiattack" now reads "The rook makes two attacks."
[reskin] class weapon: Actions/"Spear" -> "Longsword" — a paladin fights with a longsword, not the Gladiator's
[reskin] multiattack replacement clause: It can replace one attack with a use of Shield Bash.
[reskin] multiattack normalised: "The rook makes two Longsword attacks. It can replace one attack with a use of Shield Bash."
```


---

## Review batch — twist-ten-2026-10-19T15-11-36

The checker ran first. The gate table covers every block in the run; every block of the run follows. Each block carries its checker row above and its engine trace below. Hand-derive against the row first; then read for what predicates can't see.

### Gate table — the whole run

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Silverwary Troll | 6 | 2024 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 4/4 |
| Fen-Burn Hydra | 8 | 2024 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | FAIL: multiattack-integrity | ok | FAIL (1) | 1/1 | 4/4 |
| Pass-Keeper Grath | 2 | 2024 | defender-1 | ok | ok | SOFT: reach | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 4/4 |
| Purple Worm | 15 | 2024 | brute-13 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/3 |
| Dire Wolf | 1 | 2024 | skirmisher-1 | ok | ok | SOFT: multiattack-count | ok | ok | ok | ok | ok | FAIL: multiattack-integrity | ok | FAIL (1) | 1/1 | 2/2 |
| Jarl Hrimgar | 9 | 2024 | skirmisher-8 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/2 | 3/3 |
| Forgotten Watchman | 1 | 2024 | skirmisher-1 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 2/2 |
| Moonsplit Two-Head | 2 | 2024 | skirmisher-1 | ok | FAIL: under | SOFT: multiattack-count | ok | ok | ok | ok | ok | FAIL: multiattack-integrity | ok | FAIL (2) | 1/1 | 1/1 |
| Steward of the Springs | 13 | 2024 | lurker-8 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 8/8 |
| Last Ringer | 3 | 2024 | lurker-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 7/7 |

**Dropped 3 of 11 user clauses** (coverage 73%); concept share 100% (38/38 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- skirmisher-1 / reader: 2
- brute-5 / reader: 1
- skirmisher-1 / bands: 1



---


### Dire Wolf — lowest CR

**Concept:** name: Dire Wolf | with a frost-rimed hide

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Dire Wolf | 1 | skirmisher-1 | ok | ok | SOFT: multiattack-count | ok | ok | ok | ok | ok | FAIL: multiattack-integrity | ok |

- structure · soft · multiattack-count: Multiattack says 2 but names no rows
- reader · fail · multiattack-integrity: "The dire wolf makes two attacks." on a sheet with no attack row at all
- read: def 1/8 / off 0 → 0.0625; sustained 0 (2 × ?); nova none; dmg 0

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

Resistances Cold

Senses darkvision 60 ft.; Passive Perception 13

Languages None

CR 1 (XP 200; PB +2)

Traits

Rimeburst Hide. A creature that touches the dire wolf or hits it with a melee attack while within 5 feet of it takes 3 (1d6) Cold damage.

Pack Tactics. The dire wolf has Advantage on an attack roll against a creature if at least one of the dire wolf's allies is within 5 feet of the creature and the ally doesn't have the Incapacitated condition.

Actions

Multiattack. The dire wolf makes two attacks.

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

- Traits/Rimeburst Hide — template heated-body; library draw (seed unstamped); binds the GM's words: frost+shard
- Traits/Pack Tactics — print's own row
- Actions/Multiattack — the chassis

**Engine trace**

```
[path] twist — Dire Wolf (is) — "Name field: Dire Wolf" (code)
[route] skirmisher type=Beast mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | skirmisher: ✓ ("Dire Wolf") | skirmisher-skulker: the call read "hide" as not meaning that mechanic here — no override | skirmisher stands: every key that would override it was read as a figure of speech | skirmisher: no line key in the words — the model's read of its quote
[concept] name: "Dire Wolf" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] mind promoted to sapient — the identity asserts performance/taunting
[concept] resolve: archetype=skirmisher type=Beast themes=bestial/breath mind=sapient style=— energy=Cold mix=both identity=✓ lore=✓
[concept] name: provided "Dire Wolf"
[concept] mechanics: none claimed
[concept] signature elements: pack hunting that encircles and cuts off prey [behavior] | frost-rimed hide that never melts [body]
[concept] identity: A frost-rimed dire wolf opens with a burst of speed from cover, seizing the weakest prey in its jaws while its pack fans out to cut off escape. Every round after, it darts in to bite and drag, then slips back out of reach with frost cracking off its hide, circling until the pack's numbers tell. It does not toy with prey — it hunts to feed, and when bloodied and outnumbered it breaks off and runs rather than die for a meal.
[concept] lore: Frost-rimed dire wolves are the great white hunters of the high snowfields, their coats crusted with hoarfrost that never melts, and they want nothing more than to pull down a warm body and drag it back to the pack's den.
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
[reskin] signature idea (action): "The wolf lunges at prey already hurt or slowed, snapping for the hamstring to bring it down and drag it toward the waiting pack. A creature it wounds this way has its speed cut down and can't slip away from the wolf's reach; if it's already bleeding, the bite tears deeper." [rider/on_hit/condition] — menu: contagion, charge-push, hook-rider, pounce, isolation, charge (+ shelf: snare, shield-bash, lure, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, slow-bolt, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, riposte)
[reskin] signature bound to the concept's verb: action — slow-bolt (frost)
[reskin] word match declined by the call: slow-bolt — the key word does not mean the mechanic here
[reskin] fit declined: "Hamstring Drag" — a print body takes only what the user's words ask; the call offered no quote, and the key table finds no verb either (the blacksmith's rally, critic-ten 2026-10-01)
[reskin] fallback respects the call: slow-bolt left the shelf — the call declined it for this sheet
[reskin] fallback stands down: the twist path has no shelf — the Dire Wolf's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "Hoarfrost sloughs off the dire wolf's hide in biting shards whenever something fastens onto it, numbing fresh wounds. Anyone who strikes it in close combat gets frost in the eyes and cracks across their knuckles, leaving them clumsy and recoiling, and it can drag a clinging foe along as it darts away." [trait/on_being_hit/condition] — menu: heated-body, absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst)
[reskin] signature bound to the concept's verb: trait — heated-body (frost)
[reskin] signature template (trait): heated-body -> Traits/"Rimeburst Hide" ("Hoarfrost sloughs off its hide in biting shards when a creature hits it in close [verb: frost:concept, shard:idea]")
[reskin] weapons answered: Bite = none
[reskin] print canon speed: 30 ft. -> 50 ft. — the Dire Wolf's walk; the concept's other modes stay
[reskin] languages held: None stands — INT 3 on a Beast speaks nothing, whatever the mind read said
[reskin] resistances derived: Cold
[reskin] print canon trait: Pack Tactics — "Dire Wolf — with a frost-rimed hide" is the Dire Wolf (print's own row)
[reskin] print canon: chassis row leaves — Actions/"Bite" — the Dire Wolf prints no row for it and no path stage claimed it
[reskin] multiattack re-read — "Bite" left; "Multiattack" now reads "The dire wolf makes two attacks."
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the seat's, not the Dire Wolf's
[reskin] print canon: chassis row leaves — Traits/"Pack Skirmish" is the seat's, not the Dire Wolf's
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

Multiattack. The purple worm makes one attack and one Tail Stinger attack.

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
- Actions/Tail Stinger — print's own row
- Traits/Tunneler — print's own row
- Bonus Actions/Swallow — print's own row

**Engine trace**

```
[path] twist — Purple Worm (is) — "Name field: Purple Worm" (code)
[route] brute-grappler type=Monstrosity mechanics=grapple, engulf — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: on the GM's own words "Purple Worm — that swallowed a war-band'" | brute-grappler: ✓ ("swallowed a war-band's armoury") | brute-grappler: no line key in the words — the model's read of its quote
[concept] name: "Purple Worm" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] resolve: archetype=brute type=Monstrosity themes=devouring/subterranean mind=bestial style=grappler energy=Acid mix=both identity=✓ lore=✓
[concept] name: provided "Purple Worm"
[concept] mechanics: grapple, engulf
[concept] signature elements: swallowing prey whole into a gut packed with corroded weapons [behavior] | coils and hide studded with fused blades, hafts, and mail-scraps [body] | the war-band's armoury lodged in its belly and plates [object]
[concept] identity: A colossal purple worm writhes up from the deep with a war-band's worth of loot fused into its hide and gut — blades, hafts, and mail-scraps bristling from its coils like iron barnacles. It opens by breaching beneath the densest formation and engulfing as many fighters as its maw will hold, then grinds and tumbles them against the swallowed arsenal inside its gut while its barbed, weapon-studded tail sweeps the survivors away. Wounded, it does not flee; it burrows shallow and strikes upward again and again, dragging prey underground to digest at leisure and never letting a battle end on anyone's terms but its own.
[concept] lore: Grown fat on a mercenary company's spilled baggage train, this worm has welded every blade and haft it could not dissolve into its own armor, and now it hunts armed columns the way other worms hunt cattle — the richer the steel, the keener its hunger.
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
[reskin] signature idea (action): "The worm rears and sweeps its whole studded length in a wide arc, and the fused blades and mail-scraps on its hide turn that sweep into a shredding flail. Anyone it rakes is left stumbling and off-balance, easy to knock down and slow to recover, so the survivors of the gut get scattered and harried exactly when they try to regroup." [rider/on_hit/condition] — menu: contagion, stunning-strike, charge-push, hook-rider, pounce, charge (+ shelf: swallow, condition-payoff, shield-bash, hook-drag, burrow-ambush, escalating-dread, terror-pulse, herd, drain, exploiter, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating)
[reskin] signature bound to the concept's verb: action — swallow (swallow, swallows, swallowed)
[reskin] word match declined by the call: swallow — the key word does not mean the mechanic here
[reskin] fit declined: "Studded Sweep" — a print body takes only what the user's words ask; the call offered no quote, and the key table finds no verb either (the blacksmith's rally, critic-ten 2026-10-01)
[reskin] fallback respects the call: swallow left the shelf — the call declined it for this sheet
[reskin] fallback stands down: the twist path has no shelf — the Purple Worm's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "Every blade, haft, and mail-scrap welded into its coils is still hungry metal — anything that strikes the worm or grapples with it drags itself across that bristling hide and gets torn and poisoned by the corroded steel. The longer a fight drags on against it, the more the worm's own armour turns every blow back on the attacker." [trait/on_being_hit/damage] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, earth-glide, tunneler, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] signature bound to the concept's verb: trait — tunneler (worm)
[reskin] word match declined by the call: tunneler, false-appearance, uncanny-sense, heated-body, absorption, bloodied-burst, resonant-body — the key word does not mean the mechanic here
[reskin] signature miss: trait — "Every blade, haft, and mail-scrap welded into its coils is still hungry metal — anything that strikes the worm or grapples with it drags itself across that bristling hide and gets torn and poisoned by the corroded steel. The longer a fight drags on against it, the more the worm's own armour turns every blow back on the attacker." [trait/on_being_hit/damage] — the model picked "weapon-lodge" (no verb, and it quotes nothing the GM typed) over a concept-verb template (tunneler)
[reskin] concept-first trait skipped: tunneler — the call read its match as a collision (the word is a modifier, or the sheet already answers it)
[reskin] weapons answered: Bite = none
[reskin] chassis nova: "Grinding Gut (Recharge 5-6)" — the brute-13's own nova row (its "Area Nova", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] print canon speed: 40 ft. -> 50 ft. — the Purple Worm's walk; the concept's other modes stay
[reskin] print canon speed: Burrow -> 50 ft. — the Purple Worm's own
[reskin] print canon row: Actions/Tail Stinger — the Purple Worm's second melee row, beside the chassis's
[reskin] print canon multiattack: "The purple worm makes one Bite attack and one Tail Stinger attack." — the Purple Worm's own
[reskin] languages held: None stands — INT 1 on a Monstrosity speaks nothing, whatever the mind read said
[reskin] print canon trait: Tunneler — "Purple Worm — that swallowed a war-band's armoury" is the Purple Worm (print's own row)
[reskin] print canon: chassis row leaves — Actions/"Grinding Gut (Recharge 5-6)" is the seat's nova, not the Purple Worm's
[reskin] print canon: chassis row leaves — Actions/"Bite" — the Purple Worm prints no row for it and no path stage claimed it
[reskin] multiattack re-read — "Bite" left; "Multiattack" now reads "The purple worm makes one attack and one Tail Stinger attack."
[reskin] print canon row: Bonus Actions/Swallow — the Purple Worm's own
```


---


### Silverwary Troll — a 2024 sheet

**Concept:** a troll that grows back unless the blade was silvered

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Silverwary Troll | 6 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- **dropped clause:** "grows back unless the blade was silvered"
- read: def 4 / off 5 → 4.5; sustained 33 (3 × Rend); nova none; dmg 33

```
Silverwary Troll

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

Regeneration. The troll regains 15 Hit Points at the start of each of its turns. If the troll takes damage from a silvered weapon, this trait doesn't function on the troll's next turn. The troll dies only if it starts its turn with 0 Hit Points and doesn't regenerate.

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
[path] twist — Troll (is) — "a troll" (call)
[route] brute-regenerator type=Giant mechanics=regeneration — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | brute-regenerator: ✓ ("grows back unless the blade was silvered") | brute-regenerator: no line key in the words — the model's read of its quote | bane: "silver" on the GM's own words "unless the blade was silvered"
[concept] hints: troll→canon ✓ ("a troll that grows back unless the blade")
[concept] resolve: archetype=brute type=Giant themes=bestial/uncanny mind=sapient style=regenerator energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: regeneration
[concept] signature elements: regeneration that only silver stops [body] | relentless, laughing melee brawling [behavior] | hide-plated giant frame [body]
[concept] identity: A towering, hide-skinned brute that wades into melee swinging fists and a jagged club with careless, joyful cruelty, trusting its knitting flesh to soak every counterblow. Round after round, wounds it takes seal before the next swing lands, so it presses the attack relentlessly and shrugs off any hurt that isn't silver. It is not mindless — it laughs, feints, and toys with foes who can't pierce its regeneration, staying to the last even when bloodied by silver because it simply never learned to fear death.
[concept] lore: Born of old battlefields where spilled blood soaked the earth, these giant troll-kin wander looking for fights worth remembering — and blades worth fearing.
[reskin] print canon route: the Troll's body outranks the regenerator seat — no verb in the words names it; the plain brute line
[reskin] print canon defenses: HP 116 -> 94, AC 14 -> 15 — the Troll's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 18, DEX 13, CON 20, INT 7, WIS 9, CHA 7 — the Troll's at its own CR; attack +7 -> +7, DC 16 (print's)
[reskin] regeneration organ injected — 10/turn
[reskin] regeneration off-switch: silver (the call read the GM's weakness clause as silver ("unless the blade was silvered"))
[reskin] donor: brute-5 -> CR 6
[reskin] [path] decides: twist on the Troll (the matcher agrees)
[reskin] print canon: "a troll that grows back unless the blade was silvered" heads on the Troll — print's rows ride along; the seat stays
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline declared: "the troll" — the call's own answer (kind), built from the name
[reskin] inline form: "the troll" — the model's own reading of the name
[reskin] save dc derived: DC 14 -> 16 (8 + PB 3 + the sheet's best 5) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] lacks refused: "unless the blade was silvered" names no absence — nothing in it takes anything away
[reskin] clauses: "a troll" -> has (descriptive), head | "grows back unless the blade was silvered" -> has (mechanical) [asked: on_being_hit/heal]
[reskin] signature idea (action): "The troll's favorite trick is to swing at its enemy and mock an opening, inviting the counterblow and laughing when it lands. Whenever a foe strikes the troll in melee during the brawl, the troll immediately answers with a delighted haymaker of its own, treating the pain as a joke rather than a threat. It only gets this free swing once per exchange, so it can't be goaded into endless punishment — " [reaction/on_being_hit/damage] — menu: EMPTY (+ shelf: trample, leap, thrown-burst, shield-bash, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, rampage, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, stunning-strike, charge-push, hook-rider, pounce, charge)
[reskin] decline reason: action — the call answered none and names it "no_fit"
[reskin] signature miss: action — "The troll's favorite trick is to swing at its enemy and mock an opening, inviting the counterblow and laughing when it lands. Whenever a foe strikes the troll in melee during the brawl, the troll immediately answers with a delighted haymaker of its own, treating the pain as a joke rather than a threat. It only gets this free swing once per exchange, so it can't be goaded into endless punishment — " [reaction/on_being_hit/damage] — the model found no template that holds it (offered: aggro-curse, own-turn-punisher)
[reskin] fallback stands down: the twist path has no shelf — the Troll's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "The hide along its arms and knuckles is crusted over with old, hardened scar-tissue from a lifetime of healed-over wounds, so every blow it lands carries the memory of a hundred survived brawls. Wounds it inflicts ache and bleed like old battlefields, refusing to close cleanly on anyone the troll has struck." [trait/always/damage] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending, weapon-lodge)
[reskin] word match declined by the call: bloodied-fury, bloodied-burst, berserk, undead-fortitude — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "already_answered"
[reskin] signature miss: trait — "The hide along its arms and knuckles is crusted over with old, hardened scar-tissue from a lifetime of healed-over wounds, so every blow it lands carries the memory of a hundred survived brawls. Wounds it inflicts ache and bleed like old battlefields, refusing to close cleanly on anyone the troll has struck." [trait/always/damage] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst, bloodied-burst)
[reskin] repair: 1 clause(s) with no row — "grows back unless the blade was silvered"; one targeted call with the sheet as context
[reskin] repair: the answer held no rows — the clauses stay unplaced
[reskin] weapons answered: Slam = none
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] print canon alignment: Chaotic Neutral -> Chaotic Evil — the Troll's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common" -> "Giant" — the Troll's
[reskin] print canon speed: 40 ft. -> 30 ft. — the Troll's walk; the concept's other modes stay
[reskin] print canon attack: "Slam" -> "Rend" — the Troll's own row
[reskin] print canon multiattack: "The troll makes three Rend attacks." — the Troll's own
[reskin] print canon trait: Loathsome Limbs — "a troll that grows back unless the blade was silvered" is the Troll (print's own row)
[reskin] print canon trait: Regeneration — print's text replaces the chassis's (the Troll regenerates 15, not the chassis's 10 — critic's audit 2026-10-02)
[reskin] print canon row: Bonus Actions/Charge — the Troll's own
[reskin] vulnerability rejected — "Slashing" has no warrant in the concept's own text (print's default is none)
[reskin] regeneration keyed to the GM's own bane: "Regeneration" keyed "Acid or Fire damage" and the GM named silver ("unless the blade was silvered") — print's row keeps everything else
[reskin] asked but unanswered: "grows back unless the blade was silvered" asked for on_being_hit and no row binds the clause
[reskin] audit rewrite blocked — "Loathsome Limbs" is engine-authored chassis text
```


---


### Fen-Burn Hydra — a print donor

**Concept:** Hydra whose stumps smoke instead of regrowing

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Fen-Burn Hydra | 8 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | FAIL: multiattack-integrity | ok |

- reader · fail · multiattack-integrity: "The fen-burn hydra makes as many attacks as it has heads." on a sheet with no attack row at all
- read: def 8 / off 0 → 4; sustained 0 (1 × ?); nova none; dmg 0

```
Fen-Burn Hydra

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

Hold Breath. The fen-burn hydra can hold its breath for 1 hour.

Multiple Heads. The fen-burn hydra has five heads. Whenever the fen-burn hydra takes 25 damage or more on a single turn, one of its heads dies. The fen-burn hydra dies if all its heads are dead.

Reactive Heads. For each head the fen-burn hydra has beyond one, it gets an extra Reaction that can be used only for Opportunity Attacks.

Actions

Multiattack. The fen-burn hydra makes as many attacks as it has heads.

Bonus Actions

Venting Haze (1/Day). The fen-burn hydra creates a wall of scalding smoke in a 20-foot Emanation originating from itself. The effect lasts while the fen-burn hydra maintains Concentration on it, up to 10 minutes. has Disadvantage on attack rolls

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
- Traits/Hold Breath — print's own row
- Traits/Multiple Heads — print's own row
- Traits/Reactive Heads — print's own row
- Bonus Actions/Venting Haze — template zone; library draw (seed unstamped); binds the GM's words: smoke+cloud+haze

**Engine trace**

```
[path] twist — Hydra (is) — "Hydra" (call)
[route] brute-regenerator type=Monstrosity mechanics=regeneration — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | brute-regenerator: ✓ ("stumps smoke instead of regrowing") | brute-regenerator: no line key in the words — the model's read of its quote | bane refused: the words carry no weakness clause, so "fire" answers a question nobody asked
[concept] resolve: archetype=brute type=Monstrosity themes=bestial/breath mind=bestial style=regenerator energy=Fire mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: regeneration
[concept] signature elements: smoking severed stumps that vent scalding haze instead of regrowing heads [body] | wounds that close as fast as they open [behavior] | relentless multi-headed assault that grows more dangerous under damage [behavior]
[concept] identity: The Venting Hydra wades into battle behind a wall of snapping heads, biting and crushing anything within reach. Every time a head is severed, the stump erupts in scalding, blinding smoke that plumes around it and its attackers, thickening as the fight wears on. Its flesh knits shut within seconds, so pressure makes it more dangerous, not less — it does not flee; it grinds forward until either it or its prey stops moving.
[concept] lore: A hydra whose regenerative flesh went wrong, knitting shut into stoppered stumps that vent the heat of its own healing as acrid smoke — it wanders the fens searching for anything it can consume to quiet the burn within.
[reskin] print canon route: the Hydra's body outranks the regenerator seat — no verb in the words names it; the plain brute line
[reskin] print canon route: the regenerator seat's organ leaves too — the Hydra has no Regeneration of its own
[reskin] print canon defenses: HP 149 -> 184, AC 15 -> 15 — the Hydra's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 20, DEX 12, CON 20, INT 2, WIS 10, CHA 7 — the Hydra's at its own CR; attack +8 -> +8, DC 16 (print's)
[reskin] donor: brute-5 -> CR 8
[reskin] [path] decides: twist on the Hydra (the matcher agrees)
[reskin] print canon: "Hydra whose stumps smoke instead of regrowing" heads on the Hydra — print's rows ride along; the seat stays
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline declared: "the fen-burn hydra" — the call's own answer (kind), built from the name
[reskin] inline form: "the fen-burn hydra" — the model's own reading of the name
[reskin] save dc derived: DC 15 -> 16 (8 + PB 3 + the sheet's best 5) — no stat on the sheet reached it
[reskin] lacks asked: "instead of regrowing"
[reskin] clauses: "Hydra whose stumps smoke instead of regrowing" -> LACKS (mechanical) [asked: on_being_hit/condition]
[reskin] signature idea (action): "The hydra wrenches open the half-closed wounds along its necks, loosing a rolling bank of scalding smoke that hangs around it like a wall of burning haze. Anyone caught in that smoke is blinded and choking and can't seem to draw a clean breath while it lasts, and the cloud lingers after the hydra moves on. Its stumps stay open and venting for a while afterward, so its bite keeps scalding hotter th" [action/once_per_fight/condition] — menu: trample, thrown-burst, shield-bash, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, zone, zone-seed (+ shelf: leap, rampage, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, charge)
[reskin] signature bound to the concept's verb: action — zone, zone-seed (smoke)
[reskin] signature template: zone -> Actions/"Venting Haze (1/Day)" ("The hydra vents a lingering bank of scalding smoke from its smoking stumps that  [verb: smoke:concept, cloud:idea, haze:idea]")
[reskin] signature idea (trait): "Whenever a head is severed or the hydra takes a telling wound, the stoppered stump bursts open and vents searing smoke into the air around it, scalding and stinging anyone nearby. That vented smoke pours out in a thick plume that clings to the ground and drags at the eyes and lungs of those fighting beside it, so the longer the fight goes the harder it is to see the hydra's heads coming." [trait/on_being_hit/condition] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] signature bound to the concept's verb: trait — warded-mending (regrows)
[reskin] word match declined by the call: warded-mending — the key word does not mean the mechanic here
[reskin] trait declined: "Smoking Stumps" — bound only on the idea's own words (wounded:idea, burst:idea) with no key in the concept; a meat body earns its trait by the user's verb (the sniper's tracker, critic 2026-09-29)
[reskin] weapons answered: Bite = none
[reskin] speed by concept: added Swim 40 ft. — the concept's movement set decides
[reskin] print canon multiattack: "The fen-burn hydra makes as many Bite attacks as it has heads." — the Hydra's own
[reskin] languages held: None stands — INT 2 on a Monstrosity speaks nothing, whatever the mind read said
[reskin] print canon defenses: immunities none -> Blinded, Charmed, Deafened, Frightened, Stunned, Unconscious — the Hydra's own header lines
[reskin] print canon trait: Hold Breath — "Hydra whose stumps smoke instead of regrowing" is the Hydra (print's own row)
[reskin] print canon trait: Multiple Heads — "Hydra whose stumps smoke instead of regrowing" is the Hydra (print's own row)
[reskin] print canon trait: Reactive Heads — "Hydra whose stumps smoke instead of regrowing" is the Hydra (print's own row)
[reskin] print canon: chassis row leaves — Actions/"Bite" — the Hydra prints no row for it and no path stage claimed it
[reskin] multiattack re-read — "Bite" left; "Multiattack" now reads "The fen-burn hydra makes as many attacks as it has heads."
[reskin] dead control row: "Venting Haze (1/Day)" moves to Bonus Actions — no damage, no save, no KO condition
[reskin] asked but unanswered: "Hydra whose stumps smoke instead of regrowing" asked for on_being_hit and no row binds the clause
[reskin] audit rewrite blocked — "Multiple Heads" is engine-authored chassis text
[reskin] audit rewrite blocked — "Multiple Heads" is engine-authored chassis text
[reskin] lacks clause: Traits/"Multiple Heads" keeps its blow, loses the regeneration — "Hydra whose stumps smoke instead of regrowing"
```


---


### Pass-Keeper Grath — one marked soft

**Concept:** a hobgoblin with a halberd

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Pass-Keeper Grath | 2 | defender-1 | ok | ok | SOFT: reach | ok | ok | ok | ok | ok | ok | ok |

- structure · soft · reach: Actions/Halberd: reach 10 on a Medium body with no tether word
- read: def 1 / off 2 → 1.5; sustained 12 (1 × Halberd); nova none; dmg 12

```
Pass-Keeper Grath

Medium Humanoid, Lawful Evil

AC 17
Initiative +1 (11)

HP 38 (7d8 + 7)

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
+3
CHA
9
-1
-1

Skills Athletics +5, Perception +2

Senses darkvision 60 ft.; Passive Perception 12

Languages Common, Goblin

CR 2 (XP 450; PB +2)

Traits

Great Weapon Master. When Grath hits a creature with its Halberd, the attack deals an extra 2 damage.

Pack Tactics. The hobgoblin has Advantage on an attack roll against a creature if at least one of the hobgoblin's allies is within 5 feet of the creature and the ally doesn't have the Incapacitated condition.

Actions

Halberd. Melee Attack Roll: +5, reach 10 ft. 12 (2d8 + 3) Slashing damage.

Longbow. Ranged Attack Roll: +5, range 150/600 ft. 5 (1d8 + 1) Piercing damage.

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
- Actions/Halberd — authored for this sheet; a named part; the GM's clause "a hobgoblin with a halberd"; weapon halberd
- Actions/Longbow — print's own row; weapon longbow

**Engine trace**

```
[path] twist — Hobgoblin Warrior (is) — "a hobgoblin with a halberd" (call)
[route] defender type=Humanoid mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | defender: ✓ ("a hobgoblin with a halberd") | defender: no line key in the words — the model's read of its quote
[concept] name: provided_name rejected — "a hobgoblin with a halberd…" is the description, not a name
[concept] resolve: archetype=defender type=Humanoid themes=armed/forged mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: the long-hafted halberd [object] | holding a line or passage against all comers [behavior] | catching a passing foe on the halberd's hook and pinning it [behavior]
[concept] identity: A hobgoblin halberdier plants itself in a doorway or formation gap and simply refuses to yield, using the halberd's reach to make the first comer pay for closing in. Each round it holds ground, jabbing at reach to break up charges before stepping back to reset the point, and it stalks sideways to punish anyone who tries to slip past toward the softer targets behind it. Bloodied, it doesn't break — it digs in harder, trading its own wounds for the chance to pin a foe in place, and fights to the death rather than abandon its post.
[concept] lore: A drilled rank-and-file soldier of a hobgoblin war-host, this halberdier was left to hold a pass or gatehouse and now lives only to keep that post, collecting the weapons of whoever tried to force it.
[reskin] the concept outranks the alias: the Hobgoblin Warrior is a Fey and the concept reads Humanoid — the words RESEMBLE it, they do not name it, so the print body stands down
[reskin] print canon array: STR 16, DEX 12, CON 12, INT 10, WIS 10, CHA 9 — the Hobgoblin Warrior's, STR fitted to +5
[reskin] donor: defender-1 -> CR 2
[reskin] row gated out: Guard Aura (aura) — the concept did not claim this mechanic
[reskin] [path] decides: twist on the Hobgoblin Warrior (the matcher would have said homebrew)
[reskin] print canon: "a hobgoblin with a halberd" heads on the Hobgoblin Warrior — print's rows ride along; the seat stays
[reskin] claim gate: CR 2 but a Humanoid body — the trait seat stays open (print: a material body carries a trait at every tier)
[reskin] named parts: Halberd (slot) — the user's words, the engine's numbers
[reskin] named parts landed: 1 attack row(s), 0 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline declared: "Grath" — the call's own answer (person), built from the name
[reskin] inline form: "Grath" — the model's own reading of the name
[reskin] save dc derived: DC 12 -> 13 (8 + PB 2 + the sheet's best 3) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a hobgoblin with a halberd" -> has (descriptive), head
[reskin] signature idea (action): "When Grath hits a creature closing on its post, it jabs the point to stop the advance and shifts back a step to reset — anyone trying to push past is pinned where it stands, unable to slip by while Grath holds the gap. The pin breaks the moment Grath moves off the spot or strikes at someone else." [rider/on_hit/movement] — menu: charge-push, hook-rider (+ shelf: seal, shield-bash, active-toll, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, riposte)
[reskin] word match declined by the call: push-prone, charge-push, hook-rider — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit"
[reskin] signature miss: action — "When Grath hits a creature closing on its post, it jabs the point to stop the advance and shifts back a step to reset — anyone trying to push past is pinned where it stands, unable to slip by while Grath holds the gap. The pin breaks the moment Grath moves off the spot or strikes at someone else." [rider/on_hit/movement] — the model found no template that holds it (offered: charge-push, hook-rider, push-prone)
[reskin] fallback respects the call: push-prone left the shelf — the call declined it for this sheet
[reskin] fallback stands down: the twist path has no shelf — the Hobgoblin Warrior's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "Whoever tries to slip past Grath has to get through the halberd first — any foe angling to go around it instead of through it draws a jab from the point as it turns on them. Grath always keeps the line, snapping at anyone who closes without facing it." [trait/on_being_hit/damage] — menu: absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura)
[reskin] word match declined by the call: berserk, weapon-lodge — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "Whoever tries to slip past Grath has to get through the halberd first — any foe angling to go around it instead of through it draws a jab from the point as it turns on them. Grath always keeps the line, snapping at anyone who closes without facing it." [trait/on_being_hit/damage] — the model found no template that holds it (offered: absorption, bloodied-burst, resonant-body, weapon-lodge, berserk)
[reskin] weapons answered: Halberd = halberd
[reskin] print canon alignment: Lawful Neutral -> Lawful Evil — the Hobgoblin Warrior's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon type: Humanoid stays — the words say humanoid ("a dire wolf but undead", 2026-10-01)
[reskin] print canon languages: "Goblin, Common" -> "Common, Goblin" — the Hobgoblin Warrior's
[reskin] print canon row: Actions/Longbow — the Hobgoblin Warrior's own ranged row, added (the chassis carried none to rename) — far from print's CR 0.5: print's dice, the sheet's +5
[reskin] print canon trait: Pack Tactics — "a hobgoblin with a halberd" is the Hobgoblin Warrior (print's own row)
[reskin] weapon reach: "Halberd" reaches 10 ft. — print's halberd has Reach
```


---


### Moonsplit Two-Head — bands fail

**Concept:** a wolf with two heads

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Moonsplit Two-Head | 2 | skirmisher-1 | ok | FAIL: under | SOFT: multiattack-count | ok | ok | ok | ok | ok | FAIL: multiattack-integrity | ok |

- bands · soft · aim-dpr: damage 0 a round is 100% under the card's 15
- bands · fail · under: damage 0 a round sits under print at CR 2 (5–36, n=94); reads CR 0.25
- structure · soft · multiattack-count: Multiattack says 2 but names no rows
- reader · fail · multiattack-integrity: "The two-head makes two attacks." on a sheet with no attack row at all
- read: def 1/2 / off 0 → 0.25; sustained 0 (2 × ?); nova none; dmg 0

```
Moonsplit Two-Head

Medium Beast, Unaligned

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

Pack Tactics. The two-head has Advantage on attack rolls against a creature if at least one of the two-head's allies is within 5 feet of the creature and the ally doesn't have the Incapacitated condition.

Actions

Multiattack. The two-head makes two attacks.

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

**Engine trace**

```
[path] twist — Wolf (is) — "a wolf with two heads" (call)
[route] skirmisher type=Monstrosity mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | skirmisher: ✓ ("a wolf with two heads") | skirmisher: no line key in the words — the model's read of its quote
[concept] resolve: archetype=skirmisher type=Monstrosity themes=bestial/uncanny mind=bestial style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: two heads that fight in concert [body] | pack flanking and hit-and-run harrying [behavior] | a second skull that never lets its prey out of sight [body]
[concept] identity: The two-headed wolf is a pack skirmisher that splits a target's attention: heads feint and snap from opposite flanks, then the beast wheels away before steel can answer. Every round it circles, probes, and darts back in, one head watching the prey while the other strikes at whatever it leaves unguarded. It is bold while the pack holds and turns to harrying and retreat once bloodied, never fighting alone to the last.
[concept] lore: A wolf whelped under a corrupted moon sometimes comes out with two skulls and one hunger, and it runs with the pack that birthed it until its doubled senses and doubled jaws make it the pack's spearpoint.
[reskin] the concept outranks the alias: the Wolf is a Beast and the concept reads Monstrosity — the words RESEMBLE it, they do not name it, so the print body stands down
[reskin] print canon array: STR 14, DEX 16, CON 12, INT 3, WIS 12, CHA 6 — the Wolf's, DEX fitted to +5
[reskin] donor: skirmisher-1 -> CR 2
[reskin] [path] decides: twist on the Wolf (the matcher would have said homebrew)
[reskin] print canon: "a wolf with two heads" heads on the Wolf — print's rows ride along; the seat stays
[reskin] claim gate: CR 2 but a Monstrosity body — the trait seat stays open (print: a material body carries a trait at every tier)
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline declared: "the two-head" — the call's own answer (kind), built from the name
[reskin] inline form: "the two-head" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] lacks refused: "a wolf with two heads" names no absence — nothing in it takes anything away
[reskin] clauses: "a wolf with two heads" -> has (descriptive), head
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The two-head lunges in low and snaps at a foe while its second skull wrenches its gaze away, so the target is caught watching the wrong head. Until the end of its next turn that foe has its attention badly divided, and the pack's next few strikes against it land harder and surer. The move is pure feint-and-bite: it costs the beast nothing but boldness." [rider/on_hit/condition] — menu: contagion, charge-push, hook-rider, pounce, isolation, charge (+ shelf: trample, gaze-single, snare, shield-bash, lure, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, riposte)
[reskin] word match declined by the call: feint-slip, gaze-single — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit"
[reskin] signature miss: action — "The two-head lunges in low and snaps at a foe while its second skull wrenches its gaze away, so the target is caught watching the wrong head. Until the end of its next turn that foe has its attention badly divided, and the pack's next few strikes against it land harder and surer. The move is pure feint-and-bite: it costs the beast nothing but boldness." [rider/on_hit/condition] — the model found no template that holds it (offered: contagion, charge-push, hook-rider, pounce, isolation, charge, gaze-single, disarm, feint-slip)
[reskin] fallback respects the call: gaze-single left the shelf — the call declined it for this sheet
[reskin] fallback stands down: the twist path has no shelf — the Wolf's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "One skull dozes while the other hunts, so the two-headed wolf is never truly caught off guard — it notices threats and keeps its bearings even when it looks distracted or halfway fleeing. The waking head simply takes over the moment the other falters." [trait/always/defense] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] word match declined by the call: faultless-tracker, blurred-form, evasion, relentless-pursuit — the key word does not mean the mechanic here
[reskin] trait declined: "Dozing Watch" — a shape fit with no verb match on a Monstrosity body; a meat body earns its trait by a verb
[reskin] weapons answered: Bite = none
[reskin] print canon alignment: Chaotic Neutral -> Unaligned — the Wolf's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon type: Monstrosity -> Beast — the Wolf's (a Unicorn printed Fey, 2026-10-01)
[reskin] print canon speed: 30 ft. -> 40 ft. — the Wolf's walk; the concept's other modes stay
[reskin] languages held: None stands — INT 3 on a Beast speaks nothing, whatever the mind read said
[reskin] print canon trait: Pack Tactics — "a wolf with two heads" is the Wolf (print's own row)
[reskin] print canon: chassis row leaves — Actions/"Bite" — the Wolf prints no row for it and no path stage claimed it
[reskin] multiattack re-read — "Bite" left; "Multiattack" now reads "The two-head makes two attacks."
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the seat's, not the Wolf's
[reskin] print canon: chassis row leaves — Traits/"Circling Skirmish" is the seat's, not the Wolf's
audit finding names unknown entry, dropped: Moonsplit Two-Head
audit finding below confidence gate: Two-Head A two-headed creature with pack coordination is presented as a plain Beast, but nothing in the block expresses a second head mechanically; the name and type advertise a duality the statblock never delivers.
```


---


### Jarl Hrimgar — in the run

**Concept:** a Huge frost giant jarl who throws boulders

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Jarl Hrimgar | 9 | skirmisher-8 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- **dropped clause:** "throws boulders"
- read: def 6 / off 9 → 7.5; sustained 56 (2 × Frost Axe); nova none; dmg 56

```
Jarl Hrimgar

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

Multiattack. Hrimgar makes two attacks, using Frost Axe or Great Bow in any combination.

Frost Axe. Melee Attack Roll: +10, reach 10 ft. 19 (2d12 + 6) Slashing damage plus 9 (2d8) Cold damage.

Great Bow. Ranged Attack Roll: +10, range 150/600 ft. 17 (2d10 + 6) Piercing damage.

Bonus Actions

War Cry (Recharge 5-6). Hrimgar or one creature of its choice that can see or hear it gains 16 (2d10 + 5) Temporary Hit Points and has Advantage on attack rolls until the start of Hrimgar's next turn.

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
- Actions/Great Bow — print's own row, renamed; weapon bow
- Bonus Actions/War Cry — print's own row

**Engine trace**

```
[path] twist — Frost Giant (is) — "frost giant" (call)
[route] skirmisher-hurler type=Giant mechanics=thrown-weapon — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | skirmisher-hurler: ✓ ("throws boulders") | skirmisher-hurler: key "throws" (class verb)
[concept] hints: hurler→style ✓ ("throws boulders")
[concept] resolve: archetype=skirmisher type=Giant themes=elemental/grasping mind=sapient style=hurler energy=Cold mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: thrown-weapon
[concept] signature elements: throwing boulders torn from the glacier [behavior] | a frost giant jarl's cold-forged body [body] | a hoard of boulders and reeling weapons [object]
[concept] identity: A Huge frost giant jarl strides into battle hurling boulders torn from the glacier itself, opening at range to shatter formations before any foe can close. Every round after that it keeps its distance, pacing and lobbing ice-rimed stone with crushing arm strength, daring enemies to come to it. Under pressure it grows colder in temper, taunting and toying with prey, and only turns to flee when its body is broken and the warband is lost.
[concept] lore: This jarl rules a glacier hall built of piled boulders and frozen tribute, and it wants the lowlands' holds cracked open so its clan can feast and claim new halls.
[reskin] print canon route: "a Huge frost giant jarl who throws boulders" is the Frost Giant, a bow-user — the hurler seat stands down for the plain line
[reskin] nova capped: "Sweeping Area Attack" 54 → 49 (the chassis nova obeys the cap: 50 at CR 9)
[reskin] print canon pb: print's +9 on PB +3 reads +10 on this sheet's PB +4; DCs follow
[reskin] print canon defenses: HP 150 -> 149, AC 17 -> 15 — the Frost Giant's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 23, DEX 9, CON 21, INT 9, WIS 10, CHA 12 — the Frost Giant's at its own CR; attack +8 -> +10, DC 18 (print's, on this sheet's PB)
[reskin] donor: skirmisher-8 -> CR 9
[reskin] style unserved: "hurler" has no skirmisher line — the plain line ships (resolve's style signal is noisy; not re-routed)
[reskin] [path] decides: twist on the Frost Giant (the matcher would have said homebrew)
[reskin] print canon: "a Huge frost giant jarl who throws boulders" heads on the Frost Giant — print's rows ride along; the seat stays
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline declared: "Hrimgar" — the call's own answer (person), built from the name
[reskin] inline form: "Hrimgar" — the model's own reading of the name
[reskin] save dc derived: DC 15 -> 18 (8 + PB 4 + the sheet's best 6) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] asked field dropped: the call answered trigger "at_will" for "throws boulders" but offered no quote
[reskin] asked field dropped: the call answered limit "at_will" for "throws boulders" but offered no quote
[reskin] clauses: "a Huge frost giant jarl" -> has (header) | "throws boulders" -> has (mechanical) [asked: attack]
[reskin] menu pruned: action — thrown-burst-seed, phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "Hrimgar wrenches a shelf of the glacier loose and hurls it not at one foe but down the middle of a formation, so that the whole line must scatter or be buried. The shattered shelf leaves a wide lane of loose, grinding ice behind it where the ground turns treacherous and any foe who stays rooted there is slowed to a crawl and harried by cold. This is the jarl's opening terror, meant to break ranks " [action/save/movement] — menu: gaze-single, snare, condition-payoff, throw-retrieve, shield-bash, lure, snare-bolt, sensory-strike, disarm, exploiter, slow-bolt (+ shelf: delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte, stunning-strike, charge-push, hook-rider, pounce, isolation, bolt-mark, charge)
[reskin] signature bound to the concept's verb: action — slow-bolt (frost)
[reskin] word match declined by the call: throw-retrieve, slow-bolt, snare-bolt — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit" after being shown slow-bolt, which the GM's words keyed
[reskin] key match declined: action — "slow-bolt" was ranked first on the call's own menu for frost, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: action — "Hrimgar wrenches a shelf of the glacier loose and hurls it not at one foe but down the middle of a formation, so that the whole line must scatter or be buried. The shattered shelf leaves a wide lane of loose, grinding ice behind it where the ground turns treacherous and any foe who stays rooted there is slowed to a crawl and harried by cold. This is the jarl's opening terror, meant to break ranks " [action/save/movement] — the model found no template that holds it (offered: slow-bolt, gaze-single, snare, condition-payoff, throw-retrieve, shield-bash, lure, snare-bolt, sensory-strike, disarm, exploiter, riposte)
[reskin] fallback respects the call: slow-bolt left the shelf — the call declined it for this sheet
[reskin] fallback stands down: the twist path has no shelf — the Frost Giant's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "The cold seeps out of Hrimgar's body and the stone it carries, so that anyone who gets close and strikes it feels the frost bite back through their own weapon and hands. In its growing fury it hoards this chill, and the longer it has been wounded and harried, the more bitterly that backlash bites when foes finally land their blows." [trait/on_being_hit/damage] — menu: heated-body, absorption, bloodied-burst, resonant-body (+ shelf: adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, warded-mending, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] signature bound to the concept's verb: trait — heated-body (frost)
[reskin] word match declined by the call: bloodied-fury, bloodied-burst, absorption, resonant-body — the key word does not mean the mechanic here
[reskin] trait declined: "Hoarded Frost" — a print body takes only what the user's words ask; the call offered no quote, and the key table finds no verb either
[reskin] weapons answered: Fist = none; Boulder = none; Ice-Rimed Stone = none
[reskin] weapon table: "Boulder" — range 30/90 ft. is not a print range; an unlisted thrown thing is 20/60, a hurled mass 60/240 (the critic's third species read)
[reskin] chassis nova: "Ice-Rimed Stone (Recharge 5-6)" — the skirmisher-8's own nova row (its "Sweeping Area Attack", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] print canon speed: 50 ft. -> 40 ft. — the Frost Giant's walk; the concept's other modes stay
[reskin] print canon attack: "Fist" -> "Frost Axe" — the Frost Giant's own row
[reskin] print canon multiattack: "Hrimgar makes two attacks, using Frost Axe or Great Bow in any combination." — the Frost Giant's own
[reskin] print canon attack: "Great Bow" is print's own row — +9, 17 (2d10 + 6), range 150/600 ft. (an exact body at print's CR)
[reskin] print canon attack: "Boulder" -> "Great Bow" — the Frost Giant's own ranged row
[reskin] defenses by material: a ice body is vulnerable to Fire and never resists, absorbs, or ignores it — the resistance is withheld; the vulnerability is the GM's to type (the Frostmaw carried a Fire vulnerability nobody typed — the critic's second species read)
[reskin] print canon defenses: immunities none -> Cold — the Frost Giant's own header lines
[reskin] print canon: chassis row leaves — Actions/"Ice-Rimed Stone (Recharge 5-6)" is the seat's nova, not the Frost Giant's
[reskin] print canon: chassis row leaves — Traits/"Glacier Stride" is the seat's, not the Frost Giant's
[reskin] print canon row: Bonus Actions/War Cry (Recharge 5-6) — the Frost Giant's own
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" yields to the Frost Giant's War Cry (Recharge 5-6)
[reskin] vulnerability rejected — "Fire" has no warrant in the concept's own text (print's default is none)
```


---


### Forgotten Watchman — in the run

**Concept:** a skeleton archer

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Forgotten Watchman | 1 | skirmisher-1 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1/4 / off 2 → 1.125; sustained 12 (2 × Shortsword); nova none; dmg 12

```
Forgotten Watchman

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

Multiattack. The watchman makes two attacks, using Shortsword or Shortbow in any combination.

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
[route] skirmisher-archer type=Undead mechanics=none — casts: the call reads no worked magic here | shoots: on the GM's own words "skeleton archer" | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | skirmisher-archer: ✓ ("a skeleton archer") | skirmisher-archer: key "archer" (class noun)
[concept] resolve: archetype=skirmisher type=Undead themes=grave/armed mind=sapient style=archer energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: loosing a bone-tipped arrow from cover [behavior] | skeletal, painless frame [body] | creaking bow and quiver of worn shafts [object]
[concept] identity: A skeleton archer opens a fight by loosing a shot from behind cover and then wheels backward, never letting a fight close to melee range, and if it is pressed in a corner it will drop its bow and fall back to its one advantage, the empty, silent endurance of a body that no longer feels pain or exhaustion. It has no fear of dying in blood, only of losing the field; it will trade distance for time and if outmatched it will break and run without shame. It is a creature of patient, cold, forgotten duty — not a butcher — and it will not pursue a foe that leaves range.
[concept] lore: A skeleton archer is the remains of a bowman who stood watch long after death should have ended the watch, held to the same post by a compulsion it never understood in life and still cannot break.
[reskin] print canon route: the Skeleton's body outranks the archer seat — no verb in the words names it; the plain skirmisher line
[reskin] print canon array: STR 10, DEX 16, CON 15, INT 6, WIS 8, CHA 5 — the Skeleton's; DEX 16 outranks the card's +4, so the sheet rolls +5 (raise-only)
[reskin] donor: skirmisher-1 -> CR 1
[reskin] [path] decides: twist on the Skeleton (the matcher agrees)
[reskin] print canon: "a skeleton archer" heads on the Skeleton — print's rows ride along; the seat stays
[reskin] claim gate: CR 1 but a Undead body — the trait seat stays open (print: a material body carries a trait at every tier)
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline declared: "the watchman" — the call's own answer (kind), built from the name
[reskin] inline form: "the watchman" — the model's own reading of the name
[reskin] save dc derived: DC 11 -> 13 (8 + PB 2 + the sheet's best 3) — no stat on the sheet reached it
[reskin] final price: the round ran 14 against the card's 10 — the attack rows re-solve at 75% (2 attacks off one row after a supersede)
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a skeleton archer" -> has (descriptive), head
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "When the watchman looses an arrow at a foe that hasn't yet realized it is under attack — before it has acted in the fight, or while it is still unaware of the watchman's position — the shot carries the silent patience of a sentry who has waited ages for exactly this. The arrow drives the target to flinch and lurch into cover-hunting, leaving it unable to close the distance cleanly for a moment. On" [rider/on_hit/condition] — menu: contagion, charge-push, hook-rider, pounce, isolation, bolt-mark, charge (+ shelf: snare, throw-retrieve, shield-bash, lure, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte)
[reskin] fit declined: "Sentry's Mark" — a print body takes only what the user's words ask; the call offered no quote, and the key table finds no verb either (the blacksmith's rally, critic-ten 2026-10-01)
[reskin] fallback stands down: the twist path has no shelf — the Skeleton's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "The watchman's frame no longer registers pain or strain, so wounds that would stagger a living archer never slow its aim. Whenever it is hurt, its next shot at whoever struck it comes faster and truer, as if the insult only sharpened its cold attention." [trait/on_being_hit/damage] — menu: heated-body, absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst)
[reskin] word match declined by the call: bloodied-burst, heated-body, absorption, resonant-body — the key word does not mean the mechanic here
[reskin] trait declined: "Painless Aim" — a print body takes only what the user's words ask; the call offered no quote, and the key table finds no verb either
[reskin] weapons answered: Bone Fist = none; Bowshot = shortbow
[reskin] weapon declared: "Bowshot" is a shortbow — the call's own answer (the name alone read bow)
[reskin] weapon table: "Bowshot" — a launcher, never thrown, range 150/600
[reskin] languages by mind: "None" -> "Common plus the languages it knew in life" (sapient)
[reskin] print canon alignment: Neutral -> Lawful Evil — the Skeleton's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common plus the languages it knew in life" -> "Understands Common plus one other language but can't speak" — the Skeleton's
[reskin] print canon attack: "Bone Fist" -> "Shortsword" — the Skeleton's own row
[reskin] print canon attack: "Bowshot" -> "Shortbow" — the Skeleton's own ranged row
[reskin] immunities stamped for type: Undead -> Poison; Exhaustion, Poisoned
[reskin] print canon defenses: vulnerabilities none -> Bludgeoning — the Skeleton's own header lines
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the seat's, not the Skeleton's
[reskin] print canon: chassis row leaves — Traits/"Relentless Stride" is the seat's, not the Skeleton's
```


---


### Steward of the Springs — in the run

**Concept:** a vampire who runs a bathhouse

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Steward of the Springs | 13 | lurker-8 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 10 / off 6 → 8; sustained 30 (2 × Grave Strike); nova none; dmg 30

```
Steward of the Springs

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

Senses darkvision 120 ft.; Passive Perception 17

Languages Common plus two other languages

CR 13 (XP 10,000; PB +5)

Traits

Legendary Resistance. If the steward fails a saving throw, it can choose to succeed instead.

Misty Escape. If the steward drops to 0 Hit Points outside its resting place, the steward uses Shape-Shift to become mist (no action required). If it can't use Shape-Shift, it is destroyed.
While it has 0 Hit Points in mist form, it can't return to its vampire form, and it must reach its resting place within 2 hours or be destroyed. Once in its resting place, it returns to its vampire form and has the Paralyzed condition until it regains any Hit Points, and it regains 1 Hit Point after spending 1 hour there.

Spider Climb. The steward can climb difficult surfaces, including along ceilings, without needing to make an ability check.

Vampire Weakness. The steward has these weaknesses:


- Forbiddance: the steward can't enter a residence without an invitation from an occupant.
- Running Water: the steward takes 20 Acid damage if it ends its turn in running water.
- Stake to the Heart: If a weapon that deals Piercing damage is driven into the steward's heart while the steward has the Incapacitated condition in its resting place, the steward has the Paralyzed condition until the weapon is removed.
- Sunlight: the steward takes 20 Radiant damage if it starts its turn in sunlight. While in sunlight, it has Disadvantage on attack rolls and ability checks.

Actions

Multiattack. The steward makes two Grave Strike attacks and uses Bite.

Grave Strike. Melee Attack Roll: +9, reach 5 ft. 8 (1d8 + 4) Bludgeoning damage plus 7 (2d6) Necrotic damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 17) from one of two hands.

Bite (Bat or Vampire Form Only). Constitution Saving Throw: DC 17, one creature within 5 feet that is willing or that has the Grappled, Incapacitated, or Restrained condition. Failure: 6 (1d4 + 4) Piercing damage plus 13 (3d8) Necrotic damage. The target's Hit Point maximum decreases by an amount equal to the Necrotic damage taken, and the steward regains Hit Points equal to that amount. A Humanoid reduced to 0 Hit Points by this damage and then buried rises the following sunset as a Vampire Spawn under the steward's control.

Bonus Actions

Shape-Shift. If the steward isn't in sunlight or running water, it shape-shifts into a Tiny bat (Speed 5 ft., Fly Speed 30 ft.) or a Medium cloud of mist (Speed 5 ft., Fly Speed 20 ft. [hover]), or it returns to its vampire form. Anything it is wearing transforms with it.
While in bat form, the steward can't speak. Its game statistics, other than its size and Speed, are unchanged.
While in mist form, the steward can't take any actions, speak, or manipulate objects. It is weightless and can enter an enemy's space and stop there. If air can pass through a space, the mist can do so, but it can't pass through liquid. It has Resistance to all damage, except the damage it takes from sunlight.

Charm (Recharge 5-6). The steward casts Charm Person, requiring no spell components and using Charisma as the spellcasting ability (spell save DC 17), and the duration is 24 hours. The Charmed target is a willing recipient of the steward's Bite, the damage of which doesn't end the spell. When the spell ends, the target is unaware it was Charmed by the steward.

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
[path] twist — Vampire (is) — "a vampire" (call)
[route] lurker type=Undead mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | skirmisher-shifter: a shifter is named by its words (shape-shifts, turns into, a were-) — none here | lurker: ✓ ("a vampire who runs a bathhouse") | lurker: no line key in the words — the model's read of its quote | bane refused: the words carry no weakness clause, so "running water" answers a question nobody asked
[concept] resolve: archetype=lurker type=Undead themes=grave/grasping mind=sapient style=— energy=Necrotic mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: striking unseen from the scalding steam [behavior] | the bathhouse it keeps and will not leave [object] | drowning and exsanguinating guests in the hot pools [behavior]
[concept] identity: A vampire bathhouse keeper waits beneath the steaming surface of its own pools, unseen in the scalding fog, and opens with a single drowning strike that drags a bather down into the scalding water before they can cry out. Every round after, it fades back into the steam and strikes again from a new angle, herding guests toward the hottest basins where their blood runs thin. It is patient and possessive of its house, and it does not flee — a cornered proprietor fights to the death to keep its baths, taunting guests with the hospitality they should have been grateful for.
[concept] lore: Once a mortal healer who bargained with something old for water that never cools, the bathhouse keeper drowned in its own springs and rose again, and it now keeps the baths open for anyone warm enough to soak — and to bleed into the pools.
[reskin] print canon defenses: HP 179 -> 195, AC 17 -> 16 — the Vampire's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 18, DEX 18, CON 18, INT 17, WIS 15, CHA 18 — the Vampire's at its own CR; attack +10 -> +9, DC 17 (print's)
[reskin] donor: lurker-8 -> CR 13
[reskin] row gated out: Teleport (teleport) — the concept did not claim this mechanic
[reskin] [path] decides: twist on the Vampire (the matcher would have said homebrew)
[reskin] print canon: "a vampire who runs a bathhouse" heads on the Vampire — print's rows ride along; the seat stays
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline by rule: "the steward" — the call answered "the springs" (kind), which the name does not support
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a vampire" -> has (descriptive), head | "runs a bathhouse" -> has (descriptive)
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The steward surges up from scalding water or its own fog and lays cold hands on one bather, and the water remembers its claim — a boiling veil clings to the victim, scalding them and hiding the steward as it slips back under. The burn is not fire but the spring's own heat turned necrotic, and it clings until the victim leaves the water or scrubs it away." [rider/on_hit/damage] — menu: contagion, stunning-strike, charge-push, hook-rider, pounce, isolation (+ shelf: gaze-single, execute, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, terror-pulse, snare-bolt, slow-bolt, sensory-strike, drain, delayed-brand, zone-seed, blighted-ground, patient-defense, self-invisibility, focus, feint-slip, coating, riposte)
[reskin] signature bound to the concept's verb: action — drain (vampire)
[reskin] fit declined: "Vitality Leech" — a print body takes only what the user's words ask; the call offered no quote, and the key table finds no verb either (the blacksmith's rally, critic-ten 2026-10-01)
[reskin] fallback stands down: the twist path has no shelf — the Vampire's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "Steam answers the steward's will: whenever it is struck, the hot mist around it thickens and drifts, and anyone standing in that scalding fog with the steward begins to cook — their blood thinning, their wounds opening wider in the heat. The steward itself is untouched by this; it is the bathhouse, and the bathhouse does not burn." [trait/on_being_hit/condition] — menu: heated-body, absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, evasion, relentless-pursuit, bound, marking-light, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] word match declined by the call: uncanny-sense — the key word does not mean the mechanic here
[reskin] trait declined: "Scalding Vapor" — a print body takes only what the user's words ask; the call offered no quote, and the key table finds no verb either
[reskin] weapons answered: Claw = none
[reskin] speed by concept: added Climb 30 ft. — the concept's movement set decides
[reskin] languages by mind: "None" -> "Common plus the languages it knew in life" (sapient)
[reskin] print canon alignment: Neutral -> Lawful Evil — the Vampire's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common plus the languages it knew in life" -> "Common plus two other languages" — the Vampire's
[reskin] print canon speed: 30 ft. -> 40 ft. — the Vampire's walk; the concept's other modes stay
[reskin] print canon speed: Climb -> 40 ft. — the Vampire's own
[reskin] print canon attack: "Claw" -> "Grave Strike" — the Vampire's own row
[reskin] print canon multiattack: "The steward makes two Grave Strike attacks and uses Bite." — the Vampire's own
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
[reskin] multiattack replacement clause withheld: the Multiattack already uses it — "The steward makes two Grave Strike attacks and uses Bite." (the Vampire's print line names Bite; a second clause named it again, twist-ten 2026-10-19)
audit finding below confidence gate: Bite The clause requires the GM to track burial after death and a rising event at a sunset that may never occur inside the adventure; it is an unresolved state the block gives no timing hook for beyond "the following sunset."
audit finding below confidence gate: Charm The GM must cross-reference the Charm Person spell text, apply a 24-hour override, track the willing-Bite exception, and remember the unawareness clause at expiry, which is more state than a bonus-action entry can resolve in ~10 seconds.
[reskin] audit rename blocked — "Grave Strike" is the user's own part name, a kit feature's real name, or print's own row
[reskin] escape dc: Grave Strike → DC 17 (8 + PB + STR; a late row wore another number)
```


---


### Last Ringer — in the run

**Concept:** a chapel bell-ringer's ghost that tolls for the dying

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Last Ringer | 3 | lurker-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- **dropped clause:** "tolls for the dying"
- read: def 1 / off 5 → 3; sustained 38 (2 × Withering Touch); nova none; dmg 38

```
Last Ringer

Medium Undead, Neutral

AC 11
Initiative +1 (11)

HP 45 (10d8)

Speed 5 ft., Fly 40 ft.

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

Ethereal Sight. The ringer can see 60 feet into the Ethereal Plane when it is on the Material Plane.

Incorporeal Movement. The ringer can move through other creatures and objects as if they were Difficult Terrain. It takes 5 (1d10) Force damage if it ends its turn inside an object.

Actions

Multiattack. The ringer makes two Withering Touch attacks. It can replace one attack with a use of Luring Presence.

Withering Touch. Melee Attack Roll: +5, reach 5 ft. 19 (3d10 + 3) Necrotic damage.

Luring Presence. Wisdom Saving Throw: DC 13, one creature within 60 feet that can see or hear the ringer's bell. Failure: The target has the Charmed condition until the start of the ringer's next turn, and while Charmed this way, it must move toward the ringer by the safest available route on its turn.

Horrific Visage. Wisdom Saving Throw: DC 13, each creature in a 60-foot Cone that can see the ringer and isn't an Undead. Failure: 10 (2d6 + 3) Psychic damage, and the target has the Frightened condition until the start of the ringer's next turn. Success: The target is immune to this ghost's Horrific Visage for 24 hours.

Possession (Recharge 6). Charisma Saving Throw: DC 13, one Humanoid the ringer can see within 5 feet. Failure: The target is possessed by the ringer; the ringer disappears, and the target has the Incapacitated condition and loses control of its body. The ringer now controls the body, but the target retains awareness. The ringer can't be targeted by any attack, spell, or other effect, except ones that specifically target Undead. The ringer's game statistics are the same, except it uses the possessed target's Speed, as well as the target's Strength, Dexterity, and Constitution modifiers.
The possession lasts until the body drops to 0 Hit Points or the ringer leaves as a Bonus Action. When the possession ends, the ringer appears in an unoccupied space within 5 feet of the target, and the target is immune to this ghost's Possession for 24 hours. Success: The target is immune to this ghost's Possession for 24 hours.

Etherealness. The ringer casts the Etherealness spell, requiring no spell components and using Charisma as the spellcasting ability. The ringer is visible on the Material Plane while on the Border Ethereal and vice versa, but it can't affect or be affected by anything on the other plane.

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
- Actions/Luring Presence — template lure; library draw (seed unstamped)
- Actions/Horrific Visage — print's own row
- Actions/Possession — print's own row
- Actions/Etherealness — print's own row
- Traits/Ethereal Sight — print's own row
- Traits/Incorporeal Movement — print's own row

**Engine trace**

```
[path] twist — Ghost (is) — class cleric — "ghost" (call)
[route] lurker-phantom type=Undead mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | lurker-phantom: ✓ ("ghost") | lurker-phantom: key "ghost" (class body)
[concept] hints: phantom→style ✓ ("a bell-ringer's ghost")
[concept] resolve: archetype=lurker type=Undead themes=grave/voice mind=sapient style=phantom energy=Necrotic mix=energy identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: tolling the bell for the dying [behavior] | drifting through walls unseen [behavior] | the bell's death-knell aura [aura]
[concept] identity: The bell-ringer's ghost drifts through the chapel walls, unseen until it begins to toll — and the bell's stroke marks a dying soul, dragging the living toward the grave with necrotic force. Every round it haunts from just out of reach, ringing the unseen bell to sap vitality while drifting through stone to escape reprisal. It is not mindless: it tolls with grim ceremony, choosing victims by their approaching deaths, and it clings to its post with relentless purpose until the chapel-tower's last soul is rung out.
[concept] lore: Once a faithful bell-ringer who died at the rope and whose office was never filled, it haunts the chapel tower still, tolling for each life about to end so no soul leaves the world unmarked.
[reskin] print canon route: the Ghost's body outranks the phantom seat — no verb in the words names it; the plain lurker line
[reskin] print canon defenses: HP 43 -> 45, AC 14 -> 11 — the Ghost's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 7, DEX 13, CON 10, INT 10, WIS 12, CHA 17 — the Ghost's at its own CR; attack +5 -> +5, DC 13 (print's)
[reskin] donor: lurker-2 -> CR 3
[reskin] row gated out: Teleport (teleport) — the concept did not claim this mechanic
[reskin] [path] decides: twist on the Ghost · class cleric (the matcher would have said homebrew)
[reskin] print canon: "a chapel bell-ringer's ghost that tolls for the dying" heads on the Ghost — print's rows ride along; the seat stays
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline declared: "the ringer" — the call's own answer (kind), built from the name
[reskin] inline form: "the ringer" — the model's own reading of the name
[reskin] save dc derived: DC 12 -> 13 (8 + PB 2 + the sheet's best 3) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a chapel bell-ringer's ghost" -> has (descriptive), head | "tolls for the dying" -> has (mechanical)
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The ringer swings its handbell and the stroke is not aimed at the body but at whatever death is already leaning over its victim. Every living soul it can perceive that is hurt, sick, or already marked by the grave hears that toll as the knell meant for them: they stumble toward the bell, and the closer a soul is to its ending, the harder the stroke lands. It is a bell rung for the dying, so it sim" [action/save/damage] — menu: leap, gaze-single, execute, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, terror-pulse, snare-bolt, slow-bolt, sensory-strike, drain, zone-seed, blighted-ground (+ shelf: delayed-brand, patient-defense, self-invisibility, focus, feint-slip, coating, riposte, charge-push, hook-rider, pounce, isolation)
[reskin] signature bound to the concept's verb: action — active-toll, sensory-strike (toll, bell)
[reskin] word match declined by the call: active-toll, sensory-strike, execute — the key word does not mean the mechanic here
[reskin] pick kept on the GM's own words: action — "lure" has no key-table verb, but the call quotes "tolls for the dying" from the description
[reskin] signature template: lure -> Actions/"Luring Presence" ("the toll is heard as a knell meant for the listener and draws the wounded or dyi [shape fit, no verb match]")
[reskin] signature idea (trait): "Wherever the ringer tolls, an unseen knell hangs in the air around it for a moment: living things near the bell feel their own death drawing near, their hurts refusing to close and their strength bleeding away so long as the ringing lasts. The dying feel it worst — those already near their end sag toward it, slowing as if the grave were pulling at their ankles." [trait/always/condition] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, evasion, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature bound to the concept's verb: trait — bloodied-burst (toll, bell, dying, the dying)
[reskin] word match declined by the call: bloodied-burst, resonant-body, death-burst, assassinate — the key word does not mean the mechanic here
[reskin] signature miss: trait — "Wherever the ringer tolls, an unseen knell hangs in the air around it for a moment: living things near the bell feel their own death drawing near, their hurts refusing to close and their strength bleeding away so long as the ringing lasts. The dying feel it worst — those already near their end sag toward it, slowing as if the grave were pulling at their ankles." [trait/always/condition] — the model picked "noxious-aura" (no verb, and it quotes nothing the GM typed) over a concept-verb template (bloodied-burst, resonant-body, death-burst)
[reskin] concept-first trait skipped: bloodied-burst — the call read its match as a collision (the word is a modifier, or the sheet already answers it)
[reskin] concept-first trait skipped: resonant-body — the call read its match as a collision (the word is a modifier, or the sheet already answers it)
[reskin] repair: 1 clause(s) with no row — "tolls for the dying"; one targeted call with the sheet as context
[reskin] repaired sheet: 2 attack row(s), 0 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] weapons answered: Handbell = none
[reskin] speed by concept: added Fly 30 ft. — the concept's movement set decides
[reskin] languages by mind: "None" -> "Common plus the languages it knew in life" (sapient)
[reskin] print canon languages: "Common plus the languages it knew in life" -> "Common plus one other language" — the Ghost's
[reskin] print canon speed: 30 ft. -> 5 ft. — the Ghost's walk; the concept's other modes stay
[reskin] print canon speed: Fly -> 40 ft. — the Ghost's own
[reskin] print canon attack: "Handbell" -> "Withering Touch" — the Ghost's own row
[reskin] print canon rows: Toll for the Dying leave — the Ghost has one melee row (Withering Touch), and Multiattack reads print's
[reskin] immunities stamped for type: Undead -> Poison; Exhaustion, Poisoned
[reskin] print canon defenses: immunities Poison; Exhaustion, Poisoned -> Necrotic, Poison; Charmed, Exhaustion, Frightened, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained; resistances none -> Acid, Bludgeoning, Cold, Fire, Lightning, Piercing, Slashing, Thunder — the Ghost's own header lines
[reskin] print canon trait: Ethereal Sight — "a chapel bell-ringer's ghost that tolls for the dying" is the Ghost (print's own row)
[reskin] print canon trait: Incorporeal Movement — "a chapel bell-ringer's ghost that tolls for the dying" is the Ghost (print's own row)
[reskin] print canon: chassis row leaves — Bonus Actions/"Umbral Step" is the seat's, not the Ghost's
[reskin] print canon row: Actions/Horrific Visage — the Ghost's own
[reskin] print canon row: Actions/Possession (Recharge 6) — the Ghost's own
[reskin] print canon row: Actions/Etherealness — the Ghost's own
[reskin] multiattack replacement clause: It can replace one attack with a use of Luring Presence.
audit finding below confidence gate: Horrific Visage Double spaces after save labels and inconsistent in-text referent ('this ghost') within the same entry.
[reskin] audit rewrite blocked — "Possession (Recharge 6)" is engine-authored chassis text
```


---

## Review batch — twist-five-2026-10-19T15-14-56

The checker ran first. The gate table covers every block in the run; every block of the run follows. Each block carries its checker row above and its engine trace below. Hand-derive against the row first; then read for what predicates can't see.

### Gate table — the whole run

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Ossuary Sentinel | 2 | 2024 | brute-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/3 |
| Unyielding Champion | 4 | 2024 | defender-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 2/2 |
| High-Pass Toll-Taker | 3 | 2024 | brute-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/3 |
| Galleries Glutton | 6 | 2024 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |
| Stonemantle Castout | 9 | 2024 | brute-9 | ok | SOFT: aim-atk | ok | ok | ok | ok | ok | ok | ok | ok | soft (1) | 2/2 | 2/2 |

**Dropped 0 of 6 user clauses** (coverage 100%); concept share 100% (14/14 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- none



---


### Ossuary Sentinel — lowest CR

**Concept:** a skeleton with a greatsword

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Ossuary Sentinel | 2 | brute-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1/2 / off 2 → 1.25; sustained 12 (1 × Greatsword); nova none; dmg 12

```
Ossuary Sentinel

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

Great Weapon Master. When the sentinel hits a creature with its Greatsword, the attack deals an extra 2 damage.

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
[path] twist — Skeleton (is) — "skeleton" (call)
[route] brute type=Undead mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | brute: ✓ ("a skeleton with a greatsword") | brute: no line key in the words — the model's read of its quote
[concept] resolve: archetype=brute type=Undead themes=grave/armed mind=mindless style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: a skeleton wielding a greatsword [object] | relentless committed overhead cleaves [behavior] | fights until the bones are broken [behavior]
[concept] identity: The greatsword skeleton closes on the nearest target in a straight, unhurried line, greatsword already raised in a two-handed grip, its whole fighting style built on long, committed overhead cleaves that leave its guard open but its reach unbroken. Round after round it simply swings again — no feints, no repositioning — trading any hit it takes to deliver another crunching blow, because its bones have no blood to lose and its body has no fear to break. It fights to the last joint, never fleeing and never toying, a relentless bone automaton that only advanced skeletons of its kind can command.
[concept] lore: Raised by a grave-cult as a standing sentinel of the ossuary, this skeleton patrols the tomb halls still wielding the greatsword it was buried with, obeying only the last order it was given: let nothing living pass.
[reskin] print canon array: STR 16, DEX 16, CON 15, INT 6, WIS 8, CHA 5 — the Skeleton's, STR fitted to +5
[reskin] donor: brute-2 -> CR 2
[reskin] [path] decides: twist on the Skeleton (the matcher agrees)
[reskin] print canon: "a skeleton with a greatsword" heads on the Skeleton — print's rows ride along; the seat stays
[reskin] claim gate: CR 2 but a Undead body — the trait seat stays open (print: a material body carries a trait at every tier)
[reskin] named parts: Greatsword (slot) — the user's words, the engine's numbers
[reskin] named parts landed: 1 attack row(s), 0 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline declared: "the sentinel" — the call's own answer (kind), built from the name
[reskin] inline form: "the sentinel" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] asked field dropped: the call answered limit "at_will" for "a skeleton with a greatsword" but offered no quote
[reskin] clauses: "a skeleton with a greatsword" -> has (mechanical) [asked: attack]
[reskin] signature idea (action): "When the sentinel commits to its greatsword swing, it continues the cleave through everything in its path — every creature in a wide arc in front of it must dodge or be cut. Its guard stays wide open during the windup, so anything waiting for an opening can strike it before the blow lands." [action/always/damage] — menu: trample, shield-bash, active-toll, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up (+ shelf: rampage, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, contagion, charge-push, hook-rider, pounce, charge)
[reskin] signature miss: action — "When the sentinel commits to its greatsword swing, it continues the cleave through everything in its path — every creature in a wide arc in front of it must dodge or be cut. Its guard stays wide open during the windup, so anything waiting for an opening can strike it before the blow lands." [action/always/damage] — no template on the shelf shares a verb with the concept or the idea (offered: trample, shield-bash, active-toll, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, rampage, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, contagion, charge-push, hook-rider, pounce, charge)
[reskin] fallback stands down: the twist path has no shelf — the Skeleton's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "The sentinel's empty bones and burial-worn joints never flinch or brace, so anything that strikes it in melee finds the swing passing through to the far side — the attacker takes a cut of its own committed momentum as the blade sweeps back around." [trait/on_being_hit/damage] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] signature miss: trait — "The sentinel's empty bones and burial-worn joints never flinch or brace, so anything that strikes it in melee finds the swing passing through to the far side — the attacker takes a cut of its own committed momentum as the blade sweeps back around." [trait/on_being_hit/damage] — no template on the shelf shares a verb with the concept or the idea (offered: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge, false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] weapons answered: Greatsword = greatsword
[reskin] print canon alignment: Neutral -> Lawful Evil — the Skeleton's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "None" -> "Understands Common plus one other language but can't speak" — the Skeleton's
[reskin] print canon row: Actions/Shortbow — the Skeleton's own ranged row, added (the chassis carried none to rename) — far from print's CR 0.25: print's dice, the sheet's +5
[reskin] immunities stamped for type: Undead -> Poison; Exhaustion, Poisoned
[reskin] print canon defenses: vulnerabilities none -> Bludgeoning — the Skeleton's own header lines
[reskin] vulnerability rejected — "Bludgeoning" has no warrant in the concept's own text (print's default is none)
[reskin] audit rename blocked — "Great Weapon Master" is the user's own part name, a kit feature's real name, or print's own row
```


---


### Stonemantle Castout — highest CR

**Concept:** a stone giant exile who speaks only Giant and understands no Common

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Stonemantle Castout | 9 | brute-9 | ok | SOFT: aim-atk | ok | ok | ok | ok | ok | ok | ok | ok |

- bands · soft · aim-atk: attack +10 against the aim's +8
- read: def 7 / off 11 → 9; sustained 66 (2 × Stone Club); nova none; dmg 66

```
Stonemantle Castout

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

Multiattack. The castout makes two attacks, using Stone Club or Boulder in any combination.

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
[path] twist — Stone Giant (is) — "stone giant exile" (call)
[route] brute type=Giant mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | brute: ✓ ("a stone giant exile") | brute: no line key in the words — the model's read of its quote
[concept] resolve: archetype=brute type=Giant themes=elemental mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: hurling boulders torn from the earth [behavior] | a body of living stone [body] | speaks Giant alone, understands no Common [behavior]
[concept] identity: The exile fights like a landslide with a grudge: it opens by hurling a boulder torn from the ground, then wades in swinging its stone fists and whatever it can wrench loose, weathering blows that would fell lesser giants. It speaks only Giant and never parleys — it fights until bloodied, then fights harder, and flees only when its own stone frame is cracking apart.
[concept] lore: Cast out of his stead for some forgotten offense, this stone giant roams the high passes alone, wanting only to be left to his silence and his rocks — and he assumes every stranger has come to drive him further out.
[reskin] print canon array: STR 23, DEX 15, CON 20, INT 10, WIS 12, CHA 9 — the Stone Giant's; STR 23 outranks the card's +8, so the sheet rolls +10 (raise-only)
[reskin] donor: brute-9 -> CR 9
[reskin] [path] decides: twist on the Stone Giant (the matcher would have said homebrew)
[reskin] print canon: "a stone giant exile who speaks only Giant and understands no Common" heads on the Stone Giant — print's rows ride along; the seat stays
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline declared: "the castout" — the call's own answer (kind), built from the name
[reskin] inline form: "the castout" — the model's own reading of the name
[reskin] save dc derived: DC 15 -> 18 (8 + PB 4 + the sheet's best 6) — no stat on the sheet reached it
[reskin] lacks asked: "understands no Common"
[reskin] lacks refused: "speaks only Giant" names no absence — nothing in it takes anything away
[reskin] clauses: "a stone giant exile" -> has (descriptive), head | "speaks only Giant" -> has (header) | "understands no Common" -> LACKS (mechanical)
[reskin] signature idea (action): "The castout tears a slab of the ground free and hurls it, not at one foe but as a rolling, skipping stone that plows through a line of them. It batters every creature in its path and leaves the ground behind churned and broken, so the field itself turns against anyone who stands in his way." [action/save/damage] — menu: trample, leap, thrown-burst, throw-retrieve, shield-bash, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up (+ shelf: rampage, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, stunning-strike, charge-push, hook-rider, pounce, charge)
[reskin] fit declined: "Rolling Slab (Recharge 5-6)" — a print body takes only what the user's words ask; the call offered no quote, and the key table finds no verb either (the blacksmith's rally, critic-ten 2026-10-01)
[reskin] fallback stands down: the twist path has no shelf — the Stone Giant's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "His hide is living mountain; every blow that lands knocks loose a spray of stone shards that cut and stagger whoever struck him, and the chips gather back onto his frame as he fights — he only grows harder to bring down the longer the brawl drags on." [trait/on_being_hit/damage] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] signature bound to the concept's verb: trait — false-appearance (stone)
[reskin] word match declined by the call: false-appearance — the key word does not mean the mechanic here
[reskin] trait declined: "Living Mountain Hide" — bound only on the idea's own words (shard:idea) with no key in the concept; a meat body earns its trait by the user's verb (the sniper's tracker, critic 2026-09-29)
[reskin] weapons answered: Fists = none; Hurlstone = none
[reskin] print canon attack: "Fists" -> "Stone Club" — the Stone Giant's own row
[reskin] print canon attack: "Hurlstone" -> "Boulder" — the Stone Giant's own ranged row
```


---


### Unyielding Champion — a 2024 sheet

**Concept:** a skeleton who was a gladiator in a former life

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Unyielding Champion | 4 | defender-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 3 / off 4 → 3.5; sustained 26 (2 × Shortsword); nova none; dmg 26

```
Unyielding Champion

Medium Undead, Lawful Evil

AC 19
Initiative +3 (13)

HP 65 (10d8 + 20)

Speed 30 ft.

MOD
SAVE
STR
18
+4
+4
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
+1
MOD
SAVE
CON
15
+2
+4
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

Multiattack. The champion makes two attacks, using Shortsword or Shortbow in any combination.

Shortsword. Melee Attack Roll: +6, reach 5 ft. 13 (2d8 + 4) Piercing damage.

Shortbow. Ranged Attack Roll: +6, range 80/320 ft. 13 (2d8 + 4) Piercing damage.

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
[path] twist — Skeleton (is) — "a skeleton" (call)
[route] defender type=Undead mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | defender: ✓ ("was a gladiator in a former life") | defender: no line key in the words — the model's read of its quote
[concept] name: provided_name rejected — "skeleton who was a gladiator in a former…" is the description, not a name
[concept] resolve: archetype=defender type=Undead themes=armed/grave mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: shielded last-stand defense that punishes anyone who slips past [behavior] | the gladius and battered arena shield [object] | old gladiator's showmanship [behavior]
[concept] identity: The gladiator skeleton opens by planting its battered shield and advancing shield-first, daring foes to come within reach of its gladius; it rushes no one, letting the crowd come to it. Each round it holds the line, turning aside strikes with its shield and answering any foe who tries to slip past with a punishing sword cut. Bloodied, it only tightens its guard — this champion fights to the death, because it has already died once and lost the only match that mattered.
[concept] lore: A champion of the old arena whose death was never acknowledged by the mob, it rises each night to finish a bout that ended centuries ago, unable to leave until some challenger finally bests it.
[reskin] print canon array: STR 18, DEX 16, CON 15, INT 6, WIS 8, CHA 5 — the Skeleton's, STR fitted to +6
[reskin] donor: defender-3 -> CR 4
[reskin] row gated out: Guard Aura (aura) — the concept did not claim this mechanic
[reskin] [path] decides: twist on the Skeleton (the matcher agrees)
[reskin] print canon: "a skeleton who was a gladiator in a former life" heads on the Skeleton — print's rows ride along; the seat stays
[reskin] repair round 1: 1 defect(s) — rename for "Ranged Attack" takes the shelf's own row name "Shield Bash" — that name belongs to a template this sheet may still receive; choose another
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline declared: "the champion" — the call's own answer (kind), built from the name
[reskin] inline form: "the champion" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] lacks refused: "a skeleton" names no absence — nothing in it takes anything away
[reskin] clauses: "a skeleton" -> has (descriptive), head | "was a gladiator in a former life" -> has (descriptive)
[reskin] signature idea (action): "When a foe slips past the champion's reach or turns its back to go for anyone else, the champion pivots and drives its gladius home — a flat, patient punishment for breaking the line. It can answer only one such opening at a time, so the crowd can bait it with a second runner while the first is corrected." [reaction/on_being_hit/damage] — menu: snap-shot, riposte (+ shelf: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, charge-push, hook-rider)
[reskin] fit declined: "Broken Line" — a print body takes only what the user's words ask; the call offered no quote, and the key table finds no verb either (the blacksmith's rally, critic-ten 2026-10-01)
[reskin] fallback stands down: the twist path has no shelf — the Skeleton's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 19 already beats print's AC 14 at CR 4, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "The battered arena shield is not an accessory but the champion's whole argument: whoever strikes the champion from the front finds their blow turned aside by a shield that has already outlived a thousand fights, while blows that come from behind or from beyond the wall of it land as they should." [trait/on_being_hit/defense] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura)
[reskin] signature miss: trait — "The battered arena shield is not an accessory but the champion's whole argument: whoever strikes the champion from the front finds their blow turned aside by a shield that has already outlived a thousand fights, while blows that come from behind or from beyond the wall of it land as they should." [trait/on_being_hit/defense] — no template on the shelf shares a verb with the concept or the idea (offered: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge, false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura)
[reskin] weapons answered: Gladius = shortsword; Shield Bash = shield
[reskin] weapon declared: "Gladius" is a shortsword — the call's own answer
[reskin] languages by mind: "None" -> "Common plus the languages it knew in life" (sapient)
[reskin] print canon alignment: Lawful Neutral -> Lawful Evil — the Skeleton's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common plus the languages it knew in life" -> "Understands Common plus one other language but can't speak" — the Skeleton's
[reskin] print canon attack: "Gladius" -> "Shortsword" — the Skeleton's own row
[reskin] print canon attack: "Hurl Gladius" -> "Shortbow" — the Skeleton's own ranged row
[reskin] immunities stamped for type: Undead -> Poison; Exhaustion, Poisoned
[reskin] print canon defenses: vulnerabilities none -> Bludgeoning — the Skeleton's own header lines
```


---


### High-Pass Toll-Taker — a print donor

**Concept:** an ogre with a greataxe

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| High-Pass Toll-Taker | 3 | brute-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1/4 / off 4 → 2.125; sustained 22 (1 × Greataxe); nova none; dmg 22

```
High-Pass Toll-Taker

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

Great Weapon Master. When the toll-taker hits a creature with its Greataxe, the attack deals an extra 2 damage.

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
[path] twist — Ogre (is) — "an ogre" (call)
[route] brute type=Giant mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | brute: ✓ ("an ogre with a greataxe") | brute: no line key in the words — the model's read of its quote
[concept] resolve: archetype=brute type=Giant themes=bestial/armed mind=bestial style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: towering greataxe swings [object] | tireless battering advance [behavior] | thick hide and brute mass [body]
[concept] identity: The ogre opens with a bellowing overhead greataxe chop meant to split a shield-bearer in two, then wades forward swinging in wide, tireless arcs that batter down anything still standing. It feels pain only as fuel, growing more reckless and brutal as it bleeds, and it never retreats — prey that runs merely dies tired. Thick hide and slab-like muscle let it stand and trade blows with a whole warband, and it fights to the death with dull, joyful stubbornness.
[concept] lore: A hill-ogre warlord's get, raised on stolen cattle and stolen axes, it haunts the high passes collecting tolls in whatever a traveler can bleed.
[reskin] print canon defenses: HP 66 -> 68, AC 12 -> 11 — the Ogre's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 19, DEX 8, CON 16, INT 5, WIS 7, CHA 7 — the Ogre's at its own CR; attack +5 -> +6, DC 14 (print's)
[reskin] donor: brute-2 -> CR 3
[reskin] [path] decides: twist on the Ogre (the matcher agrees)
[reskin] print canon: "an ogre with a greataxe" heads on the Ogre — print's rows ride along; the seat stays
[reskin] named parts: Greataxe (slot) — the user's words, the engine's numbers
[reskin] named parts landed: 1 attack row(s), 0 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline declared: "the toll-taker" — the call's own answer (kind), built from the name
[reskin] inline form: "the toll-taker" — the model's own reading of the name
[reskin] save dc derived: DC 12 -> 14 (8 + PB 2 + the sheet's best 4) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "an ogre with a greataxe" -> has (descriptive), head
[reskin] signature idea (action): "Letting out a bellowing overhead chop, the toll-taker brings its greataxe down on a foe and the shock of the blow hurls them backward and to the ground, clearing space for its advance. If the target crashes into another creature, that creature is knocked down too and the toll-taker can immediately stride toward the fallen without breaking its swing. Only the initial target suffers the axe's bite; " [action/save/movement] — menu: trample, leap, shield-bash, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up (+ shelf: rampage, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, affliction, contagion, charge-push, hook-rider, pounce, charge)
[reskin] fit declined: "Bellowing Backhand" — a print body takes only what the user's words ask; the call quotes "an ogre with a greataxe", which is the creature itself, a header directive, the half of a clause the lack sweep takes away, or the weapon a part row already carries (the blacksmith's rally, critic-ten 2026-10-01)
[reskin] fallback stands down: the twist path has no shelf — the Ogre's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "The toll-taker's wounds are fuel: every time it is cut or clubbed, it bellows louder and swings harder on its next turn, and the more blood it sheds the wider and more reckless its arcs become, so it grows deadlier the longer a fight drags on. This fury never fades until the fight ends, and it cannot be scared or talked down." [trait/on_being_hit/damage] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] word match declined by the call: bloodied-burst, resonant-body, uncanny-sense, shielded-mind, sealed-body — the key word does not mean the mechanic here
[reskin] trait declined: "Wounded Fury" — bound only on the idea's own words (bloodied:idea, wounded:idea, fury:idea) with no key in the concept; a meat body earns its trait by the user's verb (the sniper's tracker, critic 2026-09-29)
[reskin] weapons answered: Greataxe = greataxe
[reskin] print canon languages: "None" -> "Common, Giant" — the Ogre's
[reskin] print canon speed: 30 ft. -> 40 ft. — the Ogre's walk; the concept's other modes stay
[reskin] print canon row frame: "Javelin" keeps print's thrown frame — reach 5 ft. or range 30/120 ft.
[reskin] print canon row: Actions/Javelin — the Ogre's second melee row, beside the chassis's
[reskin] audit rename blocked — "Great Weapon Master" is the user's own part name, a kit feature's real name, or print's own row
```


---


### Galleries Glutton — in the run

**Concept:** a cave troll that speaks only Giant

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Galleries Glutton | 6 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 4 / off 5 → 4.5; sustained 33 (3 × Rend); nova none; dmg 33

```
Galleries Glutton

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

Regeneration. The glutton regains 15 Hit Points at the start of each of its turns. If the glutton takes Acid or Fire damage, this trait doesn't function on the glutton's next turn. The glutton dies only if it starts its turn with 0 Hit Points and doesn't regenerate.

Loathsome Limbs. If the glutton ends any turn Bloodied and took 15+ Slashing damage during that turn, one of the glutton's limbs is severed, falls into the glutton's space, and becomes a Troll Limb. The limb acts immediately after the glutton's turn. The glutton has 1 Exhaustion level for each missing limb, and it grows replacement limbs the next time it regains Hit Points.

Actions

Multiattack. The glutton makes three Rend attacks.

Rend. Melee Attack Roll: +7, reach 10 ft. 11 (2d6 + 4) Slashing damage.

Bonus Actions

Charge. The glutton moves up to half its Speed straight toward an enemy it can see.

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
[path] twist — Troll (is) — "cave troll" (call)
[route] brute-regenerator type=Giant mechanics=regeneration — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | brute-regenerator: ✓ ("cave troll") | brute-regenerator: no line key in the words — the model's read of its quote
[concept] hints: troll→canon ✓ ("a cave troll that speaks only Giant")
[concept] resolve: archetype=brute type=Giant themes=subterranean/bestial mind=sapient style=regenerator energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: regeneration
[concept] signature elements: wounds that close as fast as they open [body] | clawing hook-and-drag into a mauling grapple [behavior] | guttural Giant-speech and cave lairing [aura]
[concept] identity: A hulking cave troll that brawls in close, hooking with slab-like claws and dragging prey into reach of its closing jaws before its wounds have even finished knitting. Every round it presses forward heedless of injury, letting cuts seal shut as it hauls and crushes, and it fights to the death — too stupidly stubborn to flee and too hungry to toy with what it has caught.
[concept] lore: Deep-cave trolls who trade their rumbling Giant-tongue for nothing else, they lair in lightless galleries and haul intruders down to be eaten at leisure, ravenous for the warmth and meat that never wanders into the dark on its own.
[reskin] print canon route: the Troll's body outranks the regenerator seat — no verb in the words names it; the plain brute line
[reskin] print canon defenses: HP 116 -> 94, AC 14 -> 15 — the Troll's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 18, DEX 13, CON 20, INT 7, WIS 9, CHA 7 — the Troll's at its own CR; attack +7 -> +7, DC 16 (print's)
[reskin] regeneration organ injected — 10/turn
[reskin] donor: brute-5 -> CR 6
[reskin] [path] decides: twist on the Troll (the matcher would have said homebrew)
[reskin] print canon: "a cave troll that speaks only Giant" heads on the Troll — print's rows ride along; the seat stays
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline declared: "the glutton" — the call's own answer (kind), built from the name
[reskin] inline form: "the glutton" — the model's own reading of the name
[reskin] save dc derived: DC 14 -> 16 (8 + PB 3 + the sheet's best 5) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a cave troll" -> has (descriptive), head | "speaks only Giant" -> has (header)
[reskin] signature idea (action): "When its slab-claw hooks flesh, the glutton digs in and hauls the victim bodily toward its jaws instead of letting go — the struck creature is yanked out of its footing and dragged in against the troll's chest, dragged across the ground if it was standing further off. Anyone it hauls in this way is left off balance and pinned against the closing maw, easy meat for the next bite." [rider/on_hit/movement] — menu: affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, charge (+ shelf: trample, leap, thrown-burst, shield-bash, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, rampage, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating)
[reskin] fit declined: "Hooking Claw" — a print body takes only what the user's words ask; the call offered no quote, and the key table finds no verb either (the blacksmith's rally, critic-ten 2026-10-01)
[reskin] fallback stands down: the twist path has no shelf — the Troll's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "The glutton's flesh knits shut around whatever cuts it — the instant a wound is opened, the meat crawls closed over the weapon and the attacker's reach. A foe that lands a telling blow finds its blade or limb caught fast in the sealing flesh, stuck to the troll while it keeps hauling forward." [trait/on_being_hit/condition] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] trait declined: "Sealing Flesh" — bound only on the idea's own words (knits shut around:idea) with no key in the concept; a meat body earns its trait by the user's verb (the sniper's tracker, critic 2026-09-29)
[reskin] weapons answered: Claw = none
[reskin] print canon modes: climb off — the Troll has no such mode and the words name none
[reskin] print canon alignment: Neutral Evil -> Chaotic Evil — the Troll's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon speed: 40 ft. -> 30 ft. — the Troll's walk; the concept's other modes stay
[reskin] print canon attack: "Claw" -> "Rend" — the Troll's own row
[reskin] print canon multiattack: "The glutton makes three Rend attacks." — the Troll's own
[reskin] print canon trait: Loathsome Limbs — "a cave troll that speaks only Giant" is the Troll (print's own row)
[reskin] print canon trait: Regeneration — print's text replaces the chassis's (the Troll regenerates 15, not the chassis's 10 — critic's audit 2026-10-02)
[reskin] print canon row: Bonus Actions/Charge — the Troll's own
audit span not verbatim, dropped: Loathsome Limbs the glutton grows replacement limbs the next time it regains Hit Points
audit finding below confidence gate: Loathsome Limbs The block provides no tracking mechanism for Exhaustion removal tied to limb regrowth, and Exhaustion stacking from multiple limbs is undefined in interaction with other sources.
[reskin] audit rewrite blocked — "Regeneration" is engine-authored chassis text
[reskin] audit rewrite blocked — "Loathsome Limbs" is engine-authored chassis text
```

