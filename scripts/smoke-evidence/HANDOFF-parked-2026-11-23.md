# HANDOFF — the ribbon is parked, and the forty is the forty it was

2026-11-23 · branch `statblock-enhancments-part-2` · for the owner and for Fable

Three commits, ready to push. Nothing is pushed. **No live call was made.**

| # | Commit | What |
|---|---|---|
| 1 | `ab544eb` | the ribbon is parked — off unless it is asked for, with its two tests |
| 2 | `3bacfec` | `baseline-2026-11-22` goes (a deletion of its own) |
| 3 | — | the blocks file and this report |

**The current recording is `baseline-2026-11-20` again**, the one made before any ribbon, because it
is what the product's default reproduces.

---

## 1. The two replays, and the diff

| Replay | Switch | Result |
|---|---|---|
| `baseline-2026-11-20` | off — the default | **38 of 38 reproduced EXACTLY, 2 skipped** |
| `baseline-2026-11-23` | on — `--ribbons` | **38 of 38 reproduced EXACTLY, 2 skipped** |

No misses and no `DIFFERS` in either. Both tapes serve their own side of the switch exactly.

**The diff of step 4: all 38 re-run sheets are character-identical** to
`BLOCKS-the-forty-2026-11-22.md`, the forty before any ribbon. Not one line added, removed or
changed — `38 identical, 0 differing`. s22 and s36 cannot be replayed and are carried forward from
that file, as always.

This round's blocks file is `BLOCKS-the-forty-parked-2026-11-23.md`, all forty with the switch off.

## 2. Whether anything read `baseline-2026-11-22`

**Nothing did.** Grepped the whole tree outside its own folder: it appears in the prose of three
committed evidence files — `HANDOFF-ribbons-2026-11-22.md`, `HANDOFF-ribbons-amendment-2026-11-23.md`
and `BLOCKS-the-forty-ribbons-2026-11-23.md` — each naming it as the tape a past round replayed from.
No script, no test, no default. Removed in `3bacfec`, a commit of its own.

The other three stay, and here is what each is for, since this is the second round running in which
knowing that mattered:

| Recording | What reads it |
|---|---|
| `baseline-2026-11-20` | the product's default, which reproduces it; and `scripts/ribbon-probe.mjs` as its context source |
| `baseline-2026-11-23` | a replay with `--ribbons`, the parked feature's record |
| `baseline-2026-11-18` | no code; committed evidence prose only |

## 3. The suite

**278 suites, 6,013 passed, 26 skipped, exit 0**, single worker, read from its own exit code.
`npm run build` clean.

The two new tests are on the default and the switch, through `generateReskin` with a stub. The
existing ribbon tests all pass `ribbon: true` now and say in their header that they are the
switch-on tests; nothing was deleted or weakened.

## 4. Anything the switch left behind

**Nothing.** I did not take the replay's word for it — a replay compares the sheet it is given, and
the question was whether a trace of the feature survives anywhere. So I read the raw JSON of all 38
sheets from both runs and looked for a ribbon row in either edition, a `generation.ribbon` record,
and the word "ribbon" anywhere in the file at all:

| | Sheets mentioning a ribbon in any way | Traces mentioning one |
|---|---|---|
| Switch **off** | **0 of 38** | **0 of 38** |
| Switch **on** | 36 of 38 | 37 of 38 |

With it off there is no row, no record, no flag and not the word. The 36 and 37 with it on are the
sheets that qualify; the two that do not are s19 and s21, the printed creatures typed by name alone.

That the off column is zero and not "zero rows but a skipped record" is the fix from `9db2b39` doing
its work — a sheet that was never asked carries nothing, which the strict replay of s21 forced in
the first place.

---

## What I did not do

- **Nothing was pushed.** Three commits.
- **Nothing was deleted but the dead tape.** `reskin/ribbon.mjs`, the six families, the four rules,
  the validator and all 93 of their tests are in the tree, untouched except for the switch.
- **Nothing in the app turns it on.** The option is read from a dev-only key the harness sets; the
  product has no path to it.
- **I did not start on the wider zone, on payoff traits, or on anything else in the queue**, as the
  order says. The zone table from the probes round is recorded in
  `HANDOFF-probes-2026-11-22.md` §5 and in Fable's own handoff, so nothing has to be found again.

## Housekeeping I found and did not act on

While checking that the evidence folder matched the standing order, three blocks files and a number
of CHECK files look orphaned by it. **I have not touched any of them** — the order asked for one
deletion this round, deletions go in their own commit, and what is named is yours and the owner's to
say, not mine to infer.

- **Three blocks files predate the list** and are on neither the milestones nor the named-from-handoffs
  roll: `BLOCKS-bothways-2026-11-14.md`, `BLOCKS-probeB-2026-11-14.md`, `BLOCKS-probeC1-2026-11-14.md`.
  They may be named by a handoff older than the list, which is why I am asking rather than deleting.
- **Sixteen `CHECK-*` files remain**, and the rule is that a CHECK file goes when its blocks file
  goes. At least two point at October blocks files that are long gone —
  `CHECK-classes-eight-2026-10-16T22-10-02.md` and `CHECK-stage34-2026-10-16T20-49-59.md`. The rest
  are 16 November and pair with blocks files that are still milestones, so those stay either way.

Say which should go and it is one commit.

## One thing worth saying about the 34

Your reading is in the handoff and I agree with it, but the number is worth writing down because it
is the measurement that would matter if ribbons come back: **of the 34, eleven were the same
100-foot leash and five more copied Earth Glide.** Sixteen of thirty-four were one of two sentences.
The model was offered three families and took whichever one's rule spelled out its own sentence —
`taboo` went from 5 chosen to 11 the moment the tether's shape was written down precisely, and
`leaves-at-death`, whose rule never resolved into a sentence, was chosen once in twenty-five offers
across three runs.

The eighty in the probe, which nothing policed, had no two alike. That contrast is the finding, and
it is an argument for the shape you name at the end of your handoff — one family, a sentence the
engine writes, one blank the model fills — rather than against ribbons.
