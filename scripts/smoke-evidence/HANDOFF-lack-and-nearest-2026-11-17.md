# Handoff — the row written for a lack survives, and a refused template no longer lands

For the owner and Fable 5.2, 2026-11-17. Branch `statblock-enhancments-part-2`.
Blocks, nine sheets before and after: `BLOCKS-lack-and-nearest-2026-11-17.md`.

**235 suites, 5472 passed, 26 skipped. Build clean (6.32s). Reference scripts: 576 cases, 0 threw,
0 sheets with two rows of one name, 0 Multiattack citations naming no row. Widened ship scan: 0.
38 of 38 sheets ran — 0 threw, 0 timed out, 0 degraded. Model calls per sheet: 9.3, unchanged.**

Strict replay on `baseline-2026-11-17b` is **38 of 38 reproduced EXACTLY** at the pushed commit.

---

## Part 1 — the lack's own row

### The three counts

Across **289 saved sheets** (251 fixture, 38 tape):

| | |
|---|---|
| sheets carrying a lacks clause | **24** |
| of those, a row on the finished sheet bound to that clause by id or exact text | **0** |
| on the tape | 4 sheets — s07, s15, s26, s31 — and one removal, matching your count |

Zero is the finding. The join key was never being set, so `ownsThisLack` could only ever succeed by
word coincidence.

### What the hand-off stamped

`gmAsked` set **`f.asked = own`** — the handed clause's TEXT, on the shape. Not the row, and not an
id. The flaw-row builder already stamped `clauseId`; the seat hand-off did not, and a later pass
(generate.mjs:11116) tried to recover it by substring containment, which is the
`clause unresolved … no coverage credit by id` trace you quoted.

So `unansweredClauses` now carries each clause's `id` out, `clauseIdForHanded` recovers it from the
handed text (the clause's own text or its positive half, matched exactly), both the hand-off and the
seat's own row stamp it, and `ownsThisLack` is `row.clauseId === lack.id`.

### What s15 prints afterwards

Exactly what you expected. Both rows:

```
Ruined Eye, Wary Ear. While a creature makes an attack against the red dragon from its blind left
flank, that attack is made with advantage, but the first such attack each round alerts the dragon,
which pivots to face the attacker, and any further attacks against it from that flank that round are
made with disadvantage.

Sight Weakness. The red dragon has disadvantage on Wisdom (Perception) checks that rely on sight.
```

The first is the facing rule the table cannot track, as you said — the seat form's to fix.

### It fixed two things beyond the dragon

Three rows on three sheets had **no** clause id at all and are now bound:

| sheet | row | now bound to |
|---|---|---|
| 04-chapel-bell-ringer | Grave Knell | "tolls for the dying" |
| 13-purple-worm | Churning Armoury | "swallowed a war-band's armoury" |
| 22-vashka-the-red | Dress the Line | "fights from a shield wall" |

`free_rows` and `expressed_rows` are now counted from the finished sheet, after the last pass that
can remove a row. **It corrects nothing on this tape** — 0 traces — because the id fix removed the
only disagreement. It is the invariant, not the fix; eight lines, no call. I am telling you it never
fires because a guard that never fires is what we spent this morning deleting.

### Other places that match a row to a clause by words — counted, not changed

**Four**, plus one by substring:

| site | the decision |
|---|---|
| generate.mjs:1088 | an authored row's clause against the open clauses |
| generate.mjs:7726 | coverage — is any clause unclaimed |
| generate.mjs:7774 | an unplaced clause against the unclaimed list |
| generate.mjs:7796 | coverage again, for descriptive clauses |
| generate.mjs:11116 | resolves a row's clause id by substring containment — the pass that failed here |

### The replay

**37 of 38** immediately after the fix, with s15 missing at the legacy call as you predicted. But
**14** sheets failed strict comparison, not one, and the reason is worth knowing: the harness
compares the SERIALIZED sheet, so three different things all read as "did not reproduce".

| | |
|---|---|
| 1 sheet | real content — s15 gained both rows |
| 6 sheets | a `clauseId` VALUE: the 3 rows above, previously unbound |
| 7 sheets | KEY ORDER only — the id is stamped earlier, so it serialises in a different position. Proved by comparing both sheets with every object's keys sorted |

Nothing a GM can see changed on the 13. All 14 were re-recorded in pass-through and the other 24
left byte-for-byte.

---

## Part 2 — a refused template no longer lands

### The eight, before and after

Rows excluding Multiattack and Legendary Action Uses, which is how the budget counts against print.

| sheet | before | after | print's band | |
|---|---|---|---|---|
| 03-owlbear | 3 | 2 | — | band not traced on this path |
| 04-chapel-bell-ringer | 7 | 7 | 2-5 | above; the nearest never reached the sheet |
| 18-bone-sun-archlich | 8 | 7 | 7-9 | **in band** |
| 20-trench-leviathan | 8 | 7 | — | band not traced |
| 28-unblessed-bell-swarm | 4 | 3 | 5-10 | **BELOW** — it was already below, and goes further |
| 35-meshrin | 9 | 7 | 3-5 | above |
| 36-unyielded-champion | 4 | 3 | — | band not traced |
| 38-brother-halric | 5 | 5 | — | the nearest never reached the sheet |

Six sheets lose exactly the one row; two lose nothing because the nearest never reached the finished
sheet. Full blocks before and after are in the blocks file.

### Every clause the GM typed still has a row

Before: **11** clauses unanswered across the 38. After: **the same 11**. The stop rule is not
triggered.

A twelfth appeared on one roll and is **not** this rule. On s35 "Give him a frightening roar" lost
its row — but the change alters that sheet, so its later calls go live, and on three pass-through
rolls of s35 **two answered the clause with Terror Roar and one wrote Javelin Burst instead**. The
same variance cost Barbarian Rage on all three rolls, to a live seat call refusing its own answer
("1 number promised, 0 written"). I ran s35 three times before reporting it, because one roll of a
live call is not a fact.

### The call each of the eight first misses at

Six at the audit, two at the repair — both are prompts that embed the sheet, so the row is already
gone by the time they are built.

```
03-owlbear               the audit call        28-unblessed-bell-swarm  the audit call
04-chapel-bell-ringer    the repair call       35-meshrin               the repair call
18-bone-sun-archlich     the audit call        36-unyielded-champion    the audit call
20-trench-leviathan      the audit call        38-brother-halric        the audit call
```

Strict replay reproduced the other **30 of 38** exactly, as you expected.

### The eleven seat refusals, with their reasons

| sheet | row | why the parser refused it |
|---|---|---|
| 04-chapel-bell-ringer | Toll of the Hollow Bell | a trait is not a save |
| 08-orchard-ram-golem | Breach Hail | a trait is not a save |
| 10-drowned-choir | Wound Passes Through the Chord | a trait is not a save |
| 32-steamclaw-ascetic | Pressure Without Pause | a trait is not a save |
| 20-trench-leviathan | Bone-Ringing Impact | 1 number promised, 0 written |
| 32-steamclaw-ascetic | Flow Between Forms | 1 number promised, 0 written |
| 11-vampire | Sanguine Brambles | names "the Bleeding condition", which is not a condition in this game |
| 17-pit-fiend | (an action) | wrote no row of the kind asked |
| 22-vashka-the-red | (a trait) | wrote no row of the kind asked |
| 36-unyielded-champion | (a trait) | wrote no row of the kind asked |
| 38-brother-halric | (an action) | wrote no row of the kind asked |

Four of the eleven are one wrong form — a trait writing a saving throw. The seat wrote its own row
**30** times, so the refusal rate is 11 of 41.

### What can still set `accepted_closest`

**Only a refusal with no parseable reason.** The enum has exactly three values — collision,
already_answered, no_fit — all three are now blocked, and `parseFit` returns `null` for anything
else. So the failed-call branch alone.

Across the **50 fit refusals on the tape there is not one**: 47 no_fit, 2 collision, 1
already_answered. By your rule the rename guard's `accepted_closest` exemption therefore **stays** —
removing it is yours to call, and on this tape nothing would reach it either way.

---

## What I would conclude, kept apart from the counts

**Part 1 is the better of the two.** It is a bug with one cause, one fix, and a measurement that
says the join key was never set on any of 24 sheets — not a judgement call. And the 13 sheets it
"changed" changed nothing a GM sees, which is the strongest kind of result: the engine now records
what it already did.

**Part 2 removes six rows and adds nothing, and that is the right trade on your reading of the six.**
I would not have argued it from the counts alone — five bad rows for one good one is a ratio, and a
ratio does not say the sixth row should go. What settles it is that the five are not *weak* rows,
they are rows about the wrong mechanic: a trait that says "when it hits with this attack" cannot be
run at all. A sheet one row shorter is readable; a row that cannot be run is the thing the Reddit bar
is about.

**What I would watch.** s28 is now at 3 rows against print's 5-10, and the thin-card count in your
last handoff was three of fifteen invented creatures below print's 20th percentile. This change makes
that worse by construction on exactly the sheets that were already thinnest, and the gauge for it is
a script with no model in it. I would take that count again before the seat form, not after.

**One thing I did not do and would flag.** Both parts caused later calls to go live in pass-through,
and on s35 that produced two row changes with nothing to do with either rule. Any before/after on
this tape from here is contaminated the same way. If the seat form's before-number matters — and it
does, it is 15 untrackable plus 3 open_ended on model-written rows — it should be read from a run
where the seat is the only thing that changed, not from a pass-through.

Queued and untouched: a row that takes an attack's place; the seat form (its list now also carries
Vashka's backwards Disadvantage and the four wrong-form refusals above); the catalog's
"within the last 24 hours" rows, the motionless-disguise trait, "lure", and the 2014 conversion's row
names; and thin cards.
