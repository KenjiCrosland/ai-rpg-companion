# Fixes A, B and C — and the drake still reads wrong

Branch `statblock-enhancments-part-2`. Three commits: `572ae58` (A), `cfc5ee9` (B), `446fe6a` (C).
Blocks: `BLOCKS-two-sheet-check-2026-11-20.md`.

**s26 reads right. s31 reads wrong. The forty was not recorded.** Nothing was deleted.

## The suite

Read from its own exit code, not through a pipe. **exit 0 — 5726 passed, 26 skipped, 5752 total.**
7 new tests across the three fixes.

## The two-sheet check

### s26, the Mirewitch — right, on all four counts

> **Multiattack.** Sable makes three Arcane Burst attacks. It can replace one attack with a use of
> Fen-Weight Hex.
>
> **Fen-Weight Hex.** *Wisdom Saving Throw*: DC 14, one creature within 60 feet. *Failure:* 19
> (3d12) **Necrotic** damage, and the target is cursed. While cursed, the target can't regain Hit
> Points.

Necrotic, not Bludgeoning. A save of the mind. The curse sentence on the row. No forced movement
and no leftover condition. Fix B holds on the finished sheet, which is where the last two sessions'
versions of this fix did not.

### s31, the Thunderwall Drake — wrong, and for three reasons, one of them mine

> **Multiattack.** The drake makes two Horn attacks.
>
> **Stagger-Wake.** *Melee Attack Roll:* +7, reach 5 ft. 11 (2d6 + 4) Piercing damage plus 7 (2d6)
> Thunder damage. … *Constitution Saving Throw*: DC 15. *Failure:* The target has the Stunned
> condition until the end of its next turn.

Stunned, at will, and this time the Multiattack does not offer it at all — worse than the probe,
not better. The trace names each cause in order.

**1. There is a SECOND one-nova site, and Fix A only patched the first.**

> `[reskin] one nova at ship: "Charge-Wake (Recharge 5-6)" un-gated to "Charge-Wake" — "Thunder
> Wall" already carries this sheet's Recharge nova`

Fix A patched the site that fired on the probe (`generate.mjs` ~7891, trace `one nova:`). This is a
different pass at **`generate.mjs` 1814–1839**, trace `one nova at ship:`, which runs at ship time
and re-applies the same rule. It does not read `strike` either. The ruling needs applying there
too. I did not touch it: that is a second fix for the thing Fix A was for, and the handoff forbids
that in one session.

**2. The pricing now treats a kept gate as a nova's gate — a consequence of the ruling, not a bug in it.**

> `[reskin] value check: "Charge-Wake (Recharge 5-6)" EV 9.9 vs floor 19.9 (the whole Multiattack
> (2 attacks)) — still under`

On the probe, with the gate stripped, this row read `EV 9.9 vs floor 9.4 (one attack of 2) — worth
the trade`. The floor is chosen at **`templates.mjs` 3302** by one word, `gated`: a gated row is
priced against the whole Multiattack, an ungated one against a single attack. So the moment a
strike keeps its Recharge, it is asked for nova-sized value — 19.9 against the 9.9 it can deliver —
and it will never clear the floor.

This is the same ruling needing a second reader. Your words in Fix A are "a strike is one attack of
two, not a nova"; `hasChassisNova` now knows that and the value check's floor does not. A strike
should price against `attackEV` whatever its gate, because the thing it replaces is one attack.

My `noGate` edit in Fix A is inert here and I should say so: the branch it feeds requires `!gated`,
so with the gate kept it never runs. It is harmless, it is not the fix, and I would take it back
out as part of the proper fix.

**3. A renamed strike loses its replacement clause instead of keeping it — latent, newly exposed.**

> `[reskin] name follows content: Actions/"Charge-Wake" promises movement the row never delivers —
> "Stagger-Wake"`
> `[reskin] multiattack re-read — "Charge-Wake" left; "Multiattack" now reads "The drake makes two
> Horn attacks."`

The rename pass renames the row; the citation sweep (`sweepDeadName`, **`generate.mjs` ~940–963**)
is handed the dead name with no idea a live row now carries it, strips it, and then the "a
replacement clause without its object is nonsense" rule removes the whole clause. The sweep has a
re-point arm, but it is on the branch below and does not serve this case.

This is not caused by A, B or C — the probe's three drake rolls happened not to be renamed, so it
did not show. It is Fault 1 regressing by a different road: the strike is on the sheet and nothing
offers it. **It would have shipped on the forty.** Catching it is the argument for the two-sheet
check being in the order at all.

## Where this leaves the re-record

Not run, per your instruction. One round fixes the three above — each is a known line — and then
the same two-sheet check, and then the forty. I would also widen that check by one sheet, because
both faults on the drake came from passes that fire at ship time and on a rename, and neither is
reachable from the seat's own trace.

## What in the amendment turned out wrong

Nothing wrong, but one thing incomplete: Fix A names the one-nova rule in the singular. There are
two sites that apply it and the one named in the trace you quoted is not the one that fires at
ship.
