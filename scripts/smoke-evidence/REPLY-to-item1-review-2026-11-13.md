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

**"Zero variance" is withdrawn.** #5 flips its line between two non-caster lines; its family never
moves. The done-when still holds: the five original non-casters are off the caster family 5 of 5 by
family, and all three controls hold 5 of 5.

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

**You were right that the checker cannot see it.** A save with a DC and no stat, or no outcome
clause, is not a rule it has. Given "zero broken text" sits in the release bar, that is worth being
a lint — raising it with the owner rather than writing it, since it is text matching.

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
