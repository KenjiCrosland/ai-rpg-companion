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
