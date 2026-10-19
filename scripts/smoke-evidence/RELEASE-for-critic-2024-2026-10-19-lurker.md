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

---

# 2024 blocks

## Review batch — sweep-2026-10-18T23-43-43

The checker ran first. The gate table covers every block in the run; every block of the run follows. Each block carries its checker row above and its engine trace below. Hand-derive against the row first; then read for what predicates can't see.

### Gate table — the whole run

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Dire Wolf | 1 | 2024 | skirmisher-1 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/3 |
| Bog Hound | 1 (2014) | 2014 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/4 |
| Owlbear | 3 (2014) | 2014 | brute-2 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok | soft (1) | 1/1 | 2/2 |
| Chapel Bell-Ringer | 3 | 2024 | lurker-1-phantom | ok | SOFT: aim-hp | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 4/4 |
| Air Elemental | 5 | 2024 | lurker-5 | ok | ok | FAIL: two-novas | ok | ok | ok | ok | ok | ok | FAIL (1) | 1/1 | 5/5 |
| Hydra | 8 (2014) | 2014 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |
| Siege-Timber Golem | 8 | 2024 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 7/7 |
| Stone Golem | 10 | 2024 | brute-9 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 6/6 |
| Drowned Choir | 10 (2014) | 2014 | caster-8-binder | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/7 |
| Vampire | 13 (2014) | 2014 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 9/9 |
| Mercyblight Archon | 13 | 2024 | skirmisher-13-winged | ok | ok | SOFT: reach | ok | ok | ok | ok | ok | ok | soft (1) | 0/1 | 6/6 |
| Purple Worm | 15 | 2024 | brute-13 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 5/5 |
| Glacier's Heart | 15 (2014) | 2014 | brute-9-juggernaut | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | soft (1) | 0/1 | 5/5 |
| Adult Red Dragon | 17 (2014) | 2014 | dragon-15 | ok | ok | ok | ok | ok | ok | ok | ok | FAIL: lack-honored | FAIL (1) | 0/1 | 7/7 |
| Brass Tyrant | 17 | 2024 | skirmisher-18 | ok | SOFT: aim-dpr, hot-offense | ok | ok | ok | ok | ok | ok | ok | soft (1) | 0/1 | 10/11 |
| Pit Fiend | 20 | 2024 | defender-17 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 9/9 |
| Ossein Heliarch | 20 (2014) | 2014 | caster-21 | ok | ok | ok | FAIL: ko-ungated | ok | ok | ok | ok | ok | FAIL (1) | 1/1 | 9/9 |
| Ancient Gold Dragon | 24 (2014) | 2014 | dragon-22 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 9/9 |
| Drowning Leviathan | 24 | 2024 | brute-21 | ok | SOFT: aim-dpr, band | ok | ok | ok | ok | ok | ok | ok | soft (1) | 0/1 | 5/7 |
| Owlbear | 3 | 2024 | brute-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 1/1 |
| Goblin Boss | 1 (2014) | 2014 | skirmisher-1 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/3 |
| Vashka the Red | 6 | 2024 | defender-5 | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | soft (1) | 2/2 | 4/6 |
| Caustic Broodling | 9 | 2024 | brute-8-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/3 | 4/4 |
| Black-Iron Sentinel | 11 (2014) | 2014 | defender-5 | ok | user-set: AC 20 · reads CR 9 | ok | ok | ok | ok | ok | ok | ok | clean | 3/3 | 2/2 |
| Mire Hagsight | 7 | 2024 | caster-8-binder | FAIL: attack-stat | ok | ok | ok | ok | ok | ok | ok | ok | FAIL (1) | 2/2 | 2/7 |
| Ironwrit Templar | 6 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 1/1 |
| Ilvareth Dusksong | 12 (2014) | 2014 | caster-12 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 5/5 |
| Swarm of Knell of the Dyings | 13 | 2024 | swarm-9 | ok | SOFT: hot-offense | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 4/4 |
| Reliquary Vault Ooze | 9 (2014) | 2014 | ooze-9 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok | soft (1) | 1/1 | 6/6 |
| Squallmaw Drake | 7 | 2024 | dragon-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 3/3 |
| Quarried Exile | 9 (2014) | 2014 | brute-9 | FAIL: attack-stat, lint:attack-mod-coherence | SOFT: band | ok | ok | ok | ok | ok | ok | ok | FAIL (1) | 2/2 | 1/3 |
| Cold Fury Monk | 5 (2014) | 2014 | skirmisher-3 | ok | SOFT: band | ok | SOFT: ko-at-will | ok | ok | ok | ok | ok | soft (2) | 1/1 | 4/6 |
| Krennik Skullstandard | 4 (2014) | 2014 | skirmisher-3-mounted | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 5/6 |
| Well Drowner | 5 | 2024 | lurker-5-trap | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 0/2 |
| Sludgeshell Priest | 4 | 2024 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 10/15 | 5/5 |
| Meshrin | 8 (2014) | 2014 | skirmisher-8-hurler | ok | user-set: AC 16, HP 120 · reads CR 6.5 | SOFT: payoff-producer, lint:hp-formula | ok | ok | ok | ok | ok | ok | soft (1) | 7/8 | 9/9 |
| Skeleton | 6 | 2024 | brute-5 | ok | ok | SOFT: reach | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 3/3 |
| Scarred Sellsword | 5 (2014) | 2014 | skirmisher-3 | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/2 | 3/3 |
| Brother Halric | 3 (2014) | 2014 | caster-2-warpriest | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 3/5 |

**Dropped 16 of 69 user clauses** (coverage 77%); concept share 89% (180/203 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- lurker-5 / structure: 1
- dragon-15 / reader: 1
- caster-21 / gates: 1
- caster-8-binder / derivation: 1
- brute-9 / derivation: 1



---


### Dire Wolf — lowest CR

**Concept:** name: Dire Wolf | with a frost-rimed hide

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Dire Wolf | 1 | skirmisher-1 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

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

Resistances Cold

Senses darkvision 30 ft.; Passive Perception 13

Languages None

CR 1 (XP 200; PB +2)

Traits

Rimed Hide. A creature that touches the dire wolf or hits it with a melee attack while within 5 feet of it takes 3 (1d6) Cold damage.

Pack Tactics. The dire wolf has Advantage on an attack roll against a creature if at least one of the dire wolf's allies is within 5 feet of the creature and the ally doesn't have the Incapacitated condition.

Actions

Multiattack. The dire wolf makes two Bite attacks.

Bite. Melee Attack Roll: +5, reach 5 ft. 8 (1d10 + 3) Piercing damage. If the dire wolf moved at least 20 feet in a straight line toward the target immediately before the hit, the target takes an extra 3 (1d6) Cold damage and, if it is Large or smaller, is pushed up to 10 feet straight away from the dire wolf and has the Prone condition. If the target is a Large or smaller creature, it has the Prone condition.

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

- Traits/Rimed Hide — template heated-body; library draw (seed unstamped); binds the GM's words: frost
- Traits/Pack Tactics — print's own row
- Actions/Multiattack — the chassis
- Actions/Bite — the chassis

**Engine trace**

```
[route] skirmisher type=Beast mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | skirmisher: ✓ ("Dire Wolf") | skirmisher-skulker: the call read "hide" as not meaning that mechanic here — no override | skirmisher stands: every key that would override it was read as a figure of speech | skirmisher: no line key in the words — the model's read of its quote
[concept] name: "Dire Wolf" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] resolve: archetype=skirmisher type=Beast themes=bestial/elemental mind=bestial style=— energy=Cold mix=both identity=✓ lore=✓
[concept] name: provided "Dire Wolf"
[concept] mechanics: none claimed
[concept] signature elements: frost-rimed hide [body] | pack skirmishing, dart in and out [behavior] | chilling bite that numbs the wound [behavior]
[concept] identity: A dire wolf whose hide is sheathed in hoarfrost, it circles the pack's prey at a loping trot before lunging in to hamstring and drag down, then peels away before the quarry can answer. It fights as part of the pack, driving prey toward its fellows and biting at flanks and hocks, and it never stands and trades blows. When bloodied it does not break and run — it retreats just far enough to let the cold of its pelt seep into the wound before wheeling back in for another pass, fighting to the kill as long as the pack holds.
[concept] lore: Something in the high passes killed a wolf and left it in the snow too long, and the winter kept it; the frost-rimed dire wolf now runs with whatever pack will have it, hunting warmth it can no longer feel.
[reskin] print canon defenses: HP 30 -> 22, AC 15 -> 14 — the Dire Wolf's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 17, DEX 15, CON 15, INT 3, WIS 12, CHA 7 — the Dire Wolf's at its own CR; attack +4 -> +5, DC 13 (print's)
[reskin] donor: skirmisher-1 -> CR 1
[reskin] print canon: "Dire Wolf — with a frost-rimed hide" heads on the Dire Wolf — print's rows ride along; the seat stays
[reskin] claim gate: CR 1 but a Beast body — the trait seat stays open (print: a material body carries a trait at every tier)
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] inline by rule: "the dire wolf" — the call answered "the dire wolf" (kind), which the name does not support
[reskin] inline form: "the dire wolf" — the model's own reading of the name
[reskin] final price: the round ran 14 against the card's 10 — the attack rows re-solve at 75% (2 attacks off one row after a supersede)
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Dire Wolf — with a frost-rimed hide" -> has (descriptive), head
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The wolf lowers its frost-crusted shoulder and charges in a straight line at one foe, and the cold rime on its hide flares as it strikes — the bite that lands leaves the wound rimed over, so the target's next attempt to strike or chase the wolf is slowed and clumsy while the chill lingers." [rider/on_hit/condition] — menu: contagion, charge-push, hook-rider, pounce, isolation, charge (+ shelf: snare, shield-bash, lure, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, slow-bolt, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, riposte)
[reskin] signature bound to the concept's verb: action — slow-bolt (frost)
[reskin] word match declined by the call: slow-bolt, rampage, contagion, hook-rider, pounce, isolation, feint-slip — the key word does not mean the mechanic here
[reskin] pick kept on the GM's own words: action — "charge-push" has no key-table verb, but the call quotes "frost rimed hide" from the description
[reskin] signature rider: charge-push -> Bite (appended; The wolf charges in a straight line at one foe and its frost-rimed hide flares a [shape fit, no verb match])
[reskin] signature idea (trait): "Its hide is sheathed in living hoarfrost that never melts; anything that bites, grapples, or otherwise presses bare flesh against the wolf takes the cold into itself and is left numbed and sluggish for a short while afterward, which is how the pack peels away from a wounded quarry without being answered." [trait/on_being_hit/condition] — menu: heated-body, absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst)
[reskin] signature bound to the concept's verb: trait — heated-body (frost)
[reskin] signature template (trait): heated-body -> Traits/"Rimed Hide" ("something that bites, grapples, or presses bare flesh against the wolf takes the [verb: frost:concept]")
[reskin] weapons answered: Bite = none
[reskin] print canon speed: 30 ft. -> 50 ft. — the Dire Wolf's walk; the concept's other modes stay
[reskin] languages held: None stands — INT 3 on a Beast speaks nothing, whatever the mind read said
[reskin] resistances derived: Cold
[reskin] print canon trait: Pack Tactics — "Dire Wolf — with a frost-rimed hide" is the Dire Wolf (print's own row)
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the seat's, not the Dire Wolf's
[reskin] print canon: chassis row leaves — Traits/"Slipstream" is the seat's, not the Dire Wolf's
[reskin] vulnerability rejected — "Fire" has no warrant in the concept's own text (print's default is none)
```


---


### Drowning Leviathan — highest CR

**Concept:** a leviathan of the trench whose song drowns fleets

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Drowning Leviathan | 24 | brute-21 | ok | SOFT: aim-dpr, band | ok | ok | ok | ok | ok | ok | ok |

- bands · soft · aim-dpr: damage 180 a round is 28% under the card's 250
- bands · soft · band: reads CR 25.5 (print at 24 reads 17.5–25.5, n=5)
- **dropped clause:** "a leviathan of the trench whose song drowns fleets"
- read: def 26 / off 25 → 25.5; sustained 180 (2 × Bite + legendary Surging Lunge); nova Crushing Roar 78; dmg 180

```
Drowning Leviathan

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

Senses blindsight 120 ft.; Passive Perception 19

Languages None

CR 24 (XP 62,000; PB +7)

Traits

Amphibious. The leviathan can breathe air and water.

Legendary Resistance (3/Day). If the leviathan fails a saving throw, it can choose to succeed instead.

Actions

Multiattack. The leviathan makes two Bite attacks.

Bite. Melee Attack Roll: +16, reach 10 ft. 22 (3d8 + 9) Piercing damage plus 14 (4d6) Thunder damage.

Crushing Roar (Recharge 5-6). Constitution Saving Throw: DC 24, each creature in a 60-foot Cone. Failure: 78 (12d12) Thunder damage, and the target has the Deafened condition until the end of its next turn. Success: Half damage only.

Bonus Actions

Retaliating Thunderclap. One creature within 5 feet that hit the leviathan with an attack roll since the end of the leviathan's last turn takes 14 (4d6) Thunder damage.

Legendary Actions

Legendary Action Uses: 3. Immediately after another creature's turn, the leviathan can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.

Surging Lunge. The leviathan moves up to half its Speed without provoking Opportunity Attacks, and it makes one Bite attack.

Tide Slam. Strength Saving Throw: DC 24, each creature within 10 feet of the leviathan. Failure: The target has the Prone condition.

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
- Actions/Crushing Roar — the chassis
- Legendary Actions/Legendary Action Uses: 3 — the chassis
- Legendary Actions/Surging Lunge — the chassis
- Legendary Actions/Tide Slam — the chassis
- Bonus Actions/Retaliating Thunderclap — library seed own-turn-punisher

**Engine trace**

```
[route] brute type=Monstrosity mechanics=aura — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | caster-binder: the call reads no worked magic in these words | brute-grappler: ✓ ("a leviathan of the trench") | brute-grappler: no line key in the words — the model's read of its quote | brute-grappler -> brute: a grappler is a mechanic engine and needs a key in the words — the model's read of its quote cannot land it
[concept] resolve: archetype=brute type=Monstrosity themes=aquatic/voice mind=bestial style=— energy=Thunder mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: aura
[concept] signature elements: the drowning song that sinks fleets [behavior] | trench-brine body of coiled, crushing mass [body] | pressure of the deep crushing hulls and lungs [aura]
[concept] identity: A Gargantuan leviathan of the lightless trench, it opens a fleet-fight by hanging in the deep and loosing its drowning song — a crushing subsonic drone that shudders hulls and drags sailors down — then rises to smash ships with tidal mass and coils of brine-heavy flesh. Once bloodied it does not flee; it redoubles the song until the water around it is a killing pressure, crushing and drowning everything that floats or swims, and it will circle a broken fleet for hours rather than let a single survivor go.
[concept] lore: It is a trench-born monstrosity grown vast on the drowned dead of a thousand wrecks, and it sings to pull new hulls down into the cold dark where it can feed and nest.
[reskin] donor: brute-21 -> CR 24 (invented — no printed peer)
[reskin] ranged row off: "Legendary Ranged Attack" leaves with it (it made a Ranged Attack attack)
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] inline declared: "the leviathan" — the call's own answer (kind), built from the name
[reskin] inline form: "the leviathan" — the model's own reading of the name
[reskin] save dc derived: DC 23 -> 24 (8 + PB 7 + the sheet's best 9) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a leviathan of the trench whose song drowns fleets" -> has (mechanical) [asked: save_area]
[reskin] menu pruned: action — push-prone, thrown-burst-seed (the sheet cannot render them)
[reskin] signature idea (action): "The leviathan's coiled, brine-heavy bulk rolls and slams across everything near it, and the thunder of the impact leaves the water ringing. Anything caught in that blast carries the ringing inside it, so the next time the leviathan coils and surges toward that creature, it is already shaking apart and gives way." [action/save/damage] — menu: shield-bash, escalating-dread, terror-pulse, herd, drain, exploiter (+ shelf: second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, stunning-strike, charge-push, hook-rider, pounce, charge)
[reskin] word match declined by the call: exploiter — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "collision"
[reskin] signature miss: action — "The leviathan's coiled, brine-heavy bulk rolls and slams across everything near it, and the thunder of the impact leaves the water ringing. Anything caught in that blast carries the ringing inside it, so the next time the leviathan coils and surges toward that creature, it is already shaking apart and gives way." [action/save/damage] — the model found no template that holds it (offered: shield-bash, escalating-dread, terror-pulse, herd, drain, exploiter)
[reskin] fallback respects the call: exploiter left the shelf — the call declined it for this sheet
[reskin] fallback skipped by the floor: herd (EV 14.8 vs 64.2)
[reskin] value check: "Answering Sting" EV 7.7 vs floor 6.2 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: own-turn-punisher -> Bonus Actions/"Answering Sting" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Its song does not stop when the Drowning Song is spent; the drone settles into everything that has already heard it and keeps pressing on eardrums and ribs. Any creature still reeling from that song is pinned in place, unable to pull away from the leviathan's reach, because the pressure it hears is the same pressure holding it." [trait/always/condition] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending, weapon-lodge)
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "Its song does not stop when the Drowning Song is spent; the drone settles into everything that has already heard it and keeps pressing on eardrums and ribs. Any creature still reeling from that song is pinned in place, unable to pull away from the leviathan's reach, because the pressure it hears is the same pressure holding it." [trait/always/condition] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura)
[reskin] weapons answered: Bite = none; Drowning Song = none; Trench Call = none; Coil Rush = none; Tide Slam = none
[reskin] chassis nova: "Drowning Song (Recharge 5-6)" — the brute-21's own nova row (its "Area Nova", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] amphibious by concept: a creature of the deep breathes both (print: the Sea Hag's)
[reskin] audit rename: "Drowning Song (Recharge 5-6)" -> "Crushing Roar (Recharge 5-6)"
[reskin] audit rename: "Answering Sting" -> "Retaliating Thunderclap"
[reskin] audit rename: "Coil Rush" -> "Surging Lunge"
```


---


### Chapel Bell-Ringer — a 2024 sheet

**Concept:** a chapel bell-ringer's ghost that tolls for the dying

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Chapel Bell-Ringer | 3 | lurker-1-phantom | ok | SOFT: aim-hp | ok | ok | ok | ok | ok | ok | ok |

- bands · soft · aim-hp: HP 44 is 27% under the card's 60
- read: def 2 / off 3 → 2.5; sustained 21 (1 × Bell Hammer); nova Passing Peal 17; dmg 25

```
Chapel Bell-Ringer

Medium Undead, Neutral

AC 12
Initiative +3 (13)

HP 44 (8d8 + 8)

Speed 5 ft., Fly 50 ft. (hover)

MOD
SAVE
STR
1
-5
-5
INT
10
+0
+0
MOD
SAVE
DEX
16
+3
+5
WIS
10
+0
+0
MOD
SAVE
CON
13
+1
+1
CHA
11
+0
+0

Skills Stealth +5

Resistances Bludgeoning, Piercing, Slashing

Immunities Poison; Charmed, Exhaustion, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained

Senses darkvision 60 ft.; Passive Perception 10

Languages Common plus the languages it knew in life

CR 3 (XP 700; PB +2)

Traits

Incorporeal Movement. The chapel bell-ringer can move through other creatures and objects as if they were Difficult Terrain. It takes 5 (1d10) Force damage if it ends its turn inside an object.

Sunlight Sensitivity. While in sunlight, the chapel bell-ringer has Disadvantage on ability checks and attack rolls.

Actions

Bell Hammer. Melee Attack Roll: +5, reach 5 ft. 12 (2d8 + 3) Bludgeoning damage plus 9 (2d8) Necrotic damage.

Passing Peal (Recharge 5-6). Constitution Saving Throw: DC 13, each creature in a 15-foot Emanation originating from the chapel bell-ringer. Failure: 17 (5d6) Thunder damage, and the target has the Deafened condition until the end of its next turn. Success: Half damage only.

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

- Traits/Incorporeal Movement — the chassis
- Traits/Sunlight Sensitivity — the chassis
- Actions/Bell Hammer — the chassis
- Actions/Passing Peal — template active-toll; library draw (seed unstamped); the GM's clause "tolls for the dying"; binds the GM's words: toll+bell+peal

**Engine trace**

```
[route] lurker-phantom type=Undead mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | lurker-phantom: ✓ ("a chapel bell-ringer's ghost") | lurker-phantom: key "ghost" (class body)
[concept] hints: phantom→style ✓ ("a chapel bell-ringer's ghost")
[concept] resolve: archetype=lurker type=Undead themes=grave/voice mind=sapient style=phantom energy=Necrotic mix=energy identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: tolling a bell for the dying [behavior] | death-knell that drains vitality [aura] | shadow-wreathed incorporeal form [body]
[concept] identity: The bell-ringer drifts silent through the chapel walls until it finds a soul near its end, then manifests beside them and tolls its ghostly handbell — a slow, mournful stroke that drags life out of the living and marks them as already gathered. Each round it keeps tolling, pacing its strokes like a funeral rite, draining vitality with every peal while slipping through stone and pew to stay out of reach; it does not rage or rush, and if the dying refuse to die it tolls faster and faster until the bell's knell becomes a hammering dirge. Cornered by true light it withdraws through the walls, but it never abandons a death it has already begun to ring.
[concept] lore: A chapel bell-ringer who rang the passing-bell for every soul in the parish and was denied that bell at his own death now walks the chapel, tolling for the dying and refusing to let a single death go unmarked.
[reskin] donor: lurker-1-phantom -> CR 3
[reskin] inline by rule: "the chapel bell-ringer" — the call answered "the bell-ringer" (kind), which the name does not support
[reskin] inline on kit rows: "the bell-ringer" -> "the chapel bell-ringer"
[reskin] inline form: "the bell-ringer" — the model's own reading of the name
[reskin] save dc derived: DC 12 -> 13 (8 + PB 2 + the sheet's best 3) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a chapel bell-ringer's ghost" -> has (descriptive), head | "tolls for the dying" -> has (mechanical) [asked: condition]
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The bell-ringer lifts its ghostly handbell and tolls a slow, mournful passing-stroke at one dying soul it can see. The sound is not loud but it is everywhere in the victim's bones, dragging life out of them in a long dark pull, and the same peal washes over others standing near — those already close to death feel their own wick guttering in answer. It marks that soul as already gathered; while the" [action/save/damage] — menu: leap, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, terror-pulse, snare-bolt, slow-bolt, sensory-strike, drain, zone-seed, blighted-ground (+ shelf: delayed-brand, patient-defense, self-invisibility, focus, feint-slip, coating, riposte, charge-push, hook-rider, pounce, isolation)
[reskin] signature bound to the concept's verb: action — active-toll, sensory-strike (toll, bell)
[reskin] word match declined by the call: drain — the key word does not mean the mechanic here
[reskin] value check: "Passing Peal (Recharge 5-6)" EV 62.5 vs floor 19.4 (the whole Multiattack (1 attacks)) — worth the trade
[reskin] signature template: active-toll -> Actions/"Passing Peal (Recharge 5-6)" ("The bell-ringer tolls a peal that drags life out of nearby creatures, a save-bas [verb: toll:concept, bell:concept, peal:idea]")
[reskin] keys spent by the action: toll
[reskin] signature idea (trait): "Each peal of its bell draws the last warmth out of anyone near their end. Whenever the ringer strikes a soul that is already wounded and close to death, the touch of its tolling saps them further, leaving them weaker and slower when the next stroke comes." [trait/always/damage] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, evasion, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature bound to the concept's verb: trait — bloodied-burst (toll, bell, dying, the dying)
[reskin] word match declined by the call: bloodied-burst, resonant-body, death-burst — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit" after being shown bloodied-burst, which the GM's words keyed
[reskin] key match declined: trait — "bloodied-burst" was ranked first on the call's own menu for toll+bell+dying+the dying, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: trait — "Each peal of its bell draws the last warmth out of anyone near their end. Whenever the ringer strikes a soul that is already wounded and close to death, the touch of its tolling saps them further, leaving them weaker and slower when the next stroke comes." [trait/always/damage] — the model found no template that holds it (offered: bloodied-burst, false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, evasion, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst, resonant-body, heated-body)
[reskin] concept-first trait skipped: bloodied-burst — the call read its match as a collision (the word is a modifier, or the sheet already answers it)
[reskin] concept-first trait skipped: resonant-body — the call read its match as a collision (the word is a modifier, or the sheet already answers it)
[reskin] weapons answered: Bell Hammer = none
[reskin] weapon declined: "Bell Hammer" reads warhammer from its name, but the call answered none — the row carries no weapon
[reskin] languages by mind: "None" -> "Common plus the languages it knew in life" (sapient)
[reskin] immunities stamped for type: Undead + donor suite -> Poison; Charmed, Exhaustion, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained
[reskin] resistances derived: Bludgeoning, Piercing, Slashing
[reskin] nova capped: Actions/Passing Peal (Recharge 5-6) — 24 over the CR 3 ceiling 17, dice to 17 (5d6)
[reskin] row binds its clause: "Passing Peal" answers "tolls for the dying" — the keys it matched came from that clause, so the coverage credit has a receipt
```


---


### Mercyblight Archon — a homebrew with a nova

**Concept:** a plague-bearing archon of flies that commands lesser swarms

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Mercyblight Archon | 13 | skirmisher-13-winged | ok | ok | SOFT: reach | ok | ok | ok | ok | ok | ok |

- structure · soft · reach: Actions/Pestilent Talons: reach 10 on a Medium body with no tether word
- **dropped clause:** "commands lesser swarms"
- read: def 9 / off 16 → 12.5; sustained 72 (3 × Pestilent Talons); nova Wings of Clotted Venom 67; dmg 93

```
Mercyblight Archon

Medium Celestial, Lawful Neutral

AC 18
Initiative +5 (15)

HP 187 (22d8 + 88)

Speed 40 ft., Fly 80 ft.

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
20
+5
+10
WIS
16
+3
+8
MOD
SAVE
CON
18
+4
+4
CHA
12
+1
+1

Skills Perception +8, Stealth +10

Resistances Radiant

Immunities Charmed

Senses darkvision 60 ft.; Passive Perception 18

Languages Common

CR 13 (XP 10,000; PB +5)

Traits

Veiled Flight. The archon doesn't provoke Opportunity Attacks when it flies out of an enemy's reach.

Restless Drift. When a creature the archon can see ends its turn within 5 feet of it, the archon can move up to 10 feet without provoking Opportunity Attacks.

Actions

Multiattack. The archon makes three Pestilent Talons attacks.

Pestilent Talons. Melee Attack Roll: +10, reach 10 ft. 14 (2d8 + 5) Slashing damage plus 10 (3d6) Poison damage. If the archon flew at least 20 feet in a straight line toward the target immediately before the hit, the target takes an extra 7 (2d6) Slashing damage and, if it is Large or smaller, has the Prone condition.

Wings of Clotted Venom (Recharge 5-6). The archon flies up to its Speed without provoking Opportunity Attacks. Each creature it passes within 5 feet during this movement is targeted once by the following effect. Strength Saving Throw: DC 17. Failure: 67 (15d8) Poison damage, and the target has the Prone condition. Success: Half damage.

Bonus Actions

Aerial Agility. The archon takes the Dash or Disengage action.

Plague Compulsion. Wisdom Saving Throw: DC 17, one creature within 30 feet. Failure: Until the start of the archon's next turn, the target has Disadvantage on attack rolls against creatures other than the archon.

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

- Traits/Veiled Flight — the chassis
- Traits/Restless Drift — the chassis
- Actions/Multiattack — the chassis
- Actions/Pestilent Talons — the chassis
- Actions/Wings of Clotted Venom — the chassis
- Bonus Actions/Aerial Agility — the chassis
- Bonus Actions/Plague Compulsion — template aggro-curse; library draw (seed unstamped)

**Engine trace**

```
!! Error generating response: TypeError: Failed to fetch
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs?t=1792202639880:246:26)
    at enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs?t=1792202639880:303:26)
    at saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1792366287307:1413:30)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1792366287307:1252:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1792366287307:656:5)
!! [ENRICHMENT] Failed to enrich Vampire: TypeError: Failed to fetch
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs?t=1792202639880:246:26)
    at enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs?t=1792202639880:303:26)
    at saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1792366287307:1413:30)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1792366287307:1252:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1792366287307:656:5)
[route] skirmisher-winged type=Celestial mechanics=aura — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | skirmisher-winged: ✓ ("archon of flies") | skirmisher-winged: key "flies" (class verb)
[concept] hints: swarm→body ✗ ("commands lesser swarms — it commands the") | winged→style ✗ ("of flies — flies are its servants, not i")
[concept] resolve: archetype=skirmisher type=Celestial themes=celestial/venomous mind=sapient style=winged energy=Poison mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: aura
[concept] signature elements: commands lesser swarms [behavior] | plague-bearing body of corrupted light [body] | swooping dives and snatches [behavior]
[concept] identity: The archon opens by loosing a churning column of flies from its hollow ribcage, a living veil that blinds and poisons before it ever closes to strike. Every round thereafter it dives through the swarm on wings of clotted light, raking with pestilent talons and snatching the weakened skyward to drop them, while its commands ripple through the lesser flies to reposition and harry. It toys with prey it judges beneath it, but once bloodied it fights to the death with the cold fury of a fallen celestial.
[concept] lore: Once a radiant archon of the upper courts, it was condemned to carry a plague it could not cure and now drifts between mortal battlefields, seeding pestilence where it once delivered mercy.
[reskin] donor: skirmisher-13-winged -> CR 13 (invented — no printed peer)
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] inline declared: "the archon" — the call's own answer (kind), built from the name
[reskin] inline form: "the archon" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a plague-bearing archon of flies" -> has (descriptive), head | "commands lesser swarms" -> has (mechanical)
[reskin] menu pruned: action — phase-slip, thrown-burst-seed (the sheet cannot render them)
[reskin] signature idea (action): "The archon rasps a silent command and the plague-flies within it pour out to possess its wounded prey, driving the infected creature to stagger toward it and bare its throat. The prey can only be seized this way in the moments after the archon has bloodied it, and only one creature bears the compulsion at a time — the swarm has a single purpose, not many." [bonus_action/always/movement] — menu: patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, rally (+ shelf: condition-payoff, shield-bash, lure, snare-bolt, sensory-strike, disarm, delayed-brand, exploiter, herd, riposte, contagion, stunning-strike, charge-push, hook-rider, pounce, isolation)
[reskin] signature bound to the concept's verb: action — contagion (plague, plagued)
[reskin] word match declined by the call: contagion, delayed-brand, rally — the key word does not mean the mechanic here
[reskin] pick kept on the GM's own words: action — "aggro-curse" has no key-table verb, but the call quotes "commands lesser swarms" from the description
[reskin] value check: "Plague Compulsion" EV 7.5 vs floor 4.1 (a bonus action (free)) — worth the trade
[reskin] signature template: aggro-curse -> Bonus Actions/"Plague Compulsion" ("The swarm pours into wounded prey and compels it to stagger toward the archon an [shape fit, no verb match]")
[reskin] signature idea (trait): "The flies that veil the archon are not merely its shroud but its swarm: whenever a creature near it is already sickened by its plague, the lesser flies leave that body and clot the air around the archon, thickening its guard. The archon is harder to strike while its sickness festers in others, and the protection fades the moment its victims are cured or slain." [trait/always/defense] — menu: adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature bound to the concept's verb: trait — heated-body (plague)
[reskin] word match declined by the call: heated-body, noxious-aura, blurred-form — the key word does not mean the mechanic here
[reskin] trait declined: "Clotting Shroud" — bound only on the idea's own words (guard:idea) with no key in the concept; a meat body earns its trait by the user's verb (the sniper's tracker, critic 2026-09-29)
[reskin] weapons answered: Pestilent Talons = none; Wings of Clotted Light = none
[reskin] chassis nova: "Wings of Clotted Light (Recharge 5-6)" — the skirmisher-13-winged's own nova row (its "Diving Attack", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] immunities stamped for type: Celestial -> Charmed
[reskin] resistances derived: Radiant
audit finding below confidence gate: Wings of Clotted Light The targeting is ambiguous — 'passes within 5 feet' does not specify whether the creature's space or its path is measured, and 'targeted once' does not say whether a creature can be targeted at multiple points along the flight if it remains within 5 feet.
[reskin] audit rename: "Drifting Swarm" -> "Restless Drift"
[reskin] audit rename: "Wings of Clotted Light (Recharge 5-6)" -> "Wings of Clotted Venom (Recharge 5-6)"
```


---


### Brass Tyrant — bands soft

**Concept:** a tyrant of burning brass who rules a city of forges

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Brass Tyrant | 17 | skirmisher-18 | ok | SOFT: aim-dpr, hot-offense | ok | ok | ok | ok | ok | ok | ok |

- bands · soft · aim-dpr: damage 150 a round is 21% under the card's 190
- bands · soft · hot-offense: offense alone reads CR 21, 4 over; the HP axis pulls the read to 16.5
- **dropped clause:** "rules a city of forges"
- read: def 12 / off 21 → 16.5; sustained 150 (3 × Brass Fist + legendary Sledge Advance); nova Forge Breath 72; dmg 150

```
Brass Tyrant

Huge Construct, Lawful Evil

AC 19
Initiative +6 (16)

HP 218 (19d12 + 95)

Speed 70 ft.

MOD
SAVE
STR
20
+5
+5
INT
14
+2
+2
MOD
SAVE
DEX
22
+6
+12
WIS
18
+4
+10
MOD
SAVE
CON
20
+5
+5
CHA
16
+3
+3

Skills Perception +10, Stealth +12

Resistances Fire

Immunities Poison; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned

Senses darkvision 120 ft.; Passive Perception 20

Languages Common

CR 17 (XP 18,000; PB +6)

Traits

Seam Scorch. A creature that touches the tyrant or hits it with a melee attack while within 5 feet of it takes 10 (3d6) Fire damage.

Legendary Resistance (3/Day). If the tyrant fails a saving throw, it can choose to succeed instead.

Forge Stride. The tyrant ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Furnace Pivot. When a creature the tyrant can see ends its turn within 5 feet of it, the tyrant can move up to 15 feet without provoking Opportunity Attacks.

Actions

Multiattack. The tyrant makes three attacks, using Brass Fist or Furnace Vent in any combination. It can replace one attack with a use of Brass Backlash.

Brass Fist. Melee Attack Roll: +12, reach 10 ft. 15 (2d8 + 6) Bludgeoning damage plus 10 (3d6) Fire damage.

Furnace Vent. Ranged Attack Roll: +12, range 60/240 ft. 20 (4d6 + 6) Fire damage.

Forge Breath (Recharge 5-6). Wisdom Saving Throw: DC 19, each creature in a 60-foot-long, 10-foot-wide Line. Failure: 72 (16d8) Fire damage, and the target has the Frightened condition until the end of its next turn. Success: Half damage only.

Brass Backlash. Wisdom Saving Throw: DC 19, one creature within 30 feet that is Frightened of the tyrant. Failure: 21 (6d6) Fire damage. Success: Half damage.

Bonus Actions

Fleet Agility. The tyrant takes the Dash or Disengage action.

Legendary Actions

Legendary Action Uses: 3. Immediately after another creature's turn, the tyrant can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.

Sledge Advance. The tyrant moves up to half its Speed without provoking Opportunity Attacks, and it makes one Brass Fist attack.

Vent Scorch. The tyrant makes one Furnace Vent attack. The tyrant can't take this action again until the start of its next turn.

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

- Traits/Seam Scorch — template heated-body; library draw (seed unstamped); binds the GM's words: burn+brass+heat+scald+furnace+fire+glow
- Traits/Legendary Resistance — the chassis
- Traits/Forge Stride — the chassis
- Traits/Furnace Pivot — the chassis
- Actions/Multiattack — the chassis
- Actions/Brass Fist — the chassis
- Actions/Furnace Vent — the chassis
- Actions/Forge Breath — the chassis
- Actions/Brass Backlash — library seed exploiter
- Bonus Actions/Fleet Agility — the chassis
- Legendary Actions/Legendary Action Uses: 3 — the chassis
- Legendary Actions/Sledge Advance — the chassis
- Legendary Actions/Vent Scorch — the chassis

**Engine trace**

```
!! Failed to load resource: the server responded with a status of 500 (OK)
!! Error generating response: Error: HTTP 500: 
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs?t=1792202639880:266:25)
    at async routeOn (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1792366287307:920:19)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1792366287307:959:26)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1792366287307:656:5)
!! [route] call failed: HTTP 500: 
[route] nothing routed — the call failed; random skirmisher plain line ships
[concept] resolve: archetype=skirmisher type=Construct themes=forged/fiendish mind=sapient style=— energy=Fire mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: forge-fire breath from a furnace-vented chest [behavior] | a body of burning brass and sledge-heavy fists [body] | the fire-scour aura that stokes hotter each round [aura]
[concept] identity: The Brass Tyrant opens a battle by loosing a roaring cone of forge-fire from the furnace-vent that splits its chest, then wades into the ranks with sledge-heavy brass fists, its every blow searing and crumpling armor at once. Each round it stokes itself hotter, its hide glowing white at the seams, an aura of fire-scour boiling the air around it and punishing any who close. It is proud and calculating, never fleeing, but it fights to break a city's spirit rather than merely to kill — toying with a routed foe, letting a few crawl away alive to spread the tale of its unmaking.
[concept] lore: Forged in the deepest furnace of a conquered city, the Brass Tyrant was crowned by the smiths it enslaved and now rules their forges as a living idol, demanding every flame be burned in its name and every blade quenched in tribute to its throne.
[reskin] donor: skirmisher-18 -> CR 17 (invented — no printed peer)
[reskin] name_element answered: Forge Breath = imagery; Furnace Vent = imagery; Vent Scorch = imagery
[reskin] name element refused: "Furnace Vent" was called imagery, but its element word stands alone — a fused compound makes no claim, a bare one does
[reskin] name element refused: "Forge Breath" was called imagery, but its element word stands alone — a fused compound makes no claim, a bare one does
[reskin] inline declared: "the tyrant" — the call's own answer (kind), built from the name
[reskin] inline form: "the tyrant" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a tyrant of burning brass" -> has (descriptive), head | "rules a city of forges" -> has (descriptive)
[reskin] menu pruned: action — thrown-burst-seed, phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The tyrant grips a creature in one brass hand and bears down, and the furnace-heat trapped inside its palm pours straight through the victim's armor and bone. The longer it holds on, the hotter the grip grows — a brand that keeps burning into flesh for as long as the tyrant's fist stays shut. It can only keep a grip on one foe this way." [rider/on_hit/damage] — menu: stunning-strike, charge-push, hook-rider, pounce, isolation, bolt-mark, charge (+ shelf: gaze-single, snare, condition-payoff, throw-retrieve, shield-bash, lure, snare-bolt, sensory-strike, disarm, delayed-brand, exploiter, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte)
[reskin] value check: "Furnace Grip" EV 6.6 vs floor 13 (one attack of 3) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Furnace Grip" — the ladder could not lift it; the fallback stands in
[reskin] value check: "Opportunist's Lash" EV 16.3 vs floor 13 (one attack of 3) — worth the trade
[reskin] library seed drawn: exploiter -> Actions/"Opportunist's Lash" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Every time the tyrant stokes itself — each time it vents its furnace-fire or lands a punching blow — heat builds in its seams until it glows white, and while it glows, the air around it scalds anything that comes close enough to strike it and its own fire burns hotter still. The glow dies down if the tyrant spends time on the defensive rather than feeding the furnace." [trait/always/damage] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature bound to the concept's verb: trait — heated-body (burn, brass)
[reskin] word match declined by the call: fire-aura, marking-light — the key word does not mean the mechanic here
[reskin] signature template (trait): heated-body -> Traits/"Seam Scorch" ("The glow builds from stoking itself and scalds anything that comes close enough  [verb: burn:concept, brass:concept, heat:idea, scald:idea, furnace:idea, fire:idea, glow:idea]")
[reskin] weapons answered: Brass Fist = none; Furnace Vent = none; Forge Breath = none
[reskin] weapon table: "Furnace Vent" — range 60/180 ft. is not a print range; an unlisted thrown thing is 20/60, a hurled mass 60/240 (the critic's third species read)
[reskin] chassis nova: "Forge Breath (Recharge 5-6)" — the skirmisher-18's own nova row (its "Sweeping Area Attack", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] immunities stamped for type: Construct -> Poison; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned
[reskin] resistances derived: Fire
[reskin] multiattack replacement clause: It can replace one attack with a use of Opportunist's Lash.
[reskin] save re-derived after a retype: Actions/Forge Breath — a Strength save for an effect that calls for Wisdom or Charisma; the save follows the condition
[reskin] save re-derived after a retype: Actions/Opportunist's Lash — a Strength save for an effect that calls for Wisdom or Charisma; the save follows the condition
audit finding below confidence gate: Furnace Pivot The trigger is oddly narrow and conditional (ends its turn within 5 feet), making the trait nearly dead in most combats — while a creature is adjacent at end of turn, it cannot kite the tyrant.
[reskin] audit rename: "Opportunist's Lash" -> "Brass Backlash"
[reskin] dead name still carried — "Withdraw" names a row that is still on the sheet; no sweep
[reskin] identical row leaves: Legendary Actions/"Withdraw" reads word for word as Legendary Actions/"Fleet Agility" — one ability, one name
```


---


### Vashka the Red — bands soft

**Concept:** name: Vashka the Red | A hobgoblin warlord in lacquered plate who fights from a shield wall and never breaks ranks.

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Vashka the Red | 6 | defender-5 | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 4.5 (print at 6 reads 3–8.5, n=42)
- read: def 3 / off 6 → 4.5; sustained 44 (2 × Warhammer); nova none; dmg 44

```
Vashka the Red

Medium Humanoid, Lawful Neutral

AC 15
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

Senses Passive Perception 14

Languages Goblin, Common

CR 6 (XP 2,300; PB +3)

Traits

Never Breaks Ranks. While Vashka is within 5 feet of an ally who is not Incapacitated, Vashka can't be forced to move by any effect, and it doesn't provoke Opportunity Attacks by moving.

Guarded Stance. While Vashka isn't Bloodied, melee attack rolls against it are made with Disadvantage.

Actions

Multiattack. Vashka makes two attacks, using Warhammer or Javelin in any combination.

Warhammer. Melee Attack Roll: +7, reach 5 ft. 22 (4d8 + 4) Bludgeoning damage.

Javelin. Melee or Ranged Attack Roll: +7, reach 5 ft. or range 30/120 ft. 22 (4d8 + 4) Piercing damage.

Bonus Actions

Answering Sting. One creature within 5 feet that hit Vashka with an attack roll since the end of Vashka's last turn takes 7 (2d6) Bludgeoning damage.

Reactions

Riposte. Trigger: A creature within 5 feet of Vashka misses it with a melee attack roll. Response: Vashka makes one Warhammer attack against that creature.

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

- Traits/Never Breaks Ranks — authored for this sheet; the GM's clause "never breaks ranks"
- Traits/Guarded Stance — template guarded-stance; fighter kit; the GM's clause "fights from a shield wall"
- Actions/Multiattack — the chassis
- Actions/Warhammer — weapon warhammer
- Actions/Javelin — weapon javelin
- Reactions/Riposte — template riposte; fighter kit; the GM's clause "fights from a shield wall"
- Bonus Actions/Answering Sting — library seed own-turn-punisher

**Engine trace**

```
[route] defender type=Humanoid mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | defender-leader: ✓ ("A hobgoblin warlord") | defender-leader -> defender: the concept's VERB outranks the noun (key "shield wall", class verb) | defender: key "shield wall" (class verb)
[concept] name: "Vashka the Red" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] resolve: archetype=defender type=Humanoid themes=armed/terror mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: provided "Vashka the Red"
[concept] mechanics: none claimed
[concept] signature elements: the unbreakable shield wall [behavior] | lacquered plate over iron discipline [body] | a warlord's command presence [aura]
[concept] identity: Vashka the Red opens by bracing in a lacquered shield wall with her hobgoblin guard, letting enemies spend their charge on a bristling line of iron. Each round she punishes anyone who tries to slip past her, stepping into their path and hammering them back with a weapon and a shield boss. She never breaks ranks and never flees — a commander who fights to the death behind a wall of iron.
[concept] lore: A hobgoblin warlord who rose by turning a mercenary band into a disciplined war machine, Vashka the Red now holds the pass she conquered and waits for any army that thinks it can push her line back.
[reskin] donor: defender-5 -> CR 6
[reskin] row gated out: Guard Aura (aura) — the concept did not claim this mechanic
[reskin] implied class kept: "fighter" on the GM's own words "fights from a shield wall" — the key table found none
[reskin] class kit: fighter — "fights from a shield wall": Riposte (riposte), Guarded Stance (guarded-stance)
[reskin] proper noun: "Vashka the Red" — the Name field is a person, not a kind (no print match, no article in the words)
[reskin] inline declared: "Vashka" — the call's own answer (person), built from the name
[reskin] inline form: "Vashka" — the model's own reading of the name
[reskin] save dc derived: DC 14 -> 15 (8 + PB 3 + the sheet's best 4) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] lacks not claimed: "never breaks ranks" reads like a lack to the words, and the call's list did not name it
[reskin] clauses: "Vashka the Red — A hobgoblin warlord in lacquered plate" -> has (descriptive), head | "fights from a shield wall" -> has (mechanical) | "never breaks ranks" -> has (mechanical)
[reskin] menu pruned: action — snap-shot (the sheet cannot render them)
[reskin] signature idea (action): "Vashka braces and calls the line to lock, and her whole guard closes shoulder to shoulder around her, hardening their formation and letting anyone who strikes at her from up close eat a shield boss to the face. The wall holds only while she stands in it and the troops are near her; if the line scatters, the benefit goes with it." [trait/start_of_turn/defense] — menu: warded-mending (+ shelf: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, stunning-strike, charge-push, hook-rider)
[reskin] signature bound to the concept's verb: action — rally (shield)
[reskin] word match declined by the call: rally, herd, terror-pulse, warded-mending — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit" after being shown rally, which the GM's words keyed
[reskin] key match declined: action — "rally" was ranked first on the call's own menu for shield, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: action — "Vashka braces and calls the line to lock, and her whole guard closes shoulder to shoulder around her, hardening their formation and letting anyone who strikes at her from up close eat a shield boss to the face. The wall holds only while she stands in it and the troops are near her; if the line scatters, the benefit goes with it." [trait/start_of_turn/defense] — the model found no template that holds it (offered: rally, warded-mending, herd, terror-pulse)
[reskin] fallback respects the call: rally, terror-pulse, herd left the shelf — the call declined them for this sheet
[reskin] value check: "Answering Sting" EV 3.9 vs floor 3.4 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: own-turn-punisher -> Bonus Actions/"Answering Sting" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The lacquered plate is built to be struck, not dodged: whenever an enemy's blow fails to land on her, the recoil off the shield face staggers them, and her guard answers the opening together. Enemies who come at her alone find that hitting iron has consequences, and her line punishes hesitation." [trait/on_being_hit/condition] — menu: absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura)
[reskin] word match declined by the call: resonant-body, absorption, weapon-lodge, bloodied-burst — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "already_answered"
[reskin] signature miss: trait — "The lacquered plate is built to be struck, not dodged: whenever an enemy's blow fails to land on her, the recoil off the shield face staggers them, and her guard answers the opening together. Enemies who come at her alone find that hitting iron has consequences, and her line punishes hesitation." [trait/on_being_hit/condition] — the model found no template that holds it (offered: absorption, bloodied-burst, resonant-body, weapon-lodge)
[reskin] repair: 1 clause(s) with no row — "never breaks ranks"; one targeted call with the sheet as context
[reskin] repaired sheet: 2 attack row(s), 0 save, 1 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] weapons answered: Warhammer = warhammer; Javelin = javelin
[reskin] AC lowered for a disadvantage trait: "Guarded Stance" makes this creature harder to hit, so its AC comes down to print's 15 at CR 6 (was 19) — print ships no persistent Disadvantage-to-be-hit trait (0 of 329), and the two together read as a trap
[reskin] 2024 caps: "Never Breaks Ranks" — a condition or game term shipped lowercase
```


---


### Swarm of Knell of the Dyings — bands soft

**Concept:** a swarm of funeral bells that ring themselves over the dying

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Swarm of Knell of the Dyings | 13 | swarm-9 | ok | SOFT: hot-offense | ok | ok | ok | ok | ok | ok | ok |

- bands · soft · hot-offense: offense alone reads CR 17, 4 over; the HP axis pulls the read to 13.5
- read: def 10 / off 17 → 13.5; sustained 90 (1 × Iron Lip); nova Bloodied Peal 67; dmg 105

```
Swarm of Knell of the Dyings

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

Languages None

CR 13 (XP 10,000; PB +5)

Traits

Bloodied Peal. The first time the swarm is Bloodied in a fight, it releases a burst. Constitution Saving Throw: DC 17, each creature in a 30-foot Emanation originating from the swarm. Failure: 67 (15d8) Necrotic damage, and the target has the Deafened condition until the end of its next turn. Success: Half damage only.

Swarm. The swarm can occupy another creature's space and vice versa, and the swarm can move through any opening large enough for a Tiny creature. The swarm can't regain Hit Points or gain Temporary Hit Points.

Actions

Iron Lip. Melee Attack Roll: +10, reach 5 ft. 54 (11d8 + 5) Bludgeoning damage plus 36 (8d8) Necrotic damage, or 27 (6d8) Bludgeoning damage plus 18 (4d8) Necrotic damage if the swarm is Bloodied.

Funeral Peal (Recharge 5-6). Constitution Saving Throw: DC 17, each creature in a 30-foot Emanation originating from the swarm. Failure: 67 (15d8) Thunder damage, and the target has the Deafened condition until the end of its next turn. Success: Half damage only.

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

- Traits/Bloodied Peal — template bloodied-burst; library draw (seed unstamped); the GM's clause "ring themselves over the dying"; binds the GM's words: bell+dying+the dying+toll+peal+wounded+ring
- Traits/Swarm — the chassis
- Actions/Iron Lip — the chassis
- Actions/Funeral Peal — template active-toll; library draw (seed unstamped); the GM's clause "ring themselves over the dying"; binds the GM's words: ring+bell+toll+peal

**Engine trace**

```
[route] swarm type=Undead mechanics=aura — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: on the GM's own words "a swarm of funeral bells" | holds: the call reads none in these words | swarm: ✓ ("a swarm of funeral bells") | swarm: no line key in the words — the model's read of its quote | bane refused: the words carry no weakness clause, so "silence" answers a question nobody asked
[concept] hints: swarm→body ✓ ("a swarm of funeral bells")
[concept] resolve: archetype=swarm type=Undead themes=grave/voice mind=bestial style=— energy=Necrotic mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: aura
[concept] signature elements: bells that ring themselves [behavior] | a swarm of funeral iron and bronze [body] | hovering over the dying to toll their death-rite [behavior]
[concept] identity: A convocation of tarnished funeral bells drifts on no wind, ringing in overlapping peals that swell into a deafening knell as it settles over the dying. Every round it hovers above its chosen prey, sounding the death-rite until the target's own wounds answer the tolling, then surges into a single clangorous mass to strike with its iron lip and clapper. It does not flee when bloodied — it splits into two lesser peals and redoubles the ringing, patient and ceremonial, waiting out the last breath.
[concept] lore: These bells were looted from a hundred drowned chapel towers and steeple-caught graves, and they gather wherever death is slow, wanting to be rung over a final breath they were denied.
[reskin] body type: swarm — the body outranks the role (recorded: swarm)
[reskin] donor: swarm-9 -> CR 13 (invented — no printed peer)
[reskin] swarm name stamped: "Knell of the Dying" -> "Swarm of Knell of the Dyings" — print names all seven of its swarms "Swarm of X", and the rules text says "the swarm"
[reskin] swarm type stamped: Undead -> Swarm of Tiny Undead
[reskin] swarm size clamped: Large -> Medium (print swarms are Medium or Large)
[reskin] inline by rule: "the swarm" — the call answered "the dying" (kind), which the name does not support
[reskin] lacks asked: nothing taken away
[reskin] lacks refused: "swarm of funeral bells" names no absence — nothing in it takes anything away
[reskin] clauses: "a swarm of funeral bells" -> has (descriptive), head | "ring themselves over the dying" -> has (mechanical) [asked: save_single]
[reskin] menu pruned: action — obstacle-pull, pacify, escalating-dread, terror-pulse, snare-bolt, slow-bolt, sensory-strike, disarm, thrown-burst-seed, drain, zone-seed, blighted-ground, delayed-brand, aggro-curse, self-invisibility, focus, feint-slip, coating, phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The swarm begins pealing over a dying creature it can see, and the tolling finds every wound that creature already carries, worsening them with each ring while the swarm stays in place to hear it through. The ringing keeps sounding on its own at the end of each round for as long as the swarm holds the funeral, so the creature must either flee the sound or finish the swarm before its own hurts fini" [action/always/damage] — menu: trample, thrown-burst, gaze-single, snare, execute, seal, shield-bash, wail, lure, active-toll, random-ray, ground-burst, spew (+ shelf: patient-defense, second-wind, riposte, stunning-strike, charge-push, hook-rider, pounce, isolation, charge)
[reskin] signature bound to the concept's verb: action — active-toll (ring, bell)
[reskin] value check: "Funeral Peal (Recharge 5-6)" EV 240.1 vs floor 76.1 (the whole Multiattack (1 attacks)) — worth the trade
[reskin] signature template: active-toll -> Actions/"Funeral Peal (Recharge 5-6)" ("The swarm's funeral bells ring of their own accord over the dying, sounding a to [verb: ring:concept, bell:concept, toll:idea, peal:idea]")
[reskin] keys spent by the action: ring
[reskin] signature idea (trait): "When the swarm is wounded badly enough to split, the two lesser peals … against each other and the doubled tolling deafens everyone close by, so those nearby struggle to hear or act while the bells keep sounding. The sound is the swarm's true weapon, not its body." [trait/always/condition] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature bound to the concept's verb: trait — bloodied-burst (bell, dying, the dying)
[reskin] word match declined by the call: resonant-body, death-burst, bloodied-fury — the key word does not mean the mechanic here
[reskin] signature template (trait): bloodied-burst -> Traits/"Splitting Peal" ("When the swarm is Bloodied it splits and the doubled tolling deafens everyone cl [verb: bell:concept, dying:concept, the dying:concept, toll:idea, peal:idea, wounded:idea]")
[reskin] weapons answered: Iron Lip = bell
[reskin] immunities stamped for type: Swarm of Tiny Undead + donor suite -> Poison; Charmed, Exhaustion, Frightened, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained, Stunned
[reskin] resistances derived: Bludgeoning, Piercing, Slashing
[reskin] vulnerability rejected — "Thunder" has no warrant in the concept's own text (print's default is none)
[reskin] nova capped: Traits/Splitting Peal — 91 over the CR 13 ceiling 67, dice to 67 (15d8)
[reskin] nova capped: Actions/Funeral Peal (Recharge 5-6) — 91 over the CR 13 ceiling 67, dice to 67 (15d8)
[reskin] row binds its clause: "Splitting Peal" answers "ring themselves over the dying" — the keys it matched came from that clause, so the coverage credit has a receipt
[reskin] row binds its clause: "Funeral Peal" answers "ring themselves over the dying" — the keys it matched came from that clause, so the coverage credit has a receipt
[reskin] audit rename: "Splitting Peal" -> "Bloodied Peal"
```


---


### Air Elemental — in the run

**Concept:** name: Air Elemental | that carries stolen voices

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Air Elemental | 5 | lurker-5 | ok | ok | FAIL: two-novas | ok | ok | ok | ok | ok | ok |

- structure · fail · two-novas: two Recharge novas on one sheet: "Voice-Thief's Shriek" and "Whirlwind"
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

Senses blindsight 60 ft.; Passive Perception 13

Languages Primordial (Auran)

CR 5 (XP 1,800; PB +3)

Traits

Stolen Choir. The air elemental can mimic animal sounds and humanoid voices. A creature that hears the sounds can tell they are imitations only with a successful DC 13 Wisdom (Insight) check.

Air Form. The air elemental can enter a creature's space and stop there. It can move through a space as narrow as 1 inch without expending extra movement to do so.

Actions

Multiattack. The air elemental makes two Thunderous Slam attacks.

Thunderous Slam. Melee Attack Roll: +8, reach 10 ft. 14 (2d8 + 5) Thunder damage.

Voice-Thief's Shriek (Recharge 5-6). Constitution Saving Throw: DC 13, each creature in a 15-foot Emanation originating from the air elemental. Failure: 18 (4d8) Thunder damage, and the target has the Deafened condition until the end of its next turn. Success: Half damage only.

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
- Actions/Thunderous Slam — print's row, renamed
- Actions/Voice-Thief's Shriek — template active-toll; library draw (seed unstamped)
- Actions/Whirlwind — print's own row
- Traits/Stolen Choir — template mimicry; library draw (seed unstamped); the GM's clause "carries stolen voices"; binds the GM's words: stolen voice+stolen voices+voices
- Traits/Air Form — print's own row

**Engine trace**

```
[route] lurker-phantom type=Elemental mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | lurker-phantom: ✓ ("Air Elemental") | lurker-phantom: no line key in the words — the model's read of its quote
[concept] name: "Air Elemental" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] resolve: archetype=lurker type=Elemental themes=elemental/voice mind=sapient style=phantom energy=Thunder mix=energy identity=✓ lore=✓
[concept] name: provided "Air Elemental"
[concept] mechanics: none claimed
[concept] signature elements: stolen voices screaming in its wind [body] | stripping breath and voice from the living [behavior] | drifting unseen through walls and air [behavior]
[concept] identity: A howling column of storm-wind, the stolen voices of the drowned and the dying scream out of it in a chorus that disorients and wounds those who hear it. It opens by driving a wall of shrieking wind through the ranks, then circles invisibly through stone and air to strip the breath and voice from the isolated, harrying and mocking until its prey is spent. It does not flee — it retracts into a roaring whirl and lashes out at anything that pursues, greedy to add one more voice to its choir.
[concept] lore: Born where a great wind passed through a place of massacre and drank the last cries of the slain, the elemental now drifts the world seeking new voices to steal and hoard within its endless gale.
[reskin] print canon route: the Air Elemental's body outranks the phantom seat — no verb in the words names it; the plain lurker line
[reskin] print canon defenses: HP 73 -> 90, AC 15 -> 15 — the Air Elemental's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 14, DEX 20, CON 14, INT 6, WIS 10, CHA 6 — the Air Elemental's at its own CR; attack +6 -> +8, DC 13 (print's)
[reskin] donor: lurker-5 -> CR 5
[reskin] row gated out: Teleport (teleport) — the concept did not claim this mechanic
[reskin] print canon: "Air Elemental — that carries stolen voices" heads on the Air Elemental — print's rows ride along; the seat stays
[reskin] inline by rule: "the air elemental" — the call answered "the air elemental" (kind), which the name does not support
[reskin] inline form: "the air elemental" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Air Elemental —" -> has (descriptive), head | "carries stolen voices" -> has (descriptive)
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The elemental floods a wide arc of its shrieking wind with the voices it has hoarded, and every living creature caught in that sound feels its own breath seize and its throat lock, unable to draw voice or air for a short, terrible moment. The wound is not the point; the point is the silence it leaves behind, an opening for the elemental to sweep in and strike those it has muted." [action/save/condition] — menu: leap, gaze-single, execute, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, terror-pulse, snare-bolt, slow-bolt, sensory-strike, drain, zone-seed, blighted-ground (+ shelf: delayed-brand, patient-defense, self-invisibility, focus, feint-slip, coating, riposte, stunning-strike, charge-push, hook-rider, pounce, isolation)
[reskin] pick kept on the GM's own words: action — "active-toll" has no key-table verb, but the call quotes "that carries stolen voices" from the description
[reskin] value check: "Voice-Thief's Shriek (Recharge 5-6)" EV 47.7 vs floor 30.4 (the whole Multiattack (2 attacks)) — worth the trade
[reskin] signature template: active-toll -> Actions/"Voice-Thief's Shriek (Recharge 5-6)" ("The elemental releases a wide-arc shrieking wind carrying voices, forcing living [shape fit, no verb match]")
[reskin] signature idea (trait): "Whenever a creature falls near the elemental, the last cry it makes is torn away and added to the choir, and for a little while afterward the elemental's wind screams louder and lashes out with a new voice that others have never heard. Each stolen voice is spent in a single burst of that borrowed scream before the gale quiets again." [trait/always/damage] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, evasion, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature bound to the concept's verb: trait — mimicry (stolen voice, stolen voices, voices)
[reskin] signature template (trait): mimicry -> Traits/"Stolen Choir" ("stolen voices are kept and voiced again — the creature can produce the voices it [verb: stolen voice:concept, stolen voices:concept, voices:concept]")
[reskin] weapons answered: Gale Lash = none
[reskin] languages by mind: "None" -> "Primordial" (sapient)
[reskin] print canon languages: "Primordial" -> "Primordial (Auran)" — the Air Elemental's
[reskin] print canon speed: 40 ft. -> 10 ft. — the Air Elemental's walk; the concept's other modes stay
[reskin] print canon speed: Fly -> 90 ft. — the Air Elemental's own
[reskin] print canon attack: "Gale Lash" -> "Thunderous Slam" — the Air Elemental's own row
[reskin] immunities stamped for type: Elemental -> Poison; Exhaustion, Poisoned
[reskin] print canon defenses: immunities Poison; Exhaustion, Poisoned -> Poison, Thunder; Exhaustion, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained, Unconscious; resistances none -> Bludgeoning, Lightning, Piercing, Slashing — the Air Elemental's own header lines
[reskin] print canon trait: Air Form — "Air Elemental — that carries stolen voices" is the Air Elemental (print's own row)
[reskin] print canon: chassis row leaves — Bonus Actions/"Umbral Step" is the seat's, not the Air Elemental's
[reskin] print canon row: Actions/Whirlwind (Recharge 4-6) — the Air Elemental's own
[reskin] row binds its clause: "Stolen Choir" answers "carries stolen voices" — the keys it matched came from that clause, so the coverage credit has a receipt
audit finding below confidence gate: Whirlwind Whirlwind imposes no persistent restriction, removal, or lasting state that requires counterplay; the wind merely shoves and knocks down, which is a legitimate one-shot repositioning effect and not a defect.
```


---


### Siege-Timber Golem — in the run

**Concept:** a siege-engine golem of lashed timber that shoulders through walls

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Siege-Timber Golem | 8 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- **dropped clause:** "shoulders through walls"
- read: def 12 / off 7 → 9.5; sustained 32 (2 × Slam); nova Timber Trample 27; dmg 39

```
Siege-Timber Golem

Large Construct, Unaligned

AC 14
Initiative -1 (9)

HP 123 (13d10 + 52)

Speed 20 ft.

MOD
SAVE
STR
20
+5
+8
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
8
-1
-1
MOD
SAVE
CON
18
+4
+7
CHA
1
-5
-5

Skills Athletics +8, Perception +2

Resistances Bludgeoning, Piercing, Slashing

Immunities Acid, Poison, Psychic; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned

Senses darkvision 60 ft.; Passive Perception 12

Languages Common plus one other language

CR 8 (XP 3,900; PB +3)

Traits

Immutable Form. The golem can't shape-shift.

Magic Resistance. The golem has Advantage on saving throws against spells and other magical effects.

Acid Absorption. Whenever the golem is subjected to Acid damage, it takes no damage and instead regains a number of Hit Points equal to the Acid damage dealt.

Berserk. Whenever the golem starts its turn Bloodied, roll 1d6. On a 6, the golem goes berserk. On each of its turns while berserk, the golem attacks the nearest creature it can see. If no creature is near enough to move to and attack, the golem attacks an object. Once the golem goes berserk, it continues to be berserk until it is destroyed or it is no longer Bloodied.

Actions

Multiattack. The golem makes two Slam attacks, or it makes three Slam attacks if it used Hasten this turn.

Slam. Melee Attack Roll: +8, reach 5 ft. 10 (1d10 + 5) Bludgeoning damage plus 6 (1d12) Acid damage, and the target's Hit Point maximum decreases by an amount equal to the Acid damage taken.

Timber Trample (Recharge 5-6). The golem moves up to its Speed without provoking Opportunity Attacks and can move through the spaces of Large or smaller creatures. Each creature whose space it enters is targeted once by the following effect. Strength Saving Throw: DC 16. Failure: 27 (6d8) Bludgeoning damage, and the target has the Prone condition. Success: Half damage only.

Bonus Actions

Hasten (Recharge 5-6). The golem takes the Dash and Disengage actions.

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
- Actions/Slam — print's row, renamed
- Actions/Timber Trample — template trample; library draw (seed unstamped)
- Traits/Immutable Form — print's own row
- Traits/Magic Resistance — the chassis
- Traits/Acid Absorption — print's own row
- Traits/Berserk — print's own row
- Bonus Actions/Hasten — print's own row

**Engine trace**

```
[route] brute-juggernaut type=Construct mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | brute-juggernaut: ✓ ("siege-engine golem of lashed timber") | brute-juggernaut: no line key in the words — the model's read of its quote
[concept] hints: golem→canon ✓ ("the input names it a golem")
[concept] resolve: archetype=brute type=Construct themes=forged/armed mind=mindless style=juggernaut energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: shouldering through walls [behavior] | lashed-timber chassis [body] | collapsing masonry as a weapon [aura]
[concept] identity: The Siege-Timber Golem opens a fight by lowering its lashed-timber shoulder and charging the nearest wall, collapsing it onto the defenders and bursting through the rubble in the same breath. Every round after, it grinds forward in a straight line, swinging a battering-ram fist and letting falling masonry do the rest, treating doors, barricades, and loot-carts as ammunition. Under pressure it does not retreat; it redoubles its charge, soullessly patient and wholly committed to reaching whatever its maker pointed it at.
[concept] lore: Built by a besieging mage who had more timber than patience, the Siege-Timber Golem is a ram given legs, still following the last order it was given: reach the gates, and let nothing stand.
[reskin] print canon route: the Clay Golem's body outranks the juggernaut seat — no verb in the words names it; the plain brute line
[reskin] print canon pb: print's +9 on PB +4 reads +8 on this sheet's PB +3; DCs follow
[reskin] print canon defenses: HP 149 -> 123, AC 15 -> 14 — the Clay Golem's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 20, DEX 9, CON 18, INT 3, WIS 8, CHA 1 — the Clay Golem's at its own CR; attack +8 -> +8, DC 16 (print's, on this sheet's PB)
[reskin] donor: brute-5 -> CR 8
[reskin] print canon: "a siege-engine golem of lashed timber that shoulders through walls" heads on the Clay Golem — print's rows ride along; the seat stays
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] inline declared: "the golem" — the call's own answer (kind), built from the name
[reskin] inline form: "the golem" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a siege-engine golem of lashed timber" -> has (descriptive), head | "shoulders through walls" -> has (mechanical) [asked: movement]
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The golem lowers its lashed shoulder and drives in a straight line, smashing through whatever it meets — a wall, a barricade, a stack of crates, a parked cart — and doesn't stop there. Anyone in its path must scramble aside or be bowled over and shoved along ahead of it, and whatever it plows through breaks apart and scatters as flying debris that batters anyone standing nearby. It commits fully t" [action/save/movement] — menu: trample, leap, thrown-burst, shield-bash, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up (+ shelf: rampage, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, stunning-strike, charge-push, hook-rider, pounce, charge)
[reskin] signature bound to the concept's verb: action — own-turn-punisher (lash)
[reskin] word match declined by the call: push-prone, charge, charge-push, herd — the key word does not mean the mechanic here
[reskin] pick kept on the GM's own words: action — "trample" has no key-table verb, but the call quotes "a siege engine golem of lashed timber that shoulders through walls" from the description
[reskin] value check: "Timber Trample (Recharge 5-6)" EV 82.1 vs floor 45.6 (the whole Multiattack (2 attacks)) — worth the trade
[reskin] signature template: trample -> Actions/"Timber Trample (Recharge 5-6)" ("The golem lowers its shoulder and drives in a straight line through creatures an [shape fit, no verb match]")
[reskin] signature idea (trait): "When the golem slams into a structure — or anything it treats as one — the impact tears the offending piece free and the golem keeps the wreckage caught in its bindings. From then on that shard of wall or cart is part of its swing, and the first blows it lands carry the splintered mess along with them until the extra timber is spent." [trait/always/damage] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending, weapon-lodge)
[reskin] word match declined by the call: terrain-walk — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "When the golem slams into a structure — or anything it treats as one — the impact tears the offending piece free and the golem keeps the wreckage caught in its bindings. From then on that shard of wall or cart is part of its swing, and the first blows it lands carry the splintered mess along with them until the extra timber is spent." [trait/always/damage] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst, heated-body)
[reskin] weapons answered: Battering Ram = none
[reskin] languages by body: a trap-line Construct with no voice in the concept
[reskin] print canon languages: "Understands the languages of its creator but can't speak" -> "Common plus one other language" — the Clay Golem's
[reskin] print canon speed: 40 ft. -> 20 ft. — the Clay Golem's walk; the concept's other modes stay
[reskin] print canon attack: "Battering Ram" -> "Slam" — the Clay Golem's own row
[reskin] print canon multiattack: "The golem makes two Slam attacks, or it makes three Slam attacks if it used Hasten this turn." — the Clay Golem's own
[reskin] immunities stamped for type: Construct -> Poison; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned
[reskin] print canon defenses: immunities Poison; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned -> Acid, Poison, Psychic; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned; resistances none -> Bludgeoning, Piercing, Slashing — the Clay Golem's own header lines
[reskin] name-canon trait stamped: Immutable Form (the name says so; print says what it does)
[reskin] name-canon trait stamped: Magic Resistance (the name says so; print says what it does)
[reskin] print canon trait: Acid Absorption — "a siege-engine golem of lashed timber that shoulders through walls" is the Clay Golem (print's own row)
[reskin] print canon trait: Berserk — "a siege-engine golem of lashed timber that shoulders through walls" is the Clay Golem (print's own row)
[reskin] print canon trait: Immutable Form — print's text replaces the chassis's (the Troll regenerates 15, not the chassis's 10 — critic's audit 2026-10-02)
[reskin] print canon row: Bonus Actions/Hasten (Recharge 5-6) — the Clay Golem's own
audit finding below confidence gate: Berserk The entry is named for the berserk state but never states that it is what triggers it; the trait's stated trigger (starting the turn Bloodied) only initiates a 1d6 roll, and on a non-6 result nothing happens — the entry's name promises a mechanic the text never delivers because the actual onset check is unstated as the defining mechanic.
```


---


### Stone Golem — in the run

**Concept:** name: Stone Golem | carved as a weeping saint

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Stone Golem | 10 | brute-9 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

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

Stone Adhesion. The golem adheres to anything that touches it. A Huge or smaller creature adhered to the golem is also Grappled by it (escape DC 18). Ability checks made to escape this grapple have Disadvantage.

Immutable Form. The golem can't shape-shift.

Magic Resistance. The golem has Advantage on saving throws against spells and other magical effects.

Actions

Multiattack. The golem makes two attacks, using Slam or Force Bolt in any combination.

Slam. Melee Attack Roll: +10, reach 5 ft. 15 (2d8 + 6) Bludgeoning damage plus 9 (2d8) Force damage.

Force Bolt. Ranged Attack Roll: +9, range 120 ft. 22 (4d10) Force damage.

Bonus Actions

Slow (Recharge 5-6). The golem casts the Slow spell, requiring no spell components and using Constitution as the spellcasting ability (spell save DC 17).

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
- Actions/Force Bolt — print's own row, renamed; weapon crossbow
- Traits/Stone Adhesion — template adhesive; library draw (seed unstamped); binds the GM's words: cling
- Traits/Immutable Form — print's own row
- Traits/Magic Resistance — print's own row
- Bonus Actions/Slow — print's own row

**Engine trace**

```
[route] brute-juggernaut type=Construct mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | brute-juggernaut: ✓ ("Stone Golem — carved as a weeping saint") | brute-juggernaut: no line key in the words — the model's read of its quote
[concept] name: "Stone Golem" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] hints: golem→canon ✓ ("a Stone Golem ... made of stone")
[concept] resolve: archetype=brute type=Construct themes=forged/grave mind=sapient style=juggernaut energy=Necrotic mix=both identity=✓ lore=✓
[concept] name: provided "Stone Golem"
[concept] mechanics: none claimed
[concept] signature elements: tears that harden into stone snares [behavior] | carved weeping saint statue body [body] | kneeling prayer that turns to violence [behavior]
[concept] identity: A weeping saint carved in pale stone, it opens by kneeling in apparent prayer until intruders profane its shrine, then rises and walks a straight line through walls, pillars, and bodies alike, its stony fists and the tears streaming from its carved eyes falling as crushing, sorrow-laden blows. Every round it advances implacably, breaking the field itself to reach the nearest offender, and it fights to the death with the patience of centuries, never fleeing and never hurrying. Its grief is not mercy: the tears harden into snares that hold the guilty fast while the statue closes.
[concept] lore: A cathedral widower carved a saint to mourn his drowned bride, and the statue woke to grief it can never finish, so it wanders the ruin of its shrine and seizes any who disturb the saint's lonely vigil, drowning them in sorrow made stone.
[reskin] print canon route: the Stone Golem's body outranks the juggernaut seat — no verb in the words names it; the plain brute line
[reskin] print canon defenses: HP 182 -> 220, AC 15 -> 18 — the Stone Golem's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 22, DEX 9, CON 20, INT 3, WIS 11, CHA 1 — the Stone Golem's at its own CR; attack +9 -> +10, DC 17 (print's)
[reskin] donor: brute-9 -> CR 10
[reskin] print canon: "Stone Golem — carved as a weeping saint" heads on the Stone Golem — print's rows ride along; the seat stays
[reskin] alignment by body: Neutral -> Unaligned — a Construct at INT 3 (print: Oozes 4/4 Unaligned; every Construct at INT 3 or less, 7/7; the first aligned one is the Flesh Golem at INT 6)
[reskin] inline by rule: "the golem" — the call answered "the golem" (kind), which the name does not support
[reskin] inline form: "the golem" — the model's own reading of the name
[reskin] save dc derived: DC 16 -> 18 (8 + PB 4 + the sheet's best 6) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Stone Golem — carved as a weeping saint" -> has (descriptive), head
[reskin] signature idea (action): "The golem bows its head and lets the tears falling from its carved eyes run across the ground toward everyone it can see nearby, pooling and then hardening into grasping stone hands that grip their feet and drag them back, rooting them in place. The snares linger long enough that the statue can simply walk its straight line to them while they struggle, and a victim who tears free still finds the s" [action/save/condition] — menu: trample, leap, thrown-burst, throw-retrieve, shield-bash, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up (+ shelf: rampage, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, stunning-strike, charge-push, hook-rider, pounce, charge)
[reskin] word match declined by the call: hook-rider, charge — the key word does not mean the mechanic here
[reskin] fit declined: "Weeping Saint's March (Recharge 5-6)" — a print body takes only what the user's words ask; the call offered no quote, and the key table finds no verb either (the blacksmith's rally, critic-ten 2026-10-01)
[reskin] fallback stands down: "Stone Golem — carved as a weeping saint" heads on the Stone Golem and asks for nothing — print's rows, nothing invented (the big ogre, critic-ten 2026-10-01)
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "Its carved weeping never stops: whenever a foe lands a blow on the statue, the impact shakes loose a spray of its sorrowful tears onto that attacker, and those tears harden where they land, clinging to the offender as the golem turns its grief on whoever dared strike the saint." [trait/on_being_hit/condition] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] signature bound to the concept's verb: trait — false-appearance (stone)
[reskin] word match declined by the call: false-appearance, resonant-body, weapon-lodge, heated-body — the key word does not mean the mechanic here
[reskin] signature template (trait): adhesive -> Traits/"Tears of Grief" ("The tears harden where they land and cling to the offender — the impact leaves t [verb: cling:idea]")
[reskin] weapons answered: Slam = none; Tearstone = none
[reskin] languages by mind: "None" -> "Understands the languages of its creator but can't speak" (sapient)
[reskin] print canon languages: "Understands the languages of its creator but can't speak" -> "Understands Common plus two other languages but can't speak" — the Stone Golem's
[reskin] print canon speed: 40 ft. -> 30 ft. — the Stone Golem's walk; the concept's other modes stay
[reskin] print canon multiattack: "The golem makes two attacks, using Slam or Force Bolt in any combination." — the Stone Golem's own
[reskin] print canon attack: "Force Bolt" is print's own row — +9, 22 (4d10), range 120 ft. (an exact body at print's CR)
[reskin] print canon attack: "Tearstone" -> "Force Bolt" — the Stone Golem's own ranged row
[reskin] immunities stamped for type: Construct -> Poison; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned
[reskin] print canon defenses: immunities Poison; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned -> Poison, Psychic; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned — the Stone Golem's own header lines
[reskin] name-canon trait stamped: Immutable Form (the name says so; print says what it does)
[reskin] name-canon trait stamped: Magic Resistance (the name says so; print says what it does)
[reskin] print canon trait: Immutable Form — print's text replaces the chassis's (the Troll regenerates 15, not the chassis's 10 — critic's audit 2026-10-02)
[reskin] print canon trait: Magic Resistance — print's text replaces the chassis's (the Troll regenerates 15, not the chassis's 10 — critic's audit 2026-10-02)
[reskin] print canon row: Bonus Actions/Slow (Recharge 5-6) — the Stone Golem's own
audit finding below confidence gate: Slow (Recharge 5-6) The entry name 'Slow' is the name of a spell, and the text casts Slow; but a creature that cannot speak (Understands Common but can't speak) casting a leveled spell with verbal effects is fine for statblock exemption — the real defect is that the name duplicates the spell and the entry provides no range or area for the spell, relying on the spell's own text (a GM without the spell reference cannot resolve it).
[reskin] audit rename: "Tears of Grief" -> "Stone Adhesion"
[reskin] escape dc: Stone Adhesion → DC 18 (8 + PB + STR; a late row wore another number)
```


---


### Purple Worm — in the run

**Concept:** name: Purple Worm | that swallowed a war-band's armoury

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Purple Worm | 15 | brute-13 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

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

Senses blindsight 30 ft., tremorsense 60 ft.; Passive Perception 14

Languages None

CR 15 (XP 13,000; PB +5)

Traits

Tunneler. The purple worm can burrow through solid rock at half its Burrow Speed and leaves a 10-foot-diameter tunnel in its wake.

Actions

Multiattack. The purple worm makes one Bite attack and one Tail Stinger attack. It can replace one attack with a use of Engulf.

Bite. Melee Attack Roll: +14, reach 10 ft. 22 (3d8 + 9) Piercing damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 22), and it has the Restrained condition until the grapple ends.

Tail Stinger. Melee Attack Roll: +14, reach 10 ft. 16 (2d6 + 9) Piercing damage plus 35 (10d6) Poison damage.

Engulf. Dexterity Saving Throw: DC 21, one Large or smaller creature within 10 feet that the purple worm hit with a melee attack this turn. Failure: 42 (12d6) Piercing damage, and the target is swallowed. A swallowed creature has the Blinded and Restrained conditions, has Total Cover against attacks and other effects outside the purple worm, and takes 22 (5d8) Acid damage at the start of each of the purple worm's turns. If the purple worm takes 40 damage or more on a single turn from a creature inside it, it must succeed on a DC 21 Constitution saving throw at the end of that turn or regurgitate all swallowed creatures, each of which falls in a space within 10 feet of the purple worm and has the Prone condition. If the purple worm dies, a swallowed creature is no longer Restrained and can escape from the corpse using 15 feet of movement, exiting with the Prone condition.

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
- Actions/Engulf — template swallow; library draw (seed unstamped); the GM's clause "swallowed a war-band's armoury"; binds the GM's words: swallow+swallows+swallowed
- Traits/Tunneler — print's own row; template tunneler; library draw (seed unstamped); binds the GM's words: worm
- Bonus Actions/Swallow — print's own row

**Engine trace**

```
[route] brute-grappler type=Monstrosity mechanics=grapple, engulf — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: on the GM's own words "that swallowed a war-band's armoury" | brute-grappler: ✓ ("that swallowed a war-band's armoury") | brute-grappler: no line key in the words — the model's read of its quote
[concept] name: "Purple Worm" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] resolve: archetype=brute type=Monstrosity themes=devouring/grasping mind=bestial style=grappler energy=— mix=physical identity=✓ lore=✓
[concept] name: provided "Purple Worm"
[concept] mechanics: grapple, engulf
[concept] signature elements: swallowed war-band armoury [body] | breaching swallow [behavior] | chitin studded with sheared blades [body]
[concept] identity: The Purple Worm surfaces beneath a marching host, takes the whole baggage train of blades and mail into its gullet, and then turns that hoard into a grinding armoury of swallowed steel — every bite and coil chews with sheared plate and broken spearheads packed in its hide. It opens by breaching in a shower of rock and swallowing a rank whole, and each round after it constricts a grabbed victim against anvils and sword-hilts lodged in its flesh, grinding them as it drags them toward its maw. It fights to the death — a bloated, iron-studded brute too gorged with a war-band's arsenal to ever flee, content to let the swallowed blades do its killing.
[concept] lore: Born in the deep strata where a war-band's spilled armoury was buried by a rockslide, this worm grew fat on forged steel and now hunts only to feed its hide another gleaming hoard.
[reskin] print canon route: the Purple Worm's body outranks the grappler seat — no verb in the words names it; the plain brute line
[reskin] print canon defenses: HP 264 -> 247, AC 17 -> 18 — the Purple Worm's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 28, DEX 7, CON 22, INT 1, WIS 8, CHA 4 — the Purple Worm's at its own CR; attack +11 -> +14, DC 21 (print's)
[reskin] donor: brute-13 -> CR 15 (invented — no printed peer)
[reskin] print canon: "Purple Worm — that swallowed a war-band's armoury" heads on the Purple Worm — print's rows ride along; the seat stays
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] inline by rule: "the purple worm" — the call answered "the purple worm" (kind), which the name does not support
[reskin] inline form: "the purple worm" — the model's own reading of the name
[reskin] save dc derived: DC 18 -> 22 (8 + PB 5 + the sheet's best 9) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Purple Worm —" -> has (descriptive), head | "swallowed a war-band's armoury" -> has (descriptive)
[reskin] menu pruned: action — push-prone, thrown-burst-seed (the sheet cannot render them)
[reskin] signature idea (action): "When the worm grinds a foe it has hold of against the armoury packed inside it, the swallowed steel chews the victim on every turn it stays held, worsening the longer it is dragged toward the maw. Each time the victim tries to tear free, the plates and spearheads shift and tear deeper, so the struggle itself draws blood and makes the next hold harder to break." [action/save/damage] — menu: swallow, condition-payoff, shield-bash, hook-drag, burrow-ambush, escalating-dread, terror-pulse, herd, drain, exploiter (+ shelf: second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, contagion, stunning-strike, charge-push, hook-rider, pounce, charge)
[reskin] signature bound to the concept's verb: action — swallow (swallow, swallows, swallowed)
[reskin] word match declined by the call: hook-rider, hook-drag, exploiter, condition-payoff — the key word does not mean the mechanic here
[reskin] value check: "Grinding Gullet" EV 46.8 vs floor 22.4 (one attack of 2) — a nova already stands — kept ungated, dice to 42 at the ceiling
[reskin] signature template: swallow -> Actions/"Grinding Gullet" ("The worm has swallowed the war-band's armoury; the plates and spearheads packed  [verb: swallow:concept, swallows:concept, swallowed:concept]")
[reskin] keys spent by the action: swallow, swallows, swallowed
[reskin] signature idea (trait): "The armoury lodged in its hide turns aside blows that strike its body, and anyone foolish enough to press a blade into it has that blade wrench from their grip into the worm's gullet, feeding the hoard. Weapons lost this way gleam among the steel already grinding in its flesh." [trait/on_being_hit/resource] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, earth-glide, tunneler, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] signature bound to the concept's verb: trait — tunneler (worm)
[reskin] word match declined by the call: absorption — the key word does not mean the mechanic here
[reskin] trait declined: "Gullet Armoury" — bound only on the idea's own words (lodged:idea) with no key in the concept; a meat body earns its trait by the user's verb (the sniper's tracker, critic 2026-09-29)
[reskin] trait bound to the concept's verb (concept-first): tunneler — worm in the user's words; the idea path had nothing
[reskin] signature template (trait): tunneler -> Traits/"Tunneler" ("exact concept match [verb: worm:concept]")
[reskin] weapons answered: Bite = none; Breach = none; Armoury Grind = none
[reskin] chassis nova: "Breach (Recharge 5-6)" — the brute-13's own nova row (its "Area Nova", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] print canon speed: 40 ft. -> 50 ft. — the Purple Worm's walk; the concept's other modes stay
[reskin] print canon speed: Burrow -> 50 ft. — the Purple Worm's own
[reskin] print canon row: Actions/Tail Stinger — the Purple Worm's second melee row, beside the chassis's
[reskin] print canon multiattack: "The purple worm makes one Bite attack and one Tail Stinger attack." — the Purple Worm's own
[reskin] languages held: None stands — INT 1 on a Monstrosity speaks nothing, whatever the mind read said
[reskin] print canon trait: Tunneler — print's text replaces the chassis's (the Troll regenerates 15, not the chassis's 10 — critic's audit 2026-10-02)
[reskin] print canon: chassis row leaves — Actions/"Breach (Recharge 5-6)" is the seat's nova, not the Purple Worm's
[reskin] print canon row: Bonus Actions/Swallow — the Purple Worm's own
[reskin] multiattack replacement clause: It can replace one attack with a use of Grinding Gullet.
[reskin] row binds its clause: "Grinding Gullet" answers "swallowed a war-band's armoury" — the keys it matched came from that clause, so the coverage credit has a receipt
audit finding below confidence gate: Swallow Doubled space after the failure label strays from statblock formatting.
[reskin] audit rename: "Grinding Gullet" -> "Engulf"
[reskin] escape dc: Bite → DC 22 (8 + PB + STR; a late row wore another number)
```


---


### Pit Fiend — in the run

**Concept:** name: Pit Fiend | who collects the oaths of dying knights

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Pit Fiend | 20 | defender-17 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

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

Legendary Resistance (3/Day). If the fiend fails a saving throw, it can choose to succeed instead.

Diabolical Restoration. If the fiend dies outside the Nine Hells, its body disappears in sulfurous smoke, and it gains a new body instantly, reviving with all its Hit Points somewhere in the Nine Hells.

Fear Aura. The fiend emanates an aura in a 20-foot Emanation while it doesn't have the Incapacitated condition. Wisdom Saving Throw: DC 21, any enemy that starts its turn in the aura. Failure: The target has the Frightened condition until the start of its next turn. Success: The target is immune to this pit fiend's aura for 24 hours.

Magic Resistance. The fiend has Advantage on saving throws against spells and other magical effects.

Actions

Multiattack. The fiend makes one Bite attack, two Devilish Claw attacks, and one Fiery Mace attack.

Bite. Melee Attack Roll: +14, reach 10 ft. 18 (3d6 + 8) Piercing damage. If the target is a creature, it must make the following saving throw. Constitution Saving Throw: DC 21. Failure: The target has the Poisoned condition. While Poisoned, the target can't regain Hit Points and takes 21 (6d6) Poison damage at the start of each of its turns, and it repeats the save at the end of each of its turns, ending the effect on itself on a success. After 1 minute, it succeeds automatically.

Fiery Mace. Melee Attack Roll: +14, reach 10 ft. 22 (4d6 + 8) Force damage plus 21 (6d6) Fire damage.

Devilish Claw. Melee Attack Roll: +14, reach 10 ft. 26 (4d8 + 8) Necrotic damage.

Hellfire Spellcasting (Recharge 4-6). The fiend casts Fireball (level 5 version) twice, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 21). It can replace one Fireball with Hold Monster (level 7 version) or Wall of Fire.

Reactions

Riposte. Trigger: A creature within 5 feet of the fiend misses it with a melee attack roll. Response: The fiend makes one Bite attack against that creature.

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
- Actions/Bite — print's row, renamed
- Actions/Fiery Mace — print's own row; weapon mace
- Actions/Devilish Claw — print's own row
- Actions/Hellfire Spellcasting — print's own row
- Reactions/Riposte — template riposte; fighter kit; the GM's clause "who collects the oaths of dying knights"

**Engine trace**

```
[route] defender-leader type=Fiend mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | caster-binder: the call reads no worked magic in these words | defender-leader: ✓ ("Pit Fiend") | defender: the call read "knights" as not meaning that mechanic here — no override | defender-leader stands: every key that would override it was read as a figure of speech | defender-leader: no line key in the words — the model's read of its quote
[concept] name: "Pit Fiend" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] resolve: archetype=defender type=Fiend themes=fiendish/armed mind=sapient style=leader energy=Fire mix=both identity=✓ lore=✓
[concept] name: provided "Pit Fiend"
[concept] mechanics: none claimed
[concept] signature elements: collecting the oaths of dying knights [behavior] | bound oath-sworn knights summoned to fight at its side [behavior] | black iron body branded with sworn names [body]
[concept] identity: The Pit Fiend opens by planting its burning standard and calling in every sworn oath it has harvested, so the first round is a roll call of the damned rather than a charge; thereafter it fights as a grim captain, holding the line beside its bound knights, turning aside blades with an iron parry and pressing a foe until the oath is offered. It is patient and ceremonial under pressure, never fleeing, treating the duel as a contract negotiation it intends to win — and it accepts surrender only as a debt.
[concept] lore: Forged in the oath-pits of the lower hells, it walks battlefields where knights die unshriven and collects the last words they swear, binding each vow to its iron body as a soldier and a debt to be called.
[reskin] print canon route: the Pit Fiend's body outranks the leader seat — no verb in the words names it; the plain defender line
[reskin] print canon defenses: HP 281 -> 337, AC 22 -> 21 — the Pit Fiend's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 26, DEX 14, CON 24, INT 22, WIS 18, CHA 24 — the Pit Fiend's at its own CR; attack +14 -> +14, DC 21 (print's)
[reskin] donor: defender-17 -> CR 20 (invented — no printed peer)
[reskin] row gated out: Guard Aura (aura) — the concept did not claim this mechanic
[reskin] print canon: "Pit Fiend — who collects the oaths of dying knights" heads on the Pit Fiend — print's rows ride along; the seat stays
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] repair round 1: 1 defect(s) — name "Iron Parry" is a reaction's name on an attack row — a parry answers a blow, it does not swing one; name the attack for what it hits with
[reskin] implied class kept: "fighter" on the GM's own words "who collects the oaths of dying knights" — the key table found none
[reskin] class kit: fighter — "who collects the oaths of dying knights": Riposte (riposte)
[reskin] inline by rule: "the fiend" — the call answered "the fiend" (kind), which the name does not support
[reskin] inline form: "the fiend" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Pit Fiend —" -> has (descriptive), head | "collects the oaths of dying knights" -> has (descriptive)
[reskin] menu pruned: action — push-prone (the sheet cannot render them)
[reskin] signature idea (action): "The fiend drives its burning standard into the ground and reads aloud the names branded into its iron, and every foe who has ever broken a sworn word feels the debt come due: each of them finds their own name on that list and reels as old, unpaid oaths pull at them. It only works once per battle, on the opening round of the fight, and it reaches those who have broken faith rather than the merely u" [action/once_per_fight/condition] — menu: seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, herd, curse-debt, reveal, wind-up, exploiter (+ shelf: patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, stunning-strike, charge-push, hook-rider)
[reskin] signature bound to the concept's verb: action — aggro-curse, curse-debt (oath)
[reskin] word match declined by the call: aggro-curse, curse-debt, herd — the key word does not mean the mechanic here
[reskin] value check: "Muster the Debt" EV 4 vs floor 15.1 (one attack of 3) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Muster the Debt" — the ladder could not lift it; the fallback stands in
[reskin] fallback respects the call: curse-debt, aggro-curse, herd left the shelf — the call declined them for this sheet
[reskin] fallback stands down: "Pit Fiend — who collects the oaths of dying knights" heads on the Pit Fiend and asks for nothing — print's rows, nothing invented (the big ogre, critic-ten 2026-10-01)
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 21 already beats print's AC 19 at CR 20, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "Every creature that strikes the fiend in melee and draws blood leaves its own name burned into the black iron, a fresh brand that the fiend can later read back at it; a foe whose name is branded onto the fiend cannot slip away from the fight without paying for it. The brands fade if the foe survives long enough to see the fiend fall." [trait/on_being_hit/condition] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] signature bound to the concept's verb: trait — bloodied-burst, death-burst (dying)
[reskin] word match declined by the call: bloodied-burst, death-burst, bloodied-fury, uncanny-sense — the key word does not mean the mechanic here
[reskin] trait declined: "Oathbrand Ledger" — bound only on the idea's own words (branded:idea) with no key in the concept; a meat body earns its trait by the user's verb (the sniper's tracker, critic 2026-09-29)
[reskin] weapons answered: Iron Parry = longsword
[reskin] weapon declared: "Iron Parry" is a longsword — the call's own answer
[reskin] speed by concept: added Fly 30 ft. — the concept's movement set decides
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] print canon alignment: Lawful Neutral -> Lawful Evil — the Pit Fiend's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common" -> "Infernal; telepathy 120 ft." — the Pit Fiend's
[reskin] print canon speed: Fly -> 60 ft. — the Pit Fiend's own
[reskin] print canon row: Actions/Devilish Claw — the Pit Fiend's second melee row, beside the chassis's
[reskin] print canon row: Actions/Fiery Mace — the Pit Fiend's second melee row, beside the chassis's
[reskin] print canon attack: "Iron Parry" -> "Bite" — the Pit Fiend's own row
[reskin] print canon multiattack: "The fiend makes one Bite attack, two Devilish Claw attacks, and one Fiery Mace attack." — the Pit Fiend's own
[reskin] immunities stamped for type: Fiend -> Poison; Poisoned
[reskin] print canon defenses: immunities Poison; Poisoned -> Fire, Poison; Poisoned; resistances none -> Cold — the Pit Fiend's own header lines
[reskin] resistances derived withheld: print's Pit Fiend owns the line (Cold)
[reskin] print canon trait: Diabolical Restoration — "Pit Fiend — who collects the oaths of dying knights" is the Pit Fiend (print's own row)
[reskin] print canon trait: Fear Aura — "Pit Fiend — who collects the oaths of dying knights" is the Pit Fiend (print's own row)
[reskin] print canon trait: Magic Resistance — "Pit Fiend — who collects the oaths of dying knights" is the Pit Fiend (print's own row)
[reskin] print canon legendary: the chassis's Legendary Actions leave — the Pit Fiend has none of its own at its CR
[reskin] print canon row: Actions/Hellfire Spellcasting (Recharge 4-6) — the Pit Fiend's own
audit finding below confidence gate: Hellfire Spellcasting Casting Fireball 'twice' is ambiguous about whether both streaks resolve in the same instant at possibly different points or require separate aiming decisions, and the action does not state ranges for the spells it substitutes.
```


---


### Owlbear — in the run

**Concept:** name: Owlbear | 

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Owlbear | 3 | brute-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

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
- Actions/Rend — print's row, renamed

**Engine trace**

```
[route] brute type=Monstrosity mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | brute: ✓ ("Owlbear") | brute: no line key in the words — the model's read of its quote
[concept] resolve: archetype=brute type=Monstrosity themes=bestial/terror mind=bestial style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: provided "Owlbear"
[concept] mechanics: none claimed
[concept] signature elements: bear-and-owl hybrid body [body] | two-pawed mauling and beak strikes [behavior] | furious fight-to-the-death temperament [behavior]
[concept] identity: The owlbear wades in on its hind legs and opens with a two-pawed mauling, roaring to seize the middle of the fight and keep it there. Every round after is the same trade — beak for sword, talon for shield — since its hide-and-muscle bulk is built to absorb hits and answer with more. It fights in a fury, never routing, only more ferocious once bloodied.
[concept] lore: A wizard's failed crossbreeding of bear and owl, the owlbear has escaped into the wild as an ill-tempered predator that hunts whatever it can reach with its talons.
[reskin] print canon defenses: HP 66 -> 59, AC 12 -> 13 — the Owlbear's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 20, DEX 12, CON 17, INT 3, WIS 12, CHA 7 — the Owlbear's at its own CR; attack +5 -> +7, DC 15 (print's)
[reskin] donor: brute-2 -> CR 3
[reskin] print canon: "Owlbear" is a print creature — the seats stand down; print's own rows are the composition
[reskin] repair round 1: 1 defect(s) — rename for "Signature Slot" takes the shelf's own row name "Bloodied Fury" — that name belongs to a template this sheet may still receive; choose another
[reskin] inline by rule: "the owlbear" — the call answered "the owlbear" (kind), which the name does not support
[reskin] inline form: "the owlbear" — the model's own reading of the name
[reskin] save dc derived: DC 12 -> 15 (8 + PB 2 + the sheet's best 5) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Owlbear" -> has (descriptive), head
[reskin] weapons answered: Talons = none
[reskin] print canon speed: modes climb — the Owlbear's
[reskin] print canon senses: "darkvision 60 ft." — the Owlbear's
[reskin] speed by concept: added Climb 30 ft. — the concept's movement set decides
[reskin] print canon speed: 30 ft. -> 40 ft. — the Owlbear's walk; the concept's other modes stay
[reskin] print canon speed: Climb -> 40 ft. — the Owlbear's own
[reskin] print canon attack: "Talons" -> "Rend" — the Owlbear's own row
[reskin] print canon multiattack: "The owlbear makes two Rend attacks." — the Owlbear's own, added (the chassis carried none; the Owlbear makes two Rend attacks — canaries 2026-10-12)
[reskin] languages held: None stands — INT 3 on a Monstrosity speaks nothing, whatever the mind read said
```


---


### Caustic Broodling — in the run

**Concept:** A Large insectile horror. It has four scythe-arms, a spitting maw, and a shell that sheds acid. It fights by pinning prey with two arms and carving with the others.

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Caustic Broodling | 9 | brute-8-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- **dropped clause:** "It has four scythe-arms"
- read: def 7 / off 9 → 8; sustained 62 (2 × Scythe-Arm); nova none; dmg 62

```
Caustic Broodling

Large Monstrosity, Unaligned

AC 15
Initiative -1 (9)

HP 161 (19d10 + 57)

Speed 40 ft.

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

Multiattack. The broodling makes two attacks, using Scythe-Arm or Carving Scythe-Arm in any combination. It can replace one attack with a use of Withering Dread.

Scythe-Arm. Melee Attack Roll: +8, reach 10 ft. 18 (4d6 + 4) Slashing damage plus 13 (3d8) Acid damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 16). While Grappled, the target has the Restrained condition.

Withering Dread. Wisdom Saving Throw: DC 15, one creature within 60 feet. Failure: The target has the Frightened condition until the end of the broodling's next turn. If the target was already Frightened by this ability, it also takes 32 (5d12) Acid damage.

Carving Scythe-Arm. Melee Attack Roll: +8, reach 5 ft. 18 (4d6 + 4) Slashing damage.

Bonus Actions

Swallow. The broodling swallows one Medium or smaller creature it is grappling. While swallowed, the target has the Blinded and Restrained conditions, has Total Cover against attacks and other effects outside the broodling, and takes 10 (3d6) Acid damage at the start of each of the broodling's turns. The broodling can have only one creature swallowed at a time. If the broodling takes 25 damage or more on a single turn from the swallowed creature, the broodling must regurgitate the target at the end of that turn, and the target exits Prone in an unoccupied space within 10 feet of the broodling. If the broodling dies, a swallowed creature exits the body Prone by using 10 feet of movement.

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
- Actions/Withering Dread — library seed escalating-dread; the GM's clause "A Large insectile horror"; binds the GM's words: horror
- Actions/Carving Scythe-Arm — authored for this sheet; the GM's clause "carving with the others"
- Bonus Actions/Swallow — binds the GM's words: swallow+swallows+engulf+engulfs+devour+devours+gulp+smother+entomb+cocoon+whelm

**Engine trace**

```
[route] brute-grappler type=Monstrosity mechanics=grapple, engulf — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: on the GM's own words "pinning prey with two arms" | brute-grappler: ✓ ("pinning prey with two arms") | brute-grappler: no line key in the words — the model's read of its quote
[concept] resolve: archetype=brute type=Monstrosity themes=bestial/venomous mind=bestial style=grappler energy=Acid mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: grapple, engulf
[concept] signature elements: pinning with two arms while carving with the others [behavior] | four scythe-arms [body] | acid-shedding shell and spitting maw [body]
[concept] identity: The acid-shelled horror opens by spitting a blinding gout at the nearest prey while its shedding carapace hisses a caustic wake across the ground; once a target is soaked and softened, it drives two scythe-arms down to pin it and carves with the remaining pair in quick, methodical cuts. It never retreats and never toys — a pin is simply a step toward butchering — though a wounded shell vents a harsher spray as it presses in.
[concept] lore: Hatched in a caustic cavern where its mother's shell dissolved into the water table, the creature seeks neither mate nor territory, only the constant feeding its relentlessly growing carapace demands.
[reskin] donor: brute-8-grappler -> CR 9
[reskin] inline declared: "the broodling" — the call's own answer (kind), built from the name
[reskin] inline form: "the broodling" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] clauses: "A Large insectile horror" -> has (header) | "It has four scythe-arms" -> has (mechanical) [asked: on_hit/condition] | "a spitting maw" -> has (descriptive) | "a shell that sheds acid" -> has (descriptive) | "It fights by pinning prey with two arms" -> has (descriptive) | "carving with the others" -> has (mechanical) [asked: at_will/attack]
[reskin] signature idea (action): "The broodling rears up and hoses a searing jet of digestive acid at one creature it can see, aiming less to hurt than to strip: anyone caught is drenched, their armor and footing hissing and weakened, leaving them easier to seize and hold. It can only manage this before its gut refills, so it saves the spray for prey that's still loose." [action/save/condition] — menu: leap, condition-payoff, shield-bash, hook-drag, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, exploiter (+ shelf: shell-withdraw, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, affliction, contagion, stunning-strike, charge-push, hook-rider, pounce)
[reskin] signature bound to the concept's verb: action — exploiter, shell-withdraw, spew, escalating-dread (pinned, shell, spits, horror)
[reskin] word match declined by the call: exploiter, shell-withdraw, spew, condition-payoff — the key word does not mean the mechanic here
[reskin] signature miss: action — "The broodling rears up and hoses a searing jet of digestive acid at one creature it can see, aiming less to hurt than to strip: anyone caught is drenched, their armor and footing hissing and weakened, leaving them easier to seize and hold. It can only manage this before its gut refills, so it saves the spray for prey that's still loose." [action/save/condition] — the model picked "leap" (no verb, and it quotes nothing the GM typed) over a concept-verb template (exploiter, shell-withdraw, spew, escalating-dread)
[reskin] fallback respects the call: exploiter, shell-withdraw, condition-payoff left the shelf — the call declined them for this sheet
[reskin] value check: "Creeping Dread" EV 22 vs floor 16.6 (one attack of 2) — dice 16 → 32
[reskin] library seed drawn: escalating-dread -> Actions/"Creeping Dread" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Its carapace constantly sweats acid, so the ground it walks over stays slick and smoking; any creature that ends up near or beneath it has to keep its footing on the corrosive slick or slip and be left exposed." [trait/always/movement] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending, weapon-lodge)
[reskin] signature bound to the concept's verb: trait — heated-body (acid)
[reskin] word match declined by the call: heated-body — the key word does not mean the mechanic here
[reskin] trait declined: "Caustic Slick" — bound only on the idea's own words (slick:idea, footing:idea) with no key in the concept; a meat body earns its trait by the user's verb (the sniper's tracker, critic 2026-09-29)
[reskin] repair: 1 clause(s) with no row — "carving with the others"; one targeted call with the sheet as context
[reskin] repaired sheet: 2 attack row(s), 0 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] weapons answered: Scythe-Arm = none
[reskin] languages held: None stands — INT 4 on a Monstrosity speaks nothing, whatever the mind read said
[reskin] multiattack replacement clause: It can replace one attack with a use of Creeping Dread.
[reskin] row binds its clause: "Creeping Dread" answers "A Large insectile horror" — the keys it matched came from that clause, so the coverage credit has a receipt
[reskin] asked but unanswered: "It has four scythe-arms" asked for on_hit and no row binds the clause
[reskin] ask vs row ok: "carving with the others" -> "Carving Scythe-Arm" — trigger at_will
[reskin] audit rename: "Creeping Dread" -> "Withering Dread"
```


---


### Mire Hagsight — in the run

**Concept:** a marsh witch who curses trespassers, cr 7

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Mire Hagsight | 7 | caster-8-binder | FAIL: attack-stat | ok | ok | ok | ok | ok | ok | ok | ok |

- derivation · fail · attack-stat: Rusted Blade: +7 derives from CHA, but an attack row rolls STR/DEX
- read: def 4 / off 8 → 6; sustained 51 (3 × Rusted Blade); nova none; dmg 51

```
Mire Hagsight

Medium Humanoid, Neutral Evil

AC 15
Initiative +2 (12)

HP 110 (17d8 + 34)

Speed 30 ft., Swim 30 ft.

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
15
+2
+2
CHA
18
+4
+7

Skills Perception +5, Deception +7

Senses Passive Perception 15

Languages Common

CR 7 (XP 2,900; PB +3)

Actions

Multiattack. The hagsight makes three attacks, using Rusted Blade or Withering Bolt in any combination. It can replace one attack with a use of Mire Sap.

Rusted Blade. Melee Attack Roll: +7, reach 5 ft. 17 (3d8 + 4) Slashing damage.

Withering Bolt. Ranged Attack Roll: +7, range 80/320 ft. 13 (2d8 + 4) Piercing damage.

Mire Sap. Constitution Saving Throw: DC 15, one creature within 60 feet. Failure: 14 (4d6) Poison damage, and the target has the Poisoned condition until the end of its next turn.

Spellcasting. The hagsight casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 15):

- At Will: Fog Cloud
- 1/Day Each: Bestow Curse, Slow

Bog-Bind Touch. Wisdom Saving Throw: DC 15, one creature within 30 feet. Failure: 17 (5d6) Necrotic damage, and the target can't regain Hit Points until the end of the hagsight's next turn. Success: Half damage only.

Trespasser's Curse. Wisdom Saving Throw: DC 15, one creature within 60 feet. Failure: 19 (3d12) Necrotic damage, and the target has the Charmed condition until the end of its next turn.

Reactions

Protective Magic (3/Day). The hagsight casts Counterspell or Shield in response to the spell's trigger, using the same spellcasting ability as Spellcasting.

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
- Actions/Rusted Blade — weapon shortsword
- Actions/Withering Bolt — the chassis
- Actions/Mire Sap — the chassis
- Actions/Spellcasting — the chassis
- Actions/Bog-Bind Touch — library seed seal
- Actions/Trespasser's Curse — authored for this sheet; the GM's clause "curses trespassers"
- Reactions/Protective Magic — mage kit; the GM's clause "witch"

**Engine trace**

```
[route] caster-binder (controller) type=Humanoid mechanics=none — casts: implied by the kind — "a marsh witch who curses trespassers" | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | caster-binder: ✓ ("curses trespassers") | caster-binder: key "curses" (class verb)
[concept] hints: binder→style ✓ ("a marsh witch who curses trespassers")
[concept] resolve: archetype=caster type=Humanoid themes=arcane/grave mind=sapient style=binder energy=Necrotic mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: curses that steal actions [behavior] | bog-water body and drowned flesh [body] | luring trespassers into the mire [behavior]
[concept] identity: The marsh witch opens with a hexing glance, laying a wasting curse on the nearest trespasser before the fight truly begins. Every round after, she peels away actions — rooting feet in the muck, fogging minds, sapping strength — and only strikes with a rusted blade when a foe is already helpless. She is a patient, mocking thing that toys with intruders until bloodied, then slips into the reeds rather than die for a patch of swamp.
[concept] lore: A hedge-witch who drowned in the bog she cursed and rose again bound to its waters, she now hexes any who cross her marsh so their bones feed the peat she calls home.
[reskin] energy withheld: Necrotic on a Humanoid with no Necrotic in the concept's own words (fixed phrases read first)
[reskin] donor: caster-8-binder -> CR 7
[reskin] repair round 1: 3 defect(s) — "Withering Bolt" deals Necrotic on a Humanoid whose concept names no Necrotic — a name is not a warrant; use a physical type | "Mire Sap" deals Poison on a Humanoid whose concept names no Poison — a name is not a warrant; use a physical type | the melee rider is missing (an energy type or "none")
[reskin] repair round 2: 2 defect(s) — "Withering Bolt" deals Necrotic on a Humanoid whose concept names no Necrotic — a name is not a warrant; use a physical type | "Mire Sap" deals Poison on a Humanoid whose concept names no Poison — a name is not a warrant; use a physical type
[reskin] implied class kept: "mage" on the GM's own words "witch" — the key table found none
[reskin] class kit: mage — "witch": Protective Magic (3/Day) (Mage/Protective Magic)
[reskin] inline declared: "the hagsight" — the call's own answer (kind), built from the name
[reskin] inline form: "the hagsight" — the model's own reading of the name
[reskin] energy withheld on a base row: "Withering Bolt" Necrotic -> Piercing (the row's own noun; a Humanoid deals no Necrotic its concept never gave it)
[reskin] control spell gated to daily — Bestow Curse (level 3 control at will is print's CR 13+ shape; at CR 7 it is 1/Day)
[reskin] control spell gated to daily — Slow (level 3 control at will is print's CR 13+ shape; at CR 7 it is 1/Day)
[reskin] daily spell dropped — Blight (36 avg vs 17 per-hit; print's only daily damage spell is the Adult Red's Fireball at ~1.1x)
[reskin] spell DC coherence: DC 14 -> 15 off Charisma 18 (the stat makes the attack rolls)
[reskin] save dc derived: DC 14 -> 15 (8 + PB 3 + Charisma's 4) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a marsh witch" -> has (descriptive), head | "curses trespassers" -> has (mechanical) [asked: condition] | "cr 7" -> has (header)
[reskin] extraction: 1 of 3 model clauses quote nothing the user typed and leave the record ("cr 7")
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The hagsight fixes her gaze on a foe she has already sickened with her mire sap, and the curse in their blood takes root — they feel the bog pulling at their ankles, and every step they take drags twice as hard while she watches. The muck follows them as long as she keeps her eyes on them; breaking her line of sight or wounding her badly breaks the hold." [action/save/movement] — menu: condition-payoff, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, snare-bolt, slow-bolt, sensory-strike, herd, thrown-burst-seed, drain, curse-debt, zone-seed, reveal, wind-up, blighted-ground (+ shelf: delayed-brand, lay-on-hands, aggro-curse, self-invisibility, rally, snap-shot, bolt-restrain, bolt-drag, bolt-mark)
[reskin] word match declined by the call: obstacle-pull, pacify, bolt-restrain, bolt-drag, snare-bolt — the key word does not mean the mechanic here
[reskin] value check: "Bog-Cursed Stride" EV 2.3 vs floor 8.8 (one attack of 3) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Bog-Cursed Stride" — the ladder could not lift it; the fallback stands in
[reskin] fallback respects the call: pacify, snare-bolt left the shelf — the call declined them for this sheet
[reskin] value check: "Sealing Touch" EV 13.2 vs floor 8.8 (one attack of 3) — added Success: Half; dice 9 → 17
[reskin] library seed drawn: seal -> Actions/"Sealing Touch" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Her drowned body weeps bog-water; anyone who strikes her in melee is splashed with the same foul peat that fills her lungs, and the clinging wetness makes their next swings sluggish as their arms remember the cold." [trait/on_being_hit/condition] — menu: absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst)
[reskin] signature bound to the concept's verb: trait — terrain-walk (marsh)
[reskin] word match declined by the call: terrain-walk, absorption, resonant-body — the key word does not mean the mechanic here
[reskin] signature miss: trait — "Her drowned body weeps bog-water; anyone who strikes her in melee is splashed with the same foul peat that fills her lungs, and the clinging wetness makes their next swings sluggish as their arms remember the cold." [trait/on_being_hit/condition] — the model picked "bloodied-burst" (no verb, and it quotes nothing the GM typed) over a concept-verb template (terrain-walk)
[reskin] repair: 1 clause(s) with no row — "curses trespassers"; one targeted call with the sheet as context
[reskin] repaired sheet: 2 attack row(s), 1 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] weapons answered: Rusted Blade = a rusty shortsword; Withering Bolt = none; Debuff Ray = none; Signature Slot = none
[reskin] weapon declared: "Rusted Blade" is a shortsword — the call's own answer (the name alone read longsword)
[reskin] weapon declined: "Withering Bolt" reads crossbow from its name, but the call answered none — the row carries no weapon
[reskin] weapon table: "Withering Bolt" — a launcher, never thrown, range 80/320
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] multiattack replacement clause: It can replace one attack with a use of Mire Sap.
[reskin] audit rename: "Sealing Touch" -> "Bog-Bind Touch"
```


---


### Ironwrit Templar — in the run

**Concept:** a templar priest with a mace and no magic at all

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Ironwrit Templar | 6 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 5 / off 6 → 5.5; sustained 44 (2 × Mace); nova none; dmg 44

```
Ironwrit Templar

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

Multiattack. The templar makes two Mace attacks.

Mace. Melee Attack Roll: +7, reach 5 ft. 22 (4d8 + 4) Bludgeoning damage, and the target has Disadvantage on its next attack roll before the start of the templar's next turn.

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
[route] defender type=Humanoid mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | defender: ✓ ("a templar priest with a mace") | defender: no line key in the words — the model's read of its quote
[concept] name: provided_name rejected — "a templar priest with a mace and no magi…" is the description, not a name
[concept] resolve: archetype=defender type=Humanoid themes=armed/forged mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: a mace and shield with no divine power behind them [object] | holding the line so no one slips past [behavior] | drilled discipline that will not break [behavior]
[concept] identity: A veteran templar who has traded every prayer for drill and discipline, advancing shield-first to pin the heaviest foe in reach and crack ribs with a one-handed iron mace. Each round it holds the line, punishing anyone who tries to slip past with a shoulder-check and a downward strike, and it never breaks ranks — bloodied, it plants its shield and fights to the last breath, because retreat is the one heresy it still believes in.
[concept] lore: Stripped of his order for a faith that answered no prayers, the templar kept the armor, the mace, and the drills, hiring out as an unbreakable bodyguard to anyone with coin and an enemy.
[reskin] print canon array: STR 18, DEX 10, CON 12, INT 13, WIS 16, CHA 13 — the Priest's, STR fitted to +7
[reskin] donor: defender-5 -> CR 6
[reskin] row gated out: Guard Aura (aura) — the concept did not claim this mechanic
[reskin] print canon: "a templar priest with a mace and no magic at all" heads on the Priest — print's rows ride along; the seat stays
[reskin] named parts: Mace (slot) — the user's words, the engine's numbers
[reskin] named parts landed: 1 attack row(s), 0 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] chassis row off: Actions/"Pinning Shield-Bash" leaves — the GM named a melee weapon (Mace); one weapon, one rule set
[reskin] class kit: Divine Aid — the sheet carries no row it could refer to (/^Spellcasting$/)
[reskin] class kit: cleric — "a templar priest with a mace": nothing to add — the sheet already answers it
[reskin] inline declared: "the templar" — the call's own answer (kind), built from the name
[reskin] inline form: "the templar" — the model's own reading of the name
[reskin] lacks asked: "no magic at all"
[reskin] clauses: "a templar priest with a mace" -> has (mechanical) [asked: attack] | "no magic at all" -> LACKS (mechanical)
[reskin] signature idea (action): "The templar plants its shield and drives forward in a short, grinding advance, herding everyone in front of it backward and keeping them pressed against its reach. Anyone caught in that shove is not just moved but tangled in the shield's edge, so their guard drops until they can sort out their footing — and the templar stays exactly where it stopped, never past the line it meant to hold." [action/save/movement] — menu: seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up (+ shelf: patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, riposte, stunning-strike, charge-push, hook-rider)
[reskin] fit declined: "Shieldwall Advance" — a print body takes only what the user's words ask; the call offered no quote, and the key table finds no verb either (the blacksmith's rally, critic-ten 2026-10-01)
[reskin] fallback stands down: "a templar priest with a mace and no magic at all" heads on the Priest and asks for nothing — print's rows, nothing invented (the big ogre, critic-ten 2026-10-01)
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 19 already beats print's AC 15 at CR 6, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "There is no god in the mace, only a man who has swung one ten thousand times; when the templar lands a blow on a foe already staggering or off balance from an earlier strike, the hit lands with the full weight of a rehearsed finish rather than a lucky swing. It also keeps fighting past the point where any sane soldier would fall back, steadying itself as the wounds pile on." [trait/always/damage] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending, weapon-lodge)
[reskin] word match declined by the call: undead-fortitude, bloodied-fury — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "There is no god in the mace, only a man who has swung one ten thousand times; when the templar lands a blow on a foe already staggering or off balance from an earlier strike, the hit lands with the full weight of a rehearsed finish rather than a lucky swing. It also keeps fighting past the point where any sane soldier would fall back, steadying itself as the wounds pile on." [trait/always/damage] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, bloodied-burst)
[reskin] weapons answered: Mace = mace; Pinning Shield-Bash = none
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] print canon languages: "Common" -> "Common plus one other language" — the Priest's
[reskin] print canon row: Actions/Spellcasting — the Priest's own
[reskin] print canon row: Bonus Actions/Divine Aid (3/Day) — the Priest's own
[reskin] spellcasting dc: "Spellcasting" prints spell save DC 14 — 8 + PB + Wisdom (print carries it in 45 of 48 rows)
[reskin] lacks clause: Actions/"Spellcasting" leaves — "no magic at all"
[reskin] dead wildcard name swept — "Divine Aid (3/Day)" was only about "Spellcasting"; the row drops
```


---


### Squallmaw Drake — in the run

**Concept:** a young storm drake whose breath is a rolling wall of thunder

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Squallmaw Drake | 7 | dragon-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- **dropped clause:** "a young storm drake whose breath is a rolling wall of thunder"
- read: def 5 / off 7 → 6; sustained 35 (1 × Talons); nova Rolling Thunder 39; dmg 49

```
Squallmaw Drake

Medium Dragon, Neutral Evil

AC 18
Initiative +1 (11)

HP 110 (17d8 + 34)

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

Talons. Melee Attack Roll: +7, reach 5 ft. 22 (4d8 + 4) Slashing damage plus 13 (3d8) Thunder damage.

Rolling Thunder (Recharge 5-6). Constitution Saving Throw: DC 15, each creature in a 15-foot Cone. Failure: 39 (6d12) Thunder damage. Success: Half damage.

Bonus Actions

Stormtail Follow-Through (1/Day). Immediately after dealing damage to a creature that is already Bloodied, the drake moves up to half its Speed without provoking Opportunity Attacks, and it makes one Talons attack.

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

- Actions/Talons — the chassis
- Actions/Rolling Thunder — the chassis
- Bonus Actions/Stormtail Follow-Through — template rampage; library draw (seed unstamped); binds the GM's words: wound

**Engine trace**

```
[route] dragon type=Dragon mechanics=breath — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | dragon: ✓ ("a young storm drake whose breath is a ro") | dragon: key "drake" (class body)
[concept] hints: dragon→body ✓ ("a young storm drake — a dragon body") | breath→mechanics ✓ ("breath is a rolling wall of thunder")
[concept] resolve: archetype=dragon type=Dragon themes=draconic/aerial mind=sapient style=— energy=Thunder mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: breath
[concept] signature elements: rolling wall of thunder breath [behavior] | storm-charged drake body [body] | cruel sky-hunter that toys with prey [behavior]
[concept] identity: The young storm drake opens with a rolling wall of thunder that tumbles across the battlefield, bowling over and deafening prey before it descends. Once the wall is rolling, it circles above on gusting wings, diving into scattered survivors with crackling claws and tail. It is a proud, cruel hunter: it toys with wounded prey and only flees when genuinely bloodied.
[concept] lore: Hatched in the anvil-head of a perpetual thunderstorm, the young storm drake rides the squall line it calls home, hunting anything that flees before its rolling wall of sound.
[reskin] body type: dragon — the body outranks the role (recorded: dragon)
[reskin] nova capped: "Breath Weapon" 42 → 39 (the chassis nova obeys the cap: 39 at CR 7)
[reskin] donor: dragon-2 -> CR 7
[reskin] inline declared: "the drake" — the call's own answer (kind), built from the name
[reskin] inline form: "the drake" — the model's own reading of the name
[reskin] save dc derived: DC 14 -> 15 (8 + PB 3 + the sheet's best 4) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a young storm drake whose breath is a rolling wall of thunder" -> has (mechanical) [asked: save_area]
[reskin] menu pruned: action — escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating (the sheet cannot render them)
[reskin] signature idea (action): "After the drake slams a foe with its talons, it can whip its storm-lashed tail to hurl the prey skyward and send it tumbling back down, leaving it sprawled and easy to toy with. This second strike only works against someone already left reeling by thunder, so the drake circles wounded survivors before finishing them with a cruel flourish." [rider/on_hit/movement] — menu: affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, charge (+ shelf: gaze-single, snare, zone, execute, seal, shield-bash, lure, rampage, lay-on-hands, second-wind)
[reskin] value check: "Stormtail Follow-Through (1/Day)" EV 27.9 vs floor 5.4 (a bonus action (free)) — worth the trade
[reskin] signature template: rampage -> Bonus Actions/"Stormtail Follow-Through (1/Day)" ("After slamming a foe with its talons, the drake whips its storm-lashed tail to h [verb: wound:idea]")
[reskin] signature idea (trait): "The drake cannot linger in still air: whenever it dives onto prey from above, its wings crack with pent thunder that leaves the victim shaken and deafened. Its body is a held squall, so the longer it stays aloft the louder it grows, and it must keep riding its storm or lose that charge." [trait/always/condition] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending, weapon-lodge)
[reskin] signature bound to the concept's verb: trait — heated-body (storm)
[reskin] decline reason: trait — the call answered none and names it "no_fit" after being shown heated-body, which the GM's words keyed
[reskin] key match declined: trait — "heated-body" was ranked first on the call's own menu for storm, and the call read it as no fit; the words keep their claim and nothing is forced
[reskin] signature miss: trait — "The drake cannot linger in still air: whenever it dives onto prey from above, its wings crack with pent thunder that leaves the victim shaken and deafened. Its body is a held squall, so the longer it stays aloft the louder it grows, and it must keep riding its storm or lose that charge." [trait/always/condition] — the model found no template that holds it (offered: heated-body, false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst, bloodied-burst)
[reskin] weapons answered: Talons = none; Rolling Thunder = none; Deafening Clap = none
[reskin] chassis nova: "Rolling Thunder (Recharge 5-6)" — the dragon-2's own nova row (its "Breath Weapon", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] element immunity: Thunder (merged into the header write)
[reskin] dragon senses raised to tier: blindsight 30 added
[reskin] dragon senses raised to tier: darkvision 60 -> 120
[reskin] dragon languages: Draconic added (42/42 print dragons speak it)
[reskin] immunities stamped for type: Dragon -> Thunder
[reskin] vulnerability rejected — "Cold" has no warrant in the concept's own text (print's default is none)
```


---


### Well Drowner — in the run

**Concept:** name: the thing in the well | 

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Well Drowner | 5 | lurker-5-trap | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 5 / off 5 → 5; sustained 38 (2 × Claw); nova none; dmg 38

```
Well Drowner

Medium Monstrosity, Neutral

AC 20
Initiative -1 (9)

HP 90 (12d8 + 36)

Speed 10 ft., Climb 20 ft.

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

Senses darkvision 60 ft.; Passive Perception 16

Languages None

CR 5 (XP 1,800; PB +3)

Actions

Multiattack. The drowner makes two Claw attacks.

Claw. Melee Attack Roll: +6 (with Advantage if the target is Grappled by the drowner), reach 5 ft. 12 (2d8 + 3) Slashing damage plus 7 (2d6) Cold damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 14). It is pulled up to 10 feet straight toward the drowner.

Bonus Actions

False Form. The drowner shape-shifts to resemble an ordinary object or fixture of the place it waits in while retaining its game statistics, or it returns to its true form. While it is motionless in its false form, it is indistinguishable from that feature.

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
- Actions/Claw — binds the GM's words: drag+drags+hauls it
- Bonus Actions/False Form — the chassis

**Engine trace**

```
[route] lurker-trap type=Monstrosity mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | lurker-trap: ✓ ("the thing in the well") | lurker-trap: no line key in the words — the model's read of its quote
[concept] resolve: archetype=lurker type=Monstrosity themes=aquatic/devouring mind=bestial style=trap energy=Cold mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: lurking at the bottom of a well until prey looks over the edge [behavior] | dragging its catch down into the black water [behavior] | a body of sodden gray brine-soaked hide indistinguishable from wet trash [body]
[concept] identity: The thing in the well waits at the bottom of its stone shaft as a half-submerged mass of wet gray hide, near-indistinguishable from a rotting bucket or a drowned dog until a face leans over the lip — then it erupts up the well's throat with a burbling shriek, seizes the rim with boneless finger-limbs, and drags itself and its prey down together. Once it has a grip it does not let go: it wraps, crushes and coils, crushing breath out of a body in water-choked spasms, and it never climbs out after a meal that escapes — but anything that wounds it deeply learns the shaft has no bottom and it simply sinks, dragging whatever it has hold of with it. It is patient, gluttonous, and utterly certain that anything above the water is food.
[concept] lore: Something drowned in this well and refused to finish drowning, and now it grows fat on whatever comes to draw water or gawk down the shaft — it wants only to keep its water high and its belly full.
[reskin] donor: lurker-5-trap -> CR 5
[reskin] row gated out: Swallow (engulf) — the concept did not claim this mechanic
[reskin] reach folded: "Grasping Limb" (reach 50) and Reel leave — no tether in the concept; the grapple rides "Melee Attack" (the Giant Crab's shape)
[reskin] inline declared: "the drowner" — the call's own answer (kind), built from the name
[reskin] inline form: "the drowner" — the model's own reading of the name
[reskin] save dc derived: DC 13 -> 14 (8 + PB 3 + the sheet's best 3) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "the thing in the well" -> has (descriptive), head
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The drowner hauls itself up the shaft in one lurching surge of boneless limbs, and anyone leaning out over the rim to look down is caught utterly flat-footed — it rips them over the edge before they can straighten up. Whoever it drags down lands in the water at the bottom with it, the fall and the cold shock knocking the fight out of them." [rider/on_hit/movement] — menu: affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, isolation (+ shelf: leap, condition-payoff, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, terror-pulse, snare-bolt, slow-bolt, sensory-strike, drain, delayed-brand, zone-seed, exploiter, blighted-ground, patient-defense, self-invisibility, focus, feint-slip, coating, riposte)
[reskin] signature rider: hook-rider -> Claw (appended; The drowner surges up and rips a creature over the edge, dragging it down with i [verb: drag:idea, drags:idea, hauls it:idea])
[reskin] signature idea (trait): "Its hide is a living sponge of cold well-water; whenever it is wounded, brine gushes from the split and sprays over whoever struck it, soaking through cloth and armour so the cold settles into their bones and their grip goes weak. The wound steams and closes a little as the water pours out, and the well-it-keeps runs shallow for a moment." [trait/on_being_hit/damage] — menu: heated-body, absorption, bloodied-burst, resonant-body (+ shelf: adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, evasion, relentless-pursuit, bound, marking-light, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] word match declined by the call: adhesive, terrain-walk, aberrant-ground, absorption, bloodied-burst, bloodied-fury, resonant-body — the key word does not mean the mechanic here
[reskin] seat owes nothing: the trap line was the model's read of its quote, not a key in the words (a hermit was handed Assassinate, day-one 2026-09-30)
[reskin] trait declined: "Brine Reflux" — a shape fit with no verb match on a Monstrosity body; a meat body earns its trait by a verb
[reskin] weapons answered: Claw = none
[reskin] resistances derived: Cold
```


---


### Sludgeshell Priest — in the run

**Concept:**  | role: brute

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Sludgeshell Priest | 4 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- **dropped clause:** "skitters back into the dark to freeze"
- **dropped clause:** "wait for another chance"
- **dropped clause:** "never fleeing far"
- **dropped clause:** "never letting a wounded thing leave alive"
- **dropped clause:** "it is a patient killer that strikes from extreme range"
- read: def 1 / off 5 → 3; sustained 28 (2 × Crushing Claw); nova Rime Shard Volley 22; dmg 33

```
Sludgeshell Priest

Medium Undead, Neutral Evil

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

Resistances Cold

Immunities Poison; Exhaustion, Poisoned

Senses darkvision 60 ft.; Passive Perception 12

Languages None

CR 4 (XP 1,100; PB +2)

Traits

Silt Burial. While in silt, mud, or similar loose ground, the sludgeshell priest can spend 1 minute to bury itself in the silt, gaining Total Cover against creatures outside the silt until it moves or attacks.

Faultless Tracker. The sludgeshell priest knows the direction and distance to any creature it has damaged within the last 24 hours, as long as the two of them are on the same plane of existence.

Actions

Multiattack. The sludgeshell priest makes two Crushing Claw attacks.

Crushing Claw. Melee Attack Roll: +6, reach 5 ft. 8 (1d8 + 4) Slashing damage plus 6 (1d12) Cold damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 14). While Grappled, the target has the Restrained condition.

Rime Shard Volley (Recharge 5-6). Dexterity Saving Throw: DC 13, each creature in a 15-foot-radius Sphere centered on a point within 60 feet. Failure: 22 (5d8) Cold damage. Success: Half damage.

Bonus Actions

Entomb. The sludgeshell priest entombs one Medium or smaller creature it is grappling. While entombed, the target has the Blinded and Restrained conditions, has Total Cover against attacks and other effects outside the sludgeshell priest, and takes 6 (1d12) Cold damage at the start of each of the sludgeshell priest's turns. The sludgeshell priest can have only one creature entombed at a time. If the sludgeshell priest takes 12 damage or more in a single turn from the entombed creature, the sludgeshell priest must release the target at the end of that turn, and the target exits Prone in an unoccupied space within 5 feet of the sludgeshell priest. If the sludgeshell priest dies, an entombed creature breaks free Prone by using 5 feet of movement.

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
- Actions/Crushing Claw — the chassis
- Actions/Rime Shard Volley — template thrown-burst-seed; library draw (seed unstamped); the GM's clause "lunges from cover to seize prey in its one crushing claw while its other arm hurls shards of frozen temple-stone at vict"; binds the GM's words: hurl
- Bonus Actions/Entomb — binds the GM's words: entomb+swallow+swallows+engulf+engulfs+devour+devours+gulp+smother+cocoon+whelm
- Traits/Silt Burial — authored for this sheet; the GM's clause "It buries itself beneath silt"
- Traits/Faultless Tracker — template faultless-tracker; library draw (seed unstamped); the GM's clause "moss-mantled corpse-crab stalks the flooded ruins of its sunken temple"; binds the GM's words: stalks+stalk

**Engine trace**

```
[route] brute-grappler type=Undead mechanics=grapple, engulf, thrown-weapon — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: on the GM's own words "seize prey in its one crushing claw" | brute-grappler: ✓ ("seize prey in its one crushing claw") | brute-grappler: key "seize" (class verb) | bane refused: the words carry no weakness clause, so "fire" answers a question nobody asked
[concept] synthesis (blank roll): archetype=brute type=Undead themes=grave/aquatic mind=mindless style=grappler lore=✓
[concept] synthesis text: A bloated, moss-mantled corpse-crab stalks the flooded ruins of its sunken temple, its shell fused to the drowned priest it once was, cold brine sheeting off its joints and freezing in the air where it passes; it is one dead will wearing one armored body. It buries itself beneath silt and flotsam to wait with the patience of the long-drowned, then lunges from cover to seize prey in its one crushing claw while its other arm hurls shards of frozen temple-stone at victims who flee across open water. When bloodied it simply sinks beneath the surface and skitters back into the dark to freeze and wait for another chance, never fleeing far and never letting a wounded thing leave alive. It is mindless (INT 1-2), and it is a patient killer that strikes from extreme range.
[concept] signature elements: claw-seize from the silty ambush [behavior] | brine-crusted moss shell [body] | aura of freezing seawater [aura]
[concept] name proposal: Frost Scuttler
[concept] lore: The temple fell beneath the tide with its last priest still clinging to the altar, and the hungry dead thing that wears his shell still hauls down anything that strays above the drowned sanctuary, dragging it down to a cold, patient congregation.
[reskin] donor: brute-5-grappler -> CR 4
[reskin] engulf engine: Entomb — the body's own verb
[reskin] engine interior scaled — CR 4 sits below the brute-5-grappler seat
[reskin] inline declared: "the sludgeshell priest" — the call's own answer (kind), built from the name
[reskin] inline form: "the sludgeshell priest" — the model's own reading of the name
[reskin] lacks asked: "mindless"
[reskin] asked field dropped: the call answered trigger "at_will" for "lunges from cover to seize prey in its one crushing claw while its other arm hurls shards of frozen temple-stone at victims who flee across open water" but offered no quote
[reskin] lacks not claimed: "never fleeing far" reads like a lack to the words, and the call's list did not name it
[reskin] lacks not claimed: "never letting a wounded thing leave alive" reads like a lack to the words, and the call's list did not name it
[reskin] clauses: "A bloated" -> has (descriptive), head | "moss-mantled corpse-crab stalks the flooded ruins of its sunken temple" -> has (descriptive) | "its shell fused to the drowned priest it once was" -> has (descriptive) | "cold brine sheeting off its joints" -> has (descriptive) | "freezing in the air where it passes" -> has (descriptive) | "it is one dead will wearing one armored body" -> has (mechanical) [asked: attack] | "It buries itself beneath silt" -> has (mechanical) [asked: condition] | "flotsam to wait with the patience of the long-drowned" -> has (descriptive) | "lunges from cover to seize prey in its one crushing claw while its other arm hurls shards of frozen temple-stone at vict" -> has (mechanical) [asked: attack] | "When bloodied it simply sinks beneath the surface" -> has (mechanical) [asked: when_bloodied/movement] | "skitters back into the dark to freeze" -> has (mechanical) [asked: when_bloodied/movement] | "wait for another chance" -> has (mechanical) [asked: when_bloodied/movement] | "never fleeing far" -> has (mechanical) [asked: movement] | "never letting a wounded thing leave alive" -> has (mechanical) [asked: movement] | "It is mindless (INT 1-2)" -> LACKS (mechanical) | "it is a patient killer that strikes from extreme range" -> has (mechanical) [asked: attack]
[reskin] signature idea (action): "The priest tears free of the silt and flings a fan of frozen temple-stone shards at anything crossing open water within long range, so prey that thinks itself safe across the flooded nave is still caught in the open. The shards lodge and chill, slowing the fleeing thing so the claw can close the distance." [action/save/damage] — menu: swallow, leap, condition-payoff, shield-bash, hook-drag, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, exploiter, pull-through, pacify, slow-bolt (+ shelf: shell-withdraw, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, patient-defense, riposte, affliction, contagion, charge-push, hook-rider, pounce)
[reskin] signature bound to the concept's verb: action — slow-bolt, shell-withdraw (freeze, cold, brine, shell, armor, crab)
[reskin] value check: "Rime Shard Volley (Recharge 5-6)" EV 34.1 vs floor 23.7 (the whole Multiattack (2 attacks)) — dice 14 → 22 (nova budget)
[reskin] signature template: thrown-burst-seed -> Actions/"Rime Shard Volley (Recharge 5-6)" ("hurls a fan of frozen temple-stone shards at creatures crossing open water withi [verb: hurl:concept]")
[reskin] keys spent by the action: hurl
[reskin] signature idea (trait): "Its shell is crusted with drowned moss and freezing brine, so any weapon that bites into it comes away wet and numbed; the thing that struck it loses feeling in its arm and its next blow falls wide. The priest never flinches from the wound, only turns its single eye toward the one who made it." [trait/on_being_hit/condition] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst, assassinate)
[reskin] signature bound to the concept's verb: trait — terrain-walk (frozen, freezes, freeze)
[reskin] word match declined by the call: heated-body, resonant-body, weapon-lodge, absorption, terrain-walk, bloodied-burst — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit" after being shown terrain-walk, which the GM's words keyed
[reskin] key match declined: trait — "terrain-walk" was ranked first on the call's own menu for frozen+freezes+freeze, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: trait — "Its shell is crusted with drowned moss and freezing brine, so any weapon that bites into it comes away wet and numbed; the thing that struck it loses feeling in its arm and its next blow falls wide. The priest never flinches from the wound, only turns its single eye toward the one who made it." [trait/on_being_hit/condition] — the model found no template that holds it (offered: terrain-walk, heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge)
[reskin] concept-first trait skipped: terrain-walk — the call read its match as a collision (the word is a modifier, or the sheet already answers it)
[reskin] concept-first trait skipped: bloodied-burst — the call read its match as a collision (the word is a modifier, or the sheet already answers it)
[reskin] trait bound to the concept's verb (concept-first): faultless-tracker — stalks+stalk in the user's words; the idea path had nothing
[reskin] signature template (trait): faultless-tracker -> Traits/"Faultless Tracker" ("exact concept match [verb: stalks:concept, stalk:concept]")
[reskin] repair: 2 clause(s) with no row — "it is one dead will wearing one armored body", "It buries itself beneath silt"; one targeted call with the sheet as context
[reskin] repaired sheet: 1 attack row(s), 0 save, 1 trait(s), 0 reaction(s); 1 clause(s) unplaced
[reskin] weapons answered: Crushing Claw = none; Freezing Brine = none
[reskin] attack name by anatomy: "Crushing Claw" -> "Crushing Claw" — claw deals Slashing, not Piercing
[reskin] languages held: None stands — INT 4 on a Undead speaks nothing, whatever the mind read said
[reskin] immunities stamped for type: Undead -> Poison; Exhaustion, Poisoned
[reskin] resistances derived: Cold
[reskin] row binds its clause: "Rime Shard Volley" answers "lunges from cover to seize prey in its one crushing claw while its other arm hurls shards of frozen temple-stone at vict" — the keys it matched came from that clause, so the coverage credit has a receipt
[reskin] row binds its clause: "Faultless Tracker" answers "moss-mantled corpse-crab stalks the flooded ruins of its sunken temple" — the keys it matched came from that clause, so the coverage credit has a receipt
[reskin] asked but unanswered: "When bloodied it simply sinks beneath the surface" asked for when_bloodied and no row binds the clause
[reskin] asked but unanswered: "skitters back into the dark to freeze" asked for when_bloodied and no row binds the clause
[reskin] asked but unanswered: "wait for another chance" asked for when_bloodied and no row binds the clause
```


---


### Skeleton — in the run

**Concept:** a skeleton with a greatsword

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Skeleton | 6 | brute-5 | ok | ok | SOFT: reach | ok | ok | ok | ok | ok | ok |

- structure · soft · reach: Actions/Greatsword: reach 10 on a Medium body with no tether word
- read: def 4 / off 6 → 5; sustained 44 (2 × Greatsword); nova none; dmg 44

```
Skeleton

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

Great Weapon Master. When the skeleton hits a creature with its Greatsword, the attack deals an extra 3 damage.

Actions

Multiattack. The skeleton makes two attacks, using Greatsword or Shortbow in any combination.

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
[route] brute type=Undead mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | brute: ✓ ("a skeleton with a greatsword") | brute: no line key in the words — the model's read of its quote
[concept] name: provided_name rejected — "a skeleton with a greatsword…" is the description, not a name
[concept] resolve: archetype=brute type=Undead themes=grave/armed mind=mindless style=— energy=Necrotic mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: oversized greatsword sweeps [object] | unfeeling relentless advance [behavior] | bound fighting bones [body]
[concept] identity: A greatsword-wielding skeleton closes with the nearest target and swings its oversized blade in slow, sweeping arcs that carve through armor and bone alike, heedless of the blows it takes. Every round it steps in behind its guard and repeats the same grinding assault, its unfeeling body indifferent to pain and fatigue. It does not flee or relent when bloodied — it merely keeps swinging until the blade or the body finally fails.
[concept] lore: Raised from a nameless battlefield ossuary, this warrior's bones were bound to the greatsword it died gripping, and it seeks only to finish the fight it never got to end.
[reskin] print canon array: STR 18, DEX 16, CON 15, INT 6, WIS 8, CHA 5 — the Skeleton's, STR fitted to +7
[reskin] donor: brute-5 -> CR 6
[reskin] print canon: "a skeleton with a greatsword" heads on the Skeleton — print's rows ride along; the seat stays
[reskin] named parts: Greatsword (slot) — the user's words, the engine's numbers
[reskin] named parts landed: 1 attack row(s), 0 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] implied class refused: the call answered "fighter" but this body takes no class kit — a beast or a mind too simple to train
[reskin] inline declared: "the bladebearer" — the call's own answer (kind), built from the name
[reskin] inline form: "the bladebearer" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a skeleton with a greatsword" -> has (mechanical) [asked: attack]
[reskin] signature idea (action): "The bladebearer throws its whole weight behind a single flat, crushing sweep, dragging the greatsword in a wide horizontal arc that catches everything in front of it and shoves the wounded sideways in a tumble. It does this instead of its usual two-cut rhythm when it wants to break a cluster apart, then steps forward into the space it just cleared." [action/save/damage] — menu: trample, leap, thrown-burst, throw-retrieve, shield-bash, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up (+ shelf: rampage, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, charge)
[reskin] word match declined by the call: push-prone, hook-rider, thrown-burst, thrown-burst-seed, rampage, affliction, trample, leap, throw-retrieve, shield-bash, active-toll, random-ray, spew, escalating-dread, terror-pulse, herd, drain, wind-up — the key word does not mean the mechanic here
[reskin] fit declined: "Bonecleaving Sweep (Recharge 5-6)" — a print body takes only what the user's words ask; the call offered no quote, and the key table finds no verb either (the blacksmith's rally, critic-ten 2026-10-01)
[reskin] fallback respects the call: escalating-dread, terror-pulse, push-prone, herd, rampage left the shelf — the call declined them for this sheet
[reskin] fallback stands down: "a skeleton with a greatsword" heads on the Skeleton and asks for nothing — print's rows, nothing invented (the big ogre, critic-ten 2026-10-01)
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "When the bladebearer is struck, it answers by leaning into the blow and swinging the greatsword around in a slow, grinding sweep that drags across anyone close to it — the harder it is pressed, the more it lashes out." [trait/on_being_hit/damage] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] signature miss: trait — "When the bladebearer is struck, it answers by leaning into the blow and swinging the greatsword around in a slow, grinding sweep that drags across anyone close to it — the harder it is pressed, the more it lashes out." [trait/on_being_hit/damage] — no template on the shelf shares a verb with the concept or the idea (offered: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge, false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] weapons answered: Greatsword = greatsword; Hurlbone = none
[reskin] print canon alignment: Neutral -> Lawful Evil — the Skeleton's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon name: "Ossuary Bladebearer" -> "Skeleton" — a whole print name is the creature's name (the Goblin Boss shipped as Krag the Iron Standard, 2026-10-01)
[reskin] inline follows the print name: "the bladebearer" -> "the skeleton"
[reskin] print canon languages: "None" -> "Understands Common plus one other language but can't speak" — the Skeleton's
[reskin] print canon speed: 40 ft. -> 30 ft. — the Skeleton's walk; the concept's other modes stay
[reskin] print canon attack: "Hurlbone" -> "Shortbow" — the Skeleton's own ranged row
[reskin] immunities stamped for type: Undead -> Poison; Exhaustion, Poisoned
[reskin] print canon defenses: vulnerabilities none -> Bludgeoning — the Skeleton's own header lines
[reskin] vulnerability rejected — "Bludgeoning" has no warrant in the concept's own text (print's default is none)
[reskin] audit rename blocked — "Great Weapon Master" is the user's own part name, a kit feature's real name, or print's own row
[reskin] multiattack re-read — "Shortbow" joins the combination; "The skeleton makes two attacks, using Greatsword or Shortbow in any combination."
```


---

## Review batch — features-2026-10-18-2026-10-19T00-46-58

The checker ran first. The gate table covers every block in the run; every block of the run follows. Each block carries its checker row above and its engine trace below. Hand-derive against the row first; then read for what predicates can't see.

### Gate table — the whole run

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Blind Scent-Stalker | 5 | 2024 | lurker-5 | ok | ok | ok | ok | SOFT: lint:beast-intelligence | ok | ok | ok | ok | soft (1) | 2/2 | 4/5 |
| Drowned Supplicant | 5 | 2024 | lurker-5-phantom | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 7/8 |
| Hollow Barrow Wight | 4 | 2024 | lurker-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |
| Gustreaver | 6 (2014) | 2014 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 7/9 |
| Pip Burrowwise | 3 (2014) | 2014 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 5/5 |
| Druid | 2 | 2024 | caster-6 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/3 |
| Ashvowed Cinder Priest | 4 (2014) | 2014 | caster-6 | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | soft (1) | 2/2 | 5/5 |
| Expelled Staff Wizard | 3 | 2024 | caster-6 | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | soft (1) | 2/2 | 1/1 |
| Skeleton | 2 | 2024 | brute-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/3 |
| Sandlot Champion | 4 (2014) | 2014 | defender-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/3 |
| Ogre | 3 | 2024 | brute-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/3 |
| Mummy | 3 | 2024 | brute-2 | SOFT: hit-die | ok | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 2/2 |
| Nave Drowned Choir | 4 | 2024 | lurker-1-phantom | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 7/7 |
| Cold Lamp Widow | 3 | 2024 | lurker-1-phantom | ok | SOFT: aim-hp | ok | ok | ok | ok | ok | ok | FAIL: no-type-in-name | FAIL (1) | 2/2 | 4/4 |
| Stray Mountain | 17 (2014) | 2014 | brute-17-juggernaut | ok | SOFT: aim-atk, band, hot-offense | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/3 | 7/9 |
| Slagmire Regrowth | 6 | 2024 | brute-5-regenerator | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 1/3 |
| Rage-Blooded Pitborn | 8 (2014) | 2014 | brute-5 | SOFT: duplicate-mechanic | SOFT: band | ok | ok | ok | ok | ok | ok | ok | soft (2) | 1/1 | 3/4 |
| Ironhold Inquisitor | 6 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 2/3 |
| Coil-Bodied Lurker | 7 | 2024 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 4/4 |
| Quarry Stamp | 6 (2014) | 2014 | brute-5-juggernaut | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 1/6 |
| Chamber Breaker | 5 (2014) | 2014 | skirmisher-3 | ok | SOFT: band | ok | SOFT: ko-at-will | ok | ok | ok | ok | ok | soft (2) | 0/1 | 3/5 |
| Deep Lake Toller | 6 | 2024 | caster-2-warpriest | ok | SOFT: band | ok | SOFT: rider-no-save | ok | ok | ok | ok | ok | soft (2) | 2/2 | 5/6 |
| Tolling Bell-Diver | 4 (2014) | 2014 | lurker-1-phantom | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/5 |
| Dame Oriel | 5 | 2024 | brute-5 | ok | SOFT: band | SOFT: reach | ok | ok | ok | ok | ok | ok | soft (2) | 1/1 | 1/3 |
| Gravechant Swarm | 4 (2014) | 2014 | swarm-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 4/4 |

**Dropped 4 of 35 user clauses** (coverage 89%); concept share 82% (93/114 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- lurker-1-phantom / reader: 1



---


### Druid — lowest CR

**Concept:** name: Druid | 

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Druid | 2 | caster-6 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1/4 / off 3 → 1.625; sustained 20 (2 × Verdant Wisp); nova none; dmg 20

```
Druid

Medium Humanoid, Neutral

AC 13
Initiative +1 (11)

HP 44 (8d8 + 8)

Speed 30 ft.

MOD
SAVE
STR
10
+0
+0
INT
12
+1
+3
MOD
SAVE
DEX
12
+1
+1
WIS
16
+3
+5
MOD
SAVE
CON
13
+1
+1
CHA
11
+0
+0

Skills Arcana +3, Perception +5

Senses Passive Perception 15

Languages Common, Druidic, Sylvan

CR 2 (XP 450; PB +2)

Actions

Multiattack. The druid makes two attacks, using Vine Staff or Verdant Wisp in any combination.

Verdant Wisp. Ranged Attack Roll: +5, range 90 ft. 10 (3d6) Radiant damage.

Spellcasting. The druid casts one of the following spells, using Wisdom as the spellcasting ability (spell save DC 13):

- At Will: Druidcraft, Speak with Animals
- 2/Day Each: Entangle, Thunderwave
- 1/Day Each: Animal Messenger, Longstrider, Moonbeam

Vine Staff. Melee Attack Roll: +5, reach 5 ft. 7 (1d8 + 3) Bludgeoning damage plus 2 (1d4) Poison damage.

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
- Actions/Verdant Wisp — print's own row, renamed
- Actions/Spellcasting — print's own row
- Actions/Vine Staff — print's own row; weapon staff

**Engine trace**

```
[route] caster (artillery) type=Humanoid mechanics=none — casts: implied by the kind — "Druid" | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | caster: ✓ ("Druid") | caster: no line key in the words — the model's read of its quote
[concept] resolve: archetype=caster type=Humanoid themes=verdant/arcane mind=sapient style=— energy=Poison mix=both identity=✓ lore=✓
[concept] name: provided "Druid"
[concept] mechanics: none claimed
[concept] signature elements: binding thorns and roots [behavior] | ranged druidic bolts and blasts [behavior] | hide-wrapped wild caster [body]
[concept] identity: The Druid keeps its distance and opens with Entangle-style snares, thorned bolts, and druidic blasts that root and bleed pursuers before they can close. Each round it cycles between restraining spells and repositioning behind living cover, letting its magic do the killing while it refuses to be cornered. Bloodied or interrupted mid-cast, it abandons restraint and hurls everything at the nearest threat, fighting to escape rather than to the death.
[concept] lore: A hedge-witch or exile of a broken circle, this humanoid still draws power from root, thorn, and soil, and wants only to keep the wild places it has claimed free of trespassers.
[reskin] energy withheld: Poison on a Humanoid with no Poison in the concept's own words (fixed phrases read first)
[reskin] print canon defenses: HP 38 -> 44, AC 14 -> 13 — the Druid's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon armor: 13 (studded leather) — print's Gear line; the 2014 sheet prints it (the Goblin Boss wore "splint", canaries 2026-10-12)
[reskin] print canon array: STR 10, DEX 12, CON 13, INT 12, WIS 16, CHA 11 — the Druid's at its own CR; attack +5 -> +5, DC 13 (print's)
[reskin] donor: caster-6 -> CR 2
[reskin] print canon: "Druid" is a print creature — the seats stand down; print's own rows are the composition
[reskin] claim gate: CR 2 but a Humanoid body — the trait seat stays open (print: a material body carries a trait at every tier)
[reskin] repair round 1: 2 defect(s) — name "Thorn Bolt" is a launcher but the row swings in melee — a crossbow never has reach; use a thrown weapon or a blade | "Entangle" is not on the spell menu — pick from: Detect Magic, Mage Hand, Minor Illusion, Prestidigitation, Light, Disguise Self, Invisibility, Misty Step, Fog Cloud, Darkness, Dispel Magic, Mirror Image, Blur, Hold Person, Web, Fly, Fireball, Lightning Bolt, Scorching Ray, Shatter, Magic Missile, Guiding Bolt, Mind Spike, Acid Arrow, Ice Knife, Cone of Cold, Blight, Vampiric Touch, Ray of Sickness, Thunderwave, Burning Hands, Ice Storm, Wall of Fire, Cloudkill, Fear, Sleep, Charm Person, Suggestion, Slow, Blindness/Deafness, Bestow Curse, Hypnotic Pattern
[reskin] repair round 2: 2 defect(s) — name "Thorn Bolt" is a launcher but the row swings in melee — a crossbow never has reach; use a thrown weapon or a blade | "Entangle-style restraint: use Hold Person" is not on the spell menu — pick from: Detect Magic, Mage Hand, Minor Illusion, Prestidigitation, Light, Disguise Self, Invisibility, Misty Step, Fog Cloud, Darkness, Dispel Magic, Mirror Image, Blur, Hold Person, Web, Fly, Fireball, Lightning Bolt, Scorching Ray, Shatter, Magic Missile, Guiding Bolt, Mind Spike, Acid Arrow, Ice Knife, Cone of Cold, Blight, Vampiric Touch, Ray of Sickness, Thunderwave, Burning Hands, Ice Storm, Wall of Fire, Cloudkill, Fear, Sleep, Charm Person, Suggestion, Slow, Blindness/Deafness, Bestow Curse, Hypnotic Pattern
[reskin] inline by rule: "the druid" — the call answered "the druid" (kind), which the name does not support
[reskin] inline form: "the druid" — the model's own reading of the name
[reskin] spell count backfilled — Detect Magic
[reskin] control spell gated to daily — Hold Person (level 2 control at will is print's CR 13+ shape; at CR 2 it is 1/Day)
[reskin] spell DC coherence: DC 12 -> 11 off Intelligence 12 (print's array stays)
[reskin] save dc derived: DC 12 -> 11 (8 + PB 2 + Intelligence's 1) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Druid" -> has (descriptive), head
[reskin] weapons answered: Thorn Bolt = none
[reskin] weapon declined: "Thorn Bolt" reads crossbow from its name, but the call answered none — the row carries no weapon
[reskin] weapon table: "Thorn Bolt" — a launcher, never thrown, range 80/320
[reskin] print canon speed: modes walk only — the Druid's
[reskin] print canon senses: "none" — the Druid's
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] print canon languages: "Common" -> "Common, Druidic, Sylvan" — the Druid's
[reskin] print canon row: Actions/Vine Staff — the Druid's own melee row, added (the chassis carried none to rename)
[reskin] print canon multiattack: "The druid makes two attacks, using Vine Staff or Verdant Wisp in any combination." — the Druid's own
[reskin] print canon attack: "Verdant Wisp" is print's own row — +5, 10 (3d6), range 90 ft. (an exact body at print's CR)
[reskin] print canon attack: "Thorn Bolt" -> "Verdant Wisp" — the Druid's own ranged row
[reskin] print canon: chassis row leaves — Reactions/"Protective Magic (3/Day)" is the seat's, not the Druid's
[reskin] print canon row: Actions/Spellcasting — print's own list replaces the chassis's
```


---


### Blind Scent-Stalker — a 2024 sheet

**Concept:** an eyeless hunter that tracks prey by scent alone

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Blind Scent-Stalker | 5 | lurker-5 | ok | ok | ok | ok | SOFT: lint:beast-intelligence | ok | ok | ok | ok |

- headerBody · soft · lint:beast-intelligence: type Beast with INT 12 — beasts cap at INT 8 (Giant Owl); a genius predator is a Monstrosity
- read: def 4 / off 5 → 4.5; sustained 34 (2 × Fangs); nova none; dmg 34

```
Blind Scent-Stalker

Medium Beast, Unaligned

AC 15
Initiative +3 (13)

HP 78 (12d8 + 24)

Speed 30 ft.

MOD
SAVE
STR
12
+1
+1
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
13
+1
+1
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

Skills Perception +4, Stealth +9

Senses blindsight 60 ft.; Passive Perception 14

Languages None

CR 5 (XP 1,800; PB +3)

Traits

Scent-Trail Reading. The scent-stalker knows the direction and distance to any creature it has damaged within the last 24 hours, as long as the two of them are on the same plane of existence.

Assassinate. During the first round of each combat, the scent-stalker has Advantage on attack rolls against any creature that hasn't taken a turn. If the scent-stalker hits a creature during that round, the target takes an extra 9 (2d8) Piercing damage.

Actions

Multiattack. The scent-stalker makes two Fangs attacks.

Fangs. Melee Attack Roll: +6, reach 5 ft. 17 (4d6 + 3) Piercing damage.

Bonus Actions

Umbral Step. While in Dim Light or Darkness, the scent-stalker takes the Hide action.

Locking Scent (2/Day). The scent-stalker has Advantage on the next attack roll it makes before the end of its turn.

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
- Actions/Fangs — the chassis
- Bonus Actions/Umbral Step — the chassis
- Bonus Actions/Locking Scent — library seed focus; the GM's clause "tracks prey by scent alone"; binds the GM's words: track
- Traits/Scent-Trail Reading — template faultless-tracker; library draw (seed unstamped); the GM's clause "tracks prey by scent alone"; binds the GM's words: track+tracks+tracking+scent+trail+follows
- Traits/Assassinate — template assassinate; library draw (seed unstamped)

**Engine trace**

```
[route] lurker type=Beast mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | lurker: ✓ ("tracks prey by scent alone") | lurker: no line key in the words — the model's read of its quote
[concept] name: provided_name rejected — "an eyeless hunter that tracks prey by sc…" is the description, not a name
[concept] resolve: archetype=lurker type=Beast themes=bestial/terror mind=bestial style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: tracking prey by scent alone [behavior] | eyeless scent-pitted skull [body] | hide-cloaked ambush from concealment [behavior]
[concept] identity: An eyeless hunter stalks its prey by scent alone, circling downwind and pressing itself flat and silent until the moment it can lunge from concealment for a single crushing bite at the throat or hamstring. Every round after that it breaks contact, melts back into cover, and repositions by tracking the blood-and-fear trail it has already tasted, so the fight becomes a grinding series of ambushes the prey cannot predict or outrun. It is a patient, methodical killer that does not toy and does not flee — once it has the scent, it presses until one of them is dead.
[concept] lore: Blind pack-hunters bred in lightless places where eyes were useless and noses grew to fill them, these beasts are drawn by the smell of fear and will follow a wounded traveler for days without rest.
[reskin] donor: lurker-5 -> CR 5
[reskin] row gated out: Teleport (teleport) — the concept did not claim this mechanic
[reskin] inline declared: "the scent-stalker" — the call's own answer (kind), built from the name
[reskin] inline form: "the scent-stalker" — the model's own reading of the name
[reskin] lacks asked: "eyeless"
[reskin] asked field dropped: the call answered trigger "at_will" for "tracks prey by scent alone" but offered no quote
[reskin] asked field dropped: the call answered limit "at_will" for "tracks prey by scent alone" but offered no quote
[reskin] clauses: "an eyeless hunter" -> LACKS (mechanical) | "tracks prey by scent alone" -> has (mechanical) [asked: condition]
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The stalker marks its prey by wounding it: when its bite lands, the wound keeps weeping its scent, so the creature can follow that one target unerringly for the rest of the hunt and always knows which way it fled, even through darkness, crowds, or running water." [rider/on_hit/resource] — menu: affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, isolation (+ shelf: leap, execute, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, terror-pulse, snare-bolt, slow-bolt, sensory-strike, drain, delayed-brand, zone-seed, blighted-ground, patient-defense, self-invisibility, focus, feint-slip, coating, riposte)
[reskin] signature bound to the concept's verb: action — focus, isolation (track, alone)
[reskin] rider declined: "Weeping Mark" — a rider rides the user's own attack, so it needs the user's own ask; the call offered no quote, and the key table finds no verb either (the gong's bandaged concussion, 2026-10-01)
[reskin] value check: "Predatory Focus (2/Day)" EV 2.9 vs floor 2.9 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: focus -> Bonus Actions/"Predatory Focus (2/Day)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The scent-stalker reads the air rather than sight: any creature that has been hurt or frightened leaves a trail only the stalker can follow, and it knows the direction and distance to every such creature around it, so hiding from it merely tells it where you are." [trait/always/condition] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, evasion, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, assassinate, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature bound to the concept's verb: trait — faultless-tracker (track, tracks, tracking, scent)
[reskin] word match declined by the call: uncanny-sense — the key word does not mean the mechanic here
[reskin] seat default: lurker owes assassinate by print — it seats before the idea
[reskin] signature template (trait): assassinate -> Traits/"Assassinate" ("the seat owes it by print")
[reskin] signature template (trait): faultless-tracker -> Traits/"Scent-Trail Reading" ("the stalker follows the trail of any creature that has been hurt or frightened,  [verb: track:concept, tracks:concept, tracking:concept, scent:concept, trail:idea, follows:idea]")
[reskin] weapons answered: Fangs = none
[reskin] speed by concept: dropped Climb 30 ft. — the concept's movement set decides
[reskin] row binds its clause: "Predatory Focus" answers "tracks prey by scent alone" — the keys it matched came from that clause, so the coverage credit has a receipt
[reskin] row binds its clause: "Scent-Trail Reading" answers "tracks prey by scent alone" — the keys it matched came from that clause, so the coverage credit has a receipt
audit finding below confidence gate: Scent-Trail Reading The knowledge persists after damage with no mention of scent contact and provides an effect (direction and distance to any damaged creature anywhere on the plane) whose tracking the GM has no rules beyond damage within the last 24 hours.
[reskin] audit rename: "Predatory Focus (2/Day)" -> "Locking Scent (2/Day)"
```


---


### Drowned Supplicant — a print donor

**Concept:** a mournful ghost that drifts through the walls of the drowned chapel

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Drowned Supplicant | 5 | lurker-5-phantom | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1/4 / off 5 → 2.625; sustained 38 (2 × Withering Touch); nova none; dmg 38

```
Drowned Supplicant

Medium Undead, Neutral

AC 11
Initiative +1 (11)

HP 45 (10d8)

Speed 5 ft., Fly 40 ft. (hover), Swim 30 ft.

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
+4
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

Skills Stealth +4

Resistances Acid, Bludgeoning, Cold, Fire, Lightning, Piercing, Slashing, Thunder

Immunities Necrotic, Poison; Charmed, Exhaustion, Frightened, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained

Senses darkvision 60 ft.; Passive Perception 11

Languages Common plus one other language

CR 5 (XP 1,800; PB +3)

Traits

Chapel Haunt. While inside the drowned chapel, Supplicant can move through the chapel's walls and partitions as if they were Difficult Terrain, taking 9 (2d8) Force damage if it ends its turn inside one.

Incorporeal Movement. The supplicant can move through other creatures and objects as if they were Difficult Terrain. It takes 5 (1d10) Force damage if it ends its turn inside an object.

Sunlight Sensitivity. While in sunlight, the supplicant has Disadvantage on ability checks and attack rolls.

Ethereal Sight. The supplicant can see 60 feet into the Ethereal Plane when it is on the Material Plane.

Actions

Multiattack. The supplicant makes two Withering Touch attacks. It can replace one attack with a use of Horrific Visage.

Withering Touch. Melee Attack Roll: +6, reach 5 ft. 19 (3d10 + 3) Necrotic damage.

Horrific Visage. Wisdom Saving Throw: DC 14, each creature in a 60-foot Cone that can see the supplicant and isn't an Undead. Failure: 10 (2d6 + 3) Psychic damage, and the target has the Frightened condition until the start of the supplicant's next turn. Success: The target is immune to this ghost's Horrific Visage for 24 hours.

Possession (Recharge 6). Charisma Saving Throw: DC 14, one Humanoid the supplicant can see within 5 feet. Failure: The target is possessed by the supplicant; the supplicant disappears, and the target has the Incapacitated condition and loses control of its body. The supplicant now controls the body, but the target retains awareness. The supplicant can't be targeted by any attack, spell, or other effect, except ones that specifically target Undead. The supplicant's game statistics are the same, except it uses the possessed target's Speed, as well as the target's Strength, Dexterity, and Constitution modifiers.
The possession lasts until the body drops to 0 Hit Points or the supplicant leaves as a Bonus Action. When the possession ends, the supplicant appears in an unoccupied space within 5 feet of the target, and the target is immune to this ghost's Possession for 24 hours. Success: The target is immune to this ghost's Possession for 24 hours.

Etherealness. The supplicant casts the Etherealness spell, requiring no spell components and using Charisma as the spellcasting ability. The supplicant is visible on the Material Plane while on the Border Ethereal and vice versa, but it can't affect or be affected by anything on the other plane.

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

- Traits/Chapel Haunt — authored for this sheet; the GM's clause "drifts through the walls of the drowned chapel"
- Traits/Incorporeal Movement — the chassis
- Traits/Sunlight Sensitivity — the chassis
- Traits/Ethereal Sight — print's own row
- Actions/Multiattack — the chassis
- Actions/Withering Touch — print's own row, renamed
- Actions/Horrific Visage — print's own row
- Actions/Possession — print's own row
- Actions/Etherealness — print's own row

**Engine trace**

```
[route] lurker-phantom type=Undead mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | lurker-phantom: ✓ ("a mournful ghost that drifts through the") | lurker-phantom: key "drifts" (class verb)
[concept] name: provided_name rejected — "a mournful ghost that drifts through the…" is the description, not a name
[concept] hints: phantom→style ✓ ("a mournful ghost")
[concept] resolve: archetype=lurker type=Undead themes=grave/aquatic mind=sapient style=phantom energy=Necrotic mix=energy identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: drifting through drowned walls [behavior] | life-draining chill [aura] | sorrowful weeping [behavior]
[concept] identity: The ghost opens a fight by weeping through the chapel's flooded walls, then lunges from an unforeseen angle to siphon the warmth from a living throat, dragging its victim's strength into the cold water. Each round it drifts back through stone and flood, bleeding vitality and forcing prey to pursue it into deeper drowned dark. It is grief-stricken rather than cruel — it fights relentlessly while its sorrow holds, but recoils from bright light and will slip away through the walls if the living prove too radiant to bear.
[concept] lore: It is the drowned supplicant of a chapel swallowed by the rising water, a soul that never received burial and now wades the flooded nave seeking any living warmth to replace the one it lost.
[reskin] print canon pb: print's +5 on PB +2 reads +6 on this sheet's PB +3; DCs follow
[reskin] print canon defenses: HP 68 -> 45, AC 13 -> 11 — the Ghost's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 7, DEX 13, CON 10, INT 10, WIS 12, CHA 17 — the Ghost's at its own CR; attack +6 -> +6, DC 14 (print's, on this sheet's PB)
[reskin] donor: lurker-5-phantom -> CR 5
[reskin] print canon: "a mournful ghost that drifts through the walls of the drowned chapel" heads on the Ghost — print's rows ride along; the seat stays
[reskin] inline declared: "the supplicant" — the call's own answer (kind), built from the name; the rules would have said "Supplicant"
[reskin] inline on kit rows: "Supplicant" -> "the supplicant"
[reskin] inline form: "the supplicant" — the model's own reading of the name
[reskin] save dc derived: DC 13 -> 14 (8 + PB 3 + the sheet's best 3) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] asked field dropped: the call answered trigger "at_will" for "drifts through the walls of the drowned chapel" but offered no quote
[reskin] asked field dropped: the call answered limit "at_will" for "drifts through the walls of the drowned chapel" but offered no quote
[reskin] clauses: "a mournful ghost" -> has (descriptive), head | "drifts through the walls of the drowned chapel" -> has (mechanical) [asked: movement]
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The supplicant sinks into the flooded walls and drifts to a new point, then reaches out of the stone with a clawing hand at whichever living creature is nearest — ideally one already chilled by its touch. The lunge siphons warmth where it lands, leaving the victim colder and slower to act, its strength seeping toward the waiting water." [rider/on_hit/condition] — menu: affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, isolation (+ shelf: leap, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, terror-pulse, snare-bolt, slow-bolt, sensory-strike, drain, delayed-brand, zone-seed, blighted-ground, patient-defense, self-invisibility, focus, feint-slip, coating, riposte)
[reskin] word match declined by the call: drain — the key word does not mean the mechanic here
[reskin] fit declined: "Sinking Chill" — a print body takes only what the user's words ask; the call offered no quote, and the key table finds no verb either (the blacksmith's rally, critic-ten 2026-10-01)
[reskin] fallback respects the call: drain left the shelf — the call declined it for this sheet
[reskin] fallback stands down: "a mournful ghost that drifts through the walls of the drowned chapel" heads on the Ghost and asks for nothing — print's rows, nothing invented (the big ogre, critic-ten 2026-10-01)
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "Living warmth is pulled from anyone whose flesh its claws have already chilled: grief-stricken, it drains a sliver of life from any creature near it that has been touched by its chill, and that stolen vitality keeps it fighting long past where a ghost should falter." [trait/start_of_turn/damage] — menu: fire-aura, warded-mending (+ shelf: heated-body, false-appearance, absorption, bloodied-burst, resonant-body, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, evasion, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] word match declined by the call: heated-body, fire-aura, warded-mending — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "Living warmth is pulled from anyone whose flesh its claws have already chilled: grief-stricken, it drains a sliver of life from any creature near it that has been touched by its chill, and that stolen vitality keeps it fighting long past where a ghost should falter." [trait/start_of_turn/damage] — the model found no template that holds it (offered: fire-aura, warded-mending, heated-body)
[reskin] repair: 1 clause(s) with no row — "drifts through the walls of the drowned chapel"; one targeted call with the sheet as context
[reskin] repaired sheet: 1 attack row(s), 0 save, 1 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] weapons answered: Bone Claw = none
[reskin] speed by concept:  — the concept's movement set decides
[reskin] languages by mind: "None" -> "Common plus the languages it knew in life" (sapient)
[reskin] print canon languages: "Common plus the languages it knew in life" -> "Common plus one other language" — the Ghost's
[reskin] print canon speed: Fly -> 40 ft. — the Ghost's own
[reskin] print canon attack: "Bone Claw" -> "Withering Touch" — the Ghost's own row
[reskin] immunities stamped for type: Undead + donor suite -> Poison; Charmed, Exhaustion, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained
[reskin] print canon defenses: immunities Poison; Charmed, Exhaustion, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained -> Necrotic, Poison; Charmed, Exhaustion, Frightened, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained; resistances none -> Acid, Bludgeoning, Cold, Fire, Lightning, Piercing, Slashing, Thunder — the Ghost's own header lines
[reskin] resistances derived withheld: print's Ghost owns the line (Acid, Bludgeoning, Cold, Fire, Lightning, Piercing, Slashing, Thunder)
[reskin] print canon trait: Ethereal Sight — "a mournful ghost that drifts through the walls of the drowned chapel" is the Ghost (print's own row)
[reskin] print canon row: Actions/Horrific Visage — the Ghost's own
[reskin] print canon row: Actions/Possession (Recharge 6) — the Ghost's own
[reskin] print canon row: Actions/Etherealness — the Ghost's own
[reskin] vulnerability rejected — "Radiant" has no warrant in the concept's own text (print's default is none)
[reskin] multiattack replacement clause: It can replace one attack with a use of Horrific Visage.
[reskin] audit rewrite blocked — "Possession (Recharge 6)" is engine-authored chassis text
[reskin] audit rewrite blocked — "Etherealness" is engine-authored chassis text
```


---


### Cold Lamp Widow — a homebrew with a nova

**Concept:** a lamplighter's widow who still walks her round, trailing cold

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Cold Lamp Widow | 3 | lurker-1-phantom | ok | SOFT: aim-hp | ok | ok | ok | ok | ok | ok | FAIL: no-type-in-name |

- bands · soft · aim-hp: HP 44 is 27% under the card's 60
- reader · fail · no-type-in-name: Actions/Shroud of the Cold Lamp: the name carries Cold the text does not deal
- read: def 2 / off 3 → 2.5; sustained 24 (1 × Chill Hand); nova none; dmg 24

```
Cold Lamp Widow

Medium Undead, Neutral

AC 12
Initiative +3 (13)

HP 44 (8d8 + 8)

Speed 5 ft., Fly 50 ft. (hover)

MOD
SAVE
STR
1
-5
-5
INT
10
+0
+0
MOD
SAVE
DEX
16
+3
+5
WIS
10
+0
+0
MOD
SAVE
CON
13
+1
+1
CHA
11
+0
+0

Skills Stealth +5

Resistances Bludgeoning, Cold, Piercing, Slashing

Immunities Poison; Charmed, Exhaustion, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained

Senses darkvision 60 ft.; Passive Perception 10

Languages Common plus the languages it knew in life

CR 3 (XP 700; PB +2)

Traits

Incorporeal Movement. The widow can move through other creatures and objects as if they were Difficult Terrain. It takes 5 (1d10) Force damage if it ends its turn inside an object.

Sunlight Sensitivity. While in sunlight, the widow has Disadvantage on ability checks and attack rolls.

Actions

Chill Hand. Melee Attack Roll: +5, reach 5 ft. 24 (6d6 + 3) Cold damage.

Shroud of the Cold Lamp (2/Day). Wisdom Saving Throw: DC 13, each creature of the widow's choice within 30 feet that can see or hear it. Failure: The target has the Frightened condition until the end of its next turn.

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

- Traits/Incorporeal Movement — the chassis
- Traits/Sunlight Sensitivity — the chassis
- Actions/Chill Hand — the chassis
- Actions/Shroud of the Cold Lamp — library seed terror-pulse

**Engine trace**

```
[route] lurker-phantom type=Undead mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | lurker-phantom: ✓ ("still walks her round, trailing cold") | lurker-phantom: no line key in the words — the model's read of its quote
[concept] resolve: archetype=lurker type=Undead themes=grave/grasping mind=sapient style=phantom energy=Cold mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: walking the lamplit round and extinguishing the lamps [behavior] | trailing cold that drains the living [aura] | an incorporeal widow's shadow [body]
[concept] identity: The widow drifts through the dark between streetlamps, trailing a wake of cold that pools in the air behind her, and opens a fight by drifting up beside a living soul to drink its warmth until the body gives out. Each round she keeps pace with the one she has marked, passing through walls and hedges that her victim cannot, and she never closes in a straight line or a hurry, letting the lamps die one by one. Under pressure she slips away from any lit flame, retreats into darkness to let wounds close, and returns patiently, toying with her prey rather than fleeing for good.
[concept] lore: She was a lamplighter's widow who walked her husband's round faithfully after her death, and now she keeps it still, extinguishing every flame whose warmth she cannot take back.
[reskin] donor: lurker-1-phantom -> CR 3
[reskin] inline declared: "the widow" — the call's own answer (kind), built from the name
[reskin] inline form: "the widow" — the model's own reading of the name
[reskin] save dc derived: DC 12 -> 13 (8 + PB 2 + the sheet's best 3) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a lamplighter's widow" -> has (descriptive), head | "still walks her round" -> has (descriptive) | "trailing cold" -> has (descriptive)
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The widow drifts her round and snuffs a light she can see, a lantern, torch, or campfire, and the sudden dark pours its stolen warmth into her own flagging body, patching her wounds. If nothing is lit to take, she instead lays a clinging chill on one living creature near her that the light can no longer reach, so their warmth seeps out more slowly each passing moment." [action/save/damage] — menu: leap, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, terror-pulse, snare-bolt, slow-bolt, sensory-strike, drain, zone-seed, blighted-ground (+ shelf: delayed-brand, patient-defense, self-invisibility, focus, feint-slip, coating, riposte, charge-push, hook-rider, pounce, isolation)
[reskin] signature bound to the concept's verb: action — slow-bolt, patient-defense (cold, still)
[reskin] word match declined by the call: lure, sensory-strike — the key word does not mean the mechanic here
[reskin] signature miss: action — "The widow drifts her round and snuffs a light she can see, a lantern, torch, or campfire, and the sudden dark pours its stolen warmth into her own flagging body, patching her wounds. If nothing is lit to take, she instead lays a clinging chill on one living creature near her that the light can no longer reach, so their warmth seeps out more slowly each passing moment." [action/save/damage] — the model picked "drain" (no verb, and it quotes nothing the GM typed) over a concept-verb template (slow-bolt, patient-defense)
[reskin] fallback respects the call: lure, sensory-strike left the shelf — the call declined them for this sheet
[reskin] fallback skipped by the floor: slow-bolt (EV 3.2 vs 12)
[reskin] fallback skipped by the floor: patient-defense (EV 0 vs 3.7)
[reskin] value check: "Horrid Display (2/Day)" EV 25.3 vs floor 19.4 (the whole Multiattack (1 attacks)) — worth the trade
[reskin] library seed drawn: terror-pulse -> Actions/"Horrid Display (2/Day)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Warmth is her business: when she strikes or drifts close to a living soul, the heat leaches out of them and pools in the air behind her, so anyone who lingers in her wake finds their own body cooling and their strength withering, while she takes that stolen warmth and lets it close her wounds." [trait/always/damage] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, evasion, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature bound to the concept's verb: trait — false-appearance, faultless-tracker (still, trail)
[reskin] word match declined by the call: false-appearance, faultless-tracker, aberrant-ground, heated-body, relentless-pursuit, bound, marking-light — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit" after being shown false-appearance, faultless-tracker, which the GM's words keyed
[reskin] key match declined: trait — "false-appearance" was ranked first on the call's own menu for still, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: trait — "Warmth is her business: when she strikes or drifts close to a living soul, the heat leaches out of them and pools in the air behind her, so anyone who lingers in her wake finds their own body cooling and their strength withering, while she takes that stolen warmth and lets it close her wounds." [trait/always/damage] — the model found no template that holds it (offered: false-appearance, faultless-tracker, adhesive, phobia, terrain-walk, aberrant-ground, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, evasion, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst, heated-body, bloodied-burst)
[reskin] weapons answered: Chill Hand = none
[reskin] languages by mind: "None" -> "Common plus the languages it knew in life" (sapient)
[reskin] immunities stamped for type: Undead + donor suite -> Poison; Charmed, Exhaustion, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained
[reskin] resistances derived: Bludgeoning, Cold, Piercing, Slashing
[reskin] vulnerability rejected — "Fire" has no warrant in the concept's own text (print's default is none)
[reskin] audit rename: "Horrid Display (2/Day)" -> "Shroud of the Cold Lamp (2/Day)"
```


---


### Expelled Staff Wizard — bands soft

**Concept:** a wizard but he cannot cast any spells, he just hits people with his staff

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Expelled Staff Wizard | 3 | caster-6 | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 1.625 (print at 3 reads 0.375–5, n=83)
- read: def 1/4 / off 3 → 1.625; sustained 24 (2 × Staff); nova none; dmg 24

```
Expelled Staff Wizard

Medium Humanoid, Neutral

AC 14
Initiative +2 (12)

HP 49 (11d8)

Speed 30 ft.

MOD
SAVE
STR
16
+3
+3
INT
17
+3
+5
MOD
SAVE
DEX
14
+2
+2
WIS
12
+1
+3
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

Skills Arcana +5, Perception +3

Senses Passive Perception 13

Languages Common and any three languages

CR 3 (XP 700; PB +2)

Actions

Multiattack. The staff wizard makes two Staff attacks.

Staff. Melee Attack Roll: +5, reach 5 ft. 12 (2d8 + 3) Bludgeoning damage, and the target is subjected to the following effect. Strength Saving Throw: DC 13. Failure: The target has the Prone condition.

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
- Actions/Staff — authored for this sheet; a named part; a declared feature; the GM's clause "he just hits people with his staff"; weapon staff

**Engine trace**

```
[route] brute type=Humanoid mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | brute: ✓ ("he just hits people with his staff") | brute: no line key in the words — the model's read of its quote
[concept] name: provided_name rejected — "a wizard but he cannot cast any spells, …" is the description, not a name
[concept] resolve: archetype=brute type=Humanoid themes=armed/uncanny mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: bludgeoning staff strikes [object] | spell-less wizard who fights in melee [behavior] | offended scholarly fury [behavior]
[concept] identity: The Staff Wizard wades into melee without a single spell prepared, opening with a two-handed overhead swing of his gnarled oak staff that cracks ribs and knocks shields aside. Every round after that he stays in reach, trading blows and landing quick jabbing thrusts between windups, grunting with scholarly fury rather than casting anything. Under pressure he only swings harder and refuses to disengage, fighting to the death out of sheer offended dignity at being underestimated.
[concept] lore: A failed arcane apprentice expelled from his academy, he kept the robes, the staff, and the grudge, and now teaches practical combat lessons to anyone who mistakes a wizard's hat for a wizard.
[reskin] print canon route: the Mage casts and strikes only with magic (Force) — the caster family takes the line from brute, so the attack bonus and the spell DC key to one stat
[reskin] print canon array: STR 16, DEX 14, CON 11, INT 17, WIS 12, CHA 11 — the Mage's, STR fitted to +5
[reskin] donor: caster-6 -> CR 3
[reskin] print canon: "a wizard but he cannot cast any spells, he just hits people with his staff" heads on the Mage — print's rows ride along; the seat stays
[reskin] named parts: Staff (slot) — the user's words, the engine's numbers
[reskin] named parts landed: 1 attack row(s), 0 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] class kit: Protective Magic — the sheet already carries it, so the mage kit adopts that row: the cap may no longer read it as filler
[reskin] class kit: mage — "a wizard": nothing to add — the sheet already answers it
[reskin] inline declared: "the staff wizard" — the call's own answer (kind), built from the name
[reskin] inline form: "the staff wizard" — the model's own reading of the name
[reskin] spell DC coherence: DC 12 -> 13 off Intelligence 17 (the stat makes the attack rolls)
[reskin] lacks asked: "cannot cast any spells"
[reskin] clauses: "a wizard" -> has (descriptive), head | "he cannot cast any spells" -> LACKS (mechanical) | "he just hits people with his staff" -> has (mechanical) [asked: attack]
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "When his attack knocks a foe off their feet, he follows the stumble with a savage downward chop instead of a clean second strike, roaring about wasted tuition. The same swing lands harder the more times this same opponent has already been dropped by him in this fight, as he memorizes their balance like a lecture he refuses to fail twice. He can only muster this follow-up so often before the anger " [rider/on_hit/damage] — menu: EMPTY (+ shelf: gaze-single, snare, condition-payoff, zone, execute, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, snare-bolt, slow-bolt, sensory-strike, herd, thrown-burst-seed, drain, delayed-brand, curse-debt, zone-seed, reveal, wind-up, blighted-ground, lay-on-hands, aggro-curse, self-invisibility, rally)
[reskin] signature re-seated: action — no rider shares the verb; the idea "When his attack knocks a foe off their feet, he follows the …" is tried as an action
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "When his attack knocks a foe off their feet, he follows the stumble with a savage downward chop instead of a clean second strike, roaring about wasted tuition. The same swing lands harder the more times this same opponent has already been dropped by him in this fight, as he memorizes their balance like a lecture he refuses to fail twice. He can only muster this follow-up so often before the anger " [action/save/damage] — menu: gaze-single, snare, condition-payoff, zone, execute, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, snare-bolt, slow-bolt, sensory-strike, herd, thrown-burst-seed, drain, curse-debt, zone-seed, reveal, wind-up, blighted-ground (+ shelf: delayed-brand, lay-on-hands, aggro-curse, self-invisibility, rally)
[reskin] signature miss: action — "When his attack knocks a foe off their feet, he follows the stumble with a savage downward chop instead of a clean second strike, roaring about wasted tuition. The same swing lands harder the more times this same opponent has already been dropped by him in this fight, as he memorizes their balance like a lecture he refuses to fail twice. He can only muster this follow-up so often before the anger " [action/save/damage] — no template on the shelf shares a verb with the concept or the idea (offered: gaze-single, snare, condition-payoff, zone, execute, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, snare-bolt, slow-bolt, sensory-strike, herd, thrown-burst-seed, drain, curse-debt, zone-seed, reveal, wind-up, blighted-ground, delayed-brand, lay-on-hands, aggro-curse, self-invisibility, rally)
[reskin] fallback stands down: "a wizard but he cannot cast any spells, he just hits people with his staff" heads on the Mage and asks for nothing — print's rows, nothing invented (the big ogre, critic-ten 2026-10-01)
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "Every time he is struck, his outrage mounts and his swings come down heavier and wilder until they connect, then the insult is repaid and the fury resets. The grudge fuels his arm, not his safety — he grows more dangerous the longer the fight drags, never tougher." [trait/on_being_hit/damage] — menu: absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst)
[reskin] trait declined: "Grudge-Fueled Fury" — bound only on the idea's own words (fury:idea) with no key in the concept; a meat body earns its trait by the user's verb (the sniper's tracker, critic 2026-09-29)
[reskin] weapons answered: Staff Bash = quarterstaff
[reskin] print canon languages: "Common" -> "Common and any three languages" — the Mage's
[reskin] print canon row: Actions/Spellcasting — print's own list replaces the chassis's
[reskin] print canon row: Bonus Actions/Misty Step (3/Day) — the Mage's own
[reskin] save re-derived after a retype: Actions/Staff — a Constitution save for an effect that calls for Strength or Dexterity; the save follows the condition
audit finding below confidence gate: Staff The Prone condition's only exit is standing up, which costs half the target's movement and provokes opportunity attacks; the off-turn save clause is awkwardly bolted onto the attack with no clear timing for when the save is rolled, but Prone's own exit clause satisfies counterplay.
[reskin] lacks clause: Actions/"Spellcasting" leaves — "he cannot cast any spells"
[reskin] dead wildcard name swept — "Misty Step (3/Day)" was only about "Spellcasting"; the row drops
[reskin] lacks clause: Reactions/"Protective Magic (3/Day)" leaves — "he cannot cast any spells"
```


---


### Deep Lake Toller — bands soft

**Concept:** a kuo-toa priest who drags swimmers under the ice

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Deep Lake Toller | 6 | caster-2-warpriest | ok | SOFT: band | ok | SOFT: rider-no-save | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 4 (print at 6 reads 3–8.5, n=42)
- gates · soft · rider-no-save: Actions/Net: a Restrained rider on every hit with no save
- read: def 2 / off 6 → 4; sustained 44 (2 × Spear); nova none; dmg 44

```
Deep Lake Toller

Medium Humanoid, Neutral Evil

AC 14
Initiative +0 (10)

HP 91 (14d8 + 28)

Speed 30 ft., Swim 30 ft.

MOD
SAVE
STR
18
+4
+4
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
16
+3
+6
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

Skills Perception +6, Religion +6

Senses Passive Perception 16

Languages Common, Deep Speech

CR 6 (XP 2,300; PB +3)

Traits

Amphibious. The toller can breathe air and water.

Actions

Multiattack. The toller makes two attacks, using Spear or Net in any combination. It can replace one attack with a use of (A) Reeling Spear or (B) Spellcasting to cast Ice Knife.

Spear. Melee or Ranged Attack Roll: +7, reach 5 ft. or range 20/60 ft. 22 (4d8 + 4) Piercing damage, and the target has Disadvantage on its next attack roll before the start of the toller's next turn.

Net. Ranged Attack Roll: +7, range 5/15 ft. If the target is Large or smaller, it has the Restrained condition until it escapes (escape DC 15)., and the target has the Restrained condition until the end of its next turn.

Spellcasting. The toller casts one of the following spells, requiring no Material components and using Wisdom as the spellcasting ability (spell save DC 14, +6 to hit with spell attacks):

- At Will: Ice Knife, Fog Cloud, Light
- 1/Day Each: Cone of Cold

Reeling Spear. Strength Saving Throw: DC 14, one creature within 30 feet. Failure: The target is pulled up to 25 feet straight toward the toller by the barbed spear and has the Grappled condition (escape DC 15).

Bonus Actions

Divine Aid (3/Day). The toller casts Bless, Dispel Magic, Healing Word, or Lesser Restoration, using the same spellcasting ability as Spellcasting.

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
- Actions/Spear — authored for this sheet; a named part; a declared feature; the GM's clause "fights with net and spear priest"; weapon spear
- Actions/Net — authored for this sheet; a named part; the GM's clause "fights with net and spear priest"; weapon net
- Actions/Spellcasting — the chassis
- Actions/Reeling Spear — template hook-drag; library draw (seed unstamped); the GM's clause "drags swimmers under the ice"; binds the GM's words: drag+under+haul
- Bonus Actions/Divine Aid — cleric kit; the GM's clause "a fish-headed humanoid cultist of the deep"
- Traits/Amphibious — print's own row

**Engine trace**

```
[route] pi alias: "kuo-toa" → "a fish-headed humanoid cultist of the deep who fights with net and spear"
[route] caster-warpriest (artillery) type=Humanoid mechanics=snare, grapple — casts: implied by the kind — "cultist of the deep who fights with net " | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: on the GM's own words "drags swimmers under the ice" | skirmisher-hurler: ✓ ("fights with net and spear") | caster-warpriest: "priest" is a noun (a title), not a verb — no override | skirmisher-hurler -> caster-warpriest: the user's own word "priest" (class noun) outranks a pick quoted from the alias text | caster-warpriest: key "priest" (class noun)
[concept] hints: engulf→mechanics ✓ ("drags swimmers under")
[concept] resolve: archetype=caster type=Humanoid themes=aquatic/grave mind=sapient style=warpriest energy=Cold mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: snare, grapple
[concept] signature elements: net and spear that pin and drag prey under the ice [behavior] | fish head on a human body slick with brine [body] | priest of the drowned deep [behavior]
[concept] identity: A brine-soaked fish-headed priest opens combat by hurling its weighted net to pin a foe, then closes with a barbed spear that carries the cold of the deep. Every round it works to hook and drag the entangled target toward open water or thin ice, harrying rather than dueling, and once bloodied it does not flee but dives beneath the surface to keep striking from below the ice where it holds every advantage.
[concept] lore: Born of a drowned congregation that worshipped what waits beneath the winter lake, the fish-headed priest drags the living through the ice so they can join the flock below, where it believes the faithful never stop breathing.
[reskin] pi alias: "kuo-toa" → "a fish-headed humanoid cultist of the deep who fights with net and spear"
[reskin] pi alias: "kuo-toa" → "a fish-headed humanoid cultist of the deep who fights with net and spear"
[reskin] donor: caster-2-warpriest -> CR 6
[reskin] name_element answered: Rime Bolt = literal; Drowning Net = imagery
[reskin] named parts: Net (slot, Restrained, ranged), Spear (slot) — the user's words, the engine's numbers
[reskin] named parts landed: 2 attack row(s), 0 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] class kit: cleric — "a fish-headed humanoid cultist of the deep": Divine Aid (3/Day) (Priest/Divine Aid)
[reskin] inline declared: "the toller" — the call's own answer (kind), built from the name
[reskin] inline form: "the toller" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] asked field dropped: the call answered trigger "at_will" for "fights with net and spear priest" but offered no quote
[reskin] asked field dropped: the call answered trigger "at_will" for "drags swimmers under the ice" but offered no quote
[reskin] clauses: "a fish-headed humanoid cultist of the deep" -> has (descriptive), head | "fights with net and spear priest" -> has (mechanical) [asked: condition] | "drags swimmers under the ice" -> has (mechanical) [asked: movement]
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The toller plants its barbed spear in a foe it has already snared and heaves, hauling the tangled creature several strides back toward itself and toward the water's edge, then drags it down beneath the surface with the line. If the prey cannot break free of the net, it is towed under the ice and held there at the toller's mercy." [rider/on_hit/movement] — menu: bolt-restrain, bolt-drag, bolt-mark (+ shelf: condition-payoff, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, snare-bolt, slow-bolt, sensory-strike, herd, drain, delayed-brand, curse-debt, zone-seed, reveal, wind-up, blighted-ground, hook-drag, lay-on-hands, aggro-curse, self-invisibility, rally, snap-shot)
[reskin] signature bound to the concept's verb: action — hook-drag (drag, under)
[reskin] value check: "Reeling Spear" EV 11.6 vs floor 10.9 (one attack of 2) — worth the trade
[reskin] signature template: hook-drag -> Actions/"Reeling Spear" ("the toller plants its spear in a snared foe and heaves, hauling the tangled crea [verb: drag:concept, under:concept, haul:idea]")
[reskin] keys spent by the action: drag, under
[reskin] signature idea (trait): "Its brine-slick fish skin sheds grip: nets, grapples, and clinging hands find no purchase on the toller, and any creature that tries to seize or restrain it slips free at the start of its turn, leaving the grabber off balance." [trait/always/defense] — menu: false-appearance, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] signature bound to the concept's verb: trait — terrain-walk (ice)
[reskin] word match declined by the call: terrain-walk, aberrant-ground — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit" after being shown terrain-walk, which the GM's words keyed
[reskin] key match declined: trait — "terrain-walk" was ranked first on the call's own menu for ice, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: trait — "Its brine-slick fish skin sheds grip: nets, grapples, and clinging hands find no purchase on the toller, and any creature that tries to seize or restrain it slips free at the start of its turn, leaving the grabber off balance." [trait/always/defense] — the model found no template that holds it (offered: terrain-walk, false-appearance, phobia, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst)
[reskin] weapons answered: Barbed Spear = spear; Rime Bolt = none; Drowning Net = none
[reskin] weapon table: "Net" — thrown, range 5/15
[reskin] amphibious by concept: a creature of the deep breathes both (print: the Sea Hag's)
[reskin] languages by mind: "Deep Speech" -> "Common, Deep Speech" (sapient)
[reskin] defenses by material: a ice body is vulnerable to Fire and never resists, absorbs, or ignores it — the resistance is withheld; the vulnerability is the GM's to type (the Frostmaw carried a Fire vulnerability nobody typed — the critic's second species read)
[reskin] vulnerability rejected — "Fire" has no warrant in the concept's own text (print's default is none)
[reskin] multiattack replacement clause: It can replace one attack with a use of (A) Reeling Spear or (B) Spellcasting to cast *Ice Knife*.
[reskin] darkvision withheld: a Humanoid with no species kit granting it, no word for it in the GM's own text, and no print body that has it — print gives darkvision to 1 of 26 Humanoids ("darkvision 60 ft.; Passive Perception 16" -> "Passive Perception 16")
[reskin] row binds its clause: "Reeling Spear" answers "drags swimmers under the ice" — the keys it matched came from that clause, so the coverage credit has a receipt
[reskin] escape dc: Net, Reeling Spear → DC 15 (8 + PB + STR; a late row wore another number)
```


---


### Dame Oriel — bands soft

**Concept:** name: Dame Oriel | 

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Dame Oriel | 5 | brute-5 | ok | SOFT: band | SOFT: reach | ok | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 3.5 (print at 5 reads 2–8.5, n=52)
- structure · soft · reach: Actions/Greatsword: reach 10 on a Medium body with no tether word
- read: def 2 / off 5 → 3.5; sustained 34 (2 × Greatsword); nova none; dmg 34

```
(not the page capture — the card capture came back empty; drawn from the saved JSON)
Dame Oriel
Medium Humanoid, Neutral
AC 14
HP 97 (13d8 + 39)
Speed 30 ft.
STR 16 DEX 8 CON 16 INT 6 WIS 10 CHA 6
Skills Athletics +6, Perception +3
Senses Passive Perception 13
Languages Common
CR 5

Actions
Multiattack. Dame Oriel makes two attacks, using Greatsword or Thrown Blade in any combination.
Greatsword. *Melee Attack Roll:* +6, reach 10 ft. 17 (4d6 + 3) Slashing damage.
Thrown Blade. *Ranged Attack Roll:* +6, range 60/240 ft. 16 (3d8 + 3) Piercing damage.

Bonus Actions
Pursuing Strike (1/Day). Immediately after dealing damage to a creature that is already Bloodied, Dame Oriel moves up to half its Speed, and it makes one Greatsword attack.
```

**Where each row came from**

- Actions/Multiattack — the chassis
- Actions/Greatsword — weapon greatsword
- Actions/Thrown Blade — weapon dagger
- Bonus Actions/Pursuing Strike — library seed rampage

**Engine trace**

```
[route] brute type=Humanoid mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | brute: ✓ ("Dame Oriel") | brute: no line key in the words — the model's read of its quote
[concept] resolve: archetype=brute type=Humanoid themes=armed/forged mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: provided "Dame Oriel"
[concept] mechanics: none claimed
[concept] signature elements: challenge and duel [behavior] | living iron plate [body] | greatsword [object]
[concept] identity: Dame Oriel announces her challenge in a voice that carries across the field, then wades in with a great iron greatsword, trading blow for blow and aiming to break the most dangerous foe first. She never retreats and never hurries, absorbing punishment as she closes, and toys with weaker opponents by disarming them before delivering a killing stroke.
[concept] lore: Once a celebrated champion of a forgotten order, Dame Oriel was bound into her own plate as a living monument to martial pride and now seeks any challenger worthy of breaking her centuries-long boredom.
[reskin] donor: brute-5 -> CR 5
[reskin] implied class kept: "fighter" on the GM's own words "dame oriel" — the key table found none
[reskin] class kit: riposte — the sheet cannot carry it here (role, CR band, movement or a denial)
[reskin] class kit: fighter — "dame oriel": nothing to add — the sheet already answers it
[reskin] proper noun: "Dame Oriel" — the Name field is a person, not a kind (no print match, no article in the words)
[reskin] inline declared: "Dame Oriel" — the call's own answer (person), built from the name
[reskin] save dc derived: DC 13 -> 14 (8 + PB 3 + the sheet's best 3) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Dame Oriel" -> has (descriptive), head
[reskin] signature idea (action): "Dame Oriel issues a ringing challenge to the foe she deems the greatest threat; a moment later she surges toward that foe, and until the duel resolves one way or the other nothing else on the field can land a clean blow on her while she is squared off with her chosen opponent. She ignores everyone else to get there, and the challenge only ends when her chosen foe is down or she herself is." [bonus_action/once_per_fight/condition] — menu: rampage, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating (+ shelf: trample, leap, throw-retrieve, shield-bash, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, charge)
[reskin] word match declined by the call: active-toll, aggro-curse — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit"
[reskin] signature miss: action — "Dame Oriel issues a ringing challenge to the foe she deems the greatest threat; a moment later she surges toward that foe, and until the duel resolves one way or the other nothing else on the field can land a clean blow on her while she is squared off with her chosen opponent. She ignores everyone else to get there, and the challenge only ends when her chosen foe is down or she herself is." [bonus_action/once_per_fight/condition] — the model found no template that holds it (offered: rampage, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, active-toll)
[reskin] fallback respects the call: aggro-curse left the shelf — the call declined it for this sheet
[reskin] fallback skipped by the floor: herd (EV 7 vs 30.4)
[reskin] value check: "Rampage (1/Day)" EV 15.2 vs floor 2.9 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: rampage -> Bonus Actions/"Rampage (1/Day)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Her plate is a living monument, and it answers for her: whenever a blow lands on the armor, some of that force turns back on the one who struck her and the wound itself seems dimmer for it. She cannot be disarmed or shoved off her feet while she still stands in her plate." [trait/on_being_hit/damage] — menu: absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] word match declined by the call: weapon-lodge, resonant-body, absorption — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "Her plate is a living monument, and it answers for her: whenever a blow lands on the armor, some of that force turns back on the one who struck her and the wound itself seems dimmer for it. She cannot be disarmed or shoved off her feet while she still stands in her plate." [trait/on_being_hit/damage] — the model found no template that holds it (offered: absorption, bloodied-burst, resonant-body, weapon-lodge, false-appearance, bloodied-fury)
[reskin] weapons answered: Greatsword = greatsword; Thrown Blade = dagger
[reskin] weapon declared: "Thrown Blade" is a dagger — the call's own answer (the name alone read longsword)
[reskin] speed by body: a Humanoid walks 30 ft. (print's people; a hermit ran 50 — critic's audit 2026-10-02)
[reskin] speed by concept:  — the concept's movement set decides
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] audit rename: "Rampage (1/Day)" -> "Pursuing Strike (1/Day)"
!! Failed to load resource: net::ERR_NETWORK_IO_SUSPENDED
!! Error generating response: TypeError: Failed to fetch
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs?t=1792202639880:246:26)
    at enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs?t=1792202639880:303:26)
    at saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1792369624923:1413:30)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1792369624923:1252:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1792369624923:656:5)
!! [ENRICHMENT] Failed to enrich Dame Oriel: TypeError: Failed to fetch
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs?t=1792202639880:246:26)
    at enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs?t=1792202639880:303:26)
    at saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1792369624923:1413:30)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1792369624923:1252:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1792369624923:656:5)
(enrichment did not settle within 20s — moving on)
```


---


### Hollow Barrow Wight — in the run

**Concept:** a barrow wight who drifts between the standing stones at night

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Hollow Barrow Wight | 4 | lurker-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1 / off 2 → 1.5; sustained 20 (2 × Necrotic Sword); nova none; dmg 20

```
Hollow Barrow Wight

Medium Undead, Neutral Evil

AC 14
Initiative +2 (12)

HP 82 (11d8 + 33)

Speed 30 ft.

MOD
SAVE
STR
15
+2
+2
INT
10
+0
+0
MOD
SAVE
DEX
14
+2
+4
WIS
13
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

Skills Perception +3, Stealth +6

Resistances Necrotic

Immunities Poison; Exhaustion, Poisoned

Senses darkvision 60 ft.; Passive Perception 13

Languages Common plus one other language

CR 4 (XP 1,100; PB +2)

Traits

Sunlight Sensitivity. While in sunlight, the barrow wight has Disadvantage on ability checks and attack rolls.

Actions

Multiattack. The barrow wight makes two attacks, using Necrotic Sword or Necrotic Bow in any combination. It can replace one attack with a use of Life Drain.

Necrotic Sword. Melee Attack Roll: +4 (with Advantage during the first round of each combat), reach 5 ft. 6 (1d8 + 2) Slashing damage plus 4 (1d8) Necrotic damage.

Necrotic Bow. Ranged Attack Roll: +4, range 150/600 ft. 6 (1d8 + 2) Piercing damage.

Life Drain. Constitution Saving Throw: DC 13, one creature within 5 feet. Failure: 6 (1d8 + 2) Necrotic damage, and the target's Hit Point maximum decreases by an amount equal to the damage taken.
A Humanoid slain by this attack rises 24 hours later as a Zombie under the barrow wight's control, unless the Humanoid is restored to life or its body is destroyed. The barrow wight can have no more than twelve zombies under its control at a time.

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
- Actions/Necrotic Sword — print's own row, renamed; weapon longsword
- Actions/Necrotic Bow — print's own row; weapon bow
- Actions/Life Drain — print's own row
- Traits/Sunlight Sensitivity — print's own row

**Engine trace**

```
[route] lurker-phantom type=Undead mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | lurker-phantom: ✓ ("drifts between the standing stones at ni") | lurker-phantom: key "drifts" (class verb)
[concept] resolve: archetype=lurker type=Undead themes=grave/terror mind=sapient style=phantom energy=Necrotic mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: drifting between standing stones at night [behavior] | draining the living [behavior] | grave-wight body [body]
[concept] identity: The barrow wight stalks its standing-stone ring after dark, drifting from stone to stone and striking only when a trespasser passes between them — its touch draining warmth and years from the living. Once engaged it circles through stone and shadow, seeking to isolate prey against a monolith before it drains them dry, then retreating from torchlight and fleeing the first true dawn with its stolen warmth. It is not mindless: it remembers the ones who laid it in the barrow, and it taunts the living with their names while it feeds.
[concept] lore: A forgotten guardian buried among the standing stones, it wakes each night to keep its grave-circle inviolate and to borrow the warmth of any living thing that strays within the ring.
[reskin] print canon route: the Wight has a body — print gives it no Incorporeal Movement — so the phantom seat stands down for the plain lurker line
[reskin] print canon defenses: HP 49 -> 82, AC 15 -> 14 — the Wight's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon armor: 14 (studded leather) — print's Gear line; the 2014 sheet prints it (the Goblin Boss wore "splint", canaries 2026-10-12)
[reskin] print canon array: STR 15, DEX 14, CON 16, INT 10, WIS 13, CHA 15 — the Wight's at its own CR; attack +6 -> +4, DC 13 (print's)
[reskin] donor: lurker-2 -> CR 4
[reskin] row gated out: Teleport (teleport) — the concept did not claim this mechanic
[reskin] print canon: "a barrow wight who drifts between the standing stones at night" heads on the Wight — print's rows ride along; the seat stays
[reskin] inline declared: "the barrow wight" — the call's own answer (kind), built from the name
[reskin] inline form: "the barrow wight" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a barrow wight" -> has (descriptive), head | "drifts between the standing stones at night" -> has (descriptive)
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The wight fixes its stare on one living creature it can see and begins to wear away at the warmth inside them. Until the wight's focus is broken by moving out of its sight, the victim feels a creeping chill and grows less able to resist the wight's draining touch." [action/save/condition] — menu: leap, gaze-single, execute, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, terror-pulse, snare-bolt, slow-bolt, sensory-strike, drain, zone-seed, blighted-ground (+ shelf: delayed-brand, patient-defense, self-invisibility, focus, feint-slip, coating, riposte, charge-push, hook-rider, pounce, isolation)
[reskin] word match declined by the call: gaze-single, focus, pacify, drain — the key word does not mean the mechanic here
[reskin] fit declined: "Barrow Chill" — a print body takes only what the user's words ask; the call offered no quote, and the key table finds no verb either (the blacksmith's rally, critic-ten 2026-10-01)
[reskin] fallback respects the call: gaze-single, drain left the shelf — the call declined them for this sheet
[reskin] fallback stands down: "a barrow wight who drifts between the standing stones at night" heads on the Wight and asks for nothing — print's rows, nothing invented (the big ogre, critic-ten 2026-10-01)
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "The barrow wight draws strength from the standing stones at night: while it is within its grave-circle in darkness or dim light, wounds knit and stolen warmth sustains it. This renewal fails in direct torchlight or under the open sun." [trait/start_of_turn/resource] — menu: fire-aura, warded-mending (+ shelf: heated-body, false-appearance, absorption, bloodied-burst, resonant-body, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, evasion, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] signature bound to the concept's verb: trait — false-appearance (stone)
[reskin] word match declined by the call: false-appearance, bound — the key word does not mean the mechanic here
[reskin] trait declined: "Barrow Regrowth" — a print body takes only what the user's words ask; the call offered no quote, and the key table finds no verb either
[reskin] weapons answered: Grave Claw = none
[reskin] print canon modes: fly off — the Wight has no such mode and the words name none
[reskin] speed by concept: dropped Fly 30 ft. (hover) — the concept's movement set decides
[reskin] languages by mind: "the languages it knew in life, but it does not speak" -> "the languages it knew in life" (sapient)
[reskin] print canon alignment: Neutral -> Neutral Evil — the Wight's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "the languages it knew in life" -> "Common plus one other language" — the Wight's
[reskin] print canon row: Actions/Necrotic Bow — the Wight's own ranged row, added (the chassis carried none to rename)
[reskin] print canon attack: "Grave Claw" -> "Necrotic Sword" — the Wight's own row
[reskin] print canon multiattack: "The barrow wight makes two attacks, using Necrotic Sword or Necrotic Bow in any combination. It can replace one attack with a use of Life Drain." — the Wight's own
[reskin] print canon attack: "Necrotic Bow" is print's own row — +4, 6 (1d8 + 2), range 150/600 ft. (an exact body at print's CR)
[reskin] immunities stamped for type: Undead -> Poison; Exhaustion, Poisoned
[reskin] print canon defenses: resistances none -> Necrotic — the Wight's own header lines
[reskin] print canon trait: Sunlight Sensitivity — "a barrow wight who drifts between the standing stones at night" is the Wight (print's own row)
[reskin] print canon: chassis row leaves — Bonus Actions/"Umbral Step" is the seat's, not the Wight's
[reskin] print canon row: Actions/Life Drain — the Wight's own
[reskin] vulnerability rejected — "Radiant" has no warrant in the concept's own text (print's default is none)
audit finding below confidence gate: Necrotic Sword Attack-roll modifier contains a parenthetical conditional rider rather than plain attack language, obscuring the roll the GM makes.
```


---


### Skeleton — in the run

**Concept:** skeleton with a greatsword

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Skeleton | 2 | brute-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1/2 / off 2 → 1.25; sustained 12 (1 × Greatsword); nova none; dmg 12

```
Skeleton

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

Lodged Echo. When a creature hits the skeleton with a nonmagical weapon, the weapon lodges in the skeleton's body. A lodged weapon can be pulled free by a creature within reach that succeeds on a DC 12 Strength (Athletics) check as an action; while lodged, the skeleton can use it: its Greatsword attacks deal an extra 7 (2d6) Slashing damage per lodged weapon (maximum two).

Great Weapon Master. When the skeleton hits a creature with its Greatsword, the attack deals an extra 2 damage.

Actions

Greatsword. Melee Attack Roll: +5, reach 5 ft. 12 (2d8 + 3) Slashing damage.

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

- Actions/Greatsword — authored for this sheet; a named part; the GM's clause "skeleton with a greatsword"; weapon greatsword
- Traits/Lodged Echo — template weapon-lodge; library draw (seed unstamped)
- Traits/Great Weapon Master — a declared feature; the GM's clause "skeleton with a greatsword"

**Engine trace**

```
[route] brute type=Undead mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | brute: ✓ ("skeleton with a greatsword") | brute: no line key in the words — the model's read of its quote
[concept] resolve: archetype=brute type=Undead themes=grave/armed mind=mindless style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: greatsword swings from a bone frame [object] | bare skeleton held together by grave-magic [body] | relentless advance with no self-preservation [behavior]
[concept] identity: The skeletal greatswordsman wades straight in, leading with a two-handed overhead cut meant to split a shield and the arm behind it, then holds the center of the fight, resetting to guard and trading blow for blow rather than circling. It has no fear and no cleverness of its own — pressure only makes it press harder, its empty skull tilting toward the loudest threat, fighting until it is shattered.
[concept] lore: Raised by a necromancer's field ritual from the bones of a fallen champion, it remembers only the weight of the blade and stands eternal guard over the ground where it first fell.
[reskin] print canon array: STR 16, DEX 16, CON 15, INT 6, WIS 8, CHA 5 — the Skeleton's, STR fitted to +5
[reskin] donor: brute-2 -> CR 2
[reskin] print canon: "skeleton with a greatsword" heads on the Skeleton — print's rows ride along; the seat stays
[reskin] claim gate: CR 2 but a Undead body — the trait seat stays open (print: a material body carries a trait at every tier)
[reskin] repair round 1: 1 defect(s) — rename for "Signature Slot" takes the shelf's own row name "Guarded Stance" — that name belongs to a template this sheet may still receive; choose another
[reskin] named parts: Greatsword (slot) — the user's words, the engine's numbers
[reskin] named parts landed: 1 attack row(s), 0 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] implied class refused: the call answered "fighter" but this body takes no class kit — a beast or a mind too simple to train
[reskin] inline declared: "the remains" — the call's own answer (kind), built from the name
[reskin] inline form: "the remains" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] clauses: "skeleton with a greatsword" -> has (mechanical) [asked: attack]
[reskin] signature idea (action): "When the remains cuts down a foe, it does not pause to savor it — it wrenches the blade free and steps straight over the body, turning its empty skull toward the next loudest threat and closing the distance without hesitation. This lets it keep its relentless advance going, pressing the fight into whatever screaming thing it just heard rather than standing over the fallen." [rider/on_hit/movement] — menu: contagion, charge-push, hook-rider, pounce, charge (+ shelf: trample, shield-bash, active-toll, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, rampage, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating)
[reskin] word match declined by the call: charge-push, pounce, charge, hook-rider — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit"
[reskin] signature miss: action — "When the remains cuts down a foe, it does not pause to savor it — it wrenches the blade free and steps straight over the body, turning its empty skull toward the next loudest threat and closing the distance without hesitation. This lets it keep its relentless advance going, pressing the fight into whatever screaming thing it just heard rather than standing over the fallen." [rider/on_hit/movement] — the model found no template that holds it (offered: contagion, charge-push, hook-rider, pounce, charge, terror-pulse)
[reskin] fallback stands down: "skeleton with a greatsword" heads on the Skeleton and asks for nothing — print's rows, nothing invented (the big ogre, critic-ten 2026-10-01)
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "The bone frame remembers only the greatsword, so any wound that would stagger flesh means nothing to it — but the force still travels through the swing. Whenever something strikes the remains, the echo of the blow rings up the arm and into the next cut it makes, driving the blade down harder on whoever it hits next." [trait/on_being_hit/damage] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] word match declined by the call: bloodied-burst, bloodied-fury, heated-body, absorption, resonant-body — the key word does not mean the mechanic here
[reskin] pick kept on the GM's own words: trait — "weapon-lodge" has no key-table verb, but the call quotes "skeleton with a greatsword" from the description
[reskin] signature template (trait): weapon-lodge -> Traits/"Lodged Echo" ("the echo of the blow rings up the arm and into the next cut it makes, driving th [shape fit, no verb match]")
[reskin] weapons answered: Greatsword = greatsword
[reskin] print canon alignment: Neutral -> Lawful Evil — the Skeleton's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon name: "Champion's Remains" -> "Skeleton" — a whole print name is the creature's name (the Goblin Boss shipped as Krag the Iron Standard, 2026-10-01)
[reskin] inline follows the print name: "the remains" -> "the skeleton"
[reskin] print canon languages: "None" -> "Understands Common plus one other language but can't speak" — the Skeleton's
[reskin] immunities stamped for type: Undead -> Poison; Exhaustion, Poisoned
[reskin] print canon defenses: vulnerabilities none -> Bludgeoning — the Skeleton's own header lines
```


---


### Ogre — in the run

**Concept:** an ogre with a greataxe

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Ogre | 3 | brute-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1/4 / off 4 → 2.125; sustained 22 (1 × Greataxe); nova none; dmg 22

```
Ogre

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
[route] brute type=Giant mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | brute: ✓ ("an ogre with a greataxe") | brute: no line key in the words — the model's read of its quote
[concept] resolve: archetype=brute type=Giant themes=bestial/armed mind=bestial style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: a greataxe swung in both hands [object] | thick hide and brute mass that shrug off blows [body] | a relentless, bloodied charge that never retreats [behavior]
[concept] identity: A hill ogre hefts a greataxe in both hands and leads with a single overhead cleave meant to split a defender's shield and shoulder together. Every round after, it wades forward and swings again — no feinting, no reach games, just terrible weight behind a haft-bound blade — content to trade blows as long as it is the one still standing. It does not flee when bloodied; it roars, lowers its head, and redoubles the assault until nothing in front of it moves.
[concept] lore: Hill ogres take what they can carry and eat what they cannot, and a greataxe pulled from a dead war-band is the finest prize such a brute can own — it carries the thing until it breaks, then finds another.
[reskin] print canon defenses: HP 66 -> 68, AC 12 -> 11 — the Ogre's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 19, DEX 8, CON 16, INT 5, WIS 7, CHA 7 — the Ogre's at its own CR; attack +5 -> +6, DC 14 (print's)
[reskin] donor: brute-2 -> CR 3
[reskin] print canon: "an ogre with a greataxe" heads on the Ogre — print's rows ride along; the seat stays
[reskin] named parts: Greataxe (slot) — the user's words, the engine's numbers
[reskin] named parts landed: 1 attack row(s), 0 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] inline declared: "the ogre" — the call's own answer (kind), built from the name
[reskin] inline form: "the ogre" — the model's own reading of the name
[reskin] save dc derived: DC 12 -> 14 (8 + PB 2 + the sheet's best 4) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "an ogre with a greataxe" -> has (mechanical) [asked: attack]
[reskin] signature idea (action): "Once the ogre has been badly wounded, it lowers its head and simply walks forward through everything, swinging the axe the whole way. Anyone standing in its path gets shoved aside or knocked off their feet as the brute barges through, and it keeps going until it is standing toe to toe with whoever hurt it. This charge happens the moment the fight turns against it and again each time it is wounded " [trait/start_of_turn/movement] — menu: fire-aura, warded-mending (+ shelf: trample, leap, shield-bash, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, rampage, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, affliction, contagion, charge-push, hook-rider, pounce, charge)
[reskin] fit declined: "Wounded Stampede (Recharge 5-6)" — a print body takes only what the user's words ask; the call offered no quote, and the key table finds no verb either (the blacksmith's rally, critic-ten 2026-10-01)
[reskin] fallback stands down: "an ogre with a greataxe" heads on the Ogre and asks for nothing — print's rows, nothing invented (the big ogre, critic-ten 2026-10-01)
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "The ogre does not stop swinging while it is hurt; the worse its wounds, the harder and wilder the axe comes down, and it never turns to run. While it is bleeding heavily, its greataxe blows land with terrible extra weight, and attempts to frighten or drive it off fail outright." [trait/always/damage] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending, weapon-lodge)
[reskin] word match declined by the call: berserk — the key word does not mean the mechanic here
[reskin] trait declined: "Wounded Rage" — bound only on the idea's own words (wounded:idea) with no key in the concept; a meat body earns its trait by the user's verb (the sniper's tracker, critic 2026-09-29)
[reskin] weapons answered: Greataxe = greataxe
[reskin] print canon alignment: Neutral -> Chaotic Evil — the Ogre's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon name: "Hill Ogre" -> "Ogre" — a whole print name is the creature's name (the Goblin Boss shipped as Krag the Iron Standard, 2026-10-01)
[reskin] print canon languages: "None" -> "Common, Giant" — the Ogre's
[reskin] print canon speed: 30 ft. -> 40 ft. — the Ogre's walk; the concept's other modes stay
[reskin] print canon row frame: "Javelin" keeps print's thrown frame — reach 5 ft. or range 30/120 ft.
[reskin] print canon row: Actions/Javelin — the Ogre's second melee row, beside the chassis's
```


---


### Mummy — in the run

**Concept:** name: Mummy | 

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Mummy | 3 | brute-2 | SOFT: hit-die | ok | ok | ok | ok | ok | ok | ok | ok |

- derivation · soft · hit-die: d8 on a Small body (d6)
- read: def 1/4 / off 5 → 2.625; sustained 36 (2 × Rotting Fist); nova none; dmg 36

```
Mummy

Small Undead, Lawful Evil

AC 11
Initiative -1 (9)

HP 58 (9d8 + 18)

Speed 20 ft.

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
15
+2
+2
CHA
12
+1
+1

Skills Athletics +5, Perception +3

Vulnerabilities Fire

Immunities Necrotic, Poison; Charmed, Exhaustion, Frightened, Paralyzed, Poisoned

Senses darkvision 60 ft.; Passive Perception 13

Languages Common plus two other languages

CR 3 (XP 700; PB +2)

Actions

Multiattack. The mummy makes two Rotting Fist attacks and uses Dreadful Glare.

Rotting Fist. Melee Attack Roll: +5, reach 5 ft. 8 (1d10 + 3) Bludgeoning damage plus 10 (3d6) Necrotic damage. If the target is a creature, it is cursed. While cursed, the target can't regain Hit Points, its Hit Point maximum doesn't return to normal when finishing a Long Rest, and its Hit Point maximum decreases by 10 (3d6) every 24 hours that elapse. A creature dies and turns to dust if reduced to 0 Hit Points by this attack.

Dreadful Glare. Wisdom Saving Throw: DC 11, one creature the mummy can see within 60 feet. Failure: The target has the Frightened condition until the end of the mummy's next turn. Success: The target is immune to this mummy's Dreadful Glare for 24 hours.

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

- Actions/Multiattack — print's own row
- Actions/Rotting Fist — print's own row, renamed
- Actions/Dreadful Glare — print's own row

**Engine trace**

```
[route] brute-juggernaut type=Undead mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | brute-juggernaut: ✓ ("Mummy") | brute-juggernaut: no line key in the words — the model's read of its quote | bane refused: the words carry no weakness clause, so "fire" answers a question nobody asked
[concept] resolve: archetype=brute type=Undead themes=grave/grasping mind=mindless style=juggernaut energy=Necrotic mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: funeral wrappings that bind and crush [body] | relentless implacable advance [behavior] | rotting decay that spreads to the living [aura]
[concept] identity: A desiccated corpse bound in its own stained wrappings, the mummy opens a fight by simply walking forward through whatever stands between it and the living, shrugging off blows that should stagger it. Every round after, it drags prey down in a crushing, bandage-choked grip and grinds them against its tomb-wrapped bulk, unhurried and silent. It does not flee, does not tire, and does not stop — a bloodied mummy is just a mummy with nothing left to lose.
[concept] lore: Wrapped in funerary rots long after the embalming failed, the mummy rises from a desecrated tomb to pull living bodies down into the same dark it was buried in.
[reskin] print canon route: "Mummy" is the Mummy — the juggernaut seat stands down for the plain line
[reskin] print canon defenses: HP 66 -> 58, AC 12 -> 11 — the Mummy's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 16, DEX 8, CON 15, INT 6, WIS 12, CHA 12 — the Mummy's at its own CR; attack +5 -> +5, DC 11 (print's)
[reskin] donor: brute-2 -> CR 3
[reskin] print canon: "Mummy" is a print creature — the seats stand down; print's own rows are the composition
[reskin] inline declared: "the revenant" — the call's own answer (kind), built from the name
[reskin] inline form: "the revenant" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Mummy" -> has (descriptive), head
[reskin] weapons answered: Slam = none
[reskin] print canon speed: modes walk only — the Mummy's
[reskin] print canon senses: "darkvision 60 ft." — the Mummy's
[reskin] print canon size: Medium -> Small — the Mummy's
[reskin] print canon alignment: Neutral -> Lawful Evil — the Mummy's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon name: "Tomb-Wrapped Revenant" -> "Mummy" — a whole print name is the creature's name (the Goblin Boss shipped as Krag the Iron Standard, 2026-10-01)
[reskin] inline follows the print name: "the revenant" -> "the mummy"
[reskin] print canon languages: "None" -> "Common plus two other languages" — the Mummy's
[reskin] print canon speed: 30 ft. -> 20 ft. — the Mummy's walk; the concept's other modes stay
[reskin] print canon attack: "Slam" -> "Rotting Fist" — the Mummy's own row
[reskin] print canon multiattack: "The mummy makes two Rotting Fist attacks and uses Dreadful Glare." — the Mummy's own, added (the chassis carried none; the Owlbear makes two Rend attacks — canaries 2026-10-12)
[reskin] immunities stamped for type: Undead -> Poison; Exhaustion, Poisoned
[reskin] print canon defenses: immunities Poison; Exhaustion, Poisoned -> Necrotic, Poison; Charmed, Exhaustion, Frightened, Paralyzed, Poisoned; vulnerabilities none -> Fire — the Mummy's own header lines
[reskin] print canon row: Actions/Dreadful Glare — the Mummy's own
[reskin] vulnerability rejected — "Fire" has no warrant in the concept's own text (print's default is none)
audit finding below confidence gate: Multiattack This is the 2014-format Multiattack phrasing; the 2024 format uses the "makes X attacks" construction without "and uses".
audit finding below confidence gate: Rotting Fist The name promises a mechanic it only partly delivers: the attack deals Bludgeoning plus Necrotic damage, but the dusting rider is triggered only by HP reduction, while the name implies a rotting/curse effect that should also relate to regrowth failure.
```


---


### Nave Drowned Choir — in the run

**Concept:** a ghost of the drowned chapel who drifts through its walls

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Nave Drowned Choir | 4 | lurker-1-phantom | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1 / off 5 → 3; sustained 38 (2 × Withering Touch); nova none; dmg 38

```
Nave Drowned Choir

Medium Undead, Neutral

AC 11
Initiative +1 (11)

HP 45 (10d8)

Speed 5 ft., Fly 40 ft. (hover), Swim 30 ft.

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

Skills Stealth +3

Resistances Acid, Bludgeoning, Cold, Fire, Lightning, Piercing, Slashing, Thunder

Immunities Necrotic, Poison; Charmed, Exhaustion, Frightened, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained

Senses darkvision 60 ft.; Passive Perception 11

Languages Common plus one other language

CR 4 (XP 1,100; PB +2)

Traits

Incorporeal Movement. The drowned choir can move through other creatures and objects as if they were Difficult Terrain. It takes 5 (1d10) Force damage if it ends its turn inside an object.

Sunlight Sensitivity. While in sunlight, the drowned choir has Disadvantage on ability checks and attack rolls.

Ethereal Sight. The drowned choir can see 60 feet into the Ethereal Plane when it is on the Material Plane.

Actions

Multiattack. The drowned choir makes two Withering Touch attacks. It can replace one attack with a use of Horrific Visage.

Withering Touch. Melee Attack Roll: +5, reach 5 ft. 19 (3d10 + 3) Necrotic damage.

Horrific Visage. Wisdom Saving Throw: DC 13, each creature in a 60-foot Cone that can see the drowned choir and isn't an Undead. Failure: 10 (2d6 + 3) Psychic damage, and the target has the Frightened condition until the start of the drowned choir's next turn. Success: The target is immune to this ghost's Horrific Visage for 24 hours.

Possession (Recharge 6). Charisma Saving Throw: DC 13, one Humanoid the drowned choir can see within 5 feet. Failure: The target is possessed by the drowned choir; the drowned choir disappears, and the target has the Incapacitated condition and loses control of its body. The drowned choir now controls the body, but the target retains awareness. The drowned choir can't be targeted by any attack, spell, or other effect, except ones that specifically target Undead. The drowned choir's game statistics are the same, except it uses the possessed target's Speed, as well as the target's Strength, Dexterity, and Constitution modifiers.
The possession lasts until the body drops to 0 Hit Points or the drowned choir leaves as a Bonus Action. When the possession ends, the drowned choir appears in an unoccupied space within 5 feet of the target, and the target is immune to this ghost's Possession for 24 hours. Success: The target is immune to this ghost's Possession for 24 hours.

Etherealness. The drowned choir casts the Etherealness spell, requiring no spell components and using Charisma as the spellcasting ability. The drowned choir is visible on the Material Plane while on the Border Ethereal and vice versa, but it can't affect or be affected by anything on the other plane.

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

- Traits/Incorporeal Movement — the chassis
- Traits/Sunlight Sensitivity — the chassis
- Traits/Ethereal Sight — print's own row
- Actions/Multiattack — print's own row
- Actions/Withering Touch — print's own row, renamed
- Actions/Horrific Visage — print's own row
- Actions/Possession — print's own row
- Actions/Etherealness — print's own row

**Engine trace**

```
[route] lurker-phantom type=Undead mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | lurker-phantom: ✓ ("a ghost of the drowned chapel who drifts") | lurker-phantom: key "drifts" (class verb)
[concept] name: provided_name rejected — "a ghost of the drowned chapel who drifts…" is the description, not a name
[concept] hints: phantom→style ✓ ("a ghost of the drowned chapel")
[concept] resolve: archetype=lurker type=Undead themes=grave/aquatic mind=sapient style=phantom energy=Necrotic mix=energy identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: drifting through solid walls [behavior] | drowning grave-chill [aura] | the flooded chapel's nave [body]
[concept] identity: A drowned chapel's ghost pours itself through stone and rotted pews to reach the living, opening with a lunging, bone-numbing grasp before drifting back into the walls to bleed warmth from whoever it touched. Each round it flickers through masonry into flanking position, dragging necrotic chill and the weight of the flooded nave behind its strikes. It is a possessive, patient thing that toys with the light-bearers who trespass, only slipping into the stone to vanish once the light burns what remains of it.
[concept] lore: It was the chapel's guardian, sealed with its congregation in the flood, and it now keeps a drowned congregation of its own among the living who wander the nave.
[reskin] print canon defenses: HP 54 -> 45, AC 13 -> 11 — the Ghost's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 7, DEX 13, CON 10, INT 10, WIS 12, CHA 17 — the Ghost's at its own CR; attack +6 -> +5, DC 13 (print's)
[reskin] donor: lurker-1-phantom -> CR 4
[reskin] print canon: "a ghost of the drowned chapel who drifts through its walls" heads on the Ghost — print's rows ride along; the seat stays
[reskin] repair round 1: 1 defect(s) — name "Sodden Grasp" promises the Grappled condition but the row never delivers it — name what the rule does, or drop the claim word; this row earns Strike, Blow, Lash
[reskin] inline declared: "the drowned choir" — the call's own answer (kind), built from the name
[reskin] inline form: "the drowned choir" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a ghost of the drowned chapel" -> has (descriptive), head | "drifts through its walls" -> has (descriptive)
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The drowned choir pours itself through a wall at an intruder and comes out the far side overlapping their body, dragging the freezing weight of the flooded nave into them. The chill clings afterward: while the cold lingers, the touched creature reads as one of the choir's drowned congregation, and any strike the choir lands on that creature draws warmth out twice over. The choir can only mark so m" [rider/on_hit/damage] — menu: charge-push, hook-rider, pounce, isolation (+ shelf: leap, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, terror-pulse, snare-bolt, slow-bolt, sensory-strike, drain, delayed-brand, zone-seed, blighted-ground, patient-defense, self-invisibility, focus, feint-slip, coating, riposte)
[reskin] word match declined by the call: delayed-brand, hook-rider, obstacle-pull, slow-bolt — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit"
[reskin] signature miss: action — "The drowned choir pours itself through a wall at an intruder and comes out the far side overlapping their body, dragging the freezing weight of the flooded nave into them. The chill clings afterward: while the cold lingers, the touched creature reads as one of the choir's drowned congregation, and any strike the choir lands on that creature draws warmth out twice over. The choir can only mark so m" [rider/on_hit/damage] — the model found no template that holds it (offered: charge-push, hook-rider, pounce, isolation, slow-bolt, obstacle-pull, lure, pacify, delayed-brand)
[reskin] fallback stands down: "a ghost of the drowned chapel who drifts through its walls" heads on the Ghost and asks for nothing — print's rows, nothing invented (the big ogre, critic-ten 2026-10-01)
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "When the choir passes through a creature as if through empty space, the stone-cold water of its grave washes over them, and the warmth it steals knits its own tattered form back together. The trespasser it brushed feels the grave-chill cling to their skin for a moment after." [trait/always/damage] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, evasion, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] word match declined by the call: adhesive, bound — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "When the choir passes through a creature as if through empty space, the stone-cold water of its grave washes over them, and the warmth it steals knits its own tattered form back together. The trespasser it brushed feels the grave-chill cling to their skin for a moment after." [trait/always/damage] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, evasion, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst, warded-mending)
[reskin] weapons answered: Sodden Grasp = none
[reskin] speed by concept:  — the concept's movement set decides
[reskin] languages by mind: "None" -> "Common plus the languages it knew in life" (sapient)
[reskin] print canon languages: "Common plus the languages it knew in life" -> "Common plus one other language" — the Ghost's
[reskin] print canon speed: Fly -> 40 ft. — the Ghost's own
[reskin] print canon attack: "Sodden Grasp" -> "Withering Touch" — the Ghost's own row
[reskin] print canon multiattack: "The drowned choir makes two Withering Touch attacks." — the Ghost's own, added (the chassis carried none; the Owlbear makes two Rend attacks — canaries 2026-10-12)
[reskin] immunities stamped for type: Undead + donor suite -> Poison; Charmed, Exhaustion, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained
[reskin] print canon defenses: immunities Poison; Charmed, Exhaustion, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained -> Necrotic, Poison; Charmed, Exhaustion, Frightened, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained; resistances none -> Acid, Bludgeoning, Cold, Fire, Lightning, Piercing, Slashing, Thunder — the Ghost's own header lines
[reskin] resistances derived withheld: print's Ghost owns the line (Acid, Bludgeoning, Cold, Fire, Lightning, Piercing, Slashing, Thunder)
[reskin] print canon trait: Ethereal Sight — "a ghost of the drowned chapel who drifts through its walls" is the Ghost (print's own row)
[reskin] print canon row: Actions/Horrific Visage — the Ghost's own
[reskin] print canon row: Actions/Possession (Recharge 6) — the Ghost's own
[reskin] print canon row: Actions/Etherealness — the Ghost's own
[reskin] vulnerability rejected — "Radiant" has no warrant in the concept's own text (print's default is none)
[reskin] multiattack replacement clause: It can replace one attack with a use of Horrific Visage.
audit span not verbatim, dropped: Possession the drowned choir controls the body, but the target retains awareness. the drowned choir can't be targeted
[reskin] audit rewrite blocked — "Etherealness" is engine-authored chassis text
```


---


### Slagmire Regrowth — in the run

**Concept:** a troll that grows back unless the blade was silvered

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Slagmire Regrowth | 6 | brute-5-regenerator | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 5 / off 7 → 6; sustained 39 (3 × Claw); nova Slag Eruption 33; dmg 48

```
Slagmire Regrowth

Large Monstrosity, Neutral Evil

AC 14
Initiative +1 (11)

HP 119 (14d10 + 42)

Speed 30 ft., Climb 30 ft.

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
12
+1
+1
WIS
8
-1
-1
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

Skills Athletics +7, Perception +2

Senses darkvision 60 ft.; Passive Perception 12

Languages None

CR 6 (XP 2,300; PB +3)

Traits

Regeneration. The regrowth regains 10 Hit Points at the start of each of its turns. If the regrowth takes silver damage, this trait doesn't function on the regrowth's next turn. The regrowth dies only if it starts its turn with 0 Hit Points and doesn't regenerate.

Actions

Multiattack. The regrowth makes three Claw attacks.

Claw. Melee Attack Roll: +7, reach 10 ft. 13 (2d8 + 4) Slashing damage.

Slag Eruption (Recharge 5-6). Dexterity Saving Throw: DC 14, each creature in a 15-foot-radius Sphere centered on a point within 60 feet. Failure: 33 (6d10) Piercing damage. Success: Half damage.

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

- Traits/Regeneration — the chassis
- Actions/Multiattack — the chassis
- Actions/Claw — the chassis
- Actions/Slag Eruption — library seed thrown-burst-seed

**Engine trace**

```
[route] brute-regenerator type=Monstrosity mechanics=regeneration — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | brute-regenerator: ✓ ("a troll that grows back unless the blade") | brute-regenerator: no line key in the words — the model's read of its quote | bane: "silver" on the GM's own words "unless the blade was silvered"
[concept] hints: troll→canon ✓ ("a troll that grows back")
[concept] resolve: archetype=brute type=Monstrosity themes=bestial/subterranean mind=bestial style=regenerator energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: regeneration
[concept] signature elements: silver-bane regrowth [behavior] | rubbery hide that reknits wounds [body] | thick limbs it tears loose and throws [body]
[concept] identity: A hulking, rubbery-fleshed Monstrosity that wades into a fight swinging claws and hurling its own severed limbs, trusting its knitting flesh to absorb the first taste of any edge. Every round after it opens, it trades wounds freely, letting blades sink in and then showing no seam, while it coiling-hops toward the nearest wounded foe to finish what its regrowth has tired out. Under pressure it grows bigger and fouler instead of fleeing, and only silver makes it flinch, backing off a step before redoubling its assault.
[concept] lore: Born from a silver-mine's runoff where trollish stock drowned in molten slag, it haunts the old shafts, dragging every blade it meets into the dark to see whether the steel can cut what its body refuses to forget.
[reskin] the concept outranks the alias: the Troll is a Giant and the concept reads Monstrosity — the words RESEMBLE it, they do not name it, so the print body stands down
[reskin] regeneration off-switch: silver (the call read the GM's weakness clause as silver ("unless the blade was silvered"))
[reskin] donor: brute-5-regenerator -> CR 6
[reskin] inline declared: "the regrowth" — the call's own answer (kind), built from the name
[reskin] inline form: "the regrowth" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] lacks refused: "unless the blade was silvered" names no absence — nothing in it takes anything away
[reskin] lacks refused: "no magic at all" quotes nothing the user typed
[reskin] lacks refused: "carries no weapons" quotes nothing the user typed
[reskin] lacks refused: "never holds" quotes nothing the user typed
[reskin] clauses: "a troll" -> has (descriptive), head | "grows back unless the blade was silvered" -> has (descriptive)
[reskin] signature idea (action): "The regrowth rips a fistful of its own rubbery flesh free and hurls it at a distant foe, and the lump keeps twitching and clinging once it lands. A creature struck by the flung limb is stuck fast to whatever surface the mass splatters across, slowed and snared until it tears itself loose or someone cuts it free with a blade." [rider/on_hit/condition] — menu: affliction, contagion, stunning-strike, charge-push, hook-rider, pounce (+ shelf: leap, shield-bash, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating)
[reskin] decline reason: action — the call answered none and names it "no_fit"
[reskin] signature miss: action — "The regrowth rips a fistful of its own rubbery flesh free and hurls it at a distant foe, and the lump keeps twitching and clinging once it lands. A creature struck by the flung limb is stuck fast to whatever surface the mass splatters across, slowed and snared until it tears itself loose or someone cuts it free with a blade." [rider/on_hit/condition] — the model found no template that holds it (offered: affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, thrown-burst-seed)
[reskin] value check: "Hurled Burst (Recharge 5-6)" EV 51.2 vs floor 35.5 (the whole Multiattack (3 attacks)) — dice 14 → 33 (nova budget)
[reskin] library seed drawn: thrown-burst-seed -> Actions/"Hurled Burst (Recharge 5-6)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Every wound it suffers leaves a knot of half-set, still-growing flesh behind, and that fresh flesh keeps reaching for the nearest warm body whether or not the regrowth wills it. Anyone who strikes it up close gets a spasm of that hungry tissue surging back along their weapon toward their hands." [trait/on_being_hit/damage] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] word match declined by the call: bloodied-burst, bloodied-fury — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "Every wound it suffers leaves a knot of half-set, still-growing flesh behind, and that fresh flesh keeps reaching for the nearest warm body whether or not the regrowth wills it. Anyone who strikes it up close gets a spasm of that hungry tissue surging back along their weapon toward their hands." [trait/on_being_hit/damage] — the model found no template that holds it (offered: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge, false-appearance, bloodied-fury)
[reskin] weapons answered: Claw = none
[reskin] speed by concept: added Climb 30 ft. — the concept's movement set decides
[reskin] vulnerability rejected — "Radiant" has no warrant in the concept's own text (print's default is none)
[reskin] audit rename: "Hurled Burst (Recharge 5-6)" -> "Slag Eruption (Recharge 5-6)"
```


---


### Ironhold Inquisitor — in the run

**Concept:** an iron-willed inquisitor who never yields ground

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Ironhold Inquisitor | 6 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 5 / off 6 → 5.5; sustained 44 (2 × Blade); nova none; dmg 44

```
Ironhold Inquisitor

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

Senses Passive Perception 14

Languages Common

CR 6 (XP 2,300; PB +3)

Actions

Multiattack. The inquisitor makes two attacks, using Blade or Iron Oath Strike in any combination.

Blade. Melee Attack Roll: +7, reach 5 ft. 22 (4d8 + 4) Slashing damage.

Iron Oath Strike. Melee Attack Roll: +7, reach 5 ft. 22 (4d8 + 4) Bludgeoning damage.

Bonus Actions

Retributive Cudgel. One creature within 5 feet that hit the inquisitor with an attack roll since the end of the inquisitor's last turn takes 7 (2d6) Bludgeoning damage.

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
- Actions/Blade — weapon longsword
- Actions/Iron Oath Strike — the chassis
- Bonus Actions/Retributive Cudgel — library seed own-turn-punisher

**Engine trace**

```
[route] defender type=Humanoid mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | defender: ✓ ("never yields ground") | defender: no line key in the words — the model's read of its quote
[concept] resolve: archetype=defender type=Humanoid themes=armed/uncanny mind=sapient style=— energy=Force mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: never yields ground [behavior] | iron-plated inquisitor [body] | punishes anyone who moves past [behavior]
[concept] identity: The inquisitor plants its armored bulk in a doorway, corridor, or square and simply refuses to be moved, shield high, blade low, using its iron will to grind down anyone who tries to flow around it. Each round it holds its ground and punishes any who break past with a hard, deliberate counter, never chasing and never breaking formation. Under pressure it does not retreat; it fights to the death, taunting the faithless and daring them to come at it again.
[concept] lore: A veteran of the church's most unforgiving order, the inquisitor was sealed into plate with iron oaths and sent to hold lines that lesser souls would abandon — it stands where it is told until the enemy is broken or it is.
[reskin] energy withheld: Force on a Humanoid with no Force in the concept's own words (fixed phrases read first)
[reskin] donor: defender-5 -> CR 6
[reskin] row gated out: Guard Aura (aura) — the concept did not claim this mechanic
[reskin] repair round 1: 1 defect(s) — rename for "Hybrid Attack" takes the shelf's own row name "Shield Bash" — that name belongs to a template this sheet may still receive; choose another
[reskin] class kit: Divine Aid — the sheet carries no row it could refer to (/^Spellcasting$/)
[reskin] class kit: cleric — "an iron-willed inquisitor": nothing to add — the sheet already answers it
[reskin] inline declared: "the inquisitor" — the call's own answer (kind), built from the name
[reskin] inline form: "the inquisitor" — the model's own reading of the name
[reskin] save dc derived: DC 14 -> 15 (8 + PB 3 + the sheet's best 4) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] lacks not claimed: "never yields ground" reads like a lack to the words, and the call's list did not name it
[reskin] clauses: "an iron-willed inquisitor" -> has (descriptive), head | "never yields ground" -> has (descriptive)
[reskin] menu pruned: action — snap-shot (the sheet cannot render them)
[reskin] signature idea (action): "The inquisitor slams its shield into the enemy who just swung at it and then simply will not budge, getting in the attacker's way and shoving them back a step. The offender's footing is broken and they cannot get around the inquisitor cleanly, so they must come at it head-on or go through it. This happens the moment someone attacks it in melee, not on its own turn." [reaction/on_being_hit/movement] — menu: riposte (+ shelf: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, blighted-ground, patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, stunning-strike, charge-push, hook-rider)
[reskin] signature bound to the concept's verb: action — blighted-ground (ground)
[reskin] signature miss: action — "The inquisitor slams its shield into the enemy who just swung at it and then simply will not budge, getting in the attacker's way and shoving them back a step. The offender's footing is broken and they cannot get around the inquisitor cleanly, so they must come at it head-on or go through it. This happens the moment someone attacks it in melee, not on its own turn." [reaction/on_being_hit/movement] — the model picked "riposte" (no verb, and it quotes nothing the GM typed) over a concept-verb template (blighted-ground)
[reskin] fallback skipped by the floor: terror-pulse (EV 23.1 vs 35.5)
[reskin] fallback skipped by the floor: disarm (EV 0 vs 10.9)
[reskin] fallback skipped by the floor: push-prone (EV 2.9 vs 10.9)
[reskin] fallback skipped by the floor: herd (EV 8.2 vs 35.5)
[reskin] value check: "Answering Sting" EV 3.9 vs floor 3.4 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: own-turn-punisher -> Bonus Actions/"Answering Sting" (no template held the idea; a proven shape stands in)
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 19 already beats print's AC 15 at CR 6, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "Any foe that steps past or slips around the inquisitor's guard feels the weight of its oath settle on them: it marks that one and will not let them out of its sight, punishing them the instant they try to flow around the line it holds. The mark ends if the inquisitor is forced from its square or the target breaks away and gets out of reach." [trait/always/condition] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending, weapon-lodge)
[reskin] signature bound to the concept's verb: trait — resonant-body (iron)
[reskin] word match declined by the call: guarded-stance, faultless-tracker — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit" after being shown resonant-body, which the GM's words keyed
[reskin] key match declined: trait — "resonant-body" was ranked first on the call's own menu for iron, and the call read it as no fit; the words keep their claim and nothing is forced
[reskin] signature miss: trait — "Any foe that steps past or slips around the inquisitor's guard feels the weight of its oath settle on them: it marks that one and will not let them out of its sight, punishing them the instant they try to flow around the line it holds. The mark ends if the inquisitor is forced from its square or the target breaks away and gets out of reach." [trait/always/condition] — the model found no template that holds it (offered: resonant-body, false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura)
[reskin] weapons answered: Blade = longsword; Shield Bash = shield
[reskin] languages by mind: "None" -> "Common" (sapient)
audit finding below confidence gate: Answering Sting The timing window spans the entire round between turns and requires the GM to reconstruct and track which creatures hit the inquisitor since its last turn, with no way to track that state from the block.
[reskin] audit rename: "Answering Sting" -> "Retributive Cudgel"
[reskin] row narrowed: "Iron Oath Strike" names nothing that can be thrown — the range leaves (print dresses only a thrown weapon in "Melee or Ranged")
```


---


### Coil-Bodied Lurker — in the run

**Concept:** a coil-bodied horror that seizes a victim and will not let go

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Coil-Bodied Lurker | 7 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 5 / off 8 → 6.5; sustained 52 (2 × Coils); nova none; dmg 52

```
Coil-Bodied Lurker

Medium Monstrosity, Neutral

AC 14
Initiative -1 (9)

HP 135 (18d8 + 54)

Speed 30 ft., Burrow 30 ft., Climb 30 ft.

MOD
SAVE
STR
18
+4
+7
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

Skills Athletics +7, Perception +3

Senses tremorsense 30 ft.; Passive Perception 13

Languages None

CR 7 (XP 2,900; PB +3)

Actions

Multiattack. The coil-bodied lurker makes two attacks, using Coils or Seizing Coil in any combination. It can replace one attack with a use of Coil Drag.

Coils. Melee Attack Roll: +7, reach 5 ft. 26 (5d8 + 4) Bludgeoning damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 15). While Grappled, the target has the Restrained condition.

Coil Drag. Strength Saving Throw: DC 14, one creature within 30 feet. Failure: The target is pulled up to 25 feet straight toward the coil-bodied lurker by its constricting coils and has the Grappled condition (escape DC 15).

Seizing Coil. Melee Attack Roll: +7, reach 5 ft. 26 (5d8 + 4) Bludgeoning damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 15).

Bonus Actions

Smother. The coil-bodied lurker smothers one Medium or smaller creature it is grappling. While smothered, the target has the Blinded and Restrained conditions, has Total Cover against attacks and other effects outside the coil-bodied lurker, and takes 7 (2d6) Bludgeoning damage at the start of each of the coil-bodied lurker's turns. The coil-bodied lurker can have only one creature smothered at a time. If the coil-bodied lurker takes 15 damage or more in a single turn from the smothered creature, the coil-bodied lurker must release the target at the end of that turn, and the target exits Prone in an unoccupied space within 5 feet of the coil-bodied lurker. If the coil-bodied lurker dies, a smothered creature pulls free Prone by using 5 feet of movement.

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
- Actions/Coils — the chassis
- Actions/Coil Drag — template hook-drag; library draw (seed unstamped); binds the GM's words: drag+haul
- Actions/Seizing Coil — authored for this sheet; the GM's clause "seizes a victim"
- Bonus Actions/Smother — binds the GM's words: smother+swallow+swallows+engulf+engulfs+devour+devours+gulp+entomb+cocoon+whelm

**Engine trace**

```
[route] brute-grappler type=Monstrosity mechanics=grapple, engulf — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: on the GM's own words "seizes a victim and will not let go" | brute-grappler: ✓ ("seizes a victim and will not let go") | brute-grappler: key "seizes" (class verb)
[concept] hints: grappler→style ✓ ("a coil-bodied horror that seizes")
[concept] resolve: archetype=brute type=Monstrosity themes=grasping/bestial mind=bestial style=grappler energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: grapple, engulf
[concept] signature elements: coils that seize and will not release [behavior] | constricting, dragging hold on prey [behavior] | thick, rubbery hide of muscle loops [body]
[concept] identity: The coil-bodied horror launches itself at the nearest warm body, ringing its slick, muscular loops around the victim's chest and arms before they can set foot backward. Every round after, it squeezes and drags its held prey in a slow, patient constriction while using the victim as a living shield, never releasing until the body goes limp. Cornered or deeply bloodied, it does not flee; it tightens into a knot around its meal and tries to crush out the last resistance.
[concept] lore: A burrow-born monstrosity hatched in the root-cellars beneath old ruins, it hunts by wrapping and waiting, hauling its catch back to a nest too narrow for anything to pull free.
[reskin] donor: brute-5-grappler -> CR 7
[reskin] engulf engine: Smother — the body's own verb
[reskin] inline declared: "the coil-bodied lurker" — the call's own answer (kind), built from the name
[reskin] inline form: "the coil-bodied lurker" — the model's own reading of the name
[reskin] save dc derived: DC 13 -> 15 (8 + PB 3 + the sheet's best 4) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] asked field dropped: the call answered trigger "on_hit" for "seizes a victim" but offered no quote
[reskin] lacks not claimed: "will not let go" reads like a lack to the words, and the call's list did not name it
[reskin] clauses: "a coil-bodied horror" -> has (descriptive), head | "seizes a victim" -> has (mechanical) [asked: condition] | "will not let go" -> has (mechanical) [asked: condition]
[reskin] signature idea (action): "When the creature has a victim wrapped and smothered, it heaves and drags them down into the loosened earth, retreating a short way while hauling its prey along so the two of them drop out of reach of rescuers. The victim comes with it, half-buried and still pinned, leaving anyone who was trying to break them free standing over empty dirt." [bonus_action/always/movement] — menu: second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating (+ shelf: swallow, leap, condition-payoff, shield-bash, hook-drag, active-toll, random-ray, ground-burst, spew, burrow-ambush, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, exploiter, stunning-strike, charge-push, hook-rider, pounce)
[reskin] signature bound to the concept's verb: action — escalating-dread, wind-up (horror, coil)
[reskin] value check: "Coil Drag" EV 13.8 vs floor 13 (one attack of 2) — worth the trade
[reskin] signature template: hook-drag -> Actions/"Coil Drag" ("The lurker seizes a wrapped victim and hauls it away, dragging prey straight tow [verb: drag:idea, haul:idea]")
[reskin] signature idea (trait): "Its body is a live rope of overlapping muscle loops: whenever anything coils, grabs, or binds it in turn, the loops ripple and twist free of their own accord, shedding the hold before it can take root. Things that try to pin it find their grip sliding off slick, shifting flesh." [trait/always/defense] — menu: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, earth-glide, tunneler, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending, weapon-lodge)
[reskin] trait declined: "Slick Coils" — bound only on the idea's own words (grip:idea) with no key in the concept; a meat body earns its trait by the user's verb (the sniper's tracker, critic 2026-09-29)
[reskin] repair: 2 clause(s) with no row — "seizes a victim", "will not let go"; one targeted call with the sheet as context
[reskin] repaired sheet: 2 attack row(s), 0 save, 0 trait(s), 0 reaction(s); 1 clause(s) unplaced
[reskin] weapons answered: Coils = none
[reskin] speed by concept: added Climb 30 ft. — the concept's movement set decides
[reskin] languages held: None stands — INT 4 on a Monstrosity speaks nothing, whatever the mind read said
[reskin] multiattack replacement clause: It can replace one attack with a use of Coil Drag.
[reskin] escape dc: Coil Drag → DC 15 (8 + PB + STR; a late row wore another number)
```


---


---

## Review batch — features-tail-2026-10-19T01-10-38

The checker ran first. The gate table covers every block in the run; every block of the run follows. Each block carries its checker row above and its engine trace below. Hand-derive against the row first; then read for what predicates can't see.

### Gate table — the whole run

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Black Fletching Archer | 6 (2014) | 2014 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |
| Chiming Skitterer | 4 | 2024 | lurker-2 | ok | SOFT: aim-hp | ok | ok | ok | ok | ok | ok | ok | soft (1) | 18/19 | 7/7 |
| Grik | 1 | 2024 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/5 |
| Sinkhole Troll | 3 (2014) | 2014 | brute-2 | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | soft (1) | 2/2 | 2/3 |
| Thurivald | 9 | 2024 | skirmisher-8-hurler | ok | user-set: AC 17, HP 180 · reads CR 10 | ok | ok | ok | ok | ok | ok | ok | clean | 5/7 | 8/8 |

**Dropped 3 of 30 user clauses** (coverage 90%); concept share 89% (24/27 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- none



---


### Grik — lowest CR

**Concept:** name: Grik | 

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Grik | 1 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1 / off 1 → 1; sustained 12 (2 × Strike Blade); nova none; dmg 12

```
Grik

Small Humanoid, Neutral

AC 15
Initiative +2 (12)

HP 31 (7d6 + 7)

Speed 30 ft., Climb 50 ft.

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

Skills Perception +3, Stealth +6

Senses Passive Perception 13

Languages Common

CR 1 (XP 200; PB +2)

Traits

Ratlike Scurry. Grik ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Actions

Multiattack. Grik makes two attacks, using Hurled Knife or Strike Blade in any combination.

Strike Blade. Melee Attack Roll: +4, reach 5 ft. 6 (1d8 + 2) Slashing damage.

Hurled Knife. Ranged Attack Roll: +4, range 20/60 ft. 5 (1d6 + 2) Piercing damage.

Bonus Actions

Cunning Action. Grik takes the Dash, Disengage, or Hide action.

Honed Cut (2/Day). Grik charges its next strike: the first time it hits with an attack before the end of its next turn, the target takes an extra 3 (1d6) Slashing damage.

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

- Traits/Ratlike Scurry — the chassis
- Actions/Multiattack — the chassis
- Actions/Strike Blade — weapon dagger
- Actions/Hurled Knife — weapon dagger
- Bonus Actions/Cunning Action — the chassis
- Bonus Actions/Honed Cut — template coating; library draw (seed unstamped); binds the GM's words: coating+coat+venom

**Engine trace**

```
[route] skirmisher-skulker type=Humanoid mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | skirmisher-skulker: ✓ ("Grik") | skirmisher-skulker: no line key in the words — the model's read of its quote
[concept] resolve: archetype=skirmisher type=Humanoid themes=venomous/grasping mind=sapient style=skulker energy=Poison mix=both identity=✓ lore=✓
[concept] name: provided "Grik"
[concept] mechanics: none claimed
[concept] signature elements: the hidden strike from cover [behavior] | a blade slicked with its own venom [object] | skulking through drains and crawlspaces [behavior]
[concept] identity: Grik opens a fight from a hidden angle, slipping out of cover to drive a poisoned blade into a flank and then breaking line before the wound is even felt. Every round after, it circles, feints, and waits for an ally or a shadow to open its next advantage, only committing when the odds are its own. Wounded and exposed, it panics and bolts for the nearest dark hole — unless cornered, at which point it turns and fights with the frantic, venomous spite of a rat in a trap.
[concept] lore: Grik is a runt who learned that a small knife in the right place feeds a goblin better than any war-band, and now it haunts the drains and back alleys of the warren looking for someone careless enough to bleed alone.
[reskin] energy withheld: Poison on a Humanoid with no Poison in the concept's own words (fixed phrases read first)
[reskin] donor: skirmisher-3-skulker -> CR 1
[reskin] row gated out: Ranged Save Effect (gaze) — the concept did not claim this mechanic
[reskin] row gated out: Teleport (teleport) — the concept did not claim this mechanic
[reskin] claim gate: CR 1 but a Humanoid body — the trait seat stays open (print: a material body carries a trait at every tier)
[reskin] name_element answered: Poisoned Blade = literal
[reskin] implied class refused: the call answered "rogue" but quoted "slipping out of cover to drive a poisoned blade into a flank", which is not the GM's own words
[reskin] proper noun: "Grik" — the Name field is a person, not a kind (no print match, no article in the words)
[reskin] inline declared: "Grik" — the call's own answer (person), built from the name
[reskin] inline form: "Grik" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Grik" -> has (descriptive), head
[reskin] extraction: 12 of 13 model clauses quote nothing the user typed and leave the record ("opens a fight from a hidden angle", "slipping out of cover", "drive a poisoned blade into a flank", …)
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "Grik strikes from hiding with a blade it has been quietly coating, and the cut keeps weeping: the wound stays slicked with venom so the victim bleeds slower to close and easier to hit while its guard is down. It only works on a target Grik attacked before it had been seen this fight, so the goblin must earn the first cut from cover before the venom turns any wound into a lasting nuisance." [rider/on_hit/condition] — menu: contagion, charge-push, hook-rider, pounce, isolation, bolt-mark (+ shelf: snare, throw-retrieve, shield-bash, lure, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte)
[reskin] word match declined by the call: delayed-brand, rampage, contagion, charge-push, hook-rider, pounce, isolation, bolt-mark — the key word does not mean the mechanic here
[reskin] value check: "Coated Cut (2/Day)" EV 1.7 vs floor 0.8 (a bonus action (free)) — worth the trade
[reskin] signature template: coating -> Bonus Actions/"Coated Cut (2/Day)" ("charges its next strike with quietly applied venom; the first hit lands an extra [verb: coating:idea, coat:idea, venom:idea]")
[reskin] signature idea (trait): "Grik's knives are never clean — it licks and wipes them between fights, so anyone who grabs or grapples the little goblin comes away with slick, burning fingers and a creeping numbness that saps their grip and makes them fumble the hold." [trait/on_being_hit/condition] — menu: absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst)
[reskin] seat owes nothing: the skulker line was the model's read of its quote, not a key in the words (a hermit was handed Assassinate, day-one 2026-09-30)
[reskin] trait declined: "Greased Grip" — bound only on the idea's own words (sap:idea, grip:idea) with no key in the concept; a meat body earns its trait by the user's verb (the sniper's tracker, critic 2026-09-29)
[reskin] weapons answered: Poisoned Blade = dagger; Hurled Knife = dagger
[reskin] weapon declared: "Poisoned Blade" is a dagger — the call's own answer (the name alone read longsword)
[reskin] weapon table: "Hurled Knife" — thrown, range 20/60
[reskin] speed by body: a Humanoid walks 30 ft. (print's people; a hermit ran 50 — critic's audit 2026-10-02)
[reskin] speed by concept: added Climb 50 ft. — the concept's movement set decides
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] attack name by anatomy: "Poisoned Blade" -> "Poisoned Blade" — blade deals Slashing, not Piercing
[reskin] on-hit extra retyped: "Coated Cut (2/Day)" adds Slashing, not Bludgeoning — the hit's own type (Poisoned Blade)
[reskin] darkvision withheld: a Humanoid with no species kit granting it, no word for it in the GM's own text, and no print body that has it — print gives darkvision to 1 of 26 Humanoids ("darkvision 60 ft.; Passive Perception 13" -> "Passive Perception 13")
[reskin] name follows content: Actions/"Poisoned Blade" promises Poison the row never delivers — "Strike Blade" (the call's modifier kept, the claim word swapped for a noun the row earns)
[reskin] multiattack re-read — "Poisoned Blade" left; "Multiattack" now reads "Grik makes two Hurled Knife attacks."
[reskin] audit rename: "Coated Cut (2/Day)" -> "Honed Cut (2/Day)"
[reskin] multiattack re-read — "Strike Blade" joins the combination; "Grik makes two attacks, using Hurled Knife or Strike Blade in any combination."
```


---


### Thurivald — highest CR

**Concept:** name: Thurivald | A Huge frost giant jarl. He throws boulders, swings a greataxe, and his roar freezes the blood. AC 17, 180 hit points, cr 9.

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Thurivald | 9 | skirmisher-8-hurler | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- **dropped clause:** "He throws boulders"
- **dropped clause:** "his roar freezes the blood"
- read: def 8 / off 12 → 10; sustained 66 (3 × Greataxe); nova Boulder Toss 49; dmg 77

```
Thurivald

Huge Giant, Neutral Evil

AC 17
Initiative +4 (14)

HP 180 (19d12 + 57)

Speed 50 ft.

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
18
+4
+8
WIS
14
+2
+6
MOD
SAVE
CON
16
+3
+3
CHA
10
+0
+0

Skills Perception +6, Stealth +8

Resistances Cold

Senses darkvision 60 ft.; Passive Perception 16

Languages Giant

CR 9 (XP 5,000; PB +4)

Traits

Frozen Roar. The first time Thurivald is Bloodied in a fight, it releases a burst. Constitution Saving Throw: DC 15, each creature in a 15-foot Emanation originating from Thurivald. Failure: 18 (4d8) Cold damage, and the target has the Poisoned condition until the end of its next turn. Success: Half damage only.

Great Weapon Master. When Thurivald hits a creature with its Greataxe, the attack deals an extra 4 damage.

Long Stride. Thurivald ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Actions

Multiattack. Thurivald makes three attacks, using Greataxe or Boulder in any combination. It can replace one attack with a use of Trip Attack.

Greataxe. Melee Attack Roll: +8, reach 5 ft. 22 (4d8 + 4) Slashing damage.

Boulder. Ranged Attack Roll: +8, range 20/60 ft. 17 (3d8 + 4) Bludgeoning damage.

Boulder Toss (Recharge 5-6). Thurivald hurls a boulder at a point it can see within 90 feet. Dexterity Saving Throw: DC 15, each creature in a 5-foot-radius Sphere centered on that point. Failure: 49 (14d6) Bludgeoning damage. If the target is Large or smaller, it has the Prone condition. Success: Half damage.

Trip Attack. Strength Saving Throw: DC 15, one creature within 30 feet that is Prone. Failure: 14 (4d6) Cold damage. Success: Half damage.

Bonus Actions

Fleet Agility. Thurivald takes the Dash or Disengage action.

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

- Traits/Frozen Roar — template bloodied-burst; library draw (seed unstamped); binds the GM's words: bloodied+wounded+erupt
- Traits/Great Weapon Master — a declared feature; the GM's clause "swings a greataxe"
- Traits/Long Stride — the chassis
- Actions/Multiattack — the chassis
- Actions/Greataxe — authored for this sheet; a named part; the GM's clause "swings a greataxe"; weapon greataxe
- Actions/Boulder — the chassis
- Actions/Boulder Toss — the chassis
- Actions/Trip Attack — library seed exploiter
- Bonus Actions/Fleet Agility — the chassis

**Engine trace**

```
[route] skirmisher-hurler type=Giant mechanics=thrown-weapon, aura — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | skirmisher-hurler: ✓ ("He throws boulders") | skirmisher-hurler: key "throws" (class verb)
[concept] name: "Thurivald" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] hints: hurler→style ✓ ("he throws boulders")
[concept] resolve: archetype=skirmisher type=Giant themes=elemental/terror mind=sapient style=hurler energy=Cold mix=both identity=✓ lore=✓
[concept] name: provided "Thurivald"
[concept] mechanics: thrown-weapon, aura
[concept] signature elements: hurled boulders of packed ice and stone [behavior] | a greataxe swung at the end of a long winter arm [object] | a roar that freezes the blood [aura]
[concept] identity: Thurivald opens by ripping a boulder from the tundra and hurling it into the enemy line, then paces forward with his greataxe to keep the survivors pinned between falling stone and closing steel. Each round he alternates hurled rock and axe sweep, bellowing a roar that rimes the air with frost and slows the warm-bloods around him. He is a jarl to the marrow — proud, patient, and cruel enough to toy with a broken foe rather than finish it, but he does not run; wounded, he plants his feet and roars louder.
[concept] lore: Thurivald rules a drifting ice-shelf clan whose jarls are owed tribute in iron and meat, and he came south to collect what the thaw claimed was his.
[reskin] nova capped: "Hurled Burst" 54 → 49 (the chassis nova obeys the cap: 50 at CR 9)
[reskin] donor: skirmisher-8-hurler -> CR 9 (invented — no printed peer)
[reskin] named parts: Greataxe (slot) — the user's words, the engine's numbers
[reskin] named parts landed: 1 attack row(s), 0 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] proper noun: "Thurivald" — the Name field is a person, not a kind (no print match, no article in the words)
[reskin] inline declared: "Thurivald" — the call's own answer (person), built from the name
[reskin] inline form: "Thurivald" — the model's own reading of the name
[reskin] final price: the round ran 51 against the card's 70 — the attack rows re-solve at 137% (3 attacks on an authored sheet, under the card)
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Thurivald — A Huge frost giant jarl" -> has (header) | "He throws boulders" -> has (mechanical) [asked: attack] | "swings a greataxe" -> has (mechanical) [asked: attack] | "his roar freezes the blood" -> has (mechanical) [asked: condition] | "AC 17" -> has (header) | "180 hit points" -> has (header) | "cr 9" -> has (header)
[reskin] extraction: 2 of 8 model clauses quote nothing the user typed and leave the record ("AC 17", "cr 9")
[reskin] menu pruned: action — thrown-burst-seed, phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "Thurivald digs in his heels and lets out a jarl's bellow that rimes the air with frost, washing over everything close around him before he moves. The cold clings to those caught in it, slowing their feet and stiffening their limbs so they cannot easily close with him or flee from the axe that follows. He can only summon the roar so often, but he loves to use it after the ground is already slick wi" [action/always/condition] — menu: snare, condition-payoff, throw-retrieve, shield-bash, lure, snare-bolt, sensory-strike, disarm, exploiter, pacify, slow-bolt (+ shelf: delayed-brand, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte, affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, isolation, bolt-mark, bolt-restrain)
[reskin] signature bound to the concept's verb: action — slow-bolt (freeze, frost)
[reskin] word match declined by the call: slow-bolt, pacify, condition-payoff — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit" after being shown slow-bolt, which the GM's words keyed
[reskin] key match declined: action — "slow-bolt" was ranked first on the call's own menu for freeze+frost, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: action — "Thurivald digs in his heels and lets out a jarl's bellow that rimes the air with frost, washing over everything close around him before he moves. The cold clings to those caught in it, slowing their feet and stiffening their limbs so they cannot easily close with him or flee from the axe that follows. He can only summon the roar so often, but he loves to use it after the ground is already slick wi" [action/always/condition] — the model found no template that holds it (offered: slow-bolt, snare, condition-payoff, throw-retrieve, shield-bash, lure, snare-bolt, sensory-strike, disarm, exploiter, pacify)
[reskin] fallback respects the call: slow-bolt, pacify, condition-payoff left the shelf — the call declined them for this sheet
[reskin] fallback skipped: thrown-burst-seed (the sheet cannot render it)
[reskin] fallback skipped by the floor: sensory-strike (EV 2.5 vs 9.4)
[reskin] fallback skipped by the floor: disarm (EV 0 vs 9.4)
[reskin] value check: "Opportunist's Lash" EV 10.9 vs floor 9.4 (one attack of 3) — worth the trade
[reskin] library seed drawn: exploiter -> Actions/"Opportunist's Lash" (no template held the idea; a proven shape stands in)
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 17 already beats print's AC 16 at CR 9, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "When Thurivald is wounded badly enough to be roused, the frost in his blood erupts; his roar carries farther, colder, and any who hear it feel the winter settle into their bones and slow them. It happens the moment he is bloodied, and then he is harder to escape and harder to approach." [trait/on_being_hit/condition] — menu: heated-body, absorption, bloodied-burst, resonant-body (+ shelf: adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] signature bound to the concept's verb: trait — terrain-walk (freezes, freeze)
[reskin] word match declined by the call: terrain-walk, heated-body — the key word does not mean the mechanic here
[reskin] signature template (trait): bloodied-burst -> Traits/"Frozen Roar" ("The frost in his blood erupts the moment he is bloodied, a burst that slows/chil [verb: bloodied:concept, wounded:idea, erupt:idea]")
[reskin] feature name: "Opportunist's Lash" -> "Trip Attack" — the card that is this feature takes its name
[reskin] weapons answered: Greataxe = greataxe; Boulder = none; Boulder Toss = none
[reskin] weapon table: "Boulder" — range 30/90 ft. is not a print range; an unlisted thrown thing is 20/60, a hurled mass 60/240 (the critic's third species read)
[reskin] chassis nova: "Boulder Toss (Recharge 5-6)" — the skirmisher-8-hurler's own nova row (its "Hurled Burst", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] defenses by material: a ice body is vulnerable to Fire and never resists, absorbs, or ignores it — the resistance is withheld; the vulnerability is the GM's to type (the Frostmaw carried a Fire vulnerability nobody typed — the critic's second species read)
[reskin] resistances derived: Cold
[reskin] multiattack replacement clause: It can replace one attack with a use of Trip Attack.
audit finding below confidence gate: Frozen Roar The name 'Frozen Roar' and Cold damage imply a freezing effect, but the rider is Poisoned, which is inconsistent with a cold-natured creature's signature state and overlaps awkwardly with Trip Attack's unrelated cold rider.
audit finding below confidence gate: Boulder The Boulder action has no range/area distinction problem, but it duplicates Boulder Toss's thrown-rock identity without any trait explaining how Thurivald carries or sources boulders, creating an unresolved resource question for the GM.
audit finding below confidence gate: Trip Attack A melee-centric giant's trip follow-up against an already-Prone target at 30 feet requires the GM to track Prone state across turns with no reminder of how prone targets are generated, slowing adjudication.
[reskin] user-set: HP 152 -> 180 — a declared field (Resolution 3)
[reskin] multiattack re-read — "Boulder" joins the combination; "Thurivald makes three attacks, using Greataxe or Boulder in any combination. It can replac"
```


---


### Chiming Skitterer — a 2024 sheet

**Concept:**  | role: lurker

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Chiming Skitterer | 4 | lurker-2 | ok | SOFT: aim-hp | ok | ok | ok | ok | ok | ok | ok |

- bands · soft · aim-hp: HP 52 is 31% under the card's 75
- **dropped clause:** "it flees only a verdict it cannot win"
- read: def 3 / off 4 → 3.5; sustained 26 (2 × Glass Leg); nova Chiming Toll 14; dmg 27

```
Chiming Skitterer

Medium Monstrosity, Lawful Neutral

AC 15
Initiative +4 (14)

HP 52 (8d8 + 16)

Speed 30 ft., Swim 30 ft., Climb 30 ft.

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
12
+1
+1

Skills Perception +3, Stealth +8

Resistances Cold

Senses darkvision 60 ft.; Passive Perception 13

Languages Common

CR 4 (XP 1,100; PB +2)

Traits

Amphibious. The skitterer can breathe air and water.

Bloodied Burst. The first time the skitterer is Bloodied in a fight, it releases a burst. Wisdom Saving Throw: DC 14, each creature in a 15-foot Emanation originating from the skitterer. Failure: 7 (2d6) Cold damage, and the target has the Frightened condition until the end of its next turn.

Assassinate. During the first round of each combat, the skitterer has Advantage on attack rolls against any creature that hasn't taken a turn. If the skitterer hits a creature during that round, the target takes an extra 7 (2d6) Cold damage.

Evasion. If the skitterer is subjected to an effect that allows it to make a Dexterity saving throw to take only half damage, the skitterer instead takes no damage if it succeeds on the save and only half damage if it fails. It can't use this trait if it has the Incapacitated condition.

Actions

Multiattack. The skitterer makes two Glass Leg attacks.

Glass Leg. Melee Attack Roll: +6 (with Advantage during the first round of each combat), reach 5 ft. 13 (2d8 + 4) Cold damage.

Chiming Toll (Recharge 5-6). Constitution Saving Throw: DC 14, each creature in a 15-foot Emanation originating from the skitterer. Failure: 14 (4d6) Thunder damage, and the target has the Deafened condition until the end of its next turn. Success: Half damage only.

Bonus Actions

Nimble Escape. The skitterer takes the Disengage or Hide action.

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
- Actions/Glass Leg — the chassis
- Actions/Chiming Toll — template active-toll; library draw (seed unstamped); the GM's clause "chime as they carry it down drowned colonnades"; binds the GM's words: ring+chime
- Bonus Actions/Nimble Escape — rogue kit; the GM's clause "skirmishing pack hunter that harries withdraws and circles back"
- Traits/Amphibious — print's own row
- Traits/Bloodied Burst — template bloodied-burst; library draw (seed unstamped); the GM's clause "ringing its limbs against the stone to terrify its mark into a misturn"; binds the GM's words: ring+bloodied
- Traits/Assassinate — template assassinate; rogue kit; the GM's clause "It opens from ambush in a circling pack"
- Traits/Evasion — template evasion; rogue kit; the GM's clause "skirmishing pack hunter that harries withdraws and circles back"

**Engine trace**

```
[route] lurker type=Monstrosity mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | lurker: ✓ ("It opens from ambush in a circling pack,") | lurker-phantom: the call read "drowned" as not meaning that mechanic here — no override | lurker stands: every key that would override it was read as a figure of speech | lurker: no line key in the words — the model's read of its quote | bane: "Radiant" on the GM's own words "pale sanctified glass"
[concept] synthesis (blank roll): archetype=lurker type=Monstrosity themes=celestial/aquatic mind=sapient style=— lore=✓
[concept] synthesis text: A Lindiren is a single, sapient huntsman of the deep cloisters — a lean, stone-hided skitterer whose many legs are shafts of pale sanctified glass that tick and chime as they carry it down drowned colonnades and up temple walls, its faceted flanks rimed with the cold of old submerged prayer. It opens from ambush in a circling pack, one hunter breaking cover to draw the eye while the others scuttle the colonnade walls and flank, then withdraws on clicking glass limbs the moment a quarry turns to face it, harrying and returning until reach and nerve are spent. Bound by holy purpose, it will not slay the unaware but will not break off a hunt it has judged: at blood it only redoubles the circling, ringing its limbs against the stone to terrify its mark into a misturn, and it flees only a verdict it cannot win. It is fully sapient (INT 10-14), and it is a skirmishing pack-hunter that harries, withdraws, and circles back.
[concept] signature elements: circling pack-hunter that withdraws and returns [behavior] | many-legged skittering glass-limbed body [body] | bone-riming cold of drowned prayer [aura]
[concept] name proposal: Lindiren
[concept] lore: When the sunken temple of the glass cloister drowned, its many-legged wardens were left to guard a congregation long since dust, and they still judge and take any trespasser who enters the flooded nave as a quarry owed to the altar.
[reskin] donor: lurker-2 -> CR 4
[reskin] row gated out: Teleport (teleport) — the concept did not claim this mechanic
[reskin] implied class kept: "rogue" on the GM's own words "skirmishing pack hunter that harries withdraws and circles back" — the key table found none
[reskin] row evicted for the cap: Bonus Actions/"Umbral Step" (chassis filler) leaves so "Evasion" fits — the cap evicts by priority, it does not refuse the newcomer
[reskin] class kit: rogue — "skirmishing pack hunter that harries withdraws and circles back": Cunning Action (Assassin/Cunning Action), Evasion (evasion), Assassinate (assassinate)
[reskin] inline declared: "the skitterer" — the call's own answer (kind), built from the name
[reskin] inline form: "the skitterer" — the model's own reading of the name
[reskin] save dc derived: DC 13 -> 14 (8 + PB 2 + the sheet's best 4) — no stat on the sheet reached it
[reskin] lacks asked: "will not slay the unaware"
[reskin] asked field dropped: the call answered trigger "at_will" for "It opens from ambush in a circling pack" but offered no quote
[reskin] lacks not claimed: "will not break off a hunt it has judged: at blood it only redoubles the circling" reads like a lack to the words, and the call's list did not name it
[reskin] asked field dropped: the call answered trigger "at_will" for "will not break off a hunt it has judged: at blood it only redoubles the circling" but offered no quote
[reskin] lacks not claimed: "it flees only a verdict it cannot win" reads like a lack to the words, and the call's list did not name it
[reskin] asked field dropped: the call answered trigger "at_will" for "it is a skirmishing pack-hunter that harries" but offered no quote
[reskin] clauses: "A Lindiren is a single" -> has (descriptive), head | "sapient huntsman of the deep cloisters — a lean" -> has (descriptive) | "stone-hided skitterer whose many legs are shafts of pale sanctified glass that tick" -> has (descriptive) | "chime as they carry it down drowned colonnades" -> has (descriptive) | "up temple walls" -> has (descriptive) | "its faceted flanks rimed with the cold of old submerged prayer" -> has (descriptive) | "It opens from ambush in a circling pack" -> has (mechanical) | "one hunter breaking cover to draw the eye while the others scuttle the colonnade walls and flank" -> has (descriptive) | "withdraws on clicking glass limbs the moment a quarry turns to face it" -> has (descriptive) | "harrying and returning until reach" -> has (mechanical) | "nerve are spent" -> has (descriptive) | "Bound by holy purpose" -> has (descriptive) | "it will not slay the unaware" -> LACKS (mechanical) | "will not break off a hunt it has judged: at blood it only redoubles the circling" -> has (mechanical) | "ringing its limbs against the stone to terrify its mark into a misturn" -> has (descriptive) | "it flees only a verdict it cannot win" -> has (mechanical) | "It is fully sapient (INT 10-14)" -> has (descriptive) | "it is a skirmishing pack-hunter that harries" -> has (mechanical) | "withdraws" -> has (descriptive) | "circles back" -> has (descriptive)
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "When the skitterer strikes a foe that is already wounded, it rings its glass limbs against the nearest stone and the chime carries through the colonnade, and every other skitterer that can hear it converges on that mark, closing the circle and gaining ground on the wounded quarry. The ringing also drags the hunted creature's eye toward the sound, so its next faltering step takes it further from es" [rider/on_hit/movement] — menu: charge-push, hook-rider, pounce, isolation (+ shelf: leap, gaze-single, condition-payoff, execute, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, terror-pulse, snare-bolt, slow-bolt, sensory-strike, drain, delayed-brand, zone-seed, exploiter, blighted-ground, patient-defense, self-invisibility, focus, feint-slip, coating, rampage, rally, riposte)
[reskin] signature bound to the concept's verb: action — rampage, gaze-single, active-toll, sensory-strike (bloodied, blood, eye, eyes, ring, chime)
[reskin] word match declined by the call: rampage, gaze-single, sensory-strike, obstacle-pull, hook-rider, blighted-ground, charge-push, pounce, isolation — the key word does not mean the mechanic here
[reskin] value check: "Chiming Toll (Recharge 5-6)" EV 37.1 vs floor 23.7 (the whole Multiattack (2 attacks)) — worth the trade
[reskin] signature template: active-toll -> Actions/"Chiming Toll (Recharge 5-6)" ("The wounds trigger the ringing of glass limbs against stone — an audible chime t [verb: ring:concept, chime:concept]")
[reskin] keys spent by the action: ring, chime
[reskin] signature idea (trait): "The skitterer's sanctified glass limbs … faintly as it moves, and when it withdraws from reach after harrying a mark, the sound coils back through the stone and tells it exactly where the hunted thing stands, so it can slip away unseen and return to the circling with its prey still fixed in mind." [trait/always/defense] — menu: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature bound to the concept's verb: trait — faultless-tracker (quarry, hunts, hunted, marked, its mark)
[reskin] word match declined by the call: spider-climb, false-appearance, faultless-tracker, uncanny-sense — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit" after being shown faultless-tracker, which the GM's words keyed
[reskin] key match declined: trait — "faultless-tracker" was ranked first on the call's own menu for quarry+hunts+hunted+marked+its mark, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: trait — "The skitterer's sanctified glass limbs … faintly as it moves, and when it withdraws from reach after harrying a mark, the sound coils back through the stone and tells it exactly where the hunted thing stands, so it can slip away unseen and return to the circling with its prey still fixed in mind." [trait/always/defense] — the model found no template that holds it (offered: faultless-tracker, false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst)
[reskin] concept-first trait skipped: faultless-tracker — the call read its match as a collision (the word is a modifier, or the sheet already answers it)
[reskin] concept-first trait skipped: spider-climb — the call read its match as a collision (the word is a modifier, or the sheet already answers it)
[reskin] trait bound to the concept's verb (concept-first): bloodied-burst — ring+bloodied in the user's words; the idea path had nothing
[reskin] signature template (trait): bloodied-burst -> Traits/"Bloodied Burst" ("exact concept match [verb: ring:concept, bloodied:concept]")
[reskin] weapons answered: Glass Leg = none
[reskin] amphibious by concept: a creature of the deep breathes both (print: the Sea Hag's)
[reskin] speed by concept: added Climb 30 ft. — the concept's movement set decides
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] defenses by material: a glass body is vulnerable to Thunder and never resists, absorbs, or ignores it — the resistance is withheld; the vulnerability is the GM's to type (the Frostmaw carried a Fire vulnerability nobody typed — the critic's second species read)
[reskin] resistances derived: Cold
[reskin] row binds its clause: "Chiming Toll" answers "chime as they carry it down drowned colonnades" — the keys it matched came from that clause, so the coverage credit has a receipt
[reskin] row binds its clause: "Bloodied Burst" answers "ringing its limbs against the stone to terrify its mark into a misturn" — the keys it matched came from that clause, so the coverage credit has a receipt
[reskin] save re-derived after a retype: Traits/Bloodied Burst — a Constitution save for an effect that calls for Wisdom or Charisma; the save follows the condition
audit finding below confidence gate: Bloodied Burst The save is triggered by the skitterer becoming Bloodied but the text never says the skitterer can't be among the creatures in the Emanation, and more importantly nothing states whether the burst requires an action, reaction, or happens automatically; the trigger 'the first time the skitterer is Bloodied' does give timing implicitly, but the forced save lacks any statement that it occurs without an action cost. This is adjudicable enough that I should not flag it — dropping.
```


---

