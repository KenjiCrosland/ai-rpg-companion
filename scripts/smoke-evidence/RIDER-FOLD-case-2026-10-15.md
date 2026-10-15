# The rider's half is not a gift

**Found by:** the `branch-printnames` review, 2026-10-15. "a dire wolf that hunts
in a pack" at CR 3 shipped `Bite 7 (1d8 + 3)` — 14 a round against the CR 3
card's 25, flagged `aim-dpr: 44% under`. The band could only call it soft,
because print's own CR 3 blocks read 0.375–5 on the same estimator (n=83).

## Two wrong diagnoses before the right one

1. **"The energy rider is added per hit and multiplied by the Multiattack
   count."** Wrong — the rider is a 60/40 *split* of the solved per-hit
   (`scale.mjs`: "sum = the solved per-hit, budget unchanged"), never additive.
2. **"A print borrow below the asked CR scales HP but not damage."** Wrong, and
   this is the version I reported. The solver prices CR 3 correctly at
   `per_hit 12`; the loss happens downstream of it.

## The bug

`generate.mjs`, the print-canon melee pass:

```js
e.text = e.text.replace(/ plus \d+ \(\d+d\d+(?: \+ \d+)?\) [A-Z][a-z]+ damage/, '');
```

A plain delete. The split had put 40% of the row's budget in that clause, so
dropping it leaves the row at 60%. The sibling strip 1500 lines earlier — on the
authored-row path — accumulates what it removes and re-dices the base with
`avg + folded`. This one was written without the fold.

## Reproducing it

The live path needs a **non-physical** `melee_rider`. A physical rider or `"none"`
restores the full-budget twin (`text_noRider`) earlier and never reaches this
pass, which is why two straightforward repros came back correct and briefly made
the defect look non-deterministic.

With `melee_rider: 'Necrotic'` on the dire wolf concept:

| | before | after |
|---|---|---|
| CR 3 | 7 × 2 = **14** vs card 25 | 12 × 2 = **24** |
| CR 5 | 12 × 2 = **24** vs card 40 | 21 × 2 = **42** |

## The first fix was dead code

I guarded the fold on `!pr.rider`, reasoning that print's own rider replaces the
chassis's. **print's Dire Wolf does have a rider — the Prone condition — and it
pays no damage.** So the guard was always false, the fold never fired, and the
trace stayed silent through three runs. The silence was the evidence: a fix whose
trace never fires is a fix that cannot be vouched for, and it was reported as
unverified rather than credited with the clean live sheet that happened alongside
it.

Corrected to test for a damage rider specifically — `/^plus \d+ \(/`, the same
shape the code tests two lines below:

```js
const printPaysRider = pr.rider && /^plus \d+ \(/.test(pr.rider);
const printDiced = pc.exact && nearPrintCr(cr, pc.cr) && pr.dmg;
if (foldedR && !printPaysRider && !printDiced) { /* fold */ }
```

print's own **damage** rider still replaces the chassis's half, and a row print
has already re-diced at its own CR keeps print's numbers untouched.

## Live reads

```
Bite. Melee Attack Roll: +5, reach 5 ft. 12 (2d8 + 3) Piercing damage.
      If the target is a Large or smaller creature, it has the Prone condition.
```

24 of a 25 card, and print's Prone rider still rides the row while costing no
damage. `branch-direwolf` 0 FAIL, no `aim-dpr` soft.

**Canaries 0 FAIL of 10, and no read moved** — Kobold 0.3125, Stone Golem 9.5,
Goblin Boss 0.75, Owlbear 2.75/28, Wolf 4/34, Ogre 4.5/44, Vampire Spawn 3/16 all
identical before and after. The two sheets that differ drew different novas. The
blast radius is exactly the combination that was broken: a print-canon melee row,
a non-physical chassis rider, and a print creature whose own rider pays no
damage.

Because the canaries do not exercise the path, three pins construct it directly
(`print-names.spec.js`): the CR 3 round clears 75% of its card, the CR 5 round
does the same one band up, and print's condition rider still rides while the
chassis's damage rider is folded in rather than printed.

## Gate

`npx jest` 2706 passed / 68 suites. `npm run build` clean.
