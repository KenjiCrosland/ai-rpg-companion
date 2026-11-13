# Reply to the item 1 review — 2026-11-13

All four of your "before calling item 1 done" items are done, and your methodological catch was the
valuable one. Where you were wrong it is one inference, and it is worth correcting because the
defect you found is real and the fix is somewhere else entirely.

## Your four items

**1. Rerun the probe at production temperature — done, and you were right.**
`ai-client.mjs` sets no temperature anywhere, so production takes the provider default and my probe
at 0.2 ran colder than the thing it measured. The line is gone and the file now says why. Rerun,
with your two bare-name cases added:

```
✓ #1  big bob          [artillery ] skirmisher-hurler ×5
✓ #2  Old Marta        [artillery ] skirmisher-archer ×5
✓ #3  catapult ogre    [artillery ] skirmisher-hurler ×5
✓ #4  net-and-trident  [controller] skirmisher-hurler ×5
✓ #5  giant spider     [controller] brute-grappler ×4  skirmisher-hurler ×1
✓ #6  Sister Maudra    [controller] caster-warpriest ×5        CONTROL
✓ #7  storm sorcerer   [artillery ] caster ×5                  CONTROL
✓ #8  Bramblejack      [lurker    ] lurker-trap ×5             CONTROL
✓ #9  Vhalgrin         [artillery ] skirmisher-hurler ×4  skirmisher-archer ×1
✗ #10 Orsolya          [controller] brute-grappler ×3  caster-binder ×2
```

**"Zero variance" is withdrawn.** #5 flips between `brute-grappler` and `skirmisher-hurler`.

**And a correction you caught in the reply: those are two different FAMILIES, not two lines in
one.** My own probe output printed `families: brute×4 skirmisher×1` on the same line I misread.
Neither is caster, so the done-when still holds — the five original non-casters are off the caster
family 5 of 5, and all three controls hold 5 of 5 — but "its family never moves" was wrong.

**4. Your two bare-name cases — answered, with a limit on the answer.**
A name-only **artillery** pick now gets a thrower and never a mage: Vhalgrin is skirmisher 5 of 5.
A name-only **controller** is not stable: Orsolya is `brute-grappler` 3 of 5 and `caster-binder`
2 of 5. The gate is doing what it was built to do — it defers to the call's own `casts` answer, and
on a bare name the call has nothing to read and guesses differently between rolls.

The limit: **production expands a thin concept before routing** (`expandFirst`,
StatblockGenerator ~1361), so a bare name reaches the route call as a sentence, not a name. This
probe exercises the fallback you asked about, not what a user gets. I would not tune Orsolya on it.
Bramblejack is the one input we have both readings for — bare name, probe and block run agree on
`lurker-trap`.

**2. The saved role label — fixed.** It was worse than either of us said. The Vue already computes
`archetypeSource` correctly (`givenArchetype ? 'user' : 'auto'`) and the reskin path was
**hardcoding `'user'`**, so an *auto* sheet also claimed the user picked its role and the card's own
"auto" hint could never fire. The sheet now records the user's own pick when they made one, the
routed family when they did not, and the source says which. This also repairs a mismatch that
predates everything here: Sister Maudra has always saved as "artillery" on a controller pick,
because `caster-warpriest` carries `role: 'artillery'` in the shelf table.

**3. Prompt-string assertions — converted** to `shelfFor`, which is exported and pure. One rendered
assertion is kept deliberately, to prove `buildRoutePrompt` is wired to `shelfFor` at all; without
it the pure function could be correct and unused.

## Your corrections to me — both accepted, both verified

**Role is a preference at the template menu, not a gate.** Confirmed in the code:
`// the off-shelf ones are APPENDED, never mixed in`. My done-when inherited your earlier assurance
and was wrong to claim a body cannot draw another family's abilities.

**`closest accepted` fired on 4 of 8** — Big Bob, Orb-Weaver, Skyfeud, Bramblejack. Exact.

**Old Marta** — confirmed, and your reading of it is right: `[path] class body: the fighter stands
on the Gladiator`, her Multiattack is three Longswords with the crossbow as the swap. The route
answered `skirmisher-archer` correctly and the class-NPC body overrode the attack list. That is
your item 4, not item 1.

## Where the Deflect Missile inference was wrong — and what it actually is

You wrote: *"From how print words that reaction, the 2014 conversion appears to have dropped the
save and the failure label."* The defect is real and your instinct about the missing labels was
right. The cause is not the conversion.

Both printings carry identical text, **and so does the corpus, and so does the vendored SRD
markdown we parse it from**:

```
*Response:* ...the giant can redirect some of the attack's force.
DC 17, one creature the giant can see within 60 feet. 11 (1d10 + 6) Force damage.
```

The official text — checked against D&D Beyond, AideDD and Roll20 — has both labels. **Our data was
wrong.** Repaired at the source, in the corpus:

```
*Dexterity Saving Throw*: DC 17, one creature the giant can see within 60 feet.
*Failure:* 11 (1d10 + 6) Force damage.
```

Label style follows the corpus's own, measured over all 1310 rows: `*X Saving Throw*:` (198 uses)
and `*Failure:*` (190).

**The sweep, because one found row is never the extent of a data defect.** Of 1310 print rows:

- **1 unrunnable** — the Stone Giant's. Now repaired.
- **1 typographic** — the Chain Devil's `*Response--Wisdom Saving Throw:*`. I nearly "fixed" the
  structure here and checked first: `Response—Wisdom Saving Throw:` is the **official** form for a
  reaction whose response is itself a save. Only the em-dash had been ASCII-ed. Normalised, nothing
  else touched.
- **9 cosmetic, left alone** — Medusa, Basilisk, Gorgon, Cockatrice, Death Dog and four Silver
  Dragons write `*First Failure*` / `*Second Failure*` without their colons. Readable, mechanically
  complete.

The repair is `scripts/repair-srd-save-labels.py`, built like the reactions merge: it refuses to
write unless dumping the unmodified parse reproduces the file byte for byte, unless each target row
matches exactly once, and unless exactly the intended rows differ afterwards. 2 of 1310 changed,
1308 byte-identical, and the written file re-parses to the repaired document.

**Why this survived:** springbov, the copy the corpus was first built from, has **neither** row — it
is the same source that was missing 19 of 22 Reactions sections. Both rows arrived in the merge from
oldmanumby, which has the reactions and mangled two of their labels. We traded one gap for a much
smaller one.

**You were right that the checker cannot see it, and the owner has ruled: it is a lint.** Shipped as
`save-unrollable`, in the lint's existing "rule text that did not finish assembling" family. Two
structural arms — a DC with no ability named beside it, and a save that names a DC and then stops
with no outcome in any form. Zero findings across all 329 print monsters, proven in the spec itself
so it cannot rot.

**Building it turned up something worth your attention.** I first shipped it as `unfinished-text`,
the obvious family. Those findings DELETE the row — *"half a rule is worse than no row"*. The suite
caught it immediately: on the monk sheet the rule removed the Unarmed Strike **entirely**, attack
roll and 16 (3d8+3) Bludgeoning with it, because the broken save rides a complete attack rather than
being the whole row. A monk with no melee attack is worse than a monk with a dangling save. So it
has its own rule name at `audit` severity: it reports on the CHECK file and the review page and
destroys nothing. Whether the dangling FRAME should then be surgically removed — as
`orphan-repeat-save` already does for a stray repeat-the-save sentence — is the owner's call, and I
have not taken it.

## Still open from your review

Nothing. The confirming block run is in: `v-route-2026-11-13T20-53-44`, 10 blocks,
**0 FAILs of 10**, 5114 tests pass.

**The role label is right on 10 of 10** — every sheet records the role the user picked, including
Sister Maudra, who now saves as "controller" instead of the "artillery" she has always recorded.

**The Stone Giant row reaches the card in both printings**, which also settles your inference
properly. Bob is a 2014 sheet, so the shipped card reads:

```
One creature Bob can see within 60 feet must make a DC 18 Dexterity saving throw,
taking 11 (1d10 + 6) force damage on a failed save.
```

and the 2024 printing beside it:

```
*Dexterity Saving Throw*: DC 18, one creature Bob can see within 60 feet.
*Failure:* 11 (1d10 + 6) Force damage.
```

So the 2014 conversion was never the culprit and was always able to do this — it had nothing to
convert, because the labels were missing before it ran. With them present it names the save in
correct 2014 prose, first time.

One note on your Big Bob read. You scored him *rework* for "one rock he must walk over and pick
up" — that was the previous roll's `Stone Discus`. This roll gives him a plain `Boulder`,
*Ranged Weapon Attack, range 60/240 ft., 12 (2d8 + 3) Bludgeoning*, with no retrieve clause at all,
beside a reach-15 Stone Club. Nothing I changed touches attack rows, so treat that as roll variance
rather than a fix — the retrieve problem is real and will need its own replay to pin down.

## Method note

Three numbers I reported yesterday were read off trace lines or a wrong parser: the 31-of-40 you
caught, "the mage leaking on three sheets" (it is on **one** card — the other two were my own
engine's narration), and a draft of the item 1 report showing four blocks with no rows (my reader
only knew the 2014 sheet shape; 2024 sheets keep rows under `sections`). A fourth was caught before
it reached anyone: my bare-DC sweep still flags the Chain Devil, because the regex allows
`Throw*:` and the row writes `Throw:*`. All corrected in place. The rule I am working to now: read
the card, not the log; print one real input before trusting a probe; and check the official text
before repairing data.

---

# Round 2 — your review of the label fix

Both opens are closed, and the blocks and traces you could not see are pushed.

## The label fix moved the problem to re-rolls — you were right, and it was mine

Confirmed exactly as you described. `rerollCatalog` read `monster.archetype`, which now holds the
user's label, so re-rolling a row on Big Bob drew from the **artillery** shelf his body does not
stand on. Before the push it drew from skirmisher. Three `buildContext` calls and the band hints in
`Statblock2024.vue` had the same read.

One field was doing two jobs. They are separated now:

```js
export function bodyFamilyOf(monster) {
  const routed = monster?.generation?.archetype;   // the family the route landed on
  if (routed && routed !== 'balanced') return routed;
  const label = monster?.archetype;                // the role the user picked
  return label && label !== 'balanced' ? label : null;
}
```

Display reads the label; mechanics read `bodyFamilyOf`. **One definition, five call sites** — the
last time a shared rule in this engine grew private copies, widening it fixed none of them.

Your data test is `the-label-is-not-the-body.spec.js`: a sheet labelled `artillery` whose
`generation.archetype` is `skirmisher` re-rolls from the skirmisher shelf, plus the cases that have
no routed family, a `balanced` in either field, and a hand-made sheet with neither.

## The spider — the traces say what changed the body

Not the route being overridden. `giant spider` matched the **print** Giant Spider, so the sheet is a
twist on a print body, and the print-canon route deliberately stands a seat down:

```
[path]  twist — Giant Spider (is) — "giant spider" (call)
[route] brute-grappler  type=Beast  mechanics=grapple, engulf, snare
        hold_shape: reach on the GM's own words "webs up the whole room"
print canon route: the Giant Spider's body outranks the grappler seat
                   — no verb in the words names it; the plain brute line
donor:  brute-5 -> CR 5
```

So the route call did return `brute-grappler`, and the print body then took precedence by an
existing rule. Whether a print body should outrank a role the user explicitly picked is a real
question — and it is the same question as Old Marta's Gladiator, so it belongs with your item 4
rather than here.

**Your ladder point stands regardless, and I have taken it.** A route-only probe can be green while
the sheet stands on a different line; the block rung needs to assert that the donor matches the
routed line or that the trace says why not. That check is not written yet — it is the first thing I
will add to the next block rung rather than something I will claim is done.

## Pushed, as asked

| | |
|---|---|
| blocks (10) | `scripts/smoke-evidence/BLOCKS-v-route-2026-11-13-confirm.md` |
| traces | `scripts/smoke-evidence/TRACES-v-route-2026-11-13-confirm.md` |
| checker | `scripts/smoke-evidence/CHECK-v-route-2026-11-13T20-53-44.md` |

The three claims you could not verify are in there: the label on 10 of 10, Bob's repaired Deflect
Missile in both printings, and his plain `Boulder` at range 60/240 with no retrieve clause.

5128 tests pass.
