# HANDOFF — the ribbon build: one call, six families, and nothing else on the sheet moved

2026-11-22 · branch `statblock-enhancments-part-2` · for the owner and for Fable

Seven commits, ready to push — the six below, plus the one carrying this report and the blocks file. Nothing is pushed.

| # | Commit | What |
|---|---|---|
| 1 | `5073307` | the six families, and what each must hold (49 tests) |
| 2 | `02dde3d` | which sheets take a ribbon, and which three families (19 tests) |
| 3 | `88c71df` | the call and its wiring (20 pipeline tests) |
| 4 | `9db2b39` | a sheet that never asked carries no ribbon record |
| 5 | `44842a4` | `--live-from miss` does not latch; the re-ask carries every fault |
| 6 | `71947d0` | the forty re-recorded with the ribbon call |

**Suite:** 276 suites, 5,965 passed, 26 skipped, **exit 0**, single worker, read from its own exit code. **Build clean.**
**Replay:** strict replay of `baseline-2026-11-22` — **38 of 38 reproduced EXACTLY, 2 skipped.**
**Step 8:** every row other than the ribbon is identical on all 38 re-run sheets.

---

## 1. The ribbons, and the counts

`scripts/smoke-evidence/BLOCKS-the-forty-ribbons-2026-11-22.md` holds all forty with the table at its head.

| | Count |
|---|---|
| Sheets that qualify | **36** of 40 |
| Ribbon written | **25** |
| Written on the first ask | 16 |
| Written on the second | 9 |
| Refused twice, no ribbon | **11** |
| The call failed | **0** |
| Sheets that do not qualify | 4 — s19, s21 (printed, typed by name alone), s22 and s36 (see below) |

**s22 and s36 are a harness exclusion, not an engine one, and s36 should have had a ribbon.** Both roll
part of themselves before any call is built, so the harness skips them in every replay mode. A
replay-based recording therefore never runs them. s22 is a printed creature typed by name alone and
takes none either way — but **s36 is the blank form, which the engine does offer a ribbon**, and it has
none here only because it cannot be replayed. Giving it one means a live run that rolls its whole
creature from scratch, which would change every row on it. I left it alone and am telling you rather
than quietly counting 36 as 35.

## 2. The families: offered against chosen

| Family | Offered | Chosen | Of those offered |
|---|---|---|---|
| moves | 22 | **8** | 36% |
| senses | 17 | 5 | 29% |
| taboo / need / tether | 22 | 5 | 23% |
| sheds | 10 | 4 | 40% |
| speaks | 12 | 3 | 25% |
| **leaves-at-death** | **25** | **0** | **0%** |

**The model does not take the same family whenever it is offered — it refuses one family outright.**
`leaves-at-death` was the most-offered of the six, twenty-five times, and was never once chosen on a
sheet that produced a ribbon. It is also the family behind four of the eleven double refusals (s07,
s08, s16, s17), each failing rule 6: what it leaves did none of the four things, or never said when
it ends.

That is the one family where the rules are a checklist of three parts at once — an object, one of
four effects, and an ending — and it is the one the model walks away from. If you want it, I think it
needs its own ask rather than a sixth slot in a shared one. That is also where the stronger
high-CR tier you have queued would live.

The offering itself is even, as its test requires: over 3,000 inputs each family lands within 10% of
the expected share. The imbalance above is entirely the model's choosing.

## 3. Every refusal, with its reasons

Eleven sheets. The reasons are joined by `||` between the two asks.

| Sheet | First ask | Second ask |
|---|---|---|
| s02 Bog Hound | 42 words | 41 words |
| s07 Hydra | none of the four things | 43 words |
| s08 Lashed Siege-Golem | never says when it ends; 55 words | 45 words; "10 feet" |
| s16 Brass Tyrant | 44 words | never says when it ends; 56 words |
| s17 Pit Fiend | never says when it ends; 51 words | none of the four things |
| s25 Oathbound Bulwark | no restriction and no tether; 47 words | 42 words |
| s28 Ilvareth Dusksong | it does damage | 47 words |
| s29 Swarm of Funeral Bells | calls for a saving throw; 62 words | name is 4 words; 44 words |
| s33 Reedtemple Warden | 44 words | 42 words |
| s35 Well Drowned | does damage; name is 4 words | no restriction and no tether; … |
| s38 Oathsworn Gravebound | it does damage | 55 words |

**No refusal here was wrong.** Each one is a rule you set, applied to the thing the model wrote. But
one of them is doing nearly all the work, and it is worth your decision:

**The 40-word cap appears in ten of the eleven, and is the sole reason in three** (s02, s33, and s02's
pair). The model writes long: the twenty-five that landed have a median of 33 words and a maximum of
40 — exactly at the cap — so the cap is not shaping them, it is cutting them off. And your own four
worked examples in the handoff are over it: the Whelp's heart-stone is 44, the Siege-Golem's Groaning
Timber 45, the Well Drowned 42, the Glacier Heart's trail 41. **Every one of the four ribbons you
chose to show me as what a family must hold would be refused by the cap.**

I did not change it — it is your number, rule 1. Raising it to 45 would have saved s02, s16's second
ask, s29's second and s33, and would admit all four of your examples. That is four or five more
ribbons on the forty for three words of slack, and it is your call.

## 4. Ribbons that contradict their sheet's Speed, Senses or Languages

**None contradicts them.** I read all twenty-five against the three lines, which the validator cannot
judge. Two sit in tension rather than contradiction, and four are worth your eye for a different
reason.

**Tension with a Languages line, both in the `speaks` family:**

- **s05 Air Elemental** — Languages: Primordial (Auran). The ribbon: *"can speak only with voices it
  has stolen, and cannot form new words of its own."* It still speaks Primordial; what is constrained
  is the voice, not the language. I read it as consistent, barely.
- **s18 Bone-Sun Archlich** — Languages: All. The ribbon: *"can speak only words it has heard a living
  creature speak."* A creature that knows every language and can utter none of its own words is
  strange on the same card. Not a rules contradiction; a card a GM will read twice.

**Four that do more than I think a ribbon should** — all legal under the rules as written, which is
why the validator passed them:

- **s15 Adult Red Dragon** — *"can drop into a diving glide … moving up to 120 feet in a straight line
  **without spending movement**."* That is 120 feet of free movement in a fight. The strongest thing
  any of the twenty-five does, and the one I would cut.
- **s20 Trench Siren** — *"A creature whose space it enters must succeed on a DC 15 Wisdom check or
  lose its footing in the current."* It imposes a check on another creature with a consequence. An
  ability check is allowed, so it passed; this is the closest a ribbon came to doing a trait's job.
- **s09 Stone Golem** — beyond its 100-foot tether *"it takes no actions but movement back toward the
  site."* A real cost if a fight moves, which is the tether working as you specified it.
- **s39 Vellick the Last Contract** — *"will not strike a creature that has spoken the terms of his
  current contract aloud to him."* A player can switch off his attacks by saying a sentence. This is
  the clearest case of "a player's action can meet it" in the twenty-five, and possibly past the line.

**Two vacuous tethers.** s06's lurker is tethered to *"the creature it last buried"* and s12's archon
to *"a living swarm under its command"* — both do nothing until that thing exists. Sound, and idle on
a fresh sheet.

**One wording error.** s26's Mire Huldra senses creatures that crossed *"undyed marsh water"*, which
I think is meant to be undisturbed or undyked. Nothing in the rules catches it.

## 5. Length and voice

| | |
|---|---|
| Median word count | **33** (min 21, max 40) |
| Over 40 words | 0 — the cap holds |
| Use a simile | **0** of 25 |
| Carry a DC | 6 of 25, every one the engine's |

The voice held. Of the eighty in the probe, eleven reached for "as though", "as if" or "like a"; of
these twenty-five, **none** did. Asking for print's flat voice in the ask was enough.

Every DC on the forty is the engine's: DC 10 below CR 5 (s01), DC 13 through CR 12 (s05, s24), DC 15
above (s13, s18, s20). No number the model wrote reached a sheet.

## 6. The diff of step 8

**Every row other than the ribbon is identical on all 38 re-run sheets.** Checked Block by Block
against `BLOCKS-the-forty-2026-11-22.md`, line by line within each Block, with the ribbon's own line
removed.

One note, not a stop: **s24 gained the `Traits` heading** along with its ribbon. The Titan-Hollow
Scythe had no trait at all before, so the heading appearing is the ribbon's own doing. I made the
diff name that case rather than normalise it away silently.

**It did not pass the first time, and the failure is commit 5.** The first recording had four 2014
sheets — s02's Muck-Lunge, s03's Cliffside Drop, s11's Briar Blood, s25's Oathkeeper's Backhand —
whose existing rows came back *reworded*. Same mechanics, different sentence. The cause was mine:
`--live-from miss`, which I built last round, latched, so every call after the ribbon went live and
that includes the 2014 conversion. It ran again on all 13 of the forty's 2014 sheets and four of
them phrased a row differently.

The latch is gone. The rule now is the one the family latch was already failing: **if a prompt
matches the tape, the recorded answer is a valid answer to it**, whatever happened upstream. A prompt
built from a changed answer does not match and goes live on its own account, so the latch was never
buying safety — only discarding answers, which is the complaint that created this mode in the first
place. The test that asserted the latch now asserts the opposite, with the reason in it.

Step 8 is the only thing that would have caught this. The suite was green and the replay was clean
through both recordings.

## 7. The seconds a ribbon adds

| | |
|---|---|
| The engine's own work (tape-only, before the ribbon existed vs after) | **0s** — median 0, mean 0.03, max 1 |
| The call itself, live, against the same sheets served from tape | **2s** — median 2, mean 2.0, range −1 to +6 |

38 sheets compared each way. So **a ribbon costs about two seconds**, all of it the model.

**It is not run alongside, and I think it should not be.** It reads the names of the rows on the
finished sheet, and the audit renames rows — s11's ribbon call was shown "Umbral Bloom", a name the
audit wrote. Running it alongside the audit would show it names that no longer exist, which is the
one thing a ribbon must not do (rule 6: it must not contradict a row already on the sheet). Two
seconds sequentially is the right price for that.

## 8. The 2014 terms

Three came up on the forty, and the chain that handles them runs in both directions:

| Term | Where | What happened |
|---|---|---|
| `Dim Light` | s10 Drowned Antiphon | written lowercase by the model, cased to 2024 for the 2024 printing, lowercased again for the 2014 card |
| `Bright Light` | s10 Drowned Antiphon | the same |
| `Difficult Terrain` | s11 Vampire | the same |

`Emanation` never appeared. The 2014 cards for s10 and s11 read "dim light", "bright light" and
"difficult terrain"; their 2024 printings carry print's capitals.

**This was wrong in the first recording and the fix is in commit 5.** I built the rewording in one
direction only — 2024 terms down to 2014 idiom — and two ribbons of the first twenty-five wrote
"difficult terrain" and "dim light" *already lowercase*. So the 2014 rewording had nothing to do and
the **2024** printing of those two sheets carried a rules term print capitalises. The ribbon's own
text now takes print's casing when the row is written, and is lowercased again for the 2014 card.
Nothing else on either sheet is touched.

## 9. Anything a fix made worse

**Two, both mine, both inside this round, both read off a real sheet.**

1. **The latch, above.** Four sheets had rows reworded that this round had promised not to touch.
   Caught by step 8, fixed in commit 5, and the whole forty re-recorded after.
2. **A ribbon record on a sheet that never asked.** I stamped `generation.ribbon: { written: false }`
   on every sheet, including the three that take none. s21's Owlbear then differed from its own
   recording — `REPLAY DIFFERS (generation)` — while s19 escaped only because it is print-exact with
   no calls and never reaches that line. Caught by the strict replay, fixed in commit 4. "Nothing
   else on the sheet moves" has to include its provenance.

**And one fix whose effect I cannot claim.** The re-ask now carries every fault instead of the first,
and the mechanism was real: in five of the first recording's six double refusals the second answer
broke a *different* rule than the first. The measured gain was one ribbon in thirty-eight — 25 to 26
across two live runs, then 25 again in the third. That is inside run-to-run noise. The change is
right in principle and I am not going to tell you it worked.

## 10. The lint, the suite, the replay

**The lint over the forty, unchanged by the ribbon.** 40 sheets; 39 linted. s19 is print-exact from
SRD 5.1 with `calls: 0` and never enters the pipeline, so it carries no findings field.

| Rule | Findings |
|---|---|
| `uncited-replacement-row` | 0 |
| `ungated-turn-denial` | 0 |
| `citation-gate-mismatch` | 0 |
| `deafened-alone` | 0 |
| `rider-without-an-attack` | 0 |
| `strike-adds-nothing` | 0 |
| `stock-template-name` | **1** — s12, `Bonus Actions/Bolstering Presence` |
| `two-recharge-rows` | 0 |

Identical to the round before: the same one finding on the same sheet. Three findings from rules
outside the eight also stand, as before: `orphan-condition-ref` ×2, `at-will-inline` ×1. **No ribbon
produced a lint finding**, and the stored findings are the returned sheet's with the ribbon on it —
there is a pipeline test on that invariant.

**The suite:** 276 suites, 5,965 passed, 26 skipped, **exit 0**. `npm run build` clean.

**The replay:** `REPLAY: 38 of 38 reproduced EXACTLY, 2 skipped (not replayable)`.

---

## The shape-fit rows the audit condemned — and a correction to last round's number

Still open from your list. **Eleven rows on the forty were fitted by shape alone, and four of them
carry an audit defect — not three.** Last round I reported 3, and the three rows I had in mind were
wrong on two of them. Both errors were the same name-matcher fault that has bitten me three times
now: it compared `Forge-Bell Decree (Recharge 5-6)` against the audit's `Forge-Bell Decree` and
missed it on the parenthetical, and it read a rename line's *first* quoted name instead of the row's.
Matched on bare names with the rename resolved, the answer is four.

| Sheet | The row | Template | The audit |
|---|---|---|---|
| s09 | Radiant Grief (2/Day), shipped as **Grief Glare** | `terror-pulse` | medium `weak`, medium `dead_reference`, medium `misnamed`, low `wording` |
| s16 | Forge-Bell Decree (Recharge 5-6) | `lure` | **high** `open_ended`, **high** `dead_reference` |
| s26 | Fen Curse | `curse-debt` | **high** `open_ended` |
| s26 | Cursed Wake | `composed:zone:condition:poisoned` | medium `other` |

The other seven are clean: s09's Trail of Tears, s12's Plague Tithe, s14's Killing Cold Wake, s26's
pair aside, s30's Hallowed Frenzy, s34's Skull Standard Aura, s36's Temple Stalker, s40's Bound
Reliquary.

**Do they share a template? No — four rows, four different templates.** `terror-pulse`, `lure`,
`curse-debt` and a composed condition zone. What they share is the *kind* of template: all four are
reached by a verb in the ruling in force — "a template reached by a verb does not land on a shape
alone" — and all four landed on a shape anyway, in a family the gate does not yet cover. The
pull-through gate from last round covers one template; these four say the gate wants to be general.

Two of the four are the Mire Huldra, which is also one of the two sheets whose zone idea shipped
intact. Worth knowing before the zone round: the same sheet is both the best and the worst case.

## What I did not do, and what I would change

- **Nothing was pushed.** Six commits are ready.
- **No deletion commit.** `BLOCKS-the-forty-2026-11-22.md` is named as staying and is what step 8 is
  checked against, so nothing was superseded. This round's file is
  `BLOCKS-the-forty-ribbons-2026-11-22.md`.
- **The 40-word cap is the one number I would ask you to move**, to 45. It costs four or five ribbons
  on the forty and it refuses all four of the examples you sent me.
- **`leaves-at-death` needs its own ask or it needs dropping.** Offered 25 times, chosen 0.
- **s36 should have a ribbon and does not**, for the harness reason in §1.
- **s15's free 120 feet and s20's imposed check** are the two rows I would cut from the twenty-five if
  you want the family rules tightened rather than the cap loosened.
