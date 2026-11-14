# Update — fix 2: your replay prescription, and the one step that cannot be done offline

Not committed. Paste-and-go for Fable 5.2.

## Your challenge is right and my claim was wrong

I wrote "fix 2 cannot make a sheet worse". It can. When the fit call refuses and the trait is then
refused too, **the sheet loses a row** and nothing fills the seat. Losing an invented grapple that
had no escape DC is very likely a gain, but it is a change to the sheet, not a no-op, and I should
not have said otherwise. What fills that seat afterwards: nothing — the ask is pushed onto
`owed_unanswered`, which fails the block at the checker (the owner's H8 ruling), so the loss is
visible rather than silent. That is the honest description.

## Step 2 — the re-seat: 9 of 9

Your eight, extracted from the three saved forties by their own trace stamps
(`[trait/*/condition] [family: payoff]`), plus the mislabelled stance as the ninth:

```
✓ 01-grask-ironjaw        ✓ 11-zarnak              ✓ 34-petrified-seam
✓ 03-captain-vell         ✓ 14-cinder-ashen        ✓ 09-stone-golem
✓ 19-krevmaw              ✓ 30-shricking-owlbear   ✓ CONTROL mislabelled stance
```

All nine move to `rider/on_hit`. This half needs no sheet context — it is a pure function over the
declared family, its grammar and the effect.

## Step 4 — your control: the fit call refuses it, 3 of 3

Run with the **exact menu the engine offered it**, read from the v-small trace (20 templates, all
resolved):

```
roll 1: refused (no_fit, closest pack-tactics)
roll 2: refused (no_fit, closest pack-tactics)
roll 3: refused (no_fit, closest pack-tactics)
```

Stronger than a bare refusal: the closest it names is **pack-tactics, a TRAIT**. The call is not
merely declining the rider forms, it is pointing at the row kind the stance actually is. Your
two-key design routes this exactly as your table predicted — one key, trait stands.

## Step 3 — I could not do this offline, and I am not going to fake the number

The refusal rate for the eight is the number nobody has, and you are right that it decides whether
fix 2 moves these rows or deletes them. It cannot be measured from the saved runs.

**Why.** The fit call's menu is built per sheet by `templatesFor`, from the archetype, style, CR,
the rows already on the sheet, the imposed conditions, the concept text, type, size and movement.
The traces record the menu's **ids** but not the context that produced it — and the menus saved
*with the eight* are pre-fix anyway: they are TRAIT templates, because the idea's section was still
`trait` when they were offered. Replaying those answers the wrong question.

I have exactly one real post-fix menu (the control's). I tried to reconstruct it so the other eight
could be rebuilt the same way:

| attempt | result |
|---|---|
| brute + grappler | missing `bolt-restrain`, `bolt-mark`; extra `hook-rider`, `life-drain` |
| brute, no style | same, plus `charge` |
| defender / defender+leader | only 4 of 7 |
| skirmisher | extra `isolation`, `life-drain`, `charge` |

Five attempts, none exact. So a refusal rate built on a reconstructed menu would be a number with no
meaning — which is the trap three probes in this sprint already fell into, and I would rather hand
you a gap than a figure you might act on.

**What would actually measure it:** the fit call exercised in-pipeline on sheets that reach the trait
seat with a condition payoff. Either it falls out of the next full forty (where the 8-in-120 rate
says roughly 2 to 3 sheets should hit it), or it needs a run built to drive the trait seat rather
than the ask — which is the thing we agreed not to do, because tuning an input to the fix is how you
get a canary that proves itself.

My recommendation stands, with your framing rather than mine: accept fix 2 as a safety net, start
fixes 3 to 5, and take the number from the next forty. The difference from before is that I am no
longer claiming it is risk-free — it can remove a row, and when it does the ask fails the block
loudly.

## Your two small items

- **`--only` now refuses a list.** `--only 4,11,12` exits 2 with "A comma list is not supported";
  a single index is unchanged. It used to become `NaN` and silently run the whole batch, which is
  how you were handed twelve blocks after asking for three.
- **Grinning Lock** is on the effect-vocabulary list, where you put it.

## State

5166 tests, 211 suites. Fix 2's two-key code and `scripts/probe-the-eight-riders.mjs` (step 2 and
the control; step 3 blocked as above) are ready to commit with this. Fixes 3 to 6 not started.
