# Class features need a body that can have a class

**Trigger:** owner, 2026-10-27 — *"Assassinate should not be assassinate for
non-humanoids though. Been seeing that one a lot and doesn't fit thematically
for things that can't have classes (fey, fiend, celestial and maybe undead are
exceptions)."*

**Status:** planned (Fable). Opus implements. Plain-language summary first; the
data and the exact edits follow.

## The problem in one line

Templates named after class features are landing on beasts, monstrosities and
constructs, and the name is a lie on those bodies: a wolf does not
*Assassinate*, a golem does not give a *Bolstering Cry*.

## Measured (every saved run, by the sheet's creature type)

| template | shipped | on a body that cannot have a class | worst offenders |
|---|---|---|---|
| `assassinate` | 443 | **163 (37%)** | Monstrosity 87, Beast 60, Construct 5, Elemental 5 |
| `rally` | 188 | **81 (43%)** | **Construct 76**, Giant 2 |
| `evasion` | 197 | 13 (7%) | Monstrosity 6, Beast 4 |
| `guarded-stance` | 109 | 12 (11%) | Giant 6, Aberration 3 |
| `lay-on-hands` | 62 | 2 (3%) | Construct 2 |
| `second-wind` | 6 | 1 | Dragon 1 |

"Cannot have a class" = every type except Humanoid, Fey, Fiend, Celestial,
Undead (the owner's list). The column is the SIZE of the problem, not a gate —
see fix 2.

**Print:** the first-round ambush feature exists on exactly one creature in
329, the Doppelganger (Monstrosity) — named **"Surprise Attack"**, not
Assassinate. Evasion is on the Assassin (Humanoid) alone. "Rampage" sits on
both a Fiend (Gnoll) and a Beast (Giant Hyena) — print's example of one
neutral name serving every body.

## Two different fixes, because two different things are wrong

### 1. `assassinate`: the MECHANIC fits a predator; the NAME does not. Rename it.

An ambush predator striking before its prey reacts is sound on a beast — print's
Doppelganger proves the shape on a Monstrosity. What is wrong is the word
"Assassinate", which names a trained killer. Under the owner's one-mechanic-
one-name ruling ([[one-mechanic-one-name]], 2026-10-27) the answer is NOT two
names for one mechanic; it is **one body-neutral name**. Print supplies it.

- Rename the template's `name` from `"Assassinate"` to **`"Surprise Attack"`**
  (print, Doppelganger). Fallback if the owner prefers: "Ambusher".
- Sweep every reference the way the `energy-aura` rename was done on
  2026-10-26 (21 refs across 5 files): shapes.mjs, templates.mjs,
  `labelFeatureRows`'s collision traces if any, specs, and any `keys`/trace text
  that quotes the old name. `grep -rn "Assassinate" src/` — note the zsh
  `--include` glob fails silently; use `grep -rn --include='*.mjs'` quoted, or
  plain `grep -rn "Assassinate" src/` and filter.
- Do NOT gate it by type. 163 beasts and monstrosities with a first-strike row
  are not wrong; their label was.

### 2. `rally`, `second-wind`, `lay-on-hands`: same diagnosis, same fix. Rename.

**Owner, 2026-10-27, on the gate: "can't we reskin to make it look like
something else?"** Yes — and it is the right fix. Read the four texts:

| template | text (band 0) | anything class-specific? |
|---|---|---|
| `rally` | Each ally within 30 feet gains {burst} Temporary Hit Points. | no — only the word "Cry" (a voice) |
| `second-wind` | The creature regains {avg} ({dice}) Hit Points. | no — only the Fighter's name |
| `lay-on-hands` | Touches a creature within 5 feet and restores {avg} Hit Points. | no — only the Paladin's name |
| `evasion` | Takes no damage on a successful Dex save, half on a failure. | no — and the WORD is neutral too |

The mechanics are body-neutral; the names are class features. Print has no
convention for any of the four (checked: touch-heal, limited self-heal,
allies-gain-temp-HP, no-damage-on-success — none returns a print row), so
under the owner's ruling the name can be anything that fits every body.
**No `deny_types`, no body-type constant, no gate.** The Giant question
disappears with it.

Rename the template `name` fields (body-neutral, print idiom — short, says
what the row does):

| template | from | to |
|---|---|---|
| `rally` | Bolstering Cry | **Bolstering Presence** (drops the voice; a construct can have a presence) |
| `second-wind` | Second Wind | **Recovery** |
| `lay-on-hands` | Lay on Hands | **Mending Touch** |
| `evasion` | Evasion | **keep** — the word is neutral; a cat evading a fireball reads fine. Flag, do not change. |

Sweep references for each exactly as for `assassinate` above (the
`energy-aura` rename touched 21 refs across 5 files; expect `keys`, traces,
specs and `labelFeatureRows`'s canon list to quote the old names).

`guarded-stance`, `patient-defense`, `riposte`, `bloodied-fury`, `wind-up`,
`berserk`, `execute`: names already body-neutral. Leave alone.

## Replay (write first, must fail before the change)

`__tests__/class-features-need-a-class.spec.js`:

1. `TEMPLATE_BY_ID.get(id).name` is the new name for each of the four renamed
   templates, and `templatesFor({ type: 'Beast' })` can still return every one
   of them — nothing is gated.
2. No template in the catalog has a `name` in the retired set
   {"Assassinate", "Bolstering Cry", "Second Wind", "Lay on Hands"} — the
   guard against a half-done sweep.
3. `labelFeatureRows` converges a `rally` row the call named "War Shout" onto
   "Bolstering Presence" — the canon list reads the template, so this passes
   with no edit to that function; the test proves the list is not a stale copy.

Use real pool arguments; print one input before trusting the output
([[a-probe-must-be-fed-real-context]]).

## Measure after (pre-registered bars)

Turn the by-type tally into `scripts/signature-measures/class-features-by-type.mjs`
(read each sheet's `type`, each row's `template` and `name`; count retired
names, and the four templates by body type). Run on the next ten and on one
old ten for the before.

- Bar 1: the retired names — "Assassinate", "Bolstering Cry", "Second Wind",
  "Lay on Hands" — on any sheet: **0**.
- Bar 2: the four templates still ship on beasts/constructs at about the old
  rate (the mechanic was never the problem; if the count drops, something was
  gated by accident).
- Bar 3: generation count holds (10/10), suite green, build clean.
- Nothing leaves any slot, so there is no displacement to watch. The spare-slot
  sameness (Heated Body / Assassinate / Resonant Body = 1,248 shipped rows)
  is untouched by this plan and is the next one.

## What this does NOT do

- It does not touch the "Assassinate" that print's Assassin NPC block carries
  by name when a GM asks for an assassin — that is a print row, not this
  template.
- It does not gate anything by creature type. The first draft of this plan
  proposed `deny_types` on four templates; the owner asked why not reskin,
  and the texts showed the mechanics were never the problem.
