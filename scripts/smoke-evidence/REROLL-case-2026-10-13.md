# Re-rolled abilities — the case for the critic (step 9b, 2026-10-13)

**What prompted it.** The owner, relaying users: "what path are we using for
individual action/trait generations? my users say it seems incredibly random as
though it doesn't take the whole creature into consideration."

**No block run this landing** (owner: "we don't need blocks for this"). Everything
below is from unit-level receipts and the engine's own traces. What that leaves
unverified is listed at the end.

---

## 1. The diagnosis: what the call could actually see

The re-roll path (`rerollEntry`, `format-2024/generate.mjs`) is a single LLM call
that writes rules text. Before this landing it was shown exactly this about the
creature:

```
THE MONSTER: Tidecaller Reef-Warden, CR 5, combat role: controller.
Its other entries (do not duplicate their mechanics or names): Amphibious; Multiattack; Kelp Lash.
```

That is a name, a CR, a role, and a list of names. It did **not** see:

- what the GM asked for, in their own words — the concept is on the saved block
  (`generation.userConcept`) and was never read;
- the header: type, size, speed, senses, languages;
- one word of any sibling entry's **rules**, so nothing anchored voice, damage
  type, reach, or save stat;
- the phrase the sheet uses for the creature (`monster.inline`), so a re-rolled
  row said "the creature" beside rows that say "the reef-warden";
- which rows are the GM's own (a part, a species row, a feature), so a re-roll
  could contradict the one thing the GM typed;
- **the catalog.** The signature path's rule is that rules text is never free: a
  shape or a seed from `shapes.mjs`/`library.mjs` holds the rules and the engine
  fills every number. The re-roll had no catalog, no fit, no value check.

So the complaint is literally accurate: the ability was invented from a name and a
CR. "Random" is the correct word for it.

A second defect fell out of the same reading, see §4.

## 2. The design: one call, two answers

A re-roll must stay **one** call (no cost increase). So the call now answers in
one of two ways and the engine decides which it got:

```
{"template": "<id from the catalog, or none>", "name": "<2-3 words>",
 "fills": {...}, "wrong": [...], "text": "<ONLY when template is none>"}
```

- **A template** → the engine renders print's frame, fills every number from the
  sheet, stamps the sheet's inline, prices the row with `valueCheck`, and records
  provenance on it (`template`, `boundKeys`).
- **"none"** → the model's own text, through the existing pseudo-block lint,
  corrections and one retry, exactly as before.

The catalog is built from the **saved sheet**, which is the chassis here: its
rows, its stats, its DCs, its speed, its type, its concept. Templates are filtered
by the same `templatesFor` gate chain the main path uses — role, CR band,
movement, section, type denials, ownership, nova, engine keys, and the new
body/tech claims — then ranked by the GM's own verbs and capped at fourteen lines.
A saved block with no recorded role draws from every role's shelf rather than
having a role guessed for it.

This is the same architecture as the main path and the same shape as the inline
inversion: the catalog proposes, the call judges, the engine validates. The
collision question from the fit call rides along, so a word match the call reads
as a collision is not bound here either.

## 3. Receipts

The creature: a CR 5 controller, saved sheet, concept "a triton reef-warden who
drags raiders under the water with a lash of kelp", re-rolling its Tidal Surge.

**What the call now sees** (abridged):

```
THE CREATURE — read all of it before you answer:
Tidecaller Reef-Warden, Medium Humanoid; Neutral; AC 16; HP 97; Speed 30 ft., Swim 30 ft.;
Senses Darkvision 60 ft.; Passive Perception 13; Languages Common, Primordial. CR 5, combat role: controller.
WHAT THE GM ASKED FOR, in their words: "a triton reef-warden who drags raiders under the water with a lash of kelp"
IT IS CALLED "the reef-warden" IN RULES TEXT — use that exact phrase, never "the creature".
ITS OTHER ENTRIES — the new one stands beside these; never repeat, replace or contradict one.
A * marks a row the GM asked for by name:
- [Traits] * Amphibious: The reef-warden can breathe air and water.
- [Actions] Multiattack: The reef-warden makes two Kelp Lash attacks.
- [Actions] * Kelp Lash: *Melee Attack Roll:* +6, reach 10 ft. 12 (2d8 + 3) Bludgeoning damage.

FIRST CHOICE — THE CATALOG. ...
- reel [Actions] VERB MATCH: drag (concept): Strength Saving Throw: DC {dc}, one Medium or smaller
  creature within 30 feet. Failure: {avg_half} ({dice_half}) {damage_type} damage, and the target is
  pulled up to 15 feet straight toward the creature.
- gaze-single [Actions]: ...
- snare [Actions, Recharge 5-6]: ... (12 templates offered)
```

The shelf ranked `reel` first, on the GM's own word **drag**. That is the whole
point: the menu is ordered by what the GM typed, not by what the model free-associates.

**The answer, rendered** (one call, no retry):

```
[reroll] value check: "Undertow Haul" EV 7.2 vs floor 6.8 (one attack of 2) — added Success: Half
[reroll] catalog fit: reel -> "Undertow Haul" [binds drag]

Undertow Haul. *Strength Saving Throw*: DC 14, one Medium or smaller creature within 30 feet.
*Failure:* 7 (2d6) Bludgeoning damage, and the target is pulled up to 15 feet straight toward
the reef-warden. *Success:* Half damage only.
```

Read the row against the sheet: DC **14**, which is the sheet's own DC and not the
CR 5 card's 15; "toward **the reef-warden**", not "the creature"; print's frame
word for word; `template: reel` and `boundKeys: ['drag']` saved on the row.

**A floored pick steers the retry.** Answering `snare` renders, then fails the
value floor, and the reason goes back in the one retry the path already had:

```
[reroll] nothing to ship: "Kelp Snare (Recharge 5-6)" does too little for a CR 5 action
         — pick another template or answer "none" and write it yourself — the retry carries the reason
```

## 4. The math, checked

**(a) A re-rolled row used to land a point off its siblings.** The skeletons shown
to the model came from the CR card (`buildContext(cr, archetype)`), while the
creature's rows carry its own derived numbers. On this sheet that was:

| | the card for CR 5 controller | the sheet's own rows |
| --- | --- | --- |
| save DC | 15 | 14 |
| attack bonus | +7 | +6 |
| per-attack damage | 13 (2d8 + 4) | 12 (2d8 + 3) |

So every re-rolled save row arrived at DC 15 beside siblings at DC 14, and the
lint's `dc-band` tolerates ±1, so nothing ever flagged it. The DC and the attack
bonus are **stat-derived**, so the sheet's own are the right ones: a re-roll now
reads them off the rows and uses them for the skeletons, the lint and the catalog.
The damage budget stays the card's, because the sheet's rows were priced from the
same card. A sheet more than 2 off the card is treated as hand-edited and the card
stands, so one bad edit cannot drag the budget (pinned both ways).

**(b) The value floor is fed real inputs.** `valueCheck` reads `scaled.per_hit`
(the card's per-attack budget, 13) and the sheet's sections, so it reads this
creature's Multiattack correctly as two attacks and prices a signature against
one of them:

```
floor = 0.8 × replaced,  replaced = P_HIT × per_hit = 0.65 × 13 = 8.45
      = 0.8 × 8.45 = 6.76 → 6.8     ✓ matches the trace
row   = 7.2 after the ladder added "Success: Half damage only"   → clears
```

**(c) The rendered numbers come from the frame, not the model.** `{dc}` resolved
to the sheet's 14 and `{avg_half} ({dice_half})` to 7 (2d6). A template answer
carries no model-supplied number at all.

## 5. What is still free text, deliberately

- **"template": "none"** is a legitimate answer and the floor of the design. The
  catalog does not cover every ability a GM wants, and a re-roll must never fail.
  That text is still linted, corrected and retried as before — now against the
  creature's own numbers.
- **Legendary Actions** have no catalog shelf (no templates carry that section),
  so a legendary re-roll uses the old prompt shape. Pinned.
- **The whole-section re-roll** gets the creature in view but not the catalog. A
  section is a composition with plan counts and a Multiattack, which is the main
  path's job, not a one-call re-roll's. Noted as the next step if the critic wants
  it.

## 6. For the critic to probe

1. **How often the catalog is chosen in the wild.** Unmeasured here by design (no
   block run). The ranking puts a concept-verb match first, so the live question is
   whether the model takes it or writes its own anyway.
2. **Whether `wrong` behaves on a re-roll** the way it does on the fit call.
3. **Menu entries that can never clear the floor at a given CR** — `snare` at CR 5
   is one. The fit call has the same exposure on the main path. Pre-existing, and
   cheap to fix by gating a damage-free gated shape on CR, if the critic thinks it
   is worth a round.
4. **The legacy 2014 card's re-roll** returns `{name, description}` and drops the
   provenance fields; only the 2024 card carries them through. Deliberate for now.

## 7. Pins and gate

Ten new tests, `src/tools/statblock-generator/__tests__/reroll-catalog.spec.js`:
the dual-answer validator; the concept, header, inline and sibling rules in the
prompt; the catalog offered and ranked by the GM's verb; a template fit shipping
print's frame with the sheet's DC, the sheet's inline and provenance, in one call;
the value floor steering the retry; the skeletons reading the sheet's numbers; the
outlier clamp; a structural name surviving; a legendary action with no shelf; the
section re-roll's view.

```
full suite      184 suites, 5,270 passed, 26 skipped
npm run build   clean
```
