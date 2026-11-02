# Roadmap results — 2026-11-01

Written per `plans/release-roadmap-2026-11-01.md` §7. `predicted` is written before the
run and never edited after.

Baseline (from the roadmap §3, `sweep-2026-10-30T02-34-52`): 3 FAIL of 40
(`single-target-ceiling`, `damage-dice`); `imposes` 22 of 25 (88%); `gate` 11 of 12;
suite 164 suites / 4,472 tests.

---

### 1a — `imposes` 22/25 → 25/25

predicted:   rows owing `imposes` 3 → 0. Destructive `record reconciled: … no longer
             imposes Prone` firings 6 → 0; the legitimate partial reconcile (Corrosive
             Daub, `keeps Grappled and drops Restrained`, 2 firings) survives. Checker
             table otherwise unchanged: 3 FAIL, same two classes. Suite +1 spec.
             Two distinct causes, not one missing stamp:
               (i) the reconcile pass asks `imposedConditions` "is the clause still
                   there?", but that function answers "does this row impose this?" — its
                   `PRECONDITION` guard (`\bif\b[^.]*$`, there for Evasion's "can't use
                   this trait if it has the Incapacitated condition") also matches print's
                   SIZE GATE, "if the target is Medium or smaller, it has the Prone
                   condition". So a correct catalog record is deleted by the one reader
                   blind to it. `IMPOSES_BY_TEMPLATE` already annotates three entries
                   `// behind a size gate`.
               (ii) 9 donor rows impose Prone in their own text and declare nothing
                   (`skirmisher-{3,8,13,18}-{mounted,winged}/Melee Attack` charge riders,
                   `skirmisher-8-hurler/Hurled Burst`). The 4 `brute-*-charger/Trample`
                   rows that also match REQUIRE Prone and must stay undeclared.
measured:    rows owing `imposes` 3 -> 0 (deterministic: 9 donor rows stamped, 71 of 75
             donor rows now declared, and the only 4 undeclared are the Tramples that
             REQUIRE Prone). Forty pending — item 1 has one forty at its stop point.
             Reconcile: the 6 destructive firings cannot recur (the reader now reads the
             form) and the legitimate partial survives (Corrosive Daub: Grappled present,
             Restrained absent -> still drops Restrained).
runs:        (forty pending at item 1's stop point)
suite:       165 suites / 4,484 tests · build clean
commit:      (uncommitted)
not done:    the `has the (\w+) condition` FALLBACK in checker.mjs is NOT deleted. It is
             `e.imposes ?? <regex>`, a true fallback, and whether it ever fires is an
             equivalence question the forty answers. Deleting it blind would be the
             opposite of the `gate` discipline this item is modelled on.
surprises:   THREE, and the first changed the fix.
             1. Neither cause was "a missing stamp at the fill site". The chassis
                `{condition_minor}` fill already stamps (2026-10-26). `shield-bash` was
                already in `IMPOSES_BY_TEMPLATE` and `renderTemplate` returns
                `imposes: "Prone"` at every band — the record was produced and then
                DELETED by the reconcile pass, 6 of its 8 firings on the last forty.
             2. The reader's blind spot was not worked around but REMOVED, and print is
                why: of the 49 `if` clauses standing before "has the X condition" in the
                corpus, 47 are a size restriction ("If the target is a Large or smaller
                creature", 24x; Medium 18x; Huge 5x) or an HP threshold, and all 47 are
                real impositions. Exactly ONE is the Evasion precondition the guard exists
                for. The guard was suppressing 47 true readings to catch 1.
                Evidence the reader was wrong rather than the tags: `imposes-grammar.spec.js`
                ("every tag agrees with the grammar that reads it") passes UNMODIFIED after
                the fix, having failed on the 9 new tags before it.
             3. The fix repairs 10 size-gated impositions across the forty that were
                invisible to every consumer of `imposedConditions` — which also feeds
                `duplicate-mechanic`, `condition-duration` and the A2 save stat, so a
                third Prone-imposing row could previously slip the "at most twice" cap.

### 1b — `area` declared, not read off the sentence

predicted:   area rows carrying a declared `area` 0 of 11 -> all template-backed rows
             (7 of the 11 on the last forty have a template; 1 is print, 3 are chassis).
             Readers retired only if equivalence holds over a forty.
measured:    declaration coverage 2 templates -> 15 (13 whose frames state a geometry,
             plus the 2 that take a `{target}` slot); the render now returns
             `{shape, size}` for all of them and the row carries it. Forty pending.
runs:        (forty pending at item 1's stop point)
suite:       165 suites / 4,495 tests · build clean
commit:      (uncommitted)
not done:    No reader retired. The checker's `(\d+)-foot (Cone|...)` and `areaDamage`'s
             prose fallback both stay until a forty shows equivalence — print rows and
             donor/chassis rows still have no declaration, so equivalence CANNOT hold
             yet. Donor-side area declarations are unbuilt (same shape as 1a's 9 stamps).
surprises:   TWO, and the second was a latent bug this item would have shipped.
             1. The item as specced could never have worked: the render resolves a shape
                only for templates declaring `targets` — there are TWO — while THIRTEEN
                state their geometry inside the frame text. So the ceiling was 2 of 11.
                Fixed by deriving the geometry from our own frames ONCE at module load
                (`areaOfFrame`), the same boundary move as `gateFromName` on a donor's
                name and `PRINT_ROW_NAMES` on the corpus.
             2. Where the field DID resolve it was wrong: `AREA_SHAPES` is
                `Object.keys(AREA_LADDER)` — Cone and Line — so a 30-foot EMANATION
                declared `area: false`. Nothing caught it because the carrier
                (`DECLARED_BY_WRITER`) never carried the field at all. Carrying it
                unfixed would have made `areaDamage` answer "not an area" for every
                Emanation row — the third sighting of the `gate` disease (declared, then
                not carried) and an instance of the warning from that landing: completing
                a field exposes heuristics that depended on its incompleteness.

### 1c — the `print` flag (owner ruling 4: text-equality)

predicted:   `print_text` stamped once at the end of the print-canon block; the weapon
             re-dice and the rider weld's unasked-on-print refusal read it instead of
             `print`; `print_name_only` deleted. Instrument: the twelve's Reed Dart ships
             d4, the Hobgoblin Captain keeps "Slashing plus Poison", Owlbear and Vampire
             byte-identical.
measured:    NOT BUILT AS SPECCED — both consumers sit ABOVE every site that sets the
             flag, so neither can read a field stamped at the print-canon block:
               - the two weapon re-dice sites are at generate.mjs 6167 and 6196; every
                 `print = true` assignment is at 6300+ (6300 Amphibious, 6466/6518/6547
                 the canon adds, 6619/6639/6728, 7166/7217/7306/7319). The single
                 exception is a Beholder-shaped `overlay_bite` at 2321, which occurs 0
                 times in the last forty. So the re-dice's print exemption is nearly
                 inert, and the Reed Dart's real cause was the missing `dart.die`,
                 already fixed 2026-10-30.
               - the rider weld's guard is at 5450, also above them all.
             THE GUARD HAS NEVER FIRED: 0 occurrences of "unasked on a print row" across
             all four saved runs (sweep-02-34-52, twelve-03-51-21, warrant8, spear5),
             while its siblings "duplicate trigger" and "a push that undoes its own row"
             fired 2 and 2, and "signature rider:" succeeded 10 times. It was reported
             as verified on 2026-10-30; it was unreachable.
             REPAIRED INSTEAD, with facts that exist at the weld: the print MATCH
             (`pcPlain`, resolved at 2589 and already read at 5606) and that match's own
             `meleeRows`/`rangedRows` names — a closed corpus fact, not prose. Reachable
             in principle; the forty proves it fires.
runs:        (forty pending at item 1's stop point)
suite:       165 suites / 4,503 tests · build clean
commit:      (uncommitted)
not done:    `print_text` is NOT added, and I propose dropping it unless a consumer
             appears: the two it was ruled for cannot use it where they sit, and with the
             guard reading the print match it is not needed there either.
             `print_name_only` is therefore still present but now unread by the guard.
surprises:   TWO.
             1. The ruling's premise was partly void. The flag's three meanings are real,
                but neither consumer was actually being misled by them — one ran before
                the flag existed, the other was dead code.
             2. Why the later strip does not cover the original defect: the print-canon
                melee pass DOES remove a chassis condition clause (6616, "print's row
                carries print's rider and no other"), but its pattern is the bare
                ", and the target has the X condition" form. A welded SAVE block
                ("…subjected to the following effect. *Constitution Saving Throw*…") is a
                different shape and survives it. That is exactly how the Dire Wolf
                shipped a rest-long contagion on print's own Bite — so the guard has a
                real job, which is why it was repaired rather than deleted.

### 1d — one `rowShape(e)` reader

predicted:   (not started)
measured:    NOT STARTED — deliberately deferred, see `not done`.
runs:        —
suite:       —
commit:      —
not done:    The whole item. It is a ~15-site behaviour-preserving refactor (7 copies of
             the dice regex, 8 of `Attack Roll`) that moves no release number, and the
             three owner-ruled soundness items (3b swarm, 3d fire rider, 3a/3c the last
             two checker FAILs) do. Flagged for the owner to order rather than taken
             silently out of turn.
surprises:   none

### 1e — the rider hold gate reads the record

predicted:   the hold half reads `row.imposes` (complete after 1a) and the save half a
             declared fact; the text read survives only as a traced fallback.
measured:    both halves declared. `frame_save` derived once at module load from our own
             frames (the `frame_area` boundary move): contagion/affliction true,
             snatch/bolt-restrain/adhesive false; every template declares it for every
             frame it has. The text read now fires only when a row carries no record, and
             traces "rider hold gate fell back to the text" when it does.
runs:        (forty pending at item 1's stop point)
suite:       165 suites / 4,503 tests · build clean
commit:      (uncommitted)
not done:    nothing for this item
surprises:   ONE, and it is the worst of the day. My first cut referenced `bandFor`,
             which generate.mjs does not import — a guaranteed ReferenceError on EVERY
             templated rider weld — and the full suite went green, 165 suites / 4,495
             tests, because no unit test drives a rider through the weld. Same shape as
             the swallowed throw recorded in plans/ ("the ceiling gate reported 0 firings
             while throwing on every row").
             Fixed by re-exporting `bandFor`, and then by making the gap impossible to
             repeat: the new weld test was itself WRONG TWICE before it could catch the
             bug — the fit call returned the body JSON (seat missed), then returned a
             pick with no GM quote (declined as decoration) — and I verified the final
             version by removing the import again and watching it FAIL, then restoring it.
             A test that claims to exercise a path must be shown to fail without it.

### 3b — the swarm's 90 (owner ruling 1: GO)

predicted:   forty #29 bite <= 51 at a soft margin, not a FAIL; `single-target-ceiling`
             0 on the swarm; exactly one attack row and no Multiattack.
measured:    per-band, through scaleDonor: CR 9 clamped 63->35, CR 13 clamped 90->51,
             CR 5 clamped 36->31; CR 1/3 untouched (print's own swarm range); CR 17/20
             already under. Hit totals after the dice snap: CR 9 at 1.03x the ceiling,
             CR 13 at 1.04x, CR 5 at 1.10x — all SOFT, where CR 9 was 1.83x and CR 13
             1.76x FAIL before. Forty pending.
runs:        (forty next)
suite:       166 suites / 4,511 tests at this point · build clean
commit:      (uncommitted)
not done:    THE RULING'S SECOND HALF IS NOT BUILT — the surplus is not moved, because
             there is nowhere legal to put it. Measured on #29 through the real checker:
               bite 90, area 67 (shipped)   -> FAIL single-target-ceiling, soft hot-offense
               bite 50, area 67 (clamp)     -> no FAIL, soft aim-dpr + band
               bite 50, area 108 (+surplus) -> FAIL nova-cap
               bite 50, area 67 ungated     -> FAIL under
             The sheet's area row is a Recharge nova and print caps nova damage per
             use, so moving surplus there trades one FAIL for another; ungating it to
             dodge that fails `under`. The clamp ships alone and the round lands near
             half budget (soft `aim-dpr`/`band`). Owner's call whether that trade stands.
surprises:   THREE.
             1. No swarm donor HAS an area row — the plan's "create it from the swarm
                donor's area frame" has no frame. The area row on a generated sheet is
                the signature slot, fitted long AFTER scaleDonor, so scale.mjs could not
                have moved anything into it even if nova-cap allowed it.
             2. My first clamp did nothing: the budget loop that follows the per-hit seed
                drives per-hit back UP until the round meets the card, so a clamp placed
                before it set 51 and the loop returned 90. Moved after the loop.
             3. `trace?.()` in scale.mjs would have thrown — scale.mjs has no tracer and
                takes none, and optional-call does not protect an UNDECLARED identifier.
                Same shape as 1e's unimported `bandFor`, caught the same day. The clamp
                is recorded as a field (`hit_clamped`) instead.

### 3d — fire as a rider (owner ruling 3: YES)

predicted:   re-run `spear5`; the Cinder Knight ships "Piercing plus Fire"; the Vestry
             Wyrd keeps its fire rows; the living bonfire and the Hobgoblin Captain
             unchanged.
measured:    deterministic replay of the Cinder Knight case through the real pipeline:
             "18 (4d6 + 4) Piercing damage plus 13 (3d8) Fire damage" — print's Knight's
             Greatsword shape. A purely physical concept gains no rider. Prompt now asks
             for both halves and names the failure it corrects. spear5 re-run pending.
runs:        (with the forty)
suite:       166 suites / 4,514 tests at this point · build clean
commit:      (uncommitted)
not done:    nothing for this item
surprises:   ONE, and it is why the plan's spec alone would not have fixed the case. Two
             paths carry a weapon row, and the owner's own example takes the one the plan
             did not name: a row the GM NAMES ("carries a flaming spear") becomes a PART,
             which never reaches the damage-type block the 10-30 override lives in. The
             part builder strips the energy component and FOLDS its damage into the
             physical main, so the number survived and the type was erased — which is
             exactly "no fire anywhere". Both paths are now handled; the part path is the
             one that mattered.
             Also caught in my own edit: setting the rider to the demoted energy makes
             `rider === wanted`, and the "same type on both halves" collapse guard then
             refuses to write the rider at all — the energy would have been lost exactly
             as before. The demotion had to move to the same site as the rider move.

### 3a — the Purple Worm's Swallow (64 vs 51)

predicted:   the forty's `single-target-ceiling` count goes to 0 outside the swarm.
measured:    the swallow frames spent the row budget TWICE (`{avg}` on the hit plus
             `{avg_half}` ongoing) = 42 + 22 = 64 at CR 15. Print, all 7 Swallow rows:
             FOUR of five damaging ones deal nothing on the hit (only the Kraken's 23),
             and the tick is a flat constant — Behir 21 at CR 11, Purple Worm 17 at CR 15,
             Kraken 24 at CR 23, Tarrasque 56 at CR 30. Frames rewritten to print's
             shape: no hit clause, one band constant (0/7/14/21/21/28, running max).
             Renders at CR 9/15/23 = 14/21/28, all inside the ceiling. Forty pending.
runs:        (forty next)
suite:       166 suites / 4,514 tests at this point · build clean
commit:      (uncommitted)
not done:    nothing for this item
surprises:   ONE, checked because it was a regression risk: a zero-damage row could have
             been floored out, losing the swallow engine the critic praised. `valueCheck`
             at CR 9/15/23 gives ev 25.3/35.2/35.2 against floors 16.6/22.4/18.7 — the
             engulf carries the value, as print intends. At CR 23 it now takes a
             Recharge gate for being over the nova ceiling, where print's Kraken Swallow
             is an ungated Bonus Action; noted, not chased.

### 3c — `damage-dice` on kit rows

predicted:   `damage-dice` 1 -> 0 on the forty.
measured:    root cause found: the class-weapon swap folded a component in by ADDING its
             average to the stated figure and leaving the dice untouched, so
             "16 (3d8 + 3)" + 7 shipped as "23 (3d8 + 3)", which rolls 16.5. The dice now
             re-solve through `attackDamageDiceFor`, the same helper the named-part fold
             already uses: 23 with +3 becomes "24 (6d6 + 3)", which rolls 24. Forty
             pending.
runs:        (forty next)
suite:       166 suites / 4,526 tests · build clean
commit:      (uncommitted)
not done:    nothing for this item
surprises:   none — and this confirms the roadmap's own correction that the
             `printNearAdd`/`print_text` route could never have fixed it: Unarmed Strike
             is not in the weapon table, so no re-dice reaches it. It was arithmetic.

### N1 — the ceiling gate's Bloodied strip

predicted:   the item-3 forty re-checked reads 0 FAIL of 40.
measured:    **0 FAIL of 40** (was 1). The swarm now reads 53 at CR 13 — a soft at 1.04x
             — where it read 79 and FAILED. One definition now, `stripBloodiedSplit` in
             format-2024/lint.mjs, read by the checker; it covers all three forms and
             every one of print's seven swarm rows strips cleanly.
runs:        smoke-out/sweep-2026-11-01T16-53-09 (re-checked in place)
suite:       167 suites / 4,533 tests · build clean
commit:      (uncommitted)
not done:    scale.mjs still holds its own copy of the pattern. It operates on tokenised
             text it authors itself and needs a capture group the shared helper does not
             expose, so pointing it at the helper is a separate change with its own risk;
             flagged rather than done.
surprises:   TWO, and print found the second.
             1. A shared `/g` regex is stateful — `lastIndex` carries between callers, so
                one consumer's `.test()` moves another's start. That is the fault recorded
                in generate.mjs as "/g + .test() WAS LOSING MATCHES" (2026-10-30), so the
                export is a FUNCTION, not a regex.
             2. Print writes the alternate rate a THIRD way that neither copy handled:
                the Swarm of Venomous Snakes uses EM-DASHES with the clause interposed and
                its `plus 10 (3d6) Poison` component AFTER it — "8 (1d8 + 4) Piercing
                damage—or 6 (1d4 + 4) Piercing damage if the swarm is Bloodied—plus 10
                (3d6) Poison damage". Its true hit is 18; both the old pattern and my first
                widening read 24. Also: my own test's "first damage" extractor read the
                ATTACK BONUS on the Swarm of Piranhas ("+5 (with Advantage …)"), so the
                test was wrong and the code was right.

### N2 — trace the clamp

predicted:   the trace appears on forty #29.
measured:    fires with the right text: "swarm hit clamped: per-hit 90 -> 51 — one attack
             may not carry a whole CR 13 round …". Verified by deterministic replay; the
             forty will show it on #29.
runs:        (in-process replay; forty pending)
suite:       167 suites / 4,533 tests · build clean
commit:      (uncommitted)
not done:    nothing
surprises:   my first probe passed `body: 'swarm'` and the trace did not fire. The engine
             reads `options.bodyType`, not `body` — my probe was wrong, not the code.

### N3 — the batch check's stock-name exemption

predicted:   invented-name repeats reads 0 with the exemption; the sameness count is
             unchanged (still reported).
measured:    **0 invented-name repeats** on the forty, with **29 stock convergences**
             listed and counted, not hidden. Byte-identical texts 0. The check did not
             exist before — it was an ad-hoc script — so it is now part of `check-run`
             output.
runs:        smoke-out/sweep-2026-11-01T16-53-09
suite:       167 suites / 4,533 tests · build clean
commit:      (uncommitted)
not done:    nothing
surprises:   ONE, and it changed the instrument from names to FLAGS. Exempting print names
             plus template names left THREE repeats that were also catalog furniture:
             `Marsh Stride` (a species kit row), `Great Weapon Master` (a class feature)
             and `Legendary Action Uses: 3` (a derived rules line). Each carries a DECLARED
             flag saying so — `kit`, `feature`, `rules` — so the exemption reads the flags
             rather than matching names against more catalogs. The flags live on whichever
             edition the engine built, so both sides are read and unioned per name; a 2014
             row looks unflagged on its own side, which is how those three first read as
             inventions.

### 6 — the review package carries header lines

predicted:   the critic stops listing it; a lack whose subject is a header field becomes
             gradeable.
measured:    **40 of 40 blocks now carry a Languages line** (was 0 of 40). The lack case
             reads, in the critic's own view: "Languages Giant" on the Crag Exile, whose
             input was "speaks only Giant and understands no Common" — the omission of
             Common IS the expression, per the Granite Exile ruling, and the critic can
             now see it. Skills, Saving Throws, Resistances, Immunities, Vulnerabilities
             and Senses print alongside it, both editions.
runs:        rendered from smoke-out/sweep-2026-11-01T16-53-09
suite:       167 suites / 4,533 tests · build clean
commit:      (uncommitted)
not done:    nothing
surprises:   ONE: the headers were never missing from `RELEASE-for-critic-*` (20 of its
             blocks carried Languages). They were missing from `CRITIC-blocks-*`, the
             statblock-only package — which is the one the owner actually sent. The item
             was real and the file named in it was not.

### 5 — name-text agreement — MEASURED AND PROPOSED, NOT BUILT

predicted:   the three gates' soft count on a forty falls.
measured:    THE INSTRUMENT IS VOID: `name-mechanic`, `no-type-in-name` and `type-fit`
             all fire **0 times** on this forty, so there is no count to move and the
             critic's cases are not what those gates look for.
             The real population, measured across three runs (398 engine rows): FOUR rows
             whose name states a weapon or body part while the row is an area and not an
             attack — and only ONE is a defect. "Grave Shard" (a Sphere of shards), "Bone
             Shard Orbit" (an Emanation of orbiting shards) and "Fanned Darts" (a Sphere of
             thrown darts, which is print's own `thrown-burst` shape) are all coherent; a
             shard or a dart CAN scatter into an area. "Wasting Bite" — a bite that is a
             10-foot aura — cannot. So a deterministic gate here is 75% false positive.
runs:        smoke-out/sweep-2026-11-01T16-53-09, sweep-2026-10-30T02-34-52,
             twelve-1030-2026-10-30T03-51-21
suite:       unchanged
commit:      —
not done:    THE WHOLE ITEM, deliberately. Whether "shards in a sphere" is coherent while
             "a bite that is an aura" is not is a judgement about meaning, which the house
             rule assigns to the call — so the plan was right that this is `name_claims`
             on the rename and wrong that the three gates could measure it. Building a
             prompt field is a GLOBAL change to every sheet, and the measured defect rate
             is ~1 per forty with no instrument to prove an improvement, so I am stopping
             and proposing rather than shipping it blind before a critic package.
             Proposal: ask the late `name follows content` pass — which already renames on
             an ELEMENT mismatch — to also put the shape question to the call, with the
             row's final text in hand (the rename call cannot answer it; the text does not
             exist yet when it runs). Instrument: that one trace firing on the Wasting
             Bite case and NOT on the three coherent ones.
surprises:   the item's own instrument was void, which is the finding.

### 3d live (spear5) — the prompt half

predicted:   Cinder Knight "Piercing plus Fire"; Vestry Wyrd keeps its fire rows; the
             living bonfire and the Hobgoblin Captain unchanged.
measured:    5 of 5, prediction met exactly.
               Cinder Knight    Flaming Spear  18 Piercing + 13 Fire
               Dawnsworn Vigil  Greatsword     14 Slashing + 10 Radiant  (print's Knight shape)
               Ashwarden Seraph Spear          12 Piercing + 9 Fire
               Kindless Bonfire Engulf         22 Fire        <- body IS energy, unchanged
               Hobgoblin Captain Greatsword    9 Slashing + 3 Poison <- print's own, unchanged
runs:        smoke-out/spear5-2026-11-01T17-32-29
suite:       167 suites / 4,533 tests · build clean
commit:      (uncommitted)
not done:    nothing
surprises:   none

### 1c live (twelve-1030) — the repaired rider guard

predicted:   fires on the Dire Wolf, or "not reached" if no decoration rider is welded.
measured:    **NOT REACHED, a second time.** 2 welds on the twelve, both
             `affliction -> Bite` on the homebrew plague-bearer (#3), which is not a print
             sheet. The Dire Wolf's action seat took `sensory-strike` as its own ROW, not a
             rider, so nothing was offered to print's Bite. Across one forty and one twelve
             the guard has had **0 opportunities**, not 0 correct refusals.
             The defect it exists for is absent: 0 sheets carry the rest-long contagion.
runs:        smoke-out/twelve-1030-2026-11-01T17-34-33
suite:       167 suites / 4,533 tests · build clean
commit:      (uncommitted)
not done:    the guard is still unproven in anger. It is reachable by construction (its
             predicate reads facts that exist at the weld) and the contagion defect it was
             built for has not recurred, but neither fact is the same as watching it fire.
surprises:   ONE, and it needs the owner's eye — a FAIL that is NOT mine and NOT new code.
             `kit-lands` FAILED on the maul case (Bellbound Warden): "the fighter kit
             landed no row on a class-NPC sheet". Diagnosis:
               - the SAME input was clean on both 10-30 twelves, where the route answered
                 `class=None`; this run answered `class=fighter`, so the gate newly applied.
                 A route flip, not a code change — the current checker run on those older
                 sheets is still clean.
               - the gate counts rows flagged `kit: <class>` or print rows named in the
                 kit's SRD lifts. The fighter kit has 4 rows and **0 SRD lifts**, so only a
                 `kit`-flagged row can satisfy it.
               - the sheet is not defective: it carries `Great Weapon Master`, flagged
                 `feature`, and the engine traced "class kit: fighter — nothing to add —
                 the sheet already answers it". The kit stood down BECAUSE the sheet was
                 already answered, and the gate cannot see that.
             So it is a latent false positive that fires whenever the route happens to name
             a class whose kit stands down. Not fixed: it is outside my assigned items and
             the fix touches the class-kit stand-down path I have not traced. The
             declared-data shape would be for the stand-down to record itself, as every
             other writer does, and the gate to read that record.

### P1 — the swarm ruling finished: fill the gated nova to the ceiling

predicted:   in-process replay on sweep-2026-11-01T17-43-19 #29 (bite 53, a damageless
             gated control row): giving that row damage at NOVA_CAP(13) clears the `under`
             FAIL and introduces no `nova-cap` and no other FAIL. Then the fresh forty's
             #29 passes with no FAIL.
             Using NOVA_CAP, not scale.mjs's local `novaCeil`: they disagree (67 vs 68 at
             CR 13) and NOVA_CAP is what the late cap one block above already enforces, so
             filling to anything else would be capped back down a line later.
measured:    NOT BUILT — the replay the plan asked for first refuted it, twice over, and
             then proved the whole single-row approach impossible on this sheet.
               1. Filling the gated row to NOVA_CAP(13)=67 DOES clear `under` — the
                  prediction held that far — but it raises `save-fit` FAIL: "a Wisdom save
                  for an effect that calls for Dexterity or Constitution". A damaging save
                  row takes Dex or Con; that gate is right.
               2. Re-keying the save does not rescue it, because the row is not a blast at
                  all. It is a `lure`: `imposes: 'Charmed'`, a 90-foot Emanation, with
                  print's 24-hour immunity clause. Damage on a charm-lure is incoherent and
                  there is no legal damage vehicle anywhere on the sheet.
               3. So I searched for ANY single-row value that satisfies both gates, by
                  rewriting the bite and re-checking:
                      hit 53 -> 1.04x ceiling, FAIL under
                      hit 58 -> 1.14x,          FAIL under
                      hit 63 -> 1.24x,          FAIL under
                      hit 68 -> 1.33x,          FAIL under AND single-target-ceiling
                      hit 74 -> 1.45x,          FAIL single-target-ceiling
                      hit 90 -> 1.76x,          FAIL single-target-ceiling
                  **The window is empty.** The ceiling admits at most ~63 before it grades
                  fail; `under` needs ~68 (print's CR 13 floor 72 x 0.95). A CR 13
                  one-attack body cannot satisfy both gates with one damage row.
measured (cont): So the requirement is COMPOSITION, not budget surgery: a clamped
             one-attack body needs a SECOND DAMAGING row, and nothing in
             `settleSheetBudgets` can create one — the gated row it would fill is whatever
             the fit call chose, and here it chose a charm. Un-clamping is not an escape
             either: it trades a FAIL for a FAIL.
runs:        in-process replay on smoke-out/sweep-2026-11-01T17-43-19 #29 (no API cost)
suite:       167 suites / 4,533 tests (unchanged — nothing landed)
commit:      —
not done:    THE WHOLE ITEM. The owner's ruling is sound and the arithmetic above is its
             real requirement; it just does not live where §5d placed it.
             Proposal, for the owner: a clamped body's SIGNATURE SEAT must deliver damage.
             Either (a) when `scaled.hit_clamped` is set, the seat's menu is restricted to
             templates whose frame deals damage (the frame knows — `frame_area` and the
             dice are already declared), so a charm cannot take the only gated slot; or
             (b) a clamped body gains a second damaging action row by construction at the
             nova ceiling, in the sheet's own energy, with the save stat the damage calls
             for. (a) is cheaper and uses declared data; (b) always works but adds a row
             the GM did not ask for.
             Until one lands, a high-CR swarm whose signature is pure control carries one
             FAIL. It is ONE sheet of 35 and the cause is now exactly known.
surprises:   the item's own instrument refuted it before a single line was written, which
             is what the plan's "in-process first" rung is for. Also worth recording: the
             gated row carried a DECLARED `area: {shape:'Emanation', size:90}` from item
             1b, which is how its nature was identified in one read rather than by parsing
             its sentence.

### P3 — the kit stand-down records itself

predicted:   the maul case re-checked reads no FAIL; a kit that genuinely landed nothing
             still FAILs.
measured:    both arms, by replay on the real sheet:
               with `stood_down: 'already_answered'`  -> soft, "it stood down because the
                 sheet already answers it"
               with `stood_down: null` (landed nothing) -> FAIL, unchanged
               with no record at all (an older sheet)   -> FAIL, so the default is strict
             Also measured and pinned: the fighter kit has 4 rows and **0 SRD lifts**,
             which is why the gate was unsatisfiable for it rather than merely unlucky.
runs:        in-process replay on smoke-out/twelve-1030-2026-11-01T17-34-33 #09
suite:       168 suites / 4,537 tests · build clean
commit:      (uncommitted)
not done:    nothing
surprises:   ONE: `scaled.classKit` already existed and was **never carried to the
             sheet** — the fourth "declared then not carried" of the day (after `gate`,
             `area` and `imposes`). Half the record was built; only the carry and the
             reason were missing.

### P2 — the material-name nudge

predicted:   the batch check's invented repeats stays 0 on the forty; do not block on it.
measured:    one sentence in the prompt's NAME REGISTER paragraph, naming the failure it
             corrects ("Iron Fist", "Stone Slam") and what to name instead. Forty pending.
runs:        (forty next)
suite:       168 suites / 4,537 tests · build clean
commit:      (uncommitted)
not done:    nothing
surprises:   none

### The pre-critic forty, second attempt

predicted:   40 of 40 if the API holds (five timed out last time; §5d says re-run only the
             missing indices with --only rather than a fourth forty).
             0 invented-name repeats (P2). `kit-lands` soft rather than FAIL if a route
             flip names a class again (P3). The swarm may still carry ONE `under` FAIL —
             P1 is not built, and whether it fires depends on whether the fit call gives
             that sheet a damaging second row; it did on 16-53 and did not on 17-43.
             So: 0 or 1 FAIL of 40, and if it is 1 it is the swarm and the cause is known.
measured:    **40 of 40, 0 timeouts** — the longer per-block timeout (420s) fixed it.
             **MY PREDICTION WAS WRONG.** I said "0 or 1 FAIL, and if it is 1 it is the
             swarm". It is **2 FAILs and neither is the swarm**: the swarm got a damaging
             second row this run and came back soft, so P1's absence cost nothing here.
             Two different FAILs appeared, both diagnosed and neither from this session's
             changes:
               1. `single-target-ceiling` — Sump Scythe Horror / Spitting Maw, 47 to one
                  target at CR 9 against a cap of 35 (1.34x). The same row read **31** in
                  BOTH prior fortys (18 Piercing + 13 Acid, so the energy was already a
                  separate component there and 3d is not implicated). It is 47 now because
                  a Grappled PAYOFF rider welded on top: "+16 if the target already has
                  the Grappled condition" — on the row that inflicts the grapple. So 47 is
                  genuinely reachable on turn two and the gate is right. A stacking
                  outcome: a part row carrying an energy rider AND a payoff rider.
               2. `duplicate-row` — Oathstone Exile, two rows named "Stone Club". Print's
                  Stone Giant HAS a row of that name; the canon pass correctly claimed it
                  (`print: true, weapon: club`), and a separate `push-prone` template row
                  took the same name. P2 is exonerated: the name is print's own, not a
                  model invention, and three prior fortys of the same sheet had no
                  duplicate. The real fault is a DETECT-WITHOUT-ACT: the engine's
                  `duplicate-name` pass found it and traced "identical copies are dropped;
                  a genuinely different second ability must be renamed" — and then did not
                  rename it. Same disease as the write-only `lint_findings` of 2026-10-30.
             Other instruments: **0 invented-name repeats** (P2 held), 31 stock
             convergences counted; `kit-lands` 0 firings (no route flip this run, so P3 is
             proven by replay only); clamp traced 2; rider guard 0 firings and 0 chances,
             a third run; coverage 37/70 (52%), concept 191/217 (88%); per-clause rate over
             the last three sweeps **73%** (was 75% — inside the churn).
runs:        smoke-out/sweep-2026-11-01T20-03-32
suite:       168 suites / 4,537 tests · build clean
commit:      (uncommitted)
not done:    the two FAILs above are unfixed and both are outside §5d's items. The release
             bar (0 fail-graded) is therefore NOT met on this forty.
surprises:   that the swarm passed. P1's refutation stands as arithmetic — the window is
             still empty when the second row deals nothing — but which of the two
             outcomes a given run gets is the fit call's choice, so the `under` FAIL is
             intermittent, not certain. Across three fortys it fired once.


---

# §8 program

### R1 — the rendered-output regression suite

predicted:   eight lint classes, each firing on the sheet the critic named in
             `sweep-2026-11-01T20-03-32` and silent elsewhere:
               empty-option          18 Ossuar
               missing-number        02 Bog Hound, 30 Altar-Gnaw
               dangling-save         02 Bog Hound
               duplicate-row-name    32 Oathstone Exile
               engulf-needs-grapple  36 Riverwight (and SILENT on 02, 06, 24, 35 —
                                     the critic calls 02 and 06 warranted)
               inline-weapon         39 Hired Handaxe
               orphan-action-row     27 Faithless Templar
               double-punctuation    28 Ilvareth (a row and the header line)
             Shape: a lint MODULE of pure functions + a RUN gate (`lint-run.mjs`,
             non-zero exit), not assertions inside `npm test`. A suite that is red on
             committed data until R3 lands would mask every new regression, which is the
             opposite of this item's purpose; `npm test` pins the detectors in BOTH
             directions on the known sheets instead, and the run gate is what fails.
             Zero API cost — it reads saved sheets only.
measured:    **10 findings on the forty, each on exactly the sheet the critic named** —
             prediction met, no extras:
               missing-number          02 Bog Hound, 30 Altar-Gnaw
               dangling-save           02 Bog Hound
               empty-option            18 Ossuar
               orphan-action-row       27 Faithless Templar
               double-punctuation      28 Ilvareth (a row AND the header line)
               duplicate-row-name      32 Oathstone Exile
               engulf-needs-a-grapple  36 Riverwight
               inline-weapon-collision 39 Hired Handaxe
             Silent where the critic says the sheet is right: the four warranted engulfs
             (02, 06, 24, 35 — it names 02 and 06 explicitly), the spell-cast actions
             (04, 26, 40), and both print-exact sheets (21, 22) report nothing at all.
             `scripts/lint-run.mjs` exits 1 on the forty and **0 on `twelve-1030`** — so
             it is a gate, not a wall.
             Five of the eight lints read DECLARED fields and no text; the three that read
             text read our own rendered sentence for an unfilled slot (the
             `placeholder-leak` class). No lint feeds a generation decision.
runs:        smoke-out/sweep-2026-11-01T20-03-32, twelve-1030-2026-11-01T17-34-33
             (saved sheets only — zero API cost)
suite:       169 suites / 4,555 tests · build clean
commit:      (uncommitted)
not done:    the conversion seam is not a lint, per §8 — R3 removes the transform.
surprises:   FOUR, all in my own detectors, and all caught by reading the output rather
             than trusting the count.
             1. `orphan-action-row` first fired 22 times: `T(ma)` read `.text` off a
                `[sec, row]` TUPLE, so the "is it in the Multiattack?" check never ran.
             2. Then 5 times: the four extras were spell-cast rows whose `rules`/`print`
                flags sit on the 2024 side, while a 2014 sheet's flat arrays carry none.
                Fixed by unioning flags by name across printings — the same fix N3 needed.
             3. Then 2: print's 2024 corpus has NO "Change Shape" row (0 of 329) though
                every 2014 dragon has one, and sheet 19 has an EMPTY 2024 side, so its
                provenance is unknowable. The lint now stands down on a sheet with no
                flags anywhere rather than guessing. That flag gap is an R3 finding in its
                own right: on a bare-print 2014 sheet nothing can tell print's rows from
                inventions.
             4. Normalising the 2014 section words ("abilities" -> "Traits") so one defect
                would not report twice made every 2014 row collide with its own 2024 twin:
                `duplicate-row-name` went to **124 findings**. Rows now carry which
                printing they came from, and duplicates are counted within one.
             Also: my spec's own helper missed that the forty's files are zero-padded, so
             four assertions failed against a null sheet. The helper was wrong, not the
             lints.

note:        §8's opening line says `rc-2026-11-01` is "Committed and tagged". The owner
             reports the commit landed with NO tag (`git tag --list` is empty). Flagging
             rather than editing the plan, in case the tag is still coming.

### R2 — classify the flaky clauses (no code)

predicted (written before reading a single trace): of the ~20 clauses that flip between
             sweeps, the dominant class is **the fit call refusing a menu it was shown** —
             `idea-register-not-length` measured 91% of seat misses that way, and the
             critic's independent read says the same thing from the sheets ("the model's
             idea text is frequently excellent and 'closest accepted' is where it dies").
             Split predicted: **13–15 of 20 refusals · 2–3 wrong section · 3–4 never
             reached a seat.** If refusals dominate, R4 fixes churn as a side effect and
             best-of-two is never bought.
measured:    **Refusals dominate, harder than predicted.** Across three fortys, 240
             seats (both seats x 40 sheets x 3 runs):
               refused the menu (`closest accepted`)   125   52%
               a template genuinely fit                 35   14%
               miss, nothing held it                    19    7%
               no seat attempted (print-exact etc.)     61   25%
             Of seats that were ATTEMPTED (179): **125 refused = 70%**, 35 fit = 20%,
             19 missed = 11%.
             On the 10 flaky sheets alone, 60 seats: 36 refused, 9 fit, 4 missed, 11 not
             attempted — **73% of attempted seats refused**, against my predicted
             13-15 of 20. The direction was right; the magnitude is worse, and it is a
             property of the whole forty rather than of the flaky clauses specifically.

             What `closest accepted` means, in the engine's own words: the fit call was
             shown the menu, **refused every template on it**, named one as nearest, and
             the engine shipped that nearest one anyway rather than drop the row. So on
             seven of every ten attempted seats the model says "none of these" and a
             stock row lands wearing the idea's name.

             That one number explains both standing complaints at once:
               - CHURN is a consequence. Which nearest-miss lands varies run to run, so a
                 clause is answered or not by whichever template happened to be nearest.
                 This is why a third of clauses flip without anything changing.
               - SAMENESS is a consequence. The nearest template is drawn from a finite
                 set, so closing one path hands the seat to the next-nearest — exactly the
                 migration pattern the critic traced through Weapon Lodge's three hosts and
                 Fear Aura -> Shield Bash -> exploiter rows.
runs:        smoke-out/sweep-2026-11-01T{20-03-32,17-43-19,16-53-09} (saved traces only)
suite:       unchanged — no code
commit:      —
not done:    nothing for this item. The §8 condition is met: refusals dominate, so **R4
             addresses the cause and best-of-two should not be bought** — it would pay
             twice for the same 70% refusal rate and keep whichever run's nearest-miss
             happened to look better.
surprises:   the magnitude. 91% was the earlier figure for seat MISSES; this is 70% of
             all attempted seats, which is a different and larger claim: the common case
             is not that the engine fails to seat a row, it is that it seats one the model
             explicitly refused.

### R3 site 1 — the minor-condition rider becomes a declared segment
predicted:   row-text `.replace(` sites 190 -> 187; `[^.]*` patterns generate 36 -> 32,
             templates 3 -> 3 (two retired, one added as the single shared definition).
             Equivalence over every row of sweep-2026-11-01T20-03-32, old pattern chain
             vs the new splitter: 0 divergences on the ", and the target has the X
             condition" form; 1-6 rows SHORTER on the ", and it has the X condition"
             form (two of the four old copies read "the target" only); 0 required
             conditions ("one creature that has the X condition") touched by either;
             ~700-900 rows scanned.
measured:    sites 190 -> 187. `[^.]*` generate 36 -> 32, templates 3 -> 3, as predicted.
             406 rows scanned (125 in 2024 `sections`, 146 in the 2014 flat keys, 135 in
             `other_edition.sections`) — the prediction of 700-900 was ~2x high; the
             forty's sheets average ten rows across three printings, not twenty.
             405 of 406 agree with the old print-canon pattern. 1 divergence, and it is
             the fix: the Purple Worm's Bite KEEPS print's "…, and it has the Restrained
             condition until the grapple ends". 0 required conditions touched.
             Floors: Owlbear print-exact — unchanged (Rend +7, 14 (2d8 + 5) Slashing,
             HP 59, AC 13, print's array). Purple Worm grapple pair — unchanged, whole.
             Feature arms on the targeted eight: brass tyrant — the fear LEFT the 71-Fire
             breath and is paid on a damageless Fear Aura (the repair arm fires);
             mind flayer — Deafened SURVIVES on a Psychic damage row (not a blanket ban);
             bog hound and glacier revenant — their own grapple + Restrained pairs intact;
             glacier revenant — no vestigial rider printed and nothing claims one did.
runs:        smoke-out/clause8-2026-11-02T00-03-45 (8 sheets, 8/8 ok, 1 FAIL)
             replay: scratchpad equivalence over smoke-out/sweep-2026-11-01T20-03-32
suite:       170 suites / 4565 tests · build clean
commit:      (uncommitted at hand-off)
not done:    - the PRECONDITION half of the print-canon strip ("If the target … has the X
               condition") is still a pattern; it is a payoff's `consumes`, a field the row
               already declares. Marked TODO at the site.
             - the one-fact-one-home shed's SECOND pattern still cuts a whole SENTENCE
               ("(?:The target|It) has the X condition[^.]*\."). That is the §8 violation
               with teeth — see surprises.
             - the Dire Wolf's welded contagion on print's Bite is NOT fixed by this site
               and was not expected to be: a welded save block is a weld fault (next site).
surprises:   1. FOUR COPIES, NOT ONE. The plan named one print-canon strip; the same cut
                lives at the authored-row repair, the print-canon clone, the print-canon
                rename and the one-fact-one-home shed — each with its own near-miss
                ("the target" only at two of them, a `cond` filter at the fourth). All
                four read one definition now; the shed's difference is a parameter.
             2. PRINT OVERRULED THE UNIFICATION. Of print's 52 rows carrying the rider
                shape, 10 are the SECOND HALF OF A GRAPPLE — "The target has the Grappled
                condition (escape DC 16), and it has the Restrained condition until the
                grapple ends" (Behir, Chain Devil, Couatl, Kraken, Marilith, Purple Worm,
                Remorhaz, Roc, Roper, Salamander). Cutting that clause kills the grapple.
                Two of the four old patterns were ALREADY cutting it (the Roper's Poisoned
                half, the Purple Worm's Restrained half) — a pre-existing fault, not a new
                restriction. The splitter refuses a clause bound to a hold its own sentence
                imposed, unless the caller NAMES the condition (`only`), which is the shed
                deciding deliberately rather than cutting blind.
             3. I INTRODUCED A REGRESSION AND THE REPLAY CAUGHT IT. With the pair guard on
                at the shed, step 1 refused the pair and the shed's untouched second
                pattern then took the Poisoned half and left a dangling "and". Found by
                replaying print's own Roper row, not by the batch. Fixed by the `only`
                bypass; both shed paths now byte-match the old output.
             4. THE ROPER SHIPS BROKEN, AND IT IS NOT THIS SITE. On the batch its Tentacle
                lost print's WHOLE grapple sentence, so Reel pulls "each creature Grappled
                by it" with nothing that grapples (R1's `engulf-needs-a-grapple` class on a
                print-exact sheet). Proved pre-existing: for cond=Grappled the old and new
                step 1 are identical no-ops and the shed's second pattern removes the
                sentence. This is the strongest argument for the next site.
             5. The batch's 1 FAIL is `single-target-ceiling` — the brass tyrant's
                Merciless Strike at 71 to one target at CR 17 against print's 51. Same
                payoff-stack class as the RC's accepted Spitting Maw FAIL; no damage path
                was touched here.

### CORRECTION to the R3 site-1 block — the Roper's lost grapple
The site-1 block named the one-fact-one-home shed as the cause. That was wrong, and
the error was mine: I replayed the shed's pattern against a Roper Tentacle I typed
from memory **with damage in it**. Print's Roper Tentacle deals NO dice damage at
all — "*Melee Attack Roll:* +7, reach 60 ft. The target has the Grappled condition
(escape DC 14) from one of six tentacles, and the target has the Poisoned condition
until the grapple ends." The real cause is the print-canon row CLONE: `rowOf`
anchors every field it reads (`type`, `rider`, `dmg`) on a damage expression, so for
this row `pr.rider` came back EMPTY and print's grapple was never carried onto the
clone. Measured: 18 of print's 354 melee attack rows deal no dice damage; 17 are
flat "1 damage" critters (Bat, Rat, Cat…) and the Roper is the only one carrying
real mechanics. Belongs with the clone's parser, not the shed. ("A probe must be fed
real context" — fifth instance; the fabricated input was a row I was sure of.)

### R3 site 2 — the weld declares what it welded; the shed reads the declaration
predicted:   1. every welded host carries `weldedRiders`; 1-4 welds on twelve-1030.
             2. the Dire-Wolf class (a welded SAVE BLOCK on print's own row) is
                proven by DETERMINISTIC REPLAY only — 0 live firings expected,
                because the case is now prevented upstream.
             3. the shed: byte-identical on its 33 "drops"; `shed_blocked` recorded
                on the 38 it cannot act on; 0-3 shed firings on twelve-1030.
             4. row-text `.replace(` sites 187 -> 186.
             5. suite green, build clean, floors unchanged.
measured:    replay, zero cost: the shed has fired 77 times across saved runs —
             **33 "drops its rider", 38 "keeps its rider — the strip has no pattern
             for how this row words it", 6 "LEAVES"**. One-fact-one-home cannot act
             on 49% of its own firings. The 38 are frame sentences where the
             condition is woven in (Entomb, Cocoon, Smother, Gullet Armory, Caustic
             Shell, Living Silk, Snaring Thorns…) and no cut leaves a runnable row.
             8 welds on the last forty; the weld declared nothing.
             `unaskedOnPrint` has fired 0 times in every saved run — that guard is
             still dead; the Dire Wolf is clean because the rider is refused
             upstream for want of the GM's own ask.

             1. PARTLY WRONG, for a good reason. 4 weld traces (2 unique x 2
                printings), 1 row shipping `weldedRiders`. The second did declare —
                and was then READ AND CLEARED by the new print-canon drop, which is
                the field working, not failing. Not "declared then not carried".
             2. **WRONG, in the good direction — it fired LIVE.** The Vampire's
                chassis "Thorn Lash" was becoming print's own row, and the trace
                reads: `print canon: welded rider leaves — "Thorn Lash" is the
                Vampire's own row, and the engine's welded "If the target is a
                creature and isn't already Po…" is not print's rider`. It shipped as
                `Grave Strike: … 8 (1d8 + 4) Bludgeoning plus 7 (2d6) Necrotic …
                Grappled (escape DC 17) from one of two hands.` — print's row,
                clean, `weldedRiders: []`, `print: true`. The Dire-Wolf class is
                fixed structurally, not latently.
             3. UNEXERCISED. 0 shed firings on twelve-1030, so `shed_blocked` has no
                live evidence on this batch; the 33/38/6 replay is its warrant. The
                33 "drops" path is unchanged in shape (declared segments are tried
                first, then the same patterns).
             4. WRONG: 187 -> 187. The shed's rider pattern had already retired in
                site 1, and this site adds no cut — it adds a declaration. `[^.]*`
                unchanged at generate 32 / templates 3. The honest instrument for
                this site is the 38-firing number, not the pattern count.
             5. suite 171 suites / 4570 tests · build clean. Floors: Owlbear,
                Purple Worm, Stone Golem, Vampire, Dire Wolf, Adult Red Dragon all
                ran; Purple Worm's grapple pair intact.
runs:        smoke-out/twelve-1030-2026-11-02T00-27-21 (12/12 ok, 1 FAIL)
             before: smoke-out/twelve-1030-2026-11-01T17-34-33 (1 FAIL of 12)
suite:       171 suites / 4570 tests · build clean
commit:      (uncommitted at hand-off)
not done:    - the shed's whole-sentence pattern still stands. The 38 prove a
               declaration cannot cover those rows: the condition is the frame's own
               payload. A cut cannot fix them and I did not invent one. The real
               answer is not loading a third holder at all — R3b — and
               `shed_blocked` is now the field that gives R3b its receipt.
             - the weld's size-guard dedup still reads the host's text.
             - the Roper/clone parser (see the correction above).
             - the 2014 printing from fields, and the trait-form `{dc}` validator:
               R3.2 and R3.3, not started.
surprises:   1. The shed's 49% blind rate. It has been reported as a working pass
                since 2026-10-20; half of its firings are declines, and the decline
                was only ever a trace line. It is now a field on the row and on
                `generation.shed_blocked`.
             2. The FAIL is not mine and is not new in kind: `gate-fit` on the Dire
                Wolf — "an at-will condition action with no Multiattack to join".
                Neither of this site's two paths touched a Dire Wolf row (no trace
                lines on that sheet), and the previous twelve-1030 composed a
                Multiattack where this one did not. Same 1-FAIL-of-12 rate as the
                run before it, different sheet and gate.
