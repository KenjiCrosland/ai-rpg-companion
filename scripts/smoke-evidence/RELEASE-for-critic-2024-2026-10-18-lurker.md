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

---

# 2024 blocks

## Review batch — sweep-2026-10-18T17-44-39

The checker ran first. The gate table covers every block in the run; every block of the run follows. Each block carries its checker row above and its engine trace below. Hand-derive against the row first; then read for what predicates can't see.

### Gate table — the whole run

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Dire Wolf | 1 | 2024 | skirmisher-1 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |
| Bog Hound | 1 (2014) | 2014 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 2/3 |
| Owlbear | 3 (2014) | 2014 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 2/2 |
| Vesperil the Sexton | 3 | 2024 | lurker-1-phantom | ok | SOFT: aim-hp | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 2/4 |
| Chorus of the Drowned | 5 | 2024 | lurker-5 | ok | ok | FAIL: two-novas | ok | ok | ok | ok | ok | ok | FAIL (1) | 0/1 | 4/4 |
| Scree-Burier | 5 (2014) | 2014 | brute-5-grappler | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | soft (1) | 0/1 | 3/4 |
| Hydra | 8 (2014) | 2014 | brute-5 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok | soft (1) | 1/1 | 5/5 |
| Lashed Siege-Golem | 8 | 2024 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 2/2 |
| Stone Golem | 10 | 2024 | brute-9 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 5/5 |
| Nave Requiem | 10 (2014) | 2014 | lurker-5-phantom | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 2/5 |
| Vampire | 13 (2014) | 2014 | lurker-8 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 9/9 |
| Hive-Priest of Flies | 13 | 2024 | defender-8-leader | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 0/5 |
| Gutforge | 15 | 2024 | brute-13 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 5/5 |
| Glacier Heart | 15 (2014) | 2014 | brute-9-juggernaut | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | soft (1) | 0/1 | 5/5 |
| Adult Red Dragon | 17 (2014) | 2014 | dragon-15 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 7/7 |
| Brass Tyrant | 17 | 2024 | defender-17-leader | ok | SOFT: aim-dpr, hot-offense | ok | ok | ok | ok | ok | ok | ok | soft (1) | 0/1 | 7/8 |
| Pit Fiend | 20 | 2024 | defender-17 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 12/12 |
| Bone Sun Archlich | 20 (2014) | 2014 | caster-21 | ok | ok | ok | SOFT: ko-at-will, rider-no-save | ok | ok | ok | ok | ok | soft (1) | 1/1 | 10/10 |
| Ancient Gold Dragon | 24 (2014) | 2014 | dragon-22 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 9/9 |
| Trenchsong Leviathan | 24 | 2024 | lurker-17-phantom | ok | SOFT: under | ok | ok | ok | ok | ok | ok | ok | soft (1) | 0/1 | 7/9 |
| Owlbear | 3 | 2024 | brute-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 1/1 |
| Goblin Boss | 1 (2014) | 2014 | defender-1 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 2/2 |
| Vashka the Red | 6 | 2024 | defender-5 | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/2 | 3/5 |
| Hive-Husk Scythewretch | 9 | 2024 | brute-8-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 5/6 | 5/5 |
| Black-Iron Warden | 11 (2014) | 2014 | defender-5 | ok | user-set: AC 20 · reads CR 9 | ok | ok | ok | ok | ok | ok | ok | clean | 3/3 | 1/2 |
| Brine-Witch of the Fen | 7 | 2024 | caster-8-binder | FAIL: attack-stat | ok | ok | ok | ok | ok | ok | ok | ok | FAIL (1) | 2/2 | 4/7 |
| Ashvowed Brannor | 6 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 1/1 |
| Ilvareth Dusksong | 12 (2014) | 2014 | caster-12 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok | soft (1) | 1/1 | 3/4 |
| Swarm of Graveknell Hosts | 13 | 2024 | swarm-9 | ok | SOFT: hot-offense | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 4/4 |
| Reliquary Vault-Ooze | 9 (2014) | 2014 | ooze-9 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok | soft (1) | 0/1 | 5/5 |
| Squallchaser Drake | 7 | 2024 | dragon-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 2/2 |
| Gromm Cragbreaker | 9 (2014) | 2014 | brute-9 | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | soft (1) | 2/2 | 0/3 |
| Sethra Reedsong | 5 (2014) | 2014 | skirmisher-3 | ok | SOFT: band | ok | SOFT: ko-at-will | ok | ok | ok | ok | ok | soft (2) | 1/1 | 4/6 |
| Krennik Skullstandard | 4 (2014) | 2014 | skirmisher-3-mounted | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 5/6 |
| Well Drowned | 5 | 2024 | brute-5-grappler | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 3/4 |
| Cinder Stalker | 4 | 2024 | brute-2 | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | soft (1) | 6/8 | 4/4 |
| Meshrin | 8 (2014) | 2014 | skirmisher-8-hurler | ok | user-set: AC 16, HP 120 · reads CR 6.5 | SOFT: lint:hp-formula | ok | ok | ok | ok | ok | ok | soft (1) | 6/7 | 9/9 |
| Skeleton | 6 | 2024 | brute-5 | ok | ok | SOFT: reach | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 4/4 |
| Axehand Sellsword | 5 (2014) | 2014 | skirmisher-3 | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/2 | 3/3 |
| Brother Halric | 3 (2014) | 2014 | skirmisher-3 | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 3/5 |

**Dropped 15 of 65 user clauses** (coverage 77%); concept share 84% (168/199 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- lurker-5 / structure: 1
- caster-8-binder / derivation: 1



---


### Dire Wolf — lowest CR

**Concept:** name: Dire Wolf | with a frost-rimed hide

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Dire Wolf | 1 | skirmisher-1 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1/8 / off 2 → 1.0625; sustained 12 (2 × Bite); nova none; dmg 12

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

Rime-Crusted Hide. A creature that touches the dire wolf or hits it with a melee attack while within 5 feet of it takes 3 (1d6) Cold damage.

Pack Tactics. The dire wolf has Advantage on an attack roll against a creature if at least one of the dire wolf's allies is within 5 feet of the creature and the ally doesn't have the Incapacitated condition.

Actions

Multiattack. The dire wolf makes two Bite attacks.

Bite. Melee Attack Roll: +5, reach 5 ft. 6 (1d6 + 3) Piercing damage. If the target is a Large or smaller creature, it has the Prone condition.

Bonus Actions

Feinting Step. The dire wolf takes the Disengage action, and the next attack roll made against it before the start of its next turn has Disadvantage.

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

- Traits/Rime-Crusted Hide — template heated-body; library draw (seed unstamped); binds the GM's words: frost+touch+rime
- Traits/Pack Tactics — print's own row
- Actions/Multiattack — the chassis
- Actions/Bite — the chassis
- Bonus Actions/Feinting Step — library seed feint-slip

**Engine trace**

```
[route] skirmisher type=Beast mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | skirmisher: ✓ ("Dire Wolf") | skirmisher-skulker: the call read "hide" as not meaning that mechanic here — no override | skirmisher stands: every key that would override it was read as a figure of speech | skirmisher: no line key in the words — the model's read of its quote
[concept] resolve: archetype=skirmisher type=Beast themes=bestial/terror mind=bestial style=— energy=Cold mix=both identity=✓ lore=✓
[concept] name: provided "Dire Wolf"
[concept] mechanics: none claimed
[concept] signature elements: frost-rimed hide that cracks and rimes with the cold [body] | pack tactics: harry, flank, and dart away [behavior]
[concept] identity: The dire wolf of the frost line opens the fight by circling at a lope, letting its packmates pin prey before it darts in to tear at a hamstring and retreat beyond reach. Every round it repeats the dart — a short, punishing rush followed by a withdrawal, its breath fogging and its frost-rimed fur cracking where teeth and claws catch it. Bloodied and outnumbered, it does not break; it drops its packmate's flank and turns on the pursuer, snarling, until it can slip back into the snow's white blind.
[concept] lore: Born of a wolf-litter whelped in a killing winter, its hide never thawed; it shadows the edges of the snowline pack that raised it and drags down any warm-blooded thing that wanders into the cold's reach.
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
[reskin] signature idea (action): "When the wolf rushes a foe and tears into it, the frost in its hide cracks open and breathes a rime of cold into the wound, leaving the prey slowed and stiff as the wolf slips back out of reach. The stiffness lingers until the prey shakes it off or the wolf comes back for another pass, so the pack's harrying turns every bite into a hobbling." [rider/on_hit/movement] — menu: contagion, charge-push, hook-rider, pounce, isolation, charge (+ shelf: snare, shield-bash, lure, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, slow-bolt, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, riposte)
[reskin] signature bound to the concept's verb: action — slow-bolt (frost)
[reskin] word match declined by the call: spew — the key word does not mean the mechanic here
[reskin] value check: "Rime Bite" EV 0.7 vs floor 2.6 (one attack of 2) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Rime Bite" — the ladder could not lift it; the fallback stands in
[reskin] fallback skipped by the floor: slow-bolt (EV 0.7 vs 2.6)
[reskin] value check: "Feinting Step" EV 2.5 vs floor 0.8 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: feint-slip -> Bonus Actions/"Feinting Step" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Striking the wolf breaks the frost crust on its hide, and a spray of rime and freezing air stings whatever weapon or claw touched it, chilling the attacker and leaving the wolf colder and hardier for a moment." [trait/on_being_hit/condition] — menu: heated-body, absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst)
[reskin] signature bound to the concept's verb: trait — heated-body (frost)
[reskin] signature template (trait): heated-body -> Traits/"Rime-Crusted Hide" ("hitting it with a melee attack while within reach of its frost-rimed hide sprays [verb: frost:concept, touch:idea, rime:idea]")
[reskin] weapons answered: Bite = none
[reskin] print canon speed: 30 ft. -> 50 ft. — the Dire Wolf's walk; the concept's other modes stay
[reskin] languages held: None stands — INT 3 on a Beast speaks nothing, whatever the mind read said
[reskin] resistances derived: Cold
[reskin] print canon trait: Pack Tactics — "Dire Wolf — with a frost-rimed hide" is the Dire Wolf (print's own row)
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the seat's, not the Dire Wolf's
[reskin] print canon: chassis row leaves — Traits/"Snowloper" is the seat's, not the Dire Wolf's
[reskin] audit rename blocked — "Frost-Backed Retreat" claims an element "Feinting Step" does not pay (no damage)
```


---


### Trenchsong Leviathan — highest CR

**Concept:** a leviathan of the trench whose song drowns fleets

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Trenchsong Leviathan | 24 | lurker-17-phantom | ok | SOFT: under | ok | ok | ok | ok | ok | ok | ok |

- bands · soft · under: effective HP 437 sits under print at CR 24 (468–546, n=5); the read holds at 25, within print's own ±1
- **dropped clause:** "a leviathan of the trench whose song drowns fleets"
- read: def 23 / off 27 → 25; sustained 216 (3 × Coils + legendary Circle Beneath); nova none; dmg 216

```
Trenchsong Leviathan

Gargantuan Monstrosity, Neutral Evil

AC 18
Initiative +9 (19)

HP 437 (25d20 + 175)

Speed 5 ft., Fly 60 ft. (hover), Swim 30 ft.

MOD
SAVE
STR
6
-2
-2
INT
15
+2
+2
MOD
SAVE
DEX
28
+9
+16
WIS
17
+3
+10
MOD
SAVE
CON
24
+7
+7
CHA
20
+5
+12

Skills Stealth +16, Perception +10

Resistances Bludgeoning, Piercing, Slashing

Immunities Poison; Charmed, Exhaustion, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained

Senses blindsight 120 ft.; Passive Perception 20

Languages Common

CR 24 (XP 62,000; PB +7)

Traits

Amphibious. The leviathan can breathe air and water.

Legendary Resistance (3/Day). If the leviathan fails a saving throw, it can choose to succeed instead.

Incorporeal Movement. The leviathan can move through other creatures and objects as if they were Difficult Terrain. It takes 5 (1d10) Force damage if it ends its turn inside an object.

Sunlight Sensitivity. While in sunlight, the leviathan has Disadvantage on ability checks and attack rolls.

Actions

Multiattack. The leviathan makes three Coils attacks. It can replace one attack with a use of Creeping Dread.

Coils. Melee Attack Roll: +16, reach 5 ft. 22 (3d8 + 9) Bludgeoning damage plus 14 (4d6) Thunder damage.

Creeping Dread. Wisdom Saving Throw: DC 24, one creature within 60 feet. Failure: The target has the Frightened condition until the end of the leviathan's next turn. If the target was already Frightened by this ability, it also takes 38 (11d6) Thunder damage.

Legendary Actions

Legendary Action Uses: 3. Immediately after another creature's turn, the leviathan can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.

Circle Beneath. The leviathan moves up to half its Speed without provoking Opportunity Attacks, and it makes one Coils attack.

Soundless Sink. The leviathan has the Invisible condition until the start of its next turn or until immediately after it makes an attack roll. The leviathan can't take this action again until the start of its next turn.

Quiet the Keel. Wisdom Saving Throw: DC 24, one creature within 30 feet. Failure: The target has the Frightened condition until the end of its next turn.

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
- Traits/Incorporeal Movement — the chassis
- Traits/Sunlight Sensitivity — the chassis
- Actions/Multiattack — the chassis
- Actions/Coils — the chassis
- Actions/Creeping Dread — library seed escalating-dread
- Legendary Actions/Legendary Action Uses: 3 — the chassis
- Legendary Actions/Circle Beneath — the chassis
- Legendary Actions/Soundless Sink — the chassis
- Legendary Actions/Quiet the Keel — the chassis

**Engine trace**

```
[route] lurker-phantom type=Monstrosity mechanics=aura — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | lurker-phantom: ✓ ("whose song drowns fleets") | lurker-phantom: key "drowns" (class verb)
[concept] resolve: archetype=lurker type=Monstrosity themes=aquatic/voice mind=sapient style=phantom energy=Thunder mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: aura
[concept] signature elements: a song that drowns fleets [behavior] | the trench-brine hide [body] | coils that drag ships under [behavior]
[concept] identity: The trench-song leviathan begins by sounding its drowning song across the water, killing crews where they stand before it ever breaches; each round after, it circles beneath the hull and rams and coils to drag the broken mass under. It does not flee — it gathers the crews dying in the water into its song and feeds, patient and gluttonous, until every light on the fleet is out.
[concept] lore: It is a deep-trench monstrosity grown huge on the drowned, and it wants nothing but to hear a fleet go quiet and swallow the crews it sang to death.
[reskin] donor: lurker-17-phantom -> CR 24 (invented — no printed peer)
[reskin] inline declared: "the leviathan" — the call's own answer (kind), built from the name
[reskin] inline form: "the leviathan" — the model's own reading of the name
[reskin] save dc derived: DC 23 -> 24 (8 + PB 7 + the sheet's best 9) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a leviathan of the trench whose song drowns fleets" -> has (mechanical) [asked: save_area]
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The leviathan sings a note that only the drowned answer. Every creature in the water around it that is already hurt, frightened, or struggling to stay afloat hears its own name sung back from below, and those closest to death fall silent and begin sinking — while the leviathan itself seems to grow louder and harder to pin down for each voice it takes. It can only voice this song so often before it" [action/save/condition] — menu: seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, terror-pulse, snare-bolt, slow-bolt, sensory-strike, drain, zone-seed, exploiter, blighted-ground (+ shelf: delayed-brand, patient-defense, self-invisibility, focus, feint-slip, coating, riposte, stunning-strike, charge-push, hook-rider, pounce, isolation)
[reskin] signature bound to the concept's verb: action — lure (song)
[reskin] word match declined by the call: lure — the key word does not mean the mechanic here
[reskin] pick kept on the GM's own words: action — "wail" has no key-table verb, but the call quotes "song drowns fleets" from the description
[reskin] value check: "Trenchsong Reversal (1/Day)" EV 71.3 vs floor 96.3 (the whole Multiattack (3 attacks)) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Trenchsong Reversal (1/Day)" — the ladder could not lift it; the fallback stands in
[reskin] fallback respects the call: lure left the shelf — the call declined it for this sheet
[reskin] value check: "Creeping Dread" EV 26.1 vs floor 19.8 (one attack of 3) — dice 19 → 38
[reskin] library seed drawn: escalating-dread -> Actions/"Creeping Dread" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The leviathan's hide sweats trench brine, and that brine remembers the drowned. Anyone who strikes the leviathan gets soaked in it and finds the water around them turning against them — the brine clings, stings, and pulls at their limbs as though trying to drag them down with the creature's own dead. The deeper the leviathan has already sunk its song into the fight, the harder the brine bites." [trait/on_being_hit/damage] — menu: heated-body, absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, evasion, relentless-pursuit, bound, marking-light, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form)
[reskin] word match declined by the call: absorption, aberrant-ground, bloodied-burst, resonant-body — the key word does not mean the mechanic here
[reskin] trait declined: "Brine Recoil" — a shape fit with no verb match on a Monstrosity body; a meat body earns its trait by a verb
[reskin] weapons answered: Coils = none
[reskin] amphibious by concept: a creature of the deep breathes both (print: the Sea Hag's)
[reskin] speed by concept:  — the concept's movement set decides
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] immunities stamped for type: Monstrosity + donor suite -> Poison; Charmed, Exhaustion, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained
[reskin] resistances derived: Bludgeoning, Piercing, Slashing
[reskin] vulnerability rejected — "Cold" has no warrant in the concept's own text (print's default is none)
[reskin] multiattack replacement clause: It can replace one attack with a use of Creeping Dread.
audit finding below confidence gate: Incorporeal Movement The trait grants movement through an object but never states the resulting state for creatures sharing a space (e.g., does the leviathan end its move inside a creature's space, and what happens then), leaving the GM to improvise an adjudication the block never defines.
```


---


### Vesperil the Sexton — a 2024 sheet

**Concept:** a chapel bell-ringer's ghost that tolls for the dying

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Vesperil the Sexton | 3 | lurker-1-phantom | ok | SOFT: aim-hp | ok | ok | ok | ok | ok | ok | ok |

- bands · soft · aim-hp: HP 44 is 27% under the card's 60
- read: def 2 / off 3 → 2.5; sustained 24 (1 × Bell-Strike); nova none; dmg 24

```
Vesperil the Sexton

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

Incorporeal Movement. Vesperil can move through other creatures and objects as if they were Difficult Terrain. It takes 5 (1d10) Force damage if it ends its turn inside an object.

Sunlight Sensitivity. While in sunlight, Vesperil has Disadvantage on ability checks and attack rolls.

Actions

Bell-Strike. Melee Attack Roll: +5, reach 5 ft. 24 (6d6 + 3) Necrotic damage.

Funeral Toll. Wisdom Saving Throw: DC 13, one creature within 60 feet. Failure: The target has the Frightened condition until the end of Vesperil's next turn. If the target was already Frightened by this ability, it also takes 24 (7d6) Necrotic damage.

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
- Actions/Bell-Strike — the chassis
- Actions/Funeral Toll — library seed escalating-dread

**Engine trace**

```
[route] lurker-phantom type=Undead mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | lurker-phantom: ✓ ("ghost") | lurker-phantom: key "ghost" (class body)
[concept] name: provided_name rejected — "a chapel bell-ringer's ghost who tolls f…" is the description, not a name
[concept] hints: phantom→style ✓ ("a chapel bell-ringer's ghost")
[concept] resolve: archetype=lurker type=Undead themes=grave/voice mind=sapient style=phantom energy=Necrotic mix=energy identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: the death-bell toll that marks the dying [behavior] | a bell-rope and phantom clapper of shadow-stuff [object] | a chill aura of gathering death around its toll [aura]
[concept] identity: The bell-ringer's ghost drifts through chapel stone and tolls a phantom bell whose stroke wracks the dying with necrotic pain, opening a fight from beyond a wall before the living even see it. Each round it tolls again, alternating between its grave-cold bell-strike on the nearest wretch and drifting through masonry to re-toll from a new angle. It is patient and ritual-bound, harrying the wounded and fading toward sanctified shadow when struck by light, but it never abandons a toll it has begun — it fights until the last knell.
[concept] lore: A sexton who rang the death-bell for forty years and was denied a burial in his own chapel, he now tolls for every soul that approaches his church, unable to stop counting the dying.
[reskin] donor: lurker-1-phantom -> CR 3
[reskin] implied class kept: "cleric" on the GM's own words "tolls for the dying" — the key table found none
[reskin] class kit: Divine Aid — the sheet carries no row it could refer to (/^Spellcasting$/)
[reskin] class kit: cleric — "tolls for the dying": nothing to add — the sheet already answers it
[reskin] inline declared: "Vesperil" — the call's own answer (person), built from the name
[reskin] inline form: "Vesperil" — the model's own reading of the name
[reskin] save dc derived: DC 12 -> 13 (8 + PB 2 + the sheet's best 3) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a chapel bell-ringer's ghost" -> has (descriptive), head | "tolls for the dying" -> has (descriptive)
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "Vesperil tolls its phantom bell and every wounded living creature that can hear it feels the stroke land on them as if the bell had become their heartbeat, wracking them with grave-cold pain and leaving a death-mark hanging over them. The toll reaches far past its reach, through walls and closed doors, so the fight begins before anyone sees the ringer. A creature it has already marked tolled for i" [action/save/damage] — menu: leap, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, terror-pulse, snare-bolt, slow-bolt, sensory-strike, drain, zone-seed, blighted-ground (+ shelf: delayed-brand, patient-defense, self-invisibility, focus, feint-slip, coating, riposte, charge-push, hook-rider, pounce, isolation)
[reskin] signature bound to the concept's verb: action — active-toll, sensory-strike (toll, bell)
[reskin] word match declined by the call: active-toll, sensory-strike — the key word does not mean the mechanic here
[reskin] value check: "Grave-Toll Mark" EV 6.6 vs floor 12 (one attack of 1) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Grave-Toll Mark" — the ladder could not lift it; the fallback stands in
[reskin] fallback respects the call: sensory-strike left the shelf — the call declined it for this sheet
[reskin] fallback skipped by the floor: delayed-brand (EV 6.6 vs 12)
[reskin] value check: "Creeping Dread" EV 16.4 vs floor 12 (one attack of 1) — dice 13 → 24
[reskin] library seed drawn: escalating-dread -> Actions/"Creeping Dread" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "A rope of shadow-stuff hangs from Vesperil's grip to a phantom clapper it alone can pull, and it must keep a steady rhythm: as long as it keeps tolling, it can keep a marked dying creature in its count and find that soul through stone. Striking the ringer hard breaks its rhythm, and the phantom rope frays with its concentration before the next toll comes." [trait/on_being_hit/condition] — menu: heated-body, absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, evasion, relentless-pursuit, bound, marking-light, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] signature bound to the concept's verb: trait — bloodied-burst (toll, bell, dying, the dying)
[reskin] word match declined by the call: bloodied-burst, resonant-body, faultless-tracker, adhesive — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit" after being shown bloodied-burst, which the GM's words keyed
[reskin] key match declined: trait — "bloodied-burst" was ranked first on the call's own menu for toll+bell+dying+the dying, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: trait — "A rope of shadow-stuff hangs from Vesperil's grip to a phantom clapper it alone can pull, and it must keep a steady rhythm: as long as it keeps tolling, it can keep a marked dying creature in its count and find that soul through stone. Striking the ringer hard breaks its rhythm, and the phantom rope frays with its concentration before the next toll comes." [trait/on_being_hit/condition] — the model found no template that holds it (offered: bloodied-burst, heated-body, absorption, resonant-body, false-appearance, adhesive, faultless-tracker)
[reskin] concept-first trait skipped: bloodied-burst — the call read its match as a collision (the word is a modifier, or the sheet already answers it)
[reskin] concept-first trait skipped: resonant-body — the call read its match as a collision (the word is a modifier, or the sheet already answers it)
[reskin] weapons answered: Bell-Strike = none; Sorrowful Toll = none
[reskin] languages by mind: "None" -> "Common plus the languages it knew in life" (sapient)
[reskin] immunities stamped for type: Undead + donor suite -> Poison; Charmed, Exhaustion, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained
[reskin] resistances derived: Bludgeoning, Piercing, Slashing
[reskin] vulnerability rejected — "Radiant" has no warrant in the concept's own text (print's default is none)
[reskin] audit rename: "Creeping Dread" -> "Funeral Toll"
```


---


### Brass Tyrant — bands soft

**Concept:** a tyrant of burning brass who rules a city of forges

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Brass Tyrant | 17 | defender-17-leader | ok | SOFT: aim-dpr, hot-offense | ok | ok | ok | ok | ok | ok | ok |

- bands · soft · aim-dpr: damage 140 a round is 26% under the card's 190
- bands · soft · hot-offense: offense alone reads CR 21, 4 over; the HP axis pulls the read to 17.5
- **dropped clause:** "rules a city of forges"
- read: def 14 / off 21 → 17.5; sustained 140 (2 × Slam + legendary Forge Advance); nova none; dmg 140

```
Brass Tyrant

Huge Construct, Lawful Evil

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

Molten Slag Skin. A creature that touches the tyrant or hits it with a melee attack while within 5 feet of it takes 10 (3d6) Fire damage.

Legendary Resistance (3/Day). If the tyrant fails a saving throw, it can choose to succeed instead.

Aura of Authority. While in a 10-foot Emanation originating from the tyrant, the tyrant and its allies have Advantage on attack rolls and saving throws, provided the tyrant doesn't have the Incapacitated condition.

Actions

Multiattack. The tyrant makes two Slam attacks.

Slam. Melee Attack Roll: +12, reach 10 ft. 15 (2d8 + 6) Bludgeoning damage plus 13 (3d8) Fire damage.

Bonus Actions

Forge Decree (2/Day). Each ally within 30 feet of the tyrant gains 14 (4d6) Temporary Hit Points.

Legendary Actions

Legendary Action Uses: 3. Immediately after another creature's turn, the tyrant can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.

Forge Advance. The tyrant moves up to half its Speed without provoking Opportunity Attacks, and it makes one Slam attack.

Bellows Order. One ally of the tyrant that can see or hear it can immediately use its Reaction to move up to half its Speed or to make one attack.

Reignite. The tyrant and each of its allies within 10 feet of it that can see or hear it end the Charmed and Frightened conditions on themselves.

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

- Traits/Molten Slag Skin — template heated-body; library draw (seed unstamped); binds the GM's words: burn+brass+molten+fire+hot
- Traits/Legendary Resistance — the chassis
- Traits/Aura of Authority — the chassis
- Actions/Multiattack — the chassis
- Actions/Slam — the chassis
- Legendary Actions/Legendary Action Uses: 3 — the chassis
- Legendary Actions/Forge Advance — the chassis
- Legendary Actions/Bellows Order — the chassis
- Legendary Actions/Reignite — the chassis
- Bonus Actions/Forge Decree — template rally; library draw (seed unstamped); binds the GM's words: bellows

**Engine trace**

```
[route] defender-leader type=Construct mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | defender-leader: ✓ ("rules a city of forges") | defender-leader: no line key in the words — the model's read of its quote
[concept] name: provided_name rejected — "a tyrant of burning brass who rules a ci…" is the description, not a name
[concept] resolve: archetype=defender type=Construct themes=forged/elemental mind=sapient style=leader energy=Fire mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: molten brass body that sheds white-hot slag when wounded [body] | an aura of burning authority that ignites its forge-legions [aura] | rules a city of forges and commands its smiths as troops [behavior]
[concept] identity: A colossus of molten brass strides at the head of its forge-legions, opening with a bellowed decree that ignites its troops' weapons and sears the air around it, then wades in behind a wall of hammering retainers to crush the strongest foe with a searing molten fist. Every round it anchors its line, parrying blows meant for its underlings and re-igniting their slackening strikes. It never retreats; when bloodied it sheds a skin of white-hot slag and fights harder, punishing any who flee its city of anvils.
[concept] lore: Forged from the spilled metal of a thousand drowned foundries, the Brass Tyrant seized a city of forges and now rules it as a living furnace-king, demanding every smith's fire be fed to its own burning heart.
[reskin] donor: defender-17-leader -> CR 17 (invented — no printed peer)
[reskin] inline declared: "the tyrant" — the call's own answer (kind), built from the name
[reskin] inline form: "the tyrant" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a tyrant of burning brass" -> has (descriptive), head | "rules a city of forges" -> has (descriptive)
[reskin] signature idea (action): "The tyrant bellows a decree that every forge-fire in the city answers: its allies who can hear it feel their weapons blaze hotter, so that for a short while their strikes carry searing fire drawn from the tyrant's own heart. The decree also scorches the air around it, so enemies standing near its forge-legion find their flesh blistering simply from being close to that much heat. It can only call t" [action/always/damage] — menu: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up (+ shelf: patient-defense, lay-on-hands, second-wind, volley-order, aggro-curse, own-turn-punisher, self-invisibility, rally, riposte, stunning-strike, charge-push, hook-rider)
[reskin] value check: "Forge Decree (2/Day)" EV 7.7 vs floor 4.7 (a bonus action (free)) — worth the trade
[reskin] signature template: rally -> Bonus Actions/"Forge Decree (2/Day)" ("The bellows decree grants allies a temporary boost drawn from the tyrant's forge [verb: bellows:idea]")
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 20 already beats print's AC 19 at CR 17, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "When the tyrant is wounded, it sheds a skin of white-hot slag that clings to everything near it: anyone who strikes it or stands beside it is burned by dripping molten brass, and the slag hardens into fresh plating that leaves the tyrant burning hotter than before. The hotter it burns, the more its fire feeds on the wound rather than fading." [trait/on_being_hit/damage] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura)
[reskin] signature bound to the concept's verb: trait — heated-body (burn, brass)
[reskin] word match declined by the call: absorption, resonant-body — the key word does not mean the mechanic here
[reskin] signature template (trait): heated-body -> Traits/"Molten Slag Skin" ("anyone who strikes it is burned by dripping molten brass that clings to them — t [verb: burn:concept, brass:concept, molten:idea, fire:idea, hot:idea]")
[reskin] weapons answered: Slam = none
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] immunities stamped for type: Construct -> Poison; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned
[reskin] resistances derived: Fire
[reskin] vulnerability rejected — "Cold" has no warrant in the concept's own text (print's default is none)
audit finding below confidence gate: Aura of Authority The aura's benefit applies to creatures 'in' the Emanation, but the tyrant is the origin of its own Emanation and the phrasing leaves it unclear whether the origin square counts as affected, making the tyrant's own benefit ambiguous to adjudicate.
```


---


### Vashka the Red — bands soft

**Concept:** name: Vashka the Red | A hobgoblin warlord in lacquered plate who fights from a shield wall and never breaks ranks.

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Vashka the Red | 6 | defender-5 | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 4.5 (print at 6 reads 3–8.5, n=42)
- **dropped clause:** "never breaks ranks"
- read: def 3 / off 6 → 4.5; sustained 44 (2 × Gladius); nova none; dmg 44

```
Vashka the Red

Medium Humanoid, Lawful Evil

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

Languages Common, Goblin

CR 6 (XP 2,300; PB +3)

Traits

Guarded Stance. While Vashka isn't Bloodied, melee attack rolls against it are made with Disadvantage.

Actions

Multiattack. Vashka makes two attacks, using Gladius or Javelin in any combination.

Gladius. Melee Attack Roll: +7, reach 5 ft. 22 (4d8 + 4) Slashing damage.

Javelin. Melee or Ranged Attack Roll: +7, reach 5 ft. or range 30/120 ft. 22 (4d8 + 4) Piercing damage.

Bonus Actions

Bolstering Cry (2/Day). Each ally within 30 feet of Vashka gains 11 (2d10) Temporary Hit Points.

Reactions

Riposte. Trigger: A creature within 5 feet of Vashka misses it with a melee attack roll. Response: Vashka makes one Gladius attack against that creature.

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
- Actions/Multiattack — the chassis
- Actions/Gladius — weapon shortsword
- Actions/Javelin — weapon javelin
- Reactions/Riposte — template riposte; fighter kit; the GM's clause "fights from a shield wall"
- Bonus Actions/Bolstering Cry — library seed rally; the GM's clause "fights from a shield wall"; binds the GM's words: shield

**Engine trace**

```
[route] defender type=Humanoid mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | defender-leader: ✓ ("A hobgoblin warlord") | defender-leader -> defender: the concept's VERB outranks the noun (key "shield wall", class verb) | defender: key "shield wall" (class verb)
[concept] resolve: archetype=defender type=Humanoid themes=armed/terror mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: provided "Vashka the Red"
[concept] mechanics: none claimed
[concept] signature elements: holds an unbroken shield wall [behavior] | lacquered plate and tower shield [object] | punishes anyone who moves past the front rank [behavior]
[concept] identity: Vashka the Red fights shoulder-to-shoulder with his shield wall, locking the line down and daring the enemy to break over him; each round he presses the formation forward in measured, interlocking steps, shield boss and lacquered plate turning aside blows while his blade answers anyone who reaches past the front rank. He never leaves the wall, calmly punishing flankers and overreachers at reach with disciplined counterstrikes. He does not flee; bloodied only tightens his formation, and he fights to the death as the last anchor of his phalanx.
[concept] lore: Vashka is a hobgoblin warlord whose lacquered plate and drilled shield wall guard a conquered pass-road, and he seeks to hold that chokepoint until every rival warband breaks upon it or bends the knee.
[reskin] donor: defender-5 -> CR 6
[reskin] row gated out: Guard Aura (aura) — the concept did not claim this mechanic
[reskin] implied class kept: "fighter" on the GM's own words "fights from a shield wall" — the key table found none
[reskin] class kit: fighter — "fights from a shield wall": Riposte (riposte), Guarded Stance (guarded-stance)
[reskin] proper noun: "Vashka the Red" — the Name field is a person, not a kind (no print match, no article in the words)
[reskin] inline declared: "Vashka" — the call's own answer (person), built from the name
[reskin] inline form: "Vashka" — the model's own reading of the name
[reskin] save dc derived: DC 14 -> 15 (8 + PB 3 + the sheet's best 4) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] asked field dropped: the call answered limit "at_will" for "fights from a shield wall" but offered no quote
[reskin] lacks not claimed: "never breaks ranks" reads like a lack to the words, and the call's list did not name it
[reskin] clauses: "Vashka the Red — A hobgoblin warlord in lacquered plate" -> has (descriptive), head | "fights from a shield wall" -> has (mechanical) [asked: buff_self] | "never breaks ranks" -> has (mechanical) [asked: resist]
[reskin] menu pruned: action — snap-shot (the sheet cannot render them)
[reskin] signature idea (action): "Vashka drives the shield wall forward in a grinding, measured advance. He and every ally beside him who holds the line step together, shoving into the enemy's front and forcing anyone caught in that push to give ground or be bowled over rather than stand firm. It only works while the formation is actually together — a wall with holes in it doesn't move." [action/always/movement] — menu: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up (+ shelf: patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, stunning-strike, charge-push, hook-rider)
[reskin] signature bound to the concept's verb: action — rally (shield)
[reskin] value check: "Shield Wall Shove" EV 2.9 vs floor 10.9 (one attack of 2) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Shield Wall Shove" — the ladder could not lift it; the fallback stands in
[reskin] value check: "Bolstering Cry (2/Day)" EV 6.1 vs floor 3.4 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: rally -> Bonus Actions/"Bolstering Cry (2/Day)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Whenever a blow glances off Vashka's lacquered tower shield, he turns the hit back onto the attacker's own reach — the closer they crowd, the worse they cut themselves on his wall. Anyone who strikes at him from inside his guard finds the shield boss and blade edge waiting where their own swing lands." [trait/on_being_hit/damage] — menu: absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura)
[reskin] word match declined by the call: bound, absorption, bloodied-burst, resonant-body — the key word does not mean the mechanic here
[reskin] trait declined: "Shield Wall Bite" — a shape fit with no verb match on a Humanoid body; a meat body earns its trait by a verb
[reskin] repair: 1 clause(s) with no row — "never breaks ranks"; one targeted call with the sheet as context
[reskin] repair: the answer held no rows — the clauses stay unplaced
[reskin] weapons answered: Gladius = shortsword; Javelin = javelin; Shield Boss = shield
[reskin] weapon declared: "Gladius" is a shortsword — the call's own answer
[reskin] AC lowered for a disadvantage trait: "Guarded Stance" makes this creature harder to hit, so its AC comes down to print's 15 at CR 6 (was 19) — print ships no persistent Disadvantage-to-be-hit trait (0 of 329), and the two together read as a trap
[reskin] row binds its clause: "Bolstering Cry" answers "fights from a shield wall" — the keys it matched came from that clause, so the coverage credit has a receipt
[reskin] audit rename blocked — "Guarded Stance" is the user's own part name, a kit feature's real name, or print's own row
```


---


### Swarm of Graveknell Hosts — bands soft

**Concept:** a swarm of funeral bells that ring themselves over the dying

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Swarm of Graveknell Hosts | 13 | swarm-9 | ok | SOFT: hot-offense | ok | ok | ok | ok | ok | ok | ok |

- bands · soft · hot-offense: offense alone reads CR 17, 4 over; the HP axis pulls the read to 13.5
- read: def 10 / off 17 → 13.5; sustained 90 (1 × Bells); nova Mourning Toll 67; dmg 105

```
Swarm of Graveknell Hosts

Medium Swarm of Tiny Constructs, Unaligned

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

Languages Understands the languages of its creator but can't speak

CR 13 (XP 10,000; PB +5)

Traits

Funeral Peal. A creature that hits the swarm with a melee attack while within 5 feet of it takes 10 (3d6) Thunder damage and has the Deafened condition until the end of its next turn.

Swarm. The swarm can occupy another creature's space and vice versa, and the swarm can move through any opening large enough for a Tiny creature. The swarm can't regain Hit Points or gain Temporary Hit Points.

Actions

Bells. Melee Attack Roll: +10, reach 5 ft. 54 (11d8 + 5) Bludgeoning damage plus 36 (8d8) Necrotic damage, or 27 (6d8) Bludgeoning damage plus 18 (4d8) Necrotic damage if the swarm is Bloodied.

Mourning Toll (Recharge 5-6). Constitution Saving Throw: DC 17, each creature in a 30-foot Emanation originating from the swarm. Failure: 67 (15d8) Thunder damage, and the target has the Deafened condition until the end of its next turn. Success: Half damage only.

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

- Traits/Funeral Peal — template resonant-body; library draw (seed unstamped); the GM's clause "ring themselves over the dying"; binds the GM's words: bell+ring+chime+iron
- Traits/Swarm — the chassis
- Actions/Bells — the chassis
- Actions/Mourning Toll — template active-toll; library draw (seed unstamped); the GM's clause "ring themselves over the dying"; binds the GM's words: ring+bell+toll

**Engine trace**

```
[route] swarm type=Construct mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: on the GM's own words "a swarm of funeral bells" | holds: the call reads none in these words | swarm: ✓ ("a swarm of funeral bells") | swarm: no line key in the words — the model's read of its quote
[concept] hints: swarm→body ✓ ("a swarm of funeral bells")
[concept] resolve: archetype=swarm type=Construct themes=grave/forged mind=mindless style=— energy=Necrotic mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: self-ringing funeral bells [body] | settling over the dying to toll their knell [behavior] | the slow toll that pulls the living toward death [aura]
[concept] identity: A cloud of tarnished funeral bells drifts low over a battlefield and settles on whoever is nearest to death, opening with a slow tolling that saps the will to stand. Every round after, it rings in waves — a chime that dulls the senses, a knell that drags the dying toward silence — while wheeling just out of reach of the still-living. It is a patient, unfeeling instrument: it does not flee when pressed, it simply stops ringing and lets its iron mass fall, and it will follow a wounded creature for miles rather than abandon a death it has already begun to mourn.
[concept] lore: Forged from the bells of a thousand abandoned chapels, the swarm wakes wherever a great dying has soaked into the ground and rings only for those it believes are already promised to the grave.
[reskin] body type: swarm — the body outranks the role (recorded: swarm)
[reskin] donor: swarm-9 -> CR 13 (invented — no printed peer)
[reskin] swarm name stamped: "Graveknell Host" -> "Swarm of Graveknell Hosts" — print names all seven of its swarms "Swarm of X", and the rules text says "the swarm"
[reskin] swarm type stamped: Construct -> Swarm of Tiny Constructs
[reskin] alignment by body: Neutral -> Unaligned — a Constructs at INT 4 (print: Oozes 4/4 Unaligned; every Construct at INT 3 or less, 7/7; the first aligned one is the Flesh Golem at INT 6)
[reskin] inline by rule: "the swarm" — the call answered "the host" (kind), which the name does not support
[reskin] lacks asked: nothing taken away
[reskin] lacks refused: "no eyes" quotes nothing the user typed
[reskin] lacks refused: "carries no weapons" quotes nothing the user typed
[reskin] lacks refused: "no voice" quotes nothing the user typed
[reskin] lacks refused: "does not flee" quotes nothing the user typed
[reskin] clauses: "a swarm of funeral bells" -> has (descriptive), head | "ring themselves over the dying" -> has (descriptive)
[reskin] menu pruned: action — obstacle-pull, pacify, escalating-dread, terror-pulse, snare-bolt, slow-bolt, sensory-strike, disarm, thrown-burst-seed, drain, zone-seed, blighted-ground, delayed-brand, aggro-curse, self-invisibility, focus, feint-slip, coating, phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The swarm chooses a creature it can sense that is already wounded or failing and settles into a slow, mournful tolling aimed only at that one — the sound follows it, not the crowd. As long as the tolling continues, everyone near the chosen creature, including the creature itself, feels the will to stand drain out of them round after round, and the swarm will keep it up indefinitely rather than let" [action/save/condition] — menu: trample, thrown-burst, gaze-single, snare, execute, seal, shield-bash, wail, lure, active-toll, random-ray, ground-burst, spew (+ shelf: patient-defense, second-wind, riposte, stunning-strike, charge-push, hook-rider, pounce, isolation, charge)
[reskin] signature bound to the concept's verb: action — active-toll (ring, bell)
[reskin] value check: "Mourning Toll (Recharge 5-6)" EV 240.1 vs floor 76.1 (the whole Multiattack (1 attacks)) — worth the trade
[reskin] signature template: active-toll -> Actions/"Mourning Toll (Recharge 5-6)" ("Bells ring themselves over a target — a tolling Constitution save that carries t [verb: ring:concept, bell:concept, toll:idea]")
[reskin] keys spent by the action: ring
[reskin] signature idea (trait): "The bells … themselves: whenever the swarm is struck or jostled by anything close enough to touch it, a sympathetic chime rolls out of the iron that dulls the senses of everyone nearby, friend and foe alike — being near the swarm when it is hurt is itself a hazard. The swarm also cannot be silenced; muffling, deafening, or drowning out the sound does nothing to stop the ringing." [trait/on_being_hit/condition] — menu: heated-body, absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, warded-mending, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] signature bound to the concept's verb: trait — bloodied-burst (bell, dying, the dying)
[reskin] word match declined by the call: bloodied-burst, heated-body, uncanny-sense, absorption — the key word does not mean the mechanic here
[reskin] signature template (trait): resonant-body -> Traits/"Funeral Peal" ("Being struck or jostled at close range chimes out of the iron, harming and deafe [verb: bell:concept, ring:idea, chime:idea, iron:idea]")
[reskin] weapons answered: Bells = none
[reskin] languages by mind: "None" -> "Understands the languages of its creator but can't speak" (mindless)
[reskin] immunities stamped for type: Swarm of Tiny Constructs + donor suite -> Poison; Charmed, Exhaustion, Frightened, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained, Stunned
[reskin] resistances derived: Bludgeoning, Piercing, Slashing
[reskin] vulnerability rejected — "Thunder" has no warrant in the concept's own text (print's default is none)
[reskin] nova capped: Actions/Mourning Toll (Recharge 5-6) — 91 over the CR 13 ceiling 67, dice to 67 (15d8)
[reskin] row binds its clause: "Funeral Peal" answers "ring themselves over the dying" — the keys it matched came from that clause, so the coverage credit has a receipt
[reskin] row binds its clause: "Mourning Toll" answers "ring themselves over the dying" — the keys it matched came from that clause, so the coverage credit has a receipt
audit finding below confidence gate: Bells The Bloodied damage clause suggests the swarm is an ordinary creature with HP thresholds, but as a swarm it should be treated as a single entity; more critically, the clause offers no counterplay or escape for a target reduced below the threshold, merely changing damage output mid-combat without any defined trigger for when the Bloodied state is checked or how it interacts with the swarm's immunity to conditions.
audit finding below confidence gate: Swarm This clause is redundant with the statblock's immunities and the general swarm rules, and it conflicts with the Bloodied clause in Bells by implying the swarm can never heal, yet the Bloodied condition suggests it can be reduced and then potentially restored—though no healing is provided—creating a dead rule.
[reskin] audit rewrite blocked — "Swarm" is engine-authored chassis text
```


---


### Well Drowned — bands soft

**Concept:** name: the thing in the well | 

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Well Drowned | 5 | brute-5-grappler | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 3.5 (print at 5 reads 2–8.5, n=52)
- read: def 2 / off 5 → 3.5; sustained 38 (2 × Tendril); nova none; dmg 38

```
Well Drowned

Medium Aberration, Neutral

AC 14
Initiative -1 (9)

HP 97 (13d8 + 39)

Speed 30 ft., Swim 30 ft., Climb 30 ft.

MOD
SAVE
STR
16
+3
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

Skills Athletics +6, Perception +3

Resistances Cold

Senses blindsight 30 ft.; Passive Perception 13

Languages None

CR 5 (XP 1,800; PB +3)

Traits

Barbed Brine. A creature that touches the well drowned or hits it with a melee attack while within 5 feet of it takes 5 (1d10) Cold damage.

Actions

Multiattack. The well drowned makes two Tendril attacks. It can replace one attack with a use of Drowning Lash.

Tendril. Melee Attack Roll: +6, reach 5 ft. 12 (2d8 + 3) Piercing damage plus 7 (2d6) Cold damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 14). While Grappled, the target has the Restrained condition.

Drowning Lash. Strength Saving Throw: DC 14, one creature within 30 feet that is Grappled by the well drowned. Failure: 14 (4d6) Cold damage. Success: Half damage.

Bonus Actions

Whelm. The well drowned whelms one Medium or smaller creature it is grappling. While whelmed, the target has the Blinded and Restrained conditions, has Total Cover against attacks and other effects outside the well drowned, and takes 7 (2d6) Cold damage at the start of each of the well drowned's turns. The well drowned can have only one creature whelmed at a time. If the well drowned takes 15 damage or more in a single turn from the whelmed creature, the well drowned must release the target at the end of that turn, and the target exits Prone in an unoccupied space within 5 feet of the well drowned. If the well drowned dies, a whelmed creature pulls free Prone by using 5 feet of movement.

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
- Actions/Tendril — the chassis
- Actions/Drowning Lash — library seed exploiter
- Bonus Actions/Whelm — binds the GM's words: whelm+swallow+swallows+engulf+engulfs+devour+devours+gulp+smother+entomb+cocoon
- Traits/Barbed Brine — template heated-body; library draw (seed unstamped); binds the GM's words: barbs

**Engine trace**

```
[route] brute-grappler type=Aberration mechanics=grapple, engulf — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: on the GM's own words "the thing in the well" | brute-grappler: ✓ ("the thing in the well") | brute-grappler: no line key in the words — the model's read of its quote
[concept] resolve: archetype=brute type=Aberration themes=aquatic/grasping mind=bestial style=grappler energy=Cold mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: grapple, engulf
[concept] signature elements: dragging prey down into the well [behavior] | brine-slick coils and barbed hide [body] | black well-water and the smell of rot [aura]
[concept] identity: The thing in the well waits at the bottom of its shaft, hauling itself up the wet stone by hooked limbs to snatch prey from the rim with a lashing coil of its rope-thin body and drag it down into the black water. Every round after the first it wraps and reels, choking the breath from a held victim while its barbed hide grinds against them, and it never surfaces fully — it fights from below, in the dark, on its own terms. Wounded, it releases its catch and sinks out of reach rather than trade blows, coming back for whoever leans over the edge.
[concept] lore: Something fell or was thrown into the old well long ago and did not die there, and now it breeds in the cold, lightless water, taking whatever comes to drink and leaving the rope cut and the bucket floating.
[reskin] donor: brute-5-grappler -> CR 5
[reskin] engulf engine: Whelm — the body's own verb
[reskin] inline declared: "the well drowned" — the call's own answer (kind), built from the name
[reskin] inline form: "the well drowned" — the model's own reading of the name
[reskin] save dc derived: DC 13 -> 14 (8 + PB 3 + the sheet's best 3) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "the thing in the well" -> has (descriptive), head
[reskin] signature idea (action): "When the well drowned has a creature gripped, it hauls the both of them toward the water it came from, dragging its catch along the ground toward the well mouth or the deep pool. The victim is pulled with it, not left behind, so being caught means being taken somewhere worse rather than merely held in place." [bonus_action/always/movement] — menu: second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating (+ shelf: swallow, leap, condition-payoff, shield-bash, hook-drag, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, exploiter, affliction, contagion, stunning-strike, charge-push, hook-rider, pounce)
[reskin] word match declined by the call: hook-drag, hook-rider — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit"
[reskin] signature miss: action — "When the well drowned has a creature gripped, it hauls the both of them toward the water it came from, dragging its catch along the ground toward the well mouth or the deep pool. The victim is pulled with it, not left behind, so being caught means being taken somewhere worse rather than merely held in place." [bonus_action/always/movement] — the model found no template that holds it (offered: second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, hook-drag, exploiter, hook-rider, condition-payoff)
[reskin] fallback respects the call: hook-drag left the shelf — the call declined it for this sheet
[reskin] value check: "Opportunist's Lash" EV 10.9 vs floor 9.4 (one attack of 2) — worth the trade
[reskin] library seed drawn: exploiter -> Actions/"Opportunist's Lash" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Its hide is a mat of hooked barbs under slick brine, so anything that wraps itself around the well drowned or presses against it in the dark gets caught and cut, and pulling free only tears the wound wider." [trait/on_being_hit/damage] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] signature template (trait): heated-body -> Traits/"Barbed Brine" ("its hide is a mat of hooked barbs under slick brine, so anything that wraps itse [verb: barbs:idea]")
[reskin] weapons answered: Tendril = none
[reskin] speed by concept: added Climb 30 ft. — the concept's movement set decides
[reskin] languages held: None stands — INT 4 on a Aberration speaks nothing, whatever the mind read said
[reskin] resistances derived: Cold
[reskin] multiattack replacement clause: It can replace one attack with a use of Opportunist's Lash.
[reskin] audit rename: "Opportunist's Lash" -> "Drowning Lash"
```


---


### Cinder Stalker — bands soft

**Concept:**  | role: brute

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Cinder Stalker | 4 | brute-2 | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 2.5 (print at 4 reads 1–6, n=66)
- **dropped clause:** "sweeping arms"
- **dropped clause:** "it toys with prey"
- read: def 1 / off 4 → 2.5; sustained 28 (1 × Sweeping Arm); nova Smoldering Scatter 16; dmg 31

```
Cinder Stalker

Large Monstrosity, Neutral Evil

AC 13
Initiative -1 (9)

HP 82 (11d10 + 22)

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

Senses darkvision 60 ft.; Passive Perception 11

Languages Common

CR 4 (XP 1,100; PB +2)

Traits

Long Reach. The cinder stalker towers over most foes, and its long reach lets it sweep at creatures that others would have to close with first.

Picker's Stride. Difficult Terrain composed of ruin and carrion-fields doesn't cost the cinder stalker extra movement, and the cinder stalker can move across ruin and carrion-fields without needing to make an ability check.

Actions

Sweeping Arm. Melee Attack Roll: +6, reach 5 ft. 17 (3d8 + 4) Bludgeoning damage plus 11 (2d10) Fire damage.

Smoldering Scatter (2/Day). The cinder stalker corrupts a 15-foot-radius area of ground centered on a point within 60 feet. The area is Difficult Terrain until the start of the cinder stalker's next turn. Constitution Saving Throw: DC 14, each creature in the area when it appears. Failure: 16 (3d10) Fire damage. Success: Half damage.

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

- Actions/Sweeping Arm — the chassis
- Actions/Smoldering Scatter — template blighted-ground; library draw (seed unstamped); the GM's clause "retreats bloodied only to circle back along the ruined ground it knows"; binds the GM's words: ground+scorch
- Traits/Long Reach — authored for this sheet; the GM's clause "A towering"
- Traits/Picker's Stride — template terrain-walk; library draw (seed unstamped); the GM's clause "opens combat by hurling smoldering scale-plates or gouting flame from its throat to scatter a herd before wading in to c"; binds the GM's words: wading

**Engine trace**

```
[route] brute type=Monstrosity mechanics=breath, thrown-weapon — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | brute-charger: ✓ ("to scatter a herd before wading in to cr") | brute-grappler: the call read "crush" as not meaning that mechanic here — no override | brute-charger stands: every key that would override it was read as a figure of speech | brute-charger: no line key in the words — the model's read of its quote | brute-charger -> brute: a charger is a mechanic engine and needs a key in the words — the model's read of its quote cannot land it
[concept] synthesis (blank roll): archetype=brute type=Monstrosity themes=grave/bestial mind=sapient style=— lore=✓
[concept] synthesis text: A towering, thin-limbed humanoid scavenger of the Astral Sea, its hide crusted in overlapping scales that smolder faintly where astral drift has baked fire into its joints. It strides ruin and carrion-fields with a picker's patience, then opens combat by hurling smoldering scale-plates or gouting flame from its throat to scatter a herd before wading in to crush the isolated stragglers with lank, sweeping arms. Scheming and patient, it toys with prey and retreats bloodied only to circle back along the ruined ground it knows, but cornered it fights to the death with sudden furious heat. It is scheming (INT 14-16), and it is a scavenger drawn to carrion and ruin.
[concept] signature elements: smoldering scale-hide [body] | carrion-field scavenging [behavior] | throat-gouted flame [object]
[concept] name proposal: Cinder Stalker
[concept] lore: Cast adrift from the Astral Sea when a silver-sailed expedition broke apart, the Cinder Stalker learned to survive by picking the bones of wreck-sites and stranding the living to make more carrion for its hoard.
[reskin] donor: brute-2 -> CR 4
[reskin] name_element answered: Cinder Stalker = imagery
[reskin] inline declared: "the cinder stalker" — the call's own answer (kind), built from the name
[reskin] inline form: "the cinder stalker" — the model's own reading of the name
[reskin] save dc derived: DC 13 -> 14 (8 + PB 2 + the sheet's best 4) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "A towering" -> has (mechanical) [asked: attack] | "thin-limbed humanoid scavenger of the Astral Sea" -> has (mechanical) [asked: attack] | "its hide crusted in overlapping scales that smolder faintly where astral drift has baked fire into its joints" -> has (mechanical) [asked: resist] | "It strides ruin" -> has (mechanical) [asked: movement] | "carrion-fields with a picker's patience" -> has (descriptive) | "opens combat by hurling smoldering scale-plates or gouting flame from its throat to scatter a herd before wading in to c" -> has (mechanical) [asked: attack] | "sweeping arms" -> has (mechanical) [asked: attack] | "Scheming and patient" -> has (descriptive) | "it toys with prey" -> has (mechanical) [asked: attack] | "retreats bloodied only to circle back along the ruined ground it knows" -> has (descriptive) | "but cornered it fights to the death with sudden furious heat" -> has (descriptive) | "It is scheming (INT 14-16)" -> has (descriptive) | "it is a scavenger drawn to carrion and ruin" -> has (mechanical) [asked: attack]
[reskin] signature idea (action): "Coiling back, the Stalker coughs up a gout of smoldering flame that bursts across a wide arc in front of it, scorching everything caught in the spray and leaving the near ground glowing hot for a short while. Anyone who lingers on that baked patch takes a lick of fire each time they end their turn there, and the Stalker always knows exactly where that heat is — it never treads into it carelessly. " [action/save/damage] — menu: trample, leap, shield-bash, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, zone, execute, zone-seed, blighted-ground (+ shelf: delayed-brand, rampage, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, patient-defense, riposte, charge-push, hook-rider, pounce, charge, isolation)
[reskin] signature bound to the concept's verb: action — isolation (isolated, straggler, stragglers)
[reskin] word match declined by the call: herd, isolation, execute, zone — the key word does not mean the mechanic here
[reskin] value check: "Smoldering Scatter (2/Day)" EV 24.8 vs floor 22.8 (the whole Multiattack (1 attacks)) — worth the trade
[reskin] signature template: blighted-ground -> Actions/"Smoldering Scatter (2/Day)" ("The Stalker gouts flame that scorches a wide arc, leaving the near ground glowin [verb: ground:concept, scorch:idea]")
[reskin] keys spent by the action: ground
[reskin] signature idea (trait): "The Stalker marks the … where ruin and carrion lie, and on such baked, scavenged terrain it moves with a picker's sure patience — shrugging off the scrabble of a fight there and stalking its wounded prey across it without slowing. It is drawn to whatever has already begun to fall, and fights with a cold, unhurried certainty among the dead that it lacks on clean, open …." [trait/always/movement] — menu: adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending, weapon-lodge)
[reskin] signature bound to the concept's verb: trait — heated-body (heat, fire, flame)
[reskin] word match declined by the call: heated-body, faultless-tracker, noxious-aura, uncanny-sense, relentless-pursuit, bloodied-fury, bloodied-burst, death-burst, bound — the key word does not mean the mechanic here
[reskin] signature template (trait): terrain-walk -> Traits/"Picker's Stride" ("It strides ruin and carrion-fields with a picker's patience, wading in among the [verb: wading:concept]")
[reskin] repair: 2 clause(s) with no row — "A towering", "thin-limbed humanoid scavenger of the Astral Sea"; one targeted call with the sheet as context
[reskin] repaired sheet: 0 attack row(s), 0 save, 1 trait(s), 0 reaction(s); 1 clause(s) unplaced
[reskin] weapons answered: Sweeping Arm = none; Scalding Gust = none
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] resistances derived: Fire
[reskin] row binds its clause: "Smoldering Scatter" answers "retreats bloodied only to circle back along the ruined ground it knows" — the keys it matched came from that clause, so the coverage credit has a receipt
[reskin] row binds its clause: "Picker's Stride" answers "opens combat by hurling smoldering scale-plates or gouting flame from its throat to scatter a herd before wading in to c" — the keys it matched came from that clause, so the coverage credit has a receipt
[reskin] audit rename: "Towering" -> "Long Reach"
```


---


### Chorus of the Drowned — in the run

**Concept:** name: Air Elemental | that carries stolen voices

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Chorus of the Drowned | 5 | lurker-5 | ok | ok | FAIL: two-novas | ok | ok | ok | ok | ok | ok |

- structure · fail · two-novas: two Recharge novas on one sheet: "Stolen Chorus" and "Whirlwind"
- **dropped clause:** "carries stolen voices"
- read: def 5 / off 8 → 6.5; sustained 46 (2 × Thunderous Slam); nova Whirlwind 28; dmg 46

```
Chorus of the Drowned

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

Senses blindsight 30 ft.; Passive Perception 13

Languages Primordial (Auran)

CR 5 (XP 1,800; PB +3)

Traits

Air Form. The chorus can enter a creature's space and stop there. It can move through a space as narrow as 1 inch without expending extra movement to do so.

Actions

Multiattack. The chorus makes two Thunderous Slam attacks.

Thunderous Slam. Melee Attack Roll: +8, reach 10 ft. 23 (4d8 + 5) Thunder damage.

Stolen Chorus (Recharge 5-6). Constitution Saving Throw: DC 13, each creature in a 15-foot Emanation originating from the chorus. Failure: 18 (4d8) Thunder damage, and the target has the Deafened condition until the end of its next turn. Success: Half damage only.

Whirlwind (Recharge 4-6). Strength Saving Throw: DC 13, one Medium or smaller creature in the chorus's space. Failure: 28 (8d6) Thunder damage, and the target is pushed up to 20 feet straight away from the chorus and has the Prone condition. Success: Half damage only.

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
- Actions/Stolen Chorus — template active-toll; library draw (seed unstamped); binds the GM's words: deafen
- Actions/Whirlwind — print's own row
- Traits/Air Form — print's own row

**Engine trace**

```
[route] lurker-phantom type=Elemental mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | lurker-phantom: ✓ ("Air Elemental") | lurker-phantom: no line key in the words — the model's read of its quote
[concept] resolve: archetype=lurker type=Elemental themes=elemental/voice mind=sapient style=phantom energy=Thunder mix=energy identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: a body of howling storm-wind [body] | stolen voices echoing from within its gusts [aura] | engulfing prey in a suffocating vortex [behavior]
[concept] identity: The Air Elemental drifts into a fight as a howling column of wind threaded with half-heard voices, opening by engulfing the nearest foe in a suffocating vortex that muffles their own cries beneath the stolen words of the dead. Every round after, it circles and harries, flinging compressed blasts of shrieking air at range and closing to smother casters who try to speak aloud, its stolen voices warping into mocking repetitions of spells and screams. It fights to the death once provoked, its temperament cruel and theatrical, toying with prey by echoing their words back at them before it strikes.
[concept] lore: Born from the last breath of a storm-god's scream over a battlefield of the drowned, this elemental hoards the voices of everyone who died crying out and seeks fresh throats to fill its chorus.
[reskin] print canon route: the Air Elemental's body outranks the phantom seat — no verb in the words names it; the plain lurker line
[reskin] print canon defenses: HP 73 -> 90, AC 15 -> 15 — the Air Elemental's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 14, DEX 20, CON 14, INT 6, WIS 10, CHA 6 — the Air Elemental's at its own CR; attack +6 -> +8, DC 13 (print's)
[reskin] donor: lurker-5 -> CR 5
[reskin] row gated out: Teleport (teleport) — the concept did not claim this mechanic
[reskin] print canon: "Air Elemental — that carries stolen voices" heads on the Air Elemental — print's rows ride along; the seat stays
[reskin] inline by rule: "the chorus" — the call answered "the drowned" (kind), which the name does not support
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Air Elemental —" -> has (descriptive), head | "carries stolen voices" -> has (descriptive)
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The chorus fixes its stolen gaze on one foe and hurls a compressed, shrieking blast of storm-wind that carries a voice stolen from that very target's past. The wail forces its way into the victim's throat, so that gasping for air means breathing in the chorus's howl — they are left deafened, their own shouts smothered under the dead's mockery, and reeling until they can steady themselves." [action/save/condition] — menu: leap, gaze-single, execute, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, terror-pulse, snare-bolt, slow-bolt, sensory-strike, drain, zone-seed, blighted-ground (+ shelf: delayed-brand, patient-defense, self-invisibility, focus, feint-slip, coating, riposte, stunning-strike, charge-push, hook-rider, pounce, isolation)
[reskin] value check: "Stolen Chorus (Recharge 5-6)" EV 47.7 vs floor 30.4 (the whole Multiattack (2 attacks)) — worth the trade
[reskin] signature template: active-toll -> Actions/"Stolen Chorus (Recharge 5-6)" ("A shrieking blast of storm-wind that forces itself into the victim's throat, lea [verb: deafen:idea]")
[reskin] signature idea (trait): "Whenever a foe within earshot of the chorus speaks, casts, or cries out, the elemental catches the sound and folds it into its howling column, swelling its chorus with that fresh voice. Each stolen voice makes its next strike hit harder and makes its moaning wind drown out other sounds a little more around it." [trait/always/damage] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, evasion, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature bound to the concept's verb: trait — mimicry (stolen voice, stolen voices, voices)
[reskin] word match declined by the call: mimicry, noxious-aura — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit" after being shown mimicry, which the GM's words keyed
[reskin] key match declined: trait — "mimicry" was ranked first on the call's own menu for stolen voice+stolen voices+voices, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: trait — "Whenever a foe within earshot of the chorus speaks, casts, or cries out, the elemental catches the sound and folds it into its howling column, swelling its chorus with that fresh voice. Each stolen voice makes its next strike hit harder and makes its moaning wind drown out other sounds a little more around it." [trait/always/damage] — the model found no template that holds it (offered: mimicry, false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, evasion, relentless-pursuit, bound, marking-light, undead-fortitude, truth-aura, gaze-aura, assassinate, blurred-form, death-burst, heated-body)
[reskin] concept-first trait skipped: mimicry — the call read its match as a collision (the word is a modifier, or the sheet already answers it)
[reskin] weapons answered: Slam = none
[reskin] speed by concept: dropped Climb 30 ft. — the concept's movement set decides
[reskin] languages by mind: "None" -> "Primordial" (sapient)
[reskin] print canon size: Medium -> Large — the Air Elemental's
[reskin] print canon alignment: Neutral Evil -> Neutral — the Air Elemental's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Primordial" -> "Primordial (Auran)" — the Air Elemental's
[reskin] print canon speed: 30 ft. -> 10 ft. — the Air Elemental's walk; the concept's other modes stay
[reskin] print canon speed: Fly -> 90 ft. — the Air Elemental's own
[reskin] rider folded: "Slam" keeps its budget — the chassis's rider half (7) folds into the base; the Air Elemental pays no damage rider of its own
[reskin] print canon attack: "Slam" -> "Thunderous Slam" — the Air Elemental's own row
[reskin] immunities stamped for type: Elemental -> Poison; Exhaustion, Poisoned
[reskin] print canon defenses: immunities Poison; Exhaustion, Poisoned -> Poison, Thunder; Exhaustion, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained, Unconscious; resistances none -> Bludgeoning, Lightning, Piercing, Slashing — the Air Elemental's own header lines
[reskin] print canon trait: Air Form — "Air Elemental — that carries stolen voices" is the Air Elemental (print's own row)
[reskin] print canon: chassis row leaves — Bonus Actions/"Umbral Step" is the seat's, not the Air Elemental's
[reskin] print canon row priced: Whirlwind (Recharge 4-6) — dice 24 → 28 (nova budget)
[reskin] print canon row: Actions/Whirlwind (Recharge 4-6) — the Air Elemental's own
audit finding below confidence gate: Whirlwind A target in the chorus's space pushed straight away lands exactly at the chorus's reach (10 ft) and the chorus can freely re-enter its space — the forced movement provides no actual separation, but that is resolved; the genuine defect is that the target in the chorus's space has no stated way to know how it got into that space, since nothing describes how a target ends up inside the chorus.
```


---


### Lashed Siege-Golem — in the run

**Concept:** a siege-engine golem of lashed timber that shoulders through walls

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Lashed Siege-Golem | 8 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- **dropped clause:** "shoulders through walls"
- read: def 11 / off 10 → 10.5; sustained 66 (2 × Slam); nova Siege Shoulder 27; dmg 66

```
Lashed Siege-Golem

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

Actions

Multiattack. The siege-golem makes two Slam attacks, or it makes three Slam attacks if it used Hasten this turn.

Slam. Melee Attack Roll: +8, reach 5 ft. 27 (5d8 + 5) Bludgeoning damage plus 6 (1d12) Acid damage, and the target's Hit Point maximum decreases by an amount equal to the Acid damage taken.

Siege Shoulder (Recharge 5-6). The siege-golem moves up to its Speed without provoking Opportunity Attacks and can move through the spaces of Large or smaller creatures. Each creature whose space it enters is targeted once by the following effect. Strength Saving Throw: DC 16. Failure: 27 (6d8) Bludgeoning damage, and the target has the Prone condition. Success: Half damage only.

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
- Actions/Siege Shoulder — template trample; library draw (seed unstamped)

**Engine trace**

```
[route] brute-juggernaut type=Construct mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | brute-juggernaut: ✓ ("a siege-engine golem of lashed timber th") | brute-juggernaut: no line key in the words — the model's read of its quote
[concept] name: provided_name rejected — "Siege-Engine Golem of Lashed Timber…" is the description, not a name
[concept] hints: golem→canon ✗ ("lashed timber, not golem-flesh")
[concept] resolve: archetype=brute type=Construct themes=forged/terror mind=mindless style=juggernaut energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: shouldering through walls [behavior] | lashed timber body [body] | relentless advance [behavior]
[concept] identity: The Siege-Golem lumbers forward at a walking pace, never stopping, and shoulders through the first wall, barricade, or shield line in its path to spill defenders into the open. Every round after that it repeats the same brutal arithmetic: close the distance, batter a target into the ground with timber fists and a bone-cracking shoulder check, and shrug off arrows that cannot pierce its lashed logs. It does not flee or tire; only fire or sustained punishment from beyond its reach can break its advance, and even then it keeps coming until the last cord snaps.
[concept] lore: Built by a warlord's sappers from the timber of every door they ever battered down, the Siege-Golem still walks the ruined road toward the next fortress it was promised, unable to understand that the war is long over.
[reskin] print canon route: the Clay Golem's body outranks the juggernaut seat — no verb in the words names it; the plain brute line
[reskin] print canon pb: print's +9 on PB +4 reads +8 on this sheet's PB +3; DCs follow
[reskin] print canon defenses: HP 149 -> 123, AC 15 -> 14 — the Clay Golem's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 20, DEX 9, CON 18, INT 3, WIS 8, CHA 1 — the Clay Golem's at its own CR; attack +8 -> +8, DC 16 (print's, on this sheet's PB)
[reskin] donor: brute-5 -> CR 8
[reskin] print canon: "a siege-engine golem of lashed timber that shoulders through walls" heads on the Clay Golem — print's rows ride along; the seat stays
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] alignment by body: Neutral -> Unaligned — a Construct at INT 3 (print: Oozes 4/4 Unaligned; every Construct at INT 3 or less, 7/7; the first aligned one is the Flesh Golem at INT 6)
[reskin] inline declared: "the siege-golem" — the call's own answer (kind), built from the name; the rules would have said "Siege-Golem"
[reskin] inline on kit rows: "Siege-Golem" -> "the siege-golem"
[reskin] inline form: "the siege-golem" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] lacks refused: "cannot understand" quotes nothing the user typed
[reskin] lacks refused: "does not flee" quotes nothing the user typed
[reskin] lacks refused: "does not tire" quotes nothing the user typed
[reskin] clauses: "a siege-engine golem of lashed timber" -> has (descriptive), head | "shoulders through walls" -> has (mechanical)
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The golem doesn't stop for anything in its path — as it moves, it simply walks straight through the nearest wall, barricade, or row of shields, bursting through in a shower of splinters and hurling whoever was holding the line back and down. Anyone standing on the far side is knocked sprawling into the open. Once it has shouldered through, it keeps going as if nothing happened." [action/always/movement] — menu: trample, leap, thrown-burst, shield-bash, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up (+ shelf: rampage, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, stunning-strike, charge-push, hook-rider, pounce, charge)
[reskin] signature bound to the concept's verb: action — own-turn-punisher (lash)
[reskin] word match declined by the call: thrown-burst, thrown-burst-seed, push-prone, shield-bash — the key word does not mean the mechanic here
[reskin] pick kept on the GM's own words: action — "trample" has no key-table verb, but the call quotes "shoulders through walls" from the description
[reskin] value check: "Siege Shoulder (Recharge 5-6)" EV 82.1 vs floor 45.6 (the whole Multiattack (2 attacks)) — worth the trade
[reskin] signature template: trample -> Actions/"Siege Shoulder (Recharge 5-6)" ("It shoulders straight through the line of shields and barricades in its path, mo [shape fit, no verb match]")
[reskin] signature idea (trait): "The golem's body is nothing but doors lashed shut with cord — when something strikes it, the blow splits a binding and the logs swing loose, but the accumulated wreck of old timber only makes it hit harder as the fight goes on. Every hit it takes winds the lashes tighter instead of breaking it." [trait/on_being_hit/damage] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] signature miss: trait — "The golem's body is nothing but doors lashed shut with cord — when something strikes it, the blow splits a binding and the logs swing loose, but the accumulated wreck of old timber only makes it hit harder as the fight goes on. Every hit it takes winds the lashes tighter instead of breaking it." [trait/on_being_hit/damage] — no template on the shelf shares a verb with the concept or the idea (offered: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge, false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] weapons answered: Timber Fist = none
[reskin] languages by body: a trap-line Construct with no voice in the concept
[reskin] print canon languages: "Understands the languages of its creator but can't speak" -> "Common plus one other language" — the Clay Golem's
[reskin] print canon speed: 40 ft. -> 20 ft. — the Clay Golem's walk; the concept's other modes stay
[reskin] print canon attack: "Timber Fist" -> "Slam" — the Clay Golem's own row
[reskin] print canon multiattack: "The siege-golem makes two Slam attacks, or it makes three Slam attacks if it used Hasten this turn." — the Clay Golem's own
[reskin] immunities stamped for type: Construct -> Poison; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned
[reskin] print canon defenses: immunities Poison; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned -> Acid, Poison, Psychic; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned; resistances none -> Bludgeoning, Piercing, Slashing — the Clay Golem's own header lines
```


---


### Stone Golem — in the run

**Concept:** name: Stone Golem | carved as a weeping saint

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Stone Golem | 10 | brute-9 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 11 / off 10 → 10.5; sustained 60 (2 × Force Bolt); nova none; dmg 60

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

Immutable Form. The golem can't shape-shift.

Magic Resistance. The golem has Advantage on saving throws against spells and other magical effects.

Actions

Multiattack. The golem makes two attacks, using Slam or Force Bolt in any combination.

Slam. Melee Attack Roll: +10, reach 5 ft. 20 (4d6 + 6) Bludgeoning damage plus 9 (2d8) Force damage.

Force Bolt. Ranged Attack Roll: +10, range 120 ft. 30 (7d6 + 6) Force damage.

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
- Actions/Slam — print's row, renamed
- Actions/Force Bolt — print's own row, renamed; weapon crossbow
- Traits/Immutable Form — print's own row
- Traits/Magic Resistance — print's own row
- Bonus Actions/Slow — print's own row

**Engine trace**

```
[route] brute-juggernaut type=Construct mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | brute-juggernaut: ✓ ("Stone Golem") | brute-juggernaut: no line key in the words — the model's read of its quote
[concept] hints: golem→canon ✓ ("Stone Golem — carved as a weeping saint")
[concept] resolve: archetype=brute type=Construct themes=grave/forged mind=sapient style=juggernaut energy=Radiant mix=both identity=✓ lore=✓
[concept] name: provided "Stone Golem"
[concept] mechanics: none claimed
[concept] signature elements: stone tears weeping from hollow eyes [body] | advances in slow, relentless strides [behavior] | grief-heavy aura of judgment [aura]
[concept] identity: A weeping saint carved from a single block of pale stone, it advances in slow, deliberate strides while tears of grit stream from its hollow eyes, then brings its massive arms down like a judge's gavel. Each round it presses forward, its mournful aura sapping the resolve of those who meet its stone gaze, and if bloodied it does not retreat but kneels and rises harder, doubling the weight of its grief as a silent verdict on the living. It fights to the death without hesitation or malice, a made thing obeying the last command carved into its heart.
[concept] lore: A grieving sculptor chiseled her own sorrow into a saint and could not bear to leave it unfinished, so she willed the statue to complete her penance — now it walks the old pilgrimage roads, weeping stone tears and rendering judgment on any who profane its path.
[reskin] print canon route: the Stone Golem's body outranks the juggernaut seat — no verb in the words names it; the plain brute line
[reskin] print canon defenses: HP 182 -> 220, AC 15 -> 18 — the Stone Golem's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 22, DEX 9, CON 20, INT 3, WIS 11, CHA 1 — the Stone Golem's at its own CR; attack +9 -> +10, DC 17 (print's)
[reskin] donor: brute-9 -> CR 10
[reskin] print canon: "Stone Golem — carved as a weeping saint" heads on the Stone Golem — print's rows ride along; the seat stays
[reskin] alignment by body: Lawful Neutral -> Unaligned — a Construct at INT 3 (print: Oozes 4/4 Unaligned; every Construct at INT 3 or less, 7/7; the first aligned one is the Flesh Golem at INT 6)
[reskin] inline by rule: "the golem" — the call answered "the golem" (kind), which the name does not support
[reskin] inline form: "the golem" — the model's own reading of the name
[reskin] save dc derived: DC 16 -> 18 (8 + PB 4 + the sheet's best 6) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Stone Golem — carved as a weeping saint" -> has (descriptive), head
[reskin] signature idea (action): "The golem advances without breaking stride and, as it closes on a target, its hollow eyes spill a stream of grit and tears that spatters those in its path. Anyone caught in that falling stream is slowed and shaken, their resolve sapped by the sight of the weeping saint bearing down on them; the longer they linger in its gaze, the harder it becomes to turn away or flee. The grief is not a blast but" [action/save/condition] — menu: trample, leap, thrown-burst, throw-retrieve, shield-bash, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up (+ shelf: rampage, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, stunning-strike, charge-push, hook-rider, pounce, charge)
[reskin] fit declined: "Tears of Grit (Recharge 5-6)" — a print body takes only what the user's words ask; the call offered no quote, and the key table finds no verb either (the blacksmith's rally, critic-ten 2026-10-01)
[reskin] fallback stands down: "Stone Golem — carved as a weeping saint" heads on the Stone Golem and asks for nothing — print's rows, nothing invented (the big ogre, critic-ten 2026-10-01)
[reskin] value check: "Dazzling Burst" EV 4.7 vs floor 17.7 (one attack of 2) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Dazzling Burst" — a seed that cannot be lifted does not ship
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "When the golem is bloodied, it kneels and rises harder, and from that moment the weight of its grief doubles — its tears flow faster and its mournful gaze reaches further, pressing down on all who meet its hollow eyes." [trait/always/condition] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending, weapon-lodge)
[reskin] signature bound to the concept's verb: trait — false-appearance (stone)
[reskin] word match declined by the call: false-appearance, bloodied-fury, uncanny-sense, gaze-aura, bloodied-burst, resonant-body, phobia, terrain-walk, noxious-aura — the key word does not mean the mechanic here
[reskin] signature miss: trait — "When the golem is bloodied, it kneels and rises harder, and from that moment the weight of its grief doubles — its tears flow faster and its mournful gaze reaches further, pressing down on all who meet its hollow eyes." [trait/always/condition] — the model picked "bound" (no verb, and it quotes nothing the GM typed) over a concept-verb template (false-appearance)
[reskin] weapons answered: Stone Fist = none; Grit Tear = none
[reskin] languages by mind: "None" -> "Understands the languages of its creator but can't speak" (sapient)
[reskin] print canon languages: "Understands the languages of its creator but can't speak" -> "Understands Common plus two other languages but can't speak" — the Stone Golem's
[reskin] print canon speed: 40 ft. -> 30 ft. — the Stone Golem's walk; the concept's other modes stay
[reskin] print canon attack: "Stone Fist" -> "Slam" — the Stone Golem's own row
[reskin] print canon multiattack: "The golem makes two attacks, using Slam or Force Bolt in any combination." — the Stone Golem's own
[reskin] print canon attack: "Force Bolt" rolls print's +10 with +6 damage — a print row stands outside the weapon table
[reskin] print canon attack: "Grit Tear" -> "Force Bolt" — the Stone Golem's own ranged row
[reskin] immunities stamped for type: Construct -> Poison; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned
[reskin] print canon defenses: immunities Poison; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned -> Poison, Psychic; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned — the Stone Golem's own header lines
[reskin] name-canon trait stamped: Immutable Form (the name says so; print says what it does)
[reskin] name-canon trait stamped: Magic Resistance (the name says so; print says what it does)
[reskin] print canon trait: Immutable Form — print's text replaces the chassis's (the Troll regenerates 15, not the chassis's 10 — critic's audit 2026-10-02)
[reskin] print canon trait: Magic Resistance — print's text replaces the chassis's (the Troll regenerates 15, not the chassis's 10 — critic's audit 2026-10-02)
[reskin] print canon row: Bonus Actions/Slow (Recharge 5-6) — the Stone Golem's own
```


---


### Hive-Priest of Flies — in the run

**Concept:** a plague-bearing archon of flies that commands lesser swarms

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Hive-Priest of Flies | 13 | defender-8-leader | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 9 / off 16 → 12.5; sustained 93 (3 × Stinger); nova none; dmg 93

```
Hive-Priest of Flies

Large Aberration, Neutral Evil

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

Senses darkvision 60 ft.; Passive Perception 11

Languages Common

CR 13 (XP 10,000; PB +5)

Traits

Plaguefly Retort. A creature that touches the hive-priest or hits it with a melee attack while within 5 feet of it takes 10 (3d6) Poison damage.

Aura of Authority. While in a 10-foot Emanation originating from the hive-priest, the hive-priest and its allies have Advantage on attack rolls and saving throws, provided the hive-priest doesn't have the Incapacitated condition.

Actions

Multiattack. The hive-priest makes three attacks, using Stinger or Legion in any combination.

Stinger. Melee Attack Roll: +10, reach 5 ft. 18 (3d8 + 5) Piercing damage plus 13 (3d8) Poison damage.

Legion. Melee Attack Roll: +10, reach 5 ft. 29 (7d6 + 5) Poison damage.

Bonus Actions

Bolstering Cry (2/Day). Each ally within 30 feet of the hive-priest gains 14 (4d6) Temporary Hit Points.

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

- Traits/Plaguefly Retort — template heated-body; library draw (seed unstamped); binds the GM's words: plague+pestilence
- Traits/Aura of Authority — the chassis
- Actions/Multiattack — the chassis
- Actions/Stinger — the chassis
- Actions/Legion — the chassis
- Bonus Actions/Bolstering Cry — library seed rally; the GM's clause "commands lesser swarms"; binds the GM's words: command

**Engine trace**

```
[route] defender-leader type=Aberration mechanics=aura — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | defender-leader: ✓ ("commands lesser swarms") | defender-leader: key "commands" (class verb)
[concept] name: provided_name rejected — "a plague-bearing archon of flies that co…" is the description, not a name
[concept] hints: swarm→body ✓ ("commands lesser swarms") | winged→style ✓ ("archon of flies")
[concept] resolve: archetype=defender type=Aberration themes=venomous/terror mind=sapient style=leader energy=Poison mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: aura
[concept] signature elements: commanding clouds of plague-flies [behavior] | chitinous insectoid body and wings [body] | contagion that festers in its victims [aura]
[concept] identity: A plague-bearing archon of flies opens combat by loosing its buzzing legions — dense clouds of filth-ridden insects that blind, choke, and sicken before a single blow lands — while it hangs back on its own chitinous wings, directing the swarm with hand-signals and a droning hymn. Each round it skirmishes at the edge of the cloud, snapping forward to rake and infect any foe who pushes through, then withdrawing to reform its swarm; its authority is the swarm itself, and its parry is redirecting flies into a spear-thrust's path. Pressed and bloodied, it does not flee — it calls every last body it commands into a final suffocating carpet and fights to the last drone, because the plague does not retreat.
[concept] lore: The Plague-Archons were hive-priests of a fallen celestial order who bartered their halos for a plague that never dies, and now they wander the world seeding pestilence where they feel the divine has failed.
[reskin] donor: defender-8-leader -> CR 13 (invented — no printed peer)
[reskin] ranged row off: "Hybrid Attack" keeps its melee half only
[reskin] inline by rule: "the hive-priest" — the call answered "the flies" (kind), which the name does not support
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a plague-bearing archon of flies" -> has (descriptive), head | "commands lesser swarms" -> has (mechanical) [asked: save_area]
[reskin] signature idea (action): "The hive-priest releases a living cloud of plague-flies that swarms and blinds everything it engulfs, trying to choke and contaminate those inside. The cloud is vast and filled with the creature's buzzing legions, and it seeks out and settles on anyone the priest has already contaminated with its venom. The swarm lingers after being loosed, reforming around its victims." [action/save/condition] — menu: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up (+ shelf: patient-defense, lay-on-hands, second-wind, volley-order, aggro-curse, own-turn-punisher, self-invisibility, rally, riposte, stunning-strike, charge-push, hook-rider, contagion)
[reskin] signature bound to the concept's verb: action — contagion (plague, plagued)
[reskin] decline reason: action — the call answered none and names it "no_fit" after being shown contagion, which the GM's words keyed
[reskin] key match declined: action — "contagion" was ranked first on the call's own menu for plague+plagued, and the call read it as no fit; the words keep their claim and nothing is forced
[reskin] signature miss: action — "The hive-priest releases a living cloud of plague-flies that swarms and blinds everything it engulfs, trying to choke and contaminate those inside. The cloud is vast and filled with the creature's buzzing legions, and it seeks out and settles on anyone the priest has already contaminated with its venom. The swarm lingers after being loosed, reforming around its victims." [action/save/condition] — the model found no template that holds it (offered: contagion, throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up)
[reskin] style default seed: rally heads the fallback for the leader
[reskin] value check: "Bolstering Cry (2/Day)" EV 7.7 vs floor 4.9 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: rally -> Bonus Actions/"Bolstering Cry (2/Day)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Whenever something strikes the hive-priest at close range, a burst of the plague-flies nesting in its chitinous body boils out and bites the attacker, contaminating them. The stingers of the swarm carry the same sickness as its own venom, so even those who batter its shell soon carry the pestilence inside them." [trait/on_being_hit/condition] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura)
[reskin] signature bound to the concept's verb: trait — heated-body (plague)
[reskin] signature template (trait): heated-body -> Traits/"Plaguefly Retort" ("Whenever something strikes the hive-priest at close range, flies boil out and bi [verb: plague:concept, pestilence:idea]")
[reskin] weapons answered: Stinger = none; Legion = none
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] row binds its clause: "Bolstering Cry" answers "commands lesser swarms" — the keys it matched came from that clause, so the coverage credit has a receipt
audit finding below confidence gate: Bolstering Cry (2/Day) Generic engine stand-in name does not express the hive-priest's flyswarm concept.
```


---


### Gutforge — in the run

**Concept:** name: Purple Worm | that swallowed a war-band's armoury

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Gutforge | 15 | brute-13 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 12 / off 13 → 12.5; sustained 65 (1 × Tail Stinger); nova none; dmg 65

```
Gutforge

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

Tunneler. The gutforge can burrow through solid rock at half its Burrow Speed and leaves a 10-foot-diameter tunnel in its wake.

Actions

Multiattack. The gutforge makes one Bite attack and one Tail Stinger attack. It can replace one attack with a use of Gullet Foundry.

Bite. Melee Attack Roll: +14, reach 10 ft. 47 (11d6 + 9) Piercing damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 22), and it has the Restrained condition until the grapple ends.

Tail Stinger. Melee Attack Roll: +14, reach 10 ft. 30 (6d6 + 9) Piercing damage plus 35 (10d6) Poison damage.

Gullet Foundry. Dexterity Saving Throw: DC 21, one Large or smaller creature within 10 feet that the gutforge hit with a melee attack this turn. Failure: 42 (12d6) Acid damage, and the target is swallowed. A swallowed creature has the Blinded and Restrained conditions, has Total Cover against attacks and other effects outside the gutforge, and takes 22 (5d8) Acid damage at the start of each of the gutforge's turns. If the gutforge takes 40 damage or more on a single turn from a creature inside it, it must succeed on a DC 21 Constitution saving throw at the end of that turn or regurgitate all swallowed creatures, each of which falls in a space within 10 feet of the gutforge and has the Prone condition. If the gutforge dies, a swallowed creature is no longer Restrained and can escape from the corpse using 15 feet of movement, exiting with the Prone condition.

Bonus Actions

Swallow. Strength Saving Throw: DC 21, one Large or smaller creature Grappled by the gutforge (it can have up to three creatures swallowed at a time). Failure: The target is swallowed by the gutforge, and the Grappled condition ends. A swallowed creature has the Blinded and Restrained conditions, has Total Cover against attacks and other effects outside the gutforge, and takes 17 (5d6) Acid damage at the start of each of the gutforge's turns.
If the gutforge takes 30 damage or more on a single turn from a creature inside it, the gutforge must succeed on a DC 21 Constitution saving throw at the end of that turn or regurgitate all swallowed creatures, each of which falls in a space within 5 feet of the gutforge and has the Prone condition. If the gutforge dies, any swallowed creature no longer has the Restrained condition and can escape from the corpse using 20 feet of movement, exiting Prone.

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
- Actions/Gullet Foundry — template swallow; library draw (seed unstamped); the GM's clause "swallowed a war-band's armoury"; binds the GM's words: swallow+swallows+swallowed+gulp+gulps+whole
- Traits/Tunneler — print's own row
- Bonus Actions/Swallow — print's own row

**Engine trace**

```
[route] brute-grappler type=Monstrosity mechanics=grapple, engulf — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: on the GM's own words "swallowed a war-band's armoury" | brute-grappler: ✓ ("swallowed a war-band's armoury") | brute-grappler: no line key in the words — the model's read of its quote
[concept] resolve: archetype=brute type=Monstrosity themes=devouring/subterranean mind=bestial style=grappler energy=Acid mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: grapple, engulf
[concept] signature elements: swallowing prey whole along, with its armour [behavior] | a gut and maw packed with swallowed blades, mail, and spearheads [body] | erupting from beneath a formation [behavior]
[concept] identity: The Purple Worm breaks ground beneath a formation and engulfs a rank of soldiers whole, swallowing their steel along with them, then fights with a maw packed with half-digested blades that it grinds and sprays shard-first into anything it cannot reach. Every round it burrows under the loudest cluster and surges up to swallow again, dragging the swallowed down its gullet where armour and weapons tumble and cut. Wounded, it does not flee — it coils, thrashing its armoured hide and spraying a gout of chewed metal and acid over the survivors, fighting to the death.
[concept] lore: A war-band's armoury was dumped into a collapsing sinkhole, and the purple worm that brooded there ate it all — it now hoards no gold, only the swallowed metal it grinds in its gut and the warm bodies that smell of more.
[reskin] print canon route: the Purple Worm's body outranks the grappler seat — no verb in the words names it; the plain brute line
[reskin] print canon defenses: HP 264 -> 247, AC 17 -> 18 — the Purple Worm's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 28, DEX 7, CON 22, INT 1, WIS 8, CHA 4 — the Purple Worm's at its own CR; attack +11 -> +14, DC 21 (print's)
[reskin] donor: brute-13 -> CR 15 (invented — no printed peer)
[reskin] print canon: "Purple Worm — that swallowed a war-band's armoury" heads on the Purple Worm — print's rows ride along; the seat stays
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] inline declared: "the gutforge" — the call's own answer (kind), built from the name
[reskin] inline form: "the gutforge" — the model's own reading of the name
[reskin] save dc derived: DC 18 -> 22 (8 + PB 5 + the sheet's best 9) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Purple Worm —" -> has (descriptive), head | "swallowed a war-band's armoury" -> has (descriptive)
[reskin] menu pruned: action — thrown-burst-seed (the sheet cannot render them)
[reskin] signature idea (action): "The gutforge lunges its whole front half into a formation and scoops prey into its gullet, taking a rank of soldiers in one gulp, armor and spears included. Anything swallowed is held inside the churning, blade-packed gut and ground against the swallowed steel each round, taking the gut's cutting and burning until it is hacked or torn free from within. A creature that fights its way out is spat ba" [rider/on_hit/condition] — menu: contagion, stunning-strike, charge-push, hook-rider, pounce, charge (+ shelf: swallow, condition-payoff, shield-bash, hook-drag, burrow-ambush, escalating-dread, terror-pulse, push-prone, herd, drain, exploiter, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating)
[reskin] signature bound to the concept's verb: action — swallow (swallow, swallows, swallowed)
[reskin] value check: "Gullet Foundry" EV 46.8 vs floor 22.4 (one attack of 2) — a nova already stands — kept ungated, dice to 42 at the ceiling
[reskin] signature template: swallow -> Actions/"Gullet Foundry" ("The gutforge scoops prey into its gullet, holding them inside its churning blade [verb: swallow:concept, swallows:concept, swallowed:concept, gulp:idea, gulps:idea, whole:idea]")
[reskin] keys spent by the action: swallow, swallows, swallowed
[reskin] signature idea (trait): "The gutforge is packed with … blades, mail, and spearheads, and every time its hide is struck the impact shakes that hoard loose: a grating shriek of grinding metal rolls out of it, and nearby foes are rattled and deafened by the din. Wounded, it thrashes harder, so the metal inside grinds louder and longer the more punishment it takes." [trait/on_being_hit/condition] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, earth-glide, tunneler, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] signature bound to the concept's verb: trait — tunneler (worm)
[reskin] word match declined by the call: tunneler, bloodied-fury, uncanny-sense, weapon-lodge — the key word does not mean the mechanic here
[reskin] trait declined: "Armoury Screech" — bound only on the idea's own words (wounded:idea) with no key in the concept; a meat body earns its trait by the user's verb (the sniper's tracker, critic 2026-09-29)
[reskin] concept-first trait skipped: tunneler — the call read its match as a collision (the word is a modifier, or the sheet already answers it)
[reskin] weapons answered: Bite = none; Shard Spray = none; Gullet Drag = none
[reskin] chassis nova: "Shard Spray (Recharge 5-6)" — the brute-13's own nova row (its "Area Nova", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] print canon speed: 40 ft. -> 50 ft. — the Purple Worm's walk; the concept's other modes stay
[reskin] print canon speed: Burrow -> 50 ft. — the Purple Worm's own
[reskin] print canon row: Actions/Tail Stinger — the Purple Worm's second melee row, beside the chassis's
[reskin] rider folded: "Bite" keeps its budget — the chassis's rider half (17) folds into the base; the Purple Worm pays no damage rider of its own (its "If the target is a Large or …" costs no damage)
[reskin] print canon multiattack: "The gutforge makes one Bite attack and one Tail Stinger attack." — the Purple Worm's own
[reskin] languages held: None stands — INT 1 on a Monstrosity speaks nothing, whatever the mind read said
[reskin] print canon trait: Tunneler — "Purple Worm — that swallowed a war-band's armoury" is the Purple Worm (print's own row)
[reskin] print canon: chassis row leaves — Actions/"Shard Spray (Recharge 5-6)" is the seat's nova, not the Purple Worm's
[reskin] print canon row: Bonus Actions/Swallow — the Purple Worm's own
[reskin] multiattack replacement clause: It can replace one attack with a use of Gullet Foundry.
[reskin] row binds its clause: "Gullet Foundry" answers "swallowed a war-band's armoury" — the keys it matched came from that clause, so the coverage credit has a receipt
audit span not verbatim, dropped: Gullet Foundry The target is swallowed by the gutforge
[reskin] escape dc: Bite → DC 22 (8 + PB + STR; a late row wore another number)
```


---


### Pit Fiend — in the run

**Concept:** name: Pit Fiend | who collects the oaths of dying knights

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Pit Fiend | 20 | defender-17 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 21 / off 22 → 21.5; sustained 128 (1 × Fiery Mace + legendary Vow Rend); nova none; dmg 128

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

Multiattack. The pit fiend makes one Bite attack, two Devilish Claw attacks, and one Fiery Mace attack. It can replace one attack with a use of Oath Collector.

Bite. Melee Attack Roll: +14, reach 10 ft. 30 (5d8 + 8) Piercing damage. If the target is a creature, it must make the following saving throw. Constitution Saving Throw: DC 21. Failure: The target has the Poisoned condition. While Poisoned, the target can't regain Hit Points and takes 21 (6d6) Poison damage at the start of each of its turns, and it repeats the save at the end of each of its turns, ending the effect on itself on a success. After 1 minute, it succeeds automatically.

Fiery Mace. Melee Attack Roll: +14, reach 10 ft. 17 (2d8 + 8) Force damage plus 21 (6d6) Fire damage.

Devilish Claw. Melee Attack Roll: +14, reach 10 ft. 17 (2d8 + 8) Necrotic damage.

Oath Collector. Charisma Saving Throw: DC 21, one creature within 60 feet. Failure: The target is cursed until the end of the pit fiend's next turn. The first time the cursed target deals damage to any creature before then, it takes 28 (8d6) Fire damage. Success: Half damage only.

Hellfire Spellcasting (Recharge 4-6). The pit fiend casts Fireball (level 5 version) twice, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 21). It can replace one Fireball with Hold Monster (level 7 version) or Wall of Fire.

Legendary Actions

Legendary Action Uses: 3. Immediately after another creature's turn, the pit fiend can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.

Vow Rend. The pit fiend makes one Bite attack.

Stand Unyielding. The pit fiend takes the Dodge action. The pit fiend can't take this action again until the start of its next turn.

Oath Shatter. Strength Saving Throw: DC 21, one creature within 5 feet. Failure: The target is pushed up to 15 feet away from the pit fiend and has the Prone condition.

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
- Actions/Oath Collector — template curse-debt; library draw (seed unstamped); the GM's clause "collects the oaths of dying knights"; binds the GM's words: oath
- Actions/Hellfire Spellcasting — print's own row
- Legendary Actions/Legendary Action Uses: 3 — the chassis
- Legendary Actions/Vow Rend — the chassis
- Legendary Actions/Stand Unyielding — the chassis
- Legendary Actions/Oath Shatter — the chassis

**Engine trace**

```
[route] defender type=Fiend mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | defender-leader: ✓ ("collects the oaths of dying knights") | defender-leader -> defender: the concept's VERB outranks the noun (key "knights", class verb) | defender: key "knights" (class verb)
[concept] resolve: archetype=defender type=Fiend themes=fiendish/forged mind=sapient style=— energy=Fire mix=both identity=✓ lore=✓
[concept] name: provided "Pit Fiend"
[concept] mechanics: none claimed
[concept] signature elements: collecting the dying oaths of knights [behavior] | a living barricade of searing iron [body]
[concept] identity: The Pit Fiend opens by rooting itself in place as a bulwark of searing iron, then dares enemies to step around it so it can lash out with punishing blows against anyone who breaks its line. Every round it fights as a living barricade, absorbing punishment while its presence compels foes to either face it or suffer — and it never retreats, treating any wound as another oath sworn against the world.
[concept] lore: Forged in the deepest furnaces of the Nine Hells, the Pit Fiend is bound to the field of battle itself — it collects the dying oaths of knights as fuel, and it will not yield ground until the last vow is spent.
[reskin] print canon defenses: HP 281 -> 337, AC 22 -> 21 — the Pit Fiend's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 26, DEX 14, CON 24, INT 22, WIS 18, CHA 24 — the Pit Fiend's at its own CR; attack +14 -> +14, DC 21 (print's)
[reskin] donor: defender-17 -> CR 20 (invented — no printed peer)
[reskin] row gated out: Guard Aura (aura) — the concept did not claim this mechanic
[reskin] print canon: "Pit Fiend — who collects the oaths of dying knights" heads on the Pit Fiend — print's rows ride along; the seat stays
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] inline by rule: "the pit fiend" — the call answered "the pit fiend" (kind), which the name does not support
[reskin] inline form: "the pit fiend" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Pit Fiend —" -> has (descriptive), head | "collects the oaths of dying knights" -> has (descriptive)
[reskin] menu pruned: action — push-prone (the sheet cannot render them)
[reskin] signature idea (action): "The pit fiend presses a claw to its own burning chest and calls in the vows of every knight it has felled, pulling their sworn strength into itself as a veil of searing iron. For a short while its wounds knit and its strikes burn hotter, and any foe that lands a blow on it feels the recoil of a hundred broken oaths crackling back at them." [action/always/defense] — menu: seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, herd, curse-debt, reveal, wind-up, exploiter (+ shelf: patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, riposte, stunning-strike, charge-push, hook-rider)
[reskin] signature bound to the concept's verb: action — aggro-curse, curse-debt (oath)
[reskin] value check: "Oath Collector" EV 21.7 vs floor 15.1 (one attack of 3) — added Success: Half; dice 17 → 28
[reskin] signature template: curse-debt -> Actions/"Oath Collector" ("Collecting the oaths of dying knights is calling in a debt — fallen foes' sworn  [verb: oath:concept]")
[reskin] keys spent by the action: oath
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 21 already beats print's AC 19 at CR 20, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "Wounds only feed it: whenever a foe's attack or a foe's spell draws blood, the spilled heat is drawn into the pit fiend and flares back at the attacker as searing fire, so hurting it invites the flame it carries." [trait/on_being_hit/damage] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] signature bound to the concept's verb: trait — bloodied-burst, death-burst (dying)
[reskin] word match declined by the call: bloodied-burst, bloodied-fury, uncanny-sense — the key word does not mean the mechanic here
[reskin] trait declined: "Searing Reprisal" — bound only on the idea's own words (heat:idea, sear:idea, fire:idea, flame:idea) with no key in the concept; a meat body earns its trait by the user's verb (the sniper's tracker, critic 2026-09-29)
[reskin] weapons answered: Claw = none
[reskin] speed by concept: added Fly 30 ft. — the concept's movement set decides
[reskin] languages by mind: "Infernal, Telepathy 120 ft." -> "Infernal, telepathy 120 ft." (sapient)
[reskin] print canon alignment: Lawful Neutral -> Lawful Evil — the Pit Fiend's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Infernal, telepathy 120 ft." -> "Infernal; telepathy 120 ft." — the Pit Fiend's
[reskin] print canon speed: Fly -> 60 ft. — the Pit Fiend's own
[reskin] print canon row: Actions/Devilish Claw — the Pit Fiend's second melee row, beside the chassis's
[reskin] print canon row: Actions/Fiery Mace — the Pit Fiend's second melee row, beside the chassis's
[reskin] rider folded: "Claw" keeps its budget — the chassis's rider half (13) folds into the base; the Pit Fiend pays no damage rider of its own (its "If the target is a creature,…" costs no damage)
[reskin] print canon attack: "Claw" -> "Bite" — the Pit Fiend's own row
[reskin] print canon multiattack: "The pit fiend makes one Bite attack, two Devilish Claw attacks, and one Fiery Mace attack." — the Pit Fiend's own
[reskin] immunities stamped for type: Fiend -> Poison; Poisoned
[reskin] print canon defenses: immunities Poison; Poisoned -> Fire, Poison; Poisoned; resistances none -> Cold — the Pit Fiend's own header lines
[reskin] resistances derived: Cold
[reskin] print canon trait: Diabolical Restoration — "Pit Fiend — who collects the oaths of dying knights" is the Pit Fiend (print's own row)
[reskin] print canon trait: Fear Aura — "Pit Fiend — who collects the oaths of dying knights" is the Pit Fiend (print's own row)
[reskin] print canon trait: Magic Resistance — "Pit Fiend — who collects the oaths of dying knights" is the Pit Fiend (print's own row)
[reskin] print canon row: Actions/Hellfire Spellcasting (Recharge 4-6) — the Pit Fiend's own
[reskin] multiattack replacement clause: It can replace one attack with a use of Oath Collector.
[reskin] row binds its clause: "Oath Collector" answers "collects the oaths of dying knights" — the keys it matched came from that clause, so the coverage credit has a receipt
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
[concept] resolve: archetype=brute type=Monstrosity themes=bestial/devouring mind=bestial style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: hooked beak snapping at prey [body] | bear-claw forelimbs grappling and raking [body] | relentless charging maul that refuses to yield [behavior]
[concept] identity: It crashes in with a full-body shoulder-and-beak charge, then plants itself over the kill and trades blows, rake for rake, until the fight is a shoving match of muscle and feathers. Every round after the first it mauls with hooked beak and bear-claw forelimbs at close quarters, refusing to give ground while it has prey in front of it. Bloodied, it only redoubles its assault — this is a hybrid predator of two merciless instincts, and it fights to the death rather than yield a meal.
[concept] lore: Spawned where a bear and a great hunting owl crossed paths in some deep and unholy wood, the owlbear lives as a single-minded killing body: it wants nothing but the next thing it can tear apart and eat.
[reskin] print canon defenses: HP 66 -> 59, AC 12 -> 13 — the Owlbear's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 20, DEX 12, CON 17, INT 3, WIS 12, CHA 7 — the Owlbear's at its own CR; attack +5 -> +7, DC 15 (print's)
[reskin] donor: brute-2 -> CR 3
[reskin] print canon: "Owlbear" is a print creature — the seats stand down; print's own rows are the composition
[reskin] inline declared: "the bear-that-ought-not-be" — the call's own answer (kind), built from the name; the rules would have said "Bear-That-Ought-Not-Be"
[reskin] inline form: "the bear-that-ought-not-be" — the model's own reading of the name
[reskin] save dc derived: DC 12 -> 15 (8 + PB 2 + the sheet's best 5) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Owlbear" -> has (descriptive), head
[reskin] weapons answered: Beak = none
[reskin] print canon speed: modes climb — the Owlbear's
[reskin] print canon senses: "darkvision 60 ft." — the Owlbear's
[reskin] speed by concept: added Climb 30 ft. — the concept's movement set decides
[reskin] print canon name: "Feathered Bear-That-Ought-Not-Be" -> "Owlbear" — a whole print name is the creature's name (the Goblin Boss shipped as Krag the Iron Standard, 2026-10-01)
[reskin] inline follows the print name: "the bear-that-ought-not-be" -> "the owlbear"
[reskin] print canon speed: 30 ft. -> 40 ft. — the Owlbear's walk; the concept's other modes stay
[reskin] print canon speed: Climb -> 40 ft. — the Owlbear's own
[reskin] print canon attack: "Beak" -> "Rend" — the Owlbear's own row
[reskin] print canon multiattack: "The owlbear makes two Rend attacks." — the Owlbear's own, added (the chassis carried none; the Owlbear makes two Rend attacks — canaries 2026-10-12)
[reskin] languages held: None stands — INT 3 on a Monstrosity speaks nothing, whatever the mind read said
```


---


### Hive-Husk Scythewretch — in the run

**Concept:** A Large insectile horror. It has four scythe-arms, a spitting maw, and a shell that sheds acid. It fights by pinning prey with two arms and carving with the others.

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Hive-Husk Scythewretch | 9 | brute-8-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- **dropped clause:** "carving with the others"
- read: def 7 / off 9 → 8; sustained 62 (2 × Spitting Maw); nova none; dmg 62

```
Hive-Husk Scythewretch

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

Caustic Carapace. A creature that touches the scythewretch or hits it with a melee attack while within 5 feet of it takes 7 (2d6) Acid damage.

Actions

Multiattack. The scythewretch makes two attacks, using Spitting Maw or Pinning Arm in any combination. It can replace one attack with a use of Caustic Shell Slam.

Spitting Maw. Melee Attack Roll: +8, reach 10 ft. 31 (6d8 + 4) Piercing damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 16).

Caustic Shell Slam. Dexterity Saving Throw: DC 15, one creature within 30 feet that has the Grappled condition. Failure: 40 (9d8) Acid damage. Success: Half damage.

Pinning Arm. Melee Attack Roll: +8, reach 5 ft. 31 (6d8 + 4) Piercing damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 16).

Bonus Actions

Swallow. The scythewretch swallows one Medium or smaller creature it is grappling. While swallowed, the target has the Blinded and Restrained conditions, has Total Cover against attacks and other effects outside the scythewretch, and takes 10 (3d6) Acid damage at the start of each of the scythewretch's turns. The scythewretch can have only one creature swallowed at a time. If the scythewretch takes 25 damage or more on a single turn from the swallowed creature, the scythewretch must regurgitate the target at the end of that turn, and the target exits Prone in an unoccupied space within 10 feet of the scythewretch. If the scythewretch dies, a swallowed creature exits the body Prone by using 10 feet of movement.

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
- Actions/Spitting Maw — authored for this sheet; a named part; the GM's clause "a spitting maw"
- Actions/Caustic Shell Slam — template condition-payoff; library draw (seed unstamped)
- Actions/Pinning Arm — authored for this sheet; the GM's clause "It fights by pinning prey with two arms"
- Bonus Actions/Swallow — binds the GM's words: swallow+swallows+engulf+engulfs+devour+devours+gulp+smother+entomb+cocoon+whelm
- Traits/Caustic Carapace — template heated-body; library draw (seed unstamped); the GM's clause "a shell that sheds acid"; binds the GM's words: acid+burn

**Engine trace**

```
[route] brute-grappler type=Monstrosity mechanics=grapple, engulf — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: on the GM's own words "pinning prey with two arms" | brute-grappler: ✓ ("pinning prey with two arms") | brute-grappler: no line key in the words — the model's read of its quote
[concept] resolve: archetype=brute type=Monstrosity themes=bestial/armed mind=bestial style=grappler energy=Acid mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: grapple, engulf
[concept] signature elements: pinning prey with two arms while carving with the rest [behavior] | acid-shedding shell [body] | acid spitting maw [body]
[concept] identity: The acid-shelled horror opens by spitting a searing gout from its maw to stagger a target, then lunges to clamp two scythe-arms around the nearest body and pin it down while its remaining two arms methodically carve the held prey apart. It never retreats — wounds only crack its shell, and each crack spills fresh acid until it is either killed or standing over a stripped carcass; it disdains empty threats and abandons a grapple only to reposition onto a more vulnerable foe.
[concept] lore: Hatched in the corroded husks of fallen hive-towers, this monstrosity grows new scythe-plates by etching its own acid-shedding shell, and it hunts whatever wanders too close so it can carve the meat away from the bone.
[reskin] donor: brute-8-grappler -> CR 9
[reskin] named parts: Spitting Maw (slot, Grappled) — the user's words, the engine's numbers
[reskin] named parts landed: 1 attack row(s), 0 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] inline declared: "the scythewretch" — the call's own answer (kind), built from the name
[reskin] inline form: "the scythewretch" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] clauses: "A Large insectile horror" -> has (header) | "It has four scythe-arms" -> has (mechanical) [asked: attack] | "a spitting maw" -> has (mechanical) [asked: attack] | "a shell that sheds acid" -> has (mechanical) [asked: on_being_hit/attack] | "It fights by pinning prey with two arms" -> has (mechanical) [asked: condition] | "carving with the others" -> has (mechanical) [asked: attack]
[reskin] signature idea (action): "The scythewretch turns and slams its cracked, acid-slick shell into everything packed around it, spitting a fan of caustic spray from the fissures as it swings. Creatures close to it are scorched, and any creature it is currently pinning has the acid forced straight into the wounds the arms have opened. It can only do this when fresh cracks are weeping, so it must be wounded or freshly cracked by " [action/always/damage] — menu: condition-payoff, shield-bash, hook-drag, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, exploiter (+ shelf: leap, shell-withdraw, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, affliction, contagion, stunning-strike, charge-push, hook-rider, pounce)
[reskin] signature bound to the concept's verb: action — shell-withdraw, spew, escalating-dread, exploiter (shell, spits, horror, pinned)
[reskin] word match declined by the call: shell-withdraw, spew, push-prone, affliction, ground-burst — the key word does not mean the mechanic here
[reskin] pick kept on the GM's own words: action — "condition-payoff" has no key-table verb, but the call quotes "pinning prey with two arms and carving with the others" from the description
[reskin] value check: "Caustic Shell Slam" EV 31 vs floor 16.6 (one attack of 2) — dice 63 → 40 (scaled down to the ceiling)
[reskin] signature template: condition-payoff -> Actions/"Caustic Shell Slam" ("The shell-slam sprays acid over everything packed around it, and prey it is pinn [shape fit, no verb match]")
[reskin] signature idea (trait): "Its shell weeps acid into anything that holds on to it or presses against it. Whoever has it seized, or seizes it, gets burned for the privilege of staying in contact, so clinging to the horror costs flesh." [trait/on_being_hit/damage] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] signature bound to the concept's verb: trait — heated-body (acid)
[reskin] signature template (trait): heated-body -> Traits/"Caustic Carapace" ("anything that holds onto the shell or presses against it gets burned by the acid [verb: acid:concept, burn:idea]")
[reskin] repair: 2 clause(s) with no row — "It fights by pinning prey with two arms", "carving with the others"; one targeted call with the sheet as context
[reskin] repaired sheet: 2 attack row(s), 0 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] weapons answered: Scythe-Arm = none; Searing Gout = none
[reskin] speed by concept: added Climb 40 ft. — the concept's movement set decides
[reskin] languages held: None stands — INT 4 on a Monstrosity speaks nothing, whatever the mind read said
[reskin] multiattack replacement clause: It can replace one attack with a use of Caustic Shell Slam.
[reskin] row binds its clause: "Caustic Carapace" answers "a shell that sheds acid" — the keys it matched came from that clause, so the coverage credit has a receipt
[reskin] ask vs row MISMATCH: "a shell that sheds acid" -> "Caustic Carapace" — trigger: asked on_being_hit, row reads at_will
```


---


### Brine-Witch of the Fen — in the run

**Concept:** a marsh witch who curses trespassers, cr 7

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Brine-Witch of the Fen | 7 | caster-8-binder | FAIL: attack-stat | ok | ok | ok | ok | ok | ok | ok | ok |

- derivation · fail · attack-stat: Staff: +7 derives from CHA, but an attack row rolls STR
- read: def 4 / off 8 → 6; sustained 51 (3 × Staff); nova none; dmg 51

```
Brine-Witch of the Fen

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

Languages Common, Sylvan

CR 7 (XP 2,900; PB +3)

Actions

Multiattack. The brine-witch makes three attacks, using Staff or Hex Bolt in any combination. It can replace one attack with a use of Bog Venom.

Staff. Melee Attack Roll: +7, reach 5 ft. 17 (3d8 + 4) Bludgeoning damage.

Hex Bolt. Ranged Attack Roll: +7, range 80/320 ft. 13 (2d8 + 4) Necrotic damage.

Bog Venom. Constitution Saving Throw: DC 15, one creature within 60 feet. Failure: 14 (4d6) Bludgeoning damage, and the target has the Poisoned condition until the end of its next turn.

Spellcasting. The brine-witch casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 15):

- At Will: Mage Hand, Minor Illusion
- 1/Day Each: Bestow Curse

Vitality Leech. Constitution Saving Throw: DC 15, one creature within 30 feet. Failure: 17 (5d6) Necrotic damage, and the brine-witch regains Hit Points equal to half the damage dealt. Success: Half damage only.

Trespasser's Curse. Wisdom Saving Throw: DC 15, one creature within 60 feet. Failure: The target has the Frightened condition until the end of its next turn.

Reactions

Protective Magic (3/Day). The brine-witch casts Counterspell or Shield in response to the spell's trigger, using the same spellcasting ability as Spellcasting.

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
- Actions/Staff — weapon staff
- Actions/Hex Bolt — the chassis
- Actions/Bog Venom — the chassis
- Actions/Spellcasting — the chassis
- Actions/Vitality Leech — library seed drain
- Actions/Trespasser's Curse — authored for this sheet; the GM's clause "curses trespassers"
- Reactions/Protective Magic — mage kit; the GM's clause "witch"

**Engine trace**

```
[route] caster-binder (controller) type=Humanoid mechanics=none — casts: on the GM's own words "curses trespassers" | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | caster-binder: ✓ ("curses trespassers") | caster-binder: key "curses" (class verb)
[concept] hints: binder→style ✓ ("curses trespassers; curses, rays, and co")
[concept] resolve: archetype=caster type=Humanoid themes=arcane/venomous mind=sapient style=binder energy=Poison mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: curses that steal actions [behavior] | brine-sodden flesh [body] | vanishing into the marsh reeds and water [behavior]
[concept] identity: A twisted marsh-witch humanoid whose brine-sodden flesh drips with the bog's own poison, she opens fights by layering curses on intruders—slowing, blinding, and sapping their wills before they can close. Once prey is hobbled, she circles through reeds and mire, hurling hexbolts and venom-laced rays at the helpless, retreating into the fen and vanishing beneath the water if she is bloodied badly enough to lose her advantage. She toys with trespassers, letting them stagger in the dark while she whispers the next curse.
[concept] lore: Once a hedge-witch who drowned in the marsh and made a bargain with the muck, she now guards the fen's hidden paths, cursing any who wander where they were not invited so the bog can keep them.
[reskin] energy withheld: Poison on a Humanoid with no Poison in the concept's own words (fixed phrases read first)
[reskin] donor: caster-8-binder -> CR 7
[reskin] repair round 1: 4 defect(s) — name "Claw" is a natural weapon on a Humanoid whose concept gives it none — a Humanoid swings a weapon (Scimitar, Club, Spear) | "Claw" is an anatomical name dealing Slashing on a mind-driven attacker (the attack bonus keys to CHA) — print pays physical damage on mental strikes with implement names (the Dryad's Vine Lash, the Rakshasa's Cursed Touch) or carries a magical type (the Mage's Arcane Burst deals Force); rename to a conjured implement or pick a magical type | "Hex Bolt" deals Necrotic on a Humanoid whose concept names no Necrotic — a name is not a warrant; use a physical type | "Bog Venom" deals Poison on a Humanoid whose concept names no Poison — a name is not a warrant; use a physical type
[reskin] anatomy on a humanoid: "Claw" -> "Staff" (Bludgeoning) — a Humanoid with no species claw swings a weapon; the magical stamp is for a body that has the part
[reskin] implied class kept: "mage" on the GM's own words "witch" — the key table found none
[reskin] class kit: mage — "witch": Protective Magic (3/Day) (Mage/Protective Magic)
[reskin] inline declared: "the brine-witch" — the call's own answer (kind), built from the name
[reskin] inline form: "the brine-witch" — the model's own reading of the name
[reskin] energy rider withheld: Poison on a Humanoid with no Poison in the concept's own words
[reskin] energy withheld on a base row: "Bog Venom" Poison -> Bludgeoning (the body's physical type; a Humanoid deals no Poison its concept never gave it)
[reskin] control spell gated to daily — Bestow Curse (level 3 control at will is print's CR 13+ shape; at CR 7 it is 1/Day)
[reskin] daily spell dropped — Blight (36 avg vs 17 per-hit; print's only daily damage spell is the Adult Red's Fireball at ~1.1x)
[reskin] spell DC coherence: DC 14 -> 15 off Charisma 18 (the stat makes the attack rolls)
[reskin] save dc derived: DC 14 -> 15 (8 + PB 3 + Charisma's 4) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a marsh witch" -> has (descriptive), head | "curses trespassers" -> has (mechanical) [asked: condition] | "cr 7" -> has (header)
[reskin] extraction: 1 of 3 model clauses quote nothing the user typed and leave the record ("cr 7")
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The witch points at a foe already suffering from one of her lingering banes and speaks a stealing word, wrenching the poison and hex out of their body and back into her own hands. The curse leaves the victim cleansed but dazed, while the witch gains a surge of stolen vigor she can spend to curse or strike again. It only works on someone she has already marked with one of her own afflictions, so it" [bonus_action/save/resource] — menu: lay-on-hands, aggro-curse, self-invisibility, rally (+ shelf: condition-payoff, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, snare-bolt, slow-bolt, sensory-strike, herd, thrown-burst-seed, drain, delayed-brand, curse-debt, zone-seed, reveal, wind-up, blighted-ground, snap-shot, bolt-restrain, bolt-drag, bolt-mark)
[reskin] word match declined by the call: delayed-brand, curse-debt, seal, reveal — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit"
[reskin] signature miss: action — "The witch points at a foe already suffering from one of her lingering banes and speaks a stealing word, wrenching the poison and hex out of their body and back into her own hands. The curse leaves the victim cleansed but dazed, while the witch gains a surge of stolen vigor she can spend to curse or strike again. It only works on someone she has already marked with one of her own afflictions, so it" [bonus_action/save/resource] — the model found no template that holds it (offered: lay-on-hands, aggro-curse, self-invisibility, rally, delayed-brand, curse-debt, seal, reveal, bolt-mark)
[reskin] fallback respects the call: seal, delayed-brand, curse-debt left the shelf — the call declined them for this sheet
[reskin] fallback skipped by the floor: herd (EV 6.6 vs 43.1)
[reskin] value check: "Vitality Leech" EV 13.2 vs floor 8.8 (one attack of 3) — added Success: Half; dice 10 → 17
[reskin] library seed drawn: drain -> Actions/"Vitality Leech" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Brine oozes from the witch's sodden flesh and clings to anything that cuts or touches her, so the wounds she takes seep marsh-poison back into her attacker. The residue lingers on their skin, making their next strike falter as the fen's chill sinks in." [trait/on_being_hit/condition] — menu: absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst)
[reskin] signature bound to the concept's verb: trait — terrain-walk (marsh)
[reskin] word match declined by the call: terrain-walk, aberrant-ground, bloodied-burst, bloodied-fury — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit" after being shown terrain-walk, which the GM's words keyed
[reskin] key match declined: trait — "terrain-walk" was ranked first on the call's own menu for marsh, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: trait — "Brine oozes from the witch's sodden flesh and clings to anything that cuts or touches her, so the wounds she takes seep marsh-poison back into her attacker. The residue lingers on their skin, making their next strike falter as the fen's chill sinks in." [trait/on_being_hit/condition] — the model found no template that holds it (offered: terrain-walk, absorption, bloodied-burst, resonant-body, aberrant-ground, bloodied-fury)
[reskin] repair: 1 clause(s) with no row — "curses trespassers"; one targeted call with the sheet as context
[reskin] repaired sheet: 2 attack row(s), 1 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] weapons answered: Claw = none; Hex Bolt = none; Bog Venom = none; Mire Curse = none
[reskin] weapon declined: "Hex Bolt" reads crossbow from its name, but the call answered none — the row carries no weapon
[reskin] weapon table: "Hex Bolt" — a launcher, never thrown, range 80/320
[reskin] multiattack replacement clause: It can replace one attack with a use of Bog Venom.
```


---


### Ashvowed Brannor — in the run

**Concept:** a templar priest with a mace and no magic at all

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Ashvowed Brannor | 6 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 5 / off 6 → 5.5; sustained 44 (2 × Mace); nova none; dmg 44

```
Ashvowed Brannor

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

Multiattack. Brannor makes two Mace attacks.

Mace. Melee Attack Roll: +7, reach 5 ft. 22 (4d8 + 4) Bludgeoning damage, and the target has Disadvantage on its next attack roll before the start of Brannor's next turn.

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
[route] defender type=Humanoid mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | defender: ✓ ("a templar priest with a mace and no magi") | defender: no line key in the words — the model's read of its quote
[concept] resolve: archetype=defender type=Humanoid themes=armed/forged mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: the mace of unanswered prayer [object] | an immovable shield-wall vigil [behavior] | armor of cold, ash-grey iron [body]
[concept] identity: A veteran templar who has outlived every prayer that ever answered, this priest carries a heavy iron-shod mace and advances behind a wall of plate and shield, opening by planting itself in the narrowest ground and daring the line to break on it. Every round it fights as a soldier, not a cleric: shield-bash to shove a foe off-balance, then a two-handed mace blow that channels the bitter weight of unanswered faith into crushing force. It does not flee when bloodied — it digs in deeper, silently absorbing punishment and punishing anyone who tries to slip past to softer targets, until it or the line falls.
[concept] lore: Once a temple's anointed guardian, this templar was stripped of its god's favor but not its oath, and now keeps a vigil no divine ear attends, holding doors and shrines that will never be sanctified again.
[reskin] print canon array: STR 18, DEX 10, CON 12, INT 13, WIS 16, CHA 13 — the Priest's, STR fitted to +7
[reskin] donor: defender-5 -> CR 6
[reskin] row gated out: Guard Aura (aura) — the concept did not claim this mechanic
[reskin] print canon: "a templar priest with a mace and no magic at all" heads on the Priest — print's rows ride along; the seat stays
[reskin] repair round 1: 1 defect(s) — rename for "Hybrid Attack" takes the shelf's own row name "Shield Bash" — that name belongs to a template this sheet may still receive; choose another
[reskin] named parts: Mace (slot) — the user's words, the engine's numbers
[reskin] named parts landed: 1 attack row(s), 0 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] chassis row off: Actions/"Two-Handed Mace Blow" leaves — the GM named a melee weapon (Mace); one weapon, one rule set
[reskin] class kit: Divine Aid — the sheet carries no row it could refer to (/^Spellcasting$/)
[reskin] class kit: cleric — "a templar priest with a mace": nothing to add — the sheet already answers it
[reskin] inline declared: "Brannor" — the call's own answer (person), built from the name
[reskin] inline form: "Brannor" — the model's own reading of the name
[reskin] lacks asked: "no magic at all"
[reskin] clauses: "a templar priest with a mace" -> has (mechanical) [asked: attack] | "no magic at all" -> LACKS (mechanical)
[reskin] signature idea (action): "Brannor plants his shield and stakes out a patch of ground as a held threshold, and it stays held: anyone trying to cross that line or slip past him toward whatever he is guarding must get through him first, and the longer he stands there unbroken the harder that ground is to take. The vigil ends the moment he is forced off his spot or chooses to advance — it is ground he holds, not a spell he cas" [trait/start_of_turn/movement] — menu: warded-mending (+ shelf: seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, riposte, stunning-strike, charge-push, hook-rider)
[reskin] decline reason: action — the call answered none and names it "no_fit"
[reskin] signature miss: action — "Brannor plants his shield and stakes out a patch of ground as a held threshold, and it stays held: anyone trying to cross that line or slip past him toward whatever he is guarding must get through him first, and the longer he stands there unbroken the harder that ground is to take. The vigil ends the moment he is forced off his spot or chooses to advance — it is ground he holds, not a spell he cas" [trait/start_of_turn/movement] — the model found no template that holds it (offered: warded-mending, disarm, rally)
[reskin] fallback stands down: "a templar priest with a mace and no magic at all" heads on the Priest and asks for nothing — print's rows, nothing invented (the big ogre, critic-ten 2026-10-01)
[reskin] value check: "Dazzling Burst" EV 2.9 vs floor 10.9 (one attack of 2) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Dazzling Burst" — a seed that cannot be lifted does not ship
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 19 already beats print's AC 15 at CR 6, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "Every blow Brannor takes without flinching is folded into his mace — the unanswered prayers, the bruises, the silence — and his next strike comes down heavier for it, so the longer the line holds and the more he absorbs, the more the mace answers for him." [trait/on_being_hit/damage] — menu: absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura)
[reskin] word match declined by the call: warded-mending, absorption — the key word does not mean the mechanic here
[reskin] trait declined: "Vow of Endurance" — a shape fit with no verb match on a Humanoid body; a meat body earns its trait by a verb
[reskin] weapons answered: Mace = mace; Shield Bash = shield
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] print canon alignment: Lawful Neutral -> Neutral — the Priest's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common" -> "Common plus one other language" — the Priest's
[reskin] print canon row: Actions/Spellcasting — the Priest's own
[reskin] print canon row: Bonus Actions/Divine Aid (3/Day) — the Priest's own
audit finding below confidence gate: Spellcasting Spirit Guardians creates a damaging aura with no escape DC or repeat save path out once a creature moves into the area — but movement out of the area IS the rules-legal escape, so this is not a defect.
[reskin] spellcasting dc: "Spellcasting" prints spell save DC 14 — 8 + PB + Wisdom (print carries it in 45 of 48 rows)
[reskin] lacks clause: Actions/"Spellcasting" leaves — "no magic at all"
[reskin] dead wildcard name swept — "Divine Aid (3/Day)" was only about "Spellcasting"; the row drops
```


---


### Squallchaser Drake — in the run

**Concept:** a young storm drake whose breath is a rolling wall of thunder

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Squallchaser Drake | 7 | dragon-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- **dropped clause:** "a young storm drake whose breath is a rolling wall of thunder"
- read: def 5 / off 7 → 6; sustained 35 (1 × Talons); nova Thunder Roll 39; dmg 49

```
Squallchaser Drake

Medium Dragon, Chaotic Neutral

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

Talons. Melee Attack Roll: +7, reach 5 ft. 22 (4d8 + 4) Slashing damage plus 13 (3d8) Thunder damage. If the drake moved at least 20 feet in a straight line toward the target immediately before the hit, the target takes an extra 17 (5d6) Thunder damage and, if it is Large or smaller, has the Prone condition.

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

- Actions/Talons — binds the GM's words: ram
- Actions/Thunder Roll — the chassis

**Engine trace**

```
[route] dragon type=Dragon mechanics=breath — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | dragon: ✓ ("young storm drake") | dragon: key "drake" (class body)
[concept] hints: dragon→body ✓ ("a young storm drake — it is the drake") | breath→mechanics ✓ ("breath is a rolling wall of thunder")
[concept] resolve: archetype=dragon type=Dragon themes=draconic/aerial mind=sapient style=— energy=Thunder mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: breath
[concept] signature elements: rolling wall of thunder breath [behavior] | storm-charged draconic body [body] | aerial predation on storm fronts [behavior]
[concept] identity: A young storm drake circles high on thunder-charged wings, then opens with its breath — a rolling wall of concussive sound that bowls prey over and leaves it staggering. Every round after, it dives to rake with claws and snap with jaws between recharging thunder-walls, using altitude to line up the next roll of noise. Arrogant and playful rather than desperate, it toys with grounded foes from the air and only withdraws when genuinely bloodied and outflown.
[concept] lore: Hatched in the boiling squall-lines where mountain ridges tear the sky, this drake rides the storm front like a surfer and descends on lowland herds and caravans for the sheer sport of scattering them.
[reskin] body type: dragon — the body outranks the role (recorded: dragon)
[reskin] nova capped: "Breath Weapon" 42 → 39 (the chassis nova obeys the cap: 39 at CR 7)
[reskin] donor: dragon-2 -> CR 7
[reskin] inline declared: "the drake" — the call's own answer (kind), built from the name
[reskin] inline form: "the drake" — the model's own reading of the name
[reskin] save dc derived: DC 14 -> 15 (8 + PB 3 + the sheet's best 4) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a young storm drake whose breath is a rolling wall of thunder" -> has (mechanical)
[reskin] menu pruned: action — escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating (the sheet cannot render them)
[reskin] signature idea (action): "The drake tips into a screaming power dive, wings folded, dragging a battering ram of compressed thunder ahead of it. Anything in the path of the dive is shoved hard aside or knocked flat by the pressure wave as the drake sweeps through, then it pulls up somewhere new with the noise still rolling behind it." [action/always/movement] — menu: gaze-single, snare, zone, execute, seal, shield-bash, lure (+ shelf: rampage, lay-on-hands, second-wind, affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, charge)
[reskin] signature rider: charge -> Talons (appended; the drake power-dives through a path, shoving creatures aside or knocking them f [verb: ram:idea])
[reskin] signature idea (trait): "The drake's hide crackles with borrowed storm-charge, so every blow it lands carries a crawling aftershock of thunder that lingers in the wound and makes the victim clumsy and slow to react for a few heartbeats." [trait/always/condition] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending, weapon-lodge)
[reskin] signature bound to the concept's verb: trait — heated-body (storm)
[reskin] word match declined by the call: bloodied-fury, bloodied-burst, fire-aura, heated-body — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit" after being shown heated-body, which the GM's words keyed
[reskin] key match declined: trait — "heated-body" was ranked first on the call's own menu for storm, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: trait — "The drake's hide crackles with borrowed storm-charge, so every blow it lands carries a crawling aftershock of thunder that lingers in the wound and makes the victim clumsy and slow to react for a few heartbeats." [trait/always/condition] — the model found no template that holds it (offered: heated-body, false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst, bloodied-burst, fire-aura)
[reskin] weapons answered: Talons = none; Thunder Roll = none
[reskin] chassis nova: "Thunder Roll (Recharge 5-6)" — the dragon-2's own nova row (its "Breath Weapon", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] element immunity: Thunder (merged into the header write)
[reskin] dragon senses raised to tier: blindsight 30 added
[reskin] dragon senses raised to tier: darkvision 60 -> 120
[reskin] dragon languages: Draconic added (42/42 print dragons speak it)
[reskin] immunities stamped for type: Dragon -> Thunder
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

Grinding Arc. The skeleton adheres to anything that touches it. A Huge or smaller creature adhered to the skeleton is also Grappled by it (escape DC 15). Ability checks made to escape this grapple have Disadvantage.

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
- Traits/Grinding Arc — template adhesive; library draw (seed unstamped)
- Traits/Great Weapon Master — a declared feature; the GM's clause "a skeleton with a greatsword"

**Engine trace**

```
[route] brute type=Undead mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | brute: ✓ ("a skeleton with a greatsword") | brute: no line key in the words — the model's read of its quote
[concept] resolve: archetype=brute type=Undead themes=grave/armed mind=mindless style=— energy=Necrotic mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: two-handed greatsword sweeps from a skeletal frame [object] | relentless, tireless advance that never breaks [behavior] | grave-cold necrotic edge on its cuts [aura]
[concept] identity: A greatsword skeleton opens by reading the room behind its blade — it plants itself in a doorway or corridor and lets the first charge break on a two-handed overhead cut, then settles into a grinding, mechanical rhythm of wide sweeps and shoulder-check shoves that keep prey inside its reach. It has no fear and no cunning beyond timing: it does not flee, does not tire, and will grind a wounded foe against a wall until the bones of its own hands crack and reknit.
[concept] lore: Raised from the mass graves of a broken mercenary company by a necromancer who needed a blade that would never ask for pay, it still remembers a sword-drill in its marrow and drills anything warm that enters its post.
[reskin] print canon array: STR 18, DEX 16, CON 15, INT 6, WIS 8, CHA 5 — the Skeleton's, STR fitted to +7
[reskin] donor: brute-5 -> CR 6
[reskin] print canon: "a skeleton with a greatsword" heads on the Skeleton — print's rows ride along; the seat stays
[reskin] named parts: Greatsword (slot) — the user's words, the engine's numbers
[reskin] named parts landed: 1 attack row(s), 0 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] implied class refused: the call answered "fighter" but this body takes no class kit — a beast or a mind too simple to train
[reskin] inline declared: "the skeleton" — the call's own answer (kind), built from the name; the rules would have said "Skeleton"
[reskin] inline on kit rows: "Skeleton" -> "the skeleton"
[reskin] inline form: "the skeleton" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a skeleton with a greatsword" -> has (mechanical)
[reskin] signature idea (action): "The skeleton drops its shoulder and drives forward in a straight line, plowing through anything in its path and shoving those it strikes back out of its way. Anyone it hits is left off balance and struggling to stay upright, easy prey for the sweeps that follow." [rider/on_hit/movement] — menu: affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, charge (+ shelf: trample, leap, thrown-burst, throw-retrieve, shield-bash, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, rampage, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating)
[reskin] fit declined: "Plowing Charge" — a print body takes only what the user's words ask; the call offered no quote, and the key table finds no verb either (the blacksmith's rally, critic-ten 2026-10-01)
[reskin] fallback stands down: "a skeleton with a greatsword" heads on the Skeleton and asks for nothing — print's rows, nothing invented (the big ogre, critic-ten 2026-10-01)
[reskin] value check: "Dazzling Burst" EV 2.9 vs floor 10.9 (one attack of 2) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Dazzling Burst" — a seed that cannot be lifted does not ship
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "Its greatsword cuts a wide, grinding arc that keeps dragging through whoever it strikes, so a foe it catches stays locked in the fight beside it and cannot slip away cleanly. The blade never stops its sweep, and anything it touches stays within reach of the next one." [trait/always/condition] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending, weapon-lodge)
[reskin] signature template (trait): adhesive -> Traits/"Grinding Arc" ("The grinding arc locks foes it catches beside the skeleton, keeping them within  [shape fit, no verb match]")
[reskin] weapons answered: Greatsword = greatsword; Bone Spur = none
[reskin] print canon alignment: Neutral -> Lawful Evil — the Skeleton's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon name: "Drilled Skeleton" -> "Skeleton" — a whole print name is the creature's name (the Goblin Boss shipped as Krag the Iron Standard, 2026-10-01)
[reskin] print canon languages: "None" -> "Understands Common plus one other language but can't speak" — the Skeleton's
[reskin] print canon speed: 40 ft. -> 30 ft. — the Skeleton's walk; the concept's other modes stay
[reskin] print canon attack: "Bone Spur" -> "Shortbow" — the Skeleton's own ranged row
[reskin] immunities stamped for type: Undead -> Poison; Exhaustion, Poisoned
[reskin] print canon defenses: vulnerabilities none -> Bludgeoning — the Skeleton's own header lines
[reskin] vulnerability rejected — "Bludgeoning" has no warrant in the concept's own text (print's default is none)
[reskin] audit rename blocked — "Great Weapon Master" is the user's own part name, a kit feature's real name, or print's own row
[reskin] escape dc: Grinding Arc → DC 15 (8 + PB + STR; a late row wore another number)
[reskin] multiattack re-read — "Shortbow" joins the combination; "The skeleton makes two attacks, using Greatsword or Shortbow in any combination."
```


---

## Review batch — features-2026-10-18-2026-10-18T15-49-53

The checker ran first. The gate table covers every block in the run; every block of the run follows. Each block carries its checker row above and its engine trace below. Hand-derive against the row first; then read for what predicates can't see.

### Gate table — the whole run

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Scent-Stalker | 5 | 2024 | lurker-5 | ok | ok | ok | ok | ok | ok | ok | ok | FAIL: alignment-fit | FAIL (1) | 2/2 | 3/4 |
| Drowned Keeper | 5 | 2024 | lurker-5-phantom | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 6/7 |
| Barrow Wight | 4 | 2024 | lurker-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |
| Gale-Wrack | 6 (2014) | 2014 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 5/7 |
| Pip Thistlewisp | 3 (2014) | 2014 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 4/5 |
| Druid | 2 | 2024 | caster-6 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 2/2 |
| Ember Almoner | 4 (2014) | 2014 | caster-6 | ok | SOFT: band | ok | ok | ok | ok | SOFT: print-rows | ok | ok | soft (2) | 2/2 | 5/5 |
| Old Master Vellum | 3 | 2024 | caster-6 | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | soft (1) | 2/2 | 1/1 |
| Skeleton | 2 | 2024 | brute-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/4 |
| Champion of the Sands | 4 (2014) | 2014 | brute-2 | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 1/2 |
| Ogre | 3 | 2024 | brute-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 5/5 |
| Mummy | 3 | 2024 | defender-3 | SOFT: hit-die | ok | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 2/2 |
| Sexton of the Flooded Nave | 4 | 2024 | lurker-1-phantom | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 6/8 |
| Widow Alderkin | 3 | 2024 | lurker-1-phantom | ok | SOFT: aim-hp | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/2 | 5/5 |
| Stone That Walks | 17 (2014) | 2014 | brute-17-juggernaut | ok | SOFT: hot-offense | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/2 | 6/9 |
| Mire-Gorge Troll | 6 | 2024 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 4/4 |
| Scarred Linebreaker | 8 (2014) | 2014 | brute-5 | SOFT: duplicate-mechanic | SOFT: band | ok | ok | ok | ok | ok | ok | ok | soft (2) | 1/1 | 3/4 |
| Iron Inquisitor | 6 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 2/3 |
| Coil-Bound Keeper | 7 | 2024 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/2 | 2/3 |
| Vice-Rock Griever | 6 (2014) | 2014 | brute-5-juggernaut | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 0/7 |
| Ilyn Surestrike | 5 (2014) | 2014 | skirmisher-3 | ok | SOFT: band | ok | SOFT: ko-at-will, ko-at-will, rider-no-save | ok | ok | ok | ok | ok | soft (2) | 1/1 | 3/6 |
| Brine-Priest of the Congregation | 6 | 2024 | caster-2-warpriest | ok | SOFT: band | ok | SOFT: rider-no-save | ok | ok | ok | ok | ok | soft (2) | 1/2 | 6/6 |
| Hose-Fouled Diver | 4 (2014) | 2014 | lurker-1-phantom | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 5/5 |
| Dame Oriel | 5 | 2024 | defender-3-leader | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 2/4 |
| Grave-Pit Swarm | 4 (2014) | 2014 | swarm-3 | FAIL: lint:attack-mod-coherence | ok | ok | ok | ok | ok | ok | ok | ok | FAIL (1) | 1/1 | 2/2 |
| Marrow Quill | 6 (2014) | 2014 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 5/5 |
| Ssith | 4 | 2024 | lurker-2 | ok | SOFT: aim-hp | ok | ok | ok | ok | ok | ok | ok | soft (1) | 9/16 | 7/7 |
| Grik | 1 | 2024 | brute-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 1/2 |
| Tunnel Cave Troll | 3 (2014) | 2014 | brute-2 | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | soft (1) | 2/2 | 2/3 |
| Thurivald | 9 | 2024 | skirmisher-8-hurler | ok | user-set: AC 17, HP 180 · reads CR 9 | ok | ok | ok | ok | ok | ok | ok | clean | 6/7 | 7/7 |

**Dropped 14 of 61 user clauses** (coverage 77%); concept share 79% (109/138 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- lurker-5 / reader: 1
- swarm-3 / derivation: 1



---


### Grik — lowest CR

**Concept:** name: Grik | 

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Grik | 1 | brute-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1/8 / off 1 → 0.5625; sustained 9 (1 × Cudgel); nova none; dmg 9

```
Grik

Medium Humanoid, Neutral

AC 12
Initiative -1 (9)

HP 32 (5d8 + 10)

Speed 30 ft.

MOD
SAVE
STR
14
+2
+4
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

Skills Athletics +4, Perception +1

Senses Passive Perception 11

Languages Common

CR 1 (XP 200; PB +2)

Actions

Cudgel. Melee Attack Roll: +4, reach 5 ft. 9 (2d6 + 2) Bludgeoning damage.

Bonus Actions

Grudge Charge (1/Day). Immediately after dealing damage to a creature that is already Bloodied, Grik moves up to half its Speed, and it makes one Cudgel attack.

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

- Actions/Cudgel — weapon club
- Bonus Actions/Grudge Charge — template rampage; library draw (seed unstamped); binds the GM's words: bloodied+blood

**Engine trace**

```
[route] brute type=Humanoid mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | brute: ✓ ("Grik") | brute: no line key in the words — the model's read of its quote
[concept] resolve: archetype=brute type=Humanoid themes=bestial/armed mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: provided "Grik"
[concept] mechanics: none claimed
[concept] signature elements: iron-bound cudgel swung flat [object] | trading blows until it falls [behavior] | scarred hide gone iron-hard [body]
[concept] identity: Grik wades in hefting a great iron-bound cudgel, opening with a flat, crushing swing meant to put the biggest target on its back. Every round after, it stays chest-to-chest and trades blows, soaking hurts through thick hide and half-healed scar tissue while hammering at whatever hit it last. It fights to the death once blood is drawn, too stubborn or too enraged to run.
[concept] lore: Grik was a pit-fighter sold between camps until the iron he broke with his hands seemed to settle into his bones, and now he wants nothing but an opponent who will not fall down.
[reskin] donor: brute-2 -> CR 1
[reskin] claim gate: CR 1 but a Humanoid body — the trait seat stays open (print: a material body carries a trait at every tier)
[reskin] implied class refused: the call answered "barbarian" but offered no quote
[reskin] proper noun: "Grik" — the Name field is a person, not a kind (no print match, no article in the words)
[reskin] inline declared: "Grik" — the call's own answer (person), built from the name
[reskin] inline form: "Grik" — the model's own reading of the name
[reskin] save dc derived: DC 11 -> 12 (8 + PB 2 + the sheet's best 2) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Grik" -> has (descriptive), head
[reskin] signature idea (action): "Grik drags the fight back to the last fool who drew blood, shoving through anyone in his way and closing on that foe with a flat, iron-bound swing that knocks the wind out of them and pins their feet where they stand. He can only do this while that enemy is still up and still nearby; once they drop, he has to pick a new grudge the old-fashioned way." [rider/on_hit/condition] — menu: charge-push, hook-rider, pounce, charge (+ shelf: shield-bash, active-toll, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, rampage, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating)
[reskin] word match declined by the call: hook-rider, pounce, push-prone, wind-up, charge-push, charge — the key word does not mean the mechanic here
[reskin] value check: "Grudge Charge (1/Day)" EV 7.6 vs floor 1.5 (a bonus action (free)) — worth the trade
[reskin] signature template: rampage -> Bonus Actions/"Grudge Charge (1/Day)" ("The ability only triggers off a foe who has already drawn blood (is Bloodied), s [verb: bloodied:idea, blood:idea]")
[reskin] signature idea (trait): "Every blow that lands on Grik just winds him tighter — each time he's struck he hefts the cudgel a little harder on his next swing, the anger building until it boils over into one savage answer to whoever hurt him most." [trait/on_being_hit/damage] — menu: absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] trait declined: "Grudge-Laden Cudgel" — a shape fit with no verb match on a Humanoid body; a meat body earns its trait by a verb
[reskin] weapons answered: Cudgel = club
[reskin] languages by mind: "None" -> "Common" (sapient)
```


---


### Scent-Stalker — a 2024 sheet

**Concept:** an eyeless hunter that tracks prey by scent alone

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Scent-Stalker | 5 | lurker-5 | ok | ok | ok | ok | ok | ok | ok | ok | FAIL: alignment-fit |

- reader · fail · alignment-fit: Unaligned on a Monstrosity with INT 12 that speaks None — Unaligned is for a creature with no capacity for ethics
- read: def 4 / off 5 → 4.5; sustained 38 (2 × Talons); nova none; dmg 38

```
Scent-Stalker

Medium Monstrosity, Unaligned

AC 15
Initiative +3 (13)

HP 78 (12d8 + 24)

Speed 30 ft., Climb 30 ft.

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

Senses blindsight 60 ft. (blind beyond this radius); Passive Perception 14

Languages None

CR 5 (XP 1,800; PB +3)

Traits

Assassinate. During the first round of each combat, the scent-stalker has Advantage on attack rolls against any creature that hasn't taken a turn. If the scent-stalker hits a creature during that round, the target takes an extra 9 (2d8) Poison damage.

Actions

Multiattack. The scent-stalker makes two Talons attacks.

Talons. Melee Attack Roll: +6, reach 5 ft. 12 (2d8 + 3) Slashing damage plus 7 (2d6) Poison damage.

Bonus Actions

Shadow Slink. While in Dim Light or Darkness, the scent-stalker takes the Hide action.

Lingering Scent (2/Day). The scent-stalker has Advantage on the next attack roll it makes before the end of its turn.

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
- Actions/Talons — the chassis
- Bonus Actions/Shadow Slink — the chassis
- Bonus Actions/Lingering Scent — library seed focus; the GM's clause "tracks prey by scent alone"; binds the GM's words: track
- Traits/Assassinate — template assassinate; library draw (seed unstamped)

**Engine trace**

```
[route] lurker type=Monstrosity mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | lurker: ✓ ("an eyeless hunter that tracks prey by sc") | lurker: no line key in the words — the model's read of its quote
[concept] resolve: archetype=lurker type=Monstrosity themes=bestial/subterranean mind=bestial style=— energy=Poison mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: scent-tracking an eyeless hunter [behavior] | a single devastating opening strike from hiding [behavior] | bone-ridged hooked limbs [body]
[concept] identity: An eyeless hunter stalks its prey utterly unseen, reading the world as a wash of scent until it is close enough to end the fight in one opening lunge of hooked bone-tipped limbs. After that first strike it melts back into cover, circles downwind, and repeats — never brawling, always re-hiding, letting its poison-slick claws do the work while the target's panic drowns in its own blood-scent. Wounded and bloodied, it does not flee; its own leaking blood only makes the scent-game sweeter, and it fights to the death with a patient, bestial cruelty.
[concept] lore: Spawned in lightless caverns where its buried eyes rotted away over generations, it hunts by taste of air and leaves a trail of scent-marked bones to warn others off its killing ground.
[reskin] donor: lurker-5 -> CR 5
[reskin] row gated out: Teleport (teleport) — the concept did not claim this mechanic
[reskin] implied class refused: the call answered "rogue" but this body takes no class kit — a beast or a mind too simple to train
[reskin] inline by rule: "the scent-stalker" — the call answered "the stalker" (kind), which the name does not support
[reskin] lacks asked: "eyeless"
[reskin] clauses: "an eyeless hunter" -> LACKS (mechanical) | "tracks prey by scent alone" -> has (mechanical) [asked: at_will]
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The scent-stalker marks its quarry with a slow, deliberate breath of musk it can follow anywhere — the marked creature carries that reek through the air, and the hunter knows exactly where it is and how it moves for the rest of the hunt. The mark spreads to anyone who lingers close to the marked creature, so crowding around a comrade only helps the eyeless thing find all of them together." [action/always/condition] — menu: leap, execute, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, terror-pulse, snare-bolt, slow-bolt, sensory-strike, drain, zone-seed, blighted-ground (+ shelf: delayed-brand, patient-defense, self-invisibility, focus, feint-slip, coating, riposte, affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, isolation)
[reskin] signature bound to the concept's verb: action — focus, isolation (track, alone)
[reskin] value check: "Blood-Scent Brand" EV 5.5 vs floor 9.4 (one attack of 2) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Blood-Scent Brand" — the ladder could not lift it; the fallback stands in
[reskin] value check: "Predatory Focus (2/Day)" EV 2.9 vs floor 2.9 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: focus -> Bonus Actions/"Predatory Focus (2/Day)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Its bone-ridged hooks are caked in residue that keeps working on a wound, so every gash it leaves keeps stinging and weakening the target until the poison runs its course — and the same residue coats the creature's claw-arms, so hacking at it in melee means taking that bite onto the attacker's own hands." [trait/always/damage] — menu: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, evasion, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, assassinate, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature bound to the concept's verb: trait — faultless-tracker (track, tracks, tracking, scent)
[reskin] word match declined by the call: faultless-tracker, uncanny-sense — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit" after being shown faultless-tracker, which the GM's words keyed
[reskin] key match declined: trait — "faultless-tracker" was ranked first on the call's own menu for track+tracks+tracking+scent, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: trait — "Its bone-ridged hooks are caked in residue that keeps working on a wound, so every gash it leaves keeps stinging and weakening the target until the poison runs its course — and the same residue coats the creature's claw-arms, so hacking at it in melee means taking that bite onto the attacker's own hands." [trait/always/damage] — the model found no template that holds it (offered: faultless-tracker, false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, evasion, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, assassinate, blurred-form, death-burst, bloodied-burst)
[reskin] seat default: lurker owes assassinate by print — it seats before the idea
[reskin] signature template (trait): assassinate -> Traits/"Assassinate" ("the seat owes it by print")
[reskin] concept-first trait skipped: faultless-tracker — the call read its match as a collision (the word is a modifier, or the sheet already answers it)
[reskin] weapons answered: Talons = none
[reskin] row binds its clause: "Predatory Focus" answers "tracks prey by scent alone" — the keys it matched came from that clause, so the coverage credit has a receipt
[reskin] ask vs row MISMATCH: "tracks prey by scent alone" -> "Predatory Focus" — limit: asked at_will, row reads per_day
[reskin] audit rename: "Umbral Step" -> "Shadow Slink"
[reskin] audit rename: "Predatory Focus (2/Day)" -> "Lingering Scent (2/Day)"
```


---


### Drowned Keeper — a print donor

**Concept:** a mournful ghost that drifts through the walls of the drowned chapel

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Drowned Keeper | 5 | lurker-5-phantom | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1/4 / off 5 → 2.625; sustained 34 (2 × Withering Touch); nova none; dmg 34

```
Drowned Keeper

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

Resistances Bludgeoning, Piercing, Slashing

Immunities Necrotic, Poison; Charmed, Exhaustion, Frightened, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained

Senses darkvision 60 ft.; Passive Perception 11

Languages Common plus one other language

CR 5 (XP 1,800; PB +3)

Traits

Incorporeal Movement. The keeper can move through other creatures and objects as if they were Difficult Terrain. It takes 5 (1d10) Force damage if it ends its turn inside an object.

Sunlight Sensitivity. While in sunlight, the keeper has Disadvantage on ability checks and attack rolls.

Ethereal Sight. The keeper can see 60 feet into the Ethereal Plane when it is on the Material Plane.

Actions

Multiattack. The keeper makes two Withering Touch attacks. It can replace one attack with a use of Horrific Visage.

Withering Touch. Melee Attack Roll: +6, reach 5 ft. 17 (4d6 + 3) Necrotic damage.

Horrific Visage. Wisdom Saving Throw: DC 14, each creature in a 60-foot Cone that can see the keeper and isn't an Undead. Failure: 10 (2d6 + 3) Psychic damage, and the target has the Frightened condition until the start of the keeper's next turn. Success: The target is immune to this ghost's Horrific Visage for 24 hours.

Possession (Recharge 6). Charisma Saving Throw: DC 14, one Humanoid the keeper can see within 5 feet. Failure: The target is possessed by the keeper; the keeper disappears, and the target has the Incapacitated condition and loses control of its body. The keeper now controls the body, but the target retains awareness. The keeper can't be targeted by any attack, spell, or other effect, except ones that specifically target Undead. The keeper's game statistics are the same, except it uses the possessed target's Speed, as well as the target's Strength, Dexterity, and Constitution modifiers.
The possession lasts until the body drops to 0 Hit Points or the keeper leaves as a Bonus Action. When the possession ends, the keeper appears in an unoccupied space within 5 feet of the target, and the target is immune to this ghost's Possession for 24 hours. Success: The target is immune to this ghost's Possession for 24 hours.

Etherealness. The keeper casts the Etherealness spell, requiring no spell components and using Charisma as the spellcasting ability. The keeper is visible on the Material Plane while on the Border Ethereal and vice versa, but it can't affect or be affected by anything on the other plane.

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
- Actions/Multiattack — the chassis
- Actions/Withering Touch — the chassis
- Actions/Horrific Visage — print's own row
- Actions/Possession — print's own row
- Actions/Etherealness — print's own row

**Engine trace**

```
[route] lurker-phantom type=Undead mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | lurker-phantom: ✓ ("a mournful ghost that drifts through the") | lurker-phantom: key "drifts" (class verb)
[concept] name: provided_name rejected — "a mournful ghost that drifts through the…" is the description, not a name
[concept] hints: phantom→style ✓ ("a mournful ghost that drifts")
[concept] resolve: archetype=lurker type=Undead themes=grave/aquatic mind=sapient style=phantom energy=Necrotic mix=energy identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: drifting through the chapel walls like mist [behavior] | draining the warmth of the living [behavior] | the drowned chapel and its floodwater [aura]
[concept] identity: The mournful ghost opens a fight by rising up through the chapel's flooded floor to drain the warmth from the nearest living soul, then drifts wall to wall in a slow, sobbing circuit, striking through stone as if it were mist and never breaking stride. It recoils from any sudden lantern or spell-light, hissing and retreating through the masonry, only to seep back the moment darkness returns. It does not toy and does not truly flee — it grieves and it feeds, driven by need rather than malice, and it will follow a warm body until that warmth is spent.
[concept] lore: She was the chapel's keeper when the flood took the village, and she drowned still ringing the bell for the living; now she walks the drowned nave, draining the warmth of any living trespasser because she cannot remember what her own warmth felt like.
[reskin] print canon pb: print's +5 on PB +2 reads +6 on this sheet's PB +3; DCs follow
[reskin] print canon defenses: HP 68 -> 45, AC 13 -> 11 — the Ghost's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 7, DEX 13, CON 10, INT 10, WIS 12, CHA 17 — the Ghost's at its own CR; attack +6 -> +6, DC 14 (print's, on this sheet's PB)
[reskin] donor: lurker-5-phantom -> CR 5
[reskin] print canon: "a mournful ghost that drifts through the walls of the drowned chapel" heads on the Ghost — print's rows ride along; the seat stays
[reskin] inline declared: "the keeper" — the call's own answer (kind), built from the name
[reskin] inline form: "the keeper" — the model's own reading of the name
[reskin] save dc derived: DC 13 -> 14 (8 + PB 3 + the sheet's best 3) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a mournful ghost" -> has (descriptive), head | "drifts through the walls of the drowned chapel" -> has (descriptive)
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The keeper phases through a solid wall, pillar, or flooded floor and comes out the far side already reaching, so the stone between you and her was never really there. Anyone she passes through on the way feels the flood rise in their lungs for a moment, cold water where breath should be, and their warmth is pulled toward her." [rider/on_hit/damage] — menu: stunning-strike, charge-push, hook-rider, pounce, isolation (+ shelf: leap, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, terror-pulse, snare-bolt, slow-bolt, sensory-strike, drain, delayed-brand, zone-seed, blighted-ground, patient-defense, self-invisibility, focus, feint-slip, coating, riposte)
[reskin] decline reason: action — the call answered none and names it "no_fit"
[reskin] signature miss: action — "The keeper phases through a solid wall, pillar, or flooded floor and comes out the far side already reaching, so the stone between you and her was never really there. Anyone she passes through on the way feels the flood rise in their lungs for a moment, cold water where breath should be, and their warmth is pulled toward her." [rider/on_hit/damage] — the model found no template that holds it (offered: stunning-strike, charge-push, hook-rider, pounce, isolation, spew, obstacle-pull, slow-bolt, zone-seed, blighted-ground)
[reskin] fallback stands down: "a mournful ghost that drifts through the walls of the drowned chapel" heads on the Ghost and asks for nothing — print's rows, nothing invented (the big ogre, critic-ten 2026-10-01)
[reskin] value check: "Dazzling Burst" EV 2.5 vs floor 9.4 (one attack of 2) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Dazzling Burst" — a seed that cannot be lifted does not ship
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "Whenever she is struck and loses hold of herself, she seeps partway into the nearest wall or standing water and surfaces a short drift away, sobbing, already reaching again — the chapel never lets her stray far from its flooding." [trait/on_being_hit/movement] — menu: heated-body, absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, evasion, relentless-pursuit, bound, marking-light, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] signature miss: trait — "Whenever she is struck and loses hold of herself, she seeps partway into the nearest wall or standing water and surfaces a short drift away, sobbing, already reaching again — the chapel never lets her stray far from its flooding." [trait/on_being_hit/movement] — no template on the shelf shares a verb with the concept or the idea (offered: heated-body, absorption, bloodied-burst, resonant-body, false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, evasion, relentless-pursuit, bound, marking-light, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] weapons answered: Withering Touch = none
[reskin] speed by concept:  — the concept's movement set decides
[reskin] languages by mind: "None" -> "Common plus the languages it knew in life" (sapient)
[reskin] print canon languages: "Common plus the languages it knew in life" -> "Common plus one other language" — the Ghost's
[reskin] print canon speed: Fly -> 40 ft. — the Ghost's own
[reskin] immunities stamped for type: Undead + donor suite -> Poison; Charmed, Exhaustion, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained
[reskin] print canon defenses: immunities Poison; Charmed, Exhaustion, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained -> Necrotic, Poison; Charmed, Exhaustion, Frightened, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained; resistances none -> Acid, Bludgeoning, Cold, Fire, Lightning, Piercing, Slashing, Thunder — the Ghost's own header lines
[reskin] resistances derived: Bludgeoning, Piercing, Slashing
[reskin] print canon trait: Ethereal Sight — "a mournful ghost that drifts through the walls of the drowned chapel" is the Ghost (print's own row)
[reskin] print canon row: Actions/Horrific Visage — the Ghost's own
[reskin] print canon row: Actions/Possession (Recharge 6) — the Ghost's own
[reskin] print canon row: Actions/Etherealness — the Ghost's own
[reskin] multiattack replacement clause: It can replace one attack with a use of Horrific Visage.
[reskin] audit rewrite blocked — "Possession (Recharge 6)" is engine-authored chassis text
[reskin] audit rewrite blocked — "Possession (Recharge 6)" is engine-authored chassis text
[reskin] audit rewrite blocked — "Etherealness" is engine-authored chassis text
```


---


### Widow Alderkin — a homebrew with a nova

**Concept:** a lamplighter's widow who still walks her round, trailing cold

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Widow Alderkin | 3 | lurker-1-phantom | ok | SOFT: aim-hp | ok | ok | ok | ok | ok | ok | ok |

- bands · soft · aim-hp: HP 44 is 27% under the card's 60
- **dropped clause:** "still walks her round"
- read: def 2 / off 3 → 2.5; sustained 24 (1 × Numbing Touch); nova none; dmg 24

```
Widow Alderkin

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

Trailing Cold. While the widow moves, the air behind her chills; each creature that starts its turn within 5 feet of her takes 13 (3d8) Cold damage.

Incorporeal Movement. The widow can move through other creatures and objects as if they were Difficult Terrain. It takes 5 (1d10) Force damage if it ends its turn inside an object.

Sunlight Sensitivity. While in sunlight, the widow has Disadvantage on ability checks and attack rolls.

Actions

Numbing Touch. Melee Attack Roll: +5, reach 5 ft. 24 (6d6 + 3) Cold damage.

Horrid Display (2/Day). Wisdom Saving Throw: DC 13, each creature of the widow's choice within 30 feet that can see or hear it. Failure: The target has the Frightened condition until the end of its next turn.

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

- Traits/Trailing Cold — authored for this sheet; the GM's clause "trailing cold"
- Traits/Incorporeal Movement — the chassis
- Traits/Sunlight Sensitivity — the chassis
- Actions/Numbing Touch — the chassis
- Actions/Horrid Display — library seed terror-pulse

**Engine trace**

```
[route] lurker-phantom type=Undead mechanics=aura — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | lurker-phantom: ✓ ("trailing cold") | lurker-phantom: no line key in the words — the model's read of its quote
[concept] resolve: archetype=lurker type=Undead themes=grave/terror mind=sapient style=phantom energy=Cold mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: aura
[concept] signature elements: walking her lamplighting round after death [behavior] | trailing cold and draining warmth from the living [aura] | a widow's long dark coat and lamplighter's pole [object]
[concept] identity: A drifting incorporeal widow glides along her old lamplighting round, wreathed in grave-cold shadow, and opens combat by passing through a wall or floor into reach to lay a numbing chill on the nearest living soul. Each round she repeats her round — drifting through obstacles, trailing cold behind her, and draining warmth from anyone who lingers in the dark with her, dimming every flame she passes. She does not flee when bloodied; she keeps her route patiently and vindictively, as though completing the work she was never allowed to finish.
[concept] lore: She was the lamplighter's wife who kept his round after he died on it, until the cold of one winter's night took her mid-route — and now she walks it still, putting out light and drinking the warmth of anyone out after dusk.
[reskin] donor: lurker-1-phantom -> CR 3
[reskin] inline by rule: "the widow" — the call answered "Widow Alderkin" (person), which the name does not support
[reskin] save dc derived: DC 12 -> 13 (8 + PB 2 + the sheet's best 3) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a lamplighter's widow" -> has (descriptive), head | "still walks her round" -> has (mechanical) [asked: at_will/at_will/movement] | "trailing cold" -> has (mechanical) [asked: at_will/at_will/save_area]
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "She mimes her old lamplighting round, reaching out to snuff every flame near her — lanterns, torches, campfires all gutter out as she passes, plunging the area into darkness. Anyone standing in that sudden dark feels her cold close around them and loses their warmth, and she is left drifting in a pocket of blackness that favors her hover-and-strike style." [action/save/damage] — menu: leap, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, terror-pulse, snare-bolt, slow-bolt, sensory-strike, drain, zone-seed, blighted-ground (+ shelf: delayed-brand, patient-defense, self-invisibility, focus, feint-slip, coating, riposte, charge-push, hook-rider, pounce, isolation)
[reskin] signature bound to the concept's verb: action — slow-bolt, patient-defense (cold, still)
[reskin] value check: "Extinguished Round (2/Day)" EV 0 vs floor 19.4 (the whole Multiattack (1 attacks)) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Extinguished Round (2/Day)" — the ladder could not lift it; the fallback stands in
[reskin] fallback skipped by the floor: slow-bolt (EV 3.2 vs 12)
[reskin] fallback skipped by the floor: patient-defense (EV 0 vs 3.7)
[reskin] value check: "Horrid Display (2/Day)" EV 25.3 vs floor 19.4 (the whole Multiattack (1 attacks)) — worth the trade
[reskin] library seed drawn: terror-pulse -> Actions/"Horrid Display (2/Day)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "She leaves a creeping trail of grave-cold shadow behind her as she drifts, and any living creature that lingers in that cold wake — or stands where she has just passed — feels its warmth steadily draining away. The chill clings to the dark around her, so the longer you stay near her route, the more of your life it drinks." [trait/start_of_turn/damage] — menu: fire-aura, warded-mending (+ shelf: heated-body, false-appearance, absorption, bloodied-burst, resonant-body, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, evasion, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] signature bound to the concept's verb: trait — false-appearance, faultless-tracker (still, trail)
[reskin] word match declined by the call: aberrant-ground — the key word does not mean the mechanic here
[reskin] signature miss: trait — "She leaves a creeping trail of grave-cold shadow behind her as she drifts, and any living creature that lingers in that cold wake — or stands where she has just passed — feels its warmth steadily draining away. The chill clings to the dark around her, so the longer you stay near her route, the more of your life it drinks." [trait/start_of_turn/damage] — the model picked "fire-aura" (no verb, and it quotes nothing the GM typed) over a concept-verb template (false-appearance, faultless-tracker)
[reskin] repair: 2 clause(s) with no row — "still walks her round", "trailing cold"; one targeted call with the sheet as context
[reskin] repaired sheet: 1 attack row(s), 0 save, 1 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] weapons answered: Numbing Touch = none
[reskin] languages by mind: "None" -> "Common plus the languages it knew in life" (sapient)
[reskin] immunities stamped for type: Undead + donor suite -> Poison; Charmed, Exhaustion, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained
[reskin] resistances derived: Bludgeoning, Cold, Piercing, Slashing
[reskin] ask vs row ok: "still walks her round" -> "Gravewalk" — trigger at_will, limit at_will
[reskin] ask vs row ok: "trailing cold" -> "Trailing Cold" — trigger at_will, limit at_will
[reskin] dead name still carried — "Gravewalk" names a row that is still on the sheet; no sweep
[reskin] identical row leaves: Actions/"Gravewalk" reads word for word as Actions/"Numbing Touch" — one ability, one name
```


---


### Old Master Vellum — bands soft

**Concept:** a wizard but he cannot cast any spells, he just hits people with his staff

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Old Master Vellum | 3 | caster-6 | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 1.625 (print at 3 reads 0.375–5, n=83)
- read: def 1/4 / off 3 → 1.625; sustained 24 (2 × Staff); nova none; dmg 24

```
Old Master Vellum

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

Multiattack. Vellum makes two Staff attacks.

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
[concept] resolve: archetype=brute type=Humanoid themes=armed/mind mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: staff strikes that stun as much as they wound [behavior] | a wizard's robes and quarterstaff [object] | the obsessive, half-mad composure of a failed duelist [behavior]
[concept] identity: A failed archmage who opens the fight by closing the distance at a deceptively quick stride, then commits to a two-handed overhead strike with a gnarled iron-shod quarterstaff that he swings with the muscle built from decades of carrying books no one else could lift. Round after round he keeps the staff moving in a brutal, rehearsed rhythm of parry-and-counter, guarding the old knot of his knuckles like a duelist who never learned to lose. Under pressure he neither flees nor rages; he grows colder and more precise, beating a retreating foe's guard down and then standing over the body muttering the incantation he can never finish.
[concept] lore: A scholar whose mind shattered at the final thesis of his arcane studies, he wanders the roads of guild-towns challenging wizards to duels he can only win by beating them insensible with the staff he once used to point at blackboards.
[reskin] print canon route: the Mage casts and strikes only with magic (Force) — the caster family takes the line from brute, so the attack bonus and the spell DC key to one stat
[reskin] print canon array: STR 16, DEX 14, CON 11, INT 17, WIS 12, CHA 11 — the Mage's, STR fitted to +5
[reskin] donor: caster-6 -> CR 3
[reskin] print canon: "a wizard but he cannot cast any spells, he just hits people with his staff" heads on the Mage — print's rows ride along; the seat stays
[reskin] named parts: Staff (slot) — the user's words, the engine's numbers
[reskin] named parts landed: 1 attack row(s), 0 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] class kit: Protective Magic — the sheet already carries it, so the mage kit adopts that row: the cap may no longer read it as filler
[reskin] class kit: mage — "a wizard": nothing to add — the sheet already answers it
[reskin] inline declared: "Vellum" — the call's own answer (person), built from the name; the rules would have said "the master"
[reskin] inline on kit rows: "the master" -> "Vellum"
[reskin] inline form: "Vellum" — the model's own reading of the name
[reskin] control spell gated to daily — Slow (level 3 control at will is print's CR 13+ shape; at CR 3 it is 1/Day)
[reskin] spell DC coherence: DC 12 -> 13 off Intelligence 17 (the stat makes the attack rolls)
[reskin] lacks asked: "cannot cast any spells"
[reskin] clauses: "a wizard" -> has (descriptive), head | "he cannot cast any spells" -> LACKS (mechanical) | "he just hits people with his staff" -> has (mechanical) [asked: attack]
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "Vellum reads an enemy wizard's opening moves and answers with a punishing counterstroke, so that whenever a foe attempts a spell or a tricky move while within his staff's reach, he lashes out with the staff and drags the caster's rhythm off balance — the interrupted spell fizzles into harmless static, and the enemy is left rattled and slow to act until he stops pressing the attack. He only needs o" [reaction/on_being_hit/condition] — menu: EMPTY (+ shelf: gaze-single, snare, condition-payoff, zone, execute, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, snare-bolt, slow-bolt, sensory-strike, herd, thrown-burst-seed, drain, delayed-brand, curse-debt, zone-seed, reveal, wind-up, blighted-ground, lay-on-hands, aggro-curse, self-invisibility, rally)
[reskin] word match declined by the call: condition-payoff, obstacle-pull, pacify, slow-bolt — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit"
[reskin] signature miss: action — "Vellum reads an enemy wizard's opening moves and answers with a punishing counterstroke, so that whenever a foe attempts a spell or a tricky move while within his staff's reach, he lashes out with the staff and drags the caster's rhythm off balance — the interrupted spell fizzles into harmless static, and the enemy is left rattled and slow to act until he stops pressing the attack. He only needs o" [reaction/on_being_hit/condition] — the model found no template that holds it (offered: condition-payoff, obstacle-pull, pacify, slow-bolt)
[reskin] fallback respects the call: condition-payoff, pacify, slow-bolt left the shelf — the call declined them for this sheet
[reskin] fallback stands down: "a wizard but he cannot cast any spells, he just hits people with his staff" heads on the Mage and asks for nothing — print's rows, nothing invented (the big ogre, critic-ten 2026-10-01)
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "Vellum keeps his staff moving in a rehearsed parry-and-counter rhythm: once he has struck or been struck in melee, his guard tightens against that same foe, and the older the fight drags on, the colder and more precise his swings become — he never tires in the first moments the way a younger duelist would." [trait/always/defense] — menu: false-appearance, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] word match declined by the call: relentless-pursuit, bloodied-fury — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "Vellum keeps his staff moving in a rehearsed parry-and-counter rhythm: once he has struck or been struck in melee, his guard tightens against that same foe, and the older the fight drags on, the colder and more precise his swings become — he never tires in the first moments the way a younger duelist would." [trait/always/defense] — the model found no template that holds it (offered: false-appearance, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst)
[reskin] weapons answered: Iron-Shod Staff = staff
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] print canon languages: "Common" -> "Common and any three languages" — the Mage's
[reskin] print canon row: Actions/Spellcasting — print's own list replaces the chassis's
[reskin] print canon row: Bonus Actions/Misty Step (3/Day) — the Mage's own
[reskin] vulnerability rejected — "Psychic" has no warrant in the concept's own text (print's default is none)
[reskin] save re-derived after a retype: Actions/Staff — a Constitution save for an effect that calls for Strength or Dexterity; the save follows the condition
audit finding below confidence gate: Spellcasting Cast frequency is given per spell tier but the action has no stated action cost or rate (one spell per action?), so a GM cannot tell how many spells Vellum may cast in a turn from this entry alone.
[reskin] lacks clause: Actions/"Spellcasting" leaves — "he cannot cast any spells"
[reskin] dead wildcard name swept — "Misty Step (3/Day)" was only about "Spellcasting"; the row drops
[reskin] lacks clause: Reactions/"Protective Magic (3/Day)" leaves — "he cannot cast any spells"
```


---


### Brine-Priest of the Congregation — bands soft

**Concept:** a kuo-toa priest who drags swimmers under the ice

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Brine-Priest of the Congregation | 6 | caster-2-warpriest | ok | SOFT: band | ok | SOFT: rider-no-save | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 4 (print at 6 reads 3–8.5, n=42)
- gates · soft · rider-no-save: Actions/Net: a Restrained rider on every hit with no save
- **dropped clause:** "drags swimmers under the ice"
- read: def 2 / off 6 → 4; sustained 44 (2 × Spear); nova none; dmg 44

```
Brine-Priest of the Congregation

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

Languages Common

CR 6 (XP 2,300; PB +3)

Traits

Amphibious. The brine-priest can breathe air and water.

Actions

Multiattack. The brine-priest makes two attacks, using Spear or Net in any combination. It can replace one attack with a use of (A) Brine Lash or (B) Spellcasting to cast Ice Knife.

Spear. Melee or Ranged Attack Roll: +7, reach 5 ft. or range 20/60 ft. 22 (4d8 + 4) Piercing damage, and the target has Disadvantage on its next attack roll before the start of the brine-priest's next turn.

Net. Ranged Attack Roll: +7, range 5/15 ft. If the target is Large or smaller, it has the Restrained condition until it escapes (escape DC 15)., and the target has the Restrained condition until the end of its next turn.

Spellcasting. The brine-priest casts one of the following spells, requiring no Material components and using Wisdom as the spellcasting ability (spell save DC 14, +6 to hit with spell attacks):

- At Will: Ice Knife, Fog Cloud, Detect Magic
- 1/Day Each: Hold Person

Brine Lash. Dexterity Saving Throw: DC 14, one creature within 60 feet. Failure: The target has the Restrained condition until the end of the brine-priest's next turn.

Bonus Actions

Divine Aid (3/Day). The brine-priest casts Bless, Dispel Magic, Healing Word, or Lesser Restoration, using the same spellcasting ability as Spellcasting.

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
- Actions/Brine Lash — library seed snare-bolt; the GM's clause "fights with net and spear priest"; binds the GM's words: net
- Bonus Actions/Divine Aid — cleric kit; the GM's clause "a fish-headed humanoid cultist of the deep"
- Traits/Amphibious — print's own row

**Engine trace**

```
[route] pi alias: "kuo-toa" → "a fish-headed humanoid cultist of the deep who fights with net and spear"
[route] caster-warpriest (artillery) type=Humanoid mechanics=snare, thrown-weapon, grapple — casts: implied by the kind — "cultist of the deep" | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: on the GM's own words "drags swimmers under the ice" | skirmisher-hurler: ✓ ("fights with net and spear") | caster-warpriest: "priest" is a noun (a title), not a verb — no override | skirmisher-hurler -> caster-warpriest: the user's own word "priest" (class noun) outranks a pick quoted from the alias text | caster-warpriest: key "priest" (class noun)
[concept] hints: engulf→mechanics ✓ ("drags its catch beneath the shelf")
[concept] resolve: archetype=caster type=Humanoid themes=aquatic/devouring mind=sapient style=warpriest energy=Cold mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: snare, thrown-weapon, grapple
[concept] signature elements: netting and spear-driven drowning of swimmers [object] | priest-chant that chills the water and drags prey under [behavior] | fish-headed brine-bodied cultist [body]
[concept] identity: The brine-priest opens a fight at the ice edge by hurling its weighted net to pin a swimmer on the surface, then wades in with a barbed spear to hold the catch down while chanting a dragging prayer that saps warmth from the water around it. Every round after, it circles the rim at a slow, patient pace, spearing and hauling until its quarry is spent, then dragging the body beneath the shelf to its drowned congregation. Under pressure it does not flee but gives ground into the water, letting the cold and its net do the killing for it, and it fights to the death once blood is in the current.
[concept] lore: A congregation of the drowned deep that surfaced beneath the winter shelf, the brine-priests take converts one swimmer at a time so the ice above their sunken sanctuary never goes quiet.
[reskin] pi alias: "kuo-toa" → "a fish-headed humanoid cultist of the deep who fights with net and spear"
[reskin] pi alias: "kuo-toa" → "a fish-headed humanoid cultist of the deep who fights with net and spear"
[reskin] donor: caster-2-warpriest -> CR 6
[reskin] named parts: Net (slot, Restrained, ranged), Spear (slot) — the user's words, the engine's numbers
[reskin] named parts landed: 2 attack row(s), 0 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] class kit: cleric — "a fish-headed humanoid cultist of the deep": Divine Aid (3/Day) (Priest/Divine Aid)
[reskin] inline by rule: "the brine-priest" — the call answered "the congregation" (kind), which the name does not support
[reskin] control spell gated to daily — Hold Person (level 2 control at will is print's CR 13+ shape; at CR 6 it is 1/Day)
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a fish-headed humanoid cultist of the deep" -> has (descriptive), head | "fights with net and spear priest" -> has (mechanical) [asked: attack] | "drags swimmers under the ice" -> has (mechanical) [asked: condition]
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The brine-priest bows its fish-head and chants a dragging prayer that turns the water in a wide ring around it bitterly cold and heavy, as if the deep itself were pulling. Anyone caught in that chilled water feels their warmth and strength draining away and is hauled a step closer to the priest, sinking toward the bottom of the shelf; the slow circling pull continues each round for as long as the " [action/save/movement] — menu: condition-payoff, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, snare-bolt, slow-bolt, sensory-strike, herd, drain, curse-debt, zone-seed, reveal, wind-up, blighted-ground, hook-drag (+ shelf: delayed-brand, lay-on-hands, aggro-curse, self-invisibility, rally, snap-shot, bolt-restrain, bolt-drag, bolt-mark)
[reskin] signature bound to the concept's verb: action — hook-drag (drag, under)
[reskin] word match declined by the call: hook-drag, obstacle-pull, slow-bolt, bolt-drag, ground-burst, active-toll — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit" after being shown hook-drag, which the GM's words keyed
[reskin] key match declined: action — "hook-drag" was ranked first on the call's own menu for drag+under, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: action — "The brine-priest bows its fish-head and chants a dragging prayer that turns the water in a wide ring around it bitterly cold and heavy, as if the deep itself were pulling. Anyone caught in that chilled water feels their warmth and strength draining away and is hauled a step closer to the priest, sinking toward the bottom of the shelf; the slow circling pull continues each round for as long as the " [action/save/movement] — the model found no template that holds it (offered: hook-drag, condition-payoff, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, snare-bolt, slow-bolt, sensory-strike, herd, drain, curse-debt, zone-seed, reveal, wind-up, blighted-ground, bolt-drag, rally)
[reskin] fallback respects the call: hook-drag, obstacle-pull, slow-bolt left the shelf — the call declined them for this sheet
[reskin] value check: "Binding Lash" EV 11.6 vs floor 10.9 (one attack of 2) — worth the trade
[reskin] library seed drawn: snare-bolt -> Actions/"Binding Lash" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Anything the brine-priest has pinned in its net or gaffed on its barbed spear bleeds heat and buoyancy into the water around it, so that the longer it stays caught the more sluggish and cold it becomes — the priest's catch weakens in the current until it can no longer keep its head up, and the priest simply hauls it under." [trait/always/condition] — menu: false-appearance, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] signature bound to the concept's verb: trait — terrain-walk (ice)
[reskin] decline reason: trait — the call answered none and names it "no_fit" after being shown terrain-walk, which the GM's words keyed
[reskin] key match declined: trait — "terrain-walk" was ranked first on the call's own menu for ice, and the call read it as no fit; the words keep their claim and nothing is forced
[reskin] signature miss: trait — "Anything the brine-priest has pinned in its net or gaffed on its barbed spear bleeds heat and buoyancy into the water around it, so that the longer it stays caught the more sluggish and cold it becomes — the priest's catch weakens in the current until it can no longer keep its head up, and the priest simply hauls it under." [trait/always/condition] — the model found no template that holds it (offered: terrain-walk, false-appearance, phobia, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst)
[reskin] repair: 1 clause(s) with no row — "drags swimmers under the ice"; one targeted call with the sheet as context
[reskin] repair: the answer held no rows — the clauses stay unplaced
[reskin] weapons answered: Barbed Spear = spear; Brine Bolt = none
[reskin] weapon table: "Net" — thrown, range 5/15
[reskin] amphibious by concept: a creature of the deep breathes both (print: the Sea Hag's)
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] defenses by material: a ice body is vulnerable to Fire and never resists, absorbs, or ignores it — the resistance is withheld; the vulnerability is the GM's to type (the Frostmaw carried a Fire vulnerability nobody typed — the critic's second species read)
[reskin] multiattack replacement clause: It can replace one attack with a use of (A) Binding Lash or (B) Spellcasting to cast *Ice Knife*.
[reskin] darkvision withheld: a Humanoid with no species kit granting it, no word for it in the GM's own text, and no print body that has it — print gives darkvision to 1 of 26 Humanoids ("darkvision 60 ft.; Passive Perception 16" -> "Passive Perception 16")
[reskin] row binds its clause: "Binding Lash" answers "fights with net and spear priest" — the keys it matched came from that clause, so the coverage credit has a receipt
[reskin] audit rename: "Binding Lash" -> "Brine Lash"
[reskin] escape dc: Net → DC 15 (8 + PB + STR; a late row wore another number)
(enrichment did not settle within 20s — moving on)
```


---


### Ssith — bands soft

**Concept:**  | role: lurker

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Ssith | 4 | lurker-2 | ok | SOFT: aim-hp | ok | ok | ok | ok | ok | ok | ok |

- bands · soft · aim-hp: HP 52 is 31% under the card's 75
- **dropped clause:** "fractures as if the mountain itself rejected you"
- **dropped clause:** "bloodthirsty frenzy"
- **dropped clause:** "crushing them while its veins flare with each blow"
- **dropped clause:** "When bloodied it does not flee"
- **dropped clause:** "tightening its grip"
- **dropped clause:** "daring foes closer"
- **dropped clause:** "because pain only feeds the story it is telling"
- read: def 1 / off 5 → 3; sustained 28 (2 × Heaving Slam); nova Force Repulsion 22; dmg 33

```
Ssith

Large Fey, Chaotic Neutral

AC 15
Initiative +4 (14)

HP 52 (7d10 + 14)

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

Senses darkvision 60 ft.; Passive Perception 13

Languages Common, Sylvan

CR 4 (XP 1,100; PB +2)

Traits

Gleeful Growth. When the ssith reduces a creature to 0 Hit Points, the ssith grows gleeful, regaining Hit Points and having Advantage on its next attack roll.

Veins of Force. A creature that touches the ssith or hits it with a melee attack while within 5 feet of it takes 5 (1d10) Force damage.

Assassinate. During the first round of each combat, the ssith has Advantage on attack rolls against any creature that hasn't taken a turn. If the ssith hits a creature during that round, the target takes an extra 7 (2d6) Force damage.

Bloodied Frenzy. While Bloodied, the ssith has Advantage on attack rolls and saving throws.

Actions

Multiattack. The ssith makes two Heaving Slam attacks.

Heaving Slam. Melee Attack Roll: +6, reach 5 ft. 8 (1d8 + 4) Bludgeoning damage plus 6 (1d12) Force damage.

Force Repulsion (Recharge 5-6). Strength Saving Throw: DC 14, each creature in a 10-foot Emanation originating from the ssith. Failure: 22 (5d8) Force damage. Success: Half damage.

Bonus Actions

Rampage (1/Day). Immediately after dealing damage to a creature that is already Bloodied, the ssith moves up to half its Speed, and it makes one Heaving Slam attack.

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
- Actions/Heaving Slam — the chassis
- Actions/Force Repulsion — template ground-burst; library draw (seed unstamped); the GM's clause "slamming its scorching coils down in a shockwave of force"; binds the GM's words: shockwave+wave of
- Bonus Actions/Rampage — template rampage; barbarian kit; the GM's clause "it is a frontline berserker that revels in open violence"
- Traits/Gleeful Growth — authored for this sheet; the GM's clause "it grows gleeful"
- Traits/Veins of Force — template heated-body; library draw (seed unstamped); the GM's clause "strikes with the raw force of a summer storm—its very touch shoves"; binds the GM's words: molten+touch+glow+storm+heat+sear
- Traits/Assassinate — template assassinate; library draw (seed unstamped)
- Traits/Bloodied Frenzy — barbarian kit; the GM's clause "it is a frontline berserker that revels in open violence"

**Engine trace**

```
[route] lurker type=Fey mechanics=grapple — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: on the GM's own words "coiling around any who stand and crushin" | lurker: ✓ ("It opens by rearing and slamming its sco") | lurker: no line key in the words — the model's read of its quote
[concept] synthesis (blank roll): archetype=lurker type=Fey themes=bestial/elemental mind=sapient style=— lore=✓
[concept] synthesis text: A serpent of the high passes whose molten veins glow through dream-hide scales, the Embercoil is a sapient Fey that bargains in riddles and strikes with the raw force of a summer storm—its very touch shoves and fractures as if the mountain itself rejected you. It opens by rearing and slamming its scorching coils down in a shockwave of force, then fights in a laughing, bloodthirsty frenzy, coiling around any who stand and crushing them while its veins flare with each blow. When bloodied it does not flee; it grows gleeful, tightening its grip and daring foes closer, because pain only feeds the story it is telling. It is fully sapient (INT 10-14), and it is a frontline berserker that revels in open violence.
[concept] signature elements: molten-veined coils that flare with force [body] | crushing, shoving constriction [behavior] | shockwave slam of raw force [behavior]
[concept] name proposal: Shove Serpent
[concept] lore: Born from a dream of a mountain river that boiled over and refused to cool, the Shove Serpent haunts the high passes, demanding tribute in the form of a good fight or a clever riddle—and it always collects.
[reskin] donor: lurker-2 -> CR 4
[reskin] row gated out: Teleport (teleport) — the concept did not claim this mechanic
[reskin] row evicted for the cap: Bonus Actions/"Umbral Step" (chassis filler) leaves so "Rampage" fits — the cap evicts by priority, it does not refuse the newcomer
[reskin] class kit: barbarian — "it is a frontline berserker that revels in open violence": Bloodied Frenzy (Berserker/Bloodied Frenzy), Rampage (1/Day) (rampage)
[reskin] inline declared: "the ssith" — the call's own answer (kind), built from the name
[reskin] inline form: "the ssith" — the model's own reading of the name
[reskin] save dc derived: DC 13 -> 14 (8 + PB 2 + the sheet's best 4) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] asked field dropped: the call answered trigger "at_will" for "strikes with the raw force of a summer storm—its very touch shoves" but offered no quote
[reskin] asked field dropped: the call answered limit "at_will" for "strikes with the raw force of a summer storm—its very touch shoves" but offered no quote
[reskin] asked field dropped: the call answered trigger "on_hit" for "fractures as if the mountain itself rejected you" but offered no quote
[reskin] asked field dropped: the call answered limit "at_will" for "fractures as if the mountain itself rejected you" but offered no quote
[reskin] asked field dropped: the call answered trigger "at_will" for "It opens by rearing" but offered no quote
[reskin] asked field dropped: the call answered limit "at_will" for "It opens by rearing" but offered no quote
[reskin] asked field dropped: the call answered trigger "at_will" for "slamming its scorching coils down in a shockwave of force" but offered no quote
[reskin] asked field dropped: the call answered limit "at_will" for "slamming its scorching coils down in a shockwave of force" but offered no quote
[reskin] asked field dropped: the call answered trigger "at_will" for "fights in a laughing" but offered no quote
[reskin] asked field dropped: the call answered limit "at_will" for "fights in a laughing" but offered no quote
[reskin] asked field dropped: the call answered trigger "at_will" for "bloodthirsty frenzy" but offered no quote
[reskin] asked field dropped: the call answered limit "at_will" for "bloodthirsty frenzy" but offered no quote
[reskin] asked field dropped: the call answered trigger "on_hit" for "coiling around any who stand" but offered no quote
[reskin] asked field dropped: the call answered limit "at_will" for "coiling around any who stand" but offered no quote
[reskin] lacks not claimed: "When bloodied it does not flee" reads like a lack to the words, and the call's list did not name it
[reskin] asked field dropped: the call answered trigger "at_will" for "it is a frontline berserker that revels in open violence" but offered no quote
[reskin] asked field dropped: the call answered limit "at_will" for "it is a frontline berserker that revels in open violence" but offered no quote
[reskin] clauses: "A serpent of the high passes whose molten veins glow through dream-hide scales" -> has (descriptive), head | "the Embercoil is a sapient Fey that bargains in riddles" -> has (descriptive) | "strikes with the raw force of a summer storm—its very touch shoves" -> has (mechanical) [asked: attack] | "fractures as if the mountain itself rejected you" -> has (mechanical) [asked: attack] | "It opens by rearing" -> has (mechanical) [asked: save_area] | "slamming its scorching coils down in a shockwave of force" -> has (mechanical) [asked: save_area] | "fights in a laughing" -> has (mechanical) [asked: attack] | "bloodthirsty frenzy" -> has (mechanical) [asked: attack] | "coiling around any who stand" -> has (mechanical) [asked: condition] | "crushing them while its veins flare with each blow" -> has (descriptive) | "When bloodied it does not flee" -> has (mechanical) [asked: when_bloodied/buff_self] | "it grows gleeful" -> has (mechanical) [asked: when_bloodied/buff_self] | "tightening its grip" -> has (mechanical) [asked: when_bloodied/buff_self] | "daring foes closer" -> has (mechanical) [asked: when_bloodied/buff_self] | "because pain only feeds the story it is telling" -> has (mechanical) [asked: when_bloodied/buff_self] | "It is fully sapient (INT 10-14)" -> has (descriptive) | "it is a frontline berserker that revels in open violence" -> has (mechanical) [asked: save_area]
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "When the serpent slams its coils down, the blow lands as a rolling shockwave of force that runs through the ground and shoves every nearby foe back and off their feet, not just the one it struck. Enemies knocked down by the wave are left scrambling, their footing and their nerve shaken at once, so the ssith can close on a scattered, staggering line." [action/save/movement] — menu: swallow, leap, gaze-single, execute, seal, wail, lure, hook-drag, active-toll, pull-through, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, terror-pulse, snare-bolt, slow-bolt, sensory-strike, drain, zone-seed, blighted-ground, push-prone, curse-debt, wind-up (+ shelf: delayed-brand, patient-defense, self-invisibility, focus, feint-slip, coating, rally, riposte, charge-push, hook-rider, pounce, isolation)
[reskin] signature bound to the concept's verb: action — push-prone, ground-burst, wind-up (shove, slam, shockwave, wave of, coil, storm)
[reskin] word match declined by the call: push-prone, wind-up, blighted-ground — the key word does not mean the mechanic here
[reskin] value check: "Mountain Rejection (Recharge 5-6)" EV 34.1 vs floor 23.7 (the whole Multiattack (2 attacks)) — dice 14 → 22 (nova budget)
[reskin] signature template: ground-burst -> Actions/"Mountain Rejection (Recharge 5-6)" ("The ssith rears and slams its coils down, and the blow becomes a shockwave of ra [verb: shockwave:concept, wave of:concept]")
[reskin] keys spent by the action: shockwave, wave of
[reskin] signature idea (trait): "The molten veins in its hide flare brighter each time the serpent is wounded, and that heat lashes out at whoever struck it, punishing the blow with a searing backlash of force that also knocks the attacker back a step. The more it bleeds, the hotter the flare, so trading hits with a bloodied ssith only feeds its story." [trait/on_being_hit/damage] — menu: heated-body, absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, evasion, relentless-pursuit, bound, marking-light, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst, berserk)
[reskin] signature bound to the concept's verb: trait — heated-body (molten, touch, glow, storm)
[reskin] word match declined by the call: bloodied-fury, bloodied-burst, absorption, resonant-body — the key word does not mean the mechanic here
[reskin] seat default: lurker owes assassinate by print — it seats before the idea
[reskin] inline rider retired: Coils — Assassinate grants the first-round Advantage now
[reskin] signature template (trait): assassinate -> Traits/"Assassinate" ("the seat owes it by print")
[reskin] signature template (trait): heated-body -> Traits/"Molten Veins" ("Its molten veins lash out at whoever strikes it in melee, searing the attacker w [verb: molten:concept, touch:concept, glow:concept, storm:concept, heat:idea, sear:idea]")
[reskin] repair: 2 clause(s) with no row — "fights in a laughing", "it grows gleeful"; one targeted call with the sheet as context
[reskin] repaired sheet: 1 attack row(s), 0 save, 1 trait(s), 0 reaction(s); 1 clause(s) unplaced
[reskin] weapons answered: Coils = none
[reskin] 2024 caps: "Gleeful Growth" — a condition or game term shipped lowercase
[reskin] row binds its clause: "Mountain Rejection" answers "slamming its scorching coils down in a shockwave of force" — the keys it matched came from that clause, so the coverage credit has a receipt
[reskin] row binds its clause: "Molten Veins" answers "strikes with the raw force of a summer storm—its very touch shoves" — the keys it matched came from that clause, so the coverage credit has a receipt
[reskin] asked but unanswered: "When bloodied it does not flee" asked for when_bloodied and no row binds the clause
[reskin] ask vs row MISMATCH: "it grows gleeful" -> "Gleeful Growth" — trigger: asked when_bloodied, row reads at_will
[reskin] asked but unanswered: "tightening its grip" asked for when_bloodied and no row binds the clause
[reskin] asked but unanswered: "daring foes closer" asked for when_bloodied and no row binds the clause
[reskin] asked but unanswered: "because pain only feeds the story it is telling" asked for when_bloodied and no row binds the clause
audit finding below confidence gate: Bloodied Frenzy The LARGE Fey's only movement and melee attacks are wholly land-based (Speed 30 ft., Coils reach 5 ft.), yet the statblock offers no climbing or other anatomy to support the serpentine 'Coils' fiction; the block's own content contradicts the multi-coil constrictor it names itself after.
[reskin] audit rename: "Molten Veins" -> "Veins of Force"
[reskin] audit rename: "Coils" -> "Heaving Slam"
[reskin] audit rename: "Mountain Rejection (Recharge 5-6)" -> "Force Repulsion (Recharge 5-6)"
```


---


### Barrow Wight — in the run

**Concept:** a barrow wight who drifts between the standing stones at night

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Barrow Wight | 4 | lurker-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1 / off 4 → 2.5; sustained 30 (2 × Necrotic Sword); nova none; dmg 30

```
Barrow Wight

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

Multiattack. The barrow wight makes two Necrotic Sword attacks. It can replace one attack with a use of Life Drain.

Necrotic Sword. Melee Attack Roll: +4 (with Advantage during the first round of each combat), reach 5 ft. 11 (2d8 + 2) Slashing damage plus 4 (1d8) Necrotic damage.

Gravebinding Glare. Dexterity Saving Throw: DC 13, one creature within 60 feet. Failure: The target has the Restrained condition until the end of the barrow wight's next turn.

Life Drain. Constitution Saving Throw: DC 13, one creature within 5 feet. Failure: 14 (4d6) Necrotic damage, and the target's Hit Point maximum decreases by an amount equal to the damage taken.
A Humanoid slain by this attack rises 24 hours later as a Zombie under the barrow wight's control, unless the Humanoid is restored to life or its body is destroyed. The barrow wight can have no more than twelve zombies under its control at a time. Success: Half damage only.

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
- Actions/Necrotic Sword — print's row, renamed; weapon longsword
- Actions/Gravebinding Glare — library seed snare-bolt
- Actions/Life Drain — print's own row
- Traits/Sunlight Sensitivity — print's own row

**Engine trace**

```
[route] lurker-phantom type=Undead mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | lurker-phantom: ✓ ("drifts between the standing stones at ni") | lurker-phantom: key "drifts" (class verb)
[concept] resolve: archetype=lurker type=Undead themes=grave/uncanny mind=sapient style=phantom energy=Necrotic mix=energy identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: drifting through standing stones [behavior] | drain of life and warmth [behavior] | barrow-cold spectral body [body]
[concept] identity: The barrow wight rises at true dark and glides unhindered through the standing stones, using them as a drifting hunter uses cover — it passes through stone and earth and reappears at the flank of the living. Each round it reaches out with a grave-cold touch that drains warmth and vigor, preferring to harry and separate the living from their lantern-light before closing. It is cunning enough to toy with prey, withdrawing into the circle of stones and herding the frightened back toward it, but it breaks off and sinks into the barrow if the light grows strong or the fight turns against it.
[concept] lore: A forgotten chieftain of the barrow fields, buried with its oath-hall's stones, this wight rises each night to keep the old boundary — and any living thing that crosses between the standing stones is seized as a trespasser to be drained and added to the barrow's silence.
[reskin] print canon route: the Wight has a body — print gives it no Incorporeal Movement — so the phantom seat stands down for the plain lurker line
[reskin] print canon defenses: HP 54 -> 82, AC 15 -> 14 — the Wight's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon armor: 14 (studded leather) — print's Gear line; the 2014 sheet prints it (the Goblin Boss wore "splint", canaries 2026-10-12)
[reskin] print canon array: STR 15, DEX 14, CON 16, INT 10, WIS 13, CHA 15 — the Wight's at its own CR; attack +6 -> +4, DC 13 (print's)
[reskin] donor: lurker-2 -> CR 4
[reskin] row gated out: Teleport (teleport) — the concept did not claim this mechanic
[reskin] print canon: "a barrow wight who drifts between the standing stones at night" heads on the Wight — print's rows ride along; the seat stays
[reskin] inline by rule: "the barrow wight" — the call answered "the wight" (kind), which the name does not support
[reskin] inline on kit rows: "the wight" -> "the barrow wight"
[reskin] inline form: "the wight" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] lacks refused: "no lantern-light" quotes nothing the user typed
[reskin] clauses: "a barrow wight" -> has (descriptive), head | "drifts between the standing stones at night" -> has (descriptive)
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The wight sinks into the earth and stone beneath it, then surges up from the ground at a point it can see within the ring of stones, its grave-cold body passing through the barrier as if the world were water. Anyone near its emergence feels warmth torn from them and is slowed by the numbing cold, making it harder to flee or keep their feet under them. It can only do this while it stands in dim lig" [action/always/movement] — menu: leap, gaze-single, execute, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, terror-pulse, snare-bolt, slow-bolt, sensory-strike, drain, zone-seed, blighted-ground (+ shelf: delayed-brand, patient-defense, self-invisibility, focus, feint-slip, coating, riposte, charge-push, hook-rider, pounce, isolation)
[reskin] word match declined by the call: slow-bolt, blighted-ground, active-toll, sensory-strike, ground-burst — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit"
[reskin] signature miss: action — "The wight sinks into the earth and stone beneath it, then surges up from the ground at a point it can see within the ring of stones, its grave-cold body passing through the barrier as if the world were water. Anyone near its emergence feels warmth torn from them and is slowed by the numbing cold, making it harder to flee or keep their feet under them. It can only do this while it stands in dim lig" [action/always/movement] — the model found no template that holds it (offered: leap, gaze-single, execute, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, terror-pulse, snare-bolt, slow-bolt, sensory-strike, drain, zone-seed, blighted-ground)
[reskin] fallback respects the call: sensory-strike left the shelf — the call declined it for this sheet
[reskin] fallback stands down: "a barrow wight who drifts between the standing stones at night" heads on the Wight and asks for nothing — print's rows, nothing invented (the big ogre, critic-ten 2026-10-01)
[reskin] value check: "Binding Lash" EV 7.7 vs floor 7.3 (one attack of 2) — worth the trade
[reskin] library seed drawn: snare-bolt -> Actions/"Binding Lash" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The wight's spectral body drinks the warmth of anything that strikes it: each blow it suffers leaves the attacker's own hands and limbs numb and stiff with grave-cold, making them clumsy and slow to strike again. The cold fades if the creature leaves the wight's presence, but lingers while it keeps up the fight." [trait/on_being_hit/condition] — menu: heated-body, absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, evasion, relentless-pursuit, bound, marking-light, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] signature bound to the concept's verb: trait — false-appearance (stone)
[reskin] decline reason: trait — the call answered none and names it "no_fit" after being shown false-appearance, which the GM's words keyed
[reskin] key match declined: trait — "false-appearance" was ranked first on the call's own menu for stone, and the call read it as no fit; the words keep their claim and nothing is forced
[reskin] signature miss: trait — "The wight's spectral body drinks the warmth of anything that strikes it: each blow it suffers leaves the attacker's own hands and limbs numb and stiff with grave-cold, making them clumsy and slow to strike again. The cold fades if the creature leaves the wight's presence, but lingers while it keeps up the fight." [trait/on_being_hit/condition] — the model found no template that holds it (offered: false-appearance, heated-body, absorption, bloodied-burst, resonant-body, noxious-aura)
[reskin] weapons answered: Grave Touch = none
[reskin] languages by mind: "None" -> "Common plus the languages it knew in life" (sapient)
[reskin] print canon alignment: Neutral -> Neutral Evil — the Wight's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common plus the languages it knew in life" -> "Common plus one other language" — the Wight's
[reskin] print canon attack: "Grave Touch" -> "Necrotic Sword" — the Wight's own row
[reskin] print canon multiattack: "The barrow wight makes two attacks, using Necrotic Sword or Necrotic Bow in any combination. It can replace one attack with a use of Life Drain." — the Wight's own
[reskin] immunities stamped for type: Undead -> Poison; Exhaustion, Poisoned
[reskin] print canon defenses: resistances none -> Necrotic — the Wight's own header lines
[reskin] print canon trait: Sunlight Sensitivity — "a barrow wight who drifts between the standing stones at night" is the Wight (print's own row)
[reskin] print canon: chassis row leaves — Bonus Actions/"Umbral Step" is the seat's, not the Wight's
[reskin] print canon row priced: Life Drain — dice 6 → 14
[reskin] print canon row: Actions/Life Drain — the Wight's own
[reskin] vulnerability rejected — "Radiant" has no warrant in the concept's own text (print's default is none)
[reskin] multiattack normalised: "The barrow wight makes two Necrotic Sword attacks. It can replace one attack with a use of L"
audit span not verbatim, dropped: Life Drain | *Constitution Saving Throw*: DC 13, one creature within 5 feet. |
[reskin] audit rewrite blocked — "Life Drain" is engine-authored chassis text
[reskin] audit rename: "Binding Lash" -> "Gravebinding Glare"
```


---


### Druid — in the run

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

Multiattack. The druid makes two Verdant Wisp attacks.

Verdant Wisp. Ranged Attack Roll: +5, range 120 ft. 10 (3d6) Radiant damage.

Spellcasting. The druid casts one of the following spells, using Wisdom as the spellcasting ability (spell save DC 13):

- At Will: Druidcraft, Speak with Animals
- 2/Day Each: Entangle, Thunderwave
- 1/Day Each: Animal Messenger, Longstrider, Moonbeam

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

**Engine trace**

```
[route] caster (artillery) type=Humanoid mechanics=none — casts: implied by the kind — "Druid" | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | caster: ✓ ("Druid") | caster: no line key in the words — the model's read of its quote
[concept] resolve: archetype=caster type=Humanoid themes=fey/grasping mind=sapient style=— energy=Lightning mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: thorned snares and entangling undergrowth [behavior] | lightning called from a gnarled charter staff [object] | bark-and-hide robes of the old wardens [body]
[concept] identity: A druid of the old wardens, she opens combat by rooting herself behind a wall of thorned undergrowth and calling down biting insects and lightning from the treeline. Each round she peels a spell from her staff — entangling vines, a crawling swarm, a cackling bolt of verdant lightning — and repositions only when the circle is broken. She is patient and territorial, fighting to the death over her grove rather than retreating, and takes visible pleasure in letting intruders stagger through her snares.
[concept] lore: She was the last warden of a grove that no longer exists, and she draws its lingering wild magic through her staff to punish anyone who dares linger where sacred trees once stood.
[reskin] energy withheld: Lightning on a Humanoid with no Lightning in the concept's own words (fixed phrases read first)
[reskin] print canon defenses: HP 38 -> 44, AC 14 -> 13 — the Druid's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon armor: 13 (studded leather) — print's Gear line; the 2014 sheet prints it (the Goblin Boss wore "splint", canaries 2026-10-12)
[reskin] print canon array: STR 10, DEX 12, CON 13, INT 12, WIS 16, CHA 11 — the Druid's at its own CR; attack +5 -> +5, DC 13 (print's)
[reskin] donor: caster-6 -> CR 2
[reskin] print canon: "Druid" is a print creature — the seats stand down; print's own rows are the composition
[reskin] claim gate: CR 2 but a Humanoid body — the trait seat stays open (print: a material body carries a trait at every tier)
[reskin] repair round 1: 2 defect(s) — "Poison Spray" is not on the spell menu — pick from: Detect Magic, Mage Hand, Minor Illusion, Prestidigitation, Light, Disguise Self, Invisibility, Misty Step, Fog Cloud, Darkness, Dispel Magic, Mirror Image, Blur, Hold Person, Web, Fly, Fireball, Lightning Bolt, Scorching Ray, Shatter, Magic Missile, Guiding Bolt, Mind Spike, Acid Arrow, Ice Knife, Cone of Cold, Blight, Vampiric Touch, Ray of Sickness, Thunderwave, Burning Hands, Ice Storm, Wall of Fire, Cloudkill, Fear, Sleep, Charm Person, Suggestion, Slow, Blindness/Deafness, Bestow Curse, Hypnotic Pattern | "Entangle" is not on the spell menu — pick from: Detect Magic, Mage Hand, Minor Illusion, Prestidigitation, Light, Disguise Self, Invisibility, Misty Step, Fog Cloud, Darkness, Dispel Magic, Mirror Image, Blur, Hold Person, Web, Fly, Fireball, Lightning Bolt, Scorching Ray, Shatter, Magic Missile, Guiding Bolt, Mind Spike, Acid Arrow, Ice Knife, Cone of Cold, Blight, Vampiric Touch, Ray of Sickness, Thunderwave, Burning Hands, Ice Storm, Wall of Fire, Cloudkill, Fear, Sleep, Charm Person, Suggestion, Slow, Blindness/Deafness, Bestow Curse, Hypnotic Pattern
[reskin] inline by rule: "the warden" — the call answered "the lost grove" (kind), which the name does not support
[reskin] control spell gated to daily — Hold Person (level 2 control at will is print's CR 13+ shape; at CR 2 it is 1/Day)
[reskin] daily spell dropped — Lightning Bolt (28 avg vs 7 per-hit; print's only daily damage spell is the Adult Red's Fireball at ~1.1x)
[reskin] spell DC coherence: DC 12 -> 11 off Intelligence 12 (print's array stays)
[reskin] save dc derived: DC 12 -> 11 (8 + PB 2 + Intelligence's 1) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Druid" -> has (descriptive), head
[reskin] weapons answered: Thorn Staff = staff
[reskin] print canon speed: modes walk only — the Druid's
[reskin] print canon senses: "none" — the Druid's
[reskin] languages by mind: "Druidic" -> "Common, Druidic" (sapient)
[reskin] print canon name: "Warden of the Lost Grove" -> "Druid" — a whole print name is the creature's name (the Goblin Boss shipped as Krag the Iron Standard, 2026-10-01)
[reskin] inline follows the print name: "the warden" -> "the druid"
[reskin] print canon languages: "Common, Druidic" -> "Common, Druidic, Sylvan" — the Druid's
[reskin] print canon multiattack: "The druid makes two attacks, using Vine Staff or Verdant Wisp in any combination." — the Druid's own
[reskin] print canon attack: "Verdant Wisp" is print's own row — +5, 10 (3d6), range 90 ft. (an exact body at print's CR)
[reskin] print canon attack: "Thorn Staff" -> "Verdant Wisp" — the Druid's own ranged row
[reskin] print canon: chassis row leaves — Reactions/"Protective Magic (3/Day)" is the seat's, not the Druid's
[reskin] print canon row: Actions/Spellcasting — print's own list replaces the chassis's
[reskin] multiattack normalised: "The druid makes two Verdant Wisp attacks."
```


---


### Skeleton — in the run

**Concept:** skeleton with a greatsword

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Skeleton | 2 | brute-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1/2 / off 3 → 1.75; sustained 12 (1 × Greatsword); nova Bone Shard Burst 11; dmg 15

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

Grave Retort. A creature that touches the skeleton or hits it with a melee attack while within 5 feet of it takes 3 (1d6) Necrotic damage.

Great Weapon Master. When the skeleton hits a creature with its Greatsword, the attack deals an extra 2 damage.

Actions

Greatsword. Melee Attack Roll: +5, reach 5 ft. 12 (2d8 + 3) Slashing damage.

Bone Shard Burst (Recharge 5-6). Dexterity Saving Throw: DC 12, each creature in a 15-foot-radius Sphere centered on a point within 60 feet. Failure: 11 (2d10) Necrotic damage. Success: Half damage.

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
- Actions/Bone Shard Burst — library seed thrown-burst
- Traits/Grave Retort — template heated-body; library draw (seed unstamped)
- Traits/Great Weapon Master — a declared feature; the GM's clause "skeleton with a greatsword"

**Engine trace**

```
[route] brute type=Undead mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | brute: ✓ ("skeleton with a greatsword") | brute: no line key in the words — the model's read of its quote
[concept] resolve: archetype=brute type=Undead themes=grave/armed mind=mindless style=— energy=Necrotic mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: greatsword heavier than its frame should bear [object] | an unyielding standing trade, never retreating [behavior] | grave-bound bones that will not lie down [body]
[concept] identity: A skeleton greatswordsman wades into the fray and opens with one enormous two-handed overhead cut meant to break a shield wall or a spine in a single stroke. It plants its heels and trades blow for blow, using the reach of the blade to keep enemies at the edge of its ground, and never gives a step back while the corpse-flesh still holds. It has no fear and no mercy, fighting until the bones are shattered, because the will that animated it knows only the last order it was given.
[concept] lore: Raised from the common graves of a slaughtered mercenary company, this bonesworder guards the field where its comrades fell, still swinging the greatsword it was buried beside.
[reskin] print canon array: STR 16, DEX 16, CON 15, INT 6, WIS 8, CHA 5 — the Skeleton's, STR fitted to +5
[reskin] donor: brute-2 -> CR 2
[reskin] print canon: "skeleton with a greatsword" heads on the Skeleton — print's rows ride along; the seat stays
[reskin] claim gate: CR 2 but a Undead body — the trait seat stays open (print: a material body carries a trait at every tier)
[reskin] named parts: Greatsword (slot) — the user's words, the engine's numbers
[reskin] named parts landed: 1 attack row(s), 0 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] implied class refused: the call answered "fighter" but this body takes no class kit — a beast or a mind too simple to train
[reskin] inline declared: "the greatswordsman" — the call's own answer (kind), built from the name; the rules would have said "Greatswordsman"
[reskin] inline on kit rows: "Greatswordsman" -> "the greatswordsman"
[reskin] inline form: "the greatswordsman" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] asked field dropped: the call answered trigger "at_will" for "skeleton with a greatsword" but offered no quote
[reskin] asked field dropped: the call answered limit "at_will" for "skeleton with a greatsword" but offered no quote
[reskin] clauses: "skeleton with a greatsword" -> has (mechanical) [asked: attack]
[reskin] signature idea (action): "It sets its heels and makes one enormous two-handed overhead cut that crashes down on everything directly in front of it, friend or foe alike. Anyone caught under that falling blade is staggered and left wide open, easy prey for the next blow." [action/save/condition] — menu: trample, shield-bash, active-toll, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up (+ shelf: rampage, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, contagion, charge-push, hook-rider, pounce, charge)
[reskin] signature miss: action — "It sets its heels and makes one enormous two-handed overhead cut that crashes down on everything directly in front of it, friend or foe alike. Anyone caught under that falling blade is staggered and left wide open, easy prey for the next blow." [action/save/condition] — no template on the shelf shares a verb with the concept or the idea (offered: trample, shield-bash, active-toll, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, rampage, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, contagion, charge-push, hook-rider, pounce, charge)
[reskin] fallback stands down: "skeleton with a greatsword" heads on the Skeleton and asks for nothing — print's rows, nothing invented (the big ogre, critic-ten 2026-10-01)
[reskin] value check: "Hurled Burst (Recharge 5-6)" EV 21.7 vs floor 11.8 (the whole Multiattack (1 attacks)) — worth the trade
[reskin] library seed drawn: thrown-burst -> Actions/"Hurled Burst (Recharge 5-6)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Whenever something strikes it, the will holding the bones together pours straight back through the greatsword, so the attacker takes a bite of the same cold grave-energy that keeps it standing. It never steps back from that exchange — the harder it is hit, the more it gives back." [trait/on_being_hit/damage] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] signature template (trait): heated-body -> Traits/"Grave Retort" ("Whenever something strikes it, the will holding the bones together pours straigh [shape fit, no verb match]")
[reskin] weapons answered: Greatsword = greatsword
[reskin] print canon alignment: Lawful Neutral -> Lawful Evil — the Skeleton's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon name: "Gravebound Greatswordsman" -> "Skeleton" — a whole print name is the creature's name (the Goblin Boss shipped as Krag the Iron Standard, 2026-10-01)
[reskin] inline follows the print name: "the greatswordsman" -> "the skeleton"
[reskin] print canon languages: "None" -> "Understands Common plus one other language but can't speak" — the Skeleton's
[reskin] immunities stamped for type: Undead -> Poison; Exhaustion, Poisoned
[reskin] print canon defenses: vulnerabilities none -> Bludgeoning — the Skeleton's own header lines
[reskin] vulnerability rejected — "Bludgeoning" has no warrant in the concept's own text (print's default is none)
[reskin] nova capped: Actions/Hurled Burst (Recharge 5-6) — 14 over the CR 2 ceiling 11, dice to 11 (2d10)
[reskin] audit rename: "Hurled Burst (Recharge 5-6)" -> "Bone Shard Burst (Recharge 5-6)"
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

Bloodied Frenzy. While Bloodied, the ogre has Advantage on attack rolls and saving throws.

Great Weapon Master. When the ogre hits a creature with its Greataxe, the attack deals an extra 2 damage.

Actions

Greataxe. Melee Attack Roll: +6, reach 5 ft. 22 (4d8 + 4) Slashing damage.

Javelin. Melee or Ranged Attack Roll: +6, reach 5 ft. or range 30/120 ft. 22 (4d8 + 4) Piercing damage.

Bonus Actions

Backhand Retort. One creature within 5 feet that hit the ogre with an attack roll since the end of the ogre's last turn takes 9 (2d8) Bludgeoning damage.

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
- Traits/Bloodied Frenzy — barbarian kit; the GM's clause "an ogre with a greataxe"
- Traits/Great Weapon Master — a declared feature; the GM's clause "an ogre with a greataxe"
- Bonus Actions/Backhand Retort — library seed own-turn-punisher

**Engine trace**

```
[route] brute type=Giant mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | brute: ✓ ("an ogre with a greataxe") | brute: no line key in the words — the model's read of its quote
[concept] name: provided_name rejected — "an ogre with a greataxe…" is the description, not a name
[concept] resolve: archetype=brute type=Giant themes=armed/bestial mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: stolen greataxe swung in wide arcs [object] | relentless self-sacrificing trading [behavior] | rush-down pursuit of fleeing prey [behavior]
[concept] identity: The ogre opens by stomping into reach and swinging its greataxe in wide, committed arcs meant to clear a circle, then settles into a steady trading rhythm where it eats a hit to land two. It has no patience for delay: if prey bolts, it hurls itself after them bellowing, and it fights to the death rather than surrender ground.
[concept] lore: A hill-country ogre that has learned that a stolen axe is worth more than a club, it now takes toll from any road running through its range.
[reskin] print canon defenses: HP 66 -> 68, AC 12 -> 11 — the Ogre's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 19, DEX 8, CON 16, INT 5, WIS 7, CHA 7 — the Ogre's at its own CR; attack +5 -> +6, DC 14 (print's)
[reskin] donor: brute-2 -> CR 3
[reskin] print canon: "an ogre with a greataxe" heads on the Ogre — print's rows ride along; the seat stays
[reskin] named parts: Greataxe (slot) — the user's words, the engine's numbers
[reskin] named parts landed: 1 attack row(s), 0 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] implied class kept: "barbarian" on the GM's own words "an ogre with a greataxe" — the key table found none
[reskin] class kit: barbarian — "an ogre with a greataxe": Bloodied Frenzy (Berserker/Bloodied Frenzy); Rampage yielded to print's row cap 4
[reskin] inline declared: "the toll-ogre" — the call's own answer (kind), built from the name
[reskin] inline form: "the toll-ogre" — the model's own reading of the name
[reskin] save dc derived: DC 12 -> 14 (8 + PB 2 + the sheet's best 4) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] lacks refused: "no patience for delay" quotes nothing the user typed
[reskin] clauses: "an ogre with a greataxe" -> has (descriptive), head
[reskin] signature idea (action): "The toll-ogre winds up and swings its greataxe in a full, committed circle, heedless of its own guard, catching every enemy within its long reach as it spins. It leaves a wide gap in its defense until its next turn, but anything that was standing near it has learned to be somewhere else." [action/once_per_fight/damage] — menu: trample, leap, throw-retrieve, shield-bash, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up (+ shelf: rampage, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, affliction, contagion, charge-push, hook-rider, pounce, charge)
[reskin] word match declined by the call: active-toll — the key word does not mean the mechanic here
[reskin] fit declined: "Reaping Spin (Recharge 5-6)" — a print body takes only what the user's words ask; the call offered no quote, and the key table finds no verb either (the blacksmith's rally, critic-ten 2026-10-01)
[reskin] fallback stands down: "an ogre with a greataxe" heads on the Ogre and asks for nothing — print's rows, nothing invented (the big ogre, critic-ten 2026-10-01)
[reskin] value check: "Answering Sting" EV 5 vs floor 3.7 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: own-turn-punisher -> Bonus Actions/"Answering Sting" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The stolen greataxe hungers for a fight, and the toll-ogre swings it with more abandon the more it bleeds — each cut it lands on a foe that has already hurt it carves deeper than the last." [trait/always/damage] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending, weapon-lodge)
[reskin] word match declined by the call: bloodied-fury, bloodied-burst, resonant-body — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "The stolen greataxe hungers for a fight, and the toll-ogre swings it with more abandon the more it bleeds — each cut it lands on a foe that has already hurt it carves deeper than the last." [trait/always/damage] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst, bloodied-burst, resonant-body)
[reskin] weapons answered: Greataxe = greataxe
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] print canon alignment: Chaotic Neutral -> Chaotic Evil — the Ogre's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon name: "Toll-Ogre" -> "Ogre" — a whole print name is the creature's name (the Goblin Boss shipped as Krag the Iron Standard, 2026-10-01)
[reskin] inline follows the print name: "the toll-ogre" -> "the ogre"
[reskin] print canon languages: "Common" -> "Common, Giant" — the Ogre's
[reskin] print canon speed: 30 ft. -> 40 ft. — the Ogre's walk; the concept's other modes stay
[reskin] print canon row frame: "Javelin" keeps print's thrown frame — reach 5 ft. or range 30/120 ft.
[reskin] print canon row: Actions/Javelin — the Ogre's second melee row, beside the chassis's
audit finding below confidence gate: Answering Sting The trigger requires the GM to remember which creatures hit the ogre since the end of its last turn, a running state the block gives no way to track and no player-visible cue to declare.
[reskin] audit rename: "Answering Sting" -> "Backhand Retort"
```


---


### Mummy — in the run

**Concept:** name: Mummy | 

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Mummy | 3 | defender-3 | SOFT: hit-die | ok | ok | ok | ok | ok | ok | ok | ok |

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
+3
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
+3
MOD
SAVE
CON
15
+2
+4
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

- Actions/Multiattack — the chassis
- Actions/Rotting Fist — print's row, renamed
- Actions/Dreadful Glare — print's own row

**Engine trace**

```
[route] defender-warden type=Undead mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | defender-warden: ✓ ("Mummy") | defender-warden: no line key in the words — the model's read of its quote
[concept] resolve: archetype=defender type=Undead themes=grave/terror mind=sapient style=warden energy=Necrotic mix=both identity=✓ lore=✓
[concept] name: provided "Mummy"
[concept] mechanics: none claimed
[concept] signature elements: tomb-bound guardian of a charge [behavior] | wrapped desiccated corpse [body] | curse of the grave that clings to its blows [aura]
[concept] identity: The mummy opens by fixing its hollow gaze on the intruder nearest its charge, then wades forward with the slow inevitability of a closing door, striking with wrapped fists that carry the tomb's dry rot. Every round it interposes its own desiccated body between its ward and harm, and it never retreats — a guardian that fights until the ward is safe or it is dust.
[concept] lore: A body that was promised to a tomb's eternal vigil, still bound to defend the sarcophagus or relic it was sealed beside long after the priests who bound it turned to dust.
[reskin] print canon route: "Mummy" is the Mummy — the warden seat stands down for the plain line
[reskin] print canon defenses: HP 52 -> 58, AC 18 -> 11 — the Mummy's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 16, DEX 8, CON 15, INT 6, WIS 12, CHA 12 — the Mummy's at its own CR; attack +5 -> +5, DC 11 (print's)
[reskin] donor: defender-3 -> CR 3
[reskin] row gated out: Guard Aura (aura) — the concept did not claim this mechanic
[reskin] print canon: "Mummy" is a print creature — the seats stand down; print's own rows are the composition
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] inline by rule: "the mummy" — the call answered "the mummy" (kind), which the name does not support
[reskin] inline form: "the mummy" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Mummy" -> has (descriptive), head
[reskin] weapons answered: Fist = none
[reskin] print canon speed: modes walk only — the Mummy's
[reskin] print canon senses: "darkvision 60 ft." — the Mummy's
[reskin] languages by mind: "None" -> "Common plus the languages it knew in life" (sapient)
[reskin] print canon size: Medium -> Small — the Mummy's
[reskin] print canon alignment: Lawful Neutral -> Lawful Evil — the Mummy's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common plus the languages it knew in life" -> "Common plus two other languages" — the Mummy's
[reskin] print canon speed: 30 ft. -> 20 ft. — the Mummy's walk; the concept's other modes stay
[reskin] print canon attack: "Fist" -> "Rotting Fist" — the Mummy's own row
[reskin] print canon multiattack: "The mummy makes two Rotting Fist attacks and uses Dreadful Glare." — the Mummy's own
[reskin] immunities stamped for type: Undead -> Poison; Exhaustion, Poisoned
[reskin] print canon defenses: immunities Poison; Exhaustion, Poisoned -> Necrotic, Poison; Charmed, Exhaustion, Frightened, Paralyzed, Poisoned; vulnerabilities none -> Fire — the Mummy's own header lines
[reskin] print canon row: Actions/Dreadful Glare — the Mummy's own
[reskin] vulnerability rejected — "Fire" has no warrant in the concept's own text (print's default is none)
```


---


### Sexton of the Flooded Nave — in the run

**Concept:** a ghost of the drowned chapel who drifts through its walls

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Sexton of the Flooded Nave | 4 | lurker-1-phantom | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1 / off 7 → 4; sustained 50 (2 × Withering Touch); nova none; dmg 50

```
Sexton of the Flooded Nave

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

Resistances Bludgeoning, Piercing, Slashing

Immunities Necrotic, Poison; Charmed, Exhaustion, Frightened, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained

Senses darkvision 60 ft.; Passive Perception 11

Languages Common plus one other language

CR 4 (XP 1,100; PB +2)

Traits

Incorporeal Movement. The sexton can move through other creatures and objects as if they were Difficult Terrain. It takes 5 (1d10) Force damage if it ends its turn inside an object.

Sunlight Sensitivity. While in sunlight, the sexton has Disadvantage on ability checks and attack rolls.

Ethereal Sight. The sexton can see 60 feet into the Ethereal Plane when it is on the Material Plane.

Actions

Multiattack. The sexton makes two Withering Touch attacks. It can replace one attack with a use of Dread of the Deep Nave.

Withering Touch. Melee Attack Roll: +5, reach 5 ft. 25 (5d8 + 3) Necrotic damage.

Dread of the Deep Nave. Wisdom Saving Throw: DC 13, one creature within 60 feet. Failure: The target has the Frightened condition until the end of the sexton's next turn. If the target was already Frightened by this ability, it also takes 27 (6d8) Necrotic damage.

Horrific Visage. Wisdom Saving Throw: DC 13, each creature in a 60-foot Cone that can see the sexton and isn't an Undead. Failure: 10 (2d6 + 3) Psychic damage, and the target has the Frightened condition until the start of the sexton's next turn. Success: The target is immune to this ghost's Horrific Visage for 24 hours.

Possession (Recharge 6). Charisma Saving Throw: DC 13, one Humanoid the sexton can see within 5 feet. Failure: The target is possessed by the sexton; the sexton disappears, and the target has the Incapacitated condition and loses control of its body. The sexton now controls the body, but the target retains awareness. The sexton can't be targeted by any attack, spell, or other effect, except ones that specifically target Undead. The sexton's game statistics are the same, except it uses the possessed target's Speed, as well as the target's Strength, Dexterity, and Constitution modifiers.
The possession lasts until the body drops to 0 Hit Points or the sexton leaves as a Bonus Action. When the possession ends, the sexton appears in an unoccupied space within 5 feet of the target, and the target is immune to this ghost's Possession for 24 hours. Success: The target is immune to this ghost's Possession for 24 hours.

Etherealness. The sexton casts the Etherealness spell, requiring no spell components and using Charisma as the spellcasting ability. The sexton is visible on the Material Plane while on the Border Ethereal and vice versa, but it can't affect or be affected by anything on the other plane.

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
- Actions/Withering Touch — print's row, renamed
- Actions/Dread of the Deep Nave — library seed escalating-dread
- Actions/Horrific Visage — print's own row
- Actions/Possession — print's own row
- Actions/Etherealness — print's own row

**Engine trace**

```
[route] lurker-phantom type=Undead mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | lurker-phantom: ✓ ("a ghost of the drowned chapel who drifts") | lurker-phantom: key "drifts" (class verb)
[concept] name: provided_name rejected — "ghost of the drowned chapel…" is the description, not a name
[concept] hints: phantom→style ✓ ("a ghost of the drowned chapel")
[concept] resolve: archetype=lurker type=Undead themes=grave/aquatic mind=sapient style=phantom energy=Necrotic mix=energy identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: drifting through chapel walls [behavior] | drowning grasp of grave-cold water [behavior] | flooded drowned nave [aura]
[concept] identity: The drowned chapel ghost opens by rising silently through the flooded aisle stones and walls, its grave-cold touch passing through armor to drink the warmth from the living. Each round it drifts through stone and water to isolate the weakest intruder, then strikes and retreats through the wall before blades can answer. It hates the living and hates light, and when hurt it does not flee the chapel—it sinks beneath the flooded floor and returns to drown the wounded from below.
[concept] lore: A congregation drowned when the valley dam broke and the chapel flooded, and their sexton still paces the submerged nave, unwilling to abandon a flock that never rose again.
[reskin] print canon defenses: HP 54 -> 45, AC 13 -> 11 — the Ghost's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 7, DEX 13, CON 10, INT 10, WIS 12, CHA 17 — the Ghost's at its own CR; attack +6 -> +5, DC 13 (print's)
[reskin] donor: lurker-1-phantom -> CR 4
[reskin] print canon: "a ghost of the drowned chapel who drifts through its walls" heads on the Ghost — print's rows ride along; the seat stays
[reskin] inline by rule: "the sexton" — the call answered "the flooded nave" (kind), which the name does not support
[reskin] lacks asked: nothing taken away
[reskin] lacks refused: "no warmth" quotes nothing the user typed
[reskin] lacks refused: "cannot be answered with blades" quotes nothing the user typed
[reskin] lacks refused: "hates the living" quotes nothing the user typed
[reskin] lacks refused: "hates light" quotes nothing the user typed
[reskin] clauses: "a ghost of the drowned chapel" -> has (descriptive), head | "drifts through its walls" -> has (descriptive)
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The sexton drifts through stone and water to reach a living creature it can sense but not see, then grasps upward from beneath the flooded floor. The victim feels the chapel's drown-water pour into their lungs even as they stand in dry air, and when the sexton withdraws through the wall, that water stays—clinging to the back of the throat, waiting for the next breath to go wrong." [action/save/damage] — menu: seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, terror-pulse, snare-bolt, slow-bolt, sensory-strike, drain, zone-seed, blighted-ground (+ shelf: leap, delayed-brand, patient-defense, self-invisibility, focus, feint-slip, coating, riposte, charge-push, hook-rider, pounce, isolation)
[reskin] decline reason: action — the call answered none and names it "no_fit"
[reskin] signature miss: action — "The sexton drifts through stone and water to reach a living creature it can sense but not see, then grasps upward from beneath the flooded floor. The victim feels the chapel's drown-water pour into their lungs even as they stand in dry air, and when the sexton withdraws through the wall, that water stays—clinging to the back of the throat, waiting for the next breath to go wrong." [action/save/damage] — the model found no template that holds it (offered: seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, terror-pulse, snare-bolt, slow-bolt, sensory-strike, drain, zone-seed, blighted-ground, patient-defense)
[reskin] fallback stands down: "a ghost of the drowned chapel who drifts through its walls" heads on the Ghost and asks for nothing — print's rows, nothing invented (the big ogre, critic-ten 2026-10-01)
[reskin] value check: "Creeping Dread" EV 18.6 vs floor 14 (one attack of 1) — dice 14 → 27
[reskin] library seed drawn: escalating-dread -> Actions/"Creeping Dread" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Where the sexton has passed through flooded stone, the nave remembers the drowning. Water in its wake grows grave-cold and heavy, and any warm-blooded creature standing in it feels the river's pull at their ankles—not enough to hold them, but enough that every step toward the sexton costs more than the last." [trait/always/movement] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, shielded-mind, evasion, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, uncanny-sense, warded-mending)
[reskin] word match declined by the call: false-appearance, aberrant-ground, bloodied-fury, bloodied-burst, uncanny-sense, adhesive, phobia, terrain-walk, faultless-tracker, web-walker, noxious-aura, shielded-mind, evasion, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "Where the sexton has passed through flooded stone, the nave remembers the drowning. Water in its wake grows grave-cold and heavy, and any warm-blooded creature standing in it feels the river's pull at their ankles—not enough to hold them, but enough that every step toward the sexton costs more than the last." [trait/always/movement] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, shielded-mind, evasion, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst, bloodied-burst, uncanny-sense)
[reskin] weapons answered: Grave-Cold Hand = none
[reskin] speed by concept:  — the concept's movement set decides
[reskin] languages by mind: "None" -> "Common plus the languages it knew in life" (sapient)
[reskin] print canon languages: "Common plus the languages it knew in life" -> "Common plus one other language" — the Ghost's
[reskin] print canon speed: Fly -> 40 ft. — the Ghost's own
[reskin] print canon attack: "Grave-Cold Hand" -> "Withering Touch" — the Ghost's own row
[reskin] print canon multiattack: "The sexton makes two Withering Touch attacks." — the Ghost's own, added (the chassis carried none; the Owlbear makes two Rend attacks — canaries 2026-10-12)
[reskin] immunities stamped for type: Undead + donor suite -> Poison; Charmed, Exhaustion, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained
[reskin] print canon defenses: immunities Poison; Charmed, Exhaustion, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained -> Necrotic, Poison; Charmed, Exhaustion, Frightened, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained; resistances none -> Acid, Bludgeoning, Cold, Fire, Lightning, Piercing, Slashing, Thunder — the Ghost's own header lines
[reskin] resistances derived: Bludgeoning, Piercing, Slashing
[reskin] print canon trait: Ethereal Sight — "a ghost of the drowned chapel who drifts through its walls" is the Ghost (print's own row)
[reskin] print canon row: Actions/Horrific Visage — the Ghost's own
[reskin] print canon row: Actions/Possession (Recharge 6) — the Ghost's own
[reskin] print canon row: Actions/Etherealness — the Ghost's own
[reskin] vulnerability rejected — "Radiant" has no warrant in the concept's own text (print's default is none)
[reskin] multiattack replacement clause: It can replace one attack with a use of Creeping Dread.
[reskin] audit rename: "Creeping Dread" -> "Dread of the Deep Nave"
```


---


### Mire-Gorge Troll — in the run

**Concept:** a troll that grows back unless the blade was silvered

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Mire-Gorge Troll | 6 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- **dropped clause:** "grows back unless the blade was silvered"
- read: def 4 / off 10 → 7; sustained 66 (3 × Rend); nova none; dmg 66

```
Mire-Gorge Troll

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

Rend. Melee Attack Roll: +7, reach 10 ft. 22 (4d8 + 4) Slashing damage.

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
- Actions/Rend — print's row, renamed
- Traits/Regeneration — print's own row
- Traits/Loathsome Limbs — print's own row
- Bonus Actions/Charge — print's own row

**Engine trace**

```
[route] brute-regenerator type=Giant mechanics=regeneration — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | brute-regenerator: ✓ ("grows back unless the blade was silvered") | brute-regenerator: no line key in the words — the model's read of its quote | bane: "silver" on the GM's own words "unless the blade was silvered"
[concept] hints: troll→canon ✓ ("a troll that grows back")
[concept] resolve: archetype=brute type=Giant themes=bestial/grasping mind=sapient style=regenerator energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: regeneration
[concept] signature elements: wounds close as fast as they open [behavior] | only silvered blades stop the regrowth [behavior] | knotted hide and gristle giant [body]
[concept] identity: A hulking giant of knotted hide and gristle wades in with a club-swing that pulverizes bone, then keeps swinging while every gash it takes closes before the next blow lands. Each round it regenerates its wounds unless the weapon was silvered, so silvered edges must be forced on it fast or the fight becomes an endurance grind it always wins. It is a gleeful, gluttonous brawler that toys with overwhelmed prey and never retreats, only feeds.
[concept] lore: Born in the deep moors where old magic seeps through the peat, this giant troll is drawn by the smell of blood and the sound of clashing steel, believing every armed creature is simply food that fights back.
[reskin] print canon route: the Troll's body outranks the regenerator seat — no verb in the words names it; the plain brute line
[reskin] print canon defenses: HP 116 -> 94, AC 14 -> 15 — the Troll's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 18, DEX 13, CON 20, INT 7, WIS 9, CHA 7 — the Troll's at its own CR; attack +7 -> +7, DC 16 (print's)
[reskin] regeneration organ injected — 10/turn
[reskin] regeneration off-switch: silver (the call read the GM's weakness clause as silver ("unless the blade was silvered"))
[reskin] donor: brute-5 -> CR 6
[reskin] print canon: "a troll that grows back unless the blade was silvered" heads on the Troll — print's rows ride along; the seat stays
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] inline declared: "the troll" — the call's own answer (kind), built from the name
[reskin] inline form: "the troll" — the model's own reading of the name
[reskin] save dc derived: DC 14 -> 16 (8 + PB 3 + the sheet's best 5) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a troll" -> has (descriptive), head | "grows back unless the blade was silvered" -> has (mechanical) [asked: heal]
[reskin] signature idea (action): "When a wounded creature nearby tries to slip away or reposition, the troll lunges after it, hooting with glee, and drags it back within reach of its club. Prey that is already bleeding is its favorite, and it will cross the whole gorge to reclaim a meal it thinks is escaping." [reaction/on_being_hit/movement] — menu: EMPTY (+ shelf: trample, leap, thrown-burst, shield-bash, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, rampage, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, stunning-strike, charge-push, hook-rider, pounce, charge)
[reskin] word match declined by the call: hook-rider, rampage — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit"
[reskin] signature miss: action — "When a wounded creature nearby tries to slip away or reposition, the troll lunges after it, hooting with glee, and drags it back within reach of its club. Prey that is already bleeding is its favorite, and it will cross the whole gorge to reclaim a meal it thinks is escaping." [reaction/on_being_hit/movement] — the model found no template that holds it (offered: hook-rider, rampage)
[reskin] fallback respects the call: rampage left the shelf — the call declined it for this sheet
[reskin] fallback stands down: "a troll that grows back unless the blade was silvered" heads on the Troll and asks for nothing — print's rows, nothing invented (the big ogre, critic-ten 2026-10-01)
[reskin] value check: "Dazzling Burst" EV 2.9 vs floor 10.9 (one attack of 2) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Dazzling Burst" — a seed that cannot be lifted does not ship
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "Whenever a blade opens a fresh wound on the troll, the knotted hide splits along old scars and a spray of black moor-ichor lashes out at whoever struck it, stinging and blinding them for a moment. The deeper they cut, the more violently the gristle-matter spits back." [trait/on_being_hit/condition] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] word match declined by the call: bloodied-burst, heated-body — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "Whenever a blade opens a fresh wound on the troll, the knotted hide splits along old scars and a spray of black moor-ichor lashes out at whoever struck it, stinging and blinding them for a moment. The deeper they cut, the more violently the gristle-matter spits back." [trait/on_being_hit/condition] — the model found no template that holds it (offered: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge, bloodied-fury)
[reskin] repair: 1 clause(s) with no row — "grows back unless the blade was silvered"; one targeted call with the sheet as context
[reskin] repair: the answer held no rows — the clauses stay unplaced
[reskin] weapons answered: Club = club
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] print canon alignment: Neutral Evil -> Chaotic Evil — the Troll's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common" -> "Giant" — the Troll's
[reskin] print canon speed: 40 ft. -> 30 ft. — the Troll's walk; the concept's other modes stay
[reskin] print canon attack: "Club" -> "Rend" — the Troll's own row
[reskin] print canon multiattack: "The troll makes three Rend attacks." — the Troll's own
[reskin] print canon trait: Loathsome Limbs — "a troll that grows back unless the blade was silvered" is the Troll (print's own row)
[reskin] print canon trait: Regeneration — print's text replaces the chassis's (the Troll regenerates 15, not the chassis's 10 — critic's audit 2026-10-02)
[reskin] print canon row: Bonus Actions/Charge — the Troll's own
[reskin] regeneration keyed to the GM's own bane: "Regeneration" keyed "Acid or Fire damage" and the GM named silver ("unless the blade was silvered") — print's row keeps everything else
audit rewrite meta-language, dropped: Loathsome Limbs The troll has 1 Exhaustion level for each missing limb, and it grows replacement limbs the next time it regains Hit Points.
audit finding below confidence gate: Loathsome Limbs The entry requires the GM to track per-turn Slashing damage totals and Bloodied state, then spawn an undefined actor, making it hard to resolve in one pass at the table.
[reskin] audit rewrite blocked — "Regeneration" is engine-authored chassis text
```


---


### Iron Inquisitor — in the run

**Concept:** an iron-willed inquisitor who never yields ground

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Iron Inquisitor | 6 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 5 / off 6 → 5.5; sustained 44 (2 × Greathammer); nova none; dmg 44

```
(not the page capture — the card capture came back empty; drawn from the saved JSON)
Iron Inquisitor
Medium Humanoid, Lawful Neutral
AC 19
HP 91 (14d8 + 28)
Speed 30 ft.
STR 18 DEX 12 CON 15 INT 11 WIS 13 CHA 14
Skills Athletics +7, Perception +4
Senses Passive Perception 14
Languages Common
CR 6

Actions
Multiattack. The inquisitor makes two Greathammer attacks.
Shield Bash. *Strength Saving Throw*: DC 15, one creature within 5 feet that the inquisitor can see. *Failure:* 11 (2d10) Bludgeoning damage, and if the target is Medium or smaller, it has the Prone condition.
Greathammer. *Melee Attack Roll:* +7, reach 5 ft. 22 (4d8 + 4) Bludgeoning damage.
Iron Verdict. *Strength Saving Throw:* DC 15, one creature within 30 feet that is Prone. *Failure:* 17 (5d6) Piercing damage. *Success:* Half damage.
```

**Where each row came from**

- Actions/Multiattack — the chassis
- Actions/Shield Bash — template shield-bash
- Actions/Greathammer — weapon maul
- Actions/Iron Verdict — library seed exploiter

**Engine trace**

```
[route] defender type=Humanoid mechanics=none — casts: implied by the kind — "iron-willed inquisitor" | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | defender: ✓ ("who never yields ground") | defender: no line key in the words — the model's read of its quote
[concept] resolve: archetype=defender type=Humanoid themes=armed/terror mind=sapient style=— energy=Psychic mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: never yields ground [behavior] | punishes anyone who moves past [behavior] | iron resolve [aura]
[concept] identity: The Inquisitor plants itself at the choke point and simply refuses to be moved: it opens by advancing one deliberate step into the enemy's reach, shield high, daring them to break on it. Every round after, it holds that ground and answers any strike with a punishing counter, its iron discipline converting every attack against it into a lesson in consequence. It never flees bloodied — it fights to the last, because yielding ground is the one sin it cannot forgive.
[concept] lore: An inquisitor whose will was tempered in iron rather than faith, it was left standing at a gate no one else would hold and simply never received the order to leave; now it guards every threshold it finds with the same unforgiving certainty.
[reskin] energy withheld: Psychic on a Humanoid with no Psychic in the concept's own words (fixed phrases read first)
[reskin] donor: defender-5 -> CR 6
[reskin] row gated out: Guard Aura (aura) — the concept did not claim this mechanic
[reskin] class kit: Divine Aid — the sheet carries no row it could refer to (/^Spellcasting$/)
[reskin] class kit: cleric — "an iron-willed inquisitor": nothing to add — the sheet already answers it
[reskin] shield is not a weapon: "Shield" takes print's Shield Bash shape beside Greathammer — it was "*Melee Attack Roll:* +7, reach 5 ft. 13 (2d8 + 4) {damage_ty…"
[reskin] inline declared: "the inquisitor" — the call's own answer (kind), built from the name
[reskin] inline form: "the inquisitor" — the model's own reading of the name
[reskin] save dc derived: DC 14 -> 15 (8 + PB 3 + the sheet's best 4) — no stat on the sheet reached it
[reskin] lacks asked: "never yields ground"
[reskin] asked field dropped: the call answered limit "at_will" for "never yields ground" but quoted "never", which is not the GM's own words
[reskin] clauses: "an iron-willed inquisitor" -> has (descriptive), head | "never yields ground" -> LACKS (mechanical) [asked: resist]
[reskin] menu pruned: action — snap-shot, push-prone (the sheet cannot render them)
[reskin] signature idea (action): "When a foe the inquisitor can see tries to slip past it or step away from it, it answers with the same lesson it gives to blows: a sudden, flat hammer-strike into the offender's stance. That creature is left stumbling and unable to finish its move, its momentum broken on the inquisitor's ground rather than carried away from it." [reaction/on_being_hit/movement] — menu: riposte (+ shelf: throw-retrieve, seal, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, herd, curse-debt, reveal, wind-up, exploiter, blighted-ground, patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally)
[reskin] signature bound to the concept's verb: action — blighted-ground (ground)
[reskin] decline reason: action — the call answered none and names it "no_fit" after being shown blighted-ground, which the GM's words keyed
[reskin] key match declined: action — "blighted-ground" was ranked first on the call's own menu for ground, and the call read it as no fit; the words keep their claim and nothing is forced
[reskin] signature miss: action — "When a foe the inquisitor can see tries to slip past it or step away from it, it answers with the same lesson it gives to blows: a sudden, flat hammer-strike into the offender's stance. That creature is left stumbling and unable to finish its move, its momentum broken on the inquisitor's ground rather than carried away from it." [reaction/on_being_hit/movement] — the model found no template that holds it (offered: blighted-ground, riposte, throw-retrieve, exploiter, own-turn-punisher)
[reskin] value check: "Opportunist's Lash" EV 13.2 vs floor 10.9 (one attack of 2) — worth the trade
[reskin] library seed drawn: exploiter -> Actions/"Opportunist's Lash" (no template held the idea; a proven shape stands in)
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 19 already beats print's AC 15 at CR 6, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "The inquisitor's discipline turns every wound into a ledger entry: each time it is struck in melee, it marks the striker and calls the debt due, so that strikes against it only sharpen the punishment it hands back. This banks up until it answers in a single terrible reckoning." [trait/on_being_hit/damage] — menu: absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura)
[reskin] signature bound to the concept's verb: trait — resonant-body (iron)
[reskin] word match declined by the call: resonant-body, faultless-tracker, bloodied-fury, absorption, weapon-lodge — the key word does not mean the mechanic here
[reskin] trait declined: "Debt's Reckoning" — bound only on the idea's own words (wounded:idea) with no key in the concept; a meat body earns its trait by the user's verb (the sniper's tracker, critic 2026-09-29)
[reskin] weapons answered: Shield = shield; Greathammer = maul
[reskin] weapon declared: "Greathammer" is a maul — the call's own answer (the name alone read warhammer)
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] multiattack normalised: "The inquisitor makes two Greathammer attacks."
[reskin] audit rename: "Shield" -> "Shield Bash"
[reskin] audit rename: "Opportunist's Lash" -> "Iron Verdict"
[reskin] row narrowed: "Greathammer" names nothing that can be thrown — the range leaves (print dresses only a thrown weapon in "Melee or Ranged")
!! Failed to load resource: net::ERR_NETWORK_IO_SUSPENDED
!! Error generating response: TypeError: Failed to fetch
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs?t=1792202639880:246:26)
    at enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs?t=1792202639880:303:26)
    at saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1792336652099:1394:30)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1792336652099:1233:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1792336652099:656:5)
!! [ENRICHMENT] Failed to enrich Iron Inquisitor: TypeError: Failed to fetch
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs?t=1792202639880:246:26)
    at enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs?t=1792202639880:303:26)
    at saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1792336652099:1394:30)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1792336652099:1233:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1792336652099:656:5)
(enrichment did not settle within 20s — moving on)
```


---


### Coil-Bound Keeper — in the run

**Concept:** a coil-bodied horror that seizes a victim and will not let go

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Coil-Bound Keeper | 7 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- **dropped clause:** "seizes a victim"
- read: def 5 / off 8 → 6.5; sustained 52 (2 × Coils); nova none; dmg 52

```
Coil-Bound Keeper

Medium Monstrosity, Unaligned

AC 14
Initiative -1 (9)

HP 135 (18d8 + 54)

Speed 30 ft.

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

Multiattack. The keeper makes two Coils attacks. It can replace one attack with a use of Reeling Coils.

Coils. Melee Attack Roll: +7, reach 5 ft. 26 (5d8 + 4) Bludgeoning damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 15). While Grappled, the target has the Restrained condition.

Reeling Coils. Strength Saving Throw: DC 14, one creature within 30 feet. Failure: The target is pulled up to 25 feet straight toward the keeper by its coils and has the Grappled condition (escape DC 15).

Bonus Actions

Smother. The keeper smothers one Medium or smaller creature it is grappling. While smothered, the target has the Blinded and Restrained conditions, has Total Cover against attacks and other effects outside the keeper, and takes 7 (2d6) Bludgeoning damage at the start of each of the keeper's turns. The keeper can have only one creature smothered at a time. If the keeper takes 15 damage or more in a single turn from the smothered creature, the keeper must release the target at the end of that turn, and the target exits Prone in an unoccupied space within 5 feet of the keeper. If the keeper dies, a smothered creature pulls free Prone by using 5 feet of movement.

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
- Actions/Reeling Coils — template hook-drag; library draw (seed unstamped); binds the GM's words: drag+reel+pull
- Bonus Actions/Smother — binds the GM's words: smother+swallow+swallows+engulf+engulfs+devour+devours+gulp+entomb+cocoon+whelm

**Engine trace**

```
[route] brute-grappler type=Monstrosity mechanics=grapple, engulf — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: on the GM's own words "seizes a victim and will not let go" | brute-grappler: ✓ ("seizes a victim and will not let go") | brute-grappler: key "seizes" (class verb)
[concept] hints: grappler→style ✓ ("coil-bodied horror that seizes")
[concept] resolve: archetype=brute type=Monstrosity themes=grasping/bestial mind=bestial style=grappler energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: grapple, engulf
[concept] signature elements: coils that seize and will not release [behavior] | thick hide-wrapped serpent body [body] | drags prey down into its nest [behavior]
[concept] identity: A hide-bound serpent-mass that winds low and silent until it can throw its coils around a victim's chest, cinching tight and dragging them off their feet. Each round it squeezes, reels the pinned prey closer to its crushing body, and shifts its grip to deny escape rather than striking fresh targets. Once bloodied it does not flee — it redoubles its hold, willing to die wrapped around its kill.
[concept] lore: Born in the choked roots of old tidal marshland, the coil-thing hunts not to eat but to keep, dragging prey down into its nest of mud and stolen bone where it can hold them until they stop moving.
[reskin] donor: brute-5-grappler -> CR 7
[reskin] engulf engine: Smother — the body's own verb
[reskin] inline declared: "the keeper" — the call's own answer (kind), built from the name
[reskin] inline form: "the keeper" — the model's own reading of the name
[reskin] save dc derived: DC 13 -> 15 (8 + PB 3 + the sheet's best 4) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] lacks not claimed: "will not let go" reads like a lack to the words, and the call's list did not name it
[reskin] clauses: "a coil-bodied horror" -> has (descriptive), head | "seizes a victim" -> has (mechanical) [asked: on_hit/condition] | "will not let go" -> has (mechanical) [asked: condition]
[reskin] signature idea (action): "When the keeper already has a creature wrapped, it reels that victim across the ground toward itself instead of grabbing someone new, dragging the whole coiled mass of prey a short distance in one heaving pull. Anyone in the path gets shoved aside by the sliding body of the keeper." [rider/on_hit/movement] — menu: stunning-strike, charge-push, hook-rider, pounce (+ shelf: swallow, leap, condition-payoff, shield-bash, hook-drag, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, exploiter, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating)
[reskin] signature bound to the concept's verb: action — escalating-dread, wind-up (horror, coil)
[reskin] word match declined by the call: escalating-dread, wind-up, swallow — the key word does not mean the mechanic here
[reskin] value check: "Reeling Coils" EV 13.8 vs floor 13 (one attack of 2) — worth the trade
[reskin] signature template: hook-drag -> Actions/"Reeling Coils" ("the keeper reels an already-grappled victim across the ground toward itself in o [verb: drag:idea, reel:idea, pull:idea]")
[reskin] signature idea (trait): "The keeper's hide is roped with living coils that answer any wound with a reflex cinch: whenever it is struck, every creature it is currently holding is crushed tighter by its flinching grip. Pain only makes its grip meaner, which is why it never lets a wounded victim go." [trait/on_being_hit/damage] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] word match declined by the call: bloodied-burst, bloodied-fury — the key word does not mean the mechanic here
[reskin] trait declined: "Cinchfast Coils" — bound only on the idea's own words (grip:idea) with no key in the concept; a meat body earns its trait by the user's verb (the sniper's tracker, critic 2026-09-29)
[reskin] repair: 2 clause(s) with no row — "seizes a victim", "will not let go"; one targeted call with the sheet as context
[reskin] repair: "Coils" is already a row — the repaired copy leaves
[reskin] repaired sheet: 1 attack row(s), 0 save, 0 trait(s), 0 reaction(s); 1 clause(s) unplaced
[reskin] weapons answered: Coils = none
[reskin] languages held: None stands — INT 4 on a Monstrosity speaks nothing, whatever the mind read said
[reskin] multiattack replacement clause: It can replace one attack with a use of Reeling Coils.
[reskin] asked but unanswered: "seizes a victim" asked for on_hit and no row binds the clause
[reskin] audit rewrite blocked — "Smother" is engine-authored chassis text
[reskin] audit rewrite blocked — "Smother" is engine-authored chassis text
[reskin] escape dc: Reeling Coils → DC 15 (8 + PB + STR; a late row wore another number)
```


---


### Dame Oriel — in the run

**Concept:** name: Dame Oriel | 

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Dame Oriel | 5 | defender-3-leader | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 3 / off 5 → 4; sustained 34 (2 × Greatsword); nova none; dmg 34

```
Dame Oriel

Medium Humanoid, Lawful Neutral

AC 16
Initiative +2 (12)

HP 91 (14d8 + 28)

Speed 30 ft.

MOD
SAVE
STR
16
+3
+3
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
14
+2
+5
CHA
15
+2
+5

Skills Athletics +6, Persuasion +5

Senses Passive Perception 10

Languages Common

CR 5 (XP 1,800; PB +3)

Traits

Aura of Authority. While in a 10-foot Emanation originating from Dame Oriel, Dame Oriel and its allies have Advantage on attack rolls and saving throws, provided Dame Oriel doesn't have the Incapacitated condition.

Actions

Multiattack. Dame Oriel makes two attacks, using Greatsword or Javelin in any combination.

Greatsword. Melee Attack Roll: +6, reach 5 ft. 17 (4d6 + 3) Slashing damage.

Javelin. Melee or Ranged Attack Roll: +6, reach 5 ft. or range 30/120 ft. 17 (4d6 + 3) Piercing damage.

Reactions

Riposte. Trigger: A creature within 5 feet of Dame Oriel misses it with a melee attack roll. Response: Dame Oriel makes one Greatsword attack against that creature.

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
- Actions/Greatsword — weapon greatsword
- Actions/Javelin — weapon javelin
- Reactions/Riposte — template riposte; library draw (seed unstamped)

**Engine trace**

```
[route] defender-leader type=Humanoid mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | defender-leader: ✓ ("Dame Oriel") | defender-leader: no line key in the words — the model's read of its quote
[concept] resolve: archetype=defender type=Humanoid themes=armed/forged mind=sapient style=leader energy=Fire mix=both identity=✓ lore=✓
[concept] name: provided "Dame Oriel"
[concept] mechanics: none claimed
[concept] signature elements: a captain who fights beside her troops [behavior] | parry-and-riposte blade work [behavior] | an iron body welded into a soldier's shape [body]
[concept] identity: Dame Oriel opens a battle by planting herself between her retainers and the enemy, calling her line to close ranks as she parries the first blow aimed past her to score a riposte of her own. Each round she fights shoulder to shoulder, using her blade's reach to cover a wounded soldier's retreat while her warlord's presence stokes the discipline of every ally who can see her banner. She is patient and unshakeable under pressure, giving ground only to draw foes into a killing pocket, and she will fight to the last breath if her standard still stands.
[concept] lore: Once a soldier who traded her body for command, Dame Oriel is a living redoubt of welded iron, born of a mercenary oath sworn over a forge, and she searches the frontier for a company worth the weight of the sword she cannot put down.
[reskin] energy withheld: Fire on a Humanoid with no Fire in the concept's own words (fixed phrases read first)
[reskin] donor: defender-3-leader -> CR 5
[reskin] implied class kept: "fighter" on the GM's own words "dame oriel" — the key table found none
[reskin] class kit: fighter — "dame oriel": nothing landed; Riposte yielded to print's row cap 4
[reskin] proper noun: "Dame Oriel" — the Name field is a person, not a kind (no print match, no article in the words)
[reskin] inline declared: "Dame Oriel" — the call's own answer (person), built from the name
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Dame Oriel" -> has (descriptive), head
[reskin] menu pruned: action — snap-shot (the sheet cannot render them)
[reskin] signature idea (action): "When a foe strikes at one of her soldiers beside her, Dame Oriel slides her iron blade across the blow and answers it herself — the enemy's strike is turned aside as she cuts back into the attacker with the same motion, punishing any foe bold enough to reach past her line." [reaction/on_being_hit/damage] — menu: riposte (+ shelf: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, patient-defense, lay-on-hands, second-wind, volley-order, aggro-curse, own-turn-punisher, self-invisibility, rally, stunning-strike, charge-push, hook-rider)
[reskin] word match declined by the call: own-turn-punisher, rally — the key word does not mean the mechanic here
[reskin] value check: "Iron Interception" EV 11.7 vs floor 2.9 (a reaction (free)) — worth the trade
[reskin] signature template: riposte -> Reactions/"Iron Interception" ("A creature beside her is missed by a melee attack and she answers it herself by  [shape fit, no verb match]")
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 16 already beats print's AC 15 at CR 5, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "Dame Oriel's body is welded iron, and she cannot be kept down while her standard stands — once each battle, when she is brought low, the iron folds back into a soldier's shape and she rises again, still fighting for the oath she cannot put down." [trait/always/resource] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending, weapon-lodge)
[reskin] word match declined by the call: false-appearance, resonant-body, bound — the key word does not mean the mechanic here
[reskin] trait declined: "Iron Resurgence" — a shape fit with no verb match on a Humanoid body; a meat body earns its trait by a verb
[reskin] feature name: "Iron Interception" -> "Riposte"
[reskin] weapons answered: Greatsword = greatsword; Javelin = javelin
[reskin] languages by mind: "None" -> "Common" (sapient)
```


---


### Thurivald — in the run

**Concept:** name: Thurivald | A Huge frost giant jarl. He throws boulders, swings a greataxe, and his roar freezes the blood. AC 17, 180 hit points, cr 9.

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Thurivald | 9 | skirmisher-8-hurler | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- **dropped clause:** "He throws boulders"
- read: def 8 / off 10 → 9; sustained 66 (3 × Greataxe); nova Freezing Roar 24; dmg 66

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

Great Weapon Master. When Thurivald hits a creature with its Greataxe, the attack deals an extra 4 damage.

Actions

Multiattack. Thurivald makes three attacks, using Greataxe or Boulder in any combination. It can replace one attack with a use of Trip Attack.

Greataxe. Melee Attack Roll: +8, reach 5 ft. 22 (4d8 + 4) Slashing damage.

Boulder. Ranged Attack Roll: +8, range 20/60 ft. 17 (3d8 + 4) Bludgeoning damage.

Trip Attack. Strength Saving Throw: DC 15, one creature within 30 feet that is Prone. Failure: 14 (4d6) Cold damage. Success: Half damage.

Freezing Roar (Recharge 5-6). Wisdom Saving Throw: DC 15, each creature in a 30-foot Emanation. Failure: 24 (7d6) Cold damage, and the target has the Frightened condition until the end of its next turn. Success: Half damage only.

Bonus Actions

Fleet Agility. Thurivald takes the Dash or Disengage action.

Reactions

Riposte. Trigger: A creature within 5 feet of Thurivald misses it with a melee attack roll. Response: Thurivald makes one Greataxe attack against that creature.

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

- Traits/Great Weapon Master — a declared feature; the GM's clause "swings a greataxe"
- Actions/Multiattack — the chassis
- Actions/Greataxe — authored for this sheet; a named part; the GM's clause "swings a greataxe"; weapon greataxe
- Actions/Boulder — the chassis
- Actions/Trip Attack — library seed exploiter
- Actions/Freezing Roar — authored for this sheet; the GM's clause "his roar freezes the blood"
- Bonus Actions/Fleet Agility — the chassis
- Reactions/Riposte — template riposte; fighter kit; the GM's clause "swings a greataxe"

**Engine trace**

```
[route] skirmisher-hurler type=Giant mechanics=thrown-weapon, aura — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | skirmisher-hurler: ✓ ("He throws boulders") | skirmisher-hurler: key "throws" (class verb)
[concept] hints: hurler→style ✓ ("throws boulders")
[concept] resolve: archetype=skirmisher type=Giant themes=armed/elemental mind=sapient style=hurler energy=Cold mix=both identity=✓ lore=✓
[concept] name: provided "Thurivald"
[concept] mechanics: thrown-weapon, aura
[concept] signature elements: hurled boulders [behavior] | greataxe swings [object] | blood-freezing roar [behavior]
[concept] identity: Thurivald opens with a hurled boulder to stagger the front line, then wades in with his greataxe, roaring between swings to freeze the blood of anyone who closes. He is a jarl who fights as a giant should — ranged pressure until he can crush, then crushing until the field is his — and he never backs down while his war-band's pride is at stake.
[concept] lore: Thurivald is a frost giant jarl of the high glacier holds, sworn to the giant god of winter, who wants a mortal kingdom brought frozen to its knees so his line can claim the lowlands.
[reskin] nova capped: "Hurled Burst" 54 → 49 (the chassis nova obeys the cap: 50 at CR 9)
[reskin] donor: skirmisher-8-hurler -> CR 9 (invented — no printed peer)
[reskin] named parts: Greataxe (slot) — the user's words, the engine's numbers
[reskin] named parts landed: 1 attack row(s), 0 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] implied class kept: "fighter" on the GM's own words "swings a greataxe" — the key table found none
[reskin] row evicted for the cap: Traits/"Glacier Stride" (chassis filler) leaves so "Riposte" fits — the cap evicts by priority, it does not refuse the newcomer
[reskin] class kit: fighter — "swings a greataxe": Riposte (riposte)
[reskin] proper noun: "Thurivald" — the Name field is a person, not a kind (no print match, no article in the words)
[reskin] inline declared: "Thurivald" — the call's own answer (person), built from the name
[reskin] inline form: "Thurivald" — the model's own reading of the name
[reskin] final price: the round ran 51 against the card's 70 — the attack rows re-solve at 137% (3 attacks on an authored sheet, under the card)
[reskin] lacks asked: nothing taken away
[reskin] asked field dropped: the call answered trigger "at_will" for "He throws boulders" but offered no quote
[reskin] asked field dropped: the call answered limit "at_will" for "He throws boulders" but offered no quote
[reskin] asked field dropped: the call answered trigger "at_will" for "swings a greataxe" but offered no quote
[reskin] asked field dropped: the call answered limit "at_will" for "swings a greataxe" but offered no quote
[reskin] clauses: "Thurivald — A Huge frost giant jarl" -> has (header) | "He throws boulders" -> has (mechanical) [asked: attack] | "swings a greataxe" -> has (mechanical) [asked: attack] | "his roar freezes the blood" -> has (mechanical) [asked: save_single] | "AC 17" -> has (header) | "180 hit points" -> has (header) | "cr 9" -> has (header)
[reskin] extraction: 2 of 9 model clauses quote nothing the user typed and leave the record ("AC 17", "cr 9")
[reskin] menu pruned: action — thrown-burst-seed, phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "Thurivald throws back his head and looses a roar of glacier-cold that hangs in the air, freezing the blood of anyone who hears it — foes who close in get sluggish and stiff-limbed, their limbs heavy with frost so they can't strike as fast or flee as far. It fires when he's bloodied and enraged, and the closer someone stands to him, the deeper the cold bites; those who keep their distance feel only" [action/once_per_fight/condition] — menu: snare, condition-payoff, throw-retrieve, shield-bash, lure, snare-bolt, sensory-strike, disarm, exploiter, pacify, slow-bolt (+ shelf: delayed-brand, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, isolation, bolt-mark, bolt-restrain)
[reskin] signature bound to the concept's verb: action — slow-bolt (freeze, frost)
[reskin] word match declined by the call: pacify — the key word does not mean the mechanic here
[reskin] value check: "Rimeblood Roar" EV 2.5 vs floor 9.4 (one attack of 3) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Rimeblood Roar" — the ladder could not lift it; the fallback stands in
[reskin] fallback respects the call: pacify left the shelf — the call declined it for this sheet
[reskin] fallback skipped by the floor: slow-bolt (EV 2.5 vs 9.4)
[reskin] fallback skipped: thrown-burst-seed (the sheet cannot render it)
[reskin] fallback skipped by the floor: disarm (EV 0 vs 9.4)
[reskin] value check: "Opportunist's Lash" EV 10.9 vs floor 9.4 (one attack of 3) — worth the trade
[reskin] library seed drawn: exploiter -> Actions/"Opportunist's Lash" (no template held the idea; a proven shape stands in)
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 17 already beats print's AC 16 at CR 9, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "Every greataxe swing drags a wake of killing frost with it — wherever the blade bites flesh, ice races into the wound, and any creature it lands a solid blow on carries the chill with it for a moment, moving a little slower and shivering until the cold works its way out. Thurivald himself revels in it, swinging harder as the frost spreads around him." [trait/always/condition] — menu: adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature bound to the concept's verb: trait — terrain-walk (freezes, freeze)
[reskin] word match declined by the call: terrain-walk, uncanny-sense, aberrant-ground — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit" after being shown terrain-walk, which the GM's words keyed
[reskin] key match declined: trait — "terrain-walk" was ranked first on the call's own menu for freezes+freeze, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: trait — "Every greataxe swing drags a wake of killing frost with it — wherever the blade bites flesh, ice races into the wound, and any creature it lands a solid blow on carries the chill with it for a moment, moving a little slower and shivering until the cold works its way out. Thurivald himself revels in it, swinging harder as the frost spreads around him." [trait/always/condition] — the model found no template that holds it (offered: terrain-walk, adhesive, phobia, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst, bloodied-burst)
[reskin] concept-first trait skipped: terrain-walk — the call read its match as a collision (the word is a modifier, or the sheet already answers it)
[reskin] feature name: "Opportunist's Lash" -> "Trip Attack" — the card that is this feature takes its name
[reskin] repair: 1 clause(s) with no row — "his roar freezes the blood"; one targeted call with the sheet as context
[reskin] slot yields: nova — the chassis's "Boulder Toss (Recharge 5-6)" leaves; "Freezing Roar (Recharge 5-6)" holds the slot
[reskin] repaired sheet: 1 attack row(s), 1 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] weapons answered: Greataxe = greataxe; Boulder = none; Boulder Toss = none
[reskin] weapon table: "Boulder" — range 30/90 ft. is not a print range; an unlisted thrown thing is 20/60, a hurled mass 60/240 (the critic's third species read)
[reskin] chassis nova: "Freezing Roar (Recharge 5-6)" — the skirmisher-8-hurler's own nova row; geometry, cap and rider lines below are its edits
[reskin] defenses by material: a ice body is vulnerable to Fire and never resists, absorbs, or ignores it — the resistance is withheld; the vulnerability is the GM's to type (the Frostmaw carried a Fire vulnerability nobody typed — the critic's second species read)
[reskin] resistances derived: Cold
[reskin] multiattack replacement clause: It can replace one attack with a use of Trip Attack.
audit finding below confidence gate: Multiattack Multiattack explicitly allows replacing an attack with Trip Attack, but Trip Attack's own restriction (Prone targets only) makes that replacement almost never usable in normal play, creating a fiddly conditional a GM must re-check every turn.
[reskin] user-set: HP 152 -> 180 — a declared field (Resolution 3)
[reskin] multiattack re-read — "Boulder" joins the combination; "Thurivald makes three attacks, using Greataxe or Boulder in any combination. It can replac"
```

