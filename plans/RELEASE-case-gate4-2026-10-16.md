# Case: the class/body release gate, and a prompt that was obeying orders

Run: `smoke-out/classes-eight-2026-10-16T22-10-02` — **0 FAIL of 16, notes only.**
Review: `scripts/smoke-evidence/REVIEW-classes-eight-2026-10-16T22-10-02.md`.
Check: `scripts/smoke-evidence/CHECK-classes-eight-2026-10-16T22-10-02.md`.
Gates: 71 suites / 2797 passed; `npm run build` clean.

This is stop point 4, the bar for the class/body landing. **Attack the evidence
before the result**: the two sections below are where I think it is weakest.

## 1. The gate is met, and one run is thin evidence for it

The two notes:

- `gates · SOFT · ko-at-will` — Open Palm applies Stunned at will, single target
- `structure · SOFT · reach` — Greataxe reach 10 on a Medium body, no tether word

**Why I would not trust this alone.** The same 16-prompt batch produced 2 FAILs
and then 0 FAILs within an hour today, and a metric on it swung 0/4 → 1/1 → 0/3
across three consecutive runs. classes-eight also repeats 16 fixed prompts, so it
cannot show variety problems by construction. A clean run here is necessary, not
sufficient, and I would not release on it without a varied batch beside it.

**The implied-class field barely appears in this run.** One sighting:
`"rogue"` on *"a ninja who moves through the shadows"*. Most classes-eight
prompts contain a table keyword, so the field is only exercised where the table
is silent — which is the correct design but means this batch says almost nothing
about it. Its real evidence is `stage34-2026-10-16T20-49-59` (ninja→rogue,
samurai→fighter, gladiator→fighter, druid refused, beast refused).

**The asked trigger/limit fields produced no verdicts at all here** (0 ok, 0
mismatch, 1 dropped). They only fire when a GM names a trigger or a limit, and
these 16 prompts rarely do. The field has, to date, one genuine finding to its
name across every run: the GM names a trigger and the engine ships an untriggered
row (`Slam` at `at_will`; `Misty Step` at `at_will`). Four corrections to my own
measurement bought that one finding. **It is fair to ask whether it earns its
place.**

## 2. The flying berserker: the call was obeying the prompt, not misreading the GM

The owner's example, `stage34-2026-10-16T20-49-59` block 07: *"a berserker who
flies into an unstoppable rage"* shipped Humanoid with **Fly 70 ft.** and DEX 20.

I first reported this as "both calls were right and the table overruled both."
**That was half wrong**, and the owner's reading was right: the identity call
itself answered `themes=aerial`. It did so because the prompt said

```
CHASSIS: ... routed onto the "skirmisher-winged" template — ...
The identity IS that chassis embodied
```

Measured with a new prompt-level probe (`scripts/probe-identity.mjs`, N samples
of one prompt, so a classification is a rate), 5 samples each:

| prompt | `aerial` |
|---|---|
| no `line` passed | **0/5** |
| `line: 'skirmisher-winged'` | **5/5** |
| + the `readPhrases` concept (the real flow exactly) | **5/5** |

One parameter, never → always. The call was following an instruction.

**The fix** gives the chassis HOW IT FIGHTS and the GM's words WHAT IT IS
(`themes`, `creature_type`, `mind`), with the user's words winning a disagreement
and the cue marked rejected. Verified with the line still forced on:

| case | result |
|---|---|
| berserker, `skirmisher-winged` forced | `aerial 0/5`, `hints: flies✗ winged✗` |
| storm roc on the SAME winged line (control) | `aerial 5/5` |
| iron golem (control) | `forged 5/5` |

Clean 6-concept probe: **0/30**, both controls intact. End to end
(`idiom-2026-10-16T22-03-01`): `bestial/terror` for the berserker, `armed/mind`
for an iron-willed inquisitor (was `forged/armed`), roc keeps `aerial` + Fly 120.

**The sheet still flies.** The donor is `skirmisher-8-winged`, chosen by the route
table; themes do not pick donors. The call's `winged→style ✗` is produced and
discarded — `rejectedCanon` is consumed at exactly one site, `generate.mjs:4468`,
the name-canon skip. The route never reads it.

**The architectural finding, and the one that constrains stage 4b step 3:**

```
line 91: [route]   brute: ✓ | brute -> skirmisher-winged: the VERB outranks the noun (key "flies")
line 92: [concept] hints: winged→style ✗ ("flies into a rage")
```

**The table decides before the call is asked.** A precedence flip that only
changes who wins a tie cannot fix this: at routing time there is no answer to
prefer, because the question has not been put. Step 3 needs *ask-before-routing*,
or a re-route when the call rejects a cue the router used.

## 3. Corrections to my earlier reports

1. "Both calls were right and the table overruled both" — the identity call said
   `aerial`; the prompt told it to.
2. I called the classifier nondeterministic from `✗` in one run and `✓` in the
   next. It is 5/5 stable asked cleanly; I was comparing two different prompts.
3. I guessed the archetype primed it. Measured: `skirmisher` gives `aerial 0/5`,
   identical to `brute`. The channel was `line`.
4. **In the stage34 package I filed that run's `attack-stat` FAIL (`Greataxe: +8
   derives from DEX`) as an unrelated pre-existing family — 12 of 188 runs, 7 of
   them the same "Mace derives from DEX" shape. The frequency is true and the new
   fields are not the cause, but the conclusion was wrong: on that block the DEX
   attack is downstream of the winged misroute, because the winged skirmisher
   chassis is DEX-based.** I classified a failure by its rule name and its history
   and never asked why that block had it. If one thing in this package deserves
   scrutiny, it is how many other "pre-existing family" calls I have made the same
   way.

## 4. Five latent defects the new fields flushed out

None caused by the fields; each was already in the engine and shipped once a door
opened wider. This was the stage's real yield.

- **The engine invented a weapon.** `ranged_name: ctx.rangedName ?? 'Longbow'` —
  a ranged-host template on a sheet with no ranged attack rendered a bow the
  creature does not have (Court Step-Wizard, beside Slam and Spellcasting). A
  template that cannot be filled now declines. Family: 6 of 186 runs, five
  shapes, including the Shadowblade "Poisoned Blade" bug chased separately.
- **A row named for a weapon took another weapon's range.** `Spear ... range
  30/120` (a javelin's). `e.weapon`, fitted from the row's numbers, outvoted the
  word a GM reads. Verified live: `Spear ... range 20/60` with `weapon=scimitar`
  underneath.
- **The dangling-reference scan lived in one reader**, so the checker failed
  sheets generation had built happily. One exported predicate now, both readers.
- **That scan's regex over-captured** — `uses Slam against the attacker` captured
  the whole tail and read a live row as dangling. Harmless while only the checker
  reported it; a silent false refusal once generation read it. Old vs new, 12 runs
  / ~117 blocks: identical verdicts.
- **Invented darkvision on 98% of Humanoids** against print's 1 of 26. The first
  fix was dead code: the prompt's own example read `e.g. 'darkvision 60 ft.'` and
  the call echoed it, so the fallback I changed was never reached.

## 5. Known and not fixed

- the flying berserker's wings (needs 4b step 3, above)
- `attack-stat`: a class kit's weapon not matching the chassis stat — a standing
  family, 12 of 188 runs, and at least one instance is a misroute symptom
- `lurker-5` under print's CR 5 HP band in 4 of 4 runs (owner's parked question 1)
- the generation-side dangling guard has 4 pins on its predicate but has never
  fired on a live run; the condition stopped recurring once the root cause landed
- three word rules I added today (`SAYS_WHEN`/`SAYS_OFTEN`, the darkvision
  `gmSaid`, `soloLen: 5`) are listed in `plans/stage4b-inventory.md` §C as
  violating the new ruling, pending the owner's call on revert vs fold
