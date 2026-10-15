# What a print name's tail names — labelled once, 19 patches deleted

**The offender (audit, 2026-10-15):** `ROLE_HEAD` (9 commits) and `JOB_TAIL` (10)
— the two most-patched lines in the engine. Between them they inferred, from two
words, whether a print name's tail names the creature's KIND ("Brown Bear", so a
GM typing "a bear" should find one) or a POST it holds ("Goblin Boss", so a GM
typing "a boss" has not asked for a goblin).

## Why no word rule can be right

The corpus itself settles it. Two facts, either one fatal:

- **The same tail is a post in one name and a kind in another.** A "Bugbear
  Stalker" is a bugbear; an "Invisible Stalker" IS a stalker — it is the
  elemental the word names.
- **A creature head does not imply a post.** "Ogre Zombie" and "Warhorse
  Skeleton" both have creature heads, and both genuinely ARE a zombie and a
  skeleton.

So it is not a pattern. It is a fact about **119 two-word names** in a corpus of
329 blocks that does not change between releases. `reskin/print-names.mjs`
states it once, listing only the 17-name minority whose tail is a post.

## Frozen, then corrected — and the freeze is pinned, not eyeballed

The table was generated from the old rules' own verdict, so day one is
behaviour-identical apart from three deliberate changes. `print-names.spec.js`
**re-derives the old rules** and asserts the diff equals exactly those three.

That pin earned its place immediately: my first table was built from a
*reconstruction* of the old rule, and the real `GENERIC_HEAD` contains `spawn`
and `familiar` — so the old rule also treated **Vampire Familiar** and **Vampire
Spawn** as posts, and my hand-built set silently dropped both. Without the pin I
would have shipped a quiet behaviour change while reporting it as identical.

**The three corrections**, each a thing no word rule could state:

| name | was | now | why |
|---|---|---|---|
| Merfolk Skirmisher | kind | **post** | a skirmisher is no kind of merfolk — the same reading as Goblin Warrior. "skirmisher" was simply missing from `JOB_TAIL`; adding it would have been patch 20 |
| Troll Limb | kind | **post** | a limb is not a creature |
| Invisible Stalker | post | **kind** | its kind IS stalker. The old rule called it a post only because "invisible" is not a role word — a fact about English adjectives, nothing about the creature |

## What actually ends here

The coverage pin asserts all 119 are labelled. A new print name now **fails a
test** and gets labelled in data. The old workflow was: a GM reports a wrong
block → someone patches a regex → nineteen times.

## Live reads (`branch-printnames`, 4 blocks, checker 0 FAIL)

| concept | sheet |
|---|---|
| "a bulwark-sworn sentinel with a broken greatsword…" | `Medium Humanoid`, **no print borrow** — the post tail draws nothing (it used to come out a Medium Elemental with Fire immunity) |
| "a reef-born skirmisher who harries the shallows…" | `Medium Monstrosity` — correction 1 holds; no longer the Merfolk Skirmisher |
| "a dire wolf that hunts in a pack" | `Large Beast`, the Dire Wolf's array, **Pack Tactics from print** — a kind tail still answers |
| "a hardened veteran of the border wars" | the Warrior Veteran's defenses, array and splint — print's NPC family keeps its tail |

## A pre-existing defect the batch exposed — traced, fixed, pinned

Run 1 had one FAIL: block 02's Rampage read *"makes one **Slam** attack"* beside
a row named Barbed Spear. The structure gate and the lint both caught it.

Root cause, one line:

```js
const meleeRowT = …find((e2) => /Melee Attack Roll/.test(e2.text));
```

That does not match print's "**Melee or Ranged** Attack Roll". So a sheet whose
only melee row is a THROWN weapon had no melee name at all, and every
`{melee_name}` template fell through to the literal default `'Slam'`. The same
file already used the right idiom 600 lines earlier
(`/Melee(?: or Ranged)? Attack Roll/`) — a one-regex inconsistency, not a design
gap.

Fixed in the narrowest layer: a pure melee row still wins where one exists; the
hybrid only fills a gap that used to be null. Pinned as a general assertion
rather than a string match — *every attack a row's text says it makes must be a
row that exists*.

**Attribution:** the labelling did not cause this. The corrected label stopped
that concept borrowing a print body, which routed it through the library seed and
exposed a latent bug any thrown-only-melee concept would have hit.

Confirmed after the fix:

```
Tide Surge (1/Day). … it makes one Barbed Spear attack.
Barbed Spear. Melee or Ranged Attack Roll: +6, reach 5 ft. or range 20/60 ft. …
```

## Gate

`npx jest` 2700 passed / 68 suites. 15 pins in
`reskin/__tests__/print-names.spec.js`. `npm run build` clean.
