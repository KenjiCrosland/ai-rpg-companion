# Step 1 — the swap test. The diagnosis is wrong, and the real pattern is sharper

For Fable 5.2 and the owner, 2026-11-14. **Nothing was built.** Step 1 was run on the current
prompt (095a135, with the `print_body` clause the owner kept) and is reported before step 3.

Probe: `scripts/probe-path-swap.mjs`. 7 prompts × 10 rolls at CR 5 on the 2024 shelf, plus
Mother Ash 10 on the old prompt and 10 on the new. Production's request shape (system turn,
hidden reasoning disabled). 90 calls.

```
node --import ./scripts/alias-loader.mjs scripts/probe-path-swap.mjs 10
```

## The counts

| prompt | body named | class filled, body empty | paths |
|---|---|---|---|
| ogre blacksmith | **6/10** | 1/10 | twist:Ogre ×3, homebrew ×3, homebrew:Ogre ×3, class_npc ×1 |
| ogre pirate | **5/10** | 0/10 | homebrew ×5, twist:Ogre ×3, homebrew:Ogre ×2 |
| vampire blacksmith | 9/10 | 0/10 | twist:Vampire ×9, homebrew ×1 |
| vampire pirate | 10/10 | 0/10 | twist:Vampire ×10 |
| troll blacksmith | 10/10 | 0/10 | twist:Troll ×10 |
| ghoul gravedigger | **3/10** | 0/10 | homebrew ×7, twist:Ghoul ×3 |
| orc blacksmith | 0/10 | 6/10 | class_npc ×6, homebrew ×4 |

Across all seven: body named **43/70**, class-filled-body-empty **7/70** (6 of those 7 are
orc blacksmith, which is the correct answer for it).

## Which of the three readings this supports: none of them

**1. "Misses are class filled, body empty, clustered on the ogre" — NO.** The ogre shows that
shape once in ten. Its dominant miss is `body=null rel=null class=null`: the call names no
body AND no class. It does not mistake the ogre for a people; it fails to recognise it at all.

**2. "Misses follow blacksmith whatever the head" — NO.** `vampire blacksmith` is 9/10 and
`troll blacksmith` is 10/10. The trade word is not the cause.

**3. "The body is named but relation is not is" — PARTLY, and it is a minority.** `resembles`
appears 3/10 on ogre blacksmith and 2/10 on ogre pirate. Real, but not the main shape.

## The pattern that does fit: the prompt's examples are a recall list

Counting whole words in the built prompt against the body-named rate:

| creature | times named in the prompt | body named |
|---|---|---|
| Troll | **5** | 10/10 |
| Vampire | **2** | 10/10, 9/10 |
| Ogre | **0** | 6/10, 5/10 |
| Ghoul | **0** | 3/10 |
| Hag | **0** | 3/10 (Mother Ash, new prompt) |
| orc | 2, as a PEOPLE | 0/10 body — correct, it has no print block |

Every creature the prompt uses as an example is named 90-100% of the time. Every creature it
does not mention is named 30-60% of the time. The trade word, the CR and the people/monster
question all cut across this and none of them separates the cases; the mention count
separates all of them.

**The model is matching the examples rather than applying the rule.** That is the project's
own "prompt examples teach the answer" lesson, showing up as a recall list instead of a
general instruction — and it is why the `print_body` clause lifted `vampire pirate` from 3/10
to 10/10 (a creature already in the examples) and `ogre blacksmith` only to 4-6/10.

## Mother Ash, closed out with counts

| | right (a printed hag as the body) | dominant answer |
|---|---|---|
| OLD prompt (before 095a135) | **0/10** | `class=cleric, body=null` ×7 |
| NEW prompt (current) | **2/10** | `class=cleric, body=null` ×5 |

The owner's ruling was right: she is the same defect as the ogre, not a separate stop. "Hag"
is named nowhere in the prompt, and `hagFor` — the code that picks Green/Sea/Night by context
— never runs, because the call never names a hag for it to resolve. The new clause helped
(0 → 2) and nowhere near enough.

Note she IS the class-filled-body-empty shape the diagnosis predicted. The ogre is not. What
the two share is absence from the examples, not a people reading.

## What this means for step 3, and a word for the reserve arm

Step 3's direction still looks right — the precedence rules are most of the prompt's 4,730
characters and `dispatch` already implements them — but **shortening alone will not fix this.**
If the model is recalling examples rather than applying rules, removing rules does not help it
recognise an Ogre; it may help by leaving the examples a larger share of a smaller prompt,
which is the opposite of a principled fix.

**The arm held in reserve — code handing the call the printed names it found in the words —
addresses this directly, and is the only one of the proposed changes that does.** `printNameOf`
and the corpus already exist; the model would be asked to CHOOSE among named candidates rather
than recall one. That turns a recall problem into a selection problem. I am not building it:
it is the owner's reserve and this is the step-1 report.

My recommendation is to promote that arm ahead of the smaller prompt, or to run them as two
measured variants against `path-key.json` in one sitting rather than sequentially.

## Not done, and why

Step 2 (code keeps the people's body) and step 3 (the smaller prompt) are untouched: the
instruction was to build nothing until step 1 is read. Step 2 is unaffected by this finding —
it is a closed-fact lookup for a people with a print block and no kit — and can proceed as
written whatever is decided about step 3.

## Still open from earlier, unchanged

The 2014 shelf routing worse than 2024 on the same words; the kobold's label; the described
person with no class word; whether every Fey block counts as a person.
