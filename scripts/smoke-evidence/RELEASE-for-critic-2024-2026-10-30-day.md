# Release table for the critic — 2026-10-30

One forty, `sweep-2026-10-30T00-45-48`, the same batch as the two before it. It
is the first run carrying a full day's work, so the case below is longer than
usual: nine changes landed, four of them in response to your last read, and two
of my own reported numbers turned out to be wrong.

## Your last read: what we did with it

**Accepted and landed.**

1. **The naming split, with the owner's amendment.** A row reproducing a print
   row takes print's name; a row the engine invented keeps the name the call gave
   it. `PRINT_ROW_NAMES` is derived from the 329 at import — **402 names**, never
   hand-kept; 28 of our 114 templates carry one. The owner then amended it
   mid-landing: an **augmented** row keeps its own name even on a print-named
   template, read off the `{kind, fill}` stamp the renderer already writes. Your
   sharper reason for that — a print name tells the GM to skip the row, so an
   augmented row under the stock name hides its extra clause where the GM has
   stopped reading — is recorded in the plan.
2. **Your batch-check prediction was right, twice, and is now complete.** This
   forty: **39 distinct invented names, 3 repeated — `Opportunist's Lash` ×2,
   `Merciless Strike` ×2, `Riposte` ×2.** Those are exactly `exploiter`,
   `condition-payoff` and `riposte`, the three the renamer *forces* to converge.
   Every genuinely invented name is unique. We are taking your option: exempt
   those three as house vocabulary. Not yet implemented.
3. **Running max on the single-hit ceiling** — accepted, not yet built. Still
   biting: the Swarm of Tollswarms on the previous forty hit for **90 in one
   attack at CR 13** against print's band ceiling of 51.
4. **Guarded Stance: price it, don't withdraw it** — accepted, folds into the
   reader work, not yet built.

**Where the measurement went the other way.**

5. **`control-aoe-ungated`: you were right that my first rescope was wrong, and
   your mechanism was wrong too.** You asked for a CR-banded width cap built like
   the single-hit table. Print refuses it: the widest at-will multi-target
   control row in the 329 is the **Harpy's 300-foot Emanation at CR 1** (282,743
   sq ft), so a running max sits there from CR 1 up and permits everything. Print
   does not cap the AREA of these rows; it caps the CONSEQUENCE, and the split is
   by shape — counted over all 21:

   | shape | rows | 24-hour immunity | duration-bounded | free (untraded) |
   |---|---|---|---|---|
   | Cone | 16 | **0** | 16 of 16 bounded or self-ending | 4 |
   | Emanation | 5 | **4** | 5 | **5 of 5** |

   Past 10 feet it is 3 of 3 with the immunity (Pit Fiend 20 ft, Cloaker 60 ft,
   Harpy 300 ft); the lone exception is the Hezrou's 10-foot Stench. Across the
   Traits section too it is 4 of 4 past 10 feet (adding Sea Hag 30 ft). You were
   also right that my replay's 6 → 0 was suspicious: `wide` tested
   `within (\d+) feet`, so **`120-foot Emanation` read as narrow** and the
   Leviathan passed through a hole. The gate is now shape-aware with no width
   axis, four arms, and a Traits arm. The trading axis is gone — **9 of print's
   21 are free**.

   It then pointed at the real defect: three templates cite a print row that
   carries the Success clause and dropped it. `lure` cites **Harpy/Luring Song**
   and reproduced everything except the clause that makes a 300-foot Charm legal
   at CR 1. `terror-pulse` and `fear-aura` the same. All three now write it.
   **This forty: 0 firings.**

6. **Your Krennik diagnosis was wrong, and the diff proves it.** You read the CR
   4 fear lockdown as the 2014 conversion dropping a Success branch. The two
   printings say otherwise — the 2024 source never had one, and `to2014Grammar`
   keeps the clause on every shape tested. It was never written. Not a
   conversion bug.

7. **Blind fill: aimed at the wrong layer, and so was my correction.** You asked
   for the expression judge on slot fills. Tracing the three cases first: the Air
   Elemental's trace reads *"word match declined by the call: mimicry — the key
   word does not mean the mechanic here"*, then *"closest accepted: the call
   refused every template but named mimicry as nearest"*. The call **refused**
   mimicry, correctly — the idea was HP regain plus a Thunder rider. `{mimicked}`
   filled blind because the template was never the idea.

   That fallback put **86 rows on the 10-29 forty, 2.1 a sheet, 100% beside an
   idea the engine recorded as undelivered**, and that run's tally read **78
   seats → 65 shapes → 4 expressed**. But honouring the call's own
   `declined_because` is worth only ~3 rows a forty: over 3,618 declines,
   `no_fit` is **94.8%**, `collision` 1.5%, `already_answered` 1.7%. So my
   framing was wrong too.

   The 95% has a mechanism. `templatesFor` hard-gates the menu on the seat's
   section, seats are assigned **before** the idea exists, and `parseIdeas`
   forces the trait slot's section to `trait` — which makes `normaliseTag` flatten
   its TRIGGER to `always` as well. Both coordinates of the cell are destroyed, so
   a call answering "a cone of bog gas on a Constitution save" arrives as
   `trait/always/*`. `scripts/harvest-wants.mjs` (new) places every refused seat's
   `what it wanted` against the catalog by cell: a Thunder cone stamped
   `trait/always/defense` against **15 templates sitting in `action/save/damage`**.

   The owner chose to let such an idea take the open action line. **Built,
   measured, reverted**: it fired twice on a ten and the numbers went the wrong
   way (expressed 2 → 1, closest-accepted 14 → 22), because every re-seat adds a
   fit call and a call that refuses with a `closest` lands another wrong-cell
   nearest. Re-seating multiplies the thing it was built to reduce, by
   construction, while `closest accepted` turns every refusal into a row anyway.
   Recorded in the plan so it is not rebuilt the same way.

8. **Goblin Boss: your withdrawal confirmed.** No `Redirect Attack` anywhere in
   SRD 5.2; our Goblin Boss carries print's complete block.

## The owner's rulings this run

- **A row budget that answers to the card.** `freeBudget` was a flat 1. It is now
  elastic against print's own card size, p20 floor and **p90** ceiling per band
  (0-2 1-4, 3-5 2-5, 6-9 3-5, 10-12 4-7, 13-16 5-10, 17-20 7-9, 21+ 8-10). p90
  not p80, on his ruling: *"the more interesting blocks are the ones that have
  many abilities so I'm not sad they don't fully represent print here"* — the
  ceiling exists to stop the runaway card, not to reproduce print's distribution.
  It sheds **only the borrowed row** (`accepted_closest`); a row the call chose,
  or one carrying the GM's quote, rides however crowded the card is. printExact
  keeps none.
- **Three donors added, none removed.** 10 of print's 18 blocks at CR 13-16 are
  legendary (56%) carrying ~3 more rows; we ran **22%**. The band had 1 legendary
  donor of 10 and **no lurker or caster chassis at all** — print's Vampire rode
  `lurker-8`, stretched five CRs. Worse, found by probe: **defender, swarm, ooze
  and controller had no donor anywhere in CR 10-16**, so a CR 15 defender rode
  `defender-5`, a ten-CR stretch. Added `lurker-13` (after the Vampire),
  `caster-15` (after the Mummy Lord) and `defender-13` (after the Rakshasa and
  Ice Devil, **non-legendary** — no print CR 12-16 defender has a legendary kit).
- **Print closes the row set on `exact`.** Four defects, found by the probe: the
  citation check ran against a half-built sheet (print's own rows install further
  down the same block, so the Mummy Lord lost "Glare" and "Necrotic Strike" for
  citing rows that arrived a step later); `danglingRefIn` could not read print's
  own `"makes one A or B attack"` form, which print writes in 7 rows;
  `closedPath` is `isTwist || isClassNpc`, so `exact` was the ONLY path that kept
  a chassis attack colliding with a print row; and the name was never what
  mattered — on `exact` print's attacks are now the only attacks, guarded so a
  print body with none keeps the chassis one.

## This forty

**Gate: 1 FAIL of 40, and it is the `lack-honored` false positive you agreed
with** — the rule wants an absence positively expressed, which a header cannot
do. Zero real failures, against 2, 3 and 4 on the previous runs.

| | two ago | last | **now** |
|---|---|---|---|
| expressed | 4 | 7 | **4** |
| decoration | 19 | 12 | **10** |
| free rows | 23 | 19 | 14 |
| closest-accepted | 86 | 80 | 74 |
| rows / sheet | 5.67 | 5.67 | 5.56 |
| feature rows / sheet | 1.92 | 1.97 | **1.72** |
| bare sheets | 2 | 2 | 2 |

**Two corrections to my own reporting.** Last run I reported expressed 4 → 7 as
the day's work landing, with a caveat about noise. **4, 7, 4 across three forties
is noise on a count of four to seven, and the caveat was the story** — expressed
is not reliably moving and I over-read it. What has moved monotonically is
decoration (19 → 12 → 10) and closest-accepted (86 → 80 → 74), both downward.
Feature rows at **1.72** is the lowest of the three and is the number to watch:
if the budget is trimming more than sameness, that is where it shows.

I also mis-attributed two FAILs today — a `condition-duration` to a donor I had
just written when it belonged to another sheet's templated row, and a
`lack-honored` I called real before checking the header.

## What we would value from you

1. **Is 1.72 feature rows a thinner card or a less samey one?** The budget is the
   only thing that could have moved it. Our read of this forty is 23 ship / 15
   fix-lite / 2 fix on the previous run's scoring; yours was 11/22/7 on the same
   batch, so your axes are the ones we are tracking.
2. **The CR 13-16 legendary share sits at 36% against print's 56%**, and the
   remaining gap is rung SELECTION, not catalog: `caster-8-binder` served a CR 13
   concept and `caster-10-warpriest` a CR 16 one, so a STYLE variant five or six
   CRs below beats the plain rung at the right CR. Is that worth changing, given
   it sits at the centre of routing?
3. **`each creature of its choice` is 0 of 329 print rows**, gated or not — print
   never writes friendly-fire exemption that way. It sits on at least three
   templates and removing it is a real nerf. Worth it?
4. **The unbuilt four from your list**, in case you would reorder: the single-hit
   ceiling with a running max, the record-vs-text lint, the element receipt, and
   the reader's mixed multiattacks.

---

# 2024 blocks

## Review batch — sweep-2026-10-30T00-45-48

The checker ran first. The gate table covers every block in the run; every block of the run follows. Each block carries its checker row above and its engine trace below. Hand-derive against the row first; then read for what predicates can't see.

### Gate table — the whole run

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Dire Wolf | 1 | 2024 | skirmisher-1 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |
| Bog Hound | 1 (2014) | 2014 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 3/4 |
| Owlbear | 3 (2014) | 2014 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 2/2 |
| Death-Knell Sexton | 3 | 2024 | lurker-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 6/7 |
| Air Elemental | 5 | 2024 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 5/5 |
| Screedrift | 5 (2014) | 2014 | brute-5-grappler | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 1/4 |
| Hydra | 8 (2014) | 2014 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 5/5 |
| Siege Ramble | 8 | 2024 | brute-5-juggernaut | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 1/5 |
| Stone Golem | 10 | 2024 | brute-9 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 6/6 |
| Drowned Cathedral Choir | 10 (2014) | 2014 | lurker-5-phantom | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 3/4 |
| Vampire | 13 (2014) | 2014 | lurker-13 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 12/12 |
| Plaguebearing Archon | 13 | 2024 | defender-8-leader | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 3/5 |
| Purple Worm | 15 | 2024 | brute-13 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 6/6 |
| Glacier Heart | 15 (2014) | 2014 | brute-9-juggernaut | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/2 | 5/5 |
| Adult Red Dragon | 17 (2014) | 2014 | dragon-15 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok | ok | soft (1) | 0/1 | 9/9 |
| Brass Tyrant | 17 | 2024 | brute-17-juggernaut | ok | SOFT: hot-offense | ok | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 7/10 |
| Pit Fiend | 20 | 2024 | caster-21 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 9/9 |
| Sunbone Archlich | 20 (2014) | 2014 | caster-21 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 10/10 |
| Ancient Gold Dragon | 24 (2014) | 2014 | — | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | — | — |
| Trench Veilsinger | 24 | 2024 | lurker-17 | ok | SOFT: under | ok | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 1/9 |
| Owlbear | 3 | 2024 | brute-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 1/1 |
| Goblin Boss | 1 (2014) | 2014 | skirmisher-1 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/3 |
| Vashka the Red | 6 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok | ok | soft (1) | 1/2 | 5/5 |
| Scythebrood Ravener | 9 | 2024 | brute-8-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 4/6 | 5/5 |
| Black Iron Sentinel | 11 (2014) | 2014 | defender-7-warden | ok | user-set: AC 20 · reads CR 9 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 3/3 | 6/6 |
| Brinewrack Midwife | 7 | 2024 | caster-8-binder | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok | ok | soft (1) | 2/2 | 5/6 |
| Vow-Sworn Anchorite | 6 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 3/3 |
| Ilvareth Dusksong | 12 (2014) | 2014 | caster-12 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 7/7 |
| Swarm of Unclaimed Peals | 13 | 2024 | swarm-9 | ok | SOFT: hot-offense | ok | ok | ok | ok | ok | ok | ok | ok | soft (1) | 0/2 | 4/4 |
| Chrism Vault Ooze | 9 (2014) | 2014 | ooze-9 | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | ok | soft (1) | 0/2 | 4/5 |
| Squallwall Drake | 7 | 2024 | dragon-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/3 |
| Brannoc the Unheard | 9 (2014) | 2014 | brute-9 | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | ok | soft (1) | 2/2 | 0/4 |
| Reed-Temple Warden | 5 (2014) | 2014 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 6/8 |
| Krennik Skullstandard | 4 (2014) | 2014 | skirmisher-3-mounted | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 5/7 |
| Well Drowned | 5 | 2024 | lurker-5-trap | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 0/4 |
| Khordathar | 4 | 2024 | dragon-2 | ok | ok | ok | ok | ok | ok | ok | ok | FAIL: lack-honored | ok | FAIL (1) | 7/14 | 5/5 |
| Meshrin | 8 (2014) | 2014 | skirmisher-8-hurler | ok | user-set: AC 16, HP 120 · reads CR 6.5 | SOFT: lint:hp-formula | ok | ok | ok | ok | ok | ok | ok | soft (1) | 8/8 | 7/7 |
| Grave-Pit Champion | 6 | 2024 | brute-5 | ok | ok | SOFT: reach | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 3/4 |
| Varro the Coinblade | 5 (2014) | 2014 | skirmisher-8-hurler | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 4/4 |
| Brother Halric | 3 (2014) | 2014 | defender-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 5/5 |

**Dropped 17 of 60 GM clauses** (coverage 72%); concept share 82% (174/212 rows). A run with zero fails and 60% coverage is a failing run. 1 blank-path sheet(s) excluded — the engine writes their description, so scoring it is self-scoring (Khordathar 7/14).
**Fails by seat and gate:**
- dragon-2 / reader: 1



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

Senses darkvision 60 ft.; Passive Perception 15

Languages None

CR 1 (XP 200; PB +2)

Traits

Rimed Hide. The dire wolf can pinpoint the location of cold and frost within 30 feet of itself.

Pack Tactics. The dire wolf has Advantage on an attack roll against a creature if at least one of the dire wolf's allies is within 5 feet of the creature and the ally doesn't have the Incapacitated condition.

Actions

Multiattack. The dire wolf makes two Bite attacks. It can replace one attack with a use of Chilling Bite.

Bite. Melee Attack Roll: +5, reach 5 ft. 8 (1d10 + 3) Piercing damage. If the target is a Large or smaller creature, it has the Prone condition.

Chilling Bite. Constitution Saving Throw: DC 13, one creature within 60 feet. Failure: The target's Speed is halved and it can't take Reactions until the end of the dire wolf's next turn.

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

- Traits/Rimed Hide — template uncanny-sense; library draw (seed unstamped)
- Traits/Pack Tactics — print's own row
- Actions/Multiattack — the chassis
- Actions/Bite — print's own row
- Actions/Chilling Bite — template slow-bolt; library draw (seed unstamped); binds the GM's words: frost+slow+chill

**Engine trace**

```
[path] twist — Dire Wolf (is) — "Name field: Dire Wolf" (code)
[route] skirmisher type=Beast mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | skirmisher: ✓ ("Dire Wolf") | skirmisher-skulker: the call read "hide" as not meaning that mechanic here — no override | skirmisher stands: every key that would override it was read as a figure of speech | skirmisher: no line key in the words — the model's read of its quote
[concept] name: "Dire Wolf" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] resolve: archetype=skirmisher type=Beast themes=bestial/elemental mind=bestial style=— energy=Cold mix=both identity=✓ lore=✓
[concept] name: provided "Dire Wolf"
[concept] mechanics: none claimed
[concept] signature elements: pack hunt of darting hit-and-run feints [behavior] | frost-rimed hide that chills and numbs on contact [body] | the cold that hangs around the pack's trail [aura]
[concept] identity: The dire wolf opens by circling wide with its pack, using frost-rimed hide and slush-hushed footfalls to close before the first bite lands, then darts in to harry and tears away before prey can answer. It fights as a relentless pack skirmisher that probes for an isolated or slowed target, and under pressure it breaks off to regroup at range — driving prey into the open where the pack's fangs do the killing.
[concept] lore: Packs of these wolves den where the first winter snows gather, and the hoarfrost crusting their hides is the only sign a valley has become their hunting ground.
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
[reskin] final price: the chassis's Multiattack: the round ran 14 against the card's 10 — the attack rows re-solve at 75% (2 attacks off one row after a supersede)
[reskin] the sheet's declared ask: none — the route call named no mechanic
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Dire Wolf — with a frost-rimed hide" -> has (descriptive), head
[reskin] body verdicts: 29 of 29 answered; not true of this body: snare, spew, snare-bolt, blink, phase-slip, heated-body, false-appearance, absorption, bloodied-burst, resonant-body, adhesive, aberrant-ground, web-walker, noxious-aura, marking-light, relic-object, warded-mending, mimicry, gaze-aura, blurred-form, death-burst, hook-rider, life-drain
[reskin] signature idea (action): "When the dire wolf hits a creature with its Bite, frost from its hide seeps into the wound: the target must succeed on a Constitution saving throw or have its Speed halved until the end of its next turn as the chill stiffens its limbs. A slowed target can't outrun the pack, which exploits exactly the opening the wolf's darting feints create." [rider/on_hit/condition] [family: mark] — menu: contagion, charge-push, pounce, isolation, charge (+ shelf: shield-bash, lure, sensory-strike, disarm, thrown-burst-seed, delayed-brand, slow-bolt, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, riposte)
[reskin] composed candidates: none action — the mark family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: action — idea fires on_hit/does condition; leading: contagion (on_hit/condition), pounce (on_hit/condition), charge-push (on_hit/movement)
[reskin] keys would have bound: action — slow-bolt (frost)
[reskin] word match declined by the call: contagion, pounce, charge-push, isolation, charge — the key word does not mean the mechanic here
[reskin] closest accepted: action — the call refused every template but named "slow-bolt" as nearest and declined it for no_fit; it lands rather than the row being dropped (what it wanted: attaches the Speed-halving save to a Bite hit rather than a ranged action)
[reskin] signature template: slow-bolt -> Actions/"Chilling Bite" ("The idea is a Constitution save on a Bite hit that halves the target's Speed unt [verb: frost:concept, slow:idea, chill:idea]")
[reskin] keys spent by the action: frost
[reskin] signature idea (trait): "The hoarfrost crusting the dire wolf's hide deadens sound around it — while the wolf moves, the slush and rime swallow its footfalls, so it is invisible to creatures relying on hearing and leaves no trail a tracker can follow. Prey never hears the pack close, only feels the cold." [trait/always/defense] [family: mark] — menu: spider-climb, phobia, terrain-walk, faultless-tracker, energy-aura, bloodied-fury, blood-frenzy, pack-tactics, uncanny-sense, shielded-mind, relentless-pursuit, bound, undead-fortitude, truth-aura, fear-aura, kill-denial
[reskin] composed candidates: none trait — the mark family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does defense; leading: bloodied-fury (always/defense), uncanny-sense (always/defense), shielded-mind (always/defense)
[reskin] word match declined by the call: bloodied-fury, shielded-mind, undead-fortitude, faultless-tracker, bound, kill-denial, energy-aura, fear-aura, truth-aura, phobia — the key word does not mean the mechanic here
[reskin] closest accepted: trait — the call refused every template but named "uncanny-sense" as nearest and declined it for no_fit; it lands rather than the row being dropped (what it wanted: grants the wolf Advantage on Dexterity (Stealth) checks and leaves no tracks for)
[reskin] pick kept on the GM's own words: trait — "uncanny-sense" has no key-table verb, but the call quotes "rimed hide" from the description
[reskin] signature template (trait): uncanny-sense -> Traits/"Rimed Hide" ("The idea is a sound-deadening, trail-erasing rime on the hide: it hides the wolf [shape fit, no verb match]")
[reskin] weapons answered: Bite = none
[reskin] print canon speed: 30 ft. -> 50 ft. — the Dire Wolf's walk; the concept's other modes stay
[reskin] languages held: None stands — INT 3 on a Beast speaks nothing, whatever the mind read said
[reskin] print canon skills: "Perception +3, Stealth +4" -> "Perception +5, Stealth +4" — the Dire Wolf's own skills, each derived from this sheet's stat and PB
[reskin] print canon trait: Pack Tactics — "Dire Wolf — with a frost-rimed hide" is the Dire Wolf (print's own row)
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the seat's, not the Dire Wolf's
[reskin] print canon: chassis row leaves — Traits/"Snowstride" is the seat's, not the Dire Wolf's
[reskin] multiattack replacement clause: It can replace one attack with a use of Chilling Bite.
[reskin] free-row budget by card size: CR 1 sits in band 0-2, where print runs 1-4 rows (p20-p90, Multiattack excluded); this card already carries 4 fixed row(s), so the free-row budget is 0 rather than 1 — the card is already at print's high end
audit finding below confidence gate: Rimed Hide The trait name promises a rime-covered hide but the text is a sensory detection ability with no frost-aura or cold-defense mechanic, and nothing in the block uses cold damage or creates a cold/frost zone to detect.
[reskin] seed share: 0 of 2 signature row(s) came from a seed — the sameness metric
[reskin] [gap] attaches the Speed-halving save to a Bite hit rather than a ranged action — "When the dire wolf hits a creature with its Bite, frost from its hide seeps into the wound: the target must succeed on a Constitution saving throw or have its Speed halved until the end of its next turn as the chill stiffens its limbs. A slowed target can't outrun the pack, which exploits exactly the opening the wolf's darting feints create." — Dire Wolf [seat: action [rider/on_hit/condition]] (closest offered: slow-bolt) [effect: condition] [menu: contagion pounce charge-push isolation charge slow-bolt feint-slip thrown-burst-seed rampage focus riposte] [same-cell unoffered: affliction stunning-strike life-drain snatch bolt-restrain bolt-mark] [same-seat rejected: affliction:legality stunning-strike:legality hook-rider:legality life-drain:legality snatch:legality bolt-restrain:role bolt-drag:role bolt-mark:legality] [landed: slow-bolt]
[reskin] [gap] grants the wolf Advantage on Dexterity (Stealth) checks and leaves no tracks for another creature to follow — "The hoarfrost crusting the dire wolf's hide deadens sound around it — while the wolf moves, the slush and rime swallow its footfalls, so it is invisible to creatures relying on hearing and leaves no trail a tracker can follow. Prey never hears the pack close, only feels the cold." — Dire Wolf [seat: trait [trait/always/defense]] (closest offered: uncanny-sense) [effect: defense] [menu: bloodied-fury uncanny-sense shielded-mind undead-fortitude spider-climb phobia terrain-walk faultless-tracker blood-frenzy pack-tactics relentless-pursuit bound kill-denial energy-aura truth-aura fear-aura] [same-cell unoffered: false-appearance shell-withdraw death-restoration evasion patient-defense sealed-body relic-object guarded-stance mimicry blurred-form] [same-seat rejected: false-appearance:legality adhesive:legality aberrant-ground:legality web-walker:legality death-restoration:legality earth-glide:legality tunneler:legality berserk:legality evasion:legality marking-light:legality sealed-body:role relic-object:legality guarded-stance:legality mimicry:legality assassinate:legality blurred-form:legality death-burst:legality] [landed: uncanny-sense]
[reskin] signature tally: 2 seat(s) -> 2 shape(s) on the sheet · 0 expressed, 0 decoration, 0 free · accepted picks lost: 0 of 2 · path twist
```


---


### Trench Veilsinger — highest CR

**Concept:** a leviathan of the trench whose song drowns fleets

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Trench Veilsinger | 24 | lurker-17 | ok | SOFT: under | ok | ok | ok | ok | ok | ok | ok | ok |

- bands · soft · under: effective HP 437 sits under print at CR 24 (468–546, n=5); the read holds at 25.5, within print's own ±1
- read: def 24 / off 27 → 25.5; sustained 216 (3 × Tail + legendary Glide Under); nova none; dmg 216

```
Trench Veilsinger

Gargantuan Monstrosity, Neutral

AC 20
Initiative +9 (19)

HP 437 (25d20 + 175)

Speed 40 ft., Swim 40 ft.

MOD
SAVE
STR
25
+7
+7
INT
16
+3
+10
MOD
SAVE
DEX
28
+9
+16
WIS
18
+4
+11
MOD
SAVE
CON
24
+7
+7
CHA
14
+2
+2

Skills Perception +11, Stealth +16

Senses blindsight 120 ft.; Passive Perception 21

Languages Common

CR 24 (XP 62,000; PB +7)

Traits

Amphibious. The veilsinger can breathe air and water.

Fear Aura. The veilsinger emanates an aura in a 20-foot Emanation while it doesn't have the Incapacitated condition. Wisdom Saving Throw: DC 24, any enemy that starts its turn in the aura. Failure: The target has the Frightened condition until the start of its next turn. Success: The target is immune to this creature's aura for 24 hours.

Legendary Resistance (3/Day). If the veilsinger fails a saving throw, it can choose to succeed instead.

Actions

Multiattack. The veilsinger makes three Tail attacks. It can replace one attack with a use of Drowning Dirge.

Tail. Melee Attack Roll: +16, reach 15 ft. 36 (6d8 + 9) Thunder damage.

Drowning Dirge. Wisdom Saving Throw: DC 24, each creature of the veilsinger's choice in a 120-foot Emanation originating from the veilsinger that can see or hear the veilsinger. Failure: The target has the Charmed condition until the end of its next turn, and while Charmed this way, it must move toward the veilsinger by the safest available route on its turn and can't take Reactions. Success: The target is immune to this creature's lure for 24 hours.

Bonus Actions

Veil of Shadow. While in Dim Light or Darkness, the veilsinger takes the Hide action.

Legendary Actions

Legendary Action Uses: 3. Immediately after another creature's turn, the veilsinger can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.

Glide Under. The veilsinger moves up to half its Speed without provoking Opportunity Attacks, and it makes one Tail attack.

Sink From Sight. While in Dim Light or Darkness, the veilsinger takes the Hide action. The veilsinger can't take this action again until the start of its next turn.

Pull Down. Wisdom Saving Throw: DC 24, one creature within 30 feet. Failure: The target has the Frightened condition until the end of its next turn.

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
- Traits/Fear Aura — template fear-aura; library draw (seed unstamped)
- Traits/Legendary Resistance — the chassis
- Actions/Multiattack — the chassis
- Actions/Tail — the chassis
- Actions/Drowning Dirge — template lure; library draw (seed unstamped); the GM's clause "a leviathan of the trench whose song drowns fleets"; binds the GM's words: song
- Bonus Actions/Veil of Shadow — the chassis
- Legendary Actions/Legendary Action Uses: 3 — the chassis
- Legendary Actions/Glide Under — the chassis
- Legendary Actions/Sink From Sight — the chassis
- Legendary Actions/Pull Down — the chassis

**Engine trace**

```
[path] homebrew — "a leviathan of the trench whose song drowns fleets" (call)
[route] lurker type=Beast mechanics=aura — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | lurker: ✓ ("a leviathan of the trench") | lurker: no line key in the words — the model's read of its quote
[concept] name: provided_name rejected — "a leviathan of the trench whose song dro…" is the description, not a name
[concept] resolve: archetype=lurker type=Beast themes=aquatic/voice mind=sapient style=— energy=Thunder mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: aura
[concept] signature elements: a song that drowns fleets [behavior] | trench-born leviathan bulk [body] | the hunting hymn that unmoors hulls [aura]
[concept] identity: The leviathan opens with a subsonic hunting hymn that rolls through the water and unmoors every hull in reach, then falls silent and glides — a darker shape in the trench-dark — until it can bring its mass to bear on the crippled and drowning. Every round after, it circles beneath the wreckage, singing in slow, layered phrases that pull crews over the rails and grind timber apart, and it works a fleet the way a wolf works a herd: splitting, herding, and drowning. Wounded and pressed, it does not flee — it sinks into the abyss, and its song turns from lure to warcry, a killing dirge that rises until the trench itself shakes, then it comes back up to finish what the fleet's guns could not.
[concept] lore: In the black trench-floors beneath the shipping lanes it has sung for longer than any chart remembers, and every fleet ever lost above it was, to the leviathan, merely a meal it pulled down by the sound of its own drowning crews.
[reskin] donor: lurker-17 -> CR 24 (invented — no printed peer)
[reskin] row gated out: Teleport (teleport) — the concept did not claim this mechanic
[reskin] [path] decides: homebrew (the matcher agrees)
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] type honesty: Beast above CR 10 -> Monstrosity (print ceiling: CR 8)
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline declared: "the veilsinger" — the call's own answer (kind), built from the name; the rules would have said "Trench"
[reskin] inline on kit rows: "Trench" -> "the veilsinger"
[reskin] inline form: "the veilsinger" — the model's own reading of the name
[reskin] save dc derived: DC 23 -> 24 (8 + PB 7 + the sheet's best 9) — no stat on the sheet reached it
[reskin] the sheet's declared ask: charm — the route call's one answer for the whole concept
[reskin] alignment by mind: Unaligned -> Neutral — a Monstrosity with INT 16 can hold an ethic (print: 0 of 329 Unaligned blocks speak)
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a leviathan of the trench whose song drowns fleets" -> has (mechanical) [asked: save_area] [askMechanic: charm]
[reskin] body verdicts: 34 of 34 answered; not true of this body: gaze-single, seal, active-toll, random-ray, spew, snare-bolt, drain, zone-seed, blighted-ground, blink, shell-withdraw, coating, phase-slip, heated-body, false-appearance, absorption, bloodied-burst, resonant-body, adhesive, terrain-walk, aberrant-ground, faultless-tracker, web-walker, energy-aura, noxious-aura, uncanny-sense, marking-light, warded-mending, mimicry, gaze-aura, blurred-form, hook-rider, life-drain
[reskin] signature idea (action): "The veilsinger's song swells into a dirge of layered notes that hooks the mind. Each creature of its choice within range that can hear it must succeed on a Wisdom saving throw or be magically charmed until the end of its next turn. A charmed creature must use its movement to move toward the veilsinger or toward the nearest body of water, and it can't willingly move away from the veilsinger." [action/save/condition] [family: mark] — menu: execute, wail, lure, ground-burst, obstacle-pull, pacify, escalating-dread, terror-pulse, slow-bolt, sensory-strike, exploiter, trample, thrown-burst, shield-bash, push-prone, thrown-burst-seed, curse-debt (+ shelf: delayed-brand, patient-defense, self-invisibility, focus, feint-slip, riposte, stunning-strike, charge-push, pounce, isolation)
[reskin] composed candidates: none action — the mark family has no grammar — composable families are payoff, body-reaction, zone
[reskin] declared mechanic leads the menu: action — charm: lure, pacify
[reskin] menu ordered by the idea's stamps: action — idea fires save/does condition; leading: lure (save/condition), pacify (save/condition), escalating-dread (save/condition)
[reskin] keys would have bound: action — lure (song)
[reskin] classification handed to the fit call: mechanic=aura shape=save_area
[reskin] word match declined by the call: terror-pulse, pacify, escalating-dread — the key word does not mean the mechanic here
[reskin] value check: "Drowning Dirge (Recharge 5-6)" EV 41.8 vs floor 19.8 (one attack of 3) — over the ceiling — gated Recharge 5-6
[reskin] signature template: lure -> Actions/"Drowning Dirge (Recharge 5-6)" ("The veilsinger's song swells into a dirge of layered notes that hooks the mind;  [verb: song:concept]")
[reskin] keys spent by the action: song
[reskin] signature idea (trait): "The veilsinger's hunting hymn is subsonic and ever-present, a vibration that travels through water, wood, and bone. While the veilsinger is not incapacitated, each creature within range that can hear it has disadvantage on Dexterity (Stealth) checks, and the veilsinger has advantage on Wisdom (Perception) checks to locate any creature within that range." [trait/always/condition] [family: sentinel] — menu: spider-climb, phobia, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, shielded-mind, evasion, relentless-pursuit, bound, undead-fortitude, truth-aura, fear-aura, assassinate, berserk
[reskin] verb gate stands down: trait — no template shares a verb, but 2 template(s) whose declared stamps match the idea (always/condition): phobia, berserk; the declared data is the warrant and the call is worth making
[reskin] composed candidates: none trait — the sentinel family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does condition; leading: phobia (always/condition), berserk (always/condition), spider-climb (always/movement)
[reskin] classification handed to the fit call: mechanic=aura shape=save_area
[reskin] word match declined by the call: fear-aura, truth-aura, phobia — the key word does not mean the mechanic here
[reskin] closest accepted: trait — the call refused every template but named "fear-aura" as nearest and declined it for no_fit; it lands rather than the row being dropped (what it wanted: an aura applying Disadvantage to Dexterity (Stealth) checks and Advantage on Per)
[reskin] free signature row: trait — "fear-aura" is the call's nearest after it refused every template, so it ships as DECORATION: no receipt, no element claim, counted in the metric. Earns no clause credit
[reskin] free signature row: "Hunting Hymn" — the call's nearest after it refused every template, so it ships as DECORATION: no receipt, no element claim, counted in the metric. Earns no clause credit
[reskin] signature template (trait): fear-aura -> Traits/"Hunting Hymn" ("The idea is a hearing-based aura that imposes Disadvantage on Stealth and grants [shape fit, no verb match]")
[reskin] one mechanic, one name: Traits/"Hunting Hymn" -> "Fear Aura" — this row is fear-aura and does what every fear-aura row does; a bespoke name would promise more than the text delivers
[reskin] weapons answered: Tail = none
[reskin] amphibious by concept: a creature of the deep breathes both (print: the Sea Hag's)
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] name-canon stands down: the path answered homebrew on "a leviathan of the trench whose song dro" and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] reach follows the body: Actions/"Tail" reach 5 → 15 ft. on a Gargantuan body (print's modal reach at that size)
[reskin] dead control row: "Drowning Dirge" sheds its gate — no damage, no KO condition; it joins the Multiattack menu instead
[reskin] multiattack replacement clause: It can replace one attack with a use of Drowning Dirge.
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 1) — "Fear Aura" [trait/start_of_turn/condition]
[reskin] row binds its clause: "Drowning Dirge" answers "a leviathan of the trench whose song drowns fleets" — the keys it matched came from that clause, so the coverage credit has a receipt
[reskin] sameness: 1 of 1 free row(s) express nothing their rules carry — counted as decoration ("Fear Aura")
[reskin] audit rename: "Umbral Step" -> "Veil of Shadow"
[reskin] seed share: 0 of 2 signature row(s) came from a seed — the sameness metric
[reskin] [gap] an aura applying Disadvantage to Dexterity (Stealth) checks and Advantage on Perception to locate creatures within range — "The veilsinger's hunting hymn is subsonic and ever-present, a vibration that travels through water, wood, and bone. While the veilsinger is not incapacitated, each creature within range that can hear it has disadvantage on Dexterity (Stealth) checks, and the veilsinger has advantage on Wisdom (Perception) checks to locate any creature within that range." — Trench Veilsinger [seat: trait [trait/always/condition]] (closest offered: fear-aura) [effect: condition] [menu: phobia berserk spider-climb bloodied-fury blood-frenzy pack-tactics death-restoration shielded-mind evasion relentless-pursuit bound undead-fortitude assassinate truth-aura fear-aura] [same-cell unoffered: adhesive faultless-tracker marking-light kill-denial] [same-seat rejected: false-appearance:legality adhesive:legality terrain-walk:legality aberrant-ground:legality faultless-tracker:legality web-walker:legality uncanny-sense:legality earth-glide:legality tunneler:legality marking-light:legality sealed-body:role relic-object:legality guarded-stance:role mimicry:legality blurred-form:legality death-burst:legality kill-denial:legality] [landed: fear-aura]
[reskin] signature tally: 2 seat(s) -> 2 shape(s) on the sheet · 0 expressed, 1 decoration, 1 free · accepted picks lost: 0 of 1 · path homebrew
[reskin] size floor: STR 14 -> 25 — print prints no corporeal Gargantuan body under 25 (the Dragon Turtle); the attack follows it, as print's own 49 do
```


---


### Death-Knell Sexton — a 2024 sheet

**Concept:** a chapel bell-ringer's ghost that tolls for the dying

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Death-Knell Sexton | 3 | lurker-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- **dropped clause:** "tolls for the dying"
- read: def 1 / off 5 → 3; sustained 38 (2 × Withering Touch); nova Threshold Execute 13; dmg 38

```
Death-Knell Sexton

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

Ethereal Sight. The sexton can see 60 feet into the Ethereal Plane when it is on the Material Plane.

Incorporeal Movement. The sexton can move through other creatures and objects as if they were Difficult Terrain. It takes 5 (1d10) Force damage if it ends its turn inside an object.

Actions

Multiattack. The sexton makes two Withering Touch attacks. It can replace one attack with a use of Horrific Visage.

Withering Touch. Melee Attack Roll: +5, reach 5 ft. 19 (3d10 + 3) Necrotic damage.

Threshold Execute (1/Day). Dexterity Saving Throw: DC 13, one creature the sexton can see within 60 feet. Failure: If the target has 13 Hit Points or fewer, it has the Unconscious condition for 1 hour, until it takes damage, or until a creature within 5 feet of it takes an action to wake it. Otherwise, it takes 13 (3d8) Necrotic damage.

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

- Actions/Multiattack — the chassis
- Actions/Withering Touch — print's own row, renamed
- Actions/Threshold Execute — template execute; library draw (seed unstamped); binds the GM's words: end
- Actions/Horrific Visage — print's own row
- Actions/Possession — print's own row
- Actions/Etherealness — print's own row
- Traits/Ethereal Sight — print's own row
- Traits/Incorporeal Movement — print's own row

**Engine trace**

```
[path] twist — Ghost (is) — "ghost" (call)
[route] lurker-phantom type=Undead mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | lurker-phantom: ✓ ("a chapel bell-ringer's ghost") | lurker-phantom: key "ghost" (class body)
[concept] name: provided_name rejected — "a chapel bell-ringer's ghost who tolls f…" is the description, not a name
[concept] hints: phantom→style ✓ ("a chapel bell-ringer's ghost")
[concept] resolve: archetype=lurker type=Undead themes=grave/voice mind=sapient style=phantom energy=Necrotic mix=energy identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: tolling the death-knell for the living [behavior] | the chapel bell it rings [object] | chilling aura of the grave around each knell [aura]
[concept] identity: The bell-ringer's ghost drifts through the chapel walls to hang above the dying, and its tolling bell is the attack — each knell a pulse of grave-cold that saps the warmth from the living and marks them for death. It keeps its distance, gliding through stone and pew to keep a victim between itself and any consecrated light, tolling faster and faster as the target weakens; wounded or cornered, it does not flee but climbs the tower and rings a final, furious peal meant to drag everything below into the grave with it.
[concept] lore: A sexton who rang the death-knell for a plague village and was left unburied among his own bells, the ghost still keeps his office — he tolls for anyone he judges overdue, and he will not stop until the count is square.
[reskin] print canon route: the Ghost's body outranks the phantom seat — no verb in the words names it; the plain lurker line
[reskin] print canon defenses: HP 39 -> 45, AC 14 -> 11 — the Ghost's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 7, DEX 13, CON 10, INT 10, WIS 12, CHA 17 — the Ghost's at its own CR; attack +5 -> +5, DC 13 (print's)
[reskin] donor: lurker-2 -> CR 3
[reskin] row gated out: Teleport (teleport) — the concept did not claim this mechanic
[reskin] [path] decides: twist on the Ghost (the matcher would have said homebrew)
[reskin] print canon: "a chapel bell-ringer's ghost that tolls for the dying" heads on the Ghost — print's rows ride along; the seat stays
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline declared: "the sexton" — the call's own answer (kind), built from the name
[reskin] inline form: "the sexton" — the model's own reading of the name
[reskin] save dc derived: DC 12 -> 13 (8 + PB 2 + the sheet's best 3) — no stat on the sheet reached it
[reskin] the sheet's declared ask: none — the route call named no mechanic
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a chapel bell-ringer's ghost" -> has (descriptive), head | "tolls for the dying" -> has (mechanical) [asked: attack] [askMechanic: drain]
[reskin] body verdicts: 37 of 37 answered; not true of this body: gaze-single, seal, random-ray, spew, snare-bolt, zone-seed, blighted-ground, shell-withdraw, coating, heated-body, false-appearance, absorption, bloodied-burst, adhesive, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, uncanny-sense, marking-light, warded-mending, mimicry, gaze-aura, blurred-form, death-burst, kill-denial, hook-rider
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The sexton's knell is for the dying, and the dying hear it sooner. As a bonus action it tolls over one creature it can see that is Bloodied, and that creature must succeed on a Wisdom saving throw or take Necrotic damage and be Frightened of the sexton until the end of its next turn. A creature that fails takes the damage and is Frightened; a creature that succeeds is still tolled but not cowed." [bonus_action/save/condition] [family: payoff] — menu: blink, patient-defense, self-invisibility, focus, feint-slip (+ shelf: execute, wail, lure, active-toll, ground-burst, obstacle-pull, pacify, escalating-dread, terror-pulse, slow-bolt, sensory-strike, drain, delayed-brand, shield-bash, push-prone, reveal, riposte, charge-push, pounce, isolation, life-drain)
[reskin] composed candidates: none action — the payoff family composes a rider and this is the bonus_action seat
[reskin] menu ordered by the idea's stamps: action — idea fires save/does condition; leading: active-toll (save/damage), execute (save/damage), blink (always/movement)
[reskin] keys would have bound: action — active-toll, sensory-strike (toll, bell)
[reskin] classification handed to the fit call: shape=attack
[reskin] word match declined by the call: active-toll, blink, patient-defense, self-invisibility, focus, feint-slip — the key word does not mean the mechanic here
[reskin] closest accepted: action — the call refused every template but named "execute" as nearest and declined it for no_fit; it lands rather than the row being dropped (what it wanted: a Wisdom save against fear and necrotic damage on one already-wounded target, re)
[reskin] row kept the template's own name: action — "Threshold Execute" is execute's default and the call named nothing usable; on a reskinned creature that reads as catalog furniture
[reskin] seat takes its clause: "Threshold Execute (1/Day)" is HANDED "tolls for the dying" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature template: execute -> Actions/"Threshold Execute (1/Day)" ("The sexton's knell is for the dying, and the dying hear it sooner. As a bonus action it tolls over one creature it can see that is Bloodied, and that creature m [verb: end:idea]")
[reskin] signature idea (trait): "The bell the sexton rings is not his hands but his body — the chapel's death-bell hanging hollow in his chest. Whenever a creature dies within earshot of the sexton, the bell tolls on its own and he gains an extra peal of power; but while no living creature within reach of the bell is Bloodied, the tolling is silent and his Grave Toll deals no extra harm. The count is only square in a dying room." [trait/always/resource] [family: kill-growth] — menu: spider-climb, phobia, energy-aura, bloodied-fury, blood-frenzy, pack-tactics, shielded-mind, evasion, relentless-pursuit, bound, relic-object, undead-fortitude, truth-aura, fear-aura, assassinate (+ shelf: resonant-body)
[reskin] composed candidates: none trait — the kill-growth family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does resource; leading: spider-climb (always/movement), phobia (always/condition), bloodied-fury (always/defense)
[reskin] keys would have bound: trait — resonant-body (toll, bell)
[reskin] classification handed to the fit call: shape=attack
[reskin] word match declined by the call: blood-frenzy, bloodied-fury, resonant-body, assassinate — the key word does not mean the mechanic here
[reskin] closest accepted: trait — the call refused every template but named "bloodied-fury" as nearest and declined it for no_fit; it lands rather than the row being dropped (what it wanted: grants extra harm when something dies in earshot and withholds it while no nearb)
[reskin] row kept the template's own name: trait — "Bloodied Fury" is bloodied-fury's default and the call named nothing usable; on a reskinned creature that reads as catalog furniture
[reskin] free signature row: "Bloodied Fury" — the call's nearest after it refused every template, so it ships as DECORATION: no receipt, no element claim, counted in the metric. Earns no clause credit
[reskin] seat takes its clause: "Bloodied Fury" is HANDED "tolls for the dying" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature template (trait): bloodied-fury -> Traits/"Bloodied Fury" ("The idea is a variable power-up fueled by deaths within earshot, plus a silence  [verb: bloodied:idea]")
[reskin] weapons answered: Grave Toll = none
[reskin] languages by mind: "None" -> "Common plus the languages it knew in life" (sapient)
[reskin] print canon languages: "Common plus the languages it knew in life" -> "Common plus one other language" — the Ghost's
[reskin] print canon speed: 30 ft. -> 5 ft. — the Ghost's walk; the concept's other modes stay
[reskin] print canon speed: Fly -> 40 ft. — the Ghost's own
[reskin] print canon attack: "Grave Toll" -> "Withering Touch" — the Ghost's own row
[reskin] print canon multiattack: "the sexton makes two Withering Touch attacks." — the Ghost's own
[reskin] immunities stamped for type: Undead -> Poison; Exhaustion, Poisoned
[reskin] print canon defenses: immunities Poison; Exhaustion, Poisoned -> Necrotic, Poison; Charmed, Exhaustion, Frightened, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained; resistances none -> Acid, Bludgeoning, Cold, Fire, Lightning, Piercing, Slashing, Thunder — the Ghost's own header lines
[reskin] print canon trait: Ethereal Sight — "a chapel bell-ringer's ghost that tolls for the dying" is the Ghost (print's own row)
[reskin] print canon trait: Incorporeal Movement — "a chapel bell-ringer's ghost that tolls for the dying" is the Ghost (print's own row)
[reskin] print canon: chassis row leaves — Bonus Actions/"Umbral Step" is the seat's, not the Ghost's
[reskin] print canon row: Actions/Horrific Visage — the Ghost's own
[reskin] print canon row: Actions/Possession (Recharge 6) — the Ghost's own
[reskin] print canon row: Actions/Etherealness — the Ghost's own
[reskin] multiattack replacement clause: It can replace one attack with a use of Horrific Visage.
[reskin] free-row budget by card size: CR 3 sits in band 3-5, where print runs 2-5 rows (p20-p90, Multiattack excluded); this card already carries 7 fixed row(s), so the free-row budget is 0 rather than 1 — the card is already at print's high end
[reskin] free row over budget: Traits/"Bloodied Fury" leaves at ship — this sheet's free-row budget (0) is spent by a row that SHIPPED
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 0 kept (budget 0)
[reskin] threshold re-derived after the cap: Actions/Threshold Execute (1/Day) — 20 over the row's own 13 damage, so the kill branch beat the damage branch; threshold to 13
audit finding below confidence gate: Horrific Visage Frightened duration is keyed to the sexton's next turn in a 60-foot cone; the entry provides no way to track which creatures remain affected across turns beyond turn order, but more importantly is a cone originating from the sexton who hovers 40 ft. up — fine; flagging instead the mislabeled 'Wisdom Saving Throw' format inconsistency is not a defect. Removing — see alternate below.
[reskin] audit rewrite blocked — "Multiattack" is engine-authored chassis text
[reskin] audit rewrite blocked — "Etherealness" is engine-authored chassis text
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] [gap] a Wisdom save against fear and necrotic damage on one already-wounded target, repeatable each turn — "The sexton's knell is for the dying, and the dying hear it sooner. As a bonus action it tolls over one creature it can see that is Bloodied, and that creature must succeed on a Wisdom saving throw or take Necrotic damage and be Frightened of the sexton until the end of its next turn. A creature that fails takes the damage and is Frightened; a creature that succeeds is still tolled but not cowed." — Death-Knell Sexton [seat: action [bonus_action/save/condition]] (closest offered: execute) [effect: condition] [menu: active-toll execute blink patient-defense self-invisibility focus feint-slip] [same-cell unoffered: swallow gaze-single snare seal shield-bash lure random-ray pacify escalating-dread terror-pulse snare-bolt sensory-strike push-prone reveal] [same-seat rejected: aggro-curse:role] [landed: execute]
[reskin] [gap] grants extra harm when something dies in earshot and withholds it while no nearby creature is Bloodied — a stacking, swa — "The bell the sexton rings is not his hands but his body — the chapel's death-bell hanging hollow in his chest. Whenever a creature dies within earshot of the sexton, the bell tolls on its own and he gains an extra peal of power; but while no living creature within reach of the bell is Bloodied, the tolling is silent and his Grave Toll deals no extra harm. The count is only square in a dying room." — Death-Knell Sexton [seat: trait [trait/always/resource]] (closest offered: bloodied-fury) [effect: resource] [menu: spider-climb phobia bloodied-fury blood-frenzy pack-tactics shielded-mind evasion relentless-pursuit bound relic-object undead-fortitude assassinate energy-aura truth-aura fear-aura resonant-body] [same-cell unoffered: lay-on-hands second-wind volley-order] [same-seat rejected: false-appearance:legality adhesive:legality terrain-walk:legality aberrant-ground:legality faultless-tracker:legality web-walker:legality death-restoration:legality uncanny-sense:legality earth-glide:legality tunneler:legality berserk:role marking-light:legality sealed-body:role guarded-stance:role mimicry:legality blurred-form:legality death-burst:legality kill-denial:legality] [VETOED AFTER ACCEPTANCE: bloodied-fury never reached the sheet — died at the free-row budget (only 0 free row(s) allowed on this sheet)]
[reskin] signature outcome: 1 of 2 accepted signature pick(s) never reached the sheet — 1x the free-row budget
[reskin] signature tally: 2 seat(s) -> 1 shape(s) on the sheet · 0 expressed, 0 decoration, 0 free · accepted picks lost: 1 of 2 (1x the free-row budget) · path twist
[reskin] record reconciled: "Threshold Execute (1/Day)" no longer imposes Unconscious — the clause left, so the record goes with it
```


---


### Brass Tyrant — bands soft

**Concept:** a tyrant of burning brass who rules a city of forges

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Brass Tyrant [seed 1/2] | 17 | brute-17-juggernaut | ok | SOFT: hot-offense | ok | ok | ok | ok | ok | ok | ok | ok |

- bands · soft · hot-offense: offense alone reads CR 22, 5 over; the HP axis pulls the read to 17.5
- read: def 13 / off 22 → 17.5; sustained 170 (2 × Fist + legendary Trample Through); nova Furnace Blast 72; dmg 170

```
Brass Tyrant

Huge Construct, Lawful Evil

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

Fear Aura. The tyrant emanates an aura in a 20-foot Emanation while it doesn't have the Incapacitated condition. Wisdom Saving Throw: DC 19, any enemy that starts its turn in the aura. Failure: The target has the Frightened condition until the end of its next turn. Success: The target is immune to this creature's aura for 24 hours.

Legendary Resistance (3/Day). If the tyrant fails a saving throw, it can choose to succeed instead.

Immutable Form. The tyrant can't shape-shift.

Siege Monster. The tyrant deals double damage to objects and structures.

Actions

Multiattack. The tyrant makes two Fist attacks. It can replace one attack with a use of Opportunist's Lash.

Fist. Melee Attack Roll: +12, reach 10 ft. 20 (4d6 + 6) Bludgeoning damage plus 14 (4d6) Fire damage.

Furnace Blast (Recharge 5-6). Constitution Saving Throw: DC 19, each creature in a 30-foot Cone. Failure: 72 (16d8) Fire damage. Success: Half damage only.

Opportunist's Lash. Strength Saving Throw: DC 19, one creature within 30 feet that is Prone. Failure: 59 (17d6) Fire damage. Success: Half damage.

Legendary Actions

Legendary Action Uses: 3. Immediately after another creature's turn, the tyrant can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.

Trample Through. The tyrant moves up to half its Speed without provoking Opportunity Attacks, and it makes one Fist attack.

Breach Walls. The tyrant moves up to half its Speed without provoking Opportunity Attacks. During this movement, it can move through Large or smaller objects and structures, destroying them.

Crushing Step. Strength Saving Throw: DC 19, each creature within 10 feet of the tyrant. Failure: The target has the Prone condition.

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

- Traits/Fear Aura — template fear-aura; library draw (seed unstamped)
- Traits/Legendary Resistance — the chassis
- Traits/Immutable Form — the chassis
- Traits/Siege Monster — the chassis
- Actions/Multiattack — the chassis
- Actions/Fist — the chassis
- Actions/Furnace Blast — the chassis
- Actions/Opportunist's Lash — library seed exploiter
- Legendary Actions/Legendary Action Uses: 3 — the chassis
- Legendary Actions/Trample Through — the chassis
- Legendary Actions/Breach Walls — the chassis
- Legendary Actions/Crushing Step — the chassis

**Engine trace**

```
[path] homebrew — title tyrant — "a tyrant of burning brass who rules a city of forges" (call)
[route] brute-juggernaut type=Construct mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | brute-juggernaut: ✓ ("a tyrant of burning brass") | brute-juggernaut: no line key in the words — the model's read of its quote
[concept] name: provided_name rejected — "a tyrant of burning brass who rules a ci…" is the description, not a name
[concept] resolve: archetype=brute type=Construct themes=forged/elemental mind=sapient style=juggernaut energy=Fire mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: molten brass run through its frame [body] | a ruler's crushing grip and burning tread [behavior] | the heat of the forge-city it rules [aura]
[concept] identity: The Brass Tyrant opens by wading straight through the forge-district's walls and gates, molten brass sheeting off its shoulders as it lays down a burning tread that turns flagstones to slag. Every round it pins the nearest champion under one brass-clad fist and pours its furnace-heart through them, and it fights to the death without a flicker of doubt, because no tyrant made of brass was ever forged with an off-switch.
[concept] lore: Poured in the first furnace of the city it now rules, the Brass Tyrant was made to keep the forges burning forever — and it took the mandate literally, declaring every smith its chattel and every road its foundry floor.
[reskin] donor: brute-17-juggernaut -> CR 17
[reskin] [path] decides: homebrew (the matcher agrees)
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline declared: "the tyrant" — the call's own answer (kind), built from the name
[reskin] inline form: "the tyrant" — the model's own reading of the name
[reskin] fear unearned by the damage: "Furnace Blast (Recharge 5-6)" would have imposed Frightened on a Fire row — print pairs Frightened with Psychic or Thunder damage and with nothing else; the clause leaves and the row keeps its damage
[reskin] the sheet's declared ask: command — the route call's one answer for the whole concept
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a tyrant of burning brass" -> has (descriptive), head | "rules a city of forges" -> has (descriptive)
[reskin] body verdicts: 27 of 27 answered; not true of this body: herd, drain, shell-withdraw, rally, false-appearance, absorption, bloodied-burst, adhesive, terrain-walk, faultless-tracker, web-walker, noxious-aura, uncanny-sense, marking-light, relic-object, warded-mending, mimicry, gaze-aura, hook-rider, life-drain
[reskin] menu pruned: action — push-prone, thrown-burst-seed (the sheet cannot render them)
[reskin] signature idea (action): "As the tyrant moves on its turn, it can pour its molten brass into the ground beneath its feet, creating a searing trail that clings to the feet of those who follow. The first creature to enter that area or start its turn there must succeed on a Dexterity saving throw or be Restrained as the cooling brass hardens, its Speed reduced to 0 until it spends an action to break free." [trait/start_of_turn/condition] [family: zone] — menu: spider-climb, phobia, aberrant-ground, energy-aura, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, relentless-pursuit, bound, undead-fortitude, truth-aura, fear-aura, death-burst, kill-denial (+ shelf: condition-payoff, shield-bash, escalating-dread, terror-pulse, exploiter, second-wind, aggro-curse, own-turn-punisher, self-invisibility, focus, coating, stunning-strike, charge-push, pounce)
[reskin] composed candidates on the menu: action — composed:zone:condition:poisoned, composed:zone:condition:frightened, composed:zone:condition:deafened, composed:zone:condition:blinded (the zone family's options, built before the call looks)
[reskin] declared mechanic leads the menu: action — command: pack-tactics
[reskin] menu ordered by the idea's stamps: action — idea fires start_of_turn/does condition; leading: pack-tactics (always/damage), truth-aura (start_of_turn/condition), fear-aura (start_of_turn/condition)
[reskin] word match declined by the call: truth-aura, fear-aura, composed:zone:condition:frightened, composed:zone:condition:deafened, composed:zone:condition:blinded — the key word does not mean the mechanic here
[reskin] closest refused: action — "composed:zone:condition:poisoned" was named closest but was never on this sheet's menu (a gate refused it, or the pool did not offer it for this idea's declared trigger)
[reskin] decline reason: action — the call answered none and names it "no_fit"
[reskin] signature miss: action — "As the tyrant moves on its turn, it can pour its molten brass into the ground beneath its feet, creating a searing trail that clings to the feet of those who follow. The first creature to enter that area or start its turn there must succeed on a Dexterity saving throw or be Restrained as the cooling brass hardens, its Speed reduced to 0 until it spends an action to break free." [trait/start_of_turn/condition] — the model found no template that holds it (offered: pack-tactics, truth-aura, fear-aura, composed:zone:condition:poisoned, composed:zone:condition:frightened, composed:zone:condition:deafened, composed:zone:condition:blinded, energy-aura, phobia, berserk, kill-denial, spider-climb, aberrant-ground, bloodied-fury, blood-frenzy, death-restoration, shielded-mind, relentless-pursuit, bound, undead-fortitude, death-burst)
[reskin] value check: "Opportunist's Lash" EV 45.7 vs floor 45.5 (one attack of 2) — dice 28 → 35; priced at the floor: dice 35 → 59
[reskin] library seed drawn: exploiter -> Actions/"Opportunist's Lash" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The Brass Tyrant's frame is a crucible that never cools; its molten brass core bleeds through the seams of its armor. Any creature that Grapples or is Grappled by the tyrant takes Fire damage at the start of each of its turns, as the brass sears flesh and armor alike." [trait/start_of_turn/damage] [family: body-reaction] — menu: spider-climb, phobia, aberrant-ground, energy-aura, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, relentless-pursuit, bound, undead-fortitude, truth-aura, fear-aura, death-burst, kill-denial (+ shelf: heated-body, resonant-body, weapon-lodge)
[reskin] composed candidates on the menu: trait — composed:body-reaction:damage:t0, composed:body-reaction:damage:t1, composed:body-reaction:damage:t2 (the body-reaction family's options, built before the call looks)
[reskin] declared mechanic leads the menu: trait — command: pack-tactics
[reskin] menu ordered by the idea's stamps: trait — idea fires start_of_turn/does damage; leading: pack-tactics (always/damage), energy-aura (start_of_turn/damage), truth-aura (start_of_turn/condition)
[reskin] keys would have bound: trait — heated-body (burn, brass)
[reskin] word match declined by the call: energy-aura, heated-body, composed:body-reaction:damage:t0, composed:body-reaction:damage:t1 — the key word does not mean the mechanic here
[reskin] row composed from the family's own options: trait — composed:body-reaction:damage:t2: the call picked it off the menu (what no printed template did: unstated)
[reskin] free signature row: trait — "composed:body-reaction:damage:t2" quotes nothing the GM typed and matches no key-table verb, but the call names the element it expresses: "molten brass run through its frame" — a receipt the trait seat can produce. Earns no clause credit; the homebrew path allows 1 and this is number 1
[reskin] fear moved to a row that deals no damage: the sheet declared Frightened and a Fire row cannot carry it by print — fear-aura carries it instead ("Fear Aura" in Traits)
[reskin] signature template (trait): fear-aura -> Traits/"Fear Aura" ("the sheet declared Frightened and its Fire damage cannot carry it by print")
[reskin] free signature row: "Searing Crucible" — the trait seat cannot quote the GM, but the call names the element it expresses: "molten brass run through its frame". Earns no clause credit; the homebrew path allows 1 and this is number 2
[reskin] trait ceiling: "Searing Crucible" does not ship — 4 traits already, and print's ceiling for a material body is 4
[reskin] weapons answered: Fist = none; Furnace Blast = none; Furnace Heart = none; Trample Through = none; Breach Walls = none; Crushing Step = none
[reskin] chassis nova: "Furnace Blast (Recharge 5-6)" — the brute-17-juggernaut's own nova row (its "Area Nova", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] immunities stamped for type: Construct -> Poison; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned
[reskin] resistances derived: Fire
[reskin] name-canon stands down: the path answered homebrew on "a tyrant of burning brass who rules a ci" and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] multiattack replacement clause: It can replace one attack with a use of Opportunist's Lash.
[reskin] free-row budget by card size: CR 17 sits in band 17-20, where print runs 7-9 rows (p20-p90, Multiattack excluded); this card already carries 11 fixed row(s), so the free-row budget is 0 rather than 1 — the card is already at print's high end
[reskin] seed share: 1 of 2 signature row(s) came from a seed (Opportunist's Lash) — the sameness metric
[reskin] [gap] leaves a trail area behind as it moves that Restrains the first creature entering or starting there, breakable with an a — "As the tyrant moves on its turn, it can pour its molten brass into the ground beneath its feet, creating a searing trail that clings to the feet of those who follow. The first creature to enter that area or start its turn there must succeed on a Dexterity saving throw or be Restrained as the cooling brass hardens, its Speed reduced to 0 until it spends an action to break free." — Brass Tyrant [seat: action [trait/start_of_turn/condition]] (closest offered: composed:zone:condition:poisoned) [effect: condition] [menu: pack-tactics truth-aura fear-aura composed:zone:condition:poisoned composed:zone:condition:frightened composed:zone:condition:deafened composed:zone:condition:blinded energy-aura phobia berserk kill-denial spider-climb aberrant-ground bloodied-fury blood-frenzy death-restoration shielded-mind relentless-pursuit bound undead-fortitude death-burst] [same-cell unoffered: noxious-aura gaze-aura] [same-seat rejected: noxious-aura:legality warded-mending:legality gaze-aura:legality] [row dropped]
[reskin] signature outcome: 1 of 1 accepted signature pick(s) never reached the sheet — 1x the call named no template for the pick
[reskin] signature tally: 2 seat(s) -> 2 shape(s) on the sheet · 0 expressed, 0 decoration, 0 free · accepted picks lost: 1 of 1 (1x the call named no template for the pick) · path homebrew
```


---


### Swarm of Unclaimed Peals — bands soft

**Concept:** a swarm of funeral bells that ring themselves over the dying

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Swarm of Unclaimed Peals | 13 | swarm-9 | ok | SOFT: hot-offense | ok | ok | ok | ok | ok | ok | ok | ok |

- bands · soft · hot-offense: offense alone reads CR 17, 4 over; the HP axis pulls the read to 13.5
- **dropped clause:** "a swarm of funeral bells"
- **dropped clause:** "ring themselves over the dying"
- read: def 10 / off 17 → 13.5; sustained 90 (1 × Clapper); nova Tolling Peal 67; dmg 105

```
Swarm of Unclaimed Peals

Medium Swarm of Tiny Undead, Neutral

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

Senses blindsight 60 ft. (blind beyond this radius); Passive Perception 10

Languages None

CR 13 (XP 10,000; PB +5)

Traits

Pealing Shroud. A creature that hits the swarm with a melee attack while within 5 feet of it takes 10 (3d6) Thunder damage and has the Deafened condition until the end of its next turn.

Swarm. The swarm can occupy another creature's space and vice versa, and the swarm can move through any opening large enough for a Tiny creature. The swarm can't regain Hit Points or gain Temporary Hit Points.

Actions

Clapper. Melee Attack Roll: +10, reach 5 ft. 90 (19d8 + 5) Bludgeoning damage, or 45 (9d8 + 5) Bludgeoning damage if the swarm is Bloodied.

Tolling Peal (Recharge 5-6). Constitution Saving Throw: DC 17, each creature in a 30-foot Emanation originating from the swarm. Failure: 67 (15d8) Thunder damage, and the target has the Deafened condition until the end of its next turn. Success: Half damage only.

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

- Traits/Pealing Shroud — template resonant-body; library draw (seed unstamped); the GM's clause "a swarm of funeral bells"; binds the GM's words: bell+peal+ring
- Traits/Swarm — the chassis
- Actions/Clapper — the chassis
- Actions/Tolling Peal — template active-toll; library draw (seed unstamped); the GM's clause "a swarm of funeral bells"; binds the GM's words: ring+bell+deafen

**Engine trace**

```
[path] homebrew — "a swarm of funeral bells that ring themselves over the dying" (call)
[route] swarm type=Undead mechanics=aura — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: on the GM's own words "a swarm of funeral bells" | holds: the call reads none in these words | swarm: ✓ ("a swarm of funeral bells") | swarm: no line key in the words — the model's read of its quote
[concept] name: provided_name rejected — "a swarm of funeral bells that ring thems…" is the description, not a name
[concept] hints: swarm→body ✓ ("a swarm of funeral bells")
[concept] resolve: archetype=swarm type=Undead themes=grave/terror mind=mindless style=— energy=Necrotic mix=energy identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: aura
[concept] signature elements: bells that ring themselves [behavior] | settling over the dying [behavior] | a shroud of funeral bells [body]
[concept] identity: A knot of tarnished funeral bells drifts through graveyards and battle-fields, seeking the dying and settling over them in a clanging shroud; it opens combat by peeling away from the shadows and dropping onto the nearest wounded creature, then every round it rings in overlapping, deafening waves that hammer its prey while the bells crowd and smother. It does not flee when bloodied — it splits into two smaller peals that keep ringing until every breath beneath them has stopped, patient as a funeral director and utterly without mercy.
[concept] lore: These are the bells of a hundred unclaimed funeral rites, cursed to ring for the dead they were denied and forever seeking new dying bodies to perform their office over.
[reskin] body type: swarm — the body outranks the role (recorded: swarm)
[reskin] donor: swarm-9 -> CR 13 (invented — no printed peer)
[reskin] [path] decides: homebrew (the matcher agrees)
[reskin] swarm name stamped: "Unclaimed Peal" -> "Swarm of Unclaimed Peals" — print names all seven of its swarms "Swarm of X", and the rules text says "the swarm"
[reskin] swarm type stamped: Undead -> Swarm of Tiny Undead
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline by rule: "the swarm" — the call answered "the peal" (kind), which the name does not support
[reskin] the sheet's declared ask: drain — the route call's one answer for the whole concept
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a swarm of funeral bells" -> has (mechanical) [asked: attack] | "ring themselves over the dying" -> has (mechanical) [asked: save_single] [askMechanic: dazzle]
[reskin] body verdicts: 38 of 38 answered; not true of this body: gaze-single, snare, seal, random-ray, spew, snare-bolt, zone-seed, blighted-ground, blink, shell-withdraw, coating, phase-slip, heated-body, false-appearance, absorption, bloodied-burst, adhesive, terrain-walk, aberrant-ground, web-walker, energy-aura, noxious-aura, uncanny-sense, marking-light, relic-object, warded-mending, mimicry, gaze-aura, blurred-form, death-burst, kill-denial, hook-rider
[reskin] menu pruned: action — obstacle-pull, pacify, escalating-dread, terror-pulse, slow-bolt, sensory-strike, disarm, thrown-burst-seed, drain, push-prone, curse-debt, reveal, wind-up, delayed-brand, aggro-curse, self-invisibility, focus, feint-slip (the sheet cannot render them)
[reskin] signature idea (action): "The swarm sets every bell ringing at once in a wave of overlapping clangor, and each wound beneath it answers the call — the dying and the injured are rung like struck metal. Each creature of the swarm's choice that is within range and has any missing Hit Points must make a Constitution saving throw, taking Necrotic damage and being Deafened and Frightened of the swarm on a failed save as its own " [action/save/damage] [family: payoff] — menu: thrown-burst, execute, shield-bash, wail, lure, active-toll, ground-burst (+ shelf: patient-defense, second-wind, riposte, stunning-strike, charge-push, pounce, isolation, life-drain, charge)
[reskin] lead by this seat's own clause: action — "dazzle" from the clause this seat serves, not the sheet's "drain"
[reskin] composed candidates: none action — the payoff family composes a rider and this is the action seat
[reskin] menu ordered by the idea's stamps: action — idea fires save/does damage; leading: thrown-burst (save/damage), execute (save/damage), active-toll (save/damage)
[reskin] keys would have bound: action — active-toll (ring, bell)
[reskin] classification handed to the fit call: mechanic=aura shape=attack
[reskin] word match declined by the call: thrown-burst, execute, ground-burst, shield-bash, lure, wail — the key word does not mean the mechanic here
[reskin] closest accepted: action — the call refused every template but named "active-toll" as nearest and declined it for no_fit; it lands rather than the row being dropped (what it wanted: an aura keyed to creatures with missing Hit Points that deals damage and Deafens)
[reskin] row kept the template's own name: action — "Tolling Peal" is active-toll's default and the call named nothing usable; on a reskinned creature that reads as catalog furniture
[reskin] value check: "Tolling Peal (Recharge 5-6)" EV 120 vs floor 76.1 (the whole Multiattack (1 attacks)) — worth the trade
[reskin] signature template: active-toll -> Actions/"Tolling Peal (Recharge 5-6)" ("The idea is an aura that rings injured creatures beneath the swarm, dealing Necr [verb: ring:concept, bell:concept, deafen:idea]")
[reskin] keys spent by the action: ring
[reskin] signature idea (trait): "Every bell in the peal rings itself, and a bell cannot be silenced. While the swarm is Bloodied it splits into two smaller peals that act separately, each with its own turn and actions, and neither yields until every breath beneath it has stopped." [trait/always/resource] [family: kill-growth] — menu: spider-climb, phobia, faultless-tracker, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, evasion, relentless-pursuit, bound, guarded-stance, undead-fortitude, truth-aura, fear-aura, assassinate (+ shelf: resonant-body)
[reskin] composed candidates: none trait — the kill-growth family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does resource; leading: spider-climb (always/movement), phobia (always/condition), faultless-tracker (always/condition)
[reskin] keys would have bound: trait — resonant-body (bell)
[reskin] classification handed to the fit call: mechanic=aura shape=attack
[reskin] word match declined by the call: resonant-body, fear-aura, truth-aura, berserk, bloodied-fury, death-restoration — the key word does not mean the mechanic here
[reskin] closest accepted: trait — the call refused every template but named "resonant-body" as nearest and declined it for no_fit; it lands rather than the row being dropped (what it wanted: an aura that rings out and damages creatures beneath it each turn)
[reskin] signature template (trait): resonant-body -> Traits/"Pealing Shroud" ("The idea is a self-ringing bell aura that harms/settles over the dying and split [verb: bell:concept, peal:idea]")
[reskin] weapons answered: Clapper = none
[reskin] speed by concept: dropped Climb 30 ft. — the concept's movement set decides
[reskin] immunities stamped for type: Swarm of Tiny Undead + donor suite -> Poison; Charmed, Exhaustion, Frightened, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained, Stunned
[reskin] resistances derived: Bludgeoning, Piercing, Slashing
[reskin] name-canon stands down: the path answered homebrew on "a swarm of funeral bells that ring thems" and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] bloodied half re-derived: "Clapper" — 14 (4d6) -> 45 (9d8 + 5), half of the main 90 on the main's own +5 (print's ratio and print's modifier)
[reskin] nova capped: Actions/Tolling Peal (Recharge 5-6) — 91 over the CR 13 ceiling 67, dice to 67 (15d8)
[reskin] row binds its clause: "Pealing Shroud" answers "a swarm of funeral bells" — the keys it matched came from that clause, so the coverage credit has a receipt
[reskin] row binds its clause: "Tolling Peal" answers "a swarm of funeral bells" — the keys it matched came from that clause, so the coverage credit has a receipt
audit finding below confidence gate: No Action Defined The name 'Clapper' promises the bell-clapper that strikes the bell, which is consistent with the swarm's peal theme and its bludgeoning damage, so this is not a name-content mismatch; however, the entry's mechanics are otherwise sound and need no change.
[reskin] seed share: 0 of 2 signature row(s) came from a seed — the sameness metric
[reskin] [gap] an aura keyed to creatures with missing Hit Points that deals damage and Deafens and Frightens on a failed save — "The swarm sets every bell ringing at once in a wave of overlapping clangor, and each wound beneath it answers the call — the dying and the injured are rung like struck metal. Each creature of the swarm's choice that is within range and has any missing Hit Points must make a Constitution saving throw, taking Necrotic damage and being Deafened and Frightened of the swarm on a failed save as its own " — Swarm of Unclaimed Peals [seat: action [action/save/damage]] (closest offered: active-toll) [effect: condition] [menu: thrown-burst execute active-toll ground-burst shield-bash lure wail] [same-cell unoffered: trample leap condition-payoff spew burrow-ambush thrown-burst-seed drain curse-debt wind-up exploiter blighted-ground] [same-seat rejected: swallow:legality trample:legality leap:legality gaze-single:legality snare:legality reel:legality condition-payoff:legality seal:legality hook-drag:legality pull-through:legality random-ray:legality spew:legality burrow-ambush:legality snare-bolt:legality push-prone:role herd:role curse-debt:role reveal:role wind-up:role exploiter:legality blighted-ground:legality] [landed: active-toll]
[reskin] [gap] an aura that rings out and damages creatures beneath it each turn — "Every bell in the peal rings itself, and a bell cannot be silenced. While the swarm is Bloodied it splits into two smaller peals that act separately, each with its own turn and actions, and neither yields until every breath beneath it has stopped." — Swarm of Unclaimed Peals [seat: trait [trait/always/resource]] (closest offered: resonant-body) [effect: damage] [menu: spider-climb phobia faultless-tracker bloodied-fury blood-frenzy pack-tactics death-restoration berserk shielded-mind evasion relentless-pursuit bound guarded-stance undead-fortitude assassinate truth-aura fear-aura resonant-body] [same-cell unoffered: lay-on-hands second-wind volley-order] [same-seat rejected: false-appearance:legality adhesive:legality terrain-walk:legality aberrant-ground:legality web-walker:legality uncanny-sense:legality earth-glide:legality tunneler:legality marking-light:legality sealed-body:role relic-object:legality mimicry:legality blurred-form:legality death-burst:legality kill-denial:legality] [landed: resonant-body]
[reskin] signature tally: 2 seat(s) -> 2 shape(s) on the sheet · 0 expressed, 0 decoration, 0 free · accepted picks lost: 0 of 2 · path homebrew
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

Mimicry. The air elemental can mimic stolen voices. A creature that hears the sounds can tell they are imitations only with a successful DC 13 Wisdom (Insight) check.

Air Form. The air elemental can enter a creature's space and stop there. It can move through a space as narrow as 1 inch without expending extra movement to do so.

Actions

Multiattack. The air elemental makes two Thunderous Slam attacks.

Thunderous Slam. Melee Attack Roll: +8, reach 10 ft. 14 (2d8 + 5) Thunder damage.

Stolen Voices. Constitution Saving Throw: DC 13, each creature in a 15-foot Emanation originating from the air elemental. Failure: 18 (4d8) Thunder damage, and the target has the Deafened condition until the end of its next turn. Success: Half damage only.

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
- Actions/Stolen Voices — template active-toll; library draw (seed unstamped); binds the GM's words: deafen+thunder
- Actions/Whirlwind — print's own row
- Traits/Mimicry — template mimicry; library draw (seed unstamped); the GM's clause "carries stolen voices"; binds the GM's words: stolen voice+stolen voices+voices
- Traits/Air Form — print's own row

**Engine trace**

```
[path] twist — Air Elemental (is) — "Name field: Air Elemental" (code)
[route] brute-juggernaut type=Elemental mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | brute-juggernaut: ✓ ("Air Elemental") | brute-juggernaut: no line key in the words — the model's read of its quote
[concept] name: "Air Elemental" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] resolve: archetype=brute type=Elemental themes=elemental/voice mind=sapient style=juggernaut energy=Thunder mix=both identity=✓ lore=✓
[concept] name: provided "Air Elemental"
[concept] mechanics: none claimed
[concept] signature elements: a churning body of storm-wind and debris [body] | a choir of stolen voices that shrieks and disorients [aura] | hurling captured voices as a deafening attack [behavior]
[concept] identity: A roaring vortex of storm-wind whips through the battlefield first, dragging a chorus of stolen screams that stun and disorient, then it slams through ranks with hurricane-force blows to break formations apart. Every round it presses the attack, hurling captured voices as a deafening weapon while it batters foes with compressed gusts and debris, never slowing. Under pressure it grows more frantic rather than retreating, lashing out wildly and venting shrieking gales until it disperses or its enemies fall.
[concept] lore: Born from a squall that swallowed the last breaths of a doomed ship's crew, the elemental wanders the windswept wastes hoarding every cry it has stolen and adding new voices to its howling choir.
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
[reskin] the sheet's declared ask: none — the route call named no mechanic
[reskin] lacks asked: nothing taken away
[reskin] the clause is its own quote: trigger "at_will" stands on "carries stolen voices" — the call offered no separate quote and needs none (1b)
[reskin] clauses: "Air Elemental —" -> has (descriptive), head | "carries stolen voices" -> has (mechanical) [asked: at_will/save_single] [askMechanic: dazzle]
[reskin] body verdicts: 30 of 31 answered; not true of this body: spew, herd, drain, shell-withdraw, rally, coating, heated-body, false-appearance, absorption, bloodied-burst, resonant-body, adhesive, terrain-walk, aberrant-ground, faultless-tracker, web-walker, energy-aura, noxious-aura, uncanny-sense, marking-light, sealed-body, relic-object, warded-mending, gaze-aura, death-burst, kill-denial, hook-rider, life-drain
[reskin] signature idea (action): "The elemental hurls a knot of stolen voices at one creature it can see; the target must succeed on a Constitution saving throw or take Thunder damage and be Deafened until the end of its next turn, unable to hear its own allies' warnings." [action/save/condition] [family: mark] — menu: trample, leap, shield-bash, active-toll, ground-burst, escalating-dread, terror-pulse, push-prone, thrown-burst-seed, wind-up, execute, lure, pacify, sensory-strike, curse-debt, reveal (+ shelf: rampage, second-wind, aggro-curse, own-turn-punisher, self-invisibility, focus, stunning-strike, charge-push, pounce, charge)
[reskin] lead by this seat's own clause: action — "dazzle" from the clause this seat serves, not the sheet's "none"
[reskin] composed candidates: none action — the mark family has no grammar — composable families are payoff, body-reaction, zone
[reskin] declared mechanic leads the menu: action — dazzle: sensory-strike, reveal
[reskin] menu ordered by the idea's stamps: action — idea fires save/does condition; leading: sensory-strike (save/condition), reveal (save/condition), shield-bash (save/condition)
[reskin] classification handed to the fit call: shape=save_single when=at_will
[reskin] word match declined by the call: sensory-strike, reveal, shield-bash, escalating-dread, terror-pulse, push-prone, lure, pacify, ground-burst, execute, curse-debt — the key word does not mean the mechanic here
[reskin] signature template: active-toll -> Actions/"Stolen Voices (Recharge 5-6)" ("hurls a knot of stolen voices; Constitution save or take Thunder damage and be D [verb: deafen:idea, thunder:idea]")
[reskin] signature idea (trait): "The elemental is a churning body of storm-wind and debris; the space it occupies is heavily obscured by whirling grit, and the sound of its howling choir grants it advantage on Dexterity (Stealth) checks made to hide in wind or weather." [trait/always/defense] [family: zone] — menu: spider-climb, phobia, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, relentless-pursuit, bound, undead-fortitude, mimicry, truth-aura, fear-aura, evasion, guarded-stance (+ shelf: weapon-lodge)
[reskin] composed candidates: none trait — the zone family has no payload that does "defense" (it offers damage, condition, movement)
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does defense; leading: bloodied-fury (always/defense), death-restoration (always/defense), shielded-mind (always/defense)
[reskin] keys would have bound: trait — mimicry (stolen voice, stolen voices, voices)
[reskin] classification handed to the fit call: shape=save_single when=at_will
[reskin] trait renamed: "Stolen Voices" already names a row — the trait ships as "Mimicry"
[reskin] signature template (trait): mimicry -> Traits/"Mimicry" ("the elemental carries stolen voices, mimicking sounds it has heard [verb: stolen voice:concept, stolen voices:concept, voices:concept]")
[reskin] weapons answered: Slam = none
[reskin] languages by mind: "None" -> "Primordial" (sapient)
[reskin] print canon alignment: Chaotic Neutral -> Neutral — the Air Elemental's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Primordial" -> "Primordial (Auran)" — the Air Elemental's
[reskin] print canon speed: 40 ft. -> 10 ft. — the Air Elemental's walk; the concept's other modes stay
[reskin] print canon speed: Fly -> 90 ft. — the Air Elemental's own
[reskin] print canon attack: "Slam" -> "Thunderous Slam" — the Air Elemental's own row
[reskin] print canon multiattack: "the air elemental makes two Thunderous Slam attacks." — the Air Elemental's own
[reskin] immunities stamped for type: Elemental -> Poison; Exhaustion, Poisoned
[reskin] print canon defenses: immunities Poison; Exhaustion, Poisoned -> Poison, Thunder; Exhaustion, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained, Unconscious; resistances none -> Bludgeoning, Lightning, Piercing, Slashing — the Air Elemental's own header lines
[reskin] print canon trait: Air Form — "Air Elemental — that carries stolen voices" is the Air Elemental (print's own row)
[reskin] print canon row: Actions/Whirlwind (Recharge 4-6) — the Air Elemental's own
[reskin] free-row budget by card size: CR 5 sits in band 3-5, where print runs 2-5 rows (p20-p90, Multiattack excluded); this card already carries 5 fixed row(s), so the free-row budget is 0 rather than 1 — the card is already at print's high end
[reskin] one nova at ship: "Stolen Voices (Recharge 5-6)" un-gated to "Stolen Voices" — "Whirlwind" already carries this sheet's Recharge nova (un-gated by the one-nova rule — dice to 18, at or under the Multiattack sum (23); the action economy is the limit)
[reskin] row binds its clause: "Mimicry" answers "carries stolen voices" — the keys it matched came from that clause, so the coverage credit has a receipt
[reskin] ask vs row ok: "carries stolen voices" -> "Mimicry" — trigger at_will
audit finding below confidence gate: Thunderous Slam The attack lacks a target/range modality phrase ('one target') between the attack type and the bonus, unlike format-standard attack entries.
[reskin] audit rewrite blocked — "Multiattack" is engine-authored chassis text
[reskin] seed share: 0 of 2 signature row(s) came from a seed — the sameness metric
[reskin] signature tally: 1 seat(s) -> 2 shape(s) on the sheet · 0 expressed, 0 decoration, 0 free · accepted picks lost: 0 of 0 · path twist
```


---


### Siege Ramble — in the run

**Concept:** a siege-engine golem of lashed timber that shoulders through walls

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Siege Ramble | 8 | brute-5-juggernaut | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- **dropped clause:** "shoulders through walls"
- read: def 7 / off 10 → 8.5; sustained 54 (2 × Iron Fist); nova Trample 45; dmg 66

```
Siege Ramble

Large Construct, Lawful Neutral

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

Lightning Absorption. Whenever the ramble is subjected to Lightning damage, it takes no damage and instead regains a number of Hit Points equal to the Lightning damage dealt.

Immutable Form. The ramble can't shape-shift.

Magic Resistance. The ramble has Advantage on saving throws against spells and other magical effects.

Actions

Multiattack. The ramble makes two Iron Fist attacks.

Iron Fist. Melee Attack Roll: +8, reach 5 ft. 27 (5d8 + 5) Bludgeoning damage.

Trample (Recharge 5-6). The ramble moves up to its Speed without provoking Opportunity Attacks and can move through the spaces of Large or smaller creatures. Each creature whose space it enters is targeted once by the following effect. Dexterity Saving Throw: DC 16. Failure: 45 (13d6) Bludgeoning damage, and the target has the Prone condition. Success: Half damage only.

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
- Actions/Iron Fist — the chassis
- Actions/Trample — template trample; library draw (seed unstamped); binds the GM's words: barrel+thunder

**Engine trace**

```
[path] homebrew — "a siege-engine golem of lashed timber that shoulders through walls" (call)
[route] brute-juggernaut type=Construct mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | brute-juggernaut: ✓ ("a siege-engine golem of lashed timber") | brute-juggernaut: no line key in the words — the model's read of its quote
[concept] name: provided_name rejected — "a siege-engine golem of lashed timber…" is the description, not a name
[concept] hints: golem→canon ✓ ("a siege-engine golem of lashed timber")
[concept] resolve: archetype=brute type=Construct themes=forged/terror mind=mindless style=juggernaut energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: shouldering through walls and gates [behavior] | lashed timber beams bound with rope [body] | hurling masonry wreckage at defenders [object]
[concept] identity: A ramshackle siege-engine golem of lashed and pegged timber that opens every fight by charging the nearest wall, gate, or shield-line and shouldering straight through it in a hail of splinters and masonry, scattering whoever stood behind it. Every round after that it walks a straight line at the biggest structure or the densest cluster and repeats the breach, battering with beam-fists and hurling the wreckage it has just made, and it never breaks off to chase a lone skirmisher. It fights to total ruin: pressure only makes it pick up speed, and a bloodied siege-golem simply finds a thicker wall.
[concept] lore: Built by a forgotten army from scaffolds, battering beams, and wagon-axles bound with raw hide rope, the engine outlived its war and still walks toward the last fortress it was ordered to flatten, breaching anything in the line between.
[reskin] donor: brute-5-juggernaut -> CR 8
[reskin] [path] decides: homebrew (the matcher would have said twist Clay Golem)
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline declared: "the ramble" — the call's own answer (kind), built from the name
[reskin] inline form: "the ramble" — the model's own reading of the name
[reskin] save dc derived: DC 15 -> 16 (8 + PB 3 + the sheet's best 5) — no stat on the sheet reached it
[reskin] the sheet's declared ask: shove — the route call's one answer for the whole concept
[reskin] lacks asked: nothing taken away
[reskin] the clause is its own quote: trigger "at_will" stands on "shoulders through walls" — the call offered no separate quote and needs none (1b)
[reskin] the clause is its own quote: limit "at_will" stands on "shoulders through walls" — the call offered no separate quote and needs none (1b)
[reskin] clauses: "a siege-engine golem of lashed timber" -> has (descriptive), head | "shoulders through walls" -> has (mechanical) [asked: at_will/at_will/save_single] [askMechanic: shove]
[reskin] body verdicts: 31 of 31 answered; not true of this body: active-toll, random-ray, spew, herd, drain, shell-withdraw, rally, coating, phase-slip, heated-body, false-appearance, bloodied-burst, resonant-body, terrain-walk, aberrant-ground, faultless-tracker, web-walker, energy-aura, noxious-aura, uncanny-sense, marking-light, relic-object, warded-mending, mimicry, gaze-aura, death-burst, kill-denial, hook-rider, life-drain
[reskin] signature idea (action): "The ramble lowers a shoulder and barrels in a straight line, and each Large or smaller creature in its path must make a Strength saving throw; on a failure it is shoved aside and knocked Prone as the ramble's bulk thunders through, carrying the golem forward even through the wreckage or bodies of what it plows past." [action/save/condition] [family: breach] — menu: leap, throw-retrieve, shield-bash, ground-burst, escalating-dread, terror-pulse, push-prone, thrown-burst-seed, wind-up, trample, thrown-burst, execute, lure, pacify, sensory-strike (+ shelf: second-wind, aggro-curse, own-turn-punisher, self-invisibility, focus, stunning-strike, charge-push, pounce)
[reskin] composed candidates: none action — the breach family has no grammar — composable families are payoff, body-reaction, zone
[reskin] declared mechanic leads the menu: action — shove: shield-bash, push-prone
[reskin] menu ordered by the idea's stamps: action — idea fires save/does condition; leading: shield-bash (save/condition), push-prone (save/condition), escalating-dread (save/condition)
[reskin] keys would have bound: action — own-turn-punisher (lash)
[reskin] classification handed to the fit call: shape=save_single when=at_will often=at_will
[reskin] word match declined by the call: shield-bash, push-prone, leap, thrown-burst, ground-burst — the key word does not mean the mechanic here
[reskin] row kept the template's own name: action — "Trample" is trample's default and the call named nothing usable; on a reskinned creature that reads as catalog furniture
[reskin] free signature row: "Trample (Recharge 5-6)" — a whole-round ability the GM never asked for, but the call names the element it expresses: "shouldering through walls and gates". Earns no clause credit; the budget settles on the finished sheet
[reskin] value check: "Trample (Recharge 5-6)" EV 55 vs floor 45.6 (the whole Multiattack (2 attacks)) — dice 27 → 45 (nova budget)
[reskin] signature template: trample -> Actions/"Trample (Recharge 5-6)" ("The ramble lowers a shoulder and barrels in a straight line, each Large or small [verb: barrel:idea, thunder:idea]")
[reskin] signature idea (trait): "Whatever the ramble lashes together stays lashed: splintered beams, torn gates and broken rubble it shoulders through cling to its frame as crude plating, and each time it breaches a wall, gate or structure it regains Hit Points as it binds the fresh wreckage onto itself with roping on the fly." [trait/always/resource] [family: heal] — menu: adhesive, spider-climb, phobia, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, relentless-pursuit, bound, undead-fortitude, truth-aura, fear-aura (+ shelf: absorption, weapon-lodge)
[reskin] composed candidates: none trait — the heal family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does resource; leading: adhesive (always/condition), spider-climb (always/movement), phobia (always/condition)
[reskin] keys would have bound: trait — spider-climb (walls, wall)
[reskin] classification handed to the fit call: shape=save_single when=at_will often=at_will
[reskin] word match declined by the call: adhesive, blood-frenzy, pack-tactics, relentless-pursuit, bound — the key word does not mean the mechanic here
[reskin] closest accepted: trait — the call refused every template but named "death-restoration" as nearest and declined it for no_fit; it lands rather than the row being dropped (what it wanted: regains Hit Points when it breaks through a wall or structure)
[reskin] free signature row: trait — "death-restoration" is the call's nearest after it refused every template, so it ships as DECORATION: no receipt, no element claim, counted in the metric. Earns no clause credit
[reskin] free signature row: "Siege-Wrought Plating" — the call's nearest after it refused every template, so it ships as DECORATION: no receipt, no element claim, counted in the metric. Earns no clause credit
[reskin] signature template (trait): death-restoration -> Traits/"Siege-Wrought Plating" ("The idea is a resource mechanic: wreckage clings as plating and the ramble regai [shape fit, no verb match]")
[reskin] weapons answered: Beam-Fist = none
[reskin] languages by body: a trap-line Construct with no voice in the concept
[reskin] immunities stamped for type: Construct -> Lightning, Poison; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned
[reskin] name-canon stands down: the path answered homebrew on "a siege-engine golem of lashed timber th" and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] free-row order: "Trample" [element] > "Siege-Wrought Plating" [undefined] — a receipt row is never displaced by one without
[reskin] free row over budget: Traits/"Siege-Wrought Plating" leaves at ship — this sheet's free-row budget (1) is spent by a row that SHIPPED
[reskin] free-row budget: 2 candidate(s) reached the finished sheet, 1 kept (budget 1) — "Trample" [action/save/damage]
[reskin] asked but unanswered: "shoulders through walls" asked for at_will/at_will and no row binds the clause
[reskin] save re-derived after a retype: Actions/Trample — a Strength save for a condition the row IMPOSES, which calls for Dexterity or Constitution (A2: a condition the row merely requires does not pick the stat)
[reskin] element expressed: Trample carries "shouldering through walls and gates" — "can move through the spaces of Large or smaller creatures"
[reskin] audit rename: "Beam-Fist" -> "Iron Fist"
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] [gap] regains Hit Points when it breaks through a wall or structure — "Whatever the ramble lashes together stays lashed: splintered beams, torn gates and broken rubble it shoulders through cling to its frame as crude plating, and each time it breaches a wall, gate or structure it regains Hit Points as it binds the fresh wreckage onto itself with roping on the fly." — Siege Ramble [seat: trait [trait/always/resource]] (closest offered: death-restoration) [effect: resource] [menu: adhesive spider-climb phobia bloodied-fury blood-frenzy pack-tactics death-restoration berserk shielded-mind relentless-pursuit bound undead-fortitude truth-aura fear-aura] [same-cell unoffered: lay-on-hands second-wind volley-order] [same-seat rejected: false-appearance:legality terrain-walk:legality aberrant-ground:legality faultless-tracker:legality web-walker:legality uncanny-sense:legality earth-glide:legality tunneler:legality evasion:role marking-light:legality sealed-body:legality relic-object:legality guarded-stance:role mimicry:legality assassinate:role blurred-form:role death-burst:legality kill-denial:legality] [VETOED AFTER ACCEPTANCE: death-restoration never reached the sheet — died at the free-row budget (only 1 free row(s) allowed on this sheet)]
[reskin] signature outcome: 1 of 1 accepted signature pick(s) never reached the sheet — 1x the free-row budget
[reskin] signature tally: 2 seat(s) -> 1 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 1 of 1 (1x the free-row budget) · path homebrew
```


---


### Stone Golem — in the run

**Concept:** name: Stone Golem | carved as a weeping saint

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Stone Golem | 10 | brute-9 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 11 / off 9 → 10; sustained 48 (2 × Slam); nova Cratering Fists 35; dmg 55

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

Cratering Fists (Recharge 5-6). Dexterity Saving Throw: DC 17, each creature in a 15-foot Emanation originating from the stone golem. Failure: 35 (10d6) Bludgeoning damage. Success: Half damage.

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
- Actions/Cratering Fists — template ground-burst; library draw (seed unstamped)
- Traits/Immutable Form — print's own row
- Traits/Magic Resistance — print's own row
- Bonus Actions/Slow — print's own row

**Engine trace**

```
[path] twist — Stone Golem (is) — "Name field: Stone Golem" (code)
[route] brute-juggernaut type=Construct mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | brute-juggernaut: ✓ ("Stone Golem") | brute-juggernaut: no line key in the words — the model's read of its quote
[concept] name: "Stone Golem" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] hints: golem→canon ✓ ("carved as a weeping saint")
[concept] resolve: archetype=brute type=Construct themes=forged/grave mind=sapient style=juggernaut energy=Cold mix=both identity=✓ lore=✓
[concept] name: provided "Stone Golem"
[concept] mechanics: none claimed
[concept] signature elements: a weeping stone saint's sorrow [aura] | fists that crater stone [behavior] | hardening runnels of tears [object]
[concept] identity: A carved saint of weeping limestone, it advances at a pilgrim's unhurried pace until it is among its foes, then brings down both fists in slow, crushing arcs that crater the ground where they land. Every round it chooses the nearest person who has raised a hand against it and walks through walls, doors, and furniture to reach them, weeping runnels of mineral water that pool and harden at its feet. It never flees and never hurries; when bloodied it does not rage but simply keeps swinging, patient and sorrowful, until nothing moves in front of it.
[concept] lore: A cathedral's grief made stone, this saint was carved to intercede for the dead and rose when its prayers went unanswered, and it now walks the world that abandoned it looking for the one worshipper it was promised.
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
[reskin] the sheet's declared ask: harden — the route call's one answer for the whole concept
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Stone Golem — carved as a weeping saint" -> has (descriptive), head
[reskin] body verdicts: 31 of 31 answered; not true of this body: active-toll, random-ray, spew, herd, drain, shell-withdraw, rally, coating, heated-body, absorption, bloodied-burst, resonant-body, adhesive, terrain-walk, aberrant-ground, web-walker, energy-aura, noxious-aura, uncanny-sense, marking-light, sealed-body, relic-object, mimicry, gaze-aura, death-burst, kill-denial, hook-rider, life-drain
[reskin] signature idea (action): "The golem reaches for the spot where a wounded foe stands and drives both fists down, cratering the ground in an emanation of shattered stone and hardening tears. Each creature of its choice in the area must make a Dexterity saving throw or take Bludgeoning damage and be knocked Prone, with the ground left as Difficult Terrain until the golem moves." [action/save/condition] [family: nova] — menu: trample, leap, thrown-burst, throw-retrieve, shield-bash, ground-burst, escalating-dread, terror-pulse, push-prone, thrown-burst-seed, wind-up, lure, pacify, sensory-strike, reveal (+ shelf: rampage, second-wind, aggro-curse, own-turn-punisher, self-invisibility, focus, stunning-strike, charge-push, pounce, charge)
[reskin] composed candidates: none action — the nova family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: action — idea fires save/does condition; leading: shield-bash (save/condition), escalating-dread (save/condition), terror-pulse (save/condition)
[reskin] word match declined by the call: shield-bash, push-prone, leap, trample — the key word does not mean the mechanic here
[reskin] free signature row: action — "ground-burst" quotes nothing the GM typed and matches no key-table verb, but the call names the element it expresses: "fists that crater stone" — a receipt the trait seat can produce. Earns no clause credit; the twist/class path allows 1 and this is number 1
[reskin] seat takes its clause: "Cratering Fists (Recharge 5-6)" is HANDED "carved as a weeping saint" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature template: ground-burst -> Actions/"Cratering Fists (Recharge 5-6)" ("drives both fists down, cratering the ground in an emanation of shattered stone; [shape fit, no verb match]")
[reskin] signature idea (trait): "The saint's mineral tears run down its body and pool where it stands; at the start of each of its turns, one patch of ground within its reach hardens into a grasping ridge of limestone. A creature standing there must succeed on a Strength saving throw or be Restrained until it breaks free, as the golem walks on and the stone closes over the abandoned spot." [trait/start_of_turn/condition] [family: zone] — menu: false-appearance, spider-climb, phobia, faultless-tracker, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, relentless-pursuit, bound, warded-mending, undead-fortitude, truth-aura, fear-aura (+ shelf: weapon-lodge)
[reskin] composed candidates on the menu: trait — composed:zone:condition:poisoned, composed:zone:condition:frightened, composed:zone:condition:deafened, composed:zone:condition:blinded (the zone family's options, built before the call looks)
[reskin] menu ordered by the idea's stamps: trait — idea fires start_of_turn/does condition; leading: truth-aura (start_of_turn/condition), fear-aura (start_of_turn/condition), composed:zone:condition:poisoned (start_of_turn/condition)
[reskin] keys would have bound: trait — false-appearance (stone)
[reskin] word match declined by the call: truth-aura, fear-aura, warded-mending, phobia, faultless-tracker, berserk, false-appearance, spider-climb, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, shielded-mind, relentless-pursuit, bound, undead-fortitude — the key word does not mean the mechanic here
[reskin] closest refused: trait — "composed:zone:condition:poisoned" was named closest but was never on this sheet's menu (a gate refused it, or the pool did not offer it for this idea's declared trigger)
[reskin] decline reason: trait — the call answered none and names it "no_fit" — the GM's words key false-appearance, which the pool did not offer for this idea's declared trigger (since 2026-10-27 the keys rank and gate but no longer inject)
[reskin] key match declined: trait — "false-appearance" is keyed by the GM's stone and was on the call's menu, which the call read as a collision, not the mechanic; since 2026-10-26 the words no longer seat it first — the idea's stamps order the menu — so this records a decline, not an overruled nomination
[reskin] signature miss: trait — "The saint's mineral tears run down its body and pool where it stands; at the start of each of its turns, one patch of ground within its reach hardens into a grasping ridge of limestone. A creature standing there must succeed on a Strength saving throw or be Restrained until it breaks free, as the golem walks on and the stone closes over the abandoned spot." [trait/start_of_turn/condition] — the model found no template that holds it (offered: truth-aura, fear-aura, composed:zone:condition:poisoned, composed:zone:condition:frightened, composed:zone:condition:deafened, composed:zone:condition:blinded, warded-mending, phobia, faultless-tracker, berserk, false-appearance, spider-climb, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, shielded-mind, relentless-pursuit, bound, undead-fortitude)
[reskin] weapons answered: Fist = none; Stone Hurl = none; Grieving Weight = none
[reskin] languages by mind: "None" -> "Understands the languages of its creator but can't speak" (sapient)
[reskin] print canon languages: "Understands the languages of its creator but can't speak" -> "Understands Common plus two other languages but can't speak" — the Stone Golem's
[reskin] print canon speed: 40 ft. -> 30 ft. — the Stone Golem's walk; the concept's other modes stay
[reskin] print canon attack: "Fist" -> "Slam" — the Stone Golem's own row
[reskin] print canon multiattack: "the stone golem makes two attacks, using Slam or Force Bolt in any combination." — the Stone Golem's own
[reskin] print canon attack: "Force Bolt" is print's own row — +9, 22 (4d10), range 120 ft. (an exact body at print's CR)
[reskin] print canon attack: "Stone Hurl" -> "Force Bolt" — the Stone Golem's own ranged row
[reskin] immunities stamped for type: Construct -> Poison; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned
[reskin] print canon defenses: immunities Poison; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned -> Poison, Psychic; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned — the Stone Golem's own header lines
[reskin] name-canon trait stamped: Immutable Form (the name says so; print says what it does)
[reskin] name-canon trait stamped: Magic Resistance (the name says so; print says what it does)
[reskin] print canon trait: Immutable Form — print's text replaces the chassis's (the Troll regenerates 15, not the chassis's 10 — critic's audit 2026-10-02)
[reskin] print canon trait: Magic Resistance — print's text replaces the chassis's (the Troll regenerates 15, not the chassis's 10 — critic's audit 2026-10-02)
[reskin] print canon row: Bonus Actions/Slow (Recharge 5-6) — the Stone Golem's own
[reskin] vulnerability rejected — "Thunder" has no warrant in the concept's own text (print's default is none)
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 1) — "Cratering Fists" [action/save/damage]
audit finding below confidence gate: Cratering Fists A 15-foot Emanation on a Large (10-ft) base extends 15 feet beyond every edge, which the GM must derive from geometry not stated in the block, and the emanation is not spatially anchored to a defined origin point.
[reskin] audit rewrite blocked — "Multiattack" is engine-authored chassis text
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] [gap] holds a creature in place with the Restrained condition until it breaks free — "The saint's mineral tears run down its body and pool where it stands; at the start of each of its turns, one patch of ground within its reach hardens into a grasping ridge of limestone. A creature standing there must succeed on a Strength saving throw or be Restrained until it breaks free, as the golem walks on and the stone closes over the abandoned spot." — Stone Golem [seat: trait [trait/start_of_turn/condition]] (closest offered: composed:zone:condition:poisoned) [effect: condition] [menu: truth-aura fear-aura composed:zone:condition:poisoned composed:zone:condition:frightened composed:zone:condition:deafened composed:zone:condition:blinded warded-mending phobia faultless-tracker berserk false-appearance spider-climb bloodied-fury blood-frenzy pack-tactics death-restoration shielded-mind relentless-pursuit bound undead-fortitude] [same-cell unoffered: noxious-aura gaze-aura] [same-seat rejected: energy-aura:legality noxious-aura:legality gaze-aura:legality] [row dropped]
[reskin] signature outcome: 1 of 1 accepted signature pick(s) never reached the sheet — 1x the call named no template for the pick
[reskin] signature tally: 2 seat(s) -> 1 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 1 of 1 (1x the call named no template for the pick) · path twist
```


---


### Plaguebearing Archon — in the run

**Concept:** a plague-bearing archon of flies that commands lesser swarms

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Plaguebearing Archon | 13 | defender-8-leader | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- **dropped clause:** "commands lesser swarms"
- read: def 9 / off 16 → 12.5; sustained 93 (3 × Blade); nova Brood Burst 31; dmg 93

```
Plaguebearing Archon

Medium Celestial, Lawful Neutral

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

Resistances Radiant

Immunities Charmed

Senses darkvision 60 ft.; Passive Perception 11

Languages Common

CR 13 (XP 10,000; PB +5)

Traits

Brood Burst. The first time the archon is Bloodied in a fight, it releases a burst. Constitution Saving Throw: DC 17, each creature in a 30-foot Emanation originating from the archon. Failure: 31 (9d6) Poison damage, and the target has the Blinded condition until the end of its next turn. Success: Half damage only.

Aura of Authority. While in a 10-foot Emanation originating from the archon, the archon and its allies have Advantage on attack rolls and saving throws, provided the archon doesn't have the Incapacitated condition.

Actions

Multiattack. The archon makes three attacks, using Blade or Plagueclad Fist in any combination. It can replace one attack with a use of Swarm Sightsting.

Blade. Melee Attack Roll: +10, reach 5 ft. 18 (3d8 + 5) Slashing damage plus 13 (3d8) Poison damage.

Plagueclad Fist. Melee Attack Roll: +10, reach 5 ft. 29 (7d6 + 5) Bludgeoning damage.

Swarm Sightsting. Constitution Saving Throw: DC 17, each creature in a 30-foot Cone. Failure: The target has the Blinded condition until the end of the archon's next turn.

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

- Traits/Brood Burst — template bloodied-burst; library draw (seed unstamped); binds the GM's words: burst+half its
- Traits/Aura of Authority — the chassis
- Actions/Multiattack — the chassis
- Actions/Blade — the chassis
- Actions/Plagueclad Fist — the chassis
- Actions/Swarm Sightsting — template sensory-strike; library draw (seed unstamped)

**Engine trace**

```
[path] homebrew — "a plague-bearing archon of flies that commands lesser swarms" (call)
[route] defender-leader type=Celestial mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | defender-leader: ✓ ("commands lesser swarms") | defender-leader: key "commands" (class verb)
[concept] hints: winged→style ✓ ("an archon of flies") | swarm→body ✓ ("commands lesser swarms")
[concept] resolve: archetype=defender type=Celestial themes=celestial/venomous mind=sapient style=leader energy=Poison mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: command over lesser fly swarms [behavior] | body of radiant, plague-bearing flies [body] | plague aura of judgment [aura]
[concept] identity: The Plaguebearing Archon descends on a churning column of its own flies, opening with a directive shriek that hurls lesser swarms into the enemy's faces while it circles above on light-shot wings. Each round it stays in the thick of its brood, parrying blows with a blade of hardened radiance and answering threats by condensing a new swarm from the air to replace the fallen. It is arrogant and unhurried, never fleeing — it relocates in a shriek of glittering insects and punishes the wounded with targeted strikes.
[concept] lore: Once a celestial appointed to carry plague-laden judgment between the planes, the Archon's flock grew until it could no longer tell its own will from the hum of the plague it spreads.
[reskin] donor: defender-8-leader -> CR 13 (invented — no printed peer)
[reskin] [path] decides: homebrew (the matcher agrees)
[reskin] ranged row off: "Hybrid Attack" keeps its melee half only
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline declared: "the archon" — the call's own answer (kind), built from the name
[reskin] inline form: "the archon" — the model's own reading of the name
[reskin] damage type by the row's own noun: "Blade" Piercing -> Slashing
[reskin] the sheet's declared ask: command — the route call's one answer for the whole concept
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a plague-bearing archon of flies" -> has (descriptive), head | "commands lesser swarms" -> has (mechanical) [asked: save_single] [askMechanic: command]
[reskin] body verdicts: 29 of 29 answered; not true of this body: energy-aura, hook-rider, adhesive, shell-withdraw, sealed-body, random-ray, heated-body, resonant-body, absorption, false-appearance, terrain-walk, web-walker, faultless-tracker, uncanny-sense, noxious-aura, gaze-aura, seal, active-toll, mimicry, warded-mending
[reskin] signature idea (action): "The archon levels its blade at a foe and shrieks a directive: one of its fly swarms peels away and pours down that creature's throat and eyes. The target must succeed on a Constitution saving throw or have the Poisoned condition and be unable to speak or cast spells with verbal components until the end of its next turn, as the brood chokes its lungs and mouth." [action/save/condition] [family: mark] — menu: throw-retrieve, shield-bash, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, thrown-burst, execute, lure, pacify, escalating-dread, sensory-strike (+ shelf: patient-defense, lay-on-hands, second-wind, volley-order, aggro-curse, own-turn-punisher, self-invisibility, rally, riposte, stunning-strike, charge-push, life-drain, contagion)
[reskin] composed candidates: none action — the mark family has no grammar — composable families are payoff, body-reaction, zone
[reskin] declared mechanic leads the menu: action — command: herd
[reskin] menu ordered by the idea's stamps: action — idea fires save/does condition; leading: herd (save/movement), shield-bash (save/condition), terror-pulse (save/condition)
[reskin] keys would have bound: action — contagion (plague, plagued)
[reskin] classification handed to the fit call: shape=save_single
[reskin] word match declined by the call: sensory-strike, pacify, push-prone, shield-bash, reveal — the key word does not mean the mechanic here
[reskin] closest accepted: action — the call refused every template but named "sensory-strike" as nearest and declined it for no_fit; it lands rather than the row being dropped (what it wanted: imposes Poisoned and silences speech and verbal casting until the end of the tar)
[reskin] pick kept on the GM's own words: action — "sensory-strike" has no key-table verb, but the call quotes "a plague bearing archon of flies that commands lesser swarms" from the description
[reskin] value check: "Choking Swarm" EV 33 vs floor 15.6 (one attack of 3) — widened to a 30-foot Cone (print writes this row as an area: Repulsion Breath, Blinding Breath); over the ceiling but a control row (no damage, no KO) — print leaves these ungated
[reskin] signature template: sensory-strike -> Actions/"Choking Swarm" ("The idea is a single-target Constitution save that saddles the target with Poiso [shape fit, no verb match]")
[reskin] signature idea (trait): "The archon is not one body but a column of light-shot flies holding a shape; when it is reduced to half its hit points, the column bursts outward and reforms from its scattered brood, and any creature within the emanation is Blinded until the end of its next turn by the stinging cloud." [trait/always/condition] [family: nova] — menu: spider-climb, phobia, aberrant-ground, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, relentless-pursuit, bound, marking-light, relic-object, guarded-stance, undead-fortitude, truth-aura, fear-aura, kill-denial (+ shelf: bloodied-burst, weapon-lodge)
[reskin] composed candidates: none trait — the nova family has no grammar — composable families are payoff, body-reaction, zone
[reskin] declared mechanic leads the menu: trait — command: pack-tactics
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does condition; leading: pack-tactics (always/damage), phobia (always/condition), berserk (always/condition)
[reskin] classification handed to the fit call: shape=save_single
[reskin] free signature row: "Brood Burst" — the trait seat cannot quote the GM, but the call names the element it expresses: "body of radiant, plague-bearing flies". Earns no clause credit; the homebrew path allows 1 and this is number 1
[reskin] signature template (trait): bloodied-burst -> Traits/"Brood Burst" ("the column bursts outward when reduced to half its hit points and any creature i [verb: burst:idea, half its:idea]")
[reskin] weapons answered: Blade = none; Swarm Slam = none
[reskin] weapon declined: "Blade" reads longsword from its name, but the call answered none — the row carries no weapon
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] immunities stamped for type: Celestial -> Charmed
[reskin] resistances derived: Radiant
[reskin] name-canon stands down: the path answered homebrew on "a plague-bearing archon of flies that co" and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] multiattack replacement clause: It can replace one attack with a use of Choking Swarm.
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 1) — "Brood Burst" [trait/on_being_hit/damage]
[reskin] element expressed: Brood Burst carries "body of radiant, plague-bearing flies" — "31 (9d6) Poison damage"
audit finding below confidence gate: Brood Burst The trait is named for a brood and releases a plague-bearing burst, but the text never establishes that the archon carries a brood or swarm body that produces the burst.
[reskin] audit rename: "Choking Swarm" -> "Swarm Sightsting"
[reskin] audit rename: "Swarm Slam" -> "Plagueclad Fist"
[reskin] seed share: 0 of 2 signature row(s) came from a seed — the sameness metric
[reskin] [gap] imposes Poisoned and silences speech and verbal casting until the end of the target's next turn, not merely one sensory  — "The archon levels its blade at a foe and shrieks a directive: one of its fly swarms peels away and pours down that creature's throat and eyes. The target must succeed on a Constitution saving throw or have the Poisoned condition and be unable to speak or cast spells with verbal components until the end of its next turn, as the brood chokes its lungs and mouth." — Plaguebearing Archon [seat: action [action/save/condition]] (closest offered: sensory-strike) [effect: condition] [menu: herd shield-bash terror-pulse push-prone reveal lure pacify escalating-dread sensory-strike ground-burst obstacle-pull slow-bolt disarm curse-debt wind-up thrown-burst execute throw-retrieve] [same-cell unoffered: swallow gaze-single snare seal random-ray snare-bolt] [same-seat rejected: swallow:legality trample:role leap:role gaze-single:role snare:role reel:role condition-payoff:role seal:legality hook-drag:legality active-toll:legality pull-through:role random-ray:legality spew:role burrow-ambush:legality snare-bolt:role thrown-burst-seed:role drain:role exploiter:legality blighted-ground:role] [landed: sensory-strike]
[reskin] signature tally: 2 seat(s) -> 2 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 0 of 1 · path homebrew
```


---


### Purple Worm — in the run

**Concept:** name: Purple Worm | that swallowed a war-band's armoury

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Purple Worm | 15 | brute-13 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- **dropped clause:** "swallowed a war-band's armoury"
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

Weapon Lodge. When a creature hits the purple worm with a nonmagical weapon, the weapon lodges in the purple worm's body. A lodged weapon can be pulled free by a creature within reach that succeeds on a DC 21 Strength (Athletics) check as an action; while lodged, the purple worm can use it: its Bite attacks deal an extra 22 (5d8) Acid damage per lodged weapon (maximum two).

Tunneler. The purple worm can burrow through solid rock at half its Burrow Speed and leaves a 10-foot-diameter tunnel in its wake.

Actions

Multiattack. The purple worm makes one Bite attack and one Tail Stinger attack. It can replace one attack with a use of Gullet Drag.

Bite. Melee Attack Roll: +14, reach 10 ft. 22 (3d8 + 9) Piercing damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 22), and it has the Restrained condition until the grapple ends.

Tail Stinger. Melee Attack Roll: +14, reach 10 ft. 16 (2d6 + 9) Piercing damage plus 35 (10d6) Poison damage.

Gullet Drag. Strength Saving Throw: DC 21, one Huge or smaller creature within 60 feet. Failure: The target is pulled up to 30 feet straight toward the purple worm by its grinding gullet and has the Grappled condition (escape DC 22). While Grappled this way,

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
- Actions/Gullet Drag — template hook-drag; library draw (seed unstamped); binds the GM's words: drag+pull+claw
- Traits/Weapon Lodge — template weapon-lodge; library draw (seed unstamped)
- Traits/Tunneler — print's own row
- Bonus Actions/Swallow — print's own row

**Engine trace**

```
[path] twist — Purple Worm (is) — "Name field: Purple Worm" (code)
[route] brute-grappler type=Monstrosity mechanics=grapple, engulf — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: on the GM's own words "swallowed" | brute-grappler: ✓ ("swallowed") | brute-grappler: no line key in the words — the model's read of its quote
[concept] name: "Purple Worm" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] resolve: archetype=brute type=Monstrosity themes=devouring/subterranean mind=bestial style=grappler energy=Acid mix=both identity=✓ lore=✓
[concept] name: provided "Purple Worm"
[concept] mechanics: grapple, engulf
[concept] signature elements: swallowed armoury grinding in its gut [object] | bursting from the earth to engulf prey | acid-worn chitin plating studded with swallowed blades [body]
[concept] identity: A purple worm that has swollen around the swallowed arsenal of a war-band, its gut a churning scrapyard of blade and haft, it burrows to ambush and erupts beneath a formation, biting and then engulfing prey so the swallowed steel grinds them as they pass down its throat. Every round it lunges and engulfs again, spitting the half-crushed husk of armor from a maw rimmed in jagged, swallowed iron, and a battered band that wounds it only feels it thrash harder, wedging more lost arms into its coiled hide. It never flees; once bloodied it devours with a mindless, sated focus until the last prey is scrap in its belly.
[concept] lore: Deep in old war-torn badlands, a purple worm swallowed an entire routed war-band's baggage train and grew around the loot, and now it surfaces wherever armies march, hungry for fresh armor to feed the furnace within.
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
[reskin] the sheet's declared ask: swallow — the route call's one answer for the whole concept
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Purple Worm —" -> has (descriptive), head | "swallowed a war-band's armoury" -> has (mechanical) [asked: save_area] [askMechanic: burst]
[reskin] body verdicts: 28 of 28 answered; not true of this body: herd, drain, shell-withdraw, rally, heated-body, false-appearance, absorption, bloodied-burst, adhesive, aberrant-ground, faultless-tracker, web-walker, energy-aura, noxious-aura, marking-light, sealed-body, relic-object, warded-mending, mimicry, gaze-aura, death-burst, hook-rider, life-drain
[reskin] menu pruned: action — thrown-burst-seed (the sheet cannot render them)
[reskin] signature idea (action): "When the purple worm's Bite hits a creature, it can immediately try to drag the target down its throat: the target must succeed on a Strength saving throw or be pulled into the worm's gullet, where the swallowed armoury's blades grind it — the target is Restrained and takes Acid damage at the start of each of its turns until it claws free. While a creature is inside, the worm's gut-shrill shudders" [rider/on_hit/condition] [family: drag] — menu: contagion, stunning-strike, charge-push, pounce, charge (+ shelf: swallow, condition-payoff, shield-bash, hook-drag, burrow-ambush, escalating-dread, terror-pulse, push-prone, exploiter, execute, lure, pacify, sensory-strike, curse-debt, reveal, second-wind, aggro-curse, own-turn-punisher, self-invisibility, focus, coating)
[reskin] lead by this seat's own clause: action — "burst" from the clause this seat serves, not the sheet's "swallow"
[reskin] composed candidates: none action — the drag family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: action — idea fires on_hit/does condition; leading: contagion (on_hit/condition), stunning-strike (on_hit/condition), pounce (on_hit/condition)
[reskin] keys would have bound: action — swallow (swallow, swallows, swallowed)
[reskin] classification handed to the fit call: mechanic=grapple, engulf shape=save_area
[reskin] word match declined by the call: contagion, stunning-strike, pounce, charge-push, charge, exploiter, condition-payoff — the key word does not mean the mechanic here
[reskin] signature template: hook-drag -> Actions/"Gullet Drag" ("The Bite hit drags the target into the worm's gullet, where it is Restrained and [verb: drag:idea, pull:idea, claw:idea]")
[reskin] signature idea (trait): "The worm's swollen gut is a furnace of swallowed iron: whenever it takes Piercing or Slashing damage from a weapon strike, the jarred blades grind together and the worm's own thrashing wedges them deeper — it gains a shard of swallowed metal as a guttering second maw, and its next Bite deals Acid damage in place of Piercing as the hoarded steel heats and spits." [trait/on_being_hit/damage] [family: body-reaction] — menu: resonant-body, weapon-lodge (+ shelf: spider-climb, phobia, terrain-walk, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, uncanny-sense, earth-glide, tunneler, berserk, shielded-mind, relentless-pursuit, bound, undead-fortitude, truth-aura, fear-aura, kill-denial)
[reskin] lead by this seat's own clause: trait — "burst" from the clause this seat serves, not the sheet's "swallow"
[reskin] composed candidates on the menu: trait — composed:body-reaction:damage:t0, composed:body-reaction:damage:t1, composed:body-reaction:damage:t2 (the body-reaction family's options, built before the call looks)
[reskin] menu ordered by the idea's stamps: trait — idea fires on_being_hit/does damage; leading: resonant-body (on_being_hit/damage), composed:body-reaction:damage:t0 (on_being_hit/damage), composed:body-reaction:damage:t1 (on_being_hit/damage)
[reskin] keys would have bound: trait — tunneler (worm)
[reskin] classification handed to the fit call: mechanic=grapple, engulf shape=save_area
[reskin] word match declined by the call: resonant-body, composed:body-reaction:damage:t0, composed:body-reaction:damage:t1, composed:body-reaction:damage:t2, spider-climb, uncanny-sense — the key word does not mean the mechanic here
[reskin] closest accepted: trait — the call refused every template but named "weapon-lodge" as nearest and declined it for no_fit; it lands rather than the row being dropped (what it wanted: gains stored swallowed weapons that change its next Bite's damage type)
[reskin] free signature row: trait — "weapon-lodge" is the call's nearest after it refused every template, so it ships as DECORATION: no receipt, no element claim, counted in the metric. Earns no clause credit
[reskin] decoration renamed: "Swallowed Armoury" borrowed the GM's own words "swallowed, armoury" for a row that expresses nothing — it takes "Weapon Lodge", the template's own name
[reskin] free signature row: "Weapon Lodge" — the call's nearest after it refused every template, so it ships as DECORATION: no receipt, no element claim, counted in the metric. Earns no clause credit
[reskin] seat takes its clause: "Weapon Lodge" is HANDED "swallowed a war-band's armoury" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature template (trait): weapon-lodge -> Traits/"Weapon Lodge" ("The idea is about the worm's gut hoarding swallowed blades and that metal alteri [shape fit, no verb match]")
[reskin] weapons answered: Bite = none; Gut Spray = none
[reskin] chassis nova: "Gut Spray (Recharge 5-6)" — the brute-13's own nova row (its "Area Nova", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] print canon speed: 40 ft. -> 50 ft. — the Purple Worm's walk; the concept's other modes stay
[reskin] print canon speed: Burrow -> 50 ft. — the Purple Worm's own
[reskin] print canon row: Actions/Tail Stinger — the Purple Worm's second melee row, beside the chassis's
[reskin] print canon multiattack: "the purple worm makes one Bite attack and one Tail Stinger attack." — the Purple Worm's own
[reskin] languages held: None stands — INT 1 on a Monstrosity speaks nothing, whatever the mind read said
[reskin] print canon trait: Tunneler — "Purple Worm — that swallowed a war-band's armoury" is the Purple Worm (print's own row)
[reskin] print canon: chassis row leaves — Actions/"Gut Spray (Recharge 5-6)" is the seat's nova, not the Purple Worm's
[reskin] print canon row: Bonus Actions/Swallow — the Purple Worm's own
[reskin] multiattack replacement clause: It can replace one attack with a use of Gullet Drag.
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 1) — "Weapon Lodge" [trait/on_being_hit/resource]
[reskin] sameness: 1 of 1 free row(s) express nothing their rules carry — counted as decoration ("Weapon Lodge")
[reskin] audit rewrite blocked — "Multiattack" is engine-authored chassis text
[reskin] seed share: 0 of 2 signature row(s) came from a seed — the sameness metric
[reskin] [gap] gains stored swallowed weapons that change its next Bite's damage type — "The worm's swollen gut is a furnace of swallowed iron: whenever it takes Piercing or Slashing damage from a weapon strike, the jarred blades grind together and the worm's own thrashing wedges them deeper — it gains a shard of swallowed metal as a guttering second maw, and its next Bite deals Acid damage in place of Piercing as the hoarded steel heats and spits." — Purple Worm [seat: trait [trait/on_being_hit/damage]] (closest offered: weapon-lodge) [effect: damage] [menu: resonant-body composed:body-reaction:damage:t0 composed:body-reaction:damage:t1 composed:body-reaction:damage:t2 weapon-lodge spider-climb uncanny-sense] [same-cell unoffered: heated-body bloodied-burst ward-retaliation snap-shot riposte] [same-seat rejected: heated-body:legality absorption:legality bloodied-burst:legality] [landed: weapon-lodge]
[reskin] signature tally: 1 seat(s) -> 2 shape(s) on the sheet · 0 expressed, 1 decoration, 1 free · accepted picks lost: 0 of 1 · path twist
[reskin] one mechanic, at most twice: "Gullet Drag" drops its Restrained rider — 3 rows imposed it and print has none with three; the row, its damage and its name all stay
[reskin] record reconciled: "Gullet Drag" keeps Grappled and drops Restrained — only those clauses left
[reskin] escape dc: Bite, Gullet Drag → DC 22 (8 + PB + STR; a late row wore another number)
```


---


### Pit Fiend — in the run

**Concept:** name: Pit Fiend | who collects the oaths of dying knights

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Pit Fiend | 20 | caster-21 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- **dropped clause:** "collects the oaths of dying knights"
- read: def 21 / off 8 → 14.5; sustained 26 (1 × Devilish Claw); nova none; dmg 26

```
Pit Fiend

Large Fiend, Lawful Evil

AC 21
Initiative +2 (12)

HP 337 (27d10 + 189)

Speed 30 ft., Fly 60 ft. (hover)

MOD
SAVE
STR
26
+8
+8
INT
22
+6
+12
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

Multiattack. The pit fiend makes one Bite attack, two Devilish Claw attacks, and one Fiery Mace attack. It can replace one attack with a use of (A) Merciless Strike or (B) Spellcasting to cast Bestow Curse.

Bite. Melee Attack Roll: +14, reach 10 ft. 18 (3d6 + 8) Piercing damage. If the target is a creature, it must make the following saving throw. Constitution Saving Throw: DC 21. Failure: The target has the Poisoned condition. While Poisoned, the target can't regain Hit Points and takes 21 (6d6) Poison damage at the start of each of its turns, and it repeats the save at the end of each of its turns, ending the effect on itself on a success. After 1 minute, it succeeds automatically.

Devilish Claw. Melee Attack Roll: +14, reach 10 ft. 26 (4d8 + 8) Necrotic damage.

Spellcasting. The pit fiend casts one of the following spells, requiring no Material components and using Intelligence as the spellcasting ability (spell save DC 20):

- At Will: Bestow Curse, Hold Person, Fear
- 1/Day Each: Wall of Fire (level 5 version)

Merciless Strike. The pit fiend speaks the oath back at it. Constitution Saving Throw: DC 21, one creature within 60 feet that has the Frightened condition. Failure: 58 (13d8) Fire damage, and the target has the Prone condition. Success: Half damage.

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
- Actions/Devilish Claw — print's own row, renamed
- Actions/Spellcasting — the chassis
- Actions/Merciless Strike — template condition-payoff; library draw (seed unstamped)
- Actions/Hellfire Spellcasting — print's own row

**Engine trace**

```
[path] twist — Pit Fiend (is) — "Name field: Pit Fiend" (code)
[route] caster-binder (controller) type=Fiend mechanics=none — casts: implied by the kind — "collects the oaths of dying knights" | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | caster-binder: ✓ ("collects the oaths of dying knights") | defender: the call read "knights" as not meaning that mechanic here — no override | caster-binder stands: every key that would override it was read as a figure of speech | caster-binder: no line key in the words — the model's read of its quote
[concept] name: "Pit Fiend" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] resolve: archetype=caster type=Fiend themes=fiendish/voice mind=sapient style=binder energy=Fire mix=both identity=✓ lore=✓
[concept] name: provided "Pit Fiend"
[concept] mechanics: none claimed
[concept] signature elements: collecting the oaths of the dying [behavior] | voice that binds a sworn word [behavior] | iron hide of trapped vows [body]
[concept] identity: A pit fiend of oath-keeping circles dying knights in its binding rings and catches the last sworn word before the soul slips free, sealing each vow into the iron of its hide. It opens by cursing the loudest foe into a name-bound silence, then spends every round stripping actions — freezing a charging knight mid-stride, turning an ally's blade aside with a single spoken term of the old contract. It does not flee and does not finish quickly; it lets the wounded run a few steps, then calls their own oath back at them to drag them down.
[concept] lore: Forged in the lowest courts of the Hells, the oath-collector was made to hold what mortals swear at the moment they die, and it drags every broken promise back down as evidence against its debtor.
[reskin] print canon route: the Pit Fiend's body outranks the binder seat — no verb in the words names it; the plain caster line
[reskin] print canon defenses: HP 284 -> 337, AC 20 -> 21 — the Pit Fiend's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 26, DEX 14, CON 24, INT 22, WIS 18, CHA 24 — the Pit Fiend's at its own CR; attack +14 -> +14, DC 21 (print's)
[reskin] donor: caster-21 -> CR 20
[reskin] [path] decides: twist on the Pit Fiend (the matcher agrees)
[reskin] print canon: "Pit Fiend — who collects the oaths of dying knights" heads on the Pit Fiend — print's rows ride along; the seat stays
[reskin] ranged row off: "Hybrid Attack" keeps its melee half only
[reskin] repair round 1: 1 defect(s) — "Sealing Claw" is an anatomical name dealing Slashing on a mind-driven attacker (the attack bonus keys to INT) — print pays physical damage on mental strikes with implement names (the Dryad's Vine Lash, the Rakshasa's Cursed Touch) or carries a magical type (the Mage's Arcane Burst deals Force); rename to a conjured implement or pick a magical type
[reskin] mental-anatomy stamp: "Sealing Claw" Slashing -> Fire (repair exhausted; the engine picks the magical type)
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline by rule: "the pit fiend" — the call answered "the pit fiend" (kind), which the name does not support
[reskin] inline form: "the pit fiend" — the model's own reading of the name
[reskin] spell DC coherence: DC 21 -> 20 off Intelligence 22 (print's array stays)
[reskin] the sheet's declared ask: curse — the route call's one answer for the whole concept
[reskin] lacks asked: nothing taken away
[reskin] the clause is its own quote: limit "at_will" stands on "collects the oaths of dying knights" — the call offered no separate quote and needs none (1b)
[reskin] clauses: "Pit Fiend —" -> has (descriptive), head | "collects the oaths of dying knights" -> has (mechanical) [asked: on_death/at_will/condition] [askMechanic: curse]
[reskin] body verdicts: 31 of 31 answered; not true of this body: gaze-single, snare, snare-bolt, herd, drain, zone-seed, rally, phase-slip, false-appearance, absorption, bloodied-burst, terrain-walk, aberrant-ground, web-walker, noxious-aura, uncanny-sense, marking-light, relic-object, warded-mending, mimicry, gaze-aura, blurred-form, death-burst, life-drain
[reskin] menu pruned: action — thrown-burst-seed (the sheet cannot render them)
[reskin] signature idea (action): "The pit fiend speaks a dying creature's own oath back at it — naming the vow still unbroken on a creature within reach that has the Frightened or Poisoned condition. *Charisma Saving Throw*: the target takes Psychic damage as the words turn in its mouth, and on a failure it has the Restrained condition as iron ring-seals close around its limbs, wrenching the vow taut." [action/save/condition] [family: payoff] — menu: condition-payoff, execute, seal, lure, obstacle-pull, pacify, escalating-dread, slow-bolt, sensory-strike, curse-debt, reveal, shield-bash, terror-pulse, push-prone (+ shelf: delayed-brand, lay-on-hands, aggro-curse, self-invisibility, stunning-strike, pounce)
[reskin] composed candidates: none action — the payoff family composes a rider and this is the action seat
[reskin] declared mechanic leads the menu: action — curse: seal, curse-debt, delayed-brand
[reskin] menu ordered by the idea's stamps: action — idea fires save/does condition; leading: seal (save/condition), curse-debt (save/damage), delayed-brand (start_of_turn/damage)
[reskin] keys would have bound: action — curse-debt, aggro-curse (oath)
[reskin] classification handed to the fit call: shape=condition when=on_death often=at_will
[reskin] word match declined by the call: seal, curse-debt, lure, pacify, escalating-dread, sensory-strike, reveal, shield-bash, terror-pulse, push-prone, execute, slow-bolt, obstacle-pull, delayed-brand — the key word does not mean the mechanic here
[reskin] pick kept on the GM's own words: action — "condition-payoff" has no key-table verb, but the call quotes "who collects the oaths of dying knights" from the description
[reskin] seat takes its clause: "Sworn Name Recoil" is HANDED "collects the oaths of dying knights" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature template: condition-payoff -> Actions/"Sworn Name Recoil" ("The idea names a creature already carrying a condition and then turns its words  [shape fit, no verb match]")
[reskin] signature idea (trait): "The pit fiend knows the weight of every vow burned into its hide, and a creature that breaks its word near it is drawn to account: when a creature within reach fails a saving throw against the pit fiend's spell or ability, the pit fiend can immediately make one Iron Post attack against it, its iron hide shivering with the names of the forsworn." [trait/always/damage] [family: payoff] — menu: spider-climb, phobia, faultless-tracker, energy-aura, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, shielded-mind, relentless-pursuit, bound, sealed-body, undead-fortitude, truth-aura, fear-aura, kill-denial, berserk, assassinate (+ shelf: heated-body, resonant-body)
[reskin] composed candidates: none trait — the payoff family composes a rider and this is the trait seat
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does damage; leading: blood-frenzy (always/damage), pack-tactics (always/damage), assassinate (always/damage)
[reskin] classification handed to the fit call: shape=condition when=on_death often=at_will
[reskin] word match declined by the call: kill-denial, death-restoration — the key word does not mean the mechanic here
[reskin] closest accepted: trait — the call refused every template but named "kill-denial" as nearest and declined it for no_fit; it lands rather than the row being dropped (what it wanted: harvests a token when a creature it can see drops to 0 Hit Points)
[reskin] free signature row: trait — "kill-denial" is the call's nearest after it refused every template, so it ships as DECORATION: no receipt, no element claim, counted in the metric. Earns no clause credit
[reskin] free signature row: "Oath Harvest" — the call's nearest after it refused every template, so it ships as DECORATION: no receipt, no element claim, counted in the metric. Earns no clause credit
[reskin] seat takes its clause: "Oath Harvest" is HANDED "collects the oaths of dying knights" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature template (trait): kill-denial -> Traits/"Oath Harvest" ("The pit fiend knows the weight of every vow burned into its hide, and a creature that breaks its word near it is drawn to account: when a creature within reach  [shape fit, no verb match]")
[reskin] one mechanic, one name: Actions/"Sworn Name Recoil" -> "Merciless Strike" — this row is condition-payoff and does what every condition-payoff row does; a bespoke name would promise more than the text delivers
[reskin] weapons answered: Iron Post = none; Sealing Claw = none; Oathbrand = none
[reskin] chassis nova: "Oathbrand (Recharge 5-6)" — the caster-21's own nova row (its "Area Nova", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] languages by mind: "Infernal; understands all languages but can only speak the binding terms of old contracts" -> "Infernal" (sapient)
[reskin] print canon size: Huge -> Large — the Pit Fiend's
[reskin] print canon languages: "Infernal" -> "Infernal; telepathy 120 ft." — the Pit Fiend's
[reskin] print canon speed: Fly -> 60 ft. — the Pit Fiend's own
[reskin] print canon attack: "Iron Post" -> "Bite" — the Pit Fiend's own row
[reskin] print canon attack: "Sealing Claw" -> "Devilish Claw" — the Pit Fiend's own row
[reskin] print canon multiattack: "the pit fiend makes one Bite attack, two Devilish Claw attacks, and one Fiery Mace attack." — the Pit Fiend's own
[reskin] immunities stamped for type: Fiend -> Poison; Poisoned
[reskin] print canon skills: "Arcana +12, Perception +10" -> "Perception +10, Persuasion +19" — the Pit Fiend's own skills, each derived from this sheet's stat and PB
[reskin] print canon defenses: immunities Poison; Poisoned -> Fire, Poison; Poisoned; resistances none -> Cold — the Pit Fiend's own header lines
[reskin] resistances derived withheld: print's Pit Fiend owns the line (Cold)
[reskin] print canon trait: Diabolical Restoration — "Pit Fiend — who collects the oaths of dying knights" is the Pit Fiend (print's own row)
[reskin] print canon trait: Fear Aura — "Pit Fiend — who collects the oaths of dying knights" is the Pit Fiend (print's own row)
[reskin] print canon trait: Magic Resistance — "Pit Fiend — who collects the oaths of dying knights" is the Pit Fiend (print's own row)
[reskin] print canon: chassis row leaves — Actions/"Oathbrand (Recharge 5-6)" is the seat's nova, not the Pit Fiend's
[reskin] print canon legendary: the chassis's Legendary Actions leave — the Pit Fiend has none of its own at its CR
[reskin] print canon: chassis row leaves — Reactions/"Protective Magic (3/Day)" is the seat's, not the Pit Fiend's
[reskin] print canon row: Actions/Hellfire Spellcasting (Recharge 4-6) — the Pit Fiend's own
[reskin] multiattack replacement clause: It can replace one attack with a use of (A) Merciless Strike or (B) Spellcasting to cast *Bestow Curse*.
[reskin] free-row budget by card size: CR 20 sits in band 17-20, where print runs 7-9 rows (p20-p90, Multiattack excluded); this card already carries 9 fixed row(s), so the free-row budget is 0 rather than 1 — the card is already at print's high end
[reskin] free row over budget: Traits/"Oath Harvest" leaves at ship — this sheet's free-row budget (0) is spent by a row that SHIPPED
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 0 kept (budget 0)
[reskin] asked but unanswered: "collects the oaths of dying knights" asked for on_death/at_will and no row binds the clause
[reskin] lint fixed: prone-duration — the lint's own deterministic surgery, applied before the gate reads the sheet
[reskin] audit rewrite blocked — "Multiattack" is engine-authored chassis text
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] [gap] harvests a token when a creature it can see drops to 0 Hit Points — "The pit fiend knows the weight of every vow burned into its hide, and a creature that breaks its word near it is drawn to account: when a creature within reach fails a saving throw against the pit fiend's spell or ability, the pit fiend can immediately make one Iron Post attack against it, its iron hide shivering with the names of the forsworn." — Pit Fiend [seat: trait [trait/always/damage]] (closest offered: kill-denial) [effect: resource] [menu: blood-frenzy pack-tactics assassinate spider-climb phobia faultless-tracker bloodied-fury death-restoration shielded-mind relentless-pursuit bound sealed-body undead-fortitude kill-denial berserk energy-aura heated-body resonant-body truth-aura fear-aura] [same-cell unoffered: throw-retrieve death-burst own-turn-punisher coating] [same-seat rejected: false-appearance:legality adhesive:role terrain-walk:legality aberrant-ground:legality web-walker:legality uncanny-sense:legality earth-glide:legality tunneler:legality evasion:role marking-light:legality relic-object:legality guarded-stance:role mimicry:legality blurred-form:legality death-burst:legality] [VETOED AFTER ACCEPTANCE: kill-denial never reached the sheet — died at the free-row budget (only 0 free row(s) allowed on this sheet)]
[reskin] signature outcome: 1 of 1 accepted signature pick(s) never reached the sheet — 1x the free-row budget
[reskin] signature tally: 2 seat(s) -> 1 shape(s) on the sheet · 0 expressed, 0 decoration, 0 free · accepted picks lost: 1 of 1 (1x the free-row budget) · path twist
[reskin] record reconciled: "Devilish Claw" no longer imposes Poisoned — the clause left, so the record goes with it
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
[concept] signature elements: beak and hooked talons [body] | screaming cornered frenzy when bloodied [behavior] | hybrid owl-bear bulk in thick hide [body]
[concept] identity: The owlbear crashes out of cover in a shrieking, beak-first charge, closing to maul with hooked talons and a bone-shearing bite. Every round after, it stands and trades, shrugging blows off its thick hide and battering the nearest target with forelimb swipes; once bloodied it does not retreat but redoubles into a cornered frenzy, dragging down whatever it can reach until one side stops moving.
[concept] lore: An owlbear is the misbegotten hybrid of owl and bear, a territorial woodland monstrosity that claims a hunting range and savages anything larger than a hare that strays into it.
[reskin] print canon defenses: HP 66 -> 59, AC 12 -> 13 — the Owlbear's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 20, DEX 12, CON 17, INT 3, WIS 12, CHA 7 — the Owlbear's at its own CR; attack +5 -> +7, DC 15 (print's)
[reskin] donor: brute-2 -> CR 3
[reskin] [path] decides: exact on the Owlbear (the matcher agrees)
[reskin] print canon: "Owlbear" is a print creature — the seats stand down; print's own rows are the composition
[reskin] class kit: none — the exact path takes no class kit
[reskin] inline by rule: "the owlbear" — the call answered "the owlbear" (kind), which the name does not support
[reskin] inline form: "the owlbear" — the model's own reading of the name
[reskin] save dc derived: DC 12 -> 15 (8 + PB 2 + the sheet's best 5) — no stat on the sheet reached it
[reskin] the sheet's declared ask: none — the route call named no mechanic
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Owlbear" -> has (descriptive), head
[reskin] body verdicts: 31 of 31 answered; not true of this body: active-toll, random-ray, herd, drain, shell-withdraw, rally, coating, heated-body, false-appearance, absorption, bloodied-burst, resonant-body, adhesive, terrain-walk, aberrant-ground, faultless-tracker, web-walker, energy-aura, noxious-aura, uncanny-sense, marking-light, sealed-body, relic-object, warded-mending, mimicry, gaze-aura, death-burst, life-drain
[reskin] weapons answered: Bite = none
[reskin] print canon speed: modes climb — the Owlbear's
[reskin] print canon senses: "darkvision 60 ft." — the Owlbear's
[reskin] speed by concept: added Climb 30 ft. — the concept's movement set decides
[reskin] print canon speed: 30 ft. -> 40 ft. — the Owlbear's walk; the concept's other modes stay
[reskin] print canon speed: Climb -> 40 ft. — the Owlbear's own
[reskin] print canon attack: "Bite" -> "Rend" — the Owlbear's own row
[reskin] print canon multiattack: "the owlbear makes two Rend attacks." — the Owlbear's own, added (the chassis carried none; the Owlbear makes two Rend attacks — canaries 2026-10-12)
[reskin] languages held: None stands — INT 3 on a Monstrosity speaks nothing, whatever the mind read said
[reskin] print canon skills: "Athletics +7, Perception +3" -> "Perception +5" — the Owlbear's own skills, each derived from this sheet's stat and PB
[reskin] audit rewrite blocked — "Multiattack" is engine-authored chassis text
[reskin] signature tally: 2 seat(s) -> 0 shape(s) on the sheet · 0 expressed, 0 decoration, 0 free · accepted picks lost: 0 of 0 · path exact
```


---


### Vashka the Red — in the run

**Concept:** name: Vashka the Red | A hobgoblin warlord in lacquered plate who fights from a shield wall and never breaks ranks.

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Vashka the Red | 6 | defender-5 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok | ok |

- donor · soft · print-rows: rows outside print, the named seat and the keyed seeds: Traits/Unbroken Formation
- **dropped clause:** "fights from a shield wall"
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

Traits

Unbroken Formation. While an ally within 30 feet of Vashka is subject to an effect that would move it or knock it Prone, That ally can't be moved against its will or has the Prone condition by the effect, as Vashka holds the line.

Actions

Multiattack. Vashka makes three Longsword attacks. It can replace one attack with a use of Shield Bash.

Longsword. Melee Attack Roll: +7, reach 5 ft. 11 (2d6 + 4) Slashing damage.

Shield Bash. Strength Saving Throw: DC 15, one creature within 5 feet that Vashka can see. Failure: 9 (2d4 + 4) Bludgeoning damage. If the target is a Medium or smaller creature, it has the Prone condition.

Bonus Actions

Formation Command (2/Day). Each ally within 30 feet of Vashka gains 11 (2d10) Temporary Hit Points.

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

- Traits/Unbroken Formation — authored for this sheet; the GM's clause "never breaks ranks"
- Actions/Multiattack — the chassis
- Actions/Longsword — print's own row, renamed; weapon longsword
- Actions/Shield Bash — print's own row
- Reactions/Riposte — template riposte; fighter kit; the GM's clause "warlord"
- Bonus Actions/Formation Command — template rally; library draw (seed unstamped); the GM's clause "fights from a shield wall"; binds the GM's words: shield+command

**Engine trace**

```
[path] class_npc — class fighter — "warlord" (call)
[route] defender type=Humanoid mechanics=aura — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | defender: ✓ ("fights from a shield wall and never brea") | defender-leader: "warlord" is a noun (a title), not a verb — no override | defender: key "shield wall" (class verb)
[concept] name: "Vashka the Red" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] resolve: archetype=defender type=Humanoid themes=armed/forged mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: provided "Vashka the Red"
[concept] mechanics: aura
[concept] signature elements: lacquered plate and shield-wall formation [object] | never breaking ranks [behavior] | punishing anyone who moves past [behavior]
[concept] identity: Vashka the Red opens the fight by planting his lacquered shield and raining disciplined, punishing thrusts on any who close to melee, anchored at the center of a locked shield wall that grinds forward in perfect step. Every round he holds the line, choosing his moment to shove a shield-bound foe back or skewer anyone who tries to slip past, and he answers flanking attempts by simply not breaking formation. Under pressure he never breaks ranks: he fights to the death, tightening the wall and answering bloodied retreat with a cold, mocking challenge.
[concept] lore: Vashka the Red is a hobgoblin warlord who rose by never losing a single soldier under his command, and he wants nothing more than to be the immovable center of an empire built on unbreakable shield walls.
[reskin] [path] class body: the fighter stands on the Gladiator — the class's own print block, nearest CR 6
[reskin] print canon defenses: HP 91 -> 112, AC 19 -> 16 — the Gladiator's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon armor: 16 (studded leather, shield) — print's Gear line; the 2014 sheet prints it (the Goblin Boss wore "splint", canaries 2026-10-12)
[reskin] print canon array: STR 18, DEX 15, CON 16, INT 10, WIS 12, CHA 15 — the Gladiator's at its own CR; attack +7 -> +7, DC 15 (print's)
[reskin] donor: defender-5 -> CR 6
[reskin] [path] decides: class_npc on the Gladiator · class fighter (the matcher would have said homebrew)
[reskin] print canon: "Vashka the Red — A hobgoblin warlord in lacquered plate who fights from a shield wall and never breaks ranks." heads on the Gladiator — print's rows ride along; the seat stays
[reskin] class kit: guarded-stance yields — AC 16 already beats print's 15 at CR 6, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] class kit: fighter — "warlord": Riposte (riposte)
[reskin] proper noun: "Vashka the Red" — the Name field is a person, not a kind (no print match, no article in the words)
[reskin] inline declared: "Vashka" — the call's own answer (person), built from the name
[reskin] inline form: "Vashka" — the model's own reading of the name
[reskin] the sheet's declared ask: command — the route call's one answer for the whole concept
[reskin] lacks asked: nothing taken away
[reskin] lacks not claimed: "never breaks ranks" reads like a lack to the words, and the call's list did not name it
[reskin] clauses: "Vashka the Red — A hobgoblin warlord in lacquered plate" -> has (descriptive), head | "fights from a shield wall" -> has (mechanical) [asked: attack] | "never breaks ranks" -> has (mechanical)
[reskin] body verdicts: 25 of 25 answered; not true of this body: seal, active-toll, random-ray, shell-withdraw, false-appearance, absorption, bloodied-burst, resonant-body, adhesive, terrain-walk, aberrant-ground, faultless-tracker, web-walker, uncanny-sense, marking-light, sealed-body, warded-mending, mimicry, gaze-aura, kill-denial, hook-rider, life-drain
[reskin] menu pruned: action — snap-shot (the sheet cannot render them)
[reskin] signature idea (action): "Vashka barks a command that snaps his shield wall into motion. Each ally of his within the Guard Aura can immediately move up to its Speed without provoking Opportunity Attacks, provided it ends its movement adjacent to another ally of Vashka's; any ally that does so gains Advantage on its next attack roll this round." [action/always/movement] [family: sentinel] — menu: throw-retrieve, shield-bash, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up (+ shelf: patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, feint-slip, stunning-strike, charge-push)
[reskin] composed candidates: none action — the sentinel family has no grammar — composable families are payoff, body-reaction, zone
[reskin] declared mechanic leads the menu: action — command: herd, rally
[reskin] menu ordered by the idea's stamps: action — idea fires always/does movement; leading: herd (save/movement), rally (always/movement), throw-retrieve (always/damage)
[reskin] keys would have bound: action — rally (shield)
[reskin] classification handed to the fit call: mechanic=aura shape=attack
[reskin] word match declined by the call: shield-bash, push-prone, wind-up — the key word does not mean the mechanic here
[reskin] closest accepted: action — the call refused every template but named "rally" as nearest and declined it for no_fit; it lands rather than the row being dropped (what it wanted: grants allies movement that doesn't provoke Opportunity Attacks and Advantage on)
[reskin] signature template: rally -> Bonus Actions/"Formation Command (2/Day)" ("The idea is a command bark that shifts allies into formation, letting them move  [verb: shield:concept, command:idea]")
[reskin] keys spent by the action: shield
[reskin] trait cards excluded — verb spent by the action: guarded-stance
[reskin] signature idea (trait): "Vashka's … wall grinds forward in perfect step. Whenever Vashka is within 5 feet of at least one ally who is not Incapacitated, he and those allies each gain a bonus to AC, and Vashka ignores difficult terrain created by debris or caltrops as long as he remains in formation." [trait/always/defense] [family: payoff] — menu: spider-climb, phobia, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, relentless-pursuit, bound, relic-object, guarded-stance, undead-fortitude, truth-aura, fear-aura, evasion
[reskin] composed candidates: none trait — the payoff family composes a rider and this is the trait seat
[reskin] declared mechanic leads the menu: trait — command: pack-tactics
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does defense; leading: pack-tactics (always/damage), bloodied-fury (always/defense), death-restoration (always/defense)
[reskin] keys would have bound: trait — pack-tactics, spider-climb (ranks, never breaks ranks, walls, wall)
[reskin] classification handed to the fit call: mechanic=aura shape=attack
[reskin] word match declined by the call: pack-tactics, blood-frenzy, relentless-pursuit — the key word does not mean the mechanic here
[reskin] closest refused: trait — "guarded-stance" was named closest but was never on this sheet's menu (a gate refused it, or the pool did not offer it for this idea's declared trigger)
[reskin] decline reason: trait — the call answered none and names it "no_fit" — the GM's words key pack-tactics, spider-climb, which the pool did not offer for this idea's declared trigger (since 2026-10-27 the keys rank and gate but no longer inject)
[reskin] key match declined: trait — "pack-tactics" is keyed by the GM's ranks+never breaks ranks and was on the call's menu, which the call read as a collision, not the mechanic; since 2026-10-26 the words no longer seat it first — the idea's stamps order the menu — so this records a decline, not an overruled nomination
[reskin] signature miss: trait — "Vashka's … wall grinds forward in perfect step. Whenever Vashka is within 5 feet of at least one ally who is not Incapacitated, he and those allies each gain a bonus to AC, and Vashka ignores difficult terrain created by debris or caltrops as long as he remains in formation." [trait/always/defense] — the model found no template that holds it (offered: pack-tactics, bloodied-fury, death-restoration, shielded-mind, relic-object, guarded-stance, undead-fortitude, evasion, spider-climb, phobia, blood-frenzy, berserk, relentless-pursuit, bound, truth-aura, fear-aura)
[reskin] concept-first trait skipped: spider-climb — the GM's words key it, but the call was offered it on this seat's menu and declined
[reskin] concept-first trait skipped: pack-tactics — the call read its match as a collision (the word is a modifier, or the sheet already answers it)
[reskin] repair: 1 clause(s) with no row — "never breaks ranks"; one targeted call with the sheet as context
[reskin] repair answer: attacks 0, saves 0, traits 1, reactions 0, answered [], unplaced []
[reskin] condition relation: "Unbroken Formation" — the call reads its condition as immune, so no condition is recorded against it
[reskin] repaired sheet: 2 attack row(s), 0 save, 1 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] weapons answered: Lacquered Plate Blade = longsword; Wall Spear = spear
[reskin] weapon table: "Wall Spear" — thrown, range 20/60
[reskin] print canon alignment: Lawful Neutral -> Neutral — the Gladiator's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common, Goblin" -> "Common, Goblin" — the Gladiator's plus the concept's Goblin
[reskin] print canon attack: "Spear" keeps print's hybrid frame — reach 5 ft. or range 20/60 ft. (the Gladiator's weapon is thrown)
[reskin] print canon attack: "Lacquered Plate Blade" -> "Spear" — the Gladiator's own row
[reskin] print canon rows: Wall Spear leave — the Gladiator has one melee row (Spear), and Multiattack reads print's
[reskin] print canon multiattack: "Vashka makes three Spear attacks. It can replace one attack with a use of Shield Bash." — the Gladiator's own
[reskin] print canon skills: "Athletics +7, Perception +4" -> "Athletics +10, Performance +5" — the Gladiator's own skills, each derived from this sheet's stat and PB
[reskin] print canon: chassis row leaves — Traits/"Guard Aura" is the chassis's filler — on a class body the kit owns the class's rows
[reskin] print canon row: Actions/Shield Bash — the Gladiator's own
[reskin] class weapon: Actions/"Spear" -> "Longsword" — a fighter fights with a longsword, not the Gladiator's
[reskin] dead name still carried — "Shield Bash" names a row that is still on the sheet; no sweep
[reskin] free-row budget by card size: CR 6 sits in band 6-9, where print runs 3-5 rows (p20-p90, Multiattack excluded); this card already carries 5 fixed row(s), so the free-row budget is 0 rather than 1 — the card is already at print's high end
[reskin] row binds its clause: "Formation Command" answers "fights from a shield wall" — the keys it matched came from that clause, so the coverage credit has a receipt
[reskin] lint fixed: prone-vocab — the lint's own deterministic surgery, applied before the gate reads the sheet
audit finding below confidence gate: Unbroken Formation The trait applies to allies within 30 feet but does not state whether Vashka must be able to see the ally or whether the effect originates from the ally's movement; the trigger is adjudicable but the range check is ambiguous if multiple allies are affected simultaneously by a single area effect.
[reskin] audit rewrite blocked — "Unbroken Formation" is engine-authored chassis text
[reskin] seed share: 0 of 2 signature row(s) came from a seed — the sameness metric
[reskin] clause id by substring: "Riposte" carries "warlord" which is not a whole clause — the seat surgery cut it; resolved to cl_zvh3r1
[reskin] [gap] grants allies movement that doesn't provoke Opportunity Attacks and Advantage on their next attack roll — "Vashka barks a command that snaps his shield wall into motion. Each ally of his within the Guard Aura can immediately move up to its Speed without provoking Opportunity Attacks, provided it ends its movement adjacent to another ally of Vashka's; any ally that does so gains Advantage on its next attack roll this round." — Vashka the Red [seat: action [action/always/movement]] (closest offered: rally) [effect: movement] [menu: herd rally throw-retrieve obstacle-pull slow-bolt disarm aggro-curse shield-bash ground-burst terror-pulse push-prone curse-debt reveal wind-up] [same-cell unoffered: blink spider-climb terrain-walk aberrant-ground web-walker earth-glide tunneler relentless-pursuit bound zone-seed self-invisibility focus feint-slip phase-slip] [same-seat rejected: zone-seed:role] [landed: rally]
[reskin] [gap] grants a bonus to AC to the creature and its nearby allies (and lets it ignore debris/caltrop difficult terrain) while i — "Vashka's … wall grinds forward in perfect step. Whenever Vashka is within 5 feet of at least one ally who is not Incapacitated, he and those allies each gain a bonus to AC, and Vashka ignores difficult terrain created by debris or caltrops as long as he remains in formation." — Vashka the Red [seat: trait [trait/always/defense]] (closest offered: guarded-stance) [effect: defense] [menu: pack-tactics bloodied-fury death-restoration shielded-mind relic-object guarded-stance undead-fortitude evasion spider-climb phobia blood-frenzy berserk relentless-pursuit bound truth-aura fear-aura] [same-cell unoffered: false-appearance shell-withdraw uncanny-sense patient-defense sealed-body mimicry blurred-form] [same-seat rejected: false-appearance:legality adhesive:legality terrain-walk:legality aberrant-ground:legality faultless-tracker:legality web-walker:legality uncanny-sense:legality earth-glide:legality tunneler:legality marking-light:legality sealed-body:legality mimicry:legality assassinate:role blurred-form:role death-burst:role kill-denial:legality] [row dropped]
[reskin] signature outcome: 1 of 2 accepted signature pick(s) never reached the sheet — 1x the call named no template for the pick
[reskin] signature tally: 2 seat(s) -> 2 shape(s) on the sheet · 0 expressed, 0 decoration, 0 free · accepted picks lost: 1 of 2 (1x the call named no template for the pick) · path class_npc
[reskin] record completed: "Unbroken Formation" imposes Prone by its own text and carried no record — the fill site that wrote it owes this field (template=chassis)
```


---


### Scythebrood Ravener — in the run

**Concept:** A Large insectile horror. It has four scythe-arms, a spitting maw, and a shell that sheds acid. It fights by pinning prey with two arms and carving with the others.

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Scythebrood Ravener | 9 | brute-8-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- **dropped clause:** "a shell that sheds acid"
- **dropped clause:** "carving with the others"
- read: def 7 / off 9 → 8; sustained 62 (2 × Spitting Maw); nova none; dmg 62

```
Scythebrood Ravener

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

Four Scythe-Arms. The ravener has four scythe-arms; while it has a creature Grappled, it can still make a Spitting Maw attack against another creature.

Actions

Multiattack. The ravener makes two attacks, using Spitting Maw or Scythe-Arm Pin in any combination. It can replace one attack with a use of Merciless Strike.

Spitting Maw. Melee Attack Roll: +8, reach 10 ft. 31 (6d8 + 4) Piercing damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 16).

Merciless Strike. The ravener carves the seams where shell meets flesh. Constitution Saving Throw: DC 15, one creature within 30 feet that has the Grappled condition. Failure: 63 (14d8) Acid damage. Success: Half damage.

Scythe-Arm Pin. Melee Attack Roll: +8, reach 5 ft. 31 (6d8 + 4) Piercing damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 16).

Bonus Actions

Swallow. The ravener swallows one Medium or smaller creature it is grappling. While swallowed, the target has the Blinded and Restrained conditions, has Total Cover against attacks and other effects outside the ravener, and takes 10 (3d6) Acid damage at the start of each of the ravener's turns. The ravener can have only one creature swallowed at a time. If the ravener takes 25 damage or more on a single turn from the swallowed creature, the ravener must regurgitate the target at the end of that turn, and the target exits Prone in an unoccupied space within 10 feet of the ravener. If the ravener dies, a swallowed creature exits the body Prone by using 10 feet of movement.

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
- Actions/Merciless Strike — template condition-payoff; library draw (seed unstamped)
- Actions/Scythe-Arm Pin — authored for this sheet; the GM's clause "It fights by pinning prey with two arms"
- Bonus Actions/Swallow — binds the GM's words: swallow+swallows+engulf+engulfs+devour+devours+gulp+smother+entomb+cocoon+whelm
- Traits/Four Scythe-Arms — authored for this sheet; the GM's clause "It has four scythe-arms"

**Engine trace**

```
[path] homebrew — "A Large insectile horror. It has four scythe-arms, a spitting maw, and a shell t" (call)
[route] brute-grappler type=Monstrosity mechanics=grapple, engulf — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: on the GM's own words "pinning prey with two arms" | brute-grappler: ✓ ("pinning prey with two arms") | brute-grappler: no line key in the words — the model's read of its quote
[concept] resolve: archetype=brute type=Monstrosity themes=venomous/grasping mind=bestial style=grappler energy=Acid mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: grapple, engulf
[concept] signature elements: two arms pin while two carve [behavior] | four scythe-arms [body] | acid-shedding shell [body]
[concept] identity: The horror opens by spitting a searing gout from its maw to scatter and blind a cluster of prey, then lunges to pin the weakest with two scythe-arms while the other pair carves methodically at the softest seams. Every round it repeats the two-and-two rhythm, shedding acid from its shell at anything that presses close, and it never disengages — a wounded shell only makes it cling tighter and carve faster, fighting to the death over its catch.
[concept] lore: Hatched in the fouled hollows beneath a drowned hive, it seeks only to stock its larder with warm, screaming meat and will strip a caravan to the bone before the acid in its shell has finished dripping.
[reskin] donor: brute-8-grappler -> CR 9
[reskin] [path] decides: homebrew (the matcher agrees)
[reskin] named parts: Spitting Maw (slot, Grappled) — the user's words, the engine's numbers
[reskin] named parts landed: 1 attack row(s), 0 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline declared: "the ravener" — the call's own answer (kind), built from the name
[reskin] inline form: "the ravener" — the model's own reading of the name
[reskin] the sheet's declared ask: grapple — the route call's one answer for the whole concept
[reskin] lacks asked: nothing taken away
[reskin] clauses: "A Large insectile horror" -> has (header) | "It has four scythe-arms" -> has (mechanical) [asked: attack] | "a spitting maw" -> has (mechanical) [asked: save_single] [askMechanic: dazzle] | "a shell that sheds acid" -> has (mechanical) [asked: on_being_hit/attack] [askMechanic: retaliate] | "It fights by pinning prey with two arms" -> has (mechanical) [asked: on_hit/attack] [askMechanic: grapple] | "carving with the others" -> has (mechanical) [asked: attack]
[reskin] body verdicts: 30 of 30 answered; not true of this body: active-toll, random-ray, herd, drain, rally, heated-body, false-appearance, absorption, resonant-body, adhesive, terrain-walk, aberrant-ground, faultless-tracker, web-walker, energy-aura, uncanny-sense, marking-light, sealed-body, relic-object, warded-mending, mimicry, gaze-aura, death-burst, kill-denial, life-drain
[reskin] signature idea (action): "The ravener rakes a creature it has grappled with its free scythe-arms, carving at the seams where shell meets flesh. The grappled target must make a Constitution saving throw, taking Slashing damage and having its Speed reduced on a failed save as its hamstrung legs give way." [action/save/condition] [family: payoff] — menu: leap, condition-payoff, shield-bash, ground-burst, spew, thrown-burst-seed, wind-up, exploiter, trample, thrown-burst, execute, lure, pacify, snare-bolt (+ shelf: shell-withdraw, second-wind, aggro-curse, own-turn-punisher, self-invisibility, focus, coating, affliction, contagion, stunning-strike, charge-push, pounce)
[reskin] composed candidates: none action — the payoff family composes a rider and this is the action seat
[reskin] menu ordered by the idea's stamps: action — idea fires save/does condition; leading: shield-bash (save/condition), lure (save/condition), pacify (save/condition)
[reskin] keys would have bound: action — exploiter, spew, snare-bolt, shell-withdraw (pinned, spits, spit, shell)
[reskin] classification handed to the fit call: mechanic=grapple, engulf shape=attack
[reskin] word match declined by the call: shield-bash, snare-bolt, pacify, leap, spew, exploiter — the key word does not mean the mechanic here
[reskin] pick kept on the GM's own words: action — "condition-payoff" has no key-table verb, but the call quotes "it fights by pinning prey with two arms and carving with the others" from the description
[reskin] value check: "Carve the Seams" EV 48.8 vs floor 41.6 (one attack of 2) — worth the trade
[reskin] signature template: condition-payoff -> Actions/"Carve the Seams" ("carves at the seams where shell meets flesh — the grappled target must make a Co [shape fit, no verb match]")
[reskin] signature idea (trait): "The ravener's shell weeps a film of acid that pools and drips, leaving a slick, smoking trail behind it. The ground it has crossed this turn becomes difficult terrain and deals Acid damage to any creature that enters it." [trait/always/damage] [family: zone] — menu: spider-climb, phobia, noxious-aura, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, relentless-pursuit, bound, undead-fortitude, truth-aura, fear-aura, assassinate (+ shelf: bloodied-burst, weapon-lodge)
[reskin] composed candidates on the menu: trait — composed:zone:damage (the zone family's options, built before the call looks)
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does damage; leading: blood-frenzy (always/damage), pack-tactics (always/damage), assassinate (always/damage)
[reskin] keys would have bound: trait — fear-aura (horror)
[reskin] classification handed to the fit call: mechanic=grapple, engulf shape=attack
[reskin] word match declined by the call: blood-frenzy, pack-tactics, assassinate, noxious-aura — the key word does not mean the mechanic here
[reskin] closest refused: trait — "composed:zone:damage" was named closest but was never on this sheet's menu (a gate refused it, or the pool did not offer it for this idea's declared trigger)
[reskin] decline reason: trait — the call answered none and names it "no_fit" — the GM's words key fear-aura, which the pool did not offer for this idea's declared trigger (since 2026-10-27 the keys rank and gate but no longer inject)
[reskin] key match declined: trait — "fear-aura" is keyed by the GM's horror and was on the call's menu, which the call read as no fit; since 2026-10-26 the words no longer seat it first — the idea's stamps order the menu — so this records a decline, not an overruled nomination
[reskin] signature miss: trait — "The ravener's shell weeps a film of acid that pools and drips, leaving a slick, smoking trail behind it. The ground it has crossed this turn becomes difficult terrain and deals Acid damage to any creature that enters it." [trait/always/damage] — the model found no template that holds it (offered: blood-frenzy, pack-tactics, assassinate, spider-climb, phobia, bloodied-fury, death-restoration, berserk, shielded-mind, relentless-pursuit, bound, undead-fortitude, composed:zone:damage, noxious-aura, truth-aura, fear-aura)
[reskin] one mechanic, one name: Actions/"Carve the Seams" -> "Merciless Strike" — this row is condition-payoff and does what every condition-payoff row does; a bespoke name would promise more than the text delivers
[reskin] repair: 2 clause(s) with no row — "It has four scythe-arms", "It fights by pinning prey with two arms"; one targeted call with the sheet as context
[reskin] repair answer: attacks 1, saves 0, traits 1, reactions 0, answered [{"clause":"It fights by pinning prey with two arms","row":"Spitting Maw"}], unplaced ["description:It fights by pinning prey with two arms"]
[reskin] clause already answered: "It fights by pinning prey with two arms" is carried by "Spitting Maw" in different words — the call read the sheet and declined to answer it twice
[reskin] clause answered in prose: "It fights by pinning prey with two arms" — the call read the sheet and judged it description, not a row; the words reach the description instead
[reskin] condition relation: "Four Scythe-Arms" — the call reads its condition as requires, so no condition is recorded against it
[reskin] repaired sheet: 2 attack row(s), 0 save, 1 trait(s), 0 reaction(s); 1 clause(s) unplaced
[reskin] weapons answered: Scythe-Arm = none
[reskin] speed by concept: added Climb 40 ft. — the concept's movement set decides
[reskin] languages held: None stands — INT 4 on a Monstrosity speaks nothing, whatever the mind read said
[reskin] name-canon stands down: the path answered homebrew on "A Large insectile horror. It has four sc" and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] multiattack replacement clause: It can replace one attack with a use of Merciless Strike.
[reskin] free-row budget by card size: CR 9 sits in band 6-9, where print runs 3-5 rows (p20-p90, Multiattack excluded); this card already carries 5 fixed row(s), so the free-row budget is 0 rather than 1 — the card is already at print's high end
[reskin] asked but unanswered: "a shell that sheds acid" asked for on_being_hit and no row binds the clause
[reskin] ask vs row MISMATCH: "It fights by pinning prey with two arms" -> "Scythe-Arm Pin" — trigger: asked on_hit, row reads at_will
[reskin] save stat from print grammar: Actions/Merciless Strike imposes Grappled by its own text — no record on the row, so the grammar stood in (A2 gap)
[reskin] audit rename blocked — "Four Scythe-Arms" -> "Spitting Maw While Pinned" would drop the GM's own words "four", "scythe", "arms" from a row bound to "It has four scythe-arms"; the mechanic would stay and the receipt would not
[reskin] audit rename blocked — "Spitting Maw" is the user's own part name, a kit feature's real name, or print's own row
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] [gap] leaves a trail of hazardous terrain that damages creatures entering it — "The ravener's shell weeps a film of acid that pools and drips, leaving a slick, smoking trail behind it. The ground it has crossed this turn becomes difficult terrain and deals Acid damage to any creature that enters it." — Scythebrood Ravener [seat: trait [trait/always/damage]] (closest offered: composed:zone:damage) [effect: damage] [menu: blood-frenzy pack-tactics assassinate spider-climb phobia bloodied-fury death-restoration berserk shielded-mind relentless-pursuit bound undead-fortitude composed:zone:damage noxious-aura truth-aura fear-aura] [same-cell unoffered: throw-retrieve death-burst own-turn-punisher coating] [same-seat rejected: false-appearance:legality adhesive:legality terrain-walk:legality aberrant-ground:legality faultless-tracker:legality web-walker:legality uncanny-sense:legality earth-glide:legality tunneler:legality evasion:role marking-light:legality sealed-body:legality relic-object:legality guarded-stance:role mimicry:legality blurred-form:role death-burst:legality kill-denial:legality] [row dropped]
[reskin] signature outcome: 1 of 1 accepted signature pick(s) never reached the sheet — 1x the call named no template for the pick
[reskin] signature tally: 2 seat(s) -> 1 shape(s) on the sheet · 0 expressed, 0 decoration, 0 free · accepted picks lost: 1 of 1 (1x the call named no template for the pick) · path homebrew
!! Invalid tone dropped: ambush
!! Invalid tone dropped: brutal
!! Invalid tone dropped: desperate
```


---


### Brinewrack Midwife — in the run

**Concept:** a marsh witch who curses trespassers, cr 7

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Brinewrack Midwife | 7 | caster-8-binder | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok | ok |

- donor · soft · print-rows: rows outside print, the named seat and the keyed seeds: Actions/Trespasser's Curse
- read: def 3 / off 7 → 5; sustained 48 (3 × Arcane Burst); nova none; dmg 48

```
Brinewrack Midwife

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

Resistances Cold

Senses Passive Perception 14

Languages Common and any three languages, Sylvan

CR 7 (XP 2,900; PB +3)

Actions

Multiattack. The midwife makes three Arcane Burst attacks. It can replace one attack with a use of (A) Retributive Hex or (B) Spellcasting to cast Ray of Sickness.

Arcane Burst. Melee or Ranged Attack Roll: +6, reach 5 ft. or range 120 ft. 16 (3d8 + 3) Force damage.

Spellcasting. The midwife casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 14):

- At Will: Detect Magic, Light, Mage Armor, Mage Hand, Prestidigitation
- 2/Day Each: Fireball, Invisibility
- 1/Day Each: Cone of Cold, Fly

Retributive Hex. Dexterity Saving Throw: DC 14, one creature within 60 feet. Failure: The target is cursed until the end of the midwife's next turn. The first time the cursed target deals damage to any creature before then, it takes 10 (3d6) Necrotic damage.

Trespasser's Curse. Dexterity Saving Throw: DC 14, one creature within 60 feet. Failure: 19 (3d12) Necrotic damage.

Bonus Actions

Misty Step (3/Day). The midwife casts Misty Step, using the same spellcasting ability as Spellcasting.

Reactions

Protective Magic (3/Day). The midwife casts Counterspell or Shield in response to the spell's trigger, using the same spellcasting ability as Spellcasting.

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
- Actions/Retributive Hex — template curse-debt; library draw (seed unstamped); the GM's clause "curses trespassers"; binds the GM's words: curse+hex
- Actions/Trespasser's Curse — authored for this sheet; the GM's clause "curses trespassers"
- Reactions/Protective Magic — mage kit; the GM's clause "witch"
- Bonus Actions/Misty Step — print's own row

**Engine trace**

```
[path] class_npc — class mage — "witch" (call)
[route] caster-binder (controller) type=Humanoid mechanics=none — casts: implied by the kind — "a marsh witch who curses trespassers" | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | caster-binder: ✓ ("curses trespassers") | caster-binder: key "curses" (class verb)
[concept] hints: binder→style ✓ ("a marsh witch who curses trespassers")
[concept] resolve: archetype=caster type=Humanoid themes=arcane/grasping mind=sapient style=binder energy=Necrotic mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: curse-laying that steals actions [behavior] | bog-snaring mire and slime [behavior] | brine-soaked, weed-hung witch-body [body]
[concept] identity: The marsh witch opens the fight from the reeds with a flung curse, then spends every round layering conditions that steal turns — rooting feet in the mire, clouding minds, withering limbs — rather than trading raw blows. She fights like a trapper, patient and jeering, and under pressure she ducks back into the bog and slime to re-hex instead of fleeing, only breaking off if the water itself turns against her.
[concept] lore: She was the midwife of a drowned fen-village who bargained with the black water for the curse she now wears as skin, and she curses trespassers to teach them, one stolen choice at a time, what it means to be swallowed by the marsh.
[reskin] energy withheld: Necrotic on a Humanoid with no Necrotic in the concept's own words (fixed phrases read first)
[reskin] [path] class body: the mage stands on the Mage — the class's own print block, nearest CR 7
[reskin] print canon defenses: HP 108 -> 81, AC 15 -> 15 — the Mage's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 9, DEX 14, CON 11, INT 17, WIS 12, CHA 11 — the Mage's at its own CR; attack +7 -> +6, DC 14 (print's)
[reskin] donor: caster-8-binder -> CR 7
[reskin] [path] decides: class_npc on the Mage · class mage (the matcher would have said homebrew)
[reskin] print canon: "a marsh witch who curses trespassers, cr 7" heads on the Mage — print's rows ride along; the seat stays
[reskin] repair round 1: 3 defect(s) — "Withering Nails" deals Necrotic on a Humanoid whose concept names no Necrotic — a name is not a warrant; use a physical type | "Mire Hex" deals Necrotic on a Humanoid whose concept names no Necrotic — a name is not a warrant; use a physical type | "Bog Chill" deals Cold on a Humanoid whose concept names no Cold — a name is not a warrant; use a physical type
[reskin] class kit: mage — "witch": Protective Magic (3/Day) (Mage/Protective Magic)
[reskin] inline declared: "the midwife" — the call's own answer (kind), built from the name
[reskin] inline form: "the midwife" — the model's own reading of the name
[reskin] energy rider withheld: Necrotic on a Humanoid with no Necrotic in the concept's own words
[reskin] energy kept on a base row: "Withering Nails" Necrotic — the row's own noun pays for it
[reskin] energy kept on a base row: "Mire Hex" Necrotic — the row's own noun pays for it
[reskin] control spell gated to daily — Bestow Curse (level 3 control at will is print's CR 13+ shape; at CR 7 it is 1/Day)
[reskin] daily spell dropped — Blight (36 avg vs 17 per-hit; print's only daily damage spell is the Adult Red's Fireball at ~1.1x)
[reskin] spell DC coherence: DC 14 -> 11 off Charisma 11 (print's array stays)
[reskin] the sheet's declared ask: curse — the route call's one answer for the whole concept
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a marsh witch" -> has (descriptive), head | "curses trespassers" -> has (mechanical) [asked: save_single] [askMechanic: curse] | "cr 7" -> has (header)
[reskin] body verdicts: 31 of 31 answered; not true of this body: seal, wail, active-toll, random-ray, snare-bolt, herd, rally, phase-slip, false-appearance, absorption, bloodied-burst, resonant-body, aberrant-ground, faultless-tracker, web-walker, uncanny-sense, marking-light, sealed-body, relic-object, warded-mending, mimicry, gaze-aura, blurred-form, death-burst, kill-denial
[reskin] signature idea (action): "As a trap-stealer's curse, the midwife spits a single jeering hex at one creature she can see — a name whispered into the water. The first time the target would take an action before the end of its next turn, the curse swallows that action whole and it instead spends it retching marsh-water, taking Necrotic damage and losing the action." [action/save/condition] [family: mark] — menu: condition-payoff, lure, ground-burst, spew, obstacle-pull, pacify, escalating-dread, slow-bolt, sensory-strike, thrown-burst-seed, drain, curse-debt, zone-seed, reveal, wind-up, blighted-ground, thrown-burst, execute, shield-bash, terror-pulse, push-prone, exploiter (+ shelf: delayed-brand, lay-on-hands, aggro-curse, self-invisibility, snap-shot, life-drain, bolt-restrain, bolt-drag, bolt-mark)
[reskin] composed candidates: none action — the mark family has no grammar — composable families are payoff, body-reaction, zone
[reskin] declared mechanic leads the menu: action — curse: curse-debt, delayed-brand
[reskin] menu ordered by the idea's stamps: action — idea fires save/does condition; leading: curse-debt (save/damage), delayed-brand (start_of_turn/damage), lure (save/condition)
[reskin] classification handed to the fit call: shape=save_single
[reskin] word match declined by the call: lure, pacify, escalating-dread, sensory-strike, reveal, terror-pulse — the key word does not mean the mechanic here
[reskin] signature template: curse-debt -> Actions/"Marsh Hex" ("A whispered name-curse that swallows the target's action — the first thing the c [verb: curse:idea, hex:idea]")
[reskin] signature idea (trait): "The midwife never quite leaves the bog: while she stands in water, slime, or marsh, she is veiled in weed and murk, and creatures that cannot see through the murk find her only with the flat of a blade — ranged attacks against her miss into the reeds. She sheds this veil the instant she climbs onto dry ground." [trait/always/defense] [family: breach] — menu: spider-climb, phobia, terrain-walk, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, shielded-mind, relentless-pursuit, bound, undead-fortitude, truth-aura, fear-aura, evasion, guarded-stance
[reskin] composed candidates: none trait — the breach family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does defense; leading: bloodied-fury (always/defense), death-restoration (always/defense), shielded-mind (always/defense)
[reskin] keys would have bound: trait — terrain-walk (marsh)
[reskin] classification handed to the fit call: shape=save_single
[reskin] word match declined by the call: guarded-stance, bloodied-fury, death-restoration, shielded-mind — the key word does not mean the mechanic here
[reskin] closest accepted: trait — the call refused every template but named "fear-aura" as nearest and declined it for no_fit; it lands rather than the row being dropped (what it wanted: curses a trespasser who fails a save with a lasting magical penalty such as pois)
[reskin] free signature row: trait — "fear-aura" is the call's nearest after it refused every template, so it ships as DECORATION: no receipt, no element claim, counted in the metric. Earns no clause credit
[reskin] free signature row: "Trespasser's Curse" — the call's nearest after it refused every template, so it ships as DECORATION: no receipt, no element claim, counted in the metric. Earns no clause credit
[reskin] seat takes its clause: "Trespasser's Curse" is HANDED "curses trespassers" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature template (trait): fear-aura -> Traits/"Trespasser's Curse" ("The midwife never quite leaves the bog: while she stands in water, slime, or marsh, she is veiled in weed and murk, and creatures that cannot see through the mu [shape fit, no verb match]")
[reskin] one mechanic, one name: Traits/"Trespasser's Curse" -> "Fear Aura" — this row is fear-aura and does what every fear-aura row does; a bespoke name would promise more than the text delivers
[reskin] repair: 1 clause(s) with no row — "curses trespassers"; one targeted call with the sheet as context
[reskin] repair answer: attacks 0, saves 1, traits 0, reactions 0, answered [], unplaced []
[reskin] repaired sheet: 2 attack row(s), 1 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] weapons answered: Withering Nails = none; Mire Hex = none; Bog Chill = none; Drowning Debt = none
[reskin] print canon alignment: Neutral Evil -> Neutral — the Mage's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common, Sylvan" -> "Common and any three languages, Sylvan" — the Mage's plus the concept's Sylvan
[reskin] print canon attack: "Arcane Burst" keeps print's hybrid frame — reach 5 ft. or range 120 ft. (the Mage's weapon is thrown)
[reskin] print canon attack: "Withering Nails" -> "Arcane Burst" — the Mage's own row
[reskin] print canon multiattack: "the midwife makes three Arcane Burst attacks." — the Mage's own
[reskin] ranged row off: "Mire Hex" leaves — the Mage carries no ranged row and the words name none
[reskin] save follows the effect: Actions/"Marsh Hex" Charisma -> Dexterity — the row's point is its damage; a condition it hands out alongside does not pick the stat
[reskin] save follows the effect: Actions/"Trespasser's Curse" Charisma -> Dexterity — the row's point is its damage; a condition it hands out alongside does not pick the stat
[reskin] print canon skills: "Perception +4, Deception +3" -> "Arcana +6, History +6, Perception +4" — the Mage's own skills, each derived from this sheet's stat and PB
[reskin] resistances derived: Cold
[reskin] print canon: chassis row leaves — Actions/"Bog Chill" — the Mage prints no row for it and no path stage claimed it
[reskin] print canon row: Actions/Spellcasting — print's own list replaces the chassis's
[reskin] print canon row: Bonus Actions/Misty Step (3/Day) — the Mage's own
[reskin] multiattack replacement clause: It can replace one attack with a use of (A) Marsh Hex or (B) Spellcasting to cast *Ray of Sickness*.
[reskin] free-row budget by card size: CR 7 sits in band 6-9, where print runs 3-5 rows (p20-p90, Multiattack excluded); this card already carries 6 fixed row(s), so the free-row budget is 0 rather than 1 — the card is already at print's high end
[reskin] free row over budget: Traits/"Fear Aura" leaves at ship — this sheet's free-row budget (0) is spent by a row that SHIPPED
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 0 kept (budget 0)
[reskin] darkvision withheld: a Humanoid with no species kit granting it, no word for it in the GM's own text, and no print body that has it — print gives darkvision to 1 of 26 Humanoids ("darkvision 60 ft.; Passive Perception 14" -> "Passive Perception 14")
[reskin] row binds its clause: "Marsh Hex" answers "curses trespassers" — the keys it matched came from that clause, so the coverage credit has a receipt
[reskin] audit rewrite blocked — "Multiattack" is engine-authored chassis text
[reskin] audit rename: "Marsh Hex" -> "Retributive Hex"
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] clause id by substring: "Protective Magic (3/Day)" carries "witch" which is not a whole clause — the seat surgery cut it; resolved to cl_1enkq57
[reskin] [gap] curses a trespasser who fails a save with a lasting magical penalty such as poisoned or disadvantage — "The midwife never quite leaves the bog: while she stands in water, slime, or marsh, she is veiled in weed and murk, and creatures that cannot see through the murk find her only with the flat of a blade — ranged attacks against her miss into the reeds. She sheds this veil the instant she climbs onto dry ground." — Brinewrack Midwife [seat: trait [trait/always/defense]] (closest offered: fear-aura) [effect: condition] [menu: bloodied-fury death-restoration shielded-mind undead-fortitude evasion guarded-stance spider-climb phobia terrain-walk blood-frenzy pack-tactics relentless-pursuit bound truth-aura fear-aura] [same-cell unoffered: false-appearance shell-withdraw uncanny-sense patient-defense sealed-body relic-object mimicry blurred-form] [same-seat rejected: false-appearance:legality adhesive:role aberrant-ground:legality faultless-tracker:legality web-walker:legality uncanny-sense:legality earth-glide:legality tunneler:legality berserk:role marking-light:legality sealed-body:legality relic-object:legality mimicry:legality assassinate:role blurred-form:legality death-burst:legality kill-denial:legality] [VETOED AFTER ACCEPTANCE: fear-aura never reached the sheet — died at the free-row budget (only 0 free row(s) allowed on this sheet)]
[reskin] signature outcome: 1 of 1 accepted signature pick(s) never reached the sheet — 1x the free-row budget
[reskin] signature tally: 2 seat(s) -> 1 shape(s) on the sheet · 0 expressed, 0 decoration, 0 free · accepted picks lost: 1 of 1 (1x the free-row budget) · path class_npc
```


---


### Vow-Sworn Anchorite — in the run

**Concept:** a templar priest with a mace and no magic at all

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Vow-Sworn Anchorite | 6 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 4 / off 8 → 6; sustained 51 (3 × Mace); nova none; dmg 51

```
Vow-Sworn Anchorite

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

Aura of Authority. While in a 10-foot Emanation originating from the anchorite, the anchorite and its allies have Advantage on attack rolls and saving throws, provided the anchorite doesn't have the Incapacitated condition.

Actions

Multiattack. The anchorite makes three Mace attacks. It can replace one attack with a use of Shield Bash.

Mace. Melee Attack Roll: +7, reach 5 ft. 17 (3d8 + 4) Bludgeoning damage, and the target has Disadvantage on its next attack roll before the start of the anchorite's next turn.

Shield Bash. Strength Saving Throw: DC 15, one creature within 5 feet that the anchorite can see. Failure: 9 (2d4 + 4) Bludgeoning damage. If the target is a Medium or smaller creature, it has the Prone condition.

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
[concept] name: provided_name rejected — "a templar priest with a mace and no magi…" is the description, not a name
[concept] resolve: archetype=defender type=Humanoid themes=armed/forged mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: mace and shield in a held line [object] | no magic, only iron discipline [behavior] | punishes anyone who tries to slip past [behavior]
[concept] identity: A mace-swinging templar who anchors the front line behind his shield, daring foes to test his guard before answering with a crushing counterblow. Each round he advances a half-step and strikes at whoever tried to slip past him, pinning skirmishers to his reach with disciplined, joyless violence. He never casts, never flees, and never lets a bloodied enemy disengage — the line holds or he dies on it.
[concept] lore: Once an ordained templar of a militant order, he took a vow of silence and shed every prayer for the weight of cold iron, standing his post until the order's ruin and long after, because a vow is not something a man can be talked out of.
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
[reskin] chassis row off: Actions/"Iron Censer" leaves — the GM named a melee weapon (Mace); one weapon, one rule set
[reskin] class kit: paladin — "templar": Aura of Authority (Hobgoblin Captain/Aura of Authority)
[reskin] inline declared: "the anchorite" — the call's own answer (kind), built from the name
[reskin] inline form: "the anchorite" — the model's own reading of the name
[reskin] the sheet's declared ask: none — the route call named no mechanic
[reskin] lacks asked: "no magic at all"
[reskin] lacks refused: "a vow of silence" quotes nothing the user typed
[reskin] clauses: "a templar priest with a mace" -> has (mechanical) [asked: attack] | "no magic at all" -> LACKS (mechanical)
[reskin] body verdicts: 25 of 25 answered; not true of this body: seal, active-toll, random-ray, herd, shell-withdraw, rally, false-appearance, absorption, bloodied-burst, resonant-body, adhesive, terrain-walk, aberrant-ground, faultless-tracker, web-walker, uncanny-sense, marking-light, sealed-body, warded-mending, mimicry, gaze-aura, kill-denial, hook-rider, life-drain
[reskin] signature idea (action): "When a creature within the anchorite's reach moves away or slips past him, he answers with a crushing Mace strike: the target makes a Strength saving throw or is knocked Prone and has its Speed reduced to 0 until the end of its next turn, pinned where the line holds. Discipline, not speed — the iron falls on anyone who tests the guard." [reaction/on_being_hit/condition] [family: sentinel] — menu: riposte (+ shelf: throw-retrieve, shield-bash, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, curse-debt, reveal, wind-up, patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, stunning-strike, charge-push)
[reskin] composed candidates: none action — the sentinel family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: action — idea fires on_being_hit/does condition; leading: riposte (on_being_hit/damage), push-prone (save/condition), own-turn-punisher (always/damage)
[reskin] classification handed to the fit call: shape=attack
[reskin] word match declined by the call: push-prone, own-turn-punisher — the key word does not mean the mechanic here
[reskin] closest accepted: action — the call refused every template but named "riposte" as nearest and declined it for no_fit; it lands rather than the row being dropped (what it wanted: fires when a creature within reach moves away, then forces a Strength save to pi)
[reskin] free signature row: action — "riposte" is the call's nearest after it refused every template, so it ships as DECORATION: no receipt, no element claim, counted in the metric. Earns no clause credit
[reskin] fit declined: "Vow-Bound Reprisal" — a print body takes only what the user's words ask, and the call named none of this creature's own elements for it; the call offered no quote, and the key table finds no verb either (the blacksmith's rally, critic-ten 2026-10-01)
[reskin] fallback respects the call: push-prone, own-turn-punisher left the shelf — the call declined them for this sheet
[reskin] fallback stands down: the class_npc path has no shelf — the Gladiator's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 16 already beats print's 15 at CR 6, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "A mace-and-shield vow is a wall: while the anchorite hasn't moved since the start of its last turn, attack rolls against him have Disadvantage, and a creature he hits has Disadvantage on its next attack roll — the shield never drops and the counterblow lands on a shaken foe." [trait/always/defense] [family: payoff] — menu: spider-climb, phobia, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, relentless-pursuit, bound, relic-object, guarded-stance, undead-fortitude, truth-aura, fear-aura, evasion
[reskin] composed candidates: none trait — the payoff family composes a rider and this is the trait seat
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does defense; leading: bloodied-fury (always/defense), death-restoration (always/defense), shielded-mind (always/defense)
[reskin] classification handed to the fit call: shape=attack
[reskin] word match declined by the call: relic-object, death-restoration, bloodied-fury, undead-fortitude, spider-climb, phobia, bound — the key word does not mean the mechanic here
[reskin] row kept the template's own name: trait — "Guarded Stance" is guarded-stance's default and the call named nothing usable; on a reskinned creature that reads as catalog furniture
[reskin] free signature row: trait — "guarded-stance" quotes nothing the GM typed and matches no key-table verb, but the call names the element it expresses: "mace and shield in a held line" — a receipt the trait seat can produce. Earns no clause credit; the twist/class path allows 1 and this is number 2
[reskin] free signature row: "Guarded Stance" — the trait seat cannot quote the GM, but the call names the element it expresses: "mace and shield in a held line". Earns no clause credit; the twist/class path allows 1 and this is number 3
[reskin] signature template (trait): guarded-stance -> Traits/"Guarded Stance" ("The vow-sworn wall: while he hasn't moved, attack rolls against him have Disadva [shape fit, no verb match]")
[reskin] weapons answered: Mace = mace; Iron Censer = none
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] print canon alignment: Lawful Neutral -> Neutral — the Gladiator's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon multiattack: "the anchorite makes three Spear attacks. It can replace one attack with a use of Shield Bash." — the Gladiator's own
[reskin] print canon skills: "Athletics +7, Perception +4" -> "Athletics +10, Performance +5" — the Gladiator's own skills, each derived from this sheet's stat and PB
[reskin] print canon row: Actions/Shield Bash — the Gladiator's own
[reskin] multiattack reconciled: "Spear" is no row on this sheet — the Multiattack cites "Mace" instead
[reskin] dead name still carried — "Shield Bash" names a row that is still on the sheet; no sweep
[reskin] final price: print's Multiattack: the round ran 66 against the card's 45 — the attack rows re-solve at 72% (3 attacks off one row after a supersede)
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 1) — "Guarded Stance" [trait/always/defense]
[reskin] element claim revoked: "Guarded Stance" claims "mace and shield in a held line" but the audit judged that nothing in the row carries it; the name advertises nothing, so the row stands as decoration
[reskin] sameness: 1 of 1 free row(s) express nothing their rules carry — counted as decoration ("Guarded Stance")
[reskin] audit rewrite blocked — "Multiattack" is engine-authored chassis text
[reskin] audit rewrite blocked — "Shield Bash" is engine-authored chassis text
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] clause id by substring: "Aura of Authority" carries "templar" which is not a whole clause — the seat surgery cut it; resolved to cl_1yjcdus
[reskin] [gap] fires when a creature within reach moves away, then forces a Strength save to pin it Prone with Speed 0 — "When a creature within the anchorite's reach moves away or slips past him, he answers with a crushing Mace strike: the target makes a Strength saving throw or is knocked Prone and has its Speed reduced to 0 until the end of its next turn, pinned where the line holds. Discipline, not speed — the iron falls on anyone who tests the guard." — Vow-Sworn Anchorite [seat: action [reaction/on_being_hit/condition]] (closest offered: riposte) [effect: condition] [menu: riposte push-prone own-turn-punisher] [same-cell unoffered: none] [same-seat rejected: ward-retaliation:legality snap-shot:legality interpose:legality] [VETOED AFTER ACCEPTANCE: riposte never reached the sheet — died at an UNRECORDED drop site]
[reskin] signature outcome: 1 of 1 accepted signature pick(s) never reached the sheet — 1x an UNRECORDED drop site
[reskin] signature tally: 2 seat(s) -> 1 shape(s) on the sheet · 0 expressed, 1 decoration, 1 free · accepted picks lost: 1 of 1 (1x an UNRECORDED drop site) · path class_npc
[reskin] guarded stance withdrawn: Traits/"Guarded Stance" leaves the finished sheet — AC 16 already beats print's 15 at CR 6, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329); the menu filter had checked an AC that print canon changed afterwards
[reskin] lack took nothing: "no magic at all" removed no row and the call named no roll it spoils (costs: (unanswered)) — no flaw row, and the gap list carries it
```


---


### Squallwall Drake — in the run

**Concept:** a young storm drake whose breath is a rolling wall of thunder

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Squallwall Drake | 7 | dragon-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 5 / off 8 → 6.5; sustained 36 (2 × Bite); nova Thunder Wall 42; dmg 52

```
Squallwall Drake

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

Senses darkvision 120 ft., blindsight 30 ft.; Passive Perception 14

Languages Draconic

CR 7 (XP 2,900; PB +3)

Traits

Stormblood Slipstream. Whenever the drake is subjected to Thunder damage, it takes no damage and instead regains a number of Hit Points equal to the Thunder damage dealt.

Actions

Multiattack. The drake makes two Bite attacks.

Bite. Melee Attack Roll: +7, reach 5 ft. 11 (2d6 + 4) Piercing damage plus 7 (2d6) Thunder damage.

Thunder Wall (Recharge 5-6). Constitution Saving Throw: DC 15, each creature in a 15-foot Cone. Failure: 42 (12d6) Thunder damage. Success: Half damage.

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
- Actions/Thunder Wall — the chassis
- Traits/Stormblood Slipstream — template absorption; library draw (seed unstamped)

**Engine trace**

```
[path] homebrew — "a young storm drake whose breath is a rolling wall of thunder" (call)
[route] dragon type=Dragon mechanics=breath, aura — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | dragon: ✓ ("a young storm drake whose breath is a ro") | dragon: key "drake" (class body)
[concept] hints: dragon→body ✓ ("a young storm drake") | breath→mechanics ✓ ("breath is a rolling wall of thunder")
[concept] resolve: archetype=dragon type=Dragon themes=draconic/breath mind=bestial style=— energy=Thunder mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: breath, aura
[concept] signature elements: rolling wall of thunder breath [behavior] | storm-charged draconic body [body] | deafening shockwave that shoves prey [aura]
[concept] identity: A young storm drake spirals in on rumbling wings and opens with its breath — a rolling wall of thunder that crashes across the battlefield, shoving and deafening everything it washes over. Every round after, it repositions high and hunts for the moment to unleash the wall again, harrying with tooth and claw only when a target survives the thunder. Under pressure it grows reckless, riding the shockwave of its own roar and fighting to the death rather than yielding airspace.
[concept] lore: Hatched in the boiling cumulonimbus above the storm coast, it rides the squall line inland and claims any thunderhead as its hoard, eager to prove its wall of thunder is louder than the sky that bore it.
[reskin] body type: dragon — the body outranks the role (recorded: dragon)
[reskin] donor: dragon-2 -> CR 7
[reskin] [path] decides: homebrew (the matcher agrees)
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline declared: "the drake" — the call's own answer (kind), built from the name
[reskin] inline form: "the drake" — the model's own reading of the name
[reskin] save dc derived: DC 14 -> 15 (8 + PB 3 + the sheet's best 4) — no stat on the sheet reached it
[reskin] the sheet's declared ask: breath — the route call's one answer for the whole concept
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a young storm drake whose breath is a rolling wall of thunder" -> has (mechanical) [asked: save_area] [askMechanic: breath]
[reskin] body verdicts: 33 of 33 answered; not true of this body: gaze-single, snare, zone, seal, herd, drain, shell-withdraw, rally, coating, heated-body, false-appearance, bloodied-burst, resonant-body, adhesive, terrain-walk, aberrant-ground, faultless-tracker, web-walker, energy-aura, noxious-aura, uncanny-sense, marking-light, sealed-body, relic-object, warded-mending, mimicry, gaze-aura, blurred-form, death-burst, kill-denial, hook-rider, life-drain
[reskin] menu pruned: action — escalating-dread, terror-pulse, push-prone, thrown-burst-seed, pacify, sensory-strike, curse-debt, reveal, aggro-curse, own-turn-punisher, self-invisibility, focus (the sheet cannot render them)
[reskin] signature idea (action): "When the Squallwall Drake hits a creature with its Bite, thunder rolls through the wound and the target must succeed on a Constitution saving throw or be Deafened until the end of its next turn, unable to hear the drake's approach or its allies' calls over the ringing." [rider/on_hit/condition] [family: mark] — menu: affliction, contagion, stunning-strike, charge-push, pounce, charge (+ shelf: execute, shield-bash, lure, rampage, lay-on-hands, second-wind)
[reskin] composed candidates: none action — the mark family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: action — idea fires on_hit/does condition; leading: affliction (on_hit/condition), contagion (on_hit/condition), stunning-strike (on_hit/condition)
[reskin] classification handed to the fit call: mechanic=breath, aura shape=save_area
[reskin] closest accepted: action — the call refused every template but named "stunning-strike" as nearest and declined it for no_fit; it lands rather than the row being dropped (what it wanted: applies Deafened on a bite hit until the end of the target's next turn on a fail)
[reskin] free signature row: action — "stunning-strike" is the call's nearest after it refused every template, so it ships as DECORATION: no receipt, no element claim, counted in the metric. Earns no clause credit
[reskin] rider declined: "Ringing Bite" — a rider rides the user's own attack, so it needs the user's own ask; the call offered no quote, and the key table finds no verb either (the gong's bandaged concussion, 2026-10-01)
[reskin] signature idea (trait): "Storm-charged blood runs in the drake's veins: whenever it takes Thunder damage from any source, it can use its Reaction to let the sound roll through its body and immediately fly up to half its Fly Speed without provoking Opportunity Attacks, riding the shockwave." [trait/on_being_hit/movement] [family: payoff] — menu: absorption, weapon-lodge (+ shelf: spider-climb, phobia, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, relentless-pursuit, bound, undead-fortitude, truth-aura, fear-aura)
[reskin] composed candidates: none trait — the payoff family composes a rider and this is the trait seat
[reskin] menu ordered by the idea's stamps: trait — idea fires on_being_hit/does movement; leading: absorption (on_being_hit/defense), weapon-lodge (on_being_hit/resource), bloodied-fury (always/defense)
[reskin] keys would have bound: trait — spider-climb (walls, wall)
[reskin] classification handed to the fit call: mechanic=breath, aura shape=save_area
[reskin] word match declined by the call: absorption, weapon-lodge, bloodied-fury, blood-frenzy — the key word does not mean the mechanic here
[reskin] closest accepted: trait — the call refused every template but named "absorption" as nearest and declined it for no_fit; it lands rather than the row being dropped (what it wanted: triggered reaction that lets the creature fly half its Fly Speed after taking Th)
[reskin] pick kept on the GM's own words: trait — "absorption" has no key-table verb, but the call quotes "a young storm drake whose breath is a rolling wall of thunder" from the description
[reskin] signature template (trait): absorption -> Traits/"Stormblood Slipstream" ("The idea is a reaction-cast defensive trigger letting the drake fly half its Fly [shape fit, no verb match]")
[reskin] weapons answered: Bite = none; Thunder Wall = none
[reskin] chassis nova: "Thunder Wall (Recharge 5-6)" — the dragon-2's own nova row (its "Breath Weapon", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] element immunity: Thunder (merged into the header write)
[reskin] dragon senses raised to tier: darkvision 120 added
[reskin] dragon languages: Draconic added (42/42 print dragons speak it)
[reskin] immunities stamped for type: Dragon -> Thunder
[reskin] name-canon stands down: the path answered homebrew on "a young storm drake whose breath is a ro" and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] [gap] applies Deafened on a bite hit until the end of the target's next turn on a failed Constitution save — "When the Squallwall Drake hits a creature with its Bite, thunder rolls through the wound and the target must succeed on a Constitution saving throw or be Deafened until the end of its next turn, unable to hear the drake's approach or its allies' calls over the ringing." — Squallwall Drake [seat: action [rider/on_hit/condition]] (closest offered: stunning-strike) [effect: condition] [menu: affliction contagion stunning-strike pounce charge-push charge lure execute rampage] [same-cell unoffered: life-drain snatch bolt-restrain bolt-mark] [same-seat rejected: hook-rider:legality isolation:role life-drain:legality snatch:legality bolt-restrain:legality bolt-drag:legality bolt-mark:legality] [VETOED AFTER ACCEPTANCE: stunning-strike never reached the sheet — died at the weld (a rider needs the GM's own ask) (Ringing Bite)]
[reskin] [gap] triggered reaction that lets the creature fly half its Fly Speed after taking Thunder damage — "Storm-charged blood runs in the drake's veins: whenever it takes Thunder damage from any source, it can use its Reaction to let the sound roll through its body and immediately fly up to half its Fly Speed without provoking Opportunity Attacks, riding the shockwave." — Squallwall Drake [seat: trait [trait/on_being_hit/movement]] (closest offered: absorption) [effect: movement] [menu: absorption weapon-lodge bloodied-fury blood-frenzy] [same-cell unoffered: none] [same-seat rejected: heated-body:legality bloodied-burst:legality resonant-body:legality] [landed: absorption]
[reskin] signature outcome: 1 of 2 accepted signature pick(s) never reached the sheet — 1x the weld (a rider needs the GM's own ask)
[reskin] signature tally: 2 seat(s) -> 1 shape(s) on the sheet · 0 expressed, 0 decoration, 0 free · accepted picks lost: 1 of 2 (1x the weld (a rider needs the GM's own ask)) · path homebrew
```


---


### Well Drowned — in the run

**Concept:** name: the thing in the well | 

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Well Drowned [seed 1/2] | 5 | lurker-5-trap | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 5 / off 5 → 5; sustained 38 (2 × Slam); nova none; dmg 38

```
Well Drowned

Medium Aberration, Neutral

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

Senses darkvision 60 ft.; Passive Perception 16

Languages None

CR 5 (XP 1,800; PB +3)

Traits

Water Sight. The drowned can pinpoint the location of the water it touches within 60 feet of itself.

Actions

Multiattack. The drowned makes two Slam attacks. It can replace one attack with a use of Drowning Crush.

Slam. Melee Attack Roll: +6 (with Advantage if the target is Grappled by the drowned), reach 5 ft. 12 (2d8 + 3) Bludgeoning damage plus 7 (2d6) Acid damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 14).

Drowning Crush. Strength Saving Throw: DC 14, one creature within 30 feet that is Grappled by the drowned. Failure: 31 (9d6) Acid damage. Success: Half damage.

Bonus Actions

False Form. The drowned shape-shifts to resemble an ordinary object or fixture of the place it waits in while retaining its game statistics, or it returns to its true form. While it is motionless in its false form, it is indistinguishable from that feature.

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
- Actions/Drowning Crush — library seed exploiter
- Bonus Actions/False Form — the chassis
- Traits/Water Sight — template uncanny-sense; library draw (seed unstamped)

**Engine trace**

```
[path] homebrew — "the thing in the well" (call)
[route] lurker-trap type=Aberration mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | lurker-trap: ✓ ("the thing in the well") | lurker-trap: no line key in the words — the model's read of its quote
[concept] resolve: archetype=lurker type=Aberration themes=aquatic/devouring mind=bestial style=trap energy=Acid mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: lurking beneath a still well surface [behavior] | a brine body that lunges and engulfs [body] | the dark flooded shaft it haunts [aura]
[concept] identity: The thing in the well waits at the bottom of its shaft in the shape of still, dark water, and when a bucket or a curious face comes near it surges up the walls in a single wet lunge to drag the prey under. Every round after that it clings and engulfs, flooding mouths and lungs while its many-jointed limbs pin the victim against slick stone, and it will not let go until the body stops moving. Pressed hard or wounded, it retreats down the shaft to its flooded hollow and waits, patient and silent, for another fool to lean over the rim.
[concept] lore: A drowned hunger that seeped into an abandoned well, it wears the water's surface like a face so that thirst will keep bringing it offerings.
[reskin] donor: lurker-5-trap -> CR 5
[reskin] row gated out: Swallow (engulf) — the concept did not claim this mechanic
[reskin] [path] decides: homebrew (the matcher agrees)
[reskin] reach folded: "Grasping Limb" (reach 50) and Reel leave — no tether in the concept; the grapple rides "Melee Attack" (the Giant Crab's shape)
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline declared: "the drowned" — the call's own answer (kind), built from the name
[reskin] inline form: "the drowned" — the model's own reading of the name
[reskin] save dc derived: DC 13 -> 14 (8 + PB 3 + the sheet's best 3) — no stat on the sheet reached it
[reskin] the sheet's declared ask: none — the route call named no mechanic
[reskin] lacks asked: nothing taken away
[reskin] clauses: "the thing in the well" -> has (descriptive), head
[reskin] body verdicts: 34 of 34 answered; not true of this body: seal, wail, active-toll, random-ray, snare-bolt, blighted-ground, shell-withdraw, phase-slip, heated-body, absorption, bloodied-burst, resonant-body, adhesive, aberrant-ground, faultless-tracker, web-walker, energy-aura, noxious-aura, marking-light, relic-object, warded-mending, mimicry, gaze-aura, blurred-form, death-burst, kill-denial, life-drain
[reskin] signature idea (action): "The drowned sinks its surface-self over the rim of whatever pool or shaft it lurks in, and the still water rises as a climbing, seizing face — each creature standing on or in the water that does not pull clear feels the brine knot around its legs and cling. Creatures caught this way have the Restrained condition until they wrench free, and the drowned is not slowed by the water it spreads." [action/save/condition] [family: drag] — menu: condition-payoff, lure, ground-burst, spew, obstacle-pull, pacify, escalating-dread, terror-pulse, slow-bolt, sensory-strike, drain, zone-seed, exploiter, gaze-single, snare, shield-bash, push-prone, reveal (+ shelf: delayed-brand, patient-defense, self-invisibility, focus, feint-slip, coating, riposte, stunning-strike, charge-push, hook-rider, pounce, isolation)
[reskin] composed candidates: none action — the drag family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: action — idea fires save/does condition; leading: lure (save/condition), pacify (save/condition), escalating-dread (save/condition)
[reskin] word match declined by the call: lure, pacify, escalating-dread, terror-pulse, sensory-strike, gaze-single, reveal, condition-payoff, obstacle-pull, slow-bolt — the key word does not mean the mechanic here
[reskin] pick kept on the GM's own words: action — "snare" has no key-table verb, but the call quotes "the thing in the well" from the description
[reskin] value check: "Seizing Brine (Recharge 5-6)" EV 9.9 vs floor 30.4 (the whole Multiattack (2 attacks)) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Seizing Brine (Recharge 5-6)" — the ladder could not lift it; the fallback stands in
[reskin] fallback respects the call: condition-payoff, escalating-dread, terror-pulse, sensory-strike left the shelf — the call declined them for this sheet
[reskin] fallback skipped by the floor: patient-defense (EV 0 vs 2.9)
[reskin] value check: "Opportunist's Lash" EV 24 vs floor 23.4 (one attack of 2) — dice 14 → 18; priced at the floor: dice 18 → 31
[reskin] library seed drawn: exploiter -> Actions/"Opportunist's Lash" (no template held the idea; a proven shape stands in)
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 20 already beats print's 15 at CR 5, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "It sees through water as if the water were its own eyes: any creature touching or standing in the same water as the drowned cannot hide from it, and the drowned ignores the penalties of fighting while submerged or half-drowned." [trait/always/defense] [family: sentinel] — menu: spider-climb, phobia, terrain-walk, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, uncanny-sense, shielded-mind, evasion, relentless-pursuit, bound, undead-fortitude, truth-aura, fear-aura, assassinate, sealed-body, guarded-stance
[reskin] verb gate stands down: trait — no template shares a verb, but 7 template(s) whose declared stamps match the idea (always/defense): bloodied-fury, death-restoration, uncanny-sense, shielded-mind, evasion, undead-fortitude, sealed-body; the declared data is the warrant and the call is worth making
[reskin] composed candidates: none trait — the sentinel family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does defense; leading: bloodied-fury (always/defense), death-restoration (always/defense), uncanny-sense (always/defense)
[reskin] word match declined by the call: bloodied-fury, death-restoration, shielded-mind, evasion, undead-fortitude, sealed-body, guarded-stance, spider-climb — the key word does not mean the mechanic here
[reskin] closest accepted: trait — the call refused every template but named "uncanny-sense" as nearest and declined it for no_fit; it lands rather than the row being dropped (what it wanted: sees through any water that touches it, so creatures in that water can't hide)
[reskin] free signature row: trait — "uncanny-sense" is the call's nearest after it refused every template, so it ships as DECORATION: no receipt, no element claim, counted in the metric. Earns no clause credit
[reskin] seat owes nothing: the trap line was the model's read of its quote, not a key in the words (a hermit was handed Assassinate, day-one 2026-09-30)
[reskin] free signature row: "Water Sight" — the call's nearest after it refused every template, so it ships as DECORATION: no receipt, no element claim, counted in the metric. Earns no clause credit
[reskin] signature template (trait): uncanny-sense -> Traits/"Water Sight" ("The idea is a water-bound sensory defense — it sees through water and ignores su [shape fit, no verb match]")
[reskin] weapons answered: Slam = none; Watery Reach = none
[reskin] name-canon stands down: the path answered homebrew on "the thing in the well" and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] multiattack replacement clause: It can replace one attack with a use of Opportunist's Lash.
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 1) — "Water Sight" [trait/always/defense]
[reskin] sameness: 1 of 1 free row(s) express nothing their rules carry — counted as decoration ("Water Sight")
audit finding below confidence gate: Water Sight The sentence is ungrammatical and circular — 'the location of the water it touches' duplicates the creature's touch, and the pronoun chain lacks a clear object.
audit finding below confidence gate: Slam The conditional rider is fine, but combined with the Grapple rider and the escape clause the Slam clause carries three branches a GM must resolve in one sentence.
[reskin] audit rename: "Opportunist's Lash" -> "Drowning Crush"
[reskin] seed share: 1 of 2 signature row(s) came from a seed (Drowning Crush) — the sameness metric
[reskin] [gap] sees through any water that touches it, so creatures in that water can't hide — "It sees through water as if the water were its own eyes: any creature touching or standing in the same water as the drowned cannot hide from it, and the drowned ignores the penalties of fighting while submerged or half-drowned." — Well Drowned [seat: trait [trait/always/defense]] (closest offered: uncanny-sense) [effect: defense] [menu: bloodied-fury death-restoration uncanny-sense shielded-mind evasion undead-fortitude sealed-body guarded-stance spider-climb phobia terrain-walk blood-frenzy pack-tactics relentless-pursuit bound assassinate truth-aura fear-aura] [same-cell unoffered: false-appearance shell-withdraw patient-defense relic-object mimicry blurred-form] [same-seat rejected: false-appearance:legality adhesive:legality aberrant-ground:legality faultless-tracker:legality web-walker:legality earth-glide:legality tunneler:legality berserk:role marking-light:legality relic-object:legality mimicry:legality blurred-form:legality death-burst:legality kill-denial:legality] [landed: uncanny-sense]
[reskin] signature tally: 2 seat(s) -> 2 shape(s) on the sheet · 0 expressed, 1 decoration, 1 free · accepted picks lost: 0 of 1 · path homebrew
```


---


### Khordathar — in the run

**Concept:**  | role: brute

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Khordathar | 4 | dragon-2 | ok | ok | ok | ok | ok | ok | ok | ok | FAIL: lack-honored | ok |

- reader · soft · multiattack-integrity: 2 attack rows and no Multiattack
- reader · fail · lack-honored: the GM asked for an absence — "It herds its pale wingless kin across the corpse-soil like a shepherd of glass" — and the sheet still carries it
- **dropped clause:** "whose many-jointed legs carry it across a cursed battleground in shrill"
- **dropped clause:** "It herds its pale wingless kin across the corpse-soil like a shepherd of glass"
- **dropped clause:** "raising its serrated forelegs"
- **dropped clause:** "never toys — a wounded matriarch plants herself over the young"
- **dropped clause:** "fights until the herd is clear or she cannot stand"
- **dropped clause:** "screaming crystal-chime warnings across the field"
- **dropped clause:** "it is a protective herd-beast that shields its own kind"
- read: def 2 / off 4 → 3; sustained 17 (1 × Forelegs); nova Chime Shriek 24; dmg 27

```
Khordathar

Large Dragon, Lawful Neutral

AC 18
Initiative +1 (11)

HP 67 (9d10 + 18)

Speed 30 ft., Fly 60 ft., Climb 30 ft.

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
+3
WIS
12
+1
+3
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

Skills Perception +3, Stealth +3

Immunities Fire

Senses blindsight 10 ft., darkvision 60 ft.; Passive Perception 13

Languages Common, Draconic

CR 4 (XP 1,100; PB +2)

Traits

Crystal Plating. While Khordathar has at least 1 Hit Point, the razor-edged crystal plates harden Khordathar's hide, granting it a bonus to its Armor Class.

Fear Aura. Khordathar emanates an aura in a 20-foot Emanation while it doesn't have the Incapacitated condition. Wisdom Saving Throw: DC 12, any enemy that starts its turn in the aura. Failure: The target has the Frightened condition until the start of its next turn. Success: The target is immune to this creature's aura for 24 hours.

Actions

Forelegs. Melee Attack Roll: +6, reach 5 ft. 17 (3d8 + 4) Slashing damage. If Khordathar moved at least 20 feet straight toward the target immediately before the hit and the target is Large or smaller, the target has the Prone condition, and Khordathar can make one Forelegs attack against it as a Bonus Action.

Chime Shriek (Recharge 5-6). Dexterity Saving Throw: DC 14, each creature in a 15-foot Cone. Failure: 24 (7d6) Piercing damage. Success: Half damage.

Armored Slam. Melee Attack Roll: +6, reach 5 ft. 17 (3d8 + 4) Bludgeoning damage, and the target has the Prone condition.

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

- Actions/Forelegs — the GM's clause "pins the intruder beneath its crystal belly to grind and stamp"; binds the GM's words: pin+pins
- Actions/Chime Shriek — the chassis
- Actions/Armored Slam — authored for this sheet; the GM's clause "slamming its armored mass into anything that threatens the herd"
- Traits/Crystal Plating — authored for this sheet; the GM's clause "vein-riddled body has grown over centuries into a lattice of razor-edged crystal plates"
- Traits/Fear Aura — template fear-aura; library draw (seed unstamped); the GM's clause "It never flees"; binds the GM's words: flee+flees

**Engine trace**

```
[path] blank — "role: brute" (code)
[route] brute type=Dragon mechanics=grapple — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | brute-charger: ✓ ("slamming its armored mass into anything ") | brute-charger: no line key in the words — the model's read of its quote | brute-charger -> brute: a charger is a mechanic engine and needs a key in the words — the model's read of its quote cannot land it
[concept] synthesis (blank roll): archetype=brute type=Dragon themes=draconic/grave mind=sapient style=— lore=✓
[concept] synthesis text: A grave-quartz war-drake of the old killing fields, Khordathar is a single long-limbed skittering dragon whose translucent, vein-riddled body has grown over centuries into a lattice of razor-edged crystal plates, and whose many-jointed legs carry it across a cursed battleground in shrill, deliberate ticks. It herds its pale wingless kin across the corpse-soil like a shepherd of glass, raising its serrated forelegs and slamming its armored mass into anything that threatens the herd, then pins the intruder beneath its crystal belly to grind and stamp. It never flees and never toys — a wounded matriarch plants herself over the young and fights until the herd is clear or she cannot stand, screaming crystal-chime warnings across the field. It is fully sapient (INT 10-14), and it is a protective herd-beast that shields its own kind.
[concept] signature elements: grinding crystal-armored pin [behavior] | razor-lattice crystal plates [body] | shrill chime warning of the herd [aura]
[concept] name proposal: Khordathar
[concept] lore: Born centuries ago when a battlefield slaughter soaked the ground and its young drake brood drank the poisoned mineral springs, the Khordathar is the last conscious matriarch of a crystal-blooded lineage, and she wants only to keep the pitiful dwindling herd she guards alive across the graves of the war that made her.
[reskin] body type: dragon — the body outranks the role (recorded: brute)
[reskin] donor: dragon-2 -> CR 4
[reskin] [path] decides: blank (the matcher would have said homebrew)
[reskin] class kit: none — the blank path takes no class kit
[reskin] inline declared: "Khordathar" — the call's own answer (person), built from the name
[reskin] inline form: "Khordathar" — the model's own reading of the name
[reskin] save dc derived: DC 13 -> 14 (8 + PB 2 + the sheet's best 4) — no stat on the sheet reached it
[reskin] the sheet's declared ask: charge — the route call's one answer for the whole concept
[reskin] lacks asked: "wingless kin"
[reskin] lacks not claimed: "It never flees" reads like a lack to the words, and the call's list did not name it
[reskin] lacks not claimed: "never toys — a wounded matriarch plants herself over the young" reads like a lack to the words, and the call's list did not name it
[reskin] lacks not claimed: "fights until the herd is clear or she cannot stand" reads like a lack to the words, and the call's list did not name it
[reskin] clauses: "A grave-quartz war-drake of the old killing fields" -> has (descriptive), head | "Khordathar is a single long-limbed skittering dragon whose translucent" -> has (descriptive) | "vein-riddled body has grown over centuries into a lattice of razor-edged crystal plates" -> has (mechanical) [asked: save_single] [askMechanic: grapple] | "whose many-jointed legs carry it across a cursed battleground in shrill" -> has (descriptive) | "deliberate ticks" -> has (descriptive) | "It herds its pale wingless kin across the corpse-soil like a shepherd of glass" -> LACKS (mechanical) [asked: buff_ally] [askMechanic: command] | "raising its serrated forelegs" -> has (mechanical) [asked: attack] | "slamming its armored mass into anything that threatens the herd" -> has (mechanical) [asked: attack] [askMechanic: shove] | "pins the intruder beneath its crystal belly to grind and stamp" -> has (descriptive) | "It never flees" -> has (mechanical) | "never toys — a wounded matriarch plants herself over the young" -> has (descriptive) | "fights until the herd is clear or she cannot stand" -> has (mechanical) [asked: when_bloodied/buff_self] [askMechanic: harden] | "screaming crystal-chime warnings across the field" -> has (descriptive) | "It is fully sapient (INT 10-14)" -> has (descriptive) | "it is a protective herd-beast that shields its own kind" -> has (mechanical) [asked: buff_ally] [askMechanic: command]
[reskin] body verdicts: 30 of 30 answered; not true of this body: drain, zone, zone-seed, coating, heated-body, false-appearance, absorption, adhesive, aberrant-ground, faultless-tracker, web-walker, energy-aura, noxious-aura, uncanny-sense, marking-light, sealed-body, relic-object, warded-mending, gaze-aura, kill-denial, hook-rider, life-drain
[reskin] menu pruned: action — thrown-burst-seed (the sheet cannot render them)
[reskin] signature idea (action): "When Khordathar moves at least a short distance straight toward a creature and then hits it with Forelegs, the crystal plates along her flanks and belly grind across the target: the creature is knocked Prone, and while it lies beneath her, it is Grappled as the lattice scours it. A creature Grappled this way takes Slashing damage at the start of each of its turns as she settles her weight and grin" [rider/on_hit/condition] [family: drag] — menu: affliction, contagion, charge-push, pounce, charge (+ shelf: shield-bash, escalating-dread, terror-pulse, push-prone, herd, sensory-strike, execute, lure, pacify, curse-debt, reveal, rampage, shell-withdraw, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, patient-defense, lay-on-hands)
[reskin] lead by this seat's own clause: action — "grapple" from the clause this seat serves, not the sheet's "charge"
[reskin] composed candidates: none action — the drag family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: action — idea fires on_hit/does condition; leading: affliction (on_hit/condition), contagion (on_hit/condition), pounce (on_hit/condition)
[reskin] keys would have bound: action — pounce, sensory-strike (pin, pins, scream, chime)
[reskin] classification handed to the fit call: mechanic=grapple shape=save_single
[reskin] word match declined by the call: affliction, contagion, charge, charge-push, push-prone — the key word does not mean the mechanic here
[reskin] signature rider: pounce -> Forelegs (appended; When Khordathar moves straight toward a creature and hits it with Forelegs, the  [verb: pin:concept, pins:concept])
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 18 already beats print's 14 at CR 4, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "Khordathar's vein-riddled crystal lattice is not armor laid over flesh but flesh replaced: when she is struck by a bludgeoning or slashing blow, the shards shear free and spray outward, and each creature within reach of her must succeed on a Dexterity saving throw or take Piercing damage from the flying glass." [trait/on_being_hit/damage] [family: body-reaction] — menu: bloodied-burst, resonant-body, weapon-lodge (+ shelf: spider-climb, phobia, terrain-walk, bloodied-fury, blood-frenzy, pack-tactics, berserk, shielded-mind, relentless-pursuit, bound, undead-fortitude, mimicry, truth-aura, fear-aura, death-burst, evasion)
[reskin] lead by this seat's own clause: trait — "grapple" from the clause this seat serves, not the sheet's "charge"
[reskin] composed candidates on the menu: trait — composed:body-reaction:damage:t0, composed:body-reaction:damage:t1, composed:body-reaction:damage:t2 (the body-reaction family's options, built before the call looks)
[reskin] menu ordered by the idea's stamps: trait — idea fires on_being_hit/does damage; leading: bloodied-burst (on_being_hit/damage), resonant-body (on_being_hit/damage), composed:body-reaction:damage:t0 (on_being_hit/damage)
[reskin] keys would have bound: trait — resonant-body (chime, crystal, glass)
[reskin] classification handed to the fit call: mechanic=grapple shape=save_single
[reskin] word match declined by the call: resonant-body, weapon-lodge, bloodied-burst — the key word does not mean the mechanic here
[reskin] closest refused: trait — "composed:body-reaction:damage:t0" was named closest but was never on this sheet's menu (a gate refused it, or the pool did not offer it for this idea's declared trigger)
[reskin] decline reason: trait — the call answered none and names it "no_fit" — the GM's words key resonant-body, which the pool did not offer for this idea's declared trigger (since 2026-10-27 the keys rank and gate but no longer inject)
[reskin] key match declined: trait — "resonant-body" is keyed by the GM's chime+crystal+glass and was on the call's menu, which the call read as a collision, not the mechanic; since 2026-10-26 the words no longer seat it first — the idea's stamps order the menu — so this records a decline, not an overruled nomination
[reskin] signature miss: trait — "Khordathar's vein-riddled crystal lattice is not armor laid over flesh but flesh replaced: when she is struck by a bludgeoning or slashing blow, the shards shear free and spray outward, and each creature within reach of her must succeed on a Dexterity saving throw or take Piercing damage from the flying glass." [trait/on_being_hit/damage] — the model found no template that holds it (offered: bloodied-burst, resonant-body, composed:body-reaction:damage:t0, composed:body-reaction:damage:t1, composed:body-reaction:damage:t2, weapon-lodge)
[reskin] concept-first trait skipped: resonant-body — the call read its match as a collision (the word is a modifier, or the sheet already answers it)
[reskin] concept-first trait skipped: bloodied-burst — the call read its match as a collision (the word is a modifier, or the sheet already answers it)
[reskin] trait bound to the concept's verb (concept-first): fear-aura — flee+flees in the user's words; the idea path had nothing
[reskin] signature template (trait): fear-aura -> Traits/"Fear Aura" ("exact concept match [verb: flee:concept, flees:concept]")
[reskin] repair: 2 clause(s) with no row — "vein-riddled body has grown over centuries into a lattice of razor-edged crystal plates", "slamming its armored mass into anything that threatens the herd"; one targeted call with the sheet as context
[reskin] repair answer: attacks 1, saves 0, traits 1, reactions 0, answered [], unplaced []
[reskin] condition relation: "Crystal Plating" — the call reads its condition as none, so no condition is recorded against it
[reskin] repaired sheet: 1 attack row(s), 0 save, 1 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] weapons answered: Forelegs = none; Chime Shriek = none
[reskin] chassis nova: "Chime Shriek (Recharge 5-6)" — the dragon-2's own nova row (its "Breath Weapon", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] speed by concept: added Climb 30 ft. — the concept's movement set decides
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] defenses by material: a glass body is vulnerable to Thunder and never resists, absorbs, or ignores it (named by the GM's words, the call having named no material the table knows) — the resistance is withheld; the vulnerability is the GM's to type (the Frostmaw carried a Fire vulnerability nobody typed — the critic's second species read)
[reskin] element immunity: Fire (merged into the header write)
[reskin] dragon senses raised to tier: blindsight 10 added
[reskin] dragon mental save DC derived: "Fear Aura" -> 12 (the Frightful Presence class keys to Charisma)
[reskin] dragon languages: Draconic added (42/42 print dragons speak it)
[reskin] immunities stamped for type: Dragon -> Fire
[reskin] name-canon stands down: the path answered blank on "role: brute" and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] free-row budget by card size: CR 4 sits in band 3-5, where print runs 2-5 rows (p20-p90, Multiattack excluded); this card already carries 5 fixed row(s), so the free-row budget is 0 rather than 1 — the card is already at print's high end
[reskin] row binds its clause: "Forelegs" answers "pins the intruder beneath its crystal belly to grind and stamp" — the keys it matched came from that clause, so the coverage credit has a receipt
[reskin] row binds its clause: "Fear Aura" answers "It never flees" — the keys it matched came from that clause, so the coverage credit has a receipt
[reskin] asked but unanswered: "fights until the herd is clear or she cannot stand" asked for when_bloodied and no row binds the clause
[reskin] lint fixed: term-caps — the lint's own deterministic surgery, applied before the gate reads the sheet
audit finding below confidence gate: Fear Aura An Emanation is measured from the creature, but the entry never clarifies that the aura moves with Khordathar or what the aura's origin is, leaving the area ambiguous during movement.
audit finding below confidence gate: Forelegs The bonus-action attack is granted only on a specific hit rider and its timing relative to the triggering attack is unstated, making it unclear whether it must be used immediately.
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] [gap] forces each creature within reach to make a Dexterity saving throw against piercing damage when struck, not just the sin — "Khordathar's vein-riddled crystal lattice is not armor laid over flesh but flesh replaced: when she is struck by a bludgeoning or slashing blow, the shards shear free and spray outward, and each creature within reach of her must succeed on a Dexterity saving throw or take Piercing damage from the flying glass." — Khordathar [seat: trait [trait/on_being_hit/damage]] (closest offered: composed:body-reaction:damage:t0) [effect: damage] [menu: bloodied-burst resonant-body composed:body-reaction:damage:t0 composed:body-reaction:damage:t1 composed:body-reaction:damage:t2 weapon-lodge] [same-cell unoffered: heated-body ward-retaliation snap-shot riposte] [same-seat rejected: heated-body:legality absorption:legality] [row dropped]
[reskin] signature outcome: 1 of 1 accepted signature pick(s) never reached the sheet — 1x the call named no template for the pick
[reskin] signature tally: 2 seat(s) -> 1 shape(s) on the sheet · 0 expressed, 0 decoration, 0 free · accepted picks lost: 1 of 1 (1x the call named no template for the pick) · path blank
[reskin] lack took nothing: "It herds its pale wingless kin across the corpse-soil like a shepherd of glass" removed no row and the call named no roll it spoils (costs: (unanswered)) — no flaw row, and the gap list carries it
```


---


### Grave-Pit Champion — in the run

**Concept:** a skeleton with a greatsword

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Grave-Pit Champion | 6 | brute-5 | ok | ok | SOFT: reach | ok | ok | ok | ok | ok | ok | ok |

- structure · soft · reach: Actions/Greatsword: reach 10 on a Medium body with no tether word
- read: def 4 / off 6 → 5; sustained 44 (2 × Greatsword); nova none; dmg 44

```
Grave-Pit Champion

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

Blood Frenzy. The champion has Advantage on attack rolls against any creature that doesn't have all its Hit Points.

Great Weapon Master. When the champion hits a creature with its Greatsword, the attack deals an extra 3 damage.

Actions

Multiattack. The champion makes two attacks, using Greatsword or Shortbow in any combination.

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
- Traits/Blood Frenzy — template blood-frenzy; library draw (seed unstamped)
- Traits/Great Weapon Master — a declared feature; the GM's clause "a skeleton with a greatsword"

**Engine trace**

```
[path] twist — Skeleton (is) — "skeleton" (call)
[route] brute type=Undead mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | brute: ✓ ("a skeleton with a greatsword") | brute: no line key in the words — the model's read of its quote
[concept] resolve: archetype=brute type=Undead themes=grave/armed mind=mindless style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: oversized greatsword swings [object] | skeletal warrior that fights to the death [body] | relentless trading blows in melee [behavior]
[concept] identity: A towering skeleton warrior strides forward with an oversized greatsword, opening with a sweeping overhead cleave meant to flatten the first thing in reach before the fight can begin. Round after round it plants itself and trades blows, its heavy blade working in patient, repeating arcs while its bony frame shrugs off cuts that would fell a living soldier. It has no blood to lose and no fear to feel, so it never breaks off or feints retreat; it simply advances until the blade stops moving.
[concept] lore: Raised from the grave-pits of an old battlefield where fallen champions were buried with their weapons, these skeletons rise whenever a greatsword remains unclaimed, cursed to guard the field their living selves once fought to win.
[reskin] print canon array: STR 18, DEX 16, CON 15, INT 6, WIS 8, CHA 5 — the Skeleton's, STR fitted to +7
[reskin] donor: brute-5 -> CR 6
[reskin] [path] decides: twist on the Skeleton (the matcher agrees)
[reskin] print canon: "a skeleton with a greatsword" heads on the Skeleton — print's rows ride along; the seat stays
[reskin] named parts: Greatsword (slot) — the user's words, the engine's numbers
[reskin] named parts landed: 1 attack row(s), 0 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline declared: "the champion" — the call's own answer (kind), built from the name
[reskin] inline form: "the champion" — the model's own reading of the name
[reskin] the sheet's declared ask: none — the route call named no mechanic
[reskin] lacks asked: nothing taken away
[reskin] the clause is its own quote: trigger "at_will" stands on "a skeleton with a greatsword" — the call offered no separate quote and needs none (1b)
[reskin] the clause is its own quote: limit "at_will" stands on "a skeleton with a greatsword" — the call offered no separate quote and needs none (1b)
[reskin] clauses: "a skeleton with a greatsword" -> has (mechanical) [asked: at_will/at_will/attack]
[reskin] body verdicts: 31 of 31 answered; not true of this body: active-toll, random-ray, spew, herd, drain, shell-withdraw, rally, coating, heated-body, false-appearance, absorption, bloodied-burst, resonant-body, adhesive, terrain-walk, aberrant-ground, faultless-tracker, web-walker, energy-aura, noxious-aura, uncanny-sense, marking-light, sealed-body, warded-mending, mimicry, gaze-aura, death-burst, kill-denial, hook-rider, life-drain
[reskin] signature idea (action): "The champion hauls its greatsword back and drives it down in a two-handed overhead arc into the ground at a point within reach; each creature in a line extending from that point must succeed on a Dexterity saving throw. On a failure, a creature takes Slashing damage and is knocked Prone, the paved stone splitting in a trench beneath it." [action/save/condition] [family: nova] — menu: thrown-burst, throw-retrieve, shield-bash, ground-burst, escalating-dread, terror-pulse, push-prone, thrown-burst-seed, wind-up, gaze-single, snare, seal, lure, pacify, snare-bolt (+ shelf: rampage, second-wind, aggro-curse, own-turn-punisher, self-invisibility, focus, affliction, contagion, stunning-strike, charge-push, pounce, charge)
[reskin] composed candidates: none action — the nova family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: action — idea fires save/does condition; leading: shield-bash (save/condition), escalating-dread (save/condition), terror-pulse (save/condition)
[reskin] classification handed to the fit call: shape=attack when=at_will often=at_will
[reskin] word match declined by the call: push-prone, shield-bash, ground-burst, thrown-burst — the key word does not mean the mechanic here
[reskin] closest accepted: action — the call refused every template but named "ground-burst" as nearest and declined it for no_fit; it lands rather than the row being dropped (what it wanted: a line-shaped Dexterity-save attack that deals Slashing damage and knocks each c)
[reskin] free signature row: action — "ground-burst" is the call's nearest after it refused every template, so it ships as DECORATION: no receipt, no element claim, counted in the metric. Earns no clause credit
[reskin] fit declined: "Trenching Overhead (Recharge 5-6)" — a print body takes only what the user's words ask, and the call named none of this creature's own elements for it; the call offered no quote, and the key table finds no verb either (the blacksmith's rally, critic-ten 2026-10-01)
[reskin] fallback respects the call: push-prone left the shelf — the call declined it for this sheet
[reskin] fallback stands down: the twist path has no shelf — the Skeleton's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "The Grave-Pit Champion plants its feet and swings in patient, repeating arcs: whenever it takes the Attack action and makes only Greatsword attacks, its reach extends and its Greatsword attacks score a Critical Hit on a roll of 19 or 20, the blade sweeping wider each round as it advances." [trait/always/damage] [family: payoff] — menu: spider-climb, phobia, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, relentless-pursuit, bound, relic-object, undead-fortitude, truth-aura, fear-aura, assassinate (+ shelf: weapon-lodge)
[reskin] verb gate stands down: trait — no template shares a verb, but 3 template(s) whose declared stamps match the idea (always/damage): blood-frenzy, pack-tactics, assassinate; the declared data is the warrant and the call is worth making
[reskin] composed candidates: none trait — the payoff family composes a rider and this is the trait seat
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does damage; leading: blood-frenzy (always/damage), pack-tactics (always/damage), assassinate (always/damage)
[reskin] classification handed to the fit call: shape=attack when=at_will often=at_will
[reskin] word match declined by the call: blood-frenzy, pack-tactics, assassinate, bloodied-fury — the key word does not mean the mechanic here
[reskin] closest accepted: trait — the call refused every template but named "blood-frenzy" as nearest and declined it for no_fit; it lands rather than the row being dropped (what it wanted: grants Advantage only while repeating the same melee attack, plus wider reach an)
[reskin] free signature row: trait — "blood-frenzy" is the call's nearest after it refused every template, so it ships as DECORATION: no receipt, no element claim, counted in the metric. Earns no clause credit
[reskin] free signature row: "Patient Wide Sweep" — the call's nearest after it refused every template, so it ships as DECORATION: no receipt, no element claim, counted in the metric. Earns no clause credit
[reskin] signature template (trait): blood-frenzy -> Traits/"Patient Wide Sweep" ("the idea is a stance that widens reach and improves critical range while making  [shape fit, no verb match]")
[reskin] one mechanic, one name: Traits/"Patient Wide Sweep" -> "Blood Frenzy" — this row is blood-frenzy and does what every blood-frenzy row does; a bespoke name would promise more than the text delivers
[reskin] weapons answered: Greatsword = greatsword; Hurled Blade = javelin
[reskin] weapon declared: "Hurled Blade" is a javelin — the call's own answer (the name alone read longsword)
[reskin] print canon alignment: Neutral -> Lawful Evil — the Skeleton's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "None" -> "Understands Common plus one other language but can't speak" — the Skeleton's
[reskin] print canon speed: 40 ft. -> 30 ft. — the Skeleton's walk; the concept's other modes stay
[reskin] print canon attack: "Hurled Blade" -> "Shortbow" — the Skeleton's own ranged row
[reskin] immunities stamped for type: Undead -> Poison; Exhaustion, Poisoned
[reskin] print canon defenses: vulnerabilities none -> Bludgeoning — the Skeleton's own header lines
[reskin] vulnerability rejected — "Bludgeoning" has no warrant in the concept's own text (print's default is none)
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 1) — "Blood Frenzy" [trait/always/damage]
[reskin] ask vs row ok: "a skeleton with a greatsword" -> "Greatsword" — trigger at_will, limit at_will
[reskin] sameness: 1 of 1 free row(s) express nothing their rules carry — counted as decoration ("Blood Frenzy")
[reskin] audit rename blocked — "Great Weapon Master" is the user's own part name, a kit feature's real name, or print's own row
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] [gap] a line-shaped Dexterity-save attack that deals Slashing damage and knocks each creature it hits Prone — "The champion hauls its greatsword back and drives it down in a two-handed overhead arc into the ground at a point within reach; each creature in a line extending from that point must succeed on a Dexterity saving throw. On a failure, a creature takes Slashing damage and is knocked Prone, the paved stone splitting in a trench beneath it." — Grave-Pit Champion [seat: action [action/save/condition]] (closest offered: ground-burst) [effect: damage] [menu: shield-bash escalating-dread terror-pulse push-prone gaze-single snare seal lure pacify snare-bolt thrown-burst ground-burst thrown-burst-seed wind-up throw-retrieve] [same-cell unoffered: swallow random-ray sensory-strike reveal] [same-seat rejected: swallow:legality trample:legality leap:legality reel:role condition-payoff:legality execute:role hook-drag:legality active-toll:legality pull-through:role random-ray:legality spew:legality burrow-ambush:legality obstacle-pull:role slow-bolt:role sensory-strike:role disarm:role herd:legality drain:legality curse-debt:role reveal:role exploiter:legality blighted-ground:role] [VETOED AFTER ACCEPTANCE: ground-burst never reached the sheet — died at an UNRECORDED drop site]
[reskin] [gap] grants Advantage only while repeating the same melee attack, plus wider reach and a 19-20 crit range — "The Grave-Pit Champion plants its feet and swings in patient, repeating arcs: whenever it takes the Attack action and makes only Greatsword attacks, its reach extends and its Greatsword attacks score a Critical Hit on a roll of 19 or 20, the blade sweeping wider each round as it advances." — Grave-Pit Champion [seat: trait [trait/always/damage]] (closest offered: blood-frenzy) [effect: condition] [menu: blood-frenzy pack-tactics assassinate spider-climb phobia bloodied-fury death-restoration berserk shielded-mind relentless-pursuit bound relic-object undead-fortitude truth-aura fear-aura] [same-cell unoffered: throw-retrieve death-burst own-turn-punisher coating] [same-seat rejected: false-appearance:legality adhesive:legality terrain-walk:legality aberrant-ground:legality faultless-tracker:legality web-walker:legality uncanny-sense:legality earth-glide:legality tunneler:legality evasion:role marking-light:legality sealed-body:legality guarded-stance:role mimicry:legality blurred-form:role death-burst:legality kill-denial:legality] [landed: blood-frenzy]
[reskin] signature outcome: 1 of 2 accepted signature pick(s) never reached the sheet — 1x an UNRECORDED drop site
[reskin] signature tally: 2 seat(s) -> 1 shape(s) on the sheet · 0 expressed, 1 decoration, 1 free · accepted picks lost: 1 of 2 (1x an UNRECORDED drop site) · path twist
[reskin] multiattack re-read — "Shortbow" joins the combination; "The champion makes two attacks, using Greatsword or Shortbow in any combination."
```


---

