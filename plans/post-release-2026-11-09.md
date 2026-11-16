# Post-release plan — statblock reskin (written 2026-11-09, Fable)

**Trigger:** the engine is public. Everything here was deliberately held back from release;
nothing here is a sheet-breaking defect. Each item carries the number that sized it, measured on
the four 2026-11-08 fortys (160 sheets) and print (`src/data/srd52-monsters.json`, 329 blocks)
unless marked *(critic)* or *(recalled)*. Order is by measured prize. Delete an item when it lands.

**Standing rules still apply:** meaning is a call field, never a word list; print overrules
reviewers and pins — measure a proposed gate against print before shipping it; the owner commits;
the forty is `sweep.json` and runs only at feature close-out.

**Where things stand at release:** per-clause hit rate 78% (bar 85, see §0); critic gate 2 read
14 Keeper / 21 Runs / 3 Tweak / 2 Fix, both Fixes closed by 7a; checker FAILs on the last twelve
0 of 12. The landed pre-release set was §7.9 of `critic-response-2026-11-08.md` (7a, 7e-saves,
7f, 7b, plus the citation-connector repair).

---

## 0. The bar, and the ruler — two owner decisions this plan waits on

**0a. The 85% clause-rate bar.** 78% after the biggest measured lever (1d). Remaining measured
levers: §1 formation ≈ +3.5 points, §2 handed clauses ≈ +1.4 → ~83. The rest of the gap is the
39% of clauses that coin-flip between runs, which no item here targets. Either the bar is 85 and
we keep going, or release meant "0 Fix on the critic's read + the pre-release four" and the bar is
retired. Fable's recommendation was the second.

**0b. Calibration: which ruler.** The critic's recommendation (2026-11-08, "calibration
recommendation") proposes HP ×1.35 (or AC-to-DMG + HP ×1.20) on engine-built bodies so a **DMG
2014** read lands at net +0.5. Its arithmetic is sound (table matches 21 of 21 sheets; medians
recompute). Its premise is also true: *2024 print is offense-heavy and HP-light against the 2014
table.* **What that means, measured:** the 21 engine-built sheets sit at the **48th percentile of
2024 print HP at the same CR** — the engine builds to print, as designed. ×1.35 moves the median to
**p95**, with 13 of 21 above every print creature at their CR. So this is not a calibration fix;
it is a ruling on whether the authority is print (today) or the 2014 table. Three of the critic's
supporting points were wrong and are refuted in the 11-08 session notes: "9 cool" is 6 on their
own table; adult breaths run 45–**66** not 45–59 (Adult Gold 66, Adult Blue 60), so the AoE cap
touches nothing; the AC target cited is the DMG table, not print. **If the owner wants a lean:**
AC-to-DMG + HP ×1.20 (their read ≈ −0.2, ~print p75–p80) stays inside the book; ×1.35 does not.
Validation must be our gate, not their parser (which undercounts save-based attacks and skips
spells). Do not touch exact/twist bodies either way.

## 1. 7d — the formation trait (5 of 39 misses; the largest remaining lever)

Ally-adjacency clauses classify mechanical 8 of 9 times and nothing answers them. Misses on
`clause-rate.mjs 3`: Vashka "fights from a shield wall" 2, "never breaks ranks" 2, Drowned Choir
"sings in one voice" 1. **Shape (critic, Q3):** one trait template, `effect: 'defense'`, Pack
Tactics' grammar — *"While [X] is within 5 feet of an ally that doesn't have the Incapacitated
condition, [effect]"* — effect chosen by the fit call from a short declared list: +2 AC · can't be
moved against its will / knocked Prone · Advantage on saves vs Charmed and Frightened · shares a
Resistance with the adjacent ally. Never adds damage. Keys use the library's existing `keys`
mechanism (rank and gate; the call decides). *(critic)* "never breaks ranks" trips the LACKS
reader — verify before extraction. Test: Vashka #23, 10 of 11 rolls bare.

## 2. 7c — a handed clause protects a row if the row states the clause's effect (2 of 7)

12 handed rows shipped on the last forty. Reuse the audit's `element_claims` contract with the
handed clause as the claim; a quoted carrying span → stamp the row clause-bound (not free, as 1d
does for `idea.clause`); null → decoration near a clause, the budget may take it. "Buys no
coverage credit" stays true as a scoring fact. Prize: 2 of the 7 clause-costing evictions across
three fortys.

## 3. 7e's siblings — print's other lines on a print body

| line | drift on twist/exact (15 sheets) | do |
|---|---|---|
| senses | 3 — Pit Fiend truesight→darkvision, Lich truesight→darkvision 60, Stone Golem 120→60 | `print canon senses:` ran on 2 exact sheets only; extend to twist on the skills/saves gate |
| Bonus Action / Reaction rows rewritten | 2 — Purple Worm "Swallow" (print: Bonus Action, STR save, grappled target → shipped as a replace-attack DEX save), Lich "Protective Magic" | lock the way 1e locked attack rows, twist/exact only |

## 4. Stated-CR gate and the nova floor (critic §5, §6) — AFTER `typed40`

*(critic)* "When the GM specified CR and the body reads outside [−1.0, +1.5], the gate fails."
Sound in principle; the share of real inputs that state a CR decides whether it matters, and that
is `typed40`'s first finding. Related, ruler-independent: **a CR ≥ 11 body with no Recharge nova
or legendary tempo is a thin card** — Brass Tyrant CR 17 ships one attack row, two Blade
attacks, zero Recharge rows (verified). Trenchsong Leviathan CR 24 makes two Maws where print's
ancients make three. Build as a card-shape check against print's own rate (measure: how many
print CR ≥ 11 blocks lack both), not as a damage knob.

## 5. Kit riders priced; owner-specified numbers compensated (critic §6)

*(critic)* the monk's stun-on-hit and the templar's AoA + disadvantage rider each read ≈ +1 that
no gate prices; the Black Iron Warden with AC 20 typed and HP 168 reads −2.8. Options as stated:
price riders in the read, or cap (stun → Recharge; rider → once per turn); when a typed AC/HP
pulls 2+ under the typed CR, raise the other defensive axis. Measure first on the class-NPC sheets
(templar 10/11 hot, monk 11/11).

## 6. 1f — the path call flips (1 defect in 120)

Refuted as a precedence bug: same input three runs, the PATH CALL decided "twist on the Ghost"
twice and "class_npc on the Priest" once; the engine honours the call. A non-Humanoid route type
is not the discriminator (4 of 120 sheets, 3 of them Brother Halric, whom the engine rightly
ships as a Priest). **Prompt fix only:** the path prompt ranks a creature noun in the GM's words
above an occupation. Lowest-value item here.

## 7. 1g — a target's state is a mechanical clause (2 clauses)

7 filed mechanical, 2 descriptive ("collects the oaths of dying knights", "ring themselves over
the dying"). One prose example in the extraction prompt, no regex. Note the direction: a
descriptive label EXCLUDES the clause from the rate, so fixing it moves two clauses INTO the
denominator and can read as a drop before a gain.

## 8. Small, verified (critic §3d, §6 lint)

- #39 the advantage rider rides both Handaxe and Shortsword, and "a handaxe returns" rides the
  Shortsword (6/6) — the T05 dedupe matched within one row, not across two.
- #06 "5-foot-long, 5-foot-wide Line" — one square. Measure print's shortest Line before bounding
  (*(recalled)* print has none that short).
- #28 "may" vs "can" between the two printings of one authored row; `((with mind blank))` leak.
- 2014 Spellcasting "- At will:" rendered inline (#10, #15, #18, #28, #40).
- The "Name.Text" gap in smoke dumps is NOT a defect — `Statblock2024.vue:117,121` inserts
  `{{ ' ' }}`; the smoke's `innerText` drops it. Verify once in the browser.

## 9. Arms that are proven by test but have not yet fired in a live run — watch the next fortys

- 7a's two refusal arms (undefined state word; contradicts own trait): lints read 0 across the
  last twelve because the shapes did not recur; unit tests fail-then-pass on #29's exact text and
  the lints catch it on the saved forty sheet.
- 1d's rank-0 `e.clause` arm: zero `free-row order:` lines so far. If three fortys show none, it
  is the `gmQuote` arm again — a rule that exists only in a comment — and should be said so.
- 7a's check 1 (a damage phrase with no die) is a PROMPT line, not a rule: print writes die-less
  damage phrases 9 times (all references, e.g. "If the golem takes Fire damage"). If #05's shape
  recurs, the fix is `quantitiesOk`'s declared count, never a text pattern.

## 10. `typed40` — the pre-release hold, kept here so it is not lost

Every number above is measured on forty writer's sentences (31 of 40 are polished prose; 1 is a
two-word concept). The owner typed "knife ball" and hit a bug four fortys never saw. Build a
second forty from REAL inputs — the owner's saved concepts (`userConcept` on saved sheets) and
friends' — in the real register: two-to-four-word concepts, non-SRD monster names ("beholder",
"mind flayer"), rules-speak ("CR 5 brute, two attacks, grapples"), pasted lore paragraphs,
lowercase/typos. Run both forties; `sweep` says "the engine answers clear requests", `typed40`
says "it answers GMs". Expect the second to read lower. Its first finding is the share of inputs
that state a CR, which sizes §4.
