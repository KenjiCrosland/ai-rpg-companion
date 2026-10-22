# The case: an unexplained coverage drop (2026-10-22, package seven)

Answering the critic's package-six review (6 ship / 27 fix-lite / 7 fix). **Items 1
and 3 of that order are closed; half of item 2 and the first of item 4 landed.**
This forty is `sweep-2026-10-22T03-29-45`: **2 FAIL of 40** — the low end of seven
forties — Jest 117 suites / 3754 passing, build clean.

The critic's central finding was accepted without reservation:

> Membership is not expression. The receipt is satisfied by putting the twist's
> words in a generic template's NAME.

Following that to its end produced something larger than the fix, and it is what
this package asks the critic to attack.

---

## 1. AN UNEXPLAINED COVERAGE DROP, and a claim we retracted before sending

Coverage read **69%** (48 of 70 clauses) against 77-90% across the previous
fifteen forties. It is the lowest reading since 2026-10-04. We do not know why,
and we would rather say so than offer the explanation we had.

**What we first concluded, and why it was wrong.** The dropped clauses are the
twists — "sings in one voice", "keeps a garden of thorns", "blind in one eye from
an old lance" — and `checker.mjs:749` describes coverage as "string-work against
the extraction's clause list, never a model". We read that as word-overlap and
concluded the metric had been scoring row NAMES: a generic row borrowing the
twist's words would score the clause, so our three landings had merely stripped
false credit.

**That is false.** Line 822 of the same function says the opposite, and line 828
records that the loophole was closed on **2026-10-16** — the owner's own stage 3
item 4:

```
// COVERAGE BY PROVENANCE (step 8): a clause is covered when a row's trace binds
// to it ... never when a row's text happens to contain its words
// A RECEIPT, NOT A WORD MATCH ... "wound" credited "cracks open when wounded" to
// Rampage, a row that moves and attacks and answers nothing of the sort. Only an
// explicit clause binding counts now.
if (rows.some(({ e }) => e.clause && overlaps(e.clause))) return true;
```

"string-work... never a model" means *deterministic rather than asking an LLM* —
not word-overlap. The defect we thought we had found had already been found and
fixed six days earlier. The case that was drafted asked the critic to attack a
claim we had already disproven ourselves; it is withdrawn.

**What we do know, measured:**

| | 22-17-49 | 03-29-45 |
|---|---|---|
| coverage | 78% (52/67) | **69% (48/70)** |
| rows carrying `e.clause` | 37 of 260 | **30 of 262** |
| `row binds its clause` | 12 | **5** |
| `seat takes its clause` | 25 | 26 |
| closest-acceptance | 30 | 35 |

The loss is concentrated in one path: **`row binds its clause` fell 12 → 5**, which
accounts for the whole 37 → 30, and that path requires a row whose matched keys
trace to a clause. A template the call REFUSED carries no keys, so we expected
closest-acceptance to explain it.

**It does not.** Across seven forties, closest-acceptance does not track coverage
at all:

```
closest-accepted  41 -> coverage 87%     33 -> 86%
                  38 -> 86%              40 -> 86%
                  34 -> 80%              30 -> 78%
                  35 -> coverage 69%   <- this run
```

So we have an unexplained 8-point drop in the project's most important number, a
mechanism localised to one binding path, and no cause. **Three hypotheses were
tested and disproven** (more refusals — refusals went DOWN; decoration crowding
out rows — 69% with vs 70% without; the audit renaming rows — renames flat).

**This is what we would most like the critic's read on.** Our own measurement
discipline failed four times in one day on this package (a parser silently
matching 0 of 30 records; a gate scored by reading its own message rather than the
row; four test assertions passing vacuously against an empty string; a row
reported lost that had shipped as a welded rider). A fifth — misreading a comment
and building a case on it — was caught only because a rendered block contradicted
it. We do not trust ourselves on this one.

## 2. The decoration finding, confirmed and sharpened

The critic's "12 of 13 free rows from three templates" is confirmed, and sharpened:
**16 decoration grants this forty, 0 rows judged to express their element.**

The concentration is exactly as the critic described. Every decoration row in this
forty, with the template under it:

```
Owlbear               "Adhesive"            adhesive
Scree-Pit Thing       "Clotting Scree"      adhesive
Hydra                 "Bloodied Fury"       bloodied-fury
Adult Red Dragon      "Bloodied Fury"       bloodied-fury
Vampire               "Warded Mending"      warded-mending
Trenchwake Leviathan  "Ringing Hide"        resonant-body
Vashka the Red        "Thunderous Riposte"  resonant-body
Reedsong Adept        "Shrieking Scales"    resonant-body
Marrowsun Lich        "Marrow Rise"         death-burst
Ilvareth Dusksong     "Dusk Brand"          marking-light
Garrison Sellsword    "Cheapest Contract"   assassinate
```

Three templates carry seven of eleven: `resonant-body` (damage-on-touch) ×3,
`adhesive` ×2, `bloodied-fury` ×2.

**One thing did improve, and the critic should check it rather than take our word.**
These rows now wear HONEST names — "Adhesive", "Bloodied Fury" — not names
borrowed from the twist. In the package-six forty the same mechanism produced
`Blindside Lash` on a damage-on-touch trait; in a run two hours before this one it
produced `Thorn Garden` on a MUD-WALKING trait and `Snaring Chain` on an adhesive
grapple (`smoke-out/express10-2026-10-22T02-45-13`, not in this package's blocks).
Because a decoration row's element claim is now revoked at grant, the name can no
longer advertise a twist the rules do not deliver. **The false advertising is gone;
the missing mechanics are not.** That is precisely why coverage fell — section 1.

**The mechanism is closest-acceptance.** Measured on the express ten: 3 of 5
revoked rows were the template the call had just REFUSED, and 3 of 3 where it
fired on the trait seat:

```
word match declined by the call: heated-body, absorption, aberrant-ground, ...
closest accepted: trait — the call REFUSED EVERY TEMPLATE but named
  "terrain-walk" as nearest; it lands rather than the row being dropped
free signature row: "Thorn Garden" — ... the call names the element it expresses
```

The call answered no_fit; the engine shipped its "if forced, nearest" and then
asked that refused template which element it expresses. It justifies post hoc.

It is not deleted — it took "the row shipped nothing" from 22% of blocks to about
1 in 41, and an empty seat is worse. Such a row now ships as **decoration**: no
receipt, no element claim, counted in `decoration_rows`. **The open question for
the critic: is a decoration row worth a seat at all, or should the seat stay
empty?** Eleven of this forty's rows are that question made concrete.

## 3. What landed, in the critic's order

- **Item 1 CLOSED.** Instrument honesty: the gap ship-check counts appended riders
  (a welded rider owned no row, so a SHIPPED rider read as a veto — the Purple
  Worm's charge rode its Bite). **`VETOED after acceptance` is now 8 of 36 (22%)**,
  from 10 of 30 and originally 23 of 41. Our package-six figure under-reported our
  own result. Verb preference stands down: the receipt test no longer fires only
  when a keyed template was also on the menu, because that template was ranked
  first and the call declined it.
- **Item 3 CLOSED.** The three provenance gates (print body, nova, rider) decide
  CREDIT, not existence — all three accept the element receipt, through one
  `takeAsFreeRow`. Not a blanket allowance: `expresses` is membership-validated,
  and the three decoration pins still refuse.
- **Item 4, first regression CLOSED.** The 2014 paralysis hole was not the gate
  reading the wrong printing — `checker.mjs:673` skips every `e.print` row, and
  the 2014 conversion REWRITES a print row while it keeps the print stamp, so a
  converted print row carries text print never wrote and is exempt from every
  adjudicability gate. `conversion-dropped-duration` is the printing-equivalence
  test; measured 1 fire, 0 false positives over 19 two-printing sheets, and it
  fired live on a fresh archlich.
- **Item 2, half.** The expression quote (judged against the finished row text by a
  call other than the one that picked the template, validated VERBATIM by the
  engine) and a SOFT rejection: a failed quote costs the row its CLAIM, not its
  existence. The family cap needed no word list — `heated-body`,
  `bloodied-burst` and `resonant-body` all declare `trigger=on_being_hit,
  effect=damage`, so the declared cell IS the family.
- **The Vrock ruling.** Re-measured under the gate's own predicate (which counts
  `N/Day`, not only `Recharge`), print carries ONE block with two novas — the
  Vrock. Our earlier "0 of 329" used a narrower pattern than the gate. A tweak off
  the Vrock keeps the pair print gave it; an engine-written second nova still fails.
- **The second nova is priced, not re-gated** (owner's ruling): `forceUngated`
  never hands the gate back, prices to the MULTIATTACK SUM, and moves only the
  dice — the save, area, condition and DC are untouched. 45 → 18 against a sum of 28.
- **One definition of a row's gate.** Five sites recovered it by re-reading the
  row's NAME; two more were found while checking. All seven now call `gateOf`.
  The field was being DELETED one line before the sheet was built
  (`delete e.was; delete e.wildcard; delete e.gate`) — a fact the donor declares.

## 4. What we have NOT proven, stated plainly

- **`e.gate` equivalence is 23 agree, 0 disagree, 3 UNSTAMPED** at 40-scale. The
  three are `Protective Magic (3/Day)`, `Misty Step (3/Day)`, `Divine Aid (3/Day)`
  — print-canon rows that are **not flagged `e.print`**. No stamped gate is wrong,
  and `gateOf`'s name fallback covers them, so no reader is misled. But the
  provenance gap is real and two other gates key on `e.print` (the Vrock exemption
  and the claim revoke), so a print row that is not flagged may be misjudged
  elsewhere. We have not chased it.
- **`condition_relation` and the rider ship-check fired live for the FIRST TIME in
  this forty** (2 relation traces, 9 welds). Three previous smokes produced
  neither. They rest largely on direct-call probes and unit tests.
- **The `expressed` branch of the quote has zero live positives.** 0 of 16.
- Coverage has read 69%, 71% and 69% on three runs. We believe that is the honest
  baseline; section 1 is the claim.

## 5. Method note

Prompt hypotheses were tested with **direct calls through the dev proxy**, not by
running the pipeline and reading traces — `scripts/probe-condition-relation.mjs`
(45/45 on the only distinction the engine acts on) and
`scripts/probe-expression-quote.mjs` (18/21, every error a false NEGATIVE, zero
false positives, which is why the rejection is soft). Both are checked in so the
prompts stay re-measurable. Two labels in those probes are recorded as DISPUTES
rather than re-labelled to improve a score.

---

# 2024 blocks

## Review batch — sweep-2026-10-22T03-29-45

The checker ran first. The gate table covers every block in the run; every block of the run follows. Each block carries its checker row above and its engine trace below. Hand-derive against the row first; then read for what predicates can't see.

### Gate table — the whole run

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Dire Wolf | 1 | 2024 | skirmisher-1 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/3 |
| Silt Hound | 1 (2014) | 2014 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 3/4 |
| Owlbear | 3 (2014) | 2014 | brute-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 3/3 |
| Loft Bell | 3 | 2024 | lurker-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 7/8 |
| Air Elemental | 5 | 2024 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |
| Scree-Pit Thing | 5 (2014) | 2014 | brute-5-grappler | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 3/4 |
| Hydra | 8 (2014) | 2014 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 6/6 |
| Breaching Frame | 8 | 2024 | brute-5-juggernaut | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 1/5 |
| Stone Golem | 10 | 2024 | brute-9 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 6/6 |
| Drowned Choir | 10 (2014) | 2014 | lurker-5-phantom | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 5/5 |
| Vampire | 13 (2014) | 2014 | lurker-8 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 10/10 |
| Hive-Archon | 13 | 2024 | skirmisher-13-winged | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 7/7 |
| Purple Worm | 15 | 2024 | brute-13 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 6/6 |
| Glacier Heart | 15 (2014) | 2014 | brute-9-juggernaut | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 6/6 |
| Adult Red Dragon | 17 (2014) | 2014 | dragon-15 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok | ok | soft (1) | 0/1 | 9/9 |
| Brass Tyrant | 17 | 2024 | brute-17-juggernaut | ok | SOFT: hot-offense | ok | ok | ok | ok | ok | ok | ok | ok | soft (1) | 0/1 | 8/10 |
| Pit Fiend | 20 | 2024 | defender-17 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 9/9 |
| Marrowsun Lich | 20 (2014) | 2014 | caster-21 | ok | ok | ok | ok | ok | FAIL: conversion-dropped-duration | ok | ok | ok | ok | FAIL (1) | 1/1 | 9/10 |
| Ancient Gold Dragon | 24 (2014) | 2014 | — | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | — | — |
| Trenchwake Leviathan | 24 | 2024 | brute-21 | ok | SOFT: aim-dpr, band | ok | ok | ok | ok | ok | ok | ok | ok | soft (1) | 0/1 | 7/8 |
| Owlbear | 3 | 2024 | brute-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 1/1 |
| Goblin Boss | 1 (2014) | 2014 | skirmisher-1 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/3 |
| Vashka the Red | 6 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/2 | 5/5 |
| Caustic Scythe Horror | 9 | 2024 | brute-8-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/4 | 4/4 |
| Iron-Bound Sentinel | 11 (2014) | 2014 | defender-7-warden | ok | user-set: AC 20 · reads CR 9 | ok | ok | ok | ok | ok | ok | FAIL: name-mechanic | ok | FAIL (1) | 3/3 | 7/7 |
| Fenrot Hexcrone | 7 | 2024 | caster-8-binder | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 5/6 |
| Ser Aldric Vane | 6 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 3/3 |
| Ilvareth Dusksong | 12 (2014) | 2014 | caster-12 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 6/6 |
| Swarm of Tolling Pyres | 13 | 2024 | swarm-9 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/3 |
| Cathedral-Vault Ooze | 9 (2014) | 2014 | ooze-9 | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | ok | soft (1) | 0/1 | 5/6 |
| Cragwake Drake | 7 | 2024 | dragon-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 3/3 |
| Passexile | 9 (2014) | 2014 | brute-9 | ok | SOFT: aim-atk | ok | ok | ok | ok | ok | ok | ok | ok | soft (1) | 2/2 | 2/3 |
| Reedsong Adept | 5 (2014) | 2014 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 6/7 |
| Krennik Skullstandard | 4 (2014) | 2014 | skirmisher-3-mounted | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 6/7 |
| Well Drowned | 5 | 2024 | lurker-5-trap | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |
| Uulgh | 4 | 2024 | brute-5-juggernaut | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 7/15 | 6/7 |
| Meshrin | 8 (2014) | 2014 | skirmisher-8-hurler | ok | user-set: AC 16, HP 120 · reads CR 6.5 | SOFT: lint:hp-formula | ok | ok | ok | ok | ok | ok | ok | soft (1) | 7/8 | 7/7 |
| Grave-Warden's Champion | 6 | 2024 | brute-5 | ok | ok | SOFT: reach | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 3/3 |
| Garrison Sellsword | 5 (2014) | 2014 | skirmisher-8-hurler | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 6/6 |
| Brother Halric | 3 (2014) | 2014 | caster-6 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 6/6 |

**Dropped 22 of 70 user clauses** (coverage 69%); concept share 92% (203/220 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- caster-21 / edition: 1
- defender-7-warden / reader: 1



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

Rimed Hide. A creature that touches the dire wolf or hits it with a melee attack while within 5 feet of it takes 3 (1d6) Cold damage.

Pack Tactics. The dire wolf has Advantage on an attack roll against a creature if at least one of the dire wolf's allies is within 5 feet of the creature and the ally doesn't have the Incapacitated condition.

Actions

Multiattack. The dire wolf makes two Bite attacks.

Bite. Melee Attack Roll: +5, reach 5 ft. 8 (1d10 + 3) Piercing damage. If the target is a creature, it is subjected to the following effect. Constitution Saving Throw: DC 13. Failure: The target has the Poisoned condition. While Poisoned this way, the target can't regain Hit Points. The condition lasts until the target finishes a Long Rest or is cured by the Lesser Restoration spell or similar magic. Success: The target is immune to this creature's contagion for 24 hours. If the target is a Large or smaller creature, it has the Prone condition.

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

- Traits/Rimed Hide — template heated-body; library draw (seed unstamped); binds the GM's words: frost+rime
- Traits/Pack Tactics — print's own row
- Actions/Multiattack — the chassis
- Actions/Bite — print's own row

**Engine trace**

```
[path] twist — Dire Wolf (is) — "Name field: Dire Wolf" (code)
[route] skirmisher type=Beast mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | skirmisher: ✓ ("Dire Wolf — with a frost-rimed hide") | skirmisher-skulker: the call read "hide" as not meaning that mechanic here — no override | skirmisher stands: every key that would override it was read as a figure of speech | skirmisher: no line key in the words — the model's read of its quote
[concept] name: "Dire Wolf" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] resolve: archetype=skirmisher type=Beast themes=bestial/elemental mind=bestial style=— energy=Cold mix=both identity=✓ lore=✓
[concept] name: provided "Dire Wolf"
[concept] mechanics: none claimed
[concept] signature elements: frost-rimed hide [body] | pack hunting [behavior] | darting hit-and-run strikes [behavior]
[concept] identity: A dire wolf whose hide is crusted with rime, it circles the pack's quarry in silence and darts in to tear at hamstrings and flanks before the frost on its coat can be read as a threat. Every round it repeats the same rhythm — a rush from cover, a bite trailing cold, a wheeling retreat — and it never fights alone, using its kin as the anvil to its hammer. Bloodied, it does not break: it grows more patient, shadowing the wounded and letting the cold finish what its teeth start.
[concept] lore: These wolves den in the high passes where the winter never fully leaves, and they follow the frost line down into the valleys when hunger drives them, hunting as a pack to bring down prey far larger than themselves.
[reskin] print canon defenses: HP 30 -> 22, AC 15 -> 14 — the Dire Wolf's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 17, DEX 15, CON 15, INT 3, WIS 12, CHA 7 — the Dire Wolf's at its own CR; attack +4 -> +5, DC 13 (print's)
[reskin] donor: skirmisher-1 -> CR 1
[reskin] [path] decides: twist on the Dire Wolf (the matcher agrees)
[reskin] print canon: "Dire Wolf — with a frost-rimed hide" heads on the Dire Wolf — print's rows ride along; the seat stays
[reskin] claim gate: CR 1 but a Beast body — the trait seat stays open (print: a material body carries a trait at every tier)
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] name_element answered: frost-rimed = imagery
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline by rule: "the dire wolf" — the call answered "the dire wolf" (kind), which the name does not support
[reskin] inline form: "the dire wolf" — the model's own reading of the name
[reskin] final price: the chassis's Multiattack: the round ran 14 against the card's 10 — the attack rows re-solve at 75% (2 attacks off one row after a supersede)
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Dire Wolf — with a frost-rimed hide" -> has (descriptive), head
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The dire wolf harries a wounded or slowed foe, forcing it to split attention. When the wolf attacks a creature that one of its kin also threatens, it can tear at a hamstring, leaving the prey trailing frost and unable to keep pace. The wolf must be flanking with a packmate to attempt this." [rider/on_hit/movement] — menu: contagion, charge-push, hook-rider, pounce, isolation, charge (+ shelf: snare, shield-bash, lure, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, slow-bolt, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, riposte)
[reskin] signature bound to the concept's verb: action — slow-bolt (frost)
[reskin] closest accepted: action — the call refused every template but named "contagion" as nearest; it lands rather than the row being dropped (what it wanted: the hide chills attackers — a creature that hits or touches the wolf must make a)
[reskin] pick kept on the GM's own words: action — "contagion" has no key-table verb, but the call quotes "with a frost rimed hide" from the description
[reskin] signature rider: contagion -> Bite (appended; The GM asked only for a cosmetic frost-rimed hide; no offered template carries a [shape fit, no verb match])
[reskin] signature idea (trait): "The rime-crusted hide chills any weapon that strikes it, numbing the attacker's grip. A creature that hits the wolf in melee feels the frost bite back, its speed slowed by the clinging cold." [trait/on_being_hit/condition] — menu: heated-body, absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst)
[reskin] signature bound to the concept's verb: trait — heated-body (frost)
[reskin] signature template (trait): heated-body -> Traits/"Rimed Hide" ("The frost-rimed hide chills any weapon that hits it, so attackers in melee take  [verb: frost:concept, rime:idea]")
[reskin] weapons answered: Bite = none
[reskin] print canon speed: 30 ft. -> 50 ft. — the Dire Wolf's walk; the concept's other modes stay
[reskin] languages held: None stands — INT 3 on a Beast speaks nothing, whatever the mind read said
[reskin] print canon skills: "Perception +3, Stealth +4" -> "Perception +5, Stealth +4" — the Dire Wolf's own skills, each derived from this sheet's stat and PB
[reskin] resistances derived: Cold
[reskin] print canon trait: Pack Tactics — "Dire Wolf — with a frost-rimed hide" is the Dire Wolf (print's own row)
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the seat's, not the Dire Wolf's
[reskin] print canon: chassis row leaves — Traits/"Rimecloak" is the seat's, not the Dire Wolf's
audit finding below confidence gate: Rimed Hide The name promises rime/ice protecting the hide (cold exposure resistance), but the text is a contact-damage thorns effect that never reflects the 'hide' aspect; the entry reads as a damage aura, not a rimed hide.
audit finding below confidence gate: Bite Name-and-mechanic inconsistency — the Bite's contagion is described as a bite/poison effect, but the wolf has no poison traits, so the 'contagion' framing and the Poisoned key fail self-consistency; nothing in the block establishes contagion.
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] [gap] the hide chills attackers — a creature that hits or touches the wolf must make a save or suffer a cold effect — "The dire wolf harries a wounded or slowed foe, forcing it to split attention. When the wolf attacks a creature that one of its kin also threatens, it can tear at a hamstring, leaving the prey trailing frost and unable to keep pace. The wolf must be flanking with a packmate to attempt this." — Dire Wolf [seat: action [rider/on_hit/movement]] (closest offered: contagion) [effect: defense] [menu: slow-bolt contagion charge-push hook-rider pounce isolation charge rampage focus] [same-cell unoffered: bolt-drag] [same-seat rejected: affliction:legality stunning-strike:legality snatch:legality bolt-restrain:role bolt-drag:role bolt-mark:legality] [landed: contagion]
```


---


### Trenchwake Leviathan — highest CR

**Concept:** a leviathan of the trench whose song drowns fleets

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Trenchwake Leviathan [seed 1/2] | 24 | brute-21 | ok | SOFT: aim-dpr, band | ok | ok | ok | ok | ok | ok | ok | ok |

- bands · soft · aim-dpr: damage 180 a round is 28% under the card's 250
- bands · soft · band: reads CR 25.5 (print at 24 reads 17.5–25.5, n=5)
- **dropped clause:** "a leviathan of the trench whose song drowns fleets"
- read: def 26 / off 25 → 25.5; sustained 180 (2 × Flukes + legendary Sounding Surge); nova Drowning Song 78; dmg 180

```
Trenchwake Leviathan

Gargantuan Monstrosity, Neutral Evil

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

Languages Common

CR 24 (XP 62,000; PB +7)

Traits

Amphibious. The trenchwake leviathan can breathe air and water.

Ringing Hide. A creature that hits the trenchwake leviathan with a melee attack while within 5 feet of it takes 14 (4d6) Thunder damage and has the Deafened condition until the end of its next turn.

Legendary Resistance (3/Day). If the trenchwake leviathan fails a saving throw, it can choose to succeed instead.

Actions

Multiattack. The trenchwake leviathan makes two Flukes attacks.

Flukes. Melee Attack Roll: +16, reach 15 ft. 22 (3d8 + 9) Bludgeoning damage plus 14 (4d6) Thunder damage.

Drowning Song (Recharge 5-6). Constitution Saving Throw: DC 24, each creature in a 60-foot Cone. Failure: 78 (12d12) Thunder damage, and the target has the Deafened condition until the end of its next turn. Success: Half damage only.

Bonus Actions

Rebounding Thunder. One creature within 5 feet that hit the trenchwake leviathan with an attack roll since the end of the trenchwake leviathan's last turn takes 14 (4d6) Thunder damage.

Legendary Actions

Legendary Action Uses: 3. Immediately after another creature's turn, the trenchwake leviathan can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.

Sounding Surge. The trenchwake leviathan moves up to half its Speed without provoking Opportunity Attacks, and it makes one Flukes attack.

Wake Slam. Strength Saving Throw: DC 24, each creature within 10 feet of the trenchwake leviathan. Failure: The target has the Prone condition.

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
- Traits/Ringing Hide — template resonant-body; library draw (seed unstamped); binds the GM's words: toll+bell+iron
- Traits/Legendary Resistance — the chassis
- Actions/Multiattack — the chassis
- Actions/Flukes — the chassis
- Actions/Drowning Song — the chassis
- Legendary Actions/Legendary Action Uses: 3 — the chassis
- Legendary Actions/Sounding Surge — the chassis
- Legendary Actions/Wake Slam — the chassis
- Bonus Actions/Rebounding Thunder — library seed own-turn-punisher

**Engine trace**

```
[path] homebrew — "a leviathan of the trench whose song drowns fleets" (call)
[route] brute type=Monstrosity mechanics=aura — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | caster-binder: the call reads no worked magic in these words | brute-grappler: ✓ ("a leviathan of the trench") | brute-grappler: no line key in the words — the model's read of its quote | brute-grappler -> brute: a grappler is a mechanic engine and needs a key in the words — the model's read of its quote cannot land it
[concept] resolve: archetype=brute type=Monstrosity themes=aquatic/voice mind=sapient style=— energy=Thunder mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: aura
[concept] signature elements: a song that founders fleets and drowns crews [behavior] | vast trench-leviathan bulk of brine-thick hide and iron-hard ribs [body] | a low subsonic drone that precedes and punctuates its strikes [aura]
[concept] identity: The leviathan opens a naval engagement by sounding a subsonic note that rolls through hull and crew alike, cracking timbers and staggering sailors at range. Each round after it surges alongside a foundering ship, coopting its bulk and crushing limbs to stove in the hull, punctuating each ram with another thunderous note. Wounded, it does not flee — it dives beneath a crumbling fleet and circles in the deep, letting its song work on the wrecks above before rising to finish whatever still floats.
[concept] lore: It lairs in the lightless troughs where sunken fleets collect, and it sings to break the vessels above because every hull that sinks adds to the drowned hoard it keeps in the dark.
[reskin] donor: brute-21 -> CR 24 (invented — no printed peer)
[reskin] [path] decides: homebrew (the matcher agrees)
[reskin] ranged row off: "Legendary Ranged Attack" leaves with it (it made a Ranged Attack attack)
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline by rule: "the trenchwake leviathan" — the call answered "the wake leviathan" (kind), which the name does not support
[reskin] save dc derived: DC 23 -> 24 (8 + PB 7 + the sheet's best 9) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a leviathan of the trench whose song drowns fleets" -> has (mechanical) [asked: save_area]
[reskin] menu pruned: action — push-prone, thrown-burst-seed (the sheet cannot render them)
[reskin] signature idea (action): "The leviathan sends its subsonic note rolling out through the water in a wide, slow ring around itself, hull-deep and bone-deep at once. Every creature and vessel in that ring is shaken down to its fastenings, and those caught nearest the leviathan are staggered so badly that their footing and their grip fail them. The note carries far but thins with distance, fading to nothing at the edge of the " [action/always/condition] — menu: shield-bash, escalating-dread, terror-pulse, herd, drain, exploiter, gaze-single, execute, seal, lure, pacify, snare-bolt (+ shelf: second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, stunning-strike, charge-push, hook-rider, pounce, charge)
[reskin] signature bound to the concept's verb: action — lure (song)
[reskin] closest accepted: action — the call refused every template but named "terror-pulse" as nearest; it lands rather than the row being dropped (what it wanted: an area pulse that damages every creature around the leviathan and staggers the )
[reskin] free signature row: action — "terror-pulse" is the call's nearest after it refused every template, so it ships as DECORATION: no receipt, no element claim, counted in the metric. Earns no clause credit
[reskin] value check: "Foundering Note (2/Day)" EV 41.8 vs floor 64.2 (the whole Multiattack (2 attacks)) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Foundering Note (2/Day)" — the ladder could not lift it; the fallback stands in
[reskin] value check: "Answering Sting" EV 7.7 vs floor 6.2 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: own-turn-punisher -> Bonus Actions/"Answering Sting" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The leviathan's hide is brine-thick and ribbed with iron-hard bone, and any blow that lands on it rings through the water like a struck bell. Whoever strikes it feels that toll in their own chest, their ears, and their knees, so that the harder they strike, the worse it costs them." [trait/on_being_hit/damage] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura)
[reskin] free signature row: "Ringing Hide" — the trait seat cannot quote the GM, but the call names the element it expresses: "vast trench-leviathan bulk of brine-thick hide and iron-hard ribs". Earns no clause credit; the homebrew path allows 1 and this is number 2
[reskin] signature template (trait): resonant-body -> Traits/"Ringing Hide" ("any blow that lands on the hide rings through the water like a struck bell, and  [verb: toll:idea, bell:idea, iron:idea]")
[reskin] weapons answered: Flukes = none; Drowning Song = none; Hollowing Note = none; Sounding Surge = none; Wake Slam = none
[reskin] chassis nova: "Drowning Song (Recharge 5-6)" — the brute-21's own nova row (its "Area Nova", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] amphibious by concept: a creature of the deep breathes both (print: the Sea Hag's)
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] name-canon stands down: the path answered homebrew on "a leviathan of the trench whose song dro" and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] reach follows the body: Actions/"Flukes" reach 10 → 15 ft. on a Gargantuan body (print's modal reach at that size)
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 1) — "Ringing Hide" [trait/on_being_hit/damage]
[reskin] save stat from print grammar: Actions/Drowning Song imposes Deafened by its own text — no record on the row, so the grammar stood in (A2 gap)
[reskin] element claim revoked: "Ringing Hide" claims "vast trench-leviathan bulk of brine-thick hide and iron-hard ribs" but the audit returned no verdict for this row; the name carries "hide" and may not advertise what the rules do not do — flagged decoration for the rename pass
[reskin] sameness: 1 of 1 free row(s) express nothing their rules carry — counted as decoration ("Ringing Hide")
[reskin] audit rename: "Answering Sting" -> "Rebounding Thunder"
[reskin] seed share: 1 of 2 signature row(s) came from a seed (Rebounding Thunder) — the sameness metric
[reskin] [gap] an area pulse that damages every creature around the leviathan and staggers the nearest ones, rather than only frighteni — "The leviathan sends its subsonic note rolling out through the water in a wide, slow ring around itself, hull-deep and bone-deep at once. Every creature and vessel in that ring is shaken down to its fastenings, and those caught nearest the leviathan are staggered so badly that their footing and their grip fail them. The note carries far but thins with distance, fading to nothing at the edge of the " — Trenchwake Leviathan [seat: action [action/always/condition]] (closest offered: terror-pulse) [effect: damage] [menu: lure shield-bash escalating-dread terror-pulse herd drain exploiter gaze-single execute seal pacify snare-bolt] [same-cell unoffered: adhesive phobia faultless-tracker berserk marking-light] [same-seat rejected: throw-retrieve:legality zone-seed:role] [VETOED AFTER ACCEPTANCE: terror-pulse never reached the sheet]
[reskin] signature outcome: 1 of 1 accepted signature pick(s) never reached the sheet — the seat shipped a fallback or nothing
```


---


### Loft Bell — a 2024 sheet

**Concept:** a chapel bell-ringer's ghost that tolls for the dying

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Loft Bell | 3 | lurker-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1 / off 5 → 3; sustained 38 (2 × Withering Touch); nova Bloodied Burst 6; dmg 38

```
Loft Bell

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

Bloodied Burst. The first time the loft bell is Bloodied in a fight, it releases a burst. Constitution Saving Throw: DC 13, each creature in a 15-foot Emanation originating from the loft bell. Failure: 6 (1d12) Necrotic damage, and the target has the Deafened condition until the end of its next turn.

Ethereal Sight. The loft bell can see 60 feet into the Ethereal Plane when it is on the Material Plane.

Incorporeal Movement. The loft bell can move through other creatures and objects as if they were Difficult Terrain. It takes 5 (1d10) Force damage if it ends its turn inside an object.

Actions

Multiattack. The loft bell makes two Withering Touch attacks. It can replace one attack with a use of Death Knell.

Withering Touch. Melee Attack Roll: +5, reach 5 ft. 19 (3d10 + 3) Necrotic damage.

Death Knell. Constitution Saving Throw: DC 13, one creature within 60 feet. Failure: The target is branded: it takes 3 (1d6) Necrotic damage at the start of each of its turns until it uses its action to tear the brand away.

Horrific Visage. Wisdom Saving Throw: DC 13, each creature in a 60-foot Cone that can see the loft bell and isn't an Undead. Failure: 10 (2d6 + 3) Psychic damage, and the target has the Frightened condition until the start of the loft bell's next turn. Success: The target is immune to this ghost's Horrific Visage for 24 hours.

Possession (Recharge 6). Charisma Saving Throw: DC 13, one Humanoid the loft bell can see within 5 feet. Failure: The target is possessed by the loft bell; the loft bell disappears, and the target has the Incapacitated condition and loses control of its body. The loft bell now controls the body, but the target retains awareness. The loft bell can't be targeted by any attack, spell, or other effect, except ones that specifically target Undead. The loft bell's game statistics are the same, except it uses the possessed target's Speed, as well as the target's Strength, Dexterity, and Constitution modifiers.
The possession lasts until the body drops to 0 Hit Points or the loft bell leaves as a Bonus Action. When the possession ends, the loft bell appears in an unoccupied space within 5 feet of the target, and the target is immune to this ghost's Possession for 24 hours. Success: The target is immune to this ghost's Possession for 24 hours.

Etherealness. The loft bell casts the Etherealness spell, requiring no spell components and using Charisma as the spellcasting ability. The loft bell is visible on the Material Plane while on the Border Ethereal and vice versa, but it can't affect or be affected by anything on the other plane.

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
- Actions/Death Knell — template delayed-brand; library draw (seed unstamped); binds the GM's words: mark
- Actions/Horrific Visage — print's own row
- Actions/Possession — print's own row
- Actions/Etherealness — print's own row
- Traits/Bloodied Burst — template bloodied-burst; library draw (seed unstamped); the GM's clause "tolls for the dying"; binds the GM's words: toll+bell+dying+the dying
- Traits/Ethereal Sight — print's own row
- Traits/Incorporeal Movement — print's own row

**Engine trace**

```
[path] twist — Ghost (is) — "ghost" (call)
[route] lurker-phantom type=Undead mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | lurker-phantom: ✓ ("a chapel bell-ringer's ghost that tolls ") | lurker-phantom: key "ghost" (class body)
[concept] hints: phantom→style ✓ ("a chapel bell-ringer's ghost")
[concept] resolve: archetype=lurker type=Undead themes=grave/voice mind=sapient style=phantom energy=Necrotic mix=energy identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: tolling the bell for the dying [behavior] | a shadow-body stitched from bell-tower dark [body] | the chapel bell it still pulls [object]
[concept] identity: The bell-ringer's ghost opens with its own funeral toll — every chime marks a heartbeat stolen from the nearest living soul, letting the phantom drift through walls to stand behind the marked. Each round it keeps its distance atop the rafters and rings for the dying, trading a heavy wooden pull for a wave of necrotic decay that rots flesh and iron alike; it only closes to touch when a victim is nearly spent. Under pressure it clings to the belfry's shadows, refusing to fight in daylight or open ground, and never flees a chapel it haunts.
[concept] lore: A bell-ringer who died at the rope, still tolling for every soul in the parish that has not yet joined him in the loft.
[reskin] print canon route: the Ghost's body outranks the phantom seat — no verb in the words names it; the plain lurker line
[reskin] print canon defenses: HP 39 -> 45, AC 14 -> 11 — the Ghost's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 7, DEX 13, CON 10, INT 10, WIS 12, CHA 17 — the Ghost's at its own CR; attack +5 -> +5, DC 13 (print's)
[reskin] donor: lurker-2 -> CR 3
[reskin] row gated out: Teleport (teleport) — the concept did not claim this mechanic
[reskin] [path] decides: twist on the Ghost (the matcher would have said homebrew)
[reskin] print canon: "a chapel bell-ringer's ghost that tolls for the dying" heads on the Ghost — print's rows ride along; the seat stays
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline declared: "the loft bell" — the call's own answer (kind), built from the name
[reskin] inline form: "the loft bell" — the model's own reading of the name
[reskin] save dc derived: DC 12 -> 13 (8 + PB 2 + the sheet's best 3) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a chapel bell-ringer's ghost" -> has (descriptive), head | "tolls for the dying" -> has (descriptive)
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The loft bell grasps its wooden pull and tolls a heavy, mournful chime aimed at one living creature it can see. The sound sinks into that victim's chest, and every heartbeat thereafter the bell marks them: a soft echo of the chime sounds from their own body, telling the ghost exactly where they are and how close to death they stand. The tolling lasts while the phantom keeps ringing, and each time " [action/save/damage] — menu: leap, gaze-single, execute, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, terror-pulse, snare-bolt, slow-bolt, sensory-strike, drain, zone-seed, blighted-ground, trample, thrown-burst-seed, curse-debt, wind-up (+ shelf: delayed-brand, patient-defense, self-invisibility, focus, feint-slip, coating, riposte, charge-push, hook-rider, pounce, isolation)
[reskin] signature bound to the concept's verb: action — active-toll, sensory-strike (toll, bell)
[reskin] word match declined by the call: active-toll — the key word does not mean the mechanic here
[reskin] seat takes its clause: "Death Knell" answers "a chapel bell-ringer's" — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature template: delayed-brand -> Actions/"Death Knell" ("the tolling sinks into the victim, marks them with a repeated echo each heartbea [verb: mark:idea]")
[reskin] signature idea (trait): "The loft bell is a shadow-body stitched from bell-tower dark, so it clings to the high rafters and refuses open, sunlit ground. While it stays in dim light or darkness, its tolling carries farther and its clapper bites deeper against anyone already marked by its chime." [trait/always/damage] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, evasion, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature bound to the concept's verb: trait — bloodied-burst (toll, bell, dying, the dying)
[reskin] trait renamed: "Death Knell" already names a row — the trait ships as "Bloodied Burst"
[reskin] signature template (trait): bloodied-burst -> Traits/"Bloodied Burst" ("when the dying bell is first bloodied its toll bursts out as a deafening peal [verb: toll:concept, bell:concept, dying:concept, the dying:concept]")
[reskin] weapons answered: Clapper = none
[reskin] languages by mind: "None" -> "Common plus the languages it knew in life" (sapient)
[reskin] print canon languages: "Common plus the languages it knew in life" -> "Common plus one other language" — the Ghost's
[reskin] print canon speed: 30 ft. -> 5 ft. — the Ghost's walk; the concept's other modes stay
[reskin] print canon speed: Fly -> 40 ft. — the Ghost's own
[reskin] print canon attack: "Clapper" -> "Withering Touch" — the Ghost's own row
[reskin] print canon multiattack: "the loft bell makes two Withering Touch attacks." — the Ghost's own
[reskin] immunities stamped for type: Undead -> Poison; Exhaustion, Poisoned
[reskin] print canon defenses: immunities Poison; Exhaustion, Poisoned -> Necrotic, Poison; Charmed, Exhaustion, Frightened, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained; resistances none -> Acid, Bludgeoning, Cold, Fire, Lightning, Piercing, Slashing, Thunder — the Ghost's own header lines
[reskin] print canon trait: Ethereal Sight — "a chapel bell-ringer's ghost that tolls for the dying" is the Ghost (print's own row)
[reskin] print canon trait: Incorporeal Movement — "a chapel bell-ringer's ghost that tolls for the dying" is the Ghost (print's own row)
[reskin] print canon: chassis row leaves — Bonus Actions/"Umbral Step" is the seat's, not the Ghost's
[reskin] print canon row: Actions/Horrific Visage — the Ghost's own
[reskin] print canon row: Actions/Possession (Recharge 6) — the Ghost's own
[reskin] print canon row: Actions/Etherealness — the Ghost's own
[reskin] multiattack replacement clause: It can replace one attack with a use of Death Knell.
[reskin] row binds its clause: "Bloodied Burst" answers "tolls for the dying" — the keys it matched came from that clause, so the coverage credit has a receipt
[reskin] audit rewrite blocked — "Multiattack" is engine-authored chassis text
[reskin] audit rewrite blocked — "Possession (Recharge 6)" is engine-authored chassis text
[reskin] audit rewrite blocked — "Etherealness" is engine-authored chassis text
[reskin] seed share: 0 of 2 signature row(s) came from a seed — the sameness metric
```


---


### Brass Tyrant — bands soft

**Concept:** a tyrant of burning brass who rules a city of forges

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Brass Tyrant | 17 | brute-17-juggernaut | ok | SOFT: hot-offense | ok | ok | ok | ok | ok | ok | ok | ok |

- bands · soft · hot-offense: offense alone reads CR 22, 5 over; the HP axis pulls the read to 17.5
- **dropped clause:** "rules a city of forges"
- read: def 13 / off 22 → 17.5; sustained 170 (2 × Crown-Mace + legendary Crushing Advance); nova Molten Exhalation 72; dmg 170

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

Molten Spatter. A creature that touches the tyrant or hits it with a melee attack while within 5 feet of it takes 10 (3d6) Fire damage.

Legendary Resistance (3/Day). If the tyrant fails a saving throw, it can choose to succeed instead.

Immutable Form. The tyrant can't shape-shift.

Siege Monster. The tyrant deals double damage to objects and structures.

Actions

Multiattack. The tyrant makes two Crown-Mace attacks. It can replace one attack with a use of Cinder Drain.

Crown-Mace. Melee Attack Roll: +12, reach 10 ft. 20 (4d6 + 6) Bludgeoning damage plus 14 (4d6) Fire damage.

Molten Exhalation (Recharge 5-6). Strength Saving Throw: DC 19, each creature in a 30-foot Cone. Failure: 72 (16d8) Fire damage, and the target has the Prone condition. Success: Half damage only.

Cinder Drain. Constitution Saving Throw: DC 19, one creature within 30 feet. Failure: 35 (10d6) Fire damage, and the tyrant regains Hit Points equal to half the damage dealt. Success: Half damage only.

Legendary Actions

Legendary Action Uses: 3. Immediately after another creature's turn, the tyrant can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.

Crushing Advance. The tyrant moves up to half its Speed without provoking Opportunity Attacks, and it makes one Crown-Mace attack.

Sunder Walls. The tyrant moves up to half its Speed without provoking Opportunity Attacks. During this movement, it can move through Large or smaller objects and structures, destroying them.

Quake Stomp. Strength Saving Throw: DC 19, each creature within 10 feet of the tyrant. Failure: The target has the Prone condition.

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

- Traits/Molten Spatter — template heated-body; library draw (seed unstamped); binds the GM's words: burn+brass+molten
- Traits/Legendary Resistance — the chassis
- Traits/Immutable Form — the chassis
- Traits/Siege Monster — the chassis
- Actions/Multiattack — the chassis
- Actions/Crown-Mace — weapon maul
- Actions/Molten Exhalation — the chassis
- Actions/Cinder Drain — template drain; library draw (seed unstamped)
- Legendary Actions/Legendary Action Uses: 3 — the chassis
- Legendary Actions/Crushing Advance — the chassis
- Legendary Actions/Sunder Walls — the chassis
- Legendary Actions/Quake Stomp — the chassis

**Engine trace**

```
[path] homebrew — title tyrant — "a tyrant of burning brass who rules a city of forges" (call)
[route] brute-juggernaut type=Construct mechanics=aura — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | brute-juggernaut: ✓ ("burning brass") | brute-juggernaut: no line key in the words — the model's read of its quote | bane refused: the words carry no weakness clause, so "cold" answers a question nobody asked
[concept] name: provided_name rejected — "a tyrant of burning brass who rules a ci…" is the description, not a name
[concept] resolve: archetype=brute type=Construct themes=forged/elemental mind=sapient style=juggernaut energy=Fire mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: aura
[concept] signature elements: molten brass that burns as it strikes [body] | ruling a city of forges [behavior] | crown-mace of fiery brass [object]
[concept] identity: The Brass Tyrant opens a fight by wading straight through walls, gates, and ranks alike, its molten seams flaring as it swings a crown-mace that sheds gobbets of burning brass. Every round after, it pins the nearest foe against architecture it has already ruined, doling out hammering blows with the patience of a monarch who knows the city will not let him lose. It never retreats — to be bloodied is only to burn hotter, and it fights to the death with contemptuous, deliberate cruelty.
[concept] lore: Poured in the first forge of the city it now rules, the Brass Tyrant was the mold-master's final commission — a king of molten metal who seized the bellows-works and has kept every furnace lit so the city's smiths can never cool enough to forge a rival.
[reskin] donor: brute-17-juggernaut -> CR 17
[reskin] [path] decides: homebrew (the matcher agrees)
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline declared: "the tyrant" — the call's own answer (kind), built from the name
[reskin] inline form: "the tyrant" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a tyrant of burning brass" -> has (descriptive), head | "rules a city of forges" -> has (descriptive)
[reskin] menu pruned: action — push-prone, thrown-burst-seed (the sheet cannot render them)
[reskin] signature idea (action): "The Tyrant drives its mace into the ground and the forge-city answers: every furnace, crucible, and molten seam within sight of it surges in sympathy. Until the Tyrant is destroyed, any foes caught in that surge keep burning, taking more fire the longer they stay near the heat, while the Tyrant's own brass runs brighter and brighter. It is the monarch calling on the fires it rules." [action/always/damage] — menu: condition-payoff, shield-bash, escalating-dread, terror-pulse, herd, drain, exploiter (+ shelf: second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, stunning-strike, charge-push, hook-rider, pounce)
[reskin] free signature row: action — "drain" quotes nothing the GM typed and matches no key-table verb, but the call names the element it expresses: "ruling a city of forges" — a receipt the trait seat can produce. Earns no clause credit; the homebrew path allows 1 and this is number 1
[reskin] value check: "Forge Sympathy" EV 27.1 vs floor 18.2 (one attack of 2) — added Success: Half; dice 21 → 35
[reskin] signature template: drain -> Actions/"Forge Sympathy" ("every furnace, crucible, and molten seam surges and foes keep burning with more  [shape fit, no verb match]")
[reskin] signature idea (trait): "Whenever the Tyrant is struck by a weapon that cuts or pierces, molten brass spatters from the wound onto the attacker. The hotter the Tyrant burns, the more brass it sheds, so hurting it only makes its swings conflagrate." [trait/on_being_hit/damage] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] signature bound to the concept's verb: trait — heated-body (burn, brass)
[reskin] word match declined by the call: resonant-body — the key word does not mean the mechanic here
[reskin] signature template (trait): heated-body -> Traits/"Molten Spatter" ("The idea's core is that hitting the Tyrant with a cutting or piercing weapon cau [verb: burn:concept, brass:concept, molten:idea]")
[reskin] weapons answered: Crown-Mace = maul
[reskin] weapon declared: "Crown-Mace" is a maul — the call's own answer (the name alone read mace)
[reskin] chassis nova: "Molten Exhalation (Recharge 5-6)" — the brute-17-juggernaut's own nova row (its "Area Nova", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] immunities stamped for type: Construct -> Poison; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned
[reskin] resistances derived: Fire
[reskin] name-canon stands down: the path answered homebrew on "a tyrant of burning brass who rules a ci" and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] vulnerability rejected — "Cold" has no warrant in the concept's own text (print's default is none)
[reskin] multiattack replacement clause: It can replace one attack with a use of Forge Sympathy.
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 1) — "Forge Sympathy" [action/save/damage]
[reskin] save stat from print grammar: Actions/Molten Exhalation imposes Prone by its own text — no record on the row, so the grammar stood in (A2 gap)
[reskin] save re-derived after a retype: Actions/Molten Exhalation — a Constitution save for a condition the row IMPOSES, which calls for Strength or Dexterity (A2: a condition the row merely requires does not pick the stat)
[reskin] lint fixed: prone-duration — the lint's own deterministic surgery, applied before the gate reads the sheet
[reskin] audit rename: "Forge Sympathy" -> "Cinder Drain"
[reskin] seed share: 0 of 2 signature row(s) came from a seed — the sameness metric
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

Mimicry. The elemental can mimic animal sounds and humanoid voices. A creature that hears the sounds can tell they are imitations only with a successful DC 13 Wisdom (Insight) check.

Air Form. The elemental can enter a creature's space and stop there. It can move through a space as narrow as 1 inch without expending extra movement to do so.

Actions

Multiattack. The elemental makes two Thunderous Slam attacks.

Thunderous Slam. Melee Attack Roll: +8, reach 10 ft. 14 (2d8 + 5) Thunder damage. If the target is a Large or smaller creature, it is pulled up to 10 feet straight toward the elemental.

Whirlwind (Recharge 4-6). Strength Saving Throw: DC 13, one Medium or smaller creature in the elemental's space. Failure: 24 (4d10 + 2) Thunder damage, and the target is pushed up to 20 feet straight away from the elemental and has the Prone condition. Success: Half damage only.

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
- Actions/Thunderous Slam — print's own row, renamed; binds the GM's words: drag+drags
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
[concept] signature elements: a chorus of stolen voices [aura] | engulfing prey in living wind to steal its last breath [behavior] | a shifting body of churning storm-air [body]
[concept] identity: The Choir of Stolen Breath opens a fight by drifting over the battlefield and exhaling a chorus of the voices it has taken, drowning its foes in sound and stolen memory before it ever closes the distance. Every round thereafter it lunges in, wrapping a body of living wind around a target and draining the last syllables from their lungs, adding a new voice to its screaming interior. It fights with the greedy patience of a collector, refusing to flee so long as one unclaimed voice remains, and never touches the dead when a living throat can still be taken.
[concept] lore: This elemental was born where a great gale tore through a city of singers and swallowed every cry at once, and now it drifts the world hunting new throats to fill the silence it can never escape.
[reskin] print canon route: the Air Elemental's body outranks the juggernaut seat — no verb in the words names it; the plain brute line
[reskin] print canon defenses: HP 89 -> 90, AC 14 -> 15 — the Air Elemental's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 14, DEX 20, CON 14, INT 6, WIS 10, CHA 6 — the Air Elemental's at its own CR; attack +6 -> +8, DC 13 (print's)
[reskin] donor: brute-5 -> CR 5
[reskin] [path] decides: twist on the Air Elemental (the matcher agrees)
[reskin] print canon: "Air Elemental — that carries stolen voices" heads on the Air Elemental — print's rows ride along; the seat stays
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline by rule: "the elemental" — the call answered "the elemental" (kind), which the name does not support
[reskin] inline form: "the elemental" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Air Elemental —" -> has (descriptive), head | "carries stolen voices" -> has (descriptive)
[reskin] signature idea (action): "The elemental lurches over a living creature and swallows it into the churning wind of its own body, holding the victim inside the howl where its chorus presses close and drains the breath from their lungs. While caught inside, the victim can do nothing but struggle against the noise, and the elemental drags them along wherever it drifts, keeping them close until their last syllables are spent and" [rider/on_hit/condition] — menu: stunning-strike, charge-push, hook-rider, pounce, charge (+ shelf: trample, leap, shield-bash, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, rampage, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating)
[reskin] closest accepted: action — the call refused every template but named "hook-rider" as nearest; it lands rather than the row being dropped (what it wanted: engulfs one creature so it is held inside the elemental and carried along with i)
[reskin] seat takes its clause: "Breathless Chorus" answers "carries stolen voices" — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature rider: hook-rider -> Gust Lash (appended; The idea is a swallow-and-hold: the elemental engulfs a creature into its own wi [verb: drag:idea, drags:idea])
[reskin] signature idea (trait): "Every creature the elemental takes has its final sounds stripped away and layered into the elemental's own voice, so that its battle-cry is a chorus of everyone it has ever drowned. Each voice it adds lets it call louder and further, the stolen tones reaching into nearby minds and leaving foes shaken and slow with borrowed grief." [trait/always/condition] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending, weapon-lodge)
[reskin] signature bound to the concept's verb: trait — mimicry (stolen voice, stolen voices, voices)
[reskin] word match declined by the call: noxious-aura, shielded-mind, death-burst — the key word does not mean the mechanic here
[reskin] signature template (trait): mimicry -> Traits/"Mimicry" ("Its stolen voices let it speak as the creatures it has taken, sounding like them [verb: stolen voice:concept, stolen voices:concept, voices:concept]")
[reskin] weapons answered: Gust Lash = none
[reskin] languages by mind: "None" -> "Primordial" (sapient)
[reskin] print canon languages: "Primordial" -> "Primordial (Auran)" — the Air Elemental's
[reskin] print canon speed: 40 ft. -> 10 ft. — the Air Elemental's walk; the concept's other modes stay
[reskin] print canon speed: Fly -> 90 ft. — the Air Elemental's own
[reskin] print canon attack: "Gust Lash" -> "Thunderous Slam" — the Air Elemental's own row
[reskin] print canon multiattack: "the elemental makes two Thunderous Slam attacks." — the Air Elemental's own
[reskin] immunities stamped for type: Elemental -> Poison; Exhaustion, Poisoned
[reskin] print canon defenses: immunities Poison; Exhaustion, Poisoned -> Poison, Thunder; Exhaustion, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained, Unconscious; resistances none -> Bludgeoning, Lightning, Piercing, Slashing — the Air Elemental's own header lines
[reskin] print canon trait: Air Form — "Air Elemental — that carries stolen voices" is the Air Elemental (print's own row)
[reskin] print canon row: Actions/Whirlwind (Recharge 4-6) — the Air Elemental's own
[reskin] vulnerability rejected — "Cold" has no warrant in the concept's own text (print's default is none)
[reskin] row binds its clause: "Mimicry" answers "carries stolen voices" — the keys it matched came from that clause, so the coverage credit has a receipt
audit finding below confidence gate: Mimicry Speech mimicry is inconsistent with the block's own languages/ability profile (INT -2, no Charisma-based capacity), and the trait resolves only via an Insight check whose trigger timing the block never anchors.
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] [gap] engulfs one creature so it is held inside the elemental and carried along with it — "The elemental lurches over a living creature and swallows it into the churning wind of its own body, holding the victim inside the howl where its chorus presses close and drains the breath from their lungs. While caught inside, the victim can do nothing but struggle against the noise, and the elemental drags them along wherever it drifts, keeping them close until their last syllables are spent and" — Air Elemental [seat: action [rider/on_hit/condition]] (closest offered: hook-rider) [effect: movement] [menu: stunning-strike charge-push hook-rider pounce charge spew terror-pulse drain wind-up] [same-cell unoffered: affliction contagion snatch bolt-restrain bolt-mark] [same-seat rejected: affliction:legality contagion:legality isolation:role snatch:legality bolt-restrain:role bolt-drag:role bolt-mark:role] [landed: hook-rider]
```


---


### Breaching Frame — in the run

**Concept:** a siege-engine golem of lashed timber that shoulders through walls

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Breaching Frame | 8 | brute-5-juggernaut | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 7 / off 8 → 7.5; sustained 54 (2 × Timber Fist); nova none; dmg 54

```
Breaching Frame

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

Splinter Rebuke. A creature that touches the breaching frame or hits it with a melee attack while within 5 feet of it takes 7 (2d6) Slashing damage.

Lightning Absorption. Whenever the breaching frame is subjected to Lightning damage, it takes no damage and instead regains a number of Hit Points equal to the Lightning damage dealt.

Immutable Form. The breaching frame can't shape-shift.

Magic Resistance. The breaching frame has Advantage on saving throws against spells and other magical effects.

Actions

Multiattack. The breaching frame makes two Timber Fist attacks.

Timber Fist. Melee Attack Roll: +8, reach 10 ft. 27 (5d8 + 5) Bludgeoning damage. If the breaching frame moved at least 20 feet in a straight line toward the target immediately before the hit, the target takes an extra 14 (4d6) Bludgeoning damage and, if it is Large or smaller, is pushed up to 10 feet straight away from the breaching frame and has the Prone condition.

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

- Traits/Splinter Rebuke — template heated-body; library draw (seed unstamped); binds the GM's words: touch
- Traits/Lightning Absorption — the chassis
- Traits/Immutable Form — the chassis
- Traits/Magic Resistance — the chassis
- Actions/Multiattack — the chassis
- Actions/Timber Fist — binds the GM's words: bowls over

**Engine trace**

```
[path] homebrew — "a siege-engine golem of lashed timber" (call)
[route] brute-juggernaut type=Construct mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | brute-juggernaut: ✓ ("a siege-engine golem of lashed timber th") | brute-juggernaut: no line key in the words — the model's read of its quote
[concept] hints: golem→canon ✓ ("a siege-engine golem of lashed timber")
[concept] resolve: archetype=brute type=Construct themes=forged/armed mind=mindless style=juggernaut energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: shouldering through walls [behavior] | lashed and bound timber hide [body] | barrel-sized fist of bound beams [object]
[concept] identity: The Siege-Timber Golem opens a fight by charging the nearest wall or shield-line, shouldering through it in a spray of splintered stone and lashed beams before its fist follows. Every round after, it plants a clawed foot and swings its barrel-sized timber fist at anything still standing, saving one hammering blow each turn for whatever structure or formation its master designated. Under pressure it does not retreat or reason — it targets the load-bearing geometry of the fight, breaking cover and ranks apart until it is ground to kindling.
[concept] lore: Lashers build these hulks from the wreck of failed sieges, binding captured timber with chain and sap so a single animate word can send a wall of old war back through the gate it failed to take.
[reskin] donor: brute-5-juggernaut -> CR 8
[reskin] [path] decides: homebrew (the matcher would have said twist Clay Golem)
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline declared: "the breaching frame" — the call's own answer (kind), built from the name
[reskin] inline form: "the breaching frame" — the model's own reading of the name
[reskin] save dc derived: DC 15 -> 16 (8 + PB 3 + the sheet's best 5) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] lacks refused: "no reason" quotes nothing the user typed
[reskin] lacks refused: "does not retreat" quotes nothing the user typed
[reskin] the clause is its own quote: limit "at_will" stands on "shoulders through walls" — the call offered no separate quote and needs none (1b)
[reskin] clauses: "a siege-engine golem of lashed timber" -> has (descriptive), head | "shoulders through walls" -> has (mechanical) [asked: at_will/attack]
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The frame lowers its shoulder and drives forward in a straight line through whatever stands in the way — ranks of soldiers, barricades, the wall itself. Anyone and anything it bowls over is knocked sprawling and scattered, and the structure it strikes takes the hit alongside them, the stone and timber bursting apart around it. It ends the rush standing in the gap it made, ready for its fist." [action/always/movement] — menu: throw-retrieve, shield-bash, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, zone-seed (+ shelf: leap, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, blink, feint-slip, stunning-strike, charge-push, hook-rider, pounce)
[reskin] signature bound to the concept's verb: action — own-turn-punisher (lash)
[reskin] signature rider: charge-push -> Timber Fist (appended; the frame drives forward in a straight line and bowls over whatever stands in th [verb: bowls over:idea])
[reskin] signature idea (trait): "Lashed beams and driven chain flex and snap back as the frame moves, so anyone who lays a hand on it or crowds it in melee gets caught and torn by the raw edges of bound wreckage. It is fighting a wall of old war, and touching it is its own punishment." [trait/on_being_hit/damage] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] word match declined by the call: terrain-walk, absorption — the key word does not mean the mechanic here
[reskin] free signature row: "Splinter Rebuke" — the trait seat cannot quote the GM, but the call names the element it expresses: "lashed and bound timber hide". Earns no clause credit; the homebrew path allows 1 and this is number 1
[reskin] signature template (trait): heated-body -> Traits/"Splinter Rebuke" ("the frame's lashed beams and driven chain flex and snap back at anyone who lays  [verb: touch:idea]")
[reskin] repair: 1 clause(s) with no row — "shoulders through walls"; one targeted call with the sheet as context
[reskin] repair answer: attacks 0, saves 0, traits 0, reactions 0, answered [], unplaced ["description:shoulders through walls"]
[reskin] clause answered in prose: "shoulders through walls" — the call read the sheet and judged it description, not a row; the words reach the description instead
[reskin] repair: the answer held no rows — the clauses stay unplaced
[reskin] weapons answered: Timber Fist = none
[reskin] languages by body: a trap-line Construct with no voice in the concept
[reskin] immunities stamped for type: Construct -> Lightning, Poison; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned
[reskin] name-canon stands down: the path answered homebrew on "a siege-engine golem of lashed timber" and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] reach follows the body: Actions/"Timber Fist" reach 5 → 10 ft. on a Huge body (print's modal reach at that size)
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 1) — "Splinter Rebuke" [trait/on_being_hit/damage]
[reskin] asked but unanswered: "shoulders through walls" asked for at_will and no row binds the clause
[reskin] element claim revoked: "Splinter Rebuke" claims "lashed and bound timber hide" but the audit returned no verdict for this row; the name advertises nothing, so the row stands as decoration
[reskin] sameness: 1 of 1 free row(s) express nothing their rules carry — counted as decoration ("Splinter Rebuke")
audit finding below confidence gate: Timber Fist The charge rider both pushes the target 10 feet away and knocks it Prone; a Prone creature that has just been pushed away cannot be adjudicated as knocked down in the same motion without a contradictory sequence.
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
```


---


### Stone Golem — in the run

**Concept:** name: Stone Golem | carved as a weeping saint

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Stone Golem | 10 | brute-9 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 11 / off 9 → 10; sustained 48 (2 × Slam); nova Grieving Snare 17; dmg 48

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

Grieving Snare (Recharge 5-6). Strength Saving Throw: DC 17, one creature the stone golem can see within 120 feet. Failure: 17 (5d6) Necrotic damage, and the target has the Restrained condition until the Restrained is destroyed (AC 15; HP 20; Vulnerability to Bludgeoning damage; Immunity to Poison and Psychic damage).

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
- Actions/Grieving Snare — template snare; library draw (seed unstamped)
- Traits/Immutable Form — print's own row
- Traits/Magic Resistance — print's own row
- Bonus Actions/Slow — print's own row

**Engine trace**

```
[path] twist — Stone Golem (is) — "Name field: Stone Golem" (code)
[route] brute-juggernaut type=Construct mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | brute-juggernaut: ✓ ("Stone Golem") | brute-juggernaut: no line key in the words — the model's read of its quote
[concept] name: "Stone Golem" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] hints: golem→canon ✓ ("Stone Golem named as the creature")
[concept] resolve: archetype=brute type=Construct themes=grave/forged mind=sapient style=juggernaut energy=Necrotic mix=both identity=✓ lore=✓
[concept] name: provided "Stone Golem"
[concept] mechanics: none claimed
[concept] signature elements: weeping stone tears that harden into snares [behavior] | carved body of a mourning saint [body] | relentless, unbroken advance [behavior]
[concept] identity: A weeping saint carved from a single block of pale stone, it walks into battle with slow, deliberate steps and opens by driving its mass through the nearest line, head bowed as if in prayer. Every round after that it repeats the same brutal work — a heavy stone fist, a shoulder check that shatters formations — and the water streaming from its carved eyes hardens into pillars where foes try to flee. It does not tire, does not slow, and does not retreat: like the grief it embodies, it simply keeps coming until nothing is left standing.
[concept] lore: A sculptor who lost his only child carved the child's likeness into a mourning saint, and grief poured into the stone until it stood and walked out of the workshop to share the weight of loss with everything in its path.
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
[reskin] signature idea (action): "It weeps openly at a spot it can see, and the runnel of tears crawls across the ground toward that place until it pools where foes are standing. Whoever the pooled grief touches has it climb their legs and set as pale stone, pinning them in place where they stand; the stone stays until they wrench themselves free or the golem's grief is wiped away." [action/save/condition] — menu: trample, leap, thrown-burst, throw-retrieve, shield-bash, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, gaze-single, snare, seal, lure, pacify, snare-bolt (+ shelf: rampage, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, stunning-strike, charge-push, hook-rider, pounce, charge)
[reskin] free signature row: action — "snare" quotes nothing the GM typed and matches no key-table verb, but the call names the element it expresses: "weeping stone tears that harden into snares" — a receipt the trait seat can produce. Earns no clause credit; the twist/class path allows 1 and this is number 1
[reskin] seat takes its clause: "Grieving Snare (Recharge 5-6)" answers "— carved as a weeping saint" — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature template: snare -> Actions/"Grieving Snare (Recharge 5-6)" ("tears pool and climb the legs, setting as stone that pins the target in place un [shape fit, no verb match]")
[reskin] signature idea (trait): "Living grief answers grief: whenever a foe strikes the saint and draws its suffering, the same sorrow seeps back through the wound, so the striker cannot strike without sharing in it. The heavier the blow, the more of the saint's mourning they take into themselves." [trait/on_being_hit/condition] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] signature bound to the concept's verb: trait — false-appearance (stone)
[reskin] word match declined by the call: false-appearance — the key word does not mean the mechanic here
[reskin] closest accepted: trait — the call refused every template but named "heated-body" as nearest; it lands rather than the row being dropped (what it wanted: reflects damage back to the attacker proportional to the hit it just dealt)
[reskin] free signature row: trait — "heated-body" is the call's nearest after it refused every template, so it ships as DECORATION: no receipt, no element claim, counted in the metric. Earns no clause credit
[reskin] free signature row: "Sorrow's Backlash" — the call's nearest after it refused every template, so it ships as DECORATION: no receipt, no element claim, counted in the metric. Earns no clause credit
[reskin] seat takes its clause: "Sorrow's Backlash" answers "— carved as a weeping saint" — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature template (trait): heated-body -> Traits/"Sorrow's Backlash" ("The idea is a retaliatory backlash: a foe who strikes the golem shares its grief [shape fit, no verb match]")
[reskin] weapons answered: Fist = none; Tears = none; Weeping Grief = none
[reskin] languages by mind: "None" -> "Understands the languages of its creator but can't speak" (sapient)
[reskin] print canon languages: "Understands the languages of its creator but can't speak" -> "Understands Common plus two other languages but can't speak" — the Stone Golem's
[reskin] print canon speed: 40 ft. -> 30 ft. — the Stone Golem's walk; the concept's other modes stay
[reskin] print canon attack: "Fist" -> "Slam" — the Stone Golem's own row
[reskin] print canon multiattack: "the stone golem makes two attacks, using Slam or Force Bolt in any combination." — the Stone Golem's own
[reskin] print canon attack: "Force Bolt" is print's own row — +9, 22 (4d10), range 120 ft. (an exact body at print's CR)
[reskin] print canon attack: "Tears" -> "Force Bolt" — the Stone Golem's own ranged row
[reskin] immunities stamped for type: Construct -> Poison; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned
[reskin] print canon defenses: immunities Poison; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned -> Poison, Psychic; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned — the Stone Golem's own header lines
[reskin] name-canon trait stamped: Immutable Form (the name says so; print says what it does)
[reskin] name-canon trait stamped: Magic Resistance (the name says so; print says what it does)
[reskin] print canon trait: Immutable Form — print's text replaces the chassis's (the Troll regenerates 15, not the chassis's 10 — critic's audit 2026-10-02)
[reskin] print canon trait: Magic Resistance — print's text replaces the chassis's (the Troll regenerates 15, not the chassis's 10 — critic's audit 2026-10-02)
[reskin] print canon row: Bonus Actions/Slow (Recharge 5-6) — the Stone Golem's own
[reskin] free row over budget: Traits/"Sorrow's Backlash" leaves at ship — this sheet's free-row budget (1) is spent by a row that SHIPPED
[reskin] free-row budget: 2 candidate(s) reached the finished sheet, 1 kept (budget 1) — "Grieving Snare" [action/save/condition]
[reskin] audit rewrite blocked — "Multiattack" is engine-authored chassis text
[reskin] audit rewrite blocked — "Slow (Recharge 5-6)" is engine-authored chassis text
[reskin] audit rename blocked — "Stone Grasp" promises the Grappled condition that "Grieving Snare (Recharge 5-6)" does not deliver
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] [gap] reflects damage back to the attacker proportional to the hit it just dealt — "Living grief answers grief: whenever a foe strikes the saint and draws its suffering, the same sorrow seeps back through the wound, so the striker cannot strike without sharing in it. The heavier the blow, the more of the saint's mourning they take into themselves." — Stone Golem [seat: trait [trait/on_being_hit/condition]] (closest offered: heated-body) [effect: damage] [menu: false-appearance heated-body absorption bloodied-burst resonant-body weapon-lodge bloodied-fury] [same-cell unoffered: none] [same-seat rejected: none] [VETOED AFTER ACCEPTANCE: heated-body never reached the sheet]
[reskin] signature outcome: 1 of 1 accepted signature pick(s) never reached the sheet — the seat shipped a fallback or nothing
```


---


### Hive-Archon — in the run

**Concept:** a plague-bearing archon of flies that commands lesser swarms

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Hive-Archon | 13 | skirmisher-13-winged | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 9 / off 16 → 12.5; sustained 72 (3 × Talons); nova Plague Column 67; dmg 93

```
Hive-Archon

Large Celestial, Neutral Evil

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

Resistances Radiant

Immunities Charmed

Senses darkvision 120 ft.; Passive Perception 18

Languages Common

CR 13 (XP 10,000; PB +5)

Traits

Hive Sovereignty. While at least one swarm is within 60 feet of the hive-archon and can see or hear it, the hive-archon can command one such swarm on its turn; the swarm obeys a simple order the hive-archon gives, moving or attacking as the hive-archon directs.

Plague Emanation. The first time the hive-archon is Bloodied in a fight, it releases a burst. Constitution Saving Throw: DC 17, each creature in a 30-foot Emanation originating from the hive-archon. Failure: 24 (7d6) Poison damage, and the target has the Poisoned condition until the end of its next turn. Success: Half damage only.

Flyby. The hive-archon doesn't provoke Opportunity Attacks when it flies out of an enemy's reach.

Wheeling Drift. When a creature the hive-archon can see ends its turn within 5 feet of it, the hive-archon can move up to 10 feet without provoking Opportunity Attacks.

Actions

Multiattack. The hive-archon makes three Talons attacks.

Talons. Melee Attack Roll: +10, reach 10 ft. 14 (2d8 + 5) Slashing damage plus 10 (3d6) Poison damage. If the hive-archon flew at least 20 feet in a straight line toward the target immediately before the hit, the target takes an extra 7 (2d6) Slashing damage and, if it is Large or smaller, has the Prone condition. If the target is a creature, it is subjected to the following effect. Constitution Saving Throw: DC 17. Failure: The target has the Poisoned condition. While Poisoned this way, the target can't regain Hit Points. The condition lasts until the target finishes a Long Rest or is cured by the Lesser Restoration spell or similar magic. Success: The target is immune to this creature's contagion for 24 hours.

Plague Column (Recharge 5-6). The hive-archon flies up to its Speed without provoking Opportunity Attacks. Each creature it passes within 5 feet during this movement is targeted once by the following effect. Strength Saving Throw: DC 17. Failure: 67 (15d8) Poison damage, and the target has the Prone condition. Success: Half damage.

Bonus Actions

Aerial Agility. The hive-archon takes the Dash or Disengage action.

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

- Traits/Hive Sovereignty — authored for this sheet; the GM's clause "commands lesser swarms"
- Traits/Plague Emanation — template bloodied-burst; library draw (seed unstamped); binds the GM's words: bloodied+wounded
- Traits/Flyby — the chassis
- Traits/Wheeling Drift — the chassis
- Actions/Multiattack — the chassis
- Actions/Talons — binds the GM's words: plague+plagued+sickening
- Actions/Plague Column — the chassis
- Bonus Actions/Aerial Agility — the chassis

**Engine trace**

```
[path] homebrew — "a plague-bearing archon of flies that commands lesser swarms" (call)
[route] skirmisher-winged type=Celestial mechanics=aura — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | skirmisher-winged: ✓ ("archon of flies") | skirmisher-winged: key "flies" (class verb)
[concept] name: provided_name rejected — "a plague-bearing archon of flies that co…" is the description, not a name
[concept] hints: swarm→body ✓ ("commands lesser swarms") | winged→style ✓ ("commands lesser swarms of flies")
[concept] resolve: archetype=skirmisher type=Celestial themes=celestial/venomous mind=sapient style=winged energy=Poison mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: aura
[concept] signature elements: commands lesser swarms of plague-flies [behavior] | a body of rotted, plague-bearing light [body] | swooping dives that tear and drop prey [behavior]
[concept] identity: The Hive-Archon opens by loosing a shrieking column of its own black swarm at the nearest cluster of foes, then rides the cloud down in a corkscrew dive to tear at a straggler with filth-crusted talons before wheeling out of reach. Every round it circles above, seeding the air with blight and calling fresh broods from its own rotted light, refusing to trade blows on the ground. Pressured or bloodied, it does not flee — it folds its lesser swarms into a living shroud around its body and fights to the last mote, treating its flies as armor and ablative flesh alike.
[concept] lore: A celestial whose mandate was to purge corruption from the world and who instead absorbed it, the Hive-Archon now drifts on dying wind over the lands it was charged to cleanse, breeding its plague-broods from the rot it was meant to end.
[reskin] donor: skirmisher-13-winged -> CR 13 (invented — no printed peer)
[reskin] [path] decides: homebrew (the matcher agrees)
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline declared: "the hive-archon" — the call's own answer (kind), built from the name
[reskin] inline form: "the hive-archon" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a plague-bearing archon of flies" -> has (descriptive), head | "commands lesser swarms" -> has (mechanical)
[reskin] menu pruned: action — thrown-burst-seed, phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The hive-archon funnels its cloud of flies into a roaring spear of insect mass and drives it down on one prey it can see, ploughing a bursting furrow through the ground where it strikes. The target is torn by the charged swarm and flung off its feet, and on impact the swarm bursts outward, sickening everything crowded around the impact with a choking haze of blight. Creatures already reeling and u" [rider/on_hit/damage] — menu: contagion, stunning-strike, charge-push, hook-rider, pounce, isolation, charge (+ shelf: condition-payoff, shield-bash, lure, snare-bolt, sensory-strike, disarm, delayed-brand, exploiter, herd, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, rally, riposte)
[reskin] signature bound to the concept's verb: action — contagion (plague, plagued)
[reskin] word match declined by the call: charge, charge-push, pounce, herd, exploiter — the key word does not mean the mechanic here
[reskin] signature rider: contagion -> Talons (appended; on impact the swarm bursts outward, sickening everything crowded around the impa [verb: plague:concept, plagued:concept, sickening:idea])
[reskin] signature idea (trait): "The hive-archon's flesh is a mass of flies, and any blow that wounds it tears free a pocket of the brood; a living gout of beetles and biting flies swarms out of the wound and surrounds the attacker, lingering to sting and distract every foe that crowds too near the archon. The swarm feeds on the enemy's blood and heat, thickening the longer it clings, and only thins once the prey scatters away fr" [trait/on_being_hit/damage] — menu: heated-body, absorption, bloodied-burst, resonant-body (+ shelf: adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, warded-mending, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] signature bound to the concept's verb: trait — heated-body (plague)
[reskin] word match declined by the call: heated-body, absorption, bloodied-fury, uncanny-sense, resonant-body — the key word does not mean the mechanic here
[reskin] free signature row: "Brood Burst" — the trait seat cannot quote the GM, but the call names the element it expresses: "commands lesser swarms of plague-flies". Earns no clause credit; the homebrew path allows 1 and this is number 1
[reskin] signature template (trait): bloodied-burst -> Traits/"Brood Burst" ("The archon's flesh tears open when wounded, releasing a pocket of the brood — a  [verb: bloodied:idea, wounded:idea]")
[reskin] repair: 1 clause(s) with no row — "commands lesser swarms"; one targeted call with the sheet as context
[reskin] repair answer: attacks 0, saves 0, traits 1, reactions 0, answered [], unplaced []
[reskin] condition relation: "Hive Sovereignty" — the call reads its condition as none, so no condition is recorded against it
[reskin] repaired sheet: 1 attack row(s), 0 save, 1 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] weapons answered: Talons = none
[reskin] chassis nova: "Plague Column (Recharge 5-6)" — the skirmisher-13-winged's own nova row (its "Diving Attack", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] immunities stamped for type: Celestial -> Charmed
[reskin] resistances derived: Radiant
[reskin] name-canon stands down: the path answered homebrew on "a plague-bearing archon of flies that co" and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] vulnerability rejected — "Radiant" has no warrant in the concept's own text (print's default is none)
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 1) — "Brood Burst" [trait/on_being_hit/damage]
[reskin] element claim revoked: "Brood Burst" claims "commands lesser swarms of plague-flies" but the audit returned no verdict for this row; the name advertises nothing, so the row stands as decoration
[reskin] sameness: 1 of 1 free row(s) express nothing their rules carry — counted as decoration ("Brood Burst")
[reskin] audit rename: "Brood Burst" -> "Plague Emanation"
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
```


---


### Purple Worm — in the run

**Concept:** name: Purple Worm | that swallowed a war-band's armoury

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Purple Worm | 15 | brute-13 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- **dropped clause:** "swallowed a war-band's armoury"
- read: def 12 / off 11 → 11.5; sustained 51 (1 × Tail Stinger); nova Erupting Gullet 42; dmg 51

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

Lodged Armoury. When a creature hits the purple worm with a nonmagical weapon, the weapon lodges in the purple worm's body. A lodged weapon can be pulled free by a creature within reach that succeeds on a DC 21 Strength (Athletics) check as an action; while lodged, the purple worm can use it: its Bite attacks deal an extra 22 (5d8) Acid damage per lodged weapon (maximum two).

Tunneler. The purple worm can burrow through solid rock at half its Burrow Speed and leaves a 10-foot-diameter tunnel in its wake.

Actions

Multiattack. The purple worm makes one Bite attack and one Tail Stinger attack.

Bite. Melee Attack Roll: +14, reach 10 ft. 22 (3d8 + 9) Piercing damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 22), and it has the Restrained condition until the grapple ends.

Tail Stinger. Melee Attack Roll: +14, reach 10 ft. 16 (2d6 + 9) Piercing damage plus 35 (10d6) Poison damage.

Erupting Gullet (Recharge 5-6). If the purple worm is burrowing, it erupts from the ground at a point within 5 feet of one creature. Dexterity Saving Throw: DC 21, that creature. Failure: 42 (12d6) Acid damage, and the target has the Prone condition. The purple worm then makes one Bite attack against the target.

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
- Actions/Erupting Gullet — template burrow-ambush; library draw (seed unstamped); binds the GM's words: erupt+beneath
- Traits/Lodged Armoury — template weapon-lodge; library draw (seed unstamped)
- Traits/Tunneler — print's own row
- Bonus Actions/Swallow — print's own row

**Engine trace**

```
[path] twist — Purple Worm (is) — "Name field: Purple Worm" (code)
[route] brute-grappler type=Monstrosity mechanics=grapple, engulf — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: on the GM's own words "that swallowed a war-band's armoury" | brute-grappler: ✓ ("that swallowed a war-band's armoury") | brute-grappler: no line key in the words — the model's read of its quote
[concept] name: "Purple Worm" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] resolve: archetype=brute type=Monstrosity themes=devouring/subterranean mind=bestial style=grappler energy=Acid mix=both identity=✓ lore=✓
[concept] name: provided "Purple Worm"
[concept] mechanics: grapple, engulf
[concept] signature elements: burrowing ambush from below [behavior] | swallowed armoury: hide plated in blades and mail [body] | grinding, acid-etched gullet that engulfs prey [behavior]
[concept] identity: A purple worm grown vast and grotesque on the swallowed armoury of a war-band — its hide studded with blades and mail that never dissolved, its gullet packed with rusted steel and burst powder. It opens by bursting from below in a shower of splintered earth to seize the largest target in its rings of teeth, then every round grinds and drags them deeper while acid-etched swords and arrowheads jutting from its flesh rake anything close; it does not flee, fighting to the death because its own armour has healed shut around the wounds it takes.
[concept] lore: Deep in the tunnels where an army's supply train was lost, a purple worm swallowed the whole armoury — and in digesting it, grew plated in the weapons of the dead, forever hungry for the iron and flesh that feed it.
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
[reskin] signature idea (action): "It dives beneath the ground and erupts directly under the biggest creature it can sense, bursting up in a fountain of splintered rock and swallowed steel. The eruption slams that target upward and hurls it away from the worm, landing it prone and stunned in the rubble while the worm rears out of the crater to strike." [rider/on_hit/movement] — menu: contagion, stunning-strike, charge-push, hook-rider, pounce, charge (+ shelf: swallow, condition-payoff, shield-bash, hook-drag, burrow-ambush, escalating-dread, terror-pulse, herd, drain, exploiter, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating)
[reskin] signature bound to the concept's verb: action — swallow (swallow, swallows, swallowed)
[reskin] word match declined by the call: swallow, stunning-strike, hook-drag, exploiter, contagion, charge-push, hook-rider, pounce, charge, condition-payoff — the key word does not mean the mechanic here
[reskin] closest accepted: action — the call refused every template but named "burrow-ambush" as nearest; it lands rather than the row being dropped (what it wanted: an eruption that flings the target away from the worm and leaves it prone and st)
[reskin] seat takes its clause: "Erupting Gullet (Recharge 5-6)" answers "swallowed a war-band's armoury" — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature template: burrow-ambush -> Actions/"Erupting Gullet (Recharge 5-6)" ("The idea is a burrowing eruption that slams the target upward, hurls it away, la [verb: erupt:idea, beneath:idea]")
[reskin] signature idea (trait): "Every time it is struck in melee, the sword-blades and arrowheads fused into its hide bite back at the attacker, and the worm grinds the buried armour in its gullet so that its own wounds knit shut at the start of each of its turns." [trait/on_being_hit/damage] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, earth-glide, tunneler, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] signature bound to the concept's verb: trait — tunneler (worm)
[reskin] word match declined by the call: tunneler, warded-mending, heated-body, absorption, bloodied-burst, bloodied-fury, resonant-body — the key word does not mean the mechanic here
[reskin] pick kept on the GM's own words: trait — "weapon-lodge" has no key-table verb, but the call quotes "that swallowed a war band's armoury" from the description
[reskin] seat takes its clause: "Lodged Armoury" answers "swallowed a war-band's armoury" — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature template (trait): weapon-lodge -> Traits/"Lodged Armoury" ("The worm's hide is fused with blades and mail from the armoury it swallowed; str [shape fit, no verb match]")
[reskin] weapons answered: Bite = none; Acid Gout = none; Iron-Fanged Grip = none
[reskin] chassis nova: "Acid Gout (Recharge 5-6)" — the brute-13's own nova row (its "Area Nova", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] print canon speed: 40 ft. -> 50 ft. — the Purple Worm's walk; the concept's other modes stay
[reskin] print canon speed: Burrow -> 50 ft. — the Purple Worm's own
[reskin] print canon row: Actions/Tail Stinger — the Purple Worm's second melee row, beside the chassis's
[reskin] print canon multiattack: "the purple worm makes one Bite attack and one Tail Stinger attack." — the Purple Worm's own
[reskin] languages held: None stands — INT 1 on a Monstrosity speaks nothing, whatever the mind read said
[reskin] print canon trait: Tunneler — "Purple Worm — that swallowed a war-band's armoury" is the Purple Worm (print's own row)
[reskin] print canon: chassis row leaves — Actions/"Acid Gout (Recharge 5-6)" is the seat's nova, not the Purple Worm's
[reskin] print canon row: Bonus Actions/Swallow — the Purple Worm's own
audit finding below confidence gate: Erupting Gullet The eruption point defines where the worm emerges but the block never says what happens to the worm's position relative to that point or whether the target must be reachable by the subsequent Bite.
[reskin] audit rewrite blocked — "Multiattack" is engine-authored chassis text
[reskin] audit rewrite blocked — "Swallow" is engine-authored chassis text
[reskin] seed share: 0 of 2 signature row(s) came from a seed — the sameness metric
[reskin] [gap] an eruption that flings the target away from the worm and leaves it prone and stunned, then lets the worm strike — "It dives beneath the ground and erupts directly under the biggest creature it can sense, bursting up in a fountain of splintered rock and swallowed steel. The eruption slams that target upward and hurls it away from the worm, landing it prone and stunned in the rubble while the worm rears out of the crater to strike." — Purple Worm [seat: action [rider/on_hit/movement]] (closest offered: burrow-ambush) [effect: movement] [menu: swallow contagion stunning-strike charge-push hook-rider pounce charge burrow-ambush condition-payoff hook-drag exploiter] [same-cell unoffered: bolt-drag] [same-seat rejected: affliction:legality isolation:role snatch:legality bolt-restrain:role bolt-drag:role bolt-mark:role] [landed: burrow-ambush]
[reskin] escape dc: Bite → DC 22 (8 + PB + STR; a late row wore another number)
```


---


### Pit Fiend — in the run

**Concept:** name: Pit Fiend | who collects the oaths of dying knights

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Pit Fiend | 20 | defender-17 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 21 / off 11 → 16; sustained 43 (1 × Fiery Mace); nova Infernal Detonation 28; dmg 47

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

Senses darkvision 60 ft.; Passive Perception 20

Languages Infernal; telepathy 120 ft.

CR 20 (XP 25,000; PB +6)

Traits

Infernal Detonation. The pit fiend explodes when it dies. Dexterity Saving Throw: DC 21, each creature in a 30-foot Emanation originating from the pit fiend. Failure: 28 (8d6) Bludgeoning damage. Success: Half damage. The explosion destroys the pit fiend's body.

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

- Traits/Infernal Detonation — template death-burst; library draw (seed unstamped); the GM's clause "collects the oaths of dying knights"; binds the GM's words: dying+die+last breath
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
[concept] resolve: archetype=defender type=Fiend themes=none mind=? style=— energy=— mix=— identity=✓
[concept] name: provided "Pit Fiend"
[concept] mechanics: none claimed
[concept] identity: A towering archfiend of blackened iron plate strides into battle already counting the oaths it will harvest, meeting the party's charge head-on and locking the field around itself so none can slip past to the squishier ranks. Every round it answers with a shield-driven slam that brands a foe with a searing rune-oath, daring that foe to break the pact and suffer the penance — and the strongest blow landed on it is met with a counter-challenge, forcing the attacker to swear or be broken. It never retreats; bloodied, it grows louder and more imperious, demanding that the dying swear to it as they fall, and it fights to the last plate rather than yield.
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
[reskin] signature idea (action): "When the pit fiend strikes a foe with its branded rune still glowing, it names that oath broken and calls down penance — the rune flares, wrecking the oathbreaker's body and searing away whatever protections or blessings they carry, then goes dark. Only a foe actually wearing its mark can be judged this way, so the fiend must earn its verdicts by landing the brand first." [rider/on_hit/damage] — menu: stunning-strike, charge-push, hook-rider, isolation, charge (+ shelf: seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, herd, curse-debt, reveal, wind-up, exploiter, patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, riposte)
[reskin] signature bound to the concept's verb: action — aggro-curse, curse-debt (oath)
[reskin] word match declined by the call: curse-debt, aggro-curse, exploiter — the key word does not mean the mechanic here
[reskin] closest refused: action — "isol鹿ation" was named closest but was never on this sheet's menu
[reskin] decline reason: action — the call answered none and names it "no_fit" after being shown aggro-curse, curse-debt, which the GM's words keyed
[reskin] key match declined: action — "aggro-curse" was ranked first on the call's own menu for oath, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: action — "When the pit fiend strikes a foe with its branded rune still glowing, it names that oath broken and calls down penance — the rune flares, wrecking the oathbreaker's body and searing away whatever protections or blessings they carry, then goes dark. Only a foe actually wearing its mark can be judged this way, so the fiend must earn its verdicts by landing the brand first." [rider/on_hit/damage] — the model found no template that holds it (offered: aggro-curse, curse-debt, stunning-strike, charge-push, hook-rider, isolation, charge, reveal, rally, herd, exploiter, patient-defense, lay-on-hands)
[reskin] fallback respects the call: curse-debt, aggro-curse, exploiter left the shelf — the call declined them for this sheet
[reskin] fallback stands down: the twist path has no shelf — the Pit Fiend's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 21 already beats print's 19 at CR 20, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "Any creature that drops in the pit fiend's presence is not allowed to die unclaimed: as their last breath leaves, a burning question is pressed into them, and those who refuse the oath are dragged down harder than they fell, while those who swear rise again as its sworn servants for the rest of the fight. It cannot claim the same fallen soul twice, and the living who watch can still drag their com" [trait/always/condition] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending, weapon-lodge)
[reskin] signature bound to the concept's verb: trait — death-burst, bloodied-burst (dying)
[reskin] closest accepted: trait — the call refused every template but named "death-burst" as nearest; it lands rather than the row being dropped (what it wanted: claims a creature as it drops to 0 HP, forcing it to swear or be pulled down and)
[reskin] signature template (trait): death-burst -> Traits/"Oath Claiming" ("The idea is a death-triggered oath pact: dying creatures must swear or be dragge [verb: dying:concept, die:idea, last breath:idea]")
[reskin] weapons answered: Ironslam = none
[reskin] speed by concept: added Fly 30 ft. — the concept's movement set decides
[reskin] print canon languages: "None" -> "Infernal; telepathy 120 ft." — the Pit Fiend's
[reskin] print canon speed: Fly -> 60 ft. — the Pit Fiend's own
[reskin] print canon row: Actions/Devilish Claw — the Pit Fiend's second melee row, beside the chassis's
[reskin] print canon row: Actions/Fiery Mace — the Pit Fiend's second melee row, beside the chassis's
[reskin] print canon attack: "Ironslam" -> "Bite" — the Pit Fiend's own row
[reskin] print canon multiattack: "the pit fiend makes one Bite attack, two Devilish Claw attacks, and one Fiery Mace attack." — the Pit Fiend's own
[reskin] immunities stamped for type: Fiend -> Poison; Poisoned
[reskin] print canon skills: "Athletics +14, Perception +10" -> "Perception +10, Persuasion +19" — the Pit Fiend's own skills, each derived from this sheet's stat and PB
[reskin] print canon defenses: immunities Poison; Poisoned -> Fire, Poison; Poisoned; resistances none -> Cold — the Pit Fiend's own header lines
[reskin] resistances derived withheld: print's Pit Fiend owns the line (Cold)
[reskin] print canon trait: Diabolical Restoration — "Pit Fiend — who collects the oaths of dying knights" is the Pit Fiend (print's own row)
[reskin] print canon trait: Fear Aura — "Pit Fiend — who collects the oaths of dying knights" is the Pit Fiend (print's own row)
[reskin] print canon trait: Magic Resistance — "Pit Fiend — who collects the oaths of dying knights" is the Pit Fiend (print's own row)
[reskin] print canon legendary: the chassis's Legendary Actions leave — the Pit Fiend has none of its own at its CR
[reskin] print canon row: Actions/Hellfire Spellcasting (Recharge 4-6) — the Pit Fiend's own
[reskin] row binds its clause: "Oath Claiming" answers "collects the oaths of dying knights" — the keys it matched came from that clause, so the coverage credit has a receipt
[reskin] audit rename: "Oath Claiming" -> "Infernal Detonation"
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] [gap] strips or suppresses the target's active protections and blessings when the marked foe is struck — "When the pit fiend strikes a foe with its branded rune still glowing, it names that oath broken and calls down penance — the rune flares, wrecking the oathbreaker's body and searing away whatever protections or blessings they carry, then goes dark. Only a foe actually wearing its mark can be judged this way, so the fiend must earn its verdicts by landing the brand first." — Pit Fiend [seat: action [rider/on_hit/damage]] (closest offered: isol鹿ation — NOT ON THE MENU) [effect: defense] [menu: aggro-curse curse-debt stunning-strike charge-push hook-rider isolation charge reveal rally herd exploiter patient-defense lay-on-hands] [same-cell unoffered: none] [same-seat rejected: affliction:role contagion:role pounce:role snatch:role bolt-restrain:role bolt-drag:role bolt-mark:role] [row dropped]
[reskin] [gap] claims a creature as it drops to 0 HP, forcing it to swear or be pulled down and return as a servant, once per soul — "Any creature that drops in the pit fiend's presence is not allowed to die unclaimed: as their last breath leaves, a burning question is pressed into them, and those who refuse the oath are dragged down harder than they fell, while those who swear rise again as its sworn servants for the rest of the fight. It cannot claim the same fallen soul twice, and the living who watch can still drag their com" — Pit Fiend [seat: trait [trait/always/condition]] (closest offered: death-burst) [effect: condition] [menu: death-burst bloodied-burst false-appearance adhesive phobia terrain-walk aberrant-ground faultless-tracker web-walker noxious-aura bloodied-fury uncanny-sense berserk shielded-mind relentless-pursuit bound marking-light sealed-body guarded-stance undead-fortitude mimicry truth-aura gaze-aura heated-body] [same-cell unoffered: none] [same-seat rejected: spider-climb:legality earth-glide:legality tunneler:legality evasion:role assassinate:role blurred-form:role] [landed: death-burst]
[reskin] signature outcome: 1 of 2 accepted signature pick(s) never reached the sheet — the seat shipped a fallback or nothing
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
[concept] signature elements: bear-and-owl hybrid body [body] | hooked beak and raking foreclaws [body] | relentless, cornered-animal savagery [behavior]
[concept] identity: The owlbear crashes out of cover on four heavy limbs, driving its hooked beak into the nearest body before it has finished roaring, then keeps mauling — beak and foreclaws alternating on whoever stands closest. It never backs off, never circles, never plays; as its hide runs red it only bellows louder and presses harder, fighting until one side is a mess on the ground.
[concept] lore: Said to be a bear that mated with a hunting owl in a wizard's old menagerie, the owlbear roams border woods and forgotten ruins, wanting nothing but the next warm thing it can catch and tear apart.
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
[reskin] print canon multiattack: "the owlbear makes two Rend attacks." — the Owlbear's own, added (the chassis carried none; the Owlbear makes two Rend attacks — canaries 2026-10-12)
[reskin] languages held: None stands — INT 3 on a Monstrosity speaks nothing, whatever the mind read said
[reskin] print canon skills: "Athletics +7, Perception +3" -> "Perception +5" — the Owlbear's own skills, each derived from this sheet's stat and PB
[reskin] audit rewrite blocked — "Multiattack" is engine-authored chassis text
```


---


### Vashka the Red — in the run

**Concept:** name: Vashka the Red | A hobgoblin warlord in lacquered plate who fights from a shield wall and never breaks ranks.

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Vashka the Red | 6 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
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

Thunderous Riposte. A creature that hits Vashka with a melee attack while within 5 feet of it takes 7 (2d6) Thunder damage and has the Deafened condition until the end of its next turn.

Actions

Multiattack. Vashka makes three Longsword attacks. It can replace one attack with a use of Shield Bash.

Longsword. Melee Attack Roll: +7, reach 5 ft. 11 (2d6 + 4) Slashing damage.

Wall Surge. Wisdom Saving Throw: DC 15, each creature of Vashka's choice within 30 feet. Failure: The target immediately moves up to half its Speed in a direction of Vashka's choice, using the safest available route.

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

- Traits/Thunderous Riposte — template resonant-body; library draw (seed unstamped); binds the GM's words: iron
- Actions/Multiattack — the chassis
- Actions/Longsword — print's own row, renamed; weapon longsword
- Actions/Wall Surge — template herd; library draw (seed unstamped); binds the GM's words: drive
- Actions/Shield Bash — print's own row
- Reactions/Riposte — template riposte; fighter kit; the GM's clause "warlord"

**Engine trace**

```
[path] class_npc — class fighter — "warlord" (call)
[route] defender type=Humanoid mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | defender-leader: ✓ ("A hobgoblin warlord") | defender-leader -> defender: the concept's VERB outranks the noun (key "shield wall", class verb) | defender: key "shield wall" (class verb)
[concept] name: "Vashka the Red" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] resolve: archetype=defender type=Humanoid themes=armed/forged mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: provided "Vashka the Red"
[concept] mechanics: none claimed
[concept] signature elements: shield-wall discipline that never breaks ranks [behavior] | lacquered plate armor [object] | punishing anyone who moves past her [behavior]
[concept] identity: Vashka the Red anchors the center of a shield wall of lacquered iron, opening every fight by locking her line and daring the enemy to come to her — and the wall never breaks, it grinds. Every round she braces, punishing anyone who slips past or tries to flank with a shield-bash and a curved blade that keeps the formation intact, fighting to the death rather than yielding a single step of ground.
[concept] lore: A hobgoblin warlord whose iron legion is bound by oath and lacquer — she fights not to win glory but to hold ground until her enemies break themselves against her.
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
[reskin] the clause is its own quote: trigger "at_will" stands on "fights from a shield wall" — the call offered no separate quote and needs none (1b)
[reskin] the clause is its own quote: limit "at_will" stands on "fights from a shield wall" — the call offered no separate quote and needs none (1b)
[reskin] lacks not claimed: "never breaks ranks" reads like a lack to the words, and the call's list did not name it
[reskin] clauses: "Vashka the Red — A hobgoblin warlord in lacquered plate" -> has (descriptive), head | "fights from a shield wall" -> has (mechanical) [asked: at_will/at_will/attack] | "never breaks ranks" -> has (mechanical) [asked: buff_self]
[reskin] menu pruned: action — phase-slip, snap-shot (the sheet cannot render them)
[reskin] signature idea (action): "Vashka drives her whole wall forward in a grinding shove, and every ally pressed alongside her is carried with it. As the line surges, each enemy caught directly in front of the formation is knocked staggering off balance and shoved back from where it stood, whether or not they are the one she swings at. The push costs her the initiative to move first, so she must time it to when the enemy has alr" [action/always/movement] — menu: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, wail, zone-seed (+ shelf: patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, rampage, focus, feint-slip, stunning-strike, charge-push, hook-rider)
[reskin] signature bound to the concept's verb: action — rally (shield)
[reskin] word match declined by the call: push-prone, shield-bash — the key word does not mean the mechanic here
[reskin] seat takes its clause: "Wall Surge (2/Day)" answers "Vashka the Red — A hobgoblin in lacquered plate" — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature template: herd -> Actions/"Wall Surge (2/Day)" ("the wall surges forward and drives enemies caught in front of the formation, sta [verb: drive:idea]")
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 16 already beats print's 15 at CR 6, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "The lacquered iron of her plate remembers every blow landed on it; each hit chips lacquer and heats the layer beneath, until the armor itself answers the next attacker with a burst of scalding shards. The more she is struck within a stretch of fighting, the hotter and more dangerous her plate becomes to touch." [trait/on_being_hit/damage] — menu: absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, evasion, blurred-form)
[reskin] word match declined by the call: bloodied-burst, absorption, weapon-lodge — the key word does not mean the mechanic here
[reskin] closest accepted: trait — the call refused every template but named "resonant-body" as nearest; it lands rather than the row being dropped (what it wanted: damage output that increases each time she is hit in a fight, so the retaliation)
[reskin] free signature row: "Lacquer Scald" — the call's nearest after it refused every template, so it ships as DECORATION: no receipt, no element claim, counted in the metric. Earns no clause credit
[reskin] seat takes its clause: "Lacquer Scald" answers "Vashka the Red — A hobgoblin in lacquered plate" — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature template (trait): resonant-body -> Traits/"Lacquer Scald" ("The idea is a reactive damage burst that grows as she is struck, scalding attack [verb: iron:idea]")
[reskin] repair: 1 clause(s) with no row — "never breaks ranks"; one targeted call with the sheet as context
[reskin] repair answer: attacks 0, saves 0, traits 0, reactions 0, answered [], unplaced ["description:never breaks ranks"]
[reskin] clause answered in prose: "never breaks ranks" — the call read the sheet and judged it description, not a row; the words reach the description instead
[reskin] repair: the answer held no rows — the clauses stay unplaced
[reskin] weapons answered: Curved Blade = scimitar; Shield Wall = shield
[reskin] weapon declared: "Curved Blade" is a scimitar — the call's own answer (the name alone read longsword)
[reskin] print canon alignment: Lawful Neutral -> Neutral — the Gladiator's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common, Goblin" -> "Common, Goblin" — the Gladiator's plus the concept's Goblin
[reskin] print canon attack: "Spear" keeps print's hybrid frame — reach 5 ft. or range 20/60 ft. (the Gladiator's weapon is thrown)
[reskin] print canon attack: "Curved Blade" -> "Spear" — the Gladiator's own row
[reskin] print canon rows: Shield Wall leave — the Gladiator has one melee row (Spear), and Multiattack reads print's
[reskin] print canon multiattack: "Vashka makes three Spear attacks. It can replace one attack with a use of Shield Bash." — the Gladiator's own
[reskin] print canon skills: "Athletics +7, Perception +4" -> "Athletics +10, Performance +5" — the Gladiator's own skills, each derived from this sheet's stat and PB
[reskin] print canon row: Actions/Shield Bash — the Gladiator's own
[reskin] class weapon: Actions/"Spear" -> "Longsword" — a fighter fights with a longsword, not the Gladiator's
[reskin] dead name still carried — "Shield Bash" names a row that is still on the sheet; no sweep
[reskin] dead control row: "Wall Surge" sheds its gate — no damage, no KO condition; it joins the Multiattack menu instead
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 1) — "Lacquer Scald" [trait/on_being_hit/damage]
[reskin] darkvision withheld: a Humanoid with no species kit granting it, no word for it in the GM's own text, and no print body that has it — print gives darkvision to 1 of 26 Humanoids ("darkvision 60 ft.; Passive Perception 11" -> "Passive Perception 11")
[reskin] asked but unanswered: "fights from a shield wall" asked for at_will/at_will and no row binds the clause
[reskin] sameness: 1 of 1 free row(s) express nothing their rules carry — counted as decoration ("Lacquer Scald")
[reskin] audit rename: "Lacquer Scald" -> "Thunderous Riposte"
[reskin] audit rename blocked — "Commanding Shove" promises a push or a knockdown that "Wall Surge" does not deliver
[reskin] seed share: 0 of 3 signature row(s) came from a seed — the sameness metric
[reskin] [gap] damage output that increases each time she is hit in a fight, so the retaliation grows hotter as blows accumulate — "The lacquered iron of her plate remembers every blow landed on it; each hit chips lacquer and heats the layer beneath, until the armor itself answers the next attacker with a burst of scalding shards. The more she is struck within a stretch of fighting, the hotter and more dangerous her plate becomes to touch." — Vashka the Red [seat: trait [trait/on_being_hit/damage]] (closest offered: resonant-body) [effect: damage] [menu: absorption bloodied-burst resonant-body weapon-lodge] [same-cell unoffered: heated-body ward-retaliation snap-shot riposte] [same-seat rejected: heated-body:legality] [landed: resonant-body]
```


---


### Caustic Scythe Horror — in the run

**Concept:** A Large insectile horror. It has four scythe-arms, a spitting maw, and a shell that sheds acid. It fights by pinning prey with two arms and carving with the others.

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Caustic Scythe Horror | 9 | brute-8-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- **dropped clause:** "It has four scythe-arms"
- **dropped clause:** "carving with the others"
- read: def 7 / off 10 → 8.5; sustained 62 (2 × Scythe-Arm); nova Burning Bile Spray 32; dmg 63

```
Caustic Scythe Horror

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

Traits

Caustic Reflux. A creature that touches the scythe horror or hits it with a melee attack while within 5 feet of it takes 7 (2d6) Acid damage.

Actions

Multiattack. The scythe horror makes two Scythe-Arm attacks.

Scythe-Arm. Melee Attack Roll: +8, reach 10 ft. 18 (4d6 + 4) Slashing damage plus 13 (3d8) Acid damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 16). While Grappled, the target has the Restrained condition.

Burning Bile Spray (Recharge 5-6). Constitution Saving Throw: DC 15, each creature in a 30-foot Cone. Failure: 32 (5d12) Acid damage, and the target has the Poisoned condition until the end of its next turn. Success: Half damage only.

Bonus Actions

Swallow. The scythe horror swallows one Medium or smaller creature it is grappling. While swallowed, the target has the Blinded and Restrained conditions, has Total Cover against attacks and other effects outside the scythe horror, and takes 10 (3d6) Acid damage at the start of each of the scythe horror's turns. The scythe horror can have only one creature swallowed at a time. If the scythe horror takes 25 damage or more on a single turn from the swallowed creature, the scythe horror must regurgitate the target at the end of that turn, and the target exits Prone in an unoccupied space within 10 feet of the scythe horror. If the scythe horror dies, a swallowed creature exits the body Prone by using 10 feet of movement.

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

- Actions/Multiattack — the GM's clause "carving with the others"
- Actions/Scythe-Arm — the chassis
- Actions/Burning Bile Spray — template spew; library draw (seed unstamped); binds the GM's words: spits+vomits+vomit+spews+spew
- Bonus Actions/Swallow — binds the GM's words: swallow+swallows+engulf+engulfs+devour+devours+gulp+smother+entomb+cocoon+whelm
- Traits/Caustic Reflux — template heated-body; library draw (seed unstamped); the GM's clause "a shell that sheds acid"; binds the GM's words: acid+burn

**Engine trace**

```
[path] homebrew — "A Large insectile horror. It has four scythe-arms, a spitting maw, and a shell t" (call)
[route] brute-grappler type=Monstrosity mechanics=grapple, engulf, breath — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: on the GM's own words "pinning prey with two arms" | brute-grappler: ✓ ("pinning prey with two arms and carving w") | brute-grappler: no line key in the words — the model's read of its quote
[concept] resolve: archetype=brute type=Monstrosity themes=venomous/grasping mind=bestial style=grappler energy=Acid mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: grapple, engulf, breath
[concept] signature elements: pinning prey with two scythe-arms while carving with the others [behavior] | acid-shedding shell [body] | acid-spitting maw [behavior]
[concept] identity: The horror opens a fight by rushing one foe and clamping it with its two lower scythe-arms, pinning it in place before carving with the upper pair; every round after it spits acid at anyone who hangs back while it saws at the held prey. Its shell weeps caustic fluid onto anything that strikes it or grapples back, and it fights to the death, never fleeing — driven by a ravenous hunger that will not let go once it has sunk its grasp in.
[concept] lore: Hatched in the acid-scoured caverns beneath a dead volcanic ridge, it hunts by need rather than malice: a living shell that must drown its prey in its own bile before the meat is soft enough to swallow.
[reskin] donor: brute-8-grappler -> CR 9
[reskin] [path] decides: homebrew (the matcher agrees)
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline declared: "the scythe horror" — the call's own answer (kind), built from the name
[reskin] inline form: "the scythe horror" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] the clause is its own quote: limit "at_will" stands on "It has four scythe-arms" — the call offered no separate quote and needs none (1b)
[reskin] the clause is its own quote: limit "at_will" stands on "a shell that sheds acid" — the call offered no separate quote and needs none (1b)
[reskin] the clause is its own quote: limit "at_will" stands on "carving with the others" — the call offered no separate quote and needs none (1b)
[reskin] clauses: "A Large insectile horror" -> has (header) | "It has four scythe-arms" -> has (mechanical) [asked: on_hit/at_will/condition] | "a spitting maw" -> has (descriptive) | "a shell that sheds acid" -> has (mechanical) [asked: on_being_hit/at_will/save_single] | "It fights by pinning prey with two arms" -> has (descriptive) | "carving with the others" -> has (mechanical) [asked: on_hit/at_will/condition]
[reskin] signature idea (action): "The horror rears back and vomits a wide sheet of burning bile from its spitting maw, drenching every creature in front of it in a cone. The bile clings and eats at flesh and gear alike, leaving anyone caught in it badly scorched. It can only spew so much before its gut runs dry, so it must wait a short while to gather another bellyful." [action/save/damage] — menu: leap, condition-payoff, shield-bash, active-toll, random-ray, ground-burst, spew, herd, thrown-burst-seed, drain, wind-up, exploiter, trample, thrown-burst, execute, seal, lure, pacify (+ shelf: shell-withdraw, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, affliction, contagion, stunning-strike, charge-push, pounce)
[reskin] signature bound to the concept's verb: action — spew, exploiter, shell-withdraw (spits, pinned, shell)
[reskin] value check: "Burning Bile Spray (Recharge 5-6)" EV 84.8 vs floor 54.1 (the whole Multiattack (2 attacks)) — worth the trade
[reskin] signature template: spew -> Actions/"Burning Bile Spray (Recharge 5-6)" ("vomits a wide sheet of burning bile in a cone, drenching every creature in front [verb: spits:concept, vomits:idea, vomit:idea, spews:idea, spew:idea]")
[reskin] keys spent by the action: spits
[reskin] signature idea (trait): "Its shell constantly weeps caustic fluid, so anything that sinks teeth or claws into it or lays hands on it in close quarters is splashed and burned in return. The acid clings briefly after the strike lands." [trait/on_being_hit/damage] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] signature bound to the concept's verb: trait — heated-body (acid)
[reskin] signature template (trait): heated-body -> Traits/"Caustic Reflux" ("its shell constantly weeps caustic fluid, so anything that sinks teeth or claws  [verb: acid:concept, burn:idea]")
[reskin] repair: 1 clause(s) with no row — "carving with the others"; one targeted call with the sheet as context
[reskin] repair answer: attacks 0, saves 0, traits 0, reactions 0, answered [{"clause":"carving with the others","row":"Multiattack"}], unplaced []
[reskin] clause already answered: "carving with the others" is carried by "Multiattack" in different words — the call read the sheet and declined to answer it twice
[reskin] repair: the answer held no rows — the clauses stay unplaced
[reskin] weapons answered: Scythe-Arm = none
[reskin] languages held: None stands — INT 4 on a Monstrosity speaks nothing, whatever the mind read said
[reskin] name-canon stands down: the path answered homebrew on "A Large insectile horror. It has four sc" and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] row binds its clause: "Caustic Reflux" answers "a shell that sheds acid" — the keys it matched came from that clause, so the coverage credit has a receipt
[reskin] asked but unanswered: "It has four scythe-arms" asked for on_hit/at_will and no row binds the clause
[reskin] ask vs row MISMATCH: "a shell that sheds acid" -> "Caustic Reflux" — trigger: asked on_being_hit, row reads at_will
[reskin] ask vs row MISMATCH: "carving with the others" -> "Multiattack" — trigger: asked on_hit, row reads at_will
[reskin] seed share: 0 of 2 signature row(s) came from a seed — the sameness metric
```


---


### Fenrot Hexcrone — in the run

**Concept:** a marsh witch who curses trespassers, cr 7

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Fenrot Hexcrone | 7 | caster-8-binder | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 3 / off 7 → 5; sustained 48 (3 × Arcane Burst); nova none; dmg 48

```
Fenrot Hexcrone

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

Traits

Fen Stride. Difficult Terrain composed of marsh doesn't cost the hexcrone extra movement, and the hexcrone can move across marsh without needing to make an ability check.

Actions

Multiattack. The hexcrone makes three Arcane Burst attacks. It can replace one attack with a use of Rot-Bloom Hex.

Arcane Burst. Melee or Ranged Attack Roll: +6, reach 5 ft. or range 120 ft. 16 (3d8 + 3) Force damage.

Spellcasting. The hexcrone casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 14):

- At Will: Detect Magic, Light, Mage Armor, Mage Hand, Prestidigitation
- 2/Day Each: Fireball, Invisibility
- 1/Day Each: Cone of Cold, Fly

Rot-Bloom Hex. Constitution Saving Throw: DC 14, one creature within 60 feet. Failure: The target's Speed is halved and it can't take Reactions until the end of the hexcrone's next turn.

Bonus Actions

Misty Step (3/Day). The hexcrone casts Misty Step, using the same spellcasting ability as Spellcasting.

Reactions

Protective Magic (3/Day). The hexcrone casts Counterspell or Shield in response to the spell's trigger, using the same spellcasting ability as Spellcasting.

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
- Actions/Rot-Bloom Hex — template slow-bolt; library draw (seed unstamped); binds the GM's words: mud
- Reactions/Protective Magic — mage kit; the GM's clause "witch"
- Traits/Fen Stride — template terrain-walk; library draw (seed unstamped); binds the GM's words: marsh+fen
- Bonus Actions/Misty Step — print's own row

**Engine trace**

```
[path] class_npc — class mage — "witch" (call)
[route] caster-binder (controller) type=Humanoid mechanics=none — casts: implied by the kind — "curses trespassers" | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | caster-binder: ✓ ("curses trespassers") | caster-binder: key "curses" (class verb)
[concept] hints: binder→style ✓ ("marsh witch who curses trespassers")
[concept] resolve: archetype=caster type=Humanoid themes=arcane/grave mind=sapient style=binder energy=Necrotic mix=energy identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: curses that steal a trespasser's actions [behavior] | fen-rot hexes brewed from the drowned marsh [aura] | the waterlogged bog she calls home [body]
[concept] identity: A marsh witch opens a fight by standing off at range and laying curses on every trespasser in sight, stripping away actions before blades ever cross. Every round after, she keeps binding and blinding the strongest foe while her marsh muck drags at their feet, favoring curse-stacked paralysis over killing blows. Under pressure she does not brawl; she withdraws into the fen and toys with pursuers, letting her hexes finish what her hands never touch.
[concept] lore: She was a hedge-healer who drowned in the fen she loved, and now she wrings the marsh's rot into curses to keep every intruder exactly where the mud holds them.
[reskin] energy withheld: Necrotic on a Humanoid with no Necrotic in the concept's own words (fixed phrases read first)
[reskin] [path] class body: the mage stands on the Mage — the class's own print block, nearest CR 7
[reskin] print canon defenses: HP 108 -> 81, AC 15 -> 15 — the Mage's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 9, DEX 14, CON 11, INT 17, WIS 12, CHA 11 — the Mage's at its own CR; attack +7 -> +6, DC 14 (print's)
[reskin] donor: caster-8-binder -> CR 7
[reskin] [path] decides: class_npc on the Mage · class mage (the matcher would have said homebrew)
[reskin] print canon: "a marsh witch who curses trespassers, cr 7" heads on the Mage — print's rows ride along; the seat stays
[reskin] repair round 1: 4 defect(s) — name "Bog Claw" is a natural weapon on a Humanoid whose concept gives it none — a Humanoid swings a weapon (Scimitar, Club, Spear) | "Bog Claw" deals Necrotic on a Humanoid whose concept names no Necrotic — a name is not a warrant; use a physical type | "Fen Hex" deals Psychic on a Humanoid whose concept names no Psychic — a name is not a warrant; use a physical type | "Rotting Ray" deals Poison on a Humanoid whose concept names no Poison — a name is not a warrant; use a physical type
[reskin] class kit: mage — "witch": Protective Magic (3/Day) (Mage/Protective Magic)
[reskin] inline declared: "the hexcrone" — the call's own answer (kind), built from the name
[reskin] inline form: "the hexcrone" — the model's own reading of the name
[reskin] energy rider withheld: Necrotic on a Humanoid with no Necrotic in the concept's own words
[reskin] energy withheld on a base row: "Bog Claw" Necrotic -> Slashing (the row's own noun; a Humanoid deals no Necrotic its concept never gave it)
[reskin] control spell gated to daily — Bestow Curse (level 3 control at will is print's CR 13+ shape; at CR 7 it is 1/Day)
[reskin] spell DC coherence: DC 14 -> 11 off Charisma 11 (print's array stays)
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a marsh witch" -> has (descriptive), head | "curses trespassers" -> has (mechanical) [asked: condition] | "cr 7" -> has (header)
[reskin] extraction: 1 of 3 model clauses quote nothing the user typed and leave the record ("cr 7")
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The hexcrone points a dripping claw at one foe she can see and pulls the fen's rot up through them: a black bloom spreads and wrings the marsh-water out of their body. The victim is left reeling and off-balance, unable to gather themselves for the fight, and their next few moments of action are stolen back into the mud." [action/always/condition] — menu: condition-payoff, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, snare-bolt, slow-bolt, sensory-strike, herd, thrown-burst-seed, drain, curse-debt, zone-seed, reveal, wind-up, blighted-ground, gaze-single, snare, shield-bash, terror-pulse, push-prone (+ shelf: delayed-brand, lay-on-hands, aggro-curse, self-invisibility, rally, snap-shot, bolt-restrain, bolt-drag, bolt-mark, affliction, contagion, stunning-strike, pounce)
[reskin] closest accepted: action — the call refused every template but named "slow-bolt" as nearest; it lands rather than the row being dropped (what it wanted: inflicts a stacking condition on the target each turn that eventually stops it a)
[reskin] seat takes its clause: "Rot-Bloom Hex" answers "a marsh" — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature template: slow-bolt -> Actions/"Rot-Bloom Hex" ("The idea needs a condition that leaves the victim reeling and unable to gather t [verb: mud:idea]")
[reskin] signature idea (trait): "Whenever she curses or harms a creature, some of the drowned fen's rot clings to it and she drinks back a sliver of that rot as strength, mending a small measure of her own wounds while her hexfest builds." [trait/always/resource] — menu: false-appearance, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst, adhesive, berserk (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] signature bound to the concept's verb: trait — terrain-walk (marsh)
[reskin] word match declined by the call: absorption — the key word does not mean the mechanic here
[reskin] signature template (trait): terrain-walk -> Traits/"Fen Stride" ("The marsh witch moves through the waterlogged fen she calls home without impedim [verb: marsh:concept, fen:idea]")
[reskin] repair: 1 clause(s) with no row — "curses trespassers"; one targeted call with the sheet as context
[reskin] repair answer: attacks 0, saves 0, traits 0, reactions 0, answered [], unplaced ["description:curses trespassers"]
[reskin] clause answered in prose: "curses trespassers" — the call read the sheet and judged it description, not a row; the words reach the description instead
[reskin] repair: the answer held no rows — the clauses stay unplaced
[reskin] weapons answered: Bog Claw = none; Fen Hex = none; Rotting Ray = none; Mire Binding = none
[reskin] print canon alignment: Neutral Evil -> Neutral — the Mage's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common, Sylvan" -> "Common and any three languages, Sylvan" — the Mage's plus the concept's Sylvan
[reskin] print canon attack: "Arcane Burst" keeps print's hybrid frame — reach 5 ft. or range 120 ft. (the Mage's weapon is thrown)
[reskin] print canon attack: "Bog Claw" -> "Arcane Burst" — the Mage's own row
[reskin] print canon multiattack: "the hexcrone makes three Arcane Burst attacks." — the Mage's own
[reskin] ranged row off: "Fen Hex" leaves — the Mage carries no ranged row and the words name none
[reskin] print canon skills: "Perception +4, Deception +3" -> "Arcana +6, History +6, Perception +4" — the Mage's own skills, each derived from this sheet's stat and PB
[reskin] print canon: chassis row leaves — Actions/"Rotting Ray" — the Mage prints no row for it and no path stage claimed it
[reskin] print canon row: Actions/Spellcasting — print's own list replaces the chassis's
[reskin] print canon row: Bonus Actions/Misty Step (3/Day) — the Mage's own
[reskin] multiattack replacement clause: It can replace one attack with a use of Rot-Bloom Hex.
[reskin] darkvision withheld: a Humanoid with no species kit granting it, no word for it in the GM's own text, and no print body that has it — print gives darkvision to 1 of 26 Humanoids ("darkvision 60 ft.; Passive Perception 14" -> "Passive Perception 14")
[reskin] audit rewrite blocked — "Multiattack" is engine-authored chassis text
[reskin] seed share: 0 of 2 signature row(s) came from a seed — the sameness metric
[reskin] [gap] inflicts a stacking condition on the target each turn that eventually stops it acting, rather than just halving Speed an — "The hexcrone points a dripping claw at one foe she can see and pulls the fen's rot up through them: a black bloom spreads and wrings the marsh-water out of their body. The victim is left reeling and off-balance, unable to gather themselves for the fight, and their next few moments of action are stolen back into the mud." — Fenrot Hexcrone [seat: action [action/always/condition]] (closest offered: slow-bolt) [effect: condition] [menu: condition-payoff seal wail lure active-toll random-ray ground-burst spew obstacle-pull pacify escalating-dread snare-bolt slow-bolt sensory-strike herd thrown-burst-seed drain curse-debt zone-seed reveal wind-up blighted-ground gaze-single snare shield-bash terror-pulse push-prone bolt-drag delayed-brand affliction] [same-cell unoffered: adhesive phobia faultless-tracker berserk marking-light] [same-seat rejected: throw-retrieve:role] [landed: slow-bolt]
```


---


### Ser Aldric Vane — in the run

**Concept:** a templar priest with a mace and no magic at all

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Ser Aldric Vane | 6 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 4 / off 8 → 6; sustained 51 (3 × Mace); nova none; dmg 51

```
Ser Aldric Vane

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

Aura of Authority. While in a 10-foot Emanation originating from the vane, the vane and its allies have Advantage on attack rolls and saving throws, provided the vane doesn't have the Incapacitated condition.

Actions

Multiattack. The vane makes three Mace attacks. It can replace one attack with a use of Shield Bash.

Mace. Melee Attack Roll: +7, reach 5 ft. 17 (3d8 + 4) Bludgeoning damage, and the target has Disadvantage on its next attack roll before the start of the vane's next turn.

Shield Bash. Strength Saving Throw: DC 15, one creature within 5 feet that the vane can see. Failure: 9 (2d4 + 4) Bludgeoning damage. If the target is a Medium or smaller creature, it has the Prone condition.

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
[concept] name: provided_name rejected — "templar priest with a mace…" is the description, not a name
[concept] resolve: archetype=defender type=Humanoid themes=armed/forged mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: a mace swung to punish anyone passing the line [object] | shield and iron plate held as a wall [object] | deliberate refusal to yield ground [behavior]
[concept] identity: A templar priest who has set aside every prayer for a single heavy mace, this armored soldier holds the line with a shield raised and punishes any enemy who tries to slip past with a crunching sideways swing. Every round it advances a measured pace, angling to pin foes against walls and allies, striking only when the target is committed to a path it can interrupt. Under pressure it does not flee — it becomes more deliberate and brutal, dragging the fight into narrow ground where its armor and a mace's weight matter, and it fights to the death with the calm of a man who never expected divine rescue.
[concept] lore: Stripped of his order and his prayers, this former templar priest keeps the only vow left to him — that no one passes through his guard while he still draws breath — and hires out as a bodyguard to the highest bidder.
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
[reskin] chassis row off: Actions/"Shield" leaves — the GM named a melee weapon (Mace); one weapon, one rule set
[reskin] class kit: paladin — "templar": Aura of Authority (Hobgoblin Captain/Aura of Authority)
[reskin] inline by rule: "the vane" — the call answered "Ser Aldric" (person), which the name does not support
[reskin] lacks asked: "no magic at all"
[reskin] the clause is its own quote: limit "at_will" stands on "a templar priest with a mace" — the call offered no separate quote and needs none (1b)
[reskin] clauses: "a templar priest with a mace" -> has (mechanical) [asked: at_will/attack] | "no magic at all" -> LACKS (mechanical)
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "Instead of attacking, the vane plants his shield and takes a measured step toward a foe he can see, forcing that enemy to either give ground or trade blows with him; until the fight moves on, the enemy is stuck in place, unable to slip past or away while the vane holds his guard." [action/always/movement] — menu: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, zone-seed (+ shelf: patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, feint-slip, riposte, stunning-strike, charge-push, hook-rider)
[reskin] word match declined by the call: feint-slip, shield-bash, push-prone, disarm, seal, slow-bolt, rally — the key word does not mean the mechanic here
[reskin] closest accepted: action — the call refused every template but named "obstacle-pull" as nearest; it lands rather than the row being dropped (what it wanted: locks one visible creature in place so it can't move away or slip past while the)
[reskin] pick kept on the GM's own words: action — "obstacle-pull" has no key-table verb, but the call quotes "a templar priest with a mace and no magic at all" from the description
[reskin] free signature row: "Held Line" — a print body takes only what the user's words ask, but the call names the element it expresses: "shield and iron plate held as a wall". Earns no clause credit; the budget settles on the finished sheet
[reskin] signature template: obstacle-pull -> Actions/"Held Line" ("The idea is a sticky hold: the vane plants his shield to lock one visible foe in [shape fit, no verb match]")
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 16 already beats print's 15 at CR 6, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "Whenever an enemy tries to move through the reach of the vane's mace, he swings once across their path before they get clear; a foe that would rather eat the blow than stop is welcome to, and a foe that stops is exactly where he wants it." [trait/always/damage] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending, weapon-lodge)
[reskin] word match declined by the call: absorption — the key word does not mean the mechanic here
[reskin] free signature row: trait — "guarded-stance" quotes nothing the GM typed and matches no key-table verb, but the call names the element it expresses: "a mace swung to punish anyone passing the line" — a receipt the trait seat can produce. Earns no clause credit; the twist/class path allows 1 and this is number 1
[reskin] free signature row: "Warding Line" — the trait seat cannot quote the GM, but the call names the element it expresses: "a mace swung to punish anyone passing the line". Earns no clause credit; the twist/class path allows 1 and this is number 2
[reskin] signature template (trait): guarded-stance -> Traits/"Warding Line" ("A foe that tries to move through his reach is punished by the swing, and a foe t [shape fit, no verb match]")
[reskin] weapons answered: Mace = mace; Shield = shield
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] print canon alignment: Lawful Neutral -> Neutral — the Gladiator's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon multiattack: "the vane makes three Spear attacks. It can replace one attack with a use of Shield Bash." — the Gladiator's own
[reskin] print canon skills: "Athletics +7, Perception +4" -> "Athletics +10, Performance +5" — the Gladiator's own skills, each derived from this sheet's stat and PB
[reskin] print canon row: Actions/Shield Bash — the Gladiator's own
[reskin] multiattack reconciled: "Spear" is no row on this sheet — the Multiattack cites "Mace" instead
[reskin] dead name still carried — "Shield Bash" names a row that is still on the sheet; no sweep
[reskin] final price: print's Multiattack: the round ran 66 against the card's 45 — the attack rows re-solve at 72% (3 attacks off one row after a supersede)
[reskin] free row over budget: Actions/"Held Line" leaves at ship — this sheet's free-row budget (1) is spent by a row that SHIPPED
[reskin] free-row budget: 2 candidate(s) reached the finished sheet, 1 kept (budget 1) — "Warding Line" [trait/always/defense]
[reskin] ask vs row ok: "a templar priest with a mace" -> "Mace" — limit at_will
[reskin] element claim revoked: "Warding Line" claims "a mace swung to punish anyone passing the line" but the audit returned no verdict for this row; the name carries "line" and may not advertise what the rules do not do — flagged decoration for the rename pass
[reskin] sameness: 1 of 1 free row(s) express nothing their rules carry — counted as decoration ("Warding Line")
audit finding below confidence gate: Shield Bash Prone from Shield Bash has no defined end, but Prone's own standing-up rule is the exit, so no defect here.
audit finding below confidence gate: Aura of Authority The entry references 'the vane's allies'—a relation the block never defines or creates, since this is a solo monster with no ally-generation mechanic.
[reskin] audit rewrite blocked — "Multiattack" is engine-authored chassis text
[reskin] audit rename blocked — "Warding Line" -> "Defensive Stance" would drop the GM's own word "line" from a row bound to "a mace swung to punish anyone passing the line"; the mechanic would stay and the receipt would not
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] [gap] locks one visible creature in place so it can't move away or slip past while the vane holds his guard — "Instead of attacking, the vane plants his shield and takes a measured step toward a foe he can see, forcing that enemy to either give ground or trade blows with him; until the fight moves on, the enemy is stuck in place, unable to slip past or away while the vane holds his guard." — Ser Aldric Vane [seat: action [action/always/movement]] (closest offered: obstacle-pull) [effect: movement] [menu: throw-retrieve seal shield-bash active-toll random-ray ground-burst obstacle-pull terror-pulse slow-bolt disarm push-prone herd curse-debt reveal wind-up zone-seed rally feint-slip] [same-cell unoffered: blink spider-climb terrain-walk aberrant-ground web-walker earth-glide tunneler relentless-pursuit bound self-invisibility focus phase-slip] [same-seat rejected: none] [VETOED AFTER ACCEPTANCE: obstacle-pull never reached the sheet]
[reskin] signature outcome: 1 of 1 accepted signature pick(s) never reached the sheet — the seat shipped a fallback or nothing
[reskin] guarded stance withdrawn: Traits/"Warding Line" leaves the finished sheet — AC 16 already beats print's 15 at CR 6, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329); the menu filter had checked an AC that print canon changed afterwards
[reskin] lack took nothing: "no magic at all" removed no row and the call named no roll it spoils (costs: (unanswered)) — no flaw row, and the gap list carries it
```


---


### Swarm of Tolling Pyres — in the run

**Concept:** a swarm of funeral bells that ring themselves over the dying

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Swarm of Tolling Pyres | 13 | swarm-9 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 10 / off 15 → 12.5; sustained 90 (1 × Knell); nova none; dmg 90

```
Swarm of Tolling Pyres

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

Senses blindsight 60 ft. (blind beyond this radius); Passive Perception 10

Languages Understands the languages of its creator but can't speak

CR 13 (XP 10,000; PB +5)

Traits

Dread Knell Aura. Wisdom Saving Throw: DC 17, any creature that starts its turn in a 20-foot Emanation originating from the swarm. Failure: The target has the Frightened condition until the start of its next turn. Success: The target is immune to this creature's aura for 24 hours.

Swarm. The swarm can occupy another creature's space and vice versa, and the swarm can move through any opening large enough for a Tiny creature. The swarm can't regain Hit Points or gain Temporary Hit Points.

Actions

Knell. Melee Attack Roll: +10, reach 5 ft. 90 (19d8 + 5) Thunder damage, or 45 (9d8 + 5) Thunder damage if the swarm is Bloodied.

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

- Traits/Dread Knell Aura — template noxious-aura; library draw (seed unstamped); binds the GM's words: presence
- Traits/Swarm — the chassis
- Actions/Knell — the chassis

**Engine trace**

```
[path] homebrew — "a swarm of funeral bells that ring themselves over the dying" (call)
[route] swarm type=Construct mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: on the GM's own words "a swarm of funeral bells" | holds: the call reads none in these words | swarm: ✓ ("a swarm of funeral bells") | swarm: no line key in the words — the model's read of its quote
[concept] hints: swarm→body ✓ ("a swarm of funeral bells")
[concept] resolve: archetype=swarm type=Construct themes=grave/forged mind=mindless style=— energy=Thunder mix=energy identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: self-ringing funeral bells [body] | gathering over the dying [behavior] | a choral death-knell [aura]
[concept] identity: A congregation of iron funeral bells hangs in the air above the dying, and when it finds one it lowers itself and begins to toll — a slow, choral knell that is also its attack, hammering the deathbound with thunderous resonance while they still breathe. Every round it rings louder and lower, drawing a little more life out of the fading and feeding the bell-metal, and bloodied it shatters into two smaller peals that keep ringing from either side. It does not pursue the healthy and does not flee: it is an obituary waiting to be finished, and it will ring until the last breath is spent.
[concept] lore: The bell-swarm forms where a great many funeral bells were interred without a body to toll for — cast-off parish bells, plague-pit bells, the clappers seized from silenced churches — and it drifts hungering for the dying, because only over a death can it at last be rung correctly.
[reskin] body type: swarm — the body outranks the role (recorded: swarm)
[reskin] donor: swarm-9 -> CR 13 (invented — no printed peer)
[reskin] [path] decides: homebrew (the matcher agrees)
[reskin] swarm name stamped: "Tolling Pyre" -> "Swarm of Tolling Pyres" — print names all seven of its swarms "Swarm of X", and the rules text says "the swarm"
[reskin] swarm type stamped: Construct -> Swarm of Tiny Constructs
[reskin] alignment by body: Neutral -> Unaligned — a Constructs at INT 4 (print: Oozes 4/4 Unaligned; every Construct at INT 3 or less, 7/7; the first aligned one is the Flesh Golem at INT 6)
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline by rule: "the swarm" — the call answered "the tolling pyre" (kind), which the name does not support
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a swarm of funeral bells" -> has (descriptive), head | "ring themselves over the dying" -> has (mechanical)
[reskin] menu pruned: action — obstacle-pull, pacify, escalating-dread, terror-pulse, snare-bolt, slow-bolt, sensory-strike, disarm, thrown-burst-seed, drain, zone-seed, blighted-ground, push-prone, reveal, delayed-brand, aggro-curse, self-invisibility, focus, feint-slip, coating, phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The swarm settles over a creature it can sense is badly hurt and begins a slow, choral tolling meant only for that one. While it rings that private knell, every other sound near the chosen creature is drowned out and the creature can no longer call on any last reserve of endurance or borrowed vitality — potions, healing words, patches, nothing that would pull it back from the edge takes hold. The " [action/save/condition] — menu: trample, thrown-burst, gaze-single, snare, execute, seal, shield-bash, wail, lure, active-toll, random-ray, ground-burst, spew (+ shelf: patient-defense, second-wind, riposte, stunning-strike, charge-push, hook-rider, pounce, isolation, charge)
[reskin] signature bound to the concept's verb: action — active-toll (ring, bell)
[reskin] word match declined by the call: active-toll, lure, wail, execute — the key word does not mean the mechanic here
[reskin] free signature row: action — "seal" quotes nothing the GM typed and matches no key-table verb, but the call names the element it expresses: "gathering over the dying" — a receipt the trait seat can produce. Earns no clause credit; the homebrew path allows 1 and this is number 1
[reskin] value check: "Last Rites Toll" EV 70.5 vs floor 46.8 (one attack of 1) — added Success: Half; dice 45 → 91
[reskin] signature template: seal -> Actions/"Last Rites Toll" ("the swarm tolls a private knell over a badly hurt creature so nothing that would [shape fit, no verb match]")
[reskin] signature idea (trait): "A swarm of funeral bells cannot pass quietly; the chiming hangs on the air around it. Any creature still standing near a bell-swarm when its own moment of struggle comes finds the tolling in its ears, wearing at its guard and its resolve, so that the dying tend to die a little sooner in its presence." [trait/always/condition] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature bound to the concept's verb: trait — bloodied-burst (ring, bell, dying, the dying)
[reskin] word match declined by the call: bloodied-burst, death-burst, resonant-body, false-appearance, guarded-stance — the key word does not mean the mechanic here
[reskin] free signature row: "Tolling Aura" — the trait seat cannot quote the GM, but the call names the element it expresses: "self-ringing funeral bells". Earns no clause credit; the homebrew path allows 1 and this is number 2
[reskin] signature template (trait): noxious-aura -> Traits/"Tolling Aura" ("The tolling hangs in the air around the swarm, wearing at the guard and resolve  [verb: presence:idea]")
[reskin] repair: 1 clause(s) with no row — "ring themselves over the dying"; one targeted call with the sheet as context
[reskin] repair answer: attacks 0, saves 0, traits 0, reactions 0, answered [], unplaced ["description:ring themselves over the dying"]
[reskin] clause answered in prose: "ring themselves over the dying" — the call read the sheet and judged it description, not a row; the words reach the description instead
[reskin] repair: the answer held no rows — the clauses stay unplaced
[reskin] weapons answered: Knell = none
[reskin] speed by concept: dropped Climb 30 ft. — the concept's movement set decides
[reskin] languages by mind: "None" -> "Understands the languages of its creator but can't speak" (mindless)
[reskin] immunities stamped for type: Swarm of Tiny Constructs + donor suite -> Poison; Charmed, Exhaustion, Frightened, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained, Stunned
[reskin] resistances derived: Bludgeoning, Piercing, Slashing
[reskin] name-canon stands down: the path answered homebrew on "a swarm of funeral bells that ring thems" and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] vulnerability rejected — "Thunder" has no warrant in the concept's own text (print's default is none)
[reskin] bloodied half re-derived: "Knell" — 14 (4d6) -> 45 (9d8 + 5), half of the main 90 on the main's own +5 (print's ratio and print's modifier)
[reskin] free row over budget: Actions/"Last Rites Toll" leaves at ship — this sheet's free-row budget (1) is spent by a row that SHIPPED
[reskin] free-row budget: 2 candidate(s) reached the finished sheet, 1 kept (budget 1) — "Tolling Aura" [trait/save/condition]
[reskin] element claim revoked: "Tolling Aura" claims "self-ringing funeral bells" but the audit returned no verdict for this row; the name advertises nothing, so the row stands as decoration
[reskin] sameness: 1 of 1 free row(s) express nothing their rules carry — counted as decoration ("Tolling Aura")
[reskin] audit rename: "Tolling Aura" -> "Dread Knell Aura"
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
```


---


### Cragwake Drake — in the run

**Concept:** a young storm drake whose breath is a rolling wall of thunder

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Cragwake Drake | 7 | dragon-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- **dropped clause:** "a young storm drake whose breath is a rolling wall of thunder"
- read: def 5 / off 7 → 6; sustained 36 (2 × Claw); nova Thunder Roll 39; dmg 50

```
Cragwake Drake

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

Traits

Charged Scales. A creature that hits the drake with a melee attack while within 5 feet of it takes 7 (2d6) Thunder damage and has the Deafened condition until the end of its next turn.

Actions

Multiattack. The drake makes two Claw attacks.

Claw. Melee Attack Roll: +7, reach 5 ft. 11 (2d6 + 4) Slashing damage plus 7 (2d6) Thunder damage. If the drake moved at least 20 feet in a straight line toward the target immediately before the hit, the target takes an extra 9 (2d8) Thunder damage and, if it is Large or smaller, has the Prone condition.

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
- Traits/Charged Scales — template resonant-body; library draw (seed unstamped); binds the GM's words: peal

**Engine trace**

```
[path] homebrew — "a young storm drake whose breath is a rolling wall of thunder" (call)
[route] dragon type=Dragon mechanics=breath — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | dragon: ✓ ("a young storm drake whose breath is a ro") | dragon: key "drake" (class body)
[concept] hints: dragon→body ✓ ("a young storm drake") | breath→mechanics ✓ ("breath is a rolling wall of thunder")
[concept] resolve: archetype=dragon type=Dragon themes=draconic/breath mind=sapient style=— energy=Thunder mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: breath
[concept] signature elements: a rolling wall of thunder breath that bowls over prey [behavior] | a storm-charged body of crackling scale and wing [body]
[concept] identity: The young storm drake announces itself with a thunderclap roar before inhaling, then rolls a curling wall of concussive sound across the battlefield that bowls over ranks and shatters cover. Every round after, it circles low on crackling wings, slamming with claws and tail while building to another rolling peal, and under pressure it grows gleeful rather than desperate, trading altitude for a low pass to scatter fleeing prey.
[concept] lore: Hatched in a thermal born of a thunderstorm off the crags, the drake rides out from its cliff roost to shepherd storms across the valley and drive off anything that dares look up.
[reskin] body type: dragon — the body outranks the role (recorded: dragon)
[reskin] nova capped: "Breath Weapon" 42 → 39 (the chassis nova obeys the cap: 39 at CR 7)
[reskin] donor: dragon-2 -> CR 7
[reskin] [path] decides: homebrew (the matcher agrees)
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline declared: "the drake" — the call's own answer (kind), built from the name
[reskin] inline form: "the drake" — the model's own reading of the name
[reskin] save dc derived: DC 14 -> 15 (8 + PB 3 + the sheet's best 4) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a young storm drake whose breath is a rolling wall of thunder" -> has (mechanical)
[reskin] menu pruned: action — escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, zone-seed, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, feint-slip, phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The drake pours its storm into its wings and dives low, roaring as it passes. Everything along that low line gets shoved and rattled by the rolling wake, scattered out of formation and left staggering where it lands. It ends the pass with its own thunder still crawling over its scales, ready to be spent again." [action/always/movement] — menu: gaze-single, snare, zone, execute, seal, shield-bash, lure (+ shelf: rampage, lay-on-hands, second-wind, affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, charge)
[reskin] word match declined by the call: execute, gaze-single, snare, zone, seal, shield-bash, lure — the key word does not mean the mechanic here
[reskin] closest accepted: action — the call refused every template but named "charge" as nearest; it lands rather than the row being dropped (what it wanted: a pass that pushes and scatters every creature along a line, moving them out of )
[reskin] pick kept on the GM's own words: action — "charge" has no key-table verb, but the call quotes "a young storm drake whose breath is a rolling wall of thunder" from the description
[reskin] signature rider: charge -> Claw (appended; The drake dives low and its rolling wake shoves and scatters creatures in a line [shape fit, no verb match])
[reskin] signature idea (trait): "The crackling scale and wing of the drake stay charged between peals, and every claw slam leaves a stinging aftershock in the wound that lingers after the blow. Prey that runs from it keeps hearing the thunder in its bones, and the drake grows bolder the more it scatters, wheeling faster and lower as the fight goes on." [trait/always/damage] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst, assassinate (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending, weapon-lodge)
[reskin] signature bound to the concept's verb: trait — heated-body (storm)
[reskin] signature template (trait): resonant-body -> Traits/"Charged Scales" ("the charged scale and wing sting anything that strikes the drake, leaving a ring [verb: peal:idea]")
[reskin] weapons answered: Claw = none; Thunder Roll = none; Rolling Peal = none
[reskin] chassis nova: "Thunder Roll (Recharge 5-6)" — the dragon-2's own nova row (its "Breath Weapon", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] element immunity: Thunder (merged into the header write)
[reskin] dragon senses raised to tier: blindsight 30 added
[reskin] dragon senses raised to tier: darkvision 60 -> 120
[reskin] dragon languages: Draconic added (42/42 print dragons speak it)
[reskin] immunities stamped for type: Dragon -> Thunder
[reskin] name-canon stands down: the path answered homebrew on "a young storm drake whose breath is a ro" and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] audit rename blocked — "Charged Scales" -> "Thunder Scales" would drop the GM's own word "charged" from a row bound to "a storm-charged body of crackling scale and wing"; the mechanic would stay and the receipt would not
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] [gap] a pass that pushes and scatters every creature along a line, moving them out of formation — "The drake pours its storm into its wings and dives low, roaring as it passes. Everything along that low line gets shoved and rattled by the rolling wake, scattered out of formation and left staggering where it lands. It ends the pass with its own thunder still crawling over its scales, ready to be spent again." — Cragwake Drake [seat: action [action/always/movement]] (closest offered: charge) [effect: movement] [menu: gaze-single snare zone execute seal shield-bash lure charge] [same-cell unoffered: blink spider-climb terrain-walk aberrant-ground web-walker earth-glide tunneler relentless-pursuit bound zone-seed self-invisibility rally focus feint-slip phase-slip] [same-seat rejected: throw-retrieve:legality zone-seed:role] [landed: charge]
```


---


### Well Drowned — in the run

**Concept:** name: the thing in the well | 

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Well Drowned | 5 | lurker-5-trap | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 5 / off 6 → 5.5; sustained 34 (2 × Brine Lash); nova Welling Brine 28; dmg 41

```
Well Drowned

Medium Aberration, Neutral Evil

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

Senses blindsight 30 ft. (blind beyond this radius); Passive Perception 16

Languages Common

CR 5 (XP 1,800; PB +3)

Traits

Living Brine. A creature that touches the well drowned or hits it with a melee attack while within 5 feet of it takes 5 (1d10) Acid damage.

Actions

Multiattack. The well drowned makes two Brine Lash attacks.

Brine Lash. Melee Attack Roll: +6 (with Advantage if the target is Grappled by the well drowned), reach 5 ft. 17 (4d6 + 3) Acid damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 14).

Welling Brine (Recharge 5-6). Constitution Saving Throw: DC 14, each creature in a 10-foot Emanation originating from the well drowned. Failure: 28 (8d6) Acid damage. Success: Half damage.

Bonus Actions

False Form. The well drowned shape-shifts to resemble an ordinary object or fixture of the place it waits in while retaining its game statistics, or it returns to its true form. While it is motionless in its false form, it is indistinguishable from that feature.

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
- Actions/Brine Lash — the chassis
- Actions/Welling Brine — template ground-burst; library draw (seed unstamped); binds the GM's words: erupt+erupts
- Bonus Actions/False Form — the chassis
- Traits/Living Brine — template heated-body; library draw (seed unstamped); binds the GM's words: burn

**Engine trace**

```
[path] homebrew — "the thing in the well" (call)
[route] lurker-trap type=Aberration mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | lurker-trap: ✓ ("the thing in the well") | lurker-trap: no line key in the words — the model's read of its quote
[concept] resolve: archetype=lurker type=Aberration themes=aquatic/devouring mind=sapient style=trap energy=Acid mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: lying in wait down a well and erupting when something draws near [behavior] | a body of stinging, drowning brine [body] | the stone shaft it wears as a shell [object]
[concept] identity: The thing in the well lies sunk and stagnant at the bottom of the shaft, its cunning brine-flesh gone slack among the stones, indistinguishable from the murk until a bucket or a rope comes down — then it surges up the full length of the well as a stinging column, fastening onto whoever peers over the rim. Each round after, it pours itself around the victim and squeezes, drawing its body back down the shaft to drown and dissolve them in the dark. It never flees: wounded, it sinks deeper and waits, patient and spiteful, for the next hand to reach down.
[concept] lore: Something drowned in the well long ago and the water has been remembering it since, growing a hungry brine-thing that wears the well as its shell and keeps its catch at the bottom.
[reskin] donor: lurker-5-trap -> CR 5
[reskin] row gated out: Swallow (engulf) — the concept did not claim this mechanic
[reskin] [path] decides: homebrew (the matcher agrees)
[reskin] reach folded: "Grasping Limb" (reach 50) and Reel leave — no tether in the concept; the grapple rides "Melee Attack" (the Giant Crab's shape)
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline declared: "the well drowned" — the call's own answer (kind), built from the name
[reskin] inline form: "the well drowned" — the model's own reading of the name
[reskin] save dc derived: DC 13 -> 14 (8 + PB 3 + the sheet's best 3) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "the thing in the well" -> has (descriptive), head
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "When something comes within reach of the well's rim, mouth, or shaft while the creature lurks in its false form, it erupts upward as a stinging column of brine and lashes at the nearest thing before it can react. A creature caught this way is coated in clinging brine that keeps stinging it, and the creature can use the confusion to pull itself and its victim a step back toward the shaft. It can't " [reaction/on_being_hit/damage] — menu: riposte (+ shelf: leap, condition-payoff, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, terror-pulse, snare-bolt, slow-bolt, sensory-strike, drain, delayed-brand, zone-seed, exploiter, blighted-ground, patient-defense, self-invisibility, focus, feint-slip, coating, stunning-strike, charge-push, hook-rider, pounce, isolation)
[reskin] word match declined by the call: coating, obstacle-pull, exploiter, slow-bolt, condition-payoff — the key word does not mean the mechanic here
[reskin] closest accepted: action — the call refused every template but named "ground-burst" as nearest; it lands rather than the row being dropped (what it wanted: triggers as a reaction when a creature enters its reach rather than on the creat)
[reskin] free signature row: "Welling Brine (Recharge 5-6)" — a whole-round ability the GM never asked for, but the call names the element it expresses: "lying in wait down a well and erupting when something draws near". Earns no clause credit; the budget settles on the finished sheet
[reskin] value check: "Welling Brine (Recharge 5-6)" EV 43.4 vs floor 30.4 (the whole Multiattack (2 attacks)) — dice 18 → 28 (nova budget)
[reskin] signature template: ground-burst -> Actions/"Welling Brine (Recharge 5-6)" ("The idea is a reaction erupting when a creature comes within reach while it lurk [verb: erupt:idea, erupts:idea]")
[reskin] signature idea (trait): "Its flesh is living brine: anything that wounds it, grapples it, or is grappled by it is splashed with stinging salt water that clings and keeps burning for a moment. The longer a victim stays in contact with it, the more the brine works into wounds, so holding on to it is as dangerous as being held." [trait/on_being_hit/damage] — menu: heated-body, absorption, bloodied-burst, resonant-body (+ shelf: adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, evasion, relentless-pursuit, bound, marking-light, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] word match declined by the call: spider-climb, aberrant-ground — the key word does not mean the mechanic here
[reskin] seat owes nothing: the trap line was the model's read of its quote, not a key in the words (a hermit was handed Assassinate, day-one 2026-09-30)
[reskin] signature template (trait): heated-body -> Traits/"Living Brine" ("Its flesh is living brine: anything that wounds it, grapples it, or is grappled  [verb: burn:idea]")
[reskin] weapons answered: Brine Lash = none
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] save follows the effect: Actions/"Welling Brine (Recharge 5-6)" Wisdom -> Constitution — the row's point is its damage; a condition it hands out alongside does not pick the stat
[reskin] name-canon stands down: the path answered homebrew on "the thing in the well" and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 1) — "Welling Brine" [action/save/damage]
audit span not verbatim, dropped: Living Brine While it is motionless
[reskin] seed share: 0 of 2 signature row(s) came from a seed — the sameness metric
[reskin] [gap] triggers as a reaction when a creature enters its reach rather than on the creature's own action, and adds no pull or cl — "When something comes within reach of the well's rim, mouth, or shaft while the creature lurks in its false form, it erupts upward as a stinging column of brine and lashes at the nearest thing before it can react. A creature caught this way is coated in clinging brine that keeps stinging it, and the creature can use the confusion to pull itself and its victim a step back toward the shaft. It can't " — Well Drowned [seat: action [reaction/on_being_hit/damage]] (closest offered: ground-burst) [effect: condition] [menu: riposte ground-burst obstacle-pull exploiter coating condition-payoff lure slow-bolt patient-defense] [same-cell unoffered: heated-body bloodied-burst resonant-body ward-retaliation snap-shot] [same-seat rejected: ward-retaliation:legality snap-shot:role interpose:legality] [landed: ground-burst]
```


---


### Uulgh — in the run

**Concept:**  | role: brute

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Uulgh | 4 | brute-5-juggernaut | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- **dropped clause:** "many-legged body a single skittering engine of razored cables that drags a captive heat-haze with it across the dunes"
- **dropped clause:** "gleaming and clicking with a cold intelligence no beast should have"
- **dropped clause:** "It opens by stamping its forelegs to sheet the sand in a curtain of white fire"
- **dropped clause:** "circles and stabs with its burning limbs"
- **dropped clause:** "speak plainly"
- **dropped clause:** "only withdrawing"
- **dropped clause:** "still hissing"
- **dropped clause:** "when badly overmatched"
- read: def 2 / off 5 → 3.5; sustained 28 (2 × Cable Stab); nova White Stamp 22; dmg 33

```
Uulgh

Large Construct, Lawful Neutral

AC 14
Initiative -1 (9)

HP 85 (10d10 + 30)

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
10
+0
+0
MOD
SAVE
CON
16
+3
+5
CHA
4
-3
-3

Skills Athletics +6, Perception +2

Immunities Fire, Poison; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned

Senses darkvision 60 ft.; Passive Perception 12

Languages Common

CR 4 (XP 1,100; PB +2)

Traits

Blistering Arrogance. When a creature hits the uulgh with a melee attack while it is not kneeling or Prone, the attacker takes 7 (2d6) Fire damage as the furnace within the uulgh erupts against its pride.

Furnace Haze. At the end of each of the uulgh's turns, each creature in a 5-foot Emanation originating from the uulgh takes 5 (1d10) Fire damage.

Fire Absorption. Whenever the uulgh is subjected to Fire damage, it takes no damage and instead regains a number of Hit Points equal to the Fire damage dealt.

Immutable Form. The uulgh can't shape-shift.

Magic Resistance. The uulgh has Advantage on saving throws against spells and other magical effects.

Actions

Multiattack. The uulgh makes two Cable Stab attacks.

Cable Stab. Melee Attack Roll: +6, reach 5 ft. 8 (1d8 + 4) Piercing damage plus 6 (1d12) Fire damage.

White Stamp (Recharge 5-6). Dexterity Saving Throw: DC 13, each creature in a 10-foot Emanation originating from the uulgh. Failure: 22 (5d8) Bludgeoning damage. Success: Half damage.

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

- Traits/Blistering Arrogance — authored for this sheet; the GM's clause "scorching the arrogant"
- Traits/Furnace Haze — template fire-aura; library draw (seed unstamped); binds the GM's words: furnace+shimmers
- Traits/Fire Absorption — the chassis
- Traits/Immutable Form — the chassis
- Traits/Magic Resistance — the chassis
- Actions/Multiattack — the chassis
- Actions/Cable Stab — the chassis
- Actions/White Stamp — template ground-burst; library draw (seed unstamped); binds the GM's words: stamps

**Engine trace**

```
[path] blank — "role: brute" (code)
[route] brute-juggernaut type=Construct mechanics=aura, breath — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | brute-juggernaut: ✓ ("a furnace-hearted thing of black iron, i") | brute-juggernaut: no line key in the words — the model's read of its quote
[concept] synthesis (blank roll): archetype=brute type=Construct themes=fiendish/mind mind=sapient style=juggernaut lore=✓
[concept] synthesis text: A furnace-hearted thing of black iron, its segmented, many-legged body a single skittering engine of razored cables that drags a captive heat-haze with it across the dunes, gleaming and clicking with a cold intelligence no beast should have. It opens by stamping its forelegs to sheet the sand in a curtain of white fire, then circles and stabs with its burning limbs, herding intruders away from the ones who kneel and speak plainly. It fights with patient, watchful greed — holding back against the respectful, scorching the arrogant, and only withdrawing, still hissing, when badly overmatched. It is possessed of alien genius (INT 17-20), and it is a benevolent warden sworn to protect travelers who show respect.
[concept] signature elements: white-fire sand curtain that blinds intruders [behavior] | black iron segmented many-legged body [body] | shimmering captive heat-haze around its limbs [aura]
[concept] name proposal: Scorching Stalker
[concept] lore: Forged in a brass tyrant's lower-plane smithy as a gift of guardianship, it haunts sun-blasted caravan roads and demands nothing but the offering of a bowed head, burning any who pass it in proud silence.
[reskin] donor: brute-5-juggernaut -> CR 4
[reskin] [path] decides: blank (the matcher would have said homebrew)
[reskin] class kit: none — the blank path takes no class kit
[reskin] inline by rule: "the uulgh" — the call answered "the Uulgh" (kind), which the name does not support
[reskin] lacks asked: nothing taken away
[reskin] lacks not claimed: "gleaming and clicking with a cold intelligence no beast should have" reads like a lack to the words, and the call's list did not name it
[reskin] clauses: "A furnace-hearted thing of black iron" -> has (descriptive), head | "its segmented" -> has (descriptive) | "many-legged body a single skittering engine of razored cables that drags a captive heat-haze with it across the dunes" -> has (mechanical) | "gleaming and clicking with a cold intelligence no beast should have" -> has (mechanical) | "It opens by stamping its forelegs to sheet the sand in a curtain of white fire" -> has (mechanical) [asked: save_area] | "circles and stabs with its burning limbs" -> has (mechanical) [asked: attack] | "herding intruders away from the ones who kneel" -> has (mechanical) [asked: condition] | "speak plainly" -> has (header) | "It fights with patient" -> has (descriptive) | "watchful greed — holding back against the respectful" -> has (descriptive) | "scorching the arrogant" -> has (mechanical) [asked: attack] | "only withdrawing" -> has (mechanical) [asked: when_bloodied/movement] | "still hissing" -> has (mechanical) [asked: when_bloodied/movement] | "when badly overmatched" -> has (mechanical) [asked: when_bloodied/movement] | "It is possessed of alien genius (INT 17-20)" -> has (descriptive) | "it is a benevolent warden sworn to protect travelers who show respect" -> has (descriptive)
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The uulgh slams its forelegs into the ground and sheets the sand before it in a rolling curtain of white fire that hangs in the air until it moves on. The searing grit clings to every eye that looks through it, so that anyone caught in the curtain is left groping and half-blind while the uulgh circles behind them on its clicking legs. It will not raise the curtain over those who kneel and bow to i" [action/save/condition] — menu: leap, throw-retrieve, shield-bash, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, blighted-ground, trample, snare, execute, seal, lure, obstacle-pull (+ shelf: gaze-single, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, patient-defense, feint-slip, riposte, affliction, contagion, charge-push, hook-rider, pounce)
[reskin] signature bound to the concept's verb: action — patient-defense, hook-rider (patient, still, drag, drags)
[reskin] word match declined by the call: herd — the key word does not mean the mechanic here
[reskin] value check: "White Fire Stamp (Recharge 5-6)" EV 34.1 vs floor 23.7 (the whole Multiattack (2 attacks)) — dice 14 → 22 (nova budget)
[reskin] signature template: ground-burst -> Actions/"White Fire Stamp (Recharge 5-6)" ("The uulgh stamps its forelegs to sheet the sand in a curtain of white fire, sear [verb: stamps:concept]")
[reskin] keys spent by the action: stamps
[reskin] signature idea (trait): "A captive furnace breath drags behind the uulgh wherever it walks, a shimmering heat-haze that scalds and staggers anyone lingering in the air it has just crossed. Travelers who bow low and keep still are unharmed by the shimmer, but the proud who crowd close to its path feel their lungs and eyes burn." [trait/always/damage] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst, assassinate (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending, weapon-lodge)
[reskin] signature bound to the concept's verb: trait — heated-body (heat, burn, furnace, fire, iron)
[reskin] word match declined by the call: heated-body, terrain-walk, false-appearance — the key word does not mean the mechanic here
[reskin] signature template (trait): fire-aura -> Traits/"Furnace Haze" ("a captive furnace breath drags behind the uulgh wherever it walks, a shimmering  [verb: furnace:concept, shimmers:idea]")
[reskin] repair: 2 clause(s) with no row — "herding intruders away from the ones who kneel", "scorching the arrogant"; one targeted call with the sheet as context
[reskin] repair answer: attacks 0, saves 0, traits 1, reactions 0, answered [], unplaced ["description:herding intruders away from the ones who kneel"]
[reskin] clause answered in prose: "herding intruders away from the ones who kneel" — the call read the sheet and judged it description, not a row; the words reach the description instead
[reskin] condition relation: "Blistering Arrogance" — the call reads its condition as none, so no condition is recorded against it
[reskin] repaired sheet: 1 attack row(s), 0 save, 1 trait(s), 0 reaction(s); 1 clause(s) unplaced
[reskin] weapons answered: Cable Stab = none
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] absorption re-keyed: Lightning -> Fire (the donor organ obeys the concept energy)
[reskin] immunities stamped for type: Construct -> Fire, Poison; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned
[reskin] name-canon stands down: the path answered blank on "role: brute" and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] 2024 caps: "Blistering Arrogance" — a condition or game term shipped lowercase
[reskin] asked but unanswered: "only withdrawing" asked for when_bloodied and no row binds the clause
[reskin] asked but unanswered: "still hissing" asked for when_bloodied and no row binds the clause
[reskin] asked but unanswered: "when badly overmatched" asked for when_bloodied and no row binds the clause
[reskin] name follows content: Actions/"White Fire Stamp" carries Fire the row never deals — "White Stamp" (the element word drops; the call's own noun stays)
[reskin] seed share: 0 of 2 signature row(s) came from a seed — the sameness metric
```


---


### Grave-Warden's Champion — in the run

**Concept:** a skeleton with a greatsword

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Grave-Warden's Champion | 6 | brute-5 | ok | ok | SOFT: reach | ok | ok | ok | ok | ok | ok | ok |

- structure · soft · reach: Actions/Greatsword: reach 10 on a Medium body with no tether word
- read: def 4 / off 6 → 5; sustained 44 (2 × Greatsword); nova none; dmg 44

```
Grave-Warden's Champion

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

Great Weapon Master. When the champion hits a creature with its Greatsword, the attack deals an extra 3 damage.

Actions

Multiattack. The champion makes two attacks, using Greatsword or Hurled Debris in any combination.

Greatsword. Melee Attack Roll: +7, reach 10 ft. 22 (4d8 + 4) Slashing damage.

Hurled Debris. Ranged Attack Roll: +7, range 60/240 ft. 17 (3d8 + 4) Slashing damage.

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
- Actions/Hurled Debris — print's own row; weapon greatsword
- Traits/Great Weapon Master — a declared feature; the GM's clause "a skeleton with a greatsword"

**Engine trace**

```
[path] twist — Skeleton (is) — "skeleton" (call)
[route] brute type=Undead mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | brute: ✓ ("a skeleton with a greatsword") | brute: no line key in the words — the model's read of its quote
[concept] name: provided_name rejected — "a skeleton with a greatsword…" is the description, not a name
[concept] resolve: archetype=brute type=Undead themes=grave/armed mind=mindless style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: an oversized greatsword [object] | relentless, fearless advance into melee [behavior] | bare skeletal resilience to harm [body]
[concept] identity: A greatsword skeleton opens by striding in without hesitation or feint, swinging that oversized blade in wide, committed arcs that exploit its reach and trade blows it has no flesh to lose. Every round after, it keeps pressing in straight lines and heavy vertical chops, shrugging off punishment that would fell a living soldier and never giving ground. It is relentless rather than clever, fighting to the death without fear, fatigue, or any instinct to flee.
[concept] lore: Often the armored husk of a champion raised by a grave-warden's curse, it guards its burial ground still, blade in hand, and will not stop swinging until its bones are ground to powder.
[reskin] print canon array: STR 18, DEX 16, CON 15, INT 6, WIS 8, CHA 5 — the Skeleton's, STR fitted to +7
[reskin] donor: brute-5 -> CR 6
[reskin] [path] decides: twist on the Skeleton (the matcher agrees)
[reskin] print canon: "a skeleton with a greatsword" heads on the Skeleton — print's rows ride along; the seat stays
[reskin] named parts: Greatsword (slot) — the user's words, the engine's numbers
[reskin] named parts landed: 1 attack row(s), 0 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline declared: "the champion" — the call's own answer (kind), built from the name
[reskin] inline form: "the champion" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a skeleton with a greatsword" -> has (mechanical) [asked: attack]
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "When the champion swings, it steps forward with the blow and simply keeps coming, never pausing to reset its stance. While it presses this advance it can turn its full attention onto one enemy, and every step toward that enemy costs it nothing, though moving away from that enemy still does. The advance ends if the enemy it is fixated on drops or slips out of reach, but until then the champion clos" [bonus_action/always/movement] — menu: rampage, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, feint-slip (+ shelf: trample, leap, thrown-burst, throw-retrieve, shield-bash, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, zone-seed, affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, charge)
[reskin] closest accepted: action — the call refused every template but named "aggro-curse" as nearest; it lands rather than the row being dropped (what it wanted: gain extra movement and no opportunity attacks while advancing toward a single f)
[reskin] free signature row: action — "aggro-curse" is the call's nearest after it refused every template, so it ships as DECORATION: no receipt, no element claim, counted in the metric. Earns no clause credit
[reskin] fit declined: "Relentless Advance" — a print body takes only what the user's words ask, and the call named none of this creature's own elements for it; the call offered no quote, and the key table finds no verb either (the blacksmith's rally, critic-ten 2026-10-01)
[reskin] fallback stands down: the twist path has no shelf — the Skeleton's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "The champion's overlong blade sweeps through everything in front of it, so a single committed swing can catch whoever stands beside its chosen target as well. It has no instinct for spacing and no care for who it clips — friend, foe, or bone." [trait/always/damage] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst, assassinate (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending, weapon-lodge)
[reskin] signature miss: trait — "The champion's overlong blade sweeps through everything in front of it, so a single committed swing can catch whoever stands beside its chosen target as well. It has no instinct for spacing and no care for who it clips — friend, foe, or bone." [trait/always/damage] — no template on the shelf shares a verb with the concept or the idea (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst, assassinate, heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending, weapon-lodge)
[reskin] weapons answered: Greatsword = greatsword; Hurlblade = greatsword; Bone-Rattling Cleave = none
[reskin] weapon declared: "Hurlblade" is a greatsword — the call's own answer (the name alone read longsword)
[reskin] print canon alignment: Neutral -> Lawful Evil — the Skeleton's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "None" -> "Understands Common plus one other language but can't speak" — the Skeleton's
[reskin] print canon speed: 40 ft. -> 30 ft. — the Skeleton's walk; the concept's other modes stay
[reskin] print canon yields: "Hurlblade" keeps its greatsword — the GM typed it; the Skeleton's Shortbow prices the row but does not replace the weapon
[reskin] attack name by anatomy: "Hurlblade" -> "Hurled Debris" — Hurlblade names a melee weapon on a ranged row
[reskin] immunities stamped for type: Undead -> Poison; Exhaustion, Poisoned
[reskin] print canon defenses: vulnerabilities none -> Bludgeoning — the Skeleton's own header lines
[reskin] vulnerability rejected — "Bludgeoning" has no warrant in the concept's own text (print's default is none)
audit finding below confidence gate: Multiattack The champion wields a greatsword but also hurls debris; the Multiattack locks it to the greatsword only, making the ranged attack unreachable in a normal turn and contradicting the block's two-action offense.
[reskin] [gap] gain extra movement and no opportunity attacks while advancing toward a single fixated target — "When the champion swings, it steps forward with the blow and simply keeps coming, never pausing to reset its stance. While it presses this advance it can turn its full attention onto one enemy, and every step toward that enemy costs it nothing, though moving away from that enemy still does. The advance ends if the enemy it is fixated on drops or slips out of reach, but until then the champion clos" — Grave-Warden's Champion [seat: action [bonus_action/always/movement]] (closest offered: aggro-curse) [effect: movement] [menu: rampage second-wind aggro-curse own-turn-punisher self-invisibility rally focus coating feint-slip leap] [same-cell unoffered: blink spider-climb terrain-walk aberrant-ground web-walker earth-glide tunneler relentless-pursuit bound zone-seed phase-slip] [same-seat rejected: blink:role shell-withdraw:legality patient-defense:role lay-on-hands:role volley-order:role phase-slip:role] [VETOED AFTER ACCEPTANCE: aggro-curse never reached the sheet]
[reskin] signature outcome: 1 of 1 accepted signature pick(s) never reached the sheet — the seat shipped a fallback or nothing
[reskin] multiattack re-read — "Hurled Debris" joins the combination; "The champion makes two attacks, using Greatsword or Hurled Debris in any combination."
```


---

