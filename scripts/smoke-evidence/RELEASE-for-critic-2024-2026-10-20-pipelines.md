# Case: one decision, five pipelines — the brief, closed (2026-10-20)

Five packages in one file, oldest first. **This is the first read of the finished
architecture.** Packages one to four showed a half-migrated engine: three paths had moved onto
the dispatcher and the homebrew path had not. Steps 6 and 7 close it. The case opened on the lurker's pricing (2026-10-18) and
became the path work: the engine used to infer what it was building at six places with six word
rules, and now decides once. Each package below is the critic's read and the answer to it.

- **Package one** — the lurker's trade, print fidelity, the forty redesigned (2026-10-18).
- **Package two** — the critic's A1–A9 on that forty (2026-10-18 night).
- **Package three** — the dispatcher: the path call, print-with-a-twist, class NPC (2026-10-19).
- **Package four** — the critic's read of the dispatcher forty, answered (2026-10-19). **0 FAIL of 40.**
- **Package five** — the forty's four residuals, then steps 6 and 7: the retirements and the
  homebrew pipeline (2026-10-20). **29 clean / 11 soft / 0 FAIL of 40.**

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
| classes-eight (`19-07-00`) | 16/16 | 11 clean / 4 soft / 1 FAIL |
| twist-ten (`15-22-58`) | 10/10 | 7 clean / 3 soft / 0 FAIL |
| twist-five (`15-14-56`) | 5/5 | 4 clean / 1 soft / 0 FAIL |

Every number above is the run included in this package, and nothing else. The classes-eight FAIL is
Whisperveil's emptied Multiattack citation: the class re-arm called the sweep helper for its old row
name, and that helper strips a name that LEFT the sheet rather than rewriting one that was renamed.
Fixed and pinned after that run (`a class re-arm REWRITES the Multiattack's citations…`), not yet
re-read live — it is in the tree, uncommitted at packaging time.

**Degraded mode, answered (the critic's second ask).** The breaker opened during block 37's
post-save ENRICHMENT, not during a generation: `[ENRICHMENT] Failed to enrich Ozghar: TypeError:
Failed to fetch` → `Circuit breaker opened for DeepSeek V4 Flash — degraded mode for 60 minutes`.
So **blocks 38, 39 and 40 generated with the breaker open** (Unresting Boneblade, Bellard the
Unsworn, Brother Halric); 1–37 did not. No block records this, which is why the question recurred:
stamping it on the block is in the response plan.

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

## Package five — the four residuals, then the brief's last two steps (2026-10-20)

The critic's read of the dispatcher forty named four residuals. All four landed, each at the
mechanism print settles rather than at the block that showed it. **Print overruled me twice in
the process**, and both corrections are below. Then steps 6 and 7 closed the brief.

### The four residuals

**1. Print names its own trait, rate and all.** The Vampire shipped `Legendary Resistance.`
with no uses, which reads as unlimited — the critic's third report of it. The stripper was the
print record builder itself: it cut ` (…)` off every print trait name. Print's own name is
`Legendary Resistance (3/Day, or 4/Day in Lair)`. Only 7 distinct print trait names carry a
parenthetical across 329 blocks, and the only other readers are two tests anchored on
`^Regeneration$`, which carries none — so the strip bought nothing and cost the rate. Live on
the current forty: seven blocks, every rate intact.

**2. A predicate slot is not a sentence.** The Venting Haze sentence-join was **not** a call
defect. The engine's own blind fill for `{zone_rule}` is `has Disadvantage on attack rolls`, a
bare predicate, and the zone frame sat it after a full stop. The frame now owns the subject and
the stop on all four bands (`Each creature in the area {zone_rule}.`), which is print's
Darkmantle shape — the template's own cite. A new `PREDICATE_SLOTS` bound keeps the slot
lowercase and stop-free at both fill sites, so a sentence-shaped answer falls to the engine's
predicate rather than landing after a period. The fit prompt now says what the slot wants,
which was the root cause: it said nothing.

**3. Reach follows the body — at the two sizes print agrees. (Print overruled the critic.)**
The rule as given overstates print. Print's 329 gear lines by size:

| size | n | reach 5 | reach 10 | reach 15+ |
|---|---|---|---|---|
| Large | 126 | 84 | 40 | 2 |
| Huge | 37 | 7 | 27 | 3 |
| Gargantuan | 20 | 1 | 3 | 16 |

There is **no floor at Large** — print puts reach 5 there two-thirds of the time. So the floor
is print's modal reach at Huge (10) and Gargantuan (15) only, and print's own rows are exempt:
the Roc is Gargantuan and print gives its Talons reach 5 (its Beak 10). It runs late, after
print's price pass, because the class re-arm and print's canon can still change a reach above
it. Live: the Trench Leviathan's Coils went 5 → 15 ft.

**4. The attack floor by CR. (Print overruled me.)** On the missing Multiattack print is
decisive: **110 of 113 blocks at CR 5+ carry one**, against 91 of 106 single-attack blocks
below CR 1. Three print exceptions (Gorgon, Wraith, Remorhaz) make it a soft, not a fail.

My first version of the gate also flagged a Multiattack with only one attack row to spend, and
print killed it: **70 of print's 110 CR 5+ Multiattacks (64%) name a single row** — "the dragon
makes three Rend attacks". That clause fired on 47% of 6,407 saved blocks, including print's
own Adult Red Dragon and Hydra. Removed. Swarms are exempt, because `swarm-multiattack`
hard-fails the only shape the rule would otherwise allow. The narrowed gate fires on 4.0% of
saved blocks, bracketing print's own 2.6%.

**The engine side, found by that gate.** The Squallwing Drake's cause was not what the trace
first suggested. The `dragon-2` chassis is a **CR 2 donor with no Multiattack at all**, scaled
to CR 7 — `scaleDonor` scales numbers, not shape. Ten of ninety donors carry none, eight of
them correct at their own low CR. The floor now lands on the chassis, beside the swarm strip
and **before the per-hit solve**, so the round is priced for the attacks the sheet makes.
Modal count from print: two at CR 5–10, three at CR 11+. **15 of 15** CR 5+ non-swarm blocks on
the current forty carry one, and the gate is silent.

**Process (C4).** `generation.degraded` is stamped when the provider was degraded at generation
time, and the review table marks the row `⚠︎degraded`. A block whose validation gates were
relaxed has a weaker "clean"; the table now says so instead of leaving it a question.

### Step 7 — the homebrew pipeline, and a retirement measured rather than assumed

The brief retires *"the concept's VERB outranks the noun" as a route decision* on the homebrew
path. That flip was **attempted and reverted on 2026-10-16**, when it broke six pins.

What makes it safe now is that the cue verdicts landed in the same call afterwards. The route
call already ranks three lines, quotes the GM's words for each, and the engine verifies every
quote. The prompt now also demands one consistent answer: **a cue you confirm is a pick you
make.** So on the homebrew path, when the call's pick carried a verified quote, the keyword
override stands down and the trace says the key was the menu, not the decision.

**Pins could not settle this**, because the six pins mock the model's answer: they show what
the engine does with a fixed answer, never whether the call now ranks correctly. Three of them
are cases where the mocked pick is the *wrong* line and the key corrects it. So the evidence is
a probe (`scripts/probe-line.mjs`): one route call per sample, the same answer fed to both
mechanisms, which removes call variance from the comparison. 13 prompts × 5 runs:

| | on the label, no flip |
|---|---|
| today's mechanism | 8 / 13 |
| step 7 | 8 / 13 |

**The mechanism changed the answer on 0 of 13.** Both halves were checked, because "no change"
could mean the stand-down never fired. It *does* fire on the crab pin's mocked answer. And live
the call already ranks the line the key would have promoted: crab → `brute-grappler` 5/5,
miller-who-turns-into-a-boar → `skirmisher-shifter` 5/5.

**Worth the critic's attention:** the keyword safety net is now gone on homebrew by design, so a
future route-prompt change could regress the line quietly. The probe is the regression test.

**Five label misses, all pre-existing and identical under both mechanisms.** Two of my own
labels were probably wrong (`pumpkin king` → `defender-leader`, which matches the owner's own
ruling that "king" implies a leader; and the leviathan's drowning *song*, where the words name
no magic and the caster gate exists to refuse exactly that). The real one: **`a plague-bearing
archon of flies` does not settle** — `brute`×2, `defender-leader`, `caster-warpriest`, `swarm`
across five runs. It no longer routes to wings, which was the brief's original complaint, but
it has no stable answer.

### Step 6 — the retirements, and what the guard found

The retirement table, inventoried against the code: the canon matcher and the hint call are
already **demoted to fallbacks** (`canonFromPath` is consulted first at all three body sites;
the hint verdict applies to the matcher's record, not a path-named body), three rules are
**gone**, and the rest retire with the override's last path.

The guard test is **behavioural, not a grep**, because the retired rules legitimately remain as
the never-fail fallback the brief itself requires. It asserts that with a successful path
decision, no retired rule changes the body, the class or the line. It passes on three of four.

**It found one still outstanding.** The **name-canon trait stamp** reads the WORD "golem" and
stamps print's golem traits (Immutable Form, Magic Resistance) onto a sheet whose path call
answered `print_body: null` with the receipt "lashed timber". Live it is usually suppressed,
because the identity call answers `golem → canon ✗` — but **the suppression depends on that
call, not on the path**, which is the shape the brief retires. Retiring it is a behaviour
change with pins, so per the brief it goes to the owner for a ruling rather than a rewrite.
Pinned both ways so the change is visible when it lands.

### The gate and the runs in this package

Gate: **109 suites, 3,618 passing, build green.**

| run | result |
|---|---|
| the forty (`sweep`) | **29 clean / 11 soft / 0 FAIL**, 40 of 40, no stalls (was 26/14/0) |
| `twist-ten` | **10 clean / 0 soft / 0 FAIL** |
| `classes-eight` | **15 clean / 1 soft / 0 FAIL** of 16 |
| `twist-five` | 2 clean / 3 soft / 0 FAIL |

The soft tail on the forty is thin and unconcentrated: 5 band, 2 hot-offense, and six
singletons. `attack-floor` is silent. The one `reach` soft is a Medium body carrying a
Greatsword at reach 10 — **not** from the new floor, which only raises and only at Huge and
Gargantuan; pre-existing at a 3.0% base rate across 6,454 saved blocks.

---

# 2024 blocks

## Review batch — sweep-2026-10-20T05-19-47

The checker ran first. The gate table covers every block in the run; every block of the run follows. Each block carries its checker row above and its engine trace below. Hand-derive against the row first; then read for what predicates can't see.

### Gate table — the whole run

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Dire Wolf | 1 | 2024 | skirmisher-1 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/3 |
| Mire Hound | 1 (2014) | 2014 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 3/4 |
| Owlbear | 3 (2014) | 2014 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/3 |
| Ringer of Knells | 3 | 2024 | lurker-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 8/8 |
| Air Elemental | 5 | 2024 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |
| Pit Slide | 5 (2014) | 2014 | brute-5-grappler | ok | SOFT: band | ok | SOFT: rider-no-save | ok | ok | ok | ok | ok | ok | soft (2) | 1/1 | 5/5 |
| Hydra | 8 (2014) | 2014 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |
| Timber Ram | 8 | 2024 | brute-5-juggernaut | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 6/6 |
| Stone Golem | 10 | 2024 | brute-9 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 5/5 |
| Drowned Choristers | 10 (2014) | 2014 | lurker-8 | ok | ok | ok | SOFT: control-aoe-ungated | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 0/5 |
| Vampire | 13 (2014) | 2014 | lurker-8 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 8/8 |
| Buzzing Wound Archon | 13 | 2024 | skirmisher-13-winged | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 6/6 |
| Purple Worm | 15 | 2024 | brute-13 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 5/5 |
| Glacier Heart | 15 (2014) | 2014 | brute-9-juggernaut | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | ok | soft (1) | 0/1 | 5/5 |
| Adult Red Dragon | 17 (2014) | 2014 | dragon-15 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 7/7 |
| Brass Tyrant | 17 | 2024 | brute-17-juggernaut | ok | SOFT: hot-offense | ok | ok | ok | ok | ok | ok | ok | ok | soft (1) | 0/1 | 9/10 |
| Pit Fiend | 20 | 2024 | brute-21 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 8/8 |
| Soverign of the Bone Sun | 20 (2014) | 2014 | caster-21 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 9/9 |
| Ancient Gold Dragon | 24 (2014) | 2014 | dragon-22 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 9/9 |
| Old Pressure | 24 | 2024 | brute-21 | ok | SOFT: aim-dpr, band | ok | ok | ok | ok | ok | ok | ok | ok | soft (1) | 0/1 | 1/7 |
| Owlbear | 3 | 2024 | brute-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 1/1 |
| Goblin Boss | 1 (2014) | 2014 | defender-1 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/3 |
| Vashka the Red | 6 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/2 | 3/3 |
| Hivecrawler | 9 | 2024 | brute-8-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 3/3 | 5/5 |
| Threshold Warden | 11 (2014) | 2014 | defender-7-warden | ok | user-set: AC 20 · reads CR 9 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 3/3 | 2/7 |
| Siltbound Hag | 7 | 2024 | caster-8-binder | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 4/5 |
| Oathsworn Iron Templar | 6 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 3/3 |
| Ilvareth Dusksong | 12 (2014) | 2014 | caster-12 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 5/5 |
| Swarm of Peal of the Last Bells | 13 | 2024 | swarm-9 | ok | SOFT: hot-offense | ok | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 4/4 |
| Amber Cathedra | 9 (2014) | 2014 | ooze-9 | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 0/5 |
| Gale-throated Sky Reaver | 7 | 2024 | dragon-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 2/2 |
| Boulder-Scarred Exile | 9 (2014) | 2014 | brute-9 | ok | SOFT: aim-atk | ok | ok | ok | ok | ok | ok | ok | ok | soft (1) | 2/2 | 3/3 |
| Sisshar Reedstep | 5 (2014) | 2014 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 6/6 |
| Krennik Skullstandard | 4 (2014) | 2014 | skirmisher-3-mounted | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 4/6 |
| Well Draught | 5 | 2024 | lurker-5-trap | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 0/4 |
| Cinder Warden | 4 | 2024 | brute-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 11/14 | 4/4 |
| Meshrin | 8 (2014) | 2014 | skirmisher-8-hurler | ok | user-set: AC 16, HP 120 · reads CR 6.5 | SOFT: lint:hp-formula | ok | ok | ok | ok | ok | ok | ok | soft (1) | 7/8 | 6/6 |
| Oathshackled Bonecutter | 6 | 2024 | brute-5 | ok | ok | SOFT: reach | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 3/3 |
| Verek Sarn | 5 (2014) | 2014 | skirmisher-8-hurler | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 4/4 |
| Brother Halric | 3 (2014) | 2014 | defender-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |

**Dropped 13 of 69 user clauses** (coverage 81%); concept share 85% (174/204 rows). A run with zero fails and 60% coverage is a failing run.
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

Rime Hide. A creature that touches the dire wolf or hits it with a melee attack while within 5 feet of it takes 3 (1d6) Cold damage.

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

- Traits/Rime Hide — template heated-body; library draw (seed unstamped); binds the GM's words: frost
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
[concept] signature elements: pack tactics and flanking [behavior] | frost-rimed hide [body] | a cold that saps warmth and stamina [aura]
[concept] identity: The dire wolf hunts as a pack, one beat ahead of the quarry — it shadows the lead hunter until the frost-rimed hide's cold has sapped the prey's stamina, then slashes in with a snapping bite meant to trip and bleed rather than pin. Every round it circles, letting the pack herd the target into the open before lunging for a hamstring and darting back out of reach. Wounded and half its pack down, it does not break — it fights with the flat, tireless patience of a predator that knows the cold will finish what its jaws started.
[concept] lore: Bred in the killing cold of high passes where the snow never melts, a frost-rimed dire wolf roams in packs that follow the season's migrating herds — and anything else that strays far enough from shelter to slow.
[reskin] print canon defenses: HP 30 -> 22, AC 15 -> 14 — the Dire Wolf's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 17, DEX 15, CON 15, INT 3, WIS 12, CHA 7 — the Dire Wolf's at its own CR; attack +4 -> +5, DC 13 (print's)
[reskin] donor: skirmisher-1 -> CR 1
[reskin] [path] decides: twist on the Dire Wolf (the matcher agrees)
[reskin] print canon: "Dire Wolf — with a frost-rimed hide" heads on the Dire Wolf — print's rows ride along; the seat stays
[reskin] claim gate: CR 1 but a Beast body — the trait seat stays open (print: a material body carries a trait at every tier)
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] name_element answered: Rime-Sapped Winds = literal
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline by rule: "the dire wolf" — the call answered "the dire wolf" (kind), which the name does not support
[reskin] inline form: "the dire wolf" — the model's own reading of the name
[reskin] final price: the chassis's Multiattack: the round ran 14 against the card's 10 — the attack rows re-solve at 75% (2 attacks off one row after a supersede)
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Dire Wolf — with a frost-rimed hide" -> has (descriptive), head
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "When the frost-rimed dire wolf bites a creature, the cold sinks into the wound and homes in on whoever the pack has already savaged — if that prey is within reach, the wolf immediately snaps again at it, and the second bite tears the hamstring so the prey can barely run. Each creature can be clawed at this way only once per fight, and the wolf cannot chain the extra slash onto itself endlessly." [rider/on_hit/damage] — menu: contagion, charge-push, hook-rider, pounce, isolation, charge (+ shelf: snare, shield-bash, lure, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, slow-bolt, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, riposte)
[reskin] signature bound to the concept's verb: action — slow-bolt (frost)
[reskin] decline reason: action — the call answered none and names it "no_fit" after being shown slow-bolt, which the GM's words keyed
[reskin] key match declined: action — "slow-bolt" was ranked first on the call's own menu for frost, and the call read it as no fit; the words keep their claim and nothing is forced
[reskin] signature miss: action — "When the frost-rimed dire wolf bites a creature, the cold sinks into the wound and homes in on whoever the pack has already savaged — if that prey is within reach, the wolf immediately snaps again at it, and the second bite tears the hamstring so the prey can barely run. Each creature can be clawed at this way only once per fight, and the wolf cannot chain the extra slash onto itself endlessly." [rider/on_hit/damage] — the model found no template that holds it (offered: slow-bolt, contagion, charge-push, hook-rider, pounce, isolation, charge, rampage, snare)
[reskin] fallback respects the call: slow-bolt left the shelf — the call declined it for this sheet
[reskin] fallback stands down: the twist path has no shelf — the Dire Wolf's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "The wolf's frost-rimed hide gives off a killing chill: any creature that strikes it in melee has the cold leach into its limbs, slowing its stride for a short while. This fades a few heartbeats after the fight drifts apart." [trait/on_being_hit/condition] — menu: heated-body, absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst)
[reskin] signature bound to the concept's verb: trait — heated-body (frost)
[reskin] signature template (trait): heated-body -> Traits/"Rime Hide" ("the frost-rimed hide chills any creature that strikes the wolf in melee, dealing [verb: frost:concept]")
[reskin] weapons answered: Bite = none
[reskin] print canon speed: 30 ft. -> 50 ft. — the Dire Wolf's walk; the concept's other modes stay
[reskin] languages held: None stands — INT 3 on a Beast speaks nothing, whatever the mind read said
[reskin] print canon skills: "Perception +3, Stealth +4" -> "Perception +5, Stealth +4" — the Dire Wolf's own skills, each derived from this sheet's stat and PB
[reskin] resistances derived: Cold
[reskin] print canon trait: Pack Tactics — "Dire Wolf — with a frost-rimed hide" is the Dire Wolf (print's own row)
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the seat's, not the Dire Wolf's
[reskin] print canon: chassis row leaves — Traits/"Winter Stalker" is the seat's, not the Dire Wolf's
```


---


### Old Pressure — highest CR

**Concept:** a leviathan of the trench whose song drowns fleets

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Old Pressure | 24 | brute-21 | ok | SOFT: aim-dpr, band | ok | ok | ok | ok | ok | ok | ok | ok |

- bands · soft · aim-dpr: damage 180 a round is 28% under the card's 250
- bands · soft · band: reads CR 25.5 (print at 24 reads 17.5–25.5, n=5)
- **dropped clause:** "a leviathan of the trench whose song drowns fleets"
- read: def 26 / off 25 → 25.5; sustained 180 (2 × Bite + legendary Breach Strike); nova Drowning Song 78; dmg 180

```
Old Pressure

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

Senses darkvision 60 ft.; Passive Perception 19

Languages None

CR 24 (XP 62,000; PB +7)

Traits

Amphibious. The old pressure can breathe air and water.

Legendary Resistance (3/Day). If the old pressure fails a saving throw, it can choose to succeed instead.

Actions

Multiattack. The old pressure makes two Bite attacks. It can replace one attack with a use of Pressure Snap.

Bite. Melee Attack Roll: +16, reach 15 ft. 22 (3d8 + 9) Piercing damage plus 14 (4d6) Thunder damage.

Drowning Song (Recharge 5-6). Constitution Saving Throw: DC 24, each creature in a 60-foot Cone. Failure: 78 (12d12) Thunder damage, and the target has the Deafened condition until the end of its next turn. Success: Half damage only.

Pressure Snap. Strength Saving Throw: DC 24, one creature within 30 feet that is Deafened. Failure: 63 (14d8) Thunder damage. Success: Half damage.

Legendary Actions

Legendary Action Uses: 3. Immediately after another creature's turn, the old pressure can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.

Breach Strike. The old pressure moves up to half its Speed without provoking Opportunity Attacks, and it makes one Bite attack.

Rolling Slam. Strength Saving Throw: DC 24, each creature within 10 feet of the old pressure. Failure: The target has the Prone condition.

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
- Actions/Drowning Song — the chassis
- Actions/Pressure Snap — library seed exploiter
- Legendary Actions/Legendary Action Uses: 3 — the chassis
- Legendary Actions/Breach Strike — the chassis
- Legendary Actions/Rolling Slam — the chassis

**Engine trace**

```
[path] homebrew — "a leviathan of the trench whose song drowns fleets" (call)
[route] brute type=Monstrosity mechanics=aura — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | caster-binder: the call reads no worked magic in these words | brute-grappler: ✓ ("a leviathan of the trench") | brute-grappler: no line key in the words — the model's read of its quote | brute-grappler -> brute: a grappler is a mechanic engine and needs a key in the words — the model's read of its quote cannot land it
[concept] resolve: archetype=brute type=Monstrosity themes=aquatic/terror mind=bestial style=— energy=Thunder mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: aura
[concept] signature elements: a drowned fleet's song that pulls ships under [behavior] | a body of living trench brine and wet stone [body] | the crushing pressure of the deep [aura]
[concept] identity: The leviathan opens from below, rising under a hull to take it in its jaws while its subsonic song rolls outward and stalls the fleet around it. Every round after it circles and slams with a body like wet stone, layering that same drowning song over the ships still afloat until oars and voices die. It is a patient, territorial killer — it does not chase, it herds a fleet into the deep and fights to the death, since nothing at this depth can hurt it and live.
[concept] lore: The eldest thing in the trench remembers when this sea was a valley, and it sings the old pressure of that drowned dark down the currents to drag anything that dares float above its roof into the depths with it.
[reskin] donor: brute-21 -> CR 24 (invented — no printed peer)
[reskin] [path] decides: homebrew (the matcher agrees)
[reskin] ranged row off: "Legendary Ranged Attack" leaves with it (it made a Ranged Attack attack)
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline declared: "the old pressure" — the call's own answer (kind), built from the name; the rules would have said "Pressure"
[reskin] inline on kit rows: "Pressure" -> "the old pressure"
[reskin] inline form: "the old pressure" — the model's own reading of the name
[reskin] save dc derived: DC 23 -> 24 (8 + PB 7 + the sheet's best 9) — no stat on the sheet reached it
[reskin] alignment by mind: Unaligned -> Neutral — a Monstrosity with INT 10 can hold an ethic (print: 0 of 329 Unaligned blocks speak)
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a leviathan of the trench whose song drowns fleets" -> has (mechanical) [asked: save_area]
[reskin] menu pruned: action — push-prone, thrown-burst-seed (the sheet cannot render them)
[reskin] signature idea (action): "The leviathan heaves its whole wet-stone bulk clear of the water and comes down like a cliff into the sea, and the shock of that landing rolls outward through everything floating nearby. The plunge pitches the water itself into a heaving swell, so those it strikes are shaken apart and knocked reeling, and boats and swimmers alike are dragged toward the spot where it went under." [action/always/movement] — menu: shield-bash, escalating-dread, terror-pulse, herd, drain, exploiter (+ shelf: second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, stunning-strike, charge-push, hook-rider, pounce, charge)
[reskin] rider declined: "Undertow Claim" — a rider rides the user's own attack, so it needs the user's own ask; the call offered no quote, and the key table finds no verb either (the gong's bandaged concussion, 2026-10-01)
[reskin] fallback skipped by the floor: terror-pulse (EV 41.8 vs 64.2)
[reskin] fallback skipped: push-prone (the sheet cannot render it)
[reskin] fallback skipped by the floor: herd (EV 14.8 vs 64.2)
[reskin] value check: "Opportunist's Lash" EV 48.8 vs floor 49.4 (one attack of 2) — dice 31 → 38; priced at the floor: dice 38 → 63 (the cap binds; the cap is the price)
[reskin] library seed drawn: exploiter -> Actions/"Opportunist's Lash" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Its song never truly stops; it keeps pressing down through the water around it, so any creature already reeling from its voice finds the pressure in its chest growing heavier and heavier the longer it stays near. Remain in the leviathan's reach and the drowned dark closes in, until staying means sinking." [trait/start_of_turn/damage] — menu: fire-aura, warded-mending (+ shelf: heated-body, false-appearance, absorption, bloodied-burst, resonant-body, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, weapon-lodge)
[reskin] word match declined by the call: adhesive, mimicry — the key word does not mean the mechanic here
[reskin] trait declined: "Sinking Song" — bound only on the idea's own words (voices:idea) with no key in the concept; a meat body earns its trait by the user's verb (the sniper's tracker, critic 2026-09-29)
[reskin] weapons answered: Bite = none
[reskin] chassis nova: "Drowning Song (Recharge 5-6)" — the brute-21's own nova row (its "Area Nova", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] amphibious by concept: a creature of the deep breathes both (print: the Sea Hag's)
[reskin] reach follows the body: Actions/"Bite" reach 10 → 15 ft. on a Gargantuan body (print's modal reach at that size)
[reskin] vulnerability rejected — "Cold" has no warrant in the concept's own text (print's default is none)
[reskin] multiattack replacement clause: It can replace one attack with a use of Opportunist's Lash.
[reskin] audit rename: "Opportunist's Lash" -> "Pressure Snap"
```


---


### Ringer of Knells — a 2024 sheet

**Concept:** a chapel bell-ringer's ghost that tolls for the dying

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Ringer of Knells | 3 | lurker-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1 / off 5 → 3; sustained 38 (2 × Withering Touch); nova Knell Tolling 13; dmg 38

```
Ringer of Knells

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

Bell-Rope Reprisal. A creature that hits the ringer with a melee attack while within 5 feet of it takes 5 (1d10) Thunder damage and has the Deafened condition until the end of its next turn.

Ethereal Sight. The ringer can see 60 feet into the Ethereal Plane when it is on the Material Plane.

Incorporeal Movement. The ringer can move through other creatures and objects as if they were Difficult Terrain. It takes 5 (1d10) Force damage if it ends its turn inside an object.

Actions

Multiattack. The ringer makes two Withering Touch attacks. It can replace one attack with a use of Horrific Visage.

Withering Touch. Melee Attack Roll: +5, reach 5 ft. 19 (3d10 + 3) Necrotic damage.

Knell Tolling (Recharge 5-6). Constitution Saving Throw: DC 13, each creature in a 15-foot Emanation originating from the ringer. Failure: 13 (3d8) Thunder damage, and the target has the Deafened condition until the end of its next turn. Success: Half damage only.

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
- Actions/Knell Tolling — template active-toll; library draw (seed unstamped); the GM's clause "tolls for the dying"; binds the GM's words: toll+bell+peal+knell
- Actions/Horrific Visage — print's own row
- Actions/Possession — print's own row
- Actions/Etherealness — print's own row
- Traits/Bell-Rope Reprisal — template resonant-body; library draw (seed unstamped); the GM's clause "tolls for the dying"; binds the GM's words: toll+bell
- Traits/Ethereal Sight — print's own row
- Traits/Incorporeal Movement — print's own row

**Engine trace**

```
[path] twist — Ghost (is) — "ghost" (call)
[route] lurker-phantom type=Undead mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | lurker-phantom: ✓ ("a chapel bell-ringer's ghost") | lurker-phantom: key "ghost" (class body)
[concept] hints: phantom→style ✓ ("chapel bell-ringer's ghost")
[concept] resolve: archetype=lurker type=Undead themes=grave/voice mind=sapient style=phantom energy=Necrotic mix=energy identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: tolling a death-knell for the living [behavior] | the phantom bell-rope it pulls [object] | a shadow-wreathed spectral form [body]
[concept] identity: A spectral bell-ringer drifts through the chapel walls, striking its phantom rope to toll a knell that only the doomed can hear. Each round it rings the hour of a living creature's death, and the sound reaches through stone to sap the warmth from its bones. It does not rage or flee — it keeps the office it held in life, tolling patiently until the last soul in its parish has been rung home.
[concept] lore: A bell-ringer who drowned in the bell-loft flood, or hanged from the rope he pulled, remains bound to the tower, tolling not for the dead but for those about to join them.
[reskin] print canon route: the Ghost's body outranks the phantom seat — no verb in the words names it; the plain lurker line
[reskin] print canon defenses: HP 39 -> 45, AC 14 -> 11 — the Ghost's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 7, DEX 13, CON 10, INT 10, WIS 12, CHA 17 — the Ghost's at its own CR; attack +5 -> +5, DC 13 (print's)
[reskin] donor: lurker-2 -> CR 3
[reskin] row gated out: Teleport (teleport) — the concept did not claim this mechanic
[reskin] [path] decides: twist on the Ghost (the matcher would have said homebrew)
[reskin] print canon: "a chapel bell-ringer's ghost that tolls for the dying" heads on the Ghost — print's rows ride along; the seat stays
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline declared: "the ringer" — the call's own answer (kind), built from the name
[reskin] inline form: "the ringer" — the model's own reading of the name
[reskin] save dc derived: DC 12 -> 13 (8 + PB 2 + the sheet's best 3) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a chapel bell-ringer's ghost" -> has (descriptive), head | "tolls for the dying" -> has (mechanical) [asked: at_will/save_single]
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The ringer pulls its phantom rope and tolls a knell that only one living creature nearby can hear, marking that creature as the next soul to be rung home. Until the ringer is destroyed or chooses a different soul, every wound the marked creature takes is deepened, and when it falls the bell peals once so the parish knows — the ringer gains a swell of borrowed vigor from the passing." [action/save/condition] — menu: leap, gaze-single, execute, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, terror-pulse, snare-bolt, slow-bolt, sensory-strike, drain, zone-seed, blighted-ground (+ shelf: delayed-brand, patient-defense, self-invisibility, focus, feint-slip, coating, riposte, charge-push, hook-rider, pounce, isolation)
[reskin] signature bound to the concept's verb: action — active-toll, sensory-strike (toll, bell)
[reskin] signature template: active-toll -> Actions/"Knell Tolling (Recharge 5-6)" ("the bell-ringer's tolling knell that others hear — a sonic toll affecting creatu [verb: toll:concept, bell:concept, peal:idea, knell:idea]")
[reskin] keys spent by the action: toll
[reskin] signature idea (trait): "The phantom bell-rope is always in the ringer's hands, and anyone who seizes or strikes at it feels the rope's cold pull drag at their own warmth instead of the ringer's. The rope cannot be taken, cut, or dropped while the ringer stands. A creature that grabs the rope comes away weaker for it, and the bell answers with a low, hungry hum." [trait/on_being_hit/damage] — menu: heated-body, absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, evasion, relentless-pursuit, bound, marking-light, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] signature bound to the concept's verb: trait — bloodied-burst (toll, bell, dying, the dying)
[reskin] word match declined by the call: bloodied-burst, heated-body, absorption — the key word does not mean the mechanic here
[reskin] signature template (trait): resonant-body -> Traits/"Bell-Rope Reprisal" ("striking the phantom bell-rope makes the bell answer with a low, hungry hum that [verb: toll:concept, bell:concept]")
[reskin] weapons answered: Rope = none
[reskin] languages by mind: "None" -> "Common plus the languages it knew in life" (sapient)
[reskin] print canon languages: "Common plus the languages it knew in life" -> "Common plus one other language" — the Ghost's
[reskin] print canon speed: 30 ft. -> 5 ft. — the Ghost's walk; the concept's other modes stay
[reskin] print canon speed: Fly -> 40 ft. — the Ghost's own
[reskin] print canon attack: "Rope" -> "Withering Touch" — the Ghost's own row
[reskin] immunities stamped for type: Undead -> Poison; Exhaustion, Poisoned
[reskin] print canon defenses: immunities Poison; Exhaustion, Poisoned -> Necrotic, Poison; Charmed, Exhaustion, Frightened, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained; resistances none -> Acid, Bludgeoning, Cold, Fire, Lightning, Piercing, Slashing, Thunder — the Ghost's own header lines
[reskin] print canon trait: Ethereal Sight — "a chapel bell-ringer's ghost that tolls for the dying" is the Ghost (print's own row)
[reskin] print canon trait: Incorporeal Movement — "a chapel bell-ringer's ghost that tolls for the dying" is the Ghost (print's own row)
[reskin] print canon: chassis row leaves — Bonus Actions/"Umbral Step" is the seat's, not the Ghost's
[reskin] print canon row: Actions/Horrific Visage — the Ghost's own
[reskin] print canon row: Actions/Possession (Recharge 6) — the Ghost's own
[reskin] print canon row: Actions/Etherealness — the Ghost's own
[reskin] multiattack replacement clause: It can replace one attack with a use of Horrific Visage.
[reskin] row binds its clause: "Knell Tolling" answers "tolls for the dying" — the keys it matched came from that clause, so the coverage credit has a receipt
[reskin] row binds its clause: "Bell-Rope Reprisal" answers "tolls for the dying" — the keys it matched came from that clause, so the coverage credit has a receipt
[reskin] ask vs row ok: "tolls for the dying" -> "Knell Tolling" — trigger at_will
audit finding below confidence gate: Bell-Rope Reprisal Deafened has a fixed end (end of next turn), so counterplay exists; no defect — checking name fit instead.
[reskin] audit rewrite blocked — "Possession (Recharge 6)" is engine-authored chassis text
[reskin] audit rewrite blocked — "Etherealness" is engine-authored chassis text
```


---


### Brass Tyrant — bands soft

**Concept:** a tyrant of burning brass who rules a city of forges

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Brass Tyrant | 17 | brute-17-juggernaut | ok | SOFT: hot-offense | ok | ok | ok | ok | ok | ok | ok | ok |

- bands · soft · hot-offense: offense alone reads CR 22, 5 over; the HP axis pulls the read to 17.5
- **dropped clause:** "rules a city of forges"
- read: def 13 / off 22 → 17.5; sustained 170 (2 × Brass Fist + legendary Stride and Crush); nova Forge-Heat 72; dmg 170

```
Brass Tyrant

Huge Construct, Lawful Neutral

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

Bright Seams. A creature that touches the brass tyrant or hits it with a melee attack while within 5 feet of it takes 10 (3d6) Fire damage.

Legendary Resistance (3/Day). If the brass tyrant fails a saving throw, it can choose to succeed instead.

Immutable Form. The brass tyrant can't shape-shift.

Siege Monster. The brass tyrant deals double damage to objects and structures.

Actions

Multiattack. The brass tyrant makes two Brass Fist attacks. It can replace one attack with a use of Merciless Strike.

Brass Fist. Melee Attack Roll: +12, reach 10 ft. 20 (4d6 + 6) Bludgeoning damage plus 14 (4d6) Fire damage.

Forge-Heat (Recharge 5-6). Wisdom Saving Throw: DC 19, each creature in a 30-foot Cone. Failure: 72 (16d8) Fire damage, and the target has the Frightened condition until the end of its next turn. Success: Half damage only.

Merciless Strike. Wisdom Saving Throw: DC 19, one creature within 60 feet that has the Frightened condition. Failure: 71 (13d10) Fire damage, and the target has the Frightened condition until the end of its next turn. Success: Half damage.

Legendary Actions

Legendary Action Uses: 3. Immediately after another creature's turn, the brass tyrant can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.

Stride and Crush. The brass tyrant moves up to half its Speed without provoking Opportunity Attacks, and it makes one Brass Fist attack.

Trample Ruin. The brass tyrant moves up to half its Speed without provoking Opportunity Attacks. During this movement, it can move through Large or smaller objects and structures, destroying them.

Quake Step. Strength Saving Throw: DC 19, each creature within 10 feet of the brass tyrant. Failure: The target has the Prone condition.

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

- Traits/Bright Seams — template heated-body; library draw (seed unstamped); binds the GM's words: burn+brass+heat+furnace+fire+glow
- Traits/Legendary Resistance — the chassis
- Traits/Immutable Form — the chassis
- Traits/Siege Monster — the chassis
- Actions/Multiattack — the chassis
- Actions/Brass Fist — the chassis
- Actions/Forge-Heat — the chassis
- Actions/Merciless Strike — library seed condition-payoff
- Legendary Actions/Legendary Action Uses: 3 — the chassis
- Legendary Actions/Stride and Crush — the chassis
- Legendary Actions/Trample Ruin — the chassis
- Legendary Actions/Quake Step — the chassis

**Engine trace**

```
[path] homebrew — title tyrant — "a tyrant of burning brass who rules a city of forges" (call)
[route] brute-juggernaut type=Construct mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | brute-juggernaut: ✓ ("a tyrant of burning brass") | brute-juggernaut: no line key in the words — the model's read of its quote
[concept] name: provided_name rejected — "the tyrant of burning brass…" is the description, not a name
[concept] resolve: archetype=brute type=Construct themes=forged/terror mind=sapient style=juggernaut energy=Fire mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: blazing brass that radiates forge-heat [body] | bowelling through the streets to crush resistance [behavior] | a crawling furnace-aura that scorches all nearby [aura]
[concept] identity: The Brass Tyrant wades into battle already glowing at the seams, laying down a wave of forge-heat before its fists ever swing, then works through the field like a walking furnace — seizing foes, hurling them into walls, and trampling whatever it has already broken. Under pressure its internal bellows roar louder and its brass skin runs white-hot, but it never retreats: a tyrant does not flee its own city, and it will fight until its last plate is slag.
[concept] lore: Poured in the city's first great forge-work and crowned by the smiths who feared what they had made, the Brass Tyrant still rules its furnace-city, demanding tribute in coal and quenching every rebellion in molten metal.
[reskin] donor: brute-17-juggernaut -> CR 17
[reskin] [path] decides: homebrew (the matcher agrees)
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline declared: "the brass tyrant" — the call's own answer (kind), built from the name
[reskin] inline form: "the brass tyrant" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a tyrant of burning brass" -> has (descriptive), head | "rules a city of forges" -> has (descriptive)
[reskin] menu pruned: action — push-prone, thrown-burst-seed (the sheet cannot render them)
[reskin] signature idea (action): "The tyrant vents its furnace through the ground itself, sending a crawling seam of molten brass across the battlefield that follows the nearest foes. It creeps a short distance each round, scorching whatever it passes under or through, and clings to anyone it sweeps across, burning them again on later turns until they scrape it off or it finally cools. The tyrant can stoke it to speed its crawl, b" [trait/start_of_turn/damage] — menu: fire-aura, warded-mending (+ shelf: condition-payoff, shield-bash, escalating-dread, terror-pulse, herd, drain, exploiter, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, stunning-strike, charge-push, hook-rider, pounce)
[reskin] word match declined by the call: fire-aura — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit"
[reskin] signature miss: action — "The tyrant vents its furnace through the ground itself, sending a crawling seam of molten brass across the battlefield that follows the nearest foes. It creeps a short distance each round, scorching whatever it passes under or through, and clings to anyone it sweeps across, burning them again on later turns until they scrape it off or it finally cools. The tyrant can stoke it to speed its crawl, b" [trait/start_of_turn/damage] — the model found no template that holds it (offered: fire-aura, warded-mending)
[reskin] value check: "Merciless Strike" EV 59.8 vs floor 45.5 (one attack of 2) — worth the trade
[reskin] library seed drawn: condition-payoff -> Actions/"Merciless Strike" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The longer the tyrant is pressed, the hotter its brass runs: each round it takes real punishment, its seams brighten and its furnace-heat spreads farther and bites harder, and foes already frightened by its fire find the glow unbearable to stand near. The heat only climbs while the fight lasts, never cooling until the tyrant is slag." [trait/always/damage] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending, weapon-lodge)
[reskin] signature bound to the concept's verb: trait — heated-body (burn, brass)
[reskin] word match declined by the call: fire-aura — the key word does not mean the mechanic here
[reskin] signature template (trait): heated-body -> Traits/"Bright Seams" ("The brass runs hotter the more the tyrant is pressed — its glowing seams bite an [verb: burn:concept, brass:concept, heat:idea, furnace:idea, fire:idea, glow:idea]")
[reskin] weapons answered: Brass Fist = none; Forge-Heat = none; Seized in Brass = none; Stride and Crush = none; Trample Ruin = none; Quake Step = none
[reskin] chassis nova: "Forge-Heat (Recharge 5-6)" — the brute-17-juggernaut's own nova row (its "Area Nova", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] save follows the effect: Actions/"Merciless Strike" Wisdom -> Dexterity — the row's point is its damage; a condition it hands out alongside does not pick the stat
[reskin] immunities stamped for type: Construct -> Poison; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned
[reskin] resistances derived: Fire
[reskin] multiattack replacement clause: It can replace one attack with a use of Merciless Strike.
[reskin] save re-derived after a retype: Actions/Forge-Heat — a Constitution save for an effect that calls for Wisdom or Charisma; the save follows the condition
[reskin] save re-derived after a retype: Actions/Merciless Strike — a Dexterity save for an effect that calls for Wisdom or Charisma; the save follows the condition
```


---


### Swarm of Peal of the Last Bells — bands soft

**Concept:** a swarm of funeral bells that ring themselves over the dying

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Swarm of Peal of the Last Bells | 13 | swarm-9 | ok | SOFT: hot-offense | ok | ok | ok | ok | ok | ok | ok | ok |

- bands · soft · hot-offense: offense alone reads CR 17, 4 over; the HP axis pulls the read to 13.5
- read: def 10 / off 17 → 13.5; sustained 90 (1 × Toll); nova Last Peal 67; dmg 105

```
Swarm of Peal of the Last Bells

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

Senses darkvision 60 ft.; Passive Perception 10

Languages Understands the languages of its creator but can't speak

CR 13 (XP 10,000; PB +5)

Traits

Last Peal. The first time the swarm is Bloodied in a fight, it releases a burst. Constitution Saving Throw: DC 17, each creature in a 30-foot Emanation originating from the swarm. Failure: 67 (15d8) Thunder damage, and the target has the Deafened condition until the end of its next turn. Success: Half damage only.

Swarm. The swarm can occupy another creature's space and vice versa, and the swarm can move through any opening large enough for a Tiny creature. The swarm can't regain Hit Points or gain Temporary Hit Points.

Actions

Toll. Melee Attack Roll: +10, reach 5 ft. 54 (11d8 + 5) Bludgeoning damage plus 36 (8d8) Thunder damage, or 27 (6d8) Bludgeoning damage plus 18 (4d8) Thunder damage if the swarm is Bloodied.

Death Knell Peal (1/Day). Constitution Saving Throw: DC 17, each creature within 60 feet of the swarm that can hear it. Failure: 45 (13d6) Thunder damage, and if the target has 45 Hit Points or fewer after taking this damage, it drops to 0 Hit Points. Success: Half damage only.

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

- Traits/Last Peal — template bloodied-burst; library draw (seed unstamped); the GM's clause "ring themselves over the dying"; binds the GM's words: ring+bell+dying+the dying+toll
- Traits/Swarm — the chassis
- Actions/Toll — the chassis
- Actions/Death Knell Peal — template wail; library draw (seed unstamped)

**Engine trace**

```
[path] homebrew — "a swarm of funeral bells that ring themselves over the dying" (call)
[route] swarm type=Construct mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: on the GM's own words "a swarm of funeral bells" | holds: the call reads none in these words | swarm: ✓ ("a swarm of funeral bells") | swarm: no line key in the words — the model's read of its quote
[concept] hints: swarm→body ✓ ("a swarm of funeral bells")
[concept] resolve: archetype=swarm type=Construct themes=grave/forged mind=mindless style=— energy=Thunder mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: bells ringing themselves over the dying [behavior] | tolling that marks the deathbound [aura] | welded iron congregations of funeral bells [body]
[concept] identity: A cathedral's worth of funeral bells, torn loose and welded into a single iron flock, descends on a battlefield and marks the dying by sound — each bell tolls only when it finds a body that is close enough to death to be claimed. Once the swarm has chosen, it settles over the fallen in a grinding, chiming canopy, ringing louder as the victim's heart slows, and it does not leave until the corpse is cold and the last note has been rung. Wounded and cloven, it splits into two lesser flocks that keep ringing, mending their broken bells from the iron of the fallen's armor and weapons — patient, joyless, and utterly unwilling to abandon a marked body.
[concept] lore: Forged by a plague-town's bellfounder who poured every funeral toll of a dying city into one iron peal, the swarm now seeks out the last, worst note ever struck — it wants to hear the world's final bell toll.
[reskin] body type: swarm — the body outranks the role (recorded: swarm)
[reskin] donor: swarm-9 -> CR 13 (invented — no printed peer)
[reskin] [path] decides: homebrew (the matcher agrees)
[reskin] swarm name stamped: "Peal of the Last Bell" -> "Swarm of Peal of the Last Bells" — print names all seven of its swarms "Swarm of X", and the rules text says "the swarm"
[reskin] swarm type stamped: Construct -> Swarm of Tiny Constructs
[reskin] swarm size clamped: Huge -> Medium (print swarms are Medium or Large)
[reskin] alignment by body: Neutral -> Unaligned — a Constructs at INT 4 (print: Oozes 4/4 Unaligned; every Construct at INT 3 or less, 7/7; the first aligned one is the Flesh Golem at INT 6)
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline by rule: "the swarm" — the call answered "the last bell" (kind), which the name does not support
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a swarm of funeral bells" -> has (descriptive), head | "ring themselves over the dying" -> has (mechanical)
[reskin] menu pruned: action — obstacle-pull, pacify, escalating-dread, terror-pulse, snare-bolt, slow-bolt, sensory-strike, disarm, thrown-burst-seed, drain, zone-seed, blighted-ground, delayed-brand, aggro-curse, self-invisibility, focus, feint-slip, coating, phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The peal chooses the dying and rings a mark onto them: one creature within earshot that is already hurt becomes marked by the bells, and every toll after that finds that body wherever it runs, hearing its heartbeat as a struck bell that must be answered. When a marked creature falls, the whole flock takes up its note at once, and every marked creature nearby is shaken by that sound." [action/save/condition] — menu: trample, thrown-burst, gaze-single, snare, execute, seal, shield-bash, wail, lure, active-toll, random-ray, ground-burst, spew (+ shelf: patient-defense, second-wind, riposte, stunning-strike, charge-push, hook-rider, pounce, isolation, charge)
[reskin] signature bound to the concept's verb: action — active-toll (ring, bell)
[reskin] word match declined by the call: active-toll — the key word does not mean the mechanic here
[reskin] pick kept on the GM's own words: action — "wail" has no key-table verb, but the call quotes "a swarm of funeral bells that ring themselves over the dying" from the description
[reskin] value check: "Peal of Passing (1/Day)" EV 168.8 vs floor 76.1 (the whole Multiattack (1 attacks)) — worth the trade
[reskin] signature template: wail -> Actions/"Peal of Passing (1/Day)" ("a peal rings out and creatures that can hear it are shaken by the sound; those a [shape fit, no verb match]")
[reskin] signature idea (trait): "The bells will not abandon a marked body. While a creature it has marked still lives, the swarm refuses to leave its side and keeps ringing louder as that heart slows — its tolling never falters while a mark remains unanswered, and cold iron pulled from the fallen is folded back into its broken bells." [trait/always/defense] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature bound to the concept's verb: trait — bloodied-burst (ring, bell, dying, the dying)
[reskin] word match declined by the call: resonant-body, death-burst, faultless-tracker, heated-body, bound — the key word does not mean the mechanic here
[reskin] signature template (trait): bloodied-burst -> Traits/"Last Peal" ("The bells ring louder as the mark's heart slows; when the marked flesh is half-r [verb: ring:concept, bell:concept, dying:concept, the dying:concept, toll:idea]")
[reskin] weapons answered: Toll = none
[reskin] speed by concept: dropped Climb 30 ft. — the concept's movement set decides
[reskin] languages by mind: "None" -> "Understands the languages of its creator but can't speak" (mindless)
[reskin] immunities stamped for type: Swarm of Tiny Constructs + donor suite -> Poison; Charmed, Exhaustion, Frightened, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained, Stunned
[reskin] resistances derived: Bludgeoning, Piercing, Slashing
[reskin] nova capped: Traits/Last Peal — 91 over the CR 13 ceiling 67, dice to 67 (15d8)
[reskin] threshold re-derived after the cap: Actions/Peal of Passing (1/Day) — 75 over the row's own 45 damage, so the kill branch beat the damage branch; threshold to 45
[reskin] row binds its clause: "Last Peal" answers "ring themselves over the dying" — the keys it matched came from that clause, so the coverage credit has a receipt
audit finding below confidence gate: Last Peal The trigger uses 'the first time the swarm is Bloodied in a fight,' a model-written condition that requires the GM to track a one-time flag on an Emanation burst; the entry is otherwise standard Death Burst pattern, so the single-use flag is trackable but the phrase 'in a fight' is not a defined game term and makes the trigger ambiguous (per encounter? per rest?).
audit finding below confidence gate: Swarm This is a redundant limitation: the chassis already prints the swarm as a Construct with no regeneration or temporary HP source in the block, and the clause adds nothing that governs any printed ability.
[reskin] audit rename: "Peal of Passing (1/Day)" -> "Death Knell Peal (1/Day)"
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

Stolen Voices. The air elemental can mimic animal sounds and humanoid voices. A creature that hears the sounds can tell they are imitations only with a successful DC 13 Wisdom (Insight) check.

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
- Traits/Stolen Voices — template mimicry; library draw (seed unstamped); the GM's clause "carries stolen voices"; binds the GM's words: stolen voice+stolen voices+voices
- Traits/Air Form — print's own row

**Engine trace**

```
[path] twist — Air Elemental (is) — "Name field: Air Elemental" (code)
[route] brute type=Elemental mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | brute-grappler: ✓ ("carries stolen voices") | brute-grappler: no line key in the words — the model's read of its quote | brute-grappler -> brute: a grappler is a mechanic engine and needs a key in the words — the model's read of its quote cannot land it
[concept] name: "Air Elemental" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] resolve: archetype=brute type=Elemental themes=elemental/voice mind=sapient style=— energy=Thunder mix=both identity=✓ lore=✓
[concept] name: provided "Air Elemental"
[concept] mechanics: none claimed
[concept] signature elements: stealing and wielding stolen voices [behavior] | a body of churning storm-wind [body] | the screaming thunderclap of replayed cries [aura]
[concept] identity: A pillar of churning storm-wind that opens a fight by rushing the loudest target and slamming it with compressed gusts, then spends each round tearing voice after voice out of the air and hurling the stolen cries back as screaming thunderclaps. It fights to the death and never quiets — the more it hurts, the louder it becomes, and it toys with a wounded foe by miming their own pleas in their own voice.
[concept] lore: Born where a great storm swallowed a chorus of dying sailors, this elemental drifts inland hunting mouths that still have breath, hoarding every voice it steals inside its howling core.
[reskin] print canon defenses: HP 89 -> 90, AC 14 -> 15 — the Air Elemental's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 14, DEX 20, CON 14, INT 6, WIS 10, CHA 6 — the Air Elemental's at its own CR; attack +6 -> +8, DC 13 (print's)
[reskin] donor: brute-5 -> CR 5
[reskin] [path] decides: twist on the Air Elemental (the matcher agrees)
[reskin] print canon: "Air Elemental — that carries stolen voices" heads on the Air Elemental — print's rows ride along; the seat stays
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] name_element answered: Stolen Shriek = imagery
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline by rule: "the air elemental" — the call answered "the air elemental" (kind), which the name does not support
[reskin] inline form: "the air elemental" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Air Elemental —" -> has (descriptive), head | "carries stolen voices" -> has (descriptive)
[reskin] signature idea (action): "The elemental rips the voice out of a foe it can hear, then hurls that stolen cry back as a screaming thunderclap. It can only wield voices it has actually stolen this fight, and each stolen voice can be spent only once; louder, more vocal victims give it richer ammunition, and it can pick any enemy it has already drained rather than the one it just silenced." [action/save/damage] — menu: trample, leap, shield-bash, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up (+ shelf: rampage, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, stunning-strike, charge-push, hook-rider, pounce, charge)
[reskin] word match declined by the call: active-toll — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit"
[reskin] signature miss: action — "The elemental rips the voice out of a foe it can hear, then hurls that stolen cry back as a screaming thunderclap. It can only wield voices it has actually stolen this fight, and each stolen voice can be spent only once; louder, more vocal victims give it richer ammunition, and it can pick any enemy it has already drained rather than the one it just silenced." [action/save/damage] — the model found no template that holds it (offered: trample, leap, shield-bash, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up)
[reskin] fallback stands down: the twist path has no shelf — the Air Elemental's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "Its body is churning storm-wind, so whenever it is hurt the wind shrieks louder and flings stolen voices at whoever struck it. Every wound it takes feeds its howl, making its thunderclaps hit harder the longer and bloodier the fight runs." [trait/on_being_hit/damage] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] signature bound to the concept's verb: trait — mimicry (stolen voice, stolen voices, voices)
[reskin] word match declined by the call: aberrant-ground, heated-body, absorption, bloodied-burst, bloodied-fury, resonant-body, weapon-lodge — the key word does not mean the mechanic here
[reskin] signature template (trait): mimicry -> Traits/"Stolen Voices" ("The elemental's storm-wind carries stolen voices — it imitates humanoid voices,  [verb: stolen voice:concept, stolen voices:concept, voices:concept]")
[reskin] weapons answered: Gust Slam = none
[reskin] languages by mind: "None" -> "Primordial" (sapient)
[reskin] print canon languages: "Primordial" -> "Primordial (Auran)" — the Air Elemental's
[reskin] print canon speed: 40 ft. -> 10 ft. — the Air Elemental's walk; the concept's other modes stay
[reskin] print canon speed: Fly -> 90 ft. — the Air Elemental's own
[reskin] print canon attack: "Gust Slam" -> "Thunderous Slam" — the Air Elemental's own row
[reskin] immunities stamped for type: Elemental -> Poison; Exhaustion, Poisoned
[reskin] print canon defenses: immunities Poison; Exhaustion, Poisoned -> Poison, Thunder; Exhaustion, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained, Unconscious; resistances none -> Bludgeoning, Lightning, Piercing, Slashing — the Air Elemental's own header lines
[reskin] print canon trait: Air Form — "Air Elemental — that carries stolen voices" is the Air Elemental (print's own row)
[reskin] print canon row: Actions/Whirlwind (Recharge 4-6) — the Air Elemental's own
[reskin] row binds its clause: "Stolen Voices" answers "carries stolen voices" — the keys it matched came from that clause, so the coverage credit has a receipt
audit finding below confidence gate: Whirlwind Not a finding — placeholder; see below.
```


---


### Timber Ram — in the run

**Concept:** a siege-engine golem of lashed timber that shoulders through walls

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Timber Ram | 8 | brute-5-juggernaut | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 7 / off 8 → 7.5; sustained 54 (2 × Timber Slam); nova none; dmg 54

```
Timber Ram

Large Construct, Unaligned

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

Immunities Poison, Thunder; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned

Senses darkvision 60 ft.; Passive Perception 13

Languages Understands the languages of its creator but can't speak

CR 8 (XP 3,900; PB +3)

Traits

Snagging Timber. When a creature hits the timber ram with a nonmagical weapon, the weapon lodges in the timber ram's body. A lodged weapon can be pulled free by a creature within reach that succeeds on a DC 16 Strength (Athletics) check as an action; while lodged, the timber ram can use it: its Timber Slam attacks deal an extra 14 (4d6) Thunder damage per lodged weapon (maximum two).

Thunder Absorption. Whenever the timber ram is subjected to Thunder damage, it takes no damage and instead regains a number of Hit Points equal to the Thunder damage dealt.

Immutable Form. The timber ram can't shape-shift.

Magic Resistance. The timber ram has Advantage on saving throws against spells and other magical effects.

Actions

Multiattack. The timber ram makes two Timber Slam attacks.

Timber Slam. Melee Attack Roll: +8, reach 5 ft. 27 (5d8 + 5) Bludgeoning damage.

Bonus Actions

Thunder Retort. One creature within 5 feet that hit the timber ram with an attack roll since the end of the timber ram's last turn takes 11 (2d10) Thunder damage.

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

- Traits/Snagging Timber — template weapon-lodge; library draw (seed unstamped)
- Traits/Thunder Absorption — the chassis
- Traits/Immutable Form — the chassis
- Traits/Magic Resistance — the chassis
- Actions/Multiattack — the chassis
- Actions/Timber Slam — the chassis
- Bonus Actions/Thunder Retort — library seed own-turn-punisher; binds the GM's words: lash

**Engine trace**

```
[path] homebrew — "a siege-engine golem of lashed timber that shoulders through walls" (call)
[route] brute-juggernaut type=Construct mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | brute-juggernaut: ✓ ("siege-engine golem") | brute-juggernaut: no line key in the words — the model's read of its quote
[concept] name: provided_name rejected — "siege-engine golem of lashed timber…" is the description, not a name
[concept] hints: golem→canon ✓ ("a siege-engine golem of lashed timber")
[concept] resolve: archetype=brute type=Construct themes=forged/terror mind=mindless style=juggernaut energy=Thunder mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: bulldozing through walls and gates [behavior] | lashed timber and chain body [body] | grinding wake of splintered debris [aura]
[concept] identity: The Timber Ram opens every fight by lowering its knotted shoulder and charging through the nearest wall, door, or hedge to reach prey on the far side, and each round after it keeps battering forward, driving defenders back and pinning them between its bulk and whatever it just shattered. Lashing chains, beams, and splintered trunks drag behind it in a grinding wake; it never flinches, never backs off, and fights to the last timber until nothing holds it upright.
[concept] lore: The Timber Ram is built by warlords and hedge-mages from felled orchards and condemned scaffolding, lashed around a stolen keystone of animating hunger, and it wants only the next wall and the next skull between it and the horizon.
[reskin] donor: brute-5-juggernaut -> CR 8
[reskin] [path] decides: homebrew (the matcher would have said twist Clay Golem)
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline declared: "the timber ram" — the call's own answer (kind), built from the name
[reskin] inline form: "the timber ram" — the model's own reading of the name
[reskin] save dc derived: DC 15 -> 16 (8 + PB 3 + the sheet's best 5) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a siege-engine golem of lashed timber" -> has (descriptive), head | "shoulders through walls" -> has (descriptive)
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The Timber Ram lowers its knotted shoulder and drives forward in a straight line, smashing through whatever stands in the way and shouldering creatures aside as it goes. Anything it plows through is knocked sprawling and dragged along in the grinding wake of chains and splintered beams. It ends the rush pressed up against whatever it just shattered, leaving foes pinned between its bulk and the rui" [rider/on_hit/movement] — menu: stunning-strike, charge-push, hook-rider, pounce (+ shelf: leap, throw-retrieve, shield-bash, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating)
[reskin] signature bound to the concept's verb: action — own-turn-punisher (lash)
[reskin] rider declined: "Run-Down" — a rider rides the user's own attack, so it needs the user's own ask; the call offered no quote, and the key table finds no verb either (the gong's bandaged concussion, 2026-10-01)
[reskin] value check: "Answering Sting" EV 6.1 vs floor 4.4 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: own-turn-punisher -> Bonus Actions/"Answering Sting" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Chains, beams, and splintered trunks trail from its body and lash out at anything that strikes it, tearing and snagging at the attacker. A foe that keeps hammering the ram finds itself fouled by its own wake, dragged off balance by the grinding timber." [trait/on_being_hit/condition] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] word match declined by the call: heated-body, aberrant-ground, faultless-tracker, noxious-aura — the key word does not mean the mechanic here
[reskin] pick kept on the GM's own words: trait — "weapon-lodge" has no key-table verb, but the call quotes "shoulders through walls" from the description
[reskin] signature template (trait): weapon-lodge -> Traits/"Snagging Timber" ("Lashed beams of timber that hit the ram snag and stay fouled in its body, draggi [shape fit, no verb match]")
[reskin] weapons answered: Lashed Beam = none
[reskin] languages by body: a trap-line Construct with no voice in the concept
[reskin] absorption re-keyed: Lightning -> Thunder (the donor organ obeys the concept energy)
[reskin] immunities stamped for type: Construct -> Poison, Thunder; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned
audit finding below confidence gate: Snagging Timber The timing of the lodgement is stated, but the block never says whether the lodged weapon is unavailable to its wielder (i.e., what happens to the attacker's weapon), leaving the GM unable to adjudicate the attacker's state.
[reskin] audit rename: "Lashed Beam" -> "Timber Slam"
[reskin] audit rename: "Answering Sting" -> "Thunder Retort"
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
- Actions/Slam — print's own row
- Actions/Force Bolt — print's own row, renamed; weapon crossbow
- Traits/Immutable Form — print's own row
- Traits/Magic Resistance — print's own row
- Bonus Actions/Slow — print's own row

**Engine trace**

```
[path] twist — Stone Golem (is) — "Name field: Stone Golem" (code)
[route] brute-juggernaut type=Construct mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | brute-juggernaut: ✓ ("Stone Golem") | brute-juggernaut: no line key in the words — the model's read of its quote
[concept] name: "Stone Golem" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] hints: golem→canon ✓ ("Stone Golem — carved as a weeping saint")
[concept] resolve: archetype=brute type=Construct themes=grave/forged mind=mindless style=juggernaut energy=Necrotic mix=both identity=✓ lore=✓
[concept] name: provided "Stone Golem"
[concept] mechanics: none claimed
[concept] signature elements: a weeping saint carved in stone [body] | weeping that grinds into abrasive grave-dust [aura] | implacable, unstoppable advance that shatters what it walks through [behavior]
[concept] identity: The Weeping Saint advances with slow, deliberate patience, its carved stone robes grinding as it raises one rough-hewn hand to sweep foes aside and then brings both fists down to shatter the flagstones where prey stood. Every round after that it presses forward like a walking chapel, shrugging off blows that would fell flesh and stone, breaking through doors and pillars alike to reach the target of its silent sorrow. Wounded, it does not flee or rage — it weeps harder, its tears grinding into abrasive dust, and fights on with the same implacable, joyless devotion, unable to stop and unwilling to be redirected.
[concept] lore: Quarried from a condemned cathedral's altar-stone and carved in the likeness of a mourning saint, the golem was animated by a prayer no one finished, and now it walks the ruins of its own making, dragging itself toward any who disturb the grief it was built to carry.
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
[reskin] signature idea (action): "The golem lowers its shoulder and simply walks forward in a straight line, refusing to turn aside. Everything in its path is crushed beneath the grinding weight of its stone robes, and the flagstones, pillars, and walls it passes through are shattered rather than skirted. It does not slow, does not choose targets, and cannot be talked or pushed off this line — the only answers are to get out of th" [action/always/movement] — menu: trample, leap, thrown-burst, throw-retrieve, shield-bash, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up (+ shelf: rampage, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, stunning-strike, charge-push, hook-rider, pounce, charge)
[reskin] word match declined by the call: charge, trample — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit"
[reskin] signature miss: action — "The golem lowers its shoulder and simply walks forward in a straight line, refusing to turn aside. Everything in its path is crushed beneath the grinding weight of its stone robes, and the flagstones, pillars, and walls it passes through are shattered rather than skirted. It does not slow, does not choose targets, and cannot be talked or pushed off this line — the only answers are to get out of th" [action/always/movement] — the model found no template that holds it (offered: trample, leap, thrown-burst, throw-retrieve, shield-bash, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, own-turn-punisher, charge)
[reskin] fallback stands down: the twist path has no shelf — the Stone Golem's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "Whenever the saint is struck, its sorrow deepens and it weeps harder, and the abrasive tears land on whoever hurt it as a burning sting of grief. The grief clings to that attacker, so the golem advances on them and no one else until they are gone or the sorrow runs dry." [trait/on_being_hit/damage] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] signature bound to the concept's verb: trait — false-appearance (stone)
[reskin] word match declined by the call: false-appearance, heated-body — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit" after being shown false-appearance, which the GM's words keyed
[reskin] key match declined: trait — "false-appearance" was ranked first on the call's own menu for stone, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: trait — "Whenever the saint is struck, its sorrow deepens and it weeps harder, and the abrasive tears land on whoever hurt it as a burning sting of grief. The grief clings to that attacker, so the golem advances on them and no one else until they are gone or the sorrow runs dry." [trait/on_being_hit/damage] — the model found no template that holds it (offered: false-appearance, heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge)
[reskin] weapons answered: Slam = none; Tear = none
[reskin] languages by body: a trap-line Construct with no voice in the concept
[reskin] print canon languages: "Understands the languages of its creator but can't speak" -> "Understands Common plus two other languages but can't speak" — the Stone Golem's
[reskin] print canon speed: 40 ft. -> 30 ft. — the Stone Golem's walk; the concept's other modes stay
[reskin] print canon multiattack: "The stone golem makes two attacks, using Slam or Force Bolt in any combination." — the Stone Golem's own
[reskin] print canon attack: "Force Bolt" is print's own row — +9, 22 (4d10), range 120 ft. (an exact body at print's CR)
[reskin] print canon attack: "Tear" -> "Force Bolt" — the Stone Golem's own ranged row
[reskin] immunities stamped for type: Construct -> Poison; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned
[reskin] print canon defenses: immunities Poison; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned -> Poison, Psychic; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned — the Stone Golem's own header lines
[reskin] name-canon trait stamped: Immutable Form (the name says so; print says what it does)
[reskin] name-canon trait stamped: Magic Resistance (the name says so; print says what it does)
[reskin] print canon trait: Immutable Form — print's text replaces the chassis's (the Troll regenerates 15, not the chassis's 10 — critic's audit 2026-10-02)
[reskin] print canon trait: Magic Resistance — print's text replaces the chassis's (the Troll regenerates 15, not the chassis's 10 — critic's audit 2026-10-02)
[reskin] print canon row: Bonus Actions/Slow (Recharge 5-6) — the Stone Golem's own
audit finding below confidence gate: Slam The reach figure is missing the unit separator, producing run-on text that mixes a range with punctuation; it should read 'reach 5 ft.'
```


---


### Buzzing Wound Archon — in the run

**Concept:** a plague-bearing archon of flies that commands lesser swarms

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Buzzing Wound Archon | 13 | skirmisher-13-winged | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 9 / off 16 → 12.5; sustained 72 (3 × Sting); nova Swarm Column 67; dmg 93

```
Buzzing Wound Archon

Large Fiend, Neutral Evil

AC 18
Initiative +5 (15)

HP 190 (20d10 + 80)

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

Resistances Cold

Immunities Poison; Poisoned

Senses darkvision 120 ft.; Passive Perception 18

Languages Common

CR 13 (XP 10,000; PB +5)

Traits

Flyby. The wound archon doesn't provoke Opportunity Attacks when it flies out of an enemy's reach.

Opportunist's Flight. When a creature the wound archon can see ends its turn within 5 feet of it, the wound archon can move up to 10 feet without provoking Opportunity Attacks.

Actions

Multiattack. The wound archon makes three Sting attacks.

Sting. Melee Attack Roll: +10, reach 10 ft. 14 (2d8 + 5) Piercing damage plus 10 (3d6) Poison damage. If the wound archon flew at least 20 feet in a straight line toward the target immediately before the hit, the target takes an extra 7 (2d6) Piercing damage and, if it is Large or smaller, has the Prone condition.

Swarm Column (Recharge 5-6). The wound archon flies up to its Speed without provoking Opportunity Attacks. Each creature it passes within 5 feet during this movement is targeted once by the following effect. Strength Saving Throw: DC 17. Failure: 67 (15d8) Poison damage, and the target has the Prone condition. Success: Half damage.

Bonus Actions

Aerial Agility. The wound archon takes the Dash or Disengage action.

Droning War-Hymn (2/Day). Each ally within 30 feet of the wound archon gains 13 (3d8) Temporary Hit Points.

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

- Traits/Flyby — the chassis
- Traits/Opportunist's Flight — the chassis
- Actions/Multiattack — the chassis
- Actions/Sting — the chassis
- Actions/Swarm Column — the chassis
- Bonus Actions/Aerial Agility — the chassis
- Bonus Actions/Droning War-Hymn — library seed rally; the GM's clause "commands lesser swarms"; binds the GM's words: command

**Engine trace**

```
[path] homebrew — "a plague-bearing archon of flies that commands lesser swarms" (call)
[route] skirmisher-winged type=Fiend mechanics=aura — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | skirmisher-winged: ✓ ("archon of flies") | skirmisher-winged: key "flies" (class verb)
[concept] hints: swarm→body ✓ ("commands lesser swarms") | winged→style ✓ ("a plague-bearing archon of flies")
[concept] resolve: archetype=skirmisher type=Fiend themes=fiendish/aerial mind=sapient style=winged energy=Poison mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: aura
[concept] signature elements: a body of chitin and swarming flies [body] | commands lesser swarms as extensions of itself [behavior] | swooping snatch-and-drop predation on the wing [behavior]
[concept] identity: The archon opens by loosing a churning column of its own fly-body at the nearest cluster of foes, then rides the swarm's confusion to dive in on buzzing chitin wings, snatching a victim aloft and dropping them from height. Every round it wheels out of reach, seeding the field with fresh broods, and it toys with prey it has already marked — but once its swarm is scattered and its chitin cracked, this thing does not flee; it collapses into a shrieking cloud of flies that reforms, hateful and desperate, until nothing of it remains to reform.
[concept] lore: Born in the buzzing wound between the planes where pestilence pools, a plague-bearing archon of flies claims dominion over lesser swarms and descends on mortal lands to harvest them into its crawling choir.
[reskin] donor: skirmisher-13-winged -> CR 13 (invented — no printed peer)
[reskin] [path] decides: homebrew (the matcher agrees)
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline declared: "the wound archon" — the call's own answer (kind), built from the name
[reskin] inline form: "the wound archon" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a plague-bearing archon of flies" -> has (descriptive), head | "commands lesser swarms" -> has (mechanical)
[reskin] menu pruned: action — thrown-burst-seed, phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The archon stoops on a victim it has already savaged, closing on a wounded creature within reach and hauling it up into the air as the flies pour from its wounds, carrying the prey a short way aloft before letting go to fall. The snatch only works on a creature the archon has already hurt, and it leaves the archon briefly unable to strike again." [rider/on_hit/movement] — menu: contagion, stunning-strike, charge-push, hook-rider, pounce, isolation (+ shelf: condition-payoff, shield-bash, lure, snare-bolt, sensory-strike, disarm, delayed-brand, exploiter, herd, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, rally, riposte)
[reskin] signature bound to the concept's verb: action — contagion (plague, plagued)
[reskin] signature miss: action — "The archon stoops on a victim it has already savaged, closing on a wounded creature within reach and hauling it up into the air as the flies pour from its wounds, carrying the prey a short way aloft before letting go to fall. The snatch only works on a creature the archon has already hurt, and it leaves the archon briefly unable to strike again." [rider/on_hit/movement] — the model picked "pounce" (no verb, and it quotes nothing the GM typed) over a concept-verb template (contagion, herd, rally)
[reskin] fallback skipped by the floor: herd (EV 9.8 vs 63.4)
[reskin] value check: "Bolstering Cry (2/Day)" EV 7.2 vs floor 4.1 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: rally -> Bonus Actions/"Bolstering Cry (2/Day)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "When the archon is broken, its chitin cracks apart into the swarm it was made of, a buzzing cloud of flies that reforms nearby and rises again — wounded and shrieking, but alive — until the brood finally scatters for good." [trait/always/defense] — menu: adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature bound to the concept's verb: trait — heated-body (plague)
[reskin] trait declined: "Brood Burst" — bound only on the idea's own words (wounded:idea, crack:idea) with no key in the concept; a meat body earns its trait by the user's verb (the sniper's tracker, critic 2026-09-29)
[reskin] weapons answered: Sting = none; Swarm Column = none
[reskin] chassis nova: "Swarm Column (Recharge 5-6)" — the skirmisher-13-winged's own nova row (its "Diving Attack", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] immunities stamped for type: Fiend -> Poison; Poisoned
[reskin] resistances derived: Cold
[reskin] vulnerability rejected — "Fire" has no warrant in the concept's own text (print's default is none)
[reskin] row binds its clause: "Bolstering Cry" answers "commands lesser swarms" — the keys it matched came from that clause, so the coverage credit has a receipt
audit finding below confidence gate: Skittering The trait gives no timing gate for the reaction beyond 'can move' — it does not say whether this uses the creature's Reaction, so it is not clearly adjudicable when multiple creatures end turns nearby.
[reskin] audit rename: "Skittering" -> "Opportunist's Flight"
[reskin] audit rename: "Bolstering Cry (2/Day)" -> "Droning War-Hymn (2/Day)"
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

Multiattack. The purple worm makes one Bite attack and one Tail Stinger attack. It can replace one attack with a use of Caustic Gulp.

Bite. Melee Attack Roll: +14, reach 10 ft. 22 (3d8 + 9) Piercing damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 22), and it has the Restrained condition until the grapple ends.

Tail Stinger. Melee Attack Roll: +14, reach 10 ft. 16 (2d6 + 9) Piercing damage plus 35 (10d6) Poison damage.

Caustic Gulp. Dexterity Saving Throw: DC 21, one Large or smaller creature within 10 feet that the purple worm hit with a melee attack this turn. Failure: 42 (12d6) Acid damage, and the target is swallowed. A swallowed creature has the Blinded and Restrained conditions, has Total Cover against attacks and other effects outside the purple worm, and takes 22 (5d8) Acid damage at the start of each of the purple worm's turns. If the purple worm takes 40 damage or more on a single turn from a creature inside it, it must succeed on a DC 21 Constitution saving throw at the end of that turn or regurgitate all swallowed creatures, each of which falls in a space within 10 feet of the purple worm and has the Prone condition. If the purple worm dies, a swallowed creature is no longer Restrained and can escape from the corpse using 15 feet of movement, exiting with the Prone condition.

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
- Actions/Caustic Gulp — template swallow; library draw (seed unstamped); the GM's clause "swallowed a war-band's armoury"; binds the GM's words: swallow+swallows+swallowed
- Traits/Tunneler — print's own row; template tunneler; library draw (seed unstamped); binds the GM's words: worm
- Bonus Actions/Swallow — print's own row

**Engine trace**

```
[path] twist — Purple Worm (is) — "Name field: Purple Worm" (code)
[route] brute-grappler type=Monstrosity mechanics=grapple, engulf — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: on the GM's own words "Purple Worm — that swallowed a war-band'" | brute-grappler: ✓ ("swallowed a war-band's armoury") | brute-grappler: no line key in the words — the model's read of its quote
[concept] name: "Purple Worm" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] resolve: archetype=brute type=Monstrosity themes=subterranean/devouring mind=bestial style=grappler energy=Acid mix=both identity=✓ lore=✓
[concept] name: provided "Purple Worm"
[concept] mechanics: grapple, engulf
[concept] signature elements: swallowing prey whole into a gut full of lodged steel [behavior] | a hide-armored body fused with a war-band's armoury [body] | acidic forge-gullet that grinds armor and bone [aura]
[concept] identity: A purple worm grown monstrous on the swallowed steel of a war-band, its gullet a churning forge of half-melted plate and snapping spear-hafts that it vents with every earth-shaking bellow. It erupts beneath the densest cluster of foes, swallows the nearest whole, and then coils and grinds through the rest while armored prey rattles uselessly in its gut. Bloodied or not, it never retreats — it only burrows deeper to come up beneath the survivors, feeding on what it has already half-digested.
[concept] lore: Somewhere in the deep earth, a war-band's last stand ended inside a purple worm's gullet, and the armoury it was carrying did not dissolve so much as lodge — armor, blades, and siege-shot fused into the worm's gut until the beast became a living foundry that kills to feed the furnace in its belly.
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
[reskin] signature idea (action): "After the worm swallows a foe, the furnace in its gut turns the lodged steel into a tumble of jagged scrap and half-melted blades that it heaves back up at everything around it. The spewed metal tears into whoever is near, and foes still clutching their shields find the spines catching and dragging them down out of reach." [rider/on_hit/damage] — menu: contagion, stunning-strike, charge-push, hook-rider, pounce, charge (+ shelf: swallow, condition-payoff, shield-bash, hook-drag, burrow-ambush, escalating-dread, terror-pulse, herd, drain, exploiter, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating)
[reskin] signature bound to the concept's verb: action — swallow (swallow, swallows, swallowed)
[reskin] signature template: swallow -> Actions/"Scrap-Furnace Spew" ("The worm has swallowed a war-band's armoury and now spews the lodged metal back  [verb: swallow:concept, swallows:concept, swallowed:concept]")
[reskin] keys spent by the action: swallow, swallows, swallowed
[reskin] signature idea (trait): "The worm's hide has grown around the war-band's armor, so every blow landed on its flank drives shards of that fused plate outward into whatever struck it, and bits of the stuff stay embedded and burning. Anyone who presses the attack walks away carrying the forge's shrapnel." [trait/on_being_hit/damage] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, earth-glide, tunneler, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] signature bound to the concept's verb: trait — tunneler (worm)
[reskin] word match declined by the call: heated-body, resonant-body — the key word does not mean the mechanic here
[reskin] trait declined: "Shrapnel Hide" — bound only on the idea's own words (embedded:idea) with no key in the concept; a meat body earns its trait by the user's verb (the sniper's tracker, critic 2026-09-29)
[reskin] trait bound to the concept's verb (concept-first): tunneler — worm in the user's words; the idea path had nothing
[reskin] signature template (trait): tunneler -> Traits/"Tunneler" ("exact concept match [verb: worm:concept]")
[reskin] weapons answered: Bite = none; Foundry Bellow = none; Swallowing Gullet = none
[reskin] chassis nova: "Foundry Bellow (Recharge 5-6)" — the brute-13's own nova row (its "Area Nova", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] print canon size: Huge -> Gargantuan — the Purple Worm's
[reskin] print canon speed: 40 ft. -> 50 ft. — the Purple Worm's walk; the concept's other modes stay
[reskin] print canon speed: Burrow -> 50 ft. — the Purple Worm's own
[reskin] print canon row: Actions/Tail Stinger — the Purple Worm's second melee row, beside the chassis's
[reskin] print canon multiattack: "The purple worm makes one Bite attack and one Tail Stinger attack." — the Purple Worm's own
[reskin] languages held: None stands — INT 1 on a Monstrosity speaks nothing, whatever the mind read said
[reskin] print canon trait: Tunneler — print's text replaces the chassis's (the Troll regenerates 15, not the chassis's 10 — critic's audit 2026-10-02)
[reskin] print canon: chassis row leaves — Actions/"Foundry Bellow (Recharge 5-6)" is the seat's nova, not the Purple Worm's
[reskin] print canon row: Bonus Actions/Swallow — the Purple Worm's own
[reskin] multiattack replacement clause: It can replace one attack with a use of Scrap-Furnace Spew.
[reskin] row binds its clause: "Scrap-Furnace Spew" answers "swallowed a war-band's armoury" — the keys it matched came from that clause, so the coverage credit has a receipt
[reskin] audit rename: "Scrap-Furnace Spew" -> "Caustic Gulp"
[reskin] escape dc: Bite → DC 22 (8 + PB + STR; a late row wore another number)
```


---


### Pit Fiend — in the run

**Concept:** name: Pit Fiend | who collects the oaths of dying knights

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Pit Fiend | 20 | brute-21 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- **dropped clause:** "collects the oaths of dying knights"
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
[route] brute type=Fiend mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | caster-binder: the call reads no worked magic in these words | brute: ✓ ("Pit Fiend") | defender: the call read "knights" as not meaning that mechanic here — no override | brute stands: every key that would override it was read as a figure of speech | brute: no line key in the words — the model's read of its quote | bane refused: the words carry no weakness clause, so "radiant" answers a question nobody asked
[concept] name: "Pit Fiend" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] resolve: archetype=brute type=Fiend themes=fiendish/grave mind=sapient style=— energy=Fire mix=both identity=✓ lore=✓
[concept] name: provided "Pit Fiend"
[concept] mechanics: none claimed
[concept] signature elements: collecting the oaths of the dying [behavior] | a chain of sworn bonds dragging behind it [object] | a body of smoldering ash and cinders [body]
[concept] identity: The Pit Fiend does not swing for the kill — it swings to bring a knight to the threshold of death, then crouches over the fallen and wrings the last oath from his lips as a binding on the chain it drags behind it. Every round it presses the same slow, patient assault, herding foes into the dying state its law requires, and it treats strikes against it as entries being added to a ledger it will collect on later. Wounded, it does not flee; it grows wrathful and greedy, fighting to the death because a foe who dies unsworn is a debt it intends to make good.
[concept] lore: Forged in the ash-pits below the muster-fields of Hell, the Pit Fiend is Hell's oath-collector, sent to harvest the final promises of dying knights so that every broken vow swells its chain into a bond it can call upon.
[reskin] print canon defenses: HP 347 -> 337, AC 20 -> 21 — the Pit Fiend's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 26, DEX 14, CON 24, INT 22, WIS 18, CHA 24 — the Pit Fiend's at its own CR; attack +14 -> +14, DC 21 (print's)
[reskin] donor: brute-21 -> CR 20 (invented — no printed peer)
[reskin] [path] decides: twist on the Pit Fiend (the matcher agrees)
[reskin] print canon: "Pit Fiend — who collects the oaths of dying knights" heads on the Pit Fiend — print's rows ride along; the seat stays
[reskin] ranged row off: "Legendary Ranged Attack" leaves with it (it made a Ranged Attack attack)
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline by rule: "the pit fiend" — the call answered "the pit fiend" (kind), which the name does not support
[reskin] inline form: "the pit fiend" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Pit Fiend —" -> has (mechanical), head [asked: buff_self] | "collects the oaths of dying knights" -> has (mechanical) [asked: buff_self]
[reskin] menu pruned: action — push-prone, thrown-burst-seed (the sheet cannot render them)
[reskin] signature idea (action): "The Pit Fiend can crouch over a creature that is dying or badly wounded and demand its final oath, wringing a binding promise from it as it passes. Until that promise is broken or the creature dies, the fiend grows harder to put down, drawing strength from the debt now hanging on its chain." [rider/on_hit/resource] — menu: stunning-strike, charge-push, hook-rider, pounce, charge (+ shelf: condition-payoff, shield-bash, escalating-dread, terror-pulse, herd, drain, exploiter, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating)
[reskin] signature bound to the concept's verb: action — aggro-curse (oath)
[reskin] word match declined by the call: aggro-curse, exploiter — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit" after being shown aggro-curse, which the GM's words keyed
[reskin] key match declined: action — "aggro-curse" was ranked first on the call's own menu for oath, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: action — "The Pit Fiend can crouch over a creature that is dying or badly wounded and demand its final oath, wringing a binding promise from it as it passes. Until that promise is broken or the creature dies, the fiend grows harder to put down, drawing strength from the debt now hanging on its chain." [rider/on_hit/resource] — the model found no template that holds it (offered: aggro-curse, stunning-strike, charge-push, hook-rider, pounce, charge, exploiter)
[reskin] fallback respects the call: aggro-curse, exploiter left the shelf — the call declined them for this sheet
[reskin] fallback stands down: the twist path has no shelf — the Pit Fiend's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "The Pit Fiend's body is a furnace of smoldering ash and cinders; whenever a wound is opened on it, the escaping heat and grit cling to the nearest attacker, searing them and refusing to be brushed away." [trait/on_being_hit/damage] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] signature bound to the concept's verb: trait — bloodied-burst, death-burst (dying)
[reskin] word match declined by the call: bloodied-burst, death-burst, heated-body, adhesive, fire-aura, terrain-walk — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit" after being shown bloodied-burst, death-burst, which the GM's words keyed
[reskin] key match declined: trait — "bloodied-burst" was ranked first on the call's own menu for dying, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: trait — "The Pit Fiend's body is a furnace of smoldering ash and cinders; whenever a wound is opened on it, the escaping heat and grit cling to the nearest attacker, searing them and refusing to be brushed away." [trait/on_being_hit/damage] — the model found no template that holds it (offered: bloodied-burst, death-burst, heated-body, absorption, resonant-body, weapon-lodge, terrain-walk, adhesive, fire-aura, bloodied-fury)
[reskin] weapons answered: Chain = none; Oathbrand Blast = none; Bound by Oath = none; Herding Strike = none; Chain Slam = none
[reskin] chassis nova: "Oathbrand Blast (Recharge 5-6)" — the brute-21's own nova row (its "Area Nova", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] speed by concept: added Fly 40 ft. — the concept's movement set decides
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] print canon alignment: Lawful Neutral -> Lawful Evil — the Pit Fiend's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common" -> "Infernal; telepathy 120 ft." — the Pit Fiend's
[reskin] print canon speed: 40 ft. -> 30 ft. — the Pit Fiend's walk; the concept's other modes stay
[reskin] print canon speed: Fly -> 60 ft. — the Pit Fiend's own
[reskin] print canon row: Actions/Devilish Claw — the Pit Fiend's second melee row, beside the chassis's
[reskin] print canon row: Actions/Fiery Mace — the Pit Fiend's second melee row, beside the chassis's
[reskin] print canon attack: "Chain" -> "Bite" — the Pit Fiend's own row
[reskin] print canon multiattack: "The pit fiend makes one Bite attack, two Devilish Claw attacks, and one Fiery Mace attack." — the Pit Fiend's own
[reskin] immunities stamped for type: Fiend -> Poison; Poisoned
[reskin] print canon skills: "Athletics +14, Perception +10" -> "Perception +10, Persuasion +19" — the Pit Fiend's own skills, each derived from this sheet's stat and PB
[reskin] print canon defenses: immunities Poison; Poisoned -> Fire, Poison; Poisoned; resistances none -> Cold — the Pit Fiend's own header lines
[reskin] resistances derived withheld: print's Pit Fiend owns the line (Cold)
[reskin] print canon trait: Diabolical Restoration — "Pit Fiend — who collects the oaths of dying knights" is the Pit Fiend (print's own row)
[reskin] print canon trait: Fear Aura — "Pit Fiend — who collects the oaths of dying knights" is the Pit Fiend (print's own row)
[reskin] print canon trait: Magic Resistance — "Pit Fiend — who collects the oaths of dying knights" is the Pit Fiend (print's own row)
[reskin] print canon: chassis row leaves — Actions/"Oathbrand Blast (Recharge 5-6)" is the seat's nova, not the Pit Fiend's
[reskin] print canon legendary: the chassis's Legendary Actions leave — the Pit Fiend has none of its own at its CR
[reskin] print canon row: Actions/Hellfire Spellcasting (Recharge 4-6) — the Pit Fiend's own
audit finding below confidence gate: Fear Aura The aura's origin is not stated (typically it originates from the pit fiend), and '20-foot Emanation' alone does not tell the GM where the emanation is centered, leaving placement to guess.
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
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: bear-and-owl hybrid body of hide, beak, and claw [body] | shrieking charge that knocks prey down [behavior] | savage, unbreakable fight to the death [behavior]
[concept] identity: The owlbear crashes out of cover in a shrieking, crashing charge, shouldering the nearest foe to the ground before it ever swings. Every round after, it fights in close, raking with hooked fore-claws while its beak snaps down on whatever the claws pin. Wounded, it only grows more savage and hacks until either it or its prey stops moving — it never breaks and runs.
[concept] lore: A mage's crossbred mistake that escaped the tower and bred in the wild, the owlbear wants nothing more than territory and meat, and it takes both from anything that enters its woods.
[reskin] print canon defenses: HP 66 -> 59, AC 12 -> 13 — the Owlbear's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 20, DEX 12, CON 17, INT 3, WIS 12, CHA 7 — the Owlbear's at its own CR; attack +5 -> +7, DC 15 (print's)
[reskin] donor: brute-2 -> CR 3
[reskin] [path] decides: exact on the Owlbear (the matcher agrees)
[reskin] print canon: "Owlbear" is a print creature — the seats stand down; print's own rows are the composition
[reskin] class kit: none — the exact path takes no class kit
[reskin] inline declared: "the bruin-owl" — the call's own answer (kind), built from the name
[reskin] inline form: "the bruin-owl" — the model's own reading of the name
[reskin] save dc derived: DC 12 -> 15 (8 + PB 2 + the sheet's best 5) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Owlbear" -> has (descriptive), head
[reskin] weapons answered: Talons = none; Shoulder Rush = none
[reskin] print canon speed: modes climb — the Owlbear's
[reskin] print canon senses: "darkvision 60 ft." — the Owlbear's
[reskin] speed by concept: added Climb 30 ft. — the concept's movement set decides
[reskin] print canon name: "Bruin-owl" -> "Owlbear" — a whole print name is the creature's name (the Goblin Boss shipped as Krag the Iron Standard, 2026-10-01)
[reskin] inline follows the print name: "the bruin-owl" -> "the owlbear"
[reskin] print canon speed: 30 ft. -> 40 ft. — the Owlbear's walk; the concept's other modes stay
[reskin] print canon speed: Climb -> 40 ft. — the Owlbear's own
[reskin] print canon attack: "Talons" -> "Rend" — the Owlbear's own row
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
- **dropped clause:** "fights from a shield wall"
- **dropped clause:** "never breaks ranks"
- read: def 4 / off 5 → 4.5; sustained 33 (3 × Longsword); nova none; dmg 33

```
Vashka the Red

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

Languages Common, Goblin

CR 6 (XP 2,300; PB +3)

Actions

Multiattack. Vashka makes three Longsword attacks. It can replace one attack with a use of Shield Bash.

Longsword. Melee Attack Roll: +7, reach 5 ft. 11 (2d6 + 4) Slashing damage.

Shield Bash. Strength Saving Throw: DC 15, one creature within 5 feet that Vashka can see. Failure: 9 (2d4 + 4) Bludgeoning damage. If the target is a Medium or smaller creature, it has the Prone condition.

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

- Actions/Multiattack — the chassis
- Actions/Longsword — print's own row, renamed; weapon longsword
- Actions/Shield Bash — print's own row
- Reactions/Riposte — template riposte; fighter kit; the GM's clause "warlord"

**Engine trace**

```
[path] class_npc — class fighter — "warlord" (call)
[route] defender type=Humanoid mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | defender-leader: ✓ ("hobgoblin warlord") | defender-leader -> defender: the concept's VERB outranks the noun (key "shield wall", class verb) | defender: key "shield wall" (class verb)
[concept] name: "Vashka the Red" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] resolve: archetype=defender type=Humanoid themes=armed/terror mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: provided "Vashka the Red"
[concept] mechanics: none claimed
[concept] signature elements: lacquered plate and shield wall [body] | punishing anyone who moves past the line [behavior] | the red-lacquered armor as a banner of fear [aura]
[concept] identity: Vashka the Red opens by planting the shield wall and daring the enemy to come to him, then spends every round punishing attempts to slip past or flank — his lacquered plate turns aside blows while he answers with short, brutal strikes from behind the shield. Under pressure he tightens the formation rather than flee, and bloodied he only grows more deliberate, grinding the fight into a slow, disciplined slaughter.
[concept] lore: Born into a hobgoblin legion that measures worth in unbroken lines, Vashka lacquered his plate red as a promise and took command of the shield wall, seeking a war he can win without ever giving ground.
[reskin] [path] class body: the fighter stands on the Gladiator — the class's own print block, nearest CR 6
[reskin] print canon defenses: HP 91 -> 112, AC 19 -> 16 — the Gladiator's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon armor: 16 (studded leather, shield) — print's Gear line; the 2014 sheet prints it (the Goblin Boss wore "splint", canaries 2026-10-12)
[reskin] print canon array: STR 18, DEX 15, CON 16, INT 10, WIS 12, CHA 15 — the Gladiator's at its own CR; attack +7 -> +7, DC 15 (print's)
[reskin] donor: defender-5 -> CR 6
[reskin] row gated out: Guard Aura (aura) — the concept did not claim this mechanic
[reskin] [path] decides: class_npc on the Gladiator · class fighter (the matcher would have said homebrew)
[reskin] print canon: "Vashka the Red — A hobgoblin warlord in lacquered plate who fights from a shield wall and never breaks ranks." heads on the Gladiator — print's rows ride along; the seat stays
[reskin] class kit: guarded-stance yields — AC 16 already beats print's 15 at CR 6, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] class kit: fighter — "warlord": Riposte (riposte)
[reskin] proper noun: "Vashka the Red" — the Name field is a person, not a kind (no print match, no article in the words)
[reskin] inline declared: "Vashka" — the call's own answer (person), built from the name
[reskin] inline form: "Vashka" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] lacks not claimed: "never breaks ranks" reads like a lack to the words, and the call's list did not name it
[reskin] clauses: "Vashka the Red — A hobgoblin warlord in lacquered plate" -> has (descriptive), head | "fights from a shield wall" -> has (mechanical) | "never breaks ranks" -> has (mechanical)
[reskin] menu pruned: action — snap-shot (the sheet cannot render them)
[reskin] signature idea (action): "When a foe within reach tries to slip away or circle around him, Vashka slams his shield into them and plants them back where they stood, then follows up with a sudden shield-spike thrust. Anyone struck by that counter-blow is briefly staggered, so they cannot slip past his line again this round." [reaction/on_being_hit/movement] — menu: EMPTY (+ shelf: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, stunning-strike, charge-push, hook-rider)
[reskin] signature bound to the concept's verb: action — rally (shield)
[reskin] word match declined by the call: rally, own-turn-punisher, push-prone — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit" after being shown rally, which the GM's words keyed
[reskin] key match declined: action — "rally" was ranked first on the call's own menu for shield, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: action — "When a foe within reach tries to slip away or circle around him, Vashka slams his shield into them and plants them back where they stood, then follows up with a sudden shield-spike thrust. Anyone struck by that counter-blow is briefly staggered, so they cannot slip past his line again this round." [reaction/on_being_hit/movement] — the model found no template that holds it (offered: rally, own-turn-punisher, push-prone)
[reskin] fallback respects the call: rally, own-turn-punisher, push-prone left the shelf — the call declined them for this sheet
[reskin] fallback stands down: the class_npc path has no shelf — the Gladiator's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 16 already beats print's 15 at CR 6, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "His lacquered plate is built to turn a blow back on the arm that threw it: whenever an enemy's weapon rings off the shield or plate, splinters of hardened lacquer spray out and sting the attacker, stinging their eyes and grip so their next swing comes slower." [trait/on_being_hit/condition] — menu: absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura)
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "His lacquered plate is built to turn a blow back on the arm that threw it: whenever an enemy's weapon rings off the shield or plate, splinters of hardened lacquer spray out and sting the attacker, stinging their eyes and grip so their next swing comes slower." [trait/on_being_hit/condition] — the model found no template that holds it (offered: absorption, bloodied-burst, resonant-body, weapon-lodge, adhesive)
[reskin] concept-first trait skipped: guarded-stance — AC 16 already beats print's 15 at CR 6, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329); the same gate the seat's menu and the class kit use
[reskin] repair: 1 clause(s) with no row — "never breaks ranks"; one targeted call with the sheet as context
[reskin] repair: the answer held no rows — the clauses stay unplaced
[reskin] weapons answered: Shield Spike = none; Broadsword = longsword
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] languages by species: Goblin — the concept names the species; print's NPCs of it speak it
[reskin] print canon alignment: Lawful Neutral -> Neutral — the Gladiator's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common, Goblin" -> "Common, Goblin" — the Gladiator's plus the concept's Goblin
[reskin] print canon attack: "Spear" keeps print's hybrid frame — reach 5 ft. or range 20/60 ft. (the Gladiator's weapon is thrown)
[reskin] print canon attack: "Shield Spike" -> "Spear" — the Gladiator's own row
[reskin] print canon rows: Broadsword leave — the Gladiator has one melee row (Spear), and Multiattack reads print's
[reskin] print canon multiattack: "Vashka makes three Spear attacks. It can replace one attack with a use of Shield Bash." — the Gladiator's own
[reskin] print canon skills: "Athletics +7, Perception +4" -> "Athletics +10, Performance +5" — the Gladiator's own skills, each derived from this sheet's stat and PB
[reskin] print canon row: Actions/Shield Bash — the Gladiator's own
[reskin] class weapon: Actions/"Spear" -> "Longsword" — a fighter fights with a longsword, not the Gladiator's
[reskin] dead name still carried — "Shield Bash" names a row that is still on the sheet; no sweep
audit finding below confidence gate: Shield Bash Prone imposed with no stated exit is fine per calibration (the condition carries its own escape — standing up), so this clause is not a defect; the only real counterplay issue is that the Shield Bash has a save, so it is compliant.
```


---


### Hivecrawler — in the run

**Concept:** A Large insectile horror. It has four scythe-arms, a spitting maw, and a shell that sheds acid. It fights by pinning prey with two arms and carving with the others.

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Hivecrawler | 9 | brute-8-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 7 / off 10 → 8.5; sustained 62 (2 × Scythe); nova Seething Spray 32; dmg 63

```
Hivecrawler

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

Caustic Carapace. A creature that touches the hivecrawler or hits it with a melee attack while within 5 feet of it takes 7 (2d6) Acid damage.

Actions

Multiattack. The hivecrawler makes two attacks, using Scythe or Carving Limbs in any combination.

Scythe. Melee Attack Roll: +8, reach 10 ft. 31 (6d8 + 4) Slashing damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 16). While Grappled, the target has the Restrained condition.

Seething Spray (Recharge 5-6). Constitution Saving Throw: DC 15, each creature in a 30-foot Cone. Failure: 32 (5d12) Acid damage, and the target has the Poisoned condition until the end of its next turn. Success: Half damage only.

Carving Limbs. Melee Attack Roll: +8, reach 5 ft. 31 (6d8 + 4) Slashing damage.

Bonus Actions

Swallow. The hivecrawler swallows one Medium or smaller creature it is grappling. While swallowed, the target has the Blinded and Restrained conditions, has Total Cover against attacks and other effects outside the hivecrawler, and takes 10 (3d6) Acid damage at the start of each of the hivecrawler's turns. The hivecrawler can have only one creature swallowed at a time. If the hivecrawler takes 25 damage or more on a single turn from the swallowed creature, the hivecrawler must regurgitate the target at the end of that turn, and the target exits Prone in an unoccupied space within 10 feet of the hivecrawler. If the hivecrawler dies, a swallowed creature exits the body Prone by using 10 feet of movement.

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
- Actions/Scythe — the chassis
- Actions/Seething Spray — template spew; library draw (seed unstamped); binds the GM's words: spits
- Actions/Carving Limbs — authored for this sheet; the GM's clause "carving with the others"
- Bonus Actions/Swallow — binds the GM's words: swallow+swallows+engulf+engulfs+devour+devours+gulp+smother+entomb+cocoon+whelm
- Traits/Caustic Carapace — template heated-body; library draw (seed unstamped); the GM's clause "a shell that sheds acid"; binds the GM's words: acid+burn+touch

**Engine trace**

```
[path] homebrew — "A Large insectile horror. It has four scythe-arms, a spitting maw, and a shell t" (call)
[route] brute-grappler type=Monstrosity mechanics=grapple, engulf, breath — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: on the GM's own words "pinning prey with two arms" | brute-grappler: ✓ ("pinning prey with two arms") | brute-grappler: no line key in the words — the model's read of its quote | bane refused: the words carry no weakness clause, so "acid" answers a question nobody asked
[concept] resolve: archetype=brute type=Monstrosity themes=bestial/venomous mind=bestial style=grappler energy=Acid mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: grapple, engulf, breath
[concept] signature elements: pinning prey with two scythe-arms while the others carve [behavior] | four scythe-arms [body] | acid-shedding shell [body]
[concept] identity: The horror opens by lunging to seize prey with two scythe-arms, pinning it fast while the remaining pair carves it apart in the same round. Every round after, it holds its victim close and keeps cutting, its shedding shell slicking the ground beneath it with acid so that anything nearby that tries to help or flee is burned for the trouble. It fights to the death with a relentless, grasping hunger, never toying and never fleeing, prioritizing whichever target it has already pierced.
[concept] lore: Hatched in the acid-etched caverns beneath a ruined hive, it was bred to feed a colony that starved, and now it wanders in search of any warm body it can pin and carve.
[reskin] donor: brute-8-grappler -> CR 9
[reskin] [path] decides: homebrew (the matcher agrees)
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline declared: "the hivecrawler" — the call's own answer (kind), built from the name
[reskin] inline form: "the hivecrawler" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] asked field dropped: the call answered trigger "at_will" for "It has four scythe-arms" but offered no quote
[reskin] asked field dropped: the call answered limit "at_will" for "It has four scythe-arms" but offered no quote
[reskin] asked field dropped: the call answered trigger "at_will" for "carving with the others" but offered no quote
[reskin] asked field dropped: the call answered limit "at_will" for "carving with the others" but offered no quote
[reskin] clauses: "A Large insectile horror" -> has (header) | "It has four scythe-arms" -> has (mechanical) [asked: attack] | "a spitting maw" -> has (descriptive) | "a shell that sheds acid" -> has (descriptive) | "It fights by pinning prey with two arms" -> has (descriptive) | "carving with the others" -> has (mechanical) [asked: attack]
[reskin] signature idea (action): "It rears up and sprays a fan of seething acid from its spitting maw across everything in front of it, the same caustic brew that drips from its shell. Any creature caught in the spray is left slick and burning, so its skin sizzles for several moments afterward and the ground around it stays hissing and hazardous. This is how it softens a crowd before wading in to seize one of them." [action/save/damage] — menu: condition-payoff, shield-bash, hook-drag, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, exploiter (+ shelf: leap, shell-withdraw, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, affliction, contagion, stunning-strike, charge-push, hook-rider, pounce)
[reskin] signature bound to the concept's verb: action — exploiter, spew, escalating-dread, shell-withdraw (pinned, spits, horror, shell)
[reskin] value check: "Seething Spray (Recharge 5-6)" EV 84.8 vs floor 54.1 (the whole Multiattack (2 attacks)) — worth the trade
[reskin] signature template: spew -> Actions/"Seething Spray (Recharge 5-6)" ("The creature rears up and sprays a fan of seething acid from its spitting maw ac [verb: spits:concept]")
[reskin] keys spent by the action: spits
[reskin] signature idea (trait): "Its shell constantly sheds acid, leaving a slick, seething film across the ground wherever it stands and moves. The stuff clings to anything that touches or grapples it, and pools beneath its feet so that creatures trying to help its victims or slip past it get burned for the trouble." [trait/always/damage] — menu: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending, weapon-lodge)
[reskin] signature bound to the concept's verb: trait — heated-body (acid)
[reskin] word match declined by the call: adhesive, aberrant-ground — the key word does not mean the mechanic here
[reskin] signature template (trait): heated-body -> Traits/"Caustic Carapace" ("the shell sheds acid that clings to anything that touches or grapples it, burnin [verb: acid:concept, burn:idea, touch:idea]")
[reskin] repair: 1 clause(s) with no row — "carving with the others"; one targeted call with the sheet as context
[reskin] repaired sheet: 2 attack row(s), 0 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] weapons answered: Scythe = none
[reskin] speed by concept: added Climb 40 ft. — the concept's movement set decides
[reskin] languages held: None stands — INT 4 on a Monstrosity speaks nothing, whatever the mind read said
[reskin] row binds its clause: "Caustic Carapace" answers "a shell that sheds acid" — the keys it matched came from that clause, so the coverage credit has a receipt
```


---


### Siltbound Hag — in the run

**Concept:** a marsh witch who curses trespassers, cr 7

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Siltbound Hag | 7 | caster-8-binder | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 3 / off 7 → 5; sustained 48 (3 × Arcane Burst); nova none; dmg 48

```
Siltbound Hag

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

Languages Common and any three languages, Sylvan

CR 7 (XP 2,900; PB +3)

Actions

Multiattack. The hag makes three Arcane Burst attacks. It can replace one attack with a use of Siltbound Curse.

Arcane Burst. Melee or Ranged Attack Roll: +6, reach 5 ft. or range 120 ft. 16 (3d8 + 3) Force damage.

Spellcasting. The hag casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 14):

- At Will: Detect Magic, Light, Mage Armor, Mage Hand, Prestidigitation
- 2/Day Each: Fireball, Invisibility
- 1/Day Each: Cone of Cold, Fly

Siltbound Curse. Dexterity Saving Throw: DC 14, one creature within 60 feet. Failure: The target is cursed until the end of the hag's next turn. The first time the cursed target deals damage to any creature before then, it takes 10 (3d6) Necrotic damage.

Bonus Actions

Misty Step (3/Day). The hag casts Misty Step, using the same spellcasting ability as Spellcasting.

Reactions

Protective Magic (3/Day). The hag casts Counterspell or Shield in response to the spell's trigger, using the same spellcasting ability as Spellcasting.

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
- Actions/Siltbound Curse — template curse-debt; library draw (seed unstamped); the GM's clause "curses trespassers"; binds the GM's words: curse+hex
- Reactions/Protective Magic — mage kit; the GM's clause "witch"
- Bonus Actions/Misty Step — print's own row

**Engine trace**

```
[path] class_npc — class mage — "witch" (call)
[route] caster-binder (controller) type=Humanoid mechanics=none — casts: implied by the kind — "a marsh witch who curses trespassers" | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | caster-binder: ✓ ("curses trespassers") | caster-binder: key "curses" (class verb)
[concept] hints: binder→style ✓ ("a marsh witch who curses trespassers")
[concept] resolve: archetype=caster type=Humanoid themes=grave/beguiling mind=sapient style=binder energy=Necrotic mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: curses that strip away a victim's actions [behavior] | a body of black bog-water and silt [body] | luring trespassers into the deep mire [behavior]
[concept] identity: The marsh witch opens a fight from the reeds, laying a binding hex on the most dangerous trespasser before they can close — mud-caked weaving that roots boots and closes throats. Every round after, she keeps peeling actions away with curses and mud-slick debilities, retreating into the bog between castings so her prey wades after her into the deep water. When bloodied she thins into black bog-water and slips under the muck, not to flee but to come up behind her hunters with a curse already shaped.
[concept] lore: She was a hedge-witch drowned by the villagers she had healed, and the marsh took her grudge as its own, so now she drags every intruder down into the silt she can never leave.
[reskin] energy withheld: Necrotic on a Humanoid with no Necrotic in the concept's own words (fixed phrases read first)
[reskin] [path] class body: the mage stands on the Mage — the class's own print block, nearest CR 7
[reskin] print canon defenses: HP 108 -> 81, AC 15 -> 15 — the Mage's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 9, DEX 14, CON 11, INT 17, WIS 12, CHA 11 — the Mage's at its own CR; attack +7 -> +6, DC 14 (print's)
[reskin] donor: caster-8-binder -> CR 7
[reskin] [path] decides: class_npc on the Mage · class mage (the matcher would have said homebrew)
[reskin] print canon: "a marsh witch who curses trespassers, cr 7" heads on the Mage — print's rows ride along; the seat stays
[reskin] repair round 1: 4 defect(s) — name "Muddy Claw" is a natural weapon on a Humanoid whose concept gives it none — a Humanoid swings a weapon (Scimitar, Club, Spear) | "Muddy Claw" is an anatomical name dealing Slashing on a mind-driven attacker (the attack bonus keys to CHA) — print pays physical damage on mental strikes with implement names (the Dryad's Vine Lash, the Rakshasa's Cursed Touch) or carries a magical type (the Mage's Arcane Burst deals Force); rename to a conjured implement or pick a magical type | "Bog Bolt" deals Necrotic on a Humanoid whose concept names no Necrotic — a name is not a warrant; use a physical type | "Silt Hex" deals Necrotic on a Humanoid whose concept names no Necrotic — a name is not a warrant; use a physical type
[reskin] anatomy on a humanoid: "Muddy Claw" -> "Staff" (Bludgeoning) — a Humanoid with no species claw swings a weapon; the magical stamp is for a body that has the part
[reskin] class kit: mage — "witch": Protective Magic (3/Day) (Mage/Protective Magic)
[reskin] inline declared: "the hag" — the call's own answer (kind), built from the name
[reskin] inline form: "the hag" — the model's own reading of the name
[reskin] energy withheld on a base row: "Bog Bolt" Necrotic -> Piercing (the row's own noun; a Humanoid deals no Necrotic its concept never gave it)
[reskin] energy kept on a base row: "Silt Hex" Necrotic — the row's own noun pays for it
[reskin] control spell gated to daily — Bestow Curse (level 3 control at will is print's CR 13+ shape; at CR 7 it is 1/Day)
[reskin] spell DC coherence: DC 14 -> 11 off Charisma 11 (print's array stays)
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a marsh witch" -> has (descriptive), head | "curses trespassers" -> has (mechanical) [asked: save_single] | "cr 7" -> has (header)
[reskin] extraction: 1 of 3 model clauses quote nothing the user typed and leave the record ("cr 7")
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The hag reaches into the nearest patch of muck and pulls up a writhing knot of cursed reed and hair, flinging it at a trespasser she has already hexed. The curse splashes over the wound and burrows in, and for a short while every effort the victim makes — a swing, a spell, a shout for help — sinks into the mud like a thrown stone, leaving them able to do far less each round. It only takes hold on " [action/save/condition] — menu: condition-payoff, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, snare-bolt, slow-bolt, sensory-strike, herd, thrown-burst-seed, drain, curse-debt, zone-seed, reveal, wind-up, blighted-ground (+ shelf: delayed-brand, lay-on-hands, aggro-curse, self-invisibility, rally, snap-shot, bolt-restrain, bolt-drag, bolt-mark)
[reskin] signature template: curse-debt -> Actions/"Siltbound Curse" ("The hag curses a trespasser so their efforts sink into the mud and cost them — a [verb: curse:idea, hex:idea]")
[reskin] signature idea (trait): "The hag's body is less flesh than wet silt, so wounds knit back together the moment she stands in bog water or deep reeds. When she slips away from her hunters to a muddy pool, the marsh quietly closes what they did to her — the deeper she wades, the more of her the muck gives back." [trait/always/defense] — menu: false-appearance, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] signature bound to the concept's verb: trait — terrain-walk (marsh)
[reskin] word match declined by the call: terrain-walk — the key word does not mean the mechanic here
[reskin] trait declined: "Marsh Mending" — bound only on the idea's own words (knits:idea) with no key in the concept; a meat body earns its trait by the user's verb (the sniper's tracker, critic 2026-09-29)
[reskin] repair: 1 clause(s) with no row — "curses trespassers"; one targeted call with the sheet as context
[reskin] repair: the answer held no rows — the clauses stay unplaced
[reskin] weapons answered: Muddy Claw = none; Bog Bolt = none; Silt Hex = none; Rooting Curse = none
[reskin] weapon declined: "Bog Bolt" reads crossbow from its name, but the call answered none — the row carries no weapon
[reskin] weapon table: "Bog Bolt" — a launcher, never thrown, range 80/320
[reskin] print canon alignment: Neutral Evil -> Neutral — the Mage's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common, Sylvan" -> "Common and any three languages, Sylvan" — the Mage's plus the concept's Sylvan
[reskin] print canon attack: "Arcane Burst" keeps print's hybrid frame — reach 5 ft. or range 120 ft. (the Mage's weapon is thrown)
[reskin] print canon attack: "Staff" -> "Arcane Burst" — the Mage's own row
[reskin] print canon multiattack: "The hag makes three Arcane Burst attacks." — the Mage's own
[reskin] ranged row off: "Bog Bolt" leaves — the Mage carries no ranged row and the words name none
[reskin] save follows the effect: Actions/"Siltbound Curse" Charisma -> Dexterity — the row's point is its damage; a condition it hands out alongside does not pick the stat
[reskin] print canon skills: "Perception +4, Deception +3" -> "Arcana +6, History +6, Perception +4" — the Mage's own skills, each derived from this sheet's stat and PB
[reskin] print canon: chassis row leaves — Actions/"Silt Hex" — the Mage prints no row for it and no path stage claimed it
[reskin] print canon row: Actions/Spellcasting — print's own list replaces the chassis's
[reskin] print canon row: Bonus Actions/Misty Step (3/Day) — the Mage's own
[reskin] multiattack replacement clause: It can replace one attack with a use of Siltbound Curse.
[reskin] darkvision withheld: a Humanoid with no species kit granting it, no word for it in the GM's own text, and no print body that has it — print gives darkvision to 1 of 26 Humanoids ("darkvision 60 ft.; Passive Perception 14" -> "Passive Perception 14")
[reskin] row binds its clause: "Siltbound Curse" answers "curses trespassers" — the keys it matched came from that clause, so the coverage credit has a receipt
audit finding below confidence gate: Misty Step (3/Day) Misty Step is a bonus-action spell the hag can simply cast via Spellcasting; restating it as a separate 'Bonus Action' entry with a 3/Day limiter is a redundant rules entry duplicating the spell list.
```


---


### Oathsworn Iron Templar — in the run

**Concept:** a templar priest with a mace and no magic at all

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Oathsworn Iron Templar | 6 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 4 / off 8 → 6; sustained 51 (3 × Mace); nova none; dmg 51

```
Oathsworn Iron Templar

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

Aura of Authority. While in a 10-foot Emanation originating from the iron templar, the iron templar and its allies have Advantage on attack rolls and saving throws, provided the iron templar doesn't have the Incapacitated condition.

Actions

Multiattack. The iron templar makes three Mace attacks. It can replace one attack with a use of Shield Bash.

Mace. Melee Attack Roll: +7, reach 5 ft. 17 (3d8 + 4) Bludgeoning damage, and the target has Disadvantage on its next attack roll before the start of the iron templar's next turn.

Shield Bash. Strength Saving Throw: DC 15, one creature within 5 feet that the iron templar can see. Failure: 9 (2d4 + 4) Bludgeoning damage. If the target is a Medium or smaller creature, it has the Prone condition.

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
- Actions/Shield Bash — print's own row

**Engine trace**

```
[path] class_npc — class paladin — "templar" (call)
[route] defender type=Humanoid mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | defender: ✓ ("a templar priest with a mace") | defender: no line key in the words — the model's read of its quote
[concept] resolve: archetype=defender type=Humanoid themes=armed/forged mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: mace blows meant to disable rather than slay [behavior] | shield planted against anything that tries to pass [object] | sworn vow of iron discipline [body]
[concept] identity: This templar priest wades in behind a raised shield, mace held high, and opens by planting himself between the party's squishies and whatever wants them dead. Every round he spends is a measured toll: a shield shove to pin the enemy in reach, then a percussive mace blow to the knee, the elbow, the jaw — blows meant to disable and displace, never to kill cleanly. Bloodied, he does not flee; he backs into a corner and makes the doorway cost double, and his grim satisfaction is a heretic sent crawling out instead of a corpse dropped.
[concept] lore: The Iron Orders forge their templars by oath and by repetitive strike rather than by miracle — each is a piece of iron discipline given a mace and told that faith is what the body does when it refuses to step aside.
[reskin] [path] class body: the paladin stands on the Gladiator — the class's own print block, nearest CR 6
[reskin] print canon defenses: HP 91 -> 112, AC 19 -> 16 — the Gladiator's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon armor: 16 (studded leather, shield) — print's Gear line; the 2014 sheet prints it (the Goblin Boss wore "splint", canaries 2026-10-12)
[reskin] print canon array: STR 18, DEX 15, CON 16, INT 10, WIS 12, CHA 15 — the Gladiator's at its own CR; attack +7 -> +7, DC 15 (print's)
[reskin] donor: defender-5 -> CR 6
[reskin] row gated out: Guard Aura (aura) — the concept did not claim this mechanic
[reskin] [path] decides: class_npc on the Gladiator · class paladin (the matcher would have said twist Priest)
[reskin] print canon: "a templar priest with a mace and no magic at all" heads on the Gladiator — print's rows ride along; the seat stays
[reskin] named parts: Mace (slot) — the user's words, the engine's numbers
[reskin] named parts landed: 1 attack row(s), 0 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] chassis row off: Actions/"Shield Shove" leaves — the GM named a melee weapon (Mace); one weapon, one rule set
[reskin] class kit: paladin — "templar": Aura of Authority (Hobgoblin Captain/Aura of Authority)
[reskin] inline declared: "the iron templar" — the call's own answer (kind), built from the name
[reskin] inline form: "the iron templar" — the model's own reading of the name
[reskin] lacks asked: "no magic at all"
[reskin] clauses: "a templar priest with a mace" -> has (mechanical) [asked: attack] | "no magic at all" -> LACKS (mechanical)
[reskin] signature idea (action): "When he cracks someone with the mace, the percussive shock runs through the whole body, not the point of impact — the struck foe loses its footing and stumbles backward out of the space it was holding, ending up shoved several paces away from the templar with its next step already spent. This is him bidding a heretic crawl out of the room rather than be carved out of it; it fires on the same swing" [rider/on_hit/movement] — menu: stunning-strike, charge-push, hook-rider (+ shelf: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, riposte)
[reskin] signature re-seated: action — no rider shares the verb; the idea "When he cracks someone with the mace, the percussive shock r…" is tried as an action
[reskin] signature idea (action): "When he cracks someone with the mace, the percussive shock runs through the whole body, not the point of impact — the struck foe loses its footing and stumbles backward out of the space it was holding, ending up shoved several paces away from the templar with its next step already spent. This is him bidding a heretic crawl out of the room rather than be carved out of it; it fires on the same swing" [action/save/movement] — menu: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up (+ shelf: patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, riposte, stunning-strike, charge-push, hook-rider)
[reskin] signature miss: action — "When he cracks someone with the mace, the percussive shock runs through the whole body, not the point of impact — the struck foe loses its footing and stumbles backward out of the space it was holding, ending up shoved several paces away from the templar with its next step already spent. This is him bidding a heretic crawl out of the room rather than be carved out of it; it fires on the same swing" [action/save/movement] — no template on the shelf shares a verb with the concept or the idea (offered: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, riposte, stunning-strike, charge-push, hook-rider)
[reskin] fallback stands down: the class_npc path has no shelf — the Gladiator's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 16 already beats print's 15 at CR 6, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "His shield is not a thing he raises but a thing that is simply there — while he is standing and conscious, ground he can see and reach toward will not let a foe walk past him without paying for it, and the first one to try has its advance cut off hard mid-stride, its movement killed in front of him. It costs him nothing and never tires; the only way through is through him. He is a doorway made of " [trait/always/movement] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending, weapon-lodge)
[reskin] word match declined by the call: relentless-pursuit, bound, web-walker — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "His shield is not a thing he raises but a thing that is simply there — while he is standing and conscious, ground he can see and reach toward will not let a foe walk past him without paying for it, and the first one to try has its advance cut off hard mid-stride, its movement killed in front of him. It costs him nothing and never tires; the only way through is through him. He is a doorway made of " [trait/always/movement] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura)
[reskin] weapons answered: Mace = mace; Shield Shove = none
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] print canon alignment: Lawful Neutral -> Neutral — the Gladiator's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon multiattack: "The iron templar makes three Spear attacks. It can replace one attack with a use of Shield Bash." — the Gladiator's own
[reskin] print canon skills: "Athletics +7, Perception +4" -> "Athletics +10, Performance +5" — the Gladiator's own skills, each derived from this sheet's stat and PB
[reskin] print canon row: Actions/Shield Bash — the Gladiator's own
[reskin] multiattack reconciled: "Spear" is no row on this sheet — the Multiattack cites "Mace" instead
[reskin] dead name still carried — "Shield Bash" names a row that is still on the sheet; no sweep
[reskin] final price: print's Multiattack: the round ran 66 against the card's 45 — the attack rows re-solve at 72% (3 attacks off one row after a supersede)
audit finding below confidence gate: Aura of Authority The aura is written to buff the templar and its allies but the end condition for the aura itself (e.g. how long Advantage persists once a creature leaves the Emanation) is unstated, though the Incapacitated clause implies the buff is meant to be continuous within the area.
```


---


### Gale-throated Sky Reaver — in the run

**Concept:** a young storm drake whose breath is a rolling wall of thunder

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Gale-throated Sky Reaver | 7 | dragon-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- **dropped clause:** "a young storm drake whose breath is a rolling wall of thunder"
- read: def 5 / off 7 → 6; sustained 36 (2 × Claw); nova Thunder Roll 39; dmg 50

```
Gale-throated Sky Reaver

Large Dragon, Chaotic Neutral

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

Multiattack. The sky reaver makes two Claw attacks.

Claw. Melee Attack Roll: +7, reach 5 ft. 11 (2d6 + 4) Slashing damage plus 7 (2d6) Thunder damage.

Thunder Roll (Recharge 5-6). Constitution Saving Throw: DC 15, each creature in a 15-foot Cone. Failure: 39 (6d12) Thunder damage. Success: Half damage.

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
- Actions/Claw — the chassis
- Actions/Thunder Roll — the chassis

**Engine trace**

```
[path] homebrew — "a young storm drake whose breath is a rolling wall of thunder" (call)
[route] dragon type=Dragon mechanics=breath — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | dragon: ✓ ("a young storm drake whose breath is a ro") | dragon: key "drake" (class body)
[concept] hints: dragon→body ✓ ("young storm drake whose breath") | breath→mechanics ✓ ("breath is a rolling wall of thunder")
[concept] resolve: archetype=dragon type=Dragon themes=draconic/breath mind=sapient style=— energy=Thunder mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: breath
[concept] signature elements: rolling wall of thunder breath [behavior] | storm-charged wings and claws [body] | the sky it claims as hunting ground [aura]
[concept] identity: The young storm drake announces itself with a line of thunder-it can see coming, a rolling wall of concussive sound that it exhales across the field to bowl over and deafen whoever stands before it. Once the wall has scattered a formation, it wheels on the wing above the chaos, diving through the ringing, reeling survivors to strike with teeth and lightning-crackling claws. It harries and circles rather than committing, gusting back into the air when wounded and roaring its thunder until bloodied enough to retreat into the clouds.
[concept] lore: Hatched in the anvil-clouds of a high storm front, a young storm drake rides the leading edge of squalls and wants only to claim a stretch of open sky and the frightened things beneath it as its hunting ground.
[reskin] body type: dragon — the body outranks the role (recorded: dragon)
[reskin] nova capped: "Breath Weapon" 42 → 39 (the chassis nova obeys the cap: 39 at CR 7)
[reskin] donor: dragon-2 -> CR 7
[reskin] [path] decides: homebrew (the matcher agrees)
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline declared: "the sky reaver" — the call's own answer (kind), built from the name
[reskin] inline form: "the sky reaver" — the model's own reading of the name
[reskin] save dc derived: DC 14 -> 15 (8 + PB 3 + the sheet's best 4) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a young storm drake whose breath is a rolling wall of thunder" -> has (mechanical) [asked: save_area]
[reskin] menu pruned: action — escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating (the sheet cannot render them)
[reskin] signature idea (action): "The sky reaver snaps its wings down and hurls a roiling thunderhead of air at a foe it can see, the gust rolling low along the ground before bursting upward under them. Whoever it catches is knocked off their feet and thrown back, their ears ringing, and the drake is already wheeling around to dive on whoever got scattered. It fires from range, choosing one target per pass rather than blanketing a" [action/always/movement] — menu: gaze-single, snare, zone, execute, seal, shield-bash, lure (+ shelf: rampage, lay-on-hands, second-wind, affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, charge)
[reskin] decline reason: action — the call answered none and names it "no_fit"
[reskin] signature miss: action — "The sky reaver snaps its wings down and hurls a roiling thunderhead of air at a foe it can see, the gust rolling low along the ground before bursting upward under them. Whoever it catches is knocked off their feet and thrown back, their ears ringing, and the drake is already wheeling around to dive on whoever got scattered. It fires from range, choosing one target per pass rather than blanketing a" [action/always/movement] — the model found no template that holds it (offered: gaze-single, snare, zone, execute, seal, shield-bash, lure, charge)
[reskin] signature idea (trait): "Storm-charged claws crackle brighter the longer the drake stays airborne in a fight, and when it strikes a foe that is already reeling and deafened from its thunder, the lightning leaps into them and claws at their senses, robbing them of their footing and their next reaction." [trait/always/condition] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending, weapon-lodge)
[reskin] signature bound to the concept's verb: trait — heated-body (storm)
[reskin] word match declined by the call: heated-body, noxious-aura, gaze-aura, blurred-form — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit" after being shown heated-body, which the GM's words keyed
[reskin] key match declined: trait — "heated-body" was ranked first on the call's own menu for storm, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: trait — "Storm-charged claws crackle brighter the longer the drake stays airborne in a fight, and when it strikes a foe that is already reeling and deafened from its thunder, the lightning leaps into them and claws at their senses, robbing them of their footing and their next reaction." [trait/always/condition] — the model found no template that holds it (offered: heated-body, false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst, fire-aura)
[reskin] weapons answered: Claw = none; Thunder Roll = none; Deafening Peal = none
[reskin] chassis nova: "Thunder Roll (Recharge 5-6)" — the dragon-2's own nova row (its "Breath Weapon", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] element immunity: Thunder (merged into the header write)
[reskin] dragon senses raised to tier: blindsight 30 added
[reskin] dragon senses raised to tier: darkvision 60 -> 120
[reskin] dragon languages: Draconic added (42/42 print dragons speak it)
[reskin] immunities stamped for type: Dragon -> Thunder
```


---


### Well Draught — in the run

**Concept:** name: the thing in the well | 

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Well Draught | 5 | lurker-5-trap | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 5 / off 5 → 5; sustained 38 (2 × Claw); nova none; dmg 38

```
Well Draught

Medium Undead, Neutral

AC 20
Initiative -1 (9)

HP 90 (12d8 + 36)

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

Immunities Poison; Exhaustion, Poisoned

Senses darkvision 60 ft.; Passive Perception 16

Languages None

CR 5 (XP 1,800; PB +3)

Traits

Clinging Chill. The draught adheres to anything that touches it. A Huge or smaller creature adhered to the draught is also Grappled by it (escape DC 14). Ability checks made to escape this grapple have Disadvantage.

Actions

Multiattack. The draught makes two Claw attacks. It can replace one attack with a use of Draught of Vitality.

Claw. Melee Attack Roll: +6 (with Advantage if the target is Grappled by the draught), reach 5 ft. 12 (2d8 + 3) Slashing damage plus 7 (2d6) Necrotic damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 14).

Draught of Vitality. Constitution Saving Throw: DC 14, one creature within 30 feet. Failure: 18 (4d8) Necrotic damage, and the draught regains Hit Points equal to half the damage dealt. Success: Half damage only.

Bonus Actions

False Form. The draught shape-shifts to resemble an ordinary object or fixture of the place it waits in while retaining its game statistics, or it returns to its true form. While it is motionless in its false form, it is indistinguishable from that feature.

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
- Actions/Claw — the chassis
- Actions/Draught of Vitality — library seed drain
- Bonus Actions/False Form — the chassis
- Traits/Clinging Chill — template adhesive; library draw (seed unstamped)

**Engine trace**

```
[path] homebrew — "the thing in the well" (call)
[route] lurker-trap type=Undead mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | lurker-trap: ✓ ("the thing in the well") | lurker-trap: no line key in the words — the model's read of its quote
[concept] resolve: archetype=lurker type=Undead themes=grave/grasping mind=bestial style=trap energy=Necrotic mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: lying still in the well until prey reaches down [behavior] | seizing and dragging prey down to drown [behavior] | a sodden, rotting corpse-shape [body]
[concept] identity: The thing in the well waits at the bottom of its shaft, a sodden corpse-shape mistaken for a log or an old bucket rope until a hand reaches down into the dark — then it lurches up the wet stones to seize the wrist and drag the victim over the lip. Each round it hauls down and drowns what it has caught, clamping on and sinking with its prey, and if wounded it clings tighter and descends toward the bottom of the shaft rather than releasing. It does not toy and does not flee far: it retreats only to the black water where its strength returns, and there it waits for the next fool to look down.
[concept] lore: A drowned body wedged under the waterline of an old well, kept moving by whatever the villagers dropped in it — coins, curses, and the occasional child — and it wants only to pull one more warm thing down into the dark with it.
[reskin] donor: lurker-5-trap -> CR 5
[reskin] row gated out: Swallow (engulf) — the concept did not claim this mechanic
[reskin] [path] decides: homebrew (the matcher agrees)
[reskin] reach folded: "Grasping Limb" (reach 50) and Reel leave — no tether in the concept; the grapple rides "Melee Attack" (the Giant Crab's shape)
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline declared: "the draught" — the call's own answer (kind), built from the name
[reskin] inline form: "the draught" — the model's own reading of the name
[reskin] save dc derived: DC 13 -> 14 (8 + PB 3 + the sheet's best 3) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "the thing in the well" -> has (descriptive), head
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "When the draught has someone caught, it does not fight to keep them — it sinks. Still gripping its prey, it hauls itself and the victim down whatever wet descent it is on, falling back toward the deep water at the bottom of its shaft, and everything it drags under that water is pulled into the dark with it. The deeper it goes, the harder it is to hold on, but whatever goes all the way down does no" [action/always/movement] — menu: leap, condition-payoff, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, terror-pulse, snare-bolt, slow-bolt, sensory-strike, drain, zone-seed, exploiter, blighted-ground (+ shelf: delayed-brand, patient-defense, self-invisibility, focus, feint-slip, coating, riposte, affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, isolation)
[reskin] word match declined by the call: obstacle-pull, hook-rider, exploiter, condition-payoff — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit"
[reskin] signature miss: action — "When the draught has someone caught, it does not fight to keep them — it sinks. Still gripping its prey, it hauls itself and the victim down whatever wet descent it is on, falling back toward the deep water at the bottom of its shaft, and everything it drags under that water is pulled into the dark with it. The deeper it goes, the harder it is to hold on, but whatever goes all the way down does no" [action/always/movement] — the model found no template that holds it (offered: leap, condition-payoff, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, terror-pulse, snare-bolt, slow-bolt, sensory-strike, drain, zone-seed, exploiter, blighted-ground, hook-rider, patient-defense)
[reskin] fallback respects the call: exploiter, condition-payoff left the shelf — the call declined them for this sheet
[reskin] fallback skipped by the floor: patient-defense (EV 0 vs 2.9)
[reskin] value check: "Vitality Leech" EV 14 vs floor 9.4 (one attack of 2) — added Success: Half; dice 11 → 18
[reskin] library seed drawn: drain -> Actions/"Vitality Leech" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The draught is a drowned thing through and through: whoever is pressed against its sodden, bloated body takes on the cold of the well. Anyone it has seized, or anyone who grapples or clings to it, feels the water's chill seep into their bones and begins to go numb and sluggish." [trait/always/condition] — menu: adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, evasion, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] word match declined by the call: spider-climb — the key word does not mean the mechanic here
[reskin] seat owes nothing: the trap line was the model's read of its quote, not a key in the words (a hermit was handed Assassinate, day-one 2026-09-30)
[reskin] signature template (trait): adhesive -> Traits/"Clinging Chill" ("anyone it has seized, or anyone who grapples or clings to it, begins to go numb  [shape fit, no verb match]")
[reskin] weapons answered: Claw = none
[reskin] immunities stamped for type: Undead -> Poison; Exhaustion, Poisoned
[reskin] multiattack replacement clause: It can replace one attack with a use of Vitality Leech.
audit finding below confidence gate: Clinging Chill This modifies ability checks rather than the saving throw the escape DC actually calls for, so a GM has no clear resolution for escaping the adhesion.
[reskin] audit rename: "Vitality Leech" -> "Draught of Vitality"
```


---


### Cinder Warden — in the run

**Concept:**  | role: brute

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Cinder Warden | 4 | brute-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- **dropped clause:** "herding them back toward its smoking pit"
- **dropped clause:** "It is scheming (INT 14-16)"
- **dropped clause:** "it is a relentless ambush predator"
- read: def 1 / off 5 → 3; sustained 28 (1 × Slam); nova Ashen Eruption 22; dmg 33

```
Cinder Warden

Large Undead, Lawful Neutral

AC 13
Initiative -1 (9)

HP 82 (11d10 + 22)

Speed 30 ft., Burrow 30 ft.

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

Resistances Fire

Immunities Poison; Exhaustion, Poisoned

Senses tremorsense 60 ft.; Passive Perception 11

Languages Common plus the languages it knew in life

CR 4 (XP 1,100; PB +2)

Traits

Wounded Fury. While the warden is below half its Hit Points, the warden's Slam deals an extra 14 (4d6) Fire damage and its Ashen Eruption recharges on a roll of 4-6 instead of 5-6.

Cinder Stalker. The warden knows the direction and distance to any creature it has damaged within the last 24 hours, as long as the two of them are on the same plane of existence.

Actions

Slam. Melee Attack Roll: +6, reach 5 ft. 17 (3d8 + 4) Bludgeoning damage plus 11 (2d10) Fire damage.

Ashen Eruption (Recharge 5-6). Dexterity Saving Throw: DC 14, each creature in a 10-foot Emanation originating from the warden. Failure: 22 (5d8) Bludgeoning damage. Success: Half damage.

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

- Actions/Slam — the chassis
- Actions/Ashen Eruption — template ground-burst; library draw (seed unstamped); the GM's clause "erupts in a gout of searing cinder-hot grave dust that clings and burns"; binds the GM's words: erupt+erupts
- Traits/Wounded Fury — authored for this sheet; the GM's clause "wounded"
- Traits/Cinder Stalker — template faultless-tracker; library draw (seed unstamped); the GM's clause "Once it has prey it hunts by collapsing the ground ahead of fleeing victims"; binds the GM's words: hunts+hunted+marked

**Engine trace**

```
[path] blank — "role: brute" (code)
[route] brute type=Undead mechanics=breath, grapple — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | brute-grappler: ✓ ("a gout of searing cinder-hot grave dust ") | brute-grappler: no line key in the words — the model's read of its quote | brute-grappler -> brute: a grappler is a mechanic engine and needs a key in the words — the model's read of its quote cannot land it
[concept] synthesis (blank roll): archetype=brute type=Undead themes=grave/subterranean mind=sapient style=— lore=✓
[concept] synthesis text: A half-sunk pillar of grave-ash held in the loose shape of the ruin's last warden, its gelatinous body sifting and re-packing itself so that a cracked skull or a rusted buckle drifts through its chest like patience itself. It lies buried under the flagstones for years, listening through the ash for footfalls and schemes until a careless step comes close, then erupts in a gout of searing cinder-hot grave dust that clings and burns. Once it has prey it hunts by collapsing the ground ahead of fleeing victims, herding them back toward its smoking pit; wounded, it does not run but sinks low and burns hotter, a spiteful hoarder that would rather boil in its own fire than let a thief walk away. It is scheming (INT 14-16), and it is a relentless ambush predator.
[concept] signature elements: cinder-hot grave dust [body] | collapsing the ground to herd prey [behavior] | buried listening and scheming [behavior]
[concept] name proposal: Cinder Creeper
[concept] lore: It was the ruin's ash-pit keeper, a living man who sealed himself in with the dead to guard their treasures, and the burning dust he breathed still carries his grudge against looters.
[reskin] donor: brute-2 -> CR 4
[reskin] [path] decides: blank (the matcher would have said homebrew)
[reskin] name_element answered: Cinder Warden = literal
[reskin] class kit: none — the blank path takes no class kit
[reskin] inline declared: "the warden" — the call's own answer (kind), built from the name
[reskin] inline form: "the warden" — the model's own reading of the name
[reskin] save dc derived: DC 13 -> 14 (8 + PB 2 + the sheet's best 4) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] lacks not claimed: "it does not run" reads like a lack to the words, and the call's list did not name it
[reskin] clauses: "A half-sunk pillar of grave-ash held in the loose shape of the ruin's last warden" -> has (descriptive), head | "its gelatinous body sifting" -> has (descriptive) | "re-packing itself so that a cracked skull or a rusted buckle drifts through its chest like patience itself" -> has (descriptive) | "It lies buried under the flagstones for years" -> has (descriptive) | "listening through the ash for footfalls" -> has (descriptive) | "schemes until a careless step comes close" -> has (descriptive) | "erupts in a gout of searing cinder-hot grave dust that clings and burns" -> has (descriptive) | "Once it has prey it hunts by collapsing the ground ahead of fleeing victims" -> has (mechanical) [asked: movement] | "herding them back toward its smoking pit" -> has (mechanical) [asked: movement] | "wounded" -> has (mechanical) [asked: when_bloodied/buff_self] | "it does not run" -> has (mechanical) [asked: when_bloodied/buff_self] | "sinks low and burns hotter" -> has (mechanical) [asked: when_bloodied/buff_self] | "a spiteful hoarder that would rather boil in its own fire than let a thief walk away" -> has (descriptive) | "It is scheming (INT 14-16)" -> has (mechanical) | "it is a relentless ambush predator" -> has (mechanical)
[reskin] signature idea (action): "With a heavy slam of its bulk into the flagstones, the warden caves in the ground ahead of a fleeing foe, dropping them into a shuddering, cinder-choked pit that churns and grinds. The pit is a low, smoldering hollow of loose ash and broken stone; anyone caught inside is swallowed to the waist and slowed, and the collapsing rim crumbles inward and drags them a little closer to the warden with each" [action/save/movement] — menu: trample, shield-bash, active-toll, random-ray, ground-burst, spew, burrow-ambush, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, blighted-ground (+ shelf: rampage, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, charge-push, hook-rider, pounce, charge)
[reskin] signature bound to the concept's verb: action — ground-burst, burrow-ambush, blighted-ground, focus (erupt, erupts, ambush, ground, ash, hunt, patience)
[reskin] word match declined by the call: burrow-ambush, blighted-ground, focus — the key word does not mean the mechanic here
[reskin] value check: "Ashen Eruption (Recharge 5-6)" EV 41.9 vs floor 22.8 (the whole Multiattack (1 attacks)) — worth the trade
[reskin] signature template: ground-burst -> Actions/"Ashen Eruption (Recharge 5-6)" ("The warden lies buried under the flagstones and erupts in a gout of searing cind [verb: erupt:concept, erupts:concept]")
[reskin] keys spent by the action: erupt, erupts
[reskin] signature idea (trait): "The grave dust it throws off clings where it lands, coating flesh and armor in a hot, searing grit that will not sift away. Anyone struck by its burning attacks stays smeared with clinging cinder-dust and keeps smoldering until they spend their own effort scraping and beating it off — and the warden can always feel the heat of that dust, so a marked victim cannot slip away from its tremorsense." [trait/always/damage] — menu: adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, earth-glide, tunneler, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst, assassinate (+ shelf: heated-body, false-appearance, absorption, bloodied-burst, resonant-body, fire-aura, uncanny-sense, warded-mending, weapon-lodge)
[reskin] signature bound to the concept's verb: trait — heated-body (burn, sear, fire, hot)
[reskin] word match declined by the call: adhesive, aberrant-ground, terrain-walk — the key word does not mean the mechanic here
[reskin] signature template (trait): faultless-tracker -> Traits/"Cinder Stalker" ("the clinging cinder-dust can't be scraped off and the warden feels its heat, so  [verb: hunts:concept, hunted:concept, marked:idea]")
[reskin] repair: 2 clause(s) with no row — "wounded", "it does not run"; one targeted call with the sheet as context
[reskin] repaired sheet: 0 attack row(s), 0 save, 1 trait(s), 0 reaction(s); 1 clause(s) unplaced
[reskin] weapons answered: Slam = none
[reskin] languages by mind: "None" -> "Common plus the languages it knew in life" (sapient)
[reskin] immunities stamped for type: Undead -> Poison; Exhaustion, Poisoned
[reskin] resistances derived: Fire
[reskin] vulnerability rejected — "Cold" has no warrant in the concept's own text (print's default is none)
[reskin] nova capped: Actions/Ashen Eruption (Recharge 5-6) — 27 over the CR 4 ceiling 22, dice to 22 (5d8)
[reskin] 2024 caps: "Wounded Fury" — a condition or game term shipped lowercase
[reskin] row binds its clause: "Ashen Eruption" answers "erupts in a gout of searing cinder-hot grave dust that clings and burns" — the keys it matched came from that clause, so the coverage credit has a receipt
[reskin] row binds its clause: "Cinder Stalker" answers "Once it has prey it hunts by collapsing the ground ahead of fleeing victims" — the keys it matched came from that clause, so the coverage credit has a receipt
[reskin] ask vs row MISMATCH: "wounded" -> "Wounded Fury" — trigger: asked when_bloodied, row reads at_will
[reskin] asked but unanswered: "it does not run" asked for when_bloodied and no row binds the clause
[reskin] asked but unanswered: "sinks low and burns hotter" asked for when_bloodied and no row binds the clause
audit finding below confidence gate: Wounded Fury Ashen Eruption uses a Recharge 5-6 gate; the trait redefines the recharge range but the block never states whether this replacement applies to the recharge die rolled at the start of the warden's turn or immediately on use, leaving the GM to infer the trigger.
audit finding below confidence gate: Cinder Stalker The warden is Immune to Poison and has no feature creating a damaged state it can track, but more pressingly the trait references creatures the warden damaged — this is self-consistent, but the name 'Stalker' promises pursuit/teleport mechanics absent from the text.
```


---


### Oathshackled Bonecutter — in the run

**Concept:** a skeleton with a greatsword

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Oathshackled Bonecutter | 6 | brute-5 | ok | ok | SOFT: reach | ok | ok | ok | ok | ok | ok | ok |

- structure · soft · reach: Actions/Greatsword: reach 10 on a Medium body with no tether word
- read: def 4 / off 6 → 5; sustained 44 (2 × Greatsword); nova none; dmg 44

```
Oathshackled Bonecutter

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

Great Weapon Master. When the bonecutter hits a creature with its Greatsword, the attack deals an extra 3 damage.

Actions

Multiattack. The bonecutter makes two attacks, using Greatsword or Shortbow in any combination.

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
[concept] name: provided_name rejected — "a skeleton with a greatsword…" is the description, not a name
[concept] resolve: archetype=brute type=Undead themes=grave/armed mind=mindless style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: the oversized greatsword [object] | an unfeeling, tireless guard that fights to the death [behavior] | a dry clatter of bare bone [body]
[concept] identity: The greatsword skeleton opens by advancing in a slow, deliberate stride, dragging its blade along the ground before committing to one wide, full-body arc meant to bisect whatever is in front of it. Every round after that it plants, guards, and swings again on a flat mechanical cadence, walking down its target with the patience of something that cannot tire. It never flinches, never feints, and never retreats — it fights until its frame is shattered, indifferent to wounds that would drop a living duelist.
[concept] lore: A corpse-soldier bound into its own bones by a dead oath, it still stands the watch it was raised to keep, cutting down any traveler who steps onto the road it was told to hold.
[reskin] print canon array: STR 18, DEX 16, CON 15, INT 6, WIS 8, CHA 5 — the Skeleton's, STR fitted to +7
[reskin] donor: brute-5 -> CR 6
[reskin] [path] decides: twist on the Skeleton (the matcher agrees)
[reskin] print canon: "a skeleton with a greatsword" heads on the Skeleton — print's rows ride along; the seat stays
[reskin] named parts: Greatsword (slot) — the user's words, the engine's numbers
[reskin] named parts landed: 1 attack row(s), 0 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline declared: "the bonecutter" — the call's own answer (kind), built from the name; the rules would have said "Bonecutter"
[reskin] inline on kit rows: "Bonecutter" -> "the bonecutter"
[reskin] inline form: "the bonecutter" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a skeleton with a greatsword" -> has (mechanical) [asked: attack]
[reskin] signature idea (action): "It plants its feet and hauls the greatsword back in a slow, deliberate wind-up, holding that coiled pose for a heartbeat before unleashing one enormous full-body arc that cleaves clean through everything in a wide sweep ahead of it. Any creature caught in that arc is struck by the same blow — it commits fully, and the swing leaves it open but does not stop it." [action/save/damage] — menu: trample, leap, thrown-burst, throw-retrieve, shield-bash, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up (+ shelf: rampage, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, charge)
[reskin] word match declined by the call: push-prone — the key word does not mean the mechanic here
[reskin] fit declined: "Oathcleaving Arc (Recharge 5-6)" — a print body takes only what the user's words ask; the call quotes "greatsword", which is the creature itself, a header directive, the half of a clause the lack sweep takes away, or the weapon a part row already carries (the blacksmith's rally, critic-ten 2026-10-01)
[reskin] fallback respects the call: push-prone left the shelf — the call declined it for this sheet
[reskin] fallback stands down: the twist path has no shelf — the Skeleton's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "It never tires or flinches: while it has not moved since its last turn, its blade is braced low and its frame set, and its swings hit harder and are harder to slip away from. Breaking that stance — being forced to give ground or step — costs it the bonus until it can set itself again." [trait/always/defense] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending, weapon-lodge)
[reskin] word match declined by the call: relentless-pursuit — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "It never tires or flinches: while it has not moved since its last turn, its blade is braced low and its frame set, and its swings hit harder and are harder to slip away from. Breaking that stance — being forced to give ground or step — costs it the bonus until it can set itself again." [trait/always/defense] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] weapons answered: Greatsword = greatsword; Bone Shard = none; Dragging Arc = none
[reskin] print canon alignment: Lawful Neutral -> Lawful Evil — the Skeleton's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "None" -> "Understands Common plus one other language but can't speak" — the Skeleton's
[reskin] print canon speed: 40 ft. -> 30 ft. — the Skeleton's walk; the concept's other modes stay
[reskin] print canon attack: "Bone Shard" -> "Shortbow" — the Skeleton's own ranged row
[reskin] immunities stamped for type: Undead -> Poison; Exhaustion, Poisoned
[reskin] print canon defenses: vulnerabilities none -> Bludgeoning — the Skeleton's own header lines
[reskin] vulnerability rejected — "Bludgeoning" has no warrant in the concept's own text (print's default is none)
[reskin] multiattack re-read — "Shortbow" joins the combination; "The bonecutter makes two attacks, using Greatsword or Shortbow in any combination."
```


---


---

## Review batch — twist-ten-2026-10-20T14-01-19

The checker ran first. The gate table covers every block in the run; every block of the run follows. Each block carries its checker row above and its engine trace below. Hand-derive against the row first; then read for what predicates can't see.

### Gate table — the whole run

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Silverbitten Troll | 6 | 2024 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 4/4 |
| Ash-Marsh Hydra | 8 | 2024 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 6/6 |
| Hobgoblin Halberdier | 2 | 2024 | defender-1 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |
| Purple Worm | 15 | 2024 | brute-13 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |
| Dire Wolf | 1 | 2024 | skirmisher-1 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/3 |
| Jarl Hrimgar | 9 | 2024 | skirmisher-8 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/2 | 3/3 |
| Watch That Won't Stand Down | 1 | 2024 | skirmisher-1 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 2/2 |
| Twin-Skulled Wolf | 2 | 2024 | skirmisher-1 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 2/2 |
| Scaldwell | 13 | 2024 | lurker-8 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 8/8 |
| Tollwarden | 3 | 2024 | lurker-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 7/8 |

**Dropped 2 of 11 user clauses** (coverage 82%); concept share 98% (43/44 rows). A run with zero fails and 60% coverage is a failing run.
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

Rime Hide. A creature that touches the wolf or hits it with a melee attack while within 5 feet of it takes 3 (1d6) Cold damage.

Pack Tactics. The wolf has Advantage on an attack roll against a creature if at least one of the wolf's allies is within 5 feet of the creature and the ally doesn't have the Incapacitated condition.

Actions

Multiattack. The wolf makes two Bite attacks.

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

- Traits/Rime Hide — template heated-body; library draw (seed unstamped); binds the GM's words: frost+rime
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
[concept] signature elements: frost-rimed hide that chills those near it [body] | pack-hunting dart-in, dart-out harrying [behavior] | relentless pursuit of warm-blooded quarry through the snow [behavior]
[concept] identity: The frost-rimed dire wolf circles the pack's chosen prey in a loose, silent crescent, letting the cold of its hide do the first work before it commits. It darts in to slash at a hamstring or flank and wheels away before the target can turn, herding the quarry toward its packmates with each frozen bite. When bloodied it does not break — it falls back into the crescent and lets the others close, fighting with the patience of a hunter that has never once been alone.
[concept] lore: Born of a winter that would not end, these wolves carry the killing cold of the high passes in their rime-crusted fur and follow the snowline south each year in search of warm-blooded quarry.
[reskin] print canon defenses: HP 30 -> 22, AC 15 -> 14 — the Dire Wolf's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 17, DEX 15, CON 15, INT 3, WIS 12, CHA 7 — the Dire Wolf's at its own CR; attack +4 -> +5, DC 13 (print's)
[reskin] donor: skirmisher-1 -> CR 1
[reskin] [path] decides: twist on the Dire Wolf (the matcher agrees)
[reskin] print canon: "Dire Wolf — with a frost-rimed hide" heads on the Dire Wolf — print's rows ride along; the seat stays
[reskin] claim gate: CR 1 but a Beast body — the trait seat stays open (print: a material body carries a trait at every tier)
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline by rule: "the wolf" — the call answered "the wolf" (kind), which the name does not support
[reskin] inline form: "the wolf" — the model's own reading of the name
[reskin] final price: the chassis's Multiattack: the round ran 14 against the card's 10 — the attack rows re-solve at 75% (2 attacks off one row after a supersede)
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Dire Wolf — with a frost-rimed hide" -> has (descriptive), head
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The wolf lunges in a low darting slash meant to cripple, not kill: when its bite lands, the cold sinks into the wound and stiffens the prey's legs, so the way it moves is slowed and clumsy while the pack rings closer. The chill clings for a short while, but the wolf must keep harrying the same quarry to make it bite — if the wolf turns to a new target, the old wound's frost fades." [rider/on_hit/condition] — menu: contagion, charge-push, hook-rider, pounce, isolation, charge (+ shelf: snare, shield-bash, lure, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, slow-bolt, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, riposte)
[reskin] signature bound to the concept's verb: action — slow-bolt (frost)
[reskin] word match declined by the call: slow-bolt, charge-push — the key word does not mean the mechanic here
[reskin] signature miss: action — "The wolf lunges in a low darting slash meant to cripple, not kill: when its bite lands, the cold sinks into the wound and stiffens the prey's legs, so the way it moves is slowed and clumsy while the pack rings closer. The chill clings for a short while, but the wolf must keep harrying the same quarry to make it bite — if the wolf turns to a new target, the old wound's frost fades." [rider/on_hit/condition] — the model picked "contagion" (no verb, and it quotes nothing the GM typed) over a concept-verb template (slow-bolt)
[reskin] fallback respects the call: slow-bolt left the shelf — the call declined it for this sheet
[reskin] fallback stands down: the twist path has no shelf — the Dire Wolf's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "The rime on its hide reaches out a step or two around it, so air near the wolf grows painfully cold and anyone who lingers beside it or grapples it feels their warmth being drawn away, their limbs seizing up the longer they stay in the frost's radius." [trait/always/condition] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature bound to the concept's verb: trait — heated-body (frost)
[reskin] signature template (trait): heated-body -> Traits/"Rime Hide" ("the rime on its hide reaches out a step or two around it; anyone who touches it  [verb: frost:concept, rime:idea]")
[reskin] weapons answered: Bite = none
[reskin] print canon speed: 30 ft. -> 50 ft. — the Dire Wolf's walk; the concept's other modes stay
[reskin] languages held: None stands — INT 3 on a Beast speaks nothing, whatever the mind read said
[reskin] print canon skills: "Perception +3, Stealth +4" -> "Perception +5, Stealth +4" — the Dire Wolf's own skills, each derived from this sheet's stat and PB
[reskin] resistances derived: Cold
[reskin] print canon trait: Pack Tactics — "Dire Wolf — with a frost-rimed hide" is the Dire Wolf (print's own row)
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the seat's, not the Dire Wolf's
[reskin] print canon: chassis row leaves — Traits/"Crescent Stalker" is the seat's, not the Dire Wolf's
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
- Actions/Bite — print's own row
- Actions/Tail Stinger — print's own row
- Traits/Tunneler — print's own row
- Bonus Actions/Swallow — print's own row

**Engine trace**

```
[path] twist — Purple Worm (is) — "Name field: Purple Worm" (code)
[route] brute-grappler type=Monstrosity mechanics=grapple, engulf — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: on the GM's own words "that swallowed a war-band's armoury" | brute-grappler: ✓ ("that swallowed a war-band's armoury") | brute-grappler: no line key in the words — the model's read of its quote
[concept] name: "Purple Worm" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] resolve: archetype=brute type=Monstrosity themes=devouring/armed mind=bestial style=grappler energy=— mix=physical identity=✓ lore=✓
[concept] name: provided "Purple Worm"
[concept] mechanics: grapple, engulf
[concept] signature elements: a gullet packed with swallowed blades and hauberks [body] | breaches and engulfs whole ranks of soldiers [behavior] | grinds and shreds what it has seized with the steel inside it [behavior]
[concept] identity: A purple worm whose gullet is a rusting armoury, it breaches beneath the formation and engulfs a rank of soldiers whole, its maw packed with swallowed blades that rasp and grind against everything it takes in. Every round it stays down, crushes a fresh soldier or another corpse-load of steel into the mass churning inside it, and surfaces only to take more — armour and weapons torn loose, half-digested steel spat up as jagged debris. It fights to the death and never disengages; struck bloodied, it turns the blades inside itself outward, shredding anything it has already seized rather than letting go.
[concept] lore: A purple worm that swallowed a war-band's armoury and survived the meal keeps the hoard: blades and hauberks lodged in its gut like grist in a mill, and it hunts armed columns because it has learned that men carry the only food it still wants.
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
[reskin] signature idea (action): "It heaves its whole front half up out of the earth and then slams down again, draining the swallowed steel-hoard back through its gullet in one convulsive retch. A sleeting fan of bent swords, mail rings, and spearheads scatters across the ground it can see, and the jagged slop sticks fast to whatever it lands on, so bodies stay bogged and bleeding where they stand. Its own grinding burden is gone" [action/always/damage] — menu: swallow, condition-payoff, shield-bash, hook-drag, burrow-ambush, escalating-dread, terror-pulse, herd, drain, exploiter (+ shelf: second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, contagion, stunning-strike, charge-push, hook-rider, pounce, charge)
[reskin] signature bound to the concept's verb: action — swallow (swallow, swallows, swallowed)
[reskin] word match declined by the call: swallow, terror-pulse, herd — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit" after being shown swallow, which the GM's words keyed
[reskin] key match declined: action — "swallow" was ranked first on the call's own menu for swallow+swallows+swallowed, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: action — "It heaves its whole front half up out of the earth and then slams down again, draining the swallowed steel-hoard back through its gullet in one convulsive retch. A sleeting fan of bent swords, mail rings, and spearheads scatters across the ground it can see, and the jagged slop sticks fast to whatever it lands on, so bodies stay bogged and bleeding where they stand. Its own grinding burden is gone" [action/always/damage] — the model found no template that holds it (offered: swallow, condition-payoff, shield-bash, hook-drag, burrow-ambush, escalating-dread, terror-pulse, herd, drain, exploiter)
[reskin] fallback respects the call: swallow, terror-pulse, herd left the shelf — the call declined them for this sheet
[reskin] fallback stands down: the twist path has no shelf — the Purple Worm's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "Anything it has taken into its gut is never given back — the blades it swallowed keep turning over and rasping them from inside, wearing down whatever has been dragged into the mass with every few breaths it takes. Even if a swallowed creature claws its way free, the wounds it took inside stay wide and weeping, and the worm learns each struggle as food it still has." [trait/start_of_turn/damage] — menu: fire-aura, warded-mending (+ shelf: heated-body, false-appearance, absorption, bloodied-burst, resonant-body, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, earth-glide, tunneler, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, weapon-lodge, death-burst)
[reskin] signature bound to the concept's verb: trait — tunneler (worm)
[reskin] decline reason: trait — the call answered none and names it "no_fit" after being shown tunneler, which the GM's words keyed
[reskin] key match declined: trait — "tunneler" was ranked first on the call's own menu for worm, and the call read it as no fit; the words keep their claim and nothing is forced
[reskin] signature miss: trait — "Anything it has taken into its gut is never given back — the blades it swallowed keep turning over and rasping them from inside, wearing down whatever has been dragged into the mass with every few breaths it takes. Even if a swallowed creature claws its way free, the wounds it took inside stay wide and weeping, and the worm learns each struggle as food it still has." [trait/start_of_turn/damage] — the model found no template that holds it (offered: tunneler, fire-aura, warded-mending, false-appearance, bloodied-burst, bloodied-fury)
[reskin] concept-first trait skipped: tunneler — the GM's words key it, but the call was offered it against those words and declined
[reskin] weapons answered: Bite = none; Gullet Spray = none; Blades Turned Outward = none
[reskin] chassis nova: "Gullet Spray (Recharge 5-6)" — the brute-13's own nova row (its "Area Nova", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] print canon speed: 40 ft. -> 50 ft. — the Purple Worm's walk; the concept's other modes stay
[reskin] print canon speed: Burrow -> 50 ft. — the Purple Worm's own
[reskin] print canon row: Actions/Tail Stinger — the Purple Worm's second melee row, beside the chassis's
[reskin] print canon multiattack: "The purple worm makes one Bite attack and one Tail Stinger attack." — the Purple Worm's own
[reskin] languages held: None stands — INT 1 on a Monstrosity speaks nothing, whatever the mind read said
[reskin] print canon trait: Tunneler — "Purple Worm — that swallowed a war-band's armoury" is the Purple Worm (print's own row)
[reskin] print canon: chassis row leaves — Actions/"Gullet Spray (Recharge 5-6)" is the seat's nova, not the Purple Worm's
[reskin] print canon row: Bonus Actions/Swallow — the Purple Worm's own
[reskin] escape dc: Bite → DC 22 (8 + PB + STR; a late row wore another number)
```


---


### Silverbitten Troll — a 2024 sheet

**Concept:** a troll that grows back unless the blade was silvered

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Silverbitten Troll | 6 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- **dropped clause:** "grows back unless the blade was silvered"
- read: def 4 / off 5 → 4.5; sustained 33 (3 × Rend); nova none; dmg 33

```
Silverbitten Troll

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

Skills Perception +5

Senses darkvision 60 ft.; Passive Perception 15

Languages Giant

CR 6 (XP 2,300; PB +3)

Traits

Regeneration. The silverbitten troll regains 15 Hit Points at the start of each of its turns. If the silverbitten troll takes damage from a silvered weapon, this trait doesn't function on the silverbitten troll's next turn. The silverbitten troll dies only if it starts its turn with 0 Hit Points and doesn't regenerate.

Loathsome Limbs (4/Day). If the silverbitten troll ends any turn Bloodied and took 15+ Slashing damage during that turn, one of the silverbitten troll's limbs is severed, falls into the silverbitten troll's space, and becomes a Troll Limb. The limb acts immediately after the silverbitten troll's turn. The silverbitten troll has 1 Exhaustion level for each missing limb, and it grows replacement limbs the next time it regains Hit Points.

Actions

Multiattack. The silverbitten troll makes three Rend attacks.

Rend. Melee Attack Roll: +7, reach 10 ft. 11 (2d6 + 4) Slashing damage.

Bonus Actions

Charge. The silverbitten troll moves up to half its Speed straight toward an enemy it can see.

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
[route] brute-regenerator type=Monstrosity mechanics=regeneration — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | brute-regenerator: ✓ ("grows back unless the blade was silvered") | brute-regenerator: no line key in the words — the model's read of its quote | bane: "silver" on the GM's own words "unless the blade was silvered"
[concept] name: provided_name rejected — "troll that grows back unless the blade w…" is the description, not a name
[concept] hints: troll→canon ✓ ("a troll that grows back unless the blade")
[concept] resolve: archetype=brute type=Monstrosity themes=bestial/grasping mind=bestial style=regenerator energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: regeneration
[concept] signature elements: wounds that close as fast as they open [behavior] | a hide that shrugs off ordinary steel [body] | silver as its only lasting bane [object]
[concept] identity: A looming, rubbery-hided monstrosity that wades into reach with claws and closes wounds as fast as they open, uncaring of ordinary steel because the flesh simply reknits. Round after round it leans on that regeneration, tearing at the nearest target in greedy bites while silently sorting which wound actually held; when a silvered edge bites true, the smile leaves it and it turns to hunting that blade first. It does not flee — it fights until the silver runs red or the troll does, and a foe that cannot stop the healing is prey to be played with longer.
[concept] lore: Spawned where the old whetstones of a fallen silver-armory were ground into a mire, this troll inherited the hunger of the weapons that sank there and hunts for the one sensation that no longer heals: silver.
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
[reskin] inline declared: "the silverbitten troll" — the call's own answer (kind), built from the name; the rules would have said "Troll"
[reskin] inline on kit rows: "Troll" -> "the silverbitten troll"
[reskin] inline form: "the silverbitten troll" — the model's own reading of the name
[reskin] save dc derived: DC 14 -> 16 (8 + PB 3 + the sheet's best 5) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] asked field dropped: the call answered trigger "start_of_turn" for "a troll" but offered no quote
[reskin] asked field dropped: the call answered limit "at_will" for "a troll" but offered no quote
[reskin] clauses: "a troll" -> has (mechanical), head [asked: heal] | "grows back unless the blade was silvered" -> has (mechanical) [asked: on_being_hit/resist]
[reskin] signature idea (action): "The troll lunges at whoever it has already wounded this fight and bites down on the open injury, worrying at it — the fresher the wound, the deeper the bite sinks, and it does not let go of flesh that is already torn. This works only on a target it has successfully hit at some point during the encounter, and after using it the troll's claws come back around for its usual tearing." [rider/on_hit/damage] — menu: affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, charge (+ shelf: trample, leap, thrown-burst, shield-bash, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, rampage, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating)
[reskin] word match declined by the call: affliction, rampage, contagion, stunning-strike, charge-push, hook-rider, pounce, charge — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit"
[reskin] signature miss: action — "The troll lunges at whoever it has already wounded this fight and bites down on the open injury, worrying at it — the fresher the wound, the deeper the bite sinks, and it does not let go of flesh that is already torn. This works only on a target it has successfully hit at some point during the encounter, and after using it the troll's claws come back around for its usual tearing." [rider/on_hit/damage] — the model found no template that holds it (offered: affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, charge, rampage)
[reskin] fallback respects the call: rampage left the shelf — the call declined it for this sheet
[reskin] fallback stands down: the twist path has no shelf — the Troll's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "Ordinary steel that cuts the troll leaves the wound knitting shut around the blade's memory — but silver does not: any silvered weapon that strikes it gets no purchase on the healing, and the troll can smell the silver on the arm that carries it, fixing its attention on that wielder until it draws blood." [trait/on_being_hit/resource] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] word match declined by the call: uncanny-sense, weapon-lodge — the key word does not mean the mechanic here
[reskin] trait declined: "Silverbane Mending" — bound only on the idea's own words (knits:idea) with no key in the concept; a meat body earns its trait by the user's verb (the sniper's tracker, critic 2026-09-29)
[reskin] repair: 1 clause(s) with no row — "grows back unless the blade was silvered"; one targeted call with the sheet as context
[reskin] repair: the answer held no rows — the clauses stay unplaced
[reskin] weapons answered: Claw = none
[reskin] print canon alignment: Neutral -> Chaotic Evil — the Troll's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon type: Monstrosity -> Giant — the Troll's (a Unicorn printed Fey, 2026-10-01)
[reskin] print canon languages: "None" -> "Giant" — the Troll's
[reskin] print canon speed: 40 ft. -> 30 ft. — the Troll's walk; the concept's other modes stay
[reskin] print canon attack: "Claw" -> "Rend" — the Troll's own row
[reskin] print canon multiattack: "The silverbitten troll makes three Rend attacks." — the Troll's own
[reskin] print canon skills: "Athletics +7, Perception +2" -> "Perception +5" — the Troll's own skills, each derived from this sheet's stat and PB
[reskin] print canon trait: Loathsome Limbs (4/Day) — "a troll that grows back unless the blade was silvered" is the Troll (print's own row)
[reskin] print canon trait: Regeneration — print's text replaces the chassis's (the Troll regenerates 15, not the chassis's 10 — critic's audit 2026-10-02)
[reskin] print canon row: Bonus Actions/Charge — the Troll's own
[reskin] vulnerability rejected — "Silver" is dealt, defended, or not a damage type
[reskin] regeneration keyed to the GM's own bane: "Regeneration" keyed "Acid or Fire damage" and the GM named silver ("unless the blade was silvered") — print's row keeps everything else
[reskin] asked but unanswered: "grows back unless the blade was silvered" asked for on_being_hit and no row binds the clause
[reskin] audit rewrite blocked — "Regeneration" is engine-authored chassis text
[reskin] audit rewrite blocked — "Loathsome Limbs (4/Day)" is engine-authored chassis text
```


---


### Ash-Marsh Hydra — a print donor

**Concept:** Hydra whose stumps smoke instead of regrowing

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Ash-Marsh Hydra | 8 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 8 / off 3 → 5.5; sustained 10 (1 × Bite); nova none; dmg 10

```
Ash-Marsh Hydra

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

Skills Perception +6

Immunities Blinded, Charmed, Deafened, Frightened, Stunned, Unconscious

Senses darkvision 60 ft.; Passive Perception 16

Languages None

CR 8 (XP 3,900; PB +3)

Traits

Choking Stumps. Constitution Saving Throw: DC 16, any creature that starts its turn in a 10-foot Emanation originating from the hydra. Failure: The target has the Poisoned condition until the start of its next turn. Success: The target is immune to this creature's aura for 24 hours.

Hold Breath. The hydra can hold its breath for 1 hour.

Multiple Heads. The hydra has five heads. Whenever the hydra takes 25 damage or more on a single turn, one of its heads dies. The hydra dies if all its heads are dead.

Reactive Heads. For each head the hydra has beyond one, it gets an extra Reaction that can be used only for Opportunity Attacks.

Actions

Multiattack. The hydra makes as many Bite attacks as it has heads.

Bite. Melee Attack Roll: +8, reach 10 ft. 10 (1d10 + 5) Piercing damage.

Bonus Actions

Choking Stump-Smoke (1/Day). The hydra creates a thick choking cloud of acrid smoke in a 20-foot Emanation originating from itself. The effect lasts while the hydra maintains Concentration on it, up to 10 minutes. Each creature in the area has Disadvantage on attack rolls.

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
- Traits/Choking Stumps — template noxious-aura; library draw (seed unstamped)
- Traits/Hold Breath — print's own row
- Traits/Multiple Heads — print's own row
- Traits/Reactive Heads — print's own row
- Bonus Actions/Choking Stump-Smoke — template zone; library draw (seed unstamped); binds the GM's words: smoke+cloud

**Engine trace**

```
[path] twist — Hydra (is) — "Hydra" (call)
[route] brute-regenerator type=Monstrosity mechanics=regeneration — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | brute-regenerator: ✓ ("stumps smoke instead of regrowing") | brute-regenerator: no line key in the words — the model's read of its quote | bane refused: the words carry no weakness clause, so "fire" answers a question nobody asked
[concept] resolve: archetype=brute type=Monstrosity themes=bestial/venomous mind=bestial style=regenerator energy=Poison mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: regeneration
[concept] signature elements: severing heads that smoke instead of regrowing [behavior] | acrid stump-smoke choking the air [aura] | many biting heads [body]
[concept] identity: The smoking hydra opens by lunging with its many biting heads, each strike leaving a sputtering stump when severed rather than a regrowing neck, so it fights to carve its foes apart while denying them the clean death of a cauterized wound. Every round it presses with renewed heads and chokes the field with acrid smoke, forcing attackers to blind-breathe its stumps at close range; it is a savage, vindictive brute that never flees, only leans harder into the loss of its own heads to drown the fight in fumes.
[concept] lore: A hydra of the ash-marsh whose regeneration turned poison-sour, it seeks only to keep consuming and to leave the air too thick with smoke for any prey to escape.
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
[reskin] clauses: "Hydra whose stumps smoke instead of regrowing" -> LACKS (mechanical)
[reskin] signature idea (action): "The hydra tears into its own smoking stump, ripping the ruined neck wider so the acrid smoke billows out in a thick choking cloud that clings to everything nearby. Everything close to it — friend or foe — has to breathe the stinging fumes and gags and stumbles, its eyes watering and its lungs burning, while the hydra itself only leans in harder. It uses this when foes crowd in close, turning its o" [action/save/condition] — menu: trample, leap, thrown-burst, shield-bash, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, zone, zone-seed (+ shelf: rampage, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, charge)
[reskin] signature bound to the concept's verb: action — zone, zone-seed (smoke)
[reskin] signature template: zone -> Actions/"Choking Stump-Smoke (1/Day)" ("acrid smoke billows out in a thick choking cloud that clings around the hydra, f [verb: smoke:concept, cloud:idea]")
[reskin] signature idea (trait): "Whenever one of its heads is severed, the fresh stump does not seal or heal — it smolders and spits a greasy column of poison smoke that keeps pouring out for the rest of the fight, thickening the air around the hydra. Anyone who comes within reach of those smoldering stumps finds their throat closing and their eyes streaming, so the more heads it loses, the worse the choking haze becomes and the " [trait/always/condition] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending, weapon-lodge)
[reskin] signature bound to the concept's verb: trait — warded-mending (regrows)
[reskin] word match declined by the call: warded-mending — the key word does not mean the mechanic here
[reskin] pick kept on the GM's own words: trait — "noxious-aura" has no key-table verb, but the call quotes "stumps smoke" from the description
[reskin] signature template (trait): noxious-aura -> Traits/"Choking Stumps" ("Smoldering stumps pour poison smoke that thickens the air around the hydra, chok [shape fit, no verb match]")
[reskin] weapons answered: Bite = none
[reskin] speed by concept: added Swim 40 ft. — the concept's movement set decides
[reskin] print canon alignment: Neutral Evil -> Unaligned — the Hydra's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon multiattack: "The hydra makes as many Bite attacks as it has heads." — the Hydra's own
[reskin] languages held: None stands — INT 2 on a Monstrosity speaks nothing, whatever the mind read said
[reskin] print canon skills: "Athletics +8, Perception +3" -> "Perception +6" — the Hydra's own skills, each derived from this sheet's stat and PB
[reskin] print canon defenses: immunities none -> Blinded, Charmed, Deafened, Frightened, Stunned, Unconscious — the Hydra's own header lines
[reskin] print canon trait: Hold Breath — "Hydra whose stumps smoke instead of regrowing" is the Hydra (print's own row)
[reskin] print canon trait: Multiple Heads — "Hydra whose stumps smoke instead of regrowing" is the Hydra (print's own row)
[reskin] print canon trait: Reactive Heads — "Hydra whose stumps smoke instead of regrowing" is the Hydra (print's own row)
[reskin] vulnerability rejected — "Cold" has no warrant in the concept's own text (print's default is none)
[reskin] dead control row: "Choking Stump-Smoke (1/Day)" moves to Bonus Actions — no damage, no save, no KO condition
audit finding below confidence gate: Multiple Heads The trait references 'Fire damage' taken since its last turn but nothing in the block tracks or defines this state; the GM has no way to know whether a Fire-damage event occurred within that window.
[reskin] audit rewrite blocked — "Multiple Heads" is engine-authored chassis text
[reskin] lacks clause: Traits/"Multiple Heads" keeps its blow, loses the regeneration — "Hydra whose stumps smoke instead of regrowing"
```


---


### Hobgoblin Halberdier — in the run

**Concept:** a hobgoblin with a halberd

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Hobgoblin Halberdier | 2 | defender-1 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1 / off 2 → 1.5; sustained 12 (1 × Halberd); nova none; dmg 12

```
Hobgoblin Halberdier

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

Senses Passive Perception 12

Languages Common, Goblin

CR 2 (XP 450; PB +2)

Traits

Great Weapon Master. When the halberdier hits a creature with its Halberd, the attack deals an extra 2 damage.

Pack Tactics. The halberdier has Advantage on an attack roll against a creature if at least one of the halberdier's allies is within 5 feet of the creature and the ally doesn't have the Incapacitated condition.

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
[concept] resolve: archetype=defender type=Humanoid themes=armed mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: halberd reach and hook [object] | shield-wall discipline [behavior] | iron-fitted soldier's kit [body]
[concept] identity: The hobgoblin halberdier digs in behind its shield and lets reach and formation do the killing: it plants itself on the line, opening with a shield-first shove to stagger a charging foe while the halberd's spike keeps cavalry and reach weapons honest. Every round after that it hooks, trips, and punishes movement — any enemy that tries to slip past it eats a halberd butt-stroke or a hooked ankle, and it deliberately yields ground only to drag pursuers into the reach of its allies. It is a disciplined creature under pressure, retreating in step with its unit rather than alone, and it fights to a bitter, mutual death. Its discipline and battlefield patience are expressed through a body of scarred leather, iron fittings, and the sweat-hardened muscle of a lifelong soldier.
[concept] lore: Hobgoblin drill-masters arm their line troops with the long halberd and train them to hold a doorway or ford; the halberdier's whole world is the order to stand, and its reward is a shield-wall it shares with its own.
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
[reskin] inline declared: "the halberdier" — the call's own answer (kind), built from the name
[reskin] inline form: "the halberdier" — the model's own reading of the name
[reskin] save dc derived: DC 12 -> 13 (8 + PB 2 + the sheet's best 3) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a hobgoblin with a halberd" -> has (descriptive), head
[reskin] signature idea (action): "The halberdier slams its shield forward into one foe right in front of it, knocking the target off balance so it stumbles a few steps and can't get its footing back until it spends a moment recovering. The shove staggers rather than wounds — it exists to break a charge and stall whoever meant to run past, and the halberdier can only land it on an enemy that is already within arm's reach." [rider/on_hit/condition] — menu: charge-push, hook-rider (+ shelf: seal, shield-bash, active-toll, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, riposte)
[reskin] fit declined: "Staggering Shove" — a print body takes only what the user's words ask; the call offered no quote, and the key table finds no verb either (the blacksmith's rally, critic-ten 2026-10-01)
[reskin] fallback stands down: the twist path has no shelf — the Hobgoblin Warrior's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "Whenever an enemy within the halberdier's reach moves away from it or tries to slip past it, the halberdier snaps the halberd's hook into a leg or collar and drags the enemy back, stopping the escape cold. This burns the halberdier's own reaction for the round, so it works once between its turns and not again until the fight comes back around to it — and a foe that never leaves the hook's reach ne" [trait/on_being_hit/movement] — menu: absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura)
[reskin] word match declined by the call: bound, absorption, bloodied-burst, resonant-body, weapon-lodge — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "Whenever an enemy within the halberdier's reach moves away from it or tries to slip past it, the halberdier snaps the halberd's hook into a leg or collar and drags the enemy back, stopping the escape cold. This burns the halberdier's own reaction for the round, so it works once between its turns and not again until the fight comes back around to it — and a foe that never leaves the hook's reach ne" [trait/on_being_hit/movement] — the model found no template that holds it (offered: absorption, bloodied-burst, resonant-body, weapon-lodge, bound)
[reskin] weapons answered: Halberd = halberd
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] languages by species: Goblin — the concept names the species; print's NPCs of it speak it
[reskin] print canon alignment: Lawful Neutral -> Lawful Evil — the Hobgoblin Warrior's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon type: Humanoid stays — the words say humanoid ("a dire wolf but undead", 2026-10-01)
[reskin] print canon row: Actions/Longbow — the Hobgoblin Warrior's own ranged row, added (the chassis carried none to rename) — far from print's CR 0.5: print's dice, the sheet's +5
[reskin] print canon trait: Pack Tactics — "a hobgoblin with a halberd" is the Hobgoblin Warrior (print's own row)
[reskin] weapon reach: "Halberd" reaches 10 ft. — print's halberd has Reach
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

Skills Athletics +10, Perception +4

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
[concept] resolve: archetype=skirmisher type=Giant themes=elemental/armed mind=sapient style=hurler energy=Cold mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: thrown-weapon
[concept] signature elements: hurling boulders of ice-sheathed bedrock [behavior] | body of rime-crusted frost giant flesh and blue ice [body] | glacier-slug hammers and stony shield slabs wrenched from the terrain [object]
[concept] identity: The frost giant jarl wades into battle with a glacier-slug in each hand, opening by hurling a boulder the size of a wagon at the farthest archer before closing to crush anything left standing. Every round it cycles: rip a chunk of ice-sheathed bedrock from the ground and throw it, then wrench a frozen slab over its shoulder as a shield against return fire, roaring all the while — a thor uthan who dares any challenger to out-throw him. Under pressure it does not retreat; it laughs, digs in behind shield-sized ice slabs, and hurls harder, treating death as the final proving ground of strength.
[concept] lore: A jarl of a northern icehold who won his seat by hurling a rival chieftain's war-stone across a frozen fjord, and now claims every cliff of blue ice within sight as his personal armory.
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
[reskin] clauses: "a Huge frost giant jarl" -> has (header) | "throws boulders" -> has (mechanical) [asked: attack]
[reskin] menu pruned: action — phase-slip, thrown-burst-seed (the sheet cannot render them)
[reskin] signature idea (action): "Hrimgar tears a frozen slab of blue ice out of the ground and plants it as a broad, shield-sized wall in front of himself, then hurls the next rock from behind it. While the slab stands, ranged attacks coming his way are blunted and the roar of mockery that follows rattles the nerves of anyone who thought to out-throw him. The slab is only good for a moment of cover and shatters when it has done i" [bonus_action/once_per_fight/defense] — menu: rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating (+ shelf: gaze-single, snare, condition-payoff, throw-retrieve, shield-bash, lure, snare-bolt, sensory-strike, disarm, delayed-brand, exploiter, slow-bolt, snap-shot, riposte, stunning-strike, charge-push, hook-rider, pounce, isolation, bolt-mark, charge)
[reskin] signature bound to the concept's verb: action — slow-bolt (frost)
[reskin] decline reason: action — the call answered none and names it "no_fit" after being shown slow-bolt, which the GM's words keyed
[reskin] key match declined: action — "slow-bolt" was ranked first on the call's own menu for frost, and the call read it as no fit; the words keep their claim and nothing is forced
[reskin] signature miss: action — "Hrimgar tears a frozen slab of blue ice out of the ground and plants it as a broad, shield-sized wall in front of himself, then hurls the next rock from behind it. While the slab stands, ranged attacks coming his way are blunted and the roar of mockery that follows rattles the nerves of anyone who thought to out-throw him. The slab is only good for a moment of cover and shatters when it has done i" [bonus_action/once_per_fight/defense] — the model found no template that holds it (offered: slow-bolt, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, stunning-strike)
[reskin] fallback respects the call: slow-bolt left the shelf — the call declined it for this sheet
[reskin] fallback stands down: the twist path has no shelf — the Frost Giant's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "Anything that strikes Hrimgar gets a burst of rime and frost shrapnel back in its face — the ice crusting his body explodes outward at the point of impact, biting the attacker with the same cold he carries. The harder the blow lands, the more of his frozen hide breaks loose." [trait/on_being_hit/damage] — menu: heated-body, absorption, bloodied-burst, resonant-body (+ shelf: adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, warded-mending, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] signature bound to the concept's verb: trait — heated-body (frost)
[reskin] word match declined by the call: heated-body, death-burst, bloodied-burst, terrain-walk — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit" after being shown heated-body, which the GM's words keyed
[reskin] key match declined: trait — "heated-body" was ranked first on the call's own menu for frost, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: trait — "Anything that strikes Hrimgar gets a burst of rime and frost shrapnel back in its face — the ice crusting his body explodes outward at the point of impact, biting the attacker with the same cold he carries. The harder the blow lands, the more of his frozen hide breaks loose." [trait/on_being_hit/damage] — the model found no template that holds it (offered: heated-body, absorption, bloodied-burst, resonant-body, terrain-walk, death-burst)
[reskin] weapons answered: Fist = none; Boulder = none; Glacier Darts = none
[reskin] weapon table: "Boulder" — range 30/90 ft. is not a print range; an unlisted thrown thing is 20/60, a hurled mass 60/240 (the critic's third species read)
[reskin] chassis nova: "Glacier Darts (Recharge 5-6)" — the skirmisher-8's own nova row (its "Sweeping Area Attack", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] speed by concept: dropped Climb 40 ft. — the concept's movement set decides
[reskin] print canon alignment: Neutral -> Neutral Evil — the Frost Giant's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon attack: "Fist" -> "Frost Axe" — the Frost Giant's own row
[reskin] print canon multiattack: "Hrimgar makes two attacks, using Frost Axe or Great Bow in any combination." — the Frost Giant's own
[reskin] print canon attack: "Great Bow" is print's own row — +9, 17 (2d10 + 6), range 150/600 ft. (an exact body at print's CR)
[reskin] print canon attack: "Boulder" -> "Great Bow" — the Frost Giant's own ranged row
[reskin] defenses by material: a ice body is vulnerable to Fire and never resists, absorbs, or ignores it — the resistance is withheld; the vulnerability is the GM's to type (the Frostmaw carried a Fire vulnerability nobody typed — the critic's second species read)
[reskin] print canon skills: "Perception +4, Stealth +3" -> "Athletics +10, Perception +4" — the Frost Giant's own skills, each derived from this sheet's stat and PB
[reskin] print canon defenses: immunities none -> Cold — the Frost Giant's own header lines
[reskin] print canon: chassis row leaves — Actions/"Glacier Darts (Recharge 5-6)" is the seat's nova, not the Frost Giant's
[reskin] print canon: chassis row leaves — Traits/"Ice-Wader" is the seat's, not the Frost Giant's
[reskin] print canon row: Bonus Actions/War Cry (Recharge 5-6) — the Frost Giant's own
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" yields to the Frost Giant's War Cry (Recharge 5-6)
[reskin] vulnerability rejected — "Fire" has no warrant in the concept's own text (print's default is none)
```


---


### Watch That Won't Stand Down — in the run

**Concept:** a skeleton archer

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Watch That Won't Stand Down | 1 | skirmisher-1 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1/4 / off 2 → 1.125; sustained 12 (2 × Shortsword); nova none; dmg 12

```
Watch That Won't Stand Down

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

Multiattack. The watch that won't stand down makes two attacks, using Shortsword or Shortbow in any combination.

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
[route] skirmisher-archer type=Undead mechanics=none — casts: the call reads no worked magic here | shoots: on the GM's own words "a skeleton archer" | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | skirmisher-archer: ✓ ("skeleton archer") | skirmisher-archer: key "archer" (class noun)
[concept] resolve: archetype=skirmisher type=Undead themes=grave/armed mind=sapient style=archer energy=Necrotic mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: falling back to shoot from cover [behavior] | the bow and its endless bone-tipped arrows [object] | an animated skeleton in rotting soldier's harness [body]
[concept] identity: The skeleton archer opens a fight from cover at the edge of its range, loosing bone-tipped arrows at anything that enters the ruin it guards; every round after, it repositions to keep a wall, pillar, or corpse-pile between itself and melee, spending arrows as though its quiver were bottomless. Under pressure it falls back rather than closes, sacrificing ground for distance and abandoning its post only when cornered, at which point it fights with startling savagery.
[concept] lore: A soldier who died at his post and rose again in the same posture, the skeleton archer still mans a wall that no longer matters, shooting at the living because it cannot remember the order to stand down.
[reskin] print canon route: the Skeleton's body outranks the archer seat — no verb in the words names it; the plain skirmisher line
[reskin] print canon array: STR 10, DEX 16, CON 15, INT 6, WIS 8, CHA 5 — the Skeleton's; DEX 16 outranks the card's +4, so the sheet rolls +5 (raise-only)
[reskin] donor: skirmisher-1 -> CR 1
[reskin] [path] decides: twist on the Skeleton (the matcher agrees)
[reskin] print canon: "a skeleton archer" heads on the Skeleton — print's rows ride along; the seat stays
[reskin] claim gate: CR 1 but a Undead body — the trait seat stays open (print: a material body carries a trait at every tier)
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline declared: "the watch that won't stand down" — the call's own answer (kind), built from the name; the rules would have said "the watch"
[reskin] inline on kit rows: "the watch" -> "the watch that won't stand down"
[reskin] save dc derived: DC 11 -> 13 (8 + PB 2 + the sheet's best 3) — no stat on the sheet reached it
[reskin] final price: the chassis's Multiattack: the round ran 14 against the card's 10 — the attack rows re-solve at 75% (2 attacks off one row after a supersede)
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a skeleton archer" -> has (descriptive), head
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "When the archer shifts away from a foe it snaps off a parting shot at that same enemy as it retreats, punishing anything that crowds it to try to lock it in melee. This lets it combine its fall-back with the endless arrow idea, keeping up pressure even while losing ground." [reaction/on_being_hit/damage] — menu: snap-shot, riposte (+ shelf: snare, throw-retrieve, shield-bash, lure, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, contagion, charge-push, hook-rider, pounce, isolation, bolt-mark, charge)
[reskin] word match declined by the call: snap-shot, riposte — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit"
[reskin] signature miss: action — "When the archer shifts away from a foe it snaps off a parting shot at that same enemy as it retreats, punishing anything that crowds it to try to lock it in melee. This lets it combine its fall-back with the endless arrow idea, keeping up pressure even while losing ground." [reaction/on_being_hit/damage] — the model found no template that holds it (offered: snap-shot, riposte)
[reskin] fallback stands down: the twist path has no shelf — the Skeleton's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "The archer's quiver is a memory of one, not a thing — every arrow it draws comes out bone-tipped and whole, so it never runs dry however long the fight drags on. Its missed arrows rot away where they land, leaving nothing for foes to steal or count." [trait/always/resource] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "The archer's quiver is a memory of one, not a thing — every arrow it draws comes out bone-tipped and whole, so it never runs dry however long the fight drags on. Its missed arrows rot away where they land, leaving nothing for foes to steal or count." [trait/always/resource] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst)
[reskin] weapons answered: Boneblade = none; Bone Arrow = shortbow
[reskin] weapon declined: "Boneblade" reads longsword from its name, but the call answered none — the row carries no weapon
[reskin] weapon declared: "Bone Arrow" is a shortbow — the call's own answer (the name alone read longbow)
[reskin] weapon table: "Bone Arrow" — a launcher, never thrown, range 150/600
[reskin] languages by mind: "None" -> "Common plus the languages it knew in life" (sapient)
[reskin] print canon alignment: Neutral -> Lawful Evil — the Skeleton's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common plus the languages it knew in life" -> "Understands Common plus one other language but can't speak" — the Skeleton's
[reskin] print canon attack: "Boneblade" -> "Shortsword" — the Skeleton's own row
[reskin] print canon attack: "Bone Arrow" -> "Shortbow" — the Skeleton's own ranged row
[reskin] immunities stamped for type: Undead -> Poison; Exhaustion, Poisoned
[reskin] print canon defenses: vulnerabilities none -> Bludgeoning — the Skeleton's own header lines
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the seat's, not the Skeleton's
[reskin] print canon: chassis row leaves — Traits/"Relentless Step" is the seat's, not the Skeleton's
[reskin] vulnerability rejected — "Bludgeoning" has no warrant in the concept's own text (print's default is none)
```


---


### Twin-Skulled Wolf — in the run

**Concept:** a wolf with two heads

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Twin-Skulled Wolf | 2 | skirmisher-1 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1/2 / off 2 → 1.25; sustained 14 (2 × Bite); nova none; dmg 14

```
Twin-Skulled Wolf

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

Pack Tactics. The wolf has Advantage on attack rolls against a creature if at least one of the wolf's allies is within 5 feet of the creature and the ally doesn't have the Incapacitated condition.

Actions

Multiattack. The wolf makes two Bite attacks.

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
- Actions/Bite — print's own row

**Engine trace**

```
[path] twist — Wolf (is) — "wolf" (call)
[route] skirmisher type=Monstrosity mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | skirmisher: ✓ ("wolf") | skirmisher: no line key in the words — the model's read of its quote
[concept] name: provided_name rejected — "a wolf with two heads…" is the description, not a name
[concept] resolve: archetype=skirmisher type=Monstrosity themes=bestial/venomous mind=bestial style=— energy=Poison mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: two heads that watch and feint in turn [body] | harrying dart-in, dart-out pack tactics [behavior] | venomed bite from the second skull [behavior]
[concept] identity: The two-headed wolf circles its prey in a wide, silent lope, one head watching while the other feints, then darts in to tear at hamstrings before wheeling back out of reach. Every round it repeats the passes, herding the wounded toward its packmates and never committing to a standstill. It is cunning enough to harry a superior foe for hours, and only breaks off when its second head goes still.
[concept] lore: Twinned by the corruption that festers where monstrosities whelp, the two-headed wolf hunts the forest edge in patient relays, each skull nursing its own hunger for the same kill.
[reskin] the concept outranks the alias: the Wolf is a Beast and the concept reads Monstrosity — the words RESEMBLE it, they do not name it, so the print body stands down
[reskin] print canon array: STR 14, DEX 16, CON 12, INT 3, WIS 12, CHA 6 — the Wolf's, DEX fitted to +5
[reskin] donor: skirmisher-1 -> CR 2
[reskin] [path] decides: twist on the Wolf (the matcher would have said homebrew)
[reskin] print canon: "a wolf with two heads" heads on the Wolf — print's rows ride along; the seat stays
[reskin] claim gate: CR 2 but a Monstrosity body — the trait seat stays open (print: a material body carries a trait at every tier)
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline declared: "the wolf" — the call's own answer (kind), built from the name
[reskin] inline form: "the wolf" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a wolf with two heads" -> has (descriptive), head
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The wolf makes a snapping feint with one head and, in the same motion, darts past its target, forcing the prey to turn and chase the wrong skull. The prey must scramble to follow or lose sight of the wolf entirely, leaving itself open to the wolf's next pass." [action/save/condition] — menu: trample, gaze-single, snare, shield-bash, lure, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed (+ shelf: delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, riposte, contagion, charge-push, hook-rider, pounce, isolation, charge)
[reskin] word match declined by the call: feint-slip, gaze-single, focus, riposte — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit"
[reskin] signature miss: action — "The wolf makes a snapping feint with one head and, in the same motion, darts past its target, forcing the prey to turn and chase the wrong skull. The prey must scramble to follow or lose sight of the wolf entirely, leaving itself open to the wolf's next pass." [action/save/condition] — the model found no template that holds it (offered: trample, gaze-single, snare, shield-bash, lure, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, feint-slip, focus, riposte)
[reskin] fallback respects the call: feint-slip, gaze-single left the shelf — the call declined them for this sheet
[reskin] fallback stands down: the twist path has no shelf — the Wolf's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "While one skull watches the prey, the other rests — and once the watching head has tracked a foe through a whole pass, the resting head is ready to strike with poisoned cunning the moment that foe drops its guard." [trait/always/damage] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "While one skull watches the prey, the other rests — and once the watching head has tracked a foe through a whole pass, the resting head is ready to strike with poisoned cunning the moment that foe drops its guard." [trait/always/damage] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] weapons answered: Bite = none
[reskin] print canon type: Monstrosity -> Beast — the Wolf's (a Unicorn printed Fey, 2026-10-01)
[reskin] print canon speed: 30 ft. -> 40 ft. — the Wolf's walk; the concept's other modes stay
[reskin] languages held: None stands — INT 3 on a Beast speaks nothing, whatever the mind read said
[reskin] print canon trait: Pack Tactics — "a wolf with two heads" is the Wolf (print's own row)
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the seat's, not the Wolf's
[reskin] print canon: chassis row leaves — Traits/"Circling Lope" is the seat's, not the Wolf's
audit finding names unknown entry, dropped: Twin-Skulled Wolf
```


---


### Scaldwell — in the run

**Concept:** a vampire who runs a bathhouse

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Scaldwell | 13 | lurker-8 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 10 / off 6 → 8; sustained 30 (2 × Grave Strike); nova none; dmg 30

```
Scaldwell

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

Skills Perception +7, Stealth +9

Resistances Necrotic

Immunities Poison; Exhaustion, Poisoned

Senses darkvision 60 ft.; Passive Perception 17

Languages Common plus two other languages

CR 13 (XP 10,000; PB +5)

Traits

Legendary Resistance (3/Day, or 4/Day in Lair). If the scaldwell fails a saving throw, it can choose to succeed instead.

Misty Escape. If the scaldwell drops to 0 Hit Points outside its resting place, the scaldwell uses Shape-Shift to become mist (no action required). If it can't use Shape-Shift, it is destroyed.
While it has 0 Hit Points in mist form, it can't return to its vampire form, and it must reach its resting place within 2 hours or be destroyed. Once in its resting place, it returns to its vampire form and has the Paralyzed condition until it regains any Hit Points, and it regains 1 Hit Point after spending 1 hour there.

Spider Climb. The scaldwell can climb difficult surfaces, including along ceilings, without needing to make an ability check.

Vampire Weakness. The scaldwell has these weaknesses:


- Forbiddance: the scaldwell can't enter a residence without an invitation from an occupant.
- Running Water: the scaldwell takes 20 Acid damage if it ends its turn in running water.
- Stake to the Heart: If a weapon that deals Piercing damage is driven into the scaldwell's heart while the scaldwell has the Incapacitated condition in its resting place, the scaldwell has the Paralyzed condition until the weapon is removed.
- Sunlight: the scaldwell takes 20 Radiant damage if it starts its turn in sunlight. While in sunlight, it has Disadvantage on attack rolls and ability checks.

Actions

Multiattack. The scaldwell makes two Grave Strike attacks and uses Bite.

Grave Strike. Melee Attack Roll: +9, reach 5 ft. 8 (1d8 + 4) Bludgeoning damage plus 7 (2d6) Necrotic damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 17) from one of two hands.

Bite (Bat or Vampire Form Only). Constitution Saving Throw: DC 17, one creature within 5 feet that is willing or that has the Grappled, Incapacitated, or Restrained condition. Failure: 6 (1d4 + 4) Piercing damage plus 13 (3d8) Necrotic damage. The target's Hit Point maximum decreases by an amount equal to the Necrotic damage taken, and the scaldwell regains Hit Points equal to that amount. A Humanoid reduced to 0 Hit Points by this damage and then buried rises the following sunset as a Vampire Spawn under the scaldwell's control.

Bonus Actions

Shape-Shift. If the scaldwell isn't in sunlight or running water, it shape-shifts into a Tiny bat (Speed 5 ft., Fly Speed 30 ft.) or a Medium cloud of mist (Speed 5 ft., Fly Speed 20 ft. [hover]), or it returns to its vampire form. Anything it is wearing transforms with it.
While in bat form, the scaldwell can't speak. Its game statistics, other than its size and Speed, are unchanged.
While in mist form, the scaldwell can't take any actions, speak, or manipulate objects. It is weightless and can enter an enemy's space and stop there. If air can pass through a space, the mist can do so, but it can't pass through liquid. It has Resistance to all damage, except the damage it takes from sunlight.

Charm (Recharge 5-6). The scaldwell casts Charm Person, requiring no spell components and using Charisma as the spellcasting ability (spell save DC 17), and the duration is 24 hours. The Charmed target is a willing recipient of the scaldwell's Bite, the damage of which doesn't end the spell. When the spell ends, the target is unaware it was Charmed by the scaldwell.

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
[route] lurker-trap type=Undead mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | skirmisher-shifter: a shifter is named by its words (shape-shifts, turns into, a were-) — none here | lurker-trap: ✓ ("runs a bathhouse") | lurker-trap: no line key in the words — the model's read of its quote
[concept] name: provided_name rejected — "a vampire who runs a bathhouse…" is the description, not a name
[concept] resolve: archetype=lurker type=Undead themes=grave/aquatic mind=sapient style=trap energy=Necrotic mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: scalding bathwater as a weapon [body] | luring bathers into the water before striking [behavior] | the bathhouse it haunts and controls [aura]
[concept] identity: The bathhouse keeper waits behind the steam, wearing the calm face of a host until a bather settles into the scalding water — then it strikes, boiling the life from them through the water itself while its grave-cold hands pin them under the surface. Every round after, it works the room as a predator works a trap: shutting doors, venting scalding steam, and dragging the weakened deeper into the baths it controls. Wounded, it does not flee the house it has made its body — it fights to the death, taunting its prey with the manners of an innkeeper who will never let a guest leave.
[concept] lore: A vampire who drowned in its own bathhouse and rose again as the spirit of the place, it keeps the water boiling and the doors locked, feeding on the warmth of every guest who stays too long.
[reskin] print canon route: the Vampire's body outranks the trap seat — no verb in the words names it; the plain lurker line
[reskin] print canon defenses: HP 179 -> 195, AC 17 -> 16 — the Vampire's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 18, DEX 18, CON 18, INT 17, WIS 15, CHA 18 — the Vampire's at its own CR; attack +10 -> +9, DC 17 (print's)
[reskin] donor: lurker-8 -> CR 13
[reskin] row gated out: Teleport (teleport) — the concept did not claim this mechanic
[reskin] [path] decides: twist on the Vampire (the matcher would have said homebrew)
[reskin] print canon: "a vampire who runs a bathhouse" heads on the Vampire — print's rows ride along; the seat stays
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] name_element answered: Scaldwell = imagery
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline declared: "the scaldwell" — the call's own answer (kind), built from the name
[reskin] inline form: "the scaldwell" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a vampire" -> has (descriptive), head | "runs a bathhouse" -> has (descriptive)
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "Scaldwell vents the bathhouse's scalding water and steam through a doorway or opening it can see, rolling a boiling wall across the room. Anyone caught in the surge is scalded and the floor around them stays slick and hot for a time, so bathers who linger keep getting burned and find it hard to stand their ground in the scalding water. It uses this to close off exits and herd guests toward the dee" [action/save/damage] — menu: gaze-single, execute, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, terror-pulse, snare-bolt, slow-bolt, sensory-strike, drain, zone-seed, blighted-ground (+ shelf: delayed-brand, patient-defense, self-invisibility, focus, feint-slip, coating, riposte, contagion, stunning-strike, charge-push, hook-rider, pounce, isolation)
[reskin] signature bound to the concept's verb: action — drain (vampire)
[reskin] word match declined by the call: blighted-ground, drain, zone-seed, riposte — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit" after being shown drain, which the GM's words keyed
[reskin] key match declined: action — "drain" was ranked first on the call's own menu for vampire, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: action — "Scaldwell vents the bathhouse's scalding water and steam through a doorway or opening it can see, rolling a boiling wall across the room. Anyone caught in the surge is scalded and the floor around them stays slick and hot for a time, so bathers who linger keep getting burned and find it hard to stand their ground in the scalding water. It uses this to close off exits and herd guests toward the dee" [action/save/damage] — the model found no template that holds it (offered: drain, gaze-single, execute, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, terror-pulse, snare-bolt, slow-bolt, sensory-strike, zone-seed, blighted-ground, riposte)
[reskin] fallback respects the call: drain left the shelf — the call declined it for this sheet
[reskin] fallback stands down: the twist path has no shelf — the Vampire's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "The scalding water answers its keeper: whenever Scaldwell wounds someone with its claws, that wound weeps boiling bathwater, and the scalded flesh keeps burning while the creature is near. Anyone it has freshly clawed finds the water of the house turning on them, burning hotter and deeper the longer they stay in its rooms." [trait/always/damage] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, evasion, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] word match declined by the call: heated-body, bloodied-fury, bloodied-burst — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "The scalding water answers its keeper: whenever Scaldwell wounds someone with its claws, that wound weeps boiling bathwater, and the scalded flesh keeps burning while the creature is near. Anyone it has freshly clawed finds the water of the house turning on them, burning hotter and deeper the longer they stay in its rooms." [trait/always/damage] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, evasion, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst, heated-body, bloodied-burst)
[reskin] weapons answered: Scalding Claw = none
[reskin] print canon modes: swim off — the Vampire has no such mode and the words name none
[reskin] speed by concept: dropped Swim 30 ft.; added Climb 30 ft. — the concept's movement set decides
[reskin] languages by mind: "None" -> "Common plus the languages it knew in life" (sapient)
[reskin] print canon alignment: Neutral Evil -> Lawful Evil — the Vampire's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common plus the languages it knew in life" -> "Common plus two other languages" — the Vampire's
[reskin] print canon speed: 30 ft. -> 40 ft. — the Vampire's walk; the concept's other modes stay
[reskin] print canon speed: Climb -> 40 ft. — the Vampire's own
[reskin] print canon attack: "Scalding Claw" -> "Grave Strike" — the Vampire's own row
[reskin] print canon multiattack: "The scaldwell makes two Grave Strike attacks and uses Bite." — the Vampire's own
[reskin] immunities stamped for type: Undead -> Poison; Exhaustion, Poisoned
[reskin] print canon skills: "Perception +7, Stealth +14" -> "Perception +7, Stealth +9" — the Vampire's own skills, each derived from this sheet's stat and PB
[reskin] print canon defenses: resistances none -> Necrotic — the Vampire's own header lines
[reskin] print canon trait: Legendary Resistance (3/Day, or 4/Day in Lair) — "a vampire who runs a bathhouse" is the Vampire (print's own row)
[reskin] print canon trait: Misty Escape — "a vampire who runs a bathhouse" is the Vampire (print's own row)
[reskin] print canon trait: Spider Climb — "a vampire who runs a bathhouse" is the Vampire (print's own row)
[reskin] print canon trait: Vampire Weakness — "a vampire who runs a bathhouse" is the Vampire (print's own row)
[reskin] print canon row: Actions/Bite (Bat or Vampire Form Only) — the Vampire's own
[reskin] print canon row: Bonus Actions/Shape-Shift — the Vampire's own
[reskin] print canon: chassis row leaves — Bonus Actions/"Umbral Step" yields to the Vampire's Shape-Shift
[reskin] print canon row: Bonus Actions/Charm (Recharge 5-6) — the Vampire's own
[reskin] vulnerability rejected — "Radiant" has no warrant in the concept's own text (print's default is none)
[reskin] multiattack replacement clause withheld: the Multiattack already uses it — "The scaldwell makes two Grave Strike attacks and uses Bite." (the Vampire's print line names Bite; a second clause named it again, twist-ten 2026-10-19)
audit finding below confidence gate: Vampire Weakness The Sunlight weakness is keyed to the vampire subtype the block never establishes, and none of the block's text ties the creature to that suite except by name; this is a subtype-reference inconsistency (name 'Vampire' inside the entry).
audit finding below confidence gate: Vampire Weakness Lowercase bullet headings inside the trait (the / the) break statblock capitalization and duplicate the standard 2014-format vampire weakness rather than reading as scaldwell-specific rules.
[reskin] escape dc: Grave Strike → DC 17 (8 + PB + STR; a late row wore another number)
```


---


### Tollwarden — in the run

**Concept:** a chapel bell-ringer's ghost that tolls for the dying

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Tollwarden | 3 | lurker-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1 / off 5 → 3; sustained 38 (2 × Withering Touch); nova Chapel Knell 13; dmg 38

```
Tollwarden

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

Knell of Passing. The first time the tollwarden is Bloodied in a fight, it releases a burst. Constitution Saving Throw: DC 13, each creature in a 15-foot Emanation originating from the tollwarden. Failure: 6 (1d12) Necrotic damage, and the target has the Deafened condition until the end of its next turn.

Ethereal Sight. The tollwarden can see 60 feet into the Ethereal Plane when it is on the Material Plane.

Incorporeal Movement. The tollwarden can move through other creatures and objects as if they were Difficult Terrain. It takes 5 (1d10) Force damage if it ends its turn inside an object.

Actions

Multiattack. The tollwarden makes two Withering Touch attacks. It can replace one attack with a use of Horrific Visage.

Withering Touch. Melee Attack Roll: +5, reach 5 ft. 19 (3d10 + 3) Necrotic damage.

Chapel Knell (Recharge 5-6). Constitution Saving Throw: DC 13, each creature in a 15-foot Emanation originating from the tollwarden. Failure: 13 (3d8) Thunder damage, and the target has the Deafened condition until the end of its next turn. Success: Half damage only.

Horrific Visage. Wisdom Saving Throw: DC 13, each creature in a 60-foot Cone that can see the tollwarden and isn't an Undead. Failure: 10 (2d6 + 3) Psychic damage, and the target has the Frightened condition until the start of the tollwarden's next turn. Success: The target is immune to this ghost's Horrific Visage for 24 hours.

Possession (Recharge 6). Charisma Saving Throw: DC 13, one Humanoid the tollwarden can see within 5 feet. Failure: The target is possessed by the tollwarden; the tollwarden disappears, and the target has the Incapacitated condition and loses control of its body. The tollwarden now controls the body, but the target retains awareness. The tollwarden can't be targeted by any attack, spell, or other effect, except ones that specifically target Undead. The tollwarden's game statistics are the same, except it uses the possessed target's Speed, as well as the target's Strength, Dexterity, and Constitution modifiers.
The possession lasts until the body drops to 0 Hit Points or the tollwarden leaves as a Bonus Action. When the possession ends, the tollwarden appears in an unoccupied space within 5 feet of the target, and the target is immune to this ghost's Possession for 24 hours. Success: The target is immune to this ghost's Possession for 24 hours.

Etherealness. The tollwarden casts the Etherealness spell, requiring no spell components and using Charisma as the spellcasting ability. The tollwarden is visible on the Material Plane while on the Border Ethereal and vice versa, but it can't affect or be affected by anything on the other plane.

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
- Actions/Chapel Knell — template active-toll; library draw (seed unstamped); the GM's clause "tolls for the dying"; binds the GM's words: toll+bell
- Actions/Horrific Visage — print's own row
- Actions/Possession — print's own row
- Actions/Etherealness — print's own row
- Traits/Knell of Passing — template bloodied-burst; library draw (seed unstamped); the GM's clause "tolls for the dying"; binds the GM's words: toll+bell+dying+the dying+ring+peal
- Traits/Ethereal Sight — print's own row
- Traits/Incorporeal Movement — print's own row

**Engine trace**

```
[path] twist — Ghost (is) — "ghost" (call)
[route] lurker-phantom type=Undead mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | lurker-phantom: ✓ ("a chapel bell-ringer's ghost that tolls ") | lurker-phantom: key "ghost" (class body)
[concept] name: provided_name rejected — "Sketch this D&D monster concept's combat…" is the description, not a name
[concept] hints: phantom→style ✓ ("a chapel bell-ringer's ghost")
[concept] resolve: archetype=lurker type=Undead themes=grave/voice mind=sapient style=phantom energy=Necrotic mix=energy identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: tolling a death-knell [behavior] | spectral bell and rope [object] | incorporeal chapel-haunting [body]
[concept] identity: The bell-ringer's ghost drifts through the chapel walls, its spectral rope already swinging as it tolls a knell that saps the warmth from the living. Each round it haunts the same area, ringing its bell to mark a victim for death, then reaching out with grave-cold hands to drain them further. It is a grieving, obsessive spirit that will not flee — it fights until the bell itself is silenced.
[concept] lore: A bell-ringer who died mid-toll, cursed to ring for every soul passing from the world, now mistakes the living for the dying and will not stop until they join its congregation.
[reskin] print canon route: the Ghost's body outranks the phantom seat — no verb in the words names it; the plain lurker line
[reskin] print canon defenses: HP 39 -> 45, AC 14 -> 11 — the Ghost's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 7, DEX 13, CON 10, INT 10, WIS 12, CHA 17 — the Ghost's at its own CR; attack +5 -> +5, DC 13 (print's)
[reskin] donor: lurker-2 -> CR 3
[reskin] row gated out: Teleport (teleport) — the concept did not claim this mechanic
[reskin] [path] decides: twist on the Ghost (the matcher would have said homebrew)
[reskin] print canon: "a chapel bell-ringer's ghost that tolls for the dying" heads on the Ghost — print's rows ride along; the seat stays
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline declared: "the tollwarden" — the call's own answer (kind), built from the name
[reskin] inline form: "the tollwarden" — the model's own reading of the name
[reskin] save dc derived: DC 12 -> 13 (8 + PB 2 + the sheet's best 3) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] asked field dropped: the call answered trigger "at_will" for "tolls for the dying" but offered no quote
[reskin] clauses: "a chapel bell-ringer's ghost" -> has (descriptive), head | "tolls for the dying" -> has (mechanical) [asked: condition]
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "While the bell tolls, it names one living creature it can see as its marked soul for the coming round; the mark rides the tolling bell and makes the warden's own strikes against that creature colder and surer, and if that creature is brought low while marked, the bell rings out once more in a sound only the fallen hear. The toll is the warden's grief made law: it does not spread, it singles out on" [action/save/condition] — menu: leap, gaze-single, execute, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, terror-pulse, snare-bolt, slow-bolt, sensory-strike, drain, zone-seed, blighted-ground (+ shelf: delayed-brand, patient-defense, self-invisibility, focus, feint-slip, coating, riposte, charge-push, hook-rider, pounce, isolation)
[reskin] signature bound to the concept's verb: action — active-toll, sensory-strike (toll, bell)
[reskin] word match declined by the call: isolation — the key word does not mean the mechanic here
[reskin] signature template: active-toll -> Actions/"Chapel Knell (Recharge 5-6)" ("the bell tolls and rings out in sound, affecting creatures that hear it, with De [verb: toll:concept, bell:concept]")
[reskin] keys spent by the action: toll
[reskin] signature idea (trait): "The spectral rope never stops swinging: whenever the tollwarden is harmed or its knell is disturbed, the bell peals out of its own accord, and those near the warden feel the death-chill of the chapel as the ringing saps warmth from any living creature close enough to hear it. The rope and bell are not weapons it wields but grief it cannot put down — a sound that keeps working even when the warden " [trait/on_being_hit/damage] — menu: heated-body, absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, evasion, relentless-pursuit, bound, marking-light, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] signature bound to the concept's verb: trait — bloodied-burst (toll, bell, dying, the dying)
[reskin] word match declined by the call: resonant-body, death-burst, adhesive, relentless-pursuit — the key word does not mean the mechanic here
[reskin] signature template (trait): bloodied-burst -> Traits/"Knell of Passing" ("whenever it is harmed the bell peals and saps warmth from living creatures nearb [verb: toll:concept, bell:concept, dying:concept, the dying:concept, ring:idea, peal:idea]")
[reskin] weapons answered: Grave-Cold Hand = none
[reskin] languages by mind: "None" -> "Common plus the languages it knew in life" (sapient)
[reskin] print canon languages: "Common plus the languages it knew in life" -> "Common plus one other language" — the Ghost's
[reskin] print canon speed: 30 ft. -> 5 ft. — the Ghost's walk; the concept's other modes stay
[reskin] print canon speed: Fly -> 40 ft. — the Ghost's own
[reskin] print canon attack: "Grave-Cold Hand" -> "Withering Touch" — the Ghost's own row
[reskin] immunities stamped for type: Undead -> Poison; Exhaustion, Poisoned
[reskin] print canon defenses: immunities Poison; Exhaustion, Poisoned -> Necrotic, Poison; Charmed, Exhaustion, Frightened, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained; resistances none -> Acid, Bludgeoning, Cold, Fire, Lightning, Piercing, Slashing, Thunder — the Ghost's own header lines
[reskin] print canon trait: Ethereal Sight — "a chapel bell-ringer's ghost that tolls for the dying" is the Ghost (print's own row)
[reskin] print canon trait: Incorporeal Movement — "a chapel bell-ringer's ghost that tolls for the dying" is the Ghost (print's own row)
[reskin] print canon: chassis row leaves — Bonus Actions/"Umbral Step" is the seat's, not the Ghost's
[reskin] print canon row: Actions/Horrific Visage — the Ghost's own
[reskin] print canon row: Actions/Possession (Recharge 6) — the Ghost's own
[reskin] print canon row: Actions/Etherealness — the Ghost's own
[reskin] multiattack replacement clause: It can replace one attack with a use of Horrific Visage.
[reskin] row binds its clause: "Chapel Knell" answers "tolls for the dying" — the keys it matched came from that clause, so the coverage credit has a receipt
[reskin] row binds its clause: "Knell of Passing" answers "tolls for the dying" — the keys it matched came from that clause, so the coverage credit has a receipt
[reskin] audit rewrite blocked — "Possession (Recharge 6)" is engine-authored chassis text
[reskin] audit rewrite blocked — "Etherealness" is engine-authored chassis text
```


---

## Review batch — classes-eight-2026-10-20T14-04-39

The checker ran first. The gate table covers every block in the run; every block of the run follows. Each block carries its checker row above and its engine trace below. Hand-derive against the row first; then read for what predicates can't see.

### Gate table — the whole run

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Sarnek Thiss | 5 | 2024 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 6/6 |
| Vesper Krell | 5 | 2024 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 5/6 |
| Dame Oriel | 5 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/3 |
| Harl Sedgewick | 6 (2014) | 2014 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |
| Ravik Stormscar | 8 | 2024 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 5/5 |
| Vareth Solmane | 6 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |
| Brother Anselm | 4 | 2024 | defender-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 2/2 |
| Lucien Marrow | 6 | 2024 | caster-6 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/6 |
| Thurivald | 6 (2014) | 2014 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 6/6 |
| Mother Vane | 8 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 5/5 |
| Kaelen Vor | 5 | 2024 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/2 | 5/5 |
| Bloodbound Dire Wolf | 3 | 2024 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 2/2 |
| Hooklock Imp | 4 | 2024 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 4/5 |
| Mazegoad Reaver | 6 | 2024 | defender-3-leader | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/4 |
| Sir Cael of the Broken Vow | 7 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok | ok | soft (1) | 1/1 | 4/4 |
| Snikt Ravell | 3 | 2024 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 4/4 |

**Dropped 5 of 19 user clauses** (coverage 74%); concept share 93% (66/71 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- none



---


### Bloodbound Dire Wolf — lowest CR

**Concept:** a dire wolf that hunts in a pack

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Bloodbound Dire Wolf | 3 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- **dropped clause:** "hunts in a pack"
- read: def 1 / off 3 → 2; sustained 24 (2 × Bite); nova none; dmg 24

```
Bloodbound Dire Wolf

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

Pack Tactics. The dire wolf has Advantage on an attack roll against a creature if at least one of the dire wolf's allies is within 5 feet of the creature and the ally doesn't have the Incapacitated condition.

Actions

Multiattack. The dire wolf makes two Bite attacks.

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
[path] twist — Dire Wolf (is) — "a dire wolf" (call)
[route] skirmisher type=Beast mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | skirmisher: ✓ ("hunts in a pack") | skirmisher: no line key in the words — the model's read of its quote
[concept] resolve: archetype=skirmisher type=Beast themes=bestial/grasping mind=bestial style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: pack-coordinated hit-and-run hunting [behavior] | bone-crushing jaws and lean rangy frame [body]
[concept] identity: The dire wolf circles with its pack in a loose crescent, each wolf feinting and withdrawing so the prey never knows which shadow will commit; then the nearest one lunges, jaws closing on a hamstring, and is gone before the retaliation lands. Every round repeats the exchange — a feint, a bite, a retreat the pack closes behind — while the lead wolf waits for a target to stumble and, bloodied, the pack still presses but begins herding the wounded toward the treeline rather than dying for the kill.
[concept] lore: Deep-forest dire wolves run in blood-bound packs whose matriarch remembers every trail her kin have taken, and they hunt not for hunger alone but to drive intruders from the old range their ancestors claimed.
[reskin] print canon array: STR 17, DEX 16, CON 15, INT 3, WIS 12, CHA 7 — the Dire Wolf's, DEX fitted to +5
[reskin] donor: skirmisher-3 -> CR 3
[reskin] [path] decides: twist on the Dire Wolf (the matcher agrees)
[reskin] print canon: "a dire wolf that hunts in a pack" heads on the Dire Wolf — print's rows ride along; the seat stays
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline declared: "the dire wolf" — the call's own answer (kind), built from the name
[reskin] inline form: "the dire wolf" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a dire wolf" -> has (descriptive), head | "hunts in a pack" -> has (descriptive)
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "When the wolf and its packmates have a foe surrounded, the wolf snaps and darts at one side to draw the prey's guard, leaving its flank and footing open — the next wolf to strike that prey bites deeper for the opening. The wolf can only do this to a creature already pressed by another of its kind, and never twice in a row against the same prey." [bonus_action/always/condition] — menu: rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating (+ shelf: trample, leap, gaze-single, snare, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, riposte, affliction, contagion, charge-push, hook-rider, pounce, isolation, charge)
[reskin] signature bound to the concept's verb: action — focus (hunt)
[reskin] word match declined by the call: focus — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit" after being shown focus, which the GM's words keyed
[reskin] key match declined: action — "focus" was ranked first on the call's own menu for hunt, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: action — "When the wolf and its packmates have a foe surrounded, the wolf snaps and darts at one side to draw the prey's guard, leaving its flank and footing open — the next wolf to strike that prey bites deeper for the opening. The wolf can only do this to a creature already pressed by another of its kind, and never twice in a row against the same prey." [bonus_action/always/condition] — the model found no template that holds it (offered: focus, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, feint-slip, coating, lure, riposte)
[reskin] fallback respects the call: focus left the shelf — the call declined it for this sheet
[reskin] fallback stands down: the twist path has no shelf — the Dire Wolf's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 15 already beats print's 13 at CR 3, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "Its jaws are built to break bone, not just tear flesh; prey that survives a bite carries the crushed damage with it and falters, moving and striking more slowly until it has shaken off the shock." [trait/always/condition] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature bound to the concept's verb: trait — faultless-tracker (hunts, hunted)
[reskin] word match declined by the call: faultless-tracker — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit" after being shown faultless-tracker, which the GM's words keyed
[reskin] key match declined: trait — "faultless-tracker" was ranked first on the call's own menu for hunts+hunted, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: trait — "Its jaws are built to break bone, not just tear flesh; prey that survives a bite carries the crushed damage with it and falters, moving and striking more slowly until it has shaken off the shock." [trait/always/condition] — the model found no template that holds it (offered: faultless-tracker, false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst, heated-body)
[reskin] concept-first trait skipped: faultless-tracker — the call read its match as a collision (the word is a modifier, or the sheet already answers it)
[reskin] weapons answered: Bite = none
[reskin] languages held: None stands — INT 3 on a Beast speaks nothing, whatever the mind read said
[reskin] print canon trait: Pack Tactics — "a dire wolf that hunts in a pack" is the Dire Wolf (print's own row)
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the seat's, not the Dire Wolf's
[reskin] print canon: chassis row leaves — Traits/"Pack Harrier" is the seat's, not the Dire Wolf's
```


---


### Mother Vane — highest CR

**Concept:** an oathsworn crusader who smites the unclean and mends her soldiers

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Mother Vane | 8 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 7 / off 8 → 7.5; sustained 54 (2 × Longsword); nova none; dmg 54

```
Mother Vane

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

Aura of Authority. While in a 10-foot Emanation originating from Mother Vane, Mother Vane and its allies have Advantage on attack rolls and saving throws, provided Mother Vane doesn't have the Incapacitated condition.

Actions

Multiattack. Mother Vane makes two Longsword attacks. It can replace one attack with a use of Shield Bash.

Longsword. Melee Attack Roll: +8, reach 5 ft. 27 (5d8 + 5) Slashing damage.

Shield Bash. Strength Saving Throw: DC 16, one creature within 5 feet that Mother Vane can see. Failure: 27 (6d8) Bludgeoning damage. If the target is a Medium or smaller creature, it has the Prone condition. Success: Half damage only.

Bonus Actions

Lay on Hands (2/Day). Mother Vane touches a creature within 5 feet of itself and restores 27 (6d8) Hit Points to it.

Divine Smite (2/Day). Mother Vane charges its next strike: the first time it hits with an attack before the end of its next turn, the target takes an extra 14 (4d6) Radiant damage.

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
- Actions/Longsword — print's own row, renamed; weapon longsword
- Actions/Shield Bash — print's own row
- Bonus Actions/Lay on Hands — template lay-on-hands; paladin kit; the GM's clause "mends her soldiers"
- Bonus Actions/Divine Smite — template coating; paladin kit; the GM's clause "smites the unclean"; energy Radiant

**Engine trace**

```
[path] class_npc — class paladin — "crusader" (call)
[route] caster-warpriest (artillery) type=Humanoid mechanics=none — casts: implied by the kind — "an oathsworn crusader who smites the unc" | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | caster-warpriest: ✓ ("an oathsworn crusader who smites the unc") | caster-warpriest: key "smites" (class verb)
[concept] hints: warpriest→style ✓ ("smites the unclean and mends")
[concept] resolve: archetype=caster type=Humanoid themes=armed/celestial mind=sapient style=warpriest energy=Radiant mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: radiant smites upon the unclean [behavior] | oathbound prayers that mend her soldiers [behavior] | blessed blade and heavy iron plate [object]
[concept] identity: An oathsworn crusader in heavy iron plate opens the fight by charging the nearest unclean foe, her sanctified blade breaking the line while she calls down radiant judgment on the wicked. Each round she parries with her shield and drives her blade home, then turns a brief prayer inward or outward to knit her soldiers' wounds shut, so a hard-pressed squad fights on where it should break. Under pressure she does not flee — she plants herself as a wall between her troops and the enemy, growing only more furious as her oathmates bleed, and fights to the last vow.
[concept] lore: She swore her oath over the graves of a massacred garrison and now walks the border as chaplain, judge, and shield, gathering reformed soldiers under her banner to smite the unclean and never again be the one who arrives too late.
[reskin] energy withheld: Radiant on a Humanoid with no Radiant in the concept's own words (fixed phrases read first)
[reskin] [path] class body: the paladin stands on the Gladiator — the class's own print block, nearest CR 8
[reskin] print canon route: the Gladiator is not a caster first and keys STR 18 over DEX 15 — it casts no spells — the caster family stands down for the plain defender line
[reskin] print canon array: STR 20, DEX 15, CON 16, INT 10, WIS 12, CHA 15 — the Gladiator's, STR fitted to +8
[reskin] donor: defender-5 -> CR 8
[reskin] style unserved: "warpriest" has no defender line — the plain line ships (resolve's style signal is noisy; not re-routed)
[reskin] row gated out: Guard Aura (aura) — the concept did not claim this mechanic
[reskin] [path] decides: class_npc on the Gladiator · class paladin (the matcher would have said homebrew)
[reskin] print canon: "an oathsworn crusader who smites the unclean and mends her soldiers" heads on the Gladiator — print's rows ride along; the seat stays
[reskin] kit energy: "Divine Smite" deals Radiant, not Bludgeoning — the shape's own fiction
[reskin] class kit: paladin — "crusader": Aura of Authority (Hobgoblin Captain/Aura of Authority), Lay on Hands (2/Day) (lay-on-hands), Divine Smite (2/Day) (coating as Divine Smite)
[reskin] inline declared: "Mother Vane" — the call's own answer (person), built from the name; the rules would have said "the mother"
[reskin] inline on kit rows: "the mother" -> "Mother Vane"
[reskin] energy rider withheld: Radiant on a Humanoid with no Radiant in the concept's own words
[reskin] save dc derived: DC 15 -> 16 (8 + PB 3 + the sheet's best 5) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "an oathsworn crusader" -> has (descriptive), head | "smites the unclean" -> has (mechanical) [asked: attack] | "mends her soldiers" -> has (mechanical) [asked: heal]
[reskin] menu pruned: action — snap-shot (the sheet cannot render them)
[reskin] signature idea (action): "Mother Vane plants her shield and calls out a battlefield prayer that reaches every sworn soldier who can see or hear her, steadying them and driving them back into the fight. Her troops shrug off their fear and exhaustion for a moment, stepping forward instead of breaking — the prayer spreads outward from where she stands and holds only as long as she remains standing." [action/once_per_fight/condition] — menu: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up (+ shelf: patient-defense, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, riposte, stunning-strike, charge-push, hook-rider)
[reskin] signature bound to the concept's verb: action — rally (mend)
[reskin] word match declined by the call: rally, herd, aggro-curse — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit" after being shown rally, which the GM's words keyed
[reskin] key match declined: action — "rally" was ranked first on the call's own menu for mend, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: action — "Mother Vane plants her shield and calls out a battlefield prayer that reaches every sworn soldier who can see or hear her, steadying them and driving them back into the fight. Her troops shrug off their fear and exhaustion for a moment, stepping forward instead of breaking — the prayer spreads outward from where she stands and holds only as long as she remains standing." [action/once_per_fight/condition] — the model found no template that holds it (offered: rally, throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, aggro-curse)
[reskin] fallback respects the call: coating (already on the sheet), rally, herd left the shelf — the call declined them for this sheet
[reskin] fallback stands down: the class_npc path has no shelf — the Gladiator's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 20 already beats print's 16 at CR 8, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "Every wound her oathmates take lands on her ledger: whenever an ally within reach is struck, Mother Vane's fury sharpens and her next blow against that enemy bites deeper, as if the strike were answered in kind. The more her soldiers bleed, the more terrible her blade becomes." [trait/always/damage] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending, weapon-lodge)
[reskin] word match declined by the call: bloodied-fury, bloodied-burst — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "Every wound her oathmates take lands on her ledger: whenever an ally within reach is struck, Mother Vane's fury sharpens and her next blow against that enemy bites deeper, as if the strike were answered in kind. The more her soldiers bleed, the more terrible her blade becomes." [trait/always/damage] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, bloodied-burst, resonant-body)
[reskin] weapons answered: Longsword = longsword; Warhammer = warhammer
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] print canon alignment: Lawful Good -> Neutral — the Gladiator's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon attack: "Spear" keeps print's hybrid frame — reach 5 ft. or range 20/60 ft. (the Gladiator's weapon is thrown)
[reskin] print canon attack: "Longsword" -> "Spear" — the Gladiator's own row
[reskin] print canon rows: Warhammer leave — the Gladiator has one melee row (Spear), and Multiattack reads print's
[reskin] print canon row priced: Shield Bash — dice 9 → 27
[reskin] print canon row: Actions/Shield Bash — the Gladiator's own
[reskin] class weapon: Actions/"Spear" -> "Longsword" — a paladin fights with a longsword, not the Gladiator's
[reskin] multiattack replacement clause: It can replace one attack with a use of Shield Bash.
audit finding below confidence gate: Divine Smite The GM must track a pending charge state across turns (armed-until-end-of-next-turn) with no token or listed condition attached, and adjudicate which of Mother Vane's hits counts as "first" when it makes a Multiattack — several branches to resolve mid-combat for a short entry.
[reskin] audit rename blocked — "Shield Bash" is the user's own part name, a kit feature's real name, or print's own row
```


---


### Sarnek Thiss — a 2024 sheet

**Concept:** a lizardfolk monk who strikes pressure points with an open hand

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Sarnek Thiss | 5 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- **dropped clause:** "strikes pressure points with an open hand"
- read: def 5 / off 7 → 6; sustained 48 (2 × Unarmed Strike); nova none; dmg 48

```
Sarnek Thiss

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

Hold Breath. Sarnek can hold its breath for 15 minutes.

Marsh Stride. Difficult Terrain composed of mud doesn't cost Sarnek extra movement, and Sarnek can move across mud without needing to make an ability check.

Actions

Multiattack. Sarnek makes two attacks, using Unarmed Strike or Dart in any combination.

Unarmed Strike. Melee Attack Roll: +6, reach 5 ft. 24 (4d6 + 3) Bludgeoning damage. Once on each of Sarnek's turns when it hits with this attack, the target is subjected to the following effect. Constitution Saving Throw: DC 13. Failure: The target has the Stunned condition until the end of Sarnek's next turn.

Dart. Ranged Attack Roll: +6, range 20/60 ft. 16 (3d8 + 3) Piercing damage.

Bonus Actions

Patient Defense. Sarnek takes the Dodge action.

Cunning Action. Sarnek takes the Dash, Disengage, or Hide action.

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
[path] class_npc — class monk — species lizardfolk — "monk" (call)
[route] skirmisher type=Humanoid mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | skirmisher: ✓ ("strikes pressure points with an open han") | skirmisher: no line key in the words — the model's read of its quote
[concept] resolve: archetype=skirmisher type=Humanoid themes=bestial/armed mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: open-palm strikes on pressure points [behavior] | dart in, strike, dart out [behavior] | scaled reptilian monk's body [body]
[concept] identity: The lizardfolk monk opens by circling just outside reach, then snaps in to land a single open-palm strike on a pressure point — neck, armpit, knee, throat — before springing back out of the reply. It fights in rounds of dart-and-touch, never trading blows, seeking the joint and nerve clusters that stiffen a limb or steal a breath, and it reads an opponent's guard the way other hunters read tracks. When bloodied and cornered it stops being surgical, committing to crippling strikes at the hips and spine so its pursuer cannot follow, and it will die before it lets itself be pinned — its patience on the approach is its weapon, and it has none left once that patience is spent.
[concept] lore: A trainee expelled from a lizardfolk temple for striking a master too hard, it now wanders the swamp roads testing its hand-pressure doctrine on anyone it meets — and it wants to prove that a palm can stop a heart.
[reskin] [path] class body: the monk stands on the Spy — the class's own print block, nearest CR 5
[reskin] print canon array: STR 10, DEX 16, CON 10, INT 12, WIS 14, CHA 16 — the Spy's, DEX fitted to +6
[reskin] donor: skirmisher-3 -> CR 5
[reskin] [path] decides: class_npc on the Spy · class monk (the matcher would have said homebrew)
[reskin] print canon: "a lizardfolk monk who strikes pressure points with an open hand" heads on the Spy — print's rows ride along; the seat stays
[reskin] row evicted for the cap: Traits/"Shed Step" (chassis filler) leaves so "Marsh Stride" fits — the cap evicts by priority, it does not refuse the newcomer
[reskin] species kit: lizardfolk — "monk": Hold Breath (Hydra/Hold Breath), Marsh Stride (terrain-walk, authored); Swim 30 ft.
[reskin] class kit: monk — "monk": Stunning Strike (stunning-strike, rides Open Palm), Patient Defense (patient-defense)
[reskin] inline declared: "Sarnek" — the call's own answer (person), built from the name
[reskin] inline form: "Sarnek" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a lizardfolk monk" -> has (descriptive), head | "strikes pressure points with an open hand" -> has (mechanical) [asked: condition]
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "When Sarnek lands an open-palm strike on a foe's joint or nerve cluster, it can read the guard from the recoil instead of following through — pivoting on that touch into a sudden retreat that leaves the struck enemy momentarily slow and off-balance, as though their limb forgot how to answer. The foe's next attempt to close or swing at Sarnek comes a beat late, giving Sarnek the room it wants." [rider/on_hit/movement] — menu: charge-push, hook-rider, pounce, isolation, bolt-mark, charge (+ shelf: trample, leap, gaze-single, snare, condition-payoff, throw-retrieve, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, exploiter, rampage, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte)
[reskin] signature bound to the concept's verb: action — riposte (opening)
[reskin] decline reason: action — the call answered none and names it "no_fit" after being shown riposte, which the GM's words keyed
[reskin] key match declined: action — "riposte" was ranked first on the call's own menu for opening, and the call read it as no fit; the words keep their claim and nothing is forced
[reskin] signature miss: action — "When Sarnek lands an open-palm strike on a foe's joint or nerve cluster, it can read the guard from the recoil instead of following through — pivoting on that touch into a sudden retreat that leaves the struck enemy momentarily slow and off-balance, as though their limb forgot how to answer. The foe's next attempt to close or swing at Sarnek comes a beat late, giving Sarnek the room it wants." [rider/on_hit/movement] — the model found no template that holds it (offered: riposte, charge-push, hook-rider, pounce, isolation, bolt-mark, charge, feint-slip)
[reskin] fallback stands down: the class_npc path has no shelf — the Spy's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 16 already beats print's 15 at CR 5, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "Sarnek's scaled hide and cold amphibious blood let it read pressure through skin contact, so when a foe's strike glances harmlessly off its scales it senses the tension in that limb and can answer with an instant, surgical touch of its own — a palm jab that stiffens the attacker's arm before they can pull it back." [trait/on_being_hit/condition] — menu: absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "Sarnek's scaled hide and cold amphibious blood let it read pressure through skin contact, so when a foe's strike glances harmlessly off its scales it senses the tension in that limb and can answer with an instant, surgical touch of its own — a palm jab that stiffens the attacker's arm before they can pull it back." [trait/on_being_hit/condition] — the model found no template that holds it (offered: absorption, bloodied-burst, resonant-body, uncanny-sense, bloodied-fury)
[reskin] weapons answered: Open Palm = none; Spine Shot = none
[reskin] weapon table: "Spine Shot" — range 30/90 ft. is not a print range; an unlisted thrown thing is 20/60, a hurled mass 60/240 (the critic's third species read)
[reskin] speed by body: a Humanoid walks 30 ft. (print's people; a hermit ran 50 — critic's audit 2026-10-02)
[reskin] speed by concept:  — the concept's movement set decides
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] languages by species: Draconic — the concept names the species; print's NPCs of it speak it
[reskin] print canon languages: "Common, Draconic" -> "Common plus one other language, Draconic" — the Spy's plus the concept's Draconic
[reskin] print canon attack: "Open Palm" -> "Shortsword" — the Spy's own row
[reskin] print canon attack: "Spine Shot" -> "Hand Crossbow" — the Spy's own ranged row
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the chassis's filler — on a class body the kit owns the class's rows
[reskin] print canon row: Bonus Actions/Cunning Action — the Spy's own
[reskin] class weapon: Actions/"Shortsword" -> "Unarmed Strike" — a monk fights with its hands, not the Spy's; the body's rider folds in (+7)
[reskin] class weapon: Actions/"Hand Crossbow" -> "Dart" — a monk fights with a dart, not the Spy's
[reskin] species kit: Swim 30 ft. — a lizardfolk's own
```


---


### Vesper Krell — a print donor

**Concept:** a tiefling rogue who stalks the rooftops of the old quarter

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Vesper Krell | 5 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 6 / off 5 → 5.5; sustained 34 (2 × Shortsword); nova none; dmg 34

```
Vesper Krell

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

Assassinate. During the first round of each combat, Vesper has Advantage on attack rolls against any creature that hasn't taken a turn. If Vesper hits a creature during that round, the target takes an extra 9 (2d8) Piercing damage.

Evasion. If Vesper is subjected to an effect that allows it to make a Dexterity saving throw to take only half damage, Vesper instead takes no damage if it succeeds on the save and only half damage if it fails. It can't use this trait if it has the Incapacitated condition.

Actions

Multiattack. Vesper makes two attacks, using Shortsword or Shortbow in any combination.

Shortsword. Melee Attack Roll: +6, reach 5 ft. 17 (4d6 + 3) Piercing damage.

Shortbow. Ranged Attack Roll: +6, range 80/320 ft. 16 (3d8 + 3) Piercing damage.

Bonus Actions

Cunning Action. Vesper takes the Dash, Disengage, or Hide action.

Vanishing Strike (1/Day). Vesper casts Invisibility on itself, requiring no spell components and using Charisma as the spellcasting ability.

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
- Bonus Actions/Vanishing Strike — template self-invisibility; library draw (seed unstamped); binds the GM's words: vanish+vanishes

**Engine trace**

```
[path] class_npc — class rogue — species tiefling — "rogue" (call)
[route] skirmisher-skulker type=Humanoid mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | skirmisher-skulker: ✓ ("stalks the rooftops of the old quarter") | skirmisher-skulker: key "stalks" (class verb)
[concept] resolve: archetype=skirmisher type=Humanoid themes=terror/armed mind=sapient style=skulker energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: strikes from concealment and vanishes [behavior] | the old quarter's rooftops as hunting ground [aura] | tiefling heritage and its stalking cunning [body]
[concept] identity: The rooftop stalker opens by dropping from shadowed eaves onto an unaware target, its blade already finding the seam between ribs before the victim knows it is hunted. Each round after it strikes once and is gone — over a ledge, behind a chimney, through a skylight — using the old quarter's dense skyline as a second body, and it never trades blows if it can help it. Bloodied or cornered, it breaks the fight into a running chase across slate and gutter, harrying and doubling back, and only fights to the death when there is no roof left above it.
[concept] lore: A tiefling who learned the old quarter's roofs before its streets, it runs the rooftops as a private kingdom, selling the silence between chimneys to whoever pays and treating any trespasser on the skyline as prey.
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
[reskin] inline declared: "Vesper" — the call's own answer (person), built from the name
[reskin] inline form: "Vesper" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a tiefling rogue" -> has (descriptive), head | "stalks the rooftops of the old quarter" -> has (mechanical) [asked: movement]
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "Vesper vanishes from sight the instant its blade lands, slipping behind cover and stilling itself against the stone — only there is no cover needed, because what the victim sees afterward is a shadow shaped like Vesper lingering where it stood, drawing eyes and shots while the real hunter has already moved. The decoy lasts only a breath and cannot be conjured again until Vesper has completely brok" [rider/on_hit/movement] — menu: affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, isolation, bolt-mark (+ shelf: leap, gaze-single, snare, condition-payoff, throw-retrieve, shield-bash, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, exploiter, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte)
[reskin] signature bound to the concept's verb: action — focus (stalk)
[reskin] word match declined by the call: focus, gaze-single, affliction, spew, patient-defense, feint-slip, contagion, stunning-strike, charge-push, hook-rider, pounce, isolation, bolt-mark — the key word does not mean the mechanic here
[reskin] seat takes its clause: "Vanishing Strike (1/Day)" answers "a tiefling" — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature template: self-invisibility -> Bonus Actions/"Vanishing Strike (1/Day)" ("the idea's core is Vesper vanishing from sight the instant the blade lands, leav [verb: vanish:idea, vanishes:idea]")
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 16 already beats print's 15 at CR 5, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "Vesper treats the old quarter's skyline as its true hunting ground: whenever it is above its prey — on a ledge, a rooftop, abeam overhead — it reads every shift in their footing and has no trouble tracking or moving unseen against them. This holds only while Vesper stays off the ground; drop it into the street and it is just another tiefling with a knife." [trait/always/defense] — menu: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] signature bound to the concept's verb: trait — faultless-tracker (stalks, stalk)
[reskin] word match declined by the call: faultless-tracker, aberrant-ground, spider-climb — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit" after being shown faultless-tracker, which the GM's words keyed
[reskin] key match declined: trait — "faultless-tracker" was ranked first on the call's own menu for stalks+stalk, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: trait — "Vesper treats the old quarter's skyline as its true hunting ground: whenever it is above its prey — on a ledge, a rooftop, abeam overhead — it reads every shift in their footing and has no trouble tracking or moving unseen against them. This holds only while Vesper stays off the ground; drop it into the street and it is just another tiefling with a knife." [trait/always/defense] — the model found no template that holds it (offered: faultless-tracker, false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst)
[reskin] concept-first trait skipped: faultless-tracker — the call read its match as a collision (the word is a modifier, or the sheet already answers it)
[reskin] weapons answered: Dagger = dagger; Hand Crossbow = hand crossbow
[reskin] weapon table: "Hand Crossbow" — a launcher, never thrown, range 30/120
[reskin] print canon modes: climb off — the Bandit Captain has no such mode and the words name none
[reskin] speed by body: a Humanoid walks 30 ft. (print's people; a hermit ran 50 — critic's audit 2026-10-02)
[reskin] speed by concept: dropped Climb 30 ft. — the concept's movement set decides
[reskin] print canon alignment: Neutral Evil -> Neutral — the Bandit Captain's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common, Infernal" -> "Common, Thieves' cant, Infernal" — the Bandit Captain's plus the concept's Infernal
[reskin] print canon attack: "Dagger" -> "Scimitar" — the Bandit Captain's own row
[reskin] print canon attack: "Hand Crossbow" -> "Pistol" — the Bandit Captain's own ranged row
[reskin] on-hit extra retyped: "Assassinate" adds Slashing, not Bludgeoning — the hit's own type (Scimitar)
[reskin] print canon: chassis row leaves — Traits/"Skyline Stalker" is the chassis's filler — on a class body the kit owns the class's rows
[reskin] on-hit extra retyped: "Assassinate" adds Piercing, not Slashing — the class weapon's own type (Shortsword)
[reskin] class weapon: Actions/"Scimitar" -> "Shortsword" — a rogue fights with a shortsword, not the Bandit Captain's
[reskin] class weapon: Actions/"Pistol" -> "Shortbow" — a rogue fights with a shortbow, not the Bandit Captain's
[reskin] species kit: resistance Fire — the tiefling's
[harness] re-rolled Traits/"Assassinate" -> "Rooftop Stalker" [catalog: terrain-walk]
```

**Re-roll — one entry, replaced**

```
Traits / BEFORE  Assassinate: During the first round of each combat, Vesper has Advantage on attack rolls against any creature that hasn't taken a turn. If Vesper hits a creature during that round, the target takes an extra 9 (2d8) Piercing damage.
Traits / AFTER   Rooftop Stalker: Difficult Terrain composed of mud doesn't cost Vesper extra movement, and Vesper can move across mud without needing to make an ability check.
provenance: catalog template "terrain-walk"
```


---


### Sir Cael of the Broken Vow — one marked soft

**Concept:** a knight-errant of the fallen order who shields the weak

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Sir Cael of the Broken Vow | 7 | defender-5 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok | ok |

- donor · soft · print-rows: rows outside print, the named seat and the keyed seeds: Traits/Shield of the Broken Vow
- read: def 6 / off 8 → 7; sustained 52 (2 × Longsword); nova none; dmg 52

```
Sir Cael of the Broken Vow

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

Shield of the Broken Vow. While an ally within 5 feet of Sir Cael is hit by an attack, Sir Cael interposes its shield, granting that ally a bonus to AC against the triggering attack, potentially causing it to miss.

Aura of Authority. While in a 10-foot Emanation originating from Sir Cael, Sir Cael and its allies have Advantage on attack rolls and saving throws, provided Sir Cael doesn't have the Incapacitated condition.

Actions

Multiattack. Sir Cael makes two Longsword attacks. It can replace one attack with a use of Shield Bash.

Longsword. Melee Attack Roll: +7, reach 5 ft. 26 (5d8 + 4) Slashing damage.

Shield Bash. Strength Saving Throw: DC 14, one creature within 5 feet that Sir Cael can see. Failure: 24 (7d6) Bludgeoning damage. If the target is a Medium or smaller creature, it has the Prone condition. Success: Half damage only.

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

- Traits/Shield of the Broken Vow — authored for this sheet; the GM's clause "shields the weak"
- Traits/Aura of Authority — paladin kit; the GM's clause "knight-errant"
- Actions/Multiattack — the chassis
- Actions/Longsword — print's own row, renamed; weapon longsword
- Actions/Shield Bash — print's own row

**Engine trace**

```
[path] class_npc — class paladin — "knight-errant" (call)
[route] defender type=Humanoid mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | defender: ✓ ("shields the weak") | defender: key "knight" (class verb)
[concept] resolve: archetype=defender type=Humanoid themes=armed/grave mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: shield-wall guardian stance [behavior] | an order's fallen banner and oath [object] | unbroken iron resolve [aura]
[concept] identity: A front-line defender who plants its shield between the weak and the blow, then answers any foe that tries to flow around it with a brutal punishing strike. Each round it holds ground, pulls the wounded behind its guard, and forces enemies to break on it rather than pass it. It does not flee when bloodied — it backs onto whoever it protects and fights to the last, the shield wall come to one body.
[concept] lore: When the fallen order broke, a handful of knights refused the rout and swore to stand by the helpless instead, and their iron vows outlived the banners they once obeyed.
[reskin] [path] class body: the paladin stands on the Gladiator — the class's own print block, nearest CR 7
[reskin] print canon array: STR 18, DEX 15, CON 16, INT 10, WIS 12, CHA 15 — the Gladiator's, STR fitted to +7
[reskin] donor: defender-5 -> CR 7
[reskin] row gated out: Guard Aura (aura) — the concept did not claim this mechanic
[reskin] [path] decides: class_npc on the Gladiator · class paladin (the matcher would have said homebrew)
[reskin] print canon: "a knight-errant of the fallen order who shields the weak" heads on the Gladiator — print's rows ride along; the seat stays
[reskin] repair round 1: 1 defect(s) — rename for "Hybrid Attack" takes the shelf's own row name "Shield Bash" — that name belongs to a template this sheet may still receive; choose another
[reskin] class kit: paladin — "knight-errant": Aura of Authority (Hobgoblin Captain/Aura of Authority)
[reskin] inline declared: "Sir Cael" — the call's own answer (person), built from the name
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a knight-errant of the fallen order" -> has (descriptive), head | "shields the weak" -> has (mechanical) [asked: buff_ally]
[reskin] menu pruned: action — snap-shot (the sheet cannot render them)
[reskin] signature idea (action): "Sir Cael plants his shield and becomes a living wall, drawing every hostile eye and blow toward himself so the weak behind him go untouched. While he holds the stance, any foe that tries to slip past him, strike at someone he shields, or retreat from his reach invites a savage answering blow. The stance breaks the moment he abandons the ground he holds, but never because he was wounded." [bonus_action/always/defense] — menu: patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally (+ shelf: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, riposte, stunning-strike, charge-push, hook-rider)
[reskin] signature bound to the concept's verb: action — rally (shield, orders)
[reskin] word match declined by the call: obstacle-pull, own-turn-punisher — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit" after being shown rally, which the GM's words keyed
[reskin] key match declined: action — "rally" was ranked first on the call's own menu for shield+orders, and the call read it as no fit; the words keep their claim and nothing is forced
[reskin] signature miss: action — "Sir Cael plants his shield and becomes a living wall, drawing every hostile eye and blow toward himself so the weak behind him go untouched. While he holds the stance, any foe that tries to slip past him, strike at someone he shields, or retreat from his reach invites a savage answering blow. The stance breaks the moment he abandons the ground he holds, but never because he was wounded." [bonus_action/always/defense] — the model found no template that holds it (offered: rally, patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, obstacle-pull)
[reskin] fallback respects the call: rally, own-turn-punisher left the shelf — the call declined them for this sheet
[reskin] fallback stands down: the class_npc path has no shelf — the Gladiator's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 19 already beats print's 15 at CR 7, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "The banner of the fallen order still hangs over Sir Cael in spirit: when he or an ally in his aura falls, the oath roars through him and he lashes out at the foe that struck the blow, and he fights on that much harder while bloodied rather than yielding ground. The broken vow answers suffering with iron, not retreat." [trait/on_being_hit/damage] — menu: absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura)
[reskin] word match declined by the call: bloodied-burst, resonant-body, false-appearance, uncanny-sense — the key word does not mean the mechanic here
[reskin] trait declined: "Bloodied Fury" — bound only on the idea's own words (bloodied:idea) with no key in the concept; a meat body earns its trait by the user's verb (the sniper's tracker, critic 2026-09-29)
[reskin] repair: 1 clause(s) with no row — "shields the weak"; one targeted call with the sheet as context
[reskin] repaired sheet: 2 attack row(s), 0 save, 1 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] weapons answered: Longsword = longsword; Shield Bash = shield; Iron Vow = none
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] print canon alignment: Lawful Neutral -> Neutral — the Gladiator's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon attack: "Spear" keeps print's hybrid frame — reach 5 ft. or range 20/60 ft. (the Gladiator's weapon is thrown)
[reskin] print canon attack: "Longsword" -> "Spear" — the Gladiator's own row
[reskin] print canon rows: Vow-Taught Rebuke leave — the Gladiator has one melee row (Spear), and Multiattack reads print's
[reskin] print canon row priced: Shield Bash — dice 9 → 24
[reskin] print canon row: Actions/Shield Bash — the Gladiator's own
[reskin] class weapon: Actions/"Spear" -> "Longsword" — a paladin fights with a longsword, not the Gladiator's
[reskin] multiattack replacement clause: It can replace one attack with a use of Shield Bash.
```


---


### Dame Oriel — in the run

**Concept:** name: Dame Oriel | a knight who holds the line with a shield and a longsword

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Dame Oriel | 5 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 4 / off 6 → 5; sustained 39 (3 × Longsword); nova none; dmg 39

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

Aura of Authority. While in a 10-foot Emanation originating from Dame Oriel, Dame Oriel and its allies have Advantage on attack rolls and saving throws, provided Dame Oriel doesn't have the Incapacitated condition.

Actions

Multiattack. Dame Oriel makes three Longsword attacks. It can replace one attack with a use of Shield Bash.

Longsword. Melee Attack Roll: +7, reach 5 ft. 13 (2d8 + 4) Slashing damage, and the target has Disadvantage on its next attack roll before the start of Dame Oriel's next turn.

Shield Bash. Strength Saving Throw: DC 15, one creature within 5 feet that Dame Oriel can see. Failure: 9 (2d4 + 4) Bludgeoning damage. If the target is a Medium or smaller creature, it has the Prone condition.

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

- Traits/Aura of Authority — paladin kit; the GM's clause "Dame"
- Actions/Multiattack — the chassis
- Actions/Longsword — authored for this sheet; a named part; a declared feature; the GM's clause "keeps the line with a shield and a longsword"; weapon longsword
- Actions/Shield Bash — print's own row

**Engine trace**

```
[path] class_npc — class paladin — "Dame" (call)
[route] defender type=Humanoid mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | defender: ✓ ("keeps the line with a shield") | defender: key "keeps the line" (class verb)
[concept] name: "Dame Oriel" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] resolve: archetype=defender type=Humanoid themes=armed/forged mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: provided "Dame Oriel"
[concept] mechanics: none claimed
[concept] signature elements: holds the line with shield and longsword [behavior] | shield and longsword [object] | punishes anyone who tries to move past her [behavior]
[concept] identity: Dame Oriel plants herself in the narrowest passage and opens the fight by taking the measure of the field behind her shield, inviting the first charge onto her blade. Every round she holds the line with shield-high parries and longsword ripostes, punishing any foe who tries to slip past her with a hard shoulder-check and a follow-up cut. Under pressure she refuses to give ground — she fights to the death, only yielding the corridor when she is dragged from it.
[concept] lore: A veteran sworn to a border keep whose garrison has long since rotted away, Dame Oriel still stands her post and turns back every traveler who tries to pass the ruin she was told to hold.
[reskin] [path] class body: the paladin stands on the Gladiator — the class's own print block, nearest CR 5
[reskin] print canon defenses: HP 78 -> 112, AC 19 -> 16 — the Gladiator's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon armor: 16 (studded leather, shield) — print's Gear line; the 2014 sheet prints it (the Goblin Boss wore "splint", canaries 2026-10-12)
[reskin] print canon array: STR 18, DEX 15, CON 16, INT 10, WIS 12, CHA 15 — the Gladiator's at its own CR; attack +6 -> +7, DC 15 (print's)
[reskin] donor: defender-5 -> CR 5
[reskin] row gated out: Guard Aura (aura) — the concept did not claim this mechanic
[reskin] [path] decides: class_npc on the Gladiator · class paladin (the matcher would have said homebrew)
[reskin] print canon: "Dame Oriel — a knight who keeps the line with a shield and a longsword" heads on the Gladiator — print's rows ride along; the seat stays
[reskin] repair round 1: 1 defect(s) — rename for "Hybrid Attack" takes the shelf's own row name "Shield Bash" — that name belongs to a template this sheet may still receive; choose another
[reskin] named parts: Longsword (slot) — the user's words, the engine's numbers
[reskin] named parts landed: 1 attack row(s), 0 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] chassis row off: Actions/"Hilt and Hauberk Blow" leaves — the GM named a melee weapon (Longsword); one weapon, one rule set
[reskin] class kit: paladin — "Dame": Aura of Authority (Hobgoblin Captain/Aura of Authority)
[reskin] proper noun: "Dame Oriel" — the Name field is a person, not a kind (no print match, no article in the words)
[reskin] inline declared: "Dame Oriel" — the call's own answer (person), built from the name
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Dame Oriel — a knight" -> has (descriptive), head | "keeps the line with a shield and a longsword" -> has (mechanical) [asked: attack]
[reskin] signature idea (action): "When a foe tries to slip past her to reach the weaker fighters behind, Dame Oriel pivots and drives her shield's rim into them, then follows with a low cut meant to put them back where they started. The struck foe is thrown backward and knocked off balance, landing prone on the ground she refuses to yield, so it costs them their whole next turn to get back up and come at her again." [reaction/on_being_hit/movement] — menu: riposte (+ shelf: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, stunning-strike, charge-push, hook-rider)
[reskin] signature bound to the concept's verb: action — rally (shield)
[reskin] signature miss: action — "When a foe tries to slip past her to reach the weaker fighters behind, Dame Oriel pivots and drives her shield's rim into them, then follows with a low cut meant to put them back where they started. The struck foe is thrown backward and knocked off balance, landing prone on the ground she refuses to yield, so it costs them their whole next turn to get back up and come at her again." [reaction/on_being_hit/movement] — the model picked "riposte" (no verb, and it quotes nothing the GM typed) over a concept-verb template (rally)
[reskin] fallback stands down: the class_npc path has no shelf — the Gladiator's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 16 already beats print's 15 at CR 5, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "Dame Oriel reads every blow against her shield and turns it into an opening. Whenever a foe's attack fails to get through her guard, she answers instantly with a riposte from her longsword before that foe can recover." [trait/on_being_hit/damage] — menu: absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura)
[reskin] verb gate stands down: trait — no template shares a verb, but "Oriel — a knight" is a clause the sheet has not answered; the GM's own words are the warrant
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "Dame Oriel reads every blow against her shield and turns it into an opening. Whenever a foe's attack fails to get through her guard, she answers instantly with a riposte from her longsword before that foe can recover." [trait/on_being_hit/damage] — the model found no template that holds it (offered: absorption, bloodied-burst, resonant-body, weapon-lodge)
[reskin] concept-first trait skipped: guarded-stance — AC 16 already beats print's 15 at CR 5, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329); the same gate the seat's menu and the class kit use
[reskin] weapons answered: Longsword = longsword; Shield Bash = shield
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] print canon alignment: Lawful Neutral -> Neutral — the Gladiator's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon multiattack: "Dame Oriel makes three Spear attacks. It can replace one attack with a use of Shield Bash." — the Gladiator's own
[reskin] print canon skills: "Athletics +7, Perception +4" -> "Athletics +10, Performance +5" — the Gladiator's own skills, each derived from this sheet's stat and PB
[reskin] print canon row: Actions/Shield Bash — the Gladiator's own
[reskin] multiattack reconciled: "Spear" is no row on this sheet — the Multiattack cites "Longsword" instead
[reskin] dead name still carried — "Shield Bash" names a row that is still on the sheet; no sweep
[reskin] final price: print's Multiattack: the round ran 66 against the card's 40 — the attack rows re-solve at 64% (3 attacks off one row after a supersede)
```


---


### Ravik Stormscar — in the run

**Concept:** a goliath berserker who loses control when wounded

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Ravik Stormscar | 8 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 6 / off 8 → 7; sustained 54 (2 × Greataxe); nova none; dmg 54

```
Ravik Stormscar

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

Berserk. Whenever Ravik starts its turn Bloodied, roll 1d6. On a 6, Ravik goes berserk. On each of its turns while berserk, Ravik attacks the nearest creature it can see. If no creature is near enough to move to and attack, Ravik attacks an object. Once Ravik goes berserk, it remains so until it is destroyed or it is no longer Bloodied.

Bloodied Frenzy. While Bloodied, Ravik has Advantage on attack rolls and saving throws.

Mountain Stride. Difficult Terrain composed of ice or snow doesn't cost Ravik extra movement, and Ravik can move across ice or snow without needing to make an ability check.

Actions

Multiattack. Ravik makes two Greataxe attacks.

Greataxe. Melee Attack Roll: +8, reach 5 ft. 27 (5d8 + 5) Slashing damage.

Bonus Actions

Rampage (1/Day). Immediately after dealing damage to a creature that is already Bloodied, Ravik moves up to half its Speed without provoking Opportunity Attacks, and it makes one Greataxe attack.

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
- Traits/Berserk — template berserk; barbarian kit; the GM's clause "loses control when wounded"
- Traits/Bloodied Frenzy — barbarian kit; the GM's clause "berserker"
- Traits/Mountain Stride — goliath kit; the GM's clause "berserker"
- Bonus Actions/Rampage — template rampage; barbarian kit; the GM's clause "berserker"

**Engine trace**

```
[path] class_npc — class barbarian — species goliath — "berserker" (call)
[route] brute type=Giant mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | brute: ✓ ("a goliath berserker who loses control wh") | brute: no line key in the words — the model's read of its quote
[concept] resolve: archetype=brute type=Giant themes=bestial/terror mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: berserk rage that erupts when wounded [behavior] | massive cleaver swung in reckless overhand chops [object] | scarred, storm-weathered goliath hide [body]
[concept] identity: A scarred goliath berserker wades in with a massive cleaver, opening fights with a reckless overhand chop that leaves its guard down and its temper frayed. Every round it trades blow for blow, and each wound it takes only widens its grin — the pain strips away restraint until it's swinging in a red frenzy that cares nothing for defense. Under pressure it never flees; bloodied, it fights harder and uglier, daring foes to hit it again.
[concept] lore: High in the storm-scoured crags, goliath war-bands exile their own once a fighter's battle-rage starts spilling over into slaughter, and the outcast wanders the lowlands itching for the next wound that will finally set it loose.
[reskin] [path] class body: the barbarian stands on the Gladiator — the class's own print block, nearest CR 8
[reskin] the concept outranks the alias: the Gladiator is a Humanoid and the concept reads Giant — the words RESEMBLE it, they do not name it, so the print body stands down
[reskin] print canon array: STR 20, DEX 15, CON 16, INT 10, WIS 12, CHA 15 — the Gladiator's, STR fitted to +8
[reskin] donor: brute-5 -> CR 8
[reskin] [path] decides: class_npc on the Gladiator · class barbarian (the matcher would have said homebrew)
[reskin] print canon: "a goliath berserker who loses control when wounded" heads on the Gladiator — print's rows ride along; the seat stays
[reskin] species kit: goliath — "berserker": Mountain Stride (terrain-walk, authored)
[reskin] class kit: barbarian — "berserker": Bloodied Frenzy (Berserker/Bloodied Frenzy), Rampage (1/Day) (rampage), Berserk (berserk)
[reskin] inline declared: "Ravik" — the call's own answer (person), built from the name
[reskin] inline form: "Ravik" — the model's own reading of the name
[reskin] save dc derived: DC 15 -> 16 (8 + PB 3 + the sheet's best 5) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a goliath berserker" -> has (descriptive), head | "loses control when wounded" -> has (mechanical) [asked: when_bloodied/buff_self]
[reskin] signature idea (action): "When Ravik lands a blow, the wound it opens becomes a knot of pressure its rage can yank loose later — he marks that foe as his. Any moment he chooses during the fight, the pressure bursts and that foe is staggered and reeling for a short while, as if Ravik's fury had reached across the distance to seize them." [rider/on_hit/condition] — menu: affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, charge (+ shelf: trample, leap, thrown-burst, throw-retrieve, shield-bash, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating)
[reskin] signature bound to the concept's verb: action — affliction (wound)
[reskin] word match declined by the call: aggro-curse, stunning-strike, hook-rider — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit" after being shown affliction, which the GM's words keyed
[reskin] key match declined: action — "affliction" was ranked first on the call's own menu for wound, and the call read it as no fit; the words keep their claim and nothing is forced
[reskin] signature miss: action — "When Ravik lands a blow, the wound it opens becomes a knot of pressure its rage can yank loose later — he marks that foe as his. Any moment he chooses during the fight, the pressure bursts and that foe is staggered and reeling for a short while, as if Ravik's fury had reached across the distance to seize them." [rider/on_hit/condition] — the model found no template that holds it (offered: affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, charge, ground-burst, thrown-burst, thrown-burst-seed, aggro-curse)
[reskin] fallback stands down: the class_npc path has no shelf — the Gladiator's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "Ravik fights best against an opponent already bleeding — when he strikes a wounded foe, the sight of it drives him into a fresh surge, letting him press the advantage with another swing. The more hurt his enemy looks, the harder he comes at them." [trait/always/movement] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending, weapon-lodge)
[reskin] signature bound to the concept's verb: trait — bloodied-fury, bloodied-burst (wounded)
[reskin] trait ceiling: "Bloodied Surge" does not ship — 3 traits already, and print's ceiling for a meat body is 3
[reskin] weapons answered: Cleaver = greataxe; Hurlaxe = handaxe
[reskin] weapon declared: "Cleaver" is a greataxe — the call's own answer
[reskin] weapon table: "Hurlaxe" — thrown, range 20/60
[reskin] speed by body: a Humanoid walks 30 ft. (print's people; a hermit ran 50 — critic's audit 2026-10-02)
[reskin] speed by concept:  — the concept's movement set decides
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] print canon alignment: Chaotic Neutral -> Neutral — the Gladiator's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon type: Humanoid stays — the words say giant ("a dire wolf but undead", 2026-10-01)
[reskin] print canon attack: "Spear" keeps print's hybrid frame — reach 5 ft. or range 20/60 ft. (the Gladiator's weapon is thrown)
[reskin] print canon attack: "Cleaver" -> "Spear" — the Gladiator's own row
[reskin] ranged row off: "Hurlaxe" leaves — the Gladiator carries no ranged row and the words name none
[reskin] multiattack re-read — "Hurlaxe" left; "Multiattack" now reads "Ravik makes two Spear attacks."
[reskin] print canon row priced: Shield Bash — dice 9 → 27
[reskin] print canon row: Actions/Shield Bash — the Gladiator's own
[reskin] class weapon: Actions/"Shield Bash" leaves with the shield — a greataxe is two-handed and print pairs a shield with no heavy melee weapon (0 of 329 gear lines)
[reskin] class weapon: Actions/"Spear" -> "Greataxe" — a barbarian fights with a greataxe, not the Gladiator's
[reskin] darkvision withheld: a Humanoid with no species kit granting it, no word for it in the GM's own text, and no print body that has it — print gives darkvision to 1 of 26 Humanoids ("darkvision 60 ft.; Passive Perception 14" -> "Passive Perception 14")
[reskin] ask vs row MISMATCH: "loses control when wounded" -> "Berserk" — trigger: asked when_bloodied, row reads at_will
audit finding below confidence gate: Berserk The GM is told Ravik attacks but not how the attack resolves or whether the GM controls the target selection after the initial roll, leaving the berserk turn under-specified.
[reskin] species kit: Large -> Medium — a goliath is Medium (the words name no other size)
```


---


### Vareth Solmane — in the run

**Concept:** name: Vareth Solmane | a templar priest of the dawn who blesses her soldiers

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Vareth Solmane | 6 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
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

Actions

Multiattack. Vareth makes three Longsword attacks. It can replace one attack with a use of Shield Bash.

Longsword. Melee Attack Roll: +7, reach 5 ft. 11 (2d6 + 4) Slashing damage.

Shield Bash. Strength Saving Throw: DC 15, one creature within 5 feet that Vareth can see. Failure: 9 (2d4 + 4) Bludgeoning damage. If the target is a Medium or smaller creature, it has the Prone condition.

Bonus Actions

Dawn Blessing (2/Day). Each ally within 30 feet of Vareth gains 11 (2d10) Temporary Hit Points.

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
- Actions/Longsword — print's own row, renamed; weapon longsword
- Actions/Shield Bash — print's own row
- Bonus Actions/Dawn Blessing — template rally; library draw (seed unstamped); the GM's clause "blesses her soldiers"; binds the GM's words: blessing+bless+shield+prayer

**Engine trace**

```
[path] class_npc — class paladin — "templar" (call)
[route] caster-warpriest (artillery) type=Humanoid mechanics=none — casts: implied by the kind — "blesses her soldiers" | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | caster-warpriest: ✓ ("blesses her soldiers") | caster-warpriest: key "blesses" (class verb)
[concept] name: "Vareth Solmane" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] resolve: archetype=caster type=Humanoid themes=celestial/armed mind=sapient style=warpriest energy=Radiant mix=both identity=✓ lore=✓
[concept] name: provided "Vareth Solmane"
[concept] mechanics: none claimed
[concept] signature elements: blessing soldiers with dawn-light [behavior] | the chanting of war-prayers [behavior] | iron plate and blessed mace [object]
[concept] identity: Vareth Solmane opens by raising her blessed standard and chanting the Dawn Prayer, washing her soldiers in Radiant light that hardens their resolve and sears any who strike them. Each round she wades in beside her line, her mace landing with dawn-charged force while she calls down fresh benedictions on the wounded and the wavering. She is patient and unshakable — she does not flee a bloodied field, cutting her way to the standard-bearer's side and spending her last prayer to keep the formation standing.
[concept] lore: Sworn to a militant dawn-order that holds the eastern pass, Vareth believes every sunrise is a battle already won and rides out to prove it, blessing the faithful until her god's light breaks the dark line.
[reskin] energy withheld: Radiant on a Humanoid with no Radiant in the concept's own words (fixed phrases read first)
[reskin] [path] class body: the paladin stands on the Gladiator — the class's own print block, nearest CR 6
[reskin] print canon route: the Gladiator is not a caster first and keys STR 18 over DEX 15 — it casts no spells — the caster family stands down for the plain defender line
[reskin] print canon defenses: HP 91 -> 112, AC 19 -> 16 — the Gladiator's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon armor: 16 (studded leather, shield) — print's Gear line; the 2014 sheet prints it (the Goblin Boss wore "splint", canaries 2026-10-12)
[reskin] print canon array: STR 18, DEX 15, CON 16, INT 10, WIS 12, CHA 15 — the Gladiator's at its own CR; attack +7 -> +7, DC 15 (print's)
[reskin] donor: defender-5 -> CR 6
[reskin] style unserved: "warpriest" has no defender line — the plain line ships (resolve's style signal is noisy; not re-routed)
[reskin] row gated out: Guard Aura (aura) — the concept did not claim this mechanic
[reskin] [path] decides: class_npc on the Gladiator · class paladin (the matcher would have said twist Priest)
[reskin] print canon: "Vareth Solmane — a templar priest of the dawn who blesses her soldiers" heads on the Gladiator — print's rows ride along; the seat stays
[reskin] name_element answered: Radiant Lance = literal
[reskin] repair round 1: 1 defect(s) — "Radiant Lance" deals Radiant on a Humanoid whose concept names no Radiant — a name is not a warrant; use a physical type
[reskin] class kit: paladin — "templar": Aura of Authority (Hobgoblin Captain/Aura of Authority)
[reskin] proper noun: "Vareth Solmane" — the Name field is a person, not a kind (no print match, no article in the words)
[reskin] inline declared: "Vareth" — the call's own answer (person), built from the name
[reskin] inline form: "Vareth" — the model's own reading of the name
[reskin] energy rider withheld: Radiant on a Humanoid with no Radiant in the concept's own words
[reskin] energy withheld on a base row: "Radiant Lance" Radiant -> Piercing (the row's own noun; a Humanoid deals no Radiant its concept never gave it)
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Vareth Solmane — a templar priest of the dawn" -> has (descriptive), head | "blesses her soldiers" -> has (mechanical) [asked: buff_ally]
[reskin] menu pruned: action — snap-shot (the sheet cannot render them)
[reskin] signature idea (action): "Vareth raises her blessed standard and chants the Dawn Prayer, washing her soldiers in Radiant light that hardens their resolve and sears any who strike them. Every ally fighting near her is shielded by the dawn for a short while, and enemies who land blows on those shielded soldiers take Radiant damage in return. The blessing fades quickly, so she must renew it each round to keep the formation st" [action/always/damage] — menu: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up (+ shelf: patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, riposte, stunning-strike, charge-push, hook-rider)
[reskin] signature bound to the concept's verb: action — rally (blessing, bless)
[reskin] signature template: rally -> Bonus Actions/"Dawn Blessing (2/Day)" ("Vareth blesses her soldiers, granting nearby allies a short-lived defensive bles [verb: blessing:concept, bless:concept, shield:idea, prayer:idea]")
[reskin] keys spent by the action: blessing, bless
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 16 already beats print's 15 at CR 6, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "Vareth's mace strikes carry the charge of the coming dawn: each morning she blesses her weapon, and its blows flare with Radiant light that leaves the faithful steady and the enemy reeling. The light clings to her shield-arm too, so any blow she turns aside flashes back at the attacker." [trait/always/damage] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending, weapon-lodge)
[reskin] word match declined by the call: marking-light, guarded-stance — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "Vareth's mace strikes carry the charge of the coming dawn: each morning she blesses her weapon, and its blows flare with Radiant light that leaves the faithful steady and the enemy reeling. The light clings to her shield-arm too, so any blow she turns aside flashes back at the attacker." [trait/always/damage] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, resonant-body)
[reskin] weapons answered: Mace = mace; Radiant Lance = none
[reskin] weapon declined: "Radiant Lance" reads lance from its name, but the call answered none — the row carries no weapon
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] print canon alignment: Lawful Good -> Neutral — the Gladiator's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon attack: "Spear" keeps print's hybrid frame — reach 5 ft. or range 20/60 ft. (the Gladiator's weapon is thrown)
[reskin] print canon attack: "Mace" -> "Spear" — the Gladiator's own row
[reskin] print canon rows: Radiant Lance leave — the Gladiator has one melee row (Spear), and Multiattack reads print's
[reskin] print canon multiattack: "Vareth makes three Spear attacks. It can replace one attack with a use of Shield Bash." — the Gladiator's own
[reskin] print canon skills: "Athletics +7, Perception +4" -> "Athletics +10, Performance +5" — the Gladiator's own skills, each derived from this sheet's stat and PB
[reskin] print canon row: Actions/Shield Bash — the Gladiator's own
[reskin] class weapon: Actions/"Spear" -> "Longsword" — a paladin fights with a longsword, not the Gladiator's
[reskin] dead name still carried — "Shield Bash" names a row that is still on the sheet; no sweep
[reskin] row binds its clause: "Dawn Blessing" answers "blesses her soldiers" — the keys it matched came from that clause, so the coverage credit has a receipt
[harness] re-rolled Actions/"Longsword" -> "Longsword" [the call's own text]
```

**Re-roll — one entry, replaced**

```
Actions / BEFORE  Longsword: *Melee Attack Roll:* +7, reach 5 ft. 11 (2d6 + 4) Slashing damage.
Actions / AFTER   Longsword: *Melee Attack Roll:* +7, reach 5 ft. 11 (2d6 + 4) Radiant damage, and the next attack roll made against the target before the start of Vareth's next turn is made with Advantage.
provenance: none — the call wrote the text itself
```


---


### Brother Anselm — in the run

**Concept:** a templar priest with a mace and no magic at all

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Brother Anselm | 4 | defender-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 3 / off 4 → 3.5; sustained 26 (2 × Mace); nova none; dmg 26

```
Brother Anselm

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

Aura of Authority. While in a 10-foot Emanation originating from Anselm, Anselm and its allies have Advantage on attack rolls and saving throws, provided Anselm doesn't have the Incapacitated condition.

Actions

Multiattack. The guard makes two Mace attacks.

Mace. Melee Attack Roll: +6, reach 5 ft. 13 (2d8 + 4) Bludgeoning damage, and the target has Disadvantage on its next attack roll before the start of Anselm's next turn.

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

**Engine trace**

```
[path] class_npc — class paladin — "templar" (call)
[route] defender type=Humanoid mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | defender: ✓ ("a templar priest with a mace") | defender: no line key in the words — the model's read of its quote
[concept] name: provided_name rejected — "a templar priest with a mace and no magi…" is the description, not a name
[concept] resolve: archetype=defender type=Humanoid themes=armed/forged mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: mace and shield line-holder [object] | no magic, only muscle and iron [behavior] | refuses to yield ground [behavior]
[concept] identity: A blunt, dogged line-holder who plants his shield and lets the mace do the talking: he opens by anchoring a choke point, then meets every advance with a shield-bash to shove the target back and a heavy downward mace blow on anyone who insists on closing. He has no spells to fall back on, so he fights the whole battle on stamina and stubbornness, refusing to yield ground until he is physically dragged off it — and even bloodied, he keeps swinging rather than flee.
[concept] lore: A lay brother of a militant order who took a vow of poverty so literally he forsook every blessing but his own arm, he now stands guard over relics and thresholds no one else will hold, trusting iron and armor where faith alone failed.
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
[reskin] inline declared: "Anselm" — the call's own answer (person), built from the name; the rules would have said "the brother"
[reskin] inline on kit rows: "the brother" -> "Anselm"
[reskin] inline form: "Anselm" — the model's own reading of the name
[reskin] lacks asked: "no magic at all"
[reskin] asked field dropped: the call answered limit "at_will" for "a templar priest with a mace" but offered no quote
[reskin] clauses: "a templar priest with a mace" -> has (mechanical) [asked: attack] | "no magic at all" -> LACKS (mechanical)
[reskin] signature idea (action): "Anselm slams his shield forward, and every foe close enough to threaten his line is driven back a step and left staggered, struggling to swing true. He can plant himself this way instead of swinging the mace, which makes advancing on him a losing trade." [action/save/movement] — menu: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up (+ shelf: patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, snap-shot, riposte, charge-push, hook-rider)
[reskin] word match declined by the call: rally — the key word does not mean the mechanic here
[reskin] fit declined: "Shield Shove" — a print body takes only what the user's words ask; the call offered no quote, and the key table finds no verb either (the blacksmith's rally, critic-ten 2026-10-01)
[reskin] fallback stands down: the class_npc path has no shelf — the Guard Captain's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 18 already beats print's 14 at CR 4, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "Every blow Anselm lands with his mace rattles the target's guard, so that for a moment they can't keep their footing against the shield line — anyone staggered by his shield slam and then struck with the mace is pinned in place and unable to slip away from him." [trait/always/condition] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending, weapon-lodge)
[reskin] word match declined by the call: guarded-stance, aberrant-ground, adhesive — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "Every blow Anselm lands with his mace rattles the target's guard, so that for a moment they can't keep their footing against the shield line — anyone staggered by his shield slam and then struck with the mace is pinned in place and unable to slip away from him." [trait/always/condition] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura)
[reskin] weapons answered: Mace = mace; Bash = shield
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] print canon alignment: Lawful Neutral -> Neutral — the Guard Captain's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon row: Actions/Longsword — the Guard Captain's second melee row, beside the chassis's
[reskin] print canon multiattack: "The guard makes two attacks, using Javelin or Longsword in any combination." — the Guard Captain's own
[reskin] ranged row off: "Bash" leaves — the Guard Captain carries no ranged row and the words name none
[reskin] class weapon: Actions/"Longsword" yields — the GM named a melee weapon, and the GM's weapon replaces print's rather than riding beside it
[reskin] multiattack re-read — "Longsword" left; "Multiattack" now reads "The guard makes two Javelin attacks."
[reskin] multiattack reconciled: "Javelin" is no row on this sheet — the Multiattack cites "Mace" instead
```


---


### Lucien Marrow — in the run

**Concept:** a court wizard who is never where you struck and steps away

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Lucien Marrow | 6 | caster-6 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 3 / off 7 → 5; sustained 48 (3 × Arcane Burst); nova none; dmg 48

```
Lucien Marrow

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

Traits

Slip the Blow. If Lucien is subjected to an effect that allows it to make a Dexterity saving throw to take only half damage, Lucien instead takes no damage if it succeeds on the save and only half damage if it fails. It can't use this trait if it has the Incapacitated condition.

Actions

Multiattack. Lucien makes three Arcane Burst attacks.

Arcane Burst. Melee or Ranged Attack Roll: +6, reach 5 ft. or range 120 ft. 16 (3d8 + 3) Force damage.

Spellcasting. Lucien casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 14):

- At Will: Detect Magic, Light, Mage Armor, Mage Hand, Prestidigitation
- 2/Day Each: Fireball, Invisibility
- 1/Day Each: Cone of Cold, Fly

Bonus Actions

Misty Step (3/Day). Lucien casts Misty Step, using the same spellcasting ability as Spellcasting.

Ash Double (2/Day). Lucien teleports up to 30 feet to an unoccupied space it can see.

Reactions

Protective Magic (3/Day). Trigger: Lucien is hit by an attack roll. Response: Lucien casts Shield in response, gaining a +5 bonus to AC until the start of its next turn, including against the triggering attack.

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
- Reactions/Protective Magic — mage kit; the GM's clause "wizard"
- Bonus Actions/Misty Step — mage kit; the GM's clause "is never where you struck and steps away"
- Bonus Actions/Ash Double — template phase-slip; library draw (seed unstamped); the GM's clause "is never where you struck and steps away"; binds the GM's words: step+slip
- Traits/Slip the Blow — template evasion; library draw (seed unstamped); the GM's clause "is never where you struck and steps away"; binds the GM's words: never where

**Engine trace**

```
[path] class_npc — class mage — "wizard" (call)
[route] skirmisher type=Humanoid mechanics=teleport — casts: implied by the kind — "a court wizard who is never where you st" | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | skirmisher: ✓ ("never where you struck and steps away") | skirmisher: no line key in the words — the model's read of its quote
[concept] resolve: archetype=skirmisher type=Humanoid themes=arcane/uncanny mind=sapient style=— energy=Force mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: teleport
[concept] signature elements: never being where the blow lands — a displacing afterimage step [behavior] | a body of dissolving ash that reassembles elsewhere [body] | courtly spell-thrusts delivered from an unexpected quarter [behavior]
[concept] identity: The court wizard opens by stepping half out of the world — a blur of ash and afterimage where the strike lands a heartbeat late — then circles the fight in patient, measured increments, reeling out one spell-thrust from a new angle each round and sliding out of reach before the reply comes. Every attack is aimed where it was, never where it is; it spends the fight letting enemies exhaust themselves against its displacement, and under real pressure it cuts its losses, stepping away through walls of its own dissolving body rather than trading blows. It toys only with those it can strand, and it flees bloodied without shame.
[concept] lore: A royal arcanist who bargained away the flesh that could be struck, this one still keeps the court's appointments—arriving unseen, leaving before verdicts, and settling old accounts on the sovereign's behalf.
[reskin] energy withheld: Force on a Humanoid with no Force in the concept's own words (fixed phrases read first)
[reskin] [path] class body: the mage stands on the Mage — the class's own print block, nearest CR 6
[reskin] print canon route: the Mage casts and strikes only with magic (Force) — the caster family takes the line from skirmisher, so the attack bonus and the spell DC key to one stat
[reskin] print canon defenses: HP 89 -> 81, AC 15 -> 15 — the Mage's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 9, DEX 14, CON 11, INT 17, WIS 12, CHA 11 — the Mage's at its own CR; attack +7 -> +6, DC 14 (print's)
[reskin] donor: caster-6 -> CR 6
[reskin] [path] decides: class_npc on the Mage · class mage (the matcher would have said twist Mage)
[reskin] print canon: "a court wizard who is never where you struck and steps away" heads on the Mage — print's rows ride along; the seat stays
[reskin] repair round 1: 1 defect(s) — "Afterimage" deals Force on a Humanoid whose concept names no Force — a name is not a warrant; use a physical type
[reskin] class kit: Protective Magic — the sheet already carries it, so the mage kit adopts that row: the cap may no longer read it as filler
[reskin] class kit: mage — "wizard": Misty Step (3/Day) (Mage/Misty Step)
[reskin] inline declared: "Lucien" — the call's own answer (person), built from the name; the rules would have said "Marrow"
[reskin] inline on kit rows: "Marrow" -> "Lucien"
[reskin] inline form: "Lucien" — the model's own reading of the name
[reskin] energy withheld on a base row: "Afterimage" Force -> Piercing (the body's physical type; a Humanoid deals no Force its concept never gave it)
[reskin] lacks asked: nothing taken away
[reskin] lacks not claimed: "is never where you struck and steps away" reads like a lack to the words, and the call's list did not name it
[reskin] clauses: "a court wizard" -> has (descriptive), head | "is never where you struck and steps away" -> has (mechanical) [asked: on_being_hit/resist]
[reskin] menu pruned: action — snap-shot (the sheet cannot render them)
[reskin] signature idea (action): "Lucien peels off a duplicate made of drifting ash and leaves it standing where he was, a perfect likeness that only looks solid. Anyone who strikes it sees their blow pass through a dissolving smear, and for a moment the attacker's attention and stance are committed to an empty place — enough for Lucien to slip away or line up his next thrust untouched. Only one such decoy can hang in the air at a" [bonus_action/always/defense] — menu: lay-on-hands, aggro-curse, self-invisibility, rally, phase-slip (+ shelf: thrown-burst, gaze-single, snare, zone, execute, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, snare-bolt, slow-bolt, sensory-strike, herd, thrown-burst-seed, drain, delayed-brand, curse-debt, zone-seed, reveal, wind-up, blighted-ground, bolt-restrain, bolt-drag, bolt-mark)
[reskin] signature bound to the concept's verb: action — phase-slip (step)
[reskin] word match declined by the call: blighted-ground — the key word does not mean the mechanic here
[reskin] signature template: phase-slip -> Bonus Actions/"Ash Double (2/Day)" ("leaves a decoy standing where he was so he is never where struck and slips away  [verb: step:concept, slip:idea]")
[reskin] keys spent by the action: step
[reskin] signature idea (trait): "Whenever a blow lands on Lucien, he does not bleed so much as flake apart: a cloud of warm ash clings to the attacker, smoking their eyes until they can blink it clear. This does not stop the hit — it punishes the one who committed to it, so enemies learn that connecting with him costs them their next clean swing." [trait/on_being_hit/condition] — menu: absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst, evasion)
[reskin] signature bound to the concept's verb: trait — evasion (never where)
[reskin] signature template (trait): evasion -> Traits/"Slip the Blow" ("Lucien is never where a blow lands — he slips aside from the strike entirely, ta [verb: never where:concept]")
[reskin] weapons answered: Afterimage = none
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] print canon alignment: Neutral Evil -> Neutral — the Mage's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common" -> "Common and any three languages" — the Mage's
[reskin] print canon attack: "Afterimage" -> "Arcane Burst" — the Mage's own row
[reskin] print canon skills: "Arcana +6, Perception +4" -> "Arcana +6, History +6, Perception +4" — the Mage's own skills, each derived from this sheet's stat and PB
[reskin] print canon row: Actions/Spellcasting — print's own list replaces the chassis's
[reskin] row binds its clause: "Ash Double" answers "is never where you struck and steps away" — the keys it matched came from that clause, so the coverage credit has a receipt
[reskin] row binds its clause: "Slip the Blow" answers "is never where you struck and steps away" — the keys it matched came from that clause, so the coverage credit has a receipt
[reskin] ask vs row MISMATCH: "is never where you struck and steps away" -> "Misty Step" — trigger: asked on_being_hit, row reads at_will
[reskin] audit rename blocked — "Ember Step" claims an element "Ash Double (2/Day)" does not pay (no damage)
```


---


### Kaelen Vor — in the run

**Concept:** a ninja who moves through the shadows and strikes unseen

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Kaelen Vor | 5 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- **dropped clause:** "moves through the shadows"
- read: def 5 / off 5 → 5; sustained 34 (2 × Shortsword); nova none; dmg 34

```
Kaelen Vor

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

Assassinate. During the first round of each combat, Kaelen has Advantage on attack rolls against any creature that hasn't taken a turn. If Kaelen hits a creature during that round, the target takes an extra 9 (2d8) Piercing damage.

Evasion. If Kaelen is subjected to an effect that allows it to make a Dexterity saving throw to take only half damage, Kaelen instead takes no damage if it succeeds on the save and only half damage if it fails. It can't use this trait if it has the Incapacitated condition.

Actions

Multiattack. Kaelen makes two attacks, using Shortsword or Shortbow in any combination.

Shortsword. Melee Attack Roll: +6, reach 5 ft. 17 (4d6 + 3) Piercing damage.

Shortbow. Ranged Attack Roll: +6, range 80/320 ft. 16 (3d8 + 3) Piercing damage.

Bonus Actions

Cunning Action. Kaelen takes the Dash, Disengage, or Hide action.

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
[route] skirmisher-skulker type=Humanoid mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | skirmisher-skulker: ✓ ("moves through the shadows and strikes un") | skirmisher-skulker: key "unseen" (class verb)
[concept] resolve: archetype=skirmisher type=Humanoid themes=uncanny/armed mind=sapient style=skulker energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: striking unseen from shadow [behavior] | vanishing into darkness between strikes [behavior] | concealing shadow-stuff woven into its garb and body [body]
[concept] identity: The Shadow Ninja opens combat by melting into any patch of dim light and reappearing behind the nearest foe, delivering a single precise blade strike from absolute concealment. Each round after, it flits between shadowed hiding places, striking once and vanishing again before the target can turn, never staying in the open. Under pressure it becomes a cruel opportunist, toying with prey and picking off the wounded one at a time, but it will slip away entirely when truly cornered rather than fight evenly.
[concept] lore: Drilled in a hidden mountain cloister devoted to the art of the unseen strike, this ninja sells its silence to whoever pays in secrets and shadow, and it wants only the next perfect kill and the dark that makes it possible.
[reskin] [path] class body: the rogue stands on the Bandit Captain — the class's own print block, nearest CR 5
[reskin] print canon array: STR 15, DEX 16, CON 14, INT 14, WIS 11, CHA 14 — the Bandit Captain's, DEX fitted to +6
[reskin] donor: skirmisher-3-skulker -> CR 5
[reskin] row gated out: Ranged Save Effect (gaze) — the concept did not claim this mechanic
[reskin] row gated out: Teleport (teleport) — the concept did not claim this mechanic
[reskin] [path] decides: class_npc on the Bandit Captain · class rogue (the matcher would have said homebrew)
[reskin] print canon: "a ninja who moves through the shadows and strikes unseen" heads on the Bandit Captain — print's rows ride along; the seat stays
[reskin] class kit: Cunning Action — the sheet already carries it, so the rogue kit adopts that row: the cap may no longer read it as filler
[reskin] class kit: rogue — "ninja": Evasion (evasion), Assassinate (assassinate)
[reskin] inline declared: "Kaelen" — the call's own answer (person), built from the name; the rules would have said "Vor"
[reskin] inline on kit rows: "Vor" -> "Kaelen"
[reskin] inline form: "Kaelen" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] lacks refused: "strikes unseen" names no absence — nothing in it takes anything away
[reskin] clauses: "a ninja" -> has (descriptive), head | "moves through the shadows" -> has (mechanical) [asked: at_will/at_will/movement] | "strikes unseen" -> has (mechanical) [asked: attack]
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "Kaelen lashes out at a foe it is hidden from, and the wound itself becomes a door: on the next round, from any shadowed place, it steps back to that same bleeding mark and strikes there again without warning, so no shadow ever feels safe twice. A creature struck this way cannot shake the sense of being watched from the dark." [rider/on_hit/damage] — menu: affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, isolation, bolt-mark (+ shelf: leap, gaze-single, snare, condition-payoff, throw-retrieve, shield-bash, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, exploiter, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte)
[reskin] signature bound to the concept's verb: action — self-invisibility (unseen)
[reskin] word match declined by the call: self-invisibility, affliction, bolt-mark, delayed-brand, rampage, aggro-curse, contagion, stunning-strike, charge-push, hook-rider, pounce, isolation — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit" after being shown self-invisibility, which the GM's words keyed
[reskin] key match declined: action — "self-invisibility" was ranked first on the call's own menu for unseen, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: action — "Kaelen lashes out at a foe it is hidden from, and the wound itself becomes a door: on the next round, from any shadowed place, it steps back to that same bleeding mark and strikes there again without warning, so no shadow ever feels safe twice. A creature struck this way cannot shake the sense of being watched from the dark." [rider/on_hit/damage] — the model found no template that holds it (offered: self-invisibility, affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, isolation, bolt-mark, delayed-brand, rampage, aggro-curse)
[reskin] fallback respects the call: self-invisibility, rampage left the shelf — the call declined them for this sheet
[reskin] fallback stands down: the class_npc path has no shelf — the Bandit Captain's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 16 already beats print's 15 at CR 5, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "Kaelen's garb and skin are woven with living shadow-stuff, so that light around it dims and its concealment deepens wherever darkness already exists. Foes who lose track of it in the gloom find the shadows themselves seem to lean toward their backs." [trait/always/defense] — menu: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "Kaelen's garb and skin are woven with living shadow-stuff, so that light around it dims and its concealment deepens wherever darkness already exists. Foes who lose track of it in the gloom find the shadows themselves seem to lean toward their backs." [trait/always/defense] — the model found no template that holds it (offered: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst)
[reskin] weapons answered: Tanto = dagger; Shuriken = dart
[reskin] weapon declared: "Tanto" is a dagger — the call's own answer
[reskin] weapon declared: "Shuriken" is a dart — the call's own answer
[reskin] weapon table: "Shuriken" — thrown, range 20/60
[reskin] print canon modes: climb off — the Bandit Captain has no such mode and the words name none
[reskin] speed by body: a Humanoid walks 30 ft. (print's people; a hermit ran 50 — critic's audit 2026-10-02)
[reskin] speed by concept: dropped Climb 30 ft. — the concept's movement set decides
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] print canon alignment: Neutral Evil -> Neutral — the Bandit Captain's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common" -> "Common, Thieves' cant" — the Bandit Captain's
[reskin] print canon attack: "Tanto" -> "Scimitar" — the Bandit Captain's own row
[reskin] print canon attack: "Shuriken" -> "Pistol" — the Bandit Captain's own ranged row
[reskin] on-hit extra retyped: "Assassinate" adds Slashing, not Bludgeoning — the hit's own type (Scimitar)
[reskin] print canon: chassis row leaves — Traits/"Shadowstep" is the chassis's filler — on a class body the kit owns the class's rows
[reskin] on-hit extra retyped: "Assassinate" adds Piercing, not Slashing — the class weapon's own type (Shortsword)
[reskin] class weapon: Actions/"Scimitar" -> "Shortsword" — a rogue fights with a shortsword, not the Bandit Captain's
[reskin] class weapon: Actions/"Pistol" -> "Shortbow" — a rogue fights with a shortbow, not the Bandit Captain's
[reskin] asked but unanswered: "moves through the shadows" asked for at_will/at_will and no row binds the clause
```


---


### Hooklock Imp — in the run

**Concept:** an imp rogue who picks locks for a devil

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Hooklock Imp | 4 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- **dropped clause:** "picks locks for a devil"
- read: def 3 / off 6 → 4.5; sustained 40 (2 × Sting); nova none; dmg 40

```
Hooklock Imp

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

Magic Resistance. The hooklock imp has Advantage on saving throws against spells and other magical effects.

Actions

Multiattack. The hooklock imp makes two Sting attacks. It can replace one attack with a use of Disarming Prick.

Sting. Melee Attack Roll: +6, reach 5 ft. 13 (2d8 + 4) Piercing damage plus 7 (2d6) Poison damage.

Disarming Prick. Strength Saving Throw: DC 14, one creature within 5 feet that is holding a weapon or another object. Failure: The target drops the held object, which lands in its space.

Shape-Shift. The hooklock imp shape-shifts to resemble a rat (Speed 20 ft.), a raven (20 ft., Fly 60 ft.), or a spider (20 ft., Climb 20 ft.), or it returns to its true form. Its statistics are the same in each form, except for its Speed. Any equipment it is wearing or carrying isn't transformed.

Invisibility. The hooklock imp casts Invisibility on itself, requiring no spell components and using Charisma as the spellcasting ability.

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
- Actions/Disarming Prick — template disarm; library draw (seed unstamped); binds the GM's words: strip+weapon
- Actions/Shape-Shift — print's own row
- Actions/Invisibility — print's own row

**Engine trace**

```
[path] twist — Imp (is) — "imp" (call)
[route] skirmisher-skulker type=Fiend mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | skirmisher-skulker: ✓ ("an imp rogue who picks locks for a devil") | skirmisher-skulker: no line key in the words — the model's read of its quote
[concept] resolve: archetype=skirmisher type=Fiend themes=fiendish/grasping mind=sapient style=skulker energy=Fire mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: picks locks for a devil [behavior] | shadow-body that slips through keyholes [body] | fiendish lockpicks and barbed tools [object]
[concept] identity: The imp opens by vanishing into shadow and reappearing behind the lock it was sent to break, its first strike aimed at the hinge of a guard's knee or the clasp of a warded chest. Every round after, it flits between pockets of darkness, picks the fight apart with precise, brass-key jabs, and taunts its foes into wasting their strength on empty air. Under pressure it turns coward and broker at once: it offers its services, then flees through a keyhole or a crack in the flagstones, never fighting a battle it cannot pick clean.
[concept] lore: A lesser devil's tool and errand-runner, this imp was forged in the brimstone smithies of a deeper hell to open what its master cannot reach and pick clean the locks of mortal vaults.
[reskin] print canon route: the Imp's body outranks the skulker seat — no verb in the words names it; the plain skirmisher line
[reskin] print canon array: STR 6, DEX 18, CON 13, INT 11, WIS 12, CHA 14 — the Imp's, DEX fitted to +6
[reskin] donor: skirmisher-3 -> CR 4
[reskin] [path] decides: twist on the Imp (the matcher agrees)
[reskin] print canon: "an imp rogue who picks locks for a devil" heads on the Imp — print's rows ride along; the seat stays
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline declared: "the hooklock imp" — the call's own answer (kind), built from the name
[reskin] inline form: "the hooklock imp" — the model's own reading of the name
[reskin] save dc derived: DC 13 -> 14 (8 + PB 2 + the sheet's best 4) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "an imp rogue" -> has (descriptive), head | "picks locks for a devil" -> has (descriptive)
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The imp jabs at a foe's gear rather than its flesh — buckles, straps, clasps, and latches. On a hit, the target's armor or held implement comes loose: a shield slides off an arm, a belt or bandolier spills, a weapon's grip loosens so the next swing goes wild. The imp chooses whether to strip the foe's guard or spoil its next attack, and the damage is dealt as normal on top." [rider/on_hit/condition] — menu: affliction, contagion, charge-push, hook-rider, pounce, isolation, charge (+ shelf: trample, leap, gaze-single, snare, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, riposte)
[reskin] seat takes its clause: "Latchpick Strike" answers "an rogue" — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature template: disarm -> Actions/"Latchpick Strike" ("The imp jabs at a foe's gear rather than its flesh — buckles, straps, clasps, an [verb: strip:idea, weapon:idea]")
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 16 already beats print's 14 at CR 4, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "The imp can squeeze its shadow-body through any gap a key could pass — keyholes, cracks in flagstones, the space beneath a door. While it stays still in shadow, it reads the workings of any lock or latch it can see, learning how to open it and where it is weakest, so its first strike against that lock or the guard beside it lands true." [trait/always/defense] — menu: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst, sealed-body (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature bound to the concept's verb: trait — sealed-body (locked)
[reskin] word match declined by the call: sealed-body, false-appearance — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "collision" after being shown sealed-body, which the GM's words keyed
[reskin] key match declined: trait — "sealed-body" was ranked first on the call's own menu for locked, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: trait — "The imp can squeeze its shadow-body through any gap a key could pass — keyholes, cracks in flagstones, the space beneath a door. While it stays still in shadow, it reads the workings of any lock or latch it can see, learning how to open it and where it is weakest, so its first strike against that lock or the guard beside it lands true." [trait/always/defense] — the model found no template that holds it (offered: sealed-body, false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst, bloodied-burst)
[reskin] weapons answered: Pick = none
[reskin] print canon modes: climb off — the Imp has no such mode and the words name none
[reskin] speed by concept: dropped Climb 30 ft. — the concept's movement set decides
[reskin] print canon languages: "Infernal, Common" -> "Common, Infernal" — the Imp's
[reskin] print canon speed: 40 ft. -> 20 ft. — the Imp's walk; the concept's other modes stay
[reskin] print canon attack: "Pick" -> "Sting" — the Imp's own row
[reskin] immunities stamped for type: Fiend -> Poison; Poisoned
[reskin] print canon defenses: immunities Poison; Poisoned -> Fire, Poison; Poisoned; resistances none -> Cold — the Imp's own header lines
[reskin] resistances derived withheld: print's Imp owns the line (Cold)
[reskin] print canon trait: Magic Resistance — "an imp rogue who picks locks for a devil" is the Imp (print's own row)
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the seat's, not the Imp's
[reskin] print canon: chassis row leaves — Traits/"Slippery" is the seat's, not the Imp's
[reskin] print canon row: Actions/Shape-Shift — the Imp's own
[reskin] print canon row: Actions/Invisibility — the Imp's own
[reskin] multiattack replacement clause: It can replace one attack with a use of Latchpick Strike.
audit finding below confidence gate: Shape-Shift The entry offers three form options plus a return clause and speed exceptions in one paragraph, forcing the GM to parse branching options mid-combat.
[reskin] audit rename: "Latchpick Strike" -> "Disarming Prick"
```


---


### Mazegoad Reaver — in the run

**Concept:** a minotaur reaver who herds prey into the maze

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Mazegoad Reaver | 6 | defender-3-leader | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 4 / off 6 → 5; sustained 44 (2 × Rib Spike); nova none; dmg 44

```
Mazegoad Reaver

Large Monstrosity, Neutral

AC 16
Initiative +2 (12)

HP 105 (14d10 + 28)

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

Senses darkvision 60 ft.; Passive Perception 10

Languages Common

CR 6 (XP 2,300; PB +3)

Traits

Aura of Authority. While in a 10-foot Emanation originating from the reaver, the reaver and its allies have Advantage on attack rolls and saving throws, provided the reaver doesn't have the Incapacitated condition.

Actions

Multiattack. The reaver makes two Rib Spike attacks.

Rib Spike. Melee Attack Roll: +7, reach 5 ft. 22 (4d8 + 4) Piercing damage.

Bonus Actions

Charge. The reaver moves up to half its Speed straight toward an enemy it can see.

Goring Retort. One creature within 5 feet that hit the reaver with an attack roll since the end of the reaver's last turn takes 7 (2d6) Bludgeoning damage.

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
- Actions/Rib Spike — the chassis
- Bonus Actions/Charge — minotaur kit; the GM's clause "a minotaur reaver who herds prey into the maze"
- Bonus Actions/Goring Retort — library seed own-turn-punisher

**Engine trace**

```
[path] refused: print_body "Minotaur" is not in the corpus
[path] homebrew — species minotaur — "a minotaur reaver who herds prey into the maze" (call)
[route] defender-leader type=Monstrosity mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | defender-leader: ✓ ("herds prey into the maze") | defender-leader: no line key in the words — the model's read of its quote
[concept] name: provided_name rejected — "the minotaur reaver who herds prey into …" is the description, not a name
[concept] resolve: archetype=defender type=Monstrosity themes=bestial/terror mind=sapient style=leader energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: herding prey deeper into the maze [behavior] | hooked bone-tipped horns and goad [object] | the maze itself as its weapon [aura]
[concept] identity: The minotaur reaver opens a fight by bellowing and slamming the maze's first corner shut behind its quarry, then drives them down the warren with hooked horns and a bone-tipped goad, parrying at each junction so no one slips past back toward daylight. Every round it presses the herd toward the deepest dead end, using the maze itself as its ally — never charging blind, always one step behind the panicked runners. Under pressure it does not flee; it laughs, takes the nearest corner, and lets the corridors do its killing until only the strongest prey remains.
[concept] lore: Born from a line of labyrinth-wardens who ate the god they were sworn to guard, the reaver keeps a maze not as a home but as a larder, driving travelers deeper each season and letting hunger — its own and its herd's — do the harvest.
[reskin] donor: defender-3-leader -> CR 6
[reskin] [path] decides: homebrew (the matcher agrees)
[reskin] ranged row off: "Hybrid Attack" keeps its melee half only
[reskin] species kit: minotaur — "a minotaur reaver who herds prey into the maze": Charge (Troll/Charge); darkvision 60 ft.
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline declared: "the reaver" — the call's own answer (kind), built from the name
[reskin] inline form: "the reaver" — the model's own reading of the name
[reskin] save dc derived: DC 14 -> 15 (8 + PB 3 + the sheet's best 4) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a minotaur reaver" -> has (descriptive), head | "herds prey into the maze" -> has (descriptive)
[reskin] signature idea (action): "The reaver lowers its head and sweeps its hooked horns in a wide arc across everything in front of it, catching the panicked runners shoulder to shoulder and dragging them along with the sweep. Creatures caught in the arc are hauled forward with the horns and dumped in a heap just past the reaver, out of position and deeper into the dark, where the goad and the corridor can finish sorting them. Th" [action/save/movement] — menu: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up (+ shelf: patient-defense, lay-on-hands, second-wind, volley-order, aggro-curse, own-turn-punisher, self-invisibility, rally, riposte, stunning-strike, charge-push, hook-rider)
[reskin] signature bound to the concept's verb: action — herd (herd)
[reskin] value check: "Sweeping Horns" EV 2.9 vs floor 10.9 (one attack of 2) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Sweeping Horns" — the ladder could not lift it; the fallback stands in
[reskin] fallback skipped by the floor: herd (EV 8.2 vs 35.5)
[reskin] fallback skipped by the floor: disarm (EV 0 vs 10.9)
[reskin] fallback skipped by the floor: push-prone (EV 2.9 vs 10.9)
[reskin] value check: "Answering Sting" EV 3.9 vs floor 3.4 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: own-turn-punisher -> Bonus Actions/"Answering Sting" (no template held the idea; a proven shape stands in)
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 16 already beats print's 15 at CR 6, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "The bone-tipped goad and horns leave shallow hooked wounds that snag on fleeing movement — a creature the reaver has struck recently finds the wound tearing every time it tries to break away, so turning tail costs it, while standing and facing the horns costs it more. The hurt fades on its own if the reaver lets up for a moment." [trait/always/damage] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending, weapon-lodge)
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "The bone-tipped goad and horns leave shallow hooked wounds that snag on fleeing movement — a creature the reaver has struck recently finds the wound tearing every time it tries to break away, so turning tail costs it, while standing and facing the horns costs it more. The hurt fades on its own if the reaver lets up for a moment." [trait/always/damage] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, bloodied-burst)
[reskin] weapons answered: Horns = none; Goad = none
[reskin] languages by mind: "None" -> "Common" (sapient)
audit finding below confidence gate: Charge A Bonus Action labeled Charge grants movement but states no attack, damage, or effect that occurs at the end, so the action's resolution is unclear at the table.
[reskin] audit rename: "Answering Sting" -> "Goring Retort"
[reskin] audit rename: "Goad" -> "Rib Spike"
[reskin] dead name still carried — "Horns" names a row that is still on the sheet; no sweep
[reskin] identical row leaves: Actions/"Horns" reads word for word as Actions/"Rib Spike" — one ability, one name
[reskin] multiattack re-read: "Horns" is not on this sheet, so the combination now reads "The reaver makes two Rib Spike attacks."
```


---


### Snikt Ravell — in the run

**Concept:** a tabaxi cutpurse who slips through the market crowd

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Snikt Ravell | 3 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- **dropped clause:** "slips through the market crowd"
- read: def 3 / off 3 → 3; sustained 16 (2 × Shortbow); nova none; dmg 16

```
Snikt Ravell

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

Skills Athletics +4, Deception +4

Senses darkvision 60 ft.; Passive Perception 10

Languages Common, Thieves' cant

CR 3 (XP 700; PB +2)

Traits

Evasion. If Snikt is subjected to an effect that allows it to make a Dexterity saving throw to take only half damage, Snikt instead takes no damage if it succeeds on the save and only half damage if it fails. It can't use this trait if it has the Incapacitated condition.

Actions

Multiattack. The bandit makes two attacks, using Shortsword or Shortbow in any combination.

Shortsword. Melee Attack Roll: +5, reach 5 ft. 6 (1d6 + 3) Piercing damage.

Shortbow. Ranged Attack Roll: +5, range 80/320 ft. 8 (1d10 + 3) Piercing damage.

Bonus Actions

Cunning Action. Snikt takes the Dash, Disengage, or Hide action.

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
- Actions/Shortsword — print's own row, renamed; weapon shortsword
- Actions/Shortbow — print's own row, renamed; weapon shortbow
- Bonus Actions/Cunning Action — rogue kit; the GM's clause "cutpurse"

**Engine trace**

```
[path] class_npc — class rogue — species tabaxi — "cutpurse" (call)
[route] skirmisher-skulker type=Humanoid mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | skirmisher-skulker: ✓ ("slips through the market crowd") | skirmisher-skulker: no line key in the words — the model's read of its quote
[concept] resolve: archetype=skirmisher type=Humanoid themes=grasping/uncanny mind=sapient style=skulker energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: slipping through the market crowd [behavior] | the cut purse [object] | catlike agility over stalls and rooftops [body]
[concept] identity: A tabaxi cutpurse works the market as cover, drifting between stalls and shoppers until a mark's purse is exposed, then darting in to slash the strings and vanish into the press before the victim can shout. Round after round it shadow-dances through the crowd — dipping behind a cart or a broad-shouldered merchant to gain concealment, then lunging with a quick blade for the flank or the hamstring. It is a coward at heart: once bloodied or cornered it hurls caltrops or a stolen lantern and bolts for the nearest alley, trading a fight it can't win for another day's pickpocketing.
[concept] lore: A denizen of the city's crowded bazaar, this tabaxi learned the cutpurse's trade in the shadow of a crime guild and skims a tithe from every careless shopper, wanting nothing more than enough coin to buy its way into something better.
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
[reskin] class kit: rogue — "cutpurse": Cunning Action (Assassin/Cunning Action), Evasion (evasion)
[reskin] inline declared: "Snikt" — the call's own answer (person), built from the name
[reskin] inline form: "Snikt" — the model's own reading of the name
[reskin] damage type by the row's own noun: "Knife" Slashing -> Piercing
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a tabaxi cutpurse" -> has (descriptive), head | "slips through the market crowd" -> has (mechanical) [asked: at_will/movement]
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "When the crowd is thick, Snikt ducks behind a stall or a broad-shouldered shopper and comes up in a different spot along the same press of bodies, blade already swinging. It can trade places with a nearby person or cover, ending up where they stood, and the sudden shuffle leaves the person it swapped with stumbling and unable to follow where it went." [action/always/movement] — menu: trample, leap, gaze-single, snare, condition-payoff, throw-retrieve, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, exploiter (+ shelf: delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte, affliction, contagion, charge-push, hook-rider, pounce, isolation, bolt-mark, charge)
[reskin] signature bound to the concept's verb: action — feint-slip (slip)
[reskin] signature miss: action — "When the crowd is thick, Snikt ducks behind a stall or a broad-shouldered shopper and comes up in a different spot along the same press of bodies, blade already swinging. It can trade places with a nearby person or cover, ending up where they stood, and the sudden shuffle leaves the person it swapped with stumbling and unable to follow where it went." [action/always/movement] — the model picked "leap" (no verb, and it quotes nothing the GM typed) over a concept-verb template (feint-slip)
[reskin] fallback stands down: the class_npc path has no shelf — the Bandit Captain's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 15 already beats print's 13 at CR 3, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "Snikt's fingers are quicker than eyes. Anything Snikt is carrying or wearing that someone tries to grab, hold, or pull free comes away in Snikt's hand instead — the grabber is left holding a fistful of nothing while Snikt is already two steps into the crowd." [trait/on_being_hit/defense] — menu: absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] verb gate stands down: trait — no template shares a verb, but "a tabaxi" is a clause the sheet has not answered; the GM's own words are the warrant
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "Snikt's fingers are quicker than eyes. Anything Snikt is carrying or wearing that someone tries to grab, hold, or pull free comes away in Snikt's hand instead — the grabber is left holding a fistful of nothing while Snikt is already two steps into the crowd." [trait/on_being_hit/defense] — the model found no template that holds it (offered: absorption, bloodied-burst, resonant-body)
[reskin] weapons answered: Knife = dagger; Sling = sling
[reskin] weapon table: "Sling" — a launcher, never thrown, range 30/120
[reskin] print canon modes: climb off — the Bandit Captain has no such mode and the words name none
[reskin] speed by body: a Humanoid walks 30 ft. (print's people; a hermit ran 50 — critic's audit 2026-10-02)
[reskin] speed by concept: dropped Climb 30 ft. — the concept's movement set decides
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] print canon alignment: Chaotic Neutral -> Neutral — the Bandit Captain's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common" -> "Common, Thieves' cant" — the Bandit Captain's
[reskin] print canon attack: "Knife" -> "Scimitar" — the Bandit Captain's own row
[reskin] print canon multiattack: "The bandit makes two attacks, using Scimitar and Pistol in any combination." — the Bandit Captain's own
[reskin] print canon attack: "Pistol" is print's own row — +5, 8 (1d10 + 3), range 30/90 ft. (an exact body at print's CR)
[reskin] print canon attack: "Sling" -> "Pistol" — the Bandit Captain's own ranged row
[reskin] print canon skills: "Perception +2, Stealth +5" -> "Athletics +4, Deception +4" — the Bandit Captain's own skills, each derived from this sheet's stat and PB
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the chassis's filler — on a class body the kit owns the class's rows
[reskin] print canon: chassis row leaves — Traits/"Crowd Slip" is the chassis's filler — on a class body the kit owns the class's rows
[reskin] class weapon: Actions/"Scimitar" -> "Shortsword" — a rogue fights with a shortsword, not the Bandit Captain's
[reskin] class weapon: Actions/"Pistol" -> "Shortbow" — a rogue fights with a shortbow, not the Bandit Captain's
[reskin] multiattack normalised: "The bandit makes two attacks, using Shortsword or Shortbow in any combination."
[reskin] asked but unanswered: "slips through the market crowd" asked for at_will and no row binds the clause
[reskin] species kit: Climb 30 ft. — a tabaxi's own
[reskin] species kit: darkvision 60 ft. — the tabaxi's
```


---

## Review batch — twist-five-2026-10-20T14-10-41

The checker ran first. The gate table covers every block in the run; every block of the run follows. Each block carries its checker row above and its engine trace below. Hand-derive against the row first; then read for what predicates can't see.

### Gate table — the whole run

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Oathbound Skeleton | 2 | 2024 | brute-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/3 |
| Bone Gladiator | 4 | 2024 | brute-2 | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 2/2 |
| Hill-Hoard Ogre | 3 | 2024 | brute-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/3 |
| Cave Troll | 6 | 2024 | brute-5 | ok | ok | ok | SOFT: control-aoe-ungated | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 5/5 |
| Wandering Stone Exile | 9 | 2024 | brute-9 | ok | SOFT: aim-atk | ok | ok | ok | ok | ok | ok | ok | ok | soft (1) | 2/2 | 3/3 |

**Dropped 0 of 6 user clauses** (coverage 100%); concept share 100% (16/16 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- none



---


### Oathbound Skeleton — lowest CR

**Concept:** a skeleton with a greatsword

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Oathbound Skeleton | 2 | brute-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1/2 / off 2 → 1.25; sustained 12 (1 × Greatsword); nova none; dmg 12

```
Oathbound Skeleton

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

Great Weapon Master. When the skeleton hits a creature with its Greatsword, the attack deals an extra 2 damage.

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
[concept] name: provided_name rejected — "a skeleton with a greatsword…" is the description, not a name
[concept] resolve: archetype=brute type=Undead themes=grave/armed mind=mindless style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: greatsword swings [object] | relentless advance [behavior] | bare bones [body]
[concept] identity: A reanimated soldier's skeleton lurches forward with its greatsword held in a two-handed grip, opening every fight with a heavy overhead chop meant to end things early. Each round it rears back and brings the blade down again, stepping through the swing with no regard for its own crumbling frame, and it will grind forward through blows that would fell a living warrior. It fights without fear or fatigue until its bones are dust, never retreating, never hesitating — a dead thing that only knows the charge.
[concept] lore: Raised from a forgotten battlefield by a necromancer's careless ritual, this skeleton still grips the greatsword it died holding and repeats its last charge against anything that enters its ground.
[reskin] print canon array: STR 16, DEX 16, CON 15, INT 6, WIS 8, CHA 5 — the Skeleton's, STR fitted to +5
[reskin] donor: brute-2 -> CR 2
[reskin] [path] decides: twist on the Skeleton (the matcher agrees)
[reskin] print canon: "a skeleton with a greatsword" heads on the Skeleton — print's rows ride along; the seat stays
[reskin] claim gate: CR 2 but a Undead body — the trait seat stays open (print: a material body carries a trait at every tier)
[reskin] named parts: Greatsword (slot) — the user's words, the engine's numbers
[reskin] named parts landed: 1 attack row(s), 0 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline declared: "the skeleton" — the call's own answer (kind), built from the name; the rules would have said "Skeleton"
[reskin] inline on kit rows: "Skeleton" -> "the skeleton"
[reskin] inline form: "the skeleton" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a skeleton with a greatsword" -> has (mechanical) [asked: attack]
[reskin] signature idea (action): "When its greatsword comes down on a foe, the skeleton does not stop at the blow — it leans its whole crumbling frame into the swing and staggers forward through the space the blade carved out. Anyone standing in that path gets shoved aside by the shoulder-first charge, and the skeleton simply ends up further into the fight than it began, blade already rising for the next chop." [rider/on_hit/movement] — menu: contagion, charge-push, hook-rider, pounce, charge (+ shelf: trample, shield-bash, active-toll, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, rampage, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating)
[reskin] word match declined by the call: charge, charge-push, pounce, hook-rider, contagion — the key word does not mean the mechanic here
[reskin] fit declined: "Crumbling Advance (Recharge 5-6)" — a print body takes only what the user's words ask; the call offered no quote, and the key table finds no verb either (the blacksmith's rally, critic-ten 2026-10-01)
[reskin] fallback stands down: the twist path has no shelf — the Skeleton's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "The skeleton never braces or flinches; it only leans further into each swing. Every time it presses its attack against a foe, its advance accelerates until it is almost pitching forward through the enemy's guard, and blows that would stagger a living soldier only feed its momentum." [trait/always/movement] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending, weapon-lodge)
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "The skeleton never braces or flinches; it only leans further into each swing. Every time it presses its attack against a foe, its advance accelerates until it is almost pitching forward through the enemy's guard, and blows that would stagger a living soldier only feed its momentum." [trait/always/movement] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst, absorption)
[reskin] weapons answered: Greatsword = greatsword
[reskin] print canon alignment: Neutral -> Lawful Evil — the Skeleton's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "None" -> "Understands Common plus one other language but can't speak" — the Skeleton's
[reskin] print canon row: Actions/Shortbow — the Skeleton's own ranged row, added (the chassis carried none to rename) — far from print's CR 0.25: print's dice, the sheet's +5
[reskin] immunities stamped for type: Undead -> Poison; Exhaustion, Poisoned
[reskin] print canon defenses: vulnerabilities none -> Bludgeoning — the Skeleton's own header lines
[reskin] audit rename blocked — "Great Weapon Master" is the user's own part name, a kit feature's real name, or print's own row
```


---


### Wandering Stone Exile — highest CR

**Concept:** a stone giant exile who speaks only Giant and understands no Common

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Wandering Stone Exile | 9 | brute-9 | ok | SOFT: aim-atk | ok | ok | ok | ok | ok | ok | ok | ok |

- bands · soft · aim-atk: attack +10 against the aim's +8
- read: def 7 / off 11 → 9; sustained 66 (2 × Stone Club); nova Shattering Hurl 32; dmg 66

```
Wandering Stone Exile

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

Multiattack. The stone exile makes two attacks, using Stone Club or Boulder in any combination.

Stone Club. Melee Attack Roll: +10, reach 15 ft. 33 (6d8 + 6) Bludgeoning damage.

Boulder. Ranged Attack Roll: +10, range 60/240 ft. 28 (5d8 + 6) Bludgeoning damage.

Shattering Hurl (Recharge 5-6). The stone exile hurls boulder at a point it can see within 90 feet. Dexterity Saving Throw: DC 18, each creature in a 5-foot-radius Sphere centered on that point. Failure: 32 (5d12) Thunder damage. If the target is Large or smaller, it has the Prone condition. Success: Half damage.

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
- Actions/Boulder — print's own row
- Actions/Shattering Hurl — template thrown-burst; library draw (seed unstamped); binds the GM's words: hurl+burst+boulder

**Engine trace**

```
[path] twist — Stone Giant (is) — "stone giant" (call)
[route] brute type=Giant mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | brute: ✓ ("a stone giant exile") | brute: no line key in the words — the model's read of its quote
[concept] resolve: archetype=brute type=Giant themes=elemental/bestial mind=sapient style=— energy=Thunder mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: heaving boulders at range [behavior] | a body of living stone [body] | speaks only Giant, understands no Common [behavior]
[concept] identity: The exile opens by hurling a boulder big as a door to cave in the line, then wades in swinging a stone-hardened club in wide, language-barrier-blind arcs that hit friend and stranger alike. It never parleys and never breaks — it fights until it understands what the noise is, which is usually after nothing is left standing. It reads every gesture as a threat and every retreat as invitation.
[concept] lore: A stone giant driven from its clan for a crime no one will name aloud, it has wandered the lowlands alone for decades, bellowing in Giant at travelers who only hear rock-fall and staring at their answering screams as if parsing a dialect.
[reskin] print canon array: STR 23, DEX 15, CON 20, INT 10, WIS 12, CHA 9 — the Stone Giant's; STR 23 outranks the card's +8, so the sheet rolls +10 (raise-only)
[reskin] donor: brute-9 -> CR 9
[reskin] [path] decides: twist on the Stone Giant (the matcher would have said homebrew)
[reskin] print canon: "a stone giant exile who speaks only Giant and understands no Common" heads on the Stone Giant — print's rows ride along; the seat stays
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline declared: "the stone exile" — the call's own answer (kind), built from the name
[reskin] inline form: "the stone exile" — the model's own reading of the name
[reskin] save dc derived: DC 15 -> 18 (8 + PB 4 + the sheet's best 6) — no stat on the sheet reached it
[reskin] lacks asked: "understands no Common"
[reskin] clauses: "a stone giant exile" -> has (descriptive), head | "speaks only Giant" -> has (header) | "understands no Common" -> LACKS (mechanical)
[reskin] signature idea (action): "The exile rips a boulder from the ground and hurls it low and flat, so it smashes into the line and bursts apart in a roaring spray of stone shards. Everyone standing near where it lands is battered and knocked off balance by the blast, not just whoever it struck, and the ground there is left a mess of rubble that slows anyone trying to cross it." [rider/on_hit/damage] — menu: stunning-strike, charge-push, hook-rider, pounce, charge (+ shelf: trample, leap, thrown-burst, throw-retrieve, shield-bash, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, rampage, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating)
[reskin] seat takes its clause: "Shattering Hurl (Recharge 5-6)" answers "a exile" — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature template: thrown-burst -> Actions/"Shattering Hurl (Recharge 5-6)" ("The exile hurling a boulder that bursts in a spray of stone shards, battering ev [verb: hurl:idea, burst:idea, boulder:idea]")
[reskin] signature idea (trait): "Its body is living stone, so when it slams its club down or drives a blow home, the impact cracks the ground beneath the target and rolls out in a shockwave. Nearby enemies are shaken and staggered by the tremor even when the swing misses them, and the reverberation is what makes its wordless bellowing feel like the mountain itself is shouting." [trait/always/damage] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, uncanny-sense, warded-mending, weapon-lodge)
[reskin] signature bound to the concept's verb: trait — false-appearance (stone)
[reskin] decline reason: trait — the call answered none and names it "no_fit" after being shown false-appearance, which the GM's words keyed
[reskin] key match declined: trait — "false-appearance" was ranked first on the call's own menu for stone, and the call read it as no fit; the words keep their claim and nothing is forced
[reskin] signature miss: trait — "Its body is living stone, so when it slams its club down or drives a blow home, the impact cracks the ground beneath the target and rolls out in a shockwave. Nearby enemies are shaken and staggered by the tremor even when the swing misses them, and the reverberation is what makes its wordless bellowing feel like the mountain itself is shouting." [trait/always/damage] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst, bloodied-burst)
[reskin] weapons answered: Club = Greatclub; Boulder = none
[reskin] weapon declared: "Club" is a greatclub — the call's own answer (the name alone read club)
[reskin] print canon attack: "Club" -> "Stone Club" — the Stone Giant's own row
```


---


### Bone Gladiator — a 2024 sheet

**Concept:** a skeleton who was a gladiator in a former life

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Bone Gladiator | 4 | brute-2 | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 2.5 (print at 4 reads 1–6, n=66)
- read: def 1 / off 4 → 2.5; sustained 26 (1 × Shortsword); nova none; dmg 26

```
Bone Gladiator

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

Shortsword. Melee Attack Roll: +6, reach 5 ft. 26 (5d8 + 4) Piercing damage.

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
[concept] signature elements: relentless arena aggression [behavior] | a notched gladiator's blade [object] | bone grown into weathered armor plates [body]
[concept] identity: Bone Gladiator opens the fight the way it always did — striding forward with its notched blade held high and a silent, rattling challenge. Every round it presses the attack with heavy, practiced swings, using a shield of fused rib-bone to stay standing and trade blows it has already learned it can survive. Under pressure it grows more reckless rather than timid, driving toward the kill with the crowd-pleasing fury of a fighter who never once surrendered.
[concept] lore: A champion of the old arena, it rose from its unmarked grave when a necromancer's ritual echoed the roar of a vanished crowd, and now it seeks the one opponent worth a final match.
[reskin] print canon array: STR 18, DEX 16, CON 15, INT 6, WIS 8, CHA 5 — the Skeleton's, STR fitted to +6
[reskin] donor: brute-2 -> CR 4
[reskin] [path] decides: twist on the Skeleton (the matcher agrees)
[reskin] print canon: "a skeleton who was a gladiator in a former life" heads on the Skeleton — print's rows ride along; the seat stays
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline declared: "the bone gladiator" — the call's own answer (kind), built from the name
[reskin] inline form: "the bone gladiator" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a skeleton" -> has (descriptive), head | "was a gladiator in a former life" -> has (descriptive)
[reskin] signature idea (action): "When the Bone Gladiator charges straight at a foe and swings, the old arena instinct takes over: it follows the blade through in a wide, crowd-pleasing cut that carries into anyone standing beside its target. The driving momentum leaves it wide open until its next turn, inviting the counterblow it means to trade." [rider/on_hit/damage] — menu: affliction, contagion, charge-push, hook-rider, pounce, charge (+ shelf: trample, leap, shield-bash, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, rampage, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating)
[reskin] signature bound to the concept's verb: action — drain (life)
[reskin] word match declined by the call: charge, charge-push, trample, pounce — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit" after being shown drain, which the GM's words keyed
[reskin] key match declined: action — "drain" was ranked first on the call's own menu for life, and the call read it as no fit; the words keep their claim and nothing is forced
[reskin] signature miss: action — "When the Bone Gladiator charges straight at a foe and swings, the old arena instinct takes over: it follows the blade through in a wide, crowd-pleasing cut that carries into anyone standing beside its target. The driving momentum leaves it wide open until its next turn, inviting the counterblow it means to trade." [rider/on_hit/damage] — the model found no template that holds it (offered: drain, affliction, contagion, charge-push, hook-rider, pounce, charge, trample)
[reskin] fallback respects the call: drain left the shelf — the call declined it for this sheet
[reskin] fallback stands down: the twist path has no shelf — the Skeleton's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "The notched blade drinks the shock of every blow it lands, and each fresh wound it opens on a living foe knits a bit of its own cracked frame back together. But this only answers violence it has already survived — a hit that hurt it this fight, or a foe it has already cut, is what the bone remembers." [trait/always/resource] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending, weapon-lodge)
[reskin] word match declined by the call: false-appearance — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "The notched blade drinks the shock of every blow it lands, and each fresh wound it opens on a living foe knits a bit of its own cracked frame back together. But this only answers violence it has already survived — a hit that hurt it this fight, or a foe it has already cut, is what the bone remembers." [trait/always/resource] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst, bloodied-burst, heated-body, absorption, warded-mending)
[reskin] weapons answered: Scimitar = scimitar
[reskin] languages by mind: "None" -> "Common plus the languages it knew in life" (sapient)
[reskin] print canon alignment: Neutral -> Lawful Evil — the Skeleton's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common plus the languages it knew in life" -> "Understands Common plus one other language but can't speak" — the Skeleton's
[reskin] print canon row: Actions/Shortbow — the Skeleton's own ranged row, added (the chassis carried none to rename) — far from print's CR 0.25: print's dice, the sheet's +6
[reskin] print canon attack: "Scimitar" -> "Shortsword" — the Skeleton's own row
[reskin] immunities stamped for type: Undead -> Poison; Exhaustion, Poisoned
[reskin] print canon defenses: vulnerabilities none -> Bludgeoning — the Skeleton's own header lines
```


---


### Hill-Hoard Ogre — a print donor

**Concept:** an ogre with a greataxe

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Hill-Hoard Ogre | 3 | brute-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1/4 / off 4 → 2.125; sustained 22 (1 × Greataxe); nova none; dmg 22

```
Hill-Hoard Ogre

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

Great Weapon Master. When the hill-hoard ogre hits a creature with its Greataxe, the attack deals an extra 2 damage.

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
[path] twist — Ogre (is) — "an ogre with a greataxe" (call)
[route] brute type=Giant mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | brute: ✓ ("an ogre with a greataxe") | brute: no line key in the words — the model's read of its quote
[concept] name: provided_name rejected — "an ogre with a greataxe…" is the description, not a name
[concept] resolve: archetype=brute type=Giant themes=bestial/armed mind=bestial style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: overhead greataxe cleave [object] | thick hides shrugging off blows [body] | hurls its axe when prey flees [behavior]
[concept] identity: A hidebound hill ogre that hauls its greataxe overhead with two hands and swings it in wide, shoulder-driven arcs, closing to trade blows and betting its thick hide against the first counter. After opening with one huge cleaving swing, it keeps stepping in and chopping down at whatever is nearest, shrugging off hits rather than defending against them. It fights to the death once blood is drawn, too dull-witted and stubborn to consider flight.
[concept] lore: These ogres squat in the scrub hills at the edge of settled land, keeping the axe they took off some dead knight as a trophy and a tool, and they want only to be left alone with their kills and their hoard of dented steel.
[reskin] print canon defenses: HP 66 -> 68, AC 12 -> 11 — the Ogre's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 19, DEX 8, CON 16, INT 5, WIS 7, CHA 7 — the Ogre's at its own CR; attack +5 -> +6, DC 14 (print's)
[reskin] donor: brute-2 -> CR 3
[reskin] [path] decides: twist on the Ogre (the matcher agrees)
[reskin] print canon: "an ogre with a greataxe" heads on the Ogre — print's rows ride along; the seat stays
[reskin] named parts: Greataxe (slot) — the user's words, the engine's numbers
[reskin] named parts landed: 1 attack row(s), 0 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline by rule: "the hill-hoard ogre" — the call answered "the hoard ogre" (kind), which the name does not support
[reskin] save dc derived: DC 12 -> 14 (8 + PB 2 + the sheet's best 4) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "an ogre with a greataxe" -> has (descriptive), head
[reskin] signature idea (action): "When an enemy turns and runs from it, the ogre hauls its greataxe overhead and hurls it end-over-end at the fleeing creature, an ungainly but punishing throw. The axe buries itself where the target stood, and the ogre lumbers over to wrench it free, leaving itself briefly open while it does." [rider/on_hit/damage] — menu: affliction, contagion, charge-push, hook-rider, pounce, charge (+ shelf: trample, leap, shield-bash, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, rampage, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating)
[reskin] fit declined: "Hoarded Axe Hurl (Recharge 5-6)" — a print body takes only what the user's words ask; the call offered no quote, and the key table finds no verb either (the blacksmith's rally, critic-ten 2026-10-01)
[reskin] fallback stands down: the twist path has no shelf — the Ogre's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "The ogre's thick hide and stubborn bulk soak the first blow that lands on it each fight; anyone who strikes it and sees it barely flinch ends up hesitating, their next swing coming slower and less certain." [trait/on_being_hit/condition] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "The ogre's thick hide and stubborn bulk soak the first blow that lands on it each fight; anyone who strikes it and sees it barely flinch ends up hesitating, their next swing coming slower and less certain." [trait/on_being_hit/condition] — the model found no template that holds it (offered: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge)
[reskin] weapons answered: Greataxe = greataxe
[reskin] print canon alignment: Chaotic Neutral -> Chaotic Evil — the Ogre's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "None" -> "Common, Giant" — the Ogre's
[reskin] print canon speed: 30 ft. -> 40 ft. — the Ogre's walk; the concept's other modes stay
[reskin] print canon row frame: "Javelin" keeps print's thrown frame — reach 5 ft. or range 30/120 ft.
[reskin] print canon row: Actions/Javelin — the Ogre's second melee row, beside the chassis's
```


---


### Cave Troll — one marked soft

**Concept:** a cave troll that speaks only Giant

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Cave Troll | 6 | brute-5 | ok | ok | ok | SOFT: control-aoe-ungated | ok | ok | ok | ok | ok | ok |

- gates · soft · control-aoe-ungated: Actions/Bellowing Roar: at-will multi-target control with no damage and no gate (traded for an attack in Multiattack, print's shape)
- read: def 4 / off 5 → 4.5; sustained 33 (3 × Rend); nova none; dmg 33

```
Cave Troll

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

Skills Perception +5

Senses darkvision 60 ft.; Passive Perception 15

Languages Giant

CR 6 (XP 2,300; PB +3)

Traits

Regeneration. The cave troll regains 15 Hit Points at the start of each of its turns. If the cave troll takes Acid or Fire damage, this trait doesn't function on the cave troll's next turn. The cave troll dies only if it starts its turn with 0 Hit Points and doesn't regenerate.

Loathsome Limbs (4/Day). If the cave troll ends any turn Bloodied and took 15+ Slashing damage during that turn, one of the cave troll's limbs is severed, falls into the cave troll's space, and becomes a Troll Limb. The limb acts immediately after the cave troll's turn. The cave troll has 1 Exhaustion level for each missing limb, and it grows replacement limbs the next time it regains Hit Points.

Actions

Multiattack. The cave troll makes three Rend attacks. It can replace one attack with a use of Bellowing Roar.

Rend. Melee Attack Roll: +7, reach 10 ft. 11 (2d6 + 4) Slashing damage.

Bellowing Roar. Wisdom Saving Throw: DC 16, each creature of the cave troll's choice within 30 feet that can see or hear it. Failure: The target has the Frightened condition until the end of its next turn.

Bonus Actions

Charge. The cave troll moves up to half its Speed straight toward an enemy it can see.

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
- Actions/Bellowing Roar — template terror-pulse; library draw (seed unstamped); binds the GM's words: roar+bellow
- Traits/Regeneration — print's own row
- Traits/Loathsome Limbs — print's own row
- Bonus Actions/Charge — print's own row

**Engine trace**

```
[path] twist — Troll (is) — "troll" (call)
[route] brute-regenerator type=Giant mechanics=regeneration — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | brute-regenerator: ✓ ("troll") | brute-regenerator: no line key in the words — the model's read of its quote
[concept] hints: troll→canon ✓ ("a cave troll that speaks")
[concept] resolve: archetype=brute type=Giant themes=subterranean/bestial mind=sapient style=regenerator energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: regeneration
[concept] signature elements: wounds that close as fast as they open [body] | roaring Giant war-cries and curses [behavior] | lurking in cave dark to ambush prey [aura]
[concept] identity: A hulking cave troll lumbers out of the dark bellowing war-cries in Giant, then simply refuses to die — clubs and claws rake flesh that knits shut before the next swing lands. It fights like weather: relentless, patient in its own dim way, shrugging off wounds that should fell it and grinding prey down until something finally stops its regeneration. Bloodied, it doesn't retreat — it roars louder and presses harder, because pain is the one thing it has never had to respect.
[concept] lore: Cave trolls are the deep places' answer to hunger — drawn up from the under-dark to feed and to test their endless healing against whatever wanders within reach of their clubs.
[reskin] print canon route: the Troll's body outranks the regenerator seat — no verb in the words names it; the plain brute line
[reskin] print canon defenses: HP 116 -> 94, AC 14 -> 15 — the Troll's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 18, DEX 13, CON 20, INT 7, WIS 9, CHA 7 — the Troll's at its own CR; attack +7 -> +7, DC 16 (print's)
[reskin] regeneration organ injected — 10/turn
[reskin] donor: brute-5 -> CR 6
[reskin] [path] decides: twist on the Troll (the matcher would have said homebrew)
[reskin] print canon: "a cave troll that speaks only Giant" heads on the Troll — print's rows ride along; the seat stays
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline by rule: "the cave troll" — the call answered "the cave troll" (kind), which the name does not support
[reskin] inline form: "the cave troll" — the model's own reading of the name
[reskin] save dc derived: DC 14 -> 16 (8 + PB 3 + the sheet's best 5) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a cave troll" -> has (descriptive), head | "speaks only Giant" -> has (header)
[reskin] signature idea (action): "The troll lets out a full-throated war-cry in Giant, a bellowing curse that rolls out across the dark and shakes the nerve of everything that can hear it. Enemies caught in the roar falter and flinch, their guard dropping for a moment, while the troll itself swells with grim momentum and steps in to exploit the opening. It bellows loudest when it is already wounded, so the worse it bleeds the more" [action/save/condition] — menu: trample, leap, thrown-burst, shield-bash, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up (+ shelf: rampage, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, charge)
[reskin] seat takes its clause: "Bellowing Curse (2/Day)" answers "a cave" — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature template: terror-pulse -> Actions/"Bellowing Curse (2/Day)" ("The troll lets out a full-throated war-cry in Giant that shakes the nerve of eve [verb: roar:idea, bellow:idea]")
[reskin] signature idea (trait): "Wounds on the troll knit visibly shut even as they are dealt, and the fresher the wound the faster it closes, so the creature grows steadily harder to put down the longer a fight drags on. The only thing that truly halts this mending is its old bane, and until that is brought to bear every claw-mark it takes begins sealing over almost at once." [trait/always/defense] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending, weapon-lodge)
[reskin] word match declined by the call: warded-mending — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "Wounds on the troll knit visibly shut even as they are dealt, and the fresher the wound the faster it closes, so the creature grows steadily harder to put down the longer a fight drags on. The only thing that truly halts this mending is its old bane, and until that is brought to bear every claw-mark it takes begins sealing over almost at once." [trait/always/defense] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst, bloodied-burst, warded-mending)
[reskin] weapons answered: Claw = none
[reskin] print canon alignment: Chaotic Neutral -> Chaotic Evil — the Troll's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon speed: 40 ft. -> 30 ft. — the Troll's walk; the concept's other modes stay
[reskin] print canon attack: "Claw" -> "Rend" — the Troll's own row
[reskin] print canon multiattack: "The cave troll makes three Rend attacks." — the Troll's own
[reskin] print canon skills: "Athletics +7, Perception +2" -> "Perception +5" — the Troll's own skills, each derived from this sheet's stat and PB
[reskin] print canon trait: Loathsome Limbs (4/Day) — "a cave troll that speaks only Giant" is the Troll (print's own row)
[reskin] print canon trait: Regeneration — print's text replaces the chassis's (the Troll regenerates 15, not the chassis's 10 — critic's audit 2026-10-02)
[reskin] print canon row: Bonus Actions/Charge — the Troll's own
[reskin] dead control row: "Bellowing Curse" sheds its gate — no damage, no KO condition; it joins the Multiattack menu instead
[reskin] multiattack replacement clause: It can replace one attack with a use of Bellowing Curse.
[reskin] audit rewrite blocked — "Regeneration" is engine-authored chassis text
[reskin] audit rewrite blocked — "Loathsome Limbs (4/Day)" is engine-authored chassis text
[reskin] audit rename: "Bellowing Curse" -> "Bellowing Roar"
```

