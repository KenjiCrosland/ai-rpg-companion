# Update — fix 2, the two-key design and what the new canaries showed

Not committed. Paste-and-go update for Fable 5.2.

## Your ruling is implemented, with one scoping change

Two keys, as you specified. Key one is the idea call labelling it a condition on a hit (the
re-seat). Key two is the fit call actually filling a rider form. A refusal falls back to the trait,
and then one check decides whether that trait may ship.

**Where I narrowed your check.** You wrote it as "if that trait imposes a condition, it does not
ship as a trait". Taken literally that refuses every fear aura, noxious aura and zone trait — they
all impose conditions, legitimately, and none of them is anybody's rider. So the check is scoped to
rows this fix actually moved: a trait stamped `riderRefused`, meaning its own idea was the one
re-seated. Your two tabled cases come out identical:

| row | conditions the reader finds | result |
|---|---|---|
| mislabelled stance (crit 19-20, cannot be Frightened) | none | keeps its trait |
| Grask's grapple-on-a-hit | Grappled | refused as a trait, ask owed |

Same outcomes, no collateral on rows the fix never touched.

**And you were right that my step 2 was wrong.** "Authoring honours the section or refuses" would
have welded that stance onto the Longsword as a rider it is not, or dropped a good trait. The
fallback keeps the good trait and still blocks the bad one, and it needs no stronger gate on the
model's self-report — a wrong rider now needs two calls wrong together, which is inside the owner's
stated tolerance.

Agreed on the smaller call: the ~10 damage payoffs at trait seats stay put. Print writes bonus
damage on a hit both ways.

## The new canaries ran, and fix 2 never fired

`v-small`, 12 blocks, `smoke-out/v-small-2026-11-14T03-48-05`. (Note for your own runs: `--only`
does not accept a comma list — `--only 4,11,12` silently generated all twelve. A single value works.)

**No `condition rider rides the attack` trace on any of the twelve blocks.** The fix is correct and
inert on this input set, and that is the honest headline rather than the cards.

### #4 Grask — the done-when is met, and not by fix 2

```
Iron Jaw. Melee Attack Roll: +7, reach 10 ft. 13 (2d8 + 4) Piercing damage.
          If the target is a Large or smaller creature, it has the Grappled condition (escape DC 15).
```

No trait imposes a condition on a hit. `Stubborn Grip` and `Hinged Iron Clamp` are both payoffs on
an existing grapple, not impositions. So the green is met.

But the trace says who did it:

```
hold_shape: grip on the GM's own words "clamps his iron jaw on a foe"
clauses: "clamps his iron jaw on a foe" -> has (mechanical) [asked: on_hit/attack] [askMechanic: grapple]
named parts: Iron Jaw (slot, Grappled) — the user's words, the engine's numbers
```

**Your canary fix worked so well it routed around the defect.** Once the GM asks for a hold
explicitly, `hold_shape: grip` resolves it and the named-parts pass lands the rider with its escape
DC three passes before the trait seat is reached. The trait seat never sees a payoff/condition idea,
so there is nothing for fix 2 to re-seat.

That is a real improvement in the canary and a real problem for the canary: it no longer reproduces
the bug.

### #11 Chainsworn Bailiff — inconclusive, not failed

"drags a target off its feet" became:

```
Hooked Chain Reel. One creature within 30 feet must make a DC 14 Strength saving throw.
    On a failed save, the target is pulled up to 20 feet straight toward the bailiff
    and is grappled …
```

No Prone anywhere, so the green's first half ("Prone rides the chain attack") is not met. The second
half is ("no trait imposes a condition on a hit"). Fix 2 was never in the path — the ask routed to a
pull-and-hold save action — so this is **inconclusive for fix 2**, not evidence against it. Whether a
knockdown ask should produce Prone rather than a grapple is a separate question, and probably yours.

### #12 Captain Hesk — the control's real risk is clear, the control itself did not fire

The ally stance never became a trait at all. It landed as `Shield-Wall Command (2/Day)`, temporary
Hit Points for allies within 30 feet. Nothing was welded onto an attack, which is the thing that
matters, but the mislabelled-stance path was not exercised either.

## What I conclude, and what I would not claim

The defect fix 2 targets needs the idea call to produce a `payoff` + `condition` idea at the TRAIT
seat. On the original Grask it did, by **inventing a grapple the GM never asked for**. With the ask
made explicit, the clause and hold machinery claims it first. So fix 2 is a safety net for a path
these three inputs no longer take.

Measured: **8 sheets across three saved forties** carry the shape. **0 on this run.** That is the
"correct and inert" pattern this sprint has been bitten by twice (F17, E15), and the right response
is to say the canary still does not reproduce the defect rather than to claim the fix works because
the card looks right.

Fix 2 cannot make a sheet worse — the two-key check only refuses a row that imposes a condition on a
hit when no attack row carries it, and otherwise leaves the trait alone. So my recommendation to the
owner is to accept it on the forty measurement and let the next full forty say whether it fires,
rather than build a canary vague enough to make the idea call invent an on-hit condition — which
would be tuning an input to the fix.

Unit level, unchanged: 6 tests, sensitivity-checked. 5166 tests, 211 suites.

## One for the quality list

Grask's `Grinning Lock` is a Constitution save that **Blinds at 60 feet**, on a creature whose entire
concept is clamping its jaw onto someone in melee. Range and mechanic both read wrong for the body.
Not a fix 2 matter.

## Still open

- Fixes 3, 4, 5, 6 not started.
- The donor-matches-routed-line check on the block rung: still unwritten.
- The print-stamp exemption hole: the stamp means "carries print's name", not "is print's text".
- The two-saves blind spot.
