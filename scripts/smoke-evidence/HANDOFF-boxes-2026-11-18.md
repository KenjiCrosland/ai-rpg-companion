# Handoff — Part 0 and Part 2 built; Parts 1 and 3 not started

For Fable 5.2 and the owner, 2026-11-18. Branch `statblock-enhancments-part-2`.
Probe sheets: `BLOCKS-probes-2026-11-18.md` beside this file. The forty is unchanged and still
`BLOCKS-air-elemental-2026-11-18.md`; `baseline-2026-11-18` was not touched.

## The headline, first

**Part 0 and Part 2 are built, with their probes. Parts 1 and 3 are NOT built.** I ran out of room
before the form's three boxes and the twist's row rewrite, which are the two largest builds in the
round. Nothing of either is half-landed: no box exists, no switch exists, and the seat's form and the
idea call's prompt are untouched. The re-record is still correctly not done.

## 1. Suite and replay

**254 suites, 5,665 passed, 26 skipped.**

Strict replay of the baseline as it stands, with no re-record: **1 of 38 reproduces, 37 miss** — 36
at the audit call and 1 at the seat call. That is Part 2 changing the audit prompt on every sheet and
0.1 adding Stunned to one second-ask reason. Expected, and left as it is.

## 2. Part 0

**0.2's count, across the baseline:** the number gate would refuse **4** rows, and **2** of them
state their amount by relation — the Oathbroken Warder's "psychic damage equal to the damage dealt",
and the Well Drowned Worm's "moves up to its Speed toward the nearest body of water". The other two
name no amount at all and stay refused.

### s27 Oathbroken Warder — the warder's trait landed

```
The Oath's Silence   When the warder hits with a Mace attack, the warder can deal maximum damage
                     instead of rolling, but takes Psychic damage equal to the damage dealt.
Aura of Authority    While in a 10-foot Emanation originating from the warder, the warder and its
                     allies have Advantage on attack rolls and saving throws …
Multiattack          The warder makes three Mace attacks. It can replace one attack with a use of Shield Bash.
Mace                 *Melee Attack Roll:* +7, reach 5 ft. 17 (3d8 + 4) Bludgeoning damage, and the
                     target has Disadvantage on its next attack roll …
Shield Bash          *Strength Saving Throw*: DC 15, one creature within 5 feet … *Failure:* 9 (2d4 + 4)
                     Bludgeoning damage. If the target is Medium or smaller, it has the Prone condition.
Parry (Reaction)     The warder adds 3 to its AC against that attack, possibly causing it to miss.
```

### s29 Swarm of Funeral Bells — Knellsong is back, with Frightened

```
Knellsong   *Trigger:* A creature within the swarm's reach drops to 0 Hit Points.
            *Response—Wisdom Saving Throw:* DC 17, each other creature of the swarm's choice within
            30 feet. *Failure:* The target has the Frightened condition until the end of its next turn.
```

The trace reads `Deafened swapped for Frightened: the second answer was refused for Deafened alone
and for nothing else, so the engine made it Frightened and kept the row`.

## 3. Part 1 — not built, but the pricing question is answered

You asked how the engine prices a rider today, and whether a save-gated condition on every hit of a
Multiattack moves the CR read. **It does not move it at all.**

- `text_noRider` is the DAMAGE twin, not a condition twin: `scale.mjs` splits a melee attack's
  per-hit into 60% base plus 40% energy-rider dice, sum unchanged. A damage rider is inside the
  budget by construction.
- The offensive read is dice. `checker.mjs` strips `plus N (NdN) type damage if …` — a conditional
  rider's damage — out of the main damage before reading it.
- `determine-features-and-bonuses.mjs` has six categories, all magical effects; conditions appear in
  it only as examples of an *immunity*. No condition a row imposes is counted anywhere.

So Box 1 would let a model hang Frightened on every hit of a three-attack Multiattack for nothing.
**My read is that a once-a-turn limit is needed**, written by the engine rather than asked for — it
is print's own habit on exactly this shape (the Reed-Ascetic's "Once on each of the reed-ascetic's
turns when it hits with this attack"). That is a decision for you and the owner, and it is the
reason I would not have shipped Box 1 without asking even with room to build it.

## 4. Part 2 — built, probed

One audit call on all 38. **16 undelivered findings across 15 sheets.**

### The findings by defect, this probe

| defect | count |
|---|---|
| other | 27 — **of which 16 said `undelivered`** |
| weak | 10 |
| dead_reference | 7 |
| open_ended | 6 |
| untrackable | 5 |
| wording | 2 |
| misnamed | 2 |

The probe ran before the engine knew the word, so every one was logged as
`other (the audit said "undelivered")`. That is now fixed — `typed-fixes.mjs` holds the closed list
too, and I had only added the word to the audit's own schema. A re-run would show 16 under their own
label and `other` down to 11.

### The sheets it named

`s04 s05 s06 s11 s12 s13 s14 s15 s16 s17 s24 s28 s31 s34 s40`

**It names most of yours and misses two of them.** On your list it finds the Air Elemental ("the
entry has no audible or voice-related effect"), the Purple Worm, the Thunderwall Drake ("carries no
push, movement, or lingering barrier"), the Tollkeeper ("no bell, no sound"), the Pit Fiend, s24
("the Multiattack only repeats the maw, leaving the four scythe-arms unused"), s12 and s15.

**It does not name the Hydra or the marsh witch** — the two you predicted. And it fires on s06, s11,
s40 and s16, which you or the owner graded Keeper or Runs.

15 of 38 is not noise and is not clean. My read: it is worth keeping as a logged label and is **not**
yet the count for the owner's first bar.

### Renames

**4 held, 7 landed** — the same 4 as last round, not fewer. Showing the audit the request did not
stop it proposing a new name for a row written for a clause; the guard is still what holds them.

## 5. Part 3 — not built

No switch, no `changes` field, nothing. The idea call's prompt is untouched.

## 6. Would I put each in the re-record

- **Part 0 — yes.** Four small rules, each measured, each with its probe sheet. 0.2 is two rows on
  the forty, 0.1 is one, and 0.4 stops a sheet being dropped from the gate by hand.
- **Part 2 — yes, as a logged label only.** It changes no row and the rename guard is untouched, so
  the risk is a prompt a model reads differently. Its value is that you can now count what you have
  been grading by hand. Do not wire anything to `undelivered` until a second run says it is stable.
- **Part 1 and Part 3 — not applicable.** Nothing to include.

## 7. What turned out wrong when I read the code

1. **`undelivered` lives in two places.** The audit's schema in `format-2024/audit.mjs` and the
   engine's closed list in `reskin/typed-fixes.mjs`. The handoff names only the first, so the probe
   logged every finding as `other`. Found by reading the probe's own trace lines.
2. **A rider is not priced.** The handoff asked whether a save-gated condition on every hit moves the
   CR read; the answer is that no condition a row imposes is counted anywhere in the read, which
   makes a limit a prerequisite of Box 1 rather than an open question after it.
3. **`validateAuditResponse` returns a boolean**, not the parsed response, so the test for
   `undelivered` had to assert that the word passes validation exactly as `weak` does rather than
   read a finding back out of it.
4. **My own:** I chained `npx jest … | tail` with `&&` and committed over a red suite — the chain
   read `tail`'s exit code. The failing test was `typed-fixes.spec.js` pinning the defect list at
   seven, which is precisely the test that should fail when the list changes. Fixed in the commit
   after it, and reported here rather than quietly amended.
