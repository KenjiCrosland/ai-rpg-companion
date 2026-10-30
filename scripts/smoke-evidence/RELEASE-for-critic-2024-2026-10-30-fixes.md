# Release table for the critic — 2026-10-30, second package

One forty, `sweep-2026-10-30T02-34-52`, the same batch as the three before it.
This is the run made AFTER acting on your last read, so the case is a report on
what your findings turned into.

**Read the caveat first.** This forty was generated before two fixes landed, so
the artifacts show defects already corrected in the tree: **6 of 10 weapon rows
carry the wrong die** here. The cause was found by this very run and is fixed
(see §3). Nothing else in the package is stale.

## 1. The headline

**Gate: 3 FAIL of 40, down from 6** — and on a strictly harder gate: it now sees
the engine's own lint, two text lints, and a damage ceiling it was blind to
before.

| | 10-30 00:45 | **10-30 02:34** |
|---|---|---|
| FAIL sheets | 6 | **3** |
| undefined-attack-ref | 1 | **0** |
| dual-recharge | 1 | **0** |
| placeholder-leak | 1 | **0** |
| text-truncated | 1 | **0** |
| damage-dice | 1 | 1 |
| orphan-condition-ref | 1 | 2 (now **soft** — see §4) |
| rows dropped rather than fixed | — | **0** |
| clause coverage | 68% | **68%** (was falling 75 → 68) |

The three remaining FAILs: two `single-target-ceiling` (Swallow 64 at CR 15,
1.25×; Knell 90 at CR 13, 1.76×) and one `damage-dice` on a monk's Unarmed
Strike, which is a kit row and not in the weapon table — the weapon fix below
does not reach it.

## 2. Your lint proposal, and what it found

You priced the text lints at an hour and said they would clear 4 of 6 broken
sheets. They did, and the bigger find was next to them: **`lint_findings` was
write-only**. `generate.mjs` records it at ship and NOTHING read it — one
reference in the repository, the write. So the engine detected defects, wrote
them down, and shipped. Four sheets of forty, and **three of the four were on
nobody's list, yours included**:

- `undefined-attack-ref` — the 2014 Owlbear's Rend citing a "Talons" row. You
  found this one by hand; the engine had it in a field nobody consumed.
- `dual-recharge` — two Recharge rows on the Stone Golem. **0 of 329 print
  blocks field two; 86 field exactly one.**
- `damage-dice` — the Reed-Temple Warden's `23 (3d8 + 3)`, where the dice average
  16.5.
- `orphan-condition-ref` — and this one is a FALSE POSITIVE on print's own row.

All four fixed at source except the last (which needs no fix) and `damage-dice`
on kit rows.

**Three of the six fixes shared one root cause**: a decision made before print's
composition is known. The Mummy Lord's legendary rows, the chassis attack
surviving an `exact` sheet, and the dual Recharge all sit in the print-canon
block, and all three are fixed by deferring the decision until print's rows have
landed. If a fourth appears, that is where to look.

**And two were one line.** The print-canon rename rewrote every OTHER row's
reference to the old name and skipped the renamed row's own text, so a welded
pounce rider kept "makes one Talons attack" after the row became Rend. The same
line used a GLOBAL regex with `.test()`, so each success advanced `lastIndex` and
the next row's test began mid-string — cross-row renames were silently
order-dependent.

## 3. Weapon dice: you were right, and so was the maul

Measured over the 329: **print keeps the weapon's die SIZE and scales the COUNT**
— greataxe 1d12, greatsword 2d6, battleaxe 2d8, handaxe 3d6, javelin 3d6,
warhammer 2d8 — 15 of 16 weapons, the longsword being the exception at 2d10. The
table had no die sizes at all, so dice came from CR scaling and reach from the
donor; neither asked the weapon.

**But the maul was correct.** Your note read "Maul d6 (heavy weapons are
d10/d12)", and a maul is 2d6 in the weapon table. The check I first wrote
repeated your rule instead of reading the table, and flagged it too.

This forty then measured the fix at **4 of 10 rows**, and the breakdown was
exactly diagnostic: four misses were GM-named PARTS, one a print row (exempt by
design — print's numbers are print's calibration), and one a javelin whose row
reads "Ranged Attack Roll" alone, which the melee-only condition never saw. Both
gaps are closed in the tree: a GM naming a mace is asking for a mace, while only
a declared NUMBER is theirs to keep. Expect 9 of 10 next run; the remaining one
is the print row.

## 4. Where we overruled you, with the measurement

**The CR-banded width cap for at-will control cannot exist.** You asked for one
built like the single-hit table. Print's widest at-will multi-target control row
is the **Harpy's 300-foot Emanation at CR 1** (282,743 sq ft), so a running max
sits there from CR 1 up and permits everything. Print caps the CONSEQUENCE
instead, and the split is by shape: Cones bound the condition (16/16) and never
grant immunity (0/16); Emanations past 10 feet always grant the 24-hour immunity
(4/4 across Traits and Actions), the lone exception being the Hezrou's 10-foot
Stench. The gate is shape-aware now, with no width axis. You were right that the
6 → 0 replay was suspicious: `wide` tested `within (\d+) feet`, so
`120-foot Emanation` read as narrow and the Leviathan passed through a hole.

**Your single-target ceiling needed the running max you asked for, and that
softens two of your own examples.** With CR 17-20 running at 51 rather than its
sampled 43, the Brass Tyrant's 59 is 1.16× and the Pit Fiend's 58 is 1.14× —
against the one-shots at 1.76× and 1.80×. So severity tracks degree, as
`hot-offense` already does: **fail past 1.25×, soft under it.** A CR 5 monk's
stacked unarmed strike reads 35 against 31, and failing that is the wrong call.

**And `orphan-condition-ref` is soft, not fail.** It fires on print's own
Vampire, whose Charmed comes from casting *Charm Person*; the rule only recognises explicit "has the X condition" phrasing. When
we wired the engine lint in we forced every finding to `fail`, which had the gate
failing a sheet for print's own text. Findings now grade by rule: verified
premises fail, anything unmeasured is soft.

## 5. Your regression finding, now an instrument

Seven regressions you found by hand passed the gate, passed our reading, and
passed your own previous read. `scripts/clause-diff.mjs` makes them measurable:
the forty is the same forty, so a clause credited in one run and dropped in the
next is a regression. Sheets pair by BATCH INDEX, never by name — the engine
renames the creature every run ("Chapel Toller" became "Death-Knell Sexton"), so
name-keyed pairing silently compares different concepts. It judges nothing;
`checkBlock().fidelity` already computes both sets.

On the previous pair it independently found 6, two of them yours (the Hydra, and
Vashka's shield wall). It correctly does NOT list the Stone Golem's weeping
saint, which is absent from both runs — a standing miss, not a regression.

**This forty against the last: 7 lost, 7 regained, coverage flat at 68%.**

| regressed | recovered |
|---|---|
| Vampire "keeps a garden of thorns" | Hydra "stumps smoke instead of regrowing" |
| Glacier Heart "a glacier's heart given legs" | Plague Archon "commands lesser swarms" |
| Vashka "never breaks ranks" | Purple Worm "swallowed a war-band's armoury" |
| Hive Rot Scyther "four scythe-arms" | Glacier Heart "a wake of killing cold" |
| Mirewitch Sable "curses trespassers" | Vashka "fights from a shield wall" |
| Krennik "riding a worg" | Bog Hound "drags fishermen under" |
| Garrick One-Axe "closes with a shortsword" | Hive Rot Scyther "a shell that sheds acid" |

Three of your seven recovered (the Hydra, the Archon's swarms, Vashka's wall).
The churn is near-total, which is its own finding: the same concept answers and
stops answering run to run, so no single forty's coverage figure means much.

## 6. Corrections to our own reporting

- **"Zero real failures" was wrong.** We reported 1 FAIL of 40 this morning off a
  gate blind to the engine's own findings. The true count was 6, which matched
  your six soundness-0 sheets, reached independently.
- **"135 damage" was wrong.** That row reads "90 ... or 45 ... if the swarm is
  Bloodied" — one attack at two rates, 90, which is your figure. `donors.spec`
  has stripped that pattern since September and the first cut of the ceiling did
  not reuse it.
- **`expressed` 4 → 7 was over-read.** Across three forties it is 4, 7, 4 — noise
  on a count that small. Decoration (19 → 12 → 10) and borrowed-row landings
  (86 → 80 → 74) are the numbers that actually moved.
- **The relic shape's citation was false.** It claimed "print's own object
  statlines (Mummy Lord/Heart, Night Hag/Soul Bag, Erinyes/Magic Rope)" and print
  gives none of those three a statline. The numbers were always ours. Corrected
  in place; the duplicate you found at CR 13 and CR 20 is NOT fixed, because
  shapes use a fixed six-band vocabulary where `13-20` is one band and a static
  frame cannot differ across it. It needs a CR-derived token.

## 7. What we would value from you

1. **Is 3 FAIL of 40 on this gate better than 6, in your reading of the sheets?**
   Our instruments say yes; yours caught what ours missed last time.
2. **The clause churn in §5** — 7 lost and 7 regained, near-total turnover. Is
   per-sweep coverage worth tracking at all, or is the fixture (the Weeping Saint)
   the only honest regression signal?
3. **Still unbuilt from your list**: the Weapon Lodge cap, `damage-dice` on kit
   rows, typed slots and two-sided decoration, stock-row reuse counted in
   originality, and the class body by gear. Would you reorder them?
4. **`each creature of its choice` is 0 of 329 print rows**, gated or not. It sits
   on at least three templates and removing it is a real nerf. Still worth it?

---

# 2024 blocks

## Review batch — sweep-2026-10-30T02-34-52

The checker ran first. The gate table covers every block in the run; every block of the run follows. Each block carries its checker row above and its engine trace below. Hand-derive against the row first; then read for what predicates can't see.

### Gate table — the whole run

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Dire Wolf | 1 | 2024 | skirmisher-1 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 2/2 |
| Bog Hound | 1 (2014) | 2014 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 2/3 |
| Owlbear | 3 (2014) | 2014 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 2/2 |
| Chapel Bell-Ringer | 3 | 2024 | lurker-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 7/7 |
| Air Elemental | 5 | 2024 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 5/5 |
| Scree-Wight | 5 (2014) | 2014 | brute-5-grappler | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 3/4 |
| Hydra | 8 (2014) | 2014 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 5/5 |
| Ramshackle Battering Golem | 8 | 2024 | brute-5-juggernaut | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 6/6 |
| Stone Golem | 10 | 2024 | brute-9 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 7/7 |
| Drowned Choirmaster | 10 (2014) | 2014 | caster-8-binder | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | ok | soft (1) | 0/1 | 1/6 |
| Vampire | 13 (2014) | 2014 | brute-13 | ok | ok | ok | ok | ok | ok | ok | SOFT: orphan-condition-ref, orphan-condition-ref | ok | ok | soft (1) | 0/1 | 11/11 |
| Plague Archon | 13 | 2024 | skirmisher-13-winged | ok | ok | SOFT: reach | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/2 | 6/7 |
| Purple Worm | 15 | 2024 | brute-13 | ok | FAIL: single-target-ceiling | ok | ok | ok | ok | ok | ok | ok | ok | FAIL (1) | 1/1 | 5/5 |
| Glacier Heart | 15 (2014) | 2014 | brute-9-juggernaut | ok | SOFT: single-target-ceiling, band | ok | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/2 | 6/6 |
| Adult Red Dragon | 17 (2014) | 2014 | dragon-15 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok | ok | soft (1) | 0/1 | 9/9 |
| Brass Tyrant | 17 | 2024 | brute-17-juggernaut | ok | SOFT: hot-offense | ok | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 7/9 |
| Pit Fiend | 20 | 2024 | brute-21 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 9/9 |
| Bone Sun Archlich | 20 (2014) | 2014 | caster-21 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 11/11 |
| Ancient Gold Dragon | 24 (2014) | 2014 | — | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | — | — |
| Trench Bellower | 24 | 2024 | brute-21 | ok | SOFT: aim-dpr, band | ok | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 3/8 |
| Owlbear | 3 | 2024 | brute-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 1/1 |
| Goblin Boss | 1 (2014) | 2014 | skirmisher-1 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/3 |
| Vashka the Red | 6 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/2 | 5/5 |
| Hive Rot Scyther | 9 | 2024 | brute-8-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 4/6 | 4/5 |
| Iron Gate Warden | 11 (2014) | 2014 | brute-9-juggernaut | ok | user-set: AC 20 · reads CR 10.5 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 3/3 | 2/6 |
| Mirewitch Sable | 7 | 2024 | caster-8-binder | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/2 | 4/5 |
| Defrocked Templar | 6 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 4/4 |
| Ilvareth Dusksong | 12 (2014) | 2014 | caster-12 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 5/6 |
| Swarm of Unmourned Tolls | 13 | 2024 | swarm-9 | ok | FAIL: single-target-ceiling | ok | ok | ok | ok | ok | ok | ok | ok | FAIL (1) | 0/2 | 4/4 |
| Reliquary Ooze | 9 (2014) | 2014 | ooze-9 | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | ok | soft (1) | 0/1 | 4/5 |
| Squallwing Drake | 7 | 2024 | dragon-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/3 |
| Boulder Exile | 9 (2014) | 2014 | brute-9 | ok | SOFT: aim-atk | ok | ok | ok | ok | ok | ok | ok | ok | soft (1) | 2/2 | 4/4 |
| Reed-Cloister Adept | 5 (2014) | 2014 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | FAIL: damage-dice | ok | ok | FAIL (1) | 1/1 | 6/6 |
| Krennik Skullstandard | 4 (2014) | 2014 | skirmisher-3-mounted | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | ok | soft (1) | 0/1 | 5/6 |
| Wellthing | 5 | 2024 | lurker-5-trap | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 0/3 |
| Chok | 4 | 2024 | brute-2 | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | ok | soft (1) | 7/14 | 4/4 |
| Meshrin | 8 (2014) | 2014 | skirmisher-8-hurler | ok | user-set: AC 16, HP 120 · reads CR 6.5 | SOFT: lint:hp-formula | ok | ok | ok | ok | ok | ok | ok | soft (1) | 8/8 | 7/7 |
| Oathsworn Remains | 6 | 2024 | brute-5 | ok | ok | SOFT: reach | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 3/4 |
| Garrick One-Axe | 5 (2014) | 2014 | skirmisher-8-hurler | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/2 | 4/4 |
| Brother Halric | 3 (2014) | 2014 | caster-6 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |

**Dropped 17 of 60 GM clauses** (coverage 72%); concept share 86% (179/207 rows). A run with zero fails and 60% coverage is a failing run. 1 blank-path sheet(s) excluded — the engine writes their description, so scoring it is self-scoring (Chok 7/14).
**Fails by seat and gate:**
- brute-13 / bands: 1
- swarm-9 / bands: 1
- skirmisher-3 / adjudicability: 1



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
[concept] signature elements: frost-rimed hide [body] | pack skirmishing—dart in, dart out [behavior] | chilling bite that slows prey [behavior]
[concept] identity: The dire wolf with a frost-rimed hide circles its prey in silence, then darts in with a snapping bite that sinks cold into flesh while its packmates close from the flanks. Each round it feints, retreats, and reopens with a frost-rimed lunge, using the chill of its hide to slow and confuse a target before darting back out of reach. When bloodied it does not flee but grows more vicious, marshaling the pack in a snapping, harrying feint-and-bite cadence to the end.
[concept] lore: A dire wolf that survived a winter that never broke, its hide permanently rimed with frost, it hunts to feed the pack that was whittled down to it and knits itself to new kin by pacing cold-blooded circles around them.
[reskin] print canon defenses: HP 30 -> 22, AC 15 -> 14 — the Dire Wolf's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 17, DEX 15, CON 15, INT 3, WIS 12, CHA 7 — the Dire Wolf's at its own CR; attack +4 -> +5, DC 13 (print's)
[reskin] donor: skirmisher-1 -> CR 1
[reskin] [path] decides: twist on the Dire Wolf (the matcher agrees)
[reskin] print canon: "Dire Wolf — with a frost-rimed hide" heads on the Dire Wolf — print's rows ride along; the seat stays
[reskin] claim gate: CR 1 but a Beast body — the trait seat stays open (print: a material body carries a trait at every tier)
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] name_element answered: Rimefeint = imagery
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline by rule: "the dire wolf" — the call answered "the dire wolf" (kind), which the name does not support
[reskin] inline form: "the dire wolf" — the model's own reading of the name
[reskin] final price: the chassis's Multiattack: the round ran 14 against the card's 10 — the attack rows re-solve at 75% (2 attacks off one row after a supersede)
[reskin] the sheet's declared ask: none — the route call named no mechanic
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Dire Wolf — with a frost-rimed hide" -> has (descriptive), head
[reskin] body verdicts: 29 of 29 answered; not true of this body: snare, snare-bolt, blink, phase-slip, heated-body, false-appearance, absorption, bloodied-burst, resonant-body, adhesive, web-walker, noxious-aura, uncanny-sense, marking-light, relic-object, warded-mending, mimicry, gaze-aura, blurred-form, death-burst, kill-denial, hook-rider, life-drain
[reskin] signature idea (action): "When the dire wolf hits a creature with its Bite, the wound crusts over with rime and the target is Slowed until the end of its next turn — the cold sinking in slows the prey's blood and steps so the pack can close." [rider/on_hit/condition] [family: payoff] — menu: contagion, charge-push, pounce, isolation, charge (+ shelf: shield-bash, lure, spew, sensory-strike, disarm, thrown-burst-seed, delayed-brand, slow-bolt, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, riposte)
[reskin] composed candidates on the menu: action — composed:payoff:condition (the payoff family's options, built before the call looks)
[reskin] menu ordered by the idea's stamps: action — idea fires on_hit/does condition; leading: contagion (on_hit/condition), pounce (on_hit/condition), composed:payoff:condition (on_hit/condition)
[reskin] keys would have bound: action — slow-bolt (frost)
[reskin] word match declined by the call: contagion, pounce, composed:payoff:condition, slow-bolt, charge-push, charge, isolation, rampage — the key word does not mean the mechanic here
[reskin] closest accepted: action — the call refused every template but named "contagion" as nearest and declined it for no_fit; it lands rather than the row being dropped (what it wanted: imposes a slowing condition on the target when the Bite hits, until the end of i)
[reskin] free signature row: action — "contagion" is the call's nearest after it refused every template, so it ships as DECORATION: no receipt, no element claim, counted in the metric. Earns no clause credit
[reskin] decoration renamed: "Rimed Bite" borrowed the GM's own word "rimed" for a row that expresses nothing — it takes "Contagion", the template's own name
[reskin] seat takes its clause: "Contagion" is HANDED "with a frost-rimed hide" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature rider: contagion -> Bite (appended; The idea is an on-hit Bite rider imposing Slowed, but the clause the GM wrote as [shape fit, no verb match])
[reskin] signature idea (trait): "Frost-Rimed Hide. Creatures within the wolf's reach that begin their turn there have their speed reduced by the numbing cold; the wolf's allies are untouched by it, so the pack fights shoulder-to-shoulder inside the wolf's chill while their prey staggers." [trait/start_of_turn/condition] [family: zone] — menu: spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, energy-aura, bloodied-fury, blood-frenzy, pack-tactics, shielded-mind, relentless-pursuit, bound, undead-fortitude, truth-aura, fear-aura
[reskin] composed candidates on the menu: trait — composed:zone:condition:poisoned, composed:zone:condition:frightened, composed:zone:condition:deafened, composed:zone:condition:blinded (the zone family's options, built before the call looks)
[reskin] menu ordered by the idea's stamps: trait — idea fires start_of_turn/does condition; leading: truth-aura (start_of_turn/condition), fear-aura (start_of_turn/condition), composed:zone:condition:poisoned (start_of_turn/condition)
[reskin] word match declined by the call: truth-aura, fear-aura, composed:zone:condition:frightened, composed:zone:condition:deafened, composed:zone:condition:blinded, energy-aura — the key word does not mean the mechanic here
[reskin] closest refused: trait — "composed:zone:condition:poisoned" was named closest but was never on this sheet's menu (a gate refused it, or the pool did not offer it for this idea's declared trigger)
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "Frost-Rimed Hide. Creatures within the wolf's reach that begin their turn there have their speed reduced by the numbing cold; the wolf's allies are untouched by it, so the pack fights shoulder-to-shoulder inside the wolf's chill while their prey staggers." [trait/start_of_turn/condition] — the model found no template that holds it (offered: truth-aura, fear-aura, composed:zone:condition:poisoned, composed:zone:condition:frightened, composed:zone:condition:deafened, composed:zone:condition:blinded, energy-aura, phobia, faultless-tracker, spider-climb, terrain-walk, aberrant-ground, bloodied-fury, blood-frenzy, pack-tactics, shielded-mind, relentless-pursuit, bound, undead-fortitude)
[reskin] weapons answered: Bite = none
[reskin] print canon speed: 30 ft. -> 50 ft. — the Dire Wolf's walk; the concept's other modes stay
[reskin] languages held: None stands — INT 3 on a Beast speaks nothing, whatever the mind read said
[reskin] print canon skills: "Perception +3, Stealth +4" -> "Perception +5, Stealth +4" — the Dire Wolf's own skills, each derived from this sheet's stat and PB
[reskin] print canon trait: Pack Tactics — "Dire Wolf — with a frost-rimed hide" is the Dire Wolf (print's own row)
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the seat's, not the Dire Wolf's
[reskin] print canon: chassis row leaves — Traits/"Unrelenting Stalker" is the seat's, not the Dire Wolf's
[reskin] [gap] imposes a slowing condition on the target when the Bite hits, until the end of its next turn — "When the dire wolf hits a creature with its Bite, the wound crusts over with rime and the target is Slowed until the end of its next turn — the cold sinking in slows the prey's blood and steps so the pack can close." — Dire Wolf [seat: action [rider/on_hit/condition]] (closest offered: contagion) [effect: condition] [menu: contagion pounce composed:payoff:condition charge-push isolation charge slow-bolt rampage feint-slip] [same-cell unoffered: affliction stunning-strike life-drain snatch bolt-restrain bolt-mark] [same-seat rejected: affliction:legality stunning-strike:legality hook-rider:legality life-drain:legality snatch:legality bolt-restrain:role bolt-drag:role bolt-mark:legality] [landed: contagion]
[reskin] [gap] a start-of-turn aura that reduces the target's Speed rather than imposing a condition, and that spares the creature's al — "Frost-Rimed Hide. Creatures within the wolf's reach that begin their turn there have their speed reduced by the numbing cold; the wolf's allies are untouched by it, so the pack fights shoulder-to-shoulder inside the wolf's chill while their prey staggers." — Dire Wolf [seat: trait [trait/start_of_turn/condition]] (closest offered: composed:zone:condition:poisoned) [effect: movement] [menu: truth-aura fear-aura composed:zone:condition:poisoned composed:zone:condition:frightened composed:zone:condition:deafened composed:zone:condition:blinded energy-aura phobia faultless-tracker spider-climb terrain-walk aberrant-ground bloodied-fury blood-frenzy pack-tactics shielded-mind relentless-pursuit bound undead-fortitude] [same-cell unoffered: noxious-aura gaze-aura] [same-seat rejected: noxious-aura:legality warded-mending:legality gaze-aura:legality] [row dropped]
[reskin] signature outcome: 1 of 2 accepted signature pick(s) never reached the sheet — 1x the call named no template for the pick
[reskin] signature tally: 2 seat(s) -> 0 shape(s) on the sheet · 0 expressed, 1 decoration, 0 free · accepted picks lost: 1 of 2 (1x the call named no template for the pick) · path twist
```


---


### Trench Bellower — highest CR

**Concept:** a leviathan of the trench whose song drowns fleets

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Trench Bellower | 24 | brute-21 | ok | SOFT: aim-dpr, band | ok | ok | ok | ok | ok | ok | ok | ok |

- bands · soft · aim-dpr: damage 180 a round is 28% under the card's 250
- bands · soft · band: reads CR 25.5 (print at 24 reads 17.5–25.5, n=5)
- read: def 26 / off 25 → 25.5; sustained 180 (2 × Crush + legendary Surge and Crush); nova Drowning Chord 78; dmg 180

```
Trench Bellower

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

Amphibious. The bellower can breathe air and water.

Resonant Hide. Whenever the bellower is subjected to Thunder damage, it takes no damage and instead regains a number of Hit Points equal to the Thunder damage dealt.

Legendary Resistance (3/Day). If the bellower fails a saving throw, it can choose to succeed instead.

Actions

Multiattack. The bellower makes two Crush attacks. It can replace one attack with a use of Drowning Call.

Crush. Melee Attack Roll: +16, reach 15 ft. 22 (3d8 + 9) Bludgeoning damage plus 14 (4d6) Thunder damage.

Drowning Chord (Recharge 5-6). Constitution Saving Throw: DC 24, each creature in a 60-foot Cone. Failure: 78 (12d12) Thunder damage, and the target has the Deafened condition until the end of its next turn. Success: Half damage only.

Drowning Call. Wisdom Saving Throw: DC 24, each creature of the bellower's choice in a 120-foot Emanation originating from the bellower that can see or hear it. Failure: The target has the Charmed condition until the end of its next turn, and while Charmed this way, it must move toward the bellower by the safest available route on its turn and can't take Reactions. Success: The target is immune to this creature's lure for 24 hours.

Legendary Actions

Legendary Action Uses: 3. Immediately after another creature's turn, the bellower can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.

Surge and Crush. The bellower moves up to half its Speed without provoking Opportunity Attacks, and it makes one Crush attack.

Trench Sweep. Strength Saving Throw: DC 24, each creature within 10 feet of the bellower. Failure: The target has the Prone condition.

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
- Traits/Resonant Hide — template absorption; library draw (seed unstamped); binds the GM's words: drink+immune
- Traits/Legendary Resistance — the chassis
- Actions/Multiattack — the chassis
- Actions/Crush — the chassis
- Actions/Drowning Chord — the chassis
- Actions/Drowning Call — template lure; library draw (seed unstamped); the GM's clause "a leviathan of the trench whose song drowns fleets"; binds the GM's words: song+call
- Legendary Actions/Legendary Action Uses: 3 — the chassis
- Legendary Actions/Surge and Crush — the chassis
- Legendary Actions/Trench Sweep — the chassis

**Engine trace**

```
[path] homebrew — "a leviathan of the trench whose song drowns fleets" (call)
[route] brute type=Beast mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | caster-binder: the call reads no worked magic in these words | caster: the family itself needs a magic word in the words — the fallback leaves it | fell to brute's plain line | brute: no line key in the words — the model's read of its quote
[concept] resolve: archetype=brute type=Beast themes=aquatic/voice mind=bestial style=— energy=Thunder mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: the song that drowns fleets [behavior] | trench-hide bulk and crushing limbs [body] | a drowning pressure-field of sound [aura]
[concept] identity: The leviathan opens by loosing its drowning song across the water — a subsonic chord that rolls through hulls and chests alike, staggering fleets before a single limb is thrown — then surges in to trade blows with whatever survives, crushing ships and swimmers against its hide with slow, patient mass. Every round it keeps singing between strikes, layering its voice over the melee so that the fight is fought as much against the sound as against the body. It never flees: roused from the trench, it fights to the death, and it does not toy — it simply keeps singing until the water around it is still.
[concept] lore: It has lain in the lightless trench for ages, feeding on sunken ruin and pressure, and it rises only when something on the surface sings loudly enough to be mistaken for its own kind.
[reskin] donor: brute-21 -> CR 24 (invented — no printed peer)
[reskin] [path] decides: homebrew (the matcher agrees)
[reskin] ranged row off: "Legendary Ranged Attack" leaves with it (it made a Ranged Attack attack)
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] type honesty: Beast above CR 10 -> Monstrosity (print ceiling: CR 8)
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline declared: "the bellower" — the call's own answer (kind), built from the name
[reskin] inline form: "the bellower" — the model's own reading of the name
[reskin] save dc derived: DC 23 -> 24 (8 + PB 7 + the sheet's best 9) — no stat on the sheet reached it
[reskin] the sheet's declared ask: charm — the route call's one answer for the whole concept
[reskin] alignment by mind: Unaligned -> Neutral — a Monstrosity with INT 10 can hold an ethic (print: 0 of 329 Unaligned blocks speak)
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a leviathan of the trench whose song drowns fleets" -> has (mechanical) [asked: save_area] [askMechanic: dazzle]
[reskin] body verdicts: 25 of 25 answered; not true of this body: drain, shell-withdraw, rally, coating, heated-body, false-appearance, bloodied-burst, adhesive, aberrant-ground, faultless-tracker, web-walker, energy-aura, noxious-aura, marking-light, warded-mending, gaze-aura, hook-rider, life-drain
[reskin] menu pruned: action — push-prone, thrown-burst-seed (the sheet cannot render them)
[reskin] signature idea (action): "The bellower's song carries to the edge of hearing, and creatures that listen too long find the melody in their own thoughts. Each creature of the bellower's choice within a wide radius that can hear it must succeed on a Wisdom saving throw or be Charmed by the bellower, hearing its song as a call to stillness and refusing to attack it or its kin." [action/save/condition] [family: mark] — menu: shield-bash, escalating-dread, terror-pulse, herd, exploiter, execute, lure, pacify, sensory-strike, curse-debt, reveal (+ shelf: second-wind, aggro-curse, own-turn-punisher, self-invisibility, focus, stunning-strike, charge-push, pounce, charge)
[reskin] lead by this seat's own clause: action — "dazzle" from the clause this seat serves, not the sheet's "charm"
[reskin] composed candidates: none action — the mark family has no grammar — composable families are payoff, body-reaction, zone
[reskin] declared mechanic leads the menu: action — dazzle: sensory-strike, reveal
[reskin] menu ordered by the idea's stamps: action — idea fires save/does condition; leading: sensory-strike (save/condition), reveal (save/condition), shield-bash (save/condition)
[reskin] keys would have bound: action — lure (song)
[reskin] classification handed to the fit call: shape=save_area
[reskin] word match declined by the call: sensory-strike, reveal, shield-bash, escalating-dread, terror-pulse, pacify, herd, exploiter, execute, curse-debt — the key word does not mean the mechanic here
[reskin] value check: "Drowning Call (Recharge 5-6)" EV 41.8 vs floor 19.8 (one attack of 2) — over the ceiling — gated Recharge 5-6
[reskin] signature template: lure -> Actions/"Drowning Call (Recharge 5-6)" ("Each creature of the bellower's choice within a wide radius that can hear it mus [verb: song:concept, call:idea]")
[reskin] keys spent by the action: song
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 21 already beats print's 19 at CR 24, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "The bellower's hide is riddled with resonant chambers that drink its own … and give it back; whenever it takes Thunder damage, it regains an equal number of hit points. It is immune to Thunder damage and takes no damage from its own Drowning Chord." [trait/always/defense] [family: heal] — menu: spider-climb, phobia, terrain-walk, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, sealed-body, undead-fortitude, mimicry, truth-aura, fear-aura, evasion, guarded-stance (+ shelf: absorption, resonant-body, weapon-lodge)
[reskin] lead by this seat's own clause: trait — "dazzle" from the clause this seat serves, not the sheet's "charm"
[reskin] composed candidates: none trait — the heal family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does defense; leading: bloodied-fury (always/defense), death-restoration (always/defense), uncanny-sense (always/defense)
[reskin] classification handed to the fit call: shape=save_area
[reskin] word match declined by the call: mimicry, fear-aura, relentless-pursuit — the key word does not mean the mechanic here
[reskin] free signature row: "Resonant Hide" — the trait seat cannot quote the GM, but the call names the element it expresses: "the song that drowns fleets". Earns no clause credit; the homebrew path allows 1 and this is number 1
[reskin] signature template (trait): absorption -> Traits/"Resonant Hide" ("Its resonant hide takes no damage from Thunder and regains an equal number of hi [verb: drink:idea, immune:idea]")
[reskin] weapons answered: Crush = none
[reskin] chassis nova: "Drowning Chord (Recharge 5-6)" — the brute-21's own nova row (its "Area Nova", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] amphibious by concept: a creature of the deep breathes both (print: the Sea Hag's)
[reskin] name-canon stands down: the path answered homebrew on "a leviathan of the trench whose song dro" and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] reach follows the body: Actions/"Crush" reach 10 → 15 ft. on a Gargantuan body (print's modal reach at that size)
[reskin] dead control row: "Drowning Call" sheds its gate — no damage, no KO condition; it joins the Multiattack menu instead
[reskin] multiattack replacement clause: It can replace one attack with a use of Drowning Call.
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 1) — "Resonant Hide" [trait/on_being_hit/defense]
[reskin] row binds its clause: "Drowning Call" answers "a leviathan of the trench whose song drowns fleets" — the keys it matched came from that clause, so the coverage credit has a receipt
[reskin] element expressed: Resonant Hide carries "the song that drowns fleets" — "Whenever the bellower is subjected to Thunder damage, it takes no damage and ins"
audit finding below confidence gate: Trench Sweep Trench Sweep is a Strength saving throw that knocks targets Prone but has no duration; while Prone carries its own exit (standing up), the entry never states how long the condition lasts beyond the immediate result, leaving the GM to infer it persists until the target stands.
[reskin] seed share: 0 of 2 signature row(s) came from a seed — the sameness metric
[reskin] signature tally: 2 seat(s) -> 2 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 0 of 0 · path homebrew
```


---


### Chapel Bell-Ringer — a 2024 sheet

**Concept:** a chapel bell-ringer's ghost that tolls for the dying

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Chapel Bell-Ringer | 3 | lurker-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- **dropped clause:** "tolls for the dying"
- read: def 1 / off 5 → 3; sustained 38 (2 × Withering Touch); nova Wail 6; dmg 38

```
Chapel Bell-Ringer

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

Ethereal Sight. The chapel bell-ringer can see 60 feet into the Ethereal Plane when it is on the Material Plane.

Incorporeal Movement. The chapel bell-ringer can move through other creatures and objects as if they were Difficult Terrain. It takes 5 (1d10) Force damage if it ends its turn inside an object.

Actions

Multiattack. The chapel bell-ringer makes two Withering Touch attacks. It can replace one attack with a use of Horrific Visage.

Withering Touch. Melee Attack Roll: +5, reach 5 ft. 19 (3d10 + 3) Necrotic damage.

Wail (1/Day). Constitution Saving Throw: DC 13, each creature in a 30-foot Emanation originating from the chapel bell-ringer that can hear it. Failure: 6 (1d12) Necrotic damage, and if the target has 6 Hit Points or fewer after taking this damage, it drops to 0 Hit Points. Success: Half damage only.

Horrific Visage. Wisdom Saving Throw: DC 13, each creature in a 60-foot Cone that can see the chapel bell-ringer and isn't an Undead. Failure: 10 (2d6 + 3) Psychic damage, and the target has the Frightened condition until the start of the chapel bell-ringer's next turn. Success: The target is immune to this ghost's Horrific Visage for 24 hours.

Possession (Recharge 6). Charisma Saving Throw: DC 13, one Humanoid the chapel bell-ringer can see within 5 feet. Failure: The target is possessed by the chapel bell-ringer; the chapel bell-ringer disappears, and the target has the Incapacitated condition and loses control of its body. The chapel bell-ringer now controls the body, but the target retains awareness. The chapel bell-ringer can't be targeted by any attack, spell, or other effect, except ones that specifically target Undead. The chapel bell-ringer's game statistics are the same, except it uses the possessed target's Speed, as well as the target's Strength, Dexterity, and Constitution modifiers.
The possession lasts until the body drops to 0 Hit Points or the chapel bell-ringer leaves as a Bonus Action. When the possession ends, the chapel bell-ringer appears in an unoccupied space within 5 feet of the target, and the target is immune to this ghost's Possession for 24 hours. Success: The target is immune to this ghost's Possession for 24 hours.

Etherealness. The chapel bell-ringer casts the Etherealness spell, requiring no spell components and using Charisma as the spellcasting ability. The chapel bell-ringer is visible on the Material Plane while on the Border Ethereal and vice versa, but it can't affect or be affected by anything on the other plane.

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
[path] twist — Ghost (is) — "ghost" (call)
[route] lurker-phantom type=Undead mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | lurker-phantom: ✓ ("bell-ringer's ghost") | lurker-phantom: key "ghost" (class body)
[concept] hints: phantom→style ✓ ("a chapel bell-ringer's ghost")
[concept] resolve: archetype=lurker type=Undead themes=grave/voice mind=sapient style=phantom energy=Necrotic mix=energy identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: the tolling bell that marks the dying [object] | drifting through chapel walls [behavior] | a death-knell curse on the living [aura]
[concept] identity: A spectral bell-ringer drifts through the chapel walls, tolling an invisible bell that marks the living for death; each toll is a necrotic knell that saps vitality from those who hear it. It opens by sounding the bell to curse a target, then haunts the doomed from the walls and ceiling, striking from angles no blade can follow. It does not flee—it keeps ringing until its chosen soul falls, or until sunlight unmakes it.
[concept] lore: A bell-ringer who died at their rope, still bound to ring the passing of every soul in the parish—and now tolls for the living when the chapel's dead grow restless.
[reskin] print canon route: the Ghost's body outranks the phantom seat — no verb in the words names it; the plain lurker line
[reskin] print canon defenses: HP 39 -> 45, AC 14 -> 11 — the Ghost's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 7, DEX 13, CON 10, INT 10, WIS 12, CHA 17 — the Ghost's at its own CR; attack +5 -> +5, DC 13 (print's)
[reskin] donor: lurker-2 -> CR 3
[reskin] row gated out: Teleport (teleport) — the concept did not claim this mechanic
[reskin] [path] decides: twist on the Ghost (the matcher would have said homebrew)
[reskin] print canon: "a chapel bell-ringer's ghost that tolls for the dying" heads on the Ghost — print's rows ride along; the seat stays
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline by rule: "the chapel bell-ringer" — the call answered "the bell-ringer" (kind), which the name does not support
[reskin] inline on kit rows: "the bell-ringer" -> "the chapel bell-ringer"
[reskin] inline form: "the bell-ringer" — the model's own reading of the name
[reskin] save dc derived: DC 12 -> 13 (8 + PB 2 + the sheet's best 3) — no stat on the sheet reached it
[reskin] the sheet's declared ask: none — the route call named no mechanic
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a chapel bell-ringer's ghost" -> has (descriptive), head | "tolls for the dying" -> has (mechanical) [asked: save_single] [askMechanic: curse]
[reskin] body verdicts: 37 of 37 answered; not true of this body: gaze-single, seal, random-ray, spew, snare-bolt, zone-seed, blighted-ground, shell-withdraw, coating, heated-body, false-appearance, absorption, bloodied-burst, adhesive, terrain-walk, aberrant-ground, faultless-tracker, web-walker, energy-aura, noxious-aura, marking-light, warded-mending, mimicry, gaze-aura, blurred-form, death-burst, kill-denial
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The bell-ringer reaches out one pale hand and tolls the unseen bell over a creature it can see — the knell passes through walls and has no need of a clear path. The target must succeed on a Constitution saving throw or be marked for death until the end of its next turn: it is Deafened and its skin goes grey, and the next time it takes damage from any source it takes extra Necrotic damage as the kn" [action/save/damage] [family: mark] — menu: execute, wail, active-toll, ground-burst, obstacle-pull, pacify, escalating-dread, terror-pulse, slow-bolt, sensory-strike, drain, shield-bash, push-prone, thrown-burst-seed, curse-debt, reveal, wind-up (+ shelf: lure, delayed-brand, blink, patient-defense, self-invisibility, focus, feint-slip, riposte, affliction, contagion, charge-push, hook-rider, pounce, isolation, life-drain)
[reskin] composed candidates: none action — the mark family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: action — idea fires save/does damage; leading: execute (save/damage), active-toll (save/damage), ground-burst (save/damage)
[reskin] keys would have bound: action — active-toll, sensory-strike (toll, bell)
[reskin] classification handed to the fit call: shape=save_single
[reskin] word match declined by the call: active-toll, drain, delayed-brand, curse-debt, execute — the key word does not mean the mechanic here
[reskin] row kept the template's own name: action — "Wail" is wail's default and the call named nothing usable; on a reskinned creature that reads as catalog furniture
[reskin] free signature row: action — "wail" quotes nothing the GM typed and matches no key-table verb, but the call names the element it expresses: "the tolling bell that marks the dying" — a receipt the trait seat can produce. Earns no clause credit; the twist/class path allows 1 and this is number 1
[reskin] seat takes its clause: "Wail (1/Day)" is HANDED "tolls for the dying" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature template: wail -> Actions/"Wail (1/Day)" ("a knell passes through walls, Deafening and marking those beneath a death-toll — [shape fit, no verb match]")
[reskin] signature idea (trait): "The bell-ringer can always hear those whose death is near: it knows the precise location of any creature within its reach of hearing that is Bloodied or has fewer hit points than its maximum, even through walls, and while so attuned it never loses track of them." [trait/always/resource] [family: payoff] — menu: spider-climb, phobia, bloodied-fury, blood-frenzy, pack-tactics, uncanny-sense, shielded-mind, evasion, relentless-pursuit, bound, relic-object, undead-fortitude, truth-aura, fear-aura, assassinate (+ shelf: resonant-body)
[reskin] lead by this seat's own clause: trait — "curse" from the clause this seat serves, not the sheet's "none"
[reskin] composed candidates: none trait — the payoff family composes a rider and this is the trait seat
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does resource; leading: spider-climb (always/movement), phobia (always/condition), bloodied-fury (always/defense)
[reskin] keys would have bound: trait — resonant-body (toll, bell)
[reskin] classification handed to the fit call: shape=save_single
[reskin] word match declined by the call: blood-frenzy, bloodied-fury, fear-aura, truth-aura, undead-fortitude — the key word does not mean the mechanic here
[reskin] closest accepted: trait — the call refused every template but named "uncanny-sense" as nearest and declined it for no_fit; it lands rather than the row being dropped (what it wanted: knows the exact location of any creature that is Bloodied or not at full hit poi)
[reskin] row kept the template's own name: trait — "Uncanny Sense" is uncanny-sense's default and the call named nothing usable; on a reskinned creature that reads as catalog furniture
[reskin] free signature row: "Uncanny Sense" — the call's nearest after it refused every template, so it ships as DECORATION: no receipt, no element claim, counted in the metric. Earns no clause credit
[reskin] seat takes its clause: "Uncanny Sense" is HANDED "tolls for the dying" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature template (trait): uncanny-sense -> Traits/"Uncanny Sense" ("The idea is a sense that marks the dying and keeps track of them; no printed tra [verb: blood:idea]")
[reskin] weapons answered: Claw = none
[reskin] languages by mind: "None" -> "Common plus the languages it knew in life" (sapient)
[reskin] print canon languages: "Common plus the languages it knew in life" -> "Common plus one other language" — the Ghost's
[reskin] print canon speed: 30 ft. -> 5 ft. — the Ghost's walk; the concept's other modes stay
[reskin] print canon speed: Fly -> 40 ft. — the Ghost's own
[reskin] print canon attack: "Claw" -> "Withering Touch" — the Ghost's own row
[reskin] print canon multiattack: "the chapel bell-ringer makes two Withering Touch attacks." — the Ghost's own
[reskin] immunities stamped for type: Undead -> Poison; Exhaustion, Poisoned
[reskin] print canon defenses: immunities Poison; Exhaustion, Poisoned -> Necrotic, Poison; Charmed, Exhaustion, Frightened, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained; resistances none -> Acid, Bludgeoning, Cold, Fire, Lightning, Piercing, Slashing, Thunder — the Ghost's own header lines
[reskin] print canon trait: Ethereal Sight — "a chapel bell-ringer's ghost that tolls for the dying" is the Ghost (print's own row)
[reskin] print canon trait: Incorporeal Movement — "a chapel bell-ringer's ghost that tolls for the dying" is the Ghost (print's own row)
[reskin] print canon: chassis row leaves — Bonus Actions/"Umbral Step" is the seat's, not the Ghost's
[reskin] print canon row: Actions/Horrific Visage — the Ghost's own
[reskin] print canon row: Actions/Possession (Recharge 6) — the Ghost's own
[reskin] print canon row: Actions/Etherealness — the Ghost's own
[reskin] multiattack replacement clause: It can replace one attack with a use of Horrific Visage.
[reskin] free-row budget by card size: CR 3 sits in band 3-5, where print runs 2-5 rows (p20-p90, Multiattack excluded); this card already carries 6 fixed row(s), so the free-row budget is 0 rather than 1 — the card is already at print's high end
[reskin] free row over budget: Traits/"Uncanny Sense" leaves at ship — this sheet's free-row budget (0) is spent by a row that SHIPPED
[reskin] free-row budget: 2 candidate(s) reached the finished sheet, 1 kept (budget 0) — "Wail" [action/once_per_fight/damage]
[reskin] threshold re-derived after the cap: Actions/Wail (1/Day) — 20 over the row's own 6 damage, so the kill branch beat the damage branch; threshold to 6
[reskin] audit rewrite blocked — "Multiattack" is engine-authored chassis text
[reskin] audit rewrite blocked — "Possession (Recharge 6)" is engine-authored chassis text
[reskin] audit rewrite blocked — "Possession (Recharge 6)" is engine-authored chassis text
[reskin] audit rewrite blocked — "Etherealness" is engine-authored chassis text
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] [gap] knows the exact location of any creature that is Bloodied or not at full hit points — "The bell-ringer can always hear those whose death is near: it knows the precise location of any creature within its reach of hearing that is Bloodied or has fewer hit points than its maximum, even through walls, and while so attuned it never loses track of them." — Chapel Bell-Ringer [seat: trait [trait/always/resource]] (closest offered: uncanny-sense) [effect: defense] [menu: spider-climb phobia bloodied-fury blood-frenzy pack-tactics uncanny-sense shielded-mind evasion relentless-pursuit bound relic-object undead-fortitude assassinate truth-aura fear-aura] [same-cell unoffered: lay-on-hands second-wind volley-order] [same-seat rejected: false-appearance:legality adhesive:legality terrain-walk:legality aberrant-ground:legality faultless-tracker:legality web-walker:legality death-restoration:legality earth-glide:legality tunneler:legality berserk:role marking-light:legality sealed-body:role guarded-stance:role mimicry:legality blurred-form:legality death-burst:legality kill-denial:legality] [VETOED AFTER ACCEPTANCE: uncanny-sense never reached the sheet — died at the free-row budget (only 0 free row(s) allowed on this sheet)]
[reskin] signature outcome: 1 of 1 accepted signature pick(s) never reached the sheet — 1x the free-row budget
[reskin] signature tally: 2 seat(s) -> 1 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 1 of 1 (1x the free-row budget) · path twist
```


---


### Plague Archon — a homebrew with a nova

**Concept:** a plague-bearing archon of flies that commands lesser swarms

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Plague Archon | 13 | skirmisher-13-winged | ok | ok | SOFT: reach | ok | ok | ok | ok | ok | ok | ok |

- structure · soft · reach: Actions/Talon: reach 10 on a Medium body with no tether word
- **dropped clause:** "a plague-bearing archon of flies"
- read: def 9 / off 16 → 12.5; sustained 78 (3 × Talon); nova Diving Strike 67; dmg 97

```
Plague Archon

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

Senses darkvision 120 ft.; Passive Perception 18

Languages Common

CR 13 (XP 10,000; PB +5)

Traits

Hive Sovereign. The archon can command any Swarm of Flies or similar lesser swarm within 60 feet of it; while within that range, such a swarm obeys the archon's directions and its attacks count as magical.

Wing Drift. The archon doesn't provoke Opportunity Attacks when it flies out of an enemy's reach.

Wheel Away. When a creature the archon can see ends its turn within 5 feet of it, the archon can move up to 10 feet without provoking Opportunity Attacks.

Actions

Multiattack. The archon makes three Talon attacks. It can replace one attack with a use of Brood Shroud.

Talon. Melee Attack Roll: +10, reach 10 ft. 26 (6d6 + 5) Poison damage. If the archon flew at least 20 feet in a straight line toward the target immediately before the hit, the target takes an extra 7 (2d6) Poison damage and, if it is Large or smaller, has the Prone condition.

Diving Strike (Recharge 5-6). The archon flies up to its Speed without provoking Opportunity Attacks. Each creature it passes within 5 feet during this movement is targeted once by the following effect. Dexterity Saving Throw: DC 17. Failure: 67 (15d8) Poison damage, and the target has the Prone condition. Success: Half damage.

Brood Shroud. Constitution Saving Throw: DC 17, each creature in a 30-foot Cone. Failure: The target has the Blinded condition until the end of its next turn.

Bonus Actions

Aerial Agility. The archon takes the Dash or Disengage action.

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

- Traits/Hive Sovereign — authored for this sheet; the GM's clause "commands lesser swarms"
- Traits/Wing Drift — the chassis
- Traits/Wheel Away — the chassis
- Actions/Multiattack — the chassis
- Actions/Talon — the chassis
- Actions/Diving Strike — the chassis
- Actions/Brood Shroud — template sensory-strike; library draw (seed unstamped)
- Bonus Actions/Aerial Agility — the chassis

**Engine trace**

```
[path] homebrew — "a plague-bearing archon of flies that commands lesser swarms" (call)
[route] skirmisher-winged type=Celestial mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | skirmisher-winged: ✓ ("archon of flies") | skirmisher-winged: key "flies" (class verb)
[concept] hints: swarm→body ✗ ("commands lesser swarms") | winged→style ✓ ("archon of flies")
[concept] resolve: archetype=skirmisher type=Celestial themes=celestial/venomous mind=sapient style=winged energy=Poison mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: commanding lesser fly swarms [behavior] | a body of plague-bearing flies and corrupted light [body] | swooping dives that spread contagion [behavior]
[concept] identity: The Plague Archon opens from above, folding into a diving wing-strike that delivers a crush of infectious flies, then wheels away trailing a skirmish line of its lesser swarms. Each round it stays on the wing, harrying with flyborne contagion and using its commanded swarms to clog and poison the air around a single target while it repositions. It is arrogant and patient, breaking off bloodied only to regather its brood and return; it does not fight to the death unless its hive-body is truly threatened.
[concept] lore: Born from a celestial oath rotted by neglect, the Plague Archon is a decayed minister of purity that now believes pestilence is the truest cleansing, and it wants to seed the living world with its lesser broods.
[reskin] donor: skirmisher-13-winged -> CR 13 (invented — no printed peer)
[reskin] [path] decides: homebrew (the matcher agrees)
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline declared: "the archon" — the call's own answer (kind), built from the name
[reskin] inline form: "the archon" — the model's own reading of the name
[reskin] the sheet's declared ask: command — the route call's one answer for the whole concept
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a plague-bearing archon of flies" -> has (mechanical) [asked: save_single] [askMechanic: curse] | "commands lesser swarms" -> has (mechanical) [asked: condition] [askMechanic: command]
[reskin] body verdicts: 28 of 28 answered; not true of this body: snare-bolt, herd, phase-slip, rally, heated-body, false-appearance, absorption, resonant-body, adhesive, terrain-walk, aberrant-ground, faultless-tracker, web-walker, energy-aura, uncanny-sense, relic-object, warded-mending, mimicry, gaze-aura, kill-denial, hook-rider, life-drain
[reskin] menu pruned: action — thrown-burst-seed, push-prone (the sheet cannot render them)
[reskin] signature idea (action): "One creature the archon can see is wrapped in a crawling shroud of its brood: it must succeed on a Constitution saving throw or have the Poisoned condition, and while Poisoned this way it can't take Reactions and its Speed is halved as the flies clog its throat and eyes. The archon can end the shroud at any time (no action) to call the brood back to its body." [action/save/condition] [family: mark] — menu: condition-payoff, shield-bash, lure, sensory-strike, disarm, exploiter, execute, pacify, escalating-dread, terror-pulse, curse-debt (+ shelf: delayed-brand, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, riposte, contagion, stunning-strike, charge-push, pounce, isolation)
[reskin] composed candidates: none action — the mark family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: action — idea fires save/does condition; leading: shield-bash (save/condition), lure (save/condition), sensory-strike (save/condition)
[reskin] keys would have bound: action — contagion (plague, plagued)
[reskin] classification handed to the fit call: shape=save_single
[reskin] word match declined by the call: shield-bash, lure, pacify, escalating-dread, terror-pulse, condition-payoff, disarm, exploiter, execute, curse-debt, delayed-brand, coating — the key word does not mean the mechanic here
[reskin] free signature row: action — "sensory-strike" quotes nothing the GM typed and matches no key-table verb, but the call names the element it expresses: "a body of plague-bearing flies and corrupted light" — a receipt the trait seat can produce. Earns no clause credit; the homebrew path allows 1 and this is number 1
[reskin] value check: "Brood Shroud" EV 27.5 vs floor 13 (one attack of 3) — widened to a 30-foot Cone (print writes this row as an area: Repulsion Breath, Blinding Breath); over the ceiling but a control row (no damage, no KO) — print leaves these ungated
[reskin] signature template: sensory-strike -> Actions/"Brood Shroud" ("a shroud of flies clogs the target's throat and eyes, imposing a body-wracking c [shape fit, no verb match]")
[reskin] signature idea (trait): "The archon's body is a living hive: whenever it takes damage from a source other than its own swarm, a knot of its brood bursts loose and the nearest creature it can see is Poisoned until the end of that creature's next turn." [trait/on_being_hit/condition] [family: body-reaction] — menu: bloodied-burst (+ shelf: spider-climb, phobia, noxious-aura, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, truth-aura, fear-aura, assassinate, blurred-form, death-burst)
[reskin] lead by this seat's own clause: trait — "curse" from the clause this seat serves, not the sheet's "command"
[reskin] composed candidates on the menu: trait — composed:body-reaction:condition:t0:poisoned, composed:body-reaction:condition:t0:deafened, composed:body-reaction:condition:t1:poisoned, composed:body-reaction:condition:t1:deafened, composed:body-reaction:condition:t2:poisoned, composed:body-reaction:condition:t2:deafened (the body-reaction family's options, built before the call looks)
[reskin] menu ordered by the idea's stamps: trait — idea fires on_being_hit/does condition; leading: composed:body-reaction:condition:t0:poisoned (on_being_hit/condition), composed:body-reaction:condition:t0:deafened (on_being_hit/condition), composed:body-reaction:condition:t1:poisoned (on_being_hit/condition)
[reskin] classification handed to the fit call: shape=save_single
[reskin] word match declined by the call: composed:body-reaction:condition:t1:poisoned, composed:body-reaction:condition:t2:poisoned, bloodied-burst — the key word does not mean the mechanic here
[reskin] closest refused: trait — "composed:body-reaction:condition:t0:pois" was named closest but was never on this sheet's menu (a gate refused it, or the pool did not offer it for this idea's declared trigger)
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "The archon's body is a living hive: whenever it takes damage from a source other than its own swarm, a knot of its brood bursts loose and the nearest creature it can see is Poisoned until the end of that creature's next turn." [trait/on_being_hit/condition] — the model found no template that holds it (offered: composed:body-reaction:condition:t0:poisoned, composed:body-reaction:condition:t0:deafened, composed:body-reaction:condition:t1:poisoned, composed:body-reaction:condition:t1:deafened, composed:body-reaction:condition:t2:poisoned, composed:body-reaction:condition:t2:deafened, bloodied-burst, death-burst)
[reskin] repair: 2 clause(s) with no row — "a plague-bearing archon of flies", "commands lesser swarms"; one targeted call with the sheet as context
[reskin] authored trait refused: "Plague of Flies" — no mechanic in the effect; the clause folds to description
[reskin] repair answer: attacks 0, saves 0, traits 1, reactions 0, answered [], unplaced ["description:a plague-bearing archon of flies"]
[reskin] clause answered in prose: "a plague-bearing archon of flies" — the call read the sheet and judged it description, not a row; the words reach the description instead
[reskin] condition relation: "Hive Sovereign" — the call reads its condition as none, so no condition is recorded against it
[reskin] repaired sheet: 1 attack row(s), 0 save, 1 trait(s), 0 reaction(s); 1 clause(s) unplaced
[reskin] weapons answered: Talon = none; Diving Strike = none
[reskin] chassis nova: "Diving Strike (Recharge 5-6)" — the skirmisher-13-winged's own nova row (its "Diving Attack", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] immunities stamped for type: Celestial -> Charmed
[reskin] resistances derived: Radiant
[reskin] name-canon stands down: the path answered homebrew on "a plague-bearing archon of flies that co" and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] multiattack replacement clause: It can replace one attack with a use of Brood Shroud.
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 1) — "Brood Shroud" [action/save/condition]
[reskin] save re-derived after a retype: Actions/Diving Strike — a Strength save for a condition the row IMPOSES, which calls for Dexterity or Constitution (A2: a condition the row merely requires does not pick the stat)
[reskin] audit rewrite blocked — "Diving Strike (Recharge 5-6)" is engine-authored chassis text
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] [gap] triggers on taking damage from any source and poisons the nearest visible creature, not just a melee attacker within 5 f — "The archon's body is a living hive: whenever it takes damage from a source other than its own swarm, a knot of its brood bursts loose and the nearest creature it can see is Poisoned until the end of that creature's next turn." — Plague Archon [seat: trait [trait/on_being_hit/condition]] (closest offered: composed:body-reaction:condition:t0:pois — NOT ON THE MENU) [effect: condition] [menu: composed:body-reaction:condition:t0:poisoned composed:body-reaction:condition:t0:deafened composed:body-reaction:condition:t1:poisoned composed:body-reaction:condition:t1:deafened composed:body-reaction:condition:t2:poisoned composed:body-reaction:condition:t2:deafened bloodied-burst death-burst] [same-cell unoffered: none] [same-seat rejected: heated-body:legality absorption:legality resonant-body:legality weapon-lodge:role] [row dropped]
[reskin] signature outcome: 1 of 1 accepted signature pick(s) never reached the sheet — 1x the call named no template for the pick
[reskin] signature tally: 2 seat(s) -> 1 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 1 of 1 (1x the call named no template for the pick) · path homebrew
```


---


### Purple Worm — bands fail

**Concept:** name: Purple Worm | that swallowed a war-band's armoury

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Purple Worm | 15 | brute-13 | ok | FAIL: single-target-ceiling | ok | ok | ok | ok | ok | ok | ok | ok |

- bands · fail · single-target-ceiling: Actions/Swallow: 64 damage to one target in one action at CR 15 — print's hardest in this band is 51 (1.25x), and a gate does not excuse it (print's are ungated)
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

Swallow Armoury. A creature that hits the worm with a melee attack while within 5 feet of it takes 10 (3d6) Thunder damage and has the Deafened condition until the end of its next turn.

Tunneler. The worm can burrow through solid rock at half its Burrow Speed and leaves a 10-foot-diameter tunnel in its wake.

Actions

Multiattack. The worm makes one Bite attack and one Tail Stinger attack. It can replace one attack with a use of Swallow.

Bite. Melee Attack Roll: +14, reach 10 ft. 22 (3d8 + 9) Piercing damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 22), and it has the Restrained condition until the grapple ends.

Tail Stinger. Melee Attack Roll: +14, reach 10 ft. 16 (2d6 + 9) Piercing damage plus 35 (10d6) Poison damage.

Swallow. Dexterity Saving Throw: DC 21, one Large or smaller creature within 10 feet that the worm hit with a melee attack this turn. Failure: 42 (12d6) Thunder damage, and the target is swallowed. A swallowed creature has the Blinded and Restrained conditions, has Total Cover against attacks and other effects outside the worm, and takes 22 (5d8) Thunder damage at the start of each of the worm's turns. If the worm takes 40 damage or more on a single turn from a creature inside it, it must succeed on a DC 21 Constitution saving throw at the end of that turn or regurgitate all swallowed creatures, each of which falls in a space within 10 feet of the worm and has the Prone condition. If the worm dies, a swallowed creature is no longer Restrained and can escape from the corpse using 15 feet of movement, exiting with the Prone condition.

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
- Actions/Swallow — template swallow; library draw (seed unstamped); the GM's clause "swallowed a war-band's armoury"; binds the GM's words: swallow+swallows+swallowed+whole
- Traits/Swallow Armoury — template resonant-body; library draw (seed unstamped)
- Traits/Tunneler — print's own row

**Engine trace**

```
[path] twist — Purple Worm (is) — "Name field: Purple Worm" (code)
[route] brute-grappler type=Monstrosity mechanics=grapple, engulf — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: on the GM's own words "Purple Worm — that swallowed a war-band'" | brute-grappler: ✓ ("swallowed a war-band's armoury") | brute-grappler: no line key in the words — the model's read of its quote
[concept] name: "Purple Worm" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] resolve: archetype=brute type=Monstrosity themes=devouring/armed mind=mindless style=grappler energy=Thunder mix=both identity=✓ lore=✓
[concept] name: provided "Purple Worm"
[concept] mechanics: grapple, engulf
[concept] signature elements: swallowing a war-band's armoury whole [behavior] | an armoured gut of churning blades and mail [body] | breaching up from below to engulf [behavior]
[concept] identity: The Purple Worm opens by breaching from below in a shower of earth and swallowed steel, its maw gaping wide enough to engulf a wagon and everyone in it. Every round after, it drags whatever it has seized into its gut, where a war-band's hoard of blades, mail, and spearheads churns and grinds — prey is crushed and cut at once, and the worm's gullet rattles like a foundry. It fights to the death without cunning or retreat, a mindless furnace of hide and ingested metal that simply swallows until nothing is left standing.
[concept] lore: Born when a warband's entire armoury was buried in one place — its blades, mail, and spearheads fused into a lode of iron — this worm swallowed the cache whole and grew an armoured gut that grinds steel into shrapnel, and it hunts now in a hunger that can never quite be filled.
[reskin] print canon route: the Purple Worm's body outranks the grappler seat — no verb in the words names it; the plain brute line
[reskin] print canon defenses: HP 264 -> 247, AC 17 -> 18 — the Purple Worm's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 28, DEX 7, CON 22, INT 1, WIS 8, CHA 4 — the Purple Worm's at its own CR; attack +11 -> +14, DC 21 (print's)
[reskin] donor: brute-13 -> CR 15 (invented — no printed peer)
[reskin] [path] decides: twist on the Purple Worm (the matcher agrees)
[reskin] print canon: "Purple Worm — that swallowed a war-band's armoury" heads on the Purple Worm — print's rows ride along; the seat stays
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline by rule: "the worm" — the call answered "the worm" (kind), which the name does not support
[reskin] inline form: "the worm" — the model's own reading of the name
[reskin] save dc derived: DC 18 -> 22 (8 + PB 5 + the sheet's best 9) — no stat on the sheet reached it
[reskin] the sheet's declared ask: swallow — the route call's one answer for the whole concept
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Purple Worm —" -> has (descriptive), head | "swallowed a war-band's armoury" -> has (mechanical) [asked: attack] [askMechanic: swallow]
[reskin] body verdicts: 10 of 28 answered; not true of this body: energy-aura, bloodied-burst, hook-rider, coating, shell-withdraw, relic-object
[reskin] menu pruned: action — thrown-burst-seed (the sheet cannot render them)
[reskin] signature idea (action): "As a bonus action, the worm gorges on what it has seized: one creature it is grappling must make a Strength saving throw. On a failure, the worm swallows it whole, and the creature is blinded, restrained, and unable to breathe, taking bludgeoning and piercing damage at the start of each of its turns as the armoury in the worm's gut churns. On a success, the creature is pulled into the worm's space" [bonus_action/always/condition] [family: drag] — menu: second-wind, aggro-curse, own-turn-punisher, self-invisibility, focus (+ shelf: swallow, condition-payoff, shield-bash, hook-drag, burrow-ambush, escalating-dread, terror-pulse, push-prone, exploiter, contagion, stunning-strike, charge-push, pounce, charge)
[reskin] composed candidates: none action — the drag family has no grammar — composable families are payoff, body-reaction, zone
[reskin] declared mechanic leads the menu: action — swallow: swallow
[reskin] menu ordered by the idea's stamps: action — idea fires always/does condition; leading: swallow (save/condition), second-wind (always/resource), own-turn-punisher (always/damage)
[reskin] keys would have bound: action — swallow (swallow, swallows, swallowed)
[reskin] classification handed to the fit call: mechanic=grapple, engulf shape=attack
[reskin] word match declined by the call: hook-drag, exploiter, aggro-curse, own-turn-punisher — the key word does not mean the mechanic here
[reskin] signature template: swallow -> Actions/"Gulping Maw" ("On a failed save the worm swallows the creature whole, which is then blinded and [verb: swallow:concept, swallows:concept, swallowed:concept, whole:idea]")
[reskin] keys spent by the action: swallow, swallows, swallowed
[reskin] signature idea (trait): "Whenever the worm takes Piercing or Slashing damage from a nonmagical weapon, the metal shatters explosively against its armoured gut. The attacker takes 3 (1d6) Thunder damage, and the sound is audible for 300 feet." [trait/on_being_hit/damage] [family: body-reaction] — menu: resonant-body, weapon-lodge (+ shelf: spider-climb, phobia, terrain-walk, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, uncanny-sense, earth-glide, tunneler, berserk, shielded-mind, relentless-pursuit, bound, undead-fortitude, truth-aura, fear-aura, kill-denial)
[reskin] composed candidates on the menu: trait — composed:body-reaction:damage:t0, composed:body-reaction:damage:t1, composed:body-reaction:damage:t2 (the body-reaction family's options, built before the call looks)
[reskin] menu ordered by the idea's stamps: trait — idea fires on_being_hit/does damage; leading: resonant-body (on_being_hit/damage), composed:body-reaction:damage:t0 (on_being_hit/damage), composed:body-reaction:damage:t1 (on_being_hit/damage)
[reskin] keys would have bound: trait — tunneler (worm)
[reskin] classification handed to the fit call: mechanic=grapple, engulf shape=attack
[reskin] word match declined by the call: weapon-lodge — the key word does not mean the mechanic here
[reskin] closest accepted: trait — the call refused every template but named "resonant-body" as nearest and declined it for no_fit; it lands rather than the row being dropped (what it wanted: a Bite or engulf attack that swallows the target (and its gear) into the worm's )
[reskin] pick kept on the GM's own words: trait — "resonant-body" has no key-table verb, but the call quotes "swallowed a war band's armoury" from the description
[reskin] signature template (trait): resonant-body -> Traits/"Swallow Armoury" ("The idea is a reactive burst of thunder on being struck by metal weapons, but th [shape fit, no verb match]")
[reskin] one mechanic, one name: Actions/"Gulping Maw" -> "Swallow" — this row is swallow and does what every swallow row does; a bespoke name would promise more than the text delivers
[reskin] weapons answered: Bite = none; Gaping Maw = none; Grinding Gut = none
[reskin] chassis nova: "Gaping Maw (Recharge 5-6)" — the brute-13's own nova row (its "Area Nova", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] print canon speed: 40 ft. -> 50 ft. — the Purple Worm's walk; the concept's other modes stay
[reskin] print canon speed: Burrow -> 50 ft. — the Purple Worm's own
[reskin] print canon row: Actions/Tail Stinger — the Purple Worm's second melee row, beside the chassis's
[reskin] print canon multiattack: "the worm makes one Bite attack and one Tail Stinger attack." — the Purple Worm's own
[reskin] languages held: None stands — INT 1 on a Monstrosity speaks nothing, whatever the mind read said
[reskin] print canon trait: Tunneler — "Purple Worm — that swallowed a war-band's armoury" is the Purple Worm (print's own row)
[reskin] print canon: chassis row leaves — Actions/"Gaping Maw (Recharge 5-6)" is the seat's nova, not the Purple Worm's
[reskin] multiattack replacement clause: It can replace one attack with a use of Swallow.
[reskin] row binds its clause: "Swallow" answers "swallowed a war-band's armoury" — the keys it matched came from that clause, so the coverage credit has a receipt
audit finding below confidence gate: Bite The target is Restrained until the grapple ends but the escape DC is only listed for the Grappled condition, leaving the Restrained condition's exit ambiguous since both end together but only Grappled names an escape DC.
[reskin] audit rewrite blocked — "Multiattack" is engine-authored chassis text
[reskin] audit rename blocked — "Swallow Armoury" -> "Rumbling Hide" would drop the GM's own word "armoury" from a row bound to "swallowing a war-band's armoury whole"; the mechanic would stay and the receipt would not
[reskin] seed share: 0 of 2 signature row(s) came from a seed — the sameness metric
[reskin] [gap] a Bite or engulf attack that swallows the target (and its gear) into the worm's gullet, grappling and restraining it ins — "Whenever the worm takes Piercing or Slashing damage from a nonmagical weapon, the metal shatters explosively against its armoured gut. The attacker takes 3 (1d6) Thunder damage, and the sound is audible for 300 feet." — Purple Worm [seat: trait [trait/on_being_hit/damage]] (closest offered: resonant-body) [effect: condition] [menu: resonant-body composed:body-reaction:damage:t0 composed:body-reaction:damage:t1 composed:body-reaction:damage:t2 weapon-lodge uncanny-sense] [same-cell unoffered: heated-body bloodied-burst ward-retaliation snap-shot riposte] [same-seat rejected: heated-body:legality absorption:legality bloodied-burst:legality] [landed: resonant-body]
[reskin] signature tally: 2 seat(s) -> 2 shape(s) on the sheet · 0 expressed, 0 decoration, 0 free · accepted picks lost: 0 of 1 · path twist
[reskin] escape dc: Bite → DC 22 (8 + PB + STR; a late row wore another number)
```


---


### Brass Tyrant — bands soft

**Concept:** a tyrant of burning brass who rules a city of forges

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Brass Tyrant | 17 | brute-17-juggernaut | ok | SOFT: hot-offense | ok | ok | ok | ok | ok | ok | ok | ok |

- bands · soft · hot-offense: offense alone reads CR 22, 5 over; the HP axis pulls the read to 17.5
- read: def 13 / off 22 → 17.5; sustained 170 (2 × Fist + legendary Wade Forward); nova Furnace Gout 72; dmg 170

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

Furnace Fed. A creature that touches the brass tyrant or hits it with a melee attack while within 5 feet of it takes 10 (3d6) Fire damage.

Legendary Resistance (3/Day). If the brass tyrant fails a saving throw, it can choose to succeed instead.

Immutable Form. The brass tyrant can't shape-shift.

Siege Monster. The brass tyrant deals double damage to objects and structures.

Actions

Multiattack. The brass tyrant makes two Fist attacks.

Fist. Melee Attack Roll: +12, reach 10 ft. 20 (4d6 + 6) Bludgeoning damage plus 14 (4d6) Fire damage.

Furnace Gout (Recharge 5-6). Constitution Saving Throw: DC 19, each creature in a 30-foot Cone. Failure: 72 (16d8) Fire damage, and the target has the Prone condition. Success: Half damage only.

Legendary Actions

Legendary Action Uses: 3. Immediately after another creature's turn, the brass tyrant can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.

Wade Forward. The brass tyrant moves up to half its Speed without provoking Opportunity Attacks, and it makes one Fist attack.

Break Down. The brass tyrant moves up to half its Speed without provoking Opportunity Attacks. During this movement, it can move through Large or smaller objects and structures, destroying them.

Shatter Ground. Strength Saving Throw: DC 19, each creature within 10 feet of the brass tyrant. Failure: The target has the Prone condition.

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

- Traits/Furnace Fed — template heated-body; library draw (seed unstamped); binds the GM's words: burn+brass+heat+furnace+fire
- Traits/Legendary Resistance — the chassis
- Traits/Immutable Form — the chassis
- Traits/Siege Monster — the chassis
- Actions/Multiattack — the chassis
- Actions/Fist — the chassis
- Actions/Furnace Gout — the chassis
- Legendary Actions/Legendary Action Uses: 3 — the chassis
- Legendary Actions/Wade Forward — the chassis
- Legendary Actions/Break Down — the chassis
- Legendary Actions/Shatter Ground — the chassis

**Engine trace**

```
[path] homebrew — title tyrant — "a tyrant of burning brass who rules a city of forges" (call)
[route] brute-juggernaut type=Construct mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | brute-juggernaut: ✓ ("a tyrant of burning brass") | brute-juggernaut: no line key in the words — the model's read of its quote
[concept] resolve: archetype=brute type=Construct themes=forged/elemental mind=sapient style=juggernaut energy=Fire mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: walking through and shattering whatever it passes [behavior] | burning brass body and internal furnaces [body] | a tyrant's rule over a city of forges [behavior]
[concept] identity: The Brass Tyrant opens by wading straight through the forge-city's walls and buildings, molten brass sheeting off its shoulders as it swings a fist wide enough to clear a street. Every round it advances in a straight line, piling crushed masonry and bodies beneath it while its internal furnaces flare and pour heat across anyone who stays near. It does not flee and does not chase cleverly — it walks down whatever stands in front of it, and if prey hides it begins methodically breaking the city until the hiding place is gone.
[concept] lore: Poured in the first furnace of the forge-city and crowned by the smiths who never meant it to leave, the Brass Tyrant now rules the forges it was made to serve, and it wants the whole city melted down and recast into more of itself.
[reskin] donor: brute-17-juggernaut -> CR 17
[reskin] [path] decides: homebrew (the matcher agrees)
[reskin] name_element answered: Brass Tyrant = imagery
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline declared: "the brass tyrant" — the call's own answer (kind), built from the name
[reskin] inline form: "the brass tyrant" — the model's own reading of the name
[reskin] the sheet's declared ask: none — the route call named no mechanic
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a tyrant of burning brass" -> has (descriptive), head | "rules a city of forges" -> has (descriptive)
[reskin] body verdicts: 27 of 27 answered; not true of this body: herd, drain, shell-withdraw, rally, coating, false-appearance, resonant-body, adhesive, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, uncanny-sense, relic-object, warded-mending, mimicry, gaze-aura, hook-rider, life-drain
[reskin] menu pruned: action — push-prone, thrown-burst-seed (the sheet cannot render them)
[reskin] signature idea (action): "As a reaction when a creature within reach ends its movement, the Brass Tyrant sweeps its burning arm in a wide arc and makes one Fist attack against that creature; on a hit, molten brass spatters to creatures of its choice within a short distance of the target, and those creatures must succeed on a Dexterity saving throw or take Fire damage and have the Blinded condition until the end of their ne" [reaction/on_being_hit/damage] [family: sentinel] — menu: riposte (+ shelf: condition-payoff, escalating-dread, terror-pulse, exploiter, second-wind, aggro-curse, own-turn-punisher, self-invisibility, focus, stunning-strike)
[reskin] verb gate stands down: action — no template shares a verb, but 1 template(s) whose declared stamps match the idea (on_being_hit/damage): riposte; the declared data is the warrant and the call is worth making
[reskin] composed candidates: none action — the sentinel family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: action — idea fires on_being_hit/does damage; leading: riposte (on_being_hit/damage)
[reskin] word match declined by the call: riposte — the key word does not mean the mechanic here
[reskin] closest accepted: action — the call refused every template but named "riposte" as nearest and declined it for no_fit; it lands rather than the row being dropped (what it wanted: a triggered reaction that attacks and spreads a blinding fire splash to nearby c)
[reskin] free signature row: action — "riposte" is the call's nearest after it refused every template, so it ships as DECORATION: no receipt, no element claim, counted in the metric. Earns no clause credit
[reskin] value check: "Molten Brass Spray" EV 22.8 vs floor 5.7 (a reaction (free)) — worth the trade
[reskin] signature template: riposte -> Reactions/"Molten Brass Spray" ("The idea is a triggered reaction that makes a Fist attack and then splashes Fire [shape fit, no verb match]")
[reskin] signature idea (trait): "The Brass Tyrant's internal furnaces never bank. Whenever it takes Fire damage from a source other than its own abilities, its internal heat surges and it regains Hit Points equal to a portion of that Fire damage, and the brass of its body runs brighter and more liquid until the end of its next turn. It cannot be cooled, only fed." [trait/always/damage] [family: heal] — menu: spider-climb, phobia, energy-aura, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, relentless-pursuit, bound, marking-light, undead-fortitude, truth-aura, fear-aura, death-burst, kill-denial, assassinate (+ shelf: heated-body, absorption, bloodied-burst, weapon-lodge)
[reskin] composed candidates: none trait — the heal family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does damage; leading: blood-frenzy (always/damage), pack-tactics (always/damage), death-burst (always/damage)
[reskin] keys would have bound: trait — heated-body (burn, brass)
[reskin] word match declined by the call: heated-body, death-burst, blood-frenzy — the key word does not mean the mechanic here
[reskin] closest accepted: trait — the call refused every template but named "heated-body" as nearest and declined it for no_fit; it lands rather than the row being dropped (what it wanted: regains Hit Points when it takes Fire damage from an outside source)
[reskin] signature template (trait): heated-body -> Traits/"Furnace Fed" ("The idea is a Fire-absorption heal with a brief visible surge, but the closest t [verb: burn:concept, brass:concept, heat:idea, furnace:idea, fire:idea]")
[reskin] one mechanic, one name: Reactions/"Molten Brass Spray" -> "Riposte" — this row is riposte and does what every riposte row does; a bespoke name would promise more than the text delivers
[reskin] weapons answered: Fist = none
[reskin] chassis nova: "Furnace Gout (Recharge 5-6)" — the brute-17-juggernaut's own nova row (its "Area Nova", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] immunities stamped for type: Construct -> Poison; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned
[reskin] resistances derived: Fire
[reskin] name-canon stands down: the path answered homebrew on "a tyrant of burning brass who rules a ci" and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] vulnerability rejected — "Cold" has no warrant in the concept's own text (print's default is none)
[reskin] free-row budget by card size: CR 17 sits in band 17-20, where print runs 7-9 rows (p20-p90, Multiattack excluded); this card already carries 10 fixed row(s), so the free-row budget is 0 rather than 1 — the card is already at print's high end
[reskin] free row over budget: Reactions/"Riposte" leaves at ship — this sheet's free-row budget (0) is spent by a row that SHIPPED
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 0 kept (budget 0)
[reskin] lint fixed: prone-duration — the lint's own deterministic surgery, applied before the gate reads the sheet
audit finding below confidence gate: Break Down The tyrant is Huge, but this lets it smash only Large or smaller objects while passing through them, which is internally inconsistent with a siege-brute that destroys structures (and Silent Siege Monster doubles object damage, implying it deliberately attacks them).
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] [gap] a triggered reaction that attacks and spreads a blinding fire splash to nearby creatures — "As a reaction when a creature within reach ends its movement, the Brass Tyrant sweeps its burning arm in a wide arc and makes one Fist attack against that creature; on a hit, molten brass spatters to creatures of its choice within a short distance of the target, and those creatures must succeed on a Dexterity saving throw or take Fire damage and have the Blinded condition until the end of their ne" — Brass Tyrant [seat: action [reaction/on_being_hit/damage]] (closest offered: riposte) [effect: condition] [menu: riposte] [same-cell unoffered: heated-body bloodied-burst resonant-body ward-retaliation snap-shot] [same-seat rejected: ward-retaliation:role snap-shot:role interpose:role] [VETOED AFTER ACCEPTANCE: riposte never reached the sheet — died at the free-row budget (only 0 free row(s) allowed on this sheet)]
[reskin] [gap] regains Hit Points when it takes Fire damage from an outside source — "The Brass Tyrant's internal furnaces never bank. Whenever it takes Fire damage from a source other than its own abilities, its internal heat surges and it regains Hit Points equal to a portion of that Fire damage, and the brass of its body runs brighter and more liquid until the end of its next turn. It cannot be cooled, only fed." — Brass Tyrant [seat: trait [trait/always/damage]] (closest offered: heated-body) [effect: resource] [menu: blood-frenzy pack-tactics death-burst assassinate spider-climb phobia bloodied-fury death-restoration berserk shielded-mind relentless-pursuit bound marking-light undead-fortitude kill-denial energy-aura heated-body truth-aura fear-aura] [same-cell unoffered: throw-retrieve own-turn-punisher coating] [same-seat rejected: false-appearance:legality adhesive:legality terrain-walk:legality aberrant-ground:legality faultless-tracker:legality web-walker:legality uncanny-sense:legality earth-glide:legality tunneler:legality evasion:role sealed-body:legality relic-object:legality guarded-stance:role mimicry:legality blurred-form:role] [landed: heated-body]
[reskin] signature outcome: 1 of 2 accepted signature pick(s) never reached the sheet — 1x the free-row budget
[reskin] signature tally: 2 seat(s) -> 1 shape(s) on the sheet · 0 expressed, 0 decoration, 0 free · accepted picks lost: 1 of 2 (1x the free-row budget) · path homebrew
```


---


### Swarm of Unmourned Tolls — bands fail

**Concept:** a swarm of funeral bells that ring themselves over the dying

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Swarm of Unmourned Tolls | 13 | swarm-9 | ok | FAIL: single-target-ceiling | ok | ok | ok | ok | ok | ok | ok | ok |

- bands · fail · single-target-ceiling: Actions/Knell: 90 damage to one target in one action at CR 13 — print's hardest in this band is 51 (1.76x), and a gate does not excuse it (print's are ungated)
- bands · soft · hot-offense: offense alone reads CR 17, 4 over; the HP axis pulls the read to 13.5
- **dropped clause:** "a swarm of funeral bells"
- **dropped clause:** "ring themselves over the dying"
- read: def 10 / off 17 → 13.5; sustained 90 (1 × Knell); nova Dirge's Subject 67; dmg 105

```
Swarm of Unmourned Tolls

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

Senses darkvision 60 ft.; Passive Perception 10

Languages None

CR 13 (XP 10,000; PB +5)

Traits

Blood Frenzy. The swarm has Advantage on attack rolls against any creature that doesn't have all its Hit Points.

Swarm. The swarm can occupy another creature's space and vice versa, and the swarm can move through any opening large enough for a Tiny creature. The swarm can't regain Hit Points or gain Temporary Hit Points.

Actions

Knell. Melee Attack Roll: +10, reach 5 ft. 90 (19d8 + 5) Necrotic damage, or 45 (9d8 + 5) Necrotic damage if the swarm is Bloodied.

Dirge's Subject (Recharge 5-6). Constitution Saving Throw: DC 17, each creature in a 30-foot Emanation originating from the swarm. Failure: 67 (15d8) Thunder damage, and the target has the Deafened condition until the end of its next turn. Success: Half damage only.

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

- Traits/Blood Frenzy — template blood-frenzy; library draw (seed unstamped); binds the GM's words: blood
- Traits/Swarm — the chassis
- Actions/Knell — the chassis
- Actions/Dirge's Subject — template active-toll; library draw (seed unstamped); the GM's clause "a swarm of funeral bells"; binds the GM's words: ring+bell

**Engine trace**

```
[path] homebrew — "a swarm of funeral bells that ring themselves over the dying" (call)
[route] swarm type=Undead mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: on the GM's own words "a swarm of funeral bells" | holds: the call reads none in these words | swarm: ✓ ("a swarm of funeral bells") | swarm: no line key in the words — the model's read of its quote
[concept] hints: swarm→body ✓ ("a swarm of funeral bells")
[concept] resolve: archetype=swarm type=Undead themes=grave/voice mind=bestial style=— energy=Necrotic mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: bells that ring themselves over the dying [behavior] | funeral-peal chorus of bone [body] | death-knell dirge that stills the heart [aura]
[concept] identity: The swarm holds a loose ring above the dying, ringing itself in slow, hungry peals until the victim's last breath shakes loose; it opens by bathing a fallen or bleeding foe in that death-knell dirge, which stills the heart and thickens the air with grave-cold sound. Every round it closes the ring tighter, dividing into lesser clusters when struck hard, ringing faster and shriller as its flesh is broken, and it does not scatter — it hangs over the dying to the last toll, adding the killer's name to its chorus rather than retreating.
[concept] lore: These are the bells rung at unrecorded funerals, left hanging when no mourner came; they gather over any creature near death and ring in the name they were denied, dragging the soul out of the body with the grief they were never allowed to voice.
[reskin] body type: swarm — the body outranks the role (recorded: swarm)
[reskin] donor: swarm-9 -> CR 13 (invented — no printed peer)
[reskin] [path] decides: homebrew (the matcher agrees)
[reskin] swarm name stamped: "Unmourned Toll" -> "Swarm of Unmourned Tolls" — print names all seven of its swarms "Swarm of X", and the rules text says "the swarm"
[reskin] swarm type stamped: Undead -> Swarm of Tiny Undead
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline by rule: "the swarm" — the call answered "the toll" (kind), which the name does not support
[reskin] the sheet's declared ask: drain — the route call's one answer for the whole concept
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a swarm of funeral bells" -> has (mechanical) [asked: attack] | "ring themselves over the dying" -> has (mechanical) [asked: save_single]
[reskin] body verdicts: 38 of 38 answered; not true of this body: gaze-single, snare, seal, random-ray, spew, snare-bolt, blighted-ground, blink, shell-withdraw, coating, phase-slip, heated-body, false-appearance, absorption, bloodied-burst, adhesive, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, uncanny-sense, marking-light, relic-object, warded-mending, mimicry, gaze-aura, blurred-form, death-burst, hook-rider
[reskin] menu pruned: action — obstacle-pull, pacify, escalating-dread, terror-pulse, slow-bolt, sensory-strike, disarm, thrown-burst-seed, drain, zone-seed, push-prone, curse-debt, reveal, wind-up, delayed-brand, aggro-curse, self-invisibility, focus, feint-slip (the sheet cannot render them)
[reskin] signature idea (action): "The swarm marks one creature it can see as its dirge's subject, and the air around that target thickens with grave-cold sound. While marked, whenever the target regains Hit Points, it must make a Constitution saving throw; on a failure, it gains no benefit from that healing and the swarm regains Hit Points equal to half the healing denied." [action/save/resource] [family: mark] — menu: thrown-burst, execute, shield-bash, wail, lure, active-toll, ground-burst (+ shelf: patient-defense, second-wind, riposte, stunning-strike, charge-push, pounce, isolation, life-drain, charge)
[reskin] composed candidates: none action — the mark family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: action — idea fires save/does resource; leading: thrown-burst (save/damage), execute (save/damage), shield-bash (save/condition)
[reskin] keys would have bound: action — active-toll (ring, bell)
[reskin] classification handed to the fit call: shape=attack
[reskin] word match declined by the call: thrown-burst, execute, shield-bash, lure, active-toll, ground-burst, wail — the key word does not mean the mechanic here
[reskin] closest accepted: action — the call refused every template but named "active-toll" as nearest and declined it for no_fit; it lands rather than the row being dropped (what it wanted: marks one target so its healing can fail and be stolen back as the creature's ow)
[reskin] value check: "Dirge's Subject (Recharge 5-6)" EV 120 vs floor 76.1 (the whole Multiattack (1 attacks)) — worth the trade
[reskin] signature template: active-toll -> Actions/"Dirge's Subject (Recharge 5-6)" ("The idea marks one creature and interferes with its healing, converting denied h [verb: ring:concept, bell:concept]")
[reskin] keys spent by the action: ring
[reskin] signature idea (trait): "The swarm's tolling grows shriller and more frantic as it is wounded. While Bloodied, the swarm's Knell attack deals maximum damage against any creature that is also Bloodied." [trait/always/damage] [family: payoff] — menu: spider-climb, phobia, energy-aura, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, evasion, relentless-pursuit, bound, guarded-stance, undead-fortitude, truth-aura, fear-aura, assassinate, kill-denial (+ shelf: resonant-body)
[reskin] composed candidates: none trait — the payoff family composes a rider and this is the trait seat
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does damage; leading: blood-frenzy (always/damage), pack-tactics (always/damage), assassinate (always/damage)
[reskin] keys would have bound: trait — resonant-body (bell)
[reskin] classification handed to the fit call: shape=attack
[reskin] word match declined by the call: blood-frenzy, bloodied-fury, pack-tactics — the key word does not mean the mechanic here
[reskin] closest accepted: trait — the call refused every template but named "blood-frenzy" as nearest and declined it for no_fit; it lands rather than the row being dropped (what it wanted: maximizes damage of its attack against a target that is also Bloodied)
[reskin] free signature row: "Frantic Peal" — the call's nearest after it refused every template, so it ships as DECORATION: no receipt, no element claim, counted in the metric. Earns no clause credit
[reskin] signature template (trait): blood-frenzy -> Traits/"Frantic Peal" ("The idea is a conditional damage spike tied to the wound state of both attacker  [verb: blood:idea]")
[reskin] one mechanic, one name: Traits/"Frantic Peal" -> "Blood Frenzy" — this row is blood-frenzy and does what every blood-frenzy row does; a bespoke name would promise more than the text delivers
[reskin] weapons answered: Knell = none
[reskin] immunities stamped for type: Swarm of Tiny Undead + donor suite -> Poison; Charmed, Exhaustion, Frightened, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained, Stunned
[reskin] resistances derived: Bludgeoning, Piercing, Slashing
[reskin] name-canon stands down: the path answered homebrew on "a swarm of funeral bells that ring thems" and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] bloodied half re-derived: "Knell" — 14 (4d6) -> 45 (9d8 + 5), half of the main 90 on the main's own +5 (print's ratio and print's modifier)
[reskin] nova capped: Actions/Dirge's Subject (Recharge 5-6) — 91 over the CR 13 ceiling 67, dice to 67 (15d8)
[reskin] free-row budget by card size: CR 13 sits in band 13-16, where print runs 5-10 rows (p20-p90, Multiattack excluded); this card already carries 3 fixed row(s), so the free-row budget is 2 rather than 1 — the card is thin and can afford more
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 2) — "Blood Frenzy" [trait/always/damage]
[reskin] row binds its clause: "Dirge's Subject" answers "a swarm of funeral bells" — the keys it matched came from that clause, so the coverage credit has a receipt
[reskin] sameness: 1 of 1 free row(s) express nothing their rules carry — counted as decoration ("Blood Frenzy")
audit finding below confidence gate: Blood Frenzy Blood Frenzy is the standard name for a trait keyed to wounded creatures, but its text keys to any creature not at full HP, which includes creatures damaged by non-blood means and is not a name-content mismatch per se; however the trait name is fine — no defect. (placeholder)
[reskin] seed share: 0 of 2 signature row(s) came from a seed — the sameness metric
[reskin] [gap] marks one target so its healing can fail and be stolen back as the creature's own Hit Points — "The swarm marks one creature it can see as its dirge's subject, and the air around that target thickens with grave-cold sound. While marked, whenever the target regains Hit Points, it must make a Constitution saving throw; on a failure, it gains no benefit from that healing and the swarm regains Hit Points equal to half the healing denied." — Swarm of Unmourned Tolls [seat: action [action/save/resource]] (closest offered: active-toll) [effect: resource] [menu: thrown-burst execute shield-bash lure active-toll ground-burst wail] [same-cell unoffered: none] [same-seat rejected: swallow:legality trample:legality leap:legality gaze-single:legality snare:legality reel:legality condition-payoff:legality seal:legality hook-drag:legality pull-through:legality random-ray:legality spew:legality burrow-ambush:legality snare-bolt:legality push-prone:role herd:role curse-debt:role reveal:role wind-up:role exploiter:legality blighted-ground:legality] [landed: active-toll]
[reskin] [gap] maximizes damage of its attack against a target that is also Bloodied — "The swarm's tolling grows shriller and more frantic as it is wounded. While Bloodied, the swarm's Knell attack deals maximum damage against any creature that is also Bloodied." — Swarm of Unmourned Tolls [seat: trait [trait/always/damage]] (closest offered: blood-frenzy) [effect: damage] [menu: blood-frenzy pack-tactics assassinate spider-climb phobia bloodied-fury death-restoration berserk shielded-mind evasion relentless-pursuit bound guarded-stance undead-fortitude kill-denial energy-aura resonant-body truth-aura fear-aura] [same-cell unoffered: throw-retrieve death-burst own-turn-punisher coating] [same-seat rejected: false-appearance:legality adhesive:legality terrain-walk:legality aberrant-ground:legality faultless-tracker:legality web-walker:legality uncanny-sense:legality earth-glide:legality tunneler:legality marking-light:legality sealed-body:role relic-object:legality mimicry:legality blurred-form:legality death-burst:legality] [landed: blood-frenzy]
[reskin] signature tally: 2 seat(s) -> 2 shape(s) on the sheet · 0 expressed, 1 decoration, 1 free · accepted picks lost: 0 of 2 · path homebrew
```


---


### Chok — bands soft

**Concept:**  | role: brute

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Chok | 4 | brute-2 | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 2.5 (print at 4 reads 1–6, n=66)
- **dropped clause:** "it lives in the bone-walled necropolis where it was spawned"
- **dropped clause:** "drags its armored length along the ossuary streets with unsettling patience"
- **dropped clause:** "piles ossuary rubble into blind walls"
- **dropped clause:** "drives prey down the funnel with the dry clatter of its coil before crushing them beneath a single"
- **dropped clause:** "When bloodied it does not flee — it retreats into the ruin it already chose"
- **dropped clause:** "lets the hunter come to it"
- **dropped clause:** "finishes the fight on ground it has spent all day preparing"
- read: def 1 / off 4 → 2.5; sustained 28 (1 × Unhurried Slam); nova none; dmg 28

```
Chok

Large Monstrosity, Lawful Evil

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

Senses tremorsense 60 ft.; Passive Perception 11

Languages Common

CR 4 (XP 1,100; PB +2)

Traits

Chosen Killing Field. When the chok takes its first turn in a combat, before it has moved, the chok marks a 20-foot-square area within 60 feet of it as its killing field; the area becomes Difficult Terrain for creatures other than the chok, and the chok has Advantage on melee attack rolls against creatures standing in it.

Coiled Lid. While the chok isn't Bloodied, melee attack rolls against it are made with Disadvantage.

Actions

Unhurried Slam. Melee Attack Roll: +6, reach 5 ft. 28 (7d6 + 4) Bludgeoning damage, and the target has the Prone condition.

Ossuary Wall. Strength Saving Throw: DC 14, each creature in a 15-foot Cone. Failure: The target is pulled up to 15 feet straight toward the chok, and its Speed is 0 until the start of the chok's next turn.

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

- Actions/Unhurried Slam — authored for this sheet; a named part; the GM's clause "unhurried slam"
- Actions/Ossuary Wall — template obstacle-pull; library draw (seed unstamped); the GM's clause "drags its armored length along the ossuary streets with unsettling patience"; binds the GM's words: drag
- Traits/Chosen Killing Field — authored for this sheet; the GM's clause "It fights as a brute by rewriting the ground itself: it chooses a killing field"
- Traits/Coiled Lid — template guarded-stance; library draw (seed unstamped)

**Engine trace**

```
[path] blank — "role: brute" (code)
[route] brute type=Monstrosity mechanics=snare — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | brute: ✓ ("It fights as a brute by rewriting the gr") | brute: no line key in the words — the model's read of its quote
[concept] synthesis (blank roll): archetype=brute type=Monstrosity themes=grave/fiendish mind=sapient style=— lore=✓
[concept] synthesis text: A grave-serpent of black chitin, its segmented coil plated like a sexton's coffin lid, it lives in the bone-walled necropolis where it was spawned and drags its armored length along the ossuary streets with unsettling patience. It fights as a brute by rewriting the ground itself: it chooses a killing field, cuts channels with its plated snout and piles ossuary rubble into blind walls, then drives prey down the funnel with the dry clatter of its coil before crushing them beneath a single, unhurried slam. When bloodied it does not flee — it retreats into the ruin it already chose, lets the hunter come to it, and finishes the fight on ground it has spent all day preparing. It is fully sapient (INT 10-14), and it is a battlefield manipulator that herds and traps rather than brawls.
[concept] signature elements: herding with raised rubble walls [behavior] | plated black chitin coil [body] | grave-wax sealing the charnel pit [object]
[concept] name proposal: Gravecoil Serpent
[concept] lore: It was hatched from the grave-wax sealing a necropolis's deepest charnel pit, and it wants the city's dead returned to their slots — chasing and crushing the living until the ledger balances.
[reskin] donor: brute-2 -> CR 4
[reskin] [path] decides: blank (the matcher would have said homebrew)
[reskin] named parts: Unhurried Slam (slot, Prone) — the user's words, the engine's numbers
[reskin] named parts landed: 1 attack row(s), 0 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] class kit: none — the blank path takes no class kit
[reskin] inline declared: "the chok" — the call's own answer (kind), built from the name
[reskin] inline form: "the chok" — the model's own reading of the name
[reskin] save dc derived: DC 13 -> 14 (8 + PB 2 + the sheet's best 4) — no stat on the sheet reached it
[reskin] the sheet's declared ask: zone — the route call's one answer for the whole concept
[reskin] lacks asked: nothing taken away
[reskin] lacks not claimed: "When bloodied it does not flee — it retreats into the ruin it already chose" reads like a lack to the words, and the call's list did not name it
[reskin] clauses: "A grave-serpent of black chitin" -> has (descriptive), head | "its segmented coil plated like a sexton's coffin lid" -> has (descriptive) | "it lives in the bone-walled necropolis where it was spawned" -> has (descriptive) | "drags its armored length along the ossuary streets with unsettling patience" -> has (mechanical) [askMechanic: zone] | "It fights as a brute by rewriting the ground itself: it chooses a killing field" -> has (mechanical) [askMechanic: zone] | "cuts channels with its plated snout" -> has (descriptive) | "piles ossuary rubble into blind walls" -> has (descriptive) | "drives prey down the funnel with the dry clatter of its coil before crushing them beneath a single" -> has (mechanical) [asked: save_single] [askMechanic: charm] | "unhurried slam" -> has (mechanical) [asked: attack] | "When bloodied it does not flee — it retreats into the ruin it already chose" -> has (mechanical) [asked: when_bloodied] [askMechanic: retaliate] | "lets the hunter come to it" -> has (mechanical) [asked: buff_self] [askMechanic: harden] | "finishes the fight on ground it has spent all day preparing" -> has (mechanical) [asked: buff_self] [askMechanic: escalate] | "It is fully sapient (INT 10-14)" -> has (descriptive) | "it is a battlefield manipulator that herds" -> has (descriptive) | "traps rather than brawls" -> has (descriptive)
[reskin] body verdicts: 34 of 34 answered; not true of this body: active-toll, random-ray, spew, herd, drain, zone, zone-seed, blighted-ground, rally, coating, heated-body, false-appearance, absorption, bloodied-burst, resonant-body, adhesive, aberrant-ground, faultless-tracker, web-walker, energy-aura, noxious-aura, marking-light, sealed-body, relic-object, warded-mending, mimicry, gaze-aura, death-burst, kill-denial, hook-rider, life-drain
[reskin] menu pruned: action — push-prone (the sheet cannot render them)
[reskin] signature idea (action): "Chok heaves its plated snout under the nearest loose rubble and bone, raising a wall of ossuary debris in a line across the ground. The wall is difficult terrain that blocks line of sight; a creature that tries to cross it must succeed on a Strength saving throw or be knocked Prone, pinned in the channel Chok has cut for it." [action/save/movement] [family: zone] — menu: trample, leap, condition-payoff, shield-bash, ground-burst, escalating-dread, terror-pulse, thrown-burst-seed, wind-up, exploiter, execute, sensory-strike, lure, obstacle-pull, pacify, slow-bolt, disarm, curse-debt (+ shelf: rampage, shell-withdraw, second-wind, aggro-curse, own-turn-punisher, self-invisibility, focus, patient-defense, lay-on-hands, charge-push, pounce, charge)
[reskin] composed candidates: none action — the zone family composes a trait and this is the action seat
[reskin] menu ordered by the idea's stamps: action — idea fires save/does movement; leading: obstacle-pull (save/movement), slow-bolt (save/movement), disarm (save/movement)
[reskin] keys would have bound: action — exploiter, condition-payoff (finish, downed, trapped, crush)
[reskin] classification handed to the fit call: mechanic=snare shape=save_single
[reskin] word match declined by the call: obstacle-pull, slow-bolt, disarm, trample, shield-bash, leap — the key word does not mean the mechanic here
[reskin] closest accepted: action — the call refused every template but named "obstacle-pull" as nearest and declined it for no_fit; it lands rather than the row being dropped (what it wanted: creates a line of difficult terrain that blocks sight and knocks Prone whoever t)
[reskin] value check: "Ossuary Wall" EV 29.7 vs floor 14 (one attack of 1) — widened to a 15-foot Cone (print writes this row as an area: Repulsion Breath, Blinding Breath); over the ceiling but a control row (no damage, no KO) — print leaves these ungated
[reskin] signature template: obstacle-pull -> Actions/"Ossuary Wall" ("The idea wants a line of rubble that is difficult terrain, blocks line of sight, [verb: drag:concept]")
[reskin] keys spent by the action: drag
[reskin] signature idea (trait): "Chok's segmented black chitin is coffin-lid armor: while it has not moved since the end of its last turn, it has advantage on saving throws and anyone striking it in melee finds the plates turned like a lid slammed shut — until it drags its coil forward again." [trait/always/defense] [family: body-reaction] — menu: spider-climb, phobia, terrain-walk, bloodied-fury, blood-frenzy, pack-tactics, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, undead-fortitude, truth-aura, fear-aura, evasion, guarded-stance (+ shelf: weapon-lodge)
[reskin] lead by this seat's own clause: trait — "charm" from the clause this seat serves, not the sheet's "zone"
[reskin] composed candidates: none trait — the body-reaction family has no payload that does "defense" (it offers damage, condition, movement)
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does defense; leading: bloodied-fury (always/defense), uncanny-sense (always/defense), shielded-mind (always/defense)
[reskin] keys would have bound: trait — spider-climb, fear-aura (walls, wall, flee, flees)
[reskin] classification handed to the fit call: mechanic=snare shape=save_single
[reskin] word match declined by the call: guarded-stance, undead-fortitude, evasion, bloodied-fury, bound, terrain-walk — the key word does not mean the mechanic here
[reskin] closest accepted: trait — the call refused every template but named "guarded-stance" as nearest and declined it for no_fit; it lands rather than the row being dropped (what it wanted: grants saving throw advantage and penalizes melee attackers while the creature h)
[reskin] free signature row: trait — "guarded-stance" is the call's nearest after it refused every template, so it ships as DECORATION: no receipt, no element claim, counted in the metric. Earns no clause credit
[reskin] free signature row: "Coiled Lid" — the call's nearest after it refused every template, so it ships as DECORATION: no receipt, no element claim, counted in the metric. Earns no clause credit
[reskin] signature template (trait): guarded-stance -> Traits/"Coiled Lid" ("The idea's defense is conditional and tied to not moving — chitin plates turned  [shape fit, no verb match]")
[reskin] repair: 2 clause(s) with no row — "It fights as a brute by rewriting the ground itself: it chooses a killing field", "lets the hunter come to it"; one targeted call with the sheet as context
[reskin] authored trait refused: "Let the Hunter Come" — no mechanic in the effect; the clause folds to description
[reskin] repair answer: attacks 0, saves 0, traits 1, reactions 0, answered [], unplaced ["description:lets the hunter come to it"]
[reskin] clause answered in prose: "lets the hunter come to it" — the call read the sheet and judged it description, not a row; the words reach the description instead
[reskin] condition relation: "Chosen Killing Field" — the call reads its condition as none, so no condition is recorded against it
[reskin] repaired sheet: 1 attack row(s), 0 save, 1 trait(s), 0 reaction(s); 1 clause(s) unplaced
[reskin] weapons answered: Body Slam = none; Funnel Clatter = none
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] name-canon stands down: the path answered blank on "role: brute" and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 1) — "Coiled Lid" [trait/always/defense]
[reskin] row binds its clause: "Ossuary Wall" answers "drags its armored length along the ossuary streets with unsettling patience" — the keys it matched came from that clause, so the coverage credit has a receipt
[reskin] asked but unanswered: "When bloodied it does not flee — it retreats into the ruin it already chose" asked for when_bloodied and no row binds the clause
[reskin] sameness: 1 of 1 free row(s) express nothing their rules carry — counted as decoration ("Coiled Lid")
audit finding below confidence gate: Coiled Lid No defect — this is a defensive trait with an explicit end condition (Bloodied), not an imposed state; recorded for completeness only and should be disregarded.
[reskin] audit rewrite blocked — "Ossuary Wall" is engine-authored chassis text
[reskin] audit rename blocked — "Grasping Pull" promises the Grappled condition that "Ossuary Wall" does not deliver
[reskin] seed share: 0 of 2 signature row(s) came from a seed — the sameness metric
[reskin] [gap] creates a line of difficult terrain that blocks sight and knocks Prone whoever tries to cross it — "Chok heaves its plated snout under the nearest loose rubble and bone, raising a wall of ossuary debris in a line across the ground. The wall is difficult terrain that blocks line of sight; a creature that tries to cross it must succeed on a Strength saving throw or be knocked Prone, pinned in the channel Chok has cut for it." — Chok [seat: action [action/save/movement]] (closest offered: obstacle-pull) [effect: movement] [menu: obstacle-pull slow-bolt disarm trample leap condition-payoff shield-bash ground-burst escalating-dread terror-pulse thrown-burst-seed wind-up exploiter execute sensory-strike lure pacify curse-debt focus] [same-cell unoffered: reel hook-drag pull-through aggro-curse herd] [same-seat rejected: swallow:legality thrown-burst:legality gaze-single:role snare:role reel:role seal:role hook-drag:legality active-toll:legality pull-through:role random-ray:legality spew:legality burrow-ambush:legality snare-bolt:role herd:legality drain:legality reveal:role blighted-ground:role] [landed: obstacle-pull]
[reskin] [gap] grants saving throw advantage and penalizes melee attackers while the creature has not moved since its last turn — "Chok's segmented black chitin is coffin-lid armor: while it has not moved since the end of its last turn, it has advantage on saving throws and anyone striking it in melee finds the plates turned like a lid slammed shut — until it drags its coil forward again." — Chok [seat: trait [trait/always/defense]] (closest offered: guarded-stance) [effect: defense] [menu: bloodied-fury uncanny-sense shielded-mind undead-fortitude evasion guarded-stance spider-climb phobia terrain-walk blood-frenzy pack-tactics berserk relentless-pursuit bound truth-aura fear-aura] [same-cell unoffered: false-appearance shell-withdraw death-restoration patient-defense sealed-body relic-object mimicry blurred-form] [same-seat rejected: false-appearance:legality adhesive:legality aberrant-ground:legality faultless-tracker:legality web-walker:legality death-restoration:legality earth-glide:legality tunneler:legality marking-light:legality sealed-body:legality relic-object:legality mimicry:legality assassinate:role blurred-form:role death-burst:legality kill-denial:legality] [landed: guarded-stance]
[reskin] signature tally: 2 seat(s) -> 2 shape(s) on the sheet · 0 expressed, 1 decoration, 1 free · accepted picks lost: 0 of 2 · path blank
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

Fear Aura. The air elemental emanates an aura in a 20-foot Emanation while it doesn't have the Incapacitated condition. Wisdom Saving Throw: DC 13, any enemy that starts its turn in the aura. Failure: The target has the Frightened condition until the end of its next turn. Success: The target is immune to this creature's aura for 24 hours.

Air Form. The air elemental can enter a creature's space and stop there. It can move through a space as narrow as 1 inch without expending extra movement to do so.

Actions

Multiattack. The air elemental makes two Thunderous Slam attacks.

Thunderous Slam. Melee Attack Roll: +8, reach 10 ft. 14 (2d8 + 5) Thunder damage.

Deafening Peal. Constitution Saving Throw: DC 13, each creature in a 15-foot Emanation originating from the air elemental. Failure: 18 (4d8) Thunder damage, and the target has the Deafened condition until the end of its next turn. Success: Half damage only.

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
- Actions/Deafening Peal — template active-toll; library draw (seed unstamped); binds the GM's words: deafen
- Actions/Whirlwind — print's own row
- Traits/Fear Aura — template fear-aura; library draw (seed unstamped); binds the GM's words: frightens+frightening
- Traits/Air Form — print's own row

**Engine trace**

```
[path] twist — Air Elemental (is) — "Name field: Air Elemental" (code)
[route] brute-juggernaut type=Elemental mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | brute-juggernaut: ✓ ("Air Elemental") | brute-juggernaut: no line key in the words — the model's read of its quote
[concept] name: "Air Elemental" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] resolve: archetype=brute type=Elemental themes=elemental/voice mind=sapient style=juggernaut energy=Thunder mix=energy identity=✓ lore=✓
[concept] name: provided "Air Elemental"
[concept] mechanics: none claimed
[concept] signature elements: stealing voices from the living [behavior] | a chorus of stolen screams [aura] | a whirlwind of compressed storm-air [body]
[concept] identity: A howling column of storm-wind and shrieking voices, it engulfs a foe in a roaring vortex to strip the sound from their throat before hammering them with compressed air and flying debris. Each stolen voice is spent as a thunderous scream that batters the mind and deafens the living, and under pressure it redoubles its shrieking chorus rather than retreat, eager to add another voice to its collection.
[concept] lore: Born from a gale that swept through a killing field and swallowed the last cries of the dying, this elemental drifts the world hunting living throats to fill the silence it can never bear.
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
[reskin] clauses: "Air Elemental —" -> has (descriptive), head | "carries stolen voices" -> has (mechanical) [asked: save_single] [askMechanic: drain]
[reskin] body verdicts: 31 of 31 answered; not true of this body: random-ray, spew, herd, shell-withdraw, rally, coating, heated-body, false-appearance, absorption, bloodied-burst, adhesive, terrain-walk, aberrant-ground, faultless-tracker, web-walker, energy-aura, noxious-aura, uncanny-sense, marking-light, sealed-body, relic-object, warded-mending, gaze-aura, death-burst, kill-denial, hook-rider
[reskin] signature idea (action): "The elemental reaches into a living creature's throat and pulls the sound from it. The target must succeed on a Charisma saving throw or be Deafened and unable to speak until the end of its next turn, and the elemental adds the stolen voice to its chorus, regaining one of its own stolen curses (healing or regaining a spent ability)." [action/save/condition] [family: payoff] — menu: shield-bash, active-toll, ground-burst, escalating-dread, terror-pulse, push-prone, thrown-burst-seed, drain, wind-up, execute, lure, pacify, sensory-strike, curse-debt, reveal (+ shelf: rampage, second-wind, aggro-curse, own-turn-punisher, self-invisibility, focus, stunning-strike, charge-push, pounce, life-drain, charge)
[reskin] lead by this seat's own clause: action — "drain" from the clause this seat serves, not the sheet's "none"
[reskin] composed candidates: none action — the payoff family composes a rider and this is the action seat
[reskin] declared mechanic leads the menu: action — drain: drain
[reskin] menu ordered by the idea's stamps: action — idea fires save/does condition; leading: drain (save/damage), shield-bash (save/condition), escalating-dread (save/condition)
[reskin] classification handed to the fit call: shape=save_single
[reskin] word match declined by the call: sensory-strike, drain, curse-debt — the key word does not mean the mechanic here
[reskin] closest accepted: action — the call refused every template but named "active-toll" as nearest and declined it for no_fit; it lands rather than the row being dropped (what it wanted: regains a spent ability or heals the creature itself when the save fails)
[reskin] seat takes its clause: "Stolen Chorus (Recharge 5-6)" is HANDED "carries stolen voices" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature template: active-toll -> Actions/"Stolen Chorus (Recharge 5-6)" ("The idea is a Charisma save that Deafens and silences a target while healing or  [verb: deafen:idea]")
[reskin] signature idea (trait): "Whenever the elemental takes Thunder damage or is struck by a weapon, its chorus of stolen voices shrieks in sympathy: each creature of its choice within the vortex hears its own name screamed back and must succeed on a Wisdom saving throw or be Frightened until the end of its next turn." [trait/on_being_hit/condition] [family: body-reaction] — menu: resonant-body, weapon-lodge (+ shelf: spider-climb, phobia, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, relentless-pursuit, bound, undead-fortitude, mimicry, truth-aura, fear-aura)
[reskin] lead by this seat's own clause: trait — "drain" from the clause this seat serves, not the sheet's "none"
[reskin] composed candidates on the menu: trait — composed:body-reaction:condition:t0:poisoned, composed:body-reaction:condition:t0:deafened, composed:body-reaction:condition:t1:poisoned, composed:body-reaction:condition:t1:deafened, composed:body-reaction:condition:t2:poisoned, composed:body-reaction:condition:t2:deafened (the body-reaction family's options, built before the call looks)
[reskin] menu ordered by the idea's stamps: trait — idea fires on_being_hit/does condition; leading: composed:body-reaction:condition:t0:poisoned (on_being_hit/condition), composed:body-reaction:condition:t0:deafened (on_being_hit/condition), composed:body-reaction:condition:t1:poisoned (on_being_hit/condition)
[reskin] keys would have bound: trait — mimicry (stolen voice, stolen voices, voices)
[reskin] classification handed to the fit call: shape=save_single
[reskin] word match declined by the call: composed:body-reaction:condition:t0:poisoned, composed:body-reaction:condition:t0:deafened, composed:body-reaction:condition:t1:poisoned, composed:body-reaction:condition:t1:deafened, composed:body-reaction:condition:t2:poisoned, composed:body-reaction:condition:t2:deafened, resonant-body, weapon-lodge, fear-aura — the key word does not mean the mechanic here
[reskin] closest accepted: trait — the call refused every template but named "fear-aura" as nearest and declined it for no_fit; it lands rather than the row being dropped (what it wanted: a Wisdom save that frightens chosen creatures within the vortex when the element)
[reskin] signature template (trait): fear-aura -> Traits/"Stolen Voices" ("The idea is a reactive shriek that frightens creatures of its choice on Thunder  [verb: frightens:idea, frightening:idea]")
[reskin] one mechanic, one name: Traits/"Stolen Voices" -> "Fear Aura" — this row is fear-aura and does what every fear-aura row does; a bespoke name would promise more than the text delivers
[reskin] weapons answered: Slam = none
[reskin] languages by mind: "None" -> "Primordial" (sapient)
[reskin] print canon size: Medium -> Large — the Air Elemental's
[reskin] print canon languages: "Primordial" -> "Primordial (Auran)" — the Air Elemental's
[reskin] print canon speed: 40 ft. -> 10 ft. — the Air Elemental's walk; the concept's other modes stay
[reskin] print canon speed: Fly -> 90 ft. — the Air Elemental's own
[reskin] print canon attack: "Slam" -> "Thunderous Slam" — the Air Elemental's own row
[reskin] print canon multiattack: "the air elemental makes two Thunderous Slam attacks." — the Air Elemental's own
[reskin] immunities stamped for type: Elemental -> Poison; Exhaustion, Poisoned
[reskin] print canon defenses: immunities Poison; Exhaustion, Poisoned -> Poison, Thunder; Exhaustion, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained, Unconscious; resistances none -> Bludgeoning, Lightning, Piercing, Slashing — the Air Elemental's own header lines
[reskin] print canon trait: Air Form — "Air Elemental — that carries stolen voices" is the Air Elemental (print's own row)
[reskin] print canon row: Actions/Whirlwind (Recharge 4-6) — the Air Elemental's own
[reskin] one recharge die: Actions/"Stolen Chorus (Recharge 5-6)" becomes "Stolen Chorus (1/Day)" — the Air Elemental already fields a Recharge row, and 0 of print's 329 blocks field two
[reskin] free-row budget by card size: CR 5 sits in band 3-5, where print runs 2-5 rows (p20-p90, Multiattack excluded); this card already carries 5 fixed row(s), so the free-row budget is 0 rather than 1 — the card is already at print's high end
[reskin] one nova at ship: "Stolen Chorus (1/Day)" un-gated to "Stolen Chorus" — "Whirlwind" already carries this sheet's Recharge nova (un-gated by the one-nova rule — dice to 18, at or under the Multiattack sum (23); the action economy is the limit)
audit finding below confidence gate: Whirlwind Straight-away push direction is adjudicable, but as written the target landing Prone after being flung has no explicit fall/impact resolution and the creature can repeat this each Recharge; the Prone condition itself carries its own exit, so this is fine — no defect beyond noting. (paraphrase review: not a finding)
audit finding below confidence gate: Whirlwind The trigger requires a target to already be in the elemental's space, but nothing forces creatures into that space except Air Form's optional entry; a GM may find it difficult to ever fire, though Air Form lets the elemental move into the creature's space to satisfy it.
[reskin] audit rewrite blocked — "Multiattack" is engine-authored chassis text
[reskin] audit rename: "Stolen Chorus" -> "Deafening Peal"
[reskin] seed share: 0 of 2 signature row(s) came from a seed — the sameness metric
[reskin] [gap] regains a spent ability or heals the creature itself when the save fails — "The elemental reaches into a living creature's throat and pulls the sound from it. The target must succeed on a Charisma saving throw or be Deafened and unable to speak until the end of its next turn, and the elemental adds the stolen voice to its chorus, regaining one of its own stolen curses (healing or regaining a spent ability)." — Air Elemental [seat: action [action/save/condition]] (closest offered: active-toll) [effect: resource] [menu: drain shield-bash escalating-dread terror-pulse push-prone lure pacify sensory-strike reveal active-toll ground-burst thrown-burst-seed wind-up execute curse-debt] [same-cell unoffered: swallow gaze-single snare seal random-ray snare-bolt] [same-seat rejected: swallow:legality trample:legality leap:legality thrown-burst:legality gaze-single:role snare:role reel:role condition-payoff:legality seal:role hook-drag:legality pull-through:role random-ray:legality spew:legality burrow-ambush:legality obstacle-pull:role snare-bolt:role slow-bolt:role disarm:role herd:legality exploiter:legality blighted-ground:role] [landed: active-toll]
[reskin] [gap] a Wisdom save that frightens chosen creatures within the vortex when the elemental is hit or takes Thunder damage, until — "Whenever the elemental takes Thunder damage or is struck by a weapon, its chorus of stolen voices shrieks in sympathy: each creature of its choice within the vortex hears its own name screamed back and must succeed on a Wisdom saving throw or be Frightened until the end of its next turn." — Air Elemental [seat: trait [trait/on_being_hit/condition]] (closest offered: fear-aura) [effect: condition] [menu: composed:body-reaction:condition:t0:poisoned composed:body-reaction:condition:t0:deafened composed:body-reaction:condition:t1:poisoned composed:body-reaction:condition:t1:deafened composed:body-reaction:condition:t2:poisoned composed:body-reaction:condition:t2:deafened resonant-body weapon-lodge fear-aura] [same-cell unoffered: none] [same-seat rejected: heated-body:legality absorption:legality bloodied-burst:legality] [landed: fear-aura]
[reskin] signature tally: 2 seat(s) -> 2 shape(s) on the sheet · 0 expressed, 0 decoration, 0 free · accepted picks lost: 0 of 2 · path twist
```


---


### Ramshackle Battering Golem — in the run

**Concept:** a siege-engine golem of lashed timber that shoulders through walls

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Ramshackle Battering Golem [seed 1/2] | 8 | brute-5-juggernaut | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- **dropped clause:** "shoulders through walls"
- read: def 7 / off 8 → 7.5; sustained 54 (2 × Timber Shoulder); nova none; dmg 54

```
Ramshackle Battering Golem

Large Construct, Unaligned

AC 15
Initiative -1 (9)

HP 153 (18d10 + 54)

Speed 30 ft., Climb 30 ft.

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

Spider Climb. The battering golem can climb difficult surfaces, including along ceilings, without needing to make an ability check.

Lightning Absorption. Whenever the battering golem is subjected to Lightning damage, it takes no damage and instead regains a number of Hit Points equal to the Lightning damage dealt.

Immutable Form. The battering golem can't shape-shift.

Magic Resistance. The battering golem has Advantage on saving throws against spells and other magical effects.

Actions

Multiattack. The battering golem makes two Timber Shoulder attacks.

Timber Shoulder. Melee Attack Roll: +8, reach 5 ft. 27 (5d8 + 5) Bludgeoning damage.

Bonus Actions

Answering Sting. One creature within 5 feet that hit the battering golem with an attack roll since the end of the battering golem's last turn takes 11 (2d10) Bludgeoning damage.

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

- Traits/Spider Climb — template spider-climb; library draw (seed unstamped); the GM's clause "shoulders through walls"; binds the GM's words: walls+wall
- Traits/Lightning Absorption — the chassis
- Traits/Immutable Form — the chassis
- Traits/Magic Resistance — the chassis
- Actions/Multiattack — the chassis
- Actions/Timber Shoulder — the chassis
- Bonus Actions/Answering Sting — library seed own-turn-punisher; binds the GM's words: lash

**Engine trace**

```
[path] homebrew — "a siege-engine golem of lashed timber that shoulders through walls" (call)
[route] brute-juggernaut type=Construct mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | brute-juggernaut: ✓ ("a siege-engine golem of lashed timber") | brute-juggernaut: no line key in the words — the model's read of its quote
[concept] name: provided_name rejected — "siege-engine golem of lashed timber that…" is the description, not a name
[concept] hints: golem→canon ✓ ("siege-engine golem of lashed timber")
[concept] resolve: archetype=brute type=Construct themes=forged/terror mind=mindless style=juggernaut energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: shouldering through walls [behavior] | lashed timber and iron straps [body] | siege engine [body]
[concept] identity: A ramshackle siege golem that opens combat by charging shoulder-first through walls and formations, scattering anything in its path. Every round after, it keeps up the momentum, piling on with lashing timber limbs and bodies torn from the ruins it shoulders through. Lacking cunning, it fights to the death and follows the last order it was given, dumbly devoted to its purpose. Its body is iron-banded timber, with no other substance to it.
[concept] lore: Built from lashed timber and iron straps by a besieging army that could not breach a city wall, the siege golem was left to walk toward the wall forever, and it still does, shouldering through anything that stands in the way.
[reskin] donor: brute-5-juggernaut -> CR 8
[reskin] [path] decides: homebrew (the matcher would have said twist Clay Golem)
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline declared: "the battering golem" — the call's own answer (kind), built from the name
[reskin] inline form: "the battering golem" — the model's own reading of the name
[reskin] save dc derived: DC 15 -> 16 (8 + PB 3 + the sheet's best 5) — no stat on the sheet reached it
[reskin] the sheet's declared ask: none — the route call named no mechanic
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a siege-engine golem of lashed timber" -> has (descriptive), head | "shoulders through walls" -> has (mechanical) [asked: movement] [askMechanic: charge]
[reskin] body verdicts: 31 of 31 answered; not true of this body: active-toll, random-ray, spew, herd, drain, shell-withdraw, rally, coating, phase-slip, heated-body, false-appearance, bloodied-burst, resonant-body, adhesive, terrain-walk, aberrant-ground, faultless-tracker, web-walker, energy-aura, noxious-aura, uncanny-sense, marking-light, relic-object, warded-mending, mimicry, gaze-aura, death-burst, kill-denial, hook-rider, life-drain
[reskin] signature idea (action): "The golem lowers its shoulder and charges in a straight line along the ground, smashing through any wall, door, or barricade in its path without slowing; each creature in its path must make a Dexterity saving throw, taking Bludgeoning damage and being knocked Prone on a failure as the wreck of the barrier rains down with it." [action/save/condition] [family: breach] — menu: leap, throw-retrieve, shield-bash, ground-burst, escalating-dread, terror-pulse, push-prone, thrown-burst-seed, wind-up, lure, obstacle-pull, pacify, slow-bolt, sensory-strike, disarm (+ shelf: second-wind, aggro-curse, own-turn-punisher, self-invisibility, focus, feint-slip, stunning-strike, charge-push, pounce)
[reskin] lead by this seat's own clause: action — "charge" from the clause this seat serves, not the sheet's "none"
[reskin] composed candidates: none action — the breach family has no grammar — composable families are payoff, body-reaction, zone
[reskin] declared mechanic leads the menu: action — charge: leap
[reskin] menu ordered by the idea's stamps: action — idea fires save/does condition; leading: leap (save/damage), shield-bash (save/condition), escalating-dread (save/condition)
[reskin] keys would have bound: action — own-turn-punisher (lash)
[reskin] classification handed to the fit call: shape=movement
[reskin] word match declined by the call: leap, shield-bash, push-prone, obstacle-pull, disarm, throw-retrieve — the key word does not mean the mechanic here
[reskin] closest accepted: action — the call refused every template but named "ground-burst" as nearest and declined it for no_fit; it lands rather than the row being dropped (what it wanted: charges in a straight line, ignoring walls and barricades, and knocks Prone ever)
[reskin] free signature row: action — "ground-burst" is the call's nearest after it refused every template, so it ships as DECORATION: no receipt, no element claim, counted in the metric. Earns no clause credit
[reskin] nova declined: "Battering Charge (Recharge 5-6)" — a whole-round ability the GM never asked for and the call named none of this creature's own elements for it: the call offered no quote, and the key table finds no verb either; the fallback stands in (the cauldron's spill, 2026-09-29)
[reskin] fallback respects the call: push-prone left the shelf — the call declined it for this sheet
[reskin] value check: "Answering Sting" EV 6.1 vs floor 4.4 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: own-turn-punisher -> Bonus Actions/"Answering Sting" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The golem's lashed joints and iron bands grope back into being whenever it shoulders through ruin: while it stands in a space containing rubble, wreckage, or broken timber, it regains Hit Points at the start of each of its turns as it splices the debris into itself." [trait/start_of_turn/resource] [family: heal] — menu: spider-climb, phobia, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, relentless-pursuit, bound, undead-fortitude, truth-aura, fear-aura (+ shelf: absorption, weapon-lodge)
[reskin] composed candidates: none trait — the heal family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: trait — idea fires start_of_turn/does resource; leading: truth-aura (start_of_turn/condition), fear-aura (start_of_turn/condition), spider-climb (always/movement)
[reskin] keys would have bound: trait — spider-climb (walls, wall)
[reskin] classification handed to the fit call: shape=movement
[reskin] word match declined by the call: spider-climb, relentless-pursuit, bound, blood-frenzy — the key word does not mean the mechanic here
[reskin] closest accepted: trait — the call refused every template but named "spider-climb" as nearest and declined it for no_fit; it lands rather than the row being dropped (what it wanted: regains Hit Points at the start of its turn while in a space with rubble or wrec)
[reskin] signature template (trait): spider-climb -> Traits/"Splice the Ruins" ("The idea is a start-of-turn self-heal while standing in rubble — a resource-rega [verb: walls:concept, wall:concept]")
[reskin] one mechanic, one name: Traits/"Splice the Ruins" -> "Spider Climb" — this row is spider-climb and does what every spider-climb row does; a bespoke name would promise more than the text delivers
[reskin] weapons answered: Timber Shoulder = none
[reskin] languages by body: a trap-line Construct with no voice in the concept
[reskin] climb speed: Climb 30 ft. — a creature that climbs difficult surfaces has a Climb Speed in print (the Vampire, the Giant Spider)
[reskin] immunities stamped for type: Construct -> Lightning, Poison; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned
[reskin] name-canon stands down: the path answered homebrew on "a siege-engine golem of lashed timber th" and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] free-row budget by card size: CR 8 sits in band 6-9, where print runs 3-5 rows (p20-p90, Multiattack excluded); this card already carries 6 fixed row(s), so the free-row budget is 0 rather than 1 — the card is already at print's high end
[reskin] row binds its clause: "Spider Climb" answers "shoulders through walls" — the keys it matched came from that clause, so the coverage credit has a receipt
audit finding below confidence gate: Answering Sting The trigger requires the GM to retroactively track which creatures hit the golem across the entire round with no in-block state aid, and applies damage with no attack roll or save, making it laborious to adjudicate mid-combat.
[reskin] audit rename blocked — "Rebounding Shove" promises a push or a knockdown that "Answering Sting" does not deliver
[reskin] seed share: 1 of 2 signature row(s) came from a seed (Answering Sting) — the sameness metric
[reskin] [gap] charges in a straight line, ignoring walls and barricades, and knocks Prone everything in the path — "The golem lowers its shoulder and charges in a straight line along the ground, smashing through any wall, door, or barricade in its path without slowing; each creature in its path must make a Dexterity saving throw, taking Bludgeoning damage and being knocked Prone on a failure as the wreck of the barrier rains down with it." — Ramshackle Battering Golem [seat: action [action/save/condition]] (closest offered: ground-burst) [effect: movement] [menu: leap shield-bash escalating-dread terror-pulse push-prone lure pacify sensory-strike ground-burst thrown-burst-seed wind-up obstacle-pull slow-bolt disarm throw-retrieve] [same-cell unoffered: swallow gaze-single snare seal random-ray snare-bolt reveal] [same-seat rejected: swallow:legality trample:style thrown-burst:style gaze-single:role snare:role reel:role condition-payoff:legality execute:role seal:role hook-drag:legality active-toll:legality pull-through:role random-ray:legality spew:legality burrow-ambush:legality snare-bolt:role herd:legality drain:legality curse-debt:role reveal:role exploiter:legality blighted-ground:role] [VETOED AFTER ACCEPTANCE: ground-burst never reached the sheet — died at an UNRECORDED drop site]
[reskin] [gap] regains Hit Points at the start of its turn while in a space with rubble or wreckage — "The golem's lashed joints and iron bands grope back into being whenever it shoulders through ruin: while it stands in a space containing rubble, wreckage, or broken timber, it regains Hit Points at the start of each of its turns as it splices the debris into itself." — Ramshackle Battering Golem [seat: trait [trait/start_of_turn/resource]] (closest offered: spider-climb) [effect: resource] [menu: truth-aura fear-aura spider-climb phobia bloodied-fury blood-frenzy pack-tactics death-restoration berserk shielded-mind relentless-pursuit bound undead-fortitude] [same-cell unoffered: warded-mending] [same-seat rejected: energy-aura:legality noxious-aura:legality warded-mending:legality gaze-aura:legality] [landed: spider-climb]
[reskin] signature outcome: 1 of 2 accepted signature pick(s) never reached the sheet — 1x an UNRECORDED drop site
[reskin] signature tally: 2 seat(s) -> 2 shape(s) on the sheet · 0 expressed, 0 decoration, 0 free · accepted picks lost: 1 of 2 (1x an UNRECORDED drop site) · path homebrew
```


---


### Stone Golem — in the run

**Concept:** name: Stone Golem | carved as a weeping saint

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Stone Golem | 10 | brute-9 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 11 / off 9 → 10; sustained 48 (2 × Slam); nova Trample 35; dmg 55

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

Fear Aura. The golem emanates an aura in a 20-foot Emanation while it doesn't have the Incapacitated condition. Wisdom Saving Throw: DC 17, any enemy that starts its turn in the aura. Failure: The target has the Frightened condition until the end of its next turn. Success: The target is immune to this creature's aura for 24 hours.

Immutable Form. The golem can't shape-shift.

Magic Resistance. The golem has Advantage on saving throws against spells and other magical effects.

Actions

Multiattack. The golem makes two attacks, using Slam or Force Bolt in any combination.

Slam. Melee Attack Roll: +10, reach 5 ft. 15 (2d8 + 6) Bludgeoning damage plus 9 (2d8) Force damage.

Force Bolt. Ranged Attack Roll: +9, range 120 ft. 22 (4d10) Force damage.

Trample (1/Day). The golem moves up to its Speed without provoking Opportunity Attacks and can move through the spaces of Large or smaller creatures. Each creature whose space it enters is targeted once by the following effect. Dexterity Saving Throw: DC 17. Failure: 35 (10d6) Bludgeoning damage, and the target has the Prone condition. Success: Half damage, and the target is pushed 5 feet straight away.

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
- Actions/Slam — print's own row, renamed
- Actions/Force Bolt — print's own row, renamed; weapon crossbow
- Actions/Trample — template trample; library draw (seed unstamped)
- Traits/Fear Aura — template fear-aura; library draw (seed unstamped); binds the GM's words: frightens+frightening
- Traits/Immutable Form — print's own row
- Traits/Magic Resistance — print's own row
- Bonus Actions/Slow — print's own row

**Engine trace**

```
[path] twist — Stone Golem (is) — "Name field: Stone Golem" (code)
[route] brute-juggernaut type=Construct mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | brute-juggernaut: ✓ ("Stone Golem") | brute-juggernaut: no line key in the words — the model's read of its quote
[concept] name: "Stone Golem" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] hints: golem→canon ✓ ("Stone Golem — carved as a weeping saint")
[concept] resolve: archetype=brute type=Construct themes=grave/forged mind=sapient style=juggernaut energy=— mix=physical identity=✓ lore=✓
[concept] name: provided "Stone Golem"
[concept] mechanics: none claimed
[concept] signature elements: a weeping stone saint [body] | walking through walls and obstacles without slowing [behavior] | the slow stream of tears streaming from carved eyes [aura]
[concept] identity: The Weeping Saint opens by walking straight through cover — pews, pillars, shrine walls — to reach the nearest target, its carved stone fists already wet with the slow stream from its sculpted eyes. Every round it repeats the same brutal routine: advance, shatter whatever stands between it and its quarry, and drive both fists down in a two-handed blow, the tears hissing faintly where they strike stone or flesh. It fights to the death, never retreating, never breaking stride, its grief indistinguishable from its momentum.
[concept] lore: A shrine-carver was paid to immortalize a martyred saint in prayerful grief, but the mason bound the statue with a fragment of the saint's own reliquary, and the stone now believes it is still at the vigil — walking from shrine to shrine, weeping for a flock it can no longer find and breaking anything that will not kneel.
[reskin] print canon route: the Stone Golem's body outranks the juggernaut seat — no verb in the words names it; the plain brute line
[reskin] print canon defenses: HP 182 -> 220, AC 15 -> 18 — the Stone Golem's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 22, DEX 9, CON 20, INT 3, WIS 11, CHA 1 — the Stone Golem's at its own CR; attack +9 -> +10, DC 17 (print's)
[reskin] donor: brute-9 -> CR 10
[reskin] [path] decides: twist on the Stone Golem (the matcher agrees)
[reskin] print canon: "Stone Golem — carved as a weeping saint" heads on the Stone Golem — print's rows ride along; the seat stays
[reskin] alignment by body: Neutral -> Unaligned — a Construct at INT 3 (print: Oozes 4/4 Unaligned; every Construct at INT 3 or less, 7/7; the first aligned one is the Flesh Golem at INT 6)
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline by rule: "the golem" — the call answered "the golem" (kind), which the name does not support
[reskin] inline form: "the golem" — the model's own reading of the name
[reskin] save dc derived: DC 16 -> 18 (8 + PB 4 + the sheet's best 6) — no stat on the sheet reached it
[reskin] the sheet's declared ask: none — the route call named no mechanic
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Stone Golem — carved as a weeping saint" -> has (descriptive), head
[reskin] body verdicts: 31 of 31 answered; not true of this body: active-toll, random-ray, spew, herd, drain, shell-withdraw, rally, coating, heated-body, false-appearance, absorption, bloodied-burst, resonant-body, adhesive, terrain-walk, aberrant-ground, faultless-tracker, web-walker, energy-aura, noxious-aura, uncanny-sense, marking-light, sealed-body, warded-mending, mimicry, gaze-aura, death-burst, kill-denial, hook-rider, life-drain
[reskin] signature idea (action): "The golem moves in a straight line through walls, pillars, and other solid obstacles without slowing, passing through them as if they were open air. It must end this movement in an unoccupied space, and any creature whose space it enters must succeed on a Dexterity saving throw or be pushed to the nearest unoccupied space and knocked Prone." [action/always/movement] [family: breach] — menu: trample, leap, thrown-burst, throw-retrieve, shield-bash, ground-burst, escalating-dread, terror-pulse, push-prone, thrown-burst-seed, wind-up (+ shelf: rampage, second-wind, aggro-curse, own-turn-punisher, self-invisibility, focus, feint-slip, affliction, contagion, stunning-strike, charge-push, pounce, charge)
[reskin] composed candidates: none action — the breach family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: action — idea fires always/does movement; leading: throw-retrieve (always/damage), trample (save/damage), leap (save/damage)
[reskin] word match declined by the call: trample, leap, charge, push-prone — the key word does not mean the mechanic here
[reskin] closest accepted: action — the call refused every template but named "trample" as nearest and declined it for no_fit; it lands rather than the row being dropped (what it wanted: moves through solid walls and pillars in a straight line without slowing, ending)
[reskin] pick kept on the GM's own words: action — "trample" has no key-table verb, but the call quotes "carved as a weeping saint" from the description
[reskin] signature template: trample -> Actions/"Stone Saint's Passage (Recharge 5-6)" ("The golem phases through solid obstacles in a straight line and shoves/prones cr [shape fit, no verb match]")
[reskin] signature idea (trait): "The golem's carved tears fall ceaselessly, hissing where they strike stone or flesh. Whenever the golem hits a creature with its Stone Fist, the target must succeed on a Wisdom saving throw or be Frightened of the golem until the end of its next turn, as the weight of the saint's grief washes over it." [trait/always/condition] [family: payoff] — menu: spider-climb, phobia, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, relentless-pursuit, bound, relic-object, undead-fortitude, truth-aura, fear-aura (+ shelf: weapon-lodge)
[reskin] composed candidates: none trait — the payoff family composes a rider and this is the trait seat
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does condition; leading: phobia (always/condition), berserk (always/condition), spider-climb (always/movement)
[reskin] word match declined by the call: phobia, berserk, relic-object, bound, truth-aura — the key word does not mean the mechanic here
[reskin] free signature row: "Saint's Grief" — the trait seat cannot quote the GM, but the call names the element it expresses: "a weeping stone saint". Earns no clause credit; the twist/class path allows 1 and this is number 1
[reskin] seat takes its clause: "Saint's Grief" is HANDED "carved as a weeping saint" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature template (trait): fear-aura -> Traits/"Saint's Grief" ("The target must succeed on a Wisdom saving throw or be Frightened of the golem u [verb: frightens:idea, frightening:idea]")
[reskin] one mechanic, one name: Actions/"Stone Saint's Passage (Recharge 5-6)" -> "Trample (Recharge 5-6)" — this row is trample and does what every trample row does; a bespoke name would promise more than the text delivers
[reskin] one mechanic, one name: Traits/"Saint's Grief" -> "Fear Aura" — this row is fear-aura and does what every fear-aura row does; a bespoke name would promise more than the text delivers
[reskin] weapons answered: Stone Fist = none; Tear Dart = none; Kneel or Weep = none
[reskin] weapon declined: "Tear Dart" reads dart from its name, but the call answered none — the row carries no weapon
[reskin] weapon table: "Tear Dart" — thrown, range 20/60
[reskin] languages by mind: "None" -> "Understands the languages of its creator but can't speak" (sapient)
[reskin] print canon languages: "Understands the languages of its creator but can't speak" -> "Understands Common plus two other languages but can't speak" — the Stone Golem's
[reskin] print canon speed: 40 ft. -> 30 ft. — the Stone Golem's walk; the concept's other modes stay
[reskin] print canon attack: "Stone Fist" -> "Slam" — the Stone Golem's own row
[reskin] print canon multiattack: "the golem makes two attacks, using Slam or Force Bolt in any combination." — the Stone Golem's own
[reskin] print canon attack: "Force Bolt" is print's own row — +9, 22 (4d10), range 120 ft. (an exact body at print's CR)
[reskin] print canon attack: "Tear Dart" -> "Force Bolt" — the Stone Golem's own ranged row
[reskin] immunities stamped for type: Construct -> Poison; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned
[reskin] print canon defenses: immunities Poison; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned -> Poison, Psychic; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned — the Stone Golem's own header lines
[reskin] name-canon trait stamped: Immutable Form (the name says so; print says what it does)
[reskin] name-canon trait stamped: Magic Resistance (the name says so; print says what it does)
[reskin] print canon trait: Immutable Form — print's text replaces the chassis's (the Troll regenerates 15, not the chassis's 10 — critic's audit 2026-10-02)
[reskin] print canon trait: Magic Resistance — print's text replaces the chassis's (the Troll regenerates 15, not the chassis's 10 — critic's audit 2026-10-02)
[reskin] print canon row: Bonus Actions/Slow (Recharge 5-6) — the Stone Golem's own
[reskin] one recharge die: Actions/"Trample (Recharge 5-6)" becomes "Trample (1/Day)" — the Stone Golem already fields a Recharge row, and 0 of print's 329 blocks field two
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 1) — "Fear Aura" [trait/start_of_turn/condition]
[reskin] save re-derived after a retype: Actions/Trample — a Strength save for a condition the row IMPOSES, which calls for Dexterity or Constitution (A2: a condition the row merely requires does not pick the stat)
[reskin] element claim revoked: "Fear Aura" claims "a weeping stone saint" but the audit judged that nothing in the row carries it; the name advertises nothing, so the row stands as decoration
[reskin] sameness: 1 of 1 free row(s) express nothing their rules carry — counted as decoration ("Fear Aura")
[reskin] audit rewrite blocked — "Multiattack" is engine-authored chassis text
[reskin] seed share: 0 of 2 signature row(s) came from a seed — the sameness metric
[reskin] [gap] moves through solid walls and pillars in a straight line without slowing, ending in an unoccupied space; creatures whose — "The golem moves in a straight line through walls, pillars, and other solid obstacles without slowing, passing through them as if they were open air. It must end this movement in an unoccupied space, and any creature whose space it enters must succeed on a Dexterity saving throw or be pushed to the nearest unoccupied space and knocked Prone." — Stone Golem [seat: action [action/always/movement]] (closest offered: trample) [effect: movement] [menu: throw-retrieve trample leap thrown-burst shield-bash ground-burst escalating-dread terror-pulse push-prone thrown-burst-seed wind-up charge] [same-cell unoffered: blink spider-climb terrain-walk aberrant-ground web-walker earth-glide tunneler relentless-pursuit bound zone-seed self-invisibility rally focus feint-slip phase-slip] [same-seat rejected: zone-seed:role] [landed: trample]
[reskin] signature tally: 2 seat(s) -> 2 shape(s) on the sheet · 0 expressed, 1 decoration, 1 free · accepted picks lost: 0 of 1 · path twist
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

Multiattack. The pit fiend makes one Bite attack, two Devilish Claw attacks, and one Fiery Mace attack. It can replace one attack with a use of Stolen Dying Oath.

Bite. Melee Attack Roll: +14, reach 10 ft. 18 (3d6 + 8) Piercing damage. If the target is a creature, it must make the following saving throw. Constitution Saving Throw: DC 21. Failure: The target has the Poisoned condition. While Poisoned, the target can't regain Hit Points and takes 21 (6d6) Poison damage at the start of each of its turns, and it repeats the save at the end of each of its turns, ending the effect on itself on a success. After 1 minute, it succeeds automatically.

Fiery Mace. Melee Attack Roll: +14, reach 10 ft. 22 (4d6 + 8) Force damage plus 21 (6d6) Fire damage.

Devilish Claw. Melee Attack Roll: +14, reach 10 ft. 26 (4d8 + 8) Necrotic damage.

Stolen Dying Oath. Dexterity Saving Throw: DC 21, one creature within 30 feet. Failure: 14 (4d6) Necrotic damage, and the target can't regain Hit Points until the end of its next turn.

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
- Actions/Stolen Dying Oath — template seal; library draw (seed unstamped); binds the GM's words: curse
- Actions/Hellfire Spellcasting — print's own row

**Engine trace**

```
[path] twist — Pit Fiend (is) — "Name field: Pit Fiend" (code)
[route] brute type=Fiend mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | caster-binder: the call reads no worked magic in these words | caster: the family itself needs a magic word in the words — the fallback leaves it | fell to brute's plain line | defender: the call read "knights" as not meaning that mechanic here — no override | brute stands: every key that would override it was read as a figure of speech | brute: no line key in the words — the model's read of its quote
[concept] name: "Pit Fiend" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] resolve: archetype=brute type=Fiend themes=fiendish/grave mind=sapient style=— energy=Necrotic mix=both identity=✓ lore=✓
[concept] name: provided "Pit Fiend"
[concept] mechanics: none claimed
[concept] signature elements: collecting the oaths of dying knights [behavior] | a great black iron blade [object] | an aura of binding oaths and death [aura]
[concept] identity: A pit fiend that rises from the battlefield scorched and iron-shod, planting itself among the dying and demanding their final oaths before it finishes them, trading blows with any champion who dares interrupt the rite. Each round it heaves its great black blade in wide, punishing arcs and roars a fallen knight's stolen vow back at the living as a curse, daring them to break it. It does not flee — bloodied, it digs in deeper and fights to the last, savoring every oath it can wring from a dying throat.
[concept] lore: Forged in the lowest foundries of the Abyss, this fiend descends at the hour of slaughter to harvest the sworn words of dying knights, dragging each broken promise back to its hellish ledger.
[reskin] print canon defenses: HP 347 -> 337, AC 20 -> 21 — the Pit Fiend's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 26, DEX 14, CON 24, INT 22, WIS 18, CHA 24 — the Pit Fiend's at its own CR; attack +14 -> +14, DC 21 (print's)
[reskin] donor: brute-21 -> CR 20 (invented — no printed peer)
[reskin] [path] decides: twist on the Pit Fiend (the matcher agrees)
[reskin] print canon: "Pit Fiend — who collects the oaths of dying knights" heads on the Pit Fiend — print's rows ride along; the seat stays
[reskin] ranged row off: "Legendary Ranged Attack" leaves with it (it made a Ranged Attack attack)
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] repair round 1: 1 defect(s) — condition for {condition_minor} not from its menu
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline by rule: "the pit fiend" — the call answered "the pit fiend" (kind), which the name does not support
[reskin] inline form: "the pit fiend" — the model's own reading of the name
[reskin] the sheet's declared ask: curse — the route call's one answer for the whole concept
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Pit Fiend —" -> has (descriptive), head | "collects the oaths of dying knights" -> has (mechanical) [asked: on_hit/condition] [askMechanic: curse]
[reskin] body verdicts: 28 of 28 answered; not true of this body: herd, shell-withdraw, rally, coating, heated-body, false-appearance, absorption, bloodied-burst, adhesive, terrain-walk, aberrant-ground, faultless-tracker, web-walker, energy-aura, noxious-aura, uncanny-sense, marking-light, sealed-body, warded-mending, gaze-aura, death-burst, hook-rider
[reskin] menu pruned: action — push-prone, thrown-burst-seed (the sheet cannot render them)
[reskin] signature idea (action): "The pit fiend levels its black blade at one creature that can hear it and recites a stolen dying oath. The target makes a Charisma saving throw; on a failure it is cursed, and whenever it makes an attack roll or saving throw before the curse ends, it must first succeed on a Wisdom saving throw or the attack or save automatically fails as the dead knight's words bind its tongue and hand." [action/save/condition] [family: mark] — menu: condition-payoff, shield-bash, escalating-dread, terror-pulse, drain, exploiter, seal, lure, pacify, sensory-strike, reveal (+ shelf: second-wind, aggro-curse, own-turn-punisher, self-invisibility, focus, contagion, stunning-strike, charge-push, pounce, life-drain, charge)
[reskin] composed candidates: none action — the mark family has no grammar — composable families are payoff, body-reaction, zone
[reskin] declared mechanic leads the menu: action — curse: seal
[reskin] menu ordered by the idea's stamps: action — idea fires save/does condition; leading: seal (save/condition), shield-bash (save/condition), escalating-dread (save/condition)
[reskin] keys would have bound: action — aggro-curse (oath)
[reskin] classification handed to the fit call: shape=condition when=on_hit
[reskin] word match declined by the call: shield-bash, escalating-dread, terror-pulse, lure, pacify, sensory-strike, reveal — the key word does not mean the mechanic here
[reskin] closest accepted: action — the call refused every template but named "seal" as nearest and declined it for no_fit; it lands rather than the row being dropped (what it wanted: curse that forces a Wisdom save before each attack or save or the roll fails)
[reskin] seat takes its clause: "Stolen Dying Oath" is HANDED "collects the oaths of dying knights" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature template: seal -> Actions/"Stolen Dying Oath" ("The idea needs a save-gated curse that forces a further Wisdom save before every [verb: curse:idea]")
[reskin] signature idea (trait): "The pit fiend's great black iron blade drinks the last breath of anything it fells. Whenever it reduces a creature to 0 hit points with its Greatsword, it regains hit points equal to the damage dealt and the blade's necrotic hum deepens until the end of its next turn." [trait/always/resource] [family: heal] — menu: spider-climb, phobia, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, relentless-pursuit, bound, relic-object, undead-fortitude, mimicry, truth-aura, fear-aura, kill-denial (+ shelf: resonant-body, weapon-lodge)
[reskin] composed candidates: none trait — the heal family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does resource; leading: spider-climb (always/movement), phobia (always/condition), bloodied-fury (always/defense)
[reskin] classification handed to the fit call: shape=condition when=on_hit
[reskin] word match declined by the call: death-restoration, bound, blood-frenzy — the key word does not mean the mechanic here
[reskin] closest accepted: trait — the call refused every template but named "relic-object" as nearest and declined it for no_fit; it lands rather than the row being dropped (what it wanted: regains hit points when its blade kills a creature)
[reskin] free signature row: trait — "relic-object" is the call's nearest after it refused every template, so it ships as DECORATION: no receipt, no element claim, counted in the metric. Earns no clause credit
[reskin] free signature row: "Oath-Drinking Blade" — the call's nearest after it refused every template, so it ships as DECORATION: no receipt, no element claim, counted in the metric. Earns no clause credit
[reskin] seat takes its clause: "Oath-Drinking Blade" is HANDED "collects the oaths of dying knights" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature template (trait): relic-object -> Traits/"Oath-Drinking Blade" ("The pit fiend's great black iron blade drinks the last breath of anything it fells. Whenever it reduces a creature to 0 hit points with its Greatsword, it regai [shape fit, no verb match]")
[reskin] weapons answered: Greatsword = greatsword
[reskin] weapon dice follow the weapon: "Greatsword" is a greatsword (d6) — "17 (2d8 + 8)" becomes "18 (3d6 + 8)", print's rule of keeping the die and scaling the count
[reskin] weapon reach follows the weapon: "Greatsword" is a greatsword — reach 10 ft becomes 5 ft (the table's own)
[reskin] chassis nova: "Oath-Roar (Recharge 5-6)" — the brute-21's own nova row (its "Area Nova", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] speed by concept: added Fly 40 ft. — the concept's movement set decides
[reskin] print canon languages: "Infernal" -> "Infernal; telepathy 120 ft." — the Pit Fiend's
[reskin] print canon speed: 40 ft. -> 30 ft. — the Pit Fiend's walk; the concept's other modes stay
[reskin] print canon speed: Fly -> 60 ft. — the Pit Fiend's own
[reskin] print canon row: Actions/Devilish Claw — the Pit Fiend's second melee row, beside the chassis's
[reskin] print canon row: Actions/Fiery Mace — the Pit Fiend's second melee row, beside the chassis's
[reskin] print canon attack: "Greatsword" -> "Bite" — the Pit Fiend's own row
[reskin] print canon multiattack: "the pit fiend makes one Bite attack, two Devilish Claw attacks, and one Fiery Mace attack." — the Pit Fiend's own
[reskin] immunities stamped for type: Fiend -> Poison; Poisoned
[reskin] print canon skills: "Athletics +14, Perception +10" -> "Perception +10, Persuasion +19" — the Pit Fiend's own skills, each derived from this sheet's stat and PB
[reskin] print canon defenses: immunities Poison; Poisoned -> Fire, Poison; Poisoned; resistances none -> Cold — the Pit Fiend's own header lines
[reskin] resistances derived withheld: print's Pit Fiend owns the line (Cold)
[reskin] print canon trait: Diabolical Restoration — "Pit Fiend — who collects the oaths of dying knights" is the Pit Fiend (print's own row)
[reskin] print canon trait: Fear Aura — "Pit Fiend — who collects the oaths of dying knights" is the Pit Fiend (print's own row)
[reskin] print canon trait: Magic Resistance — "Pit Fiend — who collects the oaths of dying knights" is the Pit Fiend (print's own row)
[reskin] print canon: chassis row leaves — Actions/"Oath-Roar (Recharge 5-6)" is the seat's nova, not the Pit Fiend's
[reskin] print canon legendary: the chassis's Legendary Actions leave — the Pit Fiend has none of its own at its CR
[reskin] print canon row: Actions/Hellfire Spellcasting (Recharge 4-6) — the Pit Fiend's own
[reskin] multiattack replacement clause: It can replace one attack with a use of Stolen Dying Oath.
[reskin] free-row budget by card size: CR 20 sits in band 17-20, where print runs 7-9 rows (p20-p90, Multiattack excluded); this card already carries 9 fixed row(s), so the free-row budget is 0 rather than 1 — the card is already at print's high end
[reskin] free row over budget: Traits/"Oath-Drinking Blade" leaves at ship — this sheet's free-row budget (0) is spent by a row that SHIPPED
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 0 kept (budget 0)
[reskin] asked but unanswered: "collects the oaths of dying knights" asked for on_hit and no row binds the clause
[reskin] audit rewrite blocked — "Multiattack" is engine-authored chassis text
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] [gap] curse that forces a Wisdom save before each attack or save or the roll fails — "The pit fiend levels its black blade at one creature that can hear it and recites a stolen dying oath. The target makes a Charisma saving throw; on a failure it is cursed, and whenever it makes an attack roll or saving throw before the curse ends, it must first succeed on a Wisdom saving throw or the attack or save automatically fails as the dead knight's words bind its tongue and hand." — Pit Fiend [seat: action [action/save/condition]] (closest offered: seal) [effect: condition] [menu: seal shield-bash escalating-dread terror-pulse lure pacify sensory-strike reveal condition-payoff drain exploiter] [same-cell unoffered: swallow gaze-single snare random-ray snare-bolt push-prone] [same-seat rejected: swallow:legality trample:legality leap:legality thrown-burst:legality gaze-single:role snare:role reel:role execute:role hook-drag:legality active-toll:legality pull-through:role random-ray:legality ground-burst:legality spew:legality burrow-ambush:legality obstacle-pull:role snare-bolt:role slow-bolt:role disarm:role herd:legality curse-debt:role wind-up:legality blighted-ground:role] [landed: seal]
[reskin] [gap] regains hit points when its blade kills a creature — "The pit fiend's great black iron blade drinks the last breath of anything it fells. Whenever it reduces a creature to 0 hit points with its Greatsword, it regains hit points equal to the damage dealt and the blade's necrotic hum deepens until the end of its next turn." — Pit Fiend [seat: trait [trait/always/resource]] (closest offered: relic-object) [effect: resource] [menu: spider-climb phobia bloodied-fury blood-frenzy pack-tactics death-restoration berserk shielded-mind relentless-pursuit bound relic-object undead-fortitude mimicry kill-denial truth-aura fear-aura resonant-body] [same-cell unoffered: lay-on-hands second-wind volley-order] [same-seat rejected: false-appearance:legality adhesive:legality terrain-walk:legality aberrant-ground:legality faultless-tracker:legality web-walker:legality uncanny-sense:legality earth-glide:legality tunneler:legality evasion:role marking-light:legality sealed-body:legality guarded-stance:role assassinate:role blurred-form:role death-burst:legality] [VETOED AFTER ACCEPTANCE: relic-object never reached the sheet — died at the free-row budget (only 0 free row(s) allowed on this sheet)]
[reskin] signature outcome: 1 of 2 accepted signature pick(s) never reached the sheet — 1x the free-row budget
[reskin] signature tally: 2 seat(s) -> 1 shape(s) on the sheet · 0 expressed, 0 decoration, 0 free · accepted picks lost: 1 of 2 (1x the free-row budget) · path twist
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
[concept] resolve: archetype=brute type=Monstrosity themes=bestial/devouring mind=bestial style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: provided "Owlbear"
[concept] mechanics: none claimed
[concept] signature elements: owl-bear hybrid body of beak and claw [body] | screeching charge that scatters prey [behavior] | pinning maul and savage tear [behavior]
[concept] identity: The owlbear crashes forward on its hind legs, roaring to scatter the pack before it lunges into a two-clawed maul that drags prey down and pins it beneath its bulk. Every round after that it stands over its catch and tears, shrugging off blows with a hide thick as a bear's and a temper that never learns to retreat. Backed into a corner it fights harder rather than fleeing, savaging anything that stays within reach.
[concept] lore: A magus's crossed breeding of owl and bear gone feral in the deep woods, it haunts old game trails and claims a stretch of forest as its personal larder, killing whatever wanders in.
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
[reskin] body verdicts: 31 of 31 answered; not true of this body: active-toll, random-ray, herd, drain, shell-withdraw, rally, coating, heated-body, false-appearance, absorption, bloodied-burst, resonant-body, adhesive, terrain-walk, aberrant-ground, web-walker, energy-aura, noxious-aura, uncanny-sense, marking-light, sealed-body, relic-object, warded-mending, mimicry, gaze-aura, death-burst, life-drain
[reskin] weapons answered: Claw = none
[reskin] print canon speed: modes climb — the Owlbear's
[reskin] print canon senses: "darkvision 60 ft." — the Owlbear's
[reskin] speed by concept: added Climb 30 ft. — the concept's movement set decides
[reskin] print canon speed: 30 ft. -> 40 ft. — the Owlbear's walk; the concept's other modes stay
[reskin] print canon speed: Climb -> 40 ft. — the Owlbear's own
[reskin] print canon attack: "Claw" -> "Rend" — the Owlbear's own row
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
| Vashka the Red | 6 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- **dropped clause:** "never breaks ranks"
- read: def 4 / off 5 → 4.5; sustained 33 (3 × Longsword); nova none; dmg 33

```
Vashka the Red

Medium Humanoid, Neutral

AC 16
Initiative +2 (12)

HP 112 (15d8 + 45)

Speed 30 ft., Climb 30 ft.

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

Spider Climb. Vashka can climb difficult surfaces, including along ceilings, without needing to make an ability check.

Actions

Multiattack. Vashka makes three Longsword attacks. It can replace one attack with a use of Shield Bash.

Longsword. Melee Attack Roll: +7, reach 5 ft. 11 (2d6 + 4) Slashing damage.

Shield Shove. Strength Saving Throw: DC 15, one creature within 5 feet. Failure: The target is pushed up to 15 feet away from Vashka and has the Prone condition.

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

- Traits/Spider Climb — template spider-climb; library draw (seed unstamped); the GM's clause "fights from a shield wall"; binds the GM's words: walls+wall
- Actions/Multiattack — the chassis
- Actions/Longsword — print's own row, renamed; weapon longsword
- Actions/Shield Shove — template push-prone; library draw (seed unstamped); binds the GM's words: shove+knock+push
- Actions/Shield Bash — print's own row
- Reactions/Riposte — template riposte; fighter kit; the GM's clause "warlord"

**Engine trace**

```
[path] class_npc — class fighter — "warlord" (call)
[route] defender type=Humanoid mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | defender: ✓ ("fights from a shield wall and never brea") | defender-leader: "warlord" is a noun (a title), not a verb — no override | defender: key "shield wall" (class verb)
[concept] name: "Vashka the Red" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] resolve: archetype=defender type=Humanoid themes=armed/forged mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: provided "Vashka the Red"
[concept] mechanics: none claimed
[concept] signature elements: the unbreakable shield wall [behavior] | lacquered plate and shield [object] | punishes anyone who moves past his line [behavior]
[concept] identity: Vashka the Red locks his lacquered shield wall at the start of every fight, advancing as a single armored press to pin enemies against terrain rather than charge them. He fights as the wall's anchor — shield-bash to shove and stagger, spear-point to punish anyone who slips past his line, and he calls ranks to close the gap where he treads. He never breaks, never pursues, and would sooner die beneath his shield than let one foe through; bloodied, he tightens the wall and grinds forward all the harder.
[concept] lore: Vashka the Red is a hobgoblin legion-warlord who rose from shield-scrum to command by never once yielding ground, and now he wants only to be given a wall worth holding — a pass, a bridge, a gate — to hold until he dies.
[reskin] [path] class body: the fighter stands on the Gladiator — the class's own print block, nearest CR 6
[reskin] print canon defenses: HP 91 -> 112, AC 19 -> 16 — the Gladiator's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon armor: 16 (studded leather, shield) — print's Gear line; the 2014 sheet prints it (the Goblin Boss wore "splint", canaries 2026-10-12)
[reskin] print canon array: STR 18, DEX 15, CON 16, INT 10, WIS 12, CHA 15 — the Gladiator's at its own CR; attack +7 -> +7, DC 15 (print's)
[reskin] donor: defender-5 -> CR 6
[reskin] row gated out: Guard Aura (aura) — the concept did not claim this mechanic
[reskin] [path] decides: class_npc on the Gladiator · class fighter (the matcher would have said homebrew)
[reskin] print canon: "Vashka the Red — A hobgoblin warlord in lacquered plate who fights from a shield wall and never breaks ranks." heads on the Gladiator — print's rows ride along; the seat stays
[reskin] repair round 1: 1 defect(s) — rename for "Melee Attack" takes the shelf's own row name "Shield Bash" — that name belongs to a template this sheet may still receive; choose another
[reskin] class kit: guarded-stance yields — AC 16 already beats print's 15 at CR 6, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] class kit: fighter — "warlord": Riposte (riposte)
[reskin] proper noun: "Vashka the Red" — the Name field is a person, not a kind (no print match, no article in the words)
[reskin] inline declared: "Vashka" — the call's own answer (person), built from the name
[reskin] inline form: "Vashka" — the model's own reading of the name
[reskin] the sheet's declared ask: none — the route call named no mechanic
[reskin] lacks asked: nothing taken away
[reskin] lacks not claimed: "never breaks ranks" reads like a lack to the words, and the call's list did not name it
[reskin] clauses: "Vashka the Red — A hobgoblin warlord in lacquered plate" -> has (descriptive), head | "fights from a shield wall" -> has (mechanical) [asked: at_will/attack] [askMechanic: command] | "never breaks ranks" -> has (mechanical) [asked: buff_self] [askMechanic: harden]
[reskin] body verdicts: 25 of 25 answered; not true of this body: seal, active-toll, random-ray, shell-withdraw, false-appearance, absorption, bloodied-burst, resonant-body, adhesive, terrain-walk, aberrant-ground, faultless-tracker, web-walker, uncanny-sense, marking-light, sealed-body, relic-object, warded-mending, mimicry, gaze-aura, kill-denial, hook-rider, life-drain
[reskin] menu pruned: action — snap-shot (the sheet cannot render them)
[reskin] signature idea (action): "Vashka drives the press forward: he moves up to his Speed in a straight line, and each creature in his path must succeed on a Strength saving throw or be pushed along ahead of him and knocked Prone, while each ally adjacent to him may move with him as part of the shove — the wall closes where he treads, pinning foes against terrain." [action/save/movement] [family: sentinel] — menu: throw-retrieve, shield-bash, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up (+ shelf: patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, rampage, stunning-strike, charge-push)
[reskin] lead by this seat's own clause: action — "command" from the clause this seat serves, not the sheet's "none"
[reskin] composed candidates: none action — the sentinel family has no grammar — composable families are payoff, body-reaction, zone
[reskin] declared mechanic leads the menu: action — command: herd
[reskin] menu ordered by the idea's stamps: action — idea fires save/does movement; leading: herd (save/movement), obstacle-pull (save/movement), slow-bolt (save/movement)
[reskin] keys would have bound: action — rally (shield)
[reskin] classification handed to the fit call: shape=attack when=at_will
[reskin] word match declined by the call: disarm, shield-bash, slow-bolt, obstacle-pull — the key word does not mean the mechanic here
[reskin] closest accepted: action — the call refused every template but named "push-prone" as nearest and declined it for no_fit; it lands rather than the row being dropped (what it wanted: moves the creature in a straight line and forces each creature in that path alon)
[reskin] seat takes its clause: "Shield Wall Advance" is HANDED "fights from a shield wall" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature template: push-prone -> Actions/"Shield Wall Advance" ("The idea describes a charging line advance that pushes and knocks Prone every cr [verb: shove:idea, knock:idea, push:idea]")
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 16 already beats print's 15 at CR 6, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "When a creature misses Vashka with a melee attack roll, he instinctively slams his shield across the gap; the attacker is pushed 5 feet away from him into an adjacent unoccupied space (or knocked Prone if no space is available), breaking the press against his wall." [trait/on_being_hit/movement] [family: body-reaction] — menu: weapon-lodge (+ shelf: spider-climb, phobia, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, relentless-pursuit, bound, undead-fortitude, truth-aura, fear-aura, evasion)
[reskin] lead by this seat's own clause: trait — "command" from the clause this seat serves, not the sheet's "none"
[reskin] composed candidates on the menu: trait — composed:body-reaction:movement:t0, composed:body-reaction:movement:t1, composed:body-reaction:movement:t2, composed:body-reaction:movement:t0, composed:body-reaction:movement:t1 (the body-reaction family's options, built before the call looks)
[reskin] menu ordered by the idea's stamps: trait — idea fires on_being_hit/does movement; leading: composed:body-reaction:movement:t0 (on_being_hit/movement), composed:body-reaction:movement:t1 (on_being_hit/movement), composed:body-reaction:movement:t2 (on_being_hit/movement)
[reskin] keys would have bound: trait — pack-tactics (shield wall, ranks, never breaks ranks)
[reskin] classification handed to the fit call: shape=attack when=at_will
[reskin] closest refused: trait — "composed:body-reaction:movement:t0 [Trai" was named closest but was never on this sheet's menu (a gate refused it, or the pool did not offer it for this idea's declared trigger)
[reskin] decline reason: trait — the call answered none and names it "no_fit" — the GM's words key pack-tactics, which the pool did not offer for this idea's declared trigger (since 2026-10-27 the keys rank and gate but no longer inject)
[reskin] key match declined: trait — "pack-tactics" is keyed by the GM's shield wall+ranks+never breaks ranks and was on the call's menu, which the call read as no fit; since 2026-10-26 the words no longer seat it first — the idea's stamps order the menu — so this records a decline, not an overruled nomination
[reskin] signature miss: trait — "When a creature misses Vashka with a melee attack roll, he instinctively slams his shield across the gap; the attacker is pushed 5 feet away from him into an adjacent unoccupied space (or knocked Prone if no space is available), breaking the press against his wall." [trait/on_being_hit/movement] — the model found no template that holds it (offered: composed:body-reaction:movement:t0, composed:body-reaction:movement:t1, composed:body-reaction:movement:t2, composed:body-reaction:movement:t0, composed:body-reaction:movement:t1, weapon-lodge)
[reskin] concept-first trait skipped: pack-tactics — the GM's words key it, but the call was offered it on this seat's menu and declined
[reskin] trait bound to the concept's verb (concept-first): spider-climb — walls+wall in the user's words; the idea path had nothing
[reskin] signature template (trait): spider-climb -> Traits/"Spider Climb" ("exact concept match [verb: walls:concept, wall:concept]")
[reskin] repair: 1 clause(s) with no row — "never breaks ranks"; one targeted call with the sheet as context
[reskin] authored trait refused: "Unbroken Rank" — no mechanic in the effect; the clause folds to description
[reskin] repair answer: attacks 0, saves 0, traits 0, reactions 0, answered [], unplaced ["description:never breaks ranks"]
[reskin] clause answered in prose: "never breaks ranks" — the call read the sheet and judged it description, not a row; the words reach the description instead
[reskin] repair: the answer held no rows — the clauses stay unplaced
[reskin] weapons answered: Shield Bash = shield; Spear Point = spear
[reskin] weapon dice follow the weapon: "Punishing Spear Thrust" is a spear (d6) — "22 (4d8 + 4)" becomes "21 (5d6 + 4)", print's rule of keeping the die and scaling the count
[reskin] weapon dice follow the weapon: "Spear Point" is a spear (d6) — "22 (4d8 + 4)" becomes "21 (5d6 + 4)", print's rule of keeping the die and scaling the count
[reskin] weapon table: "Spear Point" — thrown, range 20/60
[reskin] print canon alignment: Lawful Neutral -> Neutral — the Gladiator's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Goblin, Common" -> "Common, Goblin" — the Gladiator's plus the concept's Goblin
[reskin] print canon attack: "Spear" keeps print's hybrid frame — reach 5 ft. or range 20/60 ft. (the Gladiator's weapon is thrown)
[reskin] print canon attack: "Punishing Spear Thrust" -> "Spear" — the Gladiator's own row
[reskin] print canon rows: Spear Point leave — the Gladiator has one melee row (Spear), and Multiattack reads print's
[reskin] print canon multiattack: "Vashka makes three Spear attacks. It can replace one attack with a use of Shield Bash." — the Gladiator's own
[reskin] climb speed: Climb 30 ft. — a creature that climbs difficult surfaces has a Climb Speed in print (the Vampire, the Giant Spider)
[reskin] print canon skills: "Athletics +7, Perception +4" -> "Athletics +10, Performance +5" — the Gladiator's own skills, each derived from this sheet's stat and PB
[reskin] print canon row: Actions/Shield Bash — the Gladiator's own
[reskin] class weapon: Actions/"Spear" -> "Longsword" — a fighter fights with a longsword, not the Gladiator's
[reskin] dead name still carried — "Shield Bash" names a row that is still on the sheet; no sweep
[reskin] free-row budget by card size: CR 6 sits in band 6-9, where print runs 3-5 rows (p20-p90, Multiattack excluded); this card already carries 5 fixed row(s), so the free-row budget is 0 rather than 1 — the card is already at print's high end
[reskin] darkvision withheld: a Humanoid with no species kit granting it, no word for it in the GM's own text, and no print body that has it — print gives darkvision to 1 of 26 Humanoids ("darkvision 60 ft.; Passive Perception 11" -> "Passive Perception 11")
[reskin] row binds its clause: "Spider Climb" answers "fights from a shield wall" — the keys it matched came from that clause, so the coverage credit has a receipt
[reskin] ask vs row ok: "fights from a shield wall" -> "Spider Climb" — trigger at_will
audit finding below confidence gate: Multiattack The Multiattack offers a replacement with Shield Bash while Shield Wall Advance is a separate, similar adjacent-target knockdown that is never referenced, making the intended action economy ambiguous.
audit finding below confidence gate: Spider Climb The trait grants free climbing but the name and text carry no in-block justification for a Humanoid, and no other entry expresses arachnid nature.
[reskin] audit rename: "Shield Wall Advance" -> "Shield Shove"
[reskin] seed share: 0 of 3 signature row(s) came from a seed — the sameness metric
[reskin] clause id by substring: "Riposte" carries "warlord" which is not a whole clause — the seat surgery cut it; resolved to cl_zvh3r1
[reskin] [gap] moves the creature in a straight line and forces each creature in that path along with it, plus allies joining the move — "Vashka drives the press forward: he moves up to his Speed in a straight line, and each creature in his path must succeed on a Strength saving throw or be pushed along ahead of him and knocked Prone, while each ally adjacent to him may move with him as part of the shove — the wall closes where he treads, pinning foes against terrain." — Vashka the Red [seat: action [action/save/movement]] (closest offered: push-prone) [effect: movement] [menu: herd obstacle-pull slow-bolt disarm shield-bash ground-burst terror-pulse push-prone curse-debt reveal wind-up throw-retrieve] [same-cell unoffered: reel hook-drag pull-through aggro-curse] [same-seat rejected: swallow:legality trample:role leap:role thrown-burst:role gaze-single:role snare:role reel:role condition-payoff:role execute:role seal:legality lure:role hook-drag:legality active-toll:legality pull-through:role random-ray:legality spew:role burrow-ambush:legality pacify:role escalating-dread:role snare-bolt:role sensory-strike:role thrown-burst-seed:role drain:role exploiter:legality blighted-ground:role] [landed: push-prone]
[reskin] [gap] triggers on a missed melee attack and pushes the attacker 5 feet away (or knocks it prone if no space), instead of trigg — "When a creature misses Vashka with a melee attack roll, he instinctively slams his shield across the gap; the attacker is pushed 5 feet away from him into an adjacent unoccupied space (or knocked Prone if no space is available), breaking the press against his wall." — Vashka the Red [seat: trait [trait/on_being_hit/movement]] (closest offered: composed:body-reaction:movement:t0 [Trai — NOT ON THE MENU) [effect: movement] [menu: composed:body-reaction:movement:t0 composed:body-reaction:movement:t1 composed:body-reaction:movement:t2 composed:body-reaction:movement:t0 composed:body-reaction:movement:t1 weapon-lodge] [same-cell unoffered: none] [same-seat rejected: heated-body:legality absorption:legality bloodied-burst:legality resonant-body:legality] [row dropped]
[reskin] signature outcome: 1 of 2 accepted signature pick(s) never reached the sheet — 1x the call named no template for the pick
[reskin] signature tally: 2 seat(s) -> 3 shape(s) on the sheet · 0 expressed, 0 decoration, 0 free · accepted picks lost: 1 of 2 (1x the call named no template for the pick) · path class_npc
```


---


### Hive Rot Scyther — in the run

**Concept:** A Large insectile horror. It has four scythe-arms, a spitting maw, and a shell that sheds acid. It fights by pinning prey with two arms and carving with the others.

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Hive Rot Scyther | 9 | brute-8-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- **dropped clause:** "It has four scythe-arms"
- **dropped clause:** "carving with the others"
- read: def 7 / off 9 → 8; sustained 62 (2 × Spitting Maw); nova none; dmg 62

```
Hive Rot Scyther

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

Acid Film. At the end of each of the scyther's turns, each creature in a 5-foot Emanation originating from the scyther takes 7 (2d6) Acid damage.

Actions

Multiattack. The scyther makes two attacks, using Spitting Maw or Pinning Arms in any combination. It can replace one attack with a use of Carapace Slam.

Spitting Maw. Melee Attack Roll: +8, reach 10 ft. 31 (6d8 + 4) Piercing damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 16).

Carapace Slam. Strength Saving Throw: DC 15, one creature within 5 feet that the scyther can see. Failure: 16 (3d10) Bludgeoning damage, and if the target is Medium or smaller, it has the Prone condition. Success: Half damage only.

Pinning Arms. Melee Attack Roll: +8, reach 5 ft. 31 (6d8 + 4) Piercing damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 16).

Bonus Actions

Smother. The scyther smothers one Medium or smaller creature it is grappling. While smothered, the target has the Blinded and Restrained conditions, has Total Cover against attacks and other effects outside the scyther, and takes 10 (3d6) Acid damage at the start of each of the scyther's turns. The scyther can have only one creature smothered at a time. If the scyther takes 25 damage or more on a single turn from the smothered creature, the scyther must release the target at the end of that turn, and the target exits Prone in an unoccupied space within 10 feet of the scyther. If the scyther dies, a smothered creature pulls free Prone by using 10 feet of movement.

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
- Actions/Carapace Slam — template shield-bash; library draw (seed unstamped)
- Actions/Pinning Arms — authored for this sheet; the GM's clause "It fights by pinning prey with two arms"
- Bonus Actions/Smother — binds the GM's words: smother+swallow+swallows+engulf+engulfs+devour+devours+gulp+entomb+cocoon+whelm
- Traits/Acid Film — template energy-aura; library draw (seed unstamped)

**Engine trace**

```
[path] homebrew — "A Large insectile horror. It has four scythe-arms, a spitting maw, and a shell t" (call)
[route] brute-grappler type=Monstrosity mechanics=grapple, engulf — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: on the GM's own words "pinning prey with two arms" | brute-grappler: ✓ ("pinning prey with two arms") | brute-grappler: no line key in the words — the model's read of its quote
[concept] resolve: archetype=brute type=Monstrosity themes=venomous/grasping mind=bestial style=grappler energy=Acid mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: grapple, engulf
[concept] signature elements: pinning with two scythe-arms and carving with the other two [behavior] | acid-shedding shell that burns anything nearby when struck [aura] | corrosive spitting maw [body]
[concept] identity: The acid-shelled horror opens by spitting a searing gout from its maw to stagger and blind a target, then closes to seize prey in its two lower scythe-arms while the upper pair carves it apart in the same motion; each time it is struck its flaking shell spits caustic droplets at everyone near it. It fights to the death and never abandons a held victim — it only releases a corpse to pin a fresher, still-thrashing one.
[concept] lore: Hatched in the corroded hollows beneath a ruined hive, the creature's shell sweats the same acid that dissolved its own broodmates, and it now hunts living flesh to feel them come apart under its arms.
[reskin] donor: brute-8-grappler -> CR 9
[reskin] [path] decides: homebrew (the matcher agrees)
[reskin] engulf engine: Smother — the body's own verb
[reskin] named parts: Spitting Maw (slot, Grappled) — the user's words, the engine's numbers
[reskin] named parts landed: 1 attack row(s), 0 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline declared: "the scyther" — the call's own answer (kind), built from the name
[reskin] inline form: "the scyther" — the model's own reading of the name
[reskin] the sheet's declared ask: grapple — the route call's one answer for the whole concept
[reskin] lacks asked: nothing taken away
[reskin] clauses: "A Large insectile horror" -> has (header) | "It has four scythe-arms" -> has (mechanical) [asked: attack] | "a spitting maw" -> has (mechanical) [asked: save_single] [askMechanic: dazzle] | "a shell that sheds acid" -> has (mechanical) [asked: on_being_hit/save_area] [askMechanic: retaliate] | "It fights by pinning prey with two arms" -> has (mechanical) [asked: condition] [askMechanic: grapple] | "carving with the others" -> has (mechanical) [asked: attack]
[reskin] body verdicts: 30 of 30 answered; not true of this body: active-toll, random-ray, herd, drain, rally, heated-body, false-appearance, absorption, bloodied-burst, resonant-body, adhesive, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, uncanny-sense, marking-light, sealed-body, relic-object, warded-mending, mimicry, gaze-aura, death-burst, kill-denial, life-drain
[reskin] signature idea (action): "The scyther's upper scythe-arms carve in a wide, reaping arc. Each creature of its choice within reach must make a Dexterity saving throw; on a failure, it takes Slashing damage and has the Prone condition as the blade hooks its legs from under it." [action/save/condition] [family: nova] — menu: swallow, leap, condition-payoff, shield-bash, ground-burst, spew, thrown-burst-seed, wind-up, exploiter, trample, thrown-burst, execute, lure, pacify, snare-bolt (+ shelf: shell-withdraw, second-wind, aggro-curse, own-turn-punisher, self-invisibility, focus, coating, affliction, contagion, stunning-strike, charge-push, pounce)
[reskin] composed candidates: none action — the nova family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: action — idea fires save/does condition; leading: swallow (save/condition), shield-bash (save/condition), lure (save/condition)
[reskin] keys would have bound: action — exploiter, spew, snare-bolt, shell-withdraw (pinned, spits, spit, shell)
[reskin] classification handed to the fit call: mechanic=grapple, engulf shape=attack
[reskin] word match declined by the call: swallow — the key word does not mean the mechanic here
[reskin] closest accepted: action — the call refused every template but named "shield-bash" as nearest and declined it for no_fit; it lands rather than the row being dropped (what it wanted: a wide arc sweeping each creature of its choice within reach into Prone, not one)
[reskin] free signature row: action — "shield-bash" is the call's nearest after it refused every template, so it ships as DECORATION: no receipt, no element claim, counted in the metric. Earns no clause credit
[reskin] value check: "Reaping Arc" EV 16.8 vs floor 16.6 (one attack of 2) — added Success: Half
[reskin] signature template: shield-bash -> Actions/"Reaping Arc" ("The idea is a Dexterity-save reaping arc that deals Slashing damage and knocks t [shape fit, no verb match]")
[reskin] signature idea (trait): "The scyther's shell sweats a film of caustic acid that pools around it. The ground within 10 feet of it is difficult terrain for other creatures, and a creature that starts its turn there takes Acid damage as the film eats through its footing." [trait/start_of_turn/damage] [family: zone] — menu: spider-climb, phobia, energy-aura, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, relentless-pursuit, bound, undead-fortitude, truth-aura, fear-aura (+ shelf: weapon-lodge)
[reskin] lead by this seat's own clause: trait — "retaliate" from the clause this seat serves, not the sheet's "grapple"
[reskin] composed candidates on the menu: trait — composed:zone:damage (the zone family's options, built before the call looks)
[reskin] menu ordered by the idea's stamps: trait — idea fires start_of_turn/does damage; leading: energy-aura (start_of_turn/damage), composed:zone:damage (start_of_turn/damage), truth-aura (start_of_turn/condition)
[reskin] keys would have bound: trait — fear-aura (horror)
[reskin] classification handed to the fit call: mechanic=grapple, engulf shape=attack
[reskin] pick kept on the GM's own words: trait — "energy-aura" has no key-table verb, but the call quotes "shell that sheds acid" from the description
[reskin] signature template (trait): energy-aura -> Traits/"Acid Film" ("The scyther's shell sheds acid that pools around it, damaging creatures near it  [shape fit, no verb match]")
[reskin] one mechanic, one name: Actions/"Reaping Arc" -> "Shield Bash" — this row is shield-bash and does what every shield-bash row does; a bespoke name would promise more than the text delivers
[reskin] repair: 2 clause(s) with no row — "It fights by pinning prey with two arms", "carving with the others"; one targeted call with the sheet as context
[reskin] repair answer: attacks 1, saves 0, traits 0, reactions 0, answered [{"clause":"carving with the others","row":"Spitting Maw"}], unplaced []
[reskin] clause already answered: "carving with the others" is carried by "Spitting Maw" in different words — the call read the sheet and declined to answer it twice
[reskin] repaired sheet: 2 attack row(s), 0 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] weapons answered: Scythe-Arms = none
[reskin] speed by concept: added Climb 40 ft. — the concept's movement set decides
[reskin] languages held: None stands — INT 4 on a Monstrosity speaks nothing, whatever the mind read said
[reskin] name-canon stands down: the path answered homebrew on "A Large insectile horror. It has four sc" and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] multiattack replacement clause: It can replace one attack with a use of Shield Bash.
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 1) — "Shield Bash" [action/save/condition]
[reskin] asked but unanswered: "a shell that sheds acid" asked for on_being_hit and no row binds the clause
[reskin] sameness: 1 of 1 free row(s) express nothing their rules carry — counted as decoration ("Shield Bash")
[reskin] audit rename: "Shield Bash" -> "Carapace Slam"
[reskin] seed share: 0 of 2 signature row(s) came from a seed — the sameness metric
[reskin] [gap] a wide arc sweeping each creature of its choice within reach into Prone, not one creature within 5 feet — "The scyther's upper scythe-arms carve in a wide, reaping arc. Each creature of its choice within reach must make a Dexterity saving throw; on a failure, it takes Slashing damage and has the Prone condition as the blade hooks its legs from under it." — Hive Rot Scyther [seat: action [action/save/condition]] (closest offered: shield-bash) [effect: movement] [menu: swallow shield-bash lure pacify snare-bolt leap condition-payoff ground-burst spew thrown-burst-seed wind-up exploiter trample thrown-burst execute] [same-cell unoffered: gaze-single snare seal random-ray escalating-dread terror-pulse sensory-strike push-prone reveal] [same-seat rejected: gaze-single:role snare:role reel:role seal:role hook-drag:legality active-toll:legality pull-through:role random-ray:legality burrow-ambush:legality obstacle-pull:role escalating-dread:legality terror-pulse:legality slow-bolt:role sensory-strike:role disarm:role push-prone:legality herd:legality drain:legality curse-debt:role reveal:role blighted-ground:role] [landed: shield-bash]
[reskin] signature tally: 2 seat(s) -> 2 shape(s) on the sheet · 0 expressed, 1 decoration, 1 free · accepted picks lost: 0 of 1 · path homebrew
[reskin] record reconciled: "Carapace Slam" no longer imposes Prone — the clause left, so the record goes with it
```


---


### Mirewitch Sable — in the run

**Concept:** a marsh witch who curses trespassers, cr 7

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Mirewitch Sable | 7 | caster-8-binder | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- **dropped clause:** "curses trespassers"
- read: def 3 / off 7 → 5; sustained 48 (3 × Arcane Burst); nova none; dmg 48

```
Mirewitch Sable

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

Multiattack. The mirewitch makes three Arcane Burst attacks.

Arcane Burst. Melee or Ranged Attack Roll: +6, reach 5 ft. or range 120 ft. 16 (3d8 + 3) Force damage.

Spellcasting. The mirewitch casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 14):

- At Will: Detect Magic, Light, Mage Armor, Mage Hand, Prestidigitation
- 2/Day Each: Fireball, Invisibility
- 1/Day Each: Cone of Cold, Fly

Transfixing Regard (2/Day). Constitution Saving Throw: DC 14, one creature within 60 feet. Failure: The target has the Incapacitated condition and its Speed is 0 until the end of its next turn.

Bonus Actions

Misty Step (3/Day). The mirewitch casts Misty Step, using the same spellcasting ability as Spellcasting.

Reactions

Protective Magic (3/Day). The mirewitch casts Counterspell or Shield in response to the spell's trigger, using the same spellcasting ability as Spellcasting.

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
- Actions/Transfixing Regard — template pacify; library draw (seed unstamped)
- Reactions/Protective Magic — mage kit; the GM's clause "witch"
- Bonus Actions/Misty Step — print's own row

**Engine trace**

```
[path] class_npc — class mage — "witch" (call)
[route] caster-binder (controller) type=Humanoid mechanics=none — casts: implied by the kind — "a marsh witch who curses trespassers" | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | caster-binder: ✓ ("curses trespassers") | caster-binder: key "curses" (class verb)
[concept] hints: binder→style ✓ ("curses trespassers")
[concept] resolve: archetype=caster type=Humanoid themes=beguiling/uncanny mind=sapient style=binder energy=Poison mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: cursing hexes that steal a trespasser's actions [behavior] | a brine-soaked body that belongs to the bog [body] | lurking unseen in the reeds [aura]
[concept] identity: The marsh witch opens a fight from the reeds, laying a cursing ray on the loudest trespasser to strip away their actions before blades ever clear leather. Each round she keeps her distance, stacking hexes and conditions that bind, blind, or stagger intruders so the fen itself finishes what her wits started. She is patient and cruel, retreating into the muck when bloodied but never fleeing far — she has drowned bolder trespassers before.
[concept] lore: A hedge-witch who bargained with the bog for long life and got it, she now claims the marsh as her parish and hexes every stranger who crosses its boundary stones.
[reskin] energy withheld: Poison on a Humanoid with no Poison in the concept's own words (fixed phrases read first)
[reskin] [path] class body: the mage stands on the Mage — the class's own print block, nearest CR 7
[reskin] print canon defenses: HP 108 -> 81, AC 15 -> 15 — the Mage's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 9, DEX 14, CON 11, INT 17, WIS 12, CHA 11 — the Mage's at its own CR; attack +7 -> +6, DC 14 (print's)
[reskin] donor: caster-8-binder -> CR 7
[reskin] [path] decides: class_npc on the Mage · class mage (the matcher would have said homebrew)
[reskin] print canon: "a marsh witch who curses trespassers, cr 7" heads on the Mage — print's rows ride along; the seat stays
[reskin] repair round 1: 4 defect(s) — name "Drowned Claw" is a natural weapon on a Humanoid whose concept gives it none — a Humanoid swings a weapon (Scimitar, Club, Spear) | "Drowned Claw" deals Necrotic on a Humanoid whose concept names no Necrotic — a name is not a warrant; use a physical type | "Hex Bolt" deals Necrotic on a Humanoid whose concept names no Necrotic — a name is not a warrant; use a physical type | "Withering Ray" deals Necrotic on a Humanoid whose concept names no Necrotic — a name is not a warrant; use a physical type
[reskin] class kit: mage — "witch": Protective Magic (3/Day) (Mage/Protective Magic)
[reskin] inline declared: "the mirewitch" — the call's own answer (kind), built from the name
[reskin] inline form: "the mirewitch" — the model's own reading of the name
[reskin] control spell gated to daily — Bestow Curse (level 3 control at will is print's CR 13+ shape; at CR 7 it is 1/Day)
[reskin] daily spell dropped — Blight (36 avg vs 17 per-hit; print's only daily damage spell is the Adult Red's Fireball at ~1.1x)
[reskin] spell DC coherence: DC 14 -> 11 off Charisma 11 (print's array stays)
[reskin] the sheet's declared ask: curse — the route call's one answer for the whole concept
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a marsh witch" -> has (descriptive), head | "curses trespassers" -> has (mechanical) [asked: condition] [askMechanic: curse] | "cr 7" -> has (header)
[reskin] extraction: 1 of 3 model clauses quote nothing the user typed and leave the record ("cr 7")
[reskin] body verdicts: 31 of 31 answered; not true of this body: seal, wail, active-toll, random-ray, spew, snare-bolt, herd, zone-seed, rally, phase-slip, false-appearance, absorption, bloodied-burst, resonant-body, aberrant-ground, faultless-tracker, web-walker, uncanny-sense, marking-light, sealed-body, relic-object, warded-mending, mimicry, gaze-aura, blurred-form, death-burst
[reskin] signature idea (action): "The mirewitch spits a bog-charm hex at one creature she can see within range: on a failed Charisma saving throw, the target's next action is stolen by the fen — it must spend the Action it intends to take on its next turn on nothing, as murk-memories drag its limbs to a halt, and the hex then leaps to a second creature of the witch's choosing that she can see." [action/save/condition] [family: mark] — menu: condition-payoff, lure, ground-burst, obstacle-pull, pacify, escalating-dread, slow-bolt, sensory-strike, thrown-burst-seed, drain, curse-debt, reveal, wind-up, blighted-ground, shield-bash, terror-pulse, push-prone (+ shelf: delayed-brand, lay-on-hands, aggro-curse, self-invisibility, snap-shot, life-drain, bolt-restrain, bolt-drag, bolt-mark, stunning-strike, pounce)
[reskin] composed candidates: none action — the mark family has no grammar — composable families are payoff, body-reaction, zone
[reskin] declared mechanic leads the menu: action — curse: curse-debt
[reskin] menu ordered by the idea's stamps: action — idea fires save/does condition; leading: curse-debt (save/damage), lure (save/condition), pacify (save/condition)
[reskin] classification handed to the fit call: shape=condition
[reskin] word match declined by the call: curse-debt, lure, escalating-dread, sensory-strike, reveal, shield-bash, terror-pulse, push-prone, condition-payoff — the key word does not mean the mechanic here
[reskin] closest accepted: action — the call refused every template but named "pacify" as nearest and declined it for no_fit; it lands rather than the row being dropped (what it wanted: makes the target spend its next Action on nothing, hopping to a second creature)
[reskin] free signature row: action — "pacify" is the call's nearest after it refused every template, so it ships as DECORATION: no receipt, no element claim, counted in the metric. Earns no clause credit
[reskin] seat takes its clause: "Bog Charm Hex (2/Day)" is HANDED "curses trespassers" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature template: pacify -> Actions/"Bog Charm Hex (2/Day)" ("The idea is a Charisma-save curse that steals the target's next action, but no t [shape fit, no verb match]")
[reskin] signature idea (trait): "The mirewitch's body is brine-soaked and bog-claimed: wherever she stands, the ground beneath her feet turns to sucking mire, and each creature that starts its turn within reach of her has its Speed halved until the start of its next turn as the fen clutches at its ankles." [trait/start_of_turn/movement] [family: zone] — menu: spider-climb, phobia, terrain-walk, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, shielded-mind, relentless-pursuit, bound, undead-fortitude, truth-aura, fear-aura, kill-denial, berserk
[reskin] composed candidates on the menu: trait — composed:zone:terrain (the zone family's options, built before the call looks)
[reskin] menu ordered by the idea's stamps: trait — idea fires start_of_turn/does movement; leading: composed:zone:terrain (start_of_turn/movement), truth-aura (start_of_turn/condition), fear-aura (start_of_turn/condition)
[reskin] keys would have bound: trait — terrain-walk (marsh)
[reskin] classification handed to the fit call: shape=condition
[reskin] word match declined by the call: composed:zone:terrain, terrain-walk, bound — the key word does not mean the mechanic here
[reskin] closest accepted: trait — the call refused every template but named "truth-aura" as nearest and declined it for no_fit; it lands rather than the row being dropped (what it wanted: imposes a curse on creatures that enter her territory)
[reskin] free signature row: trait — "truth-aura" is the call's nearest after it refused every template, so it ships as DECORATION: no receipt, no element claim, counted in the metric. Earns no clause credit
[reskin] free signature row: "Trespasser's Curse" — the call's nearest after it refused every template, so it ships as DECORATION: no receipt, no element claim, counted in the metric. Earns no clause credit
[reskin] seat takes its clause: "Trespasser's Curse" is HANDED "curses trespassers" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature template (trait): truth-aura -> Traits/"Trespasser's Curse" ("The idea's pulling mire is a movement/terrain effect, but the clause the GM actu [shape fit, no verb match]")
[reskin] one mechanic, one name: Actions/"Bog Charm Hex (2/Day)" -> "Transfixing Regard (2/Day)" — this row is pacify and does what every pacify row does; a bespoke name would promise more than the text delivers
[reskin] weapons answered: Drowned Claw = none; Hex Bolt = none; Withering Ray = none; Bogbound Curse = none
[reskin] weapon declined: "Hex Bolt" reads crossbow from its name, but the call answered none — the row carries no weapon
[reskin] weapon table: "Hex Bolt" — a launcher, never thrown, range 80/320
[reskin] print canon alignment: Neutral Evil -> Neutral — the Mage's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common, Sylvan" -> "Common and any three languages, Sylvan" — the Mage's plus the concept's Sylvan
[reskin] print canon attack: "Arcane Burst" keeps print's hybrid frame — reach 5 ft. or range 120 ft. (the Mage's weapon is thrown)
[reskin] print canon attack: "Drowned Claw" -> "Arcane Burst" — the Mage's own row
[reskin] print canon multiattack: "the mirewitch makes three Arcane Burst attacks." — the Mage's own
[reskin] ranged row off: "Hex Bolt" leaves — the Mage carries no ranged row and the words name none
[reskin] print canon skills: "Perception +4, Deception +3" -> "Arcana +6, History +6, Perception +4" — the Mage's own skills, each derived from this sheet's stat and PB
[reskin] print canon: chassis row leaves — Actions/"Withering Ray" — the Mage prints no row for it and no path stage claimed it
[reskin] print canon row: Actions/Spellcasting — print's own list replaces the chassis's
[reskin] print canon row: Bonus Actions/Misty Step (3/Day) — the Mage's own
[reskin] free row over budget: Traits/"Trespasser's Curse" leaves at ship — this sheet's free-row budget (1) is spent by a row that SHIPPED
[reskin] free-row budget: 2 candidate(s) reached the finished sheet, 1 kept (budget 1) — "Transfixing Regard" [action/save/condition]
[reskin] save re-derived after a retype: Actions/Transfixing Regard — a Wisdom save for a condition the row IMPOSES, which calls for Constitution (A2: a condition the row merely requires does not pick the stat)
[reskin] sameness: 1 of 1 free row(s) express nothing their rules carry — counted as decoration ("Transfixing Regard")
[reskin] audit rewrite blocked — "Multiattack" is engine-authored chassis text
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] clause id by substring: "Protective Magic (3/Day)" carries "witch" which is not a whole clause — the seat surgery cut it; resolved to cl_1enkq57
[reskin] [gap] makes the target spend its next Action on nothing, hopping to a second creature — "The mirewitch spits a bog-charm hex at one creature she can see within range: on a failed Charisma saving throw, the target's next action is stolen by the fen — it must spend the Action it intends to take on its next turn on nothing, as murk-memories drag its limbs to a halt, and the hex then leaps to a second creature of the witch's choosing that she can see." — Mirewitch Sable [seat: action [action/save/condition]] (closest offered: pacify) [effect: condition] [menu: curse-debt lure pacify escalating-dread sensory-strike reveal shield-bash terror-pulse push-prone condition-payoff ground-burst obstacle-pull slow-bolt thrown-burst-seed drain wind-up blighted-ground bolt-drag] [same-cell unoffered: swallow gaze-single snare seal random-ray snare-bolt] [same-seat rejected: swallow:role trample:role leap:role thrown-burst:style gaze-single:style snare:style reel:style execute:style seal:legality hook-drag:role active-toll:legality pull-through:role random-ray:legality spew:legality burrow-ambush:legality snare-bolt:legality disarm:role herd:legality exploiter:role] [landed: pacify]
[reskin] [gap] imposes a curse on creatures that enter her territory — "The mirewitch's body is brine-soaked and bog-claimed: wherever she stands, the ground beneath her feet turns to sucking mire, and each creature that starts its turn within reach of her has its Speed halved until the start of its next turn as the fen clutches at its ankles." — Mirewitch Sable [seat: trait [trait/start_of_turn/movement]] (closest offered: truth-aura) [effect: condition] [menu: composed:zone:terrain truth-aura fear-aura spider-climb terrain-walk relentless-pursuit bound phobia bloodied-fury blood-frenzy pack-tactics death-restoration shielded-mind undead-fortitude kill-denial berserk] [same-cell unoffered: none] [same-seat rejected: energy-aura:legality noxious-aura:legality warded-mending:legality gaze-aura:legality] [VETOED AFTER ACCEPTANCE: truth-aura never reached the sheet — died at the free-row budget (only 1 free row(s) allowed on this sheet)]
[reskin] signature outcome: 1 of 2 accepted signature pick(s) never reached the sheet — 1x the free-row budget
[reskin] signature tally: 2 seat(s) -> 1 shape(s) on the sheet · 0 expressed, 1 decoration, 1 free · accepted picks lost: 1 of 2 (1x the free-row budget) · path class_npc
```


---


### Defrocked Templar — in the run

**Concept:** a templar priest with a mace and no magic at all

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Defrocked Templar | 6 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 4 / off 8 → 6; sustained 51 (3 × Mace); nova none; dmg 51

```
Defrocked Templar

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

Aura of Authority. While in a 10-foot Emanation originating from the templar, the templar and its allies have Advantage on attack rolls and saving throws, provided the templar doesn't have the Incapacitated condition.

Actions

Multiattack. The templar makes three Mace attacks. It can replace one attack with a use of Shield Bash.

Mace. Melee Attack Roll: +7, reach 5 ft. 17 (3d8 + 4) Bludgeoning damage, and the target has Disadvantage on its next attack roll before the start of the templar's next turn.

Shield Shove. Strength Saving Throw: DC 15, one creature within 5 feet. Failure: The target is pushed up to 15 feet away from the templar and has the Prone condition.

Shield Bash. Strength Saving Throw: DC 15, one creature within 5 feet that the templar can see. Failure: 9 (2d4 + 4) Bludgeoning damage. If the target is a Medium or smaller creature, it has the Prone condition.

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
- Actions/Shield Shove — template push-prone; library draw (seed unstamped); binds the GM's words: shove+push
- Actions/Shield Bash — print's own row

**Engine trace**

```
[path] class_npc — class paladin — "templar" (call)
[route] defender type=Humanoid mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | defender: ✓ ("a templar priest with a mace") | defender: no line key in the words — the model's read of its quote
[concept] resolve: archetype=defender type=Humanoid themes=armed/forged mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: mace blows delivered with no divine aid [behavior] | shield-and-armor hold that refuses to yield ground [body] | smothering aura of joyless devotion [aura]
[concept] identity: A temple enforcer stripped of every blessing he once channeled, this priest now trusts only the iron in his fist and the wall at his back, stepping forward to plant himself between his flock and whatever threatens it. Each round he strikes with his mace like a man hammering a nail — short, brutal, economical — then draws aggrieved targets onto his shield so they cannot reach anyone else. He does not break, does not flee, and does not gloat; when bloodied he simply stops asking for surrender.
[concept] lore: Defrocked for a heresy he refuses to recant, this templar was left his mace and his armor and nothing else, and he now guards the last chapel that will still have him with the stubbornness of a faith that has nothing left but hands.
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
[reskin] chassis row off: Actions/"Backhand" leaves — the GM named a melee weapon (Mace); one weapon, one rule set
[reskin] class kit: paladin — "templar": Aura of Authority (Hobgoblin Captain/Aura of Authority)
[reskin] inline declared: "the templar" — the call's own answer (kind), built from the name
[reskin] inline form: "the templar" — the model's own reading of the name
[reskin] the sheet's declared ask: none — the route call named no mechanic
[reskin] lacks asked: "no magic at all"
[reskin] clauses: "a templar priest with a mace" -> has (mechanical) [asked: attack] | "no magic at all" -> LACKS (mechanical)
[reskin] body verdicts: 25 of 25 answered; not true of this body: seal, active-toll, random-ray, herd, shell-withdraw, false-appearance, absorption, bloodied-burst, resonant-body, adhesive, terrain-walk, aberrant-ground, faultless-tracker, web-walker, uncanny-sense, marking-light, sealed-body, mimicry, gaze-aura, kill-denial, hook-rider, life-drain
[reskin] signature idea (action): "The templar drives his shield into a creature within reach and shoves it back, then plants his feet in the vacated space. The target must succeed on a Strength saving throw or be pushed up to 10 feet away and have the Prone condition; whether it saves or not, the templar can move up to 10 feet to occupy the space the target left, provided he ends this movement closer to the target than he began." [action/save/movement] [family: sentinel] — menu: throw-retrieve, shield-bash, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, curse-debt, reveal, wind-up (+ shelf: patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, riposte, stunning-strike, charge-push)
[reskin] composed candidates: none action — the sentinel family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: action — idea fires save/does movement; leading: obstacle-pull (save/movement), slow-bolt (save/movement), disarm (save/movement)
[reskin] classification handed to the fit call: shape=attack
[reskin] word match declined by the call: obstacle-pull, slow-bolt, disarm, ground-burst, terror-pulse, curse-debt, reveal, wind-up, rally, throw-retrieve — the key word does not mean the mechanic here
[reskin] free signature row: "Shield Shove" — a print body takes only what the user's words ask, but the call names the element it expresses: "shield-and-armor hold that refuses to yield ground". Earns no clause credit; the budget settles on the finished sheet
[reskin] signature template: push-prone -> Actions/"Shield Shove" ("The idea has the templar drive his shield into a creature within reach, shove it [verb: shove:idea, push:idea]")
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 16 already beats print's 15 at CR 6, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "While the templar is standing on ground he has not left since the start of his last turn, attack rolls against him have Disadvantage, and he has Advantage on saving throws to avoid being moved or knocked Prone. The moment he moves, this hold breaks until he roots himself again." [trait/always/defense] [family: zone] — menu: spider-climb, phobia, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, relentless-pursuit, bound, relic-object, warded-mending, guarded-stance, undead-fortitude, truth-aura, fear-aura, evasion
[reskin] verb gate stands down: trait — no template shares a verb, but 6 template(s) whose declared stamps match the idea (always/defense): bloodied-fury, death-restoration, shielded-mind, relic-object, undead-fortitude, evasion; the declared data is the warrant and the call is worth making
[reskin] composed candidates: none trait — the zone family has no payload that does "defense" (it offers damage, condition, movement)
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does defense; leading: bloodied-fury (always/defense), death-restoration (always/defense), shielded-mind (always/defense)
[reskin] classification handed to the fit call: shape=attack
[reskin] word match declined by the call: blood-frenzy, pack-tactics, bloodied-fury, bound, spider-climb, relentless-pursuit — the key word does not mean the mechanic here
[reskin] closest refused: trait — "guarded-stance" was named closest but was never on this sheet's menu (a gate refused it, or the pool did not offer it for this idea's declared trigger)
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "While the templar is standing on ground he has not left since the start of his last turn, attack rolls against him have Disadvantage, and he has Advantage on saving throws to avoid being moved or knocked Prone. The moment he moves, this hold breaks until he roots himself again." [trait/always/defense] — the model found no template that holds it (offered: bloodied-fury, death-restoration, shielded-mind, relic-object, guarded-stance, undead-fortitude, evasion, spider-climb, phobia, blood-frenzy, pack-tactics, berserk, relentless-pursuit, bound, warded-mending, truth-aura, fear-aura)
[reskin] weapons answered: Mace = mace; Backhand = none
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] print canon alignment: Lawful Neutral -> Neutral — the Gladiator's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon multiattack: "the templar makes three Spear attacks. It can replace one attack with a use of Shield Bash." — the Gladiator's own
[reskin] print canon skills: "Athletics +7, Perception +4" -> "Athletics +10, Performance +5" — the Gladiator's own skills, each derived from this sheet's stat and PB
[reskin] print canon row: Actions/Shield Bash — the Gladiator's own
[reskin] multiattack reconciled: "Spear" is no row on this sheet — the Multiattack cites "Mace" instead
[reskin] dead name still carried — "Shield Bash" names a row that is still on the sheet; no sweep
[reskin] final price: print's Multiattack: the round ran 66 against the card's 45 — the attack rows re-solve at 72% (3 attacks off one row after a supersede)
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 1) — "Shield Shove" [action/save/condition]
[reskin] element expressed: Shield Shove carries "shield-and-armor hold that refuses to yield ground" — "The target is pushed up to 15 feet away from the templar and has the Prone condi"
audit finding below confidence gate: Multiattack Multiattack references Shield Bash, but Shield Shove (the working push/Prone option) is never usable in the routine and Shield Bash duplicates its damage-less-only variant, leaving Shield Shove orphaned from the attack line it appears designed for.
audit finding below confidence gate: Mace Entry is named 'Mace' but imposes a mace-unrelated lingering attack penalty with no flavor mapping; the name promises a plain weapon strike while the text carries a debuff mechanic.
[reskin] audit rewrite blocked — "Multiattack" is engine-authored chassis text
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] clause id by substring: "Aura of Authority" carries "templar" which is not a whole clause — the seat surgery cut it; resolved to cl_1yjcdus
[reskin] [gap] grants Disadvantage on attacks against the creature and Advantage on saves against being moved or knocked Prone only whi — "While the templar is standing on ground he has not left since the start of his last turn, attack rolls against him have Disadvantage, and he has Advantage on saving throws to avoid being moved or knocked Prone. The moment he moves, this hold breaks until he roots himself again." — Defrocked Templar [seat: trait [trait/always/defense]] (closest offered: guarded-stance) [effect: defense] [menu: bloodied-fury death-restoration shielded-mind relic-object guarded-stance undead-fortitude evasion spider-climb phobia blood-frenzy pack-tactics berserk relentless-pursuit bound warded-mending truth-aura fear-aura] [same-cell unoffered: false-appearance shell-withdraw uncanny-sense patient-defense sealed-body mimicry blurred-form] [same-seat rejected: false-appearance:legality adhesive:legality terrain-walk:legality aberrant-ground:legality faultless-tracker:legality web-walker:legality uncanny-sense:legality earth-glide:legality tunneler:legality marking-light:legality sealed-body:legality mimicry:legality assassinate:role blurred-form:role death-burst:role kill-denial:legality] [row dropped]
[reskin] signature outcome: 1 of 1 accepted signature pick(s) never reached the sheet — 1x the call named no template for the pick
[reskin] signature tally: 2 seat(s) -> 1 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 1 of 1 (1x the call named no template for the pick) · path class_npc
[reskin] lack took nothing: "no magic at all" removed no row and the call named no roll it spoils (costs: (unanswered)) — no flaw row, and the gap list carries it
```


---


### Squallwing Drake — in the run

**Concept:** a young storm drake whose breath is a rolling wall of thunder

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Squallwing Drake | 7 | dragon-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 5 / off 8 → 6.5; sustained 34 (2 × Claw); nova Rolling Thunder 42; dmg 51

```
Squallwing Drake

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

Multiattack. The drake makes two Claw attacks. It can replace one attack with a use of Shield Bash.

Claw. Melee Attack Roll: +7, reach 5 ft. 17 (3d8 + 4) Slashing damage.

Rolling Thunder (Recharge 5-6). Constitution Saving Throw: DC 15, each creature in a 15-foot Cone. Failure: 42 (12d6) Thunder damage. Success: Half damage.

Shield Bash. Strength Saving Throw: DC 15, one creature within 5 feet that the drake can see. Failure: 9 (2d8) Bludgeoning damage, and if the target is Medium or smaller, it has the Prone condition. Success: Half damage only.

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
- Actions/Rolling Thunder — the chassis
- Actions/Shield Bash — template shield-bash; library draw (seed unstamped)

**Engine trace**

```
[path] homebrew — "a young storm drake whose breath is a rolling wall of thunder" (call)
[route] dragon type=Dragon mechanics=breath — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | dragon: ✓ ("a young storm drake") | dragon: key "drake" (class body)
[concept] hints: dragon→body ✓ ("a young storm drake, true dragon body") | breath→mechanics ✓ ("its breath is a rolling wall")
[concept] resolve: archetype=dragon type=Dragon themes=draconic/breath mind=sapient style=— energy=Thunder mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: breath
[concept] signature elements: rolling wall of thunder breath [behavior] | storm-forged scaled hide crackling with static [body] | the leaving of deafened, bowled-over prey [aura]
[concept] identity: The young storm drake opens by announcing itself with a rolling wall of thunder that crashes across the field, bowling over and deafening anything in its path before it stoops on the scattered survivors. Every round after, it circles overhead trailing its breath across the ground in wavering barricades, then dives claws-first to snatch and worry the same prey it just deafened. Confident and storm-proud, it toys with a foe it has blinded with sound but breaks and flees screaming toward its cloud-roost the moment it is bloodied.
[concept] lore: Hatched in the boiling thunderheads of a high storm crag, the young storm drake rides the front of the squalls that bear it and wants only to hear the rolling silence after its own thunder.
[reskin] body type: dragon — the body outranks the role (recorded: dragon)
[reskin] donor: dragon-2 -> CR 7
[reskin] [path] decides: homebrew (the matcher agrees)
[reskin] name_element answered: Squallwing Drake = imagery
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline declared: "the drake" — the call's own answer (kind), built from the name
[reskin] inline form: "the drake" — the model's own reading of the name
[reskin] save dc derived: DC 14 -> 15 (8 + PB 3 + the sheet's best 4) — no stat on the sheet reached it
[reskin] the sheet's declared ask: breath — the route call's one answer for the whole concept
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a young storm drake whose breath is a rolling wall of thunder" -> has (mechanical) [asked: save_area] [askMechanic: breath]
[reskin] body verdicts: 33 of 33 answered; not true of this body: gaze-single, snare, zone, seal, herd, drain, shell-withdraw, rally, coating, heated-body, false-appearance, absorption, bloodied-burst, adhesive, terrain-walk, aberrant-ground, faultless-tracker, web-walker, energy-aura, noxious-aura, uncanny-sense, marking-light, sealed-body, relic-object, warded-mending, mimicry, gaze-aura, blurred-form, death-burst, kill-denial, hook-rider, life-drain
[reskin] menu pruned: action — escalating-dread, terror-pulse, push-prone, thrown-burst-seed, pacify, sensory-strike, curse-debt, reveal, aggro-curse, own-turn-punisher, self-invisibility, focus (the sheet cannot render them)
[reskin] signature idea (action): "The drake exhales a billowing wall of storm-cloud that stretches in a line along the ground. Each creature in the wall's space when it appears must succeed on a Constitution saving throw or be Deafened for 1 minute; a Deafened creature repeats the save at the end of each of its turns, ending the effect on itself on a success. The wall remains until the start of the drake's next turn, and a creatur" [action/save/condition] [family: zone] — menu: execute, shield-bash, lure (+ shelf: rampage, lay-on-hands, second-wind, affliction, contagion, stunning-strike, charge-push, pounce, charge)
[reskin] composed candidates: none action — the zone family composes a trait and this is the action seat
[reskin] menu ordered by the idea's stamps: action — idea fires save/does condition; leading: shield-bash (save/condition), lure (save/condition), execute (save/damage)
[reskin] classification handed to the fit call: mechanic=breath shape=save_area
[reskin] word match declined by the call: shield-bash, lure, execute — the key word does not mean the mechanic here
[reskin] closest accepted: action — the call refused every template but named "shield-bash" as nearest and declined it for no_fit; it lands rather than the row being dropped (what it wanted: a line-shaped breath wall that deafens every creature in its space on a failed C)
[reskin] pick kept on the GM's own words: action — "shield-bash" has no key-table verb, but the call quotes "a young storm drake whose breath is a rolling wall of thunder" from the description
[reskin] value check: "Rolling Thunder Wall" EV 9.5 vs floor 9.4 (one attack of 2) — added Success: Half
[reskin] signature template: shield-bash -> Actions/"Rolling Thunder Wall" ("The idea is a breath wall that deafens those caught in it — an area Constitution [shape fit, no verb match]")
[reskin] signature idea (trait): "The drake's scaled hide crackles with static; when it is hit by a melee attack, the attacker takes Thunder damage equal to the drake's PB." [trait/on_being_hit/damage] [family: body-reaction] — menu: resonant-body, weapon-lodge (+ shelf: spider-climb, phobia, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, relentless-pursuit, bound, undead-fortitude, truth-aura, fear-aura)
[reskin] composed candidates on the menu: trait — composed:body-reaction:damage:t0, composed:body-reaction:damage:t1, composed:body-reaction:damage:t2 (the body-reaction family's options, built before the call looks)
[reskin] menu ordered by the idea's stamps: trait — idea fires on_being_hit/does damage; leading: resonant-body (on_being_hit/damage), composed:body-reaction:damage:t0 (on_being_hit/damage), composed:body-reaction:damage:t1 (on_being_hit/damage)
[reskin] keys would have bound: trait — spider-climb (walls, wall)
[reskin] classification handed to the fit call: mechanic=breath shape=save_area
[reskin] word match declined by the call: resonant-body, weapon-lodge — the key word does not mean the mechanic here
[reskin] closest refused: trait — "composed:body-reaction:damage:t0" was named closest but was never on this sheet's menu (a gate refused it, or the pool did not offer it for this idea's declared trigger)
[reskin] decline reason: trait — the call answered none and names it "no_fit" — the GM's words key spider-climb, which the pool did not offer for this idea's declared trigger (since 2026-10-27 the keys rank and gate but no longer inject)
[reskin] key match declined: trait — "spider-climb" is keyed by the GM's walls+wall and was on the call's menu, which the call read as no fit; since 2026-10-26 the words no longer seat it first — the idea's stamps order the menu — so this records a decline, not an overruled nomination
[reskin] signature miss: trait — "The drake's scaled hide crackles with static; when it is hit by a melee attack, the attacker takes Thunder damage equal to the drake's PB." [trait/on_being_hit/damage] — the model found no template that holds it (offered: resonant-body, composed:body-reaction:damage:t0, composed:body-reaction:damage:t1, composed:body-reaction:damage:t2, weapon-lodge)
[reskin] concept-first trait skipped: spider-climb — the GM's words key it, but the call was offered it on this seat's menu and declined
[reskin] one mechanic, one name: Actions/"Rolling Thunder Wall" -> "Shield Bash" — this row is shield-bash and does what every shield-bash row does; a bespoke name would promise more than the text delivers
[reskin] weapons answered: Claw = none; Rolling Thunder = none; Thunderclap Blast = none
[reskin] chassis nova: "Rolling Thunder (Recharge 5-6)" — the dragon-2's own nova row (its "Breath Weapon", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] element immunity: Thunder (merged into the header write)
[reskin] dragon senses raised to tier: blindsight 30 added
[reskin] dragon senses raised to tier: darkvision 60 -> 120
[reskin] dragon languages: Draconic added (42/42 print dragons speak it)
[reskin] immunities stamped for type: Dragon -> Thunder
[reskin] name-canon stands down: the path answered homebrew on "a young storm drake whose breath is a ro" and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] multiattack replacement clause: It can replace one attack with a use of Shield Bash.
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] [gap] a line-shaped breath wall that deafens every creature in its space on a failed Constitution save, repeating the save eac — "The drake exhales a billowing wall of storm-cloud that stretches in a line along the ground. Each creature in the wall's space when it appears must succeed on a Constitution saving throw or be Deafened for 1 minute; a Deafened creature repeats the save at the end of each of its turns, ending the effect on itself on a success. The wall remains until the start of the drake's next turn, and a creatur" — Squallwing Drake [seat: action [action/save/condition]] (closest offered: shield-bash) [effect: condition] [menu: shield-bash lure execute] [same-cell unoffered: swallow gaze-single snare seal random-ray pacify escalating-dread terror-pulse snare-bolt sensory-strike push-prone reveal] [same-seat rejected: swallow:legality trample:legality leap:legality thrown-burst:legality gaze-single:legality snare:legality reel:legality condition-payoff:legality seal:legality hook-drag:legality active-toll:legality pull-through:role random-ray:legality ground-burst:legality spew:legality burrow-ambush:legality obstacle-pull:role pacify:role snare-bolt:role slow-bolt:role sensory-strike:role disarm:role herd:legality drain:legality curse-debt:role reveal:role wind-up:legality exploiter:legality blighted-ground:role] [landed: shield-bash]
[reskin] [gap] a cone of thunder that each creature in the area saves against for half damage — "The drake's scaled hide crackles with static; when it is hit by a melee attack, the attacker takes Thunder damage equal to the drake's PB." — Squallwing Drake [seat: trait [trait/on_being_hit/damage]] (closest offered: composed:body-reaction:damage:t0) [effect: damage] [menu: resonant-body composed:body-reaction:damage:t0 composed:body-reaction:damage:t1 composed:body-reaction:damage:t2 weapon-lodge] [same-cell unoffered: heated-body bloodied-burst ward-retaliation snap-shot riposte] [same-seat rejected: heated-body:legality absorption:legality bloodied-burst:legality] [row dropped]
[reskin] signature outcome: 1 of 2 accepted signature pick(s) never reached the sheet — 1x the call named no template for the pick
[reskin] signature tally: 2 seat(s) -> 1 shape(s) on the sheet · 0 expressed, 0 decoration, 0 free · accepted picks lost: 1 of 2 (1x the call named no template for the pick) · path homebrew
[reskin] record reconciled: "Shield Bash" no longer imposes Prone — the clause left, so the record goes with it
```


---


### Wellthing — in the run

**Concept:** name: the thing in the well | 

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Wellthing [seed 1/1] | 5 | lurker-5-trap | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 5 / off 5 → 5; sustained 38 (2 × Limb); nova none; dmg 38

```
Wellthing

Large Monstrosity, Neutral

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

Actions

Multiattack. The wellthing makes two Limb attacks. It can replace one attack with a use of Frozen Lash.

Limb. Melee Attack Roll: +6 (with Advantage if the target is Grappled by the wellthing), reach 5 ft. 12 (2d8 + 3) Bludgeoning damage plus 7 (2d6) Cold damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 14).

Frozen Lash. Strength Saving Throw: DC 14, one creature within 30 feet that is Grappled by the wellthing. Failure: 31 (9d6) Cold damage. Success: Half damage.

Bonus Actions

False Form. The wellthing shape-shifts to resemble an ordinary object or fixture of the place it waits in while retaining its game statistics, or it returns to its true form. While it is motionless in its false form, it is indistinguishable from that feature.

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
- Actions/Limb — the chassis
- Actions/Frozen Lash — library seed exploiter
- Bonus Actions/False Form — the chassis

**Engine trace**

```
[path] homebrew — "the thing in the well" (call)
[route] lurker-trap type=Monstrosity mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | lurker-trap: ✓ ("the thing in the well") | lurker-trap: no line key in the words — the model's read of its quote
[concept] resolve: archetype=lurker type=Monstrosity themes=grasping/aquatic mind=bestial style=trap energy=Cold mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: lurking in a well shaft [body] | dragging prey down toward the water [behavior] | grip on rope or limb [behavior]
[concept] identity: The thing in the well is a hunched mass of wet, knotted hide and cartilage wedged into the well shaft, indistinguishable from the stones and rotted timber until a bucket dips too low; then it uncoils and clamps a dripping, jointed limb on the rope or the arm holding it. Every round after, it drags its prey down against the shaft walls, letting the stone and the water do the grinding while it keeps a mashing grip and pulls inexorably toward the black at the bottom. It is a patient, grasping thing: it does not pursue, does not tire, and releases its grip only if the shaft itself gives way.
[concept] lore: A drowned thing that took root in an old well and has been drawing down what comes to drink ever since — it wants nothing but to pull more weight into the dark with it.
[reskin] donor: lurker-5-trap -> CR 5
[reskin] row gated out: Swallow (engulf) — the concept did not claim this mechanic
[reskin] [path] decides: homebrew (the matcher agrees)
[reskin] reach folded: "Grasping Limb" (reach 50) and Reel leave — no tether in the concept; the grapple rides "Melee Attack" (the Giant Crab's shape)
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline declared: "the wellthing" — the call's own answer (kind), built from the name
[reskin] inline form: "the wellthing" — the model's own reading of the name
[reskin] save dc derived: DC 13 -> 14 (8 + PB 3 + the sheet's best 3) — no stat on the sheet reached it
[reskin] the sheet's declared ask: none — the route call named no mechanic
[reskin] lacks asked: nothing taken away
[reskin] clauses: "the thing in the well" -> has (descriptive), head
[reskin] body verdicts: 34 of 34 answered; not true of this body: seal, wail, active-toll, random-ray, spew, snare-bolt, blighted-ground, shell-withdraw, coating, phase-slip, heated-body, absorption, bloodied-burst, resonant-body, adhesive, aberrant-ground, faultless-tracker, web-walker, noxious-aura, marking-light, relic-object, warded-mending, mimicry, gaze-aura, blurred-form, death-burst
[reskin] signature idea (action): "As the wellthing drags a Grappled creature it hauls it down the shaft wall in the same motion, moving both itself and its victim toward the water and grinding the prey against the stone; the victim can tear loose of that pull only by breaking the grapple, and the wellthing simply keeps climbing down with it. Any creature Grappled by the wellthing is dragged along with it when it moves, and the mov" [action/always/movement] [family: drag] — menu: leap, condition-payoff, lure, ground-burst, obstacle-pull, pacify, escalating-dread, terror-pulse, slow-bolt, sensory-strike, drain, zone-seed, exploiter (+ shelf: delayed-brand, patient-defense, self-invisibility, focus, feint-slip, blink, rally, riposte, stunning-strike, charge-push, hook-rider, pounce, isolation, life-drain)
[reskin] composed candidates: none action — the drag family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: action — idea fires always/does movement; leading: zone-seed (always/movement), obstacle-pull (save/movement), slow-bolt (save/movement)
[reskin] word match declined by the call: zone-seed, obstacle-pull, condition-payoff, leap, ground-burst — the key word does not mean the mechanic here
[reskin] free signature row: "Well Drag" — a rider rides the user's own attack, so it needs the user's own ask, but the call names the element it expresses: "dragging prey down toward the water". Earns no clause credit; the budget settles on the finished sheet
[reskin] rider refused — duplicate trigger: "hook-rider" opens with "If the target is a Large or smaller creature…", which "Limb" already carries; the slot leaves and the seat looks elsewhere
[reskin] fallback respects the call: obstacle-pull, condition-payoff left the shelf — the call declined them for this sheet
[reskin] value check: "Opportunist's Lash" EV 24 vs floor 23.4 (one attack of 2) — dice 14 → 18; priced at the floor: dice 18 → 31
[reskin] library seed drawn: exploiter -> Actions/"Opportunist's Lash" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The wellthing's body drinks the shaft's wet cold into itself; whenever it is immersed in water or pressed against wet stone, it regains hit points at the start of each of its turns, and loses this mending while it is hauled out of the wet." [trait/start_of_turn/resource] [family: heal] — menu: spider-climb, phobia, terrain-walk, energy-aura, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, uncanny-sense, shielded-mind, evasion, relentless-pursuit, bound, undead-fortitude, truth-aura, fear-aura, assassinate, kill-denial
[reskin] signature miss: trait — "The wellthing's body drinks the shaft's wet cold into itself; whenever it is immersed in water or pressed against wet stone, it regains hit points at the start of each of its turns, and loses this mending while it is hauled out of the wet." [trait/start_of_turn/resource] — no template on the shelf shares a verb with the concept or the idea (offered: spider-climb, phobia, terrain-walk, energy-aura, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, uncanny-sense, shielded-mind, evasion, relentless-pursuit, bound, undead-fortitude, truth-aura, fear-aura, assassinate, kill-denial)
[reskin] seat owes nothing: the trap line was the model's read of its quote, not a key in the words (a hermit was handed Assassinate, day-one 2026-09-30)
[reskin] weapons answered: Limb = none
[reskin] resistances derived: Cold
[reskin] name-canon stands down: the path answered homebrew on "the thing in the well" and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] multiattack replacement clause: It can replace one attack with a use of Opportunist's Lash.
audit finding below confidence gate: False Form No check, action, or condition is provided for a creature to see through or interact with the false form, leaving a GM with no rules-legal way to adjudicate detection.
[reskin] audit rename: "Opportunist's Lash" -> "Frozen Lash"
[reskin] seed share: 1 of 1 signature row(s) came from a seed (Frozen Lash) — the sameness metric
[reskin] signature tally: 2 seat(s) -> 1 shape(s) on the sheet · 0 expressed, 0 decoration, 0 free · accepted picks lost: 0 of 0 · path homebrew
```


---


### Oathsworn Remains — in the run

**Concept:** a skeleton with a greatsword

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Oathsworn Remains | 6 | brute-5 | ok | ok | SOFT: reach | ok | ok | ok | ok | ok | ok | ok |

- structure · soft · reach: Actions/Greatsword: reach 10 on a Medium body with no tether word
- read: def 4 / off 6 → 5; sustained 44 (2 × Greatsword); nova none; dmg 44

```
Oathsworn Remains

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

Great Weapon Master. When the remains hits a creature with its Greatsword, the attack deals an extra 3 damage.

Actions

Multiattack. The remains makes two attacks, using Greatsword or Hurled Blade in any combination. It can replace one attack with a use of Shield-Battering Slam.

Greatsword. Melee Attack Roll: +7, reach 10 ft. 22 (4d8 + 4) Slashing damage.

Hurled Blade. Ranged Attack Roll: +7, range 60/240 ft. 17 (3d8 + 4) Piercing damage.

Shield-Battering Slam. Strength Saving Throw: DC 14, one creature within 5 feet. Failure: The target is pushed up to 15 feet away from the remains and has the Prone condition.

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
- Actions/Hurled Blade — print's own row; weapon greatsword
- Actions/Shield-Battering Slam — template push-prone; library draw (seed unstamped); binds the GM's words: sweep
- Traits/Great Weapon Master — a declared feature; the GM's clause "a skeleton with a greatsword"

**Engine trace**

```
[path] twist — Skeleton (is) — "skeleton" (call)
[route] brute type=Undead mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | brute: ✓ ("a skeleton with a greatsword") | brute: no line key in the words — the model's read of its quote | bane refused: the words carry no weakness clause, so "bludgeoning" answers a question nobody asked
[concept] name: provided_name rejected — "a skeleton with a greatsword…" is the description, not a name
[concept] resolve: archetype=brute type=Undead themes=grave/armed mind=mindless style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: greatsword sweeps that batter shields apart [behavior] | bare skeletal frame moving without fear or pain [body] | oath-buried greatsword [object]
[concept] identity: The greatsword skeleton wades in with a two-handed overhead cut that opens its fight, then keeps pressing with heavy, predictable sweeps meant to batter a shield line apart. It never flinches, never tires, and never retreats — it takes the hit to land the heavier one, fighting to the death because death already happened.
[concept] lore: Raised from a graveyard of oath-sworn soldiers whose blades were buried with them, these remains rise again and again to finish a war none of them can remember ending.
[reskin] print canon array: STR 18, DEX 16, CON 15, INT 6, WIS 8, CHA 5 — the Skeleton's, STR fitted to +7
[reskin] donor: brute-5 -> CR 6
[reskin] [path] decides: twist on the Skeleton (the matcher agrees)
[reskin] print canon: "a skeleton with a greatsword" heads on the Skeleton — print's rows ride along; the seat stays
[reskin] named parts: Greatsword (slot) — the user's words, the engine's numbers
[reskin] named parts landed: 1 attack row(s), 0 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline declared: "the remains" — the call's own answer (kind), built from the name; the rules would have said "Remains"
[reskin] inline on kit rows: "Remains" -> "the remains"
[reskin] inline form: "the remains" — the model's own reading of the name
[reskin] the sheet's declared ask: none — the route call named no mechanic
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a skeleton with a greatsword" -> has (mechanical) [asked: attack]
[reskin] body verdicts: 31 of 31 answered; not true of this body: active-toll, random-ray, spew, herd, drain, shell-withdraw, rally, coating, heated-body, false-appearance, absorption, bloodied-burst, resonant-body, adhesive, terrain-walk, aberrant-ground, faultless-tracker, web-walker, energy-aura, noxious-aura, uncanny-sense, marking-light, sealed-body, warded-mending, mimicry, gaze-aura, death-burst, kill-denial, hook-rider, life-drain
[reskin] signature idea (action): "The remains plants its guard and drives a flat-edged shoulder-high sweep across a line of foes; each creature in range must succeed on a Strength saving throw or have its shield wrenched wide, its AC reduced by 2 until the start of the remains' next turn. A creature that fails this save also has any shield or weapon with the two-handed property flung from its grip." [action/save/condition] [family: mark] — menu: thrown-burst, throw-retrieve, shield-bash, ground-burst, escalating-dread, terror-pulse, push-prone, thrown-burst-seed, wind-up, gaze-single, snare, seal, lure, pacify, snare-bolt (+ shelf: rampage, second-wind, aggro-curse, own-turn-punisher, self-invisibility, focus, affliction, contagion, stunning-strike, charge-push, pounce, charge)
[reskin] composed candidates: none action — the mark family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: action — idea fires save/does condition; leading: shield-bash (save/condition), escalating-dread (save/condition), terror-pulse (save/condition)
[reskin] classification handed to the fit call: shape=attack
[reskin] word match declined by the call: shield-bash, seal, push-prone, snare — the key word does not mean the mechanic here
[reskin] closest accepted: action — the call refused every template but named "push-prone" as nearest and declined it for no_fit; it lands rather than the row being dropped (what it wanted: lowers the target's AC and makes it drop a held shield or two-handed weapon)
[reskin] free signature row: "Sundering Sweep" — a print body takes only what the user's words ask, but the call names the element it expresses: "greatsword sweeps that batter shields apart". Earns no clause credit; the budget settles on the finished sheet
[reskin] signature template: push-prone -> Actions/"Sundering Sweep" ("The idea is a sweeping shield-wrenching sweep that reduces AC and disarms two-ha [verb: sweep:idea]")
[reskin] signature idea (trait): "The remains cannot be Frightened and feels no pain — when it takes damage, it ignores any effect that would slow, stun, or turn it aside. Its emptiness of flesh means it fights on at full strength even when it should be broken, shrugging off the first condition to which it is subjected each round." [trait/always/defense] [family: payoff] — menu: spider-climb, phobia, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, relentless-pursuit, bound, relic-object, undead-fortitude, truth-aura, fear-aura, evasion, guarded-stance, blurred-form (+ shelf: weapon-lodge)
[reskin] composed candidates: none trait — the payoff family composes a rider and this is the trait seat
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does defense; leading: bloodied-fury (always/defense), death-restoration (always/defense), shielded-mind (always/defense)
[reskin] classification handed to the fit call: shape=attack
[reskin] word match declined by the call: bloodied-fury, death-restoration, shielded-mind, relic-object, undead-fortitude, evasion, guarded-stance, blurred-form, berserk, relentless-pursuit — the key word does not mean the mechanic here
[reskin] closest accepted: trait — the call refused every template but named "undead-fortitude" as nearest and declined it for no_fit; it lands rather than the row being dropped (what it wanted: ignores Frightened and sheds the first condition applied to it each round)
[reskin] free signature row: trait — "undead-fortitude" is the call's nearest after it refused every template, so it ships as DECORATION: no receipt, no element claim, counted in the metric. Earns no clause credit
[reskin] free signature row: "Unfeeling Frame" — the call's nearest after it refused every template, so it ships as DECORATION: no receipt, no element claim, counted in the metric. Earns no clause credit
[reskin] signature template (trait): undead-fortitude -> Traits/"Unfeeling Frame" ("The idea is about immunity to Frightened and ignoring slowing/stunning effects p [shape fit, no verb match]")
[reskin] one mechanic, one name: Traits/"Unfeeling Frame" -> "Undead Fortitude" — this row is undead-fortitude and does what every undead-fortitude row does; a bespoke name would promise more than the text delivers
[reskin] weapons answered: Greatsword = greatsword; Hurled Blade = greatsword
[reskin] weapon declared: "Hurled Blade" is a greatsword — the call's own answer (the name alone read longsword)
[reskin] print canon alignment: Neutral -> Lawful Evil — the Skeleton's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "None" -> "Understands Common plus one other language but can't speak" — the Skeleton's
[reskin] print canon speed: 40 ft. -> 30 ft. — the Skeleton's walk; the concept's other modes stay
[reskin] print canon yields: "Hurled Blade" keeps its greatsword — the GM typed it; the Skeleton's Shortbow prices the row but does not replace the weapon
[reskin] immunities stamped for type: Undead -> Poison; Exhaustion, Poisoned
[reskin] print canon defenses: vulnerabilities none -> Bludgeoning — the Skeleton's own header lines
[reskin] vulnerability rejected — "Bludgeoning" has no warrant in the concept's own text (print's default is none)
[reskin] multiattack replacement clause: It can replace one attack with a use of Sundering Sweep.
[reskin] free row over budget: Traits/"Undead Fortitude" leaves at ship — this sheet's free-row budget (1) is spent by a row that SHIPPED
[reskin] free-row budget: 2 candidate(s) reached the finished sheet, 1 kept (budget 1) — "Sundering Sweep" [action/save/condition]
[reskin] element expressed: Sundering Sweep carries "greatsword sweeps that batter shields apart" — "The target is pushed up to 15 feet away from the remains and has the Prone condi"
[reskin] audit rename: "Sundering Sweep" -> "Shield-Battering Slam"
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] [gap] lowers the target's AC and makes it drop a held shield or two-handed weapon — "The remains plants its guard and drives a flat-edged shoulder-high sweep across a line of foes; each creature in range must succeed on a Strength saving throw or have its shield wrenched wide, its AC reduced by 2 until the start of the remains' next turn. A creature that fails this save also has any shield or weapon with the two-handed property flung from its grip." — Oathsworn Remains [seat: action [action/save/condition]] (closest offered: push-prone) [effect: condition] [menu: shield-bash escalating-dread terror-pulse push-prone gaze-single snare seal lure pacify snare-bolt thrown-burst ground-burst thrown-burst-seed wind-up throw-retrieve] [same-cell unoffered: swallow random-ray sensory-strike reveal] [same-seat rejected: swallow:legality trample:legality leap:legality reel:role condition-payoff:legality execute:role hook-drag:legality active-toll:legality pull-through:role random-ray:legality spew:legality burrow-ambush:legality obstacle-pull:role slow-bolt:role sensory-strike:role disarm:role herd:legality drain:legality curse-debt:role reveal:role exploiter:legality blighted-ground:role] [landed: push-prone]
[reskin] [gap] ignores Frightened and sheds the first condition applied to it each round — "The remains cannot be Frightened and feels no pain — when it takes damage, it ignores any effect that would slow, stun, or turn it aside. Its emptiness of flesh means it fights on at full strength even when it should be broken, shrugging off the first condition to which it is subjected each round." — Oathsworn Remains [seat: trait [trait/always/defense]] (closest offered: undead-fortitude) [effect: condition] [menu: bloodied-fury death-restoration shielded-mind relic-object undead-fortitude evasion guarded-stance blurred-form spider-climb phobia blood-frenzy pack-tactics berserk relentless-pursuit bound truth-aura fear-aura] [same-cell unoffered: false-appearance shell-withdraw uncanny-sense patient-defense sealed-body mimicry] [same-seat rejected: false-appearance:legality adhesive:legality terrain-walk:legality aberrant-ground:legality faultless-tracker:legality web-walker:legality uncanny-sense:legality earth-glide:legality tunneler:legality marking-light:legality sealed-body:legality mimicry:legality assassinate:role death-burst:legality kill-denial:legality] [VETOED AFTER ACCEPTANCE: undead-fortitude never reached the sheet — died at the free-row budget (only 1 free row(s) allowed on this sheet)]
[reskin] signature outcome: 1 of 2 accepted signature pick(s) never reached the sheet — 1x the free-row budget
[reskin] signature tally: 2 seat(s) -> 1 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 1 of 2 (1x the free-row budget) · path twist
[reskin] multiattack re-read — "Hurled Blade" joins the combination; "The remains makes two attacks, using Greatsword or Hurled Blade in any combination. It can"
```


---

