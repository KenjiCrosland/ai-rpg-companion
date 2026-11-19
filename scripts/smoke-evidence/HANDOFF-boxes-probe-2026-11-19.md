# Handoff — the duration fix, Part 1 built and probed; Part 3 not started

For Fable 5.2 and the owner, 2026-11-19. Branch `statblock-enhancments-part-2`.
Probe sheets: `BLOCKS-rider-probe-2026-11-19.md` beside this file. `baseline-2026-11-18` untouched.

## The headline

The duration fix and **Part 1 are built**. Its probe says the boxes are **never chosen**: across 39
live seat rolls the model used a rider or a strike **0 times**. **Part 3 is not built.**

## 1. Suite and replay

**256 suites, 5,694 passed, 26 skipped.** Strict replay of the baseline, no re-record:
**1 of 38 reproduces, 37 miss** — 30 at the seat call, 6 at the audit, 1 at the repair. That is
Part 1 changing `formsSpec`, which the seat and the clause-repair call both print. Expected; left.

## 2. The duration fix — and the handoff's diagnosis was wrong

**Counted first: 4 rows on the baseline come from a `source_end` template and 2 are written as "its
next turn"** — s05 Stolen Voices and s06 Shale Spray.

The handoff said a `source_end` duration was being *written* as "its next turn" on a printed body.
It is not. The fit call **answered** `duration: "target_end"` on both sheets, and the fill lets the
call's answer override the template's `duration_default`. That override is the 2026-10-23 rule and
is right everywhere else. s06 is not a printed body either.

Of 114 templates, exactly one has both a `{duration}` slot and a sentence that refers back to the
condition it just applied — `escalating-dread`, whose "If the target was already Frightened BY THIS
ABILITY" can only fire if the fear outlasts the creature's own turn. It now declares
`duration_fixed` and the call does not choose there; everything else is unchanged. The declaration
is carried on **both** catalog branches, because this file has twice shipped a declaration that
never reached its template (`needs_body`, `rewardsCondition`), and a data-integrity test asserts the
flag sits on exactly the templates whose text needs it.

## 3. Part 1 — built, and the probe's answer is "unused"

### The boxes

- **A light rider** — Prone, Grappled, a push or pull, no save — welds onto the named attack and
  adds no row, through `riderTextFor`, the weld the attack form and the hook-rider template already
  use. Print's Dire Wolf Bite.
- **A strike** — anything needing a save — becomes its own named row carrying that attack's numbers,
  which Multiattack offers in place of one attack. Print's Ghoul Claw, down to "If the target is a
  creature, it is subjected to the following effect." The drake's case renders:

```
Deafening Peal   *Melee Attack Roll:* +7, reach 10 ft. 12 (2d6 + 5) Piercing damage plus 5 (1d10)
                 Thunder damage. If the target is a creature, it is subjected to the following
                 effect. *Constitution Saving Throw*: DC 15. *Failure:* The target has the Stunned
                 condition until the end of its next turn.
```

- **A curse field** on both, taken only where the declared ask is curse and only once a sheet.
- **`response_kind: 'parry'`** — see below.

### The probe

`--live-from seat --rolls 3` on the eleven sheets, then 6 more rolls on s31 and s04 after the
redirect landed. **39 rolls. Nothing threw.**

| | |
|---|---|
| seats seen | 66 |
| landed | 31 |
| refused twice | 18 |
| **landed through a rider** | **0** |
| **landed through a strike** | **0** |

Refusals by reason: **a trait is not a save ×11**, a save written as prose ×3, a save with no effect
×2, no row of the kind asked ×1, a number promised and not written ×1.

**THE BOXES ARE REACHABLE AND UNUSED.** They are in the prompt — I printed it and checked — with the
"WHICH FORM" guide beside them. The model stays in the kind the seat asked for.

**Half of Part 1 was missing and that is my fault.** The handoff asked for the same redirect the
Reaction already has: a trait refused as a save whose trigger is one of the creature's own attacks
hitting should be told to answer in the rider form. I built the boxes without it, and the probe is
what showed it mattered — 11 of the 18 double refusals were exactly that shape and the reason
pointed nowhere near the new boxes. It is built now, and 6 further rolls on s31 and s04 still
produced no strike: the second answer came back a trait again ("Downdraft", which landed).

**My read: do not put Part 1 in the re-record yet.** It cannot break a sheet — nothing reaches it —
but it changes `formsSpec`, which costs a full re-record of the forty for no measured gain. What it
needs first is the thing I cannot test from here: the seat's own ask naming the form, rather than
asking for "a trait" and hoping the guide redirects. That is a change to the ask and your call.

### How a rider is priced, and the gauge

**Not at all.** `text_noRider` is the damage twin (a 60/40 per-hit split); `checker.mjs` strips
`plus N (NdN) type damage if …` out of the damage read; `determine-features-and-bonuses.mjs` has six
categories, all magical effects, with conditions appearing only as examples of an immunity. No
condition a row imposes is counted anywhere.

So the gauge agrees with the owner's ruling by construction: **a strike cannot move the CR read.**
The clone deals the attack's own damage and Multiattack offers it *in place of* one attack, so
per-round damage is identical; the condition is unpriced either way. The once-a-turn replacement is
the only thing bounding it, which is what he said it was.

### Print's wording for `halve` and `hinder`

**Print has neither.** Of its 14 Reactions: `parry` appears four times, in one sentence — the Bandit
Captain, the Warrior Veteran, the Pirate Captain, the Mummy Lord: *"adds N to its AC against that
attack, possibly causing it to miss."* **0 halve the triggering attack's damage and 0 impose
Disadvantage on it.** The nearest shape is the Stone Giant's *Deflect Missile* — "reduces the damage
it takes from the attack by 11 (1d10 + 6)" — a die, not a half, and it needs an amount the form has
no field for. Both values are left out, as the handoff said to do.

A parry's AC bonus is written by the engine, so the number gate counts it; without that it refused a
correct parry, which is the same class as a save's fields and as 0.2's relational amounts.

## 4. Part 3 — not built

No switch, no `changes` field. The idea call's prompt is untouched.

## 5. Would I re-record each

- **The duration fix — yes.** One template, measured, 2 rows on the forty, and a test that stops the
  declaration going dark.
- **Part 1 — no, not yet.** Built and tested, reachable, and used 0 times in 39 rolls. It costs a
  full re-record and buys nothing until the seat's ask names the form.
- **Part 3 — nothing to include.**

## 6. What turned out wrong when I read the code

1. **The duration diagnosis.** Not a printed-body naming fault: the fit call answered `target_end`
   and the fill honoured it. Found in the tape, not the sheet.
2. **Part 1 was half a build without the redirect**, and only the probe showed it. 11 of 18 double
   refusals were the shape the redirect exists for.
3. **A gap recorded, not fixed:** the Reaction redirect matches "takes damage" adjacently, so "takes
   THUNDER damage" — the Trenchsong Leviathan's Brinebell Chord, one of the eleven empty seats —
   reaches neither redirect and gets the bare reason. Pinned as today's behaviour in a test.
4. **A parry trips the number gate** unless the engine's own AC bonus is counted. Found by reading
   the refusal on a correct answer, not from the spec.
