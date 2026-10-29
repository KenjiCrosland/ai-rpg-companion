# Critic response — sweep-2026-10-29T17-45-33 (40 blocks)

**Trigger:** work on the reskin engine's naming, slot fills, free rows, 2014
conversion, or the reader's damage maths. Read this before re-deriving any of it.

Critic's verdicts: **10 ship / 23 fix-lite / 7 fix**. Mine were 22/15/3. The gap
is almost entirely that the critic scores the sheet *as shipped* on three axes
and sends a block back for any soundness 0, where I was scoring "would a GM run
this". Its split is the one to track from here; mine was too generous about
sheets whose maths are wrong in ways a GM wouldn't notice until round two.

Standing score to beat, this sweep: **fun 7 memorable / 3 table-hostile ·
originality 5 strong / 13 missing · soundness 6 broken · twist-became-a-rule 2.**

## Verified against our own 329 before accepting anything

| claim | verdict |
|---|---|
| At-will multi-target control is print-legal | **TRUE.** Young Brass (CR 6, Sleep), Copper (CR 7, Slowing), Bronze (CR 8, Repulsion), Silver (CR 9, Paralyzing) each swap a no-recharge condition-imposing 30-ft Cone into their Multiattack. `control-aoe-ungated` was wrong on all 6 sheets it fired on → retire it. |
| `Fire Aura` is print's name for our "Searing Aura" | **TRUE**, print ×4 (Azer Sentinel CR 2, Salamander). |
| `Aura of Authority` is print | **TRUE**, Hobgoblin Captain CR 3. |
| Dazzling Burst / Sundering Shove / Resonant Body / Horrid Display / Threshold Execute / Bloodied Burst / Searing Aura / Interpose / Aura of Truth are not print names | **TRUE**, none appear in the 329. These are exactly the names colliding ×2–3 per sweep. |
| Goblin Boss is missing Redirect Attack, "both editions print it" | **FALSE.** No `Redirect Attack` anywhere in SRD 5.2. Our Goblin Boss carries print's complete block (Multiattack, Scimitar, Shortbow, Nimble Escape). SRD is the only verbatim source → finding withdrawn, block returns to **ship**. |
| A single hit of 90 at CR 13 is outside print's envelope | **TRUE and then some.** Print's max average on one attack roll: CR 0–2 **24**, 3–5 **31**, 6–9 **35**, 10–12 **39**, 13–16 **51**, 17–20 **43**, 21+ **58**. Funeral Bells 90 at CR 13 (1.8×, with Advantage); Drowned Choirs 61 at CR 10 (1.6×). Print's own swarm rows sit inside their bands, so swarms get no exemption. |
| `Guarded Stance` is applied inconsistently | **TRUE**, and it is not in print either. It was withdrawn from the Ossuary Vigil citing "0 of 329" and shipped on the Adult Red Dragon. Per the owner's 2026-10-27 ruling (print rules calibration, never existence) the *withdrawal* was the wrong half. On the dragon the defect is different and real: it gives attackers Disadvantage, which inverts "blind in one eye". |

## The one thing that needs the owner's word

The critic's top finding amends the owner's own ruling of 2026-10-27 ("stock
rows take the template's name everywhere, NO exception"). Its argument is that
the ruling's *purpose* — a name a GM recognises at a glance — is served by a
print name and defeated by an invented one, so:

- a row reproducing a print row keeps print's name (rule stands, repeats are
  convention);
- a row the engine invented keeps the name the call gave it, because repeating
  a made-up label buys no recognition and reads as catalog furniture.

Evidence for the second half, this run: 11 concept-specific names were erased
(Drowning Hymn, Siege Shoulder, Rime Trail, Thorn Seeds, Lance Vendetta,
Smoking Stumps, Bone Sun Brand, Scythe Pin, Mire Curse, War Bellow, Storm
Retort), and the labels that replaced them collided — Dazzling Burst ×3,
Sundering Shove ×3, Resonant Body ×3, Horrid Display ×2, Luring Presence ×2,
Searing Aura ×2 with identical text at CR 17 and CR 20. Two names also became
wrong for their row ("Leaden Touch" on a 30-foot cone, "Threshold Execute" on
a lance vendetta).

Not implementing either half until the owner rules.

## Landed 2026-10-29

**Item 1, names — the print-provenance split.** Owner ruled "split by print
provenance", then amended it mid-landing: *"but if we're augmenting it. we get
to rename"* — an augmented row is not the stock mechanic, so it keeps its own
name even when the template is print-named. The stamp is declared data the
renderer already writes (`augmented: {kind, fill}`), not a text read.

- `PRINT_ROW_NAMES` in `generate.mjs` is derived from the 329 at import time —
  **402 names**, a closed fact, never a hand-kept list. 28 of our 114 templates
  carry a print name; 86 do not.
- `canonOf` converges a row only when the template's name is in that set, OR the
  template is one of the three converged on 2026-10-27 (`condition-payoff`,
  `exploiter`, `riposte` — a closed exception, because every CR band renders
  those identically and the critic lists Riposte approvingly), OR the bespoke
  name promises a mechanic its text lacks (`mechanicUnkept`, already imported).
- **"Warded Charge" now self-heals.** `mechanicUnkept('Warded Charge', ...)`
  returns `"movement"`, so it converges instead of shipping as the
  `name-mechanic` FAIL the critic flagged on the Black Iron Vigil.
- Blast radius on the 10-29 forty: **49 of 61 templated rows (80%)** sat on an
  invented template name and would now keep the call's own name. The repeat
  offenders are exactly the critic's list — Sundering Shove ×3, Resonant Body
  ×3, Dazzling Burst ×3, Searing Aura ×3, Horrid Display ×3, Answering Sting ×3.
- One bug found and fixed in the same change: the Trip Attack eviction lives in
  the same loop and I briefly gated it behind the new `canon` check, which
  turned the eviction off for every payoff under an invented name (i.e. all of
  them). It has its own guard now.
- `one-mechanic-one-name-everywhere.spec.js` rewritten to the amended ruling
  (18 tests, including both halves of the augmentation rule).

**Item 8, `control-aoe-ungated` — rescoped, not retired.** Print's envelope read
off the four rows that define it (Young Brass/Copper/Silver/Bronze dragons): all
are 30-foot Cones swapped into Multiattack; three cap at the end of the target's
next turn, and Bronze's Repulsion imposes only Prone, which self-ends. So the
defect is not "at will and multi-target" — it is at will, multi-target **and**
either unbounded or wider than print ever goes.

- Two axes now: `wide && !traded` → fail (unchanged); `wide && traded` → soft
  (trading buys print's 30-foot Cone, not any width — there is no wide at-will
  control row in the 329 at any cost); narrow but unbounded → soft; narrow and
  bounded → **quiet**, because that is print's own shape.
- The bound is read from the DECLARED `duration` field first and the text only as
  a fallback, the same order `condition-duration` uses.
- **Replayed against the 10-29 forty: 6 firings → 0.** The unit tests prove the
  unbounded and over-wide cases still fire, so this is a narrowing, not a
  removal.

Full suite green at each step: **157 suites, 4,332 tests.**

## Order of work (the critic's, with my notes)

1. **Names.** Add `printName` to every template (null where the engine invented
   the row). The rename fires only when `printName` is set, or when a bespoke
   name claims a mechanic its text doesn't deliver (Warded Charge). Run the
   element audit *after* naming — it currently revokes claims the pre-rename
   name carried (Purple Worm: "the name advertises nothing"). Batch check: no
   two sheets in a forty ship the same invented name or the same row text;
   print names and plain attack names (Bite, Claw, Rend, Slam) are exempt.
   **Blocked on the ruling above.**
2. **Expression judge on slot fills.** We already have the judge. Run it on
   every slot fill against the clause or idea that picked the row; on a fail
   refill once with that clause in hand; on a second fail refuse the row. The
   words were available in 3 of this run's 4 blind fills (the Air Elemental's
   own clause said "stolen voices"; the Bog Hound's own idea said
   "indistinguishable from the bank"; the Well-Drowned is in a well). Expected
   cost ≈ 0 rows. The same judge closes a coverage overcount — Stone Golem was
   credited for "carved as a weeping saint" and Dire Wolf for "frost-rimed
   hide", and neither sheet carries its clause. Parameterise False Form; its
   text already names the noun.
3. **Drop detected decoration.** 19 sheets ship a free row the engine itself
   labels decoration. Re-count after step 1, then drop what is still
   decoration. This is the sameness complaint, not a length complaint.
4. **Soundness, the six S=0 sheets.** The 2014 Success-branch drop (Krennik's
   Fear Aura lost "immune for 24 hours" → frightens everyone within 20 feet
   every round at CR 4; sibling of the save-gate fix that landed this week — diff
   its two printings). A record-vs-text lint (2 of 5 reconciliations disagree:
   Thunderhead Drake's Talons still knocks Prone, Reliquary-Glut's Adhesive
   still grapples). Cap Weapon Lodge (+17 per lodged weapon per Slam = 116/round
   at CR 10, read as 48). The single-hit ceiling from the table above. Rider
   stacking (Heron-Sworn's Unarmed Strike carries Stun *and* heal-block-until-
   long-rest in one garbled paragraph; the call wanted Slowing Breath's shape).
5. **Named parts.** Skip negated clauses (the Trophykeeper's "Fang" was minted
   from "not with fang"). Carry the replaced chassis attack's rider — dropping
   the grapple left Swallow unreachable. Read range from the part's verb
   ("Spitting Maw" shipped as a melee bite). Engulf keys lack `digest` (gated
   out the Reliquary-Glut's warranted engulf) and `bury` (dropped Pit
   Scree-Maw's clause), while the route call's "engulf" read lets Swallow in
   with no swallow word at all.
6. **Reader maths.** Mixed multiattacks are miscounted (Pit Fiend reads 43,
   actual ≈113; Hydra reads 10, actual 50) and scaling riders are ignored.
7. **Standing list** (gladiator body ×3, own-turn punisher fallback ×3, Rook's
   handaxe text on the shortsword row and inverted Multiattack, Thunderhead's
   15-ft cone for a "rolling wall", weapon dice and reach, Ilvareth's immunity
   line, Brass Tyrant's missing rulership, Siege Golem's unreceipted thunder,
   Molra's off-list Ray of Sickness).
8. **Retire `control-aoe-ungated`** or rescope it to print's envelope: costs at
   least one attack, first failure lasts until the end of the target's next
   turn, a harsher condition needs a second failed save, and a *free* aura
   (trait) carries immunity for 24 hours on a success.

## Answers to the case's open questions

- **Blind fill:** tighten, don't widen. Step 2 above.
- **Unmotivated element:** both of my exemplars were wrong. The Trophykeeper's
  Psychic claws are motivated by its own synthesis, and print has flesh limbs
  dealing pure energy (Devilish Claw, Withering Touch — both in this run). The
  Pit Fiend's aura is print's Fire Aura shape in the body's own element. So the
  test is **provenance, not motivation**: an element needs a receipt — the GM's
  quote, the synthesis on the blank path, or the print body's own damage and
  defence set — and with no receipt the row deals physical. What that catches
  here: the Siege Golem's thunder ×4 on lashed timber, the Arena Relict's
  necrotic Shockwave, and the inverse, the Dire Wolf which *has* a receipt
  ("frost") and ships no cold anywhere.
- **Rampage:** fine through CR 12 when the concept asks for it (frenzy,
  bloodlust, finishing the wounded); its value is the timing, not the damage
  (≈+17% of a 3-round fight at CR 4, ≈+9% at CR 12), and print's 1/Day needs
  no scaling. Never as a fallback seed (Krennik's came in because nothing held
  the banner-fear idea), and skip it where the bonus action is already spoken
  for every round or a legendary "move half, attack" exists.
- **Granite Exile:** agreed false positive. For a lack whose subject is a header
  field (languages, senses, speeds), omission from the header *is* the
  expression; pass when the header omits the item and no row grants a bypass
  (telepathy, Comprehend Languages, Tongues). The real loss on that sheet is the
  idea: the call wrote "War Bellow (2/Day; only those who understand Giant are
  spared)", which turned the lack into a rule, and the engine renamed it, shed
  its gate, dropped the Giant clause, and renamed it again to Dread Presence.

## Done when

- No invented row name repeats in a forty.
- No sheet ships a row the engine labelled decoration.
- No sheet at soundness 0.
- The Weeping Saint fixture keeps its tears 3 runs of 3.
