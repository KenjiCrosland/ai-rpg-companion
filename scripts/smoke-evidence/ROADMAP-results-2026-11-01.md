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

### R3.2 — a row we wrote from a form is rendered for 2014, not translated
predicted:   (written before any code) the plan's premise is "stat, reach, dice, type,
             rider, gate are all fields already" — I expected to confirm that and render
             the 2014 attack frame from those fields.
measured:    **THE PREMISE IS FALSE.** Of the 27 attack rows on sweep-2026-11-01T20-03-32,
             every one carries `name`, `text`, `attacksPerRound` and (23) `weapon` — and
             NOT ONE carries bonus, reach, range, dice or damage type as a field. Those
             exist only inside the sentence. So R3.2 as written cannot be done without
             first creating the fields at every site that writes an attack sentence.
             What the 2014 printing actually is: an LLM re-write PER ROW, then
             `to2014Grammar` as a deterministic cleanup, with the 2024 text kept only when
             `boundKeptInConversion` catches a lost duration. That call is what dropped
             Krennik's Fear Aura immunity. So the change made is the one the plan's own
             sentence asks for — "only a free-prose trait needs a call":
               - a row declaring a catalog origin (`template`/`library`/`print`/
                 `printNamed`/`kit`/`feature`/`rules`) is NOT sent to the call; its 2024
                 sentence is already our own closed idiom and `to2014Grammar` converts it
                 clause for clause. A declared-field test, no reading of words.
               - `structureKeptInConversion`: a conversion may not reduce the 24-hour
                 immunity clause, the damage expressions or the escape DCs. Krennik's own
                 clause is read by the lint's existing `IMMUNITY_ON_SUCCESS`, not a copy.
             Replay over 24 saved printing pairs / 122 form rows: the deterministic render
             LOSES structure against our own 2024 text on **0 rows**. It differs from the
             saved 2014 on 2: Ossuar's Paralyzing Touch (see surprises) and the Stone Club
             duplicate-name artifact already accepted on the RC.
             Batch: 6/6 ok, **0 FAIL of 6**, 0 printing-structure losses, and 0 occurrences
             of 2024 vocabulary anywhere in the six 2014 blocks. The Harpy's Luring Song
             carries "immune to this harpy's song for the next 24 hours" in BOTH printings
             — Krennik's exact clause, on the floor case chosen for it.
runs:        smoke-out/printing6-2026-11-02T00-53-46 (after) ·
             smoke-out/printing6-2026-11-02T00-48-54 (before the dialect table, 3 FAIL)
suite:       172 suites / 4580 tests · build clean
commit:      (uncommitted at hand-off)
not done:    attack rows still do not DECLARE bonus/reach/dice/type. Until they do, the
             2014 printing is "parse our own closed idiom once, render the other idiom" at
             one seam rather than a pure function of fields. The fields belong at the sites
             that write the sentence (donor scale, authored repair, print-canon clone and
             rename) — that is the real R3.2 and it is not done.
surprises:   1. I SHIPPED A REGRESSION INTO THE FIRST RUN AND THE BATCH CAUGHT IT. Making
                form rows deterministic produced 3 FAILs of 6, two of them mine:
                `vocab-2024-in-2014` for "Disadvantage", "At Will:" and "/Day Each". The
                conversion CALL had been silently fixing those four terms on the way past,
                and `to2014Grammar` never knew them. Fixed by one shared table
                (`EDITION_TERMS_2024_TO_2014`) that the renderer applies and the checker's
                own gate now reads — the gate had the list inline, so the renderer could
                ship a term the gate then failed. Re-run: 0 FAIL of 6.
             2. MY FIRST STRUCTURE GUARD WAS WORSE THAN THE BUG. Counting "save branches"
                tripped on 18 of 122 form rows, every one a FALSE POSITIVE: 2014 compresses
                both branches into one sentence ("taking 11 (2d10) piercing damage on a
                failed save, or half as much on a successful one") and writes a
                condition-only save as a negative ("must succeed on a DC 14 Constitution
                saving throw or be blinded"). A false positive there KEEPS the 2024 text,
                so a 2014 sheet would ship 2024 idiom. Narrowed to the three counts that
                are unambiguous in both idioms: 18 -> 1, and that 1 is the Stone Club
                duplicate-name artifact, not a conversion drop.
             3. THE CONVERSION CALL HAS BEEN REPAIRING ROWS, AND THIS REMOVES THE REPAIR.
                Ossuar's Paralyzing Touch is `… 15 (3d6 + 5) Cold damage, and the target has
                the Paralyzed condition until the start of Ossuar's next turn` — a no-save
                Paralyzed on every hit. The 2014 twin had a DC 19 Constitution save the
                model ADDED. So the two printings disagreed on the rules, which is the very
                thing printing-equivalence exists to stop; making 2014 deterministic makes
                them agree and EXPOSES the 2024 fault. The no-save hold is the hold gate's
                business, not the converter's, and it is now visible on both printings.

### R3.3 — the trait form is judged by its declared effect, not by a word list
predicted:   the plan asks for "a save without `{dc}` rejected by the form validator". I
             expected to find that missing and add it.
measured:    it was already there and STRICTER than the plan describes — `traitOk` refuses
             any trait whose text contains "saving throw" at all. What I found instead, by
             measuring the gate against print: `MECHANIC`, the word list deciding whether a
             trait has a mechanical effect, **refuses 67 of print's own 324 trait rows —
             20.7%**: Amphibious ("The dragon can breathe air and water"), Spider Climb,
             the Bugbear Stalker's Abduct, the Aboleth's Probing Telepathy. The form
             already asks the model that same question as a field (`passive_effect`), so
             the list was a second, worse answer overruling a declared one — §2's class D,
             inside the authoring path the whole program is trying to widen.
             Changed: the declared answer decides; an explicit `none` still drops the row;
             `MECHANIC` runs only where the call answered nothing (the house rule's
             fallback-on-failure direction). The three soundness tests stay.
             Live: the aboleth-spawn shipped BOTH Amphibious and Spider Climb.
             Also: the refusal REASON was computed separately from the test and had
             drifted — every refusal that was not a heal or an escalation reported "no
             mechanic in the effect", so a trait refused for carrying a saving throw lied
             about why. One definition now: the reason IS the test.
runs:        smoke-out/printing6-2026-11-02T00-53-46 (sheet 04)
suite:       172 suites / 4580 tests (10 new in trait-form-declared.spec.js) · build clean
commit:      (uncommitted at hand-off)
not done:    a trait may still state a BARE damage number instead of `{dmg}` and be kept,
             so the engine cannot rescale it. Print writes literal numbers in traits
             ("Regeneration 15"), so print does not settle this one and I did not guess.
surprises:   the plan's R3.3 was aimed at a gate that already existed, while the real fault
             in the same function was a word list refusing a fifth of print's traits. Found
             by probing the function with print's own rows rather than by reading it.

### Forty #1 — the R3 stop point
predicted:   see scripts/smoke-evidence/PREDICTION-forty1-2026-11-02.md, written before
             the run. Headline predictions: FAILs 2-7 with a NEW `vocab-2024-in-2014`
             class · R1 sheet lints 8-14 · clause rate 82-90%, never-answered 0-3 ·
             R3.3 shows up as >= 1 trait the old word list refused · 'welded rider leaves'
             0-3 · print's grapple pairs 100% intact · decoration_rows <= 2 · 40/40.
measured:    run `smoke-out/sweep-2026-11-02T01-24-00`, 40/40, no sheet dropped, so no
             `--only` was needed.

             1. **checker: 6 blocks with a FAIL of 40** (the RC's forty: 2). In range, and
                the new class was the predicted one — but half of it is MINE:
                  - 3 blocks x `vocab-2024-in-2014`, "Trigger:" and "Response:" in a 2014
                    block (Bone-Sun Archlich, Black Iron Sentinel, Ilvareth). R3.2 stopped
                    sending a form row to the conversion call; the call had been rewriting
                    our 2024 reaction labels into 2014 prose, and the converter had no
                    rule for them. I had left Trigger:/Response: out of the shared table
                    for want of evidence. **Fixed**: the converter recomposes the engine's
                    own two labelled halves into one 2014 sentence ("When <trigger>,
                    <response>"), lowercasing the first word only for a closed set of
                    determiners so a proper noun keeps its capital (Vashka, Ilvareth).
                    PROVED BY REPLAY, not another forty: over all 131 2014-bound rows of
                    this run, 28 carried a gated 2024 term before conversion and
                    **0 survive it**. 6 new tests pin the real rows.
                  - 1 x `condition-duration` (the Vampire's Grave Binding: imposes
                    Restrained, records no duration). NOT mine: the `snare` template's
                    bound is a STATE ("until the brambles is destroyed"), which is not in
                    the DURATIONS enum, so `boundBy` is never recorded. The RC's forty had
                    **11** engine rows imposing with no declared duration and this one has
                    **10** — what is new is that this run composed a snare row (0 on the
                    RC) and the gate caught it. Pre-existing gap, exposed by composition.
                  - 1 x `single-target-ceiling` (Opportunist's Lash, 54 to one target at
                    CR 9 against print's 35) — the payoff-stack class already accepted on
                    the RC as the Spitting Maw.
                  - 1 x `bands under` (53 a round at CR 13 against print's 72-126).
                After the vocab fix the standing FAIL set is those three pre-existing
                classes. **Not re-run: the release bar is 0 and this forty does not meet
                it.**
             2. **R1 sheet lints: 10 -> 4.** Same batch as the RC, so this one IS
                comparable. Gone: `empty-option` (Ossuar's "(A) or (B)"), `missing-number`
                x2, `dangling-save`, `duplicate-row-name` (Stone Club), 
                `engulf-needs-a-grapple` (the Riverwight's Whelm). Remaining:
                `double-punctuation` 1, `inline-weapon-collision` 2, `orphan-action-row` 1.
                Predicted 8-14 — WRONG, better than predicted. I am not claiming the whole
                drop: these sheets recompose run to run, and only `duplicate-row-name` and
                the two text-format classes have a mechanism in R3's work.
             3. **per-clause hit rate: 73% (131/179) over 3 sweeps. BAR MISS** (release
                >= 85%, target >= 90%). Clauses never answered in any of 3 sweeps:
                **8 of 61. BAR MISS** (release <= 2). Predicted 82-90% and 0-3 — WRONG,
                and this is the weakest number on the sheet. It is also exactly what R2
                diagnosed: 70% of attempted seats ship a row the model refused, so the
                clause rate cannot move until R4 inverts the dispatch. R3 was plumbing.
             4. **R3.3 landed as rows: 16 trait rows across the two printings** (~8 unique)
                that the old word list would have refused — Spider Climb x3 (Owlbear,
                Vampire, Vaultseep Rot), Amphibious x2 (Ancient Gold Dragon, Trench-Dirge
                Leviathan), the Hydra's Reactive Heads, the Goblin Boss's Nimble Escape,
                Ilvareth's Misty Step. Every one is print's own wording. Prediction
                confirmed.
             5. **'print canon: welded rider leaves' fired 4 times** (predicted 0-3, over
                in the good direction). Site 2 is live on the regression forty.
             6. **print's grapple pairs: 1 of 1 intact** — the Purple Worm's Bite ships
                "Grappled (escape DC …), and it has the Restrained condition until the
                grapple ends", whole. This is the site-1 regression risk cleared on the
                only forty that can test it; `homebrew40` has no print-bodied sheet.
             7. **decoration_rows: 14, against a release bar of <= 2. BAR MISS** — but
                the RC's forty was **15**, so R3.3's extra traits did NOT make it worse.
                This is a standing bar miss, not a regression.
runs:        smoke-out/sweep-2026-11-02T01-24-00 (forty #1) ·
             smoke-out/homebrew40-2026-11-02T01-02-31 (see surprises 1) ·
             critic package: smoke-out/CRITIC-blocks-2026-11-02.md (40 blocks)
suite:       173 suites / 4589 tests · build clean
commit:      (uncommitted at hand-off)
not done:    - the release bar is NOT met: FAILs 6 (bar 0), clause rate 73% (bar 85%),
               never-answered 8 (bar 2), decoration_rows 14 (bar 2). Three of the four
               are R4's business, not R3's.
             - reaction rows do not carry `trigger`/`response` as fields, so the 2014
               recomposition reads the engine's own labels instead of rendering from the
               form's answer. SIXTH instance of "declared then not carried" this sprint.
             - the snare's state bound is not declarable as a duration.
surprises:   1. **I RAN THE WRONG FORTY FIRST.** I ran `homebrew40` — forty homebrew
                one-liners — when the release bar's per-category table in §5 is indexed to
                `sweep.json` (Owlbear 21, Goblin Boss 22, Ancient Gold Dragon 19, the
                Weeping Saint 9, the black-iron sentinel 25, Ilvareth 28, Meshrin 37).
                `homebrew40` exercises ONE of the ten categories and contains no
                print-bodied sheet at all, so it could not test the grapple pairs site 1
                put at risk, nor any print-exact floor. ~20 minutes of API wasted, and I
                nearly reported its "10 -> 2 lint drop" as a win against a forty with
                different sheets. Its own numbers (1 FAIL of 40, 2 lints, 11 decoration
                rows) stand only as a homebrew-category sample.
             2. The conversion call had been papering over MORE than the four vocabulary
                terms found on the six-sheet batch — it was also rewriting the reaction
                form's labels. Each term the model silently fixed becomes visible only
                when determinism removes it, so the honest expectation for R3.2 is a tail
                of these, found one forty at a time. Two rounds now: four terms on six
                sheets, two labels on forty.
             3. The clause rate going DOWN rather than flat (73% here against the
                critic's >= 90% "done when") is the clearest argument yet that R4 is the
                next item and nothing else is.

### N4 — the critic's four findings from forty #1
predicted:   each lint fires on the named sheet of `sweep-2026-11-02T01-24-00` before any
             engine change; no API.
measured:    all four, and two of them were not what the critic said they were.

             1. **`placeholder-row-name` — new lint, fires on sheet 14 (both printings).**
                Root cause traced, not guessed: the glacier's trait was named "Killing
                Wake", that name already belonged to a row, and BOTH collision fallbacks
                hand the row its template's name — which for a composed template is the
                literal placeholder `'Composed Row'`. Fixed at both sites by one shared
                list (`PLACEHOLDER_ROW_NAMES`), falling back to `"<name> II"` as
                `uniqueRowName` already did. Lint total on the saved forty 4 -> 6.
             2. **`One template, two mechanics` — new batch check, fires on exactly one
                finding: `push-prone as "Sundering Shove"`,** a 30-foot Cone on the
                Scaffold Ram against "one creature within 5 feet" on the Stone Golem.
                Keyed on the TEMPLATE, not the name: the first cut keyed on the name and
                flagged `bite` on 9 sheets and `slam` on 5, which is the
                one-mechanic-one-name ruling working as designed — an anatomy row takes
                its own body's mechanic. Numbers are excluded for the same reason.
                CAUSE, and it is an interaction, not a bug in either half: the value
                ladder widens an over-value single-target row to a Cone (print-shaped —
                Repulsion Breath, Blinding Breath), and then the one-mechanic-one-name
                rename hands the widened row its template's name, promising a mechanic it
                no longer has. Fixed by the writer recording what it wrote: `valueCheck`
                returns `widened`, and the rename declines a widened row and traces why.
             3. **converter seams: 3 in the saved forty, 0 surviving the fix.** Replayed
                over all 143 2014 rows.
                  - "On a failed save, Until the start…" / "…While within the aura…" —
                    the label becomes a clause, so its next word is no longer
                    sentence-initial. Fixed as ONE post-pass after every path that can
                    write the clause: lowercasing at each swap site missed both of these,
                    because `canonSave2014` composes its own clause before those sites
                    run. Same closed determiner list as the reaction fix (`uncap`),
                    hoisted to module scope — so "Vashka pushes the target" keeps its
                    capital.
                  - the Vampire's Bite doubled label ("…on a failed save. On a failed
                    save, plus 13 (3d8) necrotic damage"). Folded.
             4. **THE CEILING DID NOT MISS THEM.** The critic reported "the single-target
                ceiling missed two of three exploiter rows". It graded all FOUR: the
                Broodmare's 54 at CR 9 is **1.54x** the cap -> `fail`; the Glacier's 54 at
                CR 15 is **1.06x**, the Leviathan's 63 at CR 24 is **1.05x**, and the
                Peals' 53 at CR 13 is **1.04x** -> `soft`. The 1.25x threshold is a
                documented, print-measured decision ("beyond it the row one-shots a PC,
                under it the row wants a reader"). No bug. **Owner ruling if you want it
                tighter — I did not change a graded threshold on a critic's mis-read**,
                and `the-verdict-is-the-threshold` says a soft finding is review noise.
runs:        no API. Replays over smoke-out/sweep-2026-11-02T01-24-00 only.
suite:       174 suites / 4598 tests (9 new in n4-lints.spec.js) · build clean
commit:      (uncommitted at hand-off)
not done:    - "until the brambles is destroyed" — the `{restraint}` fill does not agree
               with its verb. Pre-existing grammar nit, not N4's scope.
             - the ceiling's 1.25x threshold is unchanged, pending the owner.
surprises:   1. I SHIPPED A TOO-BROAD FIX AND THE SUITE CAUGHT IT. My first doubled-label
                collapse destroyed Grandmother's Ash Choke — "…on a failed save. On a
                failed save, the target is also poisoned…" is the CORRECT 2014 form for a
                damage-plus-condition save, and it has had its own test since step 6.
                Narrowed to a damage continuation ("plus N (XdY)"), which is the welded
                rider's own grammar.
             2. AND MY OWN DETECTOR HAD THE SAME FAULT. After the fix the replay still
                reported one surviving seam — the Vampire's Grave Binding — which is that
                same legitimate form. The instrument was over-broad, not the engine.
                Corrected, then 0.
             3. Two of the critic's four findings were mis-stated (the ceiling "missed"
                rows it graded soft; "Sundering Shove" is not an invented-name collision
                but a template whose row was widened after it rendered). Both were still
                worth the trip: one produced a real gate, the other a real fix.

### R3b, step 1 — the three measurements the plan requires before building
predicted:   (the plan's own conditions) if print's non-legendary Recharge rate is under
             half, a nova is not a default; our row counts sit above print's median
             everywhere; and most engine-loaded kit rows carry no receipt.
measured:    all three against `src/data/srd52-monsters.json` and forty #1. Two of the
             three premises are WRONG, and R3b gets smaller because of it.

             1. **Nova as a default — the answer is BANDED, not no.** Print's
                non-legendary blocks carrying a `(Recharge N-N)` action:
                  0-2 **11%** (20/175) · 3-5 **22%** (14/65) · 6-9 **43%** (15/35) ·
                  10-12 **38%** (5/13) · 13-16 **75%** (6/8) · 17-20 **67%** (2/3).
                So a nova is NOT a default below CR 13 and IS one at 13+. The plan's
                "under half -> not a default" resolves to a band rule, not a deletion.
             2. **Row counts are NOT long across the board.** Print's median per band
                (non-legendary): 2 · 4 · 5 · 6 · 6 · 8. Ours on forty #1: 4 · 4 · 5 · 7 ·
                6 · 10. We MATCH print at 3-5, 6-9 and 13-16; we are over at **0-2 (4 vs
                2, double)**, 10-12 (7 vs 6) and 17-20 (10 vs 8). Caveat stated plainly:
                our per-band n is 4, 11, 11, 4, 4, 1 — the 17-20 figure is one sheet.
                "Track print's median" is therefore a LOW-CR fix, not a whole-sheet diet.
             3. **Receipt rate: 67 engine-loaded rows on forty #1, 48 with a receipt,
                19 (28%) without.** Not "most", as the critic's read implied — but the 19
                are exactly the rows it named: Fear Aura x2, Sundering Shove x2,
                Opportunist's Lash x2, Tenacious Hide, Brine-Slick Hide, Leaping Pounce,
                Shield Wall Shove, Unison Hymn, Deafening Echo Lash, Flickering Ward,
                Engulfing Fly-Crown, Plague Burst, Rime-Shedding Hide, Final Toll.
                My test is GENEROUS (`gmQuote || clause || bound || expresses || asked`);
                R3b's stricter rule — a quote of the GM's own words — would score more of
                these as receiptless, so 28% is a floor, not a ceiling.
runs:        no API.
suite:       174 suites / 4598 tests · build clean
commit:      (uncommitted at hand-off)
not done:    R3b is NOT built. These are its preconditions, and they redefine it:
             (a) the nova default becomes a band rule (off below 13, on at 13+) rather
                 than a receipt question;
             (b) row-count trimming is a 0-2 band fix (4 -> 2), not a global diet;
             (c) the work is the 19 receiptless rows, and the single biggest win is
                 Fear Aura — the critic's own "5 of 19 non-earning traits".
             Instrument when it is built: receiptless engine rows 19 -> <= 5; traits
             earning 15/34 -> >= 25/34; Fear Aura unasked 5 -> 0; the eight-roll variety
             criterion on two concepts.
surprises:   the two refuted premises. We are not systematically longer than print — we
             are double print's median at CR 0-2 and level with it in the middle bands.
             And a nova is print's own default at high CR, so removing it there would
             have been the wrong move in the name of paring.

### R3b — built as one of three; the other two refuted by measurement
predicted:   scripts/smoke-evidence/PREDICTION-r3b-2026-11-02.md, written before the run.
             Headline: the median ceiling sheds a borrowed row on 4-9 of 16; the horseman
             passes the variety criterion; the ninja does NOT, because its sameness is
             `closest accepted`; 0 new FAIL classes.
measured:    run `smoke-out/variety16-2026-11-02T03-22-29`, 16/16.

             **NOT BUILT, 1 of 3 — the banded nova default.** Our non-legendary Recharge
             rate is at or BELOW print's in every band under CR 13: 0% vs 11.4% (0-2),
             23.5% vs 21.5% (3-5), **14.8% vs 42.9%** (6-9), 27.3% vs 38.5% (10-12),
             33.3% vs 75.0% (13-16). We under-produce novas. Turning them off below 13
             would strip rows print does carry.

             **NOT BUILT, 2 of 3 — kit receipts.** Every one of the 19 receiptless rows
             classified by how it arrived: **14 `closest accepted`, 1 verb-gate
             stand-down, 4 unattributed, 0 KIT LOADS.** Fear Aura lands by
             `closest accepted` on 4 of its 5 sheets and by the verb-gate stand-down on
             the 5th. R3b's premise — "kit rows load off the route call's mechanic
             guess" — does not hold on this corpus; the filler is the SEAT's nearest
             miss, which is R2's 70% and R4's mechanism. No kit-receipt gate was built
             for a mechanism that is not firing.

             **BUILT, 3 of 3 — the row trim, and it had NO measurable effect.** A
             borrowed row (`accepted_closest`, rank 3) is now capped by print's median
             for the band (2/3/4/5/5/7, measured on the same basis as `PRINT_CARD_ROWS`:
             non-legendary, Multiattack excluded). Predicted 4-9 sheds of 16; **measured
             0.** The 4 budget evictions on the run are the pre-existing one-slot budget,
             not the median cap — on these sheets the old budget binds first, so the
             ceiling never became the constraint. The feared cost did not materialise
             either: the Dire Wolf's Rime-Shedding Hide was not on this batch.

             **Variety criterion — the headless horseman, 8 rolls: PASS.**
               - no kit row on every roll: PASS (highest frequency 1 of 8).
               - bare chassis >= 1: PASS, **4 of 8** carry no kit/template row at all.
               - the trope on >= 2 of 8: PASS, **8 of 8** — and as print writes it, a
                 charge RIDER welded onto the weapon row rather than a Trample row of its
                 own, which is why it is absent from a row-name count.
             **Variety criterion — a lizardfolk ninja, 8 rolls: FAIL AS WRITTEN, and the
             criterion is wrong.** Four rows appear on 8 of 8: Evasion and Cunning Action
             (`kit=rogue`), Hold Breath and Marsh Stride (`kit=lizardfolk`). Those are
             SPECIES and CLASS kits earned by the concept's own two words. Demanding "no
             row on every roll" here would strip a lizardfolk of Hold Breath. The owner's
             "same each roll" on a fully-specified concept is about the SIGNATURE, and the
             signatures split 4 `closest accepted` (rolls 11, 12, 13, 15) against 4 real
             rows (Fangblade, Kukri, Kunai, Sensory Strike) — half the rolls' signature is
             a refused nearest. That is R4.
runs:        smoke-out/variety16-2026-11-02T03-22-29 (16/16, 3 FAIL, R1 lints 0 of 16)
suite:       174 suites / 4601 tests (3 new) · build clean
commit:      (uncommitted at hand-off)
not done:    - the median ceiling is UNPROVEN: 0 firings. It is correct by the owner's
               ruling and measured against print, but nothing on this batch exercised it.
               It should be judged on the next forty, not kept on faith.
             - `PRINT_CARD_ROWS` claims p20-p90 and its high bands are inflated against
               print (10-12 says 7, print's p90 is 5, n=13; 13-16 says 10, print 6, n=8;
               17-20 says 9, print 7, n=3). Left as measured: correcting it would tighten
               the budget for ASKED rows, which the ruling did not ask for, and two
               samples are thin. Owner's call.
             - R3b's variety criterion needs rewriting for a species+class concept: a kit
               the concept's own words name is a receipt, not a repeat.
surprises:   1. **Three of R3b's premises are now refuted** — "we are longer than print
                everywhere" (we are level in the middle bands), "a nova is not a default"
                (it is print's own at 13+, and we under-produce below), and "kit rows load
                off a guess" (0 of 19). What remains of R3b is one capped row class and a
                criterion that needs rewording.
             2. The horseman already behaves the way R3b wanted: 4 of 8 rolls bare, the
                trope on all 8 as a rider. Nothing I built caused that — it is the state
                of the engine after R3. The owner's "I'd love to see what a bare rider
                chassis does" is ALREADY what it does.
             3. The 3 FAILs are one pre-existing class, all on horseman sheets:
                `attack-stat` — "+8 derives from DEX, but an attack row rolls STR" on
                Grave Lance, Saddle Sword, Saber. A mounted-knight concept routes to a
                DEX chassis and then arms it with a lance. Not touched by this work;
                worth its own item.

### R4, step 1 — the replay of every idea that died at `closest accepted`
predicted:   (the plan's premise) the menu's refusals are the originality loss, and the
             ideas behind them are form-shaped.
measured:    **220 ideas died at `closest accepted`** across three runs
             (`sweep-2026-11-02T01-24-00`, `variety16-2026-11-02T03-22-29`,
             `homebrew40-2026-11-02T01-02-31`): 114 action seats, 106 trait seats.

             **ALL 220 carry `declined_because: no_fit`.** Not one is `collision` or
             `already_answered`. The call's own enum is saying, 220 times out of 220,
             "nothing offered carries the mechanic" — the menu does not have the shape,
             so no reordering, no key work and no second pick can help. That is the whole
             case for R4 in one number, and it is stronger than R2's 70%: the 70% said
             the engine ships a refused row, this says the refusal is always for the same
             reason.

             The stand-ins that land most: relentless-pursuit 22, fear-aura 14,
             exploiter 12, terrain-walk 10, ground-burst 10, push-prone 8, pacify 8,
             blood-frenzy 8 — the critic's sameness list, generated by this one branch.

             And the ideas are FORM-SHAPED, which is what authoring-first needs:
               - dire wolf: "the frost-rimed hide sheds a crawling rime: while the wolf
                 is within reach of a creature…" -> a trait, passive_effect threat
               - bog hound: "sets its mud-slick paws and heaves backward, dragging…"
                 -> a save form with movement
               - owlbear: "drops from above onto a creature it has climbed over,
                 slamming it Prone" -> an attack form with a rider
               - stone golem: "the saint does not stop for masonry. The golem can move
                 through nonmagical walls…" -> a trait, passive_effect ability
               - hydra: "severed stumps vent boiling smoke in a clinging plume, so a
                 creature that cuts…" -> a reaction or a save
             Every one maps onto a form `author.mjs` already validates.
runs:        no API — three saved runs replayed.
suite:       unchanged · build clean
commit:      (uncommitted at hand-off)
not done:    **R4 ITSELF IS NOT BUILT.** Two things to carry:

             1. *The design decision, for the owner.* A LITERAL inversion (author every
                seat, menu as fallback) overrides the ~30% of seats where the call
                AFFIRMS a template — rows that work today. The surgical form (author at
                the refusal point, menu kept for affirmed picks) covers all 220 measured
                losses and touches nothing that works. I recommend the surgical form and
                would have built that; it is not what "invert the dispatch" literally
                says, so it is the owner's call.
             2. *Where it goes, confirmed in scope.* The site is the
                `if (!fit.template && fit.closest && !nearBlocked)` branch in `fitSeat`
                (generate.mjs ~5041). `landAuthored`, `buildRepairPrompt`,
                `parseAuthorResponse` and `callLLM` are all in scope there (everything is
                inside `generateReskin`). The open question a builder must settle first:
                an authored row shipped through `landAuthored` lands directly in
                `sections` and so SKIPS the seat's own `valueCheck`, while a row returned
                in `fitSeat`'s seat shape (line ~5332) goes through it but needs the
                form -> text rendering that currently lives inside `landAuthored`. Pick
                one and do not copy the renderer — a private copy has hidden a fix three
                times this sprint.
surprises:   220 of 220 refusals are `no_fit`. I expected a mix, and a mix would have
                meant some of the loss was fixable by ordering or by a better menu. There
                is no such fraction: the menu is simply missing the mechanic every time.

### R4 — BUILT. Steps 1 and 2 landed; the twelve run and analysed
predicted:   authoring at the `closest accepted` branch converts refusals into
             authored rows. Instrument named before the run: `closest accepted`
             on the twelve against the same sheets' prior runs (**22 across 11 of
             the 12 — every one of them 2 of 2 seats**, from
             `sweep-2026-11-02T01-24-00` 02/06/07/09/20/26/39,
             `homebrew40-2026-11-02T01-02-31` 25/30/34,
             `variety16-2026-11-02T03-22-29` 12).
measured:    `r4-twelve-2026-11-02T04-46-44`, live, 12 of 12 generated, no errors.

             **22 `no_fit` refusals reached the branch. 9 authored, 7 reached the
             finished sheet, 9 still took the nearest, 5 were skipped for want of
             the sheet's one free row, 0 refused by the dangling-ref pre-check.**
             `closest accepted` 22 -> 9 on the same sheets.

             The seven that shipped, each stamped `authoredSeat` on the row:
               02 Bog Hound   Surging Mire — STR DC 13, each creature within 5 ft,
                              pulled 5 ft toward it and Prone (the step-1 block's
                              own bog-hound idea, and it is in the Multiattack)
               03 Stone Golem Tears That Never Dry — regains 17 (5d6) at the start
                              of its turns, scaled by creatures it has marked
               05 Quarry Scree Pitfall Snare — DEX DC 14, Restrained  [SEE FAIL 1]
               06 Sellsword   Humming Arc — DEX DC 15, each creature in a 5-foot
                              Sphere, Prone  [see "weak rows" below]
               08 Leviathan   Skull-Plow Sweep — STR DC 24, 60-ft Line, pushed 20
                              ft and Prone
               10 Arrears Collector Crushing Ledger (Recharge 5-6) — STR DC 13,
                              15-ft Emanation, 18 (4d8) Bludgeoning  [SEE FAIL 2]
               11 Drowned Coat Ribbons of Eels — on a solid hit it moves half its
                              Speed without provoking, re-forming behind its prey

             Two authored rows were written and then correctly lost downstream:
               04 Hydra — `print canon: chassis row leaves … is the seat's nova,
                 not the Hydra's`. Print closes the action set on a print body. The
                 twist was still carried, by a composed zone trait.
               07 Mire Mother — `dead wildcard name swept`: the authored trait cited
                 "Mire Hex", which was on the sheet when the row was written and
                 dropped later.

             `check-run`: **2 FAIL of 12 (17%)**, against a standing 6 of 40 (15%)
             on the 11-02 forty — so at the standing rate, but BOTH are on authored
             rows, so both are attributable:
               1. Quarry Scree `duplicate-mechanic` — 3 rows impose Restrained.
                  ROOT CAUSE FOUND AND FIXED (commit "an authored row cannot be a
                  third imposition"): the rule is a MENU filter in `templatesFor`
                  and an authored row reaches no menu, so a guard shipped on
                  2026-10-27 had a hole. `conditionsImposedTwice` is now one
                  exported definition read by both. Replay-pinned on the exact frame.
               2. Arrears Collector `save-fit` — a Strength save for 18 (4d8)
                  Bludgeoning in an Emanation. **NOT FIXED — it needs the owner,
                  and the obvious fix is refuted by print.** See below.
runs:        `r4-twelve-2026-11-02T04-46-44` (12/12) · suite 175/175, 4611 tests ·
             build clean · row-text `.replace(` still 187.
commit:      9236c3f (step 1), f22bbc3 (step 2), 76288d1 (the third-imposition hole)
not done:    **forty #2** — stopped before it, as ordered.

             **The `save-fit` FAIL, and the measurement that refuses the one-line
             fix.** The engine's own save-stat pass (generate.mjs ~8370) returns
             early on `if (!imposed && !e.imposesMovement) continue;` — so a row
             that deals area damage and imposes NOTHING never reaches
             `saveStatsFor`. The checker's `save-fit` gate does reach that shape and
             fails it, so the engine and its own gate disagree about this one row
             class, which is the defect the gate's own comment at checker.mjs:1480
             names. Moving the guard is one line.
             **Measured against print first (97 such rows in srd52-monsters.json):
             11 of them, 11%, sit on a stat `saveStatsFor` rejects** — the Gold
             Dragon's Weakening Breath (Strength), the Sea Hag's Death Glare and the
             Satyr's Mockery (Wisdom), the Aboleth's Consume Memories
             (Intelligence). Print writes a magical or mental effect's save by the
             faculty it attacks, not by the damage. So the early return is
             protecting print, not dead code, and removing it would retype rows
             print writes that way. It also acts on the ABSENCE of a record, which
             is the direction the house rule forbids. Left for the owner with three
             options: (a) accept the gate's verdict and have the authoring call be
             told the save-stat contract as a closed fact in its prompt; (b) narrow
             the checker's gate to exempt a row with no imposition, matching the
             engine; (c) leave both and accept the FAIL.

             **Weak rows, 2 of 7 — a quality class, not a defect.** Humming Arc took
             "each creature in a 5-foot Sphere" (print writes no 5-foot Sphere) and
             Pitfall Snare dropped the "pulls down into a pit" half of its own idea.
             The target menu in the forms accepts any N, and nothing tells the
             authoring call print's own geometries. A candidate for the next cycle;
             neither is a FAIL.

             **ONE AUTHORED ROW PER SHEET, and the action seat gets first refusal.**
             5 of the 22 refusals traced `seat authoring skipped: … already spent
             its one free signature row`. The allowance is `printExact ? 0 : 1`,
             which R4 inherits rather than changes — but it means the trait seat can
             never author on a sheet where the action seat did. Measured, not
             assumed; it is the owner's ruling to revisit, not mine.
surprises:   The two FAILs were not in the branch I wrote. One was a hole in a guard
             shipped nine days earlier that only an authored row can walk through;
             the other is the engine disagreeing with its own checker about a row
             class templates almost never produce. Both were invisible until a path
             existed that produces that shape — which is the argument for running the
             twelve rather than reasoning about it.

### Forty #2 — R4 measured on `homebrew40`, and three defects it alone could find
predicted:   the three fixes land, then forty #2 says whether R4 moved the number the
             critic asked about. **Instrument corrected first, and it matters**: the
             handoff said "FAILs against 6 of 40", but **6 is `sweep`'s number**.
             `homebrew40`'s own prior run (`homebrew40-2026-11-02T01-02-31`) is
             **1 FAIL of 40, clause coverage 105/196 = 54%, closest accepted 44**.
             `sweep` is 6 FAILs at 88%. Likewise §6's "clause rate 73%" is
             `clause-rate.mjs` across sweeps, a third instrument. Scored against
             homebrew40's own baseline, forty #2's bar for FAILs is **1, not 6** — any
             new FAIL is a regression, and read against 6 it would have looked like a win.
measured:    `homebrew40-2026-11-02T05-09-26`, live, 39 of 40 generated (one THREW — see
             below).

             **The branch, against the same batch's prior run:**
               closest accepted      44 -> **11**
               no_fit refusals       44 -> 55
               authored              —  -> 44
               authored ON the sheet —  -> **25**
               skipped at grant      —  -> **0** (the counter removal, confirmed live)
               refused by a guard    —  -> 1 (third imposition) + 0 slot/dangling
             The trait seat now authors behind the action seat on the same sheet, which
             the grant-time counter had made impossible: 25 authored rows on 39 sheets
             against 7 on 12 before.

             **The critic's one question — would the GM who typed this be surprised?**
             Read over all 39 sheets (mine, not the critic's — see the caveat):
               **8 surprised / 20 plain / 11 missed**, against the baseline 7 / 8 / 25.
             The movement is **missed 25 -> 11**, which is the bucket with an objective
             definition ("the concept's own sentence absent from the page") and the one
             R4 was aimed at. Surprised is flat (7 -> 8). Sheets moved from MISSED into
             PLAIN, not into SURPRISED: R4 gets the GM's sentence onto the page, it does
             not yet make the page delightful.
               surprised: 03 Stitch-Troll, 11 Reef-Shelf Hog (3 of 4 clauses), 12
                 Fieldbreaker Bull, 15 Gaol-Queen (Convict Hurl IS the idea), 18
                 Wound-Ledger (authored Memento Repossessed is the concept verbatim), 21
                 Silt-Veiled Drowner (authored: "Invisible to any creature farther than
                 its reach" — the clause as one clean mechanic), 29 Vowbound Reliquary
                 (both halves), 35 Weeping Sac-Beast (poisons ITSELF, mechanically)
               still missed: 04 "through walls" with no Siege Monster (the critic's own
                 forty-#1 example, unchanged), 09 neither steel nor water, 10 a breath
                 weapon on a thing with no mouth (named in the baseline, unchanged), 13
                 no three-toll structure, 14 no body-takeover, 22 "never comes down" with
                 only a melee bite, 23 no escalation on being wounded, 30 the authored
                 row went to stealth and the disarm is absent, 33 the argument is a name
                 not a mechanic, 34 "only ever makes one attack" beside three (named in
                 the baseline, unchanged), 38 no tracking mechanic
             CAVEAT, stated because it bounds the comparison: the 7/8/25 baseline is the
             CRITIC's read and this is mine. Two readers, one question. The `missed`
             bucket is the least subjective of the three and it is the one that moved;
             `surprised` vs `plain` is where two readers would differ most.

             **`check-run`: FAIL 1 -> 6 of 39, clean 24 -> 17, clause 54% -> 51%.** A
             gate regression, and FOUR of the six are one mechanism I introduced:
               4x `grapple-no-escape` — Drowning Roar, Coat Lash, Heartbriar Hook,
                 Hooked Lash, every one an authored SAVE row, every one the sentence
                 "the target has the Grappled condition until the end of its next
                 turn". FIXED. The engine already knew: `riderText` on the attack path
                 carries the escape DC with a comment citing the corpus, and
                 `authoredRow` could not see it because it lives inside `landAuthored`.
                 The fourth duplicated body this sprint to hide a fix, and the one step
                 1 left behind. Measured against print before writing it: of print's 10
                 save rows that grapple, **10 carry an escape DC and 0 carry a timer**;
                 the size restriction sits in the target clause (1 of 10), which is why
                 `riderText` keeps its own for the attack case. One `conditionClause`
                 now, read by both.
               1x `dual-recharge` + its own grapple FAIL (Reef-Shelf Hog) — NOT FIXED,
                 pre-existing ordering. The one-nova guard DID fire and strip the gate
                 (traced), and then `valueCheck` re-gated the row because its EV was over
                 the ceiling. R4 made it reachable; the fix is an ordering question
                 between two passes and belongs to the owner.
               1x `alignment-fit` (Unaligned Monstrosity, INT 12) and 1x `under` (Bone-
                 Choir HP band at CR 16) — neither has anything to do with R4; the
                 roadmap already records `under` as intermittent.

             **AND ONE GENERATION THREW, which is worse than any FAIL.** Sheet 02, the
             storm drake: the authored trait wrote `{condition}` in its effect, nothing
             substitutes it, and it reached the ship-time guard — "unfilled slot in
             Thunderwake Aura — failing loudly per spec". The forms ask for `{dc}` and
             `{dmg}`; the call generalised and invented a third. This violates the
             standing never-fail rule, and R4 is the only path that can produce it (a
             template's slots are the engine's own). FIXED: `UNFILLED_SLOT` is one
             pattern read by the ship-time guard and by the seat, and the seat refuses
             any authored row still wearing braces — the nearest stands in. Replay-pinned
             on the exact frame, with an assertion that no row on the sheet wears braces.
runs:        `homebrew40-2026-11-02T05-09-26` (39/40 + 1 throw, pre-fix) · suite 175/175,
             4620 tests · build clean · row-text `.replace(` still 187.
commit:      uncommitted — paste-ready messages at the end of the session report.
not done:    **The three fixes above landed AFTER this forty, so none of them is measured
             yet.** Forty #2 as run is the pre-fix state. What the fixes predict on a
             re-roll, stated before it runs: FAILs 6 -> 2 (the four grapple rows carry
             their escape DC; `dual-recharge` and `alignment-fit`/`under` remain), 0
             throws, and no change to the 8/20/11 read — none of the three touches which
             mechanic a row expresses. A re-roll is the cheapest check and it is the
             owner's call whether to spend it.

             Open for the owner, unchanged and now joined by a third:
               (a) `save-fit` — the engine's save-stat pass vs its own checker; print
                   refutes the one-line fix (11 of print's own 97 such rows).
               (b) the weak-row class — forty #2 adds evidence it is real: 30 Assessor
                   Revenant authored a stealth trait for a disarm concept, 34 authored a
                   stealth trait for a duellist, 06 Hushfall authored a vague reaction.
                   The call writes a row that is fine in isolation and answers a
                   DIFFERENT clause than the seat was for. That is a prompt question
                   (name the clause the row must answer), not plumbing.
               (c) `dual-recharge` — the one-nova guard runs before `valueCheck` re-gates.
             Also noted, one line, not fixed: `low()` in forms.mjs lowercases only
             The|It|Each|Any|Every|One, so the Hushfall's authored reaction reads "…within
             reach of the hushfall, That creature cannot…". A closed grammar list, one word.
surprises:   Three defects, and a 40-sheet run was the only thing that could find any of
             them: one needed an authored save to choose Grappled (4 sheets), one needed
             the call to invent a token (1 sheet, fatal), one needed an over-ceiling
             authored nova beside a chassis nova (1 sheet). None is reachable from the
             twelve, and the first two were holes in rules the engine already owned —
             the same shape as the third-imposition hole. The pattern across all three R4
             sessions is now unmistakable: every defect this path produced was an
             existing rule implemented in ONE path that the new path walked around.

### QUALITY (R8) + ANCHOR (R7) — built, and forty #3
predicted:   QUALITY closes the break classes the critic named; ANCHOR ties the idea to
             the GM's clause and so moves retention. Instruments named before the run:
             throws, FAILs against **homebrew40's own baseline of 1** (not sweep's 6),
             closest accepted, anchored-vs-unanchored per seat, and the fit-vs-authored
             split on anchored seats.
measured:    `homebrew40-2026-11-02T13-47-49`, live, **40 of 40 generated, 0 THREWS.**

             | | baseline 01-02-31 | forty #2 05-09-26 | **forty #3 13-47-49** |
             |---|---|---|---|
             | FAIL blocks | 1 | 6 | **3** |
             | clause coverage | 54% | 51% | **60%** |
             | closest accepted | 44 | 11 | 14 |
             | authored on sheet | — | 25 | 25 |
             | throws | 0 | 1 | **0** |

             Clause coverage is the hard proxy for "is the GM's sentence on the page",
             and it is above the baseline for the first time. The three FAILs are a new
             set and none is a QUALITY class: `gate-fit` (an at-will condition action
             with no Multiattack), `name-mechanic` (a reaction named for a Grappled it
             does not apply), `attack-in-multiattack`. The four `grapple-no-escape` and
             the throw are gone.

             **QUALITY's guards fired three times** on live sheets — two third-imposition
             refusals and one `requires Deafened` that nothing applied — each tracing its
             reason and falling back to the nearest.

             **ANCHOR fired on 16 of 78 seats (21%), and that is the headline failure.**
             Asks WERE handed over on 35 of 40 sheets (5 legitimately had none), so the
             call received the list and mostly did not name a clause back. Diagnosed, and
             all three causes are MINE, not the model's:
               1. **I hand over heads as well as asks.** 31 of the 68 handed lines carry
                  no declared mechanic — "a mud-caked bog hound", "a cairn-wight", "a
                  hunger", "a reef-drake". `unansweredClauses` inherited the head
                  FALLBACK from `unansweredClause`, which is right when picking ONE
                  clause for a seat to hand a row and wrong when handing over a LIST:
                  46% of what the call was shown is noise, which dilutes the instruction
                  and invites it to pick nothing.
               2. **One handed clause was mangled.** "a kiln- whose prayers are spoken in
                  fire" — `cut()` removed the print body "priest" from "a kiln-priest"
                  and left the stump. The word-boundary fix of 2026-10-22 closed
                  "archlich" -> "arch" but not a HYPHENATED compound. The call copied the
                  stump back faithfully and anchored to it.
               3. **My own trace does not record what the call answered** when membership
                  fails — only that it matched nothing. So this run cannot separate "the
                  call ignored the field" from "the call answered something close and the
                  check refused it", and I had to infer from the handed strings (which
                  are clean and copyable, so non-compliance is the likely reading). This
                  is the "a decline must trace WHY" lesson, broken in the instrument I
                  had just built.

             **But when it anchors, it anchors on the right thing.** 14 of the 16 named a
             real mechanical ask, and three are clauses the critic named as MISSED on
             forty #2: "is only dangerous on the turn after it goes still" (19), "argue
             about who swings" (33), "it always lands" (34). That is the mechanism working
             on exactly the sheets it was built for.

             **Fit-vs-authored on anchored seats** (R7's third instrument, the case for or
             against Author): of 16 anchored seats, **11 AUTHORED, 1 took the nearest, 4
             reached no row**. Zero fit a template. On this evidence an anchored idea does
             NOT mostly fit the catalog — but n=16 with 46% noise in the input is too thin
             to settle Author's fate, and the honest reading is that the split is not yet
             measured.
runs:        `homebrew40-2026-11-02T13-47-49` (40/40, 0 throws) · suite 177/177, 4646
             tests · build clean · row-text `.replace(` still 187 · critic package
             `smoke-out/CRITIC-blocks-homebrew40-forty3-2026-11-02.md`.
commit:      uncommitted — paste-ready messages in the session report.
not done:    **The critic has not read forty #3.** Retention against forty #2's three
             surprises and `missed` against 23 are the critic's numbers and are NOT
             scored here (forty #2: self-read 8/20/11, critic 3/13/23).

             **QUALITY item (c) REFUSED, not built, with its number.** "A check or save
             with no `{dc}` is refused" would refuse print: **99 of print's 107**
             trait/reaction rows that name a check or a saving throw carry no DC (every
             Legendary Resistance: "If the dragon fails a saving throw, it can choose to
             succeed instead"). A tightened "requires a roll to be made" predicate still
             catches **19 of 20**, because the matches are NEGATIONS — "without needing to
             make an ability check" (Spider Climb, Ice Walk). Separating those is a
             reading of meaning, so per the house rule it is proposed rather than written:
             the trait form already asks `passive_effect`; the adjacent question is a new
             enum on the same call — "does this row require anyone to roll?" — which the
             engine then validates (yes -> `{dc}` must be present). One field, no new call.

             **ANCHOR's three fixes, named and not built** (the brief ended at one forty):
             hand over only clauses with a declared mechanic; fix `cut()` on hyphenated
             bodies; trace the rejected clause value. The first is one filter and is the
             one that should move the 21%. Whether that earns a second forty is the
             owner's call — the kill criterion in R7 is written against retention, and
             the critic's read of THIS forty should come first either way.
surprises:   The anchor's failure mode was not the model. It was handed 46% noise by a
             helper I reused correctly for the wrong shape — `unansweredClause`'s head
             fallback is right for picking one clause and wrong for a list — and one of
             the lines I handed it was a word-boundary stump. Reusing a predicate is not
             the same as reusing it for the same question.

### ANCHOR's three bugs + the two regressed lints + the `acts` field — and forty #4
predicted:   with the head noise gone, the hyphen fixed and the rejected answer traced,
             the anchor rate rises from 21% and retention gets its first fair test.
measured:    `homebrew40-2026-11-02T18-48-33`, live, **40 of 40 generated, 0 THREWS.**

             | | baseline | #2 | #3 | **#4** |
             |---|---|---|---|---|
             | FAIL blocks | 1 | 6 | 3 | **6** |
             | clause coverage | 54% | 51% | 60% | **56%** |
             | closest accepted | 44 | 11 | 14 | 20 |
             | authored on sheet | — | 25 | 25 | 26 |
             | throws | 0 | 1 | 0 | **0** |

             **THE ANCHOR DID NOT RISE: 11 of 62 seats with asks, 18%** (forty #3: 21%).
             Item 1a worked and is not the cause — sheet 01 now hands only "drags
             fishermen under" with its head withheld, sheet 11 hands four asks and no
             "a reef-drake", 22 heads withheld across the run. The `clauseRaw` instrument
             (1c) is what answered the question, and it splits two ways:
               **49 answered NOTHING** — the field absent or empty.
               **20 answered a handed clause VERBATIM** — and with my own annotation
               attached: `""drags fishermen under" — an earlier call read this as asking
               for: grapple"`. The prompt prints `1. "<clause>" — an earlier call read
               this as asking for: <mechanic>` and says "copying that line back exactly",
               so the call did exactly that, and my membership check compares against the
               bare clause. **That half is my bug, not the model's.**
             Per the brief, EMPTY dominates (49 of 69) so this is reported as
             non-compliance and membership is NOT loosened. The other half has a fix that
             is TIGHTER than string membership rather than looser: have the call answer
             the ASK'S NUMBER and validate by index, with no string matching at all.
             Projection, labelled as one: had the 20 verbatim answers matched, the rate
             would have been 31 of 62 — about half. The annotation cost roughly two
             thirds of the anchors the call actually offered.

             **THE FAIL REGRESSION HAS ONE CAUSE AND IT IS NOT THE SEAT.** Of forty #4's
             six FAILs, **not one is on a seat-authored row**; three are on
             REPAIR-authored rows, and each fails a rule the seat already enforces:
               11 Maw Grab — the third row imposing Grappled. `conditionsImposedTwice`
                 runs at the menu (`templatesFor`) and at the seat, and NOT at the repair
                 landing.
               12 Unbroken Charge — the third row imposing Prone. Same hole.
               33 Who Swings? — cites "Committed Haymaker" and "Mistimed Backhand",
                 neither of which exists. `danglingRefIn` runs at the seat and at the
                 template render, and NOT on repair-authored trait text.
             The other three are not authoring: two `attack-in-multiattack` and the
             known-intermittent `under` on the Bone-Choir. **The guards are on the wrong
             side of one fence** — the fifth instance this sprint of a rule implemented in
             one path that another path walks around, and the first where the well-guarded
             path is the new one.

             **Meanwhile the seat's guards fired twice on live sheets and both were
             right**: one dangling reference ("Marga's Shackle Flail"), and one `acts`
             refusal — the NEW field catching "Bone-Choir" as a thing no row defines,
             which is the Spore-Mother class the critic filed.

             **The two regressed lints are closed and proven on real data**: the
             placeholder lint fires on forty #3's saved sheet 35 ("Composed Row") and
             **no sheet of forty #4 ships a placeholder name**; forty #3's sheet 37
             carried "(A) or (B) Spellcasting" and **no sheet of forty #4 carries an empty
             lettered option**.
runs:        `homebrew40-2026-11-02T18-48-33` (40/40, 0 throws) · suite 177/177 · build
             clean · row-text `.replace(` still 187 · critic package
             `smoke-out/CRITIC-blocks-homebrew40-forty4-2026-11-02.md`.
commit:      uncommitted — paste-ready messages in the session report.
not done:    **The critic has not read forty #4.** Retention against forty #3's seven and
             `missed` against 15 are the critic's numbers and are NOT scored here.

             **Two of my own pins were vacuous and are now real.** The "Composed Row"
             test built a fresh harness run instead of replaying the saved sheet as the
             brief said; no composed candidate was ever offered, the fit call answered
             `none`, the new arm never executed, and the assertion was true of a sheet
             that could not have failed it. The `acts` keep-arm was titled "is kept" and
             asserted refusal, so one of two arms was unproven. Both replaced: the
             detector is pinned on the sheet that shipped the defect, the effect on the
             run that followed, and the keep arm has its own case. A test that cannot
             fail is worse than no test, and this is the second time this sprint I have
             written one.

             **Named, not built** (the brief ended at the forty, and the decision in front
             of the owner is retention, not more engine work):
               (a) the anchor's remaining half — answer the ask's NUMBER, validate by
                   index. One field, strictly tighter than today.
               (b) the repair landing needs the seat's two guards: `conditionsImposedTwice`
                   and `danglingRefIn` on authored trait text. Three of six FAILs.
               (c) still the critic's: the missing number ("up to such puppets").
surprises:   The anchor's failure was half mine a second time, and in a new way: the call
             obeyed my instruction literally and copied the line I rendered, annotation
             and all. I wrote both the instruction and the checker and they disagreed. And
             the FAIL regression inverted the sprint's pattern — for four sessions the new
             path walked around the engine's rules; this time the engine's oldest
             authoring path walked around the new path's guards.

### R9 · RELEASE PASS, session two — and the gate, both runs
predicted:   the remaining R9 items land and the two gate runs give the release numbers.
measured:    `sweep-2026-11-02T20-21-41` and `homebrew40-2026-11-02T20-39-39`, live,
             **40 of 40 and 40 of 40, 0 THROWS on both.**

             | | sweep baseline | **sweep now** | homebrew40 baseline | **homebrew40 now** |
             |---|---|---|---|---|
             | FAIL blocks | 6 | **2** | 1 | **6** |
             | R1 lint findings | — | 5 | — | **0** |
             | clause coverage | 88% | 85% | 54% | — |
             | throws | 0 | **0** | 0 | **0** |

             **R1 lint: homebrew40 is 0 of 40.** Forty #4's deterministic bait is gone.
             Sweep's 5 are `orphan-action-row` x2, `double-punctuation`,
             `engulf-needs-a-grapple`, `inline-weapon-collision` — **none traces to R9**.
             The one that resembled C6 was checked: it is `28-ilvareth`'s HEADER field
             ("charmed ((with mind blank))"), the exact sheet and class R1 filed
             originally, not the row-name "?." that C6 fixed.

             **Sweep, the regression floor, is halved: 6 -> 2.** Neither survivor is on
             the R9 list (`gate-fit`; the known-intermittent `under`).

             **homebrew40 is 1 -> 6, and the composition matters: three of the six are
             ONE new class** — `engine-needs-key` on Thorned Embrace, Clinging Grasp and
             Quarrelsome Grip ("a grapple or engulf engine with no key in the words") —
             plus `multiattack-row`, `attack-in-multiattack` and `under`. A grapple-engine
             cluster on three sheets, not six unrelated defects, and **not one forty-#4
             class recurred**.

             **THE ANCHOR, the pass's clear result: 18% -> 41%** on homebrew40 (34% on
             sweep). And the residue is now a single clean category: **every unanchored
             seat on both runs answered NOTHING — the field absent or empty. Zero
             near-misses, zero out-of-range.** The index answer closed the half that was
             mine (20 of 69 on forty #4 were copies of the rendered line, annotation
             included); what is left is the model declining to answer, which is where a
             small selection call would earn its cost. Per the brief, NOT built.
runs:        both above · suite 178/178, 4681 tests · build clean · row-text `.replace(`
             **187**, unchanged · packages `CRITIC-blocks-sweep-gate-2026-11-02.md` and
             `CRITIC-blocks-homebrew40-gate-2026-11-02.md`.
commit:      uncommitted — paste-ready messages in the session report.
not done:    **TWO BRIEFED ITEMS ARE AIMED AT THE WRONG PATH. Measured, not guessed.**

             **F17 is correct and INERT.** `SEAT_DEFAULT_TRAIT`, the path it gates, ships
             about **once per forty** — 1 of 40 (forty #4), 0 of 40 (forty #3), 1 of 39
             (sweep forty #1) — and fired ZERO times across both gate runs. Also recorded
             because it is the class that has bitten this sprint repeatedly: my first
             version read `openClausesT` from a scope where it is not declared (a `const`
             in a try block closing ~430 lines above the trait seat), so it was a **silent
             no-op the whole suite passed**. Caught by checking the scope, not by green.

             **THE REPETITION THE CRITIC MEASURED IS THE DONOR'S OWN COMPOSITION.** Traced
             on forty #4's rows: Regeneration x5 and Aura of Authority x5 carry **no
             provenance mark at all** — not template, not library, not kit, not print, not
             authored — so they are `scaleDonor`'s chassis rows; only Fear Aura x3 is the
             fallback shelf. The donor shelf picks the same chassis for similar concepts.
             This also explains the Regeneration STACKING exactly: on #18 and #23 the
             Regeneration is the chassis's and the authored heal landed beside it, so "one
             per-turn heal per sheet" must be enforced AT SHIP across every provenance —
             which is not how E15 was briefed. Neither rebuilt on the last pass.

             **Reported, not built.** D11 is a third case the brief did not anticipate:
             path `class_npc`, print body **Spy**, class **monk** — Cunning Action is
             print's own row on the Spy, beside a correct monk kit, so neither table is
             wrong and the fix is a cross-class yield rule with its own measurement.
             `second-person` replaces `your` -> `its` but not `you`, giving "you end its
             turn" (deciding what "you" becomes is a reading of who the sentence
             addresses). D12's two arms are wired but **would not have fixed #10**: its
             clause record reads "no mouth" -> lacks/speech and "no eyes and no name" ->
             plain `has`, so the call never declared the sight lack.

             **Refused with numbers** (session one): B5 — 30 of 31 library seed names are
             not print row names, so a name rule kills the fallback shelf; C8 — 2014 has
             no "version" idiom. **Not reached:** D9, D10, C7, H.

             **The critic has not read either gate run.** Bait, surprise and retention are
             theirs and are NOT scored here.
surprises:   The two items that did not pay off were both aimed at paths that barely run,
             and in both cases the evidence was one grep away from the brief that assigned
             them. The lesson is the sprint's own, inverted: we have been measuring whether
             a FIX works, and not whether the PATH it fixes is the one carrying the defect.
