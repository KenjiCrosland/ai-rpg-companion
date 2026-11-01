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
