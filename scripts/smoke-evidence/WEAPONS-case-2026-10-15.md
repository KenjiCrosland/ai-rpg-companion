# One weapon table, one question — the case

**Landed:** 2026-10-15, branch `statblock-ability-enhancements`.
**Principle (owner):** "If we can ask llms specific questions to populate
metadata, that's the route we usually want to go unless the options to choose
from are too numerous and it dilutes the prompt."

## What was wrong

The engine knew print's weapon facts in about a dozen places. Each copy was
added on a different day for a different hold, and they drifted:

| the copy | where | what it got wrong |
|---|---|---|
| `WEAPON_TABLE` (ranges) | `generate.mjs` | word-boundary only: never saw the axe in "Hurlaxe" |
| `ANATOMY` (type) | `header.mjs` | knew "sword" but not "shortsword" — Slashing on a Piercing weapon |
| `RANGE_OF` / `LAUNCHER` / `NEVER_RANGED` | `checker.mjs` | three lists, one question each |
| `THROWN_NOUN` / `THROWN_HEAD` | `checker.mjs`, `generate.mjs` | the same hybrid question, two spellings |
| `MASTERY` / `HEAVY` | `features.mjs` | a 34-entry restatement of two columns |
| `MUNDANE` ×4 | `checker.mjs`, `generate.mjs` ×2, `scale.mjs` | "is this a weapon" written four ways |
| `PROJECTILE_WEAPON` + `projWeaponRange` | `templates.mjs` | the same 7-row table, twice, 23 lines apart |
| `REACH_10` | `generate.mjs` | the reach column as a regex |
| `FINESSE_W` | `scale.mjs` | the finesse column as a regex |

Two live defects came straight out of that drift, both found by the critic on
2026-10-14:

- a **Shortsword** dealt **Slashing**, because the copy that typed it only knew
  the word "sword"
- a **Hurlaxe** printed **60/240** — a longbow's range — because no copy saw
  the axe inside the coined word

Patching either copy fixes one sheet and leaves the other eleven.

## What landed

**`reskin/weapons.mjs`** — 40 entries of print's 2024 weapon table
(`type`, `reach`, `range`, `thrown`, `launcher`, `finesse`, `heavy`,
`mastery`), an alias map (print and GMs write the same weapon many ways), and
three resolvers:

- `weaponNamed(answer)` — a plain-words answer, articles and plurals and all
- `weaponFor(name)` — reads a name, including closed compounds. **The fallback**
- `weaponProp(name)` — the facts

**The question, on the call that already names the rows** — not a new call, one
more key in the JSON it was already returning:

> WHICH WEAPON IS IT? … Answer 'none' for a body part, a spell, or anything no
> shop sells — 'Thunder-Elk' is none.
>
> `"weapons": { "<the new name you gave an attack row>": "<the mundane weapon it is, in plain words, or none>" }`

**Resolved once, onto the row.** Right after the renames land:

```js
const declared = weaponNamed(p.weapons?.[bare]);   // the call's judgement
const read     = weaponFor(bare);                  // the fallback
if (declared && declared !== read) trace('weapon declared:', …);
e.weapon = declared ?? read;
```

Every consumer below reads `e.weapon`. Nothing re-derives it, so there is no
second copy to drift.

**Retired:** all twelve lists above. `header.mjs`'s `ANATOMY` now *derives* its
weapon nouns from the table — and gained ~20 nouns it never had (knife, gun,
flail, morningstar, whip, sickle, …). Four entries print tuned by hand stay
tuned, named in the code: javelin (a hurled javelin is honestly a ranged row),
lance, spear, pike (a polearm's noun may pull a row to melee).

## The pins — `reskin/__tests__/weapons.spec.js`, 24

The two that hold the split:

- **the answer beats the name.** A row named "Fangblade" — which the name alone
  reads as a longsword, Slashing — with the call answering "a shortsword". The
  trace must say whose answer it took: *"Fangblade" is a shortsword — the call's
  own answer (the name alone read longsword)*. This is the 2026-10-14 defect,
  now failing its own gate.
- **a missing answer is not a failure.** The same row with no `weapons` key at
  all: the name still carries it, and nothing claims a declaration.

Plus: the facts themselves; the family never setting the type (shortsword
Piercing, longsword Slashing, rapier Piercing); the derived anatomy nouns
matching the table for every noun; eight compound reads (Hurlaxe → handaxe,
Fangblade → longsword, Stormbow → bow); seven non-weapons rejected, including
the three traps a loose compound rule falls into — "waxes", "a rainbow serpent",
"the cabinet golem".

**Gate:** `npx jest` 2669 passed / 67 suites, `npm run build` clean.

## Live reads — `branch-weapons` (4), `branch-weapons2` (2), `branch-weapons3` (2)

The per-branch batch covers only this branch's change (owner, 2026-10-14). Four
weapon cases, then a confirm pair, then a single re-read.

### The table is right on a real sheet

| the read | the sheet | was |
|---|---|---|
| **Shortsword** | `+6, reach 5 ft. 21 (4d8 + 3) **Piercing**` | Slashing — the family's type |
| **Barbed Lance** | `+7, **reach 10 ft.** 22 (4d8 + 4) Piercing` | reach 5 — the `REACH_10` regex's miss |
| **Crossbow** | `+7, **range 80/320 ft.** Piercing`, ranged-only | — |
| **Crossbow Stock** | `+7, reach 5 ft. Bludgeoning`, no weapon facts | a launcher's range and mastery |
| **Fist** (no weapons at all) | `+7, reach 10 ft. Bludgeoning`, no weapon facts | — |

`weapon reach: "Barbed Lance" reaches 10 ft. — print's lance has Reach`

### The call answers the question — including "none"

```
weapons answered: Crossbow Stock = none; Heavy Crossbow = heavy crossbow; Covering Volley = heavy crossbow
weapon refused: "Crossbow Stock" reads crossbow, but the row has no range — a launcher is ranged-only, so the row carries no weapon
```

The call judged a butt-strike row as **none**, exactly as asked. On a second
block it answered `Crossbow Stock = heavy crossbow (used as a club)` — a
*judgement*, and the engine refused it on the row's own shape:

```
weapon declared: "Crossbow Stock" is a heavy crossbow — the call's own answer (the name alone read crossbow)
weapon refused:  "Crossbow Stock" reads heavy crossbow, but the row has no range — a launcher is ranged-only
```

That refusal is the half the plan is named for: **the call judges, the engine
validates.** Taking either reading would have handed a bludgeoning butt-strike a
bow's mastery and a bow's range. Landed after seeing the live row, pinned.

## Two defects the batch exposed, both fixed

### 1. print swapped a weapon the GM typed

The checker's one FAIL (`attack-in-multiattack`) was a symptom. The trace had
the cause:

```
weapons answered: Shortsword = shortsword; Thrown Handaxe = handaxe
weapon table: "Thrown Handaxe" — thrown, range 20/60      ← the table, correct
print canon attack: "Thrown Handaxe" -> "Heavy Crossbow"  ← print swapped the weapon
```

The GM typed "hurls a handaxe". The table priced it at 20/60 — then the
print-canon pass renamed the row to the Warrior Veteran's Heavy Crossbow and the
range became **100/400**, the type Piercing. A GM asked for a thrown axe and got
a bow.

That is this sprint's own principle violated: **a gate may shape what the GM
asked for, never remove it.** print still prices the row — attack bonus, dice,
its CR normalization all stand. It may no longer replace a weapon the GM's own
words name. `weaponsIn()` is what makes that knowable, and the call's answer is
what makes the row's weapon trustworthy enough to protect. `weaponsIn` counts
whole words only, so "sellsword" is a job, not a longsword.

Confirmed live:

```
print canon yields: "Handaxe" keeps its handaxe — the GM typed it; the Warrior
Veteran's Heavy Crossbow prices the row but does not replace the weapon
```
```
Handaxe. Ranged Attack Roll: +6, range 20/60 ft. 16 (3d8 + 3) Slashing damage.
```

### 2. print's Multiattack hid the row it could not know about

With the weapon kept, the row was correct and still **unusable**: an exact print
body keeps print's Multiattack verbatim — "two Shortsword attacks" — which
cannot know about a weapon the GM typed. The re-read pass that widens a
Multiattack to "using A or B in any combination" was skipped on exact bodies.

Same principle, one layer up: print's Multiattack may shape the sheet, it may
not hide a row the GM asked for. The count still stands; only the choice widens.

Confirmed live — the whole chain, one sheet, **checker 0 FAIL**:

```
multiattack re-read — "Handaxe" joins the combination
```
```
Multiattack. Coran makes two attacks, using Shortsword or Handaxe in any combination.
Shortsword. Melee Attack Roll: +6, reach 5 ft. 21 (4d8 + 3) Piercing damage, …
Handaxe.    Ranged Attack Roll: +6, range 20/60 ft. 16 (3d8 + 3) Slashing damage.
```

The GM asked for a thrown handaxe and a shortsword. The sheet prints a thrown
handaxe at print's own 20/60 Slashing, a shortsword at Piercing, and a
Multiattack a GM can actually read. Before this landing the same words produced
a Heavy Crossbow at 100/400 that the Multiattack never named.

## Two observations for the critic — reported, not fixed

Both are in other passes, and I would be guessing at the cause.

1. **An adjective is lost at extraction.** The GM typed "shoots a **heavy**
   crossbow"; the named-parts pass landed `Crossbow (slot, ranged)` and the sheet
   printed 80/320 instead of 100/400. The weapon layer is right — it gave
   *crossbow*'s range for a row named Crossbow. The specificity was dropped
   before it, in the single-noun extraction.
2. **A repair gate may be firing on a legitimate name.** `repair round 1: name
   "Crossbow Stock" is a launcher but the row swings in melee`. You *can* club
   someone with a crossbow stock, and the refusal already strips the weapon
   facts, so the name is honest. The gate reads the whole name where it wants the
   head word.

## Gate

`npx jest` 2671 passed / 67 suites. `npm run build` clean. Eleven duplicate
tables retired (the eleventh, named-parts' `THROWN_RANGE`, found while reading
this batch).
