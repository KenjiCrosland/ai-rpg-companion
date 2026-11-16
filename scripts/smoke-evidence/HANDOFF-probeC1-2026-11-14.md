# Probe C step 1 — the model's array on a resembling body

Evidence only, 2026-11-14. Twelve sheets in full, with donors, `[path]` lines and dropped-row
lines: `scripts/smoke-evidence/BLOCKS-probeC1-2026-11-14.md`.

```
npx jest src/tools/statblock-generator src/util --maxWorkers=2 --silent
  221 suites, 5240 passed, 26 skipped        (flags off, suite unchanged)
SMOKE_TIMEOUT_MS=300000 node scripts/smoke-statblock.mjs v-probec1     (10 sheets)
SMOKE_TIMEOUT_MS=300000 node scripts/smoke-statblock.mjs v-probec1b    (2 baselines)
```

## Which of the three outcomes: **the second.** It stayed in the box, and almost nothing follows

```
prompt              model         donor                 array                                  AC   HP   atk   DC
clockwork spider    Giant Spider  brute-5-juggernaut
  FLAG ON    STR14 DEX16 CON12 INT2  WIS11 CHA4         13   49   +5    12
  baseline   STR16 DEX8  CON16 INT6  WIS10 CHA4         13   52   +5    13
medusa sculptor     Medusa        skirmisher-8-hurler
  FLAG ON    STR10 DEX17 CON16 INT12 WIS13 CHA15        16  105   +7    14
  baseline   STR18 DEX18 CON16 INT10 WIS14 CHA10        16  105   +7    14
vampire pirate      Vampire       skirmisher-8-hurler      (CR 13 model, asked CR 8)
  FLAG ON    STR18 DEX18 CON18 INT17 WIS15 CHA18        17  136   +8    15
  baseline   STR18 DEX20 CON16 INT10 WIS14 CHA10        17  135   +8    15
mummy librarian     Mummy         caster-8-binder
  FLAG ON    STR16 DEX8  CON15 INT6  WIS12 CHA14        14   52   +5    12
  baseline   STR14 DEX15 CON13 INT14 WIS15 CHA16        14   55   +5    12
hag midwife         Green Hag     caster-8-binder
  FLAG ON    STR18 DEX12 CON16 INT13 WIS14 CHA16        16  135   +8    15
  baseline   STR14 DEX15 CON16 INT14 WIS15 CHA18        16  135   +8    15
bell-ringer's ghost Ghost         lurker-1-phantom
  FLAG ON    STR7  DEX13 CON10 INT10 WIS12 CHA17        12   45   +5    13
  baseline   STR1  DEX16 CON13 INT10 WIS10 CHA11        12   44   +5    13
```

**The array lands on all six. What follows from it does not move.**

| | |
|---|---|
| attack bonus | **identical in 6 of 6 pairs** |
| save DC | identical in 5 of 6 (the spider moves 13 → 12) |
| AC | identical in 6 of 6 |
| HP | within 3 in 6 of 6 (49/52, 105/105, 136/135, 52/55, 135/135, 45/44) |
| skills | move by 1 where the keyed score moved |

The thing the probe set out to fix IS fixed: **the vampire pirate's INT goes 10 → 17** and it
gains CHA 18; the ghost goes from the phantom card's STR 1 to print's STR 7 and CHA 17; the
mummy drops from a caster's INT 14 to print's INT 6. Those are the complaints from probe B, and
they are the array alone.

But AC, HP, attack bonus and save DC are the **donor's budget**, not derivations of the array —
the engine stamps the attack bonus as a raise-only coherence pass, so a higher striker mod does
not raise a bonus the card already set. So step 1 changes the six scores and the skills that
key off them, and nothing else. Whether that is worth having is the owner's read of the sheets.

**The far case, the Vampire at CR 13 against an asked CR 8:** taking the array as printed gives
STR/DEX/CON 18 and CHA 18 at CR 8, and the sheet's attack bonus (+8), save DC (15) and HP (136)
are **unchanged from the baseline** — the CR 13 array does not leak CR 13 numbers, because none
of those three derives from it. That is the reassuring half of the same finding.

## Gates touched — 1 for the stamp, inside the box of five

| file:line | what |
|---|---|
| `reskin/generate.mjs:2846-2871` | **the stamp.** The model's six scores as printed, when `options.frameModel` is set and print's own array has not already landed. |
| `reskin/generate.mjs:11` | a `DONORS` import, for the donor pin only |
| `reskin/generate.mjs:2703-2707` | **the donor pin** — evidence scaffolding, not part of the grade |
| `StatblockGenerator.vue` (2 helpers, 2 option lines) | the two flags |

**A third grade of print record was not needed, and that is the architectural finding.** The
handoff framed step 1 as keeping the print record alive on a homebrew decision and firing one
stamp. Keeping the record alive would have meant suppressing the other 30 print-canon stamps —
far outside any box. Lending the array needs no record at all: one stamp reads the model's
block directly and leaves `arrayIsPrint` false so the engine's own coherence recomputes. If
step 2 is wanted, that is the shape to extend — stamp by stamp, no new grade.

I also did **not** take the `atPrintCr` branch the twist path uses, deliberately: it stamps
print's HP, AC, armour and attack bonus, which are print's numbers rather than what the scores
imply, and step 1's box is the array.

## Method notes

- **Every pair sits on the same card**, confirmed from each sheet's own `Donor:` line. The four
  pinned prompts used `brute-5-juggernaut`, `skirmisher-8-hurler` (×2) and `caster-8-binder`.
  Mother Ash drew `caster-8-binder` and the ghost `lurker-1-phantom`; both baselines were then
  run pinned to those cards in a second pass. **No pair is void.**
- The donor pin was as cheap as the path pin, so the donor line is pinned rather than the role.
- Flags off by default; each flagged run prints `[probe] FRAME MODEL set by
  statblock-frame-model — this is an evidence run, not product behaviour` and `[probe] donor
  pinned: <id>`, and the array stamp traces as `[probe] frame array: … replacing the <card>'s …`.
- The type, size and movement were never touched, as specified.

## Step 2 is not started

It waits on the owner's word, as the handoff says. The shape above is what it would extend.

## Recorded, unchanged

The hallmark feed (signature sentence, joins rather than replaces, must not reach
`creature_type`); `signature_mechanic` answered 5/5 and read nowhere; the stock gaze with the
wrong condition; the vocabulary gaps; the 23 regex cues in `lexicon.mjs`.
