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
