# Triage — the GM forty `typed40-2026-11-13T00-37-36`, three reads merged

Written for a reader with no conversation history. This supersedes the order in
`critic-response-2026-11-12.md` §6, which was built from the **crafted** forty and ranked
print-body fidelity first — that register is barely exercised here (4 twists of 40).

Three independent reads of the same 40 blocks:

| reader | scale | result |
|---|---|---|
| owner (hand scan) | Keeper / Runs / Tweak / Fix | 13 · 10 · 10 · **7** |
| second critic (new) | use / quick fix / rework / reject | 5 · 10 · 14 · **11** |
| instrument (`check-run`) | mechanical FAIL | **4 of 40** (was 6 on this batch on 11-09) |

The owner's note on his own scale: **"Runs with no comment" means sound but *meh*** — not a pass.
Five of his ten Runs are in the last seven blocks, where he said his scan fatigued, so the new
critic's independent read of the tail is the part most likely to move his numbers.

## Owner's ruling, 2026-11-13

> **"condition rider on the attack always"**

A condition rider authored at a trait seat welds onto the attack row. Not only grapples and holds —
every condition rider, every time. (Asked because it changes a lot of rows; answered without
qualification.)

## The new critic's structural claims, measured against the saved run

He said he was inferring from outputs, not code. All three hold.

### 1. "The template is supplying identity, not just numbers" — CONFIRMED, and the cause is worse than stated

He read it as one donor leaking. It is not: **three different donor families land on one array.**

| # | sheet | donor | STR DEX CON INT WIS CHA | CR |
|---|---|---|---|---|---|
| 01 | Grask Ironjaw | `defender-5` | 18 15 16 10 12 15 | 5 |
| 03 | Captain Vell | `lurker-5` | 18 15 16 10 12 15 | **6** |
| 23 | Orrin Blackwell | `brute-5` | 18 15 16 10 12 15 | **6** |

Byte-identical across a defender, a lurker and a brute — it is the **Gladiator's print array**
arriving with the class-NPC body, not the donor's. And his separate point lands with it: **the same
statline is priced CR 5 on one sheet and CR 6 on two others.**

The animal case is the same mechanism: **#28 Shadowfang, `brute-2`, DEX 8** — on a wolf, where
print's Dire Wolf is DEX 15. His "a wolf with DEX 8" is exact.

*Honest limit:* six sheets (#02, #12, #16, #19, #21, #27) read `?` in my probe — a key-name gap in
my reader, not an engine fact. His INT 6 vampire and INT 4 mind flayer are **unverified here**,
though the confirmed cases make them likely. Check before citing.

### 2. "The concept arrives only as names" — CONFIRMED, near-exactly

| primitive | he said | measured |
|---|---|---|
| `Restrained … until the end of its next turn` | 8 sheets | **9** (#03 #10 #11 #18 #23 #26 #31 #36 #37) |
| `24 (7d6)` | 7 sheets | **7** (#05 #08 #09 #17 #21 #23 #32) |

Template names leaking — **CORRECTED 2026-11-13 (second time I counted a trace line as a card
fact; see the 31-of-40 correction below).** The first version of this line said *"the mage" on #05,
#15, #27*. On **#15 and #27 that string is only in the engine's own narration** — `[path] class
body: the mage stands on the Mage` — and their cards are clean. Read against the card text alone
(everything before the first trace line), the leaks are:

| sheet | on the card |
|---|---|
| #05 Lord Vexmoor | `The mage` |
| #33 Thornback | `Grappled by the ankheg` |
| #31 Rimebound Troll | `pulled … straight toward Troll` (the repair's output; its own `the troll` is a fair short form and not a defect) |

Three sheets, three instances. Fable 5.2's reading of #05 was right.

### 3. "Nothing checks the signature ask" — CONFIRMED, but my first number was wrong

**CORRECTION (2026-11-13, after Fable 5.2's code read).** The first version of this section said
"31 of 40 sheets carry `the clause stays open`" and read that as 31 dropped asks. It is not. That
trace fires at generate.mjs:5993, inside the `answered` check, which runs *before* the seat appends
the row it is about to author (6168) — on Grask the order is "stays open" ×2, then "seat authored
the row: Jaw-Lock". 27 of the 29 sheets with the line also have an authored row: the same event,
counted twice. The 31 was the authored-row count wearing a different label.

The real numbers:

- **The checker's own count: 24 of 87 GM clauses dropped (72% coverage).**
- **14 of 40** carry a `[gap]` — a signature idea the catalog had no shape for.
- And the deeper point, which is Fable 5.2's and correct: the 63 "covered" clauses are credited by
  **stamp** — a row carries the clause's id — not by what the row does. Vexmoor's *raises the
  party's fallen allies* is 2/2 covered with a 7d6 necrotic row. The effect vocabulary (damage, ten
  conditions, push/pull) cannot say *raise*, *legendary*, *slow* or *summon*, so the ask gets its
  name on a generic row. That is the memory `the-receipt-is-not-the-expression`, re-found.

So the cause is real and large; it is **two** things — 24 asks with no row, and an unknown share of
the 63 "covered" whose row does not do the thing — and it is not fixed by "binding" alone. Binding
without a wider vocabulary produces more named damage rows.

**My "nothing needs inventing" was also wrong.** Donors are not math budgets by design: 93 of 93
carry an ability array, 93 a speed, 85 skills, and 19 of 21 brute donors have INT ≤ 6. The budget
and the body are one object. See `reply-to-fable52-2026-11-13.md` for the reconciled order.

## Where the three reads agree, block by block

Agreement is the strongest signal we have. Both critics and the owner, or two of three:

| # | owner | new critic | same diagnosis |
|---|---|---|---|
| 12 Big Bob | Fix | reject | a boulder-thrower on a caster donor: Spellcasting, Shield, *spell* attacks |
| 19 Krevmaw | Fix | reject | no mind blast, no brain extraction |
| 16 Morwain | Fix | reject | vampire powers gone, a mimic's Adhesive in their place |
| 20 Displacer | Fix | reject | the displacement trait cannot be adjudicated |
| 01 Grask | Fix | quick fix | auto-grapple + silence, no save, no escape DC, three times a round |
| 31 Troll | Fix | rework | the "Hurl" is a pull; Loathsome Limbs cites a block that isn't there |
| 23 Orrin | Fix | quick fix | Forge-Touched Metal's mechanism is unclear |
| **13, 14 monks** | **Keeper** | **rework** | **"the stun rider is cut off mid-sentence"** |

The monks matter: the owner scored them Keeper, the new critic caught the dangling save
independently, and the instrument flags it. **3 of 3 monks across both forties.** It is real and it
is visible to a careful reader.

## THE ORDER

Tier 1 and 2 are causes; tier 3 is cheap and already ruled; do not let tier 3's cheapness pull it
to the front of a release decision.

### Tier 1 — SUPERSEDED, see `reply-to-fable52-2026-11-13.md`

The order below was written before Fable 5.2's code read and before the 31-of-40 correction above.
The reconciled order lives in the reply document: route filter first (Big Bob), the small ruled
items in parallel, then the instrument, then the ability profile on the existing concept call, then
the effect vocabulary, then the honest exit, then repair forms. Tiers 2–5 below are still correct as
*findings*; their ranking is in the reply.

### Tier 2 — the donor stops supplying identity

2. **Array, skills and CR follow the creature, not the body.** Three donors → one Gladiator array;
   CR 5 vs 6 on identical statlines; DEX 8 on a wolf. Absorbs the old item 1 (**artillery + no
   magic must not take a caster donor** — the route call answered `caster (artillery)` and
   `casts: no worked magic` in the same line and the engine believed the first) and the long-open
   handover item 27 (Gladiator's Performance +5 on war chiefs 3/3, Mage array on a cleric 3/3).

### Tier 3 — small, ruled, and two of them are the owner's own words

3. **Condition rider on the attack, always** (owner, today). Also clears the `grapple-no-escape`
   FAIL on #01.
4. **The monk's kit rider survives the print rename** — 3/3 monks ship a save that does nothing.
5. **A named Humanoid is they/them.** No pronoun handling exists in the engine at all; the name and
   `type=Humanoid` are both declared. ~8 sheets.
6. **Template names stop leaking into card text** — "the mage" ×3, "the ankheg", "toward Troll".

### Tier 4 — the repair's coverage

7. **A repair form for a trait and for an attack row.** The repair can rewrite a save row and
   nothing else; it declined 9 times on this forty, **6 of them for want of a form** ("a trait is
   not a save" ×3, "no attack form" ×3). The owner's Fixes live in traits and attacks, so the audit
   catching a problem currently does not mean fixing it.

### Tier 5 — the "meh"

8. **Primitive repetition.** Restrained-until-end-of-next-turn on 9 sheets, `24 (7d6)` on 7. This is
   the measurable half of the owner's ten no-comment Runs.

### Parked — verify before building

The new critic's per-block claims that have not been traced: #17 Owlbear Zombie typed Monstrosity
(so Turn Undead fails), #15 Snigg's duplicate Misty Step and hot damage at CR 3, #18 Ocularch's Bite
+5 against a +10 expectation, #25 Pip's hover speed killing the joke, #03 Vell wielding sword and
shield with one hand, #35's recharge present in Multiattack but absent from the row. Each is cheap
to check and none should be built on unchecked — the first critic's "Protective Magic" has cost
three reads by being recalled rather than read.

Also parked, unchanged: the Hollow Cardinal's spell list (owner: don't engineer around it), #16's
vampire-pirate routing (one instance), the 2014 tag question. The new critic reports **edition makes
no difference** — 2014 and 2024 blocks fail the same ways — which keeps the conversion leaks low.
