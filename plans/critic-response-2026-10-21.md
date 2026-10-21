# Critic response, 2026-10-21: the provenance rules, not the catalog

**Trigger:** picking up after the 2026-10-21 critic review of
`sweep-2026-10-21T18-15-11`, or touching 1d / the free-row allowance / the audit
rename / the `[gap]` trace. Read `plans/BACKLOG-reskin-2026-10-21.md` beside it.

The critic's verdict on 40 blocks: **5 ship / 26 fix-lite / 9 fix.** Its central
finding, which inverts the case I had put to it:

> The catalog is not the bottleneck, and neither is the call. The rules deciding
> whether a row has enough provenance to exist are.

## The owner's ruling (2026-10-21)

**A receipt decides CREDIT, not EXISTENCE.** One free signature row per sheet on
every non-exact path, gated on a receipt the seat can actually produce. Exact
sheets get none — print closes the row set. A free row earns no clause credit and
still faces the value floor, dedup, adjudicability, body legality and the nova
caps.

## What landed

### 1d replaced, and the receipt the trait seat can produce

1d accepted a row on a quote of the GM (`asked`) or a concept-key bind. **The
trait seat is shown no text it can quote**, so neither route was open to it —
which is how six twists died in one forty, each rejected for "quoting none of the
GM's words" while being exactly what the GM asked for (the Hydra's smoking
stumps, the Vampire's thorn garden, Ossuar's bone sun, the red dragon's blind
eye, the Reliquivore's relic rot, the Golem's weeping foundation).

The fit call now also answers **`expresses`**: which of this creature's own
signature elements the row carries, from the closed list the concept call
produced. `parseFit` validates it by MEMBERSHIP — the call picks one or answers
none, and cannot invent a third. Those elements were drawn from the GM's
description, so naming one is a receipt of the same kind as a quote.

**Both** trait gates respect the allowance: the receipt gate AND the print-body
gate, since a twist IS a print body. Guarding only one does nothing.

Confirmed on a fresh ten, 0 FAIL of 10, every element checked verbatim against
that sheet's own list:

```
Hydra        "smoking stumps where heads should regrow"
Stone Golem  "carved weeping saint, tears still running"
Vampire      "a garden of blood-thorns that hides and binds"
Purple Worm  "gut full of churning blades and mail"
Toll Reeve   "tower-shield parry that never yields ground"
```

The red dragon's blind eye is a **lack**, not a signature element, so it is
unreachable by this receipt and correctly stays with the flaw row that honours it.

### The gap trace tells the truth now

`[nearest landed]` was stamped at ACCEPTANCE, ~100 lines before the receipt gate
and verb preference can veto the seat. It read "1 row in 41 shipped nothing";
**measured at ship it is 23 of 41.** Gap records now accumulate and emit once the
sheet is final, stamping `[landed: X]` or `[VETOED AFTER ACCEPTANCE: X]`, plus
`generation.gap_vetoed` and a `signature outcome:` line — the beginning of the
critic's section-6 table. `templatesFor` also fills an optional `diagnose` with
the same-seat templates it rejected, tagged `role` / `style` / `legality`.

### The three regressions

1. **Brother Halric's Mace.** The print-row add skipped when a row of that name
   already existed — and that row was a chassis row the call had renamed "Mace",
   carrying no provenance, so the closed-path sweep deleted it as filler while
   print's own Multiattack cited it. A row already carrying print's name IS
   print's row: claimed and stamped, in **both** the melee and ranged branches.
2. **Reedmarch's Guarded Stance.** The menu filter tests `monster.ac ?? scaled.ac`
   while the pool is built, but print canon moves the AC afterwards, and three
   other paths ship a trait without passing that filter. Reconciled against the
   FINISHED AC instead, which cannot miss a path.
3. **Ossuar's indefinite paralysis.** New `condition-duration` gate — but NOT the
   rule as briefed. See below.

### The audit rename rule

A rename is refused when it would drop a word the row's own receipt carries.
Extended past the brief: the rule as written covers a row bound to a GM CLAUSE,
and a free signature row has no clause BY DESIGN, so the twist rows were exactly
what it failed to protect ("Smoldering Stumps" was renamed "Searing Body" on the
first run). The `expresses` receipt guards the name too and is stamped onto the
row for the guard to read.

## What remains, in the critic's order

1. **Verb preference standing down** — a keyed template the call already declined
   is not a better answer. The other half of the critic's item 1. UNTOUCHED.
2. **Re-run the 41-line audit** with ship-time outcomes, now that the instrument
   records them. One forty measures everything below at once.
3. **Recharge shedding restricted to single-target control** (item 4). Ka'ruun's
   120-ft DC 24 charm every turn; the Air Elemental, Grum and Meshrin were
   once-per-fight ideas that losing the recharge inverts.
4. **A2 payload precedence** (item 5) — two passes with opposite precedence today.
   One rule: the payload picks. When damage is the point of the row its delivery
   picks the stat; a condition picks only when it is the point. (Brass Tyrant's
   72-fire Furnace Vent on WIS.)
5. **A strip changes the record AND the text together** — Purple Worm logs
   "Gullet Armory no longer imposes Prone, Blinded, Restrained" while the row
   still says so.
6. **Crediting an existing row requires quoting the sheet text** that carries the
   clause — the mirror of the GM receipt. Acidmaw's "four scythe-arms … carving
   with the others" was credited to a Multiattack of two identical grapples.
7. **The reader miscounts mixed Multiattacks** (item 6) — the Pit Fiend reads as
   1 x Fiery Mace, offense 11 at CR 20; the Purple Worm and gold dragon too. The
   bands are wrong on these.
8. **Item 7's list** — forced mixed Multiattacks, missing print sections (the
   Vampire's Legendary Actions, the Goblin Boss's Redirect Attack), three
   duplicate pairs, conversion leftovers, ~10 smaller items.
9. **Package six** — re-render both halves and read the twists first.
10. **1f is too broad** — a LACKS is satisfied when the finished sheet carries
    none of the thing; a flaw row is needed only where the body would otherwise
    have it.
11. **A soft report on `answered_in_prose` / `answered_by_existing`** — both are
    recorded and NOTHING reads them, so a call routing real mechanics into prose
    weakens 1e silently.
12. **Both FAILs in that review were wrong** — Vashka's lint reads "its Riposte
    even when" as an entry name (the real defect is Shield Wall's unquantified
    "a bonus to its Armor Class"); Bileglazed's speaks-by-int fires on the
    language line (the real bug is INT 4 on a creature the synthesis calls
    "fully sapient").

### Known gap, not chased

Glacier Heart's `Cold Wake` -> `Freezing Gale` is not covered by the rename rule:
"cold" appears in no receipt. That looks like a broken clause BINDING rather than
a dropped word.

## Measurement lessons — do not repeat these

1. **A rule briefed as universal may fail print.** "A row that imposes a
   condition states when it ends" **fails print 58 times.** Measured over print's
   171 affliction rows: Prone is 50 bare of 51 (it self-ends — you stand up),
   Grappled is always an escape DC, while Paralyzed, Stunned, Blinded, Charmed
   and Deafened are never bare. The gate covers only those, and admits print's
   own `while` bound (the Cloaker's "While the cloaker is attached"). **Zero false
   positives on print's 20 such rows.** Always measure a proposed gate against the
   corpus before shipping it.
2. **Match on section+trigger+effect, never trigger+effect.** A first
   classification read 79% ROUTING because `riposte`, `ward-retaliation` and
   `snap-shot` are `section=reaction` and were counted as withheld from a TRAIT
   seat.
3. **Do not reconstruct a live menu offline.** `heated-body` and `hook-drag` both
   appeared in rebuilt contexts and not in the live ones — `owned`, engine
   families, style and the resolved type all feed the filters. Ask the engine.
4. **A decline must trace what it saw.** Three separate times a guard declined
   silently and cost a run: the duplicate-mechanic strip, the repair call's
   `unplaced` verdict, and `expresses` reading `"[object Object]"` because
   signature elements are keyed `element`, not `text`.
5. **Declare collectors above first use.** `freeRowsUsed` beside the repair
   collectors threw a TDZ error inside the fit call's own catch, so the seat
   silently fell back to a seed — a code error reading as a model failure.
6. **State the pass criteria before the run.** The six criteria written before
   `receipt-ten` caught both of that change's bugs; without them the run would
   have read as a pass.

## Pins rewritten, and one deliberately not

Four trace matchers moved with new wording; **no assertion changed**. The three
pins guarding unasked decoration (`Iron Fury`, `Marked Quarry`, the forged
`ground-burst`) still refuse their rows — now for naming no element rather than
for failing to quote.

I did NOT implement the critic's "homebrew gets free rows always" as a bare
allowance, because it would have reversed those three pins with no evidence (all
six structural kills were twist sheets). The element receipt reaches the same
place more safely: homebrew gets one free row, but only when the call can name
the element it expresses.

## How to analyse the next run

Everything below is a durable command. The scratchpad scripts used on the day are
gone; `scripts/gap-outcomes.mjs` is the one that mattered and is checked in.

```bash
D=$(ls -dt smoke-out/sweep-* | head -1)

# 1. the gate table and the FAIL list
node --import ./scripts/alias-loader.mjs scripts/check-run.mjs "$D"
grep -E "· FAIL ·" scripts/smoke-evidence/CHECK-$(basename "$D").md

# 2. THE NUMBER THAT MATTERS — the signature-outcome table (critic's section 6).
#    "VETOED after acceptance" read 23 of 41 on 2026-10-21 before 1d was replaced.
node --import ./scripts/alias-loader.mjs scripts/gap-outcomes.mjs "$D"

# 3. did the twists land? each free row names the element it expresses
grep -hE "free signature row" "$D"/[0-9]*.md | cut -c1-200

# 4. every free row's element must appear in that sheet's OWN element list
for f in "$D"/[0-9]*.md; do
  grep -ho 'names the element it expresses: "[^"]*"' "$f" | sed 's/.*: "//;s/"$//' | while read -r n; do
    grep -h "signature elements:" "$f" | head -1 | grep -qF "$n" \
      && echo "  OK   $(basename $f)  \"$n\"" || echo "  BAD  $(basename $f)  \"$n\" NOT in list"
  done
done

# 5. the two NEW gates — a burst of either means it is mis-tuned
grep -hE "condition-duration" scripts/smoke-evidence/CHECK-$(basename "$D").md
grep -hE "audit rename blocked" "$D"/[0-9]*.md | cut -c1-190

# 6. the regressions, in a run nobody hand-picked
grep -hE "claimed as print|prints no row for it" "$D"/[0-9]*.md | cut -c1-180
grep -hE "guarded stance withdrawn" "$D"/[0-9]*.md | cut -c1-150
```

### Re-verifying the condition-duration gate against print

This is the newest and least-tested gate: zero false positives on print's 20
qualifying rows, but never yet exercised over a forty. If it fires often, check
it against the corpus BEFORE loosening it:

```bash
node --import ./scripts/alias-loader.mjs -e '
(async()=>{
 const {imposedCondition}=await import("@/tools/statblock-generator/reskin/author.mjs");
 const print=(await import("@/data/srd52-monsters.json")).default;
 const MUST_END=["Paralyzed","Stunned","Blinded","Charmed","Deafened","Petrified","Unconscious"];
 const OK=/until the (?:end|start) of|for 1 (?:minute|hour)|until (?:it|the target|the creature|this|that|cured|dispelled|removed|\w+) (?:dies|ends|is cured|is removed|recovers)|\bwhile\b|\(escape DC|repeats the save|until the (?:web|vines|grasp)/i;
 let n=0; const fp=[];
 for (const b of (Array.isArray(print)?print:Object.values(print)))
  for (const es of Object.values(b?.sections??{})) for (const e of es??[]) {
   const c=imposedCondition(e); if(!c||!MUST_END.includes(c)) continue; n++;
   if(!OK.test(String(e.text))) fp.push(`${b.name} / ${e.name} (${c})`); }
 console.log(`print rows checked: ${n}   FALSE POSITIVES: ${fp.length}`); fp.forEach(x=>console.log("  "+x));
})();'
```

Expected: `print rows checked: 20   FALSE POSITIVES: 0`. Any regression there
means a loosened pattern broke the corpus guarantee.

### What good looks like

- **"VETOED after acceptance" well below 23 of 41.** That is the 1d replacement's
  whole purpose; the FAIL count is not expected to move much (five forties ran
  2-3 FAIL with near-total turnover between them).
- **Free rows landing on twist sheets**, each naming a real element (step 4 all OK).
- **`condition-duration` firing rarely**, and only on genuinely unbounded rows.
- **No `prints no row for it`** on a row print actually has — Halric's Mace.
- Do NOT read a single forty's FAIL list as a work queue. Pick by frequency
  across runs.

## The run read: `sweep-2026-10-21T22-17-49` (40 blocks)

> **CORRECTED by the critic's package-six review — see
> `critic-response-2026-10-22.md`.** Two of the four pass criteria below were
> scored wrong:
> - **"17 of 17 free rows"** is stamped at GRANT, not at ship. **13 shipped.**
>   The allowance is spent at grant and never released when the granted row is
>   vetoed (Bog Hound, Thunderwall Drake, Drowned Choir, Trench Antiphon).
> - **"`condition-duration`: 1 firing, correct"** is a **false positive**. Drowned
>   Choir's `One Voice` grants *immunity* to Deafened and imposes nothing; the
>   writer's record said otherwise and I read the gate's message instead of the
>   row. The 2014 paralysis hole it was supposed to close is also still open
>   (`checker.mjs:673` skips every `e.print` row).
>
> The claim this package asked the critic to attack — that an element receipt
> substitutes for a GM quote — **failed**. Do not re-use the receipt argument.


Measured against the six criteria above. **All four "what good looks like" tests
pass.** The 1d replacement did what it was for.

| criterion | result |
|---|---|
| VETOED after acceptance well below 23 of 41 | **10 of 30 (33%)**, was 23 of 41 (56%) |
| free rows land, each naming a real element | **17 of 17 verbatim in their own sheet's list** |
| `condition-duration` fires rarely, only on unbounded rows | **1 firing**, correct (below) |
| no `prints no row for it` on a row print has | **2 firings, both verified correct** against the corpus |

- **The outcome table**: 30 seat records — 20 landed, 10 vetoed, 0 dropped. Causes:
  63% over-decline, 17% role shelf, 7% legality, 13% genuine gap. Consistent with
  the catalog being ~93% complete for observed demand.
- **`condition-duration`** fired once, on the Drowned Choir's `One Voice`
  (Deafened, never bounded). Correct — print bounds every Deafened it hands out.
  The same row's rename to "Deafening Chorus" was blocked for dropping the GM's
  word "voice", so both new guards engaged on one row and neither mis-fired.
- **The audit rename rule** blocked 6 renames, all defensible (an unpaid element,
  two print/user-owned names, a promised Prone the host row lacks, a re-weaponing).
- **Regression 1 held.** The two `prints no row for it` firings were the Mage's
  `Mire Rot` and the Priest's `Warhammer`. Print confirms the Mage prints neither
  and the Priest prints `Mace`, not `Warhammer` — and **Halric's sheet shipped
  `Mace` and `Radiant Flame`, exactly what its Multiattack cites**, so the
  withdrawal hit a duplicate weapon row and not print's own.
- **Regression 2 held.** `guarded stance withdrawn` fired once, reconciled against
  the finished AC.

### The instrument was broken and read as a clean run

`gap-outcomes.mjs` matched **0 of 30** records on first use. Its single positional
regex required the outcome stamp BEFORE `[menu:]`, but gap records now emit at
sheet-final, which puts the stamp last — and `(\S+)\]` could not span
`[VETOED AFTER ACCEPTANCE: <id> never reached the sheet]`. It printed a table of
zeroes, which looks exactly like a run with nothing to report.

Fixed by reading every field **by name** rather than by position, and by counting
and printing anything unparsed. This is measurement lesson 4 again, one level up:
*the instrument must also trace what it saw.* A seventh lesson:

7. **An analysis script that reports zero has two possible causes.** Never accept
   a zero from a parser without first confirming the thing it parses exists
   (`grep -c "\[gap\]"`). Field order in a free-form trace line is not a contract.

### Pick by frequency: `two-novas` is the one recurring defect

Tallied across all six forties (count of `two-novas` firings per CHECK file):

| run | 15-19 | 15-59 | 16-48 | 17-45 | 18-15 | 22-17 |
|---|---|---|---|---|---|---|
| firings | 0 | 0 | 1 | 1 | 0 | **2** |

Four firings in three of six runs, on **three different creatures across both
editions** — Knell Swarm, then the Air Elemental (2024, `lurker-5`,
"Chorus Barrage" + "Whirlwind") and Rimeheart Stalker (2014,
`brute-9-juggernaut`, "Killing Cold" + "Threshold Execute"). Every other FAIL
class in the backlog's P1 list has appeared once, or is closed.

The gate is sound — re-measured independently: **0 of 329 print blocks carry two
Recharge Action rows**, 72 carry exactly one (`checker.mjs:456`). So this is a
real engine defect, not a false positive, and it is the only item in the P1 "long
tail of one-offs" that is **not** a one-off. It is the evidence-backed next pick.

### Package six is built

Rendered from `sweep-2026-10-21T22-17-49` with no new run — the 40 blocks and
their traces were already on disk:

```bash
node --import ./scripts/alias-loader.mjs scripts/review-batch.mjs smoke-out/sweep-2026-10-21T22-17-49
node scripts/critic-files.mjs plans/RELEASE-case-receipt-2026-10-21.md REVIEW-sweep-2026-10-21T22-17-49
```

- `scripts/smoke-evidence/RELEASE-for-critic-2024-2026-10-21-receipt.md` — the
  case on top, then 20 2024 blocks (Stone Golem is the 2024 twist to read first).
- `scripts/smoke-evidence/RELEASE-for-critic-2014-2026-10-21-receipt.md` — 20
  2014 blocks, including four of the five headline twists (Hydra, Vampire, Bone
  Sun Lich, Adult Red Dragon).

Verified before handing over: 40 fenced renders per half, **zero empty** (the
2026-10-02 failure mode where a fence came back blank or carried the other
edition), and each named free row present in its own sheet's render and trace.
Jest 198 suites / 5763 passing (26 skipped), build clean.

**The case asks the critic to attack one claim**: that the `expresses` element
receipt is hard to satisfy spuriously, since it is what justifies refusing the
critic's broader "homebrew gets free rows always" while keeping the three
unasked-decoration pins.
